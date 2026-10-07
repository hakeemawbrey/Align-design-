// Align reel soundtrack: an original, fully synthesized mystical phonk / ambient-trap cue.
// usage: node tools/soundtrack.mjs   ->  out/soundtrack.wav (48 kHz, 16-bit stereo, TL.duration s)
// No samples, no deps, deterministic (seeded PRNG). Key: D Dorian, 120 bpm, timings from lib/timeline.js.
import { createRequire } from 'node:module'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ALIGN_HIT = 21.0 // the "alignment" stamp impact (seconds); the silence gap sits just before it
const GAP = 0.1 // length of the hard-stop silence before ALIGN_HIT

const T0 = performance.now()
const require = createRequire(import.meta.url)
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TL = require(join(ROOT, 'lib/timeline.js'))

const SR = 48000
const DUR = TL.duration
const N = Math.round(SR * DUR)
const BEAT = 60 / TL.bpm
const BAR = BEAT * 4
const CH = TL.chakras, ZO = TL.zodiac, MO = TL.montage, OU = TL.outro
const TAU = Math.PI * 2

// ---------- utilities ----------
function mulberry32(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
const rng = mulberry32(0xa1167)
const noise = () => rng() * 2 - 1
const S = (t) => Math.max(0, Math.min(N, Math.round(t * SR)))
const mk = () => new Float32Array(N)
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12)
const pan2 = (p) => { const a = (p + 1) * Math.PI / 4; return [Math.cos(a), Math.sin(a)] }
const clamp = (x, a, b) => Math.max(a, Math.min(b, x))

class Biquad {
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
function table(H, roll) {
  const t = new Float32Array(TS + 1)
  for (let n = 1; n <= H; n++) { const a = 1 / n / (1 + (n / roll) ** 2); for (let i = 0; i < TS; i++) t[i] += a * Math.sin(TAU * n * i / TS) }
  let m = 0; for (let i = 0; i < TS; i++) m = Math.max(m, Math.abs(t[i])); for (let i = 0; i < TS; i++) t[i] /= m
  t[TS] = t[0]; return t
}
const PAD_T = table(20, 6), LEAD_T = table(18, 9)
const osc = (tb, ph) => { const x = ph * TS, i = x | 0, f = x - i; return tb[i] + (tb[i + 1] - tb[i]) * f }

// ---------- buses ----------
const drL = mk(), drR = mk() // drums (through the zodiac filter)
const bass = mk() // mono low end (808/sub/booms)
const padL = mk(), padR = mk() // pad (lowpassed, ducked)
const muL = mk(), muR = mk() // bowls, lead, tones (ducked a little)
const ldL = mk(), ldR = mk() // lead pre-delay
const fxL = mk(), fxR = mk() // whooshes, risers, crashes
const rvL = mk(), rvR = mk() // reverb send
const sc = mk() // sidechain envelope from kicks

function put(L, R, i, v, gl, gr, send) { L[i] += v * gl; R[i] += v * gr; if (send) { rvL[i] += v * gl * send; rvR[i] += v * gr * send } }

// ---------- instruments ----------
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
  // mallet strike: a short, soft felt tick
  const bp = new Biquad().set('bp', f0 * 3, 1.2)
  for (let k = 0; k < S(0.03) && i0 + k < N; k++) { const t = k / SR, v = bp.p(noise()) * amp * 0.5 * Math.exp(-t / 0.006); put(muL, muR, i0 + k, v, gl, gr, send) }
}
// the same bowl played backwards: swells up and stops dead at tEnd
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

function kick(t0, amp = 1, decay = 0.3, fEnd = 46, fStart = 150) {
  const i0 = S(t0), len = Math.min(N - i0, S(decay * 6))
  let ph = 0
  for (let k = 0; k < len; k++) {
    const t = k / SR, f = fEnd + (fStart - fEnd) * Math.exp(-t / 0.032); ph += TAU * f / SR
    const e = (t < 0.0015 ? t / 0.0015 : 1) * Math.exp(-t / decay) * Math.min(1, (len - k) / 480)
    const v = Math.tanh((Math.sin(ph) * e + noise() * Math.exp(-t / 0.002) * 0.25) * 1.8) * amp * 0.75
    const i = i0 + k; drL[i] += v; drR[i] += v
    const s = (t < 0.004 ? t / 0.004 : 1) * Math.exp(-t / 0.14); if (s > sc[i]) sc[i] = s
  }
}
function clap(t0, amp = 0.3, pan = 0, send = 0.35, fc = 1300) {
  const i0 = S(t0), len = Math.min(N - i0, S(0.4)), bp = new Biquad().set('bp', fc, 0.8), [gl, gr] = pan2(pan)
  for (let k = 0; k < len; k++) {
    const t = k / SR
    let e = 0
    for (const o of [0, 0.01, 0.021]) if (t >= o) e = Math.max(e, Math.exp(-(t - o) / 0.005))
    if (t >= 0.021) e = Math.max(e, 0.55 * Math.exp(-(t - 0.021) / 0.085))
    e *= Math.min(1, k / 24)
    put(drL, drR, i0 + k, bp.p(noise()) * e * amp * 2.2, gl, gr, send)
  }
}
function snare(t0, amp = 0.3, pan = 0, send = 0.3) {
  clap(t0, amp * 0.8, pan, send, 1700)
  const i0 = S(t0), len = Math.min(N - i0, S(0.15))
  for (let k = 0; k < len; k++) { const t = k / SR, v = Math.sin(TAU * (190 + 60 * Math.exp(-t / 0.01)) * t) * Math.exp(-t / 0.04) * amp * 0.6 * Math.min(1, k / 24); drL[i0 + k] += v; drR[i0 + k] += v }
}
function hat(t0, amp = 0.1, decay = 0.028, pan = 0) {
  const i0 = S(t0), len = Math.min(N - i0, S(decay * 6)), hp = new Biquad().set('hp', 6500, 0.7), lp = new Biquad().set('lp', 11500, 0.6), [gl, gr] = pan2(pan)
  for (let k = 0; k < len; k++) { const t = k / SR, e = Math.min(1, k / 24) * Math.exp(-t / decay) * Math.min(1, (len - k) / 96); put(drL, drR, i0 + k, lp.p(hp.p(noise())) * e * amp * 2.5, gl, gr, 0.12) }
}
// noise sweep that lands exactly on tEnd
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
function impact(t0, amp = 1, tail = 0.7) {
  kick(t0, amp, 0.45, 40, 170)
  const i0 = S(t0)
  // sub boom
  let ph = 0
  for (let k = 0; k < Math.min(N - i0, S(tail * 4)); k++) { const t = k / SR, f = 32 + 70 * Math.exp(-t / 0.09); ph += TAU * f / SR; bass[i0 + k] += Math.sin(ph) * Math.exp(-t / tail) * amp * 0.55 * Math.min(1, k / 48) }
  // crash body (independent L/R noise), dark and wide
  const hL = new Biquad().set('hp', 350), hR = new Biquad().set('hp', 350), lL = new Biquad().set('lp', 7000), lR = new Biquad().set('lp', 7000)
  for (let k = 0; k < Math.min(N - i0, S(tail * 5)); k++) {
    const t = k / SR, e = Math.min(1, k / 48) * Math.exp(-t / (tail * 0.6)) * amp * 0.35, i = i0 + k
    const a = lL.p(hL.p(noise())) * e, b = lR.p(hR.p(noise())) * e
    fxL[i] += a; fxR[i] += b; rvL[i] += a * 0.8; rvR[i] += b * 0.8
  }
}
// small per-cut "thud + snap" for the montage
function cutHit(t0, amp = 0.5) {
  const i0 = S(t0), bp = new Biquad().set('bp', 2200, 1.5)
  for (let k = 0; k < Math.min(N - i0, S(0.2)); k++) {
    const t = k / SR, i = i0 + k
    bass[i] += Math.sin(TAU * (55 + 60 * Math.exp(-t / 0.02)) * t) * Math.exp(-t / 0.06) * amp * 0.4 * Math.min(1, k / 48)
    const v = bp.p(noise()) * Math.exp(-t / 0.012) * amp * 0.5 * Math.min(1, k / 24)
    fxL[i] += v; fxR[i] += v; rvL[i] += v * 0.4; rvR[i] += v * 0.4
  }
}
function padChord(t0, t1, notes, amp = 0.028, att = 0.35, rel = 0.7) {
  const i0 = S(t0), i1 = Math.min(N, S(t1 + rel)), held = (t1 - t0)
  for (const n of notes) for (const [c, p] of [[-9, -0.8], [0, 0], [9, 0.8]]) {
    const inc = mtof(n) * Math.pow(2, c / 1200) / SR, [gl, gr] = pan2(p)
    let ph = rng()
    for (let i = i0; i < i1; i++) {
      const t = (i - i0) / SR
      let e = Math.min(1, t / att); if (t > held) { const r = 1 - (t - held) / rel; e *= r > 0 ? r * r : 0 }
      const v = osc(PAD_T, ph) * amp * e; ph += inc; if (ph >= 1) ph -= 1
      padL[i] += v * gl; padR[i] += v * gr
    }
  }
}
function bassNote(t0, t1, midi, amp = 0.5) {
  const i0 = S(t0), i1 = S(t1), f = mtof(midi)
  let ph = 0
  for (let i = i0; i < i1; i++) {
    const k = i - i0, e = Math.min(1, k / 240) * Math.min(1, (i1 - i) / 720) * (0.75 + 0.25 * Math.exp(-k / SR / 0.15))
    ph += TAU * f / SR
    const v = Math.tanh((Math.sin(ph) + 0.18 * Math.sin(2 * ph)) * 1.4) * amp * e * (1 - 0.9 * sc[i])
    bass[i] += v
  }
}
function lead(t0, midi, amp = 0.07, pan = 0) {
  const i0 = S(t0), len = Math.min(N - i0, S(0.5)), f = mtof(midi), [gl, gr] = pan2(pan)
  let ph = rng()
  for (let k = 0; k < len; k++) {
    const t = k / SR, e = Math.min(1, k / 96) * Math.exp(-t / 0.13) * Math.min(1, (len - k) / 480)
    const v = (osc(LEAD_T, ph) + 0.35 * Math.sin(TAU * 2 * f * t)) * amp * e
    ph += f / SR; if (ph >= 1) ph -= 1
    ldL[i0 + k] += v * gl; ldR[i0 + k] += v * gr
  }
}

// ---------- harmony (D Dorian) ----------
const CHORD = {
  Dm: [50, 57, 62, 65, 69, 76], F: [53, 57, 60, 64, 67, 72], G: [55, 59, 62, 65, 69, 74], C: [48, 55, 60, 64, 67, 71],
}
const ROOT_M = { Dm: 38, F: 41, G: 43, C: 36 }
const ARP = { Dm: [62, 65, 69, 74], F: [65, 69, 72, 76], G: [67, 71, 74, 79], C: [64, 67, 72, 76] }
const CHAKRA_PROG = ['Dm', 'F', 'G', 'C', 'Dm', 'G', 'C']
const ASCENT = [62, 64, 65, 67, 69, 71, 72] // D E F G A B C — root to crown, one scale step per chakra

// ===== 0–3 s INTRO =====
const introEnd = CH.start
{ // drone: D2 + A2 + D3, slowly opening, fades as the beat drops
  const notes = [[38, 0.22], [45, 0.12], [50, 0.08], [57, 0.035]], i1 = S(introEnd + 0.6), lpL = new Biquad(), lpR = new Biquad()
  const tmp = new Float32Array(i1)
  for (const [m, a] of notes) { const f = mtof(m); let p1 = rng(), p2 = rng(); for (let i = 0; i < i1; i++) { p1 += f / SR; p2 += f * 1.003 / SR; p1 %= 1; p2 %= 1; tmp[i] += (osc(PAD_T, p1) + osc(PAD_T, p2)) * a * 0.5 } }
  for (let i = 0; i < i1; i++) {
    const t = i / SR
    if ((i & 31) === 0) { const fc = 180 + 900 * (t / introEnd) ** 2; lpL.set('lp', fc, 0.9); lpR.set('lp', fc * 1.05, 0.9) }
    const e = Math.min(1, t / 1.6) * (t > introEnd - 0.01 ? Math.max(0, 1 - (t - introEnd + 0.01) / 0.6) : 1) * (1 + 0.08 * Math.sin(TAU * 0.4 * t))
    const v = tmp[i] * e
    padL[i] += lpL.p(v); padR[i] += lpR.p(v)
  }
}
bowl(0.12, 50, 0.32, -0.15, 0.5, 1.1) // the deep opening bowl strike (D3)
bowl(1.62, 57, 0.12, 0.3, 0.6, 0.8) // a softer answering ring a fifth above
reverseBowl(introEnd, 2.6, 74, 0.09) // backwards bowl swelling into the drop
whoosh(introEnd, 2.8, 0.1, 300, 7000, 1) // rising noise swell
{ // shimmer: high Dorian cluster with tremolo that speeds up into 3.0
  const tones = [74, 81, 86, 88, 93], i0 = S(0.6), i1 = S(introEnd)
  tones.forEach((m, j) => {
    const f = mtof(m), [gl, gr] = pan2(j % 2 ? 0.6 : -0.6)
    let ph = rng() * TAU, tr = 0
    for (let i = i0; i < i1; i++) {
      const p = (i - i0) / (i1 - i0); tr += TAU * (3 + 12 * p * p) / SR; ph += TAU * f / SR
      const v = Math.sin(ph) * (0.6 + 0.4 * Math.sin(tr + j)) * p * p * p * 0.03 * Math.min(1, (i1 - i) / 240)
      muL[i] += v * gl; muR[i] += v * gr; rvL[i] += v * 0.6; rvR[i] += v * 0.6
    }
  })
}

// ===== 3–17 s CHAKRAS =====
impact(CH.start, 0.9, 0.8)
for (let c = 0; c < 7; c++) {
  const t = CH.start + c * CH.each, name = CHAKRA_PROG[c], r = ROOT_M[name]
  bowl(t, ASCENT[c], 0.17 + c * 0.012, c % 2 ? 0.25 : -0.25, 0.45, 0.75)
  padChord(t, t + CH.each, CHORD[name], 0.022)
  for (let b = 0; b < 4; b++) {
    const tb = t + b * BEAT
    kick(tb, c === 0 && b === 0 ? 0 : 0.85) // the impact already carries the 3.0 kick
    if (b === 1 || b === 3) clap(tb, 0.26, 0.05)
    hat(tb + BEAT / 2, 0.11, 0.03, 0.3)
    hat(tb, 0.05, 0.02, -0.3)
    if (c >= 3) { hat(tb + BEAT / 4, 0.035, 0.015, -0.45); hat(tb + BEAT * 3 / 4, 0.035, 0.015, 0.45) }
  }
  hat(t + BEAT * 3.5, 0.06, 0.12, 0.2) // open hat into the next bar
  // 808 line: long root, syncopated octave pickup
  bassNote(t, t + 0.95, r, 0.38)
  bassNote(t + 1.25, t + 1.45, r + 12, 0.28)
  bassNote(t + 1.5, t + 1.95, r, 0.38)
  whoosh(t + CH.each, 0.4, 0.07, 400, 4500, c % 2 ? -1 : 1)
}

// ===== 17–23 s ZODIAC =====
const z = ZO.start, gapStart = ALIGN_HIT - GAP
padChord(z, z + 2, CHORD.Dm, 0.018, 0.2)
padChord(z + 2, gapStart, CHORD.G, 0.018, 0.3, 0.02)
bassNote(z, z + 1.9, 38, 0.3); bassNote(z + 2, gapStart - 0.01, 43, 0.3)
for (const tb of [z, z + 0.75, z + 2, z + 2.75]) kick(tb, 0.9, 0.38) // half-time
snare(z + 1, 0.3); snare(z + 3, 0.3)
for (let t = z; t < z + 3 - 1e-6; t += BEAT / 2) hat(t, 0.06, 0.025, ((t * 4) | 0) % 2 ? 0.35 : -0.35)
bowl(z, 74, 0.1, 0, 0.6, 0.7)
{ // tension riser 20 → 20.9: accelerating snare roll, noise sweep, rising tone
  const r0 = z + 3
  kick(r0, 0.85)
  let t = r0, n = 0
  while (t < gapStart - 0.01) { const p = (t - r0) / (gapStart - r0); snare(t, 0.08 + 0.22 * p * p, (n++ % 2 ? 0.2 : -0.2), 0.2); t += p < 0.33 ? BEAT / 2 : p < 0.66 ? BEAT / 4 : BEAT / 8 }
  whoosh(gapStart, gapStart - r0, 0.14, 200, 9000, 1)
  const i0 = S(r0), i1 = S(gapStart)
  for (const [m0, pn] of [[50, -0.5], [57, 0.5]]) {
    let ph = rng(); const [gl, gr] = pan2(pn)
    for (let i = i0; i < i1; i++) { const p = (i - i0) / (i1 - i0), f = mtof(m0 + 24 * p * p); ph += f / SR; ph %= 1; const v = osc(PAD_T, ph) * 0.05 * p * p * Math.min(1, (i1 - i) / 240); fxL[i] += v * gl; fxR[i] += v * gr; rvL[i] += v * 0.3; rvR[i] += v * 0.3 }
  }
}
// ALIGN — the big impact, with a long tail
impact(ALIGN_HIT, 1.25, 1.6)
bowl(ALIGN_HIT, 50, 0.3, -0.2, 0.8, 1.2)
bowl(ALIGN_HIT, 62, 0.2, 0.25, 0.8, 1.1)
padChord(ALIGN_HIT, MO.start, [...CHORD.Dm, 81], 0.026, 0.05, 0.4)
bassNote(ALIGN_HIT + 0.35, MO.start - 0.02, 38, 0.3)
for (let t = MO.start - 1; t < MO.start - 1e-6; t += BEAT / 4) hat(t, 0.02 + 0.08 * (1 - (MO.start - t)), 0.02, ((t * 8) | 0) % 2 ? 0.4 : -0.4)
whoosh(MO.start, 0.8, 0.1, 300, 6000, -1)

// ===== 23–27 s MONTAGE (peak) =====
const m0 = MO.start, swell = OU.start - 0.5
const MONT = ['Dm', 'F', 'G', 'C']
impact(m0, 1.0, 0.7)
for (let k = 0; k < 4; k++) {
  const t = m0 + k, name = MONT[k], r = ROOT_M[name]
  padChord(t, t + 1, CHORD[name], 0.022, 0.05, 0.25)
  const bEnd = Math.min(t + 1, swell)
  bassNote(t, t + 0.45, r, 0.55); if (t + 0.5 < bEnd) bassNote(t + 0.5, Math.min(t + 0.95, bEnd), r, 0.55)
  for (let s = 0; s < 8; s++) { const ts = t + s * BEAT / 4; if (ts >= swell) break; lead(ts, ARP[name][[0, 1, 2, 3, 2, 1, 3, 2][s]] + (s === 6 && k % 2 ? 12 : 0), 0.09, s % 2 ? 0.35 : -0.35) }
}
for (let t = m0; t < swell - 1e-6; t += BEAT) {
  if (t > m0) kick(t, 1.1)
  cutHit(t, 0.6)
  const b = Math.round((t - m0) / BEAT) % 4
  if (b === 1 || b === 3) clap(t, 0.3, 0)
  for (let s = 0; s < 4; s++) hat(t + s * BEAT / 4, s === 2 ? 0.1 : 0.05, s === 2 ? 0.05 : 0.018, s % 2 ? 0.4 : -0.4)
}
kick(m0 + 1.75, 0.6); kick(m0 + 3.25, 0.6) // phonk pickups
for (const st of [m0 + 1.75, m0 + 2.75]) for (let j = 0; j < 4; j++) clap(st + j * BEAT / 8, 0.12 + 0.05 * j, j % 2 ? 0.3 : -0.3, 0.2, 1200 + 400 * j) // stutter fills
for (let j = 0; j < 8; j++) hat(m0 + 3.25 + j * BEAT / 8, 0.04 + 0.01 * j, 0.012, j % 2 ? 0.5 : -0.5)
reverseBowl(OU.start, 0.5, 62, 0.14)
whoosh(OU.start, 0.5, 0.13, 300, 8000, 1)

// ===== 27–31 s OUTRO =====
impact(OU.start, 0.75, 1.2)
bowl(OU.start, 62, 0.26, 0, 0.7, 1.3)
bowl(OU.start + 0.02, 50, 0.16, -0.3, 0.7, 1.3)
padChord(OU.start, DUR, [50, 57, 62, 64, 65, 69], 0.024, 0.08, 0.01)
bassNote(OU.start + 0.2, DUR - 0.05, 38, 0.25)

// ---------- processing ----------
// lead: soft low-pass + dotted-eighth ping-pong delay
{
  const lpL = new Biquad().set('lp', 4200, 0.7), lpR = new Biquad().set('lp', 4200, 0.7), D = S(BEAT * 0.75)
  const yL = new Float32Array(N), yR = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    const a = lpL.p(ldL[i]), b = lpR.p(ldR[i])
    yL[i] = 0.5 * (a + b) + (i >= D ? 0.38 * yR[i - D] : 0); yR[i] = i >= D ? 0.38 * yL[i - D] : 0
    muL[i] += a + 0.3 * (yL[i] - 0.5 * (a + b)); muR[i] += b + 0.3 * yR[i]; rvL[i] += a * 0.25; rvR[i] += b * 0.25
  }
}
// pad: warm low-pass that opens a little in the montage
{
  const lpL = new Biquad(), lpR = new Biquad()
  for (let i = 0; i < N; i++) {
    if ((i & 31) === 0) { const t = i / SR, fc = t >= m0 && t < OU.start ? 3200 : 2000; lpL.set('lp', fc, 0.6); lpR.set('lp', fc, 0.6) }
    const a = lpL.p(padL[i]), b = lpR.p(padR[i]), d = 1 - 0.4 * sc[i]
    muL[i] += a * d; muR[i] += b * d; rvL[i] += a * 0.3; rvR[i] += b * 0.3
  }
}
// drums: low-pass that dives at the zodiac (half-time) and sweeps open with the riser
{
  const cut = (t) => t < z ? 18000 : t < z + 3 ? 420 : t < gapStart ? 420 * Math.pow(18000 / 420, (t - z - 3) / (gapStart - z - 3)) : 18000
  const fL = new Biquad(), fR = new Biquad()
  let lc = Math.log(18000)
  for (let i = 0; i < N; i++) {
    if ((i & 15) === 0) { lc += (Math.log(cut(i / SR)) - lc) * 0.06; fL.set('lp', Math.exp(lc), 1.1); fR.set('lp', Math.exp(lc), 1.1) }
    drL[i] = fL.p(drL[i]); drR[i] = fR.p(drR[i])
  }
}
// reverb: stereo Freeverb (8 combs + 4 allpasses per side); reset at the hard stop so the gap is truly silent
class Comb { constructor(n) { this.b = new Float32Array(n); this.i = 0; this.f = 0 } p(x, fb, dm) { const y = this.b[this.i]; this.f = y * (1 - dm) + this.f * dm; this.b[this.i] = x + this.f * fb; if (++this.i >= this.b.length) this.i = 0; return y } reset() { this.b.fill(0); this.f = 0 } }
class AP { constructor(n) { this.b = new Float32Array(n); this.i = 0 } p(x) { const bo = this.b[this.i], y = -x + bo; this.b[this.i] = x + bo * 0.5; if (++this.i >= this.b.length) this.i = 0; return y } reset() { this.b.fill(0) } }
const sc48 = SR / 44100
const mkRev = (sp) => ({ c: [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((n) => new Comb(Math.round((n + sp) * sc48))), a: [556, 441, 341, 225].map((n) => new AP(Math.round((n + sp) * sc48))) })
const RV = [mkRev(0), mkRev(23)]
const revOutL = mk(), revOutR = mk()
{
  const hpL = new Biquad().set('hp', 220), hpR = new Biquad().set('hp', 220), lpL = new Biquad().set('lp', 6500), lpR = new Biquad().set('lp', 6500)
  const iGap = S(gapStart)
  for (let i = 0; i < N; i++) {
    if (i === iGap) for (const r of RV) { r.c.forEach((c) => c.reset()); r.a.forEach((a) => a.reset()) }
    const ins = [lpL.p(hpL.p(rvL[i])) * 0.015, lpR.p(hpR.p(rvR[i])) * 0.015]
    for (let ch = 0; ch < 2; ch++) {
      const r = RV[ch]; let o = 0
      for (const c of r.c) o += c.p(ins[ch], 0.86, 0.32)
      for (const a of r.a) o = a.p(o)
      ;(ch ? revOutR : revOutL)[i] = o
    }
  }
}
// master: sum, mono low end, tape saturation, gentle top roll-off, gap gate, end fade, normalize
const outL = mk(), outR = mk()
{
  const sideHP = new Biquad().set('hp', 140, 0.7), tL = new Biquad().set('lp', 13500, 0.6), tR = new Biquad().set('lp', 13500, 0.6)
  const dcL = new Biquad().set('hp', 22), dcR = new Biquad().set('hp', 22)
  const W = 3.0, drive = 1.6, nd = Math.tanh(drive)
  const g0 = S(gapStart), g1 = S(ALIGN_HIT) - 24, ramp = 192
  const f0 = S(DUR - 0.4)
  for (let i = 0; i < N; i++) {
    let L = drL[i] + bass[i] + muL[i] + fxL[i] + revOutL[i] * W
    let R = drR[i] + bass[i] + muR[i] + fxR[i] + revOutR[i] * W
    const M = (L + R) * 0.5, Sd = sideHP.p((L - R) * 0.5) * 1.15
    L = M + Sd; R = M - Sd
    L = Math.tanh(L * drive) / nd; R = Math.tanh(R * drive) / nd // tape-ish soft saturation
    L = dcL.p(tL.p(L)); R = dcR.p(tR.p(R))
    let g = 1
    if (i >= g0 - ramp && i < g1) g = i < g0 ? (g0 - i) / ramp : 0 // hard stop before ALIGN_HIT
    if (i >= f0) { const p = (i - f0) / (N - f0); g *= 0.5 + 0.5 * Math.cos(Math.PI * p) } // clean loop fade
    if (i < 96) g *= i / 96
    outL[i] = L * g; outR[i] = R * g
  }
  let pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(outL[i]), Math.abs(outR[i]))
  const norm = Math.pow(10, -1 / 20) / pk
  for (let i = 0; i < N; i++) { outL[i] *= norm; outR[i] *= norm }
}

// ---------- write WAV ----------
const buf = Buffer.alloc(44 + N * 4)
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12)
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34)
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40)
const dith = mulberry32(7)
for (let i = 0; i < N; i++) {
  const d = (dith() - dith()) / 32768
  buf.writeInt16LE(clamp(Math.round((outL[i] + d) * 32767), -32768, 32767), 44 + i * 4)
  buf.writeInt16LE(clamp(Math.round((outR[i] + d) * 32767), -32768, 32767), 46 + i * 4)
}
mkdirSync(join(ROOT, 'out'), { recursive: true })
const OUT = join(ROOT, 'out/soundtrack.wav')
writeFileSync(OUT, buf)

const rms = []
for (let s = 0; s < Math.ceil(DUR); s++) { let a = 0; const i0 = s * SR, i1 = Math.min(N, i0 + SR); for (let i = i0; i < i1; i++) a += outL[i] ** 2 + outR[i] ** 2; rms.push((10 * Math.log10(a / (2 * (i1 - i0)) + 1e-12)).toFixed(1)) }
console.log(`wrote ${OUT} (${DUR}s, ${SR} Hz, stereo) in ${((performance.now() - T0) / 1000).toFixed(1)}s`)
console.log('RMS dBFS per second:', rms.join(' '))
