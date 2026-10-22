// Turns approved reels into video files in the background, one at a time,
// while you keep reviewing. Each reel is rebuilt from its seed on a hidden
// full-size canvas, so the file is exactly what you approved.
//
// Preferred path: encode frame by frame with WebCodecs into an H.264 + AAC
// MP4. Every frame is guaranteed however slow the device is, and on a normal
// computer it's faster than real time. Browsers without WebCodecs fall back
// to recording the canvas in real time.
import { createReelRenderer } from './reel.js'
import { scheduleSoundtrack, renderSoundtrackBuffer } from './audio.js'

const FPS = 30

const RECORDER_TYPES = [
  'video/mp4;codecs=avc1.640028,mp4a.40.2',
  'video/mp4;codecs=avc1,mp4a.40.2',
  'video/webm;codecs=vp9,opus',
  'video/webm',
]

function recorderType() {
  if (typeof MediaRecorder === 'undefined') return null
  return RECORDER_TYPES.find((t) => MediaRecorder.isTypeSupported(t)) || null
}

let muxerLib = null
function loadMuxer() {
  if (muxerLib) return muxerLib
  muxerLib = new Promise((resolve, reject) => {
    if (window.Mp4Muxer) return resolve(window.Mp4Muxer)
    const s = document.createElement('script')
    s.src = new URL('../vendor/mp4-muxer.min.js', import.meta.url).href
    s.onload = () => resolve(window.Mp4Muxer)
    s.onerror = () => {
      muxerLib = null
      reject(new Error('mp4 muxer did not load'))
    }
    document.head.appendChild(s)
  })
  return muxerLib
}

// Which WebCodecs configs this browser can encode, or null.
async function codecPlan(width, height) {
  if (typeof VideoEncoder === 'undefined' || typeof AudioEncoder === 'undefined') return null
  // H.264 is what Instagram and TikTok want; VP9 is the last resort, still
  // frame-accurate, for browsers without an H.264 encoder.
  let video = null
  for (const [codec, muxCodec] of [['avc1.640028', 'avc'], ['avc1.4d0028', 'avc'], ['avc1.42003e', 'avc'], ['vp09.00.40.08', 'vp9']]) {
    const cfg = { codec, width, height, bitrate: 10e6, framerate: FPS, ...(muxCodec === 'avc' ? { avc: { format: 'avc' } } : {}) }
    try {
      if ((await VideoEncoder.isConfigSupported(cfg)).supported) {
        video = { cfg, muxCodec }
        break
      }
    } catch {}
  }
  if (!video) return null
  let audio = null
  for (const [codec, muxCodec] of [['mp4a.40.2', 'aac'], ['opus', 'opus']]) {
    const cfg = { codec, sampleRate: 48000, numberOfChannels: 2, bitrate: 192000 }
    try {
      if ((await AudioEncoder.isConfigSupported(cfg)).supported) {
        audio = { cfg, muxCodec }
        break
      }
    } catch {}
  }
  return { video, audio }
}

export function createExporter({ width = 1080, height = 1920, onProgress = () => {} } = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  // In the document (some browsers won't capture a detached canvas) but out of sight.
  Object.assign(canvas.style, { position: 'fixed', left: '-10000px', top: '0', width: '54px', height: '96px', pointerEvents: 'none' })
  document.body.appendChild(canvas)
  let reel = null
  let liveAudio = null
  const queue = []
  let busy = false
  const plans = codecPlan(width, height)
  const yieldToPage = () => new Promise((r) => setTimeout(r, 0))

  async function encodeFrames(job, duration, plan, codecs) {
    const Mp4Muxer = await loadMuxer()
    const muxer = new Mp4Muxer.Muxer({
      target: new Mp4Muxer.ArrayBufferTarget(),
      video: { codec: codecs.video.muxCodec, width, height, frameRate: FPS },
      ...(codecs.audio ? { audio: { codec: codecs.audio.muxCodec, numberOfChannels: 2, sampleRate: 48000 } } : {}),
      fastStart: 'in-memory',
      firstTimestampBehavior: 'offset',
    })
    let failed = null
    const venc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: (e) => (failed = e) })
    venc.configure(codecs.video.cfg)

    // sound first: render it offline and encode it in one go
    if (codecs.audio) {
      const buf = await renderSoundtrackBuffer(plan, 48000)
      const aenc = new AudioEncoder({ output: (c, m) => muxer.addAudioChunk(c, m), error: (e) => (failed = e) })
      aenc.configure(codecs.audio.cfg)
      const L = buf.getChannelData(0), R = buf.getChannelData(1)
      const step = 4800
      for (let i = 0; i < buf.length; i += step) {
        const n = Math.min(step, buf.length - i)
        const data = new Float32Array(n * 2)
        data.set(L.subarray(i, i + n), 0)
        data.set(R.subarray(i, i + n), n)
        const ad = new AudioData({ format: 'f32-planar', sampleRate: 48000, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round((i / 48000) * 1e6), data })
        aenc.encode(ad)
        ad.close()
      }
      await aenc.flush()
      aenc.close()
    }

    const frames = Math.ceil(duration * FPS)
    for (let f = 0; f < frames; f++) {
      if (job.cancelled) throw new Error('cancelled')
      if (failed) throw failed
      reel.renderAt(f / FPS)
      const vf = new VideoFrame(canvas, { timestamp: Math.round((f * 1e6) / FPS), duration: Math.round(1e6 / FPS) })
      venc.encode(vf, { keyFrame: f % (FPS * 2) === 0 })
      vf.close()
      onProgress(job, (f + 1) / frames)
      // let the page breathe and the encoder catch up
      while (venc.encodeQueueSize > 4) await new Promise((r) => setTimeout(r, 5))
      if (f % 2 === 0) await yieldToPage()
    }
    await venc.flush()
    venc.close()
    if (failed) throw failed
    muxer.finalize()
    return { blob: new Blob([muxer.target.buffer], { type: 'video/mp4' }), ext: 'mp4' }
  }

  async function recordRealtime(job, duration, plan) {
    if (!liveAudio) liveAudio = new AudioContext()
    await liveAudio.resume()
    const dest = liveAudio.createMediaStreamDestination()
    const stream = canvas.captureStream(FPS)
    for (const tr of dest.stream.getAudioTracks()) stream.addTrack(tr)
    const type = recorderType()
    const rec = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 12e6, audioBitsPerSecond: 192e3 })
    const chunks = []
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
    const stopped = new Promise((res) => (rec.onstop = res))
    reel.renderAt(0)
    const start = liveAudio.currentTime + 0.15
    scheduleSoundtrack(liveAudio, dest, plan, start)
    rec.start(250)
    await new Promise((resolve) => {
      // the audio clock drives the picture so the two stay locked; a timer
      // rather than rAF so it keeps going if the tab loses focus
      const tick = () => {
        const t = liveAudio.currentTime - start
        if (t >= duration + 0.1) return resolve()
        reel.renderAt(Math.max(0, Math.min(duration, t)))
        onProgress(job, Math.max(0, Math.min(1, t / duration)))
        setTimeout(tick, 1000 / 40)
      }
      tick()
    })
    rec.stop()
    await stopped
    for (const tr of stream.getTracks()) tr.stop()
    return { blob: new Blob(chunks, { type: rec.mimeType }), ext: rec.mimeType.includes('mp4') ? 'mp4' : 'webm' }
  }

  async function renderOne(job) {
    if (!reel) reel = createReelRenderer(canvas, { width, height, internal: 0.5 })
    const { duration, plan } = await reel.load(job.item, job.opts)
    const codecs = await plans
    if (codecs) {
      try {
        return await encodeFrames(job, duration, plan, codecs)
      } catch (e) {
        if (job.cancelled) throw e
        console.warn('frame-by-frame export failed, recording instead:', e)
      }
    }
    if (!recorderType()) throw new Error('This browser can’t make videos. Try Chrome or Edge.')
    return recordRealtime(job, duration, plan)
  }

  async function pump() {
    if (busy) return
    busy = true
    while (queue.length) {
      const job = queue.shift()
      if (job.cancelled) continue
      try {
        job.resolve(await renderOne(job))
      } catch (e) {
        job.reject(e)
      }
    }
    busy = false
  }

  return {
    supported: typeof VideoEncoder !== 'undefined' || !!recorderType(),
    // Resolves { blob, ext } when the reel's file is ready.
    add(item, opts = {}) {
      const job = { item, opts, cancelled: false }
      job.promise = new Promise((resolve, reject) => {
        job.resolve = resolve
        job.reject = reject
      })
      queue.push(job)
      pump()
      return job
    },
    cancel(job) {
      job.cancelled = true
    },
  }
}
