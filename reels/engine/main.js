// Two entry points over one engine:
//  - the player: deals reels forever, plays them live with sound, records one
//  - render mode (?render): exposes window.ZEXE for the headless exporter
import { createReelRenderer } from './reel.js'
import { scheduleSoundtrack, renderSoundtrackOffline } from './audio.js'
import { loadLibrary, makeDealer } from './library.js'
import { SIGNS, GLYPH, captionFor } from './signs.js'

const params = new URLSearchParams(location.search)

if (params.has('render')) {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const W = +(params.get('w') || 1080), H = +(params.get('h') || 1920)
  const reel = createReelRenderer(canvas, { width: W, height: H, internal: +(params.get('internal') || 0.5) })
  let plan = null
  window.ZEXE = {
    async prepare(item, opts = {}) {
      const r = await reel.load(item, opts)
      plan = r.plan
      return { duration: r.duration, world: r.world, caption: captionFor(item) }
    },
    async audio() {
      const wav = await renderSoundtrackOffline(plan)
      let s = ''
      for (let i = 0; i < wav.length; i += 0x8000) s += String.fromCharCode.apply(null, wav.subarray(i, i + 0x8000))
      return btoa(s)
    },
    frame(t, quality = 0.92) {
      reel.renderAt(t)
      return canvas.toDataURL('image/jpeg', quality).slice(23)
    },
  }
  window.ZEXE_READY = true
} else {
  startPlayer()
}

async function startPlayer() {
  const $ = (s) => document.querySelector(s)
  const canvas = $('#reel')
  const reel = createReelRenderer(canvas, { width: 720, height: 1280, internal: 0.62 })
  const lines = await loadLibrary()
  const dealer = makeDealer(lines)
  const handle = $('#handle')

  let audio = null
  let mix = null
  let recDest = null
  let current = null
  let duration = 8
  let plan = null
  let startedAt = 0
  let paused = false
  let pausedAt = 0
  let history = []
  let hIndex = -1
  let soundOn = false
  let recording = null

  const now = () => (audio && soundOn ? audio.currentTime : performance.now() / 1000)

  // Sign chips
  const chips = $('#signs')
  for (const s of ['all', ...SIGNS]) {
    const b = document.createElement('button')
    b.className = 'chip'
    b.type = 'button'
    b.dataset.sign = s
    b.id = 'sign-' + s
    b.title = s
    b.innerHTML = s === 'all' ? '<span class="g">✦</span><span>all</span>' : `<span class="g">${GLYPH[s]}&#xFE0E;</span><span>${s}</span>`
    b.addEventListener('click', () => {
      dealer.setFilter({ sign: s })
      syncChips()
      next()
    })
    chips.appendChild(b)
  }
  const syncChips = () => {
    for (const b of chips.children) b.setAttribute('aria-pressed', String(b.dataset.sign === dealer.filter.sign))
    for (const b of document.querySelectorAll('[data-topic]')) b.setAttribute('aria-pressed', String(b.dataset.topic === dealer.filter.topic))
    $('#poolcount').textContent = `${dealer.count()} lines in this deck`
  }
  for (const b of document.querySelectorAll('[data-topic]')) {
    b.addEventListener('click', () => {
      dealer.setFilter({ topic: b.dataset.topic })
      syncChips()
      next()
    })
  }
  syncChips()
  $('#total').textContent = String(lines.length)

  async function play(item) {
    current = item
    const r = await reel.load(item, { handle: handle.value.trim() })
    duration = r.duration
    plan = r.plan
    startedAt = now()
    paused = false
    $('#pause').textContent = 'Pause'
    $('#nowtitle').textContent = `${item.sign}.exe`
    $('#world').textContent = r.world
    $('#topic').textContent = item.topic === 'love' ? 'love' : 'self'
    $('#line').textContent = item.text
    $('#caption').value = captionFor(item)
    if (soundOn) scheduleSoundtrack(audio, mix, plan, audio.currentTime + 0.02)
  }

  function next() {
    const item = dealer.next()
    if (!item) return
    history = history.slice(0, hIndex + 1)
    history.push(item)
    hIndex = history.length - 1
    play(item)
  }
  function prev() {
    if (hIndex > 0) play(history[--hIndex])
  }

  function frame() {
    requestAnimationFrame(frame)
    if (!current) return
    const t = paused ? pausedAt : now() - startedAt
    if (t >= duration && !paused) {
      if (recording) return finishRecording()
      if ($('#auto').checked) {
        if (hIndex < history.length - 1) play(history[++hIndex])
        else next()
      } else {
        startedAt = now()
        if (soundOn) scheduleSoundtrack(audio, mix, plan, audio.currentTime + 0.02)
      }
      return
    }
    reel.renderAt(Math.max(0, t))
    $('#bar').style.transform = `scaleX(${Math.min(1, t / duration)})`
  }

  async function enableSound() {
    if (!audio) {
      audio = new AudioContext()
      mix = audio.createGain()
      mix.connect(audio.destination)
      recDest = audio.createMediaStreamDestination()
      mix.connect(recDest)
    }
    await audio.resume()
    soundOn = true
    $('#sound').textContent = 'Sound on'
    $('#sound').setAttribute('aria-pressed', 'true')
    if (current) play(current)
  }
  function disableSound() {
    soundOn = false
    audio?.suspend()
    $('#sound').textContent = 'Sound off'
    $('#sound').setAttribute('aria-pressed', 'false')
    if (current) play(current)
  }

  $('#start').addEventListener('click', async () => {
    $('#gate').hidden = true
    await enableSound()
  })
  $('#gate-mute').addEventListener('click', () => {
    $('#gate').hidden = true
  })
  $('#sound').addEventListener('click', () => (soundOn ? disableSound() : enableSound()))
  $('#next').addEventListener('click', next)
  $('#prev').addEventListener('click', prev)
  $('#pause').addEventListener('click', () => {
    if (!paused) {
      pausedAt = now() - startedAt
      paused = true
      audio?.suspend()
      $('#pause').textContent = 'Play'
    } else {
      startedAt = now() - pausedAt
      paused = false
      if (soundOn) audio.resume()
      $('#pause').textContent = 'Pause'
    }
  })
  $('#replay').addEventListener('click', () => current && play(current))
  handle.addEventListener('change', () => current && play(current))
  $('#copy').addEventListener('click', async () => {
    const ta = $('#caption')
    try {
      await navigator.clipboard.writeText(ta.value)
      $('#copy').textContent = 'Copied'
    } catch {
      ta.select()
      $('#copy').textContent = 'Selected, press Ctrl+C'
    }
    setTimeout(() => ($('#copy').textContent = 'Copy caption'), 1600)
  })

  // Record the current reel from the top, with its sound, into a video file.
  $('#record').addEventListener('click', async () => {
    if (recording || !current) return
    if (!soundOn) await enableSound()
    const stream = canvas.captureStream(30)
    for (const tr of recDest.stream.getAudioTracks()) stream.addTrack(tr)
    const type = ['video/mp4;codecs=avc1,mp4a', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm'].find((t) => MediaRecorder.isTypeSupported(t))
    const rec = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 8e6 })
    const chunks = []
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: rec.mimeType })
      const url = URL.createObjectURL(blob)
      const ext = rec.mimeType.includes('mp4') ? 'mp4' : 'webm'
      const v = $('#take')
      v.src = url
      $('#takebox').hidden = false
      const a = $('#takelink')
      a.href = url
      a.download = `${current.sign}-${current.id}.${ext}`
      $('#record').textContent = 'Record this reel'
      $('#record').disabled = false
    }
    recording = rec
    $('#record').textContent = 'Recording…'
    $('#record').disabled = true
    await play(current)
    rec.start()
  })
  function finishRecording() {
    const r = recording
    recording = null
    r.stop()
    paused = true
    pausedAt = duration - 0.001
  }

  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === ' ') {
      e.preventDefault()
      $('#pause').click()
    }
  })

  next()
  frame()
}
