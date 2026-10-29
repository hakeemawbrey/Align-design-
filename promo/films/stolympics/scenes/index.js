// stolympics — "The Relationship Olympics." (60 s vertical Align ad, Star Talk "Wild Lessons" #16, music: house, E).
// A sports broadcast. Story 0–55.6, then the shared end card.
//   0.00–4.3    "The Relationship | *Olympics.*"  A floating stadium in the night sky: stands full of stars, a jumbotron, a
//               torch with a heart-shaped flame, THE BOOTH (♊ Gemini + ♐ Sag, one mic, headsets). ♌ LEO (crown) and
//               ♑ CAPRICORN (sweatband), a couple, glare at each other; a rivalry bolt crackles between them.
//   4.55–12.1   "Event 1: synchronized *texting.*"  Both type… both send "fine." at the exact same instant. PERFECT SYNC,
//               judges 10 · 10 · 10. GEMINI: "flawless. synchronized passive aggression." One medal drops; they both grab
//               it and tug. The crowd BOOS (signs: BOO / JUST HUG).
//  12.25       card cut (deal)
//  12.35–20.3  "Event 2: the compromise *relay.*"  LEO: "after you." CAP: "no no. after YOU." The COMPROMISE baton
//               ping-pongs faster and faster, then jams in the middle, both pushing. GEMINI: "the baton has not moved,
//               folks." A snail in bib 1 overtakes them. Jumbotron: WINNER: SNAIL. Crickets.
//  20.5–27.7   "Event 3: the dishes *marathon.*"  Cap washes a tower of plates, sweating. Leo polishes ONE plate.
//               CAP: "I did FORTY plates." LEO: "I did the BIG one." (a giant gleaming plate). BOO. The tower wobbles over.
//  27.8        card cut (flip)
//  27.9–37.5   "Event 4: the who-was-right *high jump.*"  The bar is labelled I WAS RIGHT. Leo clears it. CAP: "I was
//               MORE right." (the bar ratchets up). LEO: "I was right in 2019." The bar rockets off the top; both jump at
//               once and bonk mid-air, flop onto the mat, dizzy. Silence. Crickets. The biggest BOO. NO WINNER.
//  37.6–41.0   "Plot *twist.*"  GEMINI: "folks… aren't they on the same team?" They look at each other. Leo helps Cap up.
//  41.05       card cut (shuffle)
//  41.15–44.3  "New event: cheering *each other.*"  Leo with pom-poms: "GO CAP! you're AMAZING!" Cap clears the bar (now
//               TEAM US), the stadium erupts, the jumbotron flips to SAME TEAM, the crowd's signs turn to hearts.
//  44.49–48.95 ★ LESSON UNLOCKED: "Love isn't a | competition. | Root for *each other*."  +1 SUPPORT
//  49.1–52.15  "Know your | *team stats.*"  The Push / Pull / Align reading between the two charts. SAG: "push shows
//               where you'll rub."
//  52.25–55.45 "Gold. | *Both* of you."  One wide podium step, both on it, two medals land. Pisces sobs.
// One canvas (sky + baked stadium + cast + props), DOM type, dialogue boxes, the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  INK, rgba, STAD, starFrame, inSprite, cellToWorld, headbandCells, tearsCells, drawCrown, drawMic, pixelPanel, confetti,
  sparkBurst, drawHearts, dizzyStars, steamPuffs, sweatDrop, makeStadium, drawJumbotron, drawPhone, drawMedal, drawBaton,
  drawPlateStack, drawBigPlate, drawHighJump, drawMat, drawSnail, drawSign, drawTorchFlame, drawPodium, drawPomPom,
  drawScoreCard, drawStamp, drawHeadset,
} from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0', RED = '#ff5a6e'
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
const B = n => +(0.6 + n * BL).toFixed(3)     // the 108 bpm grid
const LEO = signStar('leo'), CAP = signStar('capricorn'), GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
const L_COL = '#ffb45c', C_COL = '#9fe0a8', G_COL = '#ffe27a', S_COL = '#c9a6ff'
const L_TAG = `${LEO.glyph}︎ LEO`, C_TAG = `${CAP.glyph}︎ CAPRICORN`, G_TAG = `${GEM.glyph}︎ GEMINI`, S_TAG = `${SAG.glyph}︎ SAG`

// ── the timeline
const T = {
  black: [0, 0.3],
  // 0 · hook
  h0: 0.15, h0Land: 0.6, h0Out: [4.1, 4.28], openA: 0.75, l0: 0.95, closeA: 4.0, stomp: B(2), bolt: [2.45, 4.15],
  // 1 · synchronized texting
  h1: 4.55, h1Land: 4.95, h1Out: [11.98, 12.13], phones: 4.9, phonesOut: [9.7, 9.95], openB: 5.25, l1: 5.45, send: B(13), stamp: 8.1,
  cards: [8.3, 8.45, 8.6], cardsOut: [11.7, 11.95], l2: 8.6, closeB: 12.0, medal: [9.9, 10.4], grab: 10.4, tug: [10.4, 12.2], boo1: [10.75, 12.2],
  cut1: 12.25,
  // 2 · the compromise relay
  h2: 12.35, h2Land: 12.75, h2Out: [20.15, 20.3], baton: 12.55, go: 12.85, openC: 13.1, l3: 13.3, l4: 15.3, l5: 17.5, closeC: 20.25,
  passes: [13.85, 14.5, 15.05, 15.5, 15.9, 16.25, 16.55, 16.8, 17.02, 17.22], jam: [17.35, 20.3], snail: [17.2, 20.25], snailWin: 19.25, crick1: [18.9, 19.9],
  // 3 · the dishes marathon
  h3: 20.5, h3Land: 20.9, h3Out: [27.55, 27.7], openD: 21.3, l6: 21.5, l7: 23.9, closeD: 26.1, plates: [20.9, 25.35], bigPlate: 23.95,
  boo3: [24.9, 26.6], wobble: [25.4, 26.25], topple: [26.25, 27.3],
  cut2: 27.8,
  // 4 · the who-was-right high jump
  h4: 27.9, h4Land: 28.3, h4Out: [35.0, 35.15], posts: 28.05, openE: 28.6, l8: 28.8, l9: 30.95, l10: 33.15, closeE: 35.4,
  jumpL: 29.35, jumpC: 31.65, rocket: [33.95, 34.3], launch: 34.3, bonk: 34.75, flop: 35.15, crick2: [35.25, 36.05], boo4: [36.05, 37.7],
  // 5 · plot twist
  h5: 37.6, h5Land: 37.9, h5Out: [40.85, 41.0], openF: 37.5, l11: 37.7, closeF: 40.85, lookUp: 37.7, eachOther: 39.4, sparkle: 39.85,
  standL: [40.0, 40.3], hand: 40.3, standC: [40.35, 40.7], walk: [40.75, 41.25],
  cut3: 41.05,
  // 6 · cheering each other
  h6: 41.15, h6Land: 41.55, h6Out: [44.25, 44.4], openG: 41.3, l12: 41.5, closeG: 44.1, poms: 41.2, jumpC2: 41.97, same: B(76), signLeo: 43.25,
  // 7 · lesson
  lesson: B(79), lessonOut: [48.75, 48.95],
  // 8 · team stats
  h7: 49.1, h7Land: 49.5, h7Out: [52.0, 52.15], panel: [49.05, 49.4], panelOut: [51.8, 52.15], arcs: [49.6, 50.15, 50.7], openH: 49.4, l13: 49.6, closeH: 52.15,
  // 9 · gold, both of you
  h8: 52.25, h8Land: 52.7, h8Out: [55.02, 55.25], podium: [52.2, 52.55], hopUp: [52.3, 52.72], medalL: [52.75, 53.15], medalC: [52.95, 53.35],
  out: [55.0, 55.42],
}
const BOX_A = [{ t: T.l0, speaker: G_TAG, color: G_COL, text: 'welcome to the *Relationship Olympics!*' }]
const BOX_B = [
  { t: T.l1, speaker: S_TAG, color: S_COL, text: 'both typing… the *tension* is unreal.' },
  { t: T.l2, speaker: G_TAG, color: G_COL, text: 'flawless. synchronized *passive aggression.*' },
]
const BOX_C = [
  { t: T.l3, speaker: L_TAG, color: L_COL, text: 'after *you.*' },
  { t: T.l4, speaker: C_TAG, color: C_COL, text: 'no no. after *YOU.*' },
  { t: T.l5, speaker: G_TAG, color: G_COL, text: 'the baton has *not moved,* folks.' },
]
const BOX_D = [
  { t: T.l6, speaker: C_TAG, color: C_COL, text: 'I did *FORTY* plates.' },
  { t: T.l7, speaker: L_TAG, color: L_COL, text: 'I did the *BIG* one.' },
]
const BOX_E = [
  { t: T.l8, speaker: L_TAG, color: L_COL, text: 'I was *right.*' },
  { t: T.l9, speaker: C_TAG, color: C_COL, text: 'I was *MORE* right.' },
  { t: T.l10, speaker: L_TAG, color: L_COL, text: 'I was right in *2019.*' },
]
const BOX_F = [{ t: T.l11, speaker: G_TAG, color: G_COL, text: "folks… aren't they on the *same team?*" }]
const BOX_G = [{ t: T.l12, speaker: L_TAG, color: L_COL, text: "GO CAP! you're *AMAZING!*" }]
const BOX_H = [{ t: T.l13, speaker: S_TAG, color: S_COL, text: "push shows where you'll *rub.*" }]
const BOXES = [[BOX_A, T.openA, T.closeA], [BOX_B, T.openB, T.closeB], [BOX_C, T.openC, T.closeC], [BOX_D, T.openD, T.closeD], [BOX_E, T.openE, T.closeE], [BOX_F, T.openF, T.closeF], [BOX_G, T.openG, T.closeG], [BOX_H, T.openH, T.closeH]]
const ALL_LINES = BOXES.flatMap(b => b[0])
const CPS = 28
const LT = new Map(BOXES.map(([L]) => [L, lineTimes(L, { cps: CPS })]))
const doneOf = (L, i) => LT.get(L)[i].done
const LESSON = { at: T.lesson, out: T.lessonOut, text: "Love isn't a | competition. | Root for *each other*.", chip: '+1 SUPPORT' }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const D2R = Math.PI / 180, TAU = Math.PI * 2
const isBoo = t => inR(t, ...T.boo1) || inR(t, ...T.boo3) || inR(t, ...T.boo4)
const isCheer = t => t >= T.same && t < T.lesson

// ── layout
const GROUND = STAD.ground
const PSIZE = 230, PBASE = (19.6 + 17.6 * Math.cos(Math.PI / 5) - 18) * 6
const PY = GROUND - PBASE
const L_HOME = { x: 290, y: PY }, C_HOME = { x: 790, y: PY }
const MAT = { x: 540, y: 1282, w: 300, h: 56 }
const MAT_Y = MAT.y - PBASE + 10                 // a star's centre when lying/standing on the mat
const JUMBO = { x: 300, y: 520, w: 480, h: 178 }
const BOOTH = { g: { x: 96, y: 646 }, s: { x: 206, y: 646 }, size: 96 }
const TORCH = { x: 980, y: 612 }
const BAR = { x0: 400, x1: 680 }
const STACK = { x: 952, y: GROUND }
// the crowd in the stands: [x, y, colour, seed, row, kind]
const CROWD = [
  [70, 800, '#f2cf4a', 21, 0], [190, 800, '#ef5c94', 22, 0], [310, 800, '#2fc79a', 23, 0], [430, 800, '#3fb6f0', 24, 0],
  [650, 800, '#a35cf0', 26, 0], [770, 800, '#38c4ec', 27, 0], [890, 800, STAR.sky, 28, 0], [1010, 800, '#ff9cc0', 29, 0],
  [130, 896, '#e23d66', 30, 1, 'judge'], [250, 896, '#c9a6ff', 31, 1, 'judge'], [370, 896, '#ffb45c', 32, 1, 'judge'],
  [710, 896, '#7fe0ff', 33, 1], [830, 896, PIS.color, 34, 1, 'pisces'], [950, 896, '#f59cc4', 35, 1],
]
const BOO_SIGNS = { 1: 'BOO', 4: 'JUST HUG', 6: 'BOOO', 11: 'WE PAID FOR THIS' }
const CHEER_SIGNS = { 1: '♥', 4: 'SAME TEAM!', 6: 'GO US', 11: '♥ ♥' }

// ── the high jump: bar height + label over time
function barAt(t) {
  if (t < T.posts) return null
  if (t >= T.h5 && t < T.h6) return null
  if (t >= T.h6 && t < T.lesson) return { y: 1060, label: 'TEAM US', k: pop01(t, T.h6, 0.4, 1.6) }
  if (t >= T.lesson) return null
  const k = pop01(t, T.posts, 0.45, 1.6) * outK(t, [T.h4Out[0] + 2.4, T.h4Out[0] + 2.6])
  if (t < T.l9) return { y: 1120, label: 'I WAS RIGHT', k }
  if (t < T.l10) return { y: lerp(1120, 900, ease.outBack(prog(t, T.l9, T.l9 + 0.35))), label: 'I WAS MORE RIGHT', k, wob: bump(t, T.l9 + 0.3, 0.4) * 6 }
  if (t < T.rocket[0]) return { y: lerp(900, 640, ease.outBack(prog(t, T.l10, T.l10 + 0.35))), label: 'I WAS RIGHT IN 2019', k, wob: bump(t, T.l10 + 0.3, 0.4) * 6 }
  if (t >= T.flop + 0.3) return { y: lerp(-260, 1120, ease.outBack(prog(t, T.flop + 0.3, T.flop + 0.7))), label: null, k, nobar: true }
  return { y: lerp(640, -260, ease.inCubic(prog(t, ...T.rocket))), label: 'I WAS RIGHT IN 2019', k }
}
/** one high-jump attempt starting at t0 from home: run, arc over the bar, drop onto the mat, bounce home */
function jumpPos(t, t0, home, barY) {
  const d = t - t0
  if (d < 0 || d > 1.25) return null
  if (d < 0.15) return { x: home.x, y: home.y, sq: 0.18 * Math.sin(Math.PI * d / 0.15), rot: 0 }
  if (d < 0.6) { const u = (d - 0.15) / 0.45; return { x: lerp(home.x, 540, ease.outQuad(u)), y: lerp(home.y, barY - 150, ease.outQuad(u)), sq: -0.12, rot: Math.sign(540 - home.x) * 0.9 * u } }
  if (d < 0.85) { const u = (d - 0.6) / 0.25; return { x: 540, y: lerp(barY - 150, MAT_Y, ease.inQuad(u)), sq: 0, rot: Math.sign(540 - home.x) * lerp(0.9, 1.6, u) } }
  const u = (d - 0.85) / 0.4
  return { x: lerp(540, home.x, u), y: lerp(MAT_Y, home.y, u) - Math.sin(Math.PI * u) * 170, sq: u < 0.15 ? 0.25 * (1 - u / 0.15) : 0, rot: Math.sign(540 - home.x) * 1.6 * (1 - ease.outCubic(u)) * (u < 0.5 ? 1 : 0.5) }
}
const matSquish = t => Math.max(bump(t, T.jumpL + 0.85, 0.3), bump(t, T.jumpC + 0.85, 0.3), bump(t, T.flop, 0.4) * 1.2, bump(t, T.jumpC2 + 0.85, 0.3))

// ── positions (both stars): { x, y, rot, sq }
function leoPos(t) {
  const H = L_HOME
  if (inR(t, T.grab - 0.2, T.tug[1])) { const k = ease.inOutCubic(prog(t, T.grab - 0.2, T.grab)); return { x: lerp(H.x, 410, k) - (t > T.grab ? 34 * Math.sin((t - T.grab) * 9) : 0), y: H.y, rot: 0, sq: t > T.grab ? 0.05 * Math.sin((t - T.grab) * 18) : 0 } }
  if (inR(t, ...T.jam)) { const k = ease.inOutCubic(prog(t, T.jam[0], T.jam[0] + 0.3)); return { x: lerp(H.x, 395, k) + Math.sin(t * 50) * 3 * k, y: H.y, rot: 0.12 * k, sq: 0 } }
  const j = jumpPos(t, T.jumpL, H, 1120)
  if (j) return j
  if (inR(t, T.launch, T.standL[0])) return together(t, -1)
  if (inR(t, T.standL[0], T.walk[0])) { const u = prog(t, ...T.standL); return { x: lerp(470, 440, u), y: MAT_Y - Math.sin(Math.PI * u) * 60, rot: lerp(-1.45, 0, ease.outBack(u)), sq: 0 } }
  if (inR(t, T.walk[0], T.walk[1] + 0.01)) { const u = ease.inOutCubic(prog(t, ...T.walk)); return { x: lerp(440, H.x, u), y: lerp(MAT_Y, H.y, u) - Math.sin(Math.PI * u) * 50, rot: 0, sq: 0 } }
  if (inR(t, T.hopUp[0], T.out[1])) { const u = ease.inOutCubic(prog(t, ...T.hopUp)); return { x: lerp(H.x, 448, u), y: lerp(H.y, PODIUM_Y, u) - Math.sin(Math.PI * u) * 160, rot: 0, sq: 0 } }
  return { x: H.x, y: H.y, rot: 0, sq: 0 }
}
function capPos(t) {
  const H = C_HOME
  if (inR(t, T.grab - 0.2, T.tug[1])) { const k = ease.inOutCubic(prog(t, T.grab - 0.2, T.grab)); return { x: lerp(H.x, 670, k) - (t > T.grab ? 34 * Math.sin((t - T.grab) * 9) : 0), y: H.y, rot: 0, sq: t > T.grab ? -0.05 * Math.sin((t - T.grab) * 18) : 0 } }
  if (inR(t, ...T.jam)) { const k = ease.inOutCubic(prog(t, T.jam[0], T.jam[0] + 0.3)); return { x: lerp(H.x, 685, k) + Math.sin(t * 50 + 1) * 3 * k, y: H.y, rot: -0.12 * k, sq: 0 } }
  const j = jumpPos(t, T.jumpC, H, 900) || jumpPos(t, T.jumpC2, H, 1060)
  if (j) return j
  if (inR(t, T.launch, T.standC[0])) return together(t, 1)
  if (inR(t, T.standC[0], T.walk[0])) { const u = prog(t, ...T.standC); return { x: lerp(610, 640, u), y: MAT_Y - Math.sin(Math.PI * u) * 60, rot: lerp(1.45, 0, ease.outBack(u)), sq: 0 } }
  if (inR(t, T.walk[0], T.walk[1] + 0.01)) { const u = ease.inOutCubic(prog(t, ...T.walk)); return { x: lerp(640, H.x, u), y: lerp(MAT_Y, H.y, u) - Math.sin(Math.PI * u) * 50, rot: 0, sq: 0 } }
  if (inR(t, T.hopUp[0], T.out[1])) { const u = ease.inOutCubic(prog(t, T.hopUp[0] + 0.08, T.hopUp[1] + 0.08)); return { x: lerp(H.x, 632, u), y: lerp(H.y, PODIUM_Y, u) - Math.sin(Math.PI * u) * 160, rot: 0, sq: 0 } }
  return { x: H.x, y: H.y, rot: 0, sq: 0 }
}
/** the double jump: both launch, bonk mid-air, flop onto the mat (lying on their sides) */
function together(t, side) {
  const home = side < 0 ? L_HOME : C_HOME
  if (t < T.bonk) { const u = prog(t, T.launch, T.bonk); return { x: lerp(home.x, 540 + side * 62, ease.outQuad(u)), y: lerp(home.y, 820, ease.outQuad(u)), rot: -side * 0.6 * u, sq: -0.1 } }
  if (t < T.flop) { const u = prog(t, T.bonk, T.flop); return { x: lerp(540 + side * 62, 540 + side * 70, u) + side * Math.sin(Math.PI * u) * 40, y: lerp(820, MAT_Y + 26, ease.inQuad(u)), rot: side * lerp(0.4, 1.45, u), sq: 0 } }
  return { x: 540 + side * 70, y: MAT_Y + 26 + bump(t, T.flop, 0.35) * -26, rot: side * 1.45, sq: bump(t, T.flop, 0.3) * 0.2 }
}
const PODIUM = { x: 540, y: 1180, w: 470, h: 156 }
const PODIUM_Y = PODIUM.y - PBASE + 6

// ── baton: which side holds it (passes ping-pong), then it jams in the middle
function batonAt(t, lp, cp) {
  if (t < T.baton || t >= T.h2Out[1]) return null
  const hand = (p, s) => ({ x: p.x + s * 118, y: p.y + 30 })
  const LH = hand(lp, 1), CH = hand(cp, -1)
  if (t >= T.jam[0]) { const k = ease.outCubic(prog(t, T.jam[0], T.jam[0] + 0.3)); return { x: lerp(LH.x, 540, k) + Math.sin(t * 50) * 3, y: lerp(LH.y, 1180, k), rot: Math.sin(t * 40) * 0.05 } }
  let holder = 0, last = -1
  for (let i = 0; i < T.passes.length; i++) if (t >= T.passes[i]) { holder = 1 - holder; last = i }
  const from = holder ? LH : CH, to = holder ? CH : LH
  if (last >= 0) {
    const t0 = T.passes[last], dur = Math.max(0.16, Math.min(0.42, (T.passes[last + 1] ?? t0 + 0.6) - t0 - 0.06))
    const u = prog(t, t0, t0 + dur)
    if (u < 1) return { x: lerp(from.x, to.x, ease.inOutQuad(u)), y: lerp(from.y, to.y, u) - Math.sin(Math.PI * u) * 120, rot: u * TAU * (holder ? 1 : -1) }
  }
  const P = holder ? CH : LH
  return { x: P.x, y: P.y + Math.sin(t * 4) * 4, rot: holder ? Math.PI : 0 }
}

// ── plates (E3): the count in Cap's tower over time
const PLATE_TIMES = (() => { const out = []; for (let t = T.plates[0]; t < T.plates[1]; t += BL / 2) out.push(+t.toFixed(3)); return out })()
const platesAt = t => PLATE_TIMES.filter(p => t >= p + 0.25).length

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS())]
function CUTS() { return [4.45, { t: T.cut1, kind: 'deal' }, 20.4, { t: T.cut2, kind: 'flip', keep: true }, { t: T.cut3, kind: 'shuffle' }, 48.98] }

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "900 200px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const STADIUM = makeStadium(document)
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 140, wobble: true, late: 1, fit: true, ...o })
  const H3 = (text, o) => H(text, { size: 90, accentSize: 128, ...o })
  const HEADS = [
    [H('The Relationship | *Olympics.*', { top: 128, at: T.h0, lateAt: T.h0Land, accentColor: GOLD }), T.h0Out],
    [H3('Event 1: | synchronized | *texting.*', { top: 118, at: T.h1, lateAt: T.h1Land, accentColor: '#9fe4ff' }), T.h1Out],
    [H3('Event 2: | the compromise | *relay.*', { top: 118, at: T.h2, lateAt: T.h2Land, accentColor: RED }), T.h2Out],
    [H3('Event 3: | the dishes | *marathon.*', { top: 118, at: T.h3, lateAt: T.h3Land, accentColor: '#7fb8ff' }), T.h3Out],
    [H3('Event 4: | the who-was-right | *high jump.*', { top: 118, at: T.h4, late: 2, lateAt: T.h4Land, accentColor: L_COL }), T.h4Out],
    [H('Plot *twist.*', { top: 170, size: 112, accentSize: 160, at: T.h5, lateAt: T.h5Land, accentColor: PINK }), T.h5Out],
    [H3('New event: | cheering | *each other.*', { top: 118, at: T.h6, late: 2, lateAt: T.h6Land, accentColor: MINT }), T.h6Out],
    [H('Know your | *team stats.*', { top: 128, at: T.h7, late: 2, lateAt: T.h7Land, accentColor: READING.push }), T.h7Out],
    [H('Gold. | *Both* of you.', { top: 128, size: 112, accentSize: 158, at: T.h8, late: 0, accentColor: GOLD }), T.h8Out],
  ]
  const BOX = { y: 1450, width: 960, height: 270, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── hops
  const L_HOPS = [...talkHops(ALL_LINES, L_TAG, { cps: CPS }), T.stomp, T.send + 0.1, T.same + 0.05, T.same + 0.6, T.same + 1.2, T.signLeo, T.lesson + 0.1, T.hopUp[1] + 0.05, 53.6]
  const C_HOPS = [...talkHops(ALL_LINES, C_TAG, { cps: CPS }), T.stomp + 0.05, T.send + 0.12, T.same + 0.45, T.same + 1.05, T.same + 1.65, T.lesson + 0.15, T.hopUp[1] + 0.12, 53.75]
  const G_HOPS = [...talkHops(ALL_LINES, G_TAG, { cps: CPS }), T.same + 0.1, T.same + 0.7]
  const S_HOPS = [...talkHops(ALL_LINES, S_TAG, { cps: CPS }), T.send + 0.2, T.same + 0.2, T.same + 0.8]
  const lieAt = t => inR(t, T.flop, T.standL[0])

  // ── moods
  function leoState(t) {
    const st = { mood: 'squint', look: [1, 0], steam: 0, sweat: 0, dizzy: 0 }
    if (t < T.h1) { st.mood = t < T.bolt[0] ? 'neutral' : 'squint'; st.look = [1, 0]; st.steam = t > T.bolt[0] ? 0.7 : 0 }
    else if (t < T.send) { st.mood = 'squint'; st.look = [1, 1] }
    else if (t < T.l2) { st.mood = 'wide'; st.look = [1, 0] }
    else if (t < T.grab - 0.2) { st.mood = 'happy'; st.look = [1, 0] }
    else if (t < T.boo1[0]) { st.mood = 'squint'; st.steam = 1 }
    else if (t < T.cut1) { st.mood = 'wide'; st.look = [0, -1]; st.sweat = 1 }
    else if (t < T.l4) { st.mood = t >= T.l3 ? 'wink' : 'happy'; st.look = [1, 0] }
    else if (t < T.jam[0]) { st.mood = 'squint'; st.look = [1, 0] }
    else if (t < T.snail[0] + 0.6) { st.mood = 'squint'; st.steam = 1 }
    else if (t < T.h3) { st.mood = 'wide'; st.look = [clamp((snailX(t) - 395) / 200, -1, 1), 1]; st.sweat = 1 }
    else if (t < T.l7) { st.mood = 'sparkle'; st.look = [-1, 1] }
    else if (t < T.boo3[0]) { st.mood = 'happy'; st.look = [0, -1] }
    else if (t < T.cut2) { st.mood = 'wide'; st.look = [0, -1]; st.sweat = 1 }
    else if (t < T.launch) { st.mood = (inR(t, T.jumpL, T.jumpL + 1.25) || inR(t, T.l10, T.launch)) ? 'squint' : t >= T.l9 && t < T.l10 ? 'eyeroll' : 'neutral'; st.look = [1, 0] }
    else if (t < T.bonk) { st.mood = 'squint'; st.look = [1, 0] }
    else if (t < T.lookUp) { st.mood = 'eyeroll'; st.dizzy = 1 - prog(t, 37.2, T.lookUp) }
    else if (t < T.eachOther) { st.mood = 'neutral'; st.look = [0, -1] }
    else if (t < T.sparkle) { st.mood = 'wide'; st.look = [1, 0] }
    else if (t < T.same) { st.mood = t < T.h6 ? 'sparkle' : 'happy'; st.look = [1, 0] }
    else if (t < T.lesson) { st.mood = 'heart'; st.look = [1, 0] }
    else { st.mood = t >= T.medalL[1] ? 'heart' : t >= T.panel[0] && t < T.panelOut[1] ? 'sparkle' : 'happy'; st.look = [1, 0] }
    return st
  }
  function capState(t) {
    const st = { mood: 'squint', look: [-1, 0], steam: 0, sweat: 0, dizzy: 0 }
    if (t < T.h1) { st.mood = t < T.bolt[0] ? 'neutral' : 'squint'; st.look = [-1, 0]; st.steam = t > T.bolt[0] ? 0.7 : 0 }
    else if (t < T.send) { st.mood = 'squint'; st.look = [-1, 1] }
    else if (t < T.l2) { st.mood = 'wide'; st.look = [-1, 0] }
    else if (t < T.grab - 0.2) { st.mood = 'happy'; st.look = [-1, 0] }
    else if (t < T.boo1[0]) { st.mood = 'squint'; st.steam = 1 }
    else if (t < T.cut1) { st.mood = 'wide'; st.look = [0, -1]; st.sweat = 1 }
    else if (t < T.l4) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.jam[0]) { st.mood = t < T.l4 + 1.4 ? 'wink' : 'squint'; st.look = [-1, 0] }
    else if (t < T.snail[0] + 0.6) { st.mood = 'squint'; st.steam = 1 }
    else if (t < T.h3) { st.mood = 'wide'; st.look = [clamp((snailX(t) - 685) / 200, -1, 1), 1]; st.sweat = 1 }
    else if (t < T.l6) { st.mood = 'wide'; st.look = [1, 0]; st.sweat = 1 }
    else if (t < T.l7) { st.mood = 'squint'; st.look = [-1, 0]; st.sweat = 1 }
    else if (t < T.boo3[0]) { st.mood = 'eyeroll'; st.sweat = 1 }
    else if (t < T.cut2) { st.mood = 'wide'; st.look = [1, 0]; st.sweat = 1 }
    else if (t < T.launch) { st.mood = (inR(t, T.jumpC, T.jumpC + 1.25) || inR(t, T.l9, T.l10)) ? 'squint' : t >= T.l8 && t < T.l9 ? 'eyeroll' : t >= T.l10 ? 'squint' : 'neutral'; st.look = [-1, 0] }
    else if (t < T.bonk) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.lookUp) { st.mood = 'eyeroll'; st.dizzy = 1 - prog(t, 37.2, T.lookUp) }
    else if (t < T.eachOther + 0.12) { st.mood = 'neutral'; st.look = [0, -1] }
    else if (t < T.sparkle + 0.1) { st.mood = 'wide'; st.look = [-1, 0] }
    else if (t < T.jumpC2) { st.mood = 'sparkle'; st.look = [-1, 0] }
    else if (t < T.same) { st.mood = 'squint'; st.look = [-1, 0] }
    else if (t < T.lesson) { st.mood = 'heart'; st.look = [-1, 0] }
    else { st.mood = t >= T.medalC[1] ? 'heart' : t >= T.panel[0] && t < T.panelOut[1] ? 'sparkle' : 'happy'; st.look = [-1, 0] }
    return st
  }
  const snailX = t => lerp(-90, 1170, prog(t, ...T.snail))

  function drawHero(t, who) {
    const isL = who === 'L'
    const p = isL ? leoPos(t) : capPos(t), st = isL ? leoState(t) : capState(t)
    const k = popOut(t, [T.out[0] + (isL ? 0 : 0.04), T.out[1]])
    if (k <= 0.01) return { p, F: null }
    const opts = { color: isL ? LEO.color : CAP.color, glyph: isL ? LEO.glyph : CAP.glyph, mood: st.mood, look: st.look, squash: p.sq || 0, hops: isL ? L_HOPS : C_HOPS, seed: isL ? 3 : 8, bob: lieAt(t) ? 0 : 7, glow: 0.9, zzz: false, pop: k }
    const ax = p.x, ay = p.y + 40
    x.save(); x.translate(ax, ay); x.rotate(p.rot || 0); x.translate(-ax, -ay)
    const r = drawStarChar(x, p.x, p.y, PSIZE, t, opts)
    const F = starFrame(p.x, p.y, PSIZE, t, opts)
    if (isL) { const [cx, cy] = cellToWorld(F, 18, 3.6); drawCrown(x, cx, cy, F.cell) }
    else inSprite(x, F, () => headbandCells(x, t, inR(t, T.jumpC, T.jumpC + 1.3) || inR(t, T.launch, T.flop) || inR(t, T.jumpC2, T.jumpC2 + 1.3) ? 2 : 0.6, { stripe: '#3fd08a' }))
    // medals (the final ceremony)
    const mt = isL ? T.medalL : T.medalC
    if (t >= mt[0]) {
      const u = prog(t, ...mt), [nx, ny] = cellToWorld(F, 18, 24)
      drawMedal(x, nx, lerp(ny - 700, ny, ease.outBounce ? ease.outBounce(u) : ease.outCubic(u)), 5, { rot: 0.08 * Math.sin(t * 3 + (isL ? 0 : 1)), shine: t >= mt[1] ? t - mt[1] : 0 })
    }
    x.restore()
    const [hx, hy] = cellToWorld(F, 18, 2)
    if (st.steam) steamPuffs(x, t, hx, hy, 6, st.steam)
    if (st.sweat) sweatDrop(x, t, hx + (isL ? 70 : -70), hy + 50, 6)
    if (st.dizzy > 0) dizzyStars(x, t, p.x, r.top - 10, 70, { alpha: st.dizzy })
    return { p, F, r }
  }

  function drawBooth(t) {
    const boo = isBoo(t)
    const speaking = sp => ALL_LINES.some(L => L.speaker === sp && t >= L.t && t < L.t + 1.6)
    for (const [who, P, col, glyph, hops, seed] of [['G', BOOTH.g, GEM.color, GEM.glyph, G_HOPS, 41], ['S', BOOTH.s, SAG.color, SAG.glyph, S_HOPS, 42]]) {
      let mood = speaking(who === 'G' ? G_TAG : S_TAG) ? 'wide' : 'neutral', look = [who === 'G' ? 0.6 : -0.6, 1]
      if (boo) { mood = 'eyeroll'; look = [0, -1] }
      if (isCheer(t) || t >= T.h8) mood = 'happy'
      if (inR(t, T.l11, T.eachOther)) { mood = 'squint'; look = [0, 1] }
      const opts = { color: col, glyph: null, mood, look, hops, seed, glow: 0.7, pop: popOut(t, T.out) }
      if (opts.pop <= 0.01) continue
      drawStarChar(x, P.x, P.y, BOOTH.size, t, opts)
      drawHeadset(x, starFrame(P.x, P.y, BOOTH.size, t, opts))
    }
    drawMic(x, 151, 690, 3.6, 0)
    x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('THE BOOTH', 152, 561)
  }

  function crowdLook(t, cx, cy) {
    let tx = 540, ty = 1200
    const lp = leoPos(t), cp = capPos(t)
    if (inR(t, T.passes[0], T.jam[0])) { const b = batonAt(t, lp, cp); if (b) tx = b.x }
    else if (inR(t, T.snail[0], T.snail[1])) tx = snailX(t)
    else if (inR(t, T.jumpL, T.jumpL + 1.25)) tx = lp.x
    else if (inR(t, T.jumpC, T.jumpC + 1.25) || inR(t, T.jumpC2, T.jumpC2 + 1.25)) tx = cp.x
    else if (inR(t, T.plates[0], T.l7)) tx = STACK.x
    return [clamp((tx - cx) / 240, -1, 1), clamp((ty - cy) / 300, -1, 1)]
  }
  function drawCrowd(t) {
    CROWD.forEach(([cx, cy, col, seed, row, kind], i) => {
      const isP = kind === 'pisces'
      let mood = 'neutral', look = crowdLook(t, cx, cy), hops = null, sq = 0
      const boo = isBoo(t)
      if (boo) { mood = i % 3 === 0 ? 'eyeroll' : 'squint'; sq = 0.06 * Math.sin(t * 9 + i) }
      if (inR(t, T.send, T.send + 0.7) || inR(t, T.bonk, T.bonk + 0.6) || inR(t, T.topple[0], T.topple[0] + 0.7)) mood = 'wide'
      if (inR(t, T.crick2[0], T.boo4[0]) || inR(t, T.crick1[0], T.crick1[1])) { mood = 'neutral'; look = [0, 1] }
      if (inR(t, T.l11, T.same)) { mood = t > T.sparkle ? 'sparkle' : 'neutral'; look = crowdLook(t, cx, cy) }
      if (isCheer(t) || t >= T.h8) { mood = (i % 3 === 0) ? 'heart' : 'happy'; const h0 = (t >= T.h8 ? T.medalL[1] : T.same) + (i % 4) * 0.12; hops = [h0, h0 + 0.62, h0 + 1.24, h0 + 1.86] }
      if (t >= T.lesson && t < T.h8) mood = 'happy'
      if (isP) mood = isCheer(t) || t >= T.h8 ? 'happy' : 'sparkle'
      const pk = popOut(t, T.out)
      const opts = { color: col, mood, look, seed, hops, squash: sq, glow: 0.7, pop: pk }
      drawStarChar(x, cx, cy, 92, t, opts)
      if (isP) { const F = starFrame(cx, cy, 92, t, opts); inSprite(x, F, () => tearsCells(x, t, isCheer(t) || t >= T.h8 ? 3 : boo || inR(t, T.bonk, T.l11) ? 2 : 1)) }
      // judges' score cards (event 1)
      if (kind === 'judge' && t >= T.cards[0] && t < T.cardsOut[1]) {
        const j = i - 8, kk = pop01(t, T.cards[j], 0.3, 2.4) * outK(t, T.cardsOut)
        drawScoreCard(x, cx + 40, cy - 6, '10', { k: kk, rot: 0.08 * Math.sin(t * 3 + j) })
      }
      // signs
      const bs = BOO_SIGNS[i], chs = CHEER_SIGNS[i]
      if (bs && boo) { const t0 = [T.boo1, T.boo3, T.boo4].find(b => inR(t, ...b))[0]; const kk = pop01(t, t0 + (i % 3) * 0.1, 0.3, 2.2); drawSign(x, cx + 30, cy - 30 - Math.abs(Math.sin(t * 7 + i)) * 10, bs, { k: kk, rot: 0.1 * Math.sin(t * 6 + i), col: '#d8d2e8', size: bs.length > 8 ? 20 : 26 }) }
      if (chs && (isCheer(t) || t >= T.h8) && pk > 0.2) { const kk = pop01(t, T.same + 0.1 + (i % 3) * 0.1, 0.3, 2.2) * pk; drawSign(x, cx + 30, cy - 30 - Math.abs(Math.sin(t * 7 + i)) * 14, chs, { k: kk, rot: 0.12 * Math.sin(t * 6 + i), col: chs.startsWith('♥') ? '#ffd0de' : '#fff1a8', ink: chs.startsWith('♥') ? '#e8344e' : INK, size: chs.length > 8 ? 22 : 28 }) }
    })
    // BOO letters floating up out of the stands
    for (const b of [T.boo1, T.boo3, T.boo4]) {
      if (!inR(t, b[0], b[1] + 0.8)) continue
      const big = b === T.boo4
      for (let q = 0; q < (big ? 9 : 6); q++) {
        const t0 = b[0] + q * 0.2, kk = t - t0
        if (kk < 0 || kk > 1.2) continue
        const bx = 80 + ((q * 271) % 920), by = 860 - kk * 140
        x.save(); x.globalAlpha = Math.sin(Math.PI * kk / 1.2) * 0.95; x.translate(bx, by); x.rotate(((q % 3) - 1) * 0.12)
        x.font = `700 ${big ? 46 : 38}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 9; x.strokeStyle = INK; x.lineJoin = 'round'
        const txt = q % 2 ? 'BOOO' : 'BOO'
        x.strokeText(txt, 0, 0); x.fillStyle = '#c9c2e0'; x.fillText(txt, 0, 0); x.restore()
      }
    }
  }

  // ── the jumbotron: what it shows over time
  function jumboRows(t) {
    const R_ = (text, col, size, dy = 0) => ({ text, col, size, dy })
    const AMB = '#ffb43c'
    if (t < T.h1) return [R_('MEDALS', GOLD, 28, -46), R_('LEO 0 · CAP 0', AMB, 46, 18)]
    if (t < T.cut1) {
      if (t >= T.grab) return [R_('EVENT 1 · MEDAL', GOLD, 28, -46), R_(Math.floor(t * 3) % 2 ? 'DISPUTED' : '', RED, 56, 18)]
      if (t >= T.cards[0]) return [R_('PERFECT SYNC', MINT, 30, -46), R_('10 · 10 · 10', AMB, 54, 18)]
      return [R_('EVENT 1 · SYNC TEXT', GOLD, 28, -46), R_('TYPING…', AMB, 46, 18)]
    }
    if (t < T.h3) {
      if (t >= T.snailWin) return [R_('RELAY · RESULT', GOLD, 28, -46), R_('WINNER: SNAIL', MINT, 44, 18)]
      const s = Math.max(0, (t - T.go) * (t > T.jam[0] ? 2400 : 300)), hh = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = Math.floor(s) % 60
      return [R_('RELAY · TIME', GOLD, 28, -46), R_(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, AMB, 54, 18)]
    }
    if (t < T.cut2) {
      if (t >= T.boo3[0]) return [R_('DISHES · RESULT', GOLD, 28, -46), R_(Math.floor(t * 3) % 2 ? 'DISPUTED' : '', RED, 56, 18)]
      return [R_(`CAP: ${String(Math.min(40, Math.round(prog(t, T.plates[0], T.l6 + 0.5) * 40))).padStart(2, '0')} PLATES`, C_COL, 34, -32), R_(t >= T.bigPlate ? 'LEO: 1 (BIG)' : 'LEO: 1', L_COL, 34, 30)]
    }
    if (t < T.h5) {
      if (t >= T.boo4[0] || t >= T.flop) return [R_('HIGH JUMP · RESULT', GOLD, 28, -46), R_('NO WINNER', RED, 52, 18)]
      const hgt = t < T.l9 ? '1.9 m' : t < T.l10 ? '3.4 m' : t < T.rocket[0] ? '2019 m' : '∞'
      return [R_('HIGH JUMP · BAR', GOLD, 28, -46), R_(hgt, AMB, 54, 18)]
    }
    if (t < T.same) return [R_('LEO vs CAP', GOLD, 28, -46), R_(t >= T.h6 ? 'GO GO GO' : '…', AMB, 52, 18)]
    if (t < T.h8) return [R_('LEO + CAP', PINK, 28, -46), R_('SAME TEAM', PINK, 62, 18)]
    return [R_('MEDALS', GOLD, 28, -46), R_('GOLD · GOLD', GOLD, 56, 18)]
  }

  // ── the Push / Pull / Align reading ("team stats")
  const CH_S = 0.34, CHART_W = { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.92 }, R_DOT = 330 * CH_S
  const CHA = { x: 300, y: 930 }, CHB = { x: 780, y: 930 }
  const READ = [
    { a: -50, b: -130, apex: 690, col: READING.push, label: 'PUSH', t: T.arcs[0] },
    { a: 40, b: 140, apex: 1150, col: READING.pull, label: 'PULL', t: T.arcs[1] },
    { a: -15, b: -165, apex: 770, col: READING.align, label: 'ALIGN', t: T.arcs[2] },
  ]
  function drawReading(t) {
    if (t < T.panel[0] || t >= T.panelOut[1]) return
    const k = easeOutBack(prog(t, ...T.panel), 1.8) * (1 - ease.inCubic(prog(t, ...T.panelOut)))
    if (k <= 0.01) return
    x.save(); x.translate(540, 910); x.scale(1, k); x.translate(-540, -910)
    pixelPanel(x, 60, 610, 960, 600, { P: 8, glow: 0.5, fill: 'rgba(12,7,30,0.96)' })
    x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('TEAM STATS · LEO + CAP', 540, 652)
    for (const [side, C] of [[0, CHA], [1, CHB]]) {
      x.save(); x.translate(C.x, C.y); x.rotate((side ? 1 : -1) * (1 - ease.outCubic(prog(t, ...T.panel))) * 1.4 + (side ? -1 : 1) * t * 0.04)
      x.scale(CH_S, CH_S); drawWheelH(x, { W: CHART_W, k: 1 }); x.restore()
      x.font = `700 64px 'EB Garamond', 'Segoe UI Symbol', serif`; x.fillStyle = side ? C_COL : L_COL; x.fillText((side ? CAP.glyph : LEO.glyph) + '︎', C.x, C.y + 4)
    }
    READ.forEach((L, i) => {
      const A_ = { x: CHA.x + Math.cos(L.a * D2R) * R_DOT, y: CHA.y + Math.sin(L.a * D2R) * R_DOT }
      const B_ = { x: CHB.x + Math.cos(L.b * D2R) * R_DOT, y: CHB.y + Math.sin(L.b * D2R) * R_DOT }
      const cX = (A_.x + B_.x) / 2, cY = 2 * L.apex - (A_.y + B_.y) / 2
      const lk = ease.inOutCubic(prog(t, L.t, L.t + 0.45))
      if (lk <= 0) return
      const pulse = 1 + 0.4 * Math.exp(-Math.max(0, t - L.t - 0.45) * 4) + (i === 0 ? 0.25 * Math.sin(t * 6) * clamp(t - L.t - 0.5) : 0)
      x.save(); x.strokeStyle = L.col; x.lineCap = 'round'; x.lineWidth = (i === 0 ? 12 : 9) * pulse; x.shadowColor = L.col; x.shadowBlur = 24
      x.beginPath(); x.moveTo(A_.x, A_.y)
      const N = 40
      for (let s = 1; s <= Math.round(N * lk); s++) { const u = s / N, v = 1 - u; x.lineTo(v * v * A_.x + 2 * v * u * cX + u * u * B_.x, v * v * A_.y + 2 * v * u * cY + u * u * B_.y) }
      x.stroke(); x.restore()
      sparkBurst(x, t, B_.x, B_.y, L.t + 0.42, { n: 8, R: 70, size: 18, seed: 11 + i, cols: [L.col, '#fff3e0'] })
      const ck = easeOutBack(prog(t, L.t + 0.3, L.t + 0.6), 2.4)
      if (ck > 0) {
        const ax = cX * 0.5 + (A_.x + B_.x) * 0.25, ay = 0.5 * cY + 0.25 * (A_.y + B_.y)
        x.save(); x.translate(ax, ay); x.scale(ck * (i === 0 ? 1.25 : 1), ck * (i === 0 ? 1.25 : 1))
        x.font = `700 30px ${MONO}`; const tw = x.measureText(L.label).width + 40
        x.fillStyle = 'rgba(14,8,32,0.95)'; x.fillRect(-tw / 2, -24, tw, 48); x.fillStyle = L.col; x.fillRect(-tw / 2, -24, tw, 4); x.fillRect(-tw / 2, 20, tw, 4)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.label, 0, 2); x.restore()
      }
    })
    x.restore()
  }

  // ── the bolt of rivalry between them (hook)
  function drawBolt(t) {
    if (!inR(t, ...T.bolt)) return
    const k = pop01(t, T.bolt[0], 0.2, 2) * outK(t, [T.bolt[1] - 0.2, T.bolt[1]])
    const a = { x: L_HOME.x + 70, y: PY - 20 }, b = { x: C_HOME.x - 70, y: PY - 20 }
    const r = rng(Math.floor(t * 16))
    x.save(); x.globalAlpha = k; x.lineJoin = 'miter'
    for (const [w, c] of [[22, rgba('#ff5a6e', 0.35)], [10, '#ffe27a'], [4, '#ffffff']]) {
      x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(a.x, a.y)
      for (let i = 1; i < 8; i++) x.lineTo(lerp(a.x, b.x, i / 8), a.y + (r() - 0.5) * 70)
      x.lineTo(b.x, b.y); x.stroke()
    }
    x.restore()
    sparkBurst(x, t, 540, PY - 20, T.bolt[0] + 0.05, { n: 10, R: 120, size: 22, seed: 4, cols: [GOLD, '#ff5a6e', BONE] })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = popOut(t, T.out)
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1100); x.scale(lerp(0.85, 1, clamp(o)), lerp(0.85, 1, clamp(o))); x.translate(-540, -1100)
        const g = x.createRadialGradient(540, 1360, 20, 540, 1360, 640); g.addColorStop(0, 'rgba(255,140,190,0.3)'); g.addColorStop(1, 'rgba(255,140,190,0)')
        x.fillStyle = g; x.fillRect(0, 1000, W, 700)
        // floodlight cones
        x.save(); x.globalCompositeOperation = 'lighter'
        for (const [lx, dir] of [[40, 1], [1040, -1]]) { const fg = x.createLinearGradient(lx, 480, lx + dir * 500, 1300); fg.addColorStop(0, 'rgba(255,240,200,0.10)'); fg.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = fg; x.beginPath(); x.moveTo(lx, 480); x.lineTo(lx + dir * 620, 1400); x.lineTo(lx + dir * 260, 1400); x.closePath(); x.fill() }
        x.restore()
        x.imageSmoothingEnabled = false; x.drawImage(STADIUM, 0, 0, W, 1920); x.imageSmoothingEnabled = true
        x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(242,199,92,0.92)'
        x.fillText('★ THE RELATIONSHIP OLYMPICS ★', 540, STAD.wallY + 22)
        // torch + jumbotron + booth + crowd
        drawTorchFlame(x, t, TORCH.x, TORCH.y, 7, { k: 1 + 0.25 * (isCheer(t) ? 1 : 0) })
        const jk = 1 - clamp(prog(t, T.lesson, T.lesson + 0.25)) * (1 - prog(t, T.lessonOut[0], T.lessonOut[1] + 0.1))
        const flips = [T.cards[0], T.grab, T.snailWin, T.boo3[0], T.flop, T.same, T.h8]
        let flip = 0, flash = 0; for (const f of flips) if (t >= f && t < f + 0.3) { flip = prog(t, f, f + 0.3); flash = 1 - prog(t, f, f + 0.6) }
        if (isCheer(t)) flash = Math.max(flash, 0.5 + 0.3 * Math.sin(t * 8))
        x.save(); x.globalAlpha *= jk; drawJumbotron(x, t, JUMBO, jumboRows(t), { flip, flash, border: isCheer(t) ? PINK : GOLD }); x.restore()
        if (t >= T.same && t < T.lesson) drawHearts(x, t, T.same + 0.1, 540, JUMBO.y + 40, { n: 8, px: 7, spread: 420, life: 1.6 })
        drawBooth(t)
        drawCrowd(t)
        // the field: mat + high jump (under the cast)
        const bar = barAt(t)
        if (bar || inR(t, T.flop, T.h6)) drawMat(x, MAT.x, MAT.y, MAT.w, MAT.h, { squish: matSquish(t), alpha: bar ? bar.k : 1 })
        else if (t >= T.posts && t < T.lesson) drawMat(x, MAT.x, MAT.y, MAT.w, MAT.h, { squish: matSquish(t) })
        if (bar) drawHighJump(x, t, BAR.x0, BAR.x1, GROUND, bar.nobar ? -999 : bar.y, bar.label, { k: bar.k, wob: bar.wob || 0, top: bar.nobar ? bar.y : null })
        // podium (final)
        if (t >= T.podium[0]) drawPodium(x, PODIUM.x, PODIUM.y, PODIUM.w, PODIUM.h, { k: easeOutBack(prog(t, ...T.podium), 1.6) * popOut(t, T.out) })
        // Cap's tower of plates (E3)
        if (inR(t, T.plates[0], T.topple[1] + 0.3)) {
          const n = platesAt(t)
          let wob = 0.04 * Math.sin(t * 7) * clamp(n / 8)
          if (t >= T.wobble[0]) wob = 0.12 * Math.sin(t * 14) * (1 + prog(t, ...T.wobble))
          if (t < T.topple[0]) drawPlateStack(x, t, STACK.x, STACK.y, n, { wob })
          else {
            // the tower tips over: plates fly off, one by one, to the right and down
            const u = t - T.topple[0]
            for (let i = 0; i < n; i++) {
              const d = Math.max(0, u - (n - i) * 0.02)
              const px0 = STACK.x, py0 = STACK.y - (i + 1) * 15
              const vx = 300 + i * 40, vy = -200 - i * 12
              drawPlateStack(x, t, px0 + vx * d, py0 + 15 + vy * d + 1500 * d * d, 1, { wob: 0 })
            }
          }
          // the newest plate flies from Cap onto the top
          const last = PLATE_TIMES.filter(p => t >= p && t < p + 0.25).pop()
          if (last !== undefined && t < T.topple[0]) {
            const u = prog(t, last, last + 0.25), cp = capPos(t), topY = STACK.y - platesAt(t) * 15 - 15
            drawPlateStack(x, t, lerp(cp.x + 80, STACK.x, u), lerp(cp.y + 20, topY, u) - Math.sin(Math.PI * u) * 90 + 15, 1)
          }
          if (t >= T.topple[0] && t < T.topple[0] + 0.8) sparkBurst(x, t, STACK.x + 60, 1240, T.topple[0] + 0.25, { n: 10, R: 140, size: 20, seed: 7, cols: ['#ffffff', '#bfe9ff', '#7fb8ff'] })
        }
        // the heroes
        const lR = drawHero(t, 'L'), cR = drawHero(t, 'C')
        const lp = lR.p, cp = cR.p
        // the bonk
        if (inR(t, T.bonk, T.bonk + 0.6)) { sparkBurst(x, t, 540, 800, T.bonk, { n: 12, R: 200, size: 30, seed: 9, cols: [GOLD, '#ffffff', '#ff5a6e'] }); drawStamp(x, 540, 700, 'BONK', { col: '#ffe27a', k: pop01(t, T.bonk, 0.2, 3) * outK(t, [T.bonk + 0.45, T.bonk + 0.6]), rot: 0.1, size: 60 }) }
        // E1: phones + "fine." + PERFECT SYNC + the medal tug
        if (inR(t, T.phones, T.phonesOut[1])) {
          const k = pop01(t, T.phones, 0.32, 2.2) * outK(t, T.phonesOut)
          const screen = t < T.send ? 'dots' : 'sent'
          drawPhone(x, t, lp.x + 118, lp.y - 30, 6 * k, { screen, rot: 0.12, glow: bump(t, T.send, 0.6) })
          drawPhone(x, t, cp.x - 118, cp.y - 30, 6 * k, { screen, rot: -0.12, glow: bump(t, T.send, 0.6) })
          if (t >= T.send) sparkBurst(x, t, 540, lp.y - 60, T.send, { n: 10, R: 200, size: 22, seed: 2, cols: ['#9fe4ff', '#ffffff', GOLD] })
        }
        if (inR(t, T.stamp, T.phonesOut[1])) drawStamp(x, 540, 1000, 'PERFECT SYNC', { col: MINT, k: pop01(t, T.stamp, 0.25, 3) * outK(t, T.phonesOut), size: 50 })
        if (inR(t, T.medal[0], T.tug[1])) {
          const u = prog(t, ...T.medal)
          const mx = t < T.grab ? 540 : 540 - 34 * Math.sin((t - T.grab) * 9), my = lerp(640, 1108, ease.outCubic(u))
          drawMedal(x, mx, my, 6, { rot: t < T.grab ? 0.1 * Math.sin(t * 6) : 0.25 * Math.sin((t - T.grab) * 9), shine: t >= T.medal[1] - 0.2 ? (t - T.medal[1] + 0.2) % 1.2 : 0 })
          if (t >= T.grab) { x.save(); x.strokeStyle = '#ffe27a'; x.lineWidth = 6; for (const s of [-1, 1]) { const sx = mx + s * 70; x.beginPath(); x.moveTo(sx, my + 60); x.lineTo(sx + s * 18, my + 50); x.stroke() } x.restore() }
        }
        // E2: the GO light, baton, snail
        if (inR(t, T.go, T.go + 1.0)) drawStamp(x, 540, 1010, 'GO!', { col: MINT, k: pop01(t, T.go, 0.2, 3) * outK(t, [T.go + 0.8, T.go + 1.0]), size: 64, rot: 0.06 })
        const bt = batonAt(t, lp, cp)
        if (bt) drawBaton(x, bt.x, bt.y, 6, { rot: bt.rot, label: 'COMPROMISE', alpha: outK(t, T.h2Out) })
        if (inR(t, T.jam[0], T.jam[1]) && t < T.h3) { steamPuffs(x, t, 540, 1120, 5, 0.8) }
        if (inR(t, ...T.snail)) drawSnail(x, t, snailX(t), 1410, 8)
        if (inR(t, ...T.crick1) || inR(t, ...T.crick2)) {
          const c0 = inR(t, ...T.crick1) ? T.crick1[0] : T.crick2[0]
          x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#9cf08a'
          for (let i = 0; i < 3; i++) { const t0 = c0 + i * 0.3, kk = t - t0; if (kk < 0 || kk > 0.6) continue; x.globalAlpha = Math.sin(Math.PI * kk / 0.6) * 0.9; x.fillText('chirp.', [250, 830, 560][i], [1060, 1050, 1090][i] - kk * 16) }
          x.globalAlpha = 1
        }
        // E3: Leo's one plate (polished), then the BIG one
        if (inR(t, T.plates[0], T.cut2)) {
          if (t < T.bigPlate) { drawBigPlate(x, t, lp.x + 120, lp.y + 10 + Math.sin(t * 9) * 6, 36, { rot: t * 2 }); sparkBurst(x, t, lp.x + 120, lp.y + 10, Math.floor(t * 1.6) / 1.6, { n: 5, R: 60, size: 16, seed: Math.floor(t * 1.6), cols: ['#ffffff', GOLD], life: 0.5 }) }
          else { const k = easeOutBack(prog(t, T.bigPlate, T.bigPlate + 0.45), 1.8); drawBigPlate(x, t, lp.x, lp.y - 170 - 50 * k + Math.sin(t * 5) * 6, lerp(36, 100, k), { rot: 0.1 * Math.sin(t * 3) }); sparkBurst(x, t, lp.x, lp.y - 220, T.bigPlate + 0.3, { n: 10, R: 190, size: 26, seed: 5, cols: ['#ffffff', GOLD, '#bfe9ff'] }) }
        }
        if (inR(t, T.plates[0], T.topple[0])) { const n = platesAt(t); if (n > 0) { x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ffffff'; x.globalAlpha = 0.9 } x.globalAlpha = 1 }
        // cheer: pom-poms for Leo; Cap holds up a "GO LEO!" sign after landing
        if (inR(t, T.poms, T.lesson)) {
          const k = pop01(t, T.poms, 0.3, 2.2)
          const sh = Math.abs(Math.sin(t * 9))
          if (k > 0.05) { drawPomPom(x, t, lp.x - 118, lp.y - 40 - sh * 50, 6 * k, PINK, 3); drawPomPom(x, t, lp.x + 118, lp.y - 40 - (1 - sh) * 50, 6 * k, GOLD, 5) }
        }
        if (inR(t, T.signLeo, T.lesson)) drawSign(x, cp.x - 130, cp.y + 70, 'GO LEO!', { k: pop01(t, T.signLeo, 0.3, 2.4), rot: -0.1 + 0.08 * Math.sin(t * 7), col: '#fff1a8', size: 34, stick: 90 })
        // payoff confetti + hearts
        confetti(x, t, T.same, { x0: 300, y0: 900, n: 70, seed: 3 })
        confetti(x, t, T.same + 0.1, { x0: 800, y0: 900, n: 70, seed: 9 })
        if (t >= T.same + 0.3 && t < T.lesson) drawHearts(x, t, T.same + 0.3, 540, PY - 140, { n: 6, px: 7, spread: 400 })
        confetti(x, t, T.medalL[1], { x0: 540, y0: 1000, n: 90, seed: 13 })
        if (t >= T.medalC[1]) drawHearts(x, t, T.medalC[1], 540, PODIUM_Y - 120, { n: 6, px: 7, spread: 300 })
        drawBolt(t)
        drawReading(t)
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

// ── sound (pop / pluck / bell follow the key; chip / brass / lead are written in E major directly)
const NOTE = [659.25, 739.99, 830.61, 880, 987.77, 1108.73, 1244.51]
const E = { E3: 164.81, B3: 246.94, E4: 329.63, Fs4: 369.99, Gs4: 415.3, A4: 440, B4: 493.88, Cs5: 554.37, Ds5: 622.25, E5: 659.25, Fs5: 739.99, Gs5: 830.61, B5: 987.77, E6: 1318.51 }
const FX = { rev: 0.06, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1318.51, 0.05, 0], ['pluck', land, 1318.51, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, ...FX, ...o }]
const brass = (t, fs, len, gain = 0.03) => ['brass', +t.toFixed(3), fs, len, { gain, bright: 1, rev: 0.3, bus: 'fx' }]
const fanfare = (t, g = 1) => [brass(t, [E.E4, E.Gs4, E.B4], 0.18, 0.03 * g), brass(t + 0.2, [E.E4, E.Gs4, E.B4], 0.18, 0.03 * g), brass(t + 0.4, [E.Fs4, E.A4, E.Cs5], 0.3, 0.032 * g), brass(t + 0.75, [E.Gs4, E.B4, E.E5], 0.9, 0.035 * g)]
const boo = (t0, len, g = 1) => [0, 1, 2, 3].flatMap(i => [['lead', +(t0 + i * 0.07).toFixed(3), [123.47, 110, 130.81, 98][i], len, { wave: 'saw', gain: 0.022 * g, from: [150, 135, 160, 120][i], glide: 0.25, cutoff: 700, env: 300, vib: 0.02, vibRate: 4.5, attack: 0.12, decay: 0.6, sustain: 0.8, release: 0.3, pan: (i - 1.5) * 0.4, rev: 0.4, dly: 0, bus: 'fx' }]]).concat([['swell', +t0.toFixed(3), +(t0 + len).toFixed(3), { gain: 0.03 * g, f0: 240, f1: 480 }]])
const womp = t => [[E.B4, 0], [E.A4, 0.16], [E.Gs4, 0.32], [E.E4, 0.48]].map(([f, d], i) => chip(t + d, f, i === 3 ? 0.5 : 0.15, { duty: 0.5, gain: 0.035, slide: i === 3 ? -4 : 0, decay: 0.1 }))
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => chip(t0 + d, 4400, 0.03, { gain: 0.022, decay: 0.02, sustain: 0.7, pan }))
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.1 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const whistle = (t, len = 0.35) => [chip(t, 2600, len, { duty: 0.5, vib: 0.06, gain: 0.022, decay: 0.3, sustain: 0.9 }), chip(t, 2650, len, { wave: 'noise', gain: 0.006, decay: 0.3, sustain: 0.9 })]
const clink = (t, i) => [['bell', +t.toFixed(3), [2093, 2349.3, 2637][i % 3], 0.012, 0.25, 0.5], ['tick', +t.toFixed(3), 0.02]]

export const CUES = [
  // 0 · hook
  ...head(T.h0, 2, T.h0Land, 0),
  ...fanfare(B(2) - 0.75 + 0.75, 1), ['crash', T.stomp, { gain: 0.04, len: 1.8 }], ['boom', T.stomp, 0.1],
  ...[0, 1, 2, 3, 4, 5].map(i => chip(T.bolt[0] + i * 0.07, i % 2 ? 1800 : 900, 0.05, { wave: 'noise', gain: 0.03, decay: 0.04, sustain: 0 })), chip(T.bolt[0], E.E5, 0.3, { slide: 18, gain: 0.025 }),
  // 1 · synchronized texting
  ...head(T.h1, 3, T.h1Land, 1),
  ['pop', T.phones + 0.05, 880, 0.035, -0.3], ['pop', T.phones + 0.1, 880, 0.035, 0.3],
  ...Array.from({ length: 22 }, (_, i) => ['tick', +(5.3 + i * 0.11).toFixed(3), 0.014 + (i % 2) * 0.004]),
  ['bell', T.send, 1318.51, 0.045, 1.0, -0.4], ['bell', T.send, 1318.51, 0.045, 1.0, 0.4], ['whoosh', T.send + 0.1, 0.3, 0.04],
  ['boom', T.stamp, 0.08], ['pop', T.stamp, 659.25, 0.04, 0],
  ...T.cards.map((c, i) => ['pop', c + 0.05, [987.77, 1108.73, 1318.51][i], 0.035, -0.5 + i * 0.1]),
  ['whoosh', T.medal[0] + 0.3, 0.4, 0.03], ['bell', T.medal[1], 1760, 0.035, 1.2, 0], ['glitter', T.medal[1] - 0.1, T.medal[1] + 0.4],
  ...Array.from({ length: 8 }, (_, i) => chip(T.grab + i * 0.18, i % 2 ? E.B4 : E.E5, 0.08, { gain: 0.02, pan: i % 2 ? 0.4 : -0.4 })),
  ...boo(T.boo1[0], 1.2),
  // 2 · the compromise relay
  ...head(T.h2, 3, T.h2Land, 2),
  ['pop', T.baton + 0.05, 659.25, 0.035, -0.4], ...whistle(T.go), ['boom', T.go, 0.06],
  ...T.passes.flatMap((p, i) => [['whoosh', +(p + 0.12).toFixed(3), 0.22, 0.022], ['pop', +(p + Math.min(0.3, 0.12 + 0.02 * (10 - i))).toFixed(3), i % 2 ? 783.99 : 659.25, 0.03, i % 2 ? -0.5 : 0.5]]),
  chip(T.jam[0], 160, 1.6, { wave: 'tri', vib: 0.12, gain: 0.03, decay: 1.2, sustain: 0.9 }),
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.snail[0] + 0.3 + i * 0.28).toFixed(3), 220 + (i % 2) * 30, 0.012, -0.8 + i * 0.17]),
  ...[0, 1, 2].flatMap(i => chirp(T.crick1[0] + i * 0.3 + 0.02, [-0.5, 0.5, 0][i])),
  ['bell', T.snailWin, 1318.51, 0.04, 1.2, 0], ['pluck', T.snailWin + 0.1, 1661.22, 0.03, 0.5, 0], ...womp(T.snailWin + 0.35),
  // 3 · the dishes marathon
  ...head(T.h3, 3, T.h3Land, 3),
  ...PLATE_TIMES.flatMap((p, i) => clink(p + 0.25, i)),
  ['pop', T.bigPlate, 392, 0.05, -0.3], ['bell', T.bigPlate + 0.3, 1567.98, 0.04, 1.4, -0.3], ['glitter', T.bigPlate + 0.2, T.bigPlate + 0.8],
  ...boo(T.boo3[0], 1.4),
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.wobble[0] + i * 0.1).toFixed(3), 0.02]),
  ['crash', T.topple[0] + 0.2, { gain: 0.05, len: 1.4 }], ...Array.from({ length: 12 }, (_, i) => ['bell', +(T.topple[0] + 0.15 + i * 0.05).toFixed(3), [2093, 2637, 2349.3, 3136][i % 4], 0.012, 0.2, 0.6]),
  // 4 · the high jump
  ...head(T.h4, 3, T.h4Land, 4),
  ['pop', T.posts + 0.1, 523.25, 0.035, 0], ['pop', T.posts + 0.2, 659.25, 0.035, 0],
  ...[T.jumpL, T.jumpC].flatMap(j => [['whoosh', +(j + 0.4).toFixed(3), 0.4, 0.04], chip(j + 0.15, E.E5, 0.4, { slide: 14, gain: 0.025 }), ['pop', +(j + 0.85).toFixed(3), 196, 0.05, 0], ['boom', +(j + 0.85).toFixed(3), 0.05], ['pop', +(j + 1.25).toFixed(3), 329.63, 0.03, 0]]),
  ...[T.l9, T.l10].flatMap(l => [...[0, 1, 2].map(i => ['tick', +(l + i * 0.1).toFixed(3), 0.035]), ['pop', +(l + 0.32).toFixed(3), 880, 0.035, 0]]),
  ['riser', T.rocket[0] - 0.3, T.rocket[1], 0.05], ['whoosh', T.rocket[1], 0.5, 0.06],
  ['whoosh', T.launch + 0.3, 0.4, 0.05], ['boom', T.bonk, 0.22], ['pop', T.bonk, 220, 0.06, 0], ['bell', T.bonk + 0.02, 1760, 0.03, 0.8, 0], chip(T.bonk + 0.05, E.B5, 0.5, { slide: -30, gain: 0.03 }),
  ['pop', T.flop, 164.81, 0.06, 0], ['boom', T.flop, 0.08],
  ...[0, 1, 2].flatMap(i => chirp(T.crick2[0] + i * 0.3 + 0.02, [-0.5, 0.5, 0][i])),
  ...boo(T.boo4[0], 1.6, 1.4), ['tick', T.boo4[0], 0.03],
  // 5 · plot twist
  ...head(T.h5, 1, T.h5Land, 0),
  ['pop', T.eachOther, 659.25, 0.035, -0.3], ['pop', T.eachOther + 0.12, 659.25, 0.035, 0.3], ['bell', T.sparkle, 1318.51, 0.03, 1.0, 0],
  ['pop', T.standL[1], 523.25, 0.04, -0.2], ['pop', T.standC[1], 587.33, 0.04, 0.2], ['glitter', T.hand, T.hand + 0.4],
  // 6 · cheering each other
  ...head(T.h6, 3, T.h6Land, 1),
  ...Array.from({ length: 10 }, (_, i) => chip(T.poms + i * 0.2, 3000, 0.05, { wave: 'noise', gain: 0.012, decay: 0.04, sustain: 0, pan: i % 2 ? 0.4 : -0.4 })),
  ['whoosh', T.jumpC2 + 0.4, 0.4, 0.04], chip(T.jumpC2 + 0.15, E.E5, 0.4, { slide: 14, gain: 0.025 }),
  ['swell', T.same - 0.6, T.same, { gain: 0.05, f0: 600, f1: 4000 }], ...claps(T.same + 0.05, T.same + 2.6, 11), ['glitter', T.same, T.same + 0.8],
  ...fanfare(T.same, 1.1), ['bell', T.same + 0.05, 1318.51, 0.04, 1.6, 0],
  ['pop', T.signLeo, 880, 0.035, 0.3], ['pluck', T.signLeo + 0.05, 1318.51, 0.03, 0.5, 0.3],
  // 7 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'E' }),
  // 8 · team stats
  ...head(T.h7, 3, T.h7Land, 1), ['whoosh', T.panel[0] + 0.2, 0.4, 0.04],
  ...T.arcs.flatMap((a, i) => [['whoosh', a + 0.3, 0.4, 0.025], ['pluck', +(a + 0.42).toFixed(3), [987.77, 1244.51, 1479.98][i], 0.035, 0.6, (i - 1) * 0.3]]),
  ['whoosh', T.panelOut[0] + 0.15, 0.3, 0.03],
  // 9 · gold, both of you
  ...head(T.h8, 4, T.h8 + 0.5, 2), ['pop', T.podium[0] + 0.1, 392, 0.04, 0],
  ['whoosh', T.hopUp[0] + 0.2, 0.35, 0.03], ['pop', T.hopUp[1], 523.25, 0.04, -0.2], ['pop', T.hopUp[1] + 0.08, 587.33, 0.04, 0.2],
  ['bell', T.medalL[1], 1318.51, 0.045, 1.4, -0.3], ['bell', T.medalC[1], 1661.22, 0.045, 1.4, 0.3], ['glitter', T.medalL[1], T.medalC[1] + 0.6],
  ...fanfare(T.medalC[1] + 0.1, 0.9), ...claps(T.medalL[1], T.medalL[1] + 2.0, 21),
  ['whoosh', T.out[0], 0.35, 0.03],
  // dialogue
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [L_TAG]: 783.99, [C_TAG]: 587.33, [G_TAG]: 1046.5, [S_TAG]: 880 } })),
  ...cardCutCues(CUTS()),
  ...endcardCues(STORY_END),
]
