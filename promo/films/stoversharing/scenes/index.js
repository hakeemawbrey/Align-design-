// stoversharing — "Too Much, Too Soon." (45 s vertical Align ad, Star Talk season 3 #12, music: pop · C).
// Story 0–40.6, then the shared end card ("come" + the Align logo).
//   0.00–3.3    "Date one. | She brought *slides.*"  A tiny bistro table floats in the nebula: ♋ CANCER (pink hair bow) and
//               ♒ AQUARIUS (orange beanie), a candle, a carousel projector, one slice of cake; a screen case hangs above.
//               ♓ PISCES eavesdrops over the next booth. AQUARIUS: "so… tell me about—"  On the drop (1.16) Cancer leaps,
//               the screen SLAMS down and the projector clicks on: "SO GLAD YOU ASKED." (1 / 87). A laser pointer appears.
//   3.38–15.0   "Agenda: *everything.*"  The deck, one click per slide; Aquarius nods slower and its eyes get wider:
//               2/87 MY CHILDHOOD (three crying polaroids: AGE 2 · AGE 5 · LAST TUES)   "I was a *sensitive* baby."
//               3/87 EVERY EX, RANKED (THE DRUMMER · THE OTHER DRUMMER · GYM GUY)        "anonymized, *obviously.*"
//               4/87 MY ATTACHMENT STYLE (a colour-coded loop: TEXTS BACK? → SPIRAL → DOUBLE TEXT → OVERTHINK)
//                                                                                       "anxious, but *color-coded.*"
//               5/87 WHAT MY THERAPIST THINKS OF YOU: blank ("click to add text"). The music tape-stops, a cricket, the laser
//                    dot drifts off the slide onto Aquarius' forehead. Beat.            "she'll have notes by *thursday.*"
//  15.0        card cut (deal).
//  15.04–19.4  "Fast *forward.*"  click-click-click: 6 MIDDLE SCHOOL · 7 MY BANGS ERA · 8 THE GROUP CHAT → 9 IN LOVING MEMORY:
//               Bubbles the goldfish (halo), and Pisces (the fish) bawls fountains in the next booth → 10 · 11 → 12 THINGS
//               I'VE NEVER TOLD ANYONE. The slide counter zooms out of the screen: "12 / 87" (sting).
//               "Only *75* to go."   CANCER: "we're making *great time!*"
//  19.4–23.0   "Pity *dessert.*"  ♉ TAURUS the waiter (bow tie, towel) hops in, a tray balanced on its point, and slides a
//               second slice to Aquarius. TAURUS: "on the house. you'll *need* it."  (Cancer quietly clicks on: 13, 14.)
//  23.0–29.4   "Okay. *Intermission.*"  THE STARS (the gold narrator) float down in front of the screen:
//               "babe. this is a *great* story." → "…tell it in *chapters.*"  A sparkle zaps the projector off, the screen
//               whips up, Cancer blushes and shrinks. Silence. AQUARIUS: "…I'd like *chapter two.*"
//  29.49–30.9  "Plot *twist.*"  Cancer's heart eyes, hearts float up, Pisces wails (happy).
//  31.0        card cut (flip).
//  31.16–35.5  ★ LESSON UNLOCKED: "Share your story | in chapters, | not all at *once.*"  +1 PACING
//  35.5–38.0   "One card *at a time.*"  The stars deal a talk card (XIX The Sun): "What made you smile this week?"
//               THE STARS: "let the cards set the *depth.*"
//  38.0–40.5   "Chapter one. | *See you* at two."  The card settles on the table, Cancer winks, everyone hops; all pops out.
// One canvas (sky + screen + cast + table), DOM type, dialogue boxes, the shared LESSON banner, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  starFrame, inSprite, cellToWorld, bowCells, beanieCells, bowTieCells, towelCells, tearsCells, sweatCells,
  drawTable, drawCandle, drawProjector, drawCake, drawChair, drawBooth, drawLaserPen, drawTray, drawGoldfish, drawDiary, drawMedal, drawPixelHeart,
} from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', INK = '#1b1236', RED = '#ff2a3c'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
const BEAT = n => 0.6 + n * BL                // 108 bpm grid
const CAN = signStar('cancer'), AQU = signStar('aquarius'), TAU = signStar('taurus'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.25],
  caseIn: 0.05, tableIn: 0.08, canIn: 0.12, aquIn: 0.2, boothIn: 0.26, pisIn: 0.38,
  h0a: 0.15, l1: 0.3, spark: 0.7, crouch: [0.86, BEAT(1)],
  zip: BEAT(1),                                                              // 1.156 the drop: the screen slams down
  h0b: 1.3, h0bLand: 1.6, ptrIn: 2.1, h0Out: [3.15, 3.32],
  s2: BEAT(5), h1: 3.4, h1Land: 3.72, l3: 3.45,                               // 3.378 MY CHILDHOOD
  s3: 5.85, l4: 5.9,
  s4: 8.33, l5: 8.38, closeA: 10.9,
  s5: BEAT(19), drift: [11.62, 12.05], cricket: 11.7, l6: 12.25, closeB: 14.82, h1Out: [14.74, 14.9],   // 11.156 the blank slide
  cut1: 15.0,
  m6: BEAT(26), m7: 15.32, m8: 15.6, s9: 15.88, bawl: 16.02, m10: 17.1, m11: 17.38, s12: 17.66,          // 15.044 fast forward
  h2: 15.1, h2Land: 15.4, h2Out: [17.55, 17.7],
  zoom: [17.75, 18.1], zoomBack: [20.05, 20.4], h3: 17.82, h3Land: 18.15, h3Out: [20.15, 20.3], l7: 18.25,
  tauIn: [19.35, 20.2], plate: [20.22, 20.58], h4: 20.42, h4Land: 20.72, l8: 20.6, s13: 21.95, s14: 22.75, tauOut: [22.65, 23.25], h4Out: [23.05, 23.2],
  skyIn: [23.0, 23.4], turn: BEAT(41), h5: 23.32, h5Land: 23.66, l9: 23.4,                             // 23.378 the turn
  l10: 26.08, zap: [26.92, 27.15], off: 27.15, rollUp: [27.38, 27.68], l11: 28.32,
  heart: BEAT(52), h5Out: [29.28, 29.42], h6: 29.5, h6Land: 29.8, skyOut: [30.2, 30.5], closeC: 30.56, h6Out: [30.75, 30.9],   // 29.489 payoff
  cut2: 30.98,
  lesson: BEAT(55), lessonOut: [35.3, 35.5],                                                              // 31.156
  skyBack: [35.3, 35.8], deal: [35.45, 35.95], h7: 35.5, h7Land: 35.85, l12: 35.66, h7Out: [37.85, 38.0], settle: [37.95, 38.4], closeD: 38.15,
  h8: 38.05, h8Late: 38.3, wave: 38.55, out: [40.2, 40.52],
}
const CT = `${CAN.glyph}︎ CANCER`, AT = `${AQU.glyph}︎ AQUARIUS`, TT = `${TAU.glyph}︎ TAURUS`, ST = 'THE STARS'
const CC = PINK, AC = CYAN, TC = '#ffcf7a', SC = GOLD
const LINES_A = [
  { t: T.l1, speaker: AT, color: AC, text: 'so… tell me *about—*' },
  { t: T.l3, speaker: CT, color: CC, text: 'I was a *sensitive* baby.' },
  { t: T.l4, speaker: CT, color: CC, text: 'anonymized, *obviously.*' },
  { t: T.l5, speaker: CT, color: CC, text: 'anxious, but *color-coded.*' },
]
const LINES_B = [
  { t: T.l6, speaker: CT, color: CC, text: "she'll have notes by *thursday.*" },
]
const LINES_C = [
  { t: T.l7, speaker: CT, color: CC, text: "we're making *great time!*" },
  { t: T.l8, speaker: TT, color: TC, text: "on the house. you'll *need* it." },
  { t: T.l9, speaker: ST, color: SC, text: 'babe. this is a *great* story.' },
  { t: T.l10, speaker: ST, color: SC, text: '…tell it in *chapters.*' },
  { t: T.l11, speaker: AT, color: AC, text: "…I'd like *chapter two.*" },
]
const LINES_D = [
  { t: T.l12, speaker: ST, color: SC, text: 'let the cards set the *depth.*' },
]
const ALL_LINES = [...LINES_A, ...LINES_B, ...LINES_C, ...LINES_D]
const CPS = 30
const ALL_LT = lineTimes(ALL_LINES, { cps: CPS })
const lineDone = L => ALL_LT[ALL_LINES.indexOf(L)].done
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Share your story | in chapters, | not all at *once.*', chip: '+1 PACING' }

// the deck (n = the counter)
const SLIDES = [
  { n: 1, t: T.zip, kind: 'title' },
  { n: 2, t: T.s2, kind: 'childhood', title: 'MY CHILDHOOD' },
  { n: 3, t: T.s3, kind: 'exes', title: 'EVERY EX, RANKED' },
  { n: 4, t: T.s4, kind: 'attach', title: 'MY ATTACHMENT STYLE' },
  { n: 5, t: T.s5, kind: 'therapist', title: 'WHAT MY THERAPIST|THINKS OF YOU' },
  { n: 6, t: T.m6, kind: 'flash', title: 'MIDDLE SCHOOL', c: '#7fd0f0' },
  { n: 7, t: T.m7, kind: 'flash', title: 'MY BANGS ERA', c: '#ffb3cf' },
  { n: 8, t: T.m8, kind: 'flash', title: 'THE GROUP CHAT', c: '#9cf08a' },
  { n: 9, t: T.s9, kind: 'bubbles', title: 'IN LOVING MEMORY' },
  { n: 10, t: T.m10, kind: 'flash', title: 'BIG FEELINGS, PT. 1', c: '#c9a6ff' },
  { n: 11, t: T.m11, kind: 'flash', title: 'BIG FEELINGS, PT. 2', c: '#ffd98a' },
  { n: 12, t: T.s12, kind: 'secrets', title: "THINGS I'VE NEVER|TOLD ANYONE" },
  { n: 13, t: T.s13, kind: 'secrets', title: "THINGS I'VE NEVER|TOLD ANYONE (CONT.)" },
  { n: 14, t: T.s14, kind: 'secrets', title: "THINGS I'VE NEVER|TOLD ANYONE (CONT.)" },
]
const CLICKS = SLIDES.slice(1).map(s => s.t)
const slideIdx = t => { let i = -1; for (let k = 0; k < SLIDES.length; k++) if (t >= SLIDES[k].t) i = k; return i }

// ── geometry
const SCR = { x0: 140, y0: 488, w: 800, h: 480 }                      // the screen surface, fully down
const CASE = { x0: 108, y0: 446, w: 864, h: 44 }
const MASK = 12
const CON = { x0: SCR.x0 + MASK, y0: SCR.y0 + MASK, w: SCR.w - 2 * MASK, h: SCR.h - 2 * MASK }   // 776 × 496 projected area
const TABLE = { cx: 540, top: 1296, rx: 168, bottom: 1500 }
const CAN_AT = { x: 310, y: 1236, s: 252 }, AQU_AT = { x: 770, y: 1236, s: 252 }
const PIS_AT = { x: 136, y: 1140, s: 180 }, BOOTH = { x0: 34, x1: 238, top: 1170, bottom: 1450 }
const TAU_AT = { x: 944, y: 1118, s: 216 }
const SKY_AT = { x: 540, y: 792, s: 300 }, SKY_SIDE = { x: 872, y: 620, s: 190 }
const SEAT_Y = 1350
const PROJ = { x: 528, y: 1300 }, CANDLE = { x: 446, y: 1300 }, CAKE1 = { x: 624, y: 1293 }, CAKE2 = { x: 680, y: 1293 }
const LENS = [PROJ.x + 42 + Math.sin(0.55) * 33, PROJ.y - 46 - Math.cos(0.55) * 33]
const CARD = { x: 540, y: 840, w: 340 }
const PILL = { w: 150, h: 46, hx: CON.x0 + CON.w - 26 - 75, hy: CON.y0 + CON.h - 22 - 23, zx: 700, zy: 846, zs: 2.2 }

// ── small helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// hops
const CAN_HOPS = [...talkHops(ALL_LINES, CT, { cps: CPS }), ...CLICKS.filter(c => c > T.s2 - 0.01), T.heart, T.wave + 0.2]
const AQU_HOPS = [...talkHops(ALL_LINES, AT, { cps: CPS }), T.plate[1] + 0.1, T.heart + 0.15, T.wave]
const TAU_HOPS = [...talkHops(ALL_LINES, TT, { cps: CPS })]
const SKY_HOPS = [...talkHops(ALL_LINES, ST, { cps: CPS }), T.zap[0] - 0.05, T.wave + 0.1]
const PIS_HOPS = [T.wave + 0.3]
const NODS = [3.933, 5.044, 6.156, 7.267, 8.378, 9.489, 10.6]

// ── screen state
function screenDown(t) {
  if (t < T.zip) return 0
  if (t < T.rollUp[0]) {
    const d = t - T.zip
    if (d < 0.16) return 1.07 * ease.inQuad(d / 0.16)
    const e = d - 0.16
    return 1 + 0.07 * Math.exp(-e * 8) * Math.cos(e * 28)
  }
  return 1 - ease.inCubic(prog(t, ...T.rollUp))
}
const projOn = t => (t < T.zip + 0.02 || t >= T.off) ? 0 : (t < T.zip + 0.14 ? (Math.floor((t - T.zip) * 40) % 2 ? 0.35 : 1) : 1)
const caseJolt = t => {
  let j = 0
  for (const t0 of [T.zip + 0.16, T.rollUp[1]]) { const d = t - t0; if (d >= 0 && d < 1) j += 7 * Math.exp(-d * 9) * Math.cos(d * 30) }
  return j
}
function pillState(t) {
  const k = easeOutBack(prog(t, ...T.zoom), 1.5) * (1 - ease.inOutCubic(prog(t, ...T.zoomBack)))
  const shake = k > 0.6 && t < T.zoomBack[0] ? 5 * Math.sin(t * 61) * Math.exp(-(t - T.zoom[1]) * 1.2) : 0
  return { k, x: lerp(PILL.hx, PILL.zx, k) + shake, y: lerp(PILL.hy, PILL.zy, k), s: lerp(1, PILL.zs, k), red: clamp(k * 1.6) }
}

// ── character states (pure)
function canState(t) {
  let mood = 'neutral', look = [1, 0], squash = 0, blink, blush, dy = 0
  const cur = slideIdx(t), sl = cur >= 0 ? SLIDES[cur] : null
  const myLine = ALL_LINES.find((L, i) => L.speaker === CT && t >= L.t - 0.05 && t < ALL_LT[i].done + 0.35)
  if (t < T.spark) { mood = 'neutral' }
  else if (t < T.zip) { mood = 'sparkle'; squash = 0.17 * ease.inOutQuad(prog(t, ...T.crouch)) }
  else if (t < T.zip + 0.55) {                                                      // the leap
    const p = prog(t, T.zip, T.zip + 0.34)
    mood = 'happy'; dy = -150 * Math.sin(Math.PI * p); squash = p < 1 ? -0.14 * Math.sin(Math.PI * p) : 0
    if (t >= T.zip + 0.34) { const d = t - T.zip - 0.34; squash = 0.2 * Math.exp(-d * 10) * Math.cos(d * 26) }
  }
  else if (t < T.s2) { mood = 'sparkle'; look = t < 2.5 ? [1, 0] : [1, -1] }
  else if (t < T.s5) {                                                              // presenting
    mood = myLine ? 'happy' : 'sparkle'
    look = myLine ? [1, 0] : (t - (sl ? sl.t : 0) < 0.3 ? [1, -1] : [1, -1])
  }
  else if (t < T.l6) { mood = 'sparkle'; look = t < T.drift[0] ? [1, -1] : [1, 0] }
  else if (t < T.cut1) { mood = myLine ? 'happy' : 'sparkle'; look = [1, 0] }
  else if (t < T.l7) { mood = 'sparkle'; look = [1, -1] }
  else if (t < T.tauIn[0]) { mood = myLine ? 'happy' : 'sparkle'; look = myLine ? [1, 0] : [1, -1] }
  else if (t < T.skyIn[0]) { mood = t > T.plate[1] && t < T.plate[1] + 1.1 ? 'squint' : 'neutral'; look = t < T.plate[1] + 1.1 ? [1, -1] : [1, -1] }
  else if (t < T.l9) { mood = 'wide'; look = [1, -1]; blink = false }
  else if (t < lineDone(LINES_C[2]) + 0.2) { mood = 'wide'; look = [1, -1] }
  else if (t < T.l10) { mood = 'sparkle'; look = [1, -1]; blush = 0.6 }
  else if (t < T.off) { mood = 'neutral'; look = [1, -1] }
  else if (t < T.l11) { mood = 'happy'; look = [0, 1]; blush = 1; squash = 0.13 * ease.outCubic(prog(t, T.off, T.off + 0.3)) }
  else if (t < T.heart) { mood = 'wide'; look = [1, 0]; blush = 1; squash = 0.13 * (1 - prog(t, T.l11, T.l11 + 0.25)) }
  else if (t < T.deal[0]) { mood = 'heart'; look = [1, 0]; blush = 1 }
  else if (t < T.settle[0]) { mood = 'sparkle'; look = [1, -1] }
  else if (t < T.wave) { mood = 'happy'; look = [1, 0] }
  else { mood = 'wink'; look = [1, 0] }
  return { mood, look, squash, blink, blush, dy }
}
function aquState(t) {
  let mood = 'neutral', look = [-1, 0], squash = 0, blink, dy = 0, sweat = 0, bob
  const talking = ALL_LINES.some((L, i) => L.speaker === AT && t >= L.t - 0.05 && t < ALL_LT[i].done + 0.3)
  // the slow nods (later ones are slower and deeper)
  let nod = 0
  for (const [i, n] of NODS.entries()) { const d = 0.42 + i * 0.03, p = prog(t, n, n + d); if (p > 0 && p < 1) nod = Math.sin(Math.PI * p) * (1 + i * 0.12) }
  if (t < T.zip) { mood = talking ? 'sparkle' : 'neutral'; look = [-1, 0] }
  else if (t < T.zip + 0.3) { mood = 'wide'; look = [-1, -1]; blink = false; squash = -0.14 * bump(t, T.zip, 0.3); dy = 18 * bump(t, T.zip, 0.3) }
  else if (t < T.zip + 0.62) { mood = 'wide'; look = [-1, 0]; blink = false }                        // double take at Cancer…
  else if (t < T.zip + 1.0) { mood = 'wide'; look = [-1, -1]; blink = false }                        // …and back at the screen
  else if (t < T.s3) { mood = 'neutral'; look = [-1, -1]; dy = 10 * nod; squash = 0.05 * nod }
  else if (t < T.s4) { mood = 'wide'; look = [-1, -1]; dy = 10 * nod; squash = 0.05 * nod - 0.05 }
  else if (t < T.s5) { mood = 'wide'; look = [-1, -1]; dy = 11 * nod; squash = 0.05 * nod - 0.09; sweat = clamp((t - 9.2) * 2) }
  else if (t < T.cut1) { mood = 'wide'; look = t < T.drift[1] ? [-1, -1] : [0, -1]; blink = false; bob = 0; squash = -0.14; sweat = 1 }
  else if (t < T.zoom[0]) { mood = 'wide'; look = [-1, -1]; squash = -0.1; sweat = 1; dy = 2 * Math.sin(t * 50) }
  else if (t < T.tauIn[0]) { mood = 'wide'; look = [-1, -1]; blink = false; squash = -0.2 * ease.outCubic(prog(t, T.zoom[0], T.zoom[0] + 0.25)); sweat = 1; bob = 0 }
  else if (t < T.plate[1]) { mood = 'wide'; look = [1, -1]; squash = -0.08; sweat = 1 - prog(t, T.tauIn[0], T.plate[1]) }
  else if (t < T.plate[1] + 0.9) { mood = 'heart'; look = [-1, 1] }
  else if (t < T.skyIn[0]) { mood = 'sparkle'; look = [1, -1] }
  else if (t < T.off) { mood = t < T.l9 + 0.6 ? 'wide' : 'neutral'; look = [-1, -1] }
  else if (t < T.l11) { mood = 'neutral'; look = [-1, 0] }
  else if (t < T.heart) { mood = 'sparkle'; look = [-1, 0] }
  else if (t < T.deal[0]) { mood = 'happy'; look = [-1, 0] }
  else if (t < T.settle[0]) { mood = 'sparkle'; look = [-1, -1] }
  else { mood = 'happy'; look = [-1, 0] }
  return { mood, look, squash, blink, dy, sweat, bob }
}
function pisState(t) {
  let mood = 'sparkle', look = [1, -1], tears = 0, squash = 0, dy = 0, blink
  if (t < T.s2) { mood = 'sparkle' }
  else if (t < T.s3) { mood = 'sparkle'; tears = t > T.s2 + 0.5 ? 1 : 0 }
  else if (t < T.s5) { mood = 'wide' }
  else if (t < T.cut1) { mood = 'wide'; look = [1, 0] }
  else if (t < T.bawl) { mood = 'wide' }
  else if (t < T.s12) {                                                               // BUBBLES. the fish. bawling.
    mood = 'sparkle'; tears = 3; dy = -64 * ease.outBack(prog(t, T.bawl, T.bawl + 0.25)); squash = 0.07 * Math.sin(t * 24)
  }
  else if (t < T.tauIn[0]) { mood = 'sparkle'; tears = 2; dy = -64 * (1 - ease.inOutQuad(prog(t, T.s12, T.s12 + 0.5))) }
  else if (t < T.skyIn[0]) { mood = 'sparkle'; tears = 1 }
  else if (t < T.heart) { mood = 'sparkle'; look = [1, -1] }
  else if (t < T.lesson) { mood = 'happy'; tears = 3; dy = -30 * ease.outBack(prog(t, T.heart, T.heart + 0.25)); squash = 0.06 * Math.sin(t * 22) }
  else if (t < T.deal[0]) { mood = 'happy'; tears = 2; dy = -30 }
  else { mood = 'happy'; tears = 1; dy = -30 * (1 - prog(t, T.deal[0], T.deal[0] + 0.5)) }
  return { mood, look, tears, squash, dy, blink }
}
function tauPose(t) {
  if (t < T.tauIn[0] || t >= T.tauOut[1]) return null
  let px = TAU_AT.x, lift = 0
  if (t < T.tauIn[1]) { const p = prog(t, ...T.tauIn); px = lerp(1240, TAU_AT.x, ease.outCubic(p)); lift = Math.abs(Math.sin(p * Math.PI * 3)) * 46 * (1 - p * 0.5) }
  else if (t >= T.tauOut[0]) { const p = prog(t, ...T.tauOut); px = lerp(TAU_AT.x, 1240, ease.inCubic(p)); lift = Math.abs(Math.sin(p * Math.PI * 2)) * 40 }
  let mood = 'neutral', look = [-1, 0]
  if (t >= T.tauIn[1] && t < T.l8) { look = [-1, 1] }
  else if (t >= T.l8 && t < 21.95) { mood = 'neutral'; look = [-1, 1] }
  else if (t >= 21.95 && t < T.tauOut[0]) { mood = 'wink'; look = [-1, 0] }
  else if (t >= T.tauOut[0]) { mood = 'happy' }
  return { x: px, y: TAU_AT.y - lift, mood, look }
}
function skyPose(t) {
  if (t >= T.skyIn[0] && t < T.skyOut[1]) {
    const k = easeOutBack(prog(t, ...T.skyIn), 2.2) * popOut(t, T.skyOut)
    let mood = 'happy', look = [0, 1]
    if (t < T.l9) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.zap[0]) { mood = 'happy'; look = [0, 0] }
    else if (t < T.off + 0.4) { mood = 'wink'; look = [0, 1] }
    else if (t < T.heart) { mood = 'sparkle'; look = [0, 1] }
    else { mood = 'happy' }
    return { x: SKY_AT.x, y: SKY_AT.y, s: SKY_AT.s, mood, look, k }
  }
  if (t >= T.skyBack[0] && t < T.out[1]) {
    const p = easeOutBack(prog(t, ...T.skyBack), 1.4)
    return { x: lerp(1200, SKY_SIDE.x, p), y: lerp(420, SKY_SIDE.y, p), s: SKY_SIDE.s, mood: t >= T.wave ? 'wink' : 'sparkle', look: [-1, 1], k: 1 }
  }
  return null
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "italic 500 150px 'EB Garamond'", "italic 500 50px 'EB Garamond'", "italic 600 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [backIm, sunIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-3.png')])
  const BACK_BODY = 1320 / 1528, FACE_BODY = 610 / 732          // opaque card body / png width
  // the talk card face: XIX The Sun, its question repainted to "What made you smile this week?"
  let FACE = null
  if (sunIm) {
    FACE = document.createElement('canvas'); FACE.width = sunIm.width; FACE.height = sunIm.height
    const fx = FACE.getContext('2d'); fx.drawImage(sunIm, 0, 0)
    const col = fx.getImageData(118, 0, 1, sunIm.height).data
    for (let yy = 784; yy <= 1000; yy++) { const i = yy * 4; fx.fillStyle = `rgb(${col[i]},${col[i + 1]},${col[i + 2]})`; fx.fillRect(116, yy, 504, 1) }
    fx.font = "italic 500 66px 'EB Garamond'"; fx.textAlign = 'center'; fx.textBaseline = 'alphabetic'; fx.fillStyle = '#f4ecdc'
    fx.shadowColor = 'rgba(242,199,92,0.35)'; fx.shadowBlur = 8
    fx.fillText('What made you', 366, 868); fx.fillText('smile this week?', 366, 946)
  }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HP = { wobble: true, fit: true }
  const H0a = popText(root, 'Date one.', { top: 112, size: 104, at: T.h0a, gap: 0.09, ...HP })
  const H0b = popText(root, 'She brought *slides.*', { top: 226, size: 84, accentSize: 128, at: T.h0b, late: 1, lateAt: T.h0bLand, accentColor: PINK, ...HP })
  const H1 = popText(root, 'Agenda: *everything.*', { top: 150, size: 92, accentSize: 134, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: GOLD, ...HP })
  const H2 = popText(root, 'Fast *forward.*', { top: 150, size: 104, accentSize: 150, at: T.h2, late: 1, lateAt: T.h2Land, accentColor: CYAN, ...HP })
  const H3 = popText(root, 'Only *75* to go.', { top: 150, size: 104, accentSize: 156, at: T.h3, late: 3, lateAt: T.h3Land, lateGap: 0.12, accentColor: '#ff6b7d', ...HP })
  const H4 = popText(root, 'Pity *dessert.*', { top: 150, size: 108, accentSize: 156, at: T.h4, late: 1, lateAt: T.h4Land, accentColor: PINK, ...HP })
  const H5 = popText(root, 'Okay. *Intermission.*', { top: 150, size: 92, accentSize: 134, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: GOLD, ...HP })
  const H6 = popText(root, 'Plot *twist.*', { top: 150, size: 112, accentSize: 164, at: T.h6, late: 1, lateAt: T.h6Land, accentColor: PINK, ...HP })
  const H7 = popText(root, 'One card *at a time.*', { top: 150, size: 88, accentSize: 128, at: T.h7, late: 3, lateAt: T.h7Land, lateGap: 0.1, accentColor: GOLD, ...HP })
  const H8 = popText(root, 'Chapter one. | *See you* at two.', { top: 112, size: 100, accentSize: 150, at: T.h8, late: 4, lateAt: T.h8Late, lateGap: 0.08, accentColor: PINK, lineHeight: 1.0, ...HP })
  const HEADS = [[H0a, T.h0Out], [H0b, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.out]]
  const BOX = { y: 1520, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES_A, open: T.l1 - 0.2, close: T.closeA }),
    dialogueBox(root, { ...BOX, lines: LINES_B, open: T.l6 - 0.22, close: T.closeB }),
    dialogueBox(root, { ...BOX, lines: LINES_C, open: T.l7 - 0.22, close: T.closeC }),
    dialogueBox(root, { ...BOX, lines: LINES_D, open: T.l12 - 0.22, close: T.closeD }),
  ]
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.55 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ the screen + the deck ═══════════════════════
  const PAPER = '#f7f2e8', SINK = '#2a1f44', SUB = '#7a6f98', SPINK = '#e2457f', SGOLD = '#d39a1c', STEAL = '#24a896', SLAV = '#7d5fd6'
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawCase(t, k) {
    if (k <= 0) return
    const j = caseJolt(t), y0 = CASE.y0 + j
    x.save(); x.translate(540, y0 + CASE.h / 2); x.scale(k, k); x.translate(-540, -(y0 + CASE.h / 2))
    // cords up into the sky
    for (const cx0 of [CASE.x0 + 70, CASE.x0 + CASE.w - 70]) {
      const g = x.createLinearGradient(0, y0 - 80, 0, y0); g.addColorStop(0, 'rgba(239,230,214,0)'); g.addColorStop(1, 'rgba(239,230,214,0.5)')
      x.fillStyle = g; x.fillRect(cx0 - 1.5, y0 - 80, 3, 80)
    }
    x.fillStyle = INK; rr(CASE.x0 - 6, y0 - 6, CASE.w + 12, CASE.h + 12, 20); x.fill()
    const g = x.createLinearGradient(0, y0, 0, y0 + CASE.h); g.addColorStop(0, '#6a55a8'); g.addColorStop(0.45, '#45337a'); g.addColorStop(1, '#2a1d48')
    x.fillStyle = g; rr(CASE.x0, y0, CASE.w, CASE.h, 16); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(CASE.x0 + 24, y0 + 6, CASE.w - 48, 4)
    for (const ex of [CASE.x0, CASE.x0 + CASE.w - 30]) { x.fillStyle = GOLD; rr(ex, y0 - 2, 30, CASE.h + 4, 10); x.fill(); x.fillStyle = '#fff1c8'; x.fillRect(ex + 6, y0 + 4, 6, CASE.h - 8) }
    x.fillStyle = '#140c2c'; x.fillRect(SCR.x0 - 4, y0 + CASE.h - 6, SCR.w + 8, 6)
    x.restore()
  }
  function slideTitle(s) {
    const lines = s.title.split('|')
    x.fillStyle = SINK; x.font = `800 48px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    lines.forEach((L, i) => x.fillText(L, 42, 76 + i * 56))
    x.fillStyle = SPINK; x.fillRect(42, 76 + (lines.length - 1) * 56 + 18, 86, 8)
    return 76 + (lines.length - 1) * 56 + 26
  }
  function footer() {
    x.fillStyle = SUB; x.font = `700 18px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText(`${CAN.glyph}︎ ABOUT ME · v14`, 26, CON.h - 26)
  }
  function polaroid(lx, ly, rot, bg, cap, t, seed) {
    x.save(); x.translate(lx, ly); x.rotate(rot); x.scale(0.86, 0.86)
    x.fillStyle = 'rgba(30,20,50,0.25)'; x.fillRect(-94, -110, 196, 236)
    x.fillStyle = '#ffffff'; x.fillRect(-100, -118, 196, 236); x.strokeStyle = '#d9d2e6'; x.lineWidth = 2; x.strokeRect(-100, -118, 196, 236)
    x.fillStyle = bg; x.fillRect(-88, -106, 172, 166)
    x.save(); x.beginPath(); x.rect(-88, -106, 172, 166); x.clip()
    const o = { color: CAN.color, mood: 'sparkle', look: [0, 0], seed, glow: 0.25, bob: 0, tips: false, blush: 0.7 }
    drawStarChar(x, -2, -16, 118, t, o)
    const F = starFrame(-2, -16, 118, t, o)
    inSprite(x, F, () => bowCells(x))
    const ey = F.cy + 6
    for (const d of [-1, 1]) {                                                // two cartoon waterfalls of tears
      const ex = -2 + d * 20, wv = Math.sin(t * 9 + d) * 2
      const path = () => { x.beginPath(); x.moveTo(ex, ey); x.quadraticCurveTo(ex + d * 8 + wv, ey + 40, ex + d * 14, 64) }
      x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 13; path(); x.stroke()
      x.strokeStyle = '#7fd8ff'; x.lineWidth = 8; path(); x.stroke()
      x.strokeStyle = '#e6f8ff'; x.lineWidth = 2.5; path(); x.stroke()
      for (let q = 0; q < 3; q++) { const ph = ((t * 1.6 + q / 3 + (d > 0 ? 0.2 : 0)) % 1); x.fillStyle = '#7fd8ff'; x.fillRect(ex + d * (16 + ph * 22) - 3, 40 + ph * 26 - 3, 6, 6) }
    }
    x.restore()
    x.fillStyle = cap === 'LAST TUES' ? SPINK : SINK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, -2, 90)
    x.restore()
  }
  const NODES = [['TEXTS BACK?', 388, 153, SPINK, 46], ['SPIRAL', 618, 278, SGOLD, 24], ['DOUBLE TEXT', 388, 403, STEAL, 46], ['OVERTHINK', 158, 278, SLAV, 24]]
  function attachDiagram(t) {
    const cx = 388, cy = 278, rx = 252, ry = 125, D = Math.PI / 180
    const ang = [-90, 0, 90, 180]
    x.lineCap = 'round'; x.lineJoin = 'round'
    NODES.forEach((N, i) => {
      const a0 = (ang[i] + N[4]) * D, a1 = (ang[i] + 90 - NODES[(i + 1) % 4][4]) * D
      x.strokeStyle = N[3]; x.lineWidth = 7; x.beginPath()
      for (let k = 0; k <= 24; k++) { const a = lerp(a0, a1, k / 24), px = cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry; k ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke()
      const ex = cx + Math.cos(a1) * rx, ey = cy + Math.sin(a1) * ry, tx = -Math.sin(a1) * rx, ty = Math.cos(a1) * ry, tl = Math.hypot(tx, ty), ux = tx / tl, uy = ty / tl
      x.fillStyle = N[3]; x.beginPath(); x.moveTo(ex + ux * 16, ey + uy * 16); x.lineTo(ex - ux * 6 - uy * 13, ey - uy * 6 + ux * 13); x.lineTo(ex - ux * 6 + uy * 13, ey - uy * 6 - ux * 13); x.fill()
    })
    x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (const [lab, nx, ny, c] of NODES) {
      const w = x.measureText(lab).width + 36
      x.fillStyle = '#ffffff'; rr(nx - w / 2, ny - 28, w, 56, 14); x.fill()
      x.strokeStyle = c; x.lineWidth = 5; rr(nx - w / 2, ny - 28, w, 56, 14); x.stroke()
      x.fillStyle = SINK; x.fillText(lab, nx, ny + 2)
    }
    drawPixelHeart(x, cx, cy, 8, SPINK)
    void t
  }
  function drawSlideContent(s, t) {
    if (s.kind === 'title') {
      x.textAlign = 'center'; x.textBaseline = 'alphabetic'
      x.fillStyle = SINK; x.font = `800 92px ${INTER}`; x.fillText('SO GLAD', 388, 196)
      x.fillStyle = SPINK; x.fillText('YOU ASKED.', 388, 292)
      x.fillStyle = SUB; x.font = `italic 500 42px ${SERIF}`; x.fillText(`a presentation by ${CAN.glyph}︎`, 388, 362)
      for (const [hx, hy, c] of [[96, 110, SPINK], [690, 130, SGOLD], [80, 380, SLAV], [700, 372, STEAL]]) drawPixelHeart(x, hx, hy, 6, c)
      footer(); return
    }
    if (s.kind === 'flash') {
      x.fillStyle = s.c; rr(70, 150, 636, 200, 28); x.fill()
      x.fillStyle = SINK; x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      let fs = 58; while (x.measureText(s.title).width > 590 && fs > 30) { fs -= 2; x.font = `800 ${fs}px ${INTER}` }
      x.fillText(s.title, 388, 252)
      footer(); return
    }
    slideTitle(s)
    if (s.kind === 'childhood') {
      polaroid(150, 258, -0.07, '#ffd3e2', 'AGE 2', t, 3)
      polaroid(388, 262, 0.035, '#cdeedd', 'AGE 5', t, 5)
      polaroid(626, 256, -0.03, '#e2d6ff', 'LAST TUES', t, 7)
    } else if (s.kind === 'exes') {
      ;[[200, '#ffcf3f', 1, 'THE DRUMMER'], [290, '#d7dbe8', 2, 'THE OTHER DRUMMER'], [380, '#e09a5a', 3, 'GYM GUY']].forEach(([ly, col, n, txt]) => {
        drawMedal(x, 74, ly - 16, 25, col, n)
        x.fillStyle = SINK; x.font = `800 44px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillText(txt, 122, ly)
      })
    } else if (s.kind === 'attach') {
      attachDiagram(t)
    } else if (s.kind === 'therapist') {
      x.save(); x.setLineDash([14, 10]); x.strokeStyle = '#a99fc4'; x.lineWidth = 4; rr(60, 168, 656, 236, 18); x.stroke(); x.restore()
      x.fillStyle = '#8f85ad'; x.font = `italic 500 48px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('click to add text', 388, 288)
    } else if (s.kind === 'bubbles') {
      const by = 262 + Math.sin(t * 2.2) * 6
      x.strokeStyle = '#ffd23f'; x.lineWidth = 8; x.beginPath(); x.ellipse(388, by - 78, 62, 15, 0, 0, Math.PI * 2); x.stroke()
      x.strokeStyle = 'rgba(255,210,63,0.35)'; x.lineWidth = 16; x.beginPath(); x.ellipse(388, by - 78, 62, 15, 0, 0, Math.PI * 2); x.stroke()
      drawGoldfish(x, 388, by, 11, t)
      x.fillStyle = SINK; x.font = `italic 600 64px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.fillText('Bubbles', 388, 418)
      for (const [sx, sy] of [[220, 230], [560, 210], [250, 340], [540, 330]]) drawPixelStar(x, sx, sy + Math.sin(t * 3 + sx) * 4, 22, 1, '#ffd23f')
    } else if (s.kind === 'secrets') {
      drawDiary(x, 250, 300, 11)
    }
    footer()
  }
  function drawPill(t, n, ps, clipOn) {
    if (n < 1) return
    const txt = `${n} / 87`
    x.save(); x.translate(ps.x, ps.y); x.scale(ps.s, ps.s)
    if (ps.k > 0.05) {                                                         // zoomed: a red glow ring behind it
      const g = x.createRadialGradient(0, 0, 10, 0, 0, 150); g.addColorStop(0, rgba('#ff3d55', 0.35 * ps.k)); g.addColorStop(1, rgba('#ff3d55', 0))
      x.fillStyle = g; x.fillRect(-160, -160, 320, 320)
    }
    x.fillStyle = INK; rr(-PILL.w / 2 - 4, -PILL.h / 2 - 4, PILL.w + 8, PILL.h + 8, 16); x.fill()
    x.fillStyle = ps.k > 0.05 ? '#2b1d4c' : '#3a2f5c'; rr(-PILL.w / 2, -PILL.h / 2, PILL.w, PILL.h, 12); x.fill()
    x.font = `700 28px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
    const parts = txt.split(' / '), w1 = x.measureText(parts[0] + ' / ').width, w2 = x.measureText(parts[1]).width, x0 = -(w1 + w2) / 2
    x.fillStyle = '#ffffff'; x.fillText(parts[0] + ' / ', x0, 2)
    x.fillStyle = ps.red > 0 ? `rgb(255,${Math.round(lerp(255, 70, ps.red))},${Math.round(lerp(255, 90, ps.red))})` : '#ffffff'; x.fillText(parts[1], x0 + w1, 2)
    x.restore()
    void clipOn
  }
  function drawScreen(t) {
    const u = screenDown(t)
    if (u <= 0.002) return
    const j = caseJolt(t)
    const hv = SCR.h * u, top = SCR.y0 + j
    const on = projOn(t)
    x.save(); x.beginPath(); x.rect(SCR.x0, top, SCR.w, hv); x.clip()
    // the surface: lit paper, or a dull lilac when the projector is off
    const lit = on > 0
    x.fillStyle = lit ? PAPER : '#a8a1bc'; x.fillRect(SCR.x0, top, SCR.w, SCR.h + 60)
    if (lit) {
      // the slide (with a quick swipe between slides)
      const i = slideIdx(t), s = SLIDES[i]
      x.save(); x.beginPath(); x.rect(CON.x0, CON.y0 + j, CON.w, CON.h); x.clip()
      x.globalAlpha = on
      const dur = s.kind === 'flash' || (i > 0 && SLIDES[i - 1].kind === 'flash') ? 0.1 : 0.16
      const p = i > 0 ? ease.outCubic(prog(t, s.t, s.t + dur)) : 1
      if (p < 1 && i > 0) { x.save(); x.translate(CON.x0 - CON.w * p, CON.y0 + j); drawSlideContent(SLIDES[i - 1], t); x.restore() }
      x.save(); x.translate(CON.x0 + CON.w * (1 - p), CON.y0 + j); drawSlideContent(s, t); x.restore()
      if (p < 1 && i > 0) {                                                    // motion streaks
        x.fillStyle = 'rgba(42,31,68,0.10)'
        for (let k = 0; k < 6; k++) x.fillRect(CON.x0 + CON.w * (1 - p) - 40 - k * 60, CON.y0 + 40 + k * 76, 220, 6)
      }
      x.restore()
      // the counter (on the slide unless it has zoomed out)
      const ps = pillState(t)
      if (ps.k <= 0.001) drawPill(t, s.n, { ...ps, y: ps.y + j }, true)
      // projected light: a hotspot + soft edges
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(540, top + 250, 20, 540, top + 250, 520); g.addColorStop(0, 'rgba(255,250,235,0.14)'); g.addColorStop(1, 'rgba(255,250,235,0)')
      x.fillStyle = g; x.fillRect(SCR.x0, top, SCR.w, SCR.h); x.restore()
    }
    // the black masking border
    x.fillStyle = '#231a3a'
    x.fillRect(SCR.x0, top, SCR.w, MASK); x.fillRect(SCR.x0, top, MASK, SCR.h + 60); x.fillRect(SCR.x0 + SCR.w - MASK, top, MASK, SCR.h + 60)
    x.restore()
    // the weighted bottom bar + the pull ring
    const by = top + hv
    x.fillStyle = INK; rr(SCR.x0 - 10, by - 4, SCR.w + 20, 22, 8); x.fill()
    x.fillStyle = '#4a3a78'; rr(SCR.x0 - 6, by, SCR.w + 12, 14, 6); x.fill()
    x.fillStyle = '#8a72c8'; x.fillRect(SCR.x0 + 10, by + 2, SCR.w - 20, 3)
    let sw = 0
    for (const t0 of [T.zip + 0.16, T.rollUp[1]]) { const d = t - t0; if (d >= 0 && d < 3) sw += 0.6 * Math.exp(-d * 2.2) * Math.sin(d * 9) }
    x.save(); x.translate(540, by + 16); x.rotate(sw)
    x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 22); x.stroke()
    x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 22); x.stroke()
    x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, 36, 14, 0, Math.PI * 2); x.stroke()
    x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(0, 36, 14, 0, Math.PI * 2); x.stroke()
    x.restore()
  }
  function drawBeam(t) {
    const on = projOn(t), u = screenDown(t)
    if (on <= 0 || u < 0.2) return
    const by = CON.y0 + Math.min(CON.h, SCR.h * u - MASK)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(LENS[0], LENS[1], 540, by)
    g.addColorStop(0, `rgba(255,246,220,${0.32 * on})`); g.addColorStop(0.35, `rgba(255,246,220,${0.09 * on})`); g.addColorStop(1, `rgba(255,246,220,${0.04 * on})`)
    x.fillStyle = g; x.beginPath(); x.moveTo(LENS[0], LENS[1]); x.lineTo(CON.x0, by); x.lineTo(CON.x0 + CON.w, by); x.closePath(); x.fill()
    // dust motes drifting in the light
    const r = rng(41)
    for (let i = 0; i < 26; i++) {
      const v = r(), w0 = r(), sp = 0.04 + r() * 0.05, ph = r()
      const q = ((v + t * sp) % 1), yy = lerp(LENS[1] - 20, by + 10, q), half = lerp(10, CON.w / 2, (LENS[1] - yy) / (LENS[1] - by))
      const xx = lerp(LENS[0], 540, (LENS[1] - yy) / (LENS[1] - by)) + (w0 * 2 - 1) * half * 0.85 + Math.sin(t * 0.9 + ph * 6) * 8
      x.fillStyle = `rgba(255,248,225,${0.5 * Math.sin(Math.PI * q)})`; x.fillRect(Math.round(xx), Math.round(yy), 3, 3)
    }
    x.restore()
  }

  // ═══════════════════════ the laser ═══════════════════════
  const W_ = (lx, ly) => [CON.x0 + lx, CON.y0 + ly]
  function canFrame(t, k = 1) {
    const st = canState(t)
    return { st, F: starFrame(CAN_AT.x, CAN_AT.y + st.dy, CAN_AT.s, t, { pop: k, bob: undefined, squash: st.squash, hops: CAN_HOPS, seed: 4 }) }
  }
  function aquFrame(t, k = 1) {
    const st = aquState(t)
    return { st, F: starFrame(AQU_AT.x, AQU_AT.y + st.dy, AQU_AT.s, t, { pop: k, bob: st.bob, squash: st.squash, hops: AQU_HOPS, seed: 9 }) }
  }
  function laserDot(t) {
    if (t < T.ptrIn + 0.12 || t >= T.off) return null
    const j = caseJolt(t)
    let p
    if (t < T.s2) { const a = (t - T.ptrIn) * 3.4; p = W_(388 + 270 * Math.cos(a), 250 + 96 * Math.sin(a)) }
    else if (t < T.s3) {
      const c1 = W_(150, 246), c3 = W_(626, 246), a = (t - T.s2) * 5.2
      const m = ease.inOutCubic(prog(t, T.s2 + 1.25, T.s2 + 1.55)), c = [lerp(c1[0], c3[0], m), lerp(c1[1], c3[1], m)]
      p = [c[0] + 62 * Math.cos(a), c[1] + 54 * Math.sin(a)]
    }
    else if (t < T.s4) { const u = ((t - T.s3) / 1.3) % 1, tri = u < 0.5 ? u * 2 : 2 - u * 2; p = W_(lerp(126, 600, ease.inOutQuad(tri)), 308) }
    else if (t < T.s5) { const a = -Math.PI / 2 + (t - T.s4) * 4.6; p = W_(388 + 252 * Math.cos(a), 278 + 125 * Math.sin(a)) }
    else if (t < T.drift[0]) { p = W_(388 + 180 * Math.sin((t - T.s5) * 2.1), 300 + 70 * Math.sin((t - T.s5) * 3.3 + 1)) }
    else if (t < T.cut1) {
      const tt = Math.min(t, T.drift[1]), a = W_(388 + 180 * Math.sin((T.drift[0] - T.s5) * 2.1), 300 + 70 * Math.sin((T.drift[0] - T.s5) * 3.3 + 1))
      const { F } = aquFrame(t), b = cellToWorld(F, 18, 11.5)
      const q = ease.inOutCubic(prog(tt, ...T.drift))
      p = [lerp(a[0], b[0], q), lerp(a[1], b[1], q) - Math.sin(Math.PI * q) * 60]
      if (t >= T.drift[1]) p = [b[0] + Math.sin(t * 37) * 1.5, b[1] + Math.cos(t * 29) * 1.5]
    }
    else if (t < T.s9 || (t >= T.m10 && t < T.s12)) { const r = rng(Math.floor(t * 14) + 3); p = W_(388 + (r() - 0.5) * 220, 120 + (r() - 0.5) * 110) }
    else if (t < T.m10) { const a = (t - T.s9) * 6; p = W_(388 + 110 * Math.cos(a), 262 + 70 * Math.sin(a)) }
    else if (t < T.zoomBack[1]) {
      const ps = pillState(t), tx = ps.x + 40 * ps.s, ty = ps.y
      const a = (t - T.s12) * 7, r0 = 22 * ps.s
      p = [tx + r0 * Math.cos(a), ty + r0 * 0.55 * Math.sin(a)]
      if (ps.k <= 0.001) p[1] += j
    }
    else { p = W_(250 + 110 * Math.sin((t - T.zoomBack[1]) * 1.4), 300 + 46 * Math.sin((t - T.zoomBack[1]) * 2.8)) }
    return p
  }
  function drawLaser(t, F) {
    const k = pop01(t, T.ptrIn, 0.3, 2.2) * (1 - ease.inQuad(prog(t, T.off, T.off + 0.2)))
    if (k <= 0.01) return
    const dot = laserDot(t)
    const [ax, ay] = cellToWorld(F, 33.6, 14.4)
    const tgt = dot || [ax + 60, ay - 60]
    const ang = Math.atan2(tgt[1] - ay, tgt[0] - ax)
    if (dot) {
      const tipx = ax + Math.cos(ang) * 72 * k, tipy = ay + Math.sin(ang) * 72 * k
      x.save(); x.globalCompositeOperation = 'lighter'
      x.strokeStyle = 'rgba(255,40,60,0.22)'; x.lineWidth = 3; x.beginPath(); x.moveTo(tipx, tipy); x.lineTo(dot[0], dot[1]); x.stroke()
      const g = x.createRadialGradient(dot[0], dot[1], 0, dot[0], dot[1], 34); g.addColorStop(0, 'rgba(255,60,70,0.9)'); g.addColorStop(0.3, 'rgba(255,40,60,0.35)'); g.addColorStop(1, 'rgba(255,40,60,0)')
      x.fillStyle = g; x.fillRect(dot[0] - 34, dot[1] - 34, 68, 68)
      x.restore()
      x.fillStyle = RED; x.beginPath(); x.arc(dot[0], dot[1], 9, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffd6da'; x.beginPath(); x.arc(dot[0] - 2, dot[1] - 2, 3.5, 0, Math.PI * 2); x.fill()
    }
    drawLaserPen(x, ax, ay, ang, k)
  }

  // ═══════════════════════ the cast ═══════════════════════
  function drawCancer(t, k) {
    const { st, F } = canFrame(t, k)
    const o = { color: CAN.color, glyph: CAN.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: CAN_HOPS, seed: 4, pop: k, glow: 0.9, blush: st.blush }
    drawStarChar(x, CAN_AT.x, CAN_AT.y + st.dy, CAN_AT.s, t, o)
    inSprite(x, F, () => bowCells(x))
    return F
  }
  function drawAquarius(t, k) {
    const { st, F } = aquFrame(t, k)
    const o = { color: AQU.color, glyph: AQU.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: AQU_HOPS, seed: 9, pop: k, glow: 0.9, bob: st.bob }
    drawStarChar(x, AQU_AT.x, AQU_AT.y + st.dy, AQU_AT.s, t, o)
    inSprite(x, F, () => { beanieCells(x); sweatCells(x, t, st.sweat) })
    return F
  }
  function drawPisces(t, k) {
    const st = pisState(t)
    const o = { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: PIS_HOPS, seed: 12, pop: k, glow: 0.8, bob: 3 }
    const y = PIS_AT.y + st.dy
    drawStarChar(x, PIS_AT.x, y, PIS_AT.s, t, o)
    const F = starFrame(PIS_AT.x, y, PIS_AT.s, t, o)
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
  }
  function trayPoint(t) {
    const P = tauPose(t)
    if (!P) return null
    const F = starFrame(P.x, P.y, TAU_AT.s, t, { bob: 0, hops: TAU_HOPS, seed: 6 })
    const [tx, ty] = cellToWorld(F, 18, 1.2)
    return [tx, ty - 4]
  }
  function drawTaurus(t) {
    const P = tauPose(t)
    if (!P) return
    const o = { color: TAU.color, glyph: TAU.glyph, mood: P.mood, look: P.look, hops: TAU_HOPS, seed: 6, glow: 0.85, bob: 0 }
    drawStarChar(x, P.x, P.y, TAU_AT.s, t, o)
    const F = starFrame(P.x, P.y, TAU_AT.s, t, o)
    inSprite(x, F, () => { bowTieCells(x); towelCells(x) })
    const tp = trayPoint(t)
    const wob = Math.sin(t * 9) * 0.04 * (t < T.tauIn[1] || t >= T.tauOut[0] ? 1 : 0.3)
    x.save(); x.translate(tp[0], tp[1]); x.rotate(wob)
    drawTray(x, 0, 0)
    if (t < T.plate[0]) drawCake(x, 0, -6, 4)
    x.restore()
  }
  function drawFlyingPlate(t) {
    if (t < T.plate[0]) return
    if (t < T.plate[1]) {
      const a = trayPoint(T.plate[0]), p = prog(t, ...T.plate), e = ease.inOutCubic(p)
      drawCake(x, lerp(a[0], CAKE2.x, e), lerp(a[1] - 6, CAKE2.y, e) - Math.sin(Math.PI * p) * 70, 4)
    }
  }
  function drawNarrator(t) {
    const P = skyPose(t)
    if (!P) return null
    if (P.k <= 0.01) return P
    const o = { color: STAR.sky, mood: P.mood, look: P.look, hops: SKY_HOPS, seed: 2, glow: 1.25, pop: P.k }
    drawStarChar(x, P.x, P.y, P.s, t, o)
    sparkleRing(t, P.x, P.y, T.skyIn[0] + 0.12, 12, 200, 5)
    sparkleRing(t, P.x, P.y, T.skyOut[0] + 0.05, 10, 170, 2)
    return P
  }
  function drawZap(t) {
    const p = prog(t, ...T.zap)
    if (p <= 0 || p >= 1) return
    const P = skyPose(t); if (!P) return
    const sx = P.x, sy = P.y + P.s * 0.42
    const e = ease.inOutCubic(p), px = lerp(sx, LENS[0], e), py = lerp(sy, LENS[1], e)
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let k = 0; k < 8; k++) { const q = Math.max(0, e - k * 0.04); x.globalAlpha = (1 - k / 8) * 0.8; drawPixelStar(x, lerp(sx, LENS[0], q), lerp(sy, LENS[1], q), 26 - k * 2, 1, k % 2 ? GOLD : '#fff6d8') }
    x.restore()
    drawPixelStar(x, px, py, 40, 2, '#fff6d8')
  }
  function drawHearts(t) {
    const t0 = T.heart
    if (t < t0 || t > T.lesson + 0.2) return
    for (let i = 0; i < 9; i++) {
      const ts = t0 + i * 0.16, d = t - ts
      if (d < 0 || d > 1.5) continue
      const side = i % 2 ? 1 : -1, hx = 540 + side * (24 + (i * 37) % 90) + Math.sin(d * 4 + i) * 12, hy = 1190 - d * 260
      x.globalAlpha = Math.sin(Math.PI * Math.min(1, d / 1.5)) ** 0.6
      drawPixelHeart(x, hx, hy, 6 + (i % 3), [PINK, '#ff4f7e', '#ffb3cf'][i % 3])
    }
    x.globalAlpha = 1
  }
  function drawCrickets(t) {
    const spots = [[760, 1062], [330, 1074]]
    x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let i = 0; i < 2; i++) {
      const t0 = T.cricket + i * 0.62, k = t - t0
      if (k < 0 || k > 0.7) continue
      x.globalAlpha = Math.sin(Math.PI * k / 0.7) * 0.95
      x.lineWidth = 6; x.strokeStyle = INK; x.strokeText('chirp.', spots[i][0], spots[i][1] - k * 16)
      x.fillStyle = '#9cf08a'; x.fillText('chirp.', spots[i][0], spots[i][1] - k * 16)
    }
    x.globalAlpha = 1
  }
  function drawWah(t) {
    const d = t - T.bawl
    if (d < 0 || d > 1.5) return
    const k = easeOutBack(prog(d, 0, 0.25), 3) * (1 - prog(d, 1.2, 1.5))
    x.save(); x.translate(PIS_AT.x + 70, PIS_AT.y - 196 - d * 12); x.rotate(-0.12 + 0.05 * Math.sin(d * 30)); x.scale(k, k)
    x.font = `700 58px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 11; x.strokeStyle = INK; x.strokeText('WAAAH', 0, 0); x.fillStyle = '#8fe3ff'; x.fillText('WAAAH', 0, 0)
    x.restore()
  }
  // the talk card
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawTalkCard(t) {
    if (t < T.deal[0] || !FACE) return
    const P = skyPose(T.deal[0]) || { x: SKY_SIDE.x, y: SKY_SIDE.y }
    let cx, cy, w, rot, flip
    if (t < T.deal[1]) {
      const p = prog(t, ...T.deal), e = easeOutBack(p, 1.2)
      cx = lerp(P.x, CARD.x, e); cy = lerp(P.y + 40, CARD.y, e) - Math.sin(Math.PI * p) * 80; w = lerp(60, CARD.w, ease.outCubic(p)); rot = lerp(1.3, 0, ease.outCubic(p)); flip = prog(t, T.deal[0] + 0.12, T.deal[1] - 0.05)
    } else if (t < T.settle[0]) {
      cx = CARD.x; cy = CARD.y + Math.sin((t - T.deal[1]) * 2) * 6; w = CARD.w; rot = 0.02 * Math.sin((t - T.deal[1]) * 1.6); flip = 1
    } else {
      const p = ease.inOutCubic(prog(t, ...T.settle))
      cx = CARD.x; cy = lerp(CARD.y, 1258, p); w = lerp(CARD.w, 64, p); rot = lerp(0, -0.06, p); flip = 1
    }
    // glow
    const gk = t < T.settle[0] ? clamp(prog(t, T.deal[0] + 0.2, T.deal[1])) : 1 - prog(t, ...T.settle) * 0.7
    if (gk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, w * 1.4); g.addColorStop(0, rgba(GOLD, 0.32 * gk)); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.fillRect(cx - w * 1.5, cy - w * 1.5, w * 3, w * 3); x.restore()
    }
    const sx = Math.cos(flip * Math.PI)
    if (sx > 0) cardImg(backIm, BACK_BODY, cx, cy, w, rot, sx)
    else cardImg(FACE, FACE_BODY, cx, cy, w, rot, -sx)
    if (t > T.deal[1] - 0.1 && t < T.deal[1] + 0.6) sparkleRing(t, cx, cy, T.deal[1] - 0.05, 10, w * 0.95, 3)
  }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function warmPool(t) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const fl = 0.92 + 0.08 * Math.sin(t * 5.3) * Math.sin(t * 2.1)
    const g = x.createRadialGradient(540, 1300, 30, 540, 1300, 620); g.addColorStop(0, `rgba(255,170,110,${0.16 * fl})`); g.addColorStop(0.5, `rgba(255,140,120,${0.06 * fl})`); g.addColorStop(1, 'rgba(255,140,120,0)')
    x.fillStyle = g; x.fillRect(0, 700, W, 1220); x.restore()
    x.fillStyle = 'rgba(6,4,16,0.35)'; x.beginPath(); x.ellipse(540, 1486, 420, 34, 0, 0, Math.PI * 2); x.fill()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const outP = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        x.save()
        if (outP < 1) { x.translate(540, 1150); x.scale(outP, outP); x.translate(-540, -1150) }
        const jolt = (() => { const d = t - (T.zip + 0.16); return d >= 0 && d < 0.6 ? 6 * Math.exp(-d * 10) * Math.sin(d * 44) : 0 })()
        warmPool(t)
        drawCase(t, pop01(t, T.caseIn, 0.34, 1.8))
        drawScreen(t)
        drawBeam(t)
        drawNarrator(t)
        drawZap(t)
        // the next booth + Pisces peeking over it
        const pk = pop01(t, T.pisIn, 0.38, 2.2)
        if (pk > 0.02) drawPisces(t, pk)
        const bk = pop01(t, T.boothIn, 0.34, 1.6)
        if (bk > 0.02) { x.save(); x.translate((BOOTH.x0 + BOOTH.x1) / 2, BOOTH.bottom); x.scale(bk, bk); x.translate(-(BOOTH.x0 + BOOTH.x1) / 2, -BOOTH.bottom); drawBooth(x, BOOTH.x0, BOOTH.x1, BOOTH.top, BOOTH.bottom); x.restore() }
        drawWah(t)
        // chairs, the waiter, the date
        const ck = pop01(t, T.canIn, 0.36, 2.0), ak = pop01(t, T.aquIn, 0.36, 2.0)
        x.save(); x.translate(0, jolt)
        if (ck > 0.02) { x.save(); x.translate(CAN_AT.x, SEAT_Y); x.scale(ck, ck); x.translate(-CAN_AT.x, -SEAT_Y); drawChair(x, CAN_AT.x, SEAT_Y, -1); x.restore() }
        if (ak > 0.02) { x.save(); x.translate(AQU_AT.x, SEAT_Y); x.scale(ak, ak); x.translate(-AQU_AT.x, -SEAT_Y); drawChair(x, AQU_AT.x, SEAT_Y, 1); x.restore() }
        drawTaurus(t)
        let FC = null
        if (ck > 0.02) FC = drawCancer(t, ck)
        if (ak > 0.02) drawAquarius(t, ak)
        // the table and what's on it
        const tk = pop01(t, T.tableIn, 0.36, 1.8)
        if (tk > 0.02) {
          x.save(); x.translate(TABLE.cx, TABLE.bottom); x.scale(tk, tk); x.translate(-TABLE.cx, -TABLE.bottom)
          drawTable(x, TABLE.cx, TABLE.top, TABLE.rx, TABLE.bottom)
          drawCandle(x, CANDLE.x, CANDLE.y, t)
          drawProjector(x, PROJ.x, PROJ.y, projOn(t) > 0, t)
          drawCake(x, CAKE1.x, CAKE1.y, 4)
          if (t >= T.plate[1]) drawCake(x, CAKE2.x, CAKE2.y, 4)
          if (t >= T.settle[1]) cardImg(FACE, FACE_BODY, CARD.x, 1258, 64, -0.06)
          x.restore()
        }
        x.restore()
        drawFlyingPlate(t)
        if (FC) drawLaser(t, FC)
        // the zoomed counter
        const ps = pillState(t)
        if (ps.k > 0.001 && projOn(t) > 0) { const i = slideIdx(t); drawPill(t, SLIDES[i].n, ps, false) }
        drawCrickets(t)
        drawHearts(t)
        drawTalkCard(t)
        x.restore()
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change. The default selection keeps 2 of these 6 (indices 1 and 4):
// 15.0 (→ fast forward, a 'deal') and 30.98 (→ LESSON UNLOCKED, a 'flip'). The end card flips at 40.6.
export const CUTS = [3.3, T.cut1, 19.3, 23.28, T.cut2, 35.42]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in the D-major palette and moved into C by the engine; chip / lead / brass are
//    written in C major)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const click = (t0, g = 1) => [['tick', +t0.toFixed(3), 0.05 * g], ['chip', +t0.toFixed(3), 2093, 0.03, { duty: 0.5, gain: 0.012 * g, decay: 0.02, sustain: 0.2, ...FXO }]]
const zipDown = t0 => [['whoosh', +(t0 + 0.05).toFixed(3), 0.32, 0.05], ['chip', +(t0 - 0.02).toFixed(3), 3200, 0.2, { wave: 'noise', slide: -40, gain: 0.032, decay: 0.15, sustain: 0.5, ...FXO }], ['pop', +(t0 + 0.17).toFixed(3), 110, 0.09, 0], ['tick', +(t0 + 0.17).toFixed(3), 0.07], ['chip', +(t0 + 0.17).toFixed(3), 98, 0.18, { wave: 'tri', slide: -12, gain: 0.05, decay: 0.12, sustain: 0.3, ...FXO }]]
const zipUp = t0 => [['chip', +t0.toFixed(3), 900, 0.3, { wave: 'noise', slide: 36, gain: 0.03, decay: 0.25, sustain: 0.6, ...FXO }], ['whoosh', +(t0 + 0.2).toFixed(3), 0.3, 0.045], ['pop', +(t0 + 0.31).toFixed(3), 220, 0.06, 0], ['tick', +(t0 + 0.31).toFixed(3), 0.06]]
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => ['chip', +(t0 + d).toFixed(3), 4400, 0.03, { duty: 0.25, gain: 0.024, decay: 0.02, sustain: 0.7, pan, rev: 0.1, dly: 0, bus: 'fx' }])
const sting = t0 => [[0, 0.16], [0.2, 0.16], [0.42, 0.9]].map(([d, len], i) => ['brass', +(t0 + d).toFixed(3), i < 2 ? [196, 246.94] : [185, 233.08], len, { gain: 0.05, bright: 1.3, rev: 0.2, bus: 'fx' }])
const wail = (t0, len = 1.3) => [['chip', t0, 1046.5, len, { duty: 0.25, slide: -4, vib: 0.04, gain: 0.016, decay: 0.8, sustain: 0.8, pan: -0.5, rev: 0.25, dly: 0.1, bus: 'fx' }], ['chip', +(t0 + 0.4).toFixed(3), 1174.66, len * 0.7, { duty: 0.25, slide: -6, vib: 0.05, gain: 0.012, decay: 0.6, sustain: 0.8, pan: -0.5, rev: 0.25, dly: 0.1, bus: 'fx' }]]
const sobs = (t0, n) => Array.from({ length: n }, (_, i) => ['chip', +(t0 + i * 0.16).toFixed(3), 3000 + (i % 2) * 600, 0.07, { wave: 'noise', slide: 30, gain: 0.016, decay: 0.05, sustain: 0.5, pan: -0.5, ...FXO }])
const ding = t0 => [['bell', t0, 1760, 0.05, 1.4, 0.35], ['bell', +(t0 + 0.002).toFixed(3), 2349.3, 0.02, 1.0, 0.35]]
const hopsSfx = (t0, t1, n, pan) => Array.from({ length: n }, (_, i) => ['pop', +lerp(t0, t1, n > 1 ? i / (n - 1) : 0).toFixed(3), 392 + i * 60, 0.03, pan])
const powerDown = t0 => [['chip', t0, 784, 0.42, { wave: 'square', duty: 0.5, slide: -40, gain: 0.02, decay: 0.3, sustain: 0.4, ...FXO }], ['tick', t0, 0.06], ['pop', +(t0 + 0.02).toFixed(3), 165, 0.05, 0]]
export const CUES = [
  // 0 · date one → ZIP
  ...head(T.h0a, 2, T.h0a + 0.2, 0, 0.022),
  ['pop', T.tableIn + 0.1, 392, 0.03, 0], ['pop', T.canIn + 0.12, 784, 0.03, -0.3], ['pop', T.aquIn + 0.12, 659.25, 0.03, 0.3], ['pop', T.pisIn + 0.12, 988, 0.022, -0.5], ['tick', T.caseIn + 0.1, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CT]: 1046.5, [AT]: 740, [TT]: 620, [ST]: 880 } }),
  ['pop', T.spark, 1318.51, 0.03, -0.3], ['pluck', T.spark + 0.05, 1760, 0.02, 0.3, -0.3],
  ['chip', T.crouch[0], 523.25, T.crouch[1] - T.crouch[0], { wave: 'square', duty: 0.25, slide: 10, gain: 0.014, decay: 0.3, sustain: 0.8, ...FXO }],
  ...zipDown(T.zip), ['bell', T.zip + 0.2, 1760, 0.03, 0.8, 0],
  ['chip', T.zip + 0.18, 1568, 0.05, { duty: 0.5, gain: 0.015, decay: 0.03, sustain: 0.2, ...FXO }], ['chip', T.zip + 0.25, 2093, 0.05, { duty: 0.5, gain: 0.015, decay: 0.03, sustain: 0.2, ...FXO }],
  ...head(T.h0b, 3, T.h0bLand, 2),
  ['pop', T.ptrIn + 0.05, 1174.66, 0.03, -0.3], ['chip', T.ptrIn + 0.1, 2637, 0.12, { wave: 'tri', gain: 0.01, vib: 0.02, decay: 0.1, sustain: 0.5, ...FXO }],
  // 1 · the deck
  ...head(T.h1, 2, T.h1Land, 1),
  ...[T.s2, T.s3, T.s4, T.s5].flatMap(c => click(c)),
  ['tapeStop', T.s5 + 0.02, 0.5],
  ...chirp(T.cricket + 0.05, 0.5), ...chirp(T.cricket + 0.67, -0.5),
  ['chip', T.drift[0], 1567.98, 0.45, { wave: 'tri', slide: -8, gain: 0.012, vib: 0.03, decay: 0.4, sustain: 0.8, ...FXO }],
  ['tick', T.drift[1], 0.04], ['pop', T.drift[1], 1318.51, 0.025, 0.4],
  // 2 · fast forward
  ...head(T.h2, 2, T.h2Land, 3),
  ...[T.m6, T.m7, T.m8, T.s9, T.m10, T.m11, T.s12].flatMap(c => click(c, 0.9)),
  ['whoosh', T.m6 + 0.1, 0.25, 0.03], ['whoosh', T.m10 + 0.1, 0.25, 0.03],
  ...wail(T.bawl), ...sobs(T.bawl + 0.1, 8), ['pop', T.bawl, 880, 0.03, -0.5],
  ...sting(T.zoom[0] + 0.05), ['whoosh', T.zoom[0], 0.3, 0.04],
  ...head(T.h3, 3, T.h3Land, 4),
  ['whoosh', T.zoomBack[0] + 0.15, 0.25, 0.025],
  // 3 · pity dessert
  ...hopsSfx(T.tauIn[0] + 0.1, T.tauIn[1] - 0.1, 3, 0.5),
  ['whoosh', T.plate[0] + 0.2, 0.3, 0.035], ['tick', T.plate[1], 0.06], ['pop', T.plate[1], 659.25, 0.035, 0.3], ...ding(T.plate[1] + 0.03),
  ...head(T.h4, 2, T.h4Land, 2),
  ...[T.s13, T.s14].flatMap(c => click(c, 0.6)),
  ...hopsSfx(T.tauOut[0] + 0.1, T.tauOut[1] - 0.1, 2, 0.6),
  // 4 · the turn
  ['glitter', T.skyIn[0], T.skyIn[1] + 0.2], ['bell', T.skyIn[1], 1318.51, 0.03, 1.4, 0],
  ...head(T.h5, 2, T.h5Land, 1),
  ['glitter', T.zap[0], T.zap[1] + 0.1], ['pop', T.zap[0], 1760, 0.03, 0],
  ...powerDown(T.off),
  ...zipUp(T.rollUp[0]),
  ['chip', T.off + 0.12, 1318.51, 0.5, { duty: 0.25, slide: -3, gain: 0.01, vib: 0.02, decay: 0.4, sustain: 0.6, ...FXO }],
  // 5 · the payoff
  ['pop', T.heart, 1174.66, 0.04, 0], ['pluck', T.heart, 1174.66, 0.035, 0.6, 0],
  ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.heart + 0.05 + i * 0.16).toFixed(3), NOTE[(i * 2 + 1) % 7], 0.022, (i % 2 ? 0.3 : -0.3)]),
  ...wail(T.heart + 0.15, 1.0), ['glitter', T.heart, T.heart + 0.6],
  ...head(T.h6, 2, T.h6Land, 3),
  ['whoosh', T.skyOut[0] + 0.2, 0.3, 0.03],
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: 'C' }),
  // 7 · talk cards
  ['whoosh', T.skyBack[0] + 0.2, 0.3, 0.03], ['glitter', T.skyBack[0] + 0.1, T.skyBack[1]],
  ['whoosh', T.deal[0] + 0.15, 0.35, 0.04], ['tick', T.deal[1] - 0.02, 0.05], ['bell', T.deal[1], 1318.51, 0.035, 1.4, 0], ['glitter', T.deal[1] - 0.1, T.deal[1] + 0.5],
  ...head(T.h7, 5, T.h7Land, 0),
  ['whoosh', T.settle[0] + 0.15, 0.3, 0.025], ['tick', T.settle[1], 0.04],
  // 8 · chapter one
  ...wordPops(T.h8, 2, 0.08, 2, 0.026), ...wordPops(T.h8Late, 4, 0.08, 4, 0.03), ['pluck', T.h8Late + 0.24, 1174.66, 0.04, 0.6, 0],
  ['pop', T.wave, 784, 0.03, -0.3], ['pop', T.wave + 0.1, 988, 0.03, 0.3], ['pop', T.wave + 0.2, 1174.66, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
