// stpirates — "Pirates of the Heart." (60 s vertical Align ad, Star Talk "Wild Lessons" #1, music: cinematic, G minor —
// a swashbuckler). Story 0–55.6, then the shared end card.
//   0.0–4.45   A treasure map SLAMS down (DUNNN). "Destination: | the perfect *partner.*"  A dotted path inks past three
//              islands (abs · a chest · a lighthouse) to a tiny X labelled THE PERFECT PARTNER. CAPTAIN SCORPIO: "arr. X
//              marks *the one*, crew."  The map whips away on the drop…
//   4.49–10.4  "Pirates of | the *Heart.*"  The ship in the nebula sea. Credits pop: CAPTAIN ♏ SCORPIO (tricorn, eyepatch),
//              FIRST MATE ♈ ARIES (bandana), LOOKOUT ♓ PISCES (already crying). "full sail, crew! to the *X!*"
//  10.5        card cut.
//  10.55–19.4  "Island one: | *Six-Pack.*"  PISCES: "LAND HO!! it's *so pretty* 😭"  A buff star flexes biceps on its rock;
//              Aries goes heart-eyed. HUNK: "hey. wanna watch me *flex?*"  Scorpio raps the abs with a spyglass: tonk…
//              tonk…  "Looks solid. | Sounds *hollow.*"  "*hollow.* next island."
//  19.45       card cut.
//  19.45–26.3  "Island two: | *Treasure.*"  A star in shades and a gold chain lounges on an overflowing chest. "babe. I'm
//              *loaded.*"  Scorpio bites a coin: the foil peels… "Fool's | *gold.*"  "...it's *chocolate.*"  A RENTAL tag
//              swings off the chest; Aries happily eats the coin.
//  26.35–33.4 "Island three: | *Fame.*"  An influencer star on a lighthouse with a ring light: "omg hiii! *like and
//              follow!*"  The beam blinds the crew, the flash pops… then the beam swings round onto itself.
//              "All *shine.*"  "it lights *itself.* not the way."
//  33.45       card cut.
//  33.45–45.4 "Three islands. | *No treasure.*"  A personal grump cloud rains on Scorpio; the sail and the hat droop.
//              "no treasure. just *rain.*"  PISCES: "wait! a *tiny* island! 😭"  The X: a little rock, a red X, a lantern,
//              and a quiet star with a teapot under an umbrella. "X marks | *the spot?*"  "you're soaked. I made *tea.*"
//              A mug and a plaid blanket float over; the cloud blows away. "two honeys. how you *like it.*"  The eyepatch
//              flips up: heart eyes. "Found the | *treasure.*"  Pisces: fountains.
//  45.6–50.25 ★ LESSON UNLOCKED: "The treasure is | how they treat you | on an *ordinary* day."  +1 PRIORITIES
//  50.3        card cut.
//  50.35–53.6 "Tonight's *deck.*"  The map unrolls again (THE PERFECT PARTNER struck out, "someone kind ♥" written in);
//              three veiled cards deal onto it. "new deck nightly. no *fool's gold.*"
//  53.9–55.5  "Drop *anchor.*"  The anchor plunges into the nebula with a starry splash; everyone sips tea; Pisces sobs.
// One canvas (sky + world through a camera + screen-space props), DOM type + dialogue boxes + the shared lesson, grain.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import {
  INK, rgba, mixHex, starFrame, inSprite, FOOT, tearsCells, tricornCells, eyepatchCells, bandanaCells, spyglassCells,
  sixpackCells, bicepCells, shadesCells, chainCells, phoneCells, blanketCells, blit, drawTeapot, drawMug, drawCoin,
  drawChest, drawPalm, drawAnchor, drawCloud,
} from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', ROSE = '#ff6b9a', MINT = '#7dffb0', CHOC = '#c98a4a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)            // the 108 bpm grid
const SCO = signStar('scorpio'), ARI = signStar('aries'), PIS = signStar('pisces')
const HUNK_C = '#ffb26b', RICH_C = '#c9a6ff', FAME_C = '#ff8fb1', QUIET_C = '#8fe3c4'

// ── the timeline
const T = {
  black: [0, 0.2],
  // 0 · the map
  mapIn: [0.3, BEAT(0)], slam: BEAT(0), path: [1.05, 2.95], xPing: 3.0, mapOut: [3.95, 4.42], l1: 1.6, close1: 4.45,
  // 1 · title + crew
  drop: BEAT(7), cred: [5.2, 5.75, 6.3], l2: 6.4, close2: 9.4,
  cut1: 10.5,
  // 2 · six-pack island
  isl1: [10.35, 11.6], isl1Out: [17.9, 19.45], l3: 11.0, flex: [12.35, 13.0, 15.25], l4: 13.75, knock: [15.45, 15.95], l5: 16.75, close3: 19.35,
  cut2: 19.45,
  // 3 · the chest
  isl2: [19.3, 20.5], isl2Out: [24.95, 26.4], l6: 20.7, grab: [21.95, 22.45], bite: 22.75, peel: [22.8, 23.25], l7: 23.45, rental: 24.25, toss: [24.55, 25.05], munch: [25.05, 26.3], close4: 25.95,
  // 4 · the lighthouse
  isl3: [26.2, 27.4], isl3Out: [31.95, 33.5], l8: 27.55, beamOn: 28.2, sweep: [28.95, 29.35], blind: [29.35, 30.35], flash: [29.75, 30.15], turn: [30.45, 31.1], l9: 30.5, close5: 33.4,
  cut3: 33.45,
  // 5 · the slump, the tiny island, tea
  rain: [33.4, 42.0], cloud: [33.5, 41.35], l10: 33.9, droop: [33.6, 34.4], l11: 36.75, isl4: [37.2, 38.6],
  l12: 39.6, mug: [40.55, 41.3], blanket: [41.15, 41.75], clear: [41.35, 42.0], l13: 42.6, patch: [43.75, 44.05], close6: 45.55,
  // 6 · lesson
  lesson: BEAT(81), lessonOut: [50.05, 50.25],
  cut4: 50.3,
  // 7 · tonight's deck
  map2: [50.35, 50.85], deal: [51.0, 51.3, 51.6], l14: 50.75, close7: 53.85, map2Out: [53.55, 53.9],
  // 8 · drop anchor
  anchor: [54.15, 54.7], splash: 54.7, out: [55.15, 55.5],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'The treasure is | how they treat you | on an *ordinary* day.', chip: '+1 PRIORITIES' }

// ── the dialogue
const ST = '♏︎ CAPTAIN SCORPIO', PT = '♓︎ LOOKOUT PISCES', HT = 'THE SIX-PACK', RT = 'THE BIG SPENDER', FT = 'THE INFLUENCER', QT = 'A QUIET STAR'
const SC_ = '#ff7e9c', PC = LAV, HC = HUNK_C, RC = RICH_C, FC = FAME_C, QC = QUIET_C
const LINES1 = [{ t: T.l1, speaker: ST, color: SC_, text: 'arr. X marks *the one*, crew.' }]
const LINES2 = [{ t: T.l2, speaker: ST, color: SC_, text: 'full sail, crew! to the *X!*' }]
const LINES3 = [
  { t: T.l3, speaker: PT, color: PC, text: "LAND HO!! it's *so pretty* 😭" },
  { t: T.l4, speaker: HT, color: HC, text: 'hey. wanna watch me *flex?*' },
  { t: T.l5, speaker: ST, color: SC_, text: '*hollow.* next island.' },
]
const LINES4 = [
  { t: T.l6, speaker: RT, color: RC, text: "babe. I'm *loaded.*" },
  { t: T.l7, speaker: ST, color: CHOC, text: "...it's *chocolate.*" },
]
const LINES5 = [
  { t: T.l8, speaker: FT, color: FC, text: 'omg hiii! *like and follow!*' },
  { t: T.l9, speaker: ST, color: SC_, text: 'it lights *itself.* not the way.' },
]
const LINES6 = [
  { t: T.l10, speaker: ST, color: CYAN, text: 'no treasure. just *rain.*' },
  { t: T.l11, speaker: PT, color: PC, text: 'wait! a *tiny* island! 😭' },
  { t: T.l12, speaker: QT, color: QC, text: "you're soaked. I made *tea.*" },
  { t: T.l13, speaker: QT, color: QC, text: 'two honeys. how you *like it.*' },
]
const LINES7 = [{ t: T.l14, speaker: ST, color: SC_, text: "new deck nightly. no *fool's gold.*" }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5, ...LINES6, ...LINES7]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5], [LINES6, T.close6], [LINES7, T.close7]]

// ── headlines: one spec drives the type and its sound
const HEADS = [
  { text: 'Destination: | the perfect *partner.*', top: 150, size: 92, accentSize: 140, at: 0.85, gap: 0.08, late: 1, lateAt: 1.4, accentColor: GOLD, out: [3.95, 4.15], fit: true },
  { text: 'Pirates of | the *Heart.*', top: 150, size: 118, accentSize: 190, at: BEAT(7) + 0.05, gap: 0.12, late: 1, lateAt: BEAT(8), accentColor: ROSE, out: [10.15, 10.4] },
  { text: 'Island one: | *Six-Pack.*', top: 150, size: 104, accentSize: 164, at: 10.62, late: 1, lateAt: 10.95, accentColor: HUNK_C, out: [15.75, 15.95] },
  { text: 'Looks solid. | Sounds *hollow.*', top: 150, size: 100, accentSize: 150, at: 16.0, gap: 0.08, late: 1, lateAt: 16.42, accentColor: HUNK_C, out: [19.1, 19.3], fit: true },
  { text: 'Island two: | *Treasure.*', top: 150, size: 104, accentSize: 164, at: 19.55, late: 1, lateAt: 19.88, accentColor: GOLD, out: [23.1, 23.3] },
  { text: 'Fool’s | *gold.*', top: 150, size: 118, accentSize: 190, at: 23.35, late: 1, lateAt: 23.6, accentColor: CHOC, out: [26.0, 26.2] },
  { text: 'Island three: | *Fame.*', top: 150, size: 104, accentSize: 170, at: 26.48, late: 1, lateAt: 26.8, accentColor: FAME_C, out: [30.0, 30.2] },
  { text: 'All *shine.*', top: 190, size: 124, accentSize: 190, at: 30.25, late: 1, lateAt: 30.45, accentColor: '#fff2a8', out: [33.1, 33.3] },
  { text: 'Three islands. | *No treasure.*', top: 150, size: 98, accentSize: 148, at: 33.6, gap: 0.08, late: 2, lateAt: 34.0, lateGap: 0.14, accentColor: CYAN, out: [37.3, 37.5], fit: true },
  { text: 'X marks | *the spot?*', top: 150, size: 112, accentSize: 168, at: 37.6, late: 2, lateAt: 37.9, lateGap: 0.12, accentColor: ROSE, out: [42.6, 42.8] },
  { text: 'Found the | *treasure.*', top: 150, size: 112, accentSize: 172, at: 42.9, late: 1, lateAt: 43.8, accentColor: GOLD, out: [45.35, 45.55] },
  { text: 'Tonight’s *deck.*', top: 170, size: 116, accentSize: 176, at: 50.4, late: 1, lateAt: 50.62, accentColor: LAV, out: [53.5, 53.7] },
  { text: 'Drop *anchor.*', top: 190, size: 124, accentSize: 196, at: 53.95, late: 1, lateAt: T.splash, accentColor: GOLD, out: [55.15, 55.4] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── the camera: keys [t, zoom, focusX, focusY, screenX, screenY, ease into this key]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic, step: x => (x >= 1 ? 1 : 0) }
const IDN = [1.1, 560, 960, 540, 960]
const CAM = [
  [0, 1.22, 470, 1000, 540, 1000],
  [4.2, 1.24, 470, 1000, 540, 1000, 'lin'],
  [5.2, ...IDN, 'io'],
  [15.3, ...IDN, 'lin'], [15.45, 2.1, 905, 1078, 540, 1010, 'out'], [16.35, 2.16, 905, 1078, 540, 1010, 'lin'], [16.75, ...IDN, 'io'],
  [22.5, ...IDN, 'lin'], [22.68, 1.95, 650, 1000, 540, 1000, 'out'], [24.35, 2.0, 650, 1000, 540, 1000, 'lin'], [24.75, ...IDN, 'io'],
  [29.3, ...IDN, 'lin'], [29.42, 1.3, 700, 900, 540, 960, 'out'], [30.4, 1.33, 700, 900, 540, 960, 'lin'], [30.9, ...IDN, 'io'],
  [34.4, ...IDN, 'lin'], [36.65, 1.32, 620, 1000, 540, 1000, 'io'], [37.35, ...IDN, 'io'],
  [42.6, ...IDN, 'lin'], [43.7, 1.42, 730, 1020, 540, 1000, 'io'], [45.4, 1.44, 730, 1020, 540, 1000, 'lin'], [46.0, ...IDN, 'io'],
]
function cam(t) {
  let i = 0
  while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
  const a = CAM[i], b = CAM[i + 1]
  if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
  const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
  return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
}
const toS = (C, wx, wy) => ({ x: C.sx + (wx - C.fx) * C.z, y: C.sy + (wy - C.fy) * C.z })

// ── the world
const DECK = 1125, RAIL = 1090, SEA = 1180, ISL_X = 905, ISL_TOP = 1150
const SCO_AT = { x: 622, s: 230 }, ARI_AT = { x: 196, s: 168 }, PIS_AT = { x: 380, y: 606, s: 118 }
const sY = (s, base = DECK) => base - FOOT * s
/** the ship's gentle rock: rotation about (420, 1160) + a bob */
const shipRock = t => ({ rot: 0.012 * Math.sin(t * 1.35) + (t >= T.anchor[1] ? 0.02 * Math.exp(-(t - T.anchor[1]) * 3) * Math.sin((t - T.anchor[1]) * 14) : 0), dy: 6 * Math.sin(t * 1.7) })
/** an island's x: offscreen right → docked → offscreen left (the ship sails on) */
function islX(t, inW, outW) {
  if (t < inW[0]) return null
  if (outW && t >= outW[1]) return null
  if (outW && t >= outW[0]) return lerp(ISL_X, -520, ease.inCubic(prog(t, ...outW)))
  return lerp(1620, ISL_X, ease.outCubic(prog(t, ...inW)))
}
const ISLES = [
  { kind: 'abs', in: T.isl1, out: T.isl1Out },
  { kind: 'chest', in: T.isl2, out: T.isl2Out },
  { kind: 'light', in: T.isl3, out: T.isl3Out },
  { kind: 'x', in: T.isl4, out: null },
]
// sad: the sail slackens, the hat droops (the slump), until the tea
const sadK = t => ease.inOutCubic(prog(t, ...T.droop)) * (1 - ease.inOutCubic(prog(t, T.mug[1], T.mug[1] + 0.8)))
const rainK = t => clamp((t - T.rain[0]) / 0.4) * (1 - prog(t, T.clear[0], T.rain[1]))
const blindK = t => t < T.sweep[1] ? 0 : t < T.blind[1] ? clamp((t - T.sweep[1]) / 0.12) : 1 - prog(t, T.blind[1], T.blind[1] + 0.3)
/** the lighthouse beam's angle: idle sweep → onto the crew → swings round onto itself */
function beamAng(t) {
  const idle = Math.PI + 0.5 * Math.sin((t - T.beamOn) * 1.4) - 0.35
  if (t < T.sweep[0]) return idle
  const crew = Math.PI + 0.12
  if (t < T.turn[0]) return lerp(idle, crew, ease.inOutCubic(prog(t, ...T.sweep)))
  return lerp(crew, -Math.PI / 2 + TAU, ease.inOutCubic(prog(t, ...T.turn))) // up and round, onto the influencer
}

// ── moods
function scoState(t) {
  const st = { mood: 'neutral', look: [1, 0], blink: undefined, squash: 0, patch: 0, hatTilt: 0, blush: undefined }
  if (t < T.drop) { st.mood = 'happy'; return st }
  if (t < T.l3) { st.mood = t < T.cred[0] + 0.4 ? 'wide' : 'happy'; st.look = [1, -1]; return st }
  if (t < T.l4) { st.mood = 'neutral'; return st }
  if (t < T.knock[0]) { st.mood = 'squint'; return st }
  if (t < T.l5) { st.mood = 'neutral'; st.look = [1, 1]; return st }
  if (t < T.isl1Out[1]) { st.mood = t < T.l5 + 0.9 ? 'squint' : 'eyeroll'; return st }
  if (t < T.l6 + 0.6) { st.mood = 'neutral'; return st }
  if (t < T.bite) { st.mood = 'squint'; st.look = [0, 0]; return st }
  if (t < T.l7) { st.mood = 'wide'; st.look = [0, 0]; st.blink = false; return st }
  if (t < T.toss[0]) { st.mood = 'squint'; st.look = [0, 0]; return st }
  if (t < T.isl3[1]) { st.mood = 'neutral'; return st }
  if (t < T.sweep[1]) { st.mood = 'squint'; return st }
  if (t < T.blind[1]) { st.mood = 'squint'; st.blink = 1; return st }
  if (t < T.l9 + 1.6) { st.mood = 'squint'; return st }
  if (t < T.cut3) { st.mood = 'eyeroll'; return st }
  if (t < T.l11) { st.mood = 'neutral'; st.look = [0, 1]; st.squash = 0.06 * sadK(t); st.hatTilt = 0.15 * sadK(t); return st }
  if (t < T.isl4[1]) { st.mood = 'wide'; st.look = [1, -1]; st.blink = false; st.squash = 0.06 * sadK(t); return st }
  if (t < T.mug[1]) { st.mood = 'neutral'; st.look = [1, 0]; st.squash = 0.05 * sadK(t); st.hatTilt = 0.12 * sadK(t); return st }
  if (t < T.patch[0]) { st.mood = 'sparkle'; st.look = [1, 0]; st.blush = 0.9; return st }
  st.patch = ease.outBack(prog(t, ...T.patch))
  if (t < T.lesson) { st.mood = 'heart'; st.hatTilt = -0.12 * prog(t, ...T.patch); return st }
  if (t < T.cut4) { st.mood = 'heart'; return st }
  st.mood = t < T.anchor[1] ? 'happy' : 'sparkle'; st.look = [1, -1]
  return st
}
function ariState(t) {
  const st = { mood: 'happy', look: [1, -1], blink: undefined, hearts: 0, munch: false }
  if (t < T.drop) return st
  if (t < T.flex[0]) { st.mood = t < T.l3 ? 'happy' : 'sparkle'; return st }
  if (t < T.knock[0]) { st.mood = 'heart'; st.hearts = 1; st.look = [1, 0]; return st }
  if (t < T.l5) { st.mood = 'wide'; st.look = [1, 0]; return st }
  if (t < T.isl1Out[1]) { st.mood = 'neutral'; st.look = [1, 1]; return st }
  if (t < T.bite) { st.mood = t < T.l6 ? 'wide' : 'sparkle'; st.look = [1, 0]; st.hearts = t > T.l6 ? 0.6 : 0; return st }
  if (t < T.toss[1]) { st.mood = 'wide'; st.look = [1, 0]; return st }
  if (t < T.munch[1]) { st.mood = 'happy'; st.munch = true; return st }
  if (t < T.sweep[1]) { st.mood = t < T.l8 ? 'neutral' : 'sparkle'; st.look = [1, -1]; st.hearts = t > T.l8 ? 0.5 : 0; return st }
  if (t < T.blind[1]) { st.mood = 'squint'; st.blink = 1; return st }
  if (t < T.cut3) { st.mood = 'neutral'; st.look = [1, 0]; return st }
  if (t < T.l11) { st.mood = 'neutral'; st.look = [0, -1]; return st }
  if (t < T.mug[1]) { st.mood = 'wide'; st.look = [1, 0]; return st }
  if (t < T.lesson) { st.mood = 'sparkle'; st.look = [1, 0]; return st }
  st.mood = 'happy'; st.look = [1, -1]
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [1, 0], tears: 1, glass: 0 }
  const glass = (a, b) => clamp(prog(t, a, a + 0.25)) * (1 - prog(t, b, b + 0.25))
  st.glass = Math.max(glass(T.l3 - 0.5, T.l3 + 1.6), glass(T.l11 - 0.5, T.l11 + 1.6))
  if (t < T.drop) return st
  if (t < T.l3) { st.tears = 1; return st }
  if (t < T.isl1Out[1]) { st.tears = t > T.knock[0] ? 3 : 2; st.mood = t > T.knock[0] ? 'sparkle' : 'happy'; return st }
  if (t < T.isl2Out[1]) { st.tears = 2; return st }
  if (t < T.cut3) { st.tears = inR(t, ...T.blind) ? 1 : 2; st.mood = inR(t, ...T.blind) ? 'squint' : 'sparkle'; return st }
  if (t < T.l11) { st.tears = 3; return st }
  if (t < T.mug[0]) { st.tears = 2; st.mood = 'wide'; return st }
  if (t < T.lesson) { st.tears = 3; st.mood = t > T.patch[0] ? 'heart' : 'sparkle'; return st }
  st.tears = t > T.anchor[0] ? 3 : 2
  return st
}

// talk hops
const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })
const S_HOPS = [...hopsOf(ST), T.drop + 0.05, T.knock[0] - 0.1, T.bite, T.mug[1], T.patch[0], T.patch[0] + 0.45, T.lesson + 0.2, T.deal[2] + 0.1, T.splash, T.splash + 0.45]
const A_HOPS = [T.drop + 0.1, T.cred[1], T.flex[0] + 0.1, T.flex[1] + 0.1, T.l6 + 0.3, T.toss[1], T.toss[1] + 0.5, T.l8 + 0.3, T.mug[1] + 0.1, T.lesson + 0.25, T.splash + 0.1, T.splash + 0.55]
const P_HOPS = [...hopsOf(PT), T.drop + 0.15, T.cred[2], T.knock[1] + 0.1, T.patch[0] + 0.1, T.patch[0] + 0.5, T.splash + 0.2]
const H_HOPS = hopsOf(HT), R_HOPS = [...hopsOf(RT), T.rental + 0.05], F_HOPS = [...hopsOf(FT), ...T.flash.map(v => v + 0.02)], Q_HOPS = [...hopsOf(QT), T.isl4[1] + 0.1, T.splash + 0.3]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 44px Inter", "italic 500 190px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const faces = await Promise.all(['card-profile-1.png', 'card-profile-3.png', 'card-profile-2.png'].map(loadImg))
  const FACES = faces.map(im => bake(im, 420)), FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1480, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { ...BOX, lines, open: lines[0].t - 0.2, close }))
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.7 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const stroked = (txt, X, Y, size, col, lw = 10, font = MONO, weight = 700) => { x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  /** a star with costume overlays (world coords, inside the camera) */
  function star(cx, cy, size, t, opts, overlay) {
    drawStarChar(x, cx, cy, size, t, opts)
    if (overlay) { const F = starFrame(cx, cy, size, t, opts); inSprite(x, F, () => overlay(F)) }
  }

  // ═══════════════════════ the nebula sea ═══════════════════════
  const seaGrad = (() => { const g = x.createLinearGradient(0, SEA - 30, 0, H + 200); g.addColorStop(0, '#2a1a5c'); g.addColorStop(0.25, '#241c66'); g.addColorStop(0.6, '#1a2a62'); g.addColorStop(1, '#0d1338'); return g })()
  function waveY(xx, row, t) { return Math.sin(xx * 0.016 + t * 1.5 + row * 1.9) * (5 + row * 1.6) + Math.sin(xx * 0.041 - t * 1.1 + row) * (2 + row * 0.5) }
  const ROW_Y = r => SEA + r * 22 + r * r * 7
  function seaBack(t) {
    // the horizon glow + the body of the sea
    x.fillStyle = seaGrad; x.fillRect(-600, SEA - 10, W + 1200, H - SEA + 400)
    const hg = x.createLinearGradient(0, SEA - 60, 0, SEA + 20); hg.addColorStop(0, 'rgba(255,143,177,0)'); hg.addColorStop(1, 'rgba(255,143,177,0.22)')
    x.fillStyle = hg; x.fillRect(-600, SEA - 60, W + 1200, 80)
    x.fillStyle = 'rgba(255,190,220,0.55)'; x.fillRect(-600, SEA - 10, W + 1200, 3)
    for (let r = 0; r < 3; r++) waveRow(t, r)
  }
  function waveRow(t, r, fillBelow = false) {
    const y0 = ROW_Y(r), step = 12
    const cFoam = r < 3 ? 'rgba(201,166,255,0.45)' : 'rgba(127,224,255,0.55)'
    if (fillBelow) {
      x.fillStyle = seaGrad; x.beginPath(); x.moveTo(-600, H + 300)
      for (let xx = -600; xx <= W + 600; xx += step) x.lineTo(xx, Math.round((y0 + waveY(xx, r, t)) / 6) * 6)
      x.lineTo(W + 600, H + 300); x.closePath(); x.fill()
    }
    for (let xx = -600; xx <= W + 600; xx += step) {
      const yy = Math.round((y0 + waveY(xx, r, t)) / 6) * 6, crest = waveY(xx, r, t) < -(3 + r)
      x.fillStyle = crest ? (r > 4 ? '#bff0ff' : '#e2d2ff') : cFoam
      x.fillRect(xx, yy, step, crest ? 6 : 4)
    }
  }
  function seaFront(t) {
    for (let r = 3; r < 11; r++) waveRow(t, r, r === 3)
    // sparkles riding the swell
    const R = rng(44)
    for (let i = 0; i < 26; i++) {
      const ph = (t * 0.35 + R()) % 1, xx = R() * (W + 200) - 100, yy = SEA + 60 + R() * 640
      const a = Math.sin(Math.PI * ph) ** 3
      if (a < 0.1) continue
      x.globalAlpha = a; drawPixelStar(x, xx, yy + waveY(xx, 4, t) * 0.5, 16 + 10 * R(), 1, i % 3 ? '#bff0ff' : GOLD); x.globalAlpha = 1
    }
  }

  // ═══════════════════════ the ship ═══════════════════════
  const HULL_TOP = RAIL, HULL_BOT = 1262
  const hullL = y => 70 + ((y - HULL_TOP) / (HULL_BOT - HULL_TOP)) ** 2 * 110
  const hullR = y => 790 - ((y - HULL_TOP) / (HULL_BOT - HULL_TOP)) ** 1.5 * 190
  function shipBack(t) {
    const sad = sadK(t)
    // mast
    x.fillStyle = INK; x.fillRect(370, 560, 22, DECK - 560)
    x.fillStyle = '#8a5a2c'; x.fillRect(374, 560, 14, DECK - 560); x.fillStyle = '#a8742a'; x.fillRect(374, 560, 4, DECK - 560)
    // the flag (a heart and a star, waving)
    for (let i = 0; i < 12; i++) for (let j = 0; j < 7; j++) {
      const wv = Math.round(Math.sin(t * 6 - i * 0.7) * 3 * (i / 12))
      x.fillStyle = j === 0 || j === 6 || i === 11 ? INK : '#2a1b46'
      x.fillRect(392 + i * 8, 552 + j * 8 + wv, 8.5, 8.5)
    }
    const fw = Math.round(Math.sin(t * 6 - 4.2) * 1.5)
    x.fillStyle = ROSE; for (const [i, j] of [[4, 2], [6, 2], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [4, 4], [5, 4], [6, 4], [5, 5]]) x.fillRect(392 + i * 8, 552 + j * 8 + fw, 8.5, 8.5)
    // the yards + the sail (it bellies with the wind; it hangs slack in the slump)
    const top = 690, bot = 1040, L0 = 240, R0 = 520
    x.fillStyle = INK; x.fillRect(L0 - 16, top - 10, R0 - L0 + 32, 16); x.fillRect(L0 - 6, bot, R0 - L0 + 12, 14)
    x.fillStyle = '#8a5a2c'; x.fillRect(L0 - 12, top - 6, R0 - L0 + 24, 8); x.fillRect(L0 - 2, bot + 3, R0 - L0 + 4, 8)
    const belly = lerp(70, 8, sad) + 6 * Math.sin(t * 1.9), sag = lerp(0, 40, sad)
    const rows = 22
    for (let j = 0; j < rows; j++) {
      const v = j / rows, yy = top + 6 + v * (bot - top - 6), off = Math.sin(Math.PI * v) * belly
      const l = L0 + off * 0.35 + v * sag * 0.3, r = R0 + off - v * sag * 0.3
      x.fillStyle = INK; x.fillRect(Math.round(l) - 6, Math.round(yy), Math.round(r - l) + 12, 18)
      x.fillStyle = j % 4 === 0 ? '#ddd2bf' : mixHex(BONE, '#cbbfaa', v * 0.6); x.fillRect(Math.round(l), Math.round(yy), Math.round(r - l), 17)
    }
    // the sail's emblem: a big pink heart with a gold star (it droops a little too)
    const ex = (L0 + R0) / 2 + belly * 0.55, ey = (top + bot) / 2 + sag * 0.3
    const HEART = ['.XX...XX.', 'XXXX.XXXX', 'XXXXXXXXX', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....']
    blit(x, HEART, { X: ROSE }, ex, ey, 14)
    drawPixelStar(x, ex, ey - 6, 44, 2, GOLD)
    // crow's nest (back half)
    x.fillStyle = INK; x.fillRect(318, 618, 126, 10)
  }
  function nestFront() {
    x.fillStyle = INK; x.fillRect(314, 624, 134, 54)
    for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#8a5a2c' : '#a8742a'; x.fillRect(320 + i * 21, 630, 21, 42) }
    x.fillStyle = GOLD; x.fillRect(318, 626, 126, 6)
  }
  function shipFront(t) {
    // the hull: stepped plank rows, a gold trim and glowing portholes
    for (let y = HULL_TOP; y < HULL_BOT; y += 12) {
      const l = Math.round(hullL(y) / 6) * 6, r = Math.round(hullR(y) / 6) * 6
      x.fillStyle = INK; x.fillRect(l - 6, y, r - l + 12, 13)
      x.fillStyle = ((y - HULL_TOP) / 12) % 2 ? '#5e3a40' : '#6e4648'; x.fillRect(l, y, r - l, 12.5)
    }
    // the raised stern + the bow
    x.fillStyle = INK; x.fillRect(64, 1032, 140, 64); x.fillRect(660, 1052, 150, 44)
    x.fillStyle = '#6e4648'; x.fillRect(70, 1038, 128, 58); x.fillStyle = '#5e3a40'; x.fillRect(666, 1058, 138, 38)
    x.fillStyle = GOLD; x.fillRect(70, 1038, 128, 6); x.fillRect(666, 1058, 138, 6)
    // stern lantern
    x.fillStyle = INK; x.fillRect(86, 984, 30, 48); x.fillStyle = '#ffd98a'; x.fillRect(91, 992, 20, 30)
    const lg = x.createRadialGradient(101, 1006, 0, 101, 1006, 90); lg.addColorStop(0, 'rgba(255,217,138,0.4)'); lg.addColorStop(1, 'rgba(255,217,138,0)'); x.fillStyle = lg; x.fillRect(11, 916, 180, 180)
    // the bowsprit
    x.save(); x.translate(800, 1066); x.rotate(-0.32); x.fillStyle = INK; x.fillRect(-4, -8, 110, 16); x.fillStyle = '#8a5a2c'; x.fillRect(0, -4, 102, 8); x.restore()
    // trim + rail
    x.fillStyle = GOLD; x.fillRect(hullL(1140), 1138, hullR(1140) - hullL(1140), 7)
    x.fillStyle = INK; x.fillRect(64, RAIL - 8, 750, 14); x.fillStyle = '#a8742a'; x.fillRect(68, RAIL - 5, 742, 7)
    // portholes
    for (let i = 0; i < 5; i++) {
      const px = 190 + i * 104, py = 1186
      x.fillStyle = INK; x.fillRect(px - 20, py - 20, 40, 40); x.fillStyle = GOLD; x.fillRect(px - 16, py - 16, 32, 32)
      x.fillStyle = '#ffd98a'; x.fillRect(px - 11, py - 11, 22, 22); x.fillStyle = '#fff4d0'; x.fillRect(px - 11, py - 11, 8, 8)
    }
    void t
  }

  // ═══════════════════════ the islands ═══════════════════════
  function mound(cx, w, top, t) {
    const h = 86
    for (let j = 0; j < h; j += 10) {
      const k = j / h, half = w / 2 * (0.62 + 0.38 * Math.sqrt(k))
      x.fillStyle = INK; x.fillRect(Math.round(cx - half - 6), top + j - (j ? 0 : 6), Math.round(half * 2 + 12), 11 + (j ? 0 : 6))
      x.fillStyle = j < 10 ? '#7fd38a' : j < 20 ? '#e9c27a' : (j / 10) % 2 ? '#d9ae66' : '#c99a58'; x.fillRect(Math.round(cx - half), top + j, Math.round(half * 2), 10.5)
    }
    // foam ring where it meets the sea
    x.fillStyle = 'rgba(226,210,255,0.8)'
    for (let i = -6; i <= 6; i++) { const yy = top + h - 6 + Math.round(Math.sin(t * 3 + i) * 3); x.fillRect(cx + i * w / 13 - 10, yy, 20, 6) }
  }
  function isle(t, I) {
    const ix = islX(t, I.in, I.out)
    if (ix === null || ix > 1500 || ix < -460) return
    const by = Math.sin(t * 1.2 + I.in[0]) * 3, top = ISL_TOP + by
    if (I.kind === 'abs') {
      mound(ix, 330, top, t); drawPalm(x, ix - 120, top + 4, 7, t, { h: 17, seed: 2 })
      const fl = flexK(t), s = 212, cy = sY(s, top)
      star(ix, cy, s, t, { color: HUNK_C, mood: t > T.knock[0] && t < T.knock[1] + 0.6 ? 'wide' : t > T.l4 - 0.2 && t < T.knock[0] ? 'wink' : 'happy', look: [-1, 0], hops: H_HOPS, seed: 5, squash: -0.06 * fl }, () => { sixpackCells(x, fl); bicepCells(x, fl, HUNK_C) })
      // flex sparkles
      for (const f of T.flex) sparkleRing(t, ix, cy - 40, f + 0.1, 8, 150, f, [GOLD, '#fff2a8', BONE], 0.5, 22)
    } else if (I.kind === 'chest') {
      mound(ix, 340, top, t); drawPalm(x, ix + 132, top + 4, 7, t, { h: 14, seed: 4 })
      drawChest(x, ix, top - 44, 9, t, { glow: 1 })
      // the RENTAL tag, swinging off the chest's corner
      if (t >= T.rental) {
        const sw = Math.exp(-(t - T.rental) * 2) * Math.sin((t - T.rental) * 9) * 0.6 + 0.12, k = pop01(t, T.rental, 0.3, 2.4)
        x.save(); x.translate(ix + 96, top - 64); x.rotate(sw); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-1, 0, 3, 34); x.fillRect(-58, 30, 116, 44); x.fillStyle = '#fbf3e6'; x.fillRect(-54, 34, 108, 36)
        x.fillStyle = '#e8344e'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RENTAL', 0, 53)
        x.restore()
      }
      const s = 168, cy = sY(s, top - 72)
      star(ix - 4, cy, s, t, { color: RICH_C, mood: t > T.bite + 0.2 && t < T.toss[0] ? 'neutral' : 'happy', look: [-1, 0], hops: R_HOPS, seed: 8, blink: false }, () => { shadesCells(x, (t * 0.6) % 1); chainCells(x, t) })
    } else if (I.kind === 'light') {
      mound(ix, 300, top, t)
      // the tower: red and cream stripes
      const tb = top + 4, tt = 780
      for (let y = tt; y < tb; y += 12) {
        const k = (y - tt) / (tb - tt), half = 46 + 26 * k
        x.fillStyle = INK; x.fillRect(Math.round(ix - half - 6), y, Math.round(half * 2 + 12), 13)
        x.fillStyle = Math.floor((y - tt) / 60) % 2 ? '#fbf3e6' : '#e8344e'; x.fillRect(Math.round(ix - half), y, Math.round(half * 2), 12.5)
      }
      x.fillStyle = INK; x.fillRect(ix - 86, tt - 14, 172, 18); x.fillStyle = '#2a1b46'; x.fillRect(ix - 80, tt - 10, 160, 10)
      // the lamp room
      x.fillStyle = INK; x.fillRect(ix - 56, tt - 84, 112, 72); x.fillStyle = '#fff2a8'; x.fillRect(ix - 48, tt - 76, 96, 58)
      x.fillStyle = INK; x.fillRect(ix - 4, tt - 76, 8, 58)
      x.fillStyle = INK; x.fillRect(ix - 66, tt - 100, 132, 18); x.fillStyle = '#e8344e'; x.fillRect(ix - 60, tt - 96, 120, 10)
    } else if (I.kind === 'x') {
      mound(ix, 250, top, t)
      // the red X on the sand
      x.fillStyle = '#e8344e'
      for (let i = -3; i <= 3; i++) { x.fillRect(ix + 70 + i * 6 - 4, top + 34 + i * 4, 9, 7); x.fillRect(ix + 70 - i * 6 - 4, top + 34 + i * 4, 9, 7) }
      // a lantern post
      x.fillStyle = INK; x.fillRect(ix - 98, top - 92, 10, 96); x.fillRect(ix - 112, top - 124, 38, 38); x.fillStyle = '#ffd98a'; x.fillRect(ix - 106, top - 118, 26, 26)
      const lg = x.createRadialGradient(ix - 93, top - 105, 0, ix - 93, top - 105, 120); lg.addColorStop(0, 'rgba(255,217,138,0.45)'); lg.addColorStop(1, 'rgba(255,217,138,0)'); x.fillStyle = lg; x.fillRect(ix - 213, top - 225, 240, 240)
      // the quiet star, with its teapot, under its umbrella
      const s = 166, cy = sY(s, top + 4), qs = quietState(t)
      drawTeapot(x, ix + 4 + 86, top - 22, 6, qs.pour)
      star(ix + 4, cy, s, t, { color: QUIET_C, mood: qs.mood, look: qs.look, hops: Q_HOPS, seed: 12 })
      umbrella(ix - 10, cy - 150, t)
    }
  }
  const flexK = t => Math.max(...T.flex.map(f => bump(t, f, 0.55)), t >= T.isl1Out[0] ? 0.6 + 0.4 * Math.sin(t * 9) : 0)
  function quietState(t) {
    if (t < T.isl4[1]) return { mood: 'neutral', look: [-1, 0], pour: 0 }
    if (t < T.l12) return { mood: 'wide', look: [-1, 0], pour: 0 }
    if (t < T.mug[0]) return { mood: 'happy', look: [-1, 0], pour: -0.5 * bump(t, T.l12 + 0.3, 0.7) }
    if (t < T.lesson) return { mood: t > T.patch[0] ? 'wink' : 'happy', look: [-1, 0], pour: 0 }
    return { mood: 'happy', look: [-1, -1], pour: 0 }
  }
  function umbrella(cx, cy, t) {
    const sw = 0.06 * Math.sin(t * 1.4)
    x.save(); x.translate(cx, cy); x.rotate(-0.18 + sw)
    x.fillStyle = INK; x.fillRect(-3, 0, 7, 130)
    for (let j = 0; j < 6; j++) {
      const half = 30 + j * 18
      for (let i = -half; i < half; i += 10) { x.fillStyle = INK; x.fillRect(i - 3, -60 + j * 10 - 3, 16, 16) }
    }
    for (let j = 0; j < 6; j++) {
      const half = 30 + j * 18
      for (let i = -half; i < half; i += 10) { x.fillStyle = Math.floor((i + 200) / 40) % 2 ? '#ff8fb1' : '#fbf3e6'; x.fillRect(i, -60 + j * 10, 10.5, 10.5) }
    }
    x.restore()
  }

  // ═══════════════════════ the crew (inside the ship's rock) ═══════════════════════
  function crew(t) {
    // ♓ Pisces in the crow's nest
    const ps = pisState(t)
    star(PIS_AT.x, PIS_AT.y, PIS_AT.s, t, { color: PIS.color, mood: ps.mood, look: ps.look, hops: P_HOPS, seed: 3 }, () => { tearsCells(x, t, ps.tears); spyglassCells(x, ps.glass) })
    nestFront()
    // ♈ Aries, first mate
    const as = ariState(t), aY = sY(ARI_AT.s)
    star(ARI_AT.x, aY, ARI_AT.s, t, { color: ARI.color, mood: as.mood, look: as.look, blink: as.blink, hops: A_HOPS, seed: 6, squash: as.munch ? 0.05 * Math.sin(t * 22) : 0 }, () => bandanaCells(x, t))
    if (as.munch) { drawCoin(x, ARI_AT.x + 60, aY + 30, 18, { spin: 0.9, bitten: 1 }); for (let i = 0; i < 3; i++) { const ph = (t * 2 + i / 3) % 1; x.globalAlpha = 1 - ph; x.fillStyle = '#6b3a22'; x.fillRect(ARI_AT.x + 50 + i * 12, aY + 40 + ph * 50, 6, 6); x.globalAlpha = 1 } }
    if (as.hearts > 0) floatHearts(t, ARI_AT.x, aY - 70, as.hearts)
    // Aries' tiny umbrella in the rain (it's ALWAYS raining under Pisces)
    if (rainK(t) > 0.02) { x.save(); x.globalAlpha = rainK(t); miniBrella(ARI_AT.x + 10, aY - 110, t); x.restore() }
    // ♏ Captain Scorpio
    const ss = scoState(t), sYc = sY(SCO_AT.s)
    star(SCO_AT.x, sYc, SCO_AT.s, t, { color: SCO.color, mood: ss.mood, look: ss.look, blink: ss.blink, squash: ss.squash, hops: S_HOPS, seed: 2, blush: ss.blush }, () => {
      if (t >= T.blanket[0]) blanketCells(x, ease.outCubic(prog(t, ...T.blanket)))
      eyepatchCells(x, ss.patch)
      tricornCells(x, { tilt: ss.hatTilt + 0.04, droop: sadK(t), lift: ss.patch > 0 ? 3 * bump(t, T.patch[0], 0.4) : 0 })
    })
    // the tea mug, in Scorpio's... point
    if (t >= T.mug[1] && t < T.out[1]) drawMug(x, SCO_AT.x + 118, sYc + 40, 7, t, { steam: 1 })
  }
  function floatHearts(t, cx, cy, k) {
    const R = rng(3)
    for (let i = 0; i < 5; i++) {
      const ph = (t * 0.9 + i / 5) % 1, hx = cx + (R() * 2 - 1) * 60 + Math.sin(ph * 6 + i) * 10, hy = cy - ph * 120
      x.globalAlpha = Math.sin(Math.PI * ph) * k
      blit(x, ['.X.X.', 'XXXXX', '.XXX.', '..X..'], { X: ROSE }, hx, hy, 6)
    }
    x.globalAlpha = 1
  }
  function miniBrella(cx, cy, t) {
    x.save(); x.translate(cx, cy); x.rotate(0.1 * Math.sin(t * 2))
    x.fillStyle = INK; x.fillRect(-2, 0, 5, 70)
    for (let j = 0; j < 4; j++) { const half = 20 + j * 14; x.fillStyle = INK; x.fillRect(-half - 4, -34 + j * 9 - 4, half * 2 + 8, 17); }
    for (let j = 0; j < 4; j++) { const half = 20 + j * 14; x.fillStyle = j % 2 ? '#7fe0ff' : '#bff0ff'; x.fillRect(-half, -34 + j * 9, half * 2, 9.5) }
    x.restore()
  }

  // ═══════════════════════ effects (world) ═══════════════════════
  function knockFx(t) {
    // Scorpio's spyglass reaches over and raps the abs: tonk… tonk…
    const reach = clamp(prog(t, T.knock[0] - 0.35, T.knock[0] - 0.05)) * (1 - prog(t, T.knock[1] + 0.5, T.knock[1] + 0.8))
    if (reach <= 0) return
    const tap = Math.max(...T.knock.map(k => bump(t, k - 0.08, 0.16)))
    const x0 = SCO_AT.x + 80, y0 = sY(SCO_AT.s) + 20, x1 = lerp(x0, ISL_X - 32, reach) - 14 * tap, y1 = lerp(y0, 1082, reach)
    const ang = Math.atan2(y1 - y0, x1 - x0), len = Math.hypot(x1 - x0, y1 - y0)
    x.save(); x.translate(x0, y0); x.rotate(ang)
    x.fillStyle = INK; x.fillRect(0, -12, len + 6, 24); x.fillStyle = '#a8742a'; x.fillRect(0, -8, len * 0.5, 16); x.fillStyle = '#e9b24a'; x.fillRect(len * 0.5, -6, len * 0.5, 12)
    x.fillStyle = '#bff0ff'; x.fillRect(len - 2, -6, 5, 12)
    x.restore()
    for (const k of T.knock) {
      const dt = t - k
      if (dt < 0 || dt > 0.95) continue
      const a = 1 - prog(dt, 0.65, 0.95), sc = easeOutBack(prog(dt, 0, 0.18), 2.6)
      x.save(); x.globalAlpha = a; x.translate(ISL_X + 70 + (k === T.knock[1] ? 40 : 0), 1030 - (k === T.knock[1] ? 46 : 0) - dt * 30); x.scale(sc, sc)
      stroked('tonk.', 0, 0, 34, BONE, 9)
      x.restore()
      // a hollow echo ring
      x.save(); x.globalAlpha = 0.6 * (1 - dt / 0.95); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.arc(ISL_X - 30, 1082, 20 + dt * 120, 0, TAU); x.stroke(); x.restore()
    }
  }
  function coinFx(t) {
    // grab: a coin arcs from the chest to Scorpio's face; bite; the foil peels; tossed to Aries
    if (t < T.grab[0] || t >= T.toss[1]) return
    const ix = islX(t, T.isl2, T.isl2Out) ?? ISL_X
    const A0 = { x: ix + 30, y: ISL_TOP - 96 }, B0 = { x: SCO_AT.x + 56, y: sY(SCO_AT.s) + 36 }, C0 = { x: ARI_AT.x + 60, y: sY(ARI_AT.s) + 30 }
    let P, spin = 1
    if (t < T.grab[1]) { const p = ease.inOutQuad(prog(t, ...T.grab)); P = { x: lerp(A0.x, B0.x, p), y: lerp(A0.y, B0.y, p) - Math.sin(Math.PI * p) * 160 }; spin = Math.cos(p * TAU * 2) }
    else if (t < T.toss[0]) P = B0
    else { const p = ease.inOutQuad(prog(t, ...T.toss)); P = { x: lerp(B0.x, C0.x, p), y: lerp(B0.y, C0.y, p) - Math.sin(Math.PI * p) * 200 }; spin = Math.cos(p * TAU * 2) }
    const bitten = prog(t, ...T.peel), r = lerp(26, 18, prog(t, ...T.toss))
    drawCoin(x, P.x, P.y, r, { spin, bitten })
    if (t >= T.bite && t < T.bite + 0.7) {
      const dt = t - T.bite, sc = easeOutBack(prog(dt, 0, 0.16), 2.6)
      x.save(); x.globalAlpha = 1 - prog(dt, 0.5, 0.7); x.translate(P.x + 46, P.y - 56 - dt * 24); x.scale(sc, sc); x.rotate(-0.1); stroked('CRUNCH', 0, 0, 26, '#ffd66e', 8); x.restore()
      const R = rng(7)
      for (let i = 0; i < 7; i++) { const a = R() * TAU, d = dt * (120 + R() * 80); x.globalAlpha = 1 - dt / 0.7; x.fillStyle = i % 2 ? '#ffd66e' : '#6b3a22'; x.fillRect(P.x + Math.cos(a) * d, P.y + Math.sin(a) * d + dt * dt * 300, 6, 6) }
      x.globalAlpha = 1
    }
  }
  function beamFx(t) {
    const ix = islX(t, T.isl3, T.isl3Out)
    if (ix === null || t < T.beamOn) return
    const k = clamp((t - T.beamOn) / 0.3)
    const lx = ix, ly = 780 - 48, ang = beamAng(t), len = 1100, spread = 0.16
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(lx, ly, 10, lx, ly, len)
    g.addColorStop(0, `rgba(255,242,168,${0.55 * k})`); g.addColorStop(0.5, `rgba(255,242,168,${0.22 * k})`); g.addColorStop(1, 'rgba(255,242,168,0)')
    x.fillStyle = g; x.beginPath(); x.moveTo(lx, ly); x.arc(lx, ly, len, ang - spread, ang + spread); x.closePath(); x.fill()
    x.restore()
  }
  function fame(t) {
    const ix = islX(t, T.isl3, T.isl3Out)
    if (ix === null || ix > 1500) return
    const s = 158, cy = sY(s, 780 - 100) + Math.sin(t * 1.2 + T.isl3[0]) * 3
    // the ring light behind its head
    const fl = Math.max(...T.flash.map(f => bump(t, f, 0.25)))
    x.save(); x.globalCompositeOperation = 'lighter'
    const rg = x.createRadialGradient(ix, cy, 60, ix, cy, 150 + 60 * fl); rg.addColorStop(0, 'rgba(255,255,255,0)'); rg.addColorStop(0.75, `rgba(255,240,250,${0.35 + 0.5 * fl})`); rg.addColorStop(1, 'rgba(255,240,250,0)')
    x.fillStyle = rg; x.fillRect(ix - 260, cy - 260, 520, 520); x.restore()
    x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(ix, cy - 6, 112, 0, TAU); x.stroke()
    x.strokeStyle = '#fff6fb'; x.lineWidth = 12; x.beginPath(); x.arc(ix, cy - 6, 112, 0, TAU); x.stroke()
    const self = t >= T.turn[1]
    star(ix, cy, s, t, { color: FAME_C, mood: self ? 'heart' : inR(t, ...T.flash.map((f, i) => i ? f + 0.3 : f)) ? 'wink' : 'happy', look: self ? [1, -1] : [-1, 0], hops: F_HOPS, seed: 9, blush: 1 }, () => phoneCells(x, fl))
  }
  function weather(t, C) {
    // Scorpio's personal grump cloud (it follows the captain; it blows away when the tea arrives)
    const ck = clamp((t - T.cloud[0]) / 0.4) * (t < T.cloud[1] ? 1 : 0)
    const blow = prog(t, T.cloud[1], T.cloud[1] + 0.7)
    if (ck > 0 || (blow > 0 && blow < 1)) {
      const cx = SCO_AT.x + lerp(0, -900, ease.inCubic(blow)), cy = 840 - 16 * Math.sin(t * 2), a = t < T.cloud[1] ? ck : 1 - blow
      // heavy rain right under it
      x.save(); x.globalAlpha = a
      const R = rng(12)
      for (let i = 0; i < 22; i++) { const ph = (t * 2.4 + R()) % 1, rx = cx - 100 + R() * 200, ry = cy + 40 + ph * 220; x.fillStyle = '#8fd8ff'; x.fillRect(rx - ph * 10, ry, 5, 22) }
      x.restore()
      drawCloud(x, cx, cy, 13, { alpha: a, dark: 1, grump: true })
    }
    // the sunbeam when it clears
    const sb = bump(t, T.clear[0] - 0.05, 2.6)
    if (sb > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 * sb
      const g = x.createLinearGradient(0, 300, 0, 1120); g.addColorStop(0, 'rgba(255,214,140,0)'); g.addColorStop(1, 'rgba(255,214,140,0.5)')
      x.fillStyle = g; x.beginPath(); x.moveTo(SCO_AT.x + 120, 300); x.lineTo(SCO_AT.x + 220, 300); x.lineTo(SCO_AT.x + 200, 1120); x.lineTo(SCO_AT.x - 160, 1120); x.closePath(); x.fill()
      x.restore()
    }
    void C
  }
  function teaFx(t) {
    // the mug arcs over from the island; the blanket floats down onto the captain
    if (t >= T.mug[0] && t < T.mug[1]) {
      const p = ease.inOutQuad(prog(t, ...T.mug)), ix = ISL_X + 90, iy = ISL_TOP - 40, ex = SCO_AT.x + 118, ey = sY(SCO_AT.s) + 40
      drawMug(x, lerp(ix, ex, p), lerp(iy, ey, p) - Math.sin(Math.PI * p) * 220, 7, t, { steam: 1 })
    }
    sparkleRing(t, SCO_AT.x + 118, sY(SCO_AT.s) + 40, T.mug[1] - 0.05, 8, 80, 1, [GOLD, '#ffd6e2', BONE], 0.6, 20)
    sparkleRing(t, SCO_AT.x, sY(SCO_AT.s) - 30, T.patch[0] + 0.1, 12, 170, 2, [ROSE, PINK, GOLD, BONE], 0.8, 26)
  }
  function anchorFx(t) {
    if (t < T.anchor[0] - 0.05 || t > T.out[1]) return
    const p = ease.inQuad(prog(t, ...T.anchor)), ax = 760, ay = lerp(1010, 1330, p)
    x.fillStyle = INK; x.fillRect(ax - 4, 1000, 9, ay - 1000 - 50)
    for (let y = 1000; y < ay - 50; y += 14) { x.fillStyle = '#c9c2e6'; x.fillRect(ax - 3, y, 7, 9) }
    if (t < T.splash + 0.15) drawAnchor(x, ax, ay, 7, 0.08 * Math.sin(t * 9))
    // the splash: a crown of stars + foam
    const dt = t - T.splash
    if (dt >= 0 && dt < 1.0) {
      const R = rng(31)
      for (let i = 0; i < 18; i++) {
        const a = -Math.PI / 2 + (R() * 2 - 1) * 1.1, v = 380 + R() * 360, sx = ax + Math.cos(a) * v * dt, sy = SEA + 60 + Math.sin(a) * v * dt + 900 * dt * dt
        x.globalAlpha = 1 - dt; drawPixelStar(x, sx, sy, 22 + 14 * R(), i % 2 ? 1 : 2, [GOLD, BONE, CYAN, PINK][i % 4])
      }
      x.globalAlpha = 1
    }
  }

  // ═══════════════════════ screen space ═══════════════════════
  // the treasure map (hook + tie-in)
  const MAP = { cx: 540, cy: 960, w: 900, h: 620 }
  function drawMap(t, { k = 1, rot = 0, dy = 0, pathP = 1, ping = -1, rewrite = false, scale = 1 } = {}) {
    if (k <= 0) return
    const { cx, w, h } = MAP, cy = MAP.cy + dy
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(scale * k, scale * (0.2 + 0.8 * k))
    // parchment with stepped burnt edges
    const R = rng(5), P = 12
    x.fillStyle = INK; x.fillRect(-w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P)
    x.fillStyle = '#e7cf9a'; x.fillRect(-w / 2, -h / 2, w, h)
    for (let i = 0; i < 40; i++) { const ex = -w / 2 + R() * w, ey = R() > 0.5 ? -h / 2 : h / 2 - P; x.fillStyle = '#b8935a'; x.fillRect(ex, ey, 36 + R() * 50, P) }
    for (let j = 0; j < 30; j++) { const ey = -h / 2 + R() * h; x.fillStyle = '#b8935a'; x.fillRect(R() > 0.5 ? -w / 2 : w / 2 - P, ey, P, 30 + R() * 40) }
    // rolled ends
    x.fillStyle = INK; x.fillRect(-w / 2 - 24, -h / 2 - 20, 36, h + 40); x.fillRect(w / 2 - 12, -h / 2 - 20, 36, h + 40)
    x.fillStyle = '#d4b679'; x.fillRect(-w / 2 - 18, -h / 2 - 14, 24, h + 28); x.fillRect(w / 2 - 6, -h / 2 - 14, 24, h + 28)
    // sea squiggles
    x.fillStyle = 'rgba(120,90,60,0.35)'
    for (let i = 0; i < 16; i++) { const sx = -w / 2 + 60 + (i * 137) % (w - 140), sy = -h / 2 + 70 + ((i * 89) % (h - 140)); for (let q = 0; q < 4; q++) x.fillRect(sx + q * 12, sy + (q % 2) * 6, 12, 5) }
    // stops: abs · chest · lighthouse · X
    const STOPS = [[-300, -150], [-60, -40], [160, -170], [330, 170]]
    const pts = [[-380, 220], ...STOPS]
    const segs = []; for (let i = 0; i + 1 < pts.length; i++) segs.push([pts[i], pts[i + 1]])
    const total = segs.length
    x.fillStyle = '#7a3a2a'
    segs.forEach(([a, b], i) => {
      const sp = clamp(pathP * total - i)
      if (sp <= 0) return
      const n = 9
      for (let q = 0; q < n * sp; q++) { const u = q / n, mx = lerp(a[0], b[0], u), my = lerp(a[1], b[1], u) + Math.sin(u * Math.PI) * 30; x.fillRect(mx - 5, my - 5, 10, 10) }
    })
    const iconK = i => easeOutBack(clamp(pathP * total - i - 0.7) / 0.3 > 1 ? 1 : clamp((pathP * total - i - 0.7) / 0.3), 2.2)
    // abs island: a little flexing arm-ish palm  · chest · lighthouse
    const ic = [
      () => { blit(x, ['..GG..', '.GGGG.', '...B..', '...B..', 'SSSSSS'], { G: '#4fbf6a', B: '#8a5a2c', S: '#d9ae66' }, 0, 0, 12); stroked('ABS', 0, 54, 24, '#7a3a2a', 0) },
      () => { blit(x, ['YYYYYY', 'BBYYBB', 'BBBBBB', 'BBBBBB'], { Y: '#f2c75c', B: '#8a5a2c' }, 0, 0, 12); stroked('GOLD', 0, 46, 24, '#7a3a2a', 0) },
      () => { blit(x, ['.YY.', 'RRRR', '.WW.', '.RR.', '.WW.', 'RRRR'], { Y: '#ffe08a', R: '#e8344e', W: '#fbf3e6' }, 0, 0, 11); stroked('FAME', 0, 54, 24, '#7a3a2a', 0) },
    ]
    STOPS.slice(0, 3).forEach(([sx, sy], i) => { const kk = iconK(i); if (kk <= 0) return; x.save(); x.translate(sx, sy); x.scale(kk, kk); ic[i](); x.restore() })
    // the X
    const xk = iconK(3)
    if (xk > 0) {
      const [X0, Y0] = STOPS[3]
      x.save(); x.translate(X0, Y0); x.scale(xk, xk)
      x.fillStyle = '#c42540'; for (let i = -3; i <= 3; i++) { x.fillRect(i * 9 - 6, i * 9 - 6, 12, 12); x.fillRect(-i * 9 - 6, i * 9 - 6, 12, 12) }
      x.restore()
      const pk = ping >= 0 ? bump(t, ping, 0.6) : 0
      if (pk > 0) { x.strokeStyle = rgba('#c42540', pk); x.lineWidth = 6; x.beginPath(); x.arc(X0, Y0, 40 + 50 * (1 - pk), 0, TAU); x.stroke() }
      // the label ribbon
      x.save(); x.translate(X0 - 150, Y0 - 104); x.rotate(-0.04)
      x.fillStyle = INK; x.fillRect(-196, -30, 392, 60); x.fillStyle = '#fbf3e6'; x.fillRect(-190, -24, 380, 48)
      x.fillStyle = '#7a3a2a'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE PERFECT PARTNER', 0, 2)
      if (rewrite) {
        x.fillStyle = '#c42540'; x.fillRect(-176, -2, 352, 6)
        x.save(); x.translate(10, 54); x.rotate(-0.06)
        x.font = `italic 600 50px ${SERIF}`; x.lineWidth = 8; x.strokeStyle = '#e7cf9a'; x.strokeText('someone kind ♥', 0, 0); x.fillStyle = '#c42540'; x.fillText('someone kind ♥', 0, 0)
        x.restore()
      }
      x.restore()
    }
    // compass rose
    x.save(); x.translate(-320, 200 - 470); x.fillStyle = '#7a3a2a'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('N', 0, -46); x.fillRect(-3, -36, 6, 72); x.fillRect(-36, -3, 72, 6); x.restore()
    x.restore()
  }
  function mapLayer(t) {
    // the hook: the map slams down; the path inks; it whips away
    if (t < T.mapOut[1]) {
      const pin = prog(t, ...T.mapIn), sl = t - T.slam
      const k = t < T.slam ? 1 : 1
      const dy = t < T.slam ? lerp(-1500, 0, ease.inQuad(pin)) : 0
      const squash = sl >= 0 && sl < 0.4 ? 1 + 0.05 * Math.exp(-sl * 9) * Math.cos(sl * 30) : 1
      const po = ease.inCubic(prog(t, ...T.mapOut))
      // the dim behind it
      x.fillStyle = `rgba(6,4,18,${0.55 * (1 - po)})`; x.fillRect(0, 0, W, H)
      drawMap(t, { k, dy: dy - po * 1700, rot: -0.03 + 0.25 * po, pathP: ease.inOutQuad(prog(t, ...T.path)), ping: T.xPing, scale: squash })
      if (sl >= 0 && sl < 0.2) { x.fillStyle = `rgba(255,240,210,${0.25 * (1 - sl / 0.2)})`; x.fillRect(0, 0, W, H) }
    }
    // the tie-in: the map unrolls again, rewritten; tonight's deck deals onto it
    if (t >= T.map2[0] && t < T.map2Out[1]) {
      const k = ease.outBack(prog(t, ...T.map2)), o = ease.inCubic(prog(t, ...T.map2Out))
      x.fillStyle = `rgba(6,4,18,${0.5 * clamp(k) * (1 - o)})`; x.fillRect(0, 0, W, H)
      drawMap(t, { k: clamp(k), dy: 40 + o * 1700, rot: 0.02 - o * 0.2, pathP: 1, rewrite: true, scale: 1 })
      const DK = [{ x: 330, y: 880, r: -0.12 }, { x: 520, y: 860, r: 0 }, { x: 710, y: 880, r: 0.12 }]
      DK.forEach((D, i) => {
        const p = prog(t, T.deal[i], T.deal[i] + 0.4)
        if (p <= 0 || !FACES[i]) return
        const e = easeOutBack(p, 1.6), cx = lerp(540, D.x, e), cy = lerp(-300, D.y, e) + o * 1700, rot = lerp(2.4 + i, D.r, ease.outCubic(p))
        const wB = 172, w = wB / FACE_BODY, h = w * FACES[i].height / FACES[i].width
        x.save(); x.translate(cx, cy); x.rotate(rot - o * 0.3); x.drawImage(FACES[i], -w / 2, -h / 2, w, h); x.restore()
        sparkleRing(t, D.x, D.y, T.deal[i] + 0.3, 8, 150, i, [GOLD, BONE, LAV, MINT], 0.55, 22)
      })
    }
  }
  // the crew credits (title beat)
  const CREDS = [
    { t: T.cred[0], text: 'CAPTAIN ♏︎ SCORPIO', col: '#ff7e9c', wx: SCO_AT.x, wy: 836 },
    { t: T.cred[1], text: 'FIRST MATE ♈︎ ARIES', col: '#ff9a7a', wx: ARI_AT.x + 30, wy: 930 },
    { t: T.cred[2], text: 'LOOKOUT ♓︎ PISCES', col: LAV, sub: '(already crying)', wx: 640, wy: 560 },
  ]
  function credits(t, C) {
    for (const c of CREDS) {
      if (t < c.t || t > 10.35) continue
      const k = pop01(t, c.t, 0.32, 2.2) * outK(t, [10.1, 10.35]), S = toS(C, c.wx, c.wy)
      x.save(); x.translate(Math.min(Math.max(S.x, 230), 850), S.y); x.scale(k, k)
      x.font = `700 28px ${MONO}`; const tw = x.measureText(c.text).width + 40
      x.fillStyle = INK; x.fillRect(-tw / 2 - 6, -28, tw + 12, 56); x.fillStyle = 'rgba(20,12,44,0.95)'; x.fillRect(-tw / 2, -22, tw, 44)
      x.fillStyle = c.col; x.fillRect(-tw / 2, -22, tw, 4)
      x.fillStyle = c.col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(c.text, 0, 2)
      if (c.sub) { x.font = `italic 500 34px ${SERIF}`; x.fillStyle = BONE; x.fillText(c.sub, 0, 50) }
      x.restore()
    }
  }
  function rainLayer(t) {
    const k = rainK(t)
    if (k <= 0) return
    const R = rng(21)
    x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = '#9fd8ff'
    for (let i = 0; i < 70; i++) { const ph = (t * (1.3 + R() * 0.5) + R()) % 1, rx = R() * (W + 300) - ph * 160, ry = -100 + ph * (H + 200); x.fillRect(Math.round(rx), Math.round(ry), 4, 26) }
    x.restore()
    // a cool wash
    x.fillStyle = `rgba(20,30,70,${0.25 * k})`; x.fillRect(0, 0, W, H)
  }
  function blindFlash(t) {
    const fl = Math.max(...T.flash.map(f => bump(t, f, 0.22)))
    const b = blindK(t)
    if (b > 0) { x.fillStyle = `rgba(255,248,214,${0.32 * b})`; x.fillRect(0, 0, W, H) }
    if (fl > 0) {
      x.fillStyle = `rgba(255,255,255,${0.55 * fl})`; x.fillRect(0, 0, W, H)
      if (fl > 0.4) { x.save(); x.translate(820, 470); x.rotate(0.12); stroked('*click*', 0, 0, 40, FAME_C, 10); x.restore() }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) * (1 - rainK(t) * 0.7) } })
      const outP = popOut(t, T.out)
      withCam(C, () => {
        seaBack(t)
        for (const I of ISLES) isle(t, I)
        beamFx(t)
        fame(t)
        const R = shipRock(t)
        x.save(); x.translate(420, 1160 + R.dy); x.rotate(R.rot); x.translate(-420, -1160)
        shipBack(t)
        crew(t)
        shipFront(t)
        x.restore()
        knockFx(t)
        coinFx(t)
        teaFx(t)
        anchorFx(t)
        seaFront(t)
        weather(t, C)
      })
      rainLayer(t)
      blindFlash(t)
      credits(t, C)
      mapLayer(t)
      if (outP < 1) { x.fillStyle = `rgba(5,4,12,${1 - clamp(outP)})`; x.fillRect(0, 0, W, H) }
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change. The default selection keeps 4 of these 9 (indices 1, 3, 5, 7):
// 10.5 (→ six-pack island), 19.45 (→ the chest), 33.45 (→ the slump), 50.3 (→ tonight's deck). End card flips at 55.6.
export const CUTS = [4.45, T.cut1, 15.0, T.cut2, 26.35, T.cut3, 37.25, T.cut4, 53.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
export const _T = T, _LESSON = LESSON, _HEADS = HEADS
void lessonTimes; void lineTimes

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into Bb major = G minor's relative);
// brass / chip / strings are written straight in G minor.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { G2: 98.0, D3: 146.83, G3: 196.0, A3: 220.0, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.0, A4: 440.0, Bb4: 466.16, C5: 523.25, D5: 587.33 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }], ['tom', r3(t), low, { gain: 0.34, decay: 0.7, rev: 0.4, bus: 'fx' }], ['whoosh', r3(t + 0.04), 0.3, 0.06]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const crunch = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', r3(t0 + i * gap), gain])
const womp = t0 => [['chip', r3(t0), 330, 0.5, { wave: 'tri', slide: -14, gain: 0.05, decay: 0.35, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }], ['chip', r3(t0 + 0.22), 247, 0.55, { wave: 'tri', slide: -18, gain: 0.05, decay: 0.4, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }]]
const sob = t0 => [0, 0.16, 0.3].map((d, i) => ['chip', r3(t0 + d), 760 - i * 60, 0.13, { duty: 0.5, slide: -6, vib: 0.06, gain: 0.014, decay: 0.1, sustain: 0.5, rev: 0.25, dly: 0, bus: 'fx' }])
const rainTicks = []
for (let tt = 33.6; tt < 41.6; tt += 0.19) rainTicks.push(['tick', r3(tt + ((tt * 7.3) % 0.09)), 0.009])
export const CUES = [
  // 0 · the map slams down (DUNNN), the path inks, the X pings
  ['whoosh', 0.3, 0.32, 0.07],
  ...sting(T.slam, [N.G3, N.D4, N.G4, N.Bb4], 1.2, 0.05, 60), ['boom', T.slam, 0.34],
  ['strings', T.slam, r3(T.slam + 1.8), [N.G3, N.D4, N.G4, N.Bb4], { gain: 0.012, attack: 0.05, release: 0.7, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[0]),
  ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.path[0] + i * 0.16), 0.02]),
  ['bell', T.xPing, 1174.66, 0.035, 1.4, 0.3], ['pop', T.xPing, 1318.51, 0.03, 0.3],
  ['riser', 3.5, 4.47, 0.05], ['whoosh', 4.0, 0.5, 0.08],
  // 1 · title + crew
  ...sting(T.drop, [N.G2, N.D3, N.G3, N.Bb3, N.D4], 1.4, 0.055, 56), ['boom', T.drop, 0.36],
  ['strings', T.drop, r3(T.drop + 2.2), [N.G3, N.Bb3, N.D4, N.G4], { gain: 0.012, attack: 0.08, release: 0.8, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[1]),
  ...T.cred.flatMap((c, i) => [['pop', c, NOTE[2 + i * 2], 0.04, (i - 1) * 0.4], ['tick', c, 0.04]]),
  ...sob(T.cred[2] + 0.3),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [ST]: 740, [PT]: 1046.5, [HT]: 587.33, [RT]: 880, [FT]: 1174.66, [QT]: 659.25 } }),
  // 2 · six-pack island
  ['whoosh', T.isl1[0] + 0.1, 0.5, 0.05], ...headCues(HEADS[2]),
  ['bell', r3(T.l3 + 0.02), 1760, 0.025, 1.0, -0.3], ...sob(12.25),
  ...T.flex.flatMap(f => [['tom', r3(f + 0.05), 90, { gain: 0.22, decay: 0.3, rev: 0.3, bus: 'fx' }], ['glitter', r3(f + 0.05), r3(f + 0.4)]]),
  ['chip', r3(T.flex[0] + 0.15), 900, 0.35, { duty: 0.25, slide: 24, vib: 0.08, gain: 0.02, decay: 0.3, sustain: 0.6, rev: 0.2, dly: 0, bus: 'fx' }],   // Aries' squeal
  ['whoosh', r3(T.knock[0] - 0.3), 0.3, 0.04],
  ...T.knock.flatMap(k => [['tom', r3(k), 150, { gain: 0.3, decay: 0.25, rev: 0.7, bus: 'fx' }], ['tick', r3(k), 0.05], ['tom', r3(k + 0.22), 150, { gain: 0.1, decay: 0.25, rev: 0.8, bus: 'fx' }]]),
  ...headCues(HEADS[3]), ...womp(16.5),
  ['whoosh', r3(T.isl1Out[0] + 0.4), 0.6, 0.05],
  // 3 · the chest
  ['whoosh', T.isl2[0] + 0.1, 0.5, 0.05], ...headCues(HEADS[4]),
  ['glitter', r3(T.l6 + 0.3), r3(T.l6 + 1.2)], ...[0, 1, 2, 3].map(i => ['bell', r3(T.l6 + 0.4 + i * 0.16), NOTE[3 + i % 4] * 2, 0.014, 0.8, (i - 1.5) * 0.3]),
  ['whoosh', T.grab[0], 0.4, 0.04], ['pop', T.grab[1], 1318.51, 0.03, 0.2],
  ...crunch(T.bite, 7, 0.028, 0.045), ['chip', T.bite, 1800, 0.18, { wave: 'noise', slide: -40, gain: 0.04, decay: 0.12, sustain: 0.4, rev: 0, dly: 0, bus: 'fx' }],
  ['tapeStop', r3(T.bite + 0.12), 0.4],
  ...headCues(HEADS[5]),
  ['pop', T.rental, 523.25, 0.035, 0.4], ['tick', T.rental, 0.05],
  ['whoosh', T.toss[0], 0.4, 0.04], ...crunch(T.munch[0], 9, 0.13, 0.02),
  ['whoosh', r3(T.isl2Out[0] + 0.4), 0.6, 0.05],
  // 4 · the lighthouse
  ['whoosh', T.isl3[0] + 0.1, 0.5, 0.05], ...headCues(HEADS[6]),
  ['riser', T.beamOn, r3(T.sweep[1]), 0.04], ['boom', T.sweep[1], 0.2], ['strings', T.sweep[1], r3(T.blind[1]), [N.D4, N.G4, N.A4, N.D5], { gain: 0.01, attack: 0.02, release: 0.3, rev: 0.6, bus: 'fx' }],
  ...T.flash.flatMap(f => [['tick', f, 0.07], ['chip', r3(f + 0.01), 6000, 0.08, { wave: 'noise', gain: 0.04, decay: 0.05, sustain: 0.3, rev: 0, dly: 0, bus: 'fx' }]]),
  ['whoosh', T.turn[0], 0.6, 0.05], ...headCues(HEADS[7]),
  ['whoosh', r3(T.isl3Out[0] + 0.4), 0.6, 0.05],
  // 5 · the slump, the tiny island, tea
  ['boom', T.cut3 + 0.1, 0.2], ...headCues(HEADS[8]), ...rainTicks, ...womp(T.droop[0] + 0.2),
  ['bell', r3(T.l11 + 0.05), 1760, 0.025, 1.0, -0.3], ...sob(T.l11 + 0.9),
  ['whoosh', T.isl4[0] + 0.1, 0.6, 0.05], ...headCues(HEADS[9]),
  ['strings', T.isl4[1], r3(T.isl4[1] + 2.5), [N.Bb3, N.D4, N.F4, N.Bb4], { gain: 0.009, attack: 0.4, release: 1.0, rev: 0.6, bus: 'fx' }],
  ['chip', r3(T.l12 + 0.4), 2400, 0.6, { wave: 'noise', slide: -8, gain: 0.015, decay: 0.5, sustain: 0.6, rev: 0.2, dly: 0, bus: 'fx' }],   // the pour
  ['whoosh', T.mug[0], 0.5, 0.04], ['pop', T.mug[1], 784, 0.04, 0.2], ['bell', r3(T.mug[1] + 0.03), 1318.51, 0.03, 1.2, 0.2],
  ['whoosh', T.clear[0], 0.7, 0.06], ['glitter', T.clear[0], r3(T.clear[0] + 0.8)],
  ['pop', T.blanket[1], 440, 0.035, 0], ...sob(43.2),
  ['pop', T.patch[0], 1318.51, 0.04, 0], ['glitter', r3(T.patch[0] + 0.05), r3(T.patch[0] + 0.8)],
  ['strings', r3(T.patch[0] + 0.05), r3(T.patch[0] + 1.7), [N.G3, N.Bb3, N.D4, N.G4], { gain: 0.013, attack: 0.1, release: 0.8, rev: 0.6, bus: 'fx' }],
  ...headCues(HEADS[10]),
  // 6 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Gm' }),
  // 7 · tonight's deck
  ['whoosh', r3(T.map2[0] + 0.1), 0.45, 0.05], ['tick', T.map2[1], 0.04],
  ...headCues(HEADS[11]),
  ...T.deal.flatMap((d, i) => [['whoosh', r3(d), 0.3, 0.035], ['pop', r3(d + 0.32), NOTE[3 + i], 0.04, (i - 1) * 0.4], ['tick', r3(d + 0.32), 0.05]]),
  ['whoosh', T.map2Out[0], 0.4, 0.05],
  // 8 · drop anchor
  ...headCues(HEADS[12]),
  ['whoosh', T.anchor[0], 0.55, 0.06], ...crunch(T.anchor[0], 8, 0.06, 0.03),
  ['tom', T.splash, 62, { gain: 0.36, decay: 0.8, rev: 0.4, bus: 'fx' }], ['boom', T.splash, 0.3], ['glitter', T.splash, r3(T.splash + 0.6)],
  ['brass', T.splash, [N.G3, N.Bb3, N.D4, N.G4], 0.9, { gain: 0.045, bright: 1.2, ...FXB }],
  ...sob(T.splash + 0.3),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
