// The soundtrack, built from scratch for each reel with Web Audio: a hazy pad,
// a slowed music box, a dialog ding, soft typing ticks and a pop for the glyph.
// The same graph runs live in an AudioContext or offline for export.
import { makeRng } from './rng.js'

const SCALES = [
  [0, 2, 3, 7, 9],   // minor-ish pentatonic
  [0, 2, 4, 7, 9],   // major pentatonic
  [0, 3, 5, 7, 10],  // minor pentatonic
  [0, 2, 3, 5, 7, 8, 11], // harmonic minor
]

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12)

function impulse(ctx, secs = 3.2, decay = 2.6, seed = 1) {
  const r = makeRng('ir' + seed)
  const len = Math.floor(ctx.sampleRate * secs)
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c)
    for (let i = 0; i < len; i++) d[i] = (r.next() * 2 - 1) * Math.pow(1 - i / len, decay)
  }
  return buf
}

function noiseBuffer(ctx, secs, seed) {
  const r = makeRng('nz' + seed)
  const len = Math.floor(ctx.sampleRate * secs)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = r.next() * 2 - 1
  return buf
}

// plan: { seed, duration, tPopup, typeTimes: [], tClose, tGlyph }
// t0: context time at which reel time 0 happens.
export function scheduleSoundtrack(ctx, dest, plan, t0 = 0) {
  const rng = makeRng('audio/' + plan.seed)
  const D = plan.duration
  const master = ctx.createGain()
  master.gain.value = 0.9
  const comp = ctx.createDynamicsCompressor()
  comp.threshold.value = -16
  comp.ratio.value = 3
  master.connect(comp).connect(dest)

  const verb = ctx.createConvolver()
  verb.buffer = impulse(ctx, 3.4, 2.4, plan.seed)
  const wet = ctx.createGain()
  wet.gain.value = 0.55
  verb.connect(wet).connect(master)
  const bus = ctx.createGain()
  bus.connect(master)
  bus.connect(verb)

  const scale = rng.pick(SCALES)
  const root = rng.int(45, 52)
  const note = (deg, oct = 0) => root + scale[((deg % scale.length) + scale.length) % scale.length] + 12 * (oct + Math.floor(deg / scale.length))

  // Fade the whole thing in and out so the loop seam is soft.
  const env = (g, peak, a = 0.6, r = 0.5) => {
    g.gain.setValueAtTime(0, t0)
    g.gain.linearRampToValueAtTime(peak, t0 + a)
    g.gain.setValueAtTime(peak, t0 + D - r)
    g.gain.linearRampToValueAtTime(0, t0 + D)
  }

  // pad: root + fifth + third-ish, detuned triangles through a breathing filter
  const pad = ctx.createGain()
  env(pad, 0.11, 0.8, 0.6)
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 700
  lp.Q.value = 0.7
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.18
  lfoGain.gain.value = 380
  lfo.connect(lfoGain).connect(lp.frequency)
  lfo.start(t0)
  lfo.stop(t0 + D)
  pad.connect(lp).connect(bus)
  for (const deg of [0, 2, 4]) {
    for (const det of [-7, 6]) {
      const o = ctx.createOscillator()
      o.type = 'triangle'
      o.frequency.value = midi(note(deg, -1))
      o.detune.value = det + rng.range(-3, 3)
      o.connect(pad)
      o.start(t0)
      o.stop(t0 + D)
    }
  }
  // sub drone
  const sub = ctx.createOscillator()
  sub.type = 'sine'
  sub.frequency.value = midi(root - 12)
  const subG = ctx.createGain()
  env(subG, 0.13, 1, 0.6)
  sub.connect(subG).connect(master)
  sub.start(t0)
  sub.stop(t0 + D)

  // air: filtered noise, like wind in an empty room
  const air = ctx.createBufferSource()
  air.buffer = noiseBuffer(ctx, D, plan.seed)
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = rng.range(500, 1400)
  bp.Q.value = 0.6
  const airG = ctx.createGain()
  env(airG, 0.035, 1, 0.6)
  air.connect(bp).connect(airG).connect(bus)
  air.start(t0)

  // music box: sparse plucks, slowed
  const pluck = (time, freq, vel = 0.12) => {
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, time)
    g.gain.linearRampToValueAtTime(vel, time + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0008, time + 1.6)
    g.connect(bus)
    for (const [mult, amp] of [[1, 1], [2.01, 0.28], [4.2, 0.08]]) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = freq * mult
      const og = ctx.createGain()
      og.gain.value = amp
      o.connect(og).connect(g)
      o.start(time)
      o.stop(time + 1.7)
    }
  }
  const step = rng.pick([0.36, 0.42, 0.5])
  let deg = rng.int(0, 4)
  for (let t = rng.range(0.1, 0.4); t < D - 0.8; t += step) {
    if (rng.chance(0.38)) continue
    deg += rng.pick([-2, -1, 1, 1, 2, 3, -3])
    deg = Math.max(-2, Math.min(9, deg))
    pluck(t0 + t, midi(note(deg, 1)), rng.range(0.06, 0.12))
  }

  // dialog ding
  const ding = (time) => {
    for (const [f, d, v] of [[midi(note(4, 2)), 0, 0.12], [midi(note(7, 2)), 0.07, 0.1]]) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.setValueAtTime(0, time + d)
      g.gain.linearRampToValueAtTime(v, time + d + 0.01)
      g.gain.exponentialRampToValueAtTime(0.001, time + d + 0.9)
      o.connect(g).connect(bus)
      o.start(time + d)
      o.stop(time + d + 1)
    }
  }
  ding(t0 + plan.tPopup)

  // typing ticks
  const tick = noiseBuffer(ctx, 0.03, 'tick')
  for (const tt of plan.typeTimes) {
    const s = ctx.createBufferSource()
    s.buffer = tick
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 2500 + rng.range(-400, 400)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.05, t0 + tt)
    g.gain.exponentialRampToValueAtTime(0.001, t0 + tt + 0.025)
    s.connect(hp).connect(g).connect(master)
    s.start(t0 + tt)
  }

  // close blip + glyph pop
  const sweep = (time, f0, f1, dur, v, type = 'sine') => {
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.setValueAtTime(f0, time)
    o.frequency.exponentialRampToValueAtTime(f1, time + dur)
    const g = ctx.createGain()
    g.gain.setValueAtTime(v, time)
    g.gain.exponentialRampToValueAtTime(0.001, time + dur + 0.15)
    o.connect(g).connect(bus)
    o.start(time)
    o.stop(time + dur + 0.2)
  }
  sweep(t0 + plan.tClose, 900, 300, 0.08, 0.05, 'square')
  sweep(t0 + plan.tGlyph, 260, 980, 0.14, 0.2)
  sweep(t0 + plan.tGlyph + 0.06, 520, 1960, 0.1, 0.06)
}

export async function renderSoundtrackOffline(plan, sampleRate = 44100) {
  const ctx = new OfflineAudioContext(2, Math.ceil(plan.duration * sampleRate), sampleRate)
  scheduleSoundtrack(ctx, ctx.destination, plan, 0)
  const buf = await ctx.startRendering()
  return encodeWav(buf)
}

function encodeWav(buf) {
  const ch = buf.numberOfChannels, len = buf.length, sr = buf.sampleRate
  const out = new DataView(new ArrayBuffer(44 + len * ch * 2))
  const w = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)))
  w(0, 'RIFF'); out.setUint32(4, 36 + len * ch * 2, true); w(8, 'WAVE'); w(12, 'fmt ')
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, ch, true)
  out.setUint32(24, sr, true); out.setUint32(28, sr * ch * 2, true); out.setUint16(32, ch * 2, true)
  out.setUint16(34, 16, true); w(36, 'data'); out.setUint32(40, len * ch * 2, true)
  const data = [...Array(ch).keys()].map((c) => buf.getChannelData(c))
  let o = 44
  for (let i = 0; i < len; i++) {
    for (let c = 0; c < ch; c++) {
      const s = Math.max(-1, Math.min(1, data[c][i]))
      out.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true)
      o += 2
    }
  }
  return new Uint8Array(out.buffer)
}
