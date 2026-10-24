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
  // bubbly pitched blip (playful UI pop)
  function pop(t, f = 880, gain = 0.06, pan = 0) {
    const i0 = Math.floor(t * SR); let ph = 0
    for (let k = 0; k < SR * 0.16; k++) { const tt = k / SR, ff = f * (0.55 + 0.45 * Math.min(1, tt / 0.03)); ph += ff / SR; const v = Math.sin(2 * Math.PI * ph) * Math.exp(-tt * 28) * gain * Math.min(1, tt / 0.002); add(i0 + k, v * (1 - pan), v * (1 + pan), 0.25) }
  }
  // soft plucked note
  function pluck(t, f, gain = 0.05, decay = 0.45, pan = 0) {
    const i0 = Math.floor(t * SR)
    for (let k = 0; k < SR * decay * 2; k++) { const tt = k / SR, e = Math.exp(-tt / decay * 2.2) * Math.min(1, tt / 0.003); const v = (Math.sin(2 * Math.PI * f * tt) + 0.35 * Math.sin(4 * Math.PI * f * tt) * Math.exp(-tt * 8)) * e * gain; add(i0 + k, v * (1 - pan), v * (1 + pan), 0.35) }
  }
  // 8th-note arpeggio over chords [[s0, s1, freqs]] between from..to
  function arp(chords, bpm, from, to, gain = 0.04) {
    const step = 30 / bpm; let n = 0
    for (let t = from; t < to; t += step, n++) {
      const c = chords.find(([a, b]) => t >= a && t < b); if (!c) continue
      const tones = c[2].filter(f => f >= 180).map(f => f * 2), pat = [0, 1, 2, 3, 2, 1, 3, 4]
      pluck(t, tones[pat[n % 8] % tones.length], gain * (n % 2 ? 0.7 : 1), 0.4, ((n % 4) - 1.5) * 0.25)
    }
  }
  function renderLoop(file, loop) {
    // caller schedules events across [0, 2*loop); output keeps [loop, 2*loop) with no fades → seamless
    render(file, { from: loop, to: 2 * loop, fades: false })
  }
  function render(file, { from = 0, to = DUR, fades = true } = {}) {
    const combs = [1557, 1617, 1491, 1422].map(d => ({ d, buf: new Float32Array(d), i: 0 })), aps = [225, 556].map(d => ({ d, buf: new Float32Array(d), i: 0 }))
    for (let n = 0; n < N; n++) {
      const x = send[n] * 0.25; let y = 0
      for (const c of combs) { const o = c.buf[c.i]; c.buf[c.i] = x + o * 0.84; c.i = (c.i + 1) % c.d; y += o }
      for (const a of aps) { const o = a.buf[a.i], v = y + o * 0.5; a.buf[a.i] = v; a.i = (a.i + 1) % a.d; y = o - v * 0.5 }
      L[n] += y * 0.9; R[n] += y * 0.85
    }
    let peak = 0
    for (let n = 0; n < N; n++) { const t = n / SR, fade = fades ? Math.min(1, t / 0.08) * Math.min(1, Math.max(0, (DUR - 0.05 - t) / 0.6)) : 1; L[n] = Math.tanh(L[n] * 1.2 * fade); R[n] = Math.tanh(R[n] * 1.2 * fade); peak = Math.max(peak, Math.abs(L[n]), Math.abs(R[n])) }
    const i0 = Math.round(from * SR), i1 = Math.round(to * SR), M = i1 - i0
    const g = 0.89 / (peak || 1), buf = Buffer.alloc(44 + M * 4)
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + M * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(M * 4, 40)
    for (let n = 0; n < M; n++) { buf.writeInt16LE(Math.round(L[i0 + n] * g * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(R[i0 + n] * g * 32767), 46 + n * 4) }
    mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, buf)
  }
  function hats(from, to, bpm = 120, gain = 0.05) {
    const beat = 60 / bpm
    for (let t = from + beat / 2; t < to; t += beat) { const i0 = Math.floor(t * SR); let hp = 0, prev = 0; for (let k = 0; k < SR * 0.05; k++) { const x = noise(); hp = 0.9 * (hp + x - prev); prev = x; add(i0 + k, hp * Math.exp(-k / SR * 90) * gain * 0.8, hp * Math.exp(-k / SR * 90) * gain) } }
  }
  // ══════════════ v2 palette: the instruments and the mastering chain behind the style arranger (music.style) ══════════════
  // Nothing below runs unless it is called, so films that use only the functions above render bit-for-bit as before.
  // Music goes to named buses (drums / bass / pad / keys / lead / fx); each bus can be ducked under the kick, phased,
  // tape-wobbled, filtered and widened at render time, then the whole music mix sits under the SFX (the main L/R above).
  const mr = rng(97531), mnoise = () => mr() * 2 - 1, TAU = 2 * Math.PI
  const buses = {}, busCfg = {}, kicks = [], tapeStops = []
  let musicFade = null
  const bus = name => buses[name] || (buses[name] = { L: new Float32Array(N), R: new Float32Array(N), rev: null, dly: null })
  function out(b, i, l, r, rev = 0, dly = 0) {
    if (i < 0 || i >= N) return
    b.L[i] += l; b.R[i] += r
    if (rev) (b.rev || (b.rev = new Float32Array(N)))[i] += (l + r) * 0.5 * rev
    if (dly) (b.dly || (b.dly = new Float32Array(N)))[i] += (l + r) * 0.5 * dly
  }
  // TPT state-variable filter (mode 0 low-pass, 1 band-pass, 2 high-pass); coefficients cached while fc/q hold still
  function svf(mode = 0) {
    let ic1 = 0, ic2 = 0, k = 1.4, a1 = 0, a2 = 0, a3 = 0, lf = -1, lq = -1
    return (x, fc, q = 0.707) => {
      if (fc !== lf || q !== lq) { lf = fc; lq = q; const g = Math.tan(Math.PI * Math.min(Math.max(fc, 10), SR * 0.45) / SR); k = 1 / q; a1 = 1 / (1 + g * (g + k)); a2 = g * a1; a3 = g * a2 }
      const v3 = x - ic2, v1 = a1 * ic1 + a2 * v3, v2 = ic2 + a2 * ic1 + a3 * v3
      ic1 = 2 * v1 - ic1; ic2 = 2 * v2 - ic2
      return mode === 0 ? v2 : mode === 1 ? v1 : x - k * v1 - v2
    }
  }
  const q16 = (k, f) => (k & 15) === 0 ? f : null           // helper: refresh a filter cutoff every 16 samples
  const blep = (p, dt) => p < dt ? (p /= dt, p + p - p * p - 1) : p > 1 - dt ? (p = (p - 1) / dt, p * p + p + p + 1) : 0
  const sawOsc = (p, dt) => 2 * p - 1 - blep(p, dt)
  const pulseOsc = (p, dt, duty) => (p < duty ? 1 : -1) + blep(p, dt) - blep((p + 1 - duty) % 1, dt) + 1 - 2 * duty   // DC-free
  function adsr(tt, len, a, d, s, r) {
    const x = Math.min(tt, len), v = x < a ? x / a : s + (1 - s) * Math.exp(-(x - a) / d)
    return tt <= len ? v : v * Math.max(0, 1 - (tt - len) / r)
  }

  // ── drums
  function kick(t, { gain = 0.5, f0 = 50, f1 = 160, decay = 0.36, sweep = 32, click = 0.5, drive = 1.6, duck = true, rev = 0.03, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * decay * 2.3), nd = Math.tanh(drive); let ph = 0, lp = 0
    for (let k = 0; k < n; k++) {
      const tt = k / SR, f = f0 + (f1 - f0) * Math.exp(-tt * sweep); ph += f / SR
      lp += 0.3 * (mnoise() - lp)
      const body = Math.sin(TAU * ph) * Math.exp(-tt / decay * 2.2) * Math.min(1, tt / 0.0012) * Math.min(1, (n - k) / (SR * 0.01))
      const v = Math.tanh(drive * (body + lp * click * Math.exp(-tt * 420))) / nd * gain
      out(b, i0 + k, v, v, rev)
    }
    if (duck) kicks.push(t)
  }
  function snare(t, { gain = 0.28, tone = 185, snappy = 0.8, decay = 0.16, gated = 0, pan = 0, rev = 0.22, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), len = gated ? gated + 0.02 : decay * 4, n = Math.floor(SR * len), hp = svf(2), bp = svf(1), lpf = svf(0)
    let p1 = 0, p2 = 0
    for (let k = 0; k < n; k++) {
      const tt = k / SR
      p1 += tone * (1 + 0.5 * Math.exp(-tt * 60)) / SR; p2 += tone * 1.62 / SR
      const body = (Math.sin(TAU * p1) + 0.45 * Math.sin(TAU * p2)) * Math.exp(-tt * 26)
      const x = mnoise(), nz = hp(x, 1300, 0.7) * 0.7 + bp(x, 4200, 0.8) * 0.5
      let ne
      if (gated) { const tail = lpf(nz, 5200, 0.6); ne = (tt < gated ? (0.5 + 0.5 * Math.exp(-tt * 28)) * (1 - 0.4 * tt / gated) : Math.max(0, 1 - (tt - gated) / 0.012) * 0.3); const v = (body * 0.9 + (tt < 0.03 ? nz : tail) * snappy * ne) * gain; out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev); continue }
      ne = Math.exp(-tt / decay * 2.5)
      const v = (body * 0.8 + nz * snappy * ne) * gain * Math.min(1, tt / 0.0008)
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  const CLAP_O = [0, 0.011, 0.021]
  function clap(t, { gain = 0.24, pan = 0, rev = 0.3, tone = 1150, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * 0.4), f = svf(1), f2 = svf(2)
    for (let k = 0; k < n; k++) {
      const tt = k / SR; let e = 0
      for (const o of CLAP_O) if (tt >= o) e = Math.max(e, Math.exp(-(tt - o) * 190))
      if (tt >= 0.031) e = Math.max(e, 0.8 * Math.exp(-(tt - 0.031) * 15))
      const v = f2(f(mnoise(), tone, 1.1), 450, 0.7) * e * gain * 2.4
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  const HATF = [205.3, 304.4, 369.6, 522.7, 540, 800]
  function hat(t, { gain = 0.05, open = false, decay, pan = 0.25, tone = 1, rev = 0.06, bus: bn = 'drums' } = {}) {
    const d = decay ?? (open ? 0.3 : 0.045), b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * d * 3.2)
    const ph = HATF.map(() => mr()), hp = svf(2), bp = svf(1)
    for (let k = 0; k < n; k++) {
      const tt = k / SR; let m = 0
      for (let j = 0; j < 6; j++) { ph[j] += HATF[j] * tone * 2.3 / SR; ph[j] -= Math.floor(ph[j]); m += ph[j] < 0.5 ? 1 : -1 }
      const y = hp(bp(m / 6 * 0.6 + mnoise() * 0.5, 9000 * tone, 0.6), 6500 * tone, 0.7)
      const v = y * Math.exp(-tt / d * 2.3) * Math.min(1, tt / 0.0005) * Math.min(1, (n - k) / 200) * gain * 2
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  function crash(t, { gain = 0.06, len = 2.2, pan = 0.15, rev = 0.25, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * len), ph = HATF.map(() => mr()), hp = svf(2), hp2 = svf(2)
    for (let k = 0; k < n; k++) {
      const tt = k / SR; let m = 0
      for (let j = 0; j < 6; j++) { ph[j] += HATF[j] * 1.7 / SR; ph[j] -= Math.floor(ph[j]); m += ph[j] < 0.5 ? 1 : -1 }
      const y = hp(m / 6 * 0.4 + mnoise() * 0.7, 3800, 0.6)
      const v = hp2(y, 5000 * (1 - 0.3 * tt / len), 0.5) * Math.exp(-tt / len * 3.2) * Math.min(1, tt / 0.002) * Math.min(1, (n - k) / 800) * gain * 2
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  function shaker(t, { gain = 0.03, len = 0.08, pan = -0.3, rev = 0.05, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * len * 1.6), hp = svf(2), bp = svf(1)
    for (let k = 0; k < n; k++) {
      const tt = k / SR, e = tt < len * 0.3 ? tt / (len * 0.3) : Math.exp(-(tt - len * 0.3) / (len * 0.25))
      const v = hp(bp(mnoise(), 7500, 0.7), 4500, 0.7) * e * gain * 2
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  function brush(t, { gain = 0.03, len = 0.22, pan = 0.1, rev = 0.1, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * len * 1.5), bp = svf(1)
    for (let k = 0; k < n; k++) {
      const tt = k / SR, e = tt < len * 0.45 ? Math.sin(Math.PI / 2 * tt / (len * 0.45)) : Math.exp(-(tt - len * 0.45) / (len * 0.3))
      const v = bp(mnoise(), 3200 + 1500 * tt / len, 0.5) * e * gain * 2
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  function tom(t, f = 100, { gain = 0.32, decay = 0.38, pan = 0, rev = 0.3, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * decay * 2.4), lp = svf(0); let ph = 0
    for (let k = 0; k < n; k++) {
      const tt = k / SR; ph += f * (1 + 0.55 * Math.exp(-tt * 22)) / SR
      const v = Math.tanh(1.5 * (Math.sin(TAU * ph) * Math.exp(-tt / decay * 2.2) + lp(mnoise(), 1800, 0.7) * 0.4 * Math.exp(-tt * 45))) * gain * Math.min(1, (n - k) / 400)
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  function rim(t, { gain = 0.1, pan = -0.15, rev = 0.15, bus: bn = 'drums' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * 0.06), bp = svf(1)
    for (let k = 0; k < n; k++) {
      const tt = k / SR, v = (Math.sin(TAU * 1720 * tt) * 0.6 + Math.sin(TAU * 480 * tt) * 0.5 + bp(mnoise(), 2800, 1.5) * 0.5) * Math.exp(-tt * 110) * gain
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }
  // 808 sub with glide: pts = [[secondsAfterT, hz], …] bends the pitch (each bend glides over `glide` s)
  function sub808(t, f, len = 0.8, { gain = 0.38, pts = [], from, glide = 0.09, drive = 1.8, decay = 1.6, rev = 0, bus: bn = 'bass' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * (len + 0.08)), nd = Math.tanh(drive), path = [[0, f, from ?? f], ...pts.map(([a, g], j) => [a, g, j ? pts[j - 1][1] : f])]
    let ph = 0, seg = 0
    for (let k = 0; k < n; k++) {
      const tt = k / SR
      while (seg + 1 < path.length && tt >= path[seg + 1][0]) seg++
      const [a, to, fr] = path[seg], u = Math.min(1, (tt - a) / glide), fq = fr * (to / fr) ** (1 - (1 - u) * (1 - u))
      ph += fq / SR
      const env = Math.min(1, tt / 0.004) * Math.exp(-tt / decay) * (tt > len ? Math.max(0, 1 - (tt - len) / 0.07) : 1)
      const v = Math.tanh(drive * Math.sin(TAU * ph) * env) / nd * gain
      out(b, i0 + k, v, v, rev)
    }
  }

  // ── bass
  function bass(t, f, len, { gain = 0.2, type = 'warm', pan = 0, rev = 0.02, from, glide = 0.06, bright = 1, bus: bn = 'bass' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), rel = type === 'pluck' ? 0.04 : 0.06, n = Math.floor(SR * (len + rel)), flt = svf(0)
    let p = mr(), ps = 0, fc = 0
    for (let k = 0; k < n; k++) {
      const tt = k / SR, fq = from ? f * (from / f) ** Math.max(0, 1 - tt / glide) : f, dt = fq / SR
      p += dt; if (p >= 1) p -= 1; ps += dt
      let x, env, q = 0.8
      if (type === 'pluck') { x = pulseOsc(p, dt, 0.36) * 0.7 + Math.sin(TAU * ps) * 0.5; if ((k & 15) === 0) fc = (160 + 2400 * bright * Math.exp(-tt * 22)) ; q = 1.5; env = Math.exp(-tt * 4.2) }
      else if (type === 'finger') { x = Math.sin(TAU * ps) + 0.32 * Math.sin(2 * TAU * ps) + 0.14 * Math.sin(3 * TAU * ps) * Math.exp(-tt * 6) + mnoise() * 0.25 * Math.exp(-tt * 90); fc = 1400; env = adsr(tt, len, 0.004, 0.35, 0.35, 1) }
      else if (type === 'sub') { x = Math.sin(TAU * ps) + 0.1 * Math.sin(2 * TAU * ps); fc = 900; env = adsr(tt, len, 0.006, 0.6, 0.7, 1) }
      else { x = sawOsc(p, dt) * 0.55 + Math.sin(TAU * ps) * 0.6; if ((k & 15) === 0) fc = (240 + 900 * bright * Math.exp(-tt * 9)); env = adsr(tt, len, 0.006, 0.5, 0.6, 1) }
      const rl = tt > len ? Math.max(0, 1 - (tt - len) / rel) : 1
      const v = Math.tanh(1.3 * flt(x, fc, q)) * env * rl * gain
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev)
    }
  }

  // ── keys
  function epiano(t, freqs, len, { gain = 0.04, trem = 4.8, depth = 0.4, bright = 1, pan = 0, rev = 0.3, dly = 0, bus: bn = 'keys' } = {}) {
    const b = bus(bn)
    for (const f of [].concat(freqs)) {
      const i0 = Math.floor(t * SR), n = Math.floor(SR * (len + 0.25)), dec = 0.9 + 160 / f, w = TAU * f, tine = f * 7 < 9000
      for (let k = 0; k < n; k++) {
        const tt = k / SR, I = bright * (1.5 * Math.exp(-tt * 7) + 0.3)
        let x = Math.sin(w * tt + I * Math.sin(w * tt)); if (tine) x += Math.sin(w * 7 * tt) * 0.1 * Math.exp(-tt * 45)
        const env = Math.min(1, tt / 0.002) * Math.exp(-tt / dec) * (tt > len ? Math.max(0, 1 - (tt - len) / 0.25) : 1)
        const tr = depth * Math.sin(TAU * trem * (t + tt)) * 0.5, v = x * env * gain
        out(b, i0 + k, v * (1 - pan) * (1 + tr), v * (1 + pan) * (1 - tr), rev, dly)
      }
    }
  }
  function piano(t, freqs, len, { gain = 0.035, bright = 1, pan = 0, rev = 0.3, dly = 0, bus: bn = 'keys' } = {}) {
    const b = bus(bn)
    for (const f of [].concat(freqs)) {
      const i0 = Math.floor(t * SR), n = Math.floor(SR * (len + 0.3)), H = []
      for (let h = 1; h <= 8 && h * f < 7000; h++) H.push([TAU * f * h * Math.sqrt(1 + 0.0004 * h * h), bright ** (h - 1) / h ** 1.3, 0.7 + 0.55 * h + f / 600])
      const lp = svf(0)
      for (let k = 0; k < n; k++) {
        const tt = k / SR; let x = 0
        for (let j = 0; j < H.length; j++) { const [w, a, r] = H[j]; x += a * Math.exp(-tt * r) * (j < 2 ? (Math.sin(w * tt) + Math.sin(w * 1.0009 * tt)) * 0.5 : Math.sin(w * tt)) }
        x += lp(mnoise(), 2200, 0.7) * 0.25 * Math.exp(-tt * 220)
        const v = x * Math.min(1, tt / 0.0015) * (tt > len ? Math.max(0, 1 - (tt - len) / 0.3) : 1) * gain
        out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev, dly)
      }
    }
  }
  const DRAW = [[0.5, 0.5], [1, 1], [1.5, 0.3], [2, 0.6], [3, 0.28], [4, 0.22]]
  function organ(t, freqs, len, { gain = 0.025, perc = 0.45, leslie = 6, pan = 0, rev = 0.2, bus: bn = 'keys' } = {}) {
    const b = bus(bn)
    for (const f of [].concat(freqs)) {
      const i0 = Math.floor(t * SR), n = Math.floor(SR * (len + 0.05)), ph = DRAW.map(() => mr())
      let pp = 0
      for (let k = 0; k < n; k++) {
        const tt = k / SR, ls = Math.sin(TAU * leslie * (t + tt)), vib = 1 + 0.003 * ls; let x = 0
        for (let j = 0; j < DRAW.length; j++) { ph[j] += f * DRAW[j][0] * vib / SR; x += DRAW[j][1] * Math.sin(TAU * ph[j]) }
        pp += f * 3 / SR; x += perc * Math.sin(TAU * pp) * Math.exp(-tt * 9)
        const v = x * adsr(tt, len, 0.006, 0.2, 0.92, 0.04) * gain
        out(b, i0 + k, v * (1 - pan) * (1 + 0.22 * ls), v * (1 + pan) * (1 - 0.22 * ls), rev)
      }
    }
  }
  function clav(t, freqs, len, { gain = 0.03, pan = 0, rev = 0.08, dly = 0, bus: bn = 'keys' } = {}) {
    const b = bus(bn)
    for (const f of [].concat(freqs)) {
      const i0 = Math.floor(t * SR), n = Math.floor(SR * (len + 0.012)), bp = svf(1), hp = svf(2); let p = mr(), fc = 0
      for (let k = 0; k < n; k++) {
        const tt = k / SR, dt = f / SR; p += dt; if (p >= 1) p -= 1
        if ((k & 15) === 0) fc = 900 + 2600 * Math.exp(-tt * 22)
        const x = hp(bp(pulseOsc(p, dt, 0.22), fc, 2.2) * 1.4 + pulseOsc(p, dt, 0.22) * 0.25, 180, 0.7)
        const v = x * Math.exp(-tt * 6.5) * Math.min(1, tt / 0.0008) * (tt > len ? Math.max(0, 1 - (tt - len) / 0.012) : 1) * gain
        out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev, dly)
      }
    }
  }
  function brass(t, freqs, len, { gain = 0.03, bright = 1, pan = 0, rev = 0.22, dly = 0, bus: bn = 'keys' } = {}) {
    const b = bus(bn)
    for (const f of [].concat(freqs)) {
      const i0 = Math.floor(t * SR), n = Math.floor(SR * (len + 0.1)), ph = [mr(), mr(), mr()], dt3 = [0.996, 1, 1.005], flt = svf(0); let fc = 0
      for (let k = 0; k < n; k++) {
        const tt = k / SR, fq = f * (1 - 0.014 * Math.exp(-tt * 28)); let x = 0
        for (let j = 0; j < 3; j++) { const dt = fq * dt3[j] / SR; ph[j] += dt; if (ph[j] >= 1) ph[j] -= 1; x += sawOsc(ph[j], dt) }
        if ((k & 15) === 0) fc = (450 + 3200 * bright * Math.min(1, tt / 0.05)) * (0.5 + 0.5 * Math.exp(-tt * 3.5))
        const v = flt(x / 3, fc, 0.9) * adsr(tt, len, 0.02, 0.25, 0.7, 0.1) * gain * 1.6
        out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev, dly)
      }
    }
  }

  // ── leads, plucks, mallets
  function lead(t, f, len, { gain = 0.045, wave = 'saw', detune = 0.006, cutoff = 2400, env = 2200, envDecay = 7, q = 1.1, vib = 0.0045, vibRate = 5.4, from, glide = 0.07, attack = 0.008, decay = 0.5, sustain = 0.75, release = 0.12, duty = 0.5, pan = 0, rev = 0.25, dly = 0.2, bus: bn = 'lead' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * (len + release)), flt = svf(0); let p1 = mr(), p2 = mr(), fc = cutoff
    for (let k = 0; k < n; k++) {
      const tt = k / SR, vb = 1 + vib * Math.sin(TAU * vibRate * tt) * Math.min(1, Math.max(0, (tt - 0.18) / 0.25))
      const fq = (from ? f * (from / f) ** Math.max(0, 1 - tt / glide) : f) * vb
      const d1 = fq * (1 - detune) / SR, d2 = fq * (1 + detune) / SR
      p1 += d1; if (p1 >= 1) p1 -= 1; p2 += d2; if (p2 >= 1) p2 -= 1
      let x
      if (wave === 'square') x = (pulseOsc(p1, d1, duty) + pulseOsc(p2, d2, duty)) * 0.5
      else if (wave === 'tri') x = (1 - 4 * Math.abs(p1 - 0.5)) * 0.8 + (1 - 4 * Math.abs(p2 - 0.5)) * 0.2
      else if (wave === 'sine') x = Math.sin(TAU * p1) * 0.8 + Math.sin(TAU * p2) * 0.2
      else x = (sawOsc(p1, d1) + sawOsc(p2, d2)) * 0.5
      if ((k & 15) === 0) fc = cutoff + env * Math.exp(-tt * envDecay)
      const v = flt(x, fc, q) * adsr(tt, len, attack, decay, sustain, release) * gain
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev, dly)
    }
  }
  // 8-bit voice: square / pulse / 4-bit triangle / LFSR noise; arp cycles semitone offsets at 50 Hz, slide bends in semitones/s
  function chip(t, f, len, { gain = 0.035, wave = 'square', duty = 0.5, arp, slide = 0, vib = 0, decay = 0.3, sustain = 0.6, pan = 0, rev = 0.06, dly = 0.12, bus: bn = 'lead' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * (len + 0.02)); let p = 0, lp = 0, nz = 0, sh = 1, es = 0
    for (let k = 0; k < n; k++) {
      const tt = k / SR, semi = (arp ? arp[Math.floor(tt * 50) % arp.length] : 0) + slide * tt
      const fq = f * 2 ** (semi / 12) * (1 + vib * Math.sin(TAU * 6 * tt) * Math.min(1, tt / 0.3))
      p += fq / SR
      if (p >= 1) { p -= Math.floor(p); if (wave === 'noise') { sh = (sh * 1103515245 + 12345) >>> 0; nz = ((sh >>> 16) & 1) ? 1 : -1 } }
      let x = wave === 'tri' ? (Math.min(15, Math.floor((1 - 2 * Math.abs(p - 0.5) * 2 + 1) * 8)) - 7.5) / 7.5 : wave === 'noise' ? nz : (p < duty ? 1 : -1) + 1 - 2 * duty
      lp += 0.55 * (x - lp)
      es += (Math.round(adsr(tt, len, 0.002, decay, sustain, 0.02) * 15) / 15 - es) * 0.03   // 4-bit volume steps, de-clicked
      const v = lp * es * gain
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev, dly)
    }
  }
  function marimba(t, f, { gain = 0.06, decay = 0.5, pan = 0, rev = 0.22, dly = 0.08, bus: bn = 'lead' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), dec = decay * (0.6 + 120 / f), n = Math.floor(SR * dec * 3.5), w = TAU * f, hi = f * 9.2 < 16000
    for (let k = 0; k < n; k++) {
      const tt = k / SR
      let x = Math.sin(w * tt) * Math.exp(-tt / dec) + 0.28 * Math.sin(w * 3.93 * tt) * Math.exp(-tt / (dec * 0.22))
      if (hi) x += 0.06 * Math.sin(w * 9.2 * tt) * Math.exp(-tt * 70)
      x += mnoise() * 0.08 * Math.exp(-tt * 700)
      const v = x * Math.min(1, tt / 0.001) * gain
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev, dly)
    }
  }
  function fmbell(t, f, { gain = 0.045, decay = 1.8, ratio = 3.5, index = 2.2, pan = 0, rev = 0.45, dly = 0.22, bus: bn = 'lead' } = {}) {
    const b = bus(bn), i0 = Math.floor(t * SR), n = Math.floor(SR * decay * 2.2), w = TAU * f
    for (let k = 0; k < n; k++) {
      const tt = k / SR, I = index * Math.exp(-tt * 2 / decay)
      const x = Math.sin(w * tt + I * Math.sin(w * ratio * tt)) * Math.exp(-tt * 2.4 / decay) + 0.22 * Math.sin(2 * w * tt) * Math.exp(-tt * 5 / decay)
      const v = x * Math.min(1, tt / 0.0012) * Math.min(1, (n - k) / 600) * gain
      out(b, i0 + k, v * (1 - pan), v * (1 + pan), rev, dly)
    }
  }

  // ── pads
  function superpad(t0, t1, freqs, { gain = 0.014, voices = 5, detune = 0.011, cut0 = 600, cut1 = 2200, lfo = 0.12, q = 0.8, attack = 0.9, release = 1.2, width = 0.8, vib = 0, swell = 0, wave = 'saw', rev = 0.5, dly = 0, bus: bn = 'pad' } = {}) {
    const b = bus(bn), len = t1 - t0
    ;[].concat(freqs).forEach((f, ni) => {
      const i0 = Math.floor(t0 * SR), n = Math.floor(SR * (len + release)), ph = [], dts = [], pans = []
      for (let j = 0; j < voices; j++) { const u = voices > 1 ? j / (voices - 1) * 2 - 1 : 0; ph.push(mr()); dts.push(1 + detune * u * (0.7 + 0.3 * mr())); pans.push(width * u * (j % 2 ? -1 : 1)) }
      const fl = svf(0), fr = svf(0), g = gain / Math.sqrt(voices); let fc = cut0
      for (let k = 0; k < n; k++) {
        const tt = k / SR, vb = vib ? 1 + vib * Math.sin(TAU * 5.2 * tt + ni) : 1; let sl = 0, sr = 0
        for (let j = 0; j < voices; j++) {
          const dt = f * dts[j] * vb / SR; ph[j] += dt; if (ph[j] >= 1) ph[j] -= 1
          const x = wave === 'tri' ? 1 - 4 * Math.abs(ph[j] - 0.5) : sawOsc(ph[j], dt)
          sl += x * (1 - pans[j]); sr += x * (1 + pans[j])
        }
        if ((k & 31) === 0) fc = (cut0 + (cut1 - cut0) * (0.5 + 0.5 * Math.sin(TAU * lfo * (t0 + tt) + ni * 0.9))) * (swell ? 0.35 + 0.65 * Math.min(1, tt / (len * swell)) : 1)
        const env = Math.min(1, tt / attack) * (tt > len ? Math.max(0, 1 - (tt - len) / release) : 1), e2 = env * env * (3 - 2 * env)
        out(b, i0 + k, fl(sl, fc, q) * g * e2, fr(sr, fc, q) * g * e2, rev, dly)
      }
    })
  }
  const strings = (t0, t1, freqs, o = {}) => superpad(t0, t1, freqs, { voices: 3, detune: 0.0045, cut0: 1700, cut1: 2600, lfo: 0.07, vib: 0.0035, attack: 0.7, release: 1.0, width: 0.9, gain: 0.016, rev: 0.55, ...o })

  // ── texture & fx
  function vinyl(t0, t1, { gain = 0.02, rate = 7, bus: bn = 'fx' } = {}) {
    const b = bus(bn), i0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR), hiss = svf(0), rum = svf(0), pop = svf(1); let amp = 0
    for (let k = 0; k < n; k++) {
      const tt = k / SR, edge = Math.min(1, tt / 0.4, (n - k) / (SR * 0.4))
      if (mr() < rate / SR) amp = (mr() ** 3) * (mr() < 0.1 ? 1 : 0.35)
      const c = pop(amp * mnoise(), 3200, 1.2) * 3; amp *= 0.93
      const x = (hiss(mnoise(), 5000, 0.6) * 0.06 + rum(mnoise(), 90, 0.7) * 0.08 + c) * edge * gain
      out(b, i0 + k, x * (0.8 + 0.2 * mr()), x * (0.8 + 0.2 * mr()))
    }
  }
  // filtered-noise swell into a drop (a musical riser on the fx bus, ends hard at t1)
  function swell(t0, t1, { gain = 0.05, f0 = 400, f1 = 6000, rev = 0.3, bus: bn = 'fx' } = {}) {
    const b = bus(bn), i0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR), fl = svf(1), fr = svf(1); let fc = f0
    for (let k = 0; k < n; k++) {
      const p = k / n; if ((k & 31) === 0) fc = f0 * (f1 / f0) ** (p * p)
      const e = p ** 2.2 * gain * Math.min(1, (n - k) / (SR * 0.01))
      out(b, i0 + k, fl(mnoise(), fc, 1.4) * e, fr(mnoise(), fc, 1.4) * e, rev)
    }
  }
  // tape stop on the whole music mix: the pitch and speed sag to zero over [t, t + len]
  const tapeStop = (t, len = 0.5) => tapeStops.push([t, len])
  // per-bus processing: { gain, duck (0..1 under the kick), phaser {rate, mix}, wobble (ms of wow), lowpass (Hz), width, drive }
  const busFx = (name, cfg) => { busCfg[name] = { ...(busCfg[name] || {}), ...cfg } }
  const setMusicFade = (t0, t1) => { musicFade = [t0, t1] }

  function duckEnv() {
    const a = new Float32Array(N), att = Math.floor(SR * 0.006), tau = 0.13 * SR, len = Math.floor(SR * 0.42)
    for (const t of kicks) {
      const i0 = Math.floor(t * SR) - Math.floor(att / 2)
      for (let k = 0; k < len; k++) { const i = i0 + k; if (i < 0 || i >= N) continue; const v = k < att ? k / att : Math.exp(-(k - att) / tau); if (v > a[i]) a[i] = v }
    }
    return a
  }
  function phaser(L, R, { rate = 0.15, mix = 0.5, fb = 0.45, f0 = 250, f1 = 2600 } = {}) {
    ;[L, R].forEach((X, c) => {
      const s = [0, 0, 0, 0, 0, 0, 0, 0]; let a = 0, last = 0
      for (let n = 0; n < N; n++) {
        if ((n & 31) === 0) { const fc = f0 * (f1 / f0) ** (0.5 + 0.5 * Math.sin(TAU * rate * n / SR + c * 1.6)), w = Math.tan(Math.PI * fc / SR); a = (w - 1) / (w + 1) }
        let y = X[n] + fb * last
        for (let j = 0; j < 4; j++) { const x1 = s[2 * j], y1 = s[2 * j + 1], o = a * y + x1 - a * y1; s[2 * j] = y; s[2 * j + 1] = o; y = o }
        last = y; X[n] = X[n] * (1 - mix) + y * mix
      }
    })
  }
  function wobble(L, R, ms = 2.5) {
    const d = ms * SR / 1000
    ;[L, R].forEach(X => {
      const src = Float32Array.from(X)
      for (let n = 0; n < N; n++) {
        const t = n / SR, pos = n - (d + 2 + d * (0.65 * Math.sin(TAU * 0.55 * t) + 0.35 * Math.sin(TAU * 1.37 * t + 1.1))), i = Math.floor(pos), fr = pos - i
        X[n] = i >= 0 && i + 1 < N ? src[i] * (1 - fr) + src[i + 1] * fr : 0
      }
    })
  }
  function onePole(X, fc, hp = false) { const a = 1 - Math.exp(-TAU * fc / SR); let s = 0; for (let n = 0; n < N; n++) { s += a * (X[n] - s); X[n] = hp ? X[n] - s : s } }
  function freeverb(inp, { room = 0.84, damp = 0.3, pre = 0.02, hp = 180 } = {}) {
    const sc = SR / 44100, C = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], A = [556, 441, 341, 225]
    const x = new Float32Array(N), pd = Math.floor(pre * SR), ha = 1 - Math.exp(-TAU * hp / SR); let hs = 0
    for (let n = 0; n < N; n++) { const v = n >= pd ? inp[n - pd] : 0; hs += ha * (v - hs); x[n] = (v - hs) * 0.015 }
    const outs = [0, 23].map(sp => {
      const y = new Float32Array(N)
      const combs = C.map(d => ({ b: new Float32Array(Math.round((d + sp) * sc)), i: 0, f: 0 }))
      const aps = A.map(d => ({ b: new Float32Array(Math.round((d + sp) * sc)), i: 0 }))
      for (let n = 0; n < N; n++) {
        let s = 0
        for (const c of combs) { const o = c.b[c.i]; c.f = o * (1 - damp) + c.f * damp; c.b[c.i] = x[n] + c.f * room; if (++c.i >= c.b.length) c.i = 0; s += o }
        for (const a of aps) { const o = a.b[a.i]; a.b[a.i] = s + o * 0.5; if (++a.i >= a.b.length) a.i = 0; s = o - s }
        y[n] = s
      }
      return y
    })
    return outs
  }
  function pingpong(inp, { time = 0.4167, fb = 0.38, tone = 3200 } = {}) {
    const D = Math.round(time * SR), yl = new Float32Array(N), yr = new Float32Array(N), a = 1 - Math.exp(-TAU * tone / SR); let s1 = 0, s2 = 0
    for (let n = D; n < N; n++) { s1 += a * (inp[n - D] + fb * yr[n - D] - s1); yl[n] = s1; s2 += a * (yl[n - D] - s2); yr[n] = s2 }
    return [yl, yr]
  }
  // integrated loudness (ITU-R BS.1770 K-weighting, 400 ms blocks, absolute + relative gating), in LUFS
  function lufs(Ls, Rs) {
    const kw = X => {
      const y = new Float64Array(N); let x1 = 0, x2 = 0, y1 = 0, y2 = 0, z1 = 0, z2 = 0, w1 = 0, w2 = 0
      for (let n = 0; n < N; n++) {
        const x = X[n], s = 1.53512485958697 * x - 2.69169618940638 * x1 + 1.19839281085285 * x2 + 1.69065929318241 * y1 - 0.73248077421585 * y2
        x2 = x1; x1 = x; y2 = y1; y1 = s
        const h = s - 2 * z1 + z2 + 1.99004745483398 * w1 - 0.99007225036621 * w2
        z2 = z1; z1 = s; w2 = w1; w1 = h; y[n] = h * h
      }
      return y
    }
    const a = kw(Ls), b = kw(Rs), cum = new Float64Array(N + 1)
    for (let n = 0; n < N; n++) cum[n + 1] = cum[n] + a[n] + b[n]
    const blk = Math.round(0.4 * SR), hop = Math.round(0.1 * SR), z = []
    for (let s = 0; s + blk <= N; s += hop) z.push((cum[s + blk] - cum[s]) / blk)
    const L_ = v => -0.691 + 10 * Math.log10(v), g1 = z.filter(v => L_(v) > -70)
    if (!g1.length) return -70
    const rel = L_(g1.reduce((s, v) => s + v, 0) / g1.length) - 10, g2 = g1.filter(v => L_(v) > rel)
    return L_(g2.reduce((s, v) => s + v, 0) / g2.length)
  }
  // look-ahead peak limiter (gain never exceeds what keeps |x| ≤ ceil; 3 ms attack ramp, smooth release)
  function limit(L, R, ceil, rel = 0.08) {
    const w = Math.round(0.003 * SR), r = new Float32Array(N)
    for (let n = 0; n < N; n++) { const p = Math.max(Math.abs(L[n]), Math.abs(R[n])); r[n] = p > ceil ? ceil / p : 1 }
    const m = new Float32Array(N), dq = new Int32Array(N); let h = 0, tl = 0
    for (let n = N - 1; n >= 0; n--) { while (tl > h && r[dq[tl - 1]] >= r[n]) tl--; dq[tl++] = n; while (dq[h] > n + w) h++; m[n] = r[dq[h]] }
    let acc = w + 1, e = 1; const ra = 1 - Math.exp(-1 / (rel * SR))
    for (let n = 0; n < N; n++) {
      acc += m[n] - (n - w - 1 >= 0 ? m[n - w - 1] : 1); const s = n < w + 1 ? Math.min(m[n], acc / (w + 1)) : acc / (w + 1)
      e = Math.min(s, e + (1 - e) * ra); L[n] *= e; R[n] *= e
    }
  }
  // the v2 render: music buses (fx per bus, auto-balanced to `levels` (LU relative to each other), kick ducking) under
  // the SFX (music sits `musicRel` LU under them and dips where they land), one reverb + delay for everything, then
  // the loudness is normalised to `lufs` and peak-limited to `ceil`. Returns the measured stats.
  function renderMaster(file, { lufs: target = -15, ceil = 0.85, musicRel = -3, sfxDuck = 0.3, levels = {}, reverb = {}, delay = {}, from = 0, to = DUR, fades = true, log = false, stems = null } = {}) {
    const ML = new Float32Array(N), MR = new Float32Array(N), dk = kicks.length ? duckEnv() : null, info = {}
    let msend = null, mdsend = null
    for (const [name, B] of Object.entries(buses)) {
      const c = busCfg[name] || {}
      if (c.phaser) phaser(B.L, B.R, c.phaser)
      if (c.wobble) wobble(B.L, B.R, c.wobble)
      if (c.lowpass) { onePole(B.L, c.lowpass); onePole(B.R, c.lowpass) }
      if (c.highpass) { onePole(B.L, c.highpass, true); onePole(B.R, c.highpass, true) }
      const lb = lufs(B.L, B.R), g = (levels[name] != null && lb > -69 ? 10 ** ((levels[name] - lb) / 20) : 1) * (c.gain ?? 1)
      const depth = dk ? (c.duck || 0) : 0, wd = c.width ?? 1, dr = c.drive || 0, nd = dr ? Math.tanh(dr) : 1
      for (let n = 0; n < N; n++) {
        let l = B.L[n] * g, r = B.R[n] * g
        if (depth) { const d = 1 - depth * dk[n]; l *= d; r *= d }
        if (wd !== 1) { const mid = (l + r) * 0.5, sd = (l - r) * 0.5 * wd; l = mid + sd; r = mid - sd }
        if (dr) { l = Math.tanh(l * dr) / nd; r = Math.tanh(r * dr) / nd }
        ML[n] += l; MR[n] += r
      }
      if (B.rev) { msend = msend || new Float32Array(N); for (let n = 0; n < N; n++) msend[n] += B.rev[n] * g }
      if (B.dly) { mdsend = mdsend || new Float32Array(N); for (let n = 0; n < N; n++) mdsend[n] += B.dly[n] * g }
      if (log) info[name] = `${lb.toFixed(1)} → ${(lb + 20 * Math.log10(g)).toFixed(1)}`
    }
    // tape stops on the whole music mix (and the music's reverb/delay sends, so the tails fall with it)
    const warpers = [ML, MR, msend, mdsend].filter(Boolean)
    for (const [ts, len] of tapeStops) {
      const s0 = Math.floor(ts * SR), s1 = Math.min(N, Math.floor((ts + len) * SR))
      for (const X of warpers) { let p = s0; const src = X.slice(s0, s1); for (let n = s0; n < s1; n++) { const u = (n - s0) / (s1 - s0); p += (1 - u) ** 1.6; const q = p - s0, i = Math.floor(q), fr = q - i; X[n] = i + 1 < src.length ? (src[i] * (1 - fr) + src[i + 1] * fr) * (1 - u ** 3) : 0 } }
    }
    if (musicFade) {
      const [a, b] = musicFade
      for (let n = Math.floor(a * SR); n < N; n++) { const u = Math.min(1, (n / SR - a) / (b - a)), g = 0.5 + 0.5 * Math.cos(Math.PI * u); ML[n] *= g; MR[n] *= g; if (msend) msend[n] *= g; if (mdsend) mdsend[n] *= g }
    }
    // level the music against the SFX (dry K-weighted loudness), then duck it a little wherever an SFX lands
    const sfxL = lufs(L, R), musL = lufs(ML, MR), gm = sfxL > -69 && musL > -69 ? 10 ** ((sfxL + musicRel - musL) / 20) : 1
    const env = new Float32Array(N); { let e = 0; const at = 1 - Math.exp(-1 / (0.004 * SR)), rl = 1 - Math.exp(-1 / (0.22 * SR)); for (let n = 0; n < N; n++) { const x = Math.abs(L[n]) + Math.abs(R[n]); e += (x > e ? at : rl) * (x - e); env[n] = e } }
    let em = 0; for (let n = 0; n < N; n++) em = Math.max(em, env[n])
    const thr = em * 0.35 || 1
    const rin = new Float32Array(N); for (let n = 0; n < N; n++) rin[n] = send[n] + (msend ? msend[n] * gm : 0)
    const [rl, rr] = freeverb(rin, reverb), rw = reverb.wet ?? 3.2
    let dl = null, dr = null; if (mdsend) { const di = new Float32Array(N); for (let n = 0; n < N; n++) di[n] = mdsend[n] * gm; [dl, dr] = pingpong(di, delay) }
    const dw = delay.wet ?? 0.55
    const stem = stems ? { sL: Float32Array.from(L), sR: Float32Array.from(R), mL: new Float32Array(N), mR: new Float32Array(N) } : null
    for (let n = 0; n < N; n++) {
      const sd = 1 - sfxDuck * Math.min(1, env[n] / thr), g = gm * sd
      if (stem) { stem.mL[n] = ML[n] * g; stem.mR[n] = MR[n] * g }
      L[n] += ML[n] * g + rl[n] * rw + (dl ? dl[n] * dw * sd : 0); R[n] += MR[n] * g + rr[n] * rw + (dr ? dr[n] * dw * sd : 0)
    }
    onePole(L, 22, true); onePole(R, 22, true)
    if (fades) for (let n = 0; n < N; n++) { const t = n / SR, f = Math.min(1, t / 0.08) * Math.min(1, Math.max(0, (DUR - 0.05 - t) / 0.6)); L[n] *= f; R[n] *= f }
    // loudness: gain → limit → measure, twice (the limiter shaves a little)
    const L0 = Float32Array.from(L), R0 = Float32Array.from(R); let g = 10 ** ((target - lufs(L, R)) / 20), got = 0
    for (let it = 0; it < 3; it++) {
      for (let n = 0; n < N; n++) { L[n] = L0[n] * g; R[n] = R0[n] * g }
      limit(L, R, ceil); got = lufs(L, R)
      if (Math.abs(got - target) < 0.1) break
      g *= 10 ** ((target - got) / 20)
    }
    const wav = (f, A, B, k) => {
      const M = N, b = Buffer.alloc(44 + M * 4)
      b.write('RIFF', 0); b.writeUInt32LE(36 + M * 4, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(2, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 4, 28); b.writeUInt16LE(4, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(M * 4, 40)
      for (let n = 0; n < M; n++) { b.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(A[n] * k * 32767))), 44 + n * 4); b.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(B[n] * k * 32767))), 46 + n * 4) }
      mkdirSync(path.dirname(f), { recursive: true }); writeFileSync(f, b)
    }
    if (stem) { wav(stems + '-sfx.wav', stem.sL, stem.sR, g); wav(stems + '-music.wav', stem.mL, stem.mR, g) }
    let peak = 0; for (let n = 0; n < N; n++) { L[n] = Math.max(-ceil, Math.min(ceil, L[n])); R[n] = Math.max(-ceil, Math.min(ceil, R[n])); peak = Math.max(peak, Math.abs(L[n]), Math.abs(R[n])) }
    const i0 = Math.round(from * SR), i1 = Math.round(to * SR), M = i1 - i0, buf = Buffer.alloc(44 + M * 4)
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + M * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(M * 4, 40)
    for (let n = 0; n < M; n++) { buf.writeInt16LE(Math.round(L[i0 + n] * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(R[i0 + n] * 32767), 46 + n * 4) }
    mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, buf)
    return { lufs: got, peakDb: 20 * Math.log10(peak), sfxLufs: sfxL, musicLufs: musL, musicGainDb: 20 * Math.log10(gm), buses: info }
  }
  return {
    pad, pulse, hats, pop, pluck, arp, tick, whoosh, bell, boom, glitter, riser, render, renderLoop,
    // v2
    SR, kick, snare, clap, hat, crash, shaker, brush, tom, rim, sub808, bass, epiano, piano, organ, clav, brass, lead, chip, marimba, fmbell,
    superpad, strings, vinyl, swell, tapeStop, busFx, setMusicFade, renderMaster,
  }
}
