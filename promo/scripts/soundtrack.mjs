// Procedural score + sound design → promo/out/soundtrack.wav (48 kHz stereo).
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CUES } from '../src/cues.js'
import { birthTypedAt } from '../src/scenes/s4-birth.js'
import { rng } from '../src/lib.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const SR = 48000, DUR = 30, N = SR * DUR
const L = new Float32Array(N), R = new Float32Array(N)
const send = new Float32Array(N) // reverb send (mono)
const rand = rng(1234)
const noise = () => rand() * 2 - 1

const add = (i, l, r = l, rev = 0) => { if (i >= 0 && i < N) { L[i] += l; R[i] += r; send[i] += (l + r) * 0.5 * rev } }

// ── pad: detuned saws through a slowly opening low-pass, per section
for (const [s0, s1, chord] of CUES.sections) {
  const i0 = Math.floor(s0 * SR), i1 = Math.min(N, Math.floor((s1 + 0.9) * SR))
  chord.forEach((f, v) => {
    const voices = [0.996, 1.004]
    let lp = 0
    const pan = (v / (chord.length - 1)) * 1.2 - 0.6
    const ph = voices.map(() => rand())
    for (let i = i0; i < i1; i++) {
      const t = (i - i0) / SR, len = s1 - s0
      const env = Math.min(1, t / 0.6) * Math.min(1, Math.max(0, (len + 0.9 - t) / 0.9))
      let x = 0
      voices.forEach((d, k) => { ph[k] += (f * d) / SR; ph[k] -= Math.floor(ph[k]); x += ph[k] * 2 - 1 })
      const cutoff = 600 + 900 * Math.min(1, t / len) + 300 * Math.sin(t * 0.8 + v)
      const a = 1 - Math.exp((-2 * Math.PI * cutoff) / SR)
      lp += a * (x - lp)
      const g = 0.022 * env
      add(i, lp * g * (1 - pan) , lp * g * (1 + pan), 0.6)
    }
  })
}

// ── sub pulse on the beat (with pad ducking computed after)
const beat = 60 / CUES.bpm
const duck = new Float32Array(N).fill(1)
for (let t = CUES.beatFrom; t < CUES.beatTo; t += beat) {
  const i0 = Math.floor(t * SR)
  for (let k = 0; k < SR * 0.35; k++) {
    const tt = k / SR
    const f = 48 + 70 * Math.exp(-tt * 30)
    const v = Math.sin(2 * Math.PI * f * tt + 0) * Math.exp(-tt * 9) * 0.32
    add(i0 + k, v, v)
    if (i0 + k < N) duck[i0 + k] = Math.min(duck[i0 + k], 0.55 + 0.45 * Math.min(1, tt / 0.25))
  }
}
for (let i = 0; i < N; i++) { L[i] *= duck[i]; R[i] *= duck[i] } // gentle pump on everything so far

// ── hats from the reading scene on (offbeats)
for (let t = 14.05 + beat / 2; t < 26.8; t += beat) {
  const i0 = Math.floor(t * SR); let hp = 0, prev = 0
  for (let k = 0; k < SR * 0.05; k++) { const x = noise(); hp = 0.9 * (hp + x - prev); prev = x; const v = hp * Math.exp(-k / SR * 90) * 0.05; add(i0 + k, v * 0.8, v) }
}

// ── one-shots
function tick(t, gain = 0.08) {
  const i0 = Math.floor(t * SR); let hp = 0, prev = 0
  const pan = rand() * 0.6 - 0.3
  for (let k = 0; k < SR * 0.03; k++) {
    const x = noise(); hp = 0.6 * (hp + x - prev); prev = x
    const v = (hp * 0.7 + Math.sin(2 * Math.PI * 2400 * k / SR) * 0.3) * Math.exp(-k / SR * 260) * gain
    add(i0 + k, v * (1 - pan), v * (1 + pan), 0.1)
  }
}
function whoosh(t, len = 0.55, gain = 0.16) {
  const i0 = Math.floor((t - len * 0.6) * SR); let bp1 = 0, bp2 = 0
  for (let k = 0; k < SR * len; k++) {
    const p = k / (SR * len)
    const f = 300 + 3200 * Math.sin(Math.PI * p) ** 2
    const w = 2 * Math.PI * f / SR, q = 0.35
    const x = noise()
    bp1 += w * (x - bp1 - q * bp2); bp2 += w * bp1
    const env = Math.sin(Math.PI * p) ** 2
    add(i0 + k, bp2 * env * gain * (1 - p * 0.6), bp2 * env * gain * (0.4 + p * 0.6), 0.3)
  }
}
function bell(t, f, gain = 0.1, decay = 2.2, pan = 0) {
  const i0 = Math.floor(t * SR)
  const parts = [[1, 1], [2.01, 0.45], [3.0, 0.22], [4.17, 0.12], [5.43, 0.06]]
  for (let k = 0; k < SR * decay * 1.5; k++) {
    const tt = k / SR; let v = 0
    for (const [m, a] of parts) v += Math.sin(2 * Math.PI * f * m * tt) * a * Math.exp(-tt * (1.6 + m) / decay)
    v *= gain * Math.min(1, tt / 0.004)
    add(i0 + k, v * (1 - pan), v * (1 + pan), 0.7)
  }
}
function boom(t, gain = 0.45) {
  const i0 = Math.floor(t * SR); let lp = 0
  for (let k = 0; k < SR * 1.6; k++) {
    const tt = k / SR
    const f = 38 + 60 * Math.exp(-tt * 12)
    lp += 0.02 * (noise() - lp)
    const v = (Math.sin(2 * Math.PI * f * tt) + lp * 2) * Math.exp(-tt * 3) * gain
    add(i0 + k, v, v, 0.4)
  }
}
function glitter(t0, t1) {
  const r = rng(Math.floor(t0 * 100))
  for (let t = t0; t < t1; t += 0.018 + r() * 0.02) bell(t, [1318.5, 1567.98, 1760, 2093, 2349.3][Math.floor(r() * 5)], 0.012, 0.25, r() * 1.6 - 0.8)
}

const s1 = CUES.typeS1;[...s1.text].forEach((c, i) => c !== ' ' && tick(s1.start + i * s1.perChar, 0.05))
const s7 = CUES.typeS7;[...s7.text].forEach((c, i) => c !== ' ' && tick(s7.start + i * s7.perChar, 0.04))
birthTypedAt().forEach(t => tick(t, 0.09))
CUES.whoosh.forEach(t => whoosh(t))
;(CUES.whooshS7 || []).forEach(t => whoosh(t, 0.45, 0.11))
;(CUES.whip || []).forEach(t => whoosh(t + 0.32, 0.5, 0.13))
CUES.pixels.forEach(([a, b]) => glitter(a, b))
// digital glitch bursts: bit-crushed noise chatter
;(CUES.glitch || []).forEach(([a, b]) => {
  const r = rng(Math.floor(a * 1000)); let hold = 0, v = 0
  for (let i = Math.floor(a * SR); i < Math.floor(b * SR); i++) {
    if (hold-- <= 0) { hold = 40 + Math.floor(r() * 400); v = (r() * 2 - 1) * 0.06 }
    add(i, v, -v * 0.8, 0.05)
  }
})
CUES.pops.forEach((t, i) => bell(t, [880, 987.77, 1108.73, 1318.51][i % 4], 0.05, 0.5, (i % 2 ? 0.3 : -0.3)))
CUES.boom.forEach(t => boom(t))
;(CUES.mystery ? [CUES.mystery] : []).forEach(m => {
  m.pops.forEach((t, i) => bell(t, [659.25, 987.77][i], 0.04, 1.0))
  whoosh(m.lift + 0.6, 1.0, 0.09)              // the veil rising
  glitter(m.peak - 0.05, m.peak + 0.35)         // sparkle burst at the peak
  bell(m.peak, 1318.51, 0.05, 2.0); bell(m.peak + 0.06, 1975.53, 0.035, 2.0)
})
;(CUES.cardIn || []).forEach(t => { bell(t, 739.99, 0.06, 1.6, -0.2); bell(t + 0.09, 1108.73, 0.05, 1.6, 0.2) })
CUES.click.forEach(t => { tick(t, 0.25); bell(t + 0.01, 1760, 0.04, 0.3) })
CUES.deal.forEach(t => { tick(t + 0.25, 0.07); whoosh(t + 0.15, 0.22, 0.06) })
CUES.tuck.forEach(t => tick(t + 0.2, 0.03))
;(CUES.stamp || []).forEach(t => { boom(t, 0.12); bell(t + 0.05, 880, 0.05, 1.4); bell(t + 0.12, 1318.51, 0.04, 1.4) })
;(CUES.sign || []).forEach(t => whoosh(t + 0.25, 0.4, 0.07))
// foil sweep: rising shimmer of high bells
CUES.foil.forEach(t0 => { for (let k = 0; k < 9; k++) bell(t0 + k * 0.07, [1174.66, 1318.51, 1479.98, 1760, 1975.53, 2349.32, 2637.02, 2959.96, 3520][k], 0.022, 0.6, k / 4 - 1) })
CUES.land.forEach((t, i) => { boom(t, 0.2); bell(t, [587.33, 659.25][i % 2], 0.06, 1.2) })
;(CUES.captions || []).forEach(t => bell(t, 1174.66, 0.035, 0.8))
const chime = [293.66, 369.99, 440, 554.37, 587.33, 739.99, 880]
;(CUES.pulse || []).forEach(t => { bell(t, 293.66, 0.05, 2.5); bell(t + 0.02, 880, 0.03, 2.5) })
for (let i = 0; i < CUES.chimes.count; i++) bell(CUES.chimes.start + i * CUES.chimes.step, chime[i], 0.07, 2.4, (i - 3) * 0.12)

// ── Schroeder reverb on the send
const combs = [1557, 1617, 1491, 1422].map(d => ({ d, buf: new Float32Array(d), i: 0, fb: 0.84 }))
const aps = [225, 556].map(d => ({ d, buf: new Float32Array(d), i: 0 }))
for (let n = 0; n < N; n++) {
  const x = send[n] * 0.25; let y = 0
  for (const c of combs) { const o = c.buf[c.i]; c.buf[c.i] = x + o * c.fb; c.i = (c.i + 1) % c.d; y += o }
  for (const a of aps) { const o = a.buf[a.i]; const v = y + o * 0.5; a.buf[a.i] = v; a.i = (a.i + 1) % a.d; y = o - v * 0.5 }
  L[n] += y * 0.9; R[n] += y * 0.85
}

// ── master: fade out, soft clip, normalize
let peak = 0
for (let n = 0; n < N; n++) {
  const t = n / SR
  const fade = Math.min(1, t / 0.15) * Math.min(1, Math.max(0, (29.95 - t) / 0.9))
  L[n] = Math.tanh(L[n] * 1.2 * fade); R[n] = Math.tanh(R[n] * 1.2 * fade)
  peak = Math.max(peak, Math.abs(L[n]), Math.abs(R[n]))
}
const g = 0.89 / peak
const buf = Buffer.alloc(44 + N * 4)
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8)
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24)
buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40)
for (let n = 0; n < N; n++) { buf.writeInt16LE(Math.round(L[n] * g * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(R[n] * g * 32767), 46 + n * 4) }
mkdirSync(path.join(here, '../out'), { recursive: true })
writeFileSync(path.join(here, '../out/soundtrack.wav'), buf)
console.log('soundtrack → promo/out/soundtrack.wav  peak', peak.toFixed(2))
