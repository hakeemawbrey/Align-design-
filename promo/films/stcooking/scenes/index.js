// stcooking — "Love Kitchen." (60 s vertical Align ad, Star Talk "Wild Lessons" #9, music: funk, A). A cooking show.
// Story 0–55.6, then the shared end card.
//   0.00–3.95   "Today on | *Love Kitchen.*"  A pixel TV kitchen floats in the nebula: the ON AIR lamp clunks on, the neon
//               LOVE KITCHEN sign flickers up. ♉ Taurus hosts in a toque and a heart apron: "welcome to Love Kitchen!"
//               The APPLAUSE lamp flashes on the drop. ♓ Pisces chops at a prep shelf in the back, sobbing ("onions").
//   4.05–9.9    "Today's dish: | the *apology.*"  A recipe card: THE APOLOGY · SERVES 2. TAURUS: "today we bake an apology."
//               ♋ Cancer pops up behind the counter with a steaming pot: "I brought soup!" Taurus turns to the camera,
//               deadpan. Cancer sinks away, delighted anyway (soup #1).
//  10.0        card cut (flip)
//  10.1–15.4   "Guest chef: | *Aries.*"  ♈ Aries hops in, in a ridiculously tall toque: "my famous apology soufflé!"
//               A teeny SORRY shaker: "a pinch of sorry…" One grain falls.
//  15.5–19.8   "Plus one | big *but.*"  A huge sack stencilled BUT slams onto the counter (hit). "and a whole sack of BUT!"
//               It all pours in, the bowl goes in the oven. ARIES, to ♎ Libra, the taste tester: "sorry, but you were
//               being dramatic." Libra's eyes go flat.
//  19.9–22.2   "It's | *rising.*"  The soufflé swells in the oven window, the door bursts, the dome keeps growing over
//               the set, wobbling. Taurus calmly raises a pot lid.
//  22.27       POOF (breakdown): a flour cloud fills the frame. "*POOF.*" The APPLAUSE lamp flashes; one lonely clap.
//               Crickets. Everyone is floured, Aries' hat is flopped and smoking, Taurus (behind the lid) is spotless.
//               ARIES: "…it was the oven."  "Classic | *deflection.*"  Synced eye-roll, womp.
//  27.3        card cut (deal)
//  27.4–30.2   Cancer pops up again with the pot (soup #2). Everyone turns: "NOT NOW, | *CANCER.*" Cancer sinks.
//  30.3–38.0   "Chef Taurus's | *real* recipe."  The card again, three steps that tick: "one: own it." "two: no but."
//               (Taurus nudges the BUT sack off the counter like a cat, staring at the camera; thump) "three: fix it."
//  38.15       card cut (shuffle)
//  38.3–43.7   "Take | *two.*"  ARIES, earnest: "I snapped. I'm sorry. what can I do?" Libra melts. In the back, Pisces
//               lifts what it's been chopping all episode: a cucumber. LIBRA: "…honestly? soup."
//  43.93       Cancer EXPLODES up with the pot (hit, soup #3): "Soup's | *on.*" CANCER: "FINALLY." Two bowls ladled.
//  46.16–50.3  ★ LESSON UNLOCKED: "A real sorry | has no *but*."  +1 ACCOUNTABILITY
//  50.4        card cut (flip)
//  50.5–53.4   "Prep the | hard *talks.*"  A talk card: "When I mess up, what helps most?" Both play, the answers stay hidden,
//               then flip: "own it." · "soup."  TAURUS: "ask before you burn something."
//  53.5–55.45  "Serves *two.*"  Aries and Libra share the soup, hearts; Taurus winks; Pisces holds out an empty bowl, sobbing.
// One canvas (sky + set + cast + props), DOM type, dialogue boxes and the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  INK, rgba, starFrame, inSprite, cellToWorld, apronCells, bibCells, flourCells, tearsCells, bmp, drawToque, drawBowl, drawShaker,
  drawSack, drawPot, drawSoupBowl, drawLid, drawFork, drawSpoon, drawKnife, drawVeg, drawSouffle, drawOven, drawSet, drawRack, drawShelf,
  drawNeon, drawLamp, flourCloud, flourSpecks, confetti, sparkBurst, drawHearts, smoke, sweatDrop, drawCard, drawTalkCard, steamWisps,
} from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BL = 60 / 108
const B = n => +(0.6 + n * BL).toFixed(3)     // the 108 bpm grid
const TAU_ = signStar('taurus'), ARI = signStar('aries'), LIB = signStar('libra'), CAN = signStar('cancer'), PIS = signStar('pisces')
const T_COL = '#ffd27a', A_COL = '#ff7a5c', L_COL = '#ff9ce8', C_COL = '#9fd8ff'
const T_TAG = `${TAU_.glyph}︎ TAURUS`, A_TAG = `${ARI.glyph}︎ ARIES`, L_TAG = `${LIB.glyph}︎ LIBRA`, C_TAG = `${CAN.glyph}︎ CANCER`

// ── the timeline
const T = {
  black: [0, 0.3],
  // 0 · hook
  onAir: 0.3, neon: [0.35, 0.95], h0: 0.15, h0Land: 0.6, h0Out: [3.72, 3.88], openA: 0.75, l0: 0.95, closeA: 3.6, clap0: [B(2), 3.3],
  // 1 · today's dish
  h1: 4.08, h1Land: 4.45, h1Out: [9.62, 9.8], card1: [4.25, 9.55, 9.82], openB: 4.2, l1: 4.4, canUp1: [6.8, 7.12], l2: 7.15, deadpan: 8.35, canDown1: [9.0, 9.45], closeB: 9.45,
  cut1: 10.0,
  // 2 · guest chef
  h2: 10.12, h2Land: 10.45, h2Out: [15.28, 15.44], ariIn: [10.08, 10.5], bowl: 10.65, openC: 10.4, l3: 10.6,
  shaker: [12.95, 15.1], l4: 13.3, shake: [14.05, 14.45], grain: [14.45, 14.75],
  h3: 15.5, h3Land: 15.85, h3Out: [19.7, 19.86], sackDrop: [15.28, B(27)], l5: 15.85, pour: [17.05, 17.8], toOven: [18.0, 18.38], slam: 18.38,
  l6: 18.55, closeC: 21.62,
  // 3 · rising → POOF
  rise: [19.0, 20.6], h4: 19.92, h4Land: 20.25, h4Out: [22.12, 22.24], burst: 20.6, grow: [20.65, B(39) - 0.02], lidUp: [20.9, 21.12],
  poof: B(39), h5: 22.36, h5Out: [25.5, 25.64], clapsAlone: 23.05, crick: [23.45, 24.5], lidDown: [23.65, 23.95],
  openD: 24.3, l7: 24.5, h6: 25.75, h6Land: 26.0, h6Out: [27.08, 27.22], roll: [26.05, 26.95], closeD: 27.15,
  cut2: 27.3,
  // 4 · not now, Cancer
  canUp2: [27.5, 27.82], h7: 27.78, h7Land: 28.05, turn: 28.0, h7Out: [30.02, 30.16], canDown2: [29.25, 29.85],
  // 5 · the real recipe
  h8: 30.35, h8Land: 30.7, h8Out: [37.86, 38.02], card2: [30.45, 37.72, 38.04], openE: 30.6, l8: 30.8, l9: 33.15, nudge: [34.35, 34.75], fall: [34.75, 35.1], l10: 35.6, closeE: 37.95,
  cut3: 38.15,
  // 6 · take two
  h9: 38.3, h9Land: 38.6, h9Out: [43.6, 43.74], openF: 38.3, l11: 38.5, cuke: 40.4, l12: 41.75,
  canUp3: [B(78) - 0.18, B(78)], h10: 44.0, h10Land: 44.3, h10Out: [45.9, 46.04], l13: 44.12, bowlA: 44.6, bowlL: 44.9, closeF: 45.95,
  // 7 · lesson
  lesson: B(82), lessonOut: [50.1, 50.3],
  cut4: 50.4,
  // 8 · talk cards
  h11: 50.5, h11Land: 50.85, h11Out: [53.27, 53.4], talk: [50.52, 53.15, 53.4], playA: 51.0, playL: 51.3, flipA: 52.0, flipL: 52.17,
  openG: 50.62, l14: 50.85, closeG: 53.45,
  // 9 · serves two
  h12: 53.5, h12Land: 53.75, h12Out: [55.02, 55.25], wink: 54.4, out: [55.0, 55.42],
}
const BOX_A = [{ t: T.l0, speaker: T_TAG, color: T_COL, text: 'welcome to *Love Kitchen!*' }]
const BOX_B = [
  { t: T.l1, speaker: T_TAG, color: T_COL, text: 'today we bake an *apology.*' },
  { t: T.l2, speaker: C_TAG, color: C_COL, text: 'I brought *soup!*' },
]
const BOX_C = [
  { t: T.l3, speaker: A_TAG, color: A_COL, text: 'my famous apology *soufflé!*' },
  { t: T.l4, speaker: A_TAG, color: A_COL, text: 'a pinch of *sorry…*' },
  { t: T.l5, speaker: A_TAG, color: A_COL, text: 'and a whole sack of *BUT!*' },
  { t: T.l6, speaker: A_TAG, color: A_COL, text: 'sorry, *but* you were being dramatic.' },
]
const BOX_D = [{ t: T.l7, speaker: A_TAG, color: A_COL, text: '…it was the *oven.*' }]
const BOX_E = [
  { t: T.l8, speaker: T_TAG, color: T_COL, text: 'one: *own it.*' },
  { t: T.l9, speaker: T_TAG, color: T_COL, text: 'two: *no but.*' },
  { t: T.l10, speaker: T_TAG, color: T_COL, text: 'three: *fix it.*' },
]
const BOX_F = [
  { t: T.l11, speaker: A_TAG, color: A_COL, text: "I snapped. I'm sorry. what can I *do?*" },
  { t: T.l12, speaker: L_TAG, color: L_COL, text: '…honestly? *soup.*' },
  { t: T.l13, speaker: C_TAG, color: C_COL, text: '*FINALLY.*' },
]
const BOX_G = [{ t: T.l14, speaker: T_TAG, color: T_COL, text: 'ask *before* you burn something.' }]
const BOXES = [[BOX_A, T.openA, T.closeA], [BOX_B, T.openB, T.closeB], [BOX_C, T.openC, T.closeC], [BOX_D, T.openD, T.closeD], [BOX_E, T.openE, T.closeE], [BOX_F, T.openF, T.closeF], [BOX_G, T.openG, T.closeG]]
const ALL_LINES = BOXES.flatMap(b => b[0])
const CPS = 28
const LT = new Map(BOXES.map(([L]) => [L, lineTimes(L, { cps: CPS })]))
const doneOf = (L, i) => LT.get(L)[i].done
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'A real sorry | has no *but*.', chip: '+1 ACCOUNTABILITY' }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const TAU = Math.PI * 2

// ── staging
const COUNTER = 1150
const OVEN = { x: 34, y: 880, w: 220, h: 512 }
const ARI_P = { x: 365, y: 1040, s: 236 }, TAU_P = { x: 615, y: 1030, s: 288 }, LIB_P = { x: 905, y: 1058, s: 186 }
const CAN_P = { x: 772, up: 1030, down: 1330, s: 200 }, PIS_P = { x: 925, y: 812, s: 112 }
const BOWL_P = { x: 452, y: COUNTER + 4 }, SACK_P = { x: 556, y: COUNTER + 4 }
const DOME = { x: 150, y: 1262 }
const flourOn = t => t >= T.poof + 0.12 && t < T.cut2          // the mess is cleaned up under the deal cut
const staged = t => t >= T.cut4                                   // the last beat re-stages under the flip cut

function ariesPos(t) {
  if (staged(t)) return { x: 690, y: 1046 }
  if (t < T.ariIn[0]) return { x: -200, y: ARI_P.y }
  if (t < T.ariIn[1]) { const p = prog(t, ...T.ariIn); return { x: lerp(-160, ARI_P.x, ease.outCubic(p)), y: ARI_P.y - Math.sin(Math.PI * p) * 160 } }
  let x = ARI_P.x
  if (inR(t, T.grow[0], T.poof)) x += 46 * ease.outCubic(prog(t, T.grow[0], T.grow[0] + 0.8))  // leaning away from the dome
  else if (inR(t, T.poof, T.poof + 0.6)) x += 46 * (1 - prog(t, T.poof, T.poof + 0.6))
  return { x, y: ARI_P.y }
}
function taurusPos(t) {
  if (staged(t)) return { x: 455, y: TAU_P.y }
  let x = TAU_P.x
  if (inR(t, T.nudge[0], T.fall[1] + 0.3)) x -= 34 * bump(t, T.nudge[0], 0.7)
  return { x, y: TAU_P.y }
}
function cancerY(t) {
  const up = (w, s = 2.2) => easeOutBack(prog(t, w[0], w[1]), s)
  const dn = w => ease.inCubic(prog(t, w[0], w[1]))
  let k = 0
  if (inR(t, T.canUp1[0], T.canDown1[1])) k = up(T.canUp1) * (1 - dn(T.canDown1))
  else if (inR(t, T.canUp2[0], T.canDown2[1])) k = up(T.canUp2) * (1 - dn(T.canDown2))
  else if (inR(t, T.canUp3[0], T.cut4)) k = up(T.canUp3, 3)
  return { k, y: lerp(CAN_P.down, CAN_P.up, k) }
}
/** the soufflé's dome radius after the door bursts */
const domeR = t => lerp(80, 420, ease.inQuad(prog(t, ...T.grow)) * 0.6 + prog(t, ...T.grow) * 0.4)

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS())]
function CUTS() { return [3.98, { t: T.cut1, kind: 'flip' }, 15.42, { t: T.cut2, kind: 'deal' }, 30.25, { t: T.cut3, kind: 'shuffle' }, 46.0, { t: T.cut4, kind: 'flip' }, 53.45] }

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "900 200px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 146, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Today on | *Love Kitchen.*', { top: 128, at: T.h0, late: 2, lateAt: T.h0Land, accentColor: PINK, accentSize: 134 }), T.h0Out],
    [H("Today's dish: | the *apology.*", { top: 128, at: T.h1, lateAt: T.h1Land, accentColor: GOLD }), T.h1Out],
    [H('Guest chef: | *Aries.*', { top: 128, at: T.h2, lateAt: T.h2Land, accentColor: A_COL }), T.h2Out],
    [H('Plus one | big *but.*', { top: 128, at: T.h3, lateAt: T.h3Land, accentColor: '#e8a75a' }), T.h3Out],
    [H("It's | *rising.*", { top: 128, at: T.h4, lateAt: T.h4Land, accentColor: '#ffd36a' }), T.h4Out],
    [H('*POOF.*', { top: 150, size: 120, accentSize: 220, at: T.h5, lateAt: T.h5, accentColor: '#ffffff' }), T.h5Out],
    [H('Classic | *deflection.*', { top: 128, at: T.h6, lateAt: T.h6Land, accentColor: A_COL }), T.h6Out],
    [H('NOT NOW, | *CANCER.*', { top: 128, at: T.h7, lateAt: T.h7Land, accentColor: C_COL }), T.h7Out],
    [H("Chef Taurus's | *real* recipe.", { top: 128, at: T.h8, late: 2, lateAt: T.h8Land, accentColor: T_COL }), T.h8Out],
    [H('Take | *two.*', { top: 128, at: T.h9, lateAt: T.h9Land, accentColor: A_COL }), T.h9Out],
    [H("Soup's | *on.*", { top: 128, at: T.h10, lateAt: T.h10Land, accentColor: C_COL }), T.h10Out],
    [H('Prep the | hard *talks.*', { top: 128, at: T.h11, lateAt: T.h11Land, accentColor: GOLD }), T.h11Out],
    [H('Serves *two.*', { top: 150, size: 116, accentSize: 176, at: T.h12, lateAt: T.h12Land, accentColor: PINK }), T.h12Out],
  ]
  const BOX = { y: 1450, width: 960, height: 270, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── hops
  const T_HOPS = [...talkHops(ALL_LINES, T_TAG, { cps: CPS }), T.turn, T.nudge[0], T.wink, T.h12Land, T.lesson + 0.1]
  const A_HOPS = [...talkHops(ALL_LINES, A_TAG, { cps: CPS }), T.ariIn[1], T.sackDrop[1], T.turn, doneOf(BOX_E, 0) + 0.1, doneOf(BOX_E, 1) + 0.1, doneOf(BOX_E, 2) + 0.1, T.bowlA + 0.2, T.h12Land + 0.1, T.lesson + 0.15]
  const L_HOPS = [...talkHops(ALL_LINES, L_TAG, { cps: CPS }), T.turn, T.bowlL + 0.2, T.h12Land + 0.2, T.lesson + 0.2]
  const C_HOPS = [...talkHops(ALL_LINES, C_TAG, { cps: CPS }), T.canUp1[1] + 0.3, T.canUp3[1] + 0.05, T.canUp3[1] + 0.6]
  const P_HOPS = [T.cuke, T.turn, T.h12Land + 0.15]

  // ── moods
  function taurusState(t) {
    const st = { mood: 'happy', look: [0, 0], squash: 0 }
    if (t < T.l1) st.mood = t < T.l0 + 1.2 ? 'sparkle' : 'happy'
    else if (t < T.canUp1[0]) { st.mood = 'happy'; st.look = [0, 0] }
    else if (t < T.deadpan) { st.mood = 'neutral'; st.look = [1, 0] }
    else if (t < T.ariIn[0]) { st.mood = 'squint'; st.look = [0, 0] }                 // the look to camera
    else if (t < T.sackDrop[1]) { st.mood = 'happy'; st.look = [-1, 0] }
    else if (t < T.sackDrop[1] + 0.8) { st.mood = 'wide'; st.look = [-1, 1] }
    else if (t < T.l6) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.rise[0] + 0.6) { st.mood = 'squint'; st.look = [0, 0] }
    else if (t < T.poof) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.roll[0]) { st.mood = 'squint'; st.look = [0, 0] }
    else if (t < T.roll[1]) st.mood = 'eyeroll'
    else if (t < T.cut2) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.turn) { st.mood = 'neutral'; st.look = [0, 0] }
    else if (t < T.canDown2[1]) { st.mood = 'wide'; st.look = [1, 0]; st.squash = 0.1 * bump(t, T.turn, 0.4) }
    else if (t < T.nudge[0]) { st.mood = inR(t, T.l8, T.l10 + 2) ? 'happy' : 'neutral'; st.look = [0, 0] }
    else if (t < T.fall[1] + 0.6) { st.mood = 'neutral'; st.look = [0, 0] }            // the cat stare
    else if (t < T.cut3) { st.mood = 'happy'; st.look = [0, 0] }
    else if (t < T.l12) { st.mood = 'sparkle'; st.look = [-1, 0] }
    else if (t < T.canUp3[0]) { st.mood = 'neutral'; st.look = [1, 0] }
    else if (t < T.lesson) { st.mood = t < T.canUp3[1] + 0.6 ? 'wide' : 'happy'; st.look = [1, 0] }
    else if (t < T.wink) { st.mood = 'happy' }
    else st.mood = t < T.wink + 0.9 ? 'wink' : 'happy'
    return st
  }
  function ariesState(t) {
    const st = { mood: 'sparkle', look: [1, 0], squash: 0, sweat: 0 }
    if (t < T.l4) { st.mood = 'sparkle'; st.look = [0, 0] }
    else if (t < T.sackDrop[1]) { st.mood = 'happy'; st.look = [1, 1] }
    else if (t < T.l6) { st.mood = inR(t, T.pour[0], T.pour[1]) ? 'squint' : 'happy'; st.look = [1, 1] }
    else if (t < T.rise[0] + 0.5) { st.mood = 'neutral'; st.look = [1, 0] }
    else if (t < T.burst) { st.mood = 'wide'; st.look = [-1, 0] }
    else if (t < T.poof) { st.mood = 'wide'; st.look = [-1, -1]; st.sweat = 1 }
    else if (t < T.l7) { st.mood = 'wide'; st.look = [0, 0] }
    else if (t < T.cut2) { st.mood = t < doneOf(BOX_D, 0) + 0.3 ? 'neutral' : 'happy'; st.look = [0, 0]; st.sweat = t > T.roll[0] ? 1 : 0 }
    else if (t < T.turn) { st.mood = 'neutral'; st.look = [1, 0] }
    else if (t < T.canDown2[1]) { st.mood = 'wide'; st.look = [1, 0]; st.squash = 0.1 * bump(t, T.turn, 0.4) }
    else if (t < T.cut3) { st.mood = 'wide'; st.look = [1, 0] }                        // taking notes, very seriously
    else if (t < T.l12) { st.mood = 'sparkle'; st.look = [1, 0] }
    else if (t < T.canUp3[1]) { st.mood = 'wide'; st.look = [1, 0] }
    else if (t < T.lesson) { st.mood = t > T.bowlA ? 'heart' : 'wide'; st.look = [1, 0] }
    else st.mood = staged(t) ? (t > T.h12 ? 'heart' : 'happy') : 'happy'
    return st
  }
  function libraState(t) {
    const st = { mood: 'neutral', look: [-1, 0], squash: 0 }
    if (t < T.ariIn[0]) { st.mood = 'happy'; st.look = t > T.canUp1[0] ? [-1, -1] : [-1, 0] }
    else if (t < T.sackDrop[1]) { st.mood = 'happy'; st.look = [-1, 0] }
    else if (t < T.l6) { st.mood = 'wide'; st.look = [-1, 0] }
    else if (t < T.rise[0] + 0.8) { st.mood = t < doneOf(BOX_C, 3) - 0.3 ? 'neutral' : 'squint'; st.look = [-1, 0] }
    else if (t < T.poof) { st.mood = 'wide'; st.look = [-1, -1] }
    else if (t < T.roll[0]) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.roll[1]) st.mood = 'eyeroll'
    else if (t < T.cut2) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.turn) { st.mood = 'neutral'; st.look = [-1, 0] }
    else if (t < T.canDown2[1]) { st.mood = 'wide'; st.look = [-1, 0]; st.squash = 0.1 * bump(t, T.turn, 0.4) }
    else if (t < T.cut3) { st.mood = 'happy'; st.look = [-1, 0] }
    else if (t < doneOf(BOX_F, 0)) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.canUp3[0]) { st.mood = t < T.l12 ? 'wide' : 'sparkle'; st.look = t < T.l12 ? [-1, 0] : [0, 0] }
    else if (t < T.lesson) { st.mood = t > T.bowlL ? 'heart' : 'wide'; st.look = [-1, 0] }
    else st.mood = t > T.h12 ? 'heart' : 'happy'
    return st
  }

  // ── the cast
  function drawTaurus(t) {
    const p = taurusPos(t), st = taurusState(t), s = TAU_P.s
    const opts = { color: TAU_.color, glyph: TAU_.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: T_HOPS, seed: 8, bob: 6, glow: 0.9 }
    drawStarChar(x, p.x, p.y, s, t, opts)
    const F = starFrame(p.x, p.y, s, t, opts)
    inSprite(x, F, () => apronCells(x))
    const [hx, hy] = cellToWorld(F, 18, 3.6)
    drawToque(x, hx, hy, F.cell * 0.95, { tall: 2, rot: 0.04 * Math.sin(t * 1.3) })
    return F
  }
  function drawAries(t) {
    const p = ariesPos(t)
    if (p.x < -150) return null
    const st = ariesState(t), s = ARI_P.s
    const tilt = inR(t, T.grow[0], T.poof + 0.6) ? 0.12 * clamp(prog(t, T.grow[0], T.grow[0] + 0.6)) * (t < T.poof ? 1 : 1 - prog(t, T.poof, T.poof + 0.6)) : 0
    const opts = { color: ARI.color, glyph: ARI.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: A_HOPS, seed: 3, bob: 7, glow: 0.9 }
    x.save(); x.translate(p.x, p.y + 100); x.rotate(tilt); x.translate(-p.x, -(p.y + 100))
    drawStarChar(x, p.x, p.y, s, t, opts)
    const F = starFrame(p.x, p.y, s, t, opts)
    if (flourOn(t)) inSprite(x, F, () => flourCells(x, clamp(prog(t, T.poof + 0.12, T.poof + 0.5)), 3))
    const [hx, hy] = cellToWorld(F, 18, 3.6)
    const flop = flourOn(t) ? easeOutBack(prog(t, T.poof + 0.2, T.poof + 0.6), 2) : 0
    drawToque(x, hx, hy, F.cell * 0.9, { tall: 10, rot: 0.06 * Math.sin(t * 1.7 + 1), flop, soot: flourOn(t) ? 0.75 : 0 })
    if (flourOn(t)) smoke(x, t, hx + 30, hy - 60, 5, 1 - prog(t, T.cut2 - 0.6, T.cut2))
    if (st.sweat) sweatDrop(x, t, hx + 80, hy + 60, 5)
    x.restore()
    return F
  }
  function drawLibra(t) {
    const p = LIB_P, st = libraState(t)
    const opts = { color: LIB.color, glyph: LIB.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: L_HOPS, seed: 5, bob: 5, glow: 0.85 }
    drawStarChar(x, p.x, p.y, p.s, t, opts)
    const F = starFrame(p.x, p.y, p.s, t, opts)
    inSprite(x, F, () => { bibCells(x); if (flourOn(t)) flourCells(x, clamp(prog(t, T.poof + 0.12, T.poof + 0.5)), 9) })
    // the taste-tester's fork, held up
    if (!staged(t) || t < T.h12) { const [fx, fy] = cellToWorld(F, 33, 15); drawFork(x, fx, fy - 30, 5, 0.12 + 0.05 * Math.sin(t * 2), 1) }
    return F
  }
  function drawCancer(t) {
    const { k, y } = cancerY(t)
    if (k <= 0.001 || staged(t)) return
    const third = t >= T.canUp3[0]
    let mood = 'happy', look = [0, 0]
    if (inR(t, T.canUp2[0], T.canDown2[1])) { mood = t < T.turn ? 'sparkle' : t < T.canDown2[0] ? 'wide' : 'squint'; look = t < T.turn ? [0, 0] : [-1, 1] }
    if (third) mood = t < T.l13 + 0.9 ? 'wide' : 'sparkle'
    if (inR(t, T.canUp1[0], T.canDown1[1])) mood = t > T.deadpan ? 'happy' : 'sparkle'
    const opts = { color: CAN.color, glyph: CAN.glyph, mood, look, hops: C_HOPS, seed: 12, bob: 5, glow: 0.85, squash: third ? 0.12 * bump(t, T.canUp3[1], 0.35) : 0 }
    drawStarChar(x, CAN_P.x, y, CAN_P.s, t, opts)
    const F = starFrame(CAN_P.x, y, CAN_P.s, t, opts)
    // the pot, held overhead; on the third time it's raised in triumph
    const [px_, py_] = cellToWorld(F, 18, 2)
    const lift = third ? 30 * ease.outCubic(prog(t, T.canUp3[1], T.canUp3[1] + 0.3)) : 0
    drawPot(x, t, px_, py_ - 4 - lift, 7, { rot: third ? 0.08 * Math.sin(t * 6) : 0.04 * Math.sin(t * 3) })
    if (third) sparkBurst(x, t, px_, py_ - 60, T.canUp3[1], { n: 14, R: 240, size: 30, seed: 7, life: 0.8 })
  }
  function drawPisces(t) {
    const p = PIS_P
    let tears = 2, mood = 'sparkle', look = [0, 1]
    if (inR(t, T.turn, T.canDown2[1])) { look = [-1, 0]; mood = 'wide' }
    if (t >= T.l11 + 0.4 && t < T.lesson) tears = 3
    if (t >= T.cuke && t < T.cut4) look = [0, 0]
    if (staged(t) && t >= T.h12) { tears = 3; look = [0, 0] }
    const opts = { color: PIS.color, mood, look, hops: P_HOPS, seed: 19, bob: 3, glow: 0.7 }
    drawStarChar(x, p.x, p.y, p.s, t, opts)
    const F = starFrame(p.x, p.y, p.s, t, opts)
    inSprite(x, F, () => tearsCells(x, t, tears))
    if (t < T.cuke || staged(t)) {
      // chopping, every beat, crying the whole time ("it's the onions")
      if (!staged(t)) {
        const ph = ((t - 0.6) / BL) % 1, up = ph < 0.5 ? ease.outCubic(ph * 2) : 1 - ease.inCubic((ph - 0.5) * 2)
        drawVeg(x, p.x - 6, 852, 3)
        drawKnife(x, p.x + 30, 840 - up * 30, 3, -0.15 - up * 0.4)
      } else if (t >= T.h12) {
        // an empty bowl held out, hopefully
        drawSoupBowl(x, t, p.x - 2, 878 - 10 * pop01(t, T.h12 + 0.3), 4, { steam: 0, alpha: pop01(t, T.h12 + 0.3) })
      }
    } else {
      // the reveal: it was a cucumber the whole time
      const k = pop01(t, T.cuke, 0.35, 2.4)
      drawVeg(x, p.x, lerp(852, 742, k), 4, { rot: -0.25 + 0.05 * Math.sin(t * 5) })
      const ck = pop01(t, T.cuke + 0.25, 0.3, 2.4) * (t < T.lesson ? 1 : 0)
      if (ck > 0.01) {
        x.save(); x.translate(p.x - 40, 690); x.scale(ck, ck)
        x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const label = "(it's a cucumber)", tw = x.measureText(label).width + 28
        x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-tw / 2, -24, tw, 48); x.fillStyle = '#7fe08a'; x.fillRect(-tw / 2, 20, tw, 4)
        x.fillStyle = BONE; x.fillText(label, 0, 2); x.restore()
      }
    }
  }

  // ── props on the counter
  function drawCounterProps(t) {
    // the mixing bowl: pops on, gets the SORRY grain and the BUT pour, then flies into the oven
    if (t >= T.bowl && t < T.toOven[1]) {
      const k = pop01(t, T.bowl, 0.3, 2.4)
      const u = ease.inOutCubic(prog(t, ...T.toOven))
      const bx = lerp(BOWL_P.x, OVEN.x + OVEN.w / 2, u), by = lerp(BOWL_P.y, 1140, u) - Math.sin(Math.PI * u) * 220
      const fillCol = t > T.pour[0] + 0.2 ? '#c99a5a' : '#f7e7b0'
      drawBowl(x, bx, by, 6 * k * lerp(1, 0.6, u), { fill: fillCol, rot: u * 0.6 })
    }
    // the SORRY shaker: teeny
    if (t >= T.shaker[0] && t < T.shaker[1]) {
      const k = pop01(t, T.shaker[0], 0.3, 2.4) * outK(t, [T.shaker[1] - 0.2, T.shaker[1]])
      const shk = inR(t, ...T.shake) ? Math.sin((t - T.shake[0]) * 50) * 0.5 : 0
      const sx = BOWL_P.x + 6, sy = 1012 + (inR(t, ...T.shake) ? -10 : 0)
      drawShaker(x, sx, sy, 6 * k, { rot: Math.PI + shk })
      if (k > 0.5) {
        x.save(); x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('SORRY', sx, sy - 70); x.fillStyle = BONE; x.fillText('SORRY', sx, sy - 70)
        x.font = `700 20px ${MONO}`; x.strokeText('(1 grain)', sx, sy - 42); x.fillStyle = '#c9a6ff'; x.fillText('(1 grain)', sx, sy - 42); x.restore()
      }
      // one grain
      if (inR(t, ...T.grain)) { const u = prog(t, ...T.grain); x.fillStyle = '#ffffff'; x.fillRect(sx - 3, sy + 8 + u * 100, 6, 6) }
    }
    if (inR(t, T.grain[1], T.grain[1] + 0.5)) sparkBurst(x, t, BOWL_P.x, BOWL_P.y - 40, T.grain[1], { n: 4, R: 30, size: 12, seed: 2, life: 0.4 })
    // the BUT sack: slams down, pours, then gets nudged off the counter by Taurus (cat-style)
    if (t >= T.sackDrop[0] && t < T.fall[1] + 0.1) {
      let sx = SACK_P.x, sy = SACK_P.y, rot = 0
      if (t < T.sackDrop[1]) { const u = ease.inQuad(prog(t, ...T.sackDrop)); sy = lerp(-200, SACK_P.y, u) }
      const sq = bump(t, T.sackDrop[1], 0.25) * 0.12
      // the pour: the sack lifts and tips over the bowl, mouth down
      const pk = inR(t, T.pour[0] - 0.2, T.pour[1] + 0.3) ? ease.inOutCubic(prog(t, T.pour[0] - 0.2, T.pour[0] + 0.1)) * (1 - ease.inOutCubic(prog(t, T.pour[1], T.pour[1] + 0.3))) : 0
      let pcx = 0, pcy = 0
      if (pk > 0) { pcx = lerp(0, BOWL_P.x + 70 - SACK_P.x, pk); pcy = lerp(0, -150, pk) + Math.sin(t * 30) * 3 * pk; rot = -2.0 * pk }
      if (t >= T.nudge[0]) { const u = ease.inOutCubic(prog(t, ...T.nudge)); sx = lerp(SACK_P.x, SACK_P.x - 70, u); sy = lerp(SACK_P.y, SACK_P.y + 30, u); rot = -0.15 * u }
      if (t >= T.fall[0]) { const u = prog(t, ...T.fall); sy = SACK_P.y + 30 + u * u * 800; rot = -0.15 - u * 1.4 }
      x.save(); x.translate(sx, sy); x.scale(1 + sq, 1 - sq); x.translate(-sx, -sy)
      if (pk > 0) { const cx = sx + pcx, cy = sy - 77 + pcy; x.translate(cx, cy); x.rotate(rot); drawSack(x, 0, 77, 11, { flour: 0 }) }
      else drawSack(x, sx, sy, 11, { rot, flour: flourOn(t) ? 1 : 0 })
      x.restore()
      if (t >= T.sackDrop[1]) sparkBurst(x, t, SACK_P.x, SACK_P.y - 10, T.sackDrop[1], { n: 10, R: 150, size: 22, seed: 4, cols: ['#e8c48e', '#c79a5b', BONE], life: 0.55 })
      // the pour: little BUTs tumbling into the bowl
      if (inR(t, T.pour[0] + 0.2, T.pour[1] + 0.1)) {
        x.save(); x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        for (let i = 0; i < 6; i++) {
          const ph = ((t - T.pour[0]) * 2.4 + i / 6) % 1, wx = lerp(BOWL_P.x - 10, BOWL_P.x + (i % 3 - 1) * 16, ph), wy = lerp(1000, 1125, ph * ph)
          x.globalAlpha = Math.sin(Math.PI * ph); x.lineWidth = 6; x.strokeStyle = INK; x.strokeText('but', wx, wy); x.fillStyle = '#f0d9a8'; x.fillText('but', wx, wy)
        }
        x.restore()
      }
    }
    // the soup bowls (ladled at the payoff; re-staged for "serves two")
    if (t >= T.bowlA) {
      const pa = staged(t) ? { x: 690 - 66 } : { x: ARI_P.x + 60 }, pl = staged(t) ? { x: 905 - 80 } : { x: LIB_P.x - 76 }
      drawSoupBowl(x, t, pa.x, COUNTER + 4, 7 * pop01(t, T.bowlA, 0.3, 2.4))
      if (t >= T.bowlL) drawSoupBowl(x, t, pl.x, COUNTER + 4, 7 * pop01(t, T.bowlL, 0.3, 2.4))
      if (staged(t) && t >= T.h12) {
        // two spoons, in sync
        const dip = Math.max(0, Math.sin((t - T.h12) * 5))
        drawSpoon(x, pa.x + 34, COUNTER - 90 + dip * 26, 5, 0.4)
        drawSpoon(x, pl.x - 30, COUNTER - 90 + dip * 26, 5, -0.4)
      }
    }
  }

  // ── the soufflé (inside the oven window, then out through the door)
  function ovenInside(t, wx, wy, ww, wh, isWindow) {
    if (t < T.slam || t >= T.cut2) return
    if (isWindow && t < T.burst) {
      const r = lerp(20, 78, ease.inQuad(prog(t, T.rise[0], T.rise[1])))
      drawSouffle(x, t, wx + ww / 2, wy + wh - 16, r, { wob: prog(t, T.rise[0] + 0.8, T.burst), glow: 0.8 })
    }
  }
  function drawDome(t) {
    if (t >= T.burst && t < T.poof) {
      const r = domeR(t), wob = 0.6 + 0.8 * prog(t, T.grow[0], T.poof)
      // the dome rises out of the open door, its base hidden inside the oven
      x.save(); x.beginPath(); x.rect(-200, 0, 1500, DOME.y - 2); x.clip()
      drawSouffle(x, t, DOME.x + r * 0.15, DOME.y + 30, r, { wob, glow: 1, cracks: 1 })
      x.restore()
      // strained creaks: a little shiver of lines
      if (t > T.poof - 0.6) { x.save(); x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 6; for (let i = 0; i < 5; i++) { const a = -Math.PI * (0.1 + i * 0.2), rr = r * 1.15 + 20 * Math.sin(t * 40 + i); x.beginPath(); x.moveTo(DOME.x + Math.cos(a) * rr, DOME.y + Math.sin(a) * rr); x.lineTo(DOME.x + Math.cos(a) * (rr + 40), DOME.y + Math.sin(a) * (rr + 40)); x.stroke() } x.restore() }
    }
    // after the poof: a sad, flat soufflé sitting on the open door
    if (flourOn(t) && t > T.poof + 0.4) {
      x.save(); x.translate(DOME.x - 6, 1392); x.scale(1, 0.35); drawSouffle(x, t, 0, 0, 52, { cracks: 1 }); x.restore()
    }
  }

  // ── the talk card (tie-in)
  function talkCardAt(t) {
    if (t < T.talk[0] || t >= T.talk[2]) return
    const k = easeOutBack(prog(t, T.talk[0], T.talk[0] + 0.4), 1.8) * (1 - ease.inCubic(prog(t, T.talk[1], T.talk[2])))
    if (k <= 0.01) return
    x.save(); x.globalAlpha = clamp(k); x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(0, 0, W, 1920); x.restore()
    x.save(); x.translate(540, 960); x.scale(k, k); x.translate(-540, -960)
    drawTalkCard(x, t, { x: 140, y: 560, w: 800, h: 720 }, {
      played: [prog(t, T.playA, T.playA + 0.3), prog(t, T.playL, T.playL + 0.3)],
      flip: [prog(t, T.flipA, T.flipA + 0.3), prog(t, T.flipL, T.flipL + 0.3)],
    })
    x.restore()
    if (t > T.flipL + 0.3) sparkBurst(x, t, 540, 1000, T.flipL + 0.3, { n: 10, R: 300, size: 26, seed: 6 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = popOut(t, T.out)
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1100); x.scale(lerp(0.85, 1, clamp(o)), lerp(0.85, 1, clamp(o))); x.translate(-540, -1100)
        // signs + rack (behind the cast)
        const neonOn = t < T.neon[0] ? 0 : t < T.neon[1] ? ([0, 1, 0, 1, 1, 0, 1][Math.floor((t - T.neon[0]) / (T.neon[1] - T.neon[0]) * 7)] || 0) : 1
        drawNeon(x, t, { x: 540, y: 520, on: neonOn })
        drawLamp(x, t, { x: 60, y: 596, w: 190, h: 60, text: 'ON AIR', col: '#ff3b4e', on: t >= T.onAir ? 1 : 0 })
        const applause = inR(t, T.clap0[0], T.clap0[1]) || inR(t, T.poof + 0.3, T.poof + 1.3) || inR(t, T.canUp3[1], T.closeF) || t >= T.h12Land
        const blinkA = applause && (Math.floor(t * 6) % 2 === 0 || inR(t, T.poof + 0.3, T.poof + 1.3) === false) ? 1 : 0
        drawLamp(x, t, { x: 820, y: 596, w: 210, h: 60, text: 'APPLAUSE', col: '#ffb43c', on: blinkA })
        drawRack(x, t, { y: 690 })
        drawShelf(x, { x: 830, y: 870, w: 190 })
        drawPisces(t)
        // the cast (behind the counter)
        drawAries(t)
        drawTaurus(t)
        drawLibra(t)
        drawCancer(t)
        // the counter + the oven
        drawSet(x, t, { counterY: COUNTER, flour: flourOn(t) ? 1 : 0 })
        const doorOpen = t >= T.burst && t < T.cut2 ? easeOutBack(prog(t, T.burst, T.burst + 0.2), 2.4) : 0
        const shake = inR(t, T.rise[0] + 0.6, T.poof) ? prog(t, T.rise[0] + 0.6, T.poof) : inR(t, T.slam, T.slam + 0.2) ? 1 : 0
        drawOven(x, t, OVEN, { open: Math.min(1, doorOpen), heat: t >= T.slam && t < T.cut2 ? 1 : 0, shake, flour: flourOn(t) ? 1 : 0, temp: t >= T.slam && t < T.cut2 ? (t > T.burst ? '999°' : '350°') : '350°', inside: (a, b, c, d, w) => ovenInside(t, a, b, c, d, w) })
        drawCounterProps(t)
        drawDome(t)
        // Taurus' lid shield
        if (t >= T.lidUp[0] && t < T.lidDown[1]) {
          const up = ease.outCubic(prog(t, ...T.lidUp)), dn = ease.inCubic(prog(t, ...T.lidDown))
          const k = up * (1 - dn), tp = taurusPos(t)
          drawLid(x, tp.x - 20, lerp(1210, 1012, k), 9, { rot: -0.1 * k })
        }
        // the POOF
        flourCloud(x, t, T.poof, DOME.x + 60, 1020, { R: 900, life: 1.5 })
        if (inR(t, T.poof, T.poof + 0.2)) { x.save(); x.globalAlpha = 1 - prog(t, T.poof, T.poof + 0.2); x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, 1920); x.restore() }
        flourSpecks(x, t, T.poof + 0.5, { life: 3.2 })
        // crickets in the silence
        if (inR(t, ...T.crick)) {
          x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#9cf08a'
          for (let i = 0; i < 3; i++) { const t0 = T.crick[0] + i * 0.36, kk = t - t0; if (kk < 0 || kk > 0.6) continue; x.globalAlpha = Math.sin(Math.PI * kk / 0.6) * 0.9; x.fillText('chirp.', [300, 800, 560][i], [1310, 1290, 1340][i] - kk * 16) }
          x.globalAlpha = 1
        }
        // the payoffs
        if (t >= T.canUp3[1]) confetti(x, t, T.canUp3[1] + 0.05, { x0: CAN_P.x, y0: 900, n: 60, seed: 3 })
        if (t >= T.bowlL) drawHearts(x, t, T.bowlL + 0.2, 640, 950, { n: 6, px: 6, spread: 520, life: 1.6 })
        if (staged(t) && t >= T.h12) drawHearts(x, t, T.h12 + 0.2, 800, 940, { n: 6, px: 7, spread: 220, life: 1.5, loop: true })
        // the recipe cards
        for (const [win, kind] of [[T.card1, 'dish'], [T.card2, 'real']]) {
          if (t < win[0] || t >= win[2]) continue
          const k = easeOutBack(prog(t, win[0], win[0] + 0.35), 1.8) * (1 - ease.inCubic(prog(t, win[1], win[2])))
          if (k <= 0.01) continue
          x.save(); x.translate(540, 600); x.rotate((1 - k) * -0.2 - 0.015); x.scale(k, k); x.translate(-540, -600)
          drawCard(x, t, { x: 120, y: 452, w: 840, h: kind === 'dish' ? 280 : 350 }, {
            kind,
            ticks: [prog(t, doneOf(BOX_E, 0) + 0.05, doneOf(BOX_E, 0) + 0.35), prog(t, doneOf(BOX_E, 1) + 0.05, doneOf(BOX_E, 1) + 0.35), prog(t, doneOf(BOX_E, 2) + 0.05, doneOf(BOX_E, 2) + 0.35)],
            strike: prog(t, doneOf(BOX_E, 1) + 0.1, doneOf(BOX_E, 1) + 0.4),
          })
          x.restore()
        }
        talkCardAt(t)
        x.restore()
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell are written in D major and the engine moves them into the score's key; chips are written
//    directly in the score's E-major / F#-dorian notes)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const E = { E4: 329.63, Gs4: 415.3, B4: 493.88, Cs5: 554.37, E5: 659.25, Fs5: 739.99, Gs5: 830.61, A5: 880, B5: 987.77, Cs6: 1108.73, E6: 1318.51, Fs6: 1479.98 }
const FX = { rev: 0.06, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, ...FX, ...o }]
const point = t => [chip(t, E.B5, 0.07, { gain: 0.03 }), chip(t + 0.07, E.E6, 0.07, { gain: 0.03 }), chip(t + 0.14, E.Gs5 * 2, 0.2, { gain: 0.03, decay: 0.15 }), ['tick', +t.toFixed(3), 0.04]]
const womp = t => [[E.Fs5, 0], [E.E5, 0.16], [E.Cs5, 0.32], [E.B4, 0.48]].map(([f, d], i) => chip(t + d, f, i === 3 ? 0.5 : 0.15, { duty: 0.5, gain: 0.035, slide: i === 3 ? -4 : 0, decay: 0.1 }))
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => chip(t0 + d, 4400, 0.03, { gain: 0.022, decay: 0.02, sustain: 0.7, pan }))
const claps = (t0, t1, seed, g = 1) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.1 + r() * 0.06) * (1 - p * 0.85) * g, pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const thud = (t, g = 1) => [['boom', +t.toFixed(3), 0.14 * g], ['tom', +t.toFixed(3), 90, { gain: 0.3 * g, decay: 0.3 }], chip(t, 400, 0.12, { wave: 'noise', gain: 0.03 * g, decay: 0.1, sustain: 0 })]

export const CUES = [
  // 0 · hook
  ['tick', T.onAir, 0.06], chip(T.onAir, 120, 0.12, { wave: 'tri', gain: 0.05, decay: 0.1, sustain: 0 }), ['pop', T.onAir + 0.02, 440, 0.04, -0.4],
  ...[0, 1, 3, 4, 6].map(i => chip(T.neon[0] + i * (T.neon[1] - T.neon[0]) / 7, 60, 0.07, { wave: 'noise', gain: 0.02, decay: 0.05, sustain: 0.3 })),
  ...head(T.h0, 2, T.h0Land, 0),
  ['crash', B(2), { gain: 0.04, len: 1.6 }], ...claps(B(2), 3.3, 3, 0.9),
  // 1 · today's dish
  ...head(T.h1, 2, T.h1Land, 2), ['whoosh', T.card1[0] + 0.15, 0.35, 0.04], ['pop', T.card1[0] + 0.3, 880, 0.035, 0],
  ['pop', T.canUp1[0] + 0.05, 523.25, 0.045, 0.4], ['bell', T.canUp1[1], 1567.98, 0.03, 0.9, 0.4],
  chip(T.deadpan, E.B4, 0.25, { duty: 0.5, gain: 0.03, slide: -3 }), chip(T.deadpan + 0.28, E.Gs4, 0.45, { duty: 0.5, gain: 0.03, slide: -5 }),
  ['whoosh', T.canDown1[0] + 0.25, 0.3, 0.03], ['whoosh', T.card1[1] + 0.15, 0.3, 0.03],
  // 2 · guest chef
  ...head(T.h2, 2, T.h2Land, 1), ['whoosh', T.ariIn[0] + 0.3, 0.45, 0.05], ['pop', T.ariIn[1], 392, 0.05, -0.3], ['pop', T.bowl + 0.05, 659.25, 0.035, -0.1],
  ['pop', T.shaker[0] + 0.05, 1174.66, 0.035, -0.1],
  ...Array.from({ length: 6 }, (_, i) => chip(T.shake[0] + i * 0.065, 3200, 0.04, { wave: 'noise', gain: 0.02, decay: 0.03, sustain: 0 })),
  ['tick', T.grain[1], 0.05], ['bell', T.grain[1] + 0.02, 2349.3, 0.012, 0.5, -0.1],
  ...head(T.h3, 2, T.h3Land, 3),
  ['whoosh', T.sackDrop[0] + 0.2, 0.3, 0.05], ...thud(T.sackDrop[1], 1.1),
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.pour[0] + 0.2 + i * 0.06).toFixed(3), [330, 294, 262, 247][i % 4], 0.025, 0.1]),
  ['whoosh', T.toOven[0] + 0.25, 0.35, 0.05], ['boom', T.slam, 0.08], chip(T.slam, 900, 0.08, { wave: 'noise', gain: 0.04, decay: 0.06, sustain: 0 }), ['tick', T.slam + 0.01, 0.06],
  // 3 · rising → POOF
  ...head(T.h4, 2, T.h4Land, 4),
  ['riser', T.rise[0], T.poof, 0.06], chip(T.rise[0], 70, T.poof - T.rise[0], { wave: 'tri', gain: 0.045, vib: 0.06, decay: 2.5, sustain: 1, slide: 6 }),
  ...Array.from({ length: 14 }, (_, i) => chip(T.rise[0] + 0.2 + i * 0.22, E.E5 * 2 ** ((i * 1) / 12), 0.08, { gain: 0.018, duty: 0.125 })),
  ['pop', T.burst, 220, 0.06, -0.5], ['boom', T.burst, 0.08], ['whoosh', T.burst + 0.2, 0.4, 0.05],
  ...Array.from({ length: 10 }, (_, i) => chip(T.grow[0] + i * 0.15, 180 + i * 18, 0.12, { duty: 0.5, gain: 0.02, vib: 0.2, decay: 0.1 })),
  ['pop', T.lidUp[1], 1318.51, 0.035, 0.2], ['tick', T.lidUp[1], 0.05],
  ['boom', T.poof, 0.4], ['crash', T.poof, { gain: 0.07, len: 2.4 }], ['swell', T.poof - 0.25, T.poof, { gain: 0.06, f0: 800, f1: 8000 }], ['tapeStop', T.poof - 0.05, 0.35],
  chip(T.poof, 2000, 0.6, { wave: 'noise', gain: 0.06, decay: 0.5, sustain: 0.2 }),
  ['pop', T.h5, 1174.66, 0.05, 0], ['pluck', T.h5 + 0.04, 587.33, 0.04, 0.8, 0],
  ['clap', T.clapsAlone, { gain: 0.16, pan: 0.5, rev: 0.4, bus: 'fx' }],
  ...[0, 1, 2].flatMap(i => chirp(T.crick[0] + i * 0.36 + 0.02, [-0.5, 0.5, 0][i])),
  ['pop', T.lidDown[1], 523.25, 0.03, 0.2],
  ...head(T.h6, 2, T.h6Land, 2), ...womp(T.roll[0] + 0.05),
  // 4 · not now, Cancer
  ['pop', T.canUp2[0] + 0.05, 523.25, 0.045, 0.4], ['bell', T.canUp2[1], 1567.98, 0.03, 0.9, 0.4],
  ...head(T.h7, 2, T.h7Land, 0), ['crash', T.turn, { gain: 0.05, len: 1.2 }], ['boom', T.turn, 0.12],
  chip(T.canDown2[0], E.B5, 0.6, { duty: 0.5, slide: -14, gain: 0.03, decay: 0.5 }),
  // 5 · the real recipe
  ...head(T.h8, 3, T.h8Land, 1), ['whoosh', T.card2[0] + 0.15, 0.35, 0.04], ['pop', T.card2[0] + 0.3, 880, 0.035, 0],
  ...point(doneOf(BOX_E, 0) + 0.05), ...point(doneOf(BOX_E, 1) + 0.05), ...point(doneOf(BOX_E, 2) + 0.05),
  ...Array.from({ length: 4 }, (_, i) => chip(doneOf(BOX_E, 1) + 0.1 + i * 0.05, 1800, 0.04, { wave: 'noise', gain: 0.018, decay: 0.03, sustain: 0 })),
  ['tick', T.nudge[0] + 0.1, 0.04], ['tick', T.nudge[0] + 0.25, 0.04], ['whoosh', T.fall[0] + 0.2, 0.3, 0.04], ...thud(T.fall[1], 0.9),
  ['whoosh', T.card2[1] + 0.15, 0.3, 0.03],
  // 6 · take two → soup
  ...head(T.h9, 1, T.h9Land, 4),
  chip(T.l11 + 0.2, E.E5, 1.4, { wave: 'tri', gain: 0.02, vib: 0.03, decay: 1.2, sustain: 0.8 }),
  ['pop', T.cuke, 783.99, 0.04, 0.6], ['bell', T.cuke + 0.25, 1760, 0.02, 0.5, 0.6],
  ['swell', T.canUp3[0] - 0.5, T.canUp3[1], { gain: 0.05, f0: 600, f1: 5000 }], ['boom', T.canUp3[1], 0.25], ['crash', T.canUp3[1], { gain: 0.06, len: 2.0 }],
  ['glitter', T.canUp3[1], T.canUp3[1] + 0.9], ...claps(T.canUp3[1] + 0.1, T.canUp3[1] + 2.4, 7),
  ...head(T.h10, 1, T.h10Land, 3),
  ['pop', T.bowlA, 880, 0.04, -0.3], ['pluck', T.bowlA + 0.02, 1174.66, 0.03, 0.5, -0.3], ['pop', T.bowlL, 987.77, 0.04, 0.4], ['pluck', T.bowlL + 0.02, 1318.51, 0.03, 0.5, 0.4],
  // 7 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'F#m' }),
  // 8 · talk cards
  ...head(T.h11, 2, T.h11Land, 1), ['whoosh', T.talk[0] + 0.15, 0.4, 0.04],
  ['pop', T.playA, 659.25, 0.04, -0.3], ['tick', T.playA + 0.1, 0.04], ['pop', T.playL, 739.99, 0.04, 0.3], ['tick', T.playL + 0.1, 0.04],
  ['whoosh', T.flipA + 0.1, 0.25, 0.03], ['pluck', T.flipA + 0.15, 1174.66, 0.035, 0.6, -0.3], ['whoosh', T.flipL + 0.1, 0.25, 0.03], ['pluck', T.flipL + 0.15, 1318.51, 0.035, 0.6, 0.3],
  ['bell', T.flipL + 0.3, 1760, 0.03, 1.2, 0], ['whoosh', T.talk[1] + 0.15, 0.3, 0.03],
  // 9 · serves two
  ...head(T.h12, 1, T.h12Land, 2), ['bell', T.h12Land + 0.05, 1174.66, 0.03, 1.4, 0], ...claps(T.h12Land, T.h12Land + 1.4, 11, 0.7),
  ['pop', T.wink, 1567.98, 0.035, -0.3], ['bell', T.wink + 0.02, 2093, 0.015, 0.6, -0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  // the dialogue + cuts + end card
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [T_TAG]: 587.33, [A_TAG]: 1046.5, [L_TAG]: 880, [C_TAG]: 783.99 } })),
  ...cardCutCues(CUTS()),
  ...endcardCues(STORY_END),
]
