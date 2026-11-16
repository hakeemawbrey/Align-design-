// og-stsupernova — social rework of stsupernova ("Supernova."). --social: story 0–50.1, no end card.
//   HOOK (static, main.js) on screen 0–4.4; the film's own animated title H0 and its word-pop cues are removed, frame 0
//   already shows the scene (no fade from black). Gentle cut: no camera shake, no white flash, no crash at the nova.
//   0.0–4.4    (hook up.) ♈ ARIES bounces with heart-eyes, leaps and lands squashed flat. A big pink star basks behind it.
//              Pisces is already crying.  THE STARS: "oh no. *here we go.*"
//   4.5–15.0   "It’s still | *day 3.*"  The texts pile up a minute apart: "good morning soulmate (sobbing)" · "told my mom
//              AND my dentist" · "matching outfits. forever??" → a matching hoodie drops onto Aries (a tiny one onto
//              Pisces) · "booked us a trip. 3 weeks." The big star swells with every text.  "Day 4: | *a ring.*"  The
//              ring box opens, the whole sky gasps.  ARIES: "I SAID YES BEFORE YOU *ASKED.*"
//  15.1–23.9   "Expert | *opinion.*"  The narrator drifts in. THE STARS: "sweetie, we ARE stars. we invented *burning.*" ·
//              "the ones that burn *this bright,* this fast…"  Everyone turns to the big pink star; it sweats, trembles, swells…
//  23.94       …"*Supernova.*" (soft pink bloom, no flash or shake) A tiny leftover star zips off. THE STARS: "…don’t stick
//              *around.*"  Pisces, sobbing, holds up a "10".
//  27.4–31.3   Aries peeks out of its hood: "…the hoodie stays. *forever.*"  "Synchronized | *eye-roll.*"
//  31.6–40.1   "Meanwhile, | *the Sun.*"  The Sun rolls in. THE STARS: "the Sun has burned forever and *never rushed.*" →
//              the Sun's wink. "if it’s real, it’ll still be there on *date 2.*"
//  40.6–44.8   ★ LESSON UNLOCKED: "Intensity isn’t | *intimacy.* | Let it grow." (+1 PATIENCE)
//              (the original's "Push. Pull. Align." chart reading, an app-promo beat, is cut; section 9 moves up 10 beats)
//  45.5–50.1   "Slow burns | *last.*"  Aries takes its hoodie off; it folds in mid-air and lands in Aries' arms; a pat.
//              The Sun and the narrator pop back in; the Sun winks. Pisces keeps its hoodie on (and cries). The final
//              pop-out is pushed past STORY_END so the last frame is this beat.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { hoodieStar, drawFlatHoodie, drawBubble, drawRingBox, drawSun, drawNova, drawTears, eyesOf, drawSweat, drawHearts, sparkBurst, speedLines, drawScorecard, glowAt, mixHex } from './props.js'

export const DURATION = 54.5                    // the original's 60 s minus the cut chart reading (10 beats)
export const HOOK = 'They said soulmate | on *day three.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 4.4
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 50.1
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', HOT = '#ff5c9a', LAV = '#c9a6ff', SUNC = '#ffc34a', ARI_TXT = '#ff8f66'
const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)            // 108 bpm grid
const ARI = signStar('aries'), PIS = signStar('pisces')
const A_TAG = `${ARI.glyph} ARIES`, S_TAG = 'THE STARS'
const BIG_COL = '#ff9ccb'

// ── the timeline
const S9 = +(10 * 0.5556).toFixed(3)
export const T = {
  black: [0, 0.3],
  // 1 · day 3
  h0: 0.08, h0Land: BEAT(1), h0Out: [4.22, 4.4],
  hops0: [0.3, 0.72], jump: [1.16, BEAT(2)], slam: BEAT(2),
  open0: 2.2, l0: 2.4, close0: 4.5,
  // 2 · the texts
  h1: 4.52, h1Land: 4.98, h1Out: [10.3, 10.47],
  b: [BEAT(8), BEAT(10), BEAT(12), BEAT(16)],
  hoodFall: [7.86, BEAT(14)], pisFall: [8.66, 9.06],
  h2: 10.5, h2Land: 10.98, ringIn: BEAT(18), ringOpen: 11.16, gasp: BEAT(20),
  open1: 11.86, l1: 12.04, close1: 14.82,
  sweep: [14.42, 14.95], h2Out: [14.6, 14.78],
  cut1: 15.05,
  // 3 · expert opinion
  h3: 15.12, h3Land: 15.56, h3Out: [21.92, 22.1],
  narrIn: [15.12, 16.05], slowBlink: [16.25, 17.05],
  open2: 16.88, l2: 17.08, l3: 20.42,
  turn: [22.06, 22.42], wake: 22.5, nervous: [22.66, 23.2], sweat: 22.8, swell: [23.0, BEAT(42)],
  flash: BEAT(42),
  // 4 · supernova
  h4: 24.0, h4Out: [27.2, 27.38],
  remIn: 24.32, remBlink: 24.84, remL: 24.98, remR: 25.3, zip: [25.56, 25.84],
  card10: [24.85, 27.25], l4: 25.96,
  // 5 · the callback
  peek: [27.42, 27.74], l5: 28.2, roll: [BEAT(52), 30.62], h5: BEAT(52) - 0.02, h5Out: [31.1, 31.28], close2: 31.12,
  cut2: 31.6,
  // 6 · the Sun
  sunIn: [31.64, 32.98], h6: 31.72, h6Land: 32.2, h6Out: [39.92, 40.1],
  open3: 33.02, l6: 33.22, wink: [35.32, 36.55], l7: 36.78, close3: 40.15,
  // 7 · the lesson
  lesson: BEAT(72), lessonOut: [44.62, 44.82], castOut: [40.36, 40.66],
  // (8 · the chart reading is cut in the social rework)
  cut3: 44.9,
  // 9 · slow burns last (moved up 10 beats = S9 s; the pop-out is pushed past STORY_END: the film ends on this beat)
  hoodOff: [51.02 - S9, 51.4 - S9], flatIn: 51.32 - S9, folds: [51.98 - S9, 52.42 - S9, 52.86 - S9], settle: [53.0 - S9, 53.32 - S9], pat: 53.36 - S9,
  castIn: 53.24 - S9, h8: 51.3 - S9, h8Land: BEAT(84), sunWink: [53.86 - S9, 54.72 - S9], h8Out: [51.5, 51.6], out: [51.5, 51.6],
}
const LINES0 = [{ t: T.l0, speaker: S_TAG, text: 'oh no. *here we go.*' }]
const LINES1 = [{ t: T.l1, speaker: A_TAG, color: ARI_TXT, text: 'I SAID YES BEFORE YOU *ASKED.*' }]
const LINES2 = [
  { t: T.l2, speaker: S_TAG, text: 'sweetie, we ARE stars. we invented *burning.*' },
  { t: T.l3, speaker: S_TAG, text: 'the ones that burn *this bright,* this fast…' },
  { t: T.l4, speaker: S_TAG, text: '…don’t stick *around.*' },
  { t: T.l5, speaker: A_TAG, color: ARI_TXT, text: '…the hoodie stays. *forever.*' },
]
const LINES3 = [
  { t: T.l6, speaker: S_TAG, text: 'the Sun has burned forever and *never rushed.*' },
  { t: T.l7, speaker: S_TAG, text: 'if it’s real, it’ll still be there on *date 2.*' },
]
const ALL_LINES = [...LINES0, ...LINES1, ...LINES2, ...LINES3]
const CPS = 28
export const LT = lineTimes(ALL_LINES, { cps: CPS })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Intensity isn’t | *intimacy.* | Let it grow.', chip: '+1 PATIENCE', dim: 0.72 }
const BUBBLES = [
  { text: 'good morning soulmate (sobbing)', label: 'them · 9:02 AM' },
  { text: 'told my mom AND my dentist', label: 'them · 9:03 AM' },
  { text: 'matching outfits. forever??', label: 'them · 9:03 AM' },
  { text: 'booked us a trip. 3 weeks.', label: 'them · 9:04 AM' },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const D2R = Math.PI / 180

// ── where everyone stands (world coords; the camera maps them to the screen)
const P_ARI = { x: 540, y: 1238, s: 340 }
const P_PIS = { x: 870, y: 1330, s: 140 }        // social: in from the app-button edge
const P_BIG = { x: 832, y: 742 }
const P_NAR = { x: 250, y: 842, s: 290 }
const P_SUN = { x: 790, y: 800, cell: 9 }
const BUB = { x: 74, y0: 584, dy: 128 }
const SKY = [
  { x: 112, y: 1180, s: 92, col: '#dce6ff', seed: 21, wake: 5.35, look: [1, 0] },
  { x: 268, y: 1404, s: 76, col: '#ffe8c8', seed: 22, wake: 6.5, look: [1, -1] },
  { x: 952, y: 930, s: 86, col: '#eadcff', seed: 23, wake: 7.6, look: [-1, 0] },
  { x: 742, y: 1418, s: 70, col: '#dce6ff', seed: 24, wake: 9.7, look: [-1, -1] },
  { x: 74, y: 1402, s: 66, col: '#fff0d8', seed: 25, wake: 10.75, look: [1, -1] },
]

// ── the camera: keys [t, zoom, focusX, focusY] (the focus maps to the screen centre 540, 960), eased between
const CAM = [
  [0, 1, 540, 960], [T.gasp - 0.02, 1, 540, 960], [T.gasp + 0.16, 1.05, 530, 1000], [T.sweep[0], 1.05, 530, 1000], [T.sweep[1], 1, 540, 960],
  [T.turn[0], 1, 540, 960], [T.flash - 0.02, 1.08, 640, 900], [T.flash + 0.9, 1, 540, 960],   // social: no snap back
  [T.peek[0] - 0.1, 1, 540, 960], [T.peek[1], 1.08, 540, 1080], [T.roll[0] - 0.05, 1.09, 540, 1085], [T.roll[0] + 0.3, 1, 540, 960],
  [T.settle[1], 1, 540, 960], [T.out[0], 1.04, 540, 1010],
]
function cam(t) {
  if (t <= CAM[0][0]) return { z: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0], e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { z: z[1], fx: z[2], fy: z[3] }
}
/** camera shake (px) from hits: off in the social cut (gentle) */
function shake(t) {
  return [0, 0]
  let a = 0
  for (const [t0, amp, d] of [[T.slam, 16, 0.35], [T.hoodFall[1], 7, 0.25], [T.gasp, 9, 0.3], [T.flash, 26, 0.6]]) { const k = t - t0; if (k >= 0 && k < d) a = Math.max(a, amp * (1 - k / d)) }
  if (inR(t, T.swell)) a = Math.max(a, 2 + 9 * prog(t, ...T.swell))
  return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
}

// ── Aries
const A_HOPS = [T.hops0[0], T.hops0[1], T.slam + 0.42, T.slam + 0.84, ...T.b.map(b => b + 0.04), T.ringOpen + 0.05, T.ringOpen + 0.45, ...talkHops(LINES1, A_TAG, { cps: CPS }),
  ...talkHops(LINES2, A_TAG, { cps: CPS }), 32.3, 36.0, T.lesson + 0.1, T.pat, T.pat + 0.42]
function ariState(t) {
  const st = { mood: 'heart', look: [0, 0], blink: undefined, squash: 0, dy: 0, down: 0, on: 0, lift: 0, sweat: 0 }
  st.on = t >= T.hoodFall[1] && t < T.hoodOff[1] ? 1 : 0
  if (t >= T.hoodOff[0] && t < T.hoodOff[1]) { const p = prog(t, ...T.hoodOff); st.lift = 300 * ease.inCubic(p); st.on = 1 - ease.inQuad(prog(p, 0.55, 1)) }
  // 1 · the hook: two happy hops, a leap, a slam (pancake squash), springy recovery
  if (t < T.h1) {
    if (inR(t, T.jump)) { const p = prog(t, ...T.jump); st.dy = -300 * Math.sin(Math.PI * Math.pow(p, 0.85)); st.squash = p < 0.12 ? 0.18 * (1 - p / 0.12) : -0.16 * Math.sin(Math.PI * p) }
    else if (t >= T.slam) { const k = t - T.slam; st.squash = k < 0.17 ? 0.56 * Math.sin(Math.min(1, k / 0.05) * Math.PI / 2) : 0.56 * Math.exp(-(k - 0.17) * 6) * Math.cos((k - 0.17) * 16); st.dy = 0 }
    if (t >= T.l0 + 0.15) st.look = [0, -1]
    return st
  }
  // 2 · the texts
  if (t < T.cut1) {
    st.look = [-1, -1]
    if (inR(t, [T.hoodFall[1], T.hoodFall[1] + 0.75])) { const k = t - T.hoodFall[1]; st.squash = 0.32 * Math.exp(-k * 6) * Math.cos(k * 20); st.mood = k < 0.42 ? 'wide' : 'happy' }
    else if (t >= T.hoodFall[1] + 0.75 && t < T.b[3]) st.mood = 'happy'
    if (t >= T.ringOpen && t < T.l1) { st.mood = 'sparkle'; st.look = [1, 0] }
    if (t >= T.l1) { st.mood = 'heart'; st.look = [0, 0] }
    return st
  }
  // 3 · expert opinion
  if (t < T.flash) {
    st.mood = t < T.l2 + 0.6 ? 'heart' : 'neutral'
    st.look = [-1, -1]
    if (t >= T.turn[0]) { st.mood = 'neutral'; st.look = [1, -1]; st.blink = false }
    if (t >= T.swell[0]) { st.mood = 'wide'; st.sweat = 1 }
    return st
  }
  // 4 · supernova: duck into the hood
  if (t < T.peek[0]) { st.down = ease.outBack(prog(t, T.flash, T.flash + 0.16)); st.mood = 'wide'; st.squash = 0.12 * clamp(prog(t, T.flash, T.flash + 0.12)) - 0.02 * Math.sin(t * 40) * (t < T.flash + 1.2 ? 1 : 0); return st }
  // 5 · peek out: "…but the matching hoodies tho" — puppy eyes through the eye-roll
  if (t < T.cut2) {
    const p = ease.outBack(prog(t, ...T.peek))
    st.down = lerp(1, t < T.l5 + 0.5 ? 0.56 : 0.4, p); st.mood = t < T.l5 + 0.3 ? 'wide' : 'sparkle'; st.look = [0, 1]
    if (t >= T.close2 - 0.25) st.down = lerp(0.4, 0, ease.inOutCubic(prog(t, T.close2 - 0.25, T.close2 + 0.2)))
    return st
  }
  // 6 · the Sun
  if (t < T.lesson) {
    st.mood = t < T.sunIn[1] - 0.2 ? 'wide' : t < T.wink[0] + 0.2 ? 'neutral' : t < T.l7 + 1.2 ? 'sparkle' : 'happy'
    st.look = t < T.wink[0] + 0.2 ? [1, -1] : [0, 0]
    return st
  }
  // 7 · the lesson
  if (t < T.hoodOff[0]) { st.mood = t < T.lesson + 1.5 ? 'neutral' : 'happy'; st.look = [0, -1]; return st }
  // 9 · fold it
  st.mood = t < T.hoodOff[1] ? 'wide' : t < T.pat ? 'happy' : 'sparkle'
  st.look = t < T.settle[1] ? [0, -1] : [0, 0]
  return st
}

// ── Pisces (always crying, always in the back)
function pisState(t) {
  const st = { mood: 'sparkle', look: [0, 0], tears: 0.7, fountain: false, on: t >= T.pisFall[1] ? 1 : 0, squash: 0, hug: 0 }
  if (t >= T.b[1] && t < T.cut1) { st.tears = 1; st.fountain = true }
  if (t >= T.pisFall[1] && t < T.pisFall[1] + 0.6) { st.mood = 'heart'; st.squash = 0.25 * Math.exp(-(t - T.pisFall[1]) * 6) * Math.cos((t - T.pisFall[1]) * 18) }
  if (t >= T.gasp && t < T.cut1) st.mood = 'heart'
  if (t >= T.cut1 && t < T.flash) { st.mood = 'neutral'; st.look = [-1, -1]; st.tears = 0.35 }
  if (t >= T.turn[0] && t < T.flash) { st.mood = t < T.swell[0] ? 'neutral' : 'wide'; st.look = [-1, -1]; st.tears = 0.45 }   // Pisces always cries
  if (t >= T.flash && t < T.peek[0]) { st.mood = t < T.flash + 0.5 ? 'wide' : 'sparkle'; st.tears = t < T.flash + 0.5 ? 0.6 : 1; st.fountain = true; st.look = [-1, -1] }
  if (t >= T.peek[0] && t < T.cut2) { st.mood = t >= T.roll[0] ? 'heart' : 'sparkle'; st.tears = 0.6; if (t >= T.roll[0]) { st.hug = Math.sin(Math.PI * clamp(prog(t, T.roll[0], T.roll[1] + 0.3))); st.squash = 0.14 * st.hug } }
  if (t >= T.cut2 && t < T.lesson) { st.mood = t >= T.wink[0] && t < T.l7 + 1 ? 'heart' : 'sparkle'; st.tears = t >= T.wink[0] ? 1 : 0.5; st.fountain = t >= T.wink[0] && t < T.l7 + 1 }
  if (t >= T.lessonOut[1]) { st.mood = 'sparkle'; st.tears = 0.8; st.fountain = t >= T.settle[1] }
  return st
}

// ── the big pink star (it basks; every text makes it bigger and brighter… until it doesn't)
function bigState(t) {
  let n = 0
  for (const b of T.b) n += ease.outBack(prog(t, b + 0.05, b + 0.4))
  n += 1.3 * ease.outBack(prog(t, T.ringOpen, T.ringOpen + 0.4))
  const sw = ease.inQuad(prog(t, ...T.swell))
  const st = { size: 228 + 22 * n, glow: 1 + 0.14 * n, mood: 'happy', look: [0, 0], blink: undefined, white: 0, dx: 0, sweat: 0 }
  // a pulse on each text
  for (const b of T.b) st.size += 26 * bump(t, b + 0.05, 0.3)
  if (t >= T.wake) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false }
  if (inR(t, T.nervous)) st.look = ((t - T.nervous[0]) / 0.18 | 0) % 2 ? [1, 0] : [-1, 0]
  if (t >= T.sweat) st.sweat = 1
  if (t >= T.swell[0]) { st.look = [0, 0]; st.size *= 1 + 0.5 * sw; st.glow += 1.2 * sw; st.white = sw; st.dx = (2 + 5 * sw) * Math.sin(t * 61) }
  return st
}

// ── the narrator (THE STARS)
const N_HOPS = [...talkHops(LINES2, S_TAG, { cps: CPS }), ...talkHops(LINES3, S_TAG, { cps: CPS })]
function narState(t) {
  const st = { mood: 'neutral', look: [1, 1], blink: undefined, squash: 0, dy: 0 }
  if (inR(t, T.slowBlink)) { const p = prog(t, ...T.slowBlink); st.blink = p < 0.35 ? p / 0.35 : p < 0.62 ? 1 : 1 - (p - 0.62) / 0.38; st.look = [1, 1] }
  if (t >= T.turn[0] && t < T.flash) { st.look = [1, -1]; st.mood = t < T.swell[0] ? 'neutral' : 'squint' }
  if (t >= T.flash && t < T.peek[0]) { st.mood = t < T.flash + 0.7 ? 'wide' : 'squint'; st.look = t < T.zip[1] ? [1, -1] : [1, 0] }
  if (t >= T.peek[0] && t < T.cut2) { st.mood = 'squint'; st.look = [1, 1] }
  if (inR(t, T.roll)) { st.mood = 'eyeroll'; st.squash = -0.05 * Math.sin(Math.PI * prog(t, ...T.roll)) }
  if (t >= T.cut2) { st.mood = t < T.wink[0] ? 'neutral' : t < T.l7 + 1.5 ? 'happy' : 'neutral'; st.look = [1, 0] }
  if (t >= T.castIn) { st.mood = t < T.pat ? 'happy' : 'sparkle'; st.look = [1, 1] }
  return st
}
function narPos(t) {
  if (t < T.narrIn[0]) return null
  if (t < T.narrIn[1]) { const p = ease.outCubic(prog(t, ...T.narrIn)); return { x: lerp(-180, P_NAR.x, p), y: lerp(360, P_NAR.y, p) + Math.sin(p * Math.PI) * 60, k: 1 } }
  if (t < T.castOut[1]) return { ...P_NAR, k: popOut(t, T.castOut) }
  if (t < T.castIn) return null
  return { ...P_NAR, k: pop01(t, T.castIn, 0.4, 2.2) }
}

// ── the sky stars (tiny, mute; they wake one by one, gasp together, roll their eyes together)
function skyState(S, t) {
  const st = { mood: 'neutral', look: S.look, blink: 1, squash: 0, dy: 0 }
  if (t >= S.wake) { st.blink = t < S.wake + 0.12 ? 0.5 : undefined }
  if (t >= T.gasp && t < T.cut1) { st.mood = 'wide'; st.look = [0, 0]; st.dy = -26 * bump(t, T.gasp, 0.34); st.blink = false }
  if (t >= T.cut1 && t < T.turn[0]) { st.mood = 'neutral'; st.look = S.look }
  if (t >= T.turn[0] && t < T.flash) { st.look = [S.x < P_BIG.x ? 1 : -1, -1]; st.mood = t < T.swell[0] ? 'neutral' : 'wide'; st.blink = false }
  if (t >= T.flash && t < T.peek[0]) { st.mood = 'wide'; st.look = [S.x < P_BIG.x ? 1 : -1, -1] }
  if (t >= T.peek[0] && t < T.cut2) { st.mood = 'squint'; st.look = S.look }
  if (inR(t, T.roll)) { st.mood = 'eyeroll'; st.squash = -0.06 * Math.sin(Math.PI * prog(t, ...T.roll)) }
  if (t >= T.cut2 && t < T.lesson) st.mood = t >= T.wink[0] && t < T.wink[1] + 0.6 ? 'happy' : 'neutral'
  if (t >= T.lesson) st.mood = 'happy'
  return st
}

// ── the Sun
function sunState(t) {
  const st = { x: P_SUN.x, y: P_SUN.y, rot: 0, eyes: 'half', wink: 0, blink: 0, k: 1, look: [0, 0] }
  if (t < T.sunIn[0]) return null
  if (t < T.castOut[1]) {
    const R = 17.5 * P_SUN.cell, p = ease.outCubic(prog(t, ...T.sunIn)), dist = Math.PI * 2 * R
    st.x = P_SUN.x + dist * (1 - p); st.rot = (st.x - P_SUN.x) / R
    const k = t - T.sunIn[1]
    if (k > 0) st.rot += 0.16 * Math.sin(k * 8) * Math.exp(-k * 3.6)
    st.eyes = t < T.sunIn[1] + 0.2 ? 'open' : 'half'
    if (inR(t, T.wink)) { const q = prog(t, ...T.wink); st.wink = q < 0.3 ? q / 0.3 : q < 0.72 ? 1 : 1 - (q - 0.72) / 0.28 }
    st.k = popOut(t, T.castOut)
    return st
  }
  if (t < T.castIn) return null
  st.k = pop01(t, T.castIn + 0.1, 0.45, 2.2)
  if (inR(t, T.sunWink)) { const q = prog(t, ...T.sunWink); st.wink = q < 0.3 ? q / 0.3 : q < 0.72 ? 1 : 1 - (q - 0.72) / 0.28 }
  return st
}

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "800 112px Inter", "700 44px Inter", "900 60px Inter", "italic 500 150px 'EB Garamond'", "italic 500 200px 'EB Garamond'",
      "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'", "40px 'Noto Color Emoji'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H1 = popText(root, 'It’s still | *day 3.*', { top: 176, size: 116, accentSize: 176, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Day 4: | *a ring.*', { top: 176, size: 116, accentSize: 176, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: GOLD })
  const H3 = popText(root, 'Expert | *opinion.*', { top: 176, size: 116, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const H4 = popText(root, '*Supernova.*', { top: 210, size: 120, accentSize: 184, at: T.h4, late: 1, lateAt: T.h4, wobble: true, accentColor: PINK })
  const H5 = popText(root, 'Synchronized | *eye-roll.*', { top: 176, size: 108, accentSize: 168, at: T.h5, late: 1, lateAt: T.h5 + 0.3, wobble: true, accentColor: LAV, gap: 0.05 })
  const H6 = popText(root, 'Meanwhile, | *the Sun.*', { top: 176, size: 116, accentSize: 176, at: T.h6, late: 2, lateAt: T.h6Land, lateGap: 0.12, wobble: true, accentColor: SUNC })
  const H8 = popText(root, 'Slow burns | *last.*', { top: 176, size: 120, accentSize: 200, at: T.h8, late: 1, lateAt: T.h8Land, wobble: true, accentColor: SUNC })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H8, T.h8Out]]
  const BOX = { y: 1400, width: 960, height: 290, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES0, open: T.open0, close: T.close0 }),
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.close3 }),
  ]
  // ★ LESSON UNLOCKED (shared module) sits over the scene and the type; then the supernova's white flash, grain, black
  const lesson = buildLesson(root, LESSON)
  const flash = el('div', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', background: '#fff5fa', opacity: 0, display: 'none', pointerEvents: 'none' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the cast
  function drawAries(t) {
    const st = ariState(t), o = popOut(t, T.out)
    const r = hoodieStar(x, P_ARI.x, P_ARI.y + st.dy, P_ARI.s, t, { color: ARI.color, glyph: ARI.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: A_HOPS, seed: 5, pop: o,
      hoodie: st.on > 0 ? { on: st.on, down: st.down, lift: st.lift } : null })
    if (st.sweat && o > 0.5) drawSweat(x, t, r.x + r.size * 0.34, r.y - r.size * 0.42, Math.max(5, Math.round(r.size / 36)), 1)
    return r
  }
  function drawPisces(t) {
    const st = pisState(t), o = popOut(t, T.out)
    const pk = o
    if (pk <= 0.01) return null
    const lift = st.hug ? 6 * Math.sin(t * 18) * st.hug : 0
    const r = hoodieStar(x, P_PIS.x, P_PIS.y + lift, P_PIS.s, t, { color: PIS.color, glyph: null, mood: st.mood, look: st.look, squash: st.squash, hops: [T.b[0] + 0.1, T.gasp + 0.05, T.flash + 0.9, T.wink[0] + 0.3, T.pat + 0.1], seed: 17, pop: pk, glow: 0.8,
      hoodie: st.on ? { on: 1, down: 0 } : null })
    if (st.tears > 0 && pk > 0.3) { const e = eyesOf({ x: r.x, y: r.y, size: r.size }); drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: st.tears * pk, seed: 4, fountain: st.fountain }) }
    if (st.hug > 0.05) drawHearts(x, t, T.roll[0] + 0.1, r.x, r.y - r.size * 0.4, { n: 4, px: 5, spread: 90, life: 1.0, rise: 160 })
    return r
  }
  function drawNarrator(t) {
    const P = narPos(t)
    if (!P) return null
    const st = narState(t), o = popOut(t, T.out) * P.k
    if (o <= 0.01) return null
    return drawStarChar(x, P.x, P.y + st.dy, P.s ?? P_NAR.s, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: N_HOPS, seed: 9, pop: o })
  }
  function drawSkyStars(t) {
    const o = popOut(t, T.out)
    for (const S of SKY) {
      const st = skyState(S, t)
      drawStarChar(x, S.x, S.y + st.dy, S.s, t, { color: S.col, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, seed: S.seed, pop: o, glow: 0.7, zzz: false, hops: [T.gasp] })
    }
  }
  function drawBig(t) {
    if (t >= T.flash) return
    const st = bigState(t)
    const col = mixHex(BIG_COL, '#ffffff', 0.15 + 0.85 * st.white)
    glowAt(x, P_BIG.x, P_BIG.y, st.size * (1.3 + 0.5 * st.white), '#ff6fae', 0.55 * st.glow)
    const r = drawStarChar(x, P_BIG.x + st.dx, P_BIG.y, st.size, t, { color: col, mood: st.mood, look: st.look, blink: st.blink, seed: 31, glow: st.glow, bob: 6 })
    if (st.sweat) drawSweat(x, t, r.x + r.size * 0.3, r.y - r.size * 0.4, Math.max(5, Math.round(r.size / 36)), 1)
    // the last instant: it goes white-hot
    if (st.white > 0.85) { x.save(); x.globalCompositeOperation = 'lighter'; glowAt(x, P_BIG.x, P_BIG.y, st.size * 1.4, '#ffffff', (st.white - 0.85) / 0.15); x.restore() }
  }
  function drawRemnant(t) {
    if (t < T.remIn || t > T.zip[1] + 0.05) return
    const pk = pop01(t, T.remIn, 0.3, 2.4), zp = ease.inCubic(prog(t, ...T.zip))
    const rx = P_BIG.x + 560 * zp
    const look = t < T.remL ? [0, 0] : t < T.remR ? [-1, 0] : t < T.zip[0] ? [1, 0] : [1, 0]
    const blink = inR(t, [T.remBlink, T.remBlink + 0.12]) ? 1 : t < T.zip[0] ? undefined : false
    if (zp > 0) speedLines(x, rx - 20, P_BIG.y + 6, 160 * zp + 50, { alpha: 1 - zp * 0.3, n: 4, spread: 64, seed: 3 })
    drawStarChar(x, rx, P_BIG.y, 108, t, { color: '#d8ecff', mood: 'wide', look, blink, seed: 41, pop: pk, glow: 1.2, squash: zp > 0 ? -0.25 : 0, bob: 2 })
  }
  function drawBubbles(t) {
    if (t < T.b[0] || t > T.sweep[1] + 0.1) return
    T.b.forEach((tb, i) => {
      if (t < tb) return
      const B = BUBBLES[i], k = easeOutBack(prog(t, tb, tb + 0.3), 2.4)
      const sp = ease.inCubic(prog(t, T.sweep[0] + i * 0.05, T.sweep[0] + 0.32 + i * 0.05))
      drawBubble(x, BUB.x - 1100 * sp, BUB.y0 + i * BUB.dy, B.text, { label: B.label, k, rot: (i % 2 ? 0.012 : -0.012) })
    })
  }
  function drawRing(t) {
    if (t < T.ringIn || t > T.sweep[1] + 0.1) return
    const k = pop01(t, T.ringIn, 0.34, 2.2), sp = ease.inCubic(prog(t, T.sweep[0] + 0.12, T.sweep[0] + 0.45))
    const open = t >= T.ringOpen ? 1 : 0
    const bx = 826 + 900 * sp, by = 1192 + Math.sin(t * 2.4) * 6 - 160 * (1 - ease.outCubic(prog(t, T.ringIn, T.ringIn + 0.3)))
    x.save(); x.translate(bx, by); x.scale(k, k)
    if (open) glowAt(x, 0, -90, 210, '#fff3c0', 0.6 + 0.2 * Math.sin(t * 5))
    drawRingBox(x, 0, 0, 12, open, t)
    x.restore()
    if (open) sparkBurst(x, t, bx, by - 110, T.ringOpen, { n: 12, R: 200, size: 26, seed: 2, cols: ['#ffffff', GOLD, '#bff4ff', PINK] })
  }
  function drawFalling(t) {
    // the matching hoodie falls onto Aries; a tiny one onto Pisces
    for (const [span, P, px] of [[T.hoodFall, P_ARI, 11], [T.pisFall, P_PIS, 4.6]]) {
      if (t < span[0] || t >= span[1]) continue
      const p = prog(t, ...span), yTop = P.y - P.s * 0.42
      const yy = lerp(260, yTop, ease.inQuad(p))
      drawFlatHoodie(x, P.x, yy, px, 0, { rot: 0.25 * Math.sin(p * 9), sx: 1 + 0.08 * Math.sin(p * 21), sy: 1 })
    }
    for (const [t0, P] of [[T.hoodFall[1], P_ARI], [T.pisFall[1], P_PIS]]) sparkBurst(x, t, P.x, P.y - P.s * 0.2, t0, { n: 10, R: P.s * 0.7, size: P.s / 9, seed: 6, cols: [PINK, '#ffffff', HOT] })
  }
  function drawFlat(t) {
    // the payoff: the hoodie comes off, folds in three, lands in front of Aries
    if (t < T.flatIn || t >= T.out[1]) return
    const o = popOut(t, T.out)
    const st = T.folds.reduce((n, f) => n + (t >= f ? 1 : 0), 0)
    let sy = 1
    for (const f of T.folds) { const k = t - f + 0.11; if (k >= 0 && k < 0.24) sy = Math.min(sy, 1 - 0.75 * Math.sin(Math.PI * k / 0.24)) }
    const fly = ease.outCubic(prog(t, T.flatIn, T.flatIn + 0.4)), down = ease.inOutCubic(prog(t, ...T.settle))
    const yy = lerp(lerp(P_ARI.y - 300, 860, fly), P_ARI.y + 96, down)
    const px = lerp(lerp(9, 15, fly), 9.5, down)
    drawFlatHoodie(x, P_ARI.x, yy + Math.sin(t * 2.2) * 5 * (1 - down), px, st, { sy, sx: 2 - sy, alpha: clamp(prog(t, T.flatIn, T.flatIn + 0.1)) * o })
    if (t >= T.folds[2]) sparkBurst(x, t, P_ARI.x, yy, T.folds[2] + 0.12, { n: 10, R: 150, size: 22, seed: 8, cols: [GOLD, '#ffffff', PINK] })
    if (t >= T.pat) sparkBurst(x, t, P_ARI.x, P_ARI.y + 60, T.pat + 0.05, { n: 8, R: 120, size: 18, seed: 9, cols: [GOLD, '#ffffff'] })
  }
  function drawTheSun(t) {
    const st = sunState(t)
    if (!st) return
    const k = st.k * popOut(t, T.out)
    if (k <= 0.01) return
    drawSun(x, st.x, st.y, P_SUN.cell, t, { rot: st.rot, eyes: st.eyes, wink: st.wink, k, look: st.look })
    // the wink's sparkle
    for (const w of [T.wink, T.sunWink]) {
      const q = t - (w[0] + 0.32)
      if (q > 0 && q < 0.8) { const a = Math.sin(Math.PI * q / 0.8); drawPixelStar(x, st.x + 95, st.y - 70, 44 * a, q % 0.2 < 0.1 ? 2 : 1, '#fff6c8') }
    }
  }
  function drawScore(t) {
    if (!inR(t, T.card10)) return
    const k = pop01(t, T.card10[0], 0.34, 2.4) * (1 - ease.inCubic(prog(t, T.card10[1] - 0.25, T.card10[1])))
    drawScorecard(x, P_PIS.x - 92, P_PIS.y - 150, '10', { k, rot: -0.12 + 0.06 * Math.sin(t * 7) })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shake(t)
        x.save()
        x.translate(540 + sh[0], 960 + sh[1]); x.scale(C.z, C.z); x.translate(-C.fx, -C.fy)
        // the nebula blooms behind everyone; the debris drifts in front
        const novaK = 1 - ease.inQuad(prog(t, 30.9, 31.62))
        drawBig(t)
        drawTheSun(t)
        drawSkyStars(t)
        drawNarrator(t)
        drawBubbles(t)
        drawPisces(t)
        drawScore(t)
        drawAries(t)
        drawRing(t)
        drawFalling(t)
        drawFlat(t)
        if (t >= T.flash && novaK > 0) drawNova(x, t, T.flash, P_BIG.x, P_BIG.y, { k: novaK })
        drawRemnant(t)
        // hearts off the slam, and on every text
        if (t >= T.slam && t < T.slam + 1.4) drawHearts(x, t, T.slam, P_ARI.x, P_ARI.y - 120, { n: 9, px: 9, spread: 320, life: 1.2, rise: 300 })
        for (const b of T.b) if (t >= b && t < b + 1.2) drawHearts(x, t, b + 0.05, P_ARI.x + 60, P_ARI.y - 160, { n: 3, px: 7, spread: 120, life: 1.0, rise: 180 })
        if (t >= T.slam && t < T.slam + 0.7) sparkBurst(x, t, P_ARI.x, P_ARI.y + 120, T.slam, { n: 14, R: 300, size: 28, seed: 1, squash: 0.35, cols: [PINK, GOLD, '#ffffff', HOT] })
        if (t >= T.gasp && t < T.gasp + 0.6) sparkBurst(x, t, 540, 1000, T.gasp, { n: 12, R: 420, size: 26, seed: 7, cols: [BONE, GOLD] })
        x.restore()
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      // the supernova's white flash (over everything but the grain)
      const fl = t >= T.flash - 0.06 && t < T.flash + 0.7 ? (t < T.flash ? prog(t, T.flash - 0.06, T.flash) : 1 - ease.outQuad(prog(t, T.flash, T.flash + 0.7))) : 0
      flash.style.display = 'none'; void fl     // social: no white flash
      black.style.opacity = '0'   // frame 0 already shows the scene (no fade from black under the hook)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change where the old beat has cleared. The default selection keeps 15.05 (→ the
// stars) and 44.9 (→ the reading); 31.6 (→ the Sun) is kept by hand so the cuts run about every 13–17 s.
export const CUTS = [{ t: T.cut1, kind: 'flip' }, { t: T.cut2, kind: 'deal', keep: true }, { t: T.cut3, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the score's key by the engine; chip / lead / snare / tom / clap sit on a
//    private 'sfx' bus written straight in G major)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const G_ = { G3: 196, A3: 220, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, B5: 987.77, D6: 1174.66, G6: 1567.98 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026, gap = 0.08) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chime = (t, i) => [['pluck', +t.toFixed(3), [1174.66, 1318.51, 1174.66, 1479.98][i % 4], 0.045, 0.35, -0.2], ['pluck', +(t + 0.09).toFixed(3), [1479.98, 1760, 1567.98, 1975.53][i % 4], 0.04, 0.5, -0.2], ['tick', +t.toFixed(3), 0.03]]
const womp = t => [['chip', t, G_.D4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), G_.A3 * 1.06, 0.8, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const gasp = t => [['swell', t - 0.16, t + 0.04, { bus: 'sfx', gain: 0.06, f0: 900, f1: 4200 }], ['pop', t, 392, 0.05, -0.3], ['pop', t + 0.04, 349.23, 0.05, 0.3]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const thump = (t, g = 0.26) => [['tom', t, 92, { ...FX, gain: g, decay: 0.28 }], ['boom', t, 0.06]]
const zip = t => [['chip', t, 900, 0.22, { ...FX, wave: 'square', duty: 0.25, slide: 30, gain: 0.03, decay: 0.1, sustain: 0.6 }], ['whoosh', t + 0.18, 0.3, 0.07]]
const fold = t => [['tick', t, 0.07], ['whoosh', t + 0.1, 0.16, 0.05], ['pop', t + 0.05, 880, 0.03, 0]]
const PITCH = { [A_TAG]: 1046.5, [S_TAG]: 783.99 }

export const CUES = [
  ['busFx', 'sfx', { gain: 20 }],
  // 1 · day 3
  ['pop', T.hops0[0], 880, 0.03, 0], ['pop', T.hops0[1], 987.77, 0.03, 0],
  ['riser', T.jump[0], T.slam, 0.05], ['chip', T.jump[0], G_.G4, 0.5, { ...FX, wave: 'square', duty: 0.25, slide: 14, gain: 0.03, decay: 0.2, sustain: 0.7 }],
  ...thump(T.slam, 0.36), ['crash', T.slam, { gain: 0.05, len: 2 }], ['glitter', T.slam + 0.05, T.slam + 0.6],
  ['pop', T.open0, 659.25, 0.035, 0], ['pop', T.open0 + 0.06, 880, 0.03, 0],
  // 2 · the texts
  ...head(T.h1, 2, T.h1Land, 2),
  ...T.b.flatMap((tb, i) => chime(tb, i)),
  ['whoosh', T.hoodFall[0] + 0.35, 0.5, 0.06], ...thump(T.hoodFall[1], 0.22), ['glitter', T.hoodFall[1], T.hoodFall[1] + 0.4],
  ['whoosh', T.pisFall[0] + 0.25, 0.35, 0.04], ['pop', T.pisFall[1], 1318.51, 0.035, 0.5], ...sob(T.pisFall[1] + 0.1, G_.B5),
  ...head(T.h2, 2, T.h2Land, 4),
  ['pop', T.ringIn, 783.99, 0.04, 0.3], ['tick', T.ringOpen - 0.05, 0.06], ['bell', T.ringOpen, 1760, 0.04, 1.8, 0.3], ['glitter', T.ringOpen, T.ringOpen + 0.7],
  ...gasp(T.gasp),
  ...sob(T.gasp + 0.4, G_.D6), ...sob(T.gasp + 1.0, G_.B5, 2),
  ['pop', T.open1, 659.25, 0.035, 0],
  ...[0, 1, 2, 3].map(i => ['whoosh', +(T.sweep[0] + 0.1 + i * 0.05).toFixed(3), 0.3, 0.035]),
  // 3 · expert opinion
  ...head(T.h3, 1, T.h3Land, 1),
  ['whoosh', T.narrIn[0] + 0.4, 0.6, 0.04], ['bell', T.narrIn[1] - 0.05, 1174.66, 0.03, 1.6, -0.3], ['glitter', T.narrIn[1] - 0.2, T.narrIn[1] + 0.3],
  ['tick', T.slowBlink[0] + 0.28, 0.035], ['tick', T.slowBlink[1] - 0.25, 0.03],
  ['pop', T.open2, 659.25, 0.035, 0],
  ['tick', T.turn[0], 0.05], ['tick', T.turn[0] + 0.06, 0.04], ['tick', T.turn[0] + 0.12, 0.04],
  ['pop', T.wake, 1567.98, 0.035, 0.4],
  ...[0, 1, 2].map(i => ['pop', +(T.nervous[0] + i * 0.18).toFixed(3), 1318.51, 0.02, i % 2 ? 0.4 : 0.1]),
  ['riser', T.swell[0], T.flash, 0.09], ['chip', T.swell[0], G_.D5, T.flash - T.swell[0], { ...FX, wave: 'square', duty: 0.5, slide: 24, vib: 0.03, gain: 0.025, decay: 0.5, sustain: 0.8 }],
  ['tapeStop', T.flash - 0.36, 0.42],
  // 4 · supernova
  ['boom', T.flash, 0.25], ['swell', T.flash, T.flash + 1.6, { bus: 'sfx', gain: 0.05, f0: 6000, f1: 600 }], ['glitter', T.flash + 0.1, T.flash + 2.2],
  ['pop', T.remIn, 1760, 0.035, 0.3], ['tick', T.remBlink, 0.04], ['tick', T.remL, 0.03], ['tick', T.remR, 0.03], ...zip(T.zip[0]),
  ['pop', T.card10[0] + 0.05, 1318.51, 0.035, 0.5], ...sob(T.card10[0] + 0.3, G_.D6), ...sob(T.card10[0] + 0.9, G_.B5, 2),
  // 5 · the callback
  ['pop', T.peek[0] + 0.1, 523.25, 0.03, 0],
  ...womp(T.roll[0] + 0.12), ['tick', T.roll[0], 0.05],
  ...head(T.h5, 1, T.h5 + 0.3, 3, 0.022, 0.05),
  // 6 · the Sun
  ...head(T.h6, 1, T.h6Land, 2),
  ...[0, 1, 2, 3].map(i => ['tom', +(T.sunIn[0] + 0.12 + i * 0.22).toFixed(3), 70 + i * 6, { ...FX, gain: 0.12, decay: 0.3 }]), ['whoosh', T.sunIn[0] + 0.5, 0.8, 0.05],
  ['bell', T.sunIn[1], 783.99, 0.035, 2.2, 0.3], ['glitter', T.sunIn[1] - 0.1, T.sunIn[1] + 0.5],
  ['pop', T.open3, 659.25, 0.035, 0],
  ['pluck', T.wink[0] + 0.3, 1318.51, 0.04, 0.8, 0.3], ['bell', T.wink[0] + 0.34, 1975.53, 0.03, 1.4, 0.4], ['glitter', T.wink[0] + 0.32, T.wink[0] + 0.9],
  ...sob(T.wink[0] + 0.5, G_.D6),
  // 7 · the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'G' }),
  // 9 · slow burns last
  ['whoosh', T.hoodOff[0] + 0.2, 0.35, 0.05], ['pop', T.hoodOff[1] - 0.05, 1174.66, 0.04, 0],
  ['pop', T.castIn + 0.1, 783.99, 0.03, -0.3], ['pop', T.castIn + 0.2, 987.77, 0.03, 0.3],
  ...T.folds.flatMap(fold), ['bell', T.folds[2] + 0.15, 1567.98, 0.035, 1.4, 0],
  ['tick', T.settle[1], 0.05], ['pop', T.pat, 523.25, 0.04, 0], ['pop', T.pat + 0.42, 587.33, 0.035, 0],
  ...head(T.h8, 2, T.h8Land, 0),
  ['pluck', T.sunWink[0] + 0.3, 1318.51, 0.035, 0.8, 0.3], ['glitter', T.sunWink[0] + 0.3, T.sunWink[0] + 0.8],
  // dialogue blips
  ...talkCues(LINES0, { cps: CPS, pitch: PITCH }), ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }),
  ...talkCues(LINES3, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
