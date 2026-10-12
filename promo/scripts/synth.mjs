// Small procedural synth used by the teaser sound engine (same palette as the main film's score).
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { rng } from '../src/lib.js'

export function createMix(DUR, SR = 48000) {
  const N = Math.round(SR * DUR)
  const L = new Float32Array(N), R = new Float32Array(N), send = new Float32Array(N)
  const rand = rng(1234), noise = () => rand() * 2 - 1
  const add = (i, l, r = l, rev = 0) => { if (i >= 0 && i < N) { L[i] += l; R[i] += r; send[i] += (l + r) * 0.5 * rev } }

  function pad(chords, gain = 0.022) {
    for (const [s0, s1, chord] of chords) {
      const i0 = Math.floor(s0 * SR), i1 = Math.min(N, Math.floor((s1 + 0.9) * SR))
      chord.forEach((f, v) => {
        let lp = 0
        const pan = chord.length > 1 ? (v / (chord.length - 1)) * 1.2 - 0.6 : 0
        const ph = [rand(), rand()]
        for (let i = i0; i < i1; i++) {
          const t = (i - i0) / SR, len = s1 - s0
          const env = Math.min(1, t / 0.6) * Math.min(1, Math.max(0, (len + 0.9 - t) / 0.9))
          let x = 0
          ;[0.996, 1.004].forEach((d, k) => { ph[k] += (f * d) / SR; ph[k] -= Math.floor(ph[k]); x += ph[k] * 2 - 1 })
          const cutoff = 600 + 900 * Math.min(1, t / len) + 300 * Math.sin(t * 0.8 + v)
          lp += (1 - Math.exp((-2 * Math.PI * cutoff) / SR)) * (x - lp)
          add(i, lp * gain * env * (1 - pan), lp * gain * env * (1 + pan), 0.6)
        }
      })
    }
  }
  function pulse(from, to, bpm = 96, gain = 0.3) {
    const beat = 60 / bpm
    for (let t = from; t < to; t += beat) {
      const i0 = Math.floor(t * SR)
      for (let k = 0; k < SR * 0.35; k++) { const tt = k / SR, f = 48 + 70 * Math.exp(-tt * 30), v = Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 9) * gain; add(i0 + k, v, v) }
    }
  }
  function tick(t, gain = 0.08) {
    const i0 = Math.floor(t * SR); let hp = 0, prev = 0; const pan = rand() * 0.6 - 0.3
    for (let k = 0; k < SR * 0.03; k++) { const x = noise(); hp = 0.6 * (hp + x - prev); prev = x; const v = (hp * 0.7 + Math.sin(2 * Math.PI * 2400 * k / SR) * 0.3) * Math.exp(-k / SR * 260) * gain; add(i0 + k, v * (1 - pan), v * (1 + pan), 0.1) }
  }
  function whoosh(t, len = 0.55, gain = 0.16) {
    const i0 = Math.floor((t - len * 0.6) * SR); let b1 = 0, b2 = 0
    for (let k = 0; k < SR * len; k++) { const p = k / (SR * len), f = 300 + 3200 * Math.sin(Math.PI * p) ** 2, w = 2 * Math.PI * f / SR, x = noise(); b1 += w * (x - b1 - 0.35 * b2); b2 += w * b1; const env = Math.sin(Math.PI * p) ** 2; add(i0 + k, b2 * env * gain * (1 - p * 0.6), b2 * env * gain * (0.4 + p * 0.6), 0.3) }
  }
  function bell(t, f, gain = 0.1, decay = 2.2, pan = 0) {
    const i0 = Math.floor(t * SR), parts = [[1, 1], [2.01, 0.45], [3.0, 0.22], [4.17, 0.12], [5.43, 0.06]]
    for (let k = 0; k < SR * decay * 1.5; k++) { const tt = k / SR; let v = 0; for (const [m, a] of parts) v += Math.sin(2 * Math.PI * f * m * tt) * a * Math.exp(-tt * (1.6 + m) / decay); v *= gain * Math.min(1, tt / 0.004); add(i0 + k, v * (1 - pan), v * (1 + pan), 0.7) }
  }
  function boom(t, gain = 0.45) {
    const i0 = Math.floor(t * SR); let lp = 0
    for (let k = 0; k < SR * 1.6; k++) { const tt = k / SR, f = 38 + 60 * Math.exp(-tt * 12); lp += 0.02 * (noise() - lp); const v = (Math.sin(2 * Math.PI * f * tt) + lp * 2) * Math.exp(-tt * 3) * gain; add(i0 + k, v, v, 0.4) }
  }
  function glitter(t0, t1) {
    const r = rng(Math.floor(t0 * 100))
    for (let t = t0; t < t1; t += 0.018 + r() * 0.02) bell(t, [1318.5, 1567.98, 1760, 2093, 2349.3][Math.floor(r() * 5)], 0.012, 0.25, r() * 1.6 - 0.8)
  }
  function riser(t0, t1, gain = 0.1) {
    const i0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); let b1 = 0, b2 = 0
    for (let k = 0; k < n; k++) { const p = k / n, f = 200 + 4000 * p * p, w = 2 * Math.PI * f / SR, x = noise(); b1 += w * (x - b1 - 0.3 * b2); b2 += w * b1; const v = b2 * gain * p * p; add(i0 + k, v, v, 0.3) }
  }
  function render(file) {
    const combs = [1557, 1617, 1491, 1422].map(d => ({ d, buf: new Float32Array(d), i: 0 })), aps = [225, 556].map(d => ({ d, buf: new Float32Array(d), i: 0 }))
    for (let n = 0; n < N; n++) {
      const x = send[n] * 0.25; let y = 0
      for (const c of combs) { const o = c.buf[c.i]; c.buf[c.i] = x + o * 0.84; c.i = (c.i + 1) % c.d; y += o }
      for (const a of aps) { const o = a.buf[a.i], v = y + o * 0.5; a.buf[a.i] = v; a.i = (a.i + 1) % a.d; y = o - v * 0.5 }
      L[n] += y * 0.9; R[n] += y * 0.85
    }
    let peak = 0
    for (let n = 0; n < N; n++) { const t = n / SR, fade = Math.min(1, t / 0.08) * Math.min(1, Math.max(0, (DUR - 0.05 - t) / 0.6)); L[n] = Math.tanh(L[n] * 1.2 * fade); R[n] = Math.tanh(R[n] * 1.2 * fade); peak = Math.max(peak, Math.abs(L[n]), Math.abs(R[n])) }
    const g = 0.89 / (peak || 1), buf = Buffer.alloc(44 + N * 4)
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40)
    for (let n = 0; n < N; n++) { buf.writeInt16LE(Math.round(L[n] * g * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(R[n] * g * 32767), 46 + n * 4) }
    mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, buf)
  }
  return { pad, pulse, tick, whoosh, bell, boom, glitter, riser, render }
}
