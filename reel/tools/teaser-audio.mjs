// Align launch teasers: original, fully synthesized cues for the three teaser timelines.
// usage: node tools/teaser-audio.mjs
//   -> out/audio/sign-<id>.wav (x12, 15 s, 120 bpm), out/audio/love.wav (20 s, 90 bpm), out/audio/launch.wav (15 s, 120 bpm),
//      out/audio/vortex.wav (20 s, 120 bpm)
// 48 kHz 16-bit stereo, deterministic, no samples. Instruments come from tools/synth.mjs (the hero soundtrack's kit).
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { createSynth, writeWav, rmsReport } from './synth.mjs'

const T0 = performance.now()
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'out/audio')

// read a browser timeline (an IIFE that sets window.ALIGN.TL) with URL params at their defaults
function loadTL(name) {
  const window = { ALIGN: { param: (_k, d) => d } }
  vm.runInNewContext(readFileSync(join(ROOT, 'timelines', name), 'utf8'), { window })
  return window.ALIGN.TL
}

const SIGNS = [
  ['aries', 'fire'], ['taurus', 'earth'], ['gemini', 'air'], ['cancer', 'water'],
  ['leo', 'fire'], ['virgo', 'earth'], ['libra', 'air'], ['scorpio', 'water'],
  ['sagittarius', 'fire'], ['capricorn', 'earth'], ['aquarius', 'air'], ['pisces', 'water'],
]
const VERBOSE = process.argv.includes('--rms')
function finish(s, name, opts) {
  const { L, R } = s.master(opts)
  writeWav(join(OUT, name), L, R)
  const r = rmsReport(L, R, 0.5)
  console.log(`  ${name.padEnd(20)} ${s.DUR}s`)
  if (VERBOSE || /leo|love|launch|vortex/.test(name)) console.log('    RMS/0.5s:', r.join(' '))
}

// =====================================================================================
// 1. CALLING ALL <SIGN> — one arrangement, flavoured per element, keyed per sign (zodiac wheel = chromatic from C)
// =====================================================================================
const EL = {
  fire: { kick: [1.05, 0.24, 50, 195, 0.35], clap: [0.32, 1650], hat: { div: 2, amp: 0.11, dec: 0.024, hp: 7000, send: 0.1 }, lead: 'saw', leadLp: 7000, rev: 0.012, padCut: 2300, padOpen: 5200, sub: 0, drumCut: 18000, chorus: 0, revWet: 2.6 },
  earth: { kick: [1.0, 0.42, 40, 135, 0.15], clap: [0.26, 1100], hat: { div: 1, amp: 0.08, dec: 0.06, hp: 5500, send: 0.12 }, lead: 'warm', leadLp: 2600, rev: 0.013, padCut: 1500, padOpen: 3400, sub: 0.32, drumCut: 9000, chorus: 0, revWet: 2.8 },
  air: { kick: [0.85, 0.28, 46, 150, 0.2], clap: [0.24, 1900], hat: { div: 4, amp: 0.05, dec: 0.04, hp: 8500, send: 0.35 }, lead: 'flute', leadLp: 6000, rev: 0.024, padCut: 2600, padOpen: 6000, sub: 0, drumCut: 18000, chorus: 0, revWet: 3.4 },
  water: { kick: [0.9, 0.34, 44, 140, 0.12], clap: [0.24, 1250], hat: { div: 2, amp: 0.07, dec: 0.03, hp: 6000, send: 0.25 }, lead: 'bell', leadLp: 4000, rev: 0.02, padCut: 1100, padOpen: 2900, sub: 0.12, drumCut: 3600, chorus: 0.8, revWet: 3.2 },
}
const MIN = [0, 3, 7, 10, 14] // i(add9) voicing intervals

function renderSign(idx, TL) {
  const [id, element] = SIGNS[idx], E = EL[element]
  const s = createSynth({ dur: TL.duration, seed: 0x5167 + idx * 101 })
  const BEAT = 60 / TL.bpm, BAR = BEAT * 4
  const H = TL.hook, SK = TL.sky, MA = TL.matches, EN = TL.end
  const k = idx // pitch class: aries = C, taurus = C#, ... pisces = B
  const bowlM = 60 + k // the sign's bowl tone, C4..B4
  const R = 48 + (k > 6 ? k - 12 : k) // pad root, F#2..F#3
  const B = 36 + (k > 6 ? k - 12 : k) // bass root, F#1..F#2
  const leadRoot = 60 + (k > 8 ? k - 12 : k) // lead register root, A3..G#4
  const chord = (root, iv) => iv.map((x) => root + x)
  const [ka, kd, kfe, kfs, kcl] = E.kick
  const hatT = (t, a, d, p) => s.hat(t, a, d, p, E.hat.hp, E.hat.send)

  // ---- 0–2.5 HOOK: hit + the sign's bowl on the glyph slam, drone, short riser ----
  s.impact(H.start, 1.0, 0.8)
  s.bowl(H.start, bowlM, 0.32, 0, 0.55, 1.0)
  s.bowl(H.start + 0.01, bowlM - 12, 0.16, -0.2, 0.5, 1.0)
  s.drone(H.start, SK.start - 0.05, [[B, 0.09], [B + 7, 0.05], [B + 12, 0.04], [B + 19, 0.02]], 200, 1400, 0.9, 0.3)
  s.reverseBowl(SK.start, 1.1, bowlM + 12, 0.08)
  s.whoosh(SK.start, 1.3, 0.11, 300, 7500, 1)
  for (let t = H.start + 1.5, n = 0; t < SK.start - 1e-6; n++) { const p = (t - 1.5) / 1; hatT(t, 0.02 + 0.07 * p, 0.015, n % 2 ? 0.4 : -0.4); t += p < 0.5 ? BEAT / 4 : BEAT / 8 }

  // ---- 2.5–8 SKY: beat in, a hit on every beat cut ----
  const skyChords = [[SK.start, SK.start + BAR, 0], [SK.start + BAR, SK.start + 2 * BAR, 8], [SK.start + 2 * BAR, MA.start, 10]]
  for (const [t0, t1, deg] of skyChords) {
    const iv = deg === 0 ? MIN : [0, 4, 7, 11, 14]
    s.padChord(t0, t1, chord(R + 12 + (deg === 10 ? deg - 12 : deg), iv), 0.016, 0.08, 0.25)
    // 808: root, octave pickup, root
    const br = B + (deg === 10 ? -2 : deg === 8 ? -4 : 0)
    s.bassNote(t0, t0 + 0.7, br, 0.4)
    if (t0 + 1.25 < t1) s.bassNote(t0 + 0.75, t0 + 0.95, br + 12, 0.26)
    if (t0 + 1.5 < t1) s.bassNote(t0 + 1.0, Math.min(t1, t0 + 1.95) - 0.02, br, 0.4)
    if (E.sub) s.sub(t0, t1 - 0.02, br - 12 < 28 ? br : br - 12, E.sub)
  }
  for (let t = SK.start, b = 0; t < MA.start - 1e-6; t += BEAT, b++) {
    s.cutHit(t, b === 0 ? 0.7 : 0.45)
    if (element === 'earth') { if (b % 4 === 0 || b % 4 === 2) s.kick(t, ka, kd, kfe, kfs, kcl); if (b % 4 === 3) s.kick(t + BEAT / 2, ka * 0.6, kd * 0.7, kfe, kfs, kcl) }
    else if (element === 'water') { if (b % 4 !== 3) s.kick(t, ka * (b % 4 === 0 ? 1 : 0.8), kd, kfe, kfs, kcl); if (b % 4 === 1) s.kick(t + BEAT * 0.75, ka * 0.5, kd * 0.7, kfe, kfs, kcl) }
    else s.kick(t, ka * (b % 2 ? 0.88 : 1), kd, kfe, kfs, kcl)
    if (b % 2 === 1) s.clap(t, E.clap[0], 0.05, element === 'air' ? 0.5 : 0.3, E.clap[1])
    const div = E.hat.div
    if (div === 1) hatT(t + BEAT / 2, E.hat.amp, E.hat.dec, 0.25)
    else for (let j = 0; j < div; j++) { const acc = (j * 4 / div) % 2 === 1 || (div === 2 && j === 1); hatT(t + j * BEAT / div, E.hat.amp * (acc ? 1 : 0.55), E.hat.dec, j % 2 ? 0.35 : -0.35) }
    if (element === 'fire' && b % 4 === 3) for (let j = 0; j < 4; j++) hatT(t + BEAT / 2 + j * BEAT / 8, 0.04 + 0.015 * j, 0.012, j % 2 ? 0.5 : -0.5)
  }
  s.impact(SK.start, 0.6, 0.4, 0.6)
  // the hook phrase (minor pentatonic around the sign's root), voiced per element
  const PHR = [
    [0, 7], [0.75, 10], [1.5, 12], [2.5, 10], [3, 7], [3.5, 3],
    [4, 12], [4.75, 15], [5.5, 12], [6.5, 8], [7, 7],
    [8, 10], [8.75, 14], [9.5, 17], [10, 14],
  ]
  PHR.forEach(([bt, iv], n) => {
    const t = SK.start + bt * BEAT, m = leadRoot + iv, pan = n % 2 ? 0.25 : -0.25
    if (E.lead === 'saw') s.lead(t, m, 0.085, pan, 0.14)
    else if (E.lead === 'warm') s.lead(t, m - 12, 0.11, pan, 0.2)
    else if (E.lead === 'flute') { const nx = PHR[n + 1] ? PHR[n + 1][0] : bt + 1; s.flute(t, SK.start + Math.min(nx, bt + 1.2) * BEAT - 0.03, m, 0.075, pan) }
    else s.bell(t, m + 12, 0.05, pan * 2, 0.6, 0.6, 3.5, 1.6)
  })
  if (element === 'water') for (let n = 0; n < 9; n++) { const t = SK.start + 0.25 + n * 0.62 + s.rng() * 0.1, m = leadRoot + 24 + [0, 3, 7, 10, 12][Math.floor(s.rng() * 5)]; s.bell(t, m, 0.022, s.rng() * 1.6 - 0.8, 0.8, 0.35, 2.0, 1.0) }
  s.whoosh(MA.start, 0.6, 0.09, 400, 6000, -1)

  // ---- 8–12 MATCHES: warmer lift, pad opens, pluck arpeggio, sparkle on each beat ----
  const maChords = [[MA.start, MA.start + BAR, 8, [0, 4, 7, 11, 14]], [MA.start + BAR, MA.start + 1.5 * BAR, 3, [0, 4, 7, 14]], [MA.start + 1.5 * BAR, EN.start, 10, [0, 4, 7, 14]]]
  for (const [t0, t1, deg, iv] of maChords) {
    const pr = R + 12 + (deg > 6 ? deg - 12 : deg)
    s.padChord(t0, t1, chord(pr, iv), 0.02, 0.25, 0.3)
    s.strings(t0, t1, chord(pr + 12, [0, 7, 16]), 0.006, 0.6, 0.3, 1)
    const br = B + (deg > 6 ? deg - 12 : deg)
    s.bassNote(t0, t1 - 0.03, br, 0.34, 0.6)
    const arp = chord(leadRoot + (deg > 6 ? deg - 12 : deg), [0, 4, 7, 11, 12, 14, 16])
    for (let tt = t0, j = 0; tt < t1 - 1e-6; tt += BEAT / 2, j++) s.pluck(tt, arp[[0, 2, 4, 2, 3, 5, 4, 6][j % 8]], 0.07, j % 2 ? 0.4 : -0.4, element === 'air' ? 0.6 : 0.35, element === 'water' ? 0.5 : element === 'fire' ? 1.1 : 0.8, 0.3)
  }
  for (let t = MA.start, b = 0; t < EN.start - 1e-6; t += BEAT, b++) {
    s.kick(t, ka * (b % 2 ? 0.7 : 0.85), kd, kfe, kfs, kcl * 0.5)
    if (b % 2 === 1) s.clap(t, E.clap[0] * 0.8, 0, 0.45, E.clap[1])
    hatT(t + BEAT / 2, E.hat.amp * 0.7, E.hat.dec * 1.5, 0.3)
    s.bell(t, leadRoot + 24 + [0, 7, 4, 12, 7, 14, 11, 16][b % 8] + (b >= 4 ? 0 : 0), 0.024, b % 2 ? 0.6 : -0.6, 0.8, 0.5, 3.5, 1.2) // sparkle
  }
  for (let j = 0; j < 4; j++) s.snare(EN.start - BEAT + j * BEAT / 4, 0.08 + 0.05 * j, j % 2 ? 0.2 : -0.2, 0.25)
  s.whoosh(EN.start, 1.0, 0.1, 300, 8000, 1)
  s.reverseBowl(EN.start, 0.9, bowlM, 0.07)

  // ---- 12–15 END: resolve, drums out, bowl rings, fade ----
  s.impact(EN.start, 0.75, 1.1, 0.7)
  s.bowl(EN.start, bowlM, 0.3, 0, 0.75, 1.2)
  s.bowl(EN.start + 0.015, bowlM - 12, 0.14, -0.25, 0.7, 1.2)
  s.bowl(EN.start + 1.5, bowlM + 7, 0.06, 0.4, 0.8, 0.8)
  s.padChord(EN.start, TL.duration, chord(R + 12, MIN), 0.02, 0.05, 0.01)
  s.sub(EN.start + 0.25, TL.duration - 0.05, B, 0.22, 0)

  // ---- mix ----
  s.processLead({ beat: BEAT, lp: E.leadLp, wet: element === 'air' ? 0.4 : 0.3, send: element === 'air' ? 0.5 : 0.25 })
  s.processPad({ cut: (t) => t < MA.start ? E.padCut : t < MA.start + 1.5 ? E.padCut + (E.padOpen - E.padCut) * ((t - MA.start) / 1.5) : E.padOpen, chorus: E.chorus, duck: element === 'fire' ? 0.5 : 0.35 })
  s.processDrums({ cut: (t) => (t < MA.start ? E.drumCut : Math.min(E.drumCut * 1.5, 18000)) })
  s.reverb({ inGain: E.rev })
  finish(s, `sign-${id}.wav`, { revWet: E.revWet, fadeOut: 0.3, limitDb: 1.5 })
}

// =====================================================================================
// 2. TWO SKIES (love) — 90 bpm, F major / D minor, tender -> swelling, IMPACT at 13.333 s
// =====================================================================================
function renderLove(TL) {
  const s = createSynth({ dur: TL.duration, seed: 0x10fe })
  const BEAT = 60 / TL.bpm // 0.6667
  const HIT = TL.hit, AP = TL.apart, OR = TL.orbit, UN = TL.union, AL = TL.aligned, EN = TL.end
  const at = (b) => b * BEAT // beat index -> seconds
  const breath = HIT - 0.2 // near-silence 13.133 -> 13.333

  // ---- 0–4 APART: soft pad, two distant bells, one per side ----
  s.padChord(0, OR.start, [53, 60, 64, 69], 0.02, 1.8, 0.8) // Fmaj7 (no 3rd low), slow bloom
  s.sub(0.5, OR.start + 0.3, 41, 0.05, 0, 3, 2)
  s.bell(0.35, 81, 0.08, -0.85, 0.9, 1.6, 3.5, 1.6) // sign A, far left
  s.bell(2.0, 84, 0.075, 0.85, 0.9, 1.6, 3.5, 1.6) // sign B, far right
  s.bell(3.0, 76, 0.035, -0.8, 0.9, 1.2, 3.5, 1.2)
  s.shimmer(1.0, OR.start + 0.2, [88, 93], 0.006, 0.6, 2, 1.5, 0.6)

  // ---- 4–9.33 ORBIT: heartbeat enters, slow progression, bells drawing in ----
  const prog = [ // [start beat, end beat, pad, bass]
    [6, 8, [50, 57, 60, 64, 65], 38], // Dm9
    [8, 10, [46, 53, 57, 62, 65], 34], // Bbmaj7
    [10, 12, [45, 53, 57, 60, 65], 33], // F/A
    [12, 14, [48, 53, 55, 60, 67], 36], // Csus4
    [14, 16, [50, 57, 60, 65, 69], 38], // Dm(add) — union begins
    [16, 18, [46, 53, 58, 62, 69], 34], // Bb(add9)
    [18, 20, [48, 55, 60, 64, 67], 36], // C
  ]
  prog.forEach(([b0, b1, pad, bs], n) => {
    const t0 = at(b0), t1 = Math.min(at(b1), breath)
    s.padChord(t0, t1, pad, n < 4 ? 0.013 : 0.017, 0.5, n === 6 ? 0.02 : 0.5)
    s.bassNote(t0, t1 - 0.02, bs + 12, 0.18, 0.5)
    s.sub(t0, t1 - 0.02, bs, 0.14, 0.5)
  })
  // the two bell voices: one per chord change, panned in toward the centre
  const bellNotes = [[81, 84], [77, 81], [72, 77], [79, 84], [81, 77], [74, 77], [79, 76]]
  prog.forEach(([b0], n) => {
    const p = 0.8 - 0.75 * (n / 6), [ma, mb] = bellNotes[n]
    s.bell(at(b0) + 0.02, ma, 0.055, -p, 0.8, 1.3, 3.5, 1.5)
    s.bell(at(b0 + 1) + 0.02, mb, 0.05, p, 0.8, 1.3, 3.5, 1.5)
  })
  // heartbeat: lub (beat) + dub (beat + 0.18 s); every 2 beats, then every beat, then every half beat
  const heart = (t, a) => { s.kick(t, 0.55 * a, 0.16, 42, 92, 0.05); s.kick(t + 0.18, 0.4 * a, 0.13, 40, 82, 0.03); s.cutHit(t, 0.12 * a, 900) }
  for (let b = 6; b < 14; b += 2) heart(at(b), 0.75 + 0.03 * (b - 6))
  for (let b = 14; b < 18; b += 1) heart(at(b), 0.9 + 0.025 * (b - 14))
  for (let b = 18; b < 19.6; b += 0.5) heart(at(b), 1.0)

  // ---- 9.33–13.33 UNION build: riser, strings swell, breath, IMPACT ----
  s.strings(at(14), breath, [53, 57, 60, 65, 69, 72], 0.011, breath - at(14), 0.02, 2.2)
  s.whoosh(breath, 3.2, 0.12, 200, 8000, 1)
  s.riserTone(at(17), breath, [[53, -0.5], [60, 0.5]], 12, 0.035)
  s.reverseBowl(breath, 1.6, 77, 0.08)
  s.shimmer(at(16), breath, [84, 89, 93, 96], 0.016, 3, 14, 0.3, 0.02, 0)

  // IMPACT (warm, big): kick + boom + bowls + a lush F chord
  s.impact(HIT, 1.15, 1.5, 0.8)
  s.bowl(HIT, 53, 0.3, -0.15, 0.8, 1.3)
  s.bowl(HIT + 0.01, 65, 0.2, 0.2, 0.8, 1.2)
  s.bell(HIT, 84, 0.04, -0.2, 0.9, 1.8, 3.5, 1.4); s.bell(HIT, 81, 0.04, 0.2, 0.9, 1.8, 3.5, 1.4) // the two voices, together at centre
  const LUSH = [53, 57, 60, 64, 67, 69, 72, 76]
  s.padChord(HIT, at(24), LUSH, 0.017, 0.04, 0.6) // Fmaj9 bloom
  s.strings(HIT, at(24), [65, 69, 72, 76], 0.009, 0.5, 0.6, 1)
  s.sub(HIT + 0.3, at(24) - 0.02, 41, 0.13, 0, 0.3)
  s.bassNote(HIT + 0.3, at(24) - 0.02, 41, 0.14, 0)
  // 14–17 gentle melody over the bloom
  const MEL = [[21, 77, 1], [22, 79, 1], [23, 81, 1.4], [24.5, 79, 0.5], [25, 77, 1], [25.5, 74, 0.45], [26, 77, 2.4]]
  for (const [b, m, d] of MEL) s.flute(at(b), at(b) + d * BEAT - 0.04, m, 0.06, 0.1, 0.007)
  for (let b = 21; b < 26; b += 1) s.kick(at(b), 0.32, 0.18, 42, 90, 0.02) // soft heartbeat under the bloom
  s.padChord(at(24), at(26), [53, 58, 62, 65, 69], 0.015, 0.4, 0.6) // Bb/F
  s.sub(at(24), at(26), 41, 0.11, 0, 0.1)
  // 17.33–20 resolve and fade
  s.padChord(at(26), TL.duration, [53, 57, 60, 65, 69, 72], 0.016, 0.6, 0.01)
  s.sub(at(26), TL.duration - 0.05, 41, 0.1, 0, 0.1)
  s.bowl(at(26), 65, 0.12, 0, 0.8, 1)
  s.bell(at(27), 81, 0.025, -0.3, 0.9, 1.5, 3.5, 1.2); s.bell(at(28), 84, 0.022, 0.3, 0.9, 1.5, 3.5, 1.2)

  s.processLead({ beat: BEAT, lp: 4500, wet: 0.35, send: 0.45 })
  s.processPad({ cut: (t) => t < OR.start ? 900 + 300 * t : t < HIT ? 1600 + 1500 * Math.max(0, (t - at(14)) / (HIT - at(14))) : t < at(26) ? 3800 : 3800 - 1600 * ((t - at(26)) / (TL.duration - at(26))), duck: 0.25 })
  s.processDrums({ cut: (t) => (t < HIT ? 1100 : 2500) })
  s.reverb({ inGain: 0.02, fb: 0.87, resetAt: [breath] })
  finish(s, 'love.wav', { revWet: 3.2, drive: 1.4, fadeOut: 0.4, limitDb: 2, gates: [{ start: breath, end: HIT, floor: 0.012, ramp: 0.03 }] })
}

// =====================================================================================
// 3. COUNTDOWN + FOUNDERS — 120 bpm, D Dorian. 7 hits root -> crown, sky opens at 7.5, stamp at 10
// =====================================================================================
function renderLaunch(TL) {
  const s = createSynth({ dur: TL.duration, seed: 0x1a0c })
  const BEAT = 60 / TL.bpm, CD = TL.countdown, OP = TL.opens, FO = TL.founders
  const OPEN = OP.start, gap0 = OPEN - 0.08
  const ASCENT = [62, 64, 65, 67, 69, 71, 72] // D E F G A B C — root to crown, one scale step per numeral
  const CH = [[50, 57, 62, 65], [52, 57, 60, 64], [53, 57, 60, 65], [55, 59, 62, 67], [53, 57, 62, 69], [55, 59, 62, 71], [55, 60, 64, 72]]

  // ---- 0–7.5 COUNTDOWN ----
  s.drone(0, gap0, [[38, 0.12], [45, 0.06], [50, 0.04], [57, 0.02]], 160, 1800, 0.4, 0.02)
  s.sub(0.02, gap0, 38, 0.14, 0.3, gap0, 2)
  for (let t = 0, n = 0; t < gap0 - 1e-6; t += BEAT / 2, n++) { // clock: tick on every half beat
    const p = t / gap0, on = n % 2 === 0
    s.tick(t, (on ? 0.16 : 0.11) * (0.7 + 0.6 * p), on ? 3400 : 2600, on ? -0.15 : 0.15)
  }
  for (let c = 0; c < 7; c++) {
    const t = CD.start + 0.5 + c * CD.each, p = c / 6
    s.kick(t, 0.7 + 0.3 * p, 0.3 + 0.08 * p, 44, 160)
    s.cutHit(t, 0.4 + 0.3 * p)
    s.bowl(t, ASCENT[c], 0.18 + 0.03 * c, c % 2 ? 0.25 : -0.25, 0.45, 0.6)
    s.padChord(t, t + CD.each, CH[c], 0.01 + 0.0025 * c, 0.05, c === 6 ? 0.02 : 0.3)
    s.bassNote(t, t + 0.4, 38 + (ASCENT[c] - 62), 0.25 + 0.05 * p)
    if (c >= 2) s.clap(t + BEAT, 0.12 + 0.06 * p, 0, 0.3)
    if (c >= 3) for (let j = 0; j < 4; j++) s.hat(t + j * BEAT / 2 + BEAT / 4, 0.03 + 0.04 * p, 0.02, j % 2 ? 0.35 : -0.35)
    if (c >= 4) { const th = t + BEAT; s.kick(th, 0.6, 0.22, 36, 110, 0.05); s.cutHit(th, 0.35, 1200); s.sub(th, th + 0.35, 38, 0.22, 0) } // sub-hit on the half
  }
  // snare roll + riser in the last 2 s
  for (let t = 5.5, n = 0; t < gap0 - 0.01; n++) { const p = (t - 5.5) / (gap0 - 5.5); s.snare(t, 0.06 + 0.22 * p * p, n % 2 ? 0.2 : -0.2, 0.2); t += p < 0.4 ? BEAT / 4 : p < 0.75 ? BEAT / 8 : BEAT / 16 }
  s.whoosh(gap0, 2.0, 0.13, 200, 9000, 1)
  s.riserTone(5.5, gap0, [[50, -0.5], [57, 0.5]], 24, 0.04)
  s.reverseBowl(gap0, 1.5, 74, 0.08)

  // ---- 7.5 THE SKY OPENS: massive impact + white-noise burst, shimmering chord ----
  s.impact(OPEN, 1.3, 1.5, 1)
  s.noiseBurst(OPEN, 0.32, 2.0, 0.7)
  s.bowl(OPEN, 50, 0.3, -0.2, 0.8, 1.2)
  s.bowl(OPEN + 0.01, 62, 0.22, 0.25, 0.8, 1.1)
  s.padChord(OPEN, FO.start, [50, 57, 62, 64, 69, 74, 76], 0.02, 0.03, 0.15)
  s.strings(OPEN, FO.start, [62, 69, 74, 78], 0.007, 0.8, 0.15, 1)
  s.shimmer(OPEN + 0.1, FO.start, [74, 81, 86, 88, 93], 0.022, 5, 9, 0.6, 0.3)
  s.sub(OPEN + 0.4, FO.start - 0.05, 38, 0.1, 0, 0.5)
  s.reverseBowl(FO.start, 0.8, 69, 0.08)
  s.whoosh(FO.start, 0.7, 0.1, 300, 7000, -1)

  // ---- 10 FOUNDING CARD STAMP + 10–15 groove ----
  s.kick(FO.start, 1.15, 0.4, 42, 180)
  s.cutHit(FO.start, 0.8)
  s.coin(FO.start, 0.22)
  s.bowl(FO.start, 74, 0.12, 0.2, 0.7, 0.8)
  const GR = [['Dm', [50, 57, 62, 65, 69], 38], ['F', [53, 57, 60, 65, 72], 41], ['G', [55, 59, 62, 67, 71], 43], ['C', [52, 55, 60, 64, 67], 36]]
  const ARP = { Dm: [62, 65, 69, 74], F: [65, 69, 72, 77], G: [67, 71, 74, 79], C: [64, 67, 72, 76] }
  const grEnd = 14
  for (let k = 0; k < 4; k++) {
    const t = FO.start + k, [name, pad, r] = GR[k]
    s.padChord(t, t + 1, pad, 0.018, 0.04, 0.2)
    s.bassNote(t, t + 0.45, r, 0.48); s.bassNote(t + 0.5, t + 0.7, r + 12, 0.3); s.bassNote(t + 0.75, t + 0.97, r, 0.42)
    for (let j = 0; j < 4; j++) s.lead(t + j * BEAT / 2, ARP[name][[0, 2, 1, 3][j]] + (k === 3 && j === 3 ? 12 : 0), 0.06, j % 2 ? 0.35 : -0.35)
  }
  for (let t = FO.start, b = 0; t < grEnd - 1e-6; t += BEAT, b++) {
    if (b > 0) s.kick(t, 1.0, 0.3)
    if (b % 2 === 1) s.clap(t, 0.3, 0)
    for (let j = 0; j < 4; j++) s.hat(t + j * BEAT / 4, j === 2 ? 0.1 : 0.045, j === 2 ? 0.04 : 0.018, j % 2 ? 0.4 : -0.4)
  }
  s.kick(FO.start + 1.75, 0.6); s.kick(FO.start + 3.25, 0.6)
  for (let j = 0; j < 4; j++) s.clap(grEnd - BEAT / 2 + j * BEAT / 8, 0.1 + 0.05 * j, j % 2 ? 0.3 : -0.3, 0.2, 1200 + 400 * j)
  // 14: resolve home on D
  s.impact(grEnd, 0.7, 1.0, 0.6)
  s.bowl(grEnd, 62, 0.24, 0, 0.75, 1.1)
  s.bowl(grEnd + 0.015, 50, 0.14, -0.3, 0.7, 1.1)
  s.coin(grEnd, 0.08, 2800)
  s.padChord(grEnd, TL.duration, [50, 57, 62, 64, 65, 69], 0.02, 0.05, 0.01)
  s.sub(grEnd + 0.2, TL.duration - 0.05, 38, 0.11, 0, 0.3)

  s.processLead({ beat: BEAT, lp: 4600 })
  s.processPad({ cut: (t) => t < OPEN ? 900 + 1400 * (t / OPEN) ** 2 : t < FO.start ? 4200 : 3000 })
  s.reverb({ inGain: 0.016, resetAt: [gap0] })
  finish(s, 'launch.wav', { revWet: 3, fadeOut: 0.3, limitDb: 1.5, gates: [{ start: gap0, end: OPEN, floor: 0, ramp: 0.004 }] })
}

// =====================================================================================
// 4. INTO THE VORTEX — 120 bpm, D Lydian/major, ambient-cinematic fall; chapters every 2 s, emerge at 16
// =====================================================================================
function renderVortex(TL) {
  const s = createSynth({ dur: TL.duration, seed: 0x7047e })
  const BEAT = 60 / TL.bpm, DE = TL.descent, EM = TL.emerge
  const BLOOM = 0.5, breath = EM.start - 0.4
  // ascending ethereal progression, one chord per chapter: Dmaj9  Em9  F#m7  Gmaj7#11  A(add9)  Bm9  Asus4(add9)
  const PROG = [
    [50, [62, 66, 69, 73, 76]], [52, [64, 67, 71, 74, 78]], [54, [66, 69, 73, 76, 81]], [55, [67, 71, 74, 78, 85]],
    [57, [69, 73, 76, 81, 83]], [59, [71, 74, 78, 81, 85]], [57, [69, 74, 76, 81, 86]],
  ]

  // ---- 0–0.5 a spark in the dark ----
  s.bell(0.06, 98, 0.03, 0.2, 0.9, 0.5, 2.0, 0.8)
  s.bell(0.22, 105, 0.012, -0.3, 0.9, 0.35, 2.0, 0.5)

  // ---- 0.5 the vortex blooms: deep whoosh, sub boom, and the wind that carries the fall ----
  s.whoosh(BLOOM, 0.45, 0.1, 120, 1600, 1)
  s.boom(BLOOM, 0.5, 0.9, 34, 45, 0.01)
  s.kick(BLOOM, 0.45, 0.4, 38, 90, 0)
  s.bowl(BLOOM, 50, 0.16, 0, 0.8, 1.0)
  s.cymbalSwell(BLOOM, BLOOM + 3, 0.05, -1, 0.8)
  s.wind(BLOOM, breath, 220, 4200, 0.03, 0.11, 0.8, 0.6, 0.15, 0.5, 1.4)
  s.wind(BLOOM + 0.2, breath, 900, 9000, 0.008, 0.05, 1.6, 1.2, 0.15, 0.6, 2)
  s.drone(BLOOM, breath, [[38, 0.08], [45, 0.05], [50, 0.03]], 150, 900, 1.2, 0.05)

  // ---- 2–16 seven chapters ----
  PROG.forEach(([root, ch], c) => {
    const t = DE.start + c * DE.each, t1 = Math.min(t + DE.each, breath), p = c / 6
    // crystalline chord: bowl on the root + strummed bells
    s.bowl(t, root + 12, 0.13 + 0.015 * c, c % 2 ? 0.2 : -0.2, 0.8, 0.7)
    ch.forEach((m, j) => s.bell(t + j * 0.035, m + 12, 0.028 + 0.004 * c, (j / (ch.length - 1)) * 1.4 - 0.7, 0.9, 1.1, 3.0 + 0.5 * (j % 2), 1.2 + 0.4 * p))
    s.whoosh(t, 0.9, 0.05 + 0.04 * p, 350, 5000 + 3000 * p, c % 2 ? -1 : 1) // fly-through into the downbeat
    s.wobblePad(t, t1, ch.slice(0, 4), 0.006 + 0.003 * p, c === 0 ? 1.2 : 0.3, c === 6 ? 0.03 : 0.5, 14)
    s.sub(t, t1 - 0.02, root - 12 < 33 ? root : root - 12, 0.09 + 0.03 * p, 0.4, 0.25)
    s.shimmer(t, t1, [ch[2] + 24, ch[4] + 12], 0.004 + 0.006 * p, 4, 7, 0.3, 0.4)
  })
  // half-time pulse from 4 s: felt kick + rim + shaker, growing in density and brightness
  for (let t = 4; t < breath - 1e-6; t += BEAT) {
    const b = Math.round((t - 4) / BEAT) % 4, p = (t - 4) / (breath - 4)
    if (b === 0) s.kick(t, 0.55 + 0.25 * p, 0.28, 44, 95, 0.01)
    if (b === 2) s.tick(t, 0.07 + 0.06 * p, 1750, 0.1, 0.4) // rim on the half-time backbeat
    if (t >= 8 && b === 1) s.kick(t + BEAT / 2, 0.35 + 0.15 * p, 0.22, 44, 90, 0.01)
    if (t >= 12 && b === 3) s.kick(t + BEAT / 2, 0.3, 0.2, 44, 90, 0.01)
    const div = t < 8 ? 2 : 4 // shaker: 8ths, then 16ths
    for (let j = 0; j < div; j++) { const acc = j === div / 2; s.hat(t + j * BEAT / div + (j % 2 ? 0.012 : 0), (acc ? 0.035 : 0.02) * (0.6 + 0.8 * p), 0.03 + 0.02 * (1 - p), j % 2 ? 0.45 : -0.45, 4200 + 3000 * p, 0.3) }
  }
  // into the breath: reverse cymbal and a backwards bowl
  s.cymbalSwell(breath - 2.2, breath, 0.13, 1, 0.4)
  s.reverseBowl(breath, 1.6, 74, 0.07)

  // ---- 16 EMERGE: a warm, airy bloom ----
  const E = EM.start
  s.boom(E, 0.4, 1.1, 36, 30, 0.02)
  s.kick(E, 0.4, 0.45, 38, 80, 0)
  s.bowl(E, 50, 0.26, -0.15, 0.85, 1.3)
  s.bowl(E + 0.012, 62, 0.18, 0.2, 0.85, 1.2)
  const LUSH = [50, 57, 62, 66, 69, 73, 76, 81]
  s.padChord(E, TL.duration, LUSH, 0.016, 0.18, 0.01)
  s.strings(E, TL.duration, [62, 69, 74, 78], 0.008, 0.6, 0.01, 1)
  s.wobblePad(E, TL.duration, [74, 78, 81, 85], 0.006, 0.8, 0.01, 10)
  ;[74, 78, 81, 85, 88].forEach((m, j) => s.bell(E + 0.02 + j * 0.05, m, 0.035, j / 2 - 1, 0.95, 2.0, 3.5, 1.2))
  s.cymbalSwell(E, E + 3.5, 0.09, -1, 0.9) // the airy tail
  s.wind(E, TL.duration, 2500, 900, 0.04, 0.01, 0.8, 0.4, 0.5, 0.6, 1)
  s.sub(E + 0.3, TL.duration - 0.05, 38, 0.12, 0, 0.4)
  // 16–20 the bell rings out
  s.bell(E + 1.5, 86, 0.03, 0.35, 0.95, 1.8, 3.5, 1.1)
  s.bell(E + 2.5, 81, 0.025, -0.35, 0.95, 1.6, 3.5, 1.0)
  s.bowl(E + 2.0, 69, 0.07, 0.3, 0.9, 0.9)

  s.processLead({ beat: BEAT })
  s.processPad({ cut: (t) => t < DE.start ? 1200 : t < breath ? 1600 + 2600 * ((t - DE.start) / (breath - DE.start)) : t < E ? 4200 : 3600, duck: 0.15 })
  s.processDrums({ cut: (t) => (t < 8 ? 4500 : t < breath ? 4500 + 7000 * ((t - 8) / (breath - 8)) : 6000) })
  s.reverb({ inGain: 0.022, fb: 0.88, damp: 0.3, resetAt: [breath] })
  finish(s, 'vortex.wav', { revWet: 3.6, drive: 1.3, fadeOut: 0.4, limitDb: 2, gates: [{ start: breath, end: E, floor: 0.015, ramp: 0.02 }] })
}

// =====================================================================================
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const want = (n) => !only.length || only.includes(n)
console.log('Align teaser audio ->', OUT)
const SIGN_TL = loadTL('sign.js')
SIGNS.forEach(([id], i) => { if (want(id) || want('signs')) renderSign(i, SIGN_TL) })
if (want('love')) renderLove(loadTL('love.js'))
if (want('launch')) renderLaunch(loadTL('launch.js'))
if (want('vortex')) renderVortex(loadTL('vortex.js'))
console.log(`done in ${((performance.now() - T0) / 1000).toFixed(1)}s`)
