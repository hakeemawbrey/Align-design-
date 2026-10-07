// Align subtle teasers: quiet, breathy, sparse cues for the three "subtle" timelines (see SUBTLE.md).
// usage: node tools/subtle-audio.mjs [--rms]
//   -> out/audio/subtle-whisper.wav, subtle-twostars.wav, subtle-theline.wav (12.0 s each)
// 48 kHz 16-bit stereo, deterministic, original, no samples. No drums, impacts, risers or whooshes:
// a low warm drone, filtered "room tone of the cosmos" air, attackless sine pads and at most a couple
// of soft bowl/glass notes as the only events. Mastered quiet (peak -3 dBFS) with long reverb tails,
// a slow fade-in from silence (>= 1.8 s) and the last 0.4 s fading to silence so each file loops cleanly.
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSynth, writeWav, rmsReport, Biquad, mtof, pan2, TAU, SR, PAD_T, osc } from './synth.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'out/audio')
const DUR = 12
const VERBOSE = process.argv.includes('--rms')

// ---------- gentle custom voices (write straight into the synth's buses) ----------
const sin2 = (x) => { const s = Math.sin(Math.PI / 2 * Math.min(1, Math.max(0, x))); return s * s }

// attackless sustained tone: raised-cosine in over `att`, held to t1, raised-cosine out over `rel`.
// freq may be a number (Hz) or a function of absolute time. harm = [[ratio, gain], ...]
function tone(s, { t0, t1, freq, amp, pan = 0, att = 1.5, rel = 1.5, send = 0.5, bus = 'mu', harm = [[1, 1]], detune = 0 }) {
  const { muL, muR, padL, padR, bass, rvL, rvR } = s.buses
  const L = bus === 'pad' ? padL : muL, R = bus === 'pad' ? padR : muR
  const i0 = s.S(t0), i1 = Math.min(s.N, s.S(t1 + rel)), held = t1 - t0
  const [gl, gr] = pan2(pan), fq = typeof freq === 'function' ? freq : () => freq
  const ph = harm.map(() => s.rng() * TAU), ph2 = harm.map(() => s.rng() * TAU)
  for (let i = i0; i < i1; i++) {
    const t = (i - i0) / SR, f = fq(i / SR)
    const e = sin2(t / att) * (t > held ? 1 - sin2((t - held) / rel) : 1)
    let v = 0
    harm.forEach(([r, g], j) => {
      ph[j] += TAU * f * r / SR; v += Math.sin(ph[j]) * g
      if (detune) { ph2[j] += TAU * f * r * (1 + detune) / SR; v += Math.sin(ph2[j]) * g }
    })
    v *= amp * e * (detune ? 0.5 : 1)
    if (bus === 'bass') { bass[i] += v; continue }
    L[i] += v * gl; R[i] += v * gr; rvL[i] += v * gl * send; rvR[i] += v * gr * send
  }
}

// soft glass / bell: a few sine partials with a rounded (non-clicky) attack and slow beating
const GLASS = [[1, 1, 1], [2.0, 0.16, 0.55], [2.76, 0.07, 0.32], [5.4, 0.025, 0.16]]
function glass(s, t0, freq, amp, pan = 0, dec = 2.2, send = 0.45, att = 0.012) {
  const { muL, muR, rvL, rvR } = s.buses
  const i0 = s.S(t0), [gl, gr] = pan2(pan)
  GLASS.forEach(([r, pa, dm], j) => {
    const f = freq * r; if (f > 12000) return
    const d = dec * dm, len = Math.min(s.N - i0, s.S(d * 6)), w1 = TAU * f / SR, w2 = TAU * (f + 0.35 + 0.6 * j) / SR, p1 = s.rng() * TAU, p2 = p1
    for (let k = 0; k < len; k++) {
      const t = k / SR, e = sin2(t / att) * Math.exp(-t / d) * Math.min(1, (len - k) / 2400)
      const v = (0.6 * Math.sin(p1 + w1 * k) + 0.4 * Math.sin(p2 + w2 * k)) * pa * amp * e, i = i0 + k
      muL[i] += v * gl * 1.41; muR[i] += v * gr * 1.41; rvL[i] += v * gl * send; rvR[i] += v * gr * send
    }
  })
}

// soft singing bowl: inharmonic bowl partials with beating, a rubbed 25 ms attack and no strike noise
const BOWL = [[1, 1, 7], [2.756, 0.42, 4.6], [5.404, 0.16, 2.6], [8.933, 0.06, 1.5]]
function softBowl(s, t0, midi, amp, pan = 0, dec = 1, send = 0.7, att = 0.025) {
  const { muL, muR, rvL, rvR } = s.buses
  const f0 = mtof(midi), i0 = s.S(t0), [gl, gr] = pan2(pan)
  BOWL.forEach(([r, pa, dd], j) => {
    const f = f0 * r; if (f > 9000) return
    const d = dd * dec, len = Math.min(s.N - i0, s.S(d * 5)), w1 = TAU * f / SR, w2 = TAU * (f + 0.45 + 0.8 * j) / SR, p1 = s.rng() * TAU, p2 = p1
    for (let k = 0; k < len; k++) {
      const t = k / SR, e = sin2(t / att) * Math.exp(-t / d) * Math.min(1, (len - k) / 2400), i = i0 + k
      const s1 = Math.sin(p1 + w1 * k), s2 = Math.sin(p2 + w2 * k)
      const a = (0.66 * s1 + 0.34 * s2) * pa * amp * e, b = (0.34 * s1 + 0.66 * s2) * pa * amp * e
      muL[i] += a * gl * 1.41; muR[i] += b * gr * 1.41; rvL[i] += a * send; rvR[i] += b * send
    }
  })
}

// felt heartbeat thump: a ~50 Hz sine with a rounded 30 ms onset, mono low end, no click
function thump(s, t0, amp, f = 50) {
  const { bass } = s.buses, i0 = s.S(t0), len = Math.min(s.N - i0, s.S(0.7))
  let ph = 0
  for (let k = 0; k < len; k++) {
    const t = k / SR; ph += TAU * (f * (0.88 + 0.12 * Math.exp(-t / 0.08))) / SR
    bass[i0 + k] += Math.sin(ph) * amp * sin2(t / 0.03) * Math.exp(-t / 0.13) * Math.min(1, (len - k) / 2400)
  }
}

// warm low drone: soft triangle-ish (PAD_T) + sine, slowly breathing, low-passed at fc(t) (Hz), into mu
function warmDrone(s, { t0, t1, notes, fc, att = 3, rel = 1, send = 0.35, q = 0.7 }) {
  const { muL, muR, rvL, rvR } = s.buses
  const i0 = s.S(t0), i1 = Math.min(s.N, s.S(t1 + rel)), held = t1 - t0, len = i1 - i0
  const tmpL = new Float32Array(len), tmpR = new Float32Array(len), lfo = s.rng() * TAU
  for (const [m, a, pn = 0] of notes) {
    const f = mtof(m), [gl, gr] = pan2(pn)
    let p1 = s.rng(), p2 = s.rng(), p3 = s.rng() * TAU
    for (let k = 0; k < len; k++) {
      p1 += f / SR; p2 += f * 1.0025 / SR; p1 %= 1; p2 %= 1; p3 += TAU * f / SR
      const v = ((osc(PAD_T, p1) + osc(PAD_T, p2)) * 0.25 + Math.sin(p3) * 0.7) * a * (1 + 0.12 * Math.sin(lfo + TAU * 0.11 * k / SR))
      tmpL[k] += v * gl; tmpR[k] += v * gr
    }
  }
  const lL = new Biquad(), lR = new Biquad()
  for (let k = 0; k < len; k++) {
    const t = k / SR, i = i0 + k
    if ((k & 31) === 0) { const c = fc(i / SR); lL.set('lp', c, q); lR.set('lp', c * 1.04, q) }
    const e = sin2(t / att) * (t > held ? 1 - sin2((t - held) / rel) : 1)
    const a = lL.p(tmpL[k]) * e, b = lR.p(tmpR[k]) * e
    muL[i] += a; muR[i] += b; rvL[i] += a * send; rvR[i] += b * send
  }
}

// cosmic room tone: very quiet stereo noise, low-passed and band-limited, with a slow breathing level
function air(s, { t0 = 0, t1 = DUR, lo = 250, hi = 2400, amp = 0.01, breathe = 0.25, rate = 0.13, send = 0.5, lvl = () => 1 }) {
  const { fxL, fxR, rvL, rvR } = s.buses
  const i0 = s.S(t0), i1 = s.S(t1), hL = new Biquad().set('hp', lo, 0.6), hR = new Biquad().set('hp', lo * 1.07, 0.6)
  const lL = new Biquad().set('lp', hi, 0.6), lR = new Biquad().set('lp', hi * 0.94, 0.6), l2 = new Biquad().set('lp', hi, 0.6), r2 = new Biquad().set('lp', hi * 0.94, 0.6), lfo = s.rng() * TAU
  for (let i = i0; i < i1; i++) {
    const t = i / SR, e = amp * lvl(t) * (1 + breathe * Math.sin(lfo + TAU * rate * t) + 0.5 * breathe * Math.sin(lfo * 1.7 + TAU * rate * 2.37 * t))
    const a = l2.p(lL.p(hL.p(s.noise()))) * e, b = r2.p(lR.p(hR.p(s.noise()))) * e
    fxL[i] += a; fxR[i] += b; rvL[i] += a * send; rvR[i] += b * send
  }
}

// slow tremolo shimmer of high sines whose level follows lvl(t)
function shimmerBed(s, { t0, t1, tones, amp, lvl, rate = 0.4, send = 0.8 }) {
  const { muL, muR, rvL, rvR } = s.buses
  const i0 = s.S(t0), i1 = s.S(t1)
  tones.forEach((m, j) => {
    const f = mtof(m) * (1 + (j % 2 ? 0.0012 : -0.0009)), [gl, gr] = pan2(j % 2 ? 0.55 : -0.55), tp = s.rng() * TAU
    let ph = s.rng() * TAU
    for (let i = i0; i < i1; i++) {
      const t = i / SR; ph += TAU * f / SR
      const v = Math.sin(ph) * (0.55 + 0.45 * Math.sin(tp + TAU * rate * (1 + 0.23 * j) * t)) * amp * lvl(t)
      muL[i] += v * gl; muR[i] += v * gr; rvL[i] += v * send; rvR[i] += v * send
    }
  })
}

// ---------- finish: master quietly, slow fade-in from silence ----------
function finish(s, name, { fadeIn = 1.8, ...opts } = {}) {
  const { L, R } = s.master({ revWet: 2, drive: 1.02, monoBelow: 150, top: 11000, fadeOut: 0.4, limitDb: 1.5, ceilingDb: -3, ...opts })
  const F = Math.round(fadeIn * SR)
  for (let i = 0; i < F; i++) { const g = sin2(i / F); L[i] *= g; R[i] *= g }
  L[0] = R[0] = 0
  writeWav(join(OUT, name), L, R)
  let pk = 0, a = 0
  for (let i = 0; i < L.length; i++) { pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); a += L[i] ** 2 + R[i] ** 2 }
  console.log(`${name}: ${(L.length / SR).toFixed(3)} s  peak ${(20 * Math.log10(pk)).toFixed(1)} dBFS  rms ${(10 * Math.log10(a / (2 * L.length))).toFixed(1)} dB`)
  if (VERBOSE) console.log('  rms/0.5s:', rmsReport(L, R).join(' '))
}

// ---------- 1. whisper ----------
// lines at ~0.6, 3.8, 7.0 s; brand at 9.4 s. Drone + air; a faint two-note swell under each line; one low bowl.
function whisper() {
  const s = createSynth({ dur: DUR, seed: 0x5b1e01 })
  warmDrone(s, { t0: 0, t1: DUR, notes: [[36, 0.026, -0.15], [43, 0.016, 0.15], [48, 0.006, 0]], fc: (t) => 380 + 120 * Math.sin(TAU * t / 12), att: 3, rel: 0.5 })
  air(s, { amp: 0.011, lo: 300, hi: 2600, rate: 0.09 })
  // two-note swells (no attack): C minor colour, each a slow breath under its line
  const swells = [[0.6, [55, 62]], [3.8, [56, 63]], [7.0, [53, 60]]]
  for (const [t, ns] of swells) ns.forEach((m, j) => tone(s, { t0: t, t1: t + 1.4, freq: mtof(m), amp: 0.0075, pan: j ? 0.3 : -0.3, att: 1.6, rel: 1.8, send: 0.9, harm: [[1, 1], [2, 0.12]], detune: 0.0016 }))
  // brand: one gentle low bowl (C3), long decay, plus the faintest C-major warmth under it
  softBowl(s, 9.4, 48, 0.11, 0, 0.55, 0.8)
  for (const [m, p] of [[48, -0.2], [55, 0.2], [64, 0]]) tone(s, { t0: 9.5, t1: 11.2, freq: mtof(m), amp: 0.0035, pan: p, att: 1.4, rel: 1.2, send: 0.9, detune: 0.0015 })
  s.reverb({ inGain: 0.02, fb: 0.9, damp: 0.28 })
  finish(s, 'subtle-whisper.wav')
}

// ---------- 2. twostars ----------
// two lights drift together 0-8 s; line ~8-9 s; "soon." ~9.2; brand ~10.2.
function twostars() {
  const s = createSynth({ dur: DUR, seed: 0x2057a2 })
  warmDrone(s, { t0: 0, t1: DUR, notes: [[33, 0.018, 0], [45, 0.007, 0]], fc: (t) => 300 + 260 * Math.min(1, Math.max(0, (t - 7.5) / 3)), att: 3.5, rel: 0.5 })
  air(s, { amp: 0.008, lo: 400, hi: 3200, rate: 0.11 })
  const ALIGN_T = 8.5
  const k = (t) => Math.min(1, t / ALIGN_T), ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * k(t))
  // left star: A4, steady.  right star: starts a tritone above (D#5) and settles onto E5 (a perfect fifth)
  const Lf = () => mtof(69)
  const Rf = (t) => mtof(75 + ease(t))
  const lTimes = [1.6, 3.7, 5.5, 7.1, ALIGN_T]
  const rTimes = [2.7, 4.9, 6.5, 7.7, ALIGN_T]
  for (const t of lTimes) glass(s, t, Lf(t), 0.03 * (0.35 + 0.65 * ease(t) ** 2), -0.8 * (1 - ease(t)), 1.2)
  for (const t of rTimes) glass(s, t, Rf(t), 0.026 * (0.35 + 0.65 * ease(t) ** 2), 0.8 * (1 - ease(t)), 1.2)
  // they align: a warm pad blooms on the open fifth (A2 E3 A3 E4 + a breath of C#5)
  for (const [m, a, p] of [[45, 0.008, 0], [52, 0.006, -0.35], [57, 0.0055, 0.35], [64, 0.004, -0.2], [73, 0.0018, 0.25]])
    tone(s, { t0: ALIGN_T, t1: 11.0, freq: mtof(m), amp: a, pan: p, att: 1.6, rel: 1.4, send: 0.8, harm: [[1, 1], [2, 0.1], [3, 0.03]], detune: 0.0018 })
  // brand: one faint high octave glass, centred
  glass(s, 10.2, mtof(81), 0.012, 0, 2.4, 0.5)
  // felt heartbeat, 6-9 s, almost subliminal (lub-dub at ~62 bpm)
  for (let t = 6.0; t < 9.0; t += 0.97) { const g = Math.sin(Math.PI * (t - 6.0) / 3.0); thump(s, t, 0.02 * g); thump(s, t + 0.24, 0.013 * g) }
  s.reverb({ inGain: 0.02, fb: 0.9, damp: 0.26 })
  finish(s, 'subtle-twostars.wav')
}

// ---------- 3. theline ----------
// one slow pull-back; 7 chakra dots light 9.0-10.1 s (0.18 s apart); "align" ~10 s.
function theline() {
  const s = createSynth({ dur: DUR, seed: 0x711e03 })
  // the single sustained tone: D2/D3/A3 drone opening low->high over 9 s, like the line drawing itself
  warmDrone(s, { t0: 0, t1: DUR, notes: [[38, 0.0075, 0], [50, 0.0085, -0.1], [57, 0.0035, 0.1]], fc: (t) => 120 * Math.pow(2600 / 120, Math.min(1, t / 9) ** 1.3), att: 3, rel: 0.5, q: 0.9 })
  air(s, { amp: 0.0045, lo: 500, hi: 4000, rate: 0.08, lvl: (t) => 0.6 + 0.4 * Math.min(1, t / 9) })
  // shimmer growing very slowly
  shimmerBed(s, { t0: 0, t1: DUR, tones: [86, 93, 98], amp: 0.0016, rate: 0.35, lvl: (t) => Math.min(1, t / 9.5) ** 2 })
  // 7 tiny ascending bells with the dots: D major pentatonic D5 E5 F#5 A5 B5 D6 E6
  const notes = [74, 76, 78, 81, 83, 86, 88]
  notes.forEach((m, i) => glass(s, 9.0 + i * 0.18, mtof(m), 0.018 * (1 - i * 0.05), (i - 3) * 0.12, 1.5, 0.5, 0.008))
  // resolving warm chord (Dadd9) blooming under "align", ringing out
  for (const [m, a, p] of [[38, 0.006, 0], [50, 0.007, -0.25], [57, 0.006, 0.25], [62, 0.005, -0.3], [66, 0.004, 0.3], [69, 0.003, 0], [76, 0.0015, 0.2]])
    tone(s, { t0: 10.1, t1: 11.2, freq: mtof(m), amp: a, pan: p, att: 0.9, rel: 1.2, send: 0.85, harm: [[1, 1], [2, 0.1]], detune: 0.0017 })
  s.reverb({ inGain: 0.02, fb: 0.9, damp: 0.26 })
  finish(s, 'subtle-theline.wav')
}

whisper()
twostars()
theline()
