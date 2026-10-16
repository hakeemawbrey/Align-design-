// Align mashup teaser: two original cues for timelines/mashup.js (?pace=fast | ?pace=dreamy).
// usage: node tools/mashup-audio.mjs [--rms]
//   -> out/audio/mashup-fast.wav   (15.0 s, 120 bpm, D Dorian) hazy "ethereal phonk / slowed" groove
//      out/audio/mashup-dreamy.wav (15.0 s, 120 bpm, D Dorian) drumless floating pads + soft bells
// 48 kHz 16-bit stereo, deterministic, original, no samples. Soft by design: round kicks, no impacts,
// risers or whooshes. Bowl at 0.0 (fast) and 12.0 s (both), drums out at 12.0, last 0.3 s to silence.
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSynth, writeWav, rmsReport, Biquad, mtof, pan2, TAU, SR, LEAD_T, osc } from './synth.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'out/audio')
const DUR = 15, BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4, END = 12.0
const VERBOSE = process.argv.includes('--rms')
const sin2 = (x) => { const s = Math.sin(Math.PI / 2 * Math.min(1, Math.max(0, x))); return s * s }

// D Dorian progression, one chord per bar (2 s): Dm9 | Bbmaj7 | Fmaj7 | G6/9 (the Dorian lift)
const PROG = [
  { root: 38, pad: [50, 57, 60, 64, 65] }, // Dm9:    D3 A3 C4 E4 F4
  { root: 34, pad: [50, 53, 57, 58, 62] }, // Bbmaj7: D3 F3 A3 Bb3 D4 (over Bb)
  { root: 41, pad: [48, 53, 57, 60, 64] }, // Fmaj7:  C3 F3 A3 C4 E4
  { root: 43, pad: [50, 55, 59, 62, 64] }, // G6/9:   D3 G3 B3 D4 E4
]
const FINAL = { root: 38, pad: [50, 57, 62, 64, 65, 69] } // Dm(add9) ring-out

// ---------- custom gentle voices ----------
// singing bowl: inharmonic partials with beating, rubbed attack, no strike noise
const BOWL = [[1, 1, 6], [2.756, 0.55, 2.4], [5.404, 0.25, 1.1], [8.933, 0.1, 0.6]]
function softBowl(s, t0, midi, amp, pan = 0, dec = 1, send = 0.7, att = 0.03) {
  const { muL, muR, rvL, rvR } = s.buses
  const f0 = mtof(midi), i0 = s.S(t0), [gl, gr] = pan2(pan)
  BOWL.forEach(([r, pa, dd], j) => {
    const f = f0 * r; if (f > 9000) return
    const d = dd * dec, len = Math.min(s.N - i0, s.S(d * 5)), w1 = TAU * f / SR, w2 = TAU * (f + 0.45 + 0.8 * j) / SR, p1 = s.rng() * TAU
    for (let k = 0; k < len; k++) {
      const t = k / SR, e = sin2(t / att) * Math.exp(-t / d) * Math.min(1, (len - k) / 2400), i = i0 + k
      const s1 = Math.sin(p1 + w1 * k), s2 = Math.sin(p1 + w2 * k)
      const a = (0.66 * s1 + 0.34 * s2) * pa * amp * e, b = (0.34 * s1 + 0.66 * s2) * pa * amp * e
      muL[i] += a * gl * 1.41; muR[i] += b * gr * 1.41; rvL[i] += a * send; rvR[i] += b * send
    }
  })
}
// soft glass bell: sine partials, rounded attack
const GLASS = [[1, 1, 1], [2.0, 0.25, 0.4], [2.76, 0.12, 0.22], [5.4, 0.04, 0.1]]
function glass(s, t0, midi, amp, pan = 0, dec = 1.8, send = 0.6, att = 0.01) {
  const { muL, muR, rvL, rvR } = s.buses
  const freq = mtof(midi), i0 = s.S(t0), [gl, gr] = pan2(pan)
  GLASS.forEach(([r, pa, dm], j) => {
    const f = freq * r; if (f > 12000) return
    const d = dec * dm, len = Math.min(s.N - i0, s.S(d * 6)), w1 = TAU * f / SR, w2 = TAU * (f + 0.35 + 0.6 * j) / SR, p1 = s.rng() * TAU
    for (let k = 0; k < len; k++) {
      const t = k / SR, e = sin2(t / att) * Math.exp(-t / d) * Math.min(1, (len - k) / 2400)
      const v = (0.6 * Math.sin(p1 + w1 * k) + 0.4 * Math.sin(p1 + w2 * k)) * pa * amp * e, i = i0 + k
      muL[i] += v * gl * 1.41; muR[i] += v * gr * 1.41; rvL[i] += v * gl * send; rvR[i] += v * gr * send
    }
  })
}
// attackless sustained sine tone (harmonics, slow detune beating) into pad or mu bus
function tone(s, { t0, t1, midi, amp, pan = 0, att = 1.2, rel = 1.2, send = 0.6, bus = 'pad', harm = [[1, 1], [2, 0.12]], detune = 0.0016 }) {
  const { muL, muR, padL, padR, rvL, rvR } = s.buses
  const L = bus === 'pad' ? padL : muL, R = bus === 'pad' ? padR : muR
  const i0 = s.S(t0), i1 = Math.min(s.N, s.S(t1 + rel)), held = t1 - t0, f = mtof(midi), [gl, gr] = pan2(pan)
  const ph = harm.map(() => s.rng() * TAU), ph2 = harm.map(() => s.rng() * TAU)
  for (let i = i0; i < i1; i++) {
    const t = (i - i0) / SR, e = sin2(t / att) * (t > held ? 1 - sin2((t - held) / rel) : 1)
    let v = 0
    for (let j = 0; j < harm.length; j++) { const [r, g] = harm[j]; ph[j] += TAU * f * r / SR; ph2[j] += TAU * f * r * (1 + detune) / SR; v += (Math.sin(ph[j]) + Math.sin(ph2[j])) * g }
    v *= amp * e * 0.5
    L[i] += v * gl; R[i] += v * gr; rvL[i] += v * gl * send; rvR[i] += v * gr * send
  }
}
// hazy pluck with tape wobble, into the lead bus (gets the ping-pong delay + low-pass of processLead)
function hazePluck(s, t0, midi, amp, pan = 0, dec = 0.42, bright = 0.55) {
  const { ldL, ldR } = s.buses
  const i0 = s.S(t0), len = Math.min(s.N - i0, s.S(dec * 5)), f = mtof(midi), [gl, gr] = pan2(pan), lp = new Biquad()
  let ph = s.rng()
  for (let k = 0; k < len; k++) {
    const t = k / SR, at = t0 + t
    if ((k & 15) === 0) lp.set('lp', 350 + 2600 * bright * Math.exp(-t / 0.09), 0.8)
    const wob = 9 * Math.sin(TAU * 0.37 * at) + 3 * Math.sin(TAU * 5.1 * at)
    const e = sin2(k / 240) * Math.exp(-t / dec) * Math.min(1, (len - k) / 960)
    const v = lp.p(osc(LEAD_T, ph) * 0.55 + 0.6 * Math.sin(TAU * ph)) * amp * e
    ph += f * Math.pow(2, wob / 1200) / SR; if (ph >= 1) ph -= 1
    ldL[i0 + k] += v * gl; ldR[i0 + k] += v * gr
  }
}
// round lo-fi kick: low sine sweep, no click, 4 ms rounded onset (also writes the sidechain env)
function softKick(s, t0, amp = 0.6) {
  const { drL, drR, sc } = s.buses, i0 = s.S(t0), len = Math.min(s.N - i0, s.S(0.5))
  let ph = 0
  for (let k = 0; k < len; k++) {
    const t = k / SR; ph += TAU * (47 + 48 * Math.exp(-t / 0.04)) / SR
    const v = Math.tanh(Math.sin(ph) * 1.3) * amp * sin2(t / 0.004) * Math.exp(-t / 0.11) * Math.min(1, (len - k) / 1200), i = i0 + k
    drL[i] += v; drR[i] += v
    const e = sin2(t / 0.01) * Math.exp(-t / 0.16); if (e > sc[i]) sc[i] = e
  }
}
// gentle snap / rim: short band-passed noise + a tiny woody body, rounded onset
function snap(s, t0, amp = 0.1, pan = 0.05) {
  const { drL, drR, rvL, rvR } = s.buses, i0 = s.S(t0), len = Math.min(s.N - i0, s.S(0.25)), bp = new Biquad().set('bp', 1900, 1.1), [gl, gr] = pan2(pan)
  for (let k = 0; k < len; k++) {
    const t = k / SR
    const e = sin2(k / 48) * (Math.exp(-t / 0.012) + 0.25 * Math.exp(-t / 0.06)) * Math.min(1, (len - k) / 480)
    const v = (bp.p(s.noise()) * 1.6 * e + Math.sin(TAU * 420 * t) * Math.exp(-t / 0.018) * 0.35 * sin2(k / 48)) * amp, i = i0 + k
    drL[i] += v * gl; drR[i] += v * gr; rvL[i] += v * 0.5; rvR[i] += v * 0.5
  }
}
// soft shaker: band-limited noise with a short swelled envelope
function shaker(s, t0, amp = 0.03, pan = 0) {
  const { drL, drR, rvL, rvR } = s.buses, i0 = s.S(t0), len = Math.min(s.N - i0, s.S(0.09))
  const hp = new Biquad().set('hp', 5200, 0.7), lp = new Biquad().set('lp', 9500, 0.7), [gl, gr] = pan2(pan)
  for (let k = 0; k < len; k++) {
    const t = k / SR, e = sin2(t / 0.012) * Math.exp(-t / 0.025) * Math.min(1, (len - k) / 480)
    const v = lp.p(hp.p(s.noise())) * e * amp * 2.5, i = i0 + k
    drL[i] += v * gl; drR[i] += v * gr; rvL[i] += v * 0.2; rvR[i] += v * 0.2
  }
}
// tape / vinyl hiss with sparse soft crackle, level follows lvl(t)
function hiss(s, amp, lvl, crackle = 0) {
  const { fxL, fxR } = s.buses
  const hL = new Biquad().set('hp', 1800, 0.6), hR = new Biquad().set('hp', 1900, 0.6), lL = new Biquad().set('lp', 7000, 0.6), lR = new Biquad().set('lp', 6800, 0.6)
  for (let i = 0; i < s.N; i++) {
    const t = i / SR, g = amp * lvl(t) * (1 + 0.2 * Math.sin(TAU * 0.6 * t))
    fxL[i] += lL.p(hL.p(s.noise())) * g; fxR[i] += lR.p(hR.p(s.noise())) * g
  }
  if (!crackle) return
  const bp = new Biquad().set('bp', 3000, 1.5)
  for (let t = 0.13; t < DUR; t += 0.09 + s.rng() * 0.35) {
    const i0 = s.S(t), a = crackle * lvl(t) * (0.3 + 0.7 * s.rng()), [gl, gr] = pan2(s.rng() * 1.4 - 0.7)
    for (let k = 0; k < 96 && i0 + k < s.N; k++) { const v = bp.p(s.noise()) * a * sin2(k / 8) * Math.exp(-k / 18); fxL[i0 + k] += v * gl; fxR[i0 + k] += v * gr }
  }
}
// breathy air: stereo band-passed noise with level env(t) and centre fc(t)
function breath(s, { t0, t1, env, fc, q = 0.8, send = 0.6 }) {
  const { fxL, fxR, rvL, rvR } = s.buses, i0 = s.S(t0), i1 = s.S(t1), bL = new Biquad(), bR = new Biquad()
  for (let i = i0; i < i1; i++) {
    const t = i / SR
    if (((i - i0) & 31) === 0) { const c = fc(t); bL.set('bp', c, q); bR.set('bp', c * 1.08, q) }
    const e = env(t), a = bL.p(s.noise()) * e, b = bR.p(s.noise()) * e
    fxL[i] += a; fxR[i] += b; rvL[i] += a * send; rvR[i] += b * send
  }
}
// felt heartbeat thump (~50 Hz), rounded onset, no click
function thump(s, t0, amp, f = 52) {
  const { bass } = s.buses, i0 = s.S(t0), len = Math.min(s.N - i0, s.S(0.7))
  let ph = 0
  for (let k = 0; k < len; k++) {
    const t = k / SR; ph += TAU * (f * (0.88 + 0.12 * Math.exp(-t / 0.08))) / SR
    bass[i0 + k] += Math.sin(ph) * amp * sin2(t / 0.03) * Math.exp(-t / 0.09) * Math.min(1, (len - k) / 2400)
  }
}

// ---------- finish ----------
function finish(s, name, { fadeIn = 1.0, ...opts }) {
  const { L, R } = s.master({ fadeOut: 0.3, ...opts })
  const F = Math.round(fadeIn * SR)
  for (let i = 0; i < F; i++) { const g = sin2(i / F); L[i] *= g; R[i] *= g }
  L[0] = R[0] = 0
  writeWav(join(OUT, name), L, R)
  let pk = 0, a = 0
  for (let i = 0; i < L.length; i++) { pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); a += L[i] ** 2 + R[i] ** 2 }
  console.log(`${name}: ${(L.length / SR).toFixed(3)} s  peak ${(20 * Math.log10(pk)).toFixed(1)} dBFS  rms ${(10 * Math.log10(a / (2 * L.length))).toFixed(1)} dB`)
  console.log('  rms/0.5s:', rmsReport(L, R).join(' '))
}

// =====================================================================================
// 1. FAST — ethereal phonk / slowed groove, cuts on every beat
// =====================================================================================
function fast() {
  const s = createSynth({ dur: DUR, seed: 0x3a54f1 })
  const GROOVE0 = 1.0 // drums enter after the breath

  // 0–1 s: a breath swelling in, bowl at 0.0
  breath(s, { t0: 0, t1: 2.2, env: (t) => 0.05 * sin2(t / 0.9) * (t > 1.0 ? 1 - sin2((t - 1.0) / 1.2) : 1), fc: (t) => 600 + 1100 * Math.min(1, t / 1.2) })
  softBowl(s, 0.0, 62, 0.09, 0, 1, 0.8)
  softBowl(s, 0.0, 50, 0.05, -0.2, 1, 0.7)

  // pad: detuned wobbly saws over the progression, 0–12, then Dm(add9) rings out 12–14.7
  for (let b = 0; b < 6; b++) {
    const c = PROG[b % 4], t0 = b * BAR
    s.wobblePad(t0, t0 + BAR, c.pad, 0.006, b === 0 ? 1.2 : 0.25, 0.35, 13)
    tone(s, { t0, t1: t0 + BAR - 0.1, midi: c.pad[2] + 12, amp: 0.004, pan: 0.3, att: 0.5, rel: 0.5, send: 0.9 }) // airy top
    s.sub(t0 + (b === 0 ? GROOVE0 : 0), t0 + BAR - 0.02, c.root - 12 < 28 ? c.root : c.root - 12, 0.11, 0.5, 0.04)
  }
  s.wobblePad(END, DUR - 0.3, FINAL.pad, 0.0075, 0.25, 0.3, 10)
  s.sub(END, 13.8, 26, 0.08, 0, 0.05)

  // drums 1.0–12.0: soft kick on 1 & 3, snap on 2 & 4, shakers on 8ths/16ths; drop at 12.0
  for (let t = GROOVE0, b = 2; t < END - 1e-6; t += BEAT, b++) {
    const bb = b % 4
    if (bb === 0 || bb === 2) softKick(s, t, bb === 0 ? 0.55 : 0.46)
    if (bb === 3 && b % 8 === 7) softKick(s, t + BEAT * 0.5, 0.32) // lazy pickup into the next bar
    if (bb === 1 || bb === 3) snap(s, t, 0.11)
    shaker(s, t + BEAT / 2, 0.034, 0.35)
    shaker(s, t, 0.016, -0.3)
    if (b % 2) shaker(s, t + BEAT * 0.75, 0.014, -0.45)
  }
  // a final gentle snap at 11.5 is the last drum; no fill, no impact

  // hazy plucked melody in D Dorian, 2–12 s (8-beat phrase, answered)
  const A = [[0, 74], [0.75, 77], [1.5, 76], [2, 72], [3, 69], [3.5, 72], [4, 74], [5, 81], [5.5, 79], [6, 77], [7, 76]]
  const B = [[0, 74], [0.75, 77], [1.5, 79], [2, 81], [3, 84], [3.5, 81], [4, 79], [5, 77], [5.5, 76], [6, 74], [6.5, 71], [7, 69]]
  const phrases = [[2, A], [6, B], [10, A.slice(0, 7)]]
  for (const [t0, ph] of phrases) ph.forEach(([bt, m], n) => hazePluck(s, t0 + bt * BEAT, m, 0.07, n % 2 ? 0.3 : -0.3))
  // a few high soft bell sparkles on half-bars
  for (const t of [3, 5, 7, 9, 11]) glass(s, t, [86, 88, 84, 86, 81][(t - 3) / 2], 0.007, t % 4 === 1 ? 0.6 : -0.6, 1.2, 0.8)

  // end: bowl at 12.0 rings over the lockup, faint glass halo
  softBowl(s, END, 62, 0.1, 0, 1.1, 0.8)
  softBowl(s, END + 0.01, 50, 0.06, -0.2, 1.1, 0.7)
  glass(s, END + 0.6, 81, 0.008, 0.4, 2.2, 0.9)

  hiss(s, 0.006, (t) => Math.min(1, t / 1.2) * (t > END ? 1 - 0.6 * Math.min(1, (t - END) / 2.5) : 1), 0.05)

  s.processLead({ beat: BEAT, lp: 3200, fb: 0.4, wet: 0.35, send: 0.45 })
  s.processPad({ cut: (t) => 1500 + 500 * Math.sin(TAU * t / 8), duck: 0.35, send: 0.45, chorus: 0.6 })
  s.processDrums({ cut: () => 9000 })
  s.reverb({ inGain: 0.016, fb: 0.88, damp: 0.35 })
  finish(s, 'mashup-fast.wav', { fadeIn: 0.6, revWet: 2.6, drive: 1.3, monoBelow: 150, top: 11000, limitDb: 0.8, ceilingDb: -2 })
}

// =====================================================================================
// 2. DREAMY — drumless floating pads, soft bells on every 2nd beat, heartbeat 6–10 s
// =====================================================================================
function dreamy() {
  const s = createSynth({ dur: DUR, seed: 0xd2ea31 })
  // slow progression, one chord per 2 bars: Dm9 (0–4) | Bbmaj7 (4–8) | Fmaj7 (8–10) | G6/9 (10–12) | Dm(add9) 12–
  const SEG = [[0, 4, PROG[0]], [4, 8, PROG[1]], [8, 10, PROG[2]], [10, 12, PROG[3]], [12, DUR - 0.35, FINAL]]
  SEG.forEach(([t0, t1, c], si) => {
    const att = si === 0 ? 1.4 : si === 4 ? 1.4 : 0.9, rel = si === 4 ? 0.35 : 1.0
    c.pad.forEach((m, j) => tone(s, { t0, t1, midi: m, amp: si === 4 ? 0.0042 : 0.0055, pan: (j % 2 ? 1 : -1) * (0.15 + 0.1 * j), att, rel, send: 0.8, harm: [[1, 1], [2, 0.15], [3, 0.04]], detune: 0.0018 }))
    s.wobblePad(t0, t1, c.pad.slice(1, 4).map((m) => m + 12), 0.0018, att, rel, 9)
    tone(s, { t0, t1, midi: c.root, amp: 0.006, att, rel, send: 0.3, harm: [[1, 1], [2, 0.2]] })
  })
  // airy texture over everything
  breath(s, { t0: 0, t1: DUR, env: (t) => 0.011 * sin2(t / 1.5) * (1 + 0.3 * Math.sin(TAU * 0.13 * t)), fc: (t) => 1400 + 600 * Math.sin(TAU * t / 7), q: 0.6, send: 0.7 })
  shimmerBed(s, [86, 93, 98], 0.0012)
  hiss(s, 0.0025, (t) => Math.min(1, t / 2))

  // soft bells on every 2nd beat (the dissolves), 1.0–11.0, chord tones high up
  const chordAt = (t) => (t < 4 ? PROG[0] : t < 8 ? PROG[1] : t < 10 ? PROG[2] : PROG[3])
  for (let t = 1, n = 0; t <= 11 + 1e-6; t += 2 * BEAT, n++) {
    const p = chordAt(t).pad, m = p[[4, 2, 3, 1][n % 4]] + 24
    glass(s, t, m, 0.016 * (n % 2 ? 0.75 : 1), n % 2 ? 0.35 : -0.35, 1.6, 0.8, 0.02)
  }
  // heartbeat-like sub pulse 6–10 s (lub-dub once per bar-half, 60 bpm, swelling in and out)
  for (let t = 6.0; t < 10.0 - 1e-6; t += 1.0) { const g = Math.sin(Math.PI * (t - 5.4) / 5); thump(s, t, 0.05 * g); thump(s, t + 0.25, 0.03 * g) }

  // bowl at 12.0, ring out
  softBowl(s, END, 62, 0.017, 0, 1.1, 0.85)
  softBowl(s, END + 0.01, 50, 0.008, -0.2, 1.1, 0.8)

  s.processPad({ cut: (t) => 1700 + 600 * Math.min(1, Math.max(0, (t - 6) / 4)), duck: 0, send: 0.6, chorus: 0.5 })
  s.reverb({ inGain: 0.02, fb: 0.9, damp: 0.3 })
  finish(s, 'mashup-dreamy.wav', { fadeIn: 1.2, revWet: 2.4, drive: 1.05, monoBelow: 150, top: 11000, limitDb: 0.5, ceilingDb: -4 })
}
// slow tremolo of high sines
function shimmerBed(s, tones, amp) {
  const { muL, muR, rvL, rvR } = s.buses
  tones.forEach((m, j) => {
    const f = mtof(m) * (1 + (j % 2 ? 0.0012 : -0.0009)), [gl, gr] = pan2(j % 2 ? 0.55 : -0.55), tp = s.rng() * TAU
    let ph = s.rng() * TAU
    for (let i = 0; i < s.N; i++) {
      const t = i / SR; ph += TAU * f / SR
      const v = Math.sin(ph) * (0.55 + 0.45 * Math.sin(tp + TAU * 0.35 * (1 + 0.23 * j) * t)) * amp * sin2(t / 3)
      muL[i] += v * gl; muR[i] += v * gr; rvL[i] += v * 0.8; rvR[i] += v * 0.8
    }
  })
}

fast()
dreamy()
