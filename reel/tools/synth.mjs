// Align synth kit: the instruments, reverb and master chain from tools/soundtrack.mjs, made reusable.
// Plain JS, no deps, deterministic (seeded PRNG). 48 kHz. Everything renders into Float32 buses owned
// by one `createSynth({ dur, seed })` instance, so several cues can be rendered in one process.
//   const s = createSynth({ dur: 15, seed: 1 })
//   s.kick(0); s.bowl(0, 62, 0.3) ...
//   s.processLead({ beat: 0.5 }); s.processPad(); s.processDrums(); s.reverb()
//   const { L, R } = s.master({ fadeOut: 0.3 }); writeWav(path, L, R)
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export const SR = 48000
export const TAU = Math.PI * 2

// ---------- utilities ----------
export function mulberry32(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
export const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12)
export const pan2 = (p) => { const a = (p + 1) * Math.PI / 4; return [Math.cos(a), Math.sin(a)] }
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x))

export class Biquad {
  constructor() { this.b0 = 1; this.b1 = 0; this.b2 = 0; this.a1 = 0; this.a2 = 0; this.x1 = 0; this.x2 = 0; this.y1 = 0; this.y2 = 0 }
  set(type, fc, Q = 0.707) {
    fc = clamp(fc, 10, SR * 0.45)
    const w = TAU * fc / SR, c = Math.cos(w), s = Math.sin(w), al = s / (2 * Q)
    let b0, b1, b2
    if (type === 'lp') { b0 = (1 - c) / 2; b1 = 1 - c; b2 = b0 }
    else if (type === 'hp') { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = b0 }
    else { b0 = al; b1 = 0; b2 = -al } // band-pass, 0 dB peak
    const a0 = 1 + al
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = -2 * c / a0; this.a2 = (1 - al) / a0
    return this
  }
  p(x) { const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2; this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y; return y }
}

// band-limited, softly rolled-off saw wavetables (warm by construction)
const TS = 4096
export function table(H, roll) {
  const t = new Float32Array(TS + 1)
  for (let n = 1; n <= H; n++) { const a = 1 / n / (1 + (n / roll) ** 2); for (let i = 0; i < TS; i++) t[i] += a * Math.sin(TAU * n * i / TS) }
  let m = 0; for (let i = 0; i < TS; i++) m = Math.max(m, Math.abs(t[i])); for (let i = 0; i < TS; i++) t[i] /= m
  t[TS] = t[0]; return t
}
export const PAD_T = table(20, 6), LEAD_T = table(18, 9)
export const osc = (tb, ph) => { const x = ph * TS, i = x | 0, f = x - i; return tb[i] + (tb[i + 1] - tb[i]) * f }

// ---------- reverb parts (stereo Freeverb) ----------
class Comb { constructor(n) { this.b = new Float32Array(n); this.i = 0; this.f = 0 } p(x, fb, dm) { const y = this.b[this.i]; this.f = y * (1 - dm) + this.f * dm; this.b[this.i] = x + this.f * fb; if (++this.i >= this.b.length) this.i = 0; return y } reset() { this.b.fill(0); this.f = 0 } }
class AP { constructor(n) { this.b = new Float32Array(n); this.i = 0 } p(x) { const bo = this.b[this.i], y = -x + bo; this.b[this.i] = x + bo * 0.5; if (++this.i >= this.b.length) this.i = 0; return y } reset() { this.b.fill(0) } }
const sc48 = SR / 44100
const mkRev = (sp) => ({ c: [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((n) => new Comb(Math.round((n + sp) * sc48))), a: [556, 441, 341, 225].map((n) => new AP(Math.round((n + sp) * sc48))) })

// ---------- the synth ----------
export function createSynth({ dur, seed = 0xa1167 }) {
  const DUR = dur
  const N = Math.round(SR * DUR)
  const rng = mulberry32(seed)
  const noise = () => rng() * 2 - 1
  const S = (t) => Math.max(0, Math.min(N, Math.round(t * SR)))
  const mk = () => new Float32Array(N)

  // buses
  const drL = mk(), drR = mk() // drums
  const bass = mk() // mono low end (808/sub/booms)
  const padL = mk(), padR = mk() // pad (lowpassed, ducked)
  const muL = mk(), muR = mk() // bowls, bells, plucks, tones
  const ldL = mk(), ldR = mk() // lead pre-delay
  const fxL = mk(), fxR = mk() // whooshes, risers, crashes
  const rvL = mk(), rvR = mk() // reverb send
  const sc = mk() // sidechain envelope from kicks
  let revOutL = null, revOutR = null

  function put(L, R, i, v, gl, gr, send) { if (i >= N) return; L[i] += v * gl; R[i] += v * gr; if (send) { rvL[i] += v * gl * send; rvR[i] += v * gr * send } }

  // ----- instruments (from soundtrack.mjs) -----
  const BOWL_PARTS = [[1, 1, 8], [2.756, 0.5, 5.2], [5.404, 0.26, 3.1], [8.933, 0.12, 1.9], [13.34, 0.05, 1.1]]
  function bowl(t0, midi, amp, pan = 0, send = 0.4, dec = 1) {
    const f0 = mtof(midi), i0 = S(t0), len = Math.min(N - i0, S(9 * dec))
    const [gl, gr] = pan2(pan)
    BOWL_PARTS.forEach(([r, pa, d], j) => {
      const f = f0 * r; if (f > 9000) return
      const beat = 0.5 + j * 0.85, w1 = TAU * f / SR, w2 = TAU * (f + beat) / SR, p1 = rng() * TAU, p2 = rng() * TAU, a = amp * pa, dd = d * dec
      for (let k = 0; k < len; k++) {
        const t = k / SR, e = (t < 0.006 ? t / 0.006 : 1) * Math.exp(-t / dd) * Math.min(1, (len - k) / 2000)
        const s1 = Math.sin(p1 + w1 * k), s2 = Math.sin(p2 + w2 * k), i = i0 + k
        const L = (0.68 * s1 + 0.32 * s2) * a * e, R = (0.32 * s1 + 0.68 * s2) * a * e
        muL[i] += L * gl * 1.41; muR[i] += R * gr * 1.41; rvL[i] += L * send; rvR[i] += R * send
      }
    })
    const bp = new Biquad().set('bp', f0 * 3, 1.2)
    for (let k = 0; k < S(0.03) && i0 + k < N; k++) { const t = k / SR, v = bp.p(noise()) * amp * 0.5 * Math.exp(-t / 0.006) * Math.min(1, k / 24); put(muL, muR, i0 + k, v, gl, gr, send) }
  }
  function reverseBowl(tEnd, dur, midi, amp, send = 0.25) {
    const f0 = mtof(midi), i1 = S(tEnd), i0 = S(tEnd - dur), len = i1 - i0
    BOWL_PARTS.forEach(([r, pa, d], j) => {
      const f = f0 * r; if (f > 9000) return
      const w1 = TAU * f / SR, w2 = TAU * (f + 0.7 + j) / SR, a = amp * pa
      for (let k = 0; k < len; k++) {
        const tau = (len - k) / SR, e = Math.exp(-tau / (d * 0.35)) * Math.min(1, (len - k) / 240) * Math.min(1, k / 2000)
        const i = i0 + k, s1 = Math.sin(w1 * k), s2 = Math.sin(w2 * k)
        muL[i] += s1 * a * e; muR[i] += s2 * a * e; rvL[i] += s1 * a * e * send; rvR[i] += s2 * a * e * send
      }
    })
  }
  function kick(t0, amp = 1, decay = 0.3, fEnd = 46, fStart = 150, click = 0.25) {
    const i0 = S(t0), len = Math.min(N - i0, S(decay * 6))
    let ph = 0
    for (let k = 0; k < len; k++) {
      const t = k / SR, f = fEnd + (fStart - fEnd) * Math.exp(-t / 0.032); ph += TAU * f / SR
      const e = (t < 0.0015 ? t / 0.0015 : 1) * Math.exp(-t / decay) * Math.min(1, (len - k) / 480)
      const v = Math.tanh((Math.sin(ph) * e + noise() * Math.exp(-t / 0.002) * click) * 1.8) * amp * 0.75
      const i = i0 + k; drL[i] += v; drR[i] += v
      const s = (t < 0.004 ? t / 0.004 : 1) * Math.exp(-t / 0.14) * Math.min(1, amp); if (s > sc[i]) sc[i] = s
    }
  }
  function clap(t0, amp = 0.3, pan = 0, send = 0.35, fc = 1300) {
    const i0 = S(t0), len = Math.min(N - i0, S(0.4)), bp = new Biquad().set('bp', fc, 0.8), [gl, gr] = pan2(pan)
    for (let k = 0; k < len; k++) {
      const t = k / SR
      let e = 0
      for (const o of [0, 0.01, 0.021]) if (t >= o) e = Math.max(e, Math.exp(-(t - o) / 0.005))
      if (t >= 0.021) e = Math.max(e, 0.55 * Math.exp(-(t - 0.021) / 0.085))
      e *= Math.min(1, k / 24) * Math.min(1, (len - k) / 240)
      put(drL, drR, i0 + k, bp.p(noise()) * e * amp * 2.2, gl, gr, send)
    }
  }
  function snare(t0, amp = 0.3, pan = 0, send = 0.3) {
    clap(t0, amp * 0.8, pan, send, 1700)
    const i0 = S(t0), len = Math.min(N - i0, S(0.15))
    for (let k = 0; k < len; k++) { const t = k / SR, v = Math.sin(TAU * (190 + 60 * Math.exp(-t / 0.01)) * t) * Math.exp(-t / 0.04) * amp * 0.6 * Math.min(1, k / 24); drL[i0 + k] += v; drR[i0 + k] += v }
  }
  function hat(t0, amp = 0.1, decay = 0.028, pan = 0, hpf = 6500, send = 0.12) {
    const i0 = S(t0), len = Math.min(N - i0, S(decay * 6)), hp = new Biquad().set('hp', hpf, 0.7), lp = new Biquad().set('lp', 11500, 0.6), [gl, gr] = pan2(pan)
    for (let k = 0; k < len; k++) { const t = k / SR, e = Math.min(1, k / 24) * Math.exp(-t / decay) * Math.min(1, (len - k) / 96); put(drL, drR, i0 + k, lp.p(hp.p(noise())) * e * amp * 2.5, gl, gr, send) }
  }
  function whoosh(tEnd, dur = 0.45, amp = 0.12, f0 = 350, f1 = 5000, dir = 1, bus = 'fx') {
    const i0 = S(tEnd - dur), i1 = S(tEnd), bpL = new Biquad(), bpR = new Biquad(), L = bus === 'fx' ? fxL : muL, R = bus === 'fx' ? fxR : muR
    for (let i = i0; i < i1; i++) {
      const p = (i - i0) / (i1 - i0)
      if (((i - i0) & 15) === 0) { const fc = f0 * Math.pow(f1 / f0, p); bpL.set('bp', fc, 1.4); bpR.set('bp', fc * 1.06, 1.4) }
      const e = p * p * Math.min(1, (i1 - i) / 240) * amp * 3, [gl, gr] = pan2(dir * (p * 1.2 - 0.6))
      const a = bpL.p(noise()) * e * gl * 1.41, b = bpR.p(noise()) * e * gr * 1.41
      L[i] += a; R[i] += b; rvL[i] += a * 0.3; rvR[i] += b * 0.3
    }
  }
  function impact(t0, amp = 1, tail = 0.7, crash = 1) {
    kick(t0, amp, 0.45, 40, 170)
    const i0 = S(t0)
    let ph = 0
    for (let k = 0; k < Math.min(N - i0, S(tail * 4)); k++) { const t = k / SR, f = 32 + 70 * Math.exp(-t / 0.09); ph += TAU * f / SR; bass[i0 + k] += Math.sin(ph) * Math.exp(-t / tail) * amp * 0.55 * Math.min(1, k / 48) * Math.min(1, (S(tail * 4) - k) / 960) }
    const hL = new Biquad().set('hp', 350), hR = new Biquad().set('hp', 350), lL = new Biquad().set('lp', 7000), lR = new Biquad().set('lp', 7000)
    const cl = Math.min(N - i0, S(tail * 5))
    for (let k = 0; k < cl; k++) {
      const t = k / SR, e = Math.min(1, k / 48) * Math.exp(-t / (tail * 0.6)) * amp * 0.35 * crash * Math.min(1, (cl - k) / 960), i = i0 + k
      const a = lL.p(hL.p(noise())) * e, b = lR.p(hR.p(noise())) * e
      fxL[i] += a; fxR[i] += b; rvL[i] += a * 0.8; rvR[i] += b * 0.8
    }
  }
  function cutHit(t0, amp = 0.5, fc = 2200) {
    const i0 = S(t0), bp = new Biquad().set('bp', fc, 1.5)
    for (let k = 0; k < Math.min(N - i0, S(0.2)); k++) {
      const t = k / SR, i = i0 + k, tail = Math.min(1, (S(0.2) - k) / 480)
      bass[i] += Math.sin(TAU * (55 + 60 * Math.exp(-t / 0.02)) * t) * Math.exp(-t / 0.06) * amp * 0.4 * Math.min(1, k / 48) * tail
      const v = bp.p(noise()) * Math.exp(-t / 0.012) * amp * 0.5 * Math.min(1, k / 24)
      fxL[i] += v; fxR[i] += v; rvL[i] += v * 0.4; rvR[i] += v * 0.4
    }
  }
  function padChord(t0, t1, notes, amp = 0.028, att = 0.35, rel = 0.7, spread = 0.8) {
    const i0 = S(t0), i1 = Math.min(N, S(t1 + rel)), held = (t1 - t0)
    for (const n of notes) for (const [c, p] of [[-9, -spread], [0, 0], [9, spread]]) {
      const inc = mtof(n) * Math.pow(2, c / 1200) / SR, [gl, gr] = pan2(p)
      let ph = rng()
      for (let i = i0; i < i1; i++) {
        const t = (i - i0) / SR
        let e = Math.min(1, t / att, (i1 - i) / 240); if (t > held) { const r = 1 - (t - held) / rel; e *= r > 0 ? r * r : 0 }
        const v = osc(PAD_T, ph) * amp * e; ph += inc; if (ph >= 1) ph -= 1
        padL[i] += v * gl; padR[i] += v * gr
      }
    }
  }
  function bassNote(t0, t1, midi, amp = 0.5, duck = 0.9) {
    const i0 = S(t0), i1 = S(t1), f = mtof(midi)
    let ph = 0
    for (let i = i0; i < i1; i++) {
      const k = i - i0, e = Math.min(1, k / 240) * Math.min(1, (i1 - i) / 720) * (0.75 + 0.25 * Math.exp(-k / SR / 0.15))
      ph += TAU * f / SR
      bass[i] += Math.tanh((Math.sin(ph) + 0.18 * Math.sin(2 * ph)) * 1.4) * amp * e * (1 - duck * sc[i])
    }
  }
  function lead(t0, midi, amp = 0.07, pan = 0, decay = 0.13) {
    const i0 = S(t0), len = Math.min(N - i0, S(Math.max(0.5, decay * 4))), f = mtof(midi), [gl, gr] = pan2(pan)
    let ph = rng()
    for (let k = 0; k < len; k++) {
      const t = k / SR, e = Math.min(1, k / 96) * Math.exp(-t / decay) * Math.min(1, (len - k) / 480)
      const v = (osc(LEAD_T, ph) + 0.35 * Math.sin(TAU * 2 * f * t)) * amp * e
      ph += f / SR; if (ph >= 1) ph -= 1
      ldL[i0 + k] += v * gl; ldR[i0 + k] += v * gr
    }
  }

  // ----- new voices for the teasers -----
  // sine sub, pure and mono
  function sub(t0, t1, midi, amp = 0.3, duck = 0.6, att = 0.02, curve = 1) {
    const i0 = S(t0), i1 = S(t1), f = mtof(midi), A = Math.max(1, S(att))
    for (let i = i0; i < i1; i++) { const k = i - i0, e = Math.min(1, k / A) ** curve * Math.min(1, (i1 - i) / 1440); bass[i] += Math.sin(TAU * f * k / SR) * amp * e * (1 - duck * sc[i]) }
  }
  // FM bell / glass drip
  function bell(t0, midi, amp = 0.05, pan = 0, send = 0.5, dec = 1.2, ratio = 3.5, index = 2.2) {
    const i0 = S(t0), len = Math.min(N - i0, S(dec * 5)), f = mtof(midi), [gl, gr] = pan2(pan)
    const p0 = rng() * TAU
    for (let k = 0; k < len; k++) {
      const t = k / SR, e = (t < 0.002 ? t / 0.002 : 1) * Math.exp(-t / dec) * Math.min(1, (len - k) / 480), ie = index * Math.exp(-t / (dec * 0.25))
      const v = (Math.sin(p0 + TAU * f * t + ie * Math.sin(TAU * f * ratio * t)) * e + 0.25 * Math.sin(TAU * f * 2 * t) * e * Math.exp(-t / (dec * 0.4))) * amp
      put(muL, muR, i0 + k, v, gl * 1.41, gr * 1.41, send)
    }
  }
  // soft subtractive pluck (saw through a closing low-pass)
  function pluck(t0, midi, amp = 0.06, pan = 0, send = 0.3, bright = 1, dec = 0.35) {
    const i0 = S(t0), len = Math.min(N - i0, S(dec * 5)), f = mtof(midi), [gl, gr] = pan2(pan), lp = new Biquad()
    let ph = rng()
    for (let k = 0; k < len; k++) {
      const t = k / SR
      if ((k & 15) === 0) lp.set('lp', 400 + 5200 * bright * Math.exp(-t / 0.08), 0.9)
      const e = Math.min(1, k / 48) * Math.exp(-t / dec) * Math.min(1, (len - k) / 480)
      const v = lp.p(osc(LEAD_T, ph) * 0.8 + 0.4 * Math.sin(TAU * ph)) * amp * e
      ph += f / SR; if (ph >= 1) ph -= 1
      put(muL, muR, i0 + k, v, gl * 1.41, gr * 1.41, send)
    }
  }
  // flute-ish sine lead with breath and delayed vibrato (goes through the lead delay)
  function flute(t0, t1, midi, amp = 0.06, pan = 0, vib = 0.006) {
    const i0 = S(t0), i1 = Math.min(N, S(t1)), rel = S(0.12), end = Math.min(N, i1 + rel), f = mtof(midi), [gl, gr] = pan2(pan), bp = new Biquad().set('bp', f * 2, 2)
    let ph = rng() * TAU
    for (let i = i0; i < end; i++) {
      const t = (i - i0) / SR
      let e = Math.min(1, t / 0.07); if (i >= i1) { const r = 1 - (i - i1) / rel; e *= r * r }
      ph += TAU * f * (1 + vib * clamp((t - 0.15) / 0.3, 0, 1) * Math.sin(TAU * 5.2 * t)) / SR
      const v = (Math.sin(ph) + 0.12 * Math.sin(2 * ph) + 0.04 * Math.sin(3 * ph) + bp.p(noise()) * 0.3 * (0.4 + 0.6 * Math.exp(-t / 0.08))) * amp * e
      ldL[i] += v * gl; ldR[i] += v * gr
    }
  }
  // clock tick: a short resonant click
  function tick(t0, amp = 0.08, f = 3200, pan = 0, send = 0.1) {
    const i0 = S(t0), len = Math.min(N - i0, S(0.04)), bp = new Biquad().set('bp', f, 5), [gl, gr] = pan2(pan)
    for (let k = 0; k < len; k++) {
      const t = k / SR, e = Math.min(1, k / 12) * Math.min(1, (len - k) / 96)
      const v = (bp.p(noise()) * 2.5 * Math.exp(-t / 0.003) + Math.sin(TAU * f * 0.5 * t) * Math.exp(-t / 0.006) * 0.5) * amp * e
      put(drL, drR, i0 + k, v, gl, gr, send)
    }
  }
  // wide white-noise burst whose low-pass closes as it decays
  function noiseBurst(t0, amp = 0.3, dur = 1.6, send = 0.6) {
    const i0 = S(t0), len = Math.min(N - i0, S(dur)), lL = new Biquad(), lR = new Biquad(), hL = new Biquad().set('hp', 180), hR = new Biquad().set('hp', 180)
    for (let k = 0; k < len; k++) {
      const t = k / SR
      if ((k & 31) === 0) { const fc = 2500 + 15000 * Math.exp(-t / (dur * 0.3)); lL.set('lp', fc, 0.6); lR.set('lp', fc, 0.6) }
      const e = Math.min(1, k / 48) * Math.exp(-t / (dur * 0.28)) * Math.min(1, (len - k) / 1200) * amp, i = i0 + k
      const a = lL.p(hL.p(noise())) * e, b = lR.p(hR.p(noise())) * e
      fxL[i] += a; fxR[i] += b; rvL[i] += a * send; rvR[i] += b * send
    }
  }
  // metallic coin / foil shimmer: inharmonic partials with beating, plus a bright chink
  function coin(t0, amp = 0.2, f0 = 2350, send = 0.5) {
    const i0 = S(t0), parts = [[1, 1, 0.9], [1.483, 0.7, 0.7], [2.092, 0.55, 0.55], [2.613, 0.4, 0.45], [3.21, 0.3, 0.35], [4.07, 0.2, 0.25]]
    parts.forEach(([r, a, d], j) => {
      const f = f0 * r; if (f > 15000) return
      const len = Math.min(N - i0, S(d * 5)), [gl, gr] = pan2(j % 2 ? 0.45 : -0.45), w1 = TAU * f / SR, w2 = TAU * (f + 3 + 2 * j) / SR
      for (let k = 0; k < len; k++) { const t = k / SR, e = Math.min(1, k / 24) * Math.exp(-t / d) * Math.min(1, (len - k) / 480), v = (Math.sin(w1 * k) + Math.sin(w2 * k)) * 0.5 * a * amp * e; put(muL, muR, i0 + k, v, gl * 1.41, gr * 1.41, send) }
    })
    const hp = new Biquad().set('hp', 5000, 0.7)
    for (let k = 0; k < S(0.05) && i0 + k < N; k++) { const t = k / SR, v = hp.p(noise()) * Math.exp(-t / 0.008) * amp * 1.2 * Math.min(1, k / 12); put(fxL, fxR, i0 + k, v, 1, 1, 0.3) }
  }
  // tremolo shimmer of high sines (tremolo speeds from trem0 to trem1 Hz)
  function shimmer(t0, t1, tones, amp = 0.03, trem0 = 3, trem1 = 15, att = 0.4, rel = 0.6, shape = 1) {
    const i0 = S(t0), i1 = S(t1)
    tones.forEach((m, j) => {
      const f = mtof(m), [gl, gr] = pan2(j % 2 ? 0.6 : -0.6)
      let ph = rng() * TAU, tr = 0
      for (let i = i0; i < i1; i++) {
        const p = (i - i0) / (i1 - i0), t = (i - i0) / SR; tr += TAU * (trem0 + (trem1 - trem0) * p * p) / SR; ph += TAU * f / SR
        const e = shape === 1 ? Math.min(1, t / att, (i1 - i) / SR / rel) : p * p * p * Math.min(1, (i1 - i) / 240)
        const v = Math.sin(ph) * (0.6 + 0.4 * Math.sin(tr + j)) * amp * e
        muL[i] += v * gl; muR[i] += v * gr; rvL[i] += v * 0.6; rvR[i] += v * 0.6
      }
    })
  }
  // rising saw tones (pairs of [midi, pan]) gliding up `semis` into t1
  function riserTone(t0, t1, voices, semis = 24, amp = 0.05) {
    const i0 = S(t0), i1 = S(t1)
    for (const [m0, pn] of voices) {
      let ph = rng(); const [gl, gr] = pan2(pn)
      for (let i = i0; i < i1; i++) { const p = (i - i0) / (i1 - i0), f = mtof(m0 + semis * p * p); ph += f / SR; ph %= 1; const v = osc(PAD_T, ph) * amp * p * p * Math.min(1, (i1 - i) / 240); fxL[i] += v * gl; fxR[i] += v * gr; rvL[i] += v * 0.3; rvR[i] += v * 0.3 }
    }
  }
  // detuned drone (pairs of [midi, amp]) with its own opening low-pass, into the pad bus
  function drone(t0, t1, notes, fc0 = 180, fc1 = 1100, att = 1.6, rel = 0.6) {
    const i0 = S(t0), i1 = Math.min(N, S(t1 + rel)), len = i1 - i0, lpL = new Biquad(), lpR = new Biquad(), tmp = new Float32Array(len)
    for (const [m, a] of notes) { const f = mtof(m); let p1 = rng(), p2 = rng(); for (let k = 0; k < len; k++) { p1 += f / SR; p2 += f * 1.003 / SR; p1 %= 1; p2 %= 1; tmp[k] += (osc(PAD_T, p1) + osc(PAD_T, p2)) * a * 0.5 } }
    const held = t1 - t0
    for (let k = 0; k < len; k++) {
      const t = k / SR, i = i0 + k
      if ((k & 31) === 0) { const fc = fc0 + (fc1 - fc0) * clamp(t / held, 0, 1) ** 2; lpL.set('lp', fc, 0.9); lpR.set('lp', fc * 1.05, 0.9) }
      let e = Math.min(1, t / att, (len - k) / 240); if (t > held) { const r = 1 - (t - held) / rel; e *= r > 0 ? r * r : 0 }
      const v = tmp[k] * e
      padL[i] += lpL.p(v); padR[i] += lpR.p(v)
    }
  }
  // strings-like ensemble: detuned saws with vibrato and a shaped crescendo, into the pad bus
  function strings(t0, t1, notes, amp = 0.02, att = 1, rel = 0.5, curve = 2) {
    const i0 = S(t0), i1 = Math.min(N, S(t1 + rel)), held = t1 - t0
    notes.forEach((n, ni) => {
      for (const [c, p] of [[-11, -0.75], [0, 0], [11, 0.75]]) {
        const f = mtof(n) * Math.pow(2, c / 1200), [gl, gr] = pan2(p), vr = 4.6 + 0.37 * ni + c * 0.02, vp = rng() * TAU
        let ph = rng()
        for (let i = i0; i < i1; i++) {
          const t = (i - i0) / SR
          let e = Math.min(1, t / att) ** curve * Math.min(1, (i1 - i) / 240); if (t > held) { const r = 1 - (t - held) / rel; e *= r > 0 ? r * r : 0 }
          ph += f * (1 + 0.0045 * Math.sin(vp + TAU * vr * t)) / SR; if (ph >= 1) ph -= 1
          const v = osc(PAD_T, ph) * amp * e
          padL[i] += v * gl; padR[i] += v * gr
        }
      }
    })
  }

  // airy wind: stereo band-passed noise whose centre and level glide f0->f1, a0->a1 (shape = curve exponent)
  function wind(t0, t1, f0 = 300, f1 = 4000, a0 = 0.02, a1 = 0.1, q = 0.9, att = 0.4, rel = 0.3, send = 0.5, shape = 1.5) {
    const i0 = S(t0), i1 = S(t1), bL = new Biquad(), bR = new Biquad(), lfo = rng() * TAU
    for (let i = i0; i < i1; i++) {
      const p = (i - i0) / (i1 - i0), t = (i - i0) / SR, pp = p ** shape
      if (((i - i0) & 31) === 0) { const fc = f0 * Math.pow(f1 / f0, pp) * (1 + 0.12 * Math.sin(lfo + TAU * 0.23 * t)); bL.set('bp', fc, q); bR.set('bp', fc * 1.09, q) }
      const e = (a0 + (a1 - a0) * pp) * Math.min(1, t / att, (i1 - i) / SR / rel) * (1 + 0.15 * Math.sin(lfo * 2 + TAU * 0.41 * t))
      const a = bL.p(noise()) * e, b = bR.p(noise()) * e
      fxL[i] += a; fxR[i] += b; rvL[i] += a * send; rvR[i] += b * send
    }
  }
  // tape-style shimmer pad: detuned saws with slow wow + flutter pitch wobble, into the pad bus
  function wobblePad(t0, t1, notes, amp = 0.012, att = 1, rel = 0.8, cents = 14) {
    const i0 = S(t0), i1 = Math.min(N, S(t1 + rel)), held = t1 - t0, wp = rng() * TAU, fp = rng() * TAU
    notes.forEach((n, ni) => {
      for (const [c, p] of [[-7, -0.8], [7, 0.8]]) {
        const f = mtof(n) * Math.pow(2, c / 1200), [gl, gr] = pan2(p)
        let ph = rng()
        for (let i = i0; i < i1; i++) {
          const t = (i - i0) / SR
          let e = Math.min(1, t / att, (i1 - i) / 240); if (t > held) { const r = 1 - (t - held) / rel; e *= r > 0 ? r * r : 0 }
          const wob = cents * (Math.sin(wp + TAU * 0.37 * t) + 0.25 * Math.sin(fp + TAU * 5.3 * t + ni))
          ph += f * Math.pow(2, wob / 1200) / SR; if (ph >= 1) ph -= 1
          const v = osc(PAD_T, ph) * amp * e
          padL[i] += v * gl; padR[i] += v * gr
        }
      }
    })
  }
  // cymbal-like airy noise: dir = 1 swells up into t1 (reverse cymbal), dir = -1 a soft wash decaying from t0
  function cymbalSwell(t0, t1, amp = 0.1, dir = 1, send = 0.6) {
    const i0 = S(t0), i1 = S(t1), len = i1 - i0, hL = new Biquad().set('hp', 4500, 0.7), hR = new Biquad().set('hp', 4700, 0.7), lL = new Biquad().set('lp', 13000), lR = new Biquad().set('lp', 13000)
    for (let k = 0; k < len; k++) {
      const p = k / len, i = i0 + k
      const e = dir > 0 ? Math.pow(p, 3) * Math.min(1, (len - k) / 240) : Math.min(1, k / S(0.25)) * Math.exp(-4 * p) * Math.min(1, (len - k) / 960)
      const a = lL.p(hL.p(noise())) * e * amp, b = lR.p(hR.p(noise())) * e * amp
      fxL[i] += a; fxR[i] += b; rvL[i] += a * send; rvR[i] += b * send
    }
  }
  // soft sub boom (no click)
  function boom(t0, amp = 0.5, tail = 0.8, fEnd = 34, fAdd = 50, att = 0.006) {
    const i0 = S(t0), len = Math.min(N - i0, S(tail * 4)), A = Math.max(1, S(att))
    let ph = 0
    for (let k = 0; k < len; k++) { const t = k / SR, f = fEnd + fAdd * Math.exp(-t / 0.12); ph += TAU * f / SR; bass[i0 + k] += Math.sin(ph) * Math.exp(-t / tail) * amp * Math.min(1, k / A, (len - k) / 960) }
  }

  // ----- processing -----
  // lead: soft low-pass + dotted-eighth ping-pong delay
  function processLead({ beat = 0.5, lp = 4200, fb = 0.38, wet = 0.3, send = 0.25 } = {}) {
    const lpL = new Biquad().set('lp', lp, 0.7), lpR = new Biquad().set('lp', lp, 0.7), D = S(beat * 0.75)
    const yL = new Float32Array(N), yR = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      const a = lpL.p(ldL[i]), b = lpR.p(ldR[i])
      yL[i] = 0.5 * (a + b) + (i >= D ? fb * yR[i - D] : 0); yR[i] = i >= D ? fb * yL[i - D] : 0
      muL[i] += a + wet * (yL[i] - 0.5 * (a + b)); muR[i] += b + wet * yR[i]; rvL[i] += a * send; rvR[i] += b * send
    }
  }
  // pad: low-pass following cut(t), ducked by the kicks, optional chorus
  function processPad({ cut = () => 2000, duck = 0.4, send = 0.3, chorus = 0, gain = 1 } = {}) {
    const lpL = new Biquad(), lpR = new Biquad(), oL = new Float32Array(N), oR = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      if ((i & 31) === 0) { const fc = cut(i / SR); lpL.set('lp', fc, 0.6); lpR.set('lp', fc, 0.6) }
      oL[i] = lpL.p(padL[i]); oR[i] = lpR.p(padR[i])
    }
    const base = 0.014 * SR, dep = 0.004 * SR
    const rd = (arr, x) => { const j = Math.floor(x), f = x - j; return j < 0 ? 0 : arr[j] + (arr[j + 1] - arr[j]) * f }
    for (let i = 0; i < N; i++) {
      let a = oL[i], b = oR[i]
      if (chorus) { const t = i / SR, dl = base + dep * Math.sin(TAU * 0.55 * t), dr = base + dep * Math.sin(TAU * 0.55 * t + Math.PI * 0.7); a = (a + chorus * rd(oR, i - dr)) / (1 + chorus * 0.5); b = (b + chorus * rd(oL, i - dl)) / (1 + chorus * 0.5) }
      const d = (1 - duck * sc[i]) * gain
      muL[i] += a * d; muR[i] += b * d; rvL[i] += a * send; rvR[i] += b * send
    }
  }
  // drums: low-pass following cut(t) (smoothed in log-frequency)
  function processDrums({ cut = () => 18000 } = {}) {
    const fL = new Biquad(), fR = new Biquad()
    let lc = Math.log(cut(0))
    for (let i = 0; i < N; i++) {
      if ((i & 15) === 0) { lc += (Math.log(cut(i / SR)) - lc) * 0.06; fL.set('lp', Math.exp(lc), 1.1); fR.set('lp', Math.exp(lc), 1.1) }
      drL[i] = fL.p(drL[i]); drR[i] = fR.p(drR[i])
    }
  }
  // reverb: stereo Freeverb; resetAt lets a hard stop be truly silent
  function reverb({ inGain = 0.015, fb = 0.86, damp = 0.32, resetAt = [] } = {}) {
    const RV = [mkRev(0), mkRev(23)]
    revOutL = mk(); revOutR = mk()
    const hpL = new Biquad().set('hp', 220), hpR = new Biquad().set('hp', 220), lpL = new Biquad().set('lp', 6500), lpR = new Biquad().set('lp', 6500)
    const resets = new Set(resetAt.map(S))
    for (let i = 0; i < N; i++) {
      if (resets.has(i)) for (const r of RV) { r.c.forEach((c) => c.reset()); r.a.forEach((a) => a.reset()) }
      const ins = [lpL.p(hpL.p(rvL[i])) * inGain, lpR.p(hpR.p(rvR[i])) * inGain]
      for (let ch = 0; ch < 2; ch++) {
        const r = RV[ch]; let o = 0
        for (const c of r.c) o += c.p(ins[ch], fb, damp)
        for (const a of r.a) o = a.p(o)
        ;(ch ? revOutR : revOutL)[i] = o
      }
    }
  }
  // master: sum, mono low end, tape saturation, top roll-off, gates, end fade, soft look-ahead limiter, normalize
  //   gates: [{ start, end, floor = 0, ramp = 0.004 }]  (gain dips to `floor` between start and end)
  function master({ revWet = 3, drive = 1.6, monoBelow = 140, top = 13500, gates = [], fadeOut = 0.3, limitDb = 3, ceilingDb = -1 } = {}) {
    if (!revOutL) reverb()
    const L0 = mk(), R0 = mk()
    const sideHP = new Biquad().set('hp', monoBelow, 0.7), tL = new Biquad().set('lp', top, 0.6), tR = new Biquad().set('lp', top, 0.6)
    const dcL = new Biquad().set('hp', 22), dcR = new Biquad().set('hp', 22)
    const nd = Math.tanh(drive), f0 = S(DUR - fadeOut)
    const gs = gates.map((g) => ({ a: S(g.start), b: S(g.end), fl: g.floor || 0, r: Math.max(1, S(g.ramp || 0.004)) }))
    for (let i = 0; i < N; i++) {
      let L = drL[i] + bass[i] + muL[i] + fxL[i] + revOutL[i] * revWet
      let R = drR[i] + bass[i] + muR[i] + fxR[i] + revOutR[i] * revWet
      const M = (L + R) * 0.5, Sd = sideHP.p((L - R) * 0.5) * 1.15
      L = M + Sd; R = M - Sd
      L = Math.tanh(L * drive) / nd; R = Math.tanh(R * drive) / nd
      L = dcL.p(tL.p(L)); R = dcR.p(tR.p(R))
      let g = 1
      for (const q of gs) {
        if (i >= q.a - q.r && i < q.b) { const x = i < q.a ? (q.a - i) / q.r : 0; g *= q.fl + (1 - q.fl) * x }
        else if (i >= q.b && i < q.b + 24) g *= q.fl + (1 - q.fl) * ((i - q.b) / 24)
      }
      if (i >= f0) { const p = (i - f0) / Math.max(1, N - 1 - f0); g *= 0.5 + 0.5 * Math.cos(Math.PI * Math.min(1, p)) }
      if (i < 96) g *= i / 96
      L0[i] = L * g; R0[i] = R * g
    }
    // soft limiter: look-ahead gain computer on the top `limitDb` of the signal
    let pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(L0[i]), Math.abs(R0[i]))
    if (pk > 0 && limitDb > 0) {
      const thr = pk * Math.pow(10, -limitDb / 20), A = S(0.002), rc = 1 - Math.exp(-1 / (0.08 * SR))
      const g = new Float32Array(N)
      for (let i = 0; i < N; i++) { const a = Math.max(Math.abs(L0[i]), Math.abs(R0[i])); g[i] = a > thr ? thr / a : 1 }
      for (let i = N - 2; i >= 0; i--) g[i] = Math.min(g[i], g[i + 1] + 1 / A)
      let prev = 1
      for (let i = 0; i < N; i++) { const v = Math.min(g[i], prev + (1 - prev) * rc); g[i] = v; prev = v }
      for (let i = 0; i < N; i++) { L0[i] *= g[i]; R0[i] *= g[i] }
      pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(L0[i]), Math.abs(R0[i]))
    }
    const norm = pk > 0 ? Math.pow(10, ceilingDb / 20) / pk : 1
    for (let i = 0; i < N; i++) { L0[i] *= norm; R0[i] *= norm }
    L0[N - 1] = 0; R0[N - 1] = 0
    return { L: L0, R: R0 }
  }

  return {
    SR, N, DUR, S, rng, noise, mk, put,
    buses: { drL, drR, bass, padL, padR, muL, muR, ldL, ldR, fxL, fxR, rvL, rvR, sc },
    bowl, reverseBowl, kick, clap, snare, hat, whoosh, impact, cutHit, padChord, bassNote, lead,
    sub, bell, pluck, flute, tick, noiseBurst, coin, shimmer, riserTone, drone, strings, wind, wobblePad, cymbalSwell, boom,
    processLead, processPad, processDrums, reverb, master,
  }
}

// ---------- output ----------
export function writeWav(path, L, R, ditherSeed = 7) {
  const N = L.length, buf = Buffer.alloc(44 + N * 4)
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34)
  buf.write('data', 36); buf.writeUInt32LE(N * 4, 40)
  const dith = mulberry32(ditherSeed)
  for (let i = 0; i < N; i++) {
    const d = (dith() - dith()) / 32768
    buf.writeInt16LE(clamp(Math.round((L[i] + d) * 32767), -32768, 32767), 44 + i * 4)
    buf.writeInt16LE(clamp(Math.round((R[i] + d) * 32767), -32768, 32767), 46 + i * 4)
  }
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, buf)
}
// RMS in dBFS per `step` seconds
export function rmsReport(L, R, step = 0.5) {
  const out = [], W = Math.round(step * SR)
  for (let i0 = 0; i0 < L.length; i0 += W) { let a = 0; const i1 = Math.min(L.length, i0 + W); for (let i = i0; i < i1; i++) a += L[i] ** 2 + R[i] ** 2; out.push((10 * Math.log10(a / (2 * (i1 - i0)) + 1e-12)).toFixed(1)) }
  return out
}
