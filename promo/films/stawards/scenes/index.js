// stawards — "The Star Talk Awards." (60 s vertical Align ad, Star Talk "Wild Lessons" #25, the finale; music: cinematic,
// Bb — an awards-night orchestra). Story 0–55.6, then the shared end card.
//   0.0–4.45   The curtain is closed. DUNNN: a spotlight snaps on and a gold trophy rises into it. "Ladies, gentlemen | and
//              *balls of gas…*"  GEMINI (from behind the curtain): "it's the season *finale*, folks!"
//   4.49–10.4  The curtain parts on the drop: "The Star Talk | *Awards.*"  A stage in the nebula, a neon star, a podium.
//              Credits: HOSTS: THE BOOTH ♊︎♐︎ (headsets, one shared mic, in a balcony box) · FRONT ROW: ♓︎ PISCES (already
//              crying).  SAG: "what a season. *we cried.* mostly Pisces."
//  10.5        card cut.
//  10.55–19.8  "Most *Tears.*"  The Auntie Council (reading glasses) presents. CANCER: "first award: *most tears.*"
//              TAURUS: "nominees: Pisces, Pisces, *Pisces.*"  "Winner: | *Pisces.*" — Pisces leaps on stage,
//              the aunties' glasses fog. PISCES: "I'd like to thank… *everyone* 😭"  A speech scroll unrolls past the stage;
//              the orchestra plays her off: "Wrap it *up.*"  She keeps going, then bounces back to her seat.
//  19.95       card cut.
//  19.95–28.4  "Best *Boundaries.*"  Capricorn (tiny tie) walks up. CANCER: "come here, *baby!* group hug!"  Both aunties
//              lunge… a placard: HANDSHAKE ONLY. TAURUS: "Sunday dinner? *seven sharp?*"  CAPRICORN: "no. *but thank you.*"
//              "She said no | so *nicely.*" — both aunties swoon, heart-eyed. Capricorn bows out.
//  28.45–33.5  Speed round. GEMINI: "speed round! *no speeches!*"  "Best Supporting | *Comet.*" — the comet (sunglasses,
//              "just passing through") zips across and snatches its trophy without stopping. "Lifetime | *Achievement.*" —
//              the Sun rises behind the podium (4.6 billion years) and dozes off holding it. SAG: "asleep. *legend.*"
//  33.6        card cut.
//  33.6–45.4   "And the *final* | award…"  Drumroll. CANCER: "where are my *glasses?*"  TAURUS: "on your *head,* baby."
//              The envelope opens: YOU.  CRASH: the spotlights swing round onto the camera. "goes to… | *you.*"  Every
//              star turns to you. CANCER: "for showing up. even when it was *awkward.*"  SAG: "and you stayed *kind.* all
//              season."  The trophy flies at the camera (FOR SHOWING UP): "Standing *ovation.*" — confetti, hops, Pisces
//              fountains.
//  45.6–50.25 ★ LESSON UNLOCKED: "The best | love stories | are the *kind* ones."  +1 EVERYTHING
//  50.3        card cut.
//  50.35–53.8  "Tonight's *deck.*"  Three veiled cards deal onto the stage. GEMINI: "new deck every night. *starring you.*"
//  53.9–55.5   "See you next *season.*"  The curtain closes; one last confetti pop; Pisces sobs.
// One canvas (sky + stage world through a camera + screen-space curtain, spotlights and props), DOM type + dialogue boxes +
// the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import {
  INK, rgba, starFrame, inSprite, FOOT, tearsCells, glassesCells, headsetCells, tieCells, shadesCells,
  drawMic, drawTrophy, drawPodium, drawPlacard, drawEnvelope, drawScroll, confetti,
} from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', ROSE = '#ff6b9a', MINT = '#7dffb0', RED = '#e8344e'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)            // the 108 bpm grid
const CAN = signStar('cancer'), TAU_ = signStar('taurus'), GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), CAP = signStar('capricorn')
const COMET_C = '#9fe8ff', SUN_C = '#ffc23a'

// ── the timeline
const T = {
  black: [0, 0.2],
  // 0 · the closed curtain, the trophy in the spotlight
  spot: BEAT(0), trophyUp: [BEAT(0), 1.5], l1: 1.7, hookOut: [4.05, 4.45], close1: 4.4,
  // 1 · the curtain parts
  drop: BEAT(7), curtain: [BEAT(7), 5.45], cred: [5.6, 6.1], l2: 6.5, close2: 10.3,
  cut1: 10.5,
  // 2 · most tears
  auntIn: [10.4, 11.1], l3: 11.05, l4: 13.55, win1: 15.3, jump1: [15.45, 16.05], l5: 16.75, scroll: [17.25, 18.2], playoff: 18.2,
  jump2: [19.05, 19.6], close3: 19.8,
  cut2: 19.95,
  // 3 · best boundaries
  capIn: [19.9, 20.85], l6: 20.5, lunge: [21.55, 21.95], sign: 21.95, signOut: [24.9, 25.2], l7: 23.3, l8: 26.0, swoon: 26.6, capOut: [27.55, 28.4], close4: 28.38,
  // 4 · speed round
  l9: 28.68, cometT: [28.55, 30.45], sunIn: [30.75, 31.25], doze: 31.75, l10: 31.3, sunOut: [32.95, 33.5], close5: 33.58,
  cut3: 33.6,
  // 5 · the final award
  env: 33.75, drum: [33.75, 37.2], l11: 34.1, l12: 36.35, specs: 36.95, open: [37.0, 37.24], hit: BEAT(66),
  l13: 38.9, l14: 42.2, fly: [42.85, 43.55], ovation: 43.3, close6: 45.35,
  // 6 · lesson
  lesson: BEAT(81), lessonOut: [50.05, 50.25],
  cut4: 50.3,
  // 7 · tonight's deck
  deal: [50.85, 51.15, 51.45], l15: 50.75, close7: 53.8, dealOut: [53.45, 53.8],
  // 8 · see you next season
  shut: [54.05, 54.85], pop: 54.85, out: [55.15, 55.5],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'The best | love stories | are the *kind* ones.', chip: '+1 EVERYTHING' }

// ── the dialogue
const GT = '♊︎ GEMINI · THE BOOTH', STn = '♐︎ SAG · THE BOOTH', CT = '♋︎ AUNTIE CANCER', TT = '♉︎ AUNTIE TAURUS', PT = '♓︎ PISCES', KT = '♑︎ CAPRICORN'
const GC = '#ffd36b', SC = '#ff9a7a', CC = '#b6e0ff', TC = '#9cf08a', PC = LAV, KC = '#c9b8ff'
const LINES1 = [{ t: T.l1, speaker: GT, color: GC, text: "it's the season *finale*, folks!" }]
const LINES2 = [{ t: T.l2, speaker: STn, color: SC, text: 'what a season. *we cried.* mostly Pisces.' }]
const LINES3 = [
  { t: T.l3, speaker: CT, color: CC, text: 'first award: *most tears.*' },
  { t: T.l4, speaker: TT, color: TC, text: 'nominees: Pisces, Pisces, *Pisces.*' },
  { t: T.l5, speaker: PT, color: PC, text: "I'd like to thank… *everyone* 😭" },
]
const LINES4 = [
  { t: T.l6, speaker: CT, color: CC, text: 'come here, *baby!* group hug!' },
  { t: T.l7, speaker: TT, color: TC, text: 'Sunday dinner? *seven sharp?*' },
  { t: T.l8, speaker: KT, color: KC, text: 'no. *but thank you.*' },
]
const LINES5 = [
  { t: T.l9, speaker: GT, color: GC, text: 'speed round! *no speeches!*' },
  { t: T.l10, speaker: STn, color: SC, text: 'asleep. *legend.*' },
]
const LINES6 = [
  { t: T.l11, speaker: CT, color: CC, text: 'where are my *glasses?*' },
  { t: T.l12, speaker: TT, color: TC, text: 'on your *head,* baby.' },
  { t: T.l13, speaker: CT, color: CC, text: 'for showing up. even when it was *awkward.*' },
  { t: T.l14, speaker: STn, color: SC, text: 'and you stayed *kind.* all season.' },
]
const LINES7 = [{ t: T.l15, speaker: GT, color: GC, text: 'new deck every night. *starring you.*' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5, ...LINES6, ...LINES7]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5], [LINES6, T.close6], [LINES7, T.close7]]

// ── headlines: one spec drives the type and its sound
const HEADS = [
  { text: 'Ladies, gentlemen | and *balls of gas…*', top: 150, size: 88, accentSize: 128, at: 0.85, gap: 0.09, late: 3, lateAt: 1.35, lateGap: 0.12, accentColor: GOLD, out: [4.0, 4.2], fit: true },
  { text: 'The Star Talk | *Awards.*', top: 150, size: 112, accentSize: 196, at: T.drop + 0.05, gap: 0.12, late: 1, lateAt: BEAT(8), accentColor: GOLD, out: [10.15, 10.4], fit: true },
  { text: 'Most *Tears.*', top: 170, size: 124, accentSize: 196, at: 10.65, late: 1, lateAt: 10.95, accentColor: CYAN, out: [15.0, 15.2] },
  { text: 'Winner: | *Pisces.*', top: 150, size: 112, accentSize: 184, at: T.win1, late: 1, lateAt: T.win1 + 0.25, accentColor: LAV, out: [18.0, 18.15] },
  { text: 'Wrap it *up.*', top: 170, size: 124, accentSize: 196, at: T.playoff + 0.05, late: 1, lateAt: T.playoff + 0.3, accentColor: RED, out: [19.6, 19.8] },
  { text: 'Best | *Boundaries.*', top: 150, size: 112, accentSize: 150, at: 20.05, late: 1, lateAt: 20.35, accentColor: KC, out: [26.35, 26.55], fit: true },
  { text: 'She said no | so *nicely.*', top: 150, size: 104, accentSize: 164, at: T.swoon, gap: 0.08, late: 1, lateAt: T.swoon + 0.45, accentColor: PINK, out: [28.15, 28.35] },
  { text: 'Best Supporting | *Comet.*', top: 150, size: 96, accentSize: 176, at: 28.55, gap: 0.08, late: 1, lateAt: 28.85, accentColor: COMET_C, out: [30.5, 30.65], fit: true },
  { text: 'Lifetime | *Achievement.*', top: 150, size: 108, accentSize: 150, at: 30.75, late: 1, lateAt: 31.0, accentColor: SUN_C, out: [33.2, 33.4], fit: true },
  { text: 'And the *final* | award…', top: 150, size: 112, accentSize: 168, at: 33.75, gap: 0.12, accentColor: GOLD, out: [36.95, 37.12], fit: true },
  { text: 'goes to… | *you.*', top: 150, size: 112, accentSize: 230, at: T.hit + 0.02, gap: 0.1, late: 1, lateAt: T.hit + 0.32, accentColor: GOLD, out: [42.7, 42.9] },
  { text: 'Standing | *ovation.*', top: 150, size: 112, accentSize: 180, at: 43.0, late: 1, lateAt: T.ovation, accentColor: PINK, out: [45.3, 45.5] },
  { text: 'Tonight’s *deck.*', top: 170, size: 116, accentSize: 176, at: 50.4, late: 1, lateAt: 50.62, accentColor: LAV, out: [53.5, 53.7] },
  { text: 'See you next | *season.*', top: 170, size: 112, accentSize: 190, at: 53.95, gap: 0.09, late: 1, lateAt: 54.4, accentColor: GOLD, out: [55.15, 55.4] },
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
const every = (a, b, step, off = 0) => { const o = []; for (let v = a + off; v < b; v += step) o.push(+v.toFixed(3)); return o }

// ── the camera: keys [t, zoom, focusX, focusY, screenX, screenY, ease into this key]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic }
const IDN = [1, 540, 960, 540, 960]
const CAM = [
  [0, ...IDN],
  [16.2, ...IDN, 'lin'], [17.0, 1.18, 560, 1060, 540, 1040, 'io'], [18.9, 1.2, 560, 1060, 540, 1040, 'lin'], [19.5, ...IDN, 'io'],
  [21.7, ...IDN, 'lin'], [22.25, 1.14, 600, 1010, 540, 1000, 'out'], [24.8, 1.15, 600, 1010, 540, 1000, 'lin'], [25.4, ...IDN, 'io'],
  [36.55, ...IDN, 'lin'], [37.1, 1.75, 420, 1000, 540, 1060, 'io'], [T.hit, 1.76, 420, 1000, 540, 1060, 'lin'], [T.hit + 0.35, ...IDN, 'out'],
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
const FLOOR = 1225, POD = { x: 560, top: 1035 }, STAGE_FRONT = 1300
const CAN_X = 300, TAU_X = 830, AUNT_S = 205
const WIN = { x: 560, y: 948, s: 190 }                  // the winner's spot, behind the podium
const SEAT = { x: 168, y: 1398, s: 124 }                // Pisces' front-row seat
const BOOTH = { g: 768, s: 888, y: 784, size: 116 }
const sY = (s, base = FLOOR) => base - FOOT * s
const arc = (p, a, b, h) => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p) - Math.sin(Math.PI * p) * h, s: lerp(a.s, b.s, p) })

/** where Pisces is: its seat → the podium (the win) → back to its seat */
function pisPos(t) {
  if (t < T.jump1[0]) return { ...SEAT, on: false }
  if (t < T.jump1[1]) return { ...arc(ease.inOutQuad(prog(t, ...T.jump1)), SEAT, WIN, 300), on: true, air: true }
  if (t < T.jump2[0]) return { ...WIN, on: true }
  if (t < T.jump2[1]) return { ...arc(ease.inOutQuad(prog(t, ...T.jump2)), WIN, SEAT, 260), on: true, air: true }
  return { ...SEAT, on: false }
}
/** Capricorn walks up from the right wing and back out */
function capX(t) {
  if (t < T.capIn[0] || t >= T.capOut[1]) return null
  if (t < T.capIn[1]) return lerp(1260, WIN.x, ease.outCubic(prog(t, ...T.capIn)))
  if (t < T.capOut[0]) return WIN.x
  return lerp(WIN.x, 1280, ease.inCubic(prog(t, ...T.capOut)))
}
const auntIn = t => ease.outBack(prog(t, ...T.auntIn))
/** the aunties' lunge for the group hug (cut short by the placard), and the swoon */
const lungeK = t => ease.outCubic(prog(t, ...T.lunge)) * (1 - ease.inOutCubic(prog(t, T.sign, T.sign + 0.35)))
const swoonK = t => ease.outBack(prog(t, T.swoon, T.swoon + 0.5)) * (1 - ease.inOutCubic(prog(t, 28.0, 28.4)))
/** the comet's dash: left → right, through the podium */
function cometP(t) { return prog(t, ...T.cometT) }
function cometPos(t) {
  const p = ease.inOutQuad(cometP(t))
  return { x: lerp(-260, 1360, p), y: lerp(820, 900, p) - Math.sin(Math.PI * p) * 70 }
}
const COMET_GRAB = (() => { let lo = T.cometT[0], hi = T.cometT[1]; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (cometPos(m).x < WIN.x + 120) lo = m; else hi = m } return +lo.toFixed(3) })()
function sunY(t) {
  if (t < T.sunIn[0] || t >= T.sunOut[1]) return null
  if (t < T.sunOut[0]) return lerp(1420, 880, ease.outBack(prog(t, ...T.sunIn)))
  return lerp(880, 1460, ease.inCubic(prog(t, ...T.sunOut)))
}
const curtainOpen = t => ease.inOutCubic(prog(t, ...T.curtain)) * (1 - ease.inOutCubic(prog(t, ...T.shut)))
const ovH = every(T.ovation, 45.4, 0.36)

// ── moods
const LOOK0 = [0, 0]
function auntState(t, side) {          // side −1 = Cancer (left), +1 = Taurus (right)
  const st = { mood: 'happy', look: [side < 0 ? 1 : -1, 0], fog: 0, up: 0, squash: 0, hearts: 0 }
  const toPod = [side < 0 ? 1 : -1, 0]
  if (t < T.l4) { st.mood = 'happy'; return st }
  if (t < T.win1) { st.mood = side < 0 ? 'squint' : 'neutral'; st.look = [side < 0 ? -1 : -1, 1]; return st }    // eyeing Pisces' seat
  if (t < T.jump2[1]) { st.mood = t < T.jump1[1] ? 'wide' : 'sparkle'; st.look = toPod; st.fog = clamp((t - T.jump1[1]) / 0.6) * (1 - prog(t, 18.6, 19.2)); return st }
  if (t < T.capIn[0]) return st
  if (t < T.lunge[0]) { st.mood = 'happy'; st.look = toPod; return st }
  if (t < T.sign) { st.mood = 'heart'; st.look = toPod; return st }
  if (t < T.l7) { st.mood = 'wide'; st.look = toPod; st.squash = -0.06 * bump(t, T.sign, 0.4); return st }
  if (t < T.l8) { st.mood = side > 0 ? 'happy' : 'sparkle'; st.look = toPod; return st }
  if (t < T.swoon) { st.mood = 'wide'; st.look = toPod; return st }
  if (t < 28.45) { st.mood = 'heart'; st.look = [0, -1]; st.squash = 0.05 * swoonK(t); st.hearts = swoonK(t); return st }
  if (t < T.cometT[1]) { st.mood = 'wide'; st.look = [clamp((cometPos(t).x - (side < 0 ? CAN_X : TAU_X)) / 300, -1, 1), -1]; return st }
  if (t < T.cut3) { st.mood = t > T.doze ? 'sleepy' : 'sparkle'; st.look = toPod; return st }
  if (t < T.specs) { st.up = 1; st.mood = side < 0 ? 'squint' : t > T.l12 ? 'eyeroll' : 'neutral'; st.look = side < 0 ? [1, 1] : [-1, 0]; return st }
  if (t < T.hit) { st.up = side < 0 ? 1 - ease.outBack(prog(t, T.specs, T.specs + 0.3)) : 0; st.mood = 'wide'; st.look = side < 0 ? [1, 1] : [-1, 1]; return st }
  if (t < T.hit + 1.1) { st.mood = 'wide'; st.look = LOOK0; return st }
  if (t < T.ovation) { st.mood = 'sparkle'; st.look = LOOK0; st.fog = 0.5; return st }
  if (t < T.lesson) { st.mood = 'heart'; st.look = LOOK0; st.fog = 0.7; return st }
  st.mood = 'happy'; st.look = LOOK0
  return st
}
function boothState(t, who) {          // who 0 = Gemini, 1 = Sag
  const st = { mood: 'happy', look: [who ? -1 : 1, 0], tears: 0 }
  if (t < T.win1) return st
  if (t < T.playoff) { st.mood = 'sparkle'; st.look = [-1, 1]; return st }
  if (t < T.jump2[0]) { st.mood = who ? 'eyeroll' : 'squint'; st.look = [-1, 1]; return st }
  if (t < T.sign) { st.look = [-1, 1]; return st }
  if (t < T.l7) { st.mood = 'wide'; st.look = [-1, 1]; return st }
  if (t < T.cometT[1]) { st.look = [clamp((cometPos(t).x - BOOTH.g) / 300, -1, 1), 1]; st.mood = t > 28.4 ? 'wide' : 'happy'; return st }
  if (t < T.cut3) { st.mood = t > T.doze + 0.3 ? 'squint' : 'happy'; st.look = [-1, 1]; return st }
  if (t < T.hit) { st.mood = 'neutral'; st.look = [-1, 1]; return st }
  if (t < T.hit + 1.1) { st.mood = 'wide'; st.look = LOOK0; return st }
  st.mood = t < T.lesson ? 'sparkle' : 'happy'; st.look = LOOK0; st.tears = t < T.lesson && t > T.l14 ? 1 : 0
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [1, -1], tears: 1 }
  if (t < T.l4) { st.tears = t > T.drop ? 2 : 1; return st }
  if (t < T.win1) { st.tears = 2; st.mood = 'happy'; return st }
  if (t < T.jump1[1]) { st.mood = 'wide'; st.tears = 1; return st }
  if (t < T.jump2[1]) { st.tears = 3; st.look = LOOK0; return st }
  if (t < T.cut2) { st.tears = 2; return st }
  if (t < T.swoon) { st.tears = 2; st.look = [1, -1]; return st }
  if (t < T.cut3) { st.tears = 3; st.mood = t > T.cometT[0] && t < T.cometT[1] ? 'heart' : 'sparkle'; return st }
  if (t < T.hit) { st.tears = 2; st.mood = 'happy'; return st }
  if (t < T.hit + 0.9) { st.tears = 1; st.mood = 'wide'; st.look = LOOK0; return st }
  st.tears = 3; st.look = LOOK0
  return st
}
function capState(t) {
  const st = { mood: 'neutral', look: [-1, 0], squash: 0 }
  if (t < T.capIn[1]) return st
  if (t < T.lunge[0]) { st.look = LOOK0; return st }
  if (t < T.sign) { st.mood = 'wide'; st.look = [-1, 0]; return st }
  if (t < T.l7) { st.mood = 'neutral'; st.look = LOOK0; return st }
  if (t < T.l8) { st.mood = 'squint'; st.look = [1, 0]; return st }
  if (t < T.swoon) { st.mood = 'happy'; st.look = LOOK0; return st }
  if (t < T.capOut[0]) { st.mood = 'wink'; st.look = LOOK0; st.squash = 0.1 * bump(t, 27.0, 0.45); return st }
  st.look = [1, 0]
  return st
}

// talk hops
const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })
const C_HOPS = [...hopsOf(CT), T.auntIn[1], T.lunge[0], T.swoon, T.hit + 0.5, T.pop, ...ovH]
const T_HOPS = [...hopsOf(TT), T.auntIn[1] + 0.1, T.lunge[0] + 0.05, T.swoon + 0.1, T.hit + 0.55, T.pop + 0.08, ...ovH.map(v => v + 0.12)]
const G_HOPS = [...hopsOf(GT), T.drop + 0.1, T.cred[0], T.win1, T.hit + 0.45, T.pop + 0.05, ...ovH.map(v => v + 0.06)]
const S_HOPS = [...hopsOf(STn), T.drop + 0.2, T.cred[0] + 0.1, T.win1 + 0.1, T.hit + 0.6, T.pop + 0.1, ...ovH.map(v => v + 0.18)]
const P_HOPS = [...hopsOf(PT), T.drop + 0.15, T.cred[1], T.win1, ...every(T.playoff, T.jump2[0], 0.28), T.jump2[1], T.cometT[0] + 1, T.hit + 0.4, T.pop + 0.12, ...ovH.map(v => v + 0.09)]
const K_HOPS = [...hopsOf(KT), ...every(T.capIn[0] + 0.05, T.capIn[1], 0.3), ...every(T.capOut[0], T.capOut[1], 0.3)]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 44px Inter", "italic 500 190px 'EB Garamond'", "italic 600 76px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 38px 'Space Mono'", "700 28px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const faces = await Promise.all(['card-profile-1.png', 'card-profile-3.png', 'card-profile-2.png'].map(loadImg))
  const FACES = faces.map(im => bake(im, 420)), FACE_BODY = 1262 / 1496

  // a chunky silhouette star for the audience (a low-res sprite, drawn without smoothing)
  const SIL = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 26; const g = c.getContext('2d')
    const path = () => { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 5.6 : 12; g.lineTo(13 + Math.cos(a) * r, 14 + Math.sin(a) * r) } g.closePath() }
    g.fillStyle = '#3d2a6e'; path(); g.fill()
    g.save(); g.translate(0, 1.2); g.fillStyle = '#140c2c'; path(); g.fill(); g.restore()
    const d = g.getImageData(0, 0, 26, 26)
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] > 110 ? 255 : 0
    g.putImageData(d, 0, 0)
    return c
  })()

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1480, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { ...BOX, lines, open: lines[0].t - 0.2, close }))
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.72 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const stroked = (txt, X, Y, size, col, lw = 10, weight = 700) => { x.font = `${weight} ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  function star(cx, cy, size, t, opts, overlay) {
    drawStarChar(x, cx, cy, size, t, opts)
    if (overlay) { const F = starFrame(cx, cy, size, t, opts); inSprite(x, F, () => overlay(F)) }
  }
  function nameTag(cx, cy, text, col, k = 1, sub = null) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 26px ${MONO}`; const tw = x.measureText(text).width + 36
    x.fillStyle = INK; x.fillRect(-tw / 2 - 6, -26, tw + 12, 52); x.fillStyle = 'rgba(20,12,44,0.95)'; x.fillRect(-tw / 2, -20, tw, 40)
    x.fillStyle = col; x.fillRect(-tw / 2, -20, tw, 4); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    if (sub) { x.font = `italic 500 36px 'EB Garamond', serif`; x.lineWidth = 7; x.strokeStyle = INK; x.strokeText(sub, 0, 48); x.fillStyle = BONE; x.fillText(sub, 0, 48) }
    x.restore()
  }
  function floatHearts(t, cx, cy, k, seed = 3) {
    if (k <= 0) return
    const R = rng(seed)
    for (let i = 0; i < 5; i++) {
      const ph = (t * 0.9 + i / 5) % 1, hx = cx + (R() * 2 - 1) * 60 + Math.sin(ph * 6 + i) * 10, hy = cy - ph * 120
      x.globalAlpha = Math.sin(Math.PI * ph) * k
      const c = 6; x.fillStyle = ROSE
      for (const [i2, j2] of [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]]) x.fillRect(hx + (i2 - 2) * c, hy + (j2 - 2) * c, c, c)
    }
    x.globalAlpha = 1
  }

  // ═══════════════════════ the stage (world) ═══════════════════════
  function backdrop(t) {
    // the neon star behind the podium (it flickers on with the curtain, pulses on the hits)
    const on = clamp(prog(t, 4.7, 5.0)) * (Math.sin(t * 40) > -0.6 || t > 5.3 ? 1 : 0.4)
    if (on > 0) {
      const pulse = 1 + 0.25 * Math.max(bump(t, T.win1, 0.6), bump(t, T.hit, 0.9), bump(t, T.ovation, 0.7))
      const cx = POD.x, cy = 720, R = 210
      const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * 0.45 : R; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]) }
      x.save(); x.globalAlpha = on; x.lineJoin = 'round'
      x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 20, cx, cy, R * 1.5); g.addColorStop(0, `rgba(255,143,177,${0.18 * pulse})`); g.addColorStop(1, 'rgba(255,143,177,0)')
      x.fillStyle = g; x.fillRect(cx - R * 1.6, cy - R * 1.6, R * 3.2, R * 3.2)
      x.globalCompositeOperation = 'source-over'
      const trace = (lw, col) => { x.strokeStyle = col; x.lineWidth = lw; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath(); x.stroke() }
      trace(26, rgba(ROSE, 0.35 * pulse)); trace(12, ROSE); trace(4, '#ffe0ea')
      x.restore()
    }
    // the stage floor: plum boards, a gold lip, footlights
    for (let y = 1150, i = 0; y < STAGE_FRONT; y += 15, i++) { x.fillStyle = i % 2 ? '#3a2052' : '#44265e'; x.fillRect(-200, y, W + 400, 15) }
    x.fillStyle = 'rgba(255,214,140,0.10)'; x.fillRect(-200, 1150, W + 400, 6)
    x.fillStyle = INK; x.fillRect(-200, STAGE_FRONT - 4, W + 400, 26); x.fillStyle = GOLD; x.fillRect(-200, STAGE_FRONT, W + 400, 8)
    for (let i = 0; i < 9; i++) { const fx = 60 + i * 120, fl = 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7); x.fillStyle = INK; x.fillRect(fx - 16, STAGE_FRONT + 6, 32, 16); x.fillStyle = `rgba(255,226,150,${fl})`; x.fillRect(fx - 10, STAGE_FRONT + 8, 20, 8) }
  }
  function balcony(t) {
    // ♊ Gemini + ♐ Sag in headsets, one shared mic, in their box
    const L = 690, R = 980, top = 842
    const speaking = sp => ALL_LINES.some(l => l.speaker === sp && t >= l.t && t < l.t + 1.6)
    const gs = boothState(t, 0), ss = boothState(t, 1)
    star(BOOTH.g, BOOTH.y, BOOTH.size, t, { color: GEM.color, mood: gs.mood, look: gs.look, hops: G_HOPS, seed: 4 }, () => { headsetCells(x, GOLD); tearsCells(x, t, gs.tears) })
    star(BOOTH.s, BOOTH.y, BOOTH.size, t, { color: SAG.color, mood: ss.mood, look: ss.look, hops: S_HOPS, seed: 7 }, () => { headsetCells(x, ROSE); tearsCells(x, t, ss.tears) })
    const micAng = speaking(STn) ? 0.3 : speaking(GT) ? -0.3 : 0.05 * Math.sin(t)
    drawMic(x, (BOOTH.g + BOOTH.s) / 2, top + 4, micAng, 0.62)
    // the box front
    x.fillStyle = INK; x.fillRect(L - 8, top - 8, R - L + 16, 94)
    x.fillStyle = '#7a1f3d'; x.fillRect(L, top, R - L, 78)
    x.fillStyle = '#9a2a4e'; for (let i = L + 10; i < R - 10; i += 40) x.fillRect(i, top + 18, 20, 44)
    x.fillStyle = GOLD; x.fillRect(L - 8, top - 8, R - L + 16, 8); x.fillRect(L, top + 70, R - L, 6)
    x.fillStyle = INK; x.fillRect(L + 52, top + 22, R - L - 104, 36); x.fillStyle = '#1e1238'; x.fillRect(L + 56, top + 26, R - L - 112, 28)
    x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE BOOTH', (L + R) / 2, top + 41)
    // the play-off button gag: Sag slams a red button
    const pb = Math.max(bump(t, T.playoff - 0.1, 0.35))
    if (inR(t, T.playoff - 0.6, T.jump2[0] + 0.3)) {
      const bx = R - 34, by = top - 18 + 8 * pb
      x.fillStyle = INK; x.fillRect(bx - 22, top - 30, 44, 26); x.fillStyle = RED; x.fillRect(bx - 16, by - 6, 32, 14); x.fillStyle = '#ff8a8a'; x.fillRect(bx - 12, by - 6, 10, 4)
    }
  }
  function aunties(t) {
    if (t < T.auntIn[0]) return
    const k = auntIn(t), lu = lungeK(t), sw = swoonK(t)
    const cs = auntState(t, -1), ts = auntState(t, 1)
    const cx = lerp(-260, CAN_X, k) + 120 * lu - 30 * sw, tx = lerp(1340, TAU_X, k) - 120 * lu + 30 * sw
    const tilt = 0.18 * sw
    x.save(); x.translate(cx, FLOOR); x.rotate(-tilt); x.translate(-cx, -FLOOR)
    star(cx, sY(AUNT_S), AUNT_S, t, { color: CAN.color, mood: cs.mood, look: cs.look, hops: C_HOPS, seed: 2, squash: cs.squash }, () => glassesCells(x, { up: cs.up, fog: cs.fog, frame: '#7a1f3d', chain: true, t }))
    x.restore()
    floatHearts(t, cx, sY(AUNT_S) - 110, cs.hearts, 3)
    x.save(); x.translate(tx, FLOOR); x.rotate(tilt); x.translate(-tx, -FLOOR)
    star(tx, sY(AUNT_S), AUNT_S, t, { color: TAU_.color, mood: ts.mood, look: ts.look, hops: T_HOPS, seed: 9, squash: ts.squash }, () => glassesCells(x, { up: ts.up, fog: ts.fog, frame: '#2f6b45' }))
    x.restore()
    floatHearts(t, tx, sY(AUNT_S) - 110, ts.hearts, 8)
  }
  function winner(t) {
    // Capricorn (behind the podium)
    const kx = capX(t)
    if (kx !== null) {
      const ks = capState(t)
      star(kx, WIN.y, WIN.s, t, { color: CAP.color, mood: ks.mood, look: ks.look, hops: K_HOPS, seed: 5, squash: ks.squash }, () => tieCells(x))
      // HANDSHAKE ONLY
      const pk = pop01(t, T.sign, 0.3, 2.4) * outK(t, T.signOut)
      if (t >= T.sign && pk > 0) drawPlacard(x, kx - 210, 760, ['HANDSHAKE', 'ONLY.'], { k: pk, rot: -0.08 + 0.03 * Math.sin(t * 3), w: 300 })
    }
    // Pisces, on stage for its win
    const pp = pisPos(t)
    if (pp.on && !pp.air) drawPisces(t, pp)
  }
  function drawPisces(t, pp) {
    const ps = pisState(t)
    star(pp.x, pp.y, pp.s, t, { color: PIS.color, mood: ps.mood, look: ps.look, hops: P_HOPS, seed: 3 }, () => tearsCells(x, t, ps.tears))
  }
  function sun(t) {
    const y = sunY(t)
    if (y === null) return
    const s = 320
    const g = x.createRadialGradient(WIN.x, y, 40, WIN.x, y, 360); g.addColorStop(0, 'rgba(255,200,90,0.35)'); g.addColorStop(1, 'rgba(255,200,90,0)')
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(WIN.x - 380, y - 380, 760, 760); x.restore()
    star(WIN.x, y, s, t, { color: SUN_C, mood: t > T.doze ? 'sleepy' : 'happy', look: [0, 0], seed: 11, bob: t > T.doze ? 3 : undefined, glow: 1.4, squash: t > T.doze ? 0.03 * Math.sin(t * 2.4) : 0 })
    if (t > T.sunIn[1] - 0.1) nameTag(WIN.x, y - 230, 'THE SUN · 4.6 BILLION YRS', SUN_C, pop01(t, T.sunIn[1] - 0.1, 0.3) * outK(t, [T.sunOut[0], T.sunOut[0] + 0.2]))
  }
  function podium(t) {
    drawPodium(x, POD.x, POD.top, 200, FLOOR - POD.top)
    // the lectern mic swivels toward whoever's at it
    const pp = pisPos(t)
    const ang = pp.on && !pp.air ? -0.35 : capX(t) !== null ? -0.3 : -0.15
    drawMic(x, POD.x + 70, POD.top - 4, ang, 0.55)
  }
  /** every trophy: where it is right now */
  function trophies(t) {
    // Pisces' (rides along when it bounces back to its seat)
    if (t >= T.win1 && t < T.cut3) {
      const pp = pisPos(t), k = pop01(t, T.win1 + 0.25, 0.35, 2.2)
      const tx = pp.on ? pp.x + pp.s * 0.62 : SEAT.x + 92, ty = pp.on ? pp.y + 24 : SEAT.y + 6, c = pp.on ? 5 : 3.5
      drawTrophy(x, tx, ty, c, t, { shine: bump(t, T.win1 + 0.25, 0.8) })
      sparkleRing(t, tx, ty - 30, T.win1 + 0.3, 10, 110, 1, [GOLD, '#fff2a8', BONE, LAV], 0.7, 24)
      void k
    }
    // Capricorn's
    const kx = capX(t)
    if (kx !== null && t >= T.capIn[1]) drawTrophy(x, kx + 128, WIN.y + 30, 5 * pop01(t, T.capIn[1], 0.3) / 1, t)
    // the comet's (on the podium, then gone with the comet)
    if (t >= T.cometT[0] - 0.1 && t < T.cut3) {
      if (t < COMET_GRAB) drawTrophy(x, POD.x, POD.top - 52, 5 * pop01(t, T.cometT[0] - 0.1, 0.3), t)
      else if (t < T.cometT[1]) { const C = cometPos(t); drawTrophy(x, C.x - 20, C.y + 80, 4.4, t, { rot: -0.3 }) }
    }
    // the Sun's
    const y = sunY(t)
    if (y !== null) drawTrophy(x, WIN.x + 205, y + 40, 5.5, t, { rot: t > T.doze ? 0.22 + 0.05 * Math.sin(t * 2.4) : 0 })
    // yours: on the podium, waiting — until it flies to you
    if (t >= T.hit && t < T.fly[0]) { drawTrophy(x, POD.x, POD.top - 64, 6.5 * pop01(t, T.hit + 0.1, 0.35, 2.2), t, { shine: 1 }); sparkleRing(t, POD.x, POD.top - 90, T.hit + 0.15, 12, 150, 2) }
  }
  function scrollFx(t) {
    if (t < T.scroll[0] || t >= T.jump2[0] + 0.1) return
    const len = 470 * ease.outBack(prog(t, ...T.scroll)) * (1 - ease.inCubic(prog(t, T.jump2[0] - 0.25, T.jump2[0] + 0.1)))
    drawScroll(x, WIN.x - 70, WIN.y + 40, 150, len, t)
  }
  function comet(t) {
    if (t < T.cometT[0] || t >= T.cometT[1]) return
    const C = cometPos(t)
    // the sparkly tail
    const R = rng(17)
    for (let i = 0; i < 26; i++) {
      const u = i / 26, tx = C.x - 60 - u * 520 + Math.sin(t * 9 + i) * 8, ty = C.y + u * 30 + (R() - 0.5) * 70 * u
      x.globalAlpha = (1 - u) * 0.9; drawPixelStar(x, tx, ty, 30 * (1 - u) + 8, i % 2 ? 1 : 2, i % 3 ? COMET_C : '#ffffff')
    }
    x.globalAlpha = 1
    star(C.x, C.y, 150, t, { color: COMET_C, mood: 'happy', look: [1, 0], seed: 13, squash: -0.12 }, () => shadesCells(x, (t * 2) % 1))
    nameTag(C.x - 10, C.y - 120, 'COMET', COMET_C, 1, '(just passing through)')
  }
  function envelope(t) {
    if (t < T.env || t >= T.hit + 1.5) return
    const k = pop01(t, T.env, 0.35, 2) * outK(t, [T.hit + 1.2, T.hit + 1.5])
    const sh = inR(t, T.drum[0], T.drum[1]) ? Math.sin(t * 40) * 2 : 0
    drawEnvelope(x, 420 + sh, 1010, 0.55 * k, { open: ease.outCubic(prog(t, ...T.open)), rot: -0.06, card: 'YOU.' })
  }
  function audience(t) {
    // two rows of silhouette stars (backs to us), Pisces in the front row
    const R = rng(23)
    x.save(); x.imageSmoothingEnabled = false
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 9; i++) {
        const s = row ? 150 : 120, ax = (row ? 30 : 90) + i * 128 + (R() - 0.5) * 30, ay = row ? 1480 : 1395
        if (!row && Math.abs(ax - SEAT.x) < 80) continue
        const hop = ovH.reduce((m, v) => Math.max(m, bump(t, v + R() * 0.15, 0.3)), 0) + 0.7 * bump(t, T.hit + 0.2 + R() * 0.2, 0.35) + 0.5 * bump(t, T.win1 + R() * 0.2, 0.35)
        x.drawImage(SIL, Math.round(ax - s / 2), Math.round(ay - s / 2 - hop * 30), s, s)
      }
    }
    x.restore()
    const pp = pisPos(t)
    if (!pp.on) {
      drawPisces(t, pp)
      // the tissue box on the armrest
      const bx = SEAT.x + 96, by = SEAT.y + 40
      x.fillStyle = INK; x.fillRect(bx - 30, by - 22, 60, 40); x.fillStyle = '#8fd8ff'; x.fillRect(bx - 26, by - 18, 52, 32); x.fillStyle = '#ffffff'; x.fillRect(bx - 8, by - 34, 16, 16)
    }
  }
  /** the spotlights: two cones from the rigging; at the hit they swing round onto the camera */
  function spotTarget(t) {
    const pp = pisPos(t)
    if (t < T.auntIn[0]) return [{ x: POD.x - 220 + 220 * Math.sin(t * 1.1), y: 1180 }, { x: POD.x + 220 * Math.sin(t * 1.1 + 2), y: 1180 }]
    if (t < T.win1) return [{ x: CAN_X, y: 1160 }, { x: TAU_X, y: 1160 }]
    if (t < T.cut2) return [{ x: pp.x, y: pp.y + 150 }, { x: pp.x, y: pp.y + 150 }]
    if (t < 28.45) { const kx = capX(t) ?? 1300; return [{ x: kx, y: 1150 }, { x: kx, y: 1150 }] }
    if (t < T.cometT[1]) { const C = cometPos(t); return [{ x: C.x, y: C.y + 200 }, { x: C.x, y: C.y + 200 }] }
    if (t < T.cut3) return [{ x: WIN.x, y: 1150 }, { x: WIN.x, y: 1150 }]
    return [{ x: 420, y: 1120 }, { x: 420, y: 1120 }]
  }
  function spotlights(t) {
    if (t < T.drop || t >= T.shut[1]) return
    const k = clamp(prog(t, T.drop, T.drop + 0.4)) * (1 - prog(t, T.hit, T.hit + 0.3)) * (1 - prog(t, T.shut[0], T.shut[1]))
    if (k <= 0) return
    const tg = spotTarget(t)
    const src = [{ x: 40, y: 80 }, { x: 1040, y: 80 }]
    x.save(); x.globalCompositeOperation = 'lighter'
    src.forEach((S, i) => {
      const P = tg[i], ang = Math.atan2(P.y - S.y, P.x - S.x), len = Math.hypot(P.x - S.x, P.y - S.y) + 60, sp = 0.09
      const g = x.createLinearGradient(S.x, S.y, P.x, P.y); g.addColorStop(0, `rgba(255,240,200,${0.32 * k})`); g.addColorStop(1, `rgba(255,240,200,${0.1 * k})`)
      x.fillStyle = g; x.beginPath(); x.moveTo(S.x, S.y); x.lineTo(S.x + Math.cos(ang - sp) * len, S.y + Math.sin(ang - sp) * len); x.lineTo(S.x + Math.cos(ang + sp) * len, S.y + Math.sin(ang + sp) * len); x.closePath(); x.fill()
      // the pool
      x.save(); x.translate(P.x, P.y); x.scale(1, 0.28)
      const pg = x.createRadialGradient(0, 0, 0, 0, 0, 170); pg.addColorStop(0, `rgba(255,240,200,${0.35 * k})`); pg.addColorStop(1, 'rgba(255,240,200,0)')
      x.fillStyle = pg; x.fillRect(-180, -180, 360, 360); x.restore()
    })
    x.restore()
  }

  // ═══════════════════════ screen space ═══════════════════════
  function curtains(t) {
    const o = curtainOpen(t)
    const half = lerp(540, 108, o)
    const drape = (x0, x1, side) => {
      const w = x1 - x0
      if (w <= 0) return
      for (let px = 0; px < w; px += 12) {
        const u = side < 0 ? px / Math.max(1, w) : 1 - px / Math.max(1, w), fold = Math.sin(px * 0.075 + side * t * 0.6 * (1 - o) * 0 + (side < 0 ? 0 : 1.3))
        const sh = 0.5 + 0.5 * fold
        x.fillStyle = `rgb(${Math.round(120 + 90 * sh)},${Math.round(18 + 22 * sh)},${Math.round(44 + 30 * sh)})`
        // the drape gathers (and lifts a bit) toward its tie-back when open
        const lift = o * 60 * (1 - u)
        x.fillRect(Math.round(x0 + px), 0, 12, STAGE_FRONT - lift)
      }
      x.fillStyle = INK; x.fillRect(side < 0 ? x1 - 6 : x0, 0, 6, STAGE_FRONT)
      // gold fringe along the bottom
      for (let px = 0; px < w; px += 18) { const u = side < 0 ? px / Math.max(1, w) : 1 - px / Math.max(1, w), lift = o * 60 * (1 - u); x.fillStyle = GOLD; x.fillRect(Math.round(x0 + px), STAGE_FRONT - lift - 18, 12, 18) }
    }
    drape(0, half, -1); drape(W - half, W, 1)
    // tie-back tassels when open
    if (o > 0.6) for (const [tx, d] of [[half - 14, -1], [W - half + 14, 1]]) { x.fillStyle = INK; x.fillRect(tx - 14, 900, 28, 50); x.fillStyle = GOLD; x.fillRect(tx - 10, 904, 20, 42); void d }
    // the valance with marquee bulbs
    x.fillStyle = INK; x.fillRect(0, 0, W, 118)
    x.fillStyle = '#8e1f40'; x.fillRect(0, 0, W, 104)
    for (let i = 0; i < 18; i++) { x.fillStyle = '#6e1532'; x.fillRect(i * 60 + 6, 104, 48, 10) }
    x.fillStyle = GOLD; x.fillRect(0, 96, W, 6)
    for (let i = 0; i < 22; i++) {
      const bx = 24 + i * 49, on = (Math.floor(t * 4) + i) % 3 !== 0 || t < T.spot
      x.fillStyle = INK; x.fillRect(bx - 9, 66, 18, 18); x.fillStyle = on && t >= T.spot ? '#fff1b0' : '#6e4a3a'; x.fillRect(bx - 6, 69, 12, 12)
    }
  }
  function hook(t) {
    if (t >= T.hookOut[1]) return
    // the spotlight pool on the closed curtain, and the trophy rising into it
    const sk = t < T.spot ? 0 : 1 - prog(t, ...T.hookOut)
    if (sk <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, 1020, 0, 540, 1020, 380); g.addColorStop(0, `rgba(255,236,190,${0.42 * sk})`); g.addColorStop(0.7, `rgba(255,236,190,${0.16 * sk})`); g.addColorStop(1, 'rgba(255,236,190,0)')
    x.fillStyle = g; x.fillRect(140, 620, 800, 800)
    const cg = x.createLinearGradient(540, 100, 540, 1020); cg.addColorStop(0, 'rgba(255,240,200,0.02)'); cg.addColorStop(1, `rgba(255,240,200,${0.16 * sk})`)
    x.fillStyle = cg; x.beginPath(); x.moveTo(500, 100); x.lineTo(580, 100); x.lineTo(900, 1300); x.lineTo(180, 1300); x.closePath(); x.fill()
    x.restore()
    const up = ease.outBack(prog(t, ...T.trophyUp)), dy = lerp(500, 0, up) + 700 * ease.inCubic(prog(t, ...T.hookOut))
    // a velvet plinth
    x.fillStyle = INK; x.fillRect(420, 1160 + dy, 240, 160); x.fillStyle = '#2a1b46'; x.fillRect(426, 1166 + dy, 228, 148); x.fillStyle = GOLD; x.fillRect(426, 1166 + dy, 228, 8)
    drawTrophy(x, 540, 1040 + dy, 10, t, { shine: bump(t, 1.5, 1.0) })
    sparkleRing(t, 540, 960, 1.45, 12, 220, 0.3)
  }
  const CREDS = [
    { t: T.cred[0], text: 'HOSTS: THE BOOTH ♊︎ ♐︎', col: GC, wx: (BOOTH.g + BOOTH.s) / 2, wy: 650 },
    { t: T.cred[1], text: 'FRONT ROW: ♓︎ PISCES', col: LAV, sub: '(already crying)', wx: 330, wy: 1250 },
  ]
  function credits(t, C) {
    for (const c of CREDS) {
      if (t < c.t || t > 10.35) continue
      const S = toS(C, c.wx, c.wy)
      nameTag(Math.min(Math.max(S.x, 260), 820), S.y, c.text, c.col, pop01(t, c.t, 0.32, 2.2) * outK(t, [10.1, 10.35]), c.sub)
    }
  }
  function playoffNotes(t) {
    // the orchestra plays her off: notes stream across the stage
    if (!inR(t, T.playoff, T.jump2[1] + 0.3)) return
    const a = clamp((t - T.playoff) / 0.3) * (1 - prog(t, T.jump2[1], T.jump2[1] + 0.3))
    const R = rng(9)
    x.save(); x.globalAlpha = a
    for (let i = 0; i < 10; i++) {
      const sp = 380 + R() * 200, ph = ((t - T.playoff) * sp + R() * 1200) % 1400, nx = 1180 - ph, ny = 1060 + R() * 220 + Math.sin(t * 6 + i) * 18
      stroked(i % 2 ? '♪' : '♫', nx, ny, 64, i % 3 ? GOLD : PINK, 10)
    }
    x.restore()
  }
  /** the spotlight lands on YOU: a warm bloom across the lens */
  function bloom(t) {
    if (t < T.hit || t >= T.lessonOut[1]) return
    const k = ease.outCubic(prog(t, T.hit, T.hit + 0.35)), fade = lerp(1, 0.45, prog(t, T.hit + 0.4, T.hit + 2.2))
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, 980, 0, 540, 980, 1000); g.addColorStop(0, `rgba(255,236,190,${0.5 * k * fade})`); g.addColorStop(0.5, `rgba(255,220,170,${0.2 * k * fade})`); g.addColorStop(1, 'rgba(255,220,170,0)')
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    // the beams arrive from both corners, straight at us
    for (const sx of [40, 1040]) { const cg = x.createLinearGradient(sx, 80, 540, 1100); cg.addColorStop(0, `rgba(255,240,200,${0.3 * k * fade})`); cg.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = cg; x.beginPath(); x.moveTo(sx, 80); x.lineTo(540 - 520, 1500); x.lineTo(540 + 520, 1500); x.closePath(); x.fill() }
    x.restore()
    if (t < T.hit + 0.2) { x.fillStyle = `rgba(255,250,235,${0.7 * (1 - (t - T.hit) / 0.2)})`; x.fillRect(0, 0, W, H) }
  }
  function flyingTrophy(t) {
    if (t < T.fly[0] || t >= T.lesson + 0.4) return
    const p = ease.outBack(prog(t, ...T.fly), 1.4), a = 1 - prog(t, T.lesson, T.lesson + 0.4)
    const cx = lerp(POD.x, 540, p), cy = lerp(POD.top - 64, 930, p), c = lerp(6.5, 24, p), rot = Math.sin(Math.PI * clamp(p)) * 0.6 * (1 - p) + 0.03 * Math.sin(t * 2)
    x.save(); x.globalAlpha = a
    drawTrophy(x, cx, cy, c, t, { shine: 1, rot })
    if (p > 0.6) {
      const k = pop01(t, T.fly[1] - 0.1, 0.3, 2)
      x.save(); x.translate(540, cy + c * 9 + 70); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-300, -40, 600, 80); x.fillStyle = '#fbf3e6'; x.fillRect(-292, -32, 584, 64); x.fillStyle = GOLD; x.fillRect(-292, -32, 584, 6)
      x.font = `700 36px ${MONO}`; x.fillStyle = '#7a1f3d'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOU · FOR SHOWING UP', 0, 4)
      x.restore()
    }
    x.restore()
    sparkleRing(t, 540, 930, T.fly[1] - 0.05, 14, 330, 0.5, [GOLD, BONE, PINK, LAV, MINT], 0.9, 34)
  }
  function deck(t) {
    if (t < T.deal[0] - 0.1 || t >= T.dealOut[1]) return
    const o = ease.inCubic(prog(t, ...T.dealOut))
    x.fillStyle = `rgba(6,4,18,${0.5 * clamp((t - T.deal[0] + 0.1) / 0.3) * (1 - o)})`; x.fillRect(0, 0, W, H)
    const DK = [{ x: 300, y: 940, r: -0.13 }, { x: 540, y: 905, r: 0 }, { x: 780, y: 940, r: 0.13 }]
    DK.forEach((D, i) => {
      const p = prog(t, T.deal[i], T.deal[i] + 0.4)
      if (p <= 0 || !FACES[i]) return
      const e = easeOutBack(p, 1.6), cx = lerp(540, D.x, e), cy = lerp(-300, D.y, e) + o * 1500, rot = lerp(2.4 + i, D.r, ease.outCubic(p))
      const wB = 200, w = wB / FACE_BODY, h = w * FACES[i].height / FACES[i].width
      x.save(); x.translate(cx, cy); x.rotate(rot - o * 0.3); x.drawImage(FACES[i], -w / 2, -h / 2, w, h); x.restore()
      sparkleRing(t, D.x, D.y, T.deal[i] + 0.3, 8, 160, i, [GOLD, BONE, LAV, MINT], 0.55, 22)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (1 + (C.z - 1) * 0.12), dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1) })
      const outP = popOut(t, T.out)
      withCam(C, () => {
        backdrop(t)
        balcony(t)
        sun(t)
        aunties(t)
        winner(t)
        podium(t)
        trophies(t)
        scrollFx(t)
        envelope(t)
        comet(t)
        playoffNotes(t)
        spotlights(t)
        audience(t)
        const pp = pisPos(t)
        if (pp.air) drawPisces(t, pp)
      })
      curtains(t)
      hook(t)
      credits(t, C)
      bloom(t)
      flyingTrophy(t)
      confetti(x, t, T.ovation, { x0: 120, y0: 1500, n: 70, spread: 0.6, seed: 2 })
      confetti(x, t, T.ovation + 0.12, { x0: 960, y0: 1500, n: 70, spread: 0.6, seed: 5 })
      confetti(x, t, T.pop, { x0: 540, y0: 1400, n: 60, spread: 0.8, seed: 8, life: 1.2 })
      deck(t)
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
// 10.5 (→ most tears), 19.95 (→ best boundaries), 33.6 (→ the final award), 50.3 (→ tonight's deck). End card flips at 55.6.
export const CUTS = [4.45, T.cut1, 15.2, T.cut2, 28.45, T.cut3, 42.85, T.cut4, 53.85]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
export const _T = T, _LESSON = LESSON, _HEADS = HEADS
void lessonTimes; void lineTimes

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into Bb major);
// brass / chip / strings / snare are written straight in Bb.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { Bb2: 116.54, F3: 174.61, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.0, A4: 440.0, Bb4: 466.16, C5: 523.25, D5: 587.33, F5: 698.46 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const fanfare = (t, notes, len = 0.5, gain = 0.045) => [['brass', r3(t), notes, len, { gain, bright: 1.3, ...FXB }], ['tom', r3(t), 72, { gain: 0.3, decay: 0.6, rev: 0.4, bus: 'fx' }], ['crash', r3(t), { gain: 0.04, len: 2 }]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const sob = t0 => [0, 0.16, 0.3].map((d, i) => ['chip', r3(t0 + d), 760 - i * 60, 0.13, { duty: 0.5, slide: -6, vib: 0.06, gain: 0.014, decay: 0.1, sustain: 0.5, rev: 0.25, dly: 0, bus: 'fx' }])
const applause = (t0, dur, dens = 14, gain = 0.035, seed = 1) => { const R = rng(seed), o = []; for (let i = 0; i < dur * dens; i++) { const tt = t0 + R() * dur, fade = 1 - Math.max(0, (tt - t0) / dur - 0.6) / 0.4; o.push(['clap', r3(tt), { gain: gain * fade * (0.5 + 0.5 * R()), pan: R() * 1.4 - 0.7, rev: 0.4, tone: 900 + R() * 600, bus: 'fx' }]) } return o }
const drumroll = (t0, t1) => { const o = []; for (let tt = t0; tt < t1; tt += 0.05) o.push(['snare', r3(tt), { gain: 0.05 + 0.12 * prog(tt, t0, t1), tone: 200, snappy: 0.9, decay: 0.07, rev: 0.25, bus: 'fx' }]); return o }
const gasp = t0 => [['chip', r3(t0), 1400, 0.25, { wave: 'noise', slide: 10, gain: 0.03, decay: 0.2, sustain: 0.4, rev: 0.3, dly: 0, bus: 'fx' }]]
// the play-off: a jaunty brass vamp that won't stop
const playoff = []
for (let i = 0; i < 6; i++) { const tt = T.playoff + i * 0.28; playoff.push(['brass', r3(tt), i % 2 ? [N.D4, N.F4, N.Bb4] : [N.C4, N.Eb4, N.A4], 0.22, { gain: 0.03, bright: 1.2, ...FXB }]) }
export const CUES = [
  // 0 · the closed curtain: DUNNN, the trophy rises
  ...fanfare(T.spot, [N.Bb2, N.F3, N.Bb3, N.D4], 1.3, 0.05), ['boom', T.spot, 0.34],
  ['strings', T.spot, r3(T.spot + 2.6), [N.Bb3, N.D4, N.F4, N.Bb4], { gain: 0.012, attack: 0.2, release: 0.8, rev: 0.5, bus: 'fx' }],
  ['riser', 0.65, 1.5, 0.04], ['glitter', 1.45, 2.1], ['bell', 1.5, 1174.66, 0.03, 1.4, 0],
  ...headCues(HEADS[0]),
  ['riser', 3.4, 4.47, 0.05], ['whoosh', 4.1, 0.5, 0.07],
  // 1 · the curtain parts (the big orchestral hit) + credits
  ...fanfare(T.drop, [N.Bb3, N.D4, N.F4, N.Bb4, N.D5], 1.5, 0.055), ['boom', T.drop, 0.36], ['whoosh', T.drop, 0.9, 0.08],
  ...applause(T.drop + 0.1, 2.4, 16, 0.04, 1),
  ...headCues(HEADS[1]),
  ...T.cred.flatMap((c, i) => [['pop', c, NOTE[2 + i * 2], 0.04, (i - 0.5) * 0.6], ['tick', c, 0.04]]), ...sob(T.cred[1] + 0.35),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [GT]: 880, [STn]: 740, [CT]: 659.25, [TT]: 587.33, [PT]: 1046.5, [KT]: 523.25 } }),
  // 2 · most tears
  ['whoosh', T.auntIn[0] + 0.1, 0.5, 0.05], ...headCues(HEADS[2]),
  ...sob(14.2),
  ...fanfare(T.win1, [N.F4, N.Bb4, N.D5, N.F5], 0.9, 0.05), ['glitter', T.win1 + 0.25, T.win1 + 1.0], ...headCues(HEADS[3]), ...applause(T.win1 + 0.1, 2.0, 14, 0.035, 2),
  ['whoosh', T.jump1[0], 0.5, 0.05], ['pop', T.jump1[1], 784, 0.04, 0], ['tom', T.jump1[1], 110, { gain: 0.2, decay: 0.3, rev: 0.3, bus: 'fx' }],
  ...sob(16.2), ...sob(17.0),
  ['whoosh', T.scroll[0], 0.4, 0.04], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.scroll[0] + 0.1 + i * 0.12), 0.03]),
  ['tick', T.playoff - 0.1, 0.06], ...playoff, ...headCues(HEADS[4]), ...sob(18.7),
  ['whoosh', T.jump2[0], 0.5, 0.05], ['pop', T.jump2[1], 523.25, 0.035, -0.4],
  // 3 · best boundaries
  ...headCues(HEADS[5]), ...Array.from({ length: 3 }, (_, i) => ['tick', r3(T.capIn[0] + 0.2 + i * 0.3), 0.03]),
  ['whoosh', T.lunge[0], 0.35, 0.05],
  ['tapeStop', T.sign - 0.02, 0.3], ['pop', T.sign, 392, 0.05, 0.2], ['tick', T.sign, 0.07], ...gasp(T.sign + 0.15),
  ['chip', r3(T.l8 + 0.85), 523.25, 0.4, { duty: 0.25, gain: 0.02, decay: 0.3, sustain: 0.5, rev: 0.3, dly: 0, bus: 'fx' }],
  ...headCues(HEADS[6]), ['glitter', T.swoon + 0.1, T.swoon + 0.9],
  ['strings', T.swoon, r3(T.swoon + 1.6), [N.Bb3, N.D4, N.F4, N.A4], { gain: 0.012, attack: 0.15, release: 0.7, rev: 0.6, bus: 'fx' }],
  ...applause(27.0, 1.2, 10, 0.025, 3),
  // 4 · speed round
  ['whoosh', 28.5, 0.4, 0.05], ...headCues(HEADS[7]),
  ['riser', T.cometT[0], COMET_GRAB, 0.04], ['whoosh', COMET_GRAB - 0.2, 0.8, 0.09], ['pop', COMET_GRAB, 1318.51, 0.04, 0.4], ['glitter', COMET_GRAB - 0.3, T.cometT[1]],
  ...headCues(HEADS[8]), ...fanfare(T.sunIn[1] - 0.15, [N.Bb3, N.F4, N.Bb4], 0.8, 0.04),
  ['chip', T.doze, 330, 0.6, { wave: 'tri', slide: -6, gain: 0.03, decay: 0.5, sustain: 0.5, rev: 0.3, dly: 0, bus: 'fx' }],   // the Sun snores
  ['chip', r3(T.doze + 1.0), 300, 0.6, { wave: 'tri', slide: -6, gain: 0.03, decay: 0.5, sustain: 0.5, rev: 0.3, dly: 0, bus: 'fx' }],
  ['whoosh', T.sunOut[0], 0.5, 0.05],
  // 5 · the final award
  ...headCues(HEADS[9]), ...drumroll(T.drum[0] + 0.1, T.hit),
  ['tick', T.specs, 0.06], ['pop', T.specs + 0.1, 880, 0.03, -0.3],
  ['whoosh', T.open[0], 0.35, 0.04],
  ...fanfare(T.hit, [N.Bb2, N.F3, N.Bb3, N.D4, N.F4, N.Bb4], 1.8, 0.06), ['boom', T.hit, 0.4], ['crash', T.hit, { gain: 0.07, len: 3 }],
  ['strings', T.hit, r3(T.hit + 4.5), [N.Bb3, N.D4, N.F4, N.Bb4], { gain: 0.014, attack: 0.3, release: 1.2, rev: 0.6, bus: 'fx' }],
  ...headCues(HEADS[10]), ['glitter', T.hit + 0.1, T.hit + 1.2],
  ['whoosh', T.fly[0], 0.6, 0.07], ['bell', T.fly[1], 1318.51, 0.04, 1.6, 0], ['glitter', T.fly[1] - 0.05, T.fly[1] + 0.9],
  ...headCues(HEADS[11]),
  ['boom', T.ovation, 0.3], ['crash', T.ovation, { gain: 0.06, len: 2.5 }], ...applause(T.ovation, 2.2, 22, 0.045, 4), ...sob(44.0),
  // 6 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Bb' }),
  // 7 · tonight's deck
  ...headCues(HEADS[12]),
  ...T.deal.flatMap((d, i) => [['whoosh', r3(d), 0.3, 0.035], ['pop', r3(d + 0.32), NOTE[3 + i], 0.04, (i - 1) * 0.4], ['tick', r3(d + 0.32), 0.05]]),
  ['whoosh', T.dealOut[0], 0.4, 0.05],
  // 8 · see you next season
  ...headCues(HEADS[13]),
  ['whoosh', T.shut[0], 0.8, 0.06],
  ['tom', T.pop, 62, { gain: 0.3, decay: 0.7, rev: 0.4, bus: 'fx' }], ['glitter', T.pop, r3(T.pop + 0.6)],
  ['brass', T.pop, [N.Bb3, N.D4, N.F4, N.Bb4], 0.9, { gain: 0.045, bright: 1.2, ...FXB }], ...applause(T.pop, 0.6, 14, 0.03, 5),
  ...sob(T.pop + 0.15),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
