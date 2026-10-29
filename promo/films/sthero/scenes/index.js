// sthero — "Captain Boundaries." (60 s vertical Align ad, Star Talk "Wild Lessons" #17, music: cinematic, E minor — a
// superhero blockbuster). Story 0–55.6, then the shared end card.
//   0.0–4.45   A searchlight throws a gold "B" onto a cloud. "The sky needs | a *hero.*"  ♓ PISCES on a cloud rooftop,
//              surrounded by its own little balloons (yes! · sure! · of course!!): "help!! I can't stop saying *yes!* 😭"
//   4.49–9.5   (drop) ♍ CAPTAIN BOUNDARIES dives in and lands — THUD. "Captain | *Boundaries.*"  Credits: power: saying no ·
//              Pisces: says yes to everything. "fear not, citizen. I'm *here.*"
//   9.55       card cut.
//   9.6–19.2   "Villain #1: | *The Borrower.*" (top hat, monocle; WEAKNESS: PAYING BACK) slides right up to Pisces:
//              "hey bestie. can I borrow *$40?*"  An I.O.U. scroll unrolls ($20 · $50 · your car · your hoodie…).
//              "also your car. and your *hoodie.*"  Pisces happily opens its wallet: a moth flies out.  The Captain dashes
//              in: NO!  A gold force field slams down between them, BOING, the Borrower sails off.  "Loan: | *denied.*"
//              Pisces: "wait. you can just *say that?*"
//  19.3        card cut.
//  19.3–30.5   "Villain #2: | *Dr. Overreacting.*" (goggles, lab coat; PHD IN DISMISSING). Pisces: "that kinda hurt my
//              *feelings.* 🥺"  "you're *overreacting.*" — Pisces shrinks.  "you're OVER-*overreacting.*" — it shrinks
//              more.  NOPE!  The force field; the doctor bounces, sits dazed, and tells the wall it's overreacting.
//              "Feelings: | *valid.*"  The Captain: "their feelings are *valid.*" — Pisces grows back.
//  30.6        card cut.
//  30.6–41.3   "Villain #3: | *The Phone Peeker.*" Pisces texts Mom; a periscope rises behind it, then the Peeker (fedora,
//              shades): "ooh. who's '*Mom*'?"  The Captain is far off, busy with the Borrower in a fake-nose disguise
//              ("hi. new guy. $40?" "NO."). "No hero | *nearby.*"  Pisces breathes in… "...no. that's *private.*"
//              A tiny "no." — and its OWN pink force field slams down. BONK. The crowd cheers. "Pisces said | *no.*"
//              The Captain flies back: "citizen... you *did that.*"
//  41.35       card cut.
//  41.35–46.1  "The secret | *identity…*" (drumroll) The mask comes off: "just a Virgo who says *no.*"  Capes pop onto
//              Pisces and every citizen. "The secret identity: | *everyone.*"  Pisces: "I'M A HERO!!"
//  46.16–50.8  ★ LESSON UNLOCKED: "A boundary is | a superpower. | Use it *early.*"  +1 BOUNDARIES
//  50.85–53.9  "Dealbreakers: | your *force field.*"  The sign-up card: three dealbreakers stamp in, one per villain.
//              "pick yours at signup. *day one.*"
//  53.95–55.5  "Saving the sky, | one *no* at a time."  The Captain and Pisces fly off past the moon.
// One canvas (sky + world through a camera + screen-space props), DOM type + dialogue boxes + the shared lesson, grain.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  INK, rgba, mixHex, starFrame, inSprite, FOOT, tearsCells, sweatCells, capeCells, maskCells, emblemCells, tophatCells,
  monocleCells, grouchoCells, gogglesCells, labcoatCells, fedoraCells, shadesCells, blit, drawBurst, drawBalloon, drawField,
  drawWallet, drawMoth, drawPhone, drawPeriscope, drawIOU, dizzy,
} from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', RED = '#ff5a6e', MINT = '#7dffb0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)            // the 108 bpm grid
const VIR = signStar('virgo'), PIS = signStar('pisces')
const BOR_C = '#9fe07a', DOC_C = '#7fd8e8', PEEK_C = '#b48cff'

// ── the timeline
const T = {
  black: [0, 0.2],
  // 0 · the signal
  beam: [0.15, 0.6], signal: BEAT(0), yes: [1.75, 2.35, 2.95], l1: 1.25, close1: 4.4, signalOut: [4.25, 4.75],
  // 1 · the hero lands
  swoop: [4.0, BEAT(7)], land: BEAT(7), cred: [5.3, 5.85], gleam: 5.6, l2: 6.2, close2: 9.35,
  cut1: 9.55,
  // 2 · the Borrower
  borIn: [9.55, 10.25], borChip: [10.3, 13.0], l3: 10.4, iou: [12.4, 13.6], l4: 13.45, wallet: [14.2, 14.5], moth: 14.6,
  dash1: [15.3, 15.6], no1: 15.6, bonk1: 15.85, fly1: [15.85, 16.9], l5: 16.3, close3: 19.1,
  cut2: 19.3,
  // 3 · Dr. Overreacting
  docIn: [19.25, 19.95], docChip: [20.2, 22.6], l6: 20.0, l7: 22.85, shrink1: [23.35, 23.65], l8: 25.3, shrink2: [26.05, 26.35],
  dash2: [26.6, 26.9], no2: 26.9, bonk2: [27.15, 27.75], l9: 27.95, grow: [28.45, 28.95], wallQuip: [28.7, 30.3], close4: 30.4,
  cut3: 30.6,
  // 4 · the Phone Peeker
  capAway: [30.75, 31.4], phone: [30.65, 30.95], scope: [31.4, 32.2], scopeTurn: [32.2, 32.45], peekUp: [32.75, 33.1], peekChip: [33.4, 35.2],
  cameo: [31.6, 31.9], cameoAsk: [31.85, 33.5], cameoNo: [33.25, 34.6], cameoWall: 33.3, cameoBonk: [33.45, 34.1],
  l10: 33.1, look: 34.4, breath: [35.25, 35.85], l11: 35.7, tinyNo: 36.45, wall3: BEAT(65), cheer: 37.05,
  capBack: [37.45, 38.05], l12: 38.25, close5: 41.15,
  cut4: 41.35,
  // 5 · the secret identity
  roll: [41.4, 42.2], maskOff: [42.2, 42.75], l13: 42.3, capes: 43.6, heroQuip: [44.25, 45.9], close6: 45.0,
  // 6 · lesson
  lesson: BEAT(82), lessonOut: [50.6, 50.8],
  // 7 · dealbreakers
  panel: [50.85, 51.25], stamps: [51.45, 51.9, 52.35], l14: 51.0, close7: 54.0, panelOut: [53.6, 53.9],
  // 8 · fly away
  flyoff: [54.1, 55.3], out: [55.15, 55.5],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'A boundary is | a superpower. | Use it *early.*', chip: '+1 BOUNDARIES' }

// ── the dialogue
const CT = '♍︎ CAPTAIN BOUNDARIES', PT = '♓︎ PISCES', BT = 'THE BORROWER', DT = 'DR. OVERREACTING', KT = 'THE PHONE PEEKER'
const CC = '#ff7e8e', PC = LAV, BC = BOR_C, DC = DOC_C, KC = PEEK_C
const LINES1 = [{ t: T.l1, speaker: PT, color: PC, text: "help!! I can't stop saying *yes!* 😭" }]
const LINES2 = [{ t: T.l2, speaker: CT, color: CC, text: "fear not, citizen. I'm *here.*" }]
const LINES3 = [
  { t: T.l3, speaker: BT, color: BC, text: 'hey bestie. can I borrow *$40?*' },
  { t: T.l4, speaker: BT, color: BC, text: 'also your car. and your *hoodie.*' },
  { t: T.l5, speaker: PT, color: PC, text: 'wait. you can just *say that?*' },
]
const LINES4 = [
  { t: T.l6, speaker: PT, color: PC, text: 'that kinda hurt my *feelings.* 🥺' },
  { t: T.l7, speaker: DT, color: DC, text: "you're *overreacting.*" },
  { t: T.l8, speaker: DT, color: DC, text: "you're OVER-*overreacting.*" },
  { t: T.l9, speaker: CT, color: CC, text: 'their feelings are *valid.*' },
]
const LINES5 = [
  { t: T.l10, speaker: KT, color: KC, text: "ooh. who's '*Mom*'?" },
  { t: T.l11, speaker: PT, color: PC, text: "...no. that's *private.*" },
  { t: T.l12, speaker: CT, color: CC, text: 'citizen... you *did that.*' },
]
const LINES6 = [{ t: T.l13, speaker: CT, color: CC, text: 'just a Virgo who says *no.*' }]
const LINES7 = [{ t: T.l14, speaker: CT, color: GOLD, text: 'pick yours at signup. *day one.*' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5, ...LINES6, ...LINES7]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5], [LINES6, T.close6], [LINES7, T.close7]]

// ── headlines: one spec drives the type and its sound
const HEADS = [
  { text: 'The sky needs | a *hero.*', top: 150, size: 104, accentSize: 164, at: 0.8, gap: 0.08, late: 1, lateAt: 1.35, accentColor: GOLD, out: [4.0, 4.2] },
  { text: 'Captain | *Boundaries.*', top: 150, size: 112, accentSize: 176, at: 4.55, gap: 0.1, late: 1, lateAt: BEAT(8), accentColor: RED, out: [9.15, 9.35], fit: true },
  { text: 'Villain #1: | *The Borrower.*', top: 150, size: 96, accentSize: 150, at: 9.66, late: 2, lateAt: 10.0, lateGap: 0.12, accentColor: BOR_C, out: [15.2, 15.4], fit: true },
  { text: 'Loan: | *denied.*', top: 150, size: 116, accentSize: 184, at: 15.95, late: 1, lateAt: 16.25, accentColor: GOLD, out: [18.9, 19.1] },
  { text: 'Villain #2: | *Dr. Overreacting.*', top: 150, size: 96, accentSize: 140, at: 19.4, late: 2, lateAt: 19.75, lateGap: 0.12, accentColor: DOC_C, out: [26.45, 26.65], fit: true },
  { text: 'Feelings: | *valid.*', top: 150, size: 112, accentSize: 184, at: 27.2, late: 1, lateAt: 27.5, accentColor: GOLD, out: [30.2, 30.4] },
  { text: 'Villain #3: | *The Phone Peeker.*', top: 150, size: 96, accentSize: 138, at: 30.7, late: 3, lateAt: 31.0, lateGap: 0.12, accentColor: PEEK_C, out: [34.3, 34.5], fit: true },
  { text: 'No hero | *nearby.*', top: 150, size: 112, accentSize: 176, at: 34.65, late: 1, lateAt: 34.95, accentColor: CYAN, out: [36.35, 36.5] },
  { text: 'Pisces said | *no.*', top: 150, size: 112, accentSize: 196, at: 36.8, late: 1, lateAt: 37.05, accentColor: PINK, out: [41.0, 41.2] },
  { text: 'The secret | *identity…*', top: 150, size: 112, accentSize: 170, at: 41.45, late: 1, lateAt: 41.8, accentColor: GOLD, out: [43.3, 43.5] },
  { text: 'The secret identity: | *everyone.*', top: 150, size: 92, accentSize: 176, at: 43.6, gap: 0.08, late: 1, lateAt: 44.0, accentColor: GOLD, out: [45.8, 46.0], fit: true },
  { text: 'Dealbreakers: | your *force field.*', top: 150, size: 96, accentSize: 150, at: 50.9, late: 2, lateAt: 51.2, lateGap: 0.12, accentColor: GOLD, out: [53.55, 53.75], fit: true },
  { text: 'Saving the sky, | one *no* at a time.', top: 170, size: 96, accentSize: 168, at: 53.95, gap: 0.09, accentColor: RED, out: [55.2, 55.45], fit: true },
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
const win = (t, a, b, fi = 0.25, fo = 0.25) => clamp(prog(t, a, a + fi)) * (1 - prog(t, b - fo, b))

// ── the camera: keys [t, zoom, focusX, focusY, screenX, screenY, ease into this key]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic }
const IDN = [1, 540, 960, 540, 960]
const PUNCH = (t0, z, fx, fy, hold) => [[t0 - 0.05, ...IDN, 'lin'], [t0 + 0.12, z, fx, fy, 540, 1000, 'out'], [t0 + hold, z * 1.02, fx, fy, 540, 1000, 'lin'], [t0 + hold + 0.5, ...IDN, 'io']]
const CAM = [
  [0, 1.08, 540, 900, 540, 960], [4.0, 1.0, 540, 960, 540, 960, 'io'],
  ...PUNCH(T.no1, 1.14, 560, 980, 0.95),
  [23.3, ...IDN, 'lin'], [23.6, 1.16, 330, 1090, 540, 1060, 'out'], [26.3, 1.2, 330, 1110, 540, 1060, 'lin'], [26.75, ...IDN, 'io'],
  ...PUNCH(T.no2, 1.14, 600, 980, 1.0),
  [35.2, ...IDN, 'lin'], [35.9, 1.12, 380, 1060, 540, 1000, 'io'], [36.6, 1.12, 380, 1060, 540, 1000, 'lin'], [36.85, 1.2, 440, 1060, 540, 1000, 'out'], [37.9, 1.2, 440, 1060, 540, 1000, 'lin'], [38.4, ...IDN, 'io'],
]
function cam(t) {
  let i = 0
  while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
  const a = CAM[i], b = CAM[i + 1]
  if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
  const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
  return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
}
const SLAMS = [[T.land, 16], [T.no1 + 0.15, 18], [T.no2 + 0.15, 18], [T.cameoWall + 0.1, 5], [T.wall3 + 0.12, 22], [T.bonk2[1], 8]]
function shake(t) {
  let dx = 0, dy = 0
  for (const [s, a] of SLAMS) { const k = t - s; if (k < 0 || k > 0.45) continue; const d = a * Math.exp(-k * 9); dx += d * Math.sin(k * 70); dy += d * Math.cos(k * 55) }
  return { dx, dy }
}
const toS = (C, wx, wy) => ({ x: C.sx + (wx - C.fx) * C.z, y: C.sy + (wy - C.fy) * C.z })

// ── the world
const ROOF = 1250
const sY = (s, base = ROOF) => base - FOOT * s
const PIS_X = 300, PIS_S = 190
const VIL_X = 660, VIL_S = 190
const WALL_X = 480
const CAP_H = { x: 170, y: 640, s: 170 }, CAP_W = { x: 480, y: 690, s: 200 }, CAP_BG = { x: 840, y: 650, s: 120 }
const CAP_STAND = { x: 700, s: 270 }, CAP_BACK = { x: 650, s: 230 }, CAP_REV = { x: 660, s: 260 }
const TOWERS = [{ x: 0, w: 190, top: 1046 }, { x: 160, w: 150, top: 992 }, { x: 560, w: 170, top: 968 }, { x: 790, w: 180, top: 1018 }, { x: 940, w: 150, top: 1066 }]
const CITS = [
  { x: 92, s: 64, c: CYAN, tw: 0 }, { x: 236, s: 58, c: '#ff9a7a', tw: 1 }, { x: 650, s: 56, c: MINT, tw: 2 },
  { x: 884, s: 62, c: '#ffd66e', tw: 3 }, { x: 1012, s: 60, c: PINK, tw: 4 },
].map((c, i) => ({ ...c, y: sY(c.s, TOWERS[c.tw].top), seed: 20 + i, cape: ['#e8344e', '#5aa0ff', '#ffb84a', '#7a5cff', '#2fc49a'][i] }))

// the captain: position + costume state
function capPose(t) {
  const P = { x: 0, y: 0, s: 0, fly: 0.25, dir: -1, mood: 'neutral', look: [1, 0], squash: 0, mask: 1, vis: true, blush: undefined }
  const at = (o, y) => { P.x = o.x; P.y = y ?? o.y; P.s = o.s }
  const move = (a, b, w, e = ease.inOutCubic) => { const p = e(prog(t, ...w)); P.x = lerp(a.x, b.x, p); P.y = lerp(a.y, b.y, p); P.s = lerp(a.s, b.s, p); P.fly = 1; P.dir = b.x > a.x ? -1 : 1 }
  const stand = o => ({ x: o.x, y: sY(o.s), s: o.s })
  if (t < T.swoop[0]) { P.vis = false; return P }
  if (t < T.land) { move({ x: 1300, y: -260, s: 270 }, stand(CAP_STAND), T.swoop, ease.inQuad); P.mood = 'squint'; P.look = [-1, 1]; return P }
  if (t < T.cut1) {
    at(stand(CAP_STAND)); P.fly = 0.18
    const k = t - T.land; P.squash = 0.22 * Math.exp(-k * 7) * Math.cos(k * 18)
    P.mood = t < T.land + 0.5 ? 'squint' : t < T.l2 ? 'happy' : 'sparkle'; P.look = [-1, 0]
    return P
  }
  const hover = () => { at(CAP_H); P.fly = 0.4; P.mood = 'neutral'; P.look = [1, 1] }
  const atWall = () => { at(CAP_W); P.fly = 0.45; P.mood = 'squint'; P.look = [1, 0]; P.dir = -1 }
  if (t < T.dash1[0]) { hover(); P.mood = t > T.l4 ? 'squint' : 'neutral'; return P }
  if (t < T.dash1[1]) { move(CAP_H, CAP_W, T.dash1); P.mood = 'squint'; return P }
  if (t < T.cut2) {
    atWall(); const k = t - T.no1; P.squash = -0.12 * Math.exp(-k * 8)
    if (t > T.l5) { P.mood = 'wink'; P.look = [-1, 0] }
    return P
  }
  if (t < T.dash2[0]) { hover(); P.mood = t > T.l8 ? 'squint' : 'neutral'; P.look = [1, 1]; return P }
  if (t < T.dash2[1]) { move(CAP_H, CAP_W, T.dash2); P.mood = 'squint'; return P }
  if (t < T.cut3) { atWall(); const k = t - T.no2; P.squash = -0.12 * Math.exp(-k * 8); if (t > T.grow[0]) { P.mood = 'happy' } return P }
  if (t < T.capAway[0]) { atWall(); P.mood = 'neutral'; return P }
  if (t < T.capAway[1]) { move(CAP_W, CAP_BG, T.capAway); return P }
  if (t < T.capBack[0]) {
    at(CAP_BG); P.fly = 0.4; P.look = [1, 0]; P.dir = 1
    P.mood = inR(t, T.cameoNo[0], T.cameoNo[1]) ? 'squint' : t > T.wall3 ? 'wide' : 'neutral'
    if (t > T.wall3) P.look = [-1, 1]
    return P
  }
  if (t < T.capBack[1]) { move(CAP_BG, stand(CAP_BACK), T.capBack); P.mood = 'sparkle'; return P }
  if (t < T.cut4) { at(stand(CAP_BACK)); P.fly = 0.15; P.mood = t < T.l12 ? 'sparkle' : 'heart'; P.look = [-1, 0]; const k = t - T.capBack[1]; P.squash = 0.15 * Math.exp(-k * 8) * Math.cos(k * 18); return P }
  // the reveal → lesson → tie-in → fly away
  at(stand(CAP_REV)); P.fly = 0.2; P.look = [-1, 0]
  P.mask = t < T.maskOff[0] ? 1 : 0
  P.mood = t < T.maskOff[0] ? 'neutral' : t < T.capes ? 'happy' : 'sparkle'
  if (inR(t, T.roll[0], T.maskOff[0])) { P.mood = 'squint'; P.squash = 0.03 * Math.sin(t * 40) }
  if (t >= T.flyoff[0]) { move(stand(CAP_REV), { x: 1350, y: -320, s: 200 }, T.flyoff, ease.inQuad); P.mood = 'happy'; P.mask = 0 }
  return P
}
// Pisces: scale (the shrink), mood, tears, props
function pisScale(t) {
  const s1 = ease.outBack(prog(t, ...T.shrink1)), s2 = ease.outBack(prog(t, ...T.shrink2)), g = ease.outBack(prog(t, ...T.grow))
  return lerp(lerp(lerp(1, 0.72, s1), 0.44, s2), 1, g)
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [1, 0], tears: 1, squash: 0, sweat: 0, cape: 0, wallet: 0, phone: 0 }
  if (t < T.land) { st.mood = 'wide'; st.tears = 2; st.look = [0, -1]; return st }
  if (t < T.cut1) { st.mood = t < T.cred[1] + 0.3 ? 'wide' : 'sparkle'; st.tears = 2; st.look = [1, -1]; return st }
  if (t < T.cut2) {
    st.look = [1, 0]
    st.mood = t < T.no1 ? 'happy' : t < T.l5 ? 'wide' : 'sparkle'
    st.wallet = t >= T.wallet[0] && t < T.no1 + 0.1 ? 1 : 0
    st.tears = t < T.l5 ? 1 : 2
    return st
  }
  if (t < T.cut3) {
    st.look = [1, 0]
    st.mood = t < T.l7 ? 'neutral' : t < T.grow[0] ? 'wide' : 'sparkle'
    st.tears = t < T.grow[0] ? 2 : 3
    return st
  }
  if (t < T.cut4) {
    st.phone = 1
    st.mood = t < T.peekUp[1] ? 'happy' : t < T.breath[0] ? 'wide' : t < T.wall3 + 0.5 ? 'squint' : 'sparkle'
    st.look = t < T.look ? [1, 1] : t < T.breath[0] ? [1, -1] : [1, 0]
    st.sweat = inR(t, T.l10 + 0.3, T.wall3) ? 1 : 0
    st.squash = inR(t, ...T.breath) ? -0.08 * Math.sin(Math.PI * prog(t, ...T.breath)) : 0
    st.tears = t < T.wall3 ? 1 : 3
    return st
  }
  st.mood = t < T.capes ? 'sparkle' : 'heart'; st.look = [1, 0]; st.tears = t < T.capes ? 2 : 3
  st.cape = ease.outBack(prog(t, T.capes, T.capes + 0.35))
  return st
}
// villains: x position (null = gone), rotation, lift
function borPose(t) {
  if (t < T.borIn[0] || t >= T.cut2) return null
  if (t < T.bonk1) { const p = ease.outCubic(prog(t, ...T.borIn)); return { x: lerp(1320, VIL_X, p), y: sY(VIL_S), rot: 0, s: VIL_S } }
  const p = prog(t, ...T.fly1)
  if (p >= 1) return null
  return { x: lerp(VIL_X, 1420, ease.inQuad(p)), y: sY(VIL_S) - Math.sin(Math.PI * Math.min(1, p * 1.4)) * 520 - p * 200, rot: p * 9, s: VIL_S }
}
function docPose(t) {
  if (t < T.docIn[0] || t >= T.cut3) return null
  if (t < T.bonk2[0]) { const p = ease.outCubic(prog(t, ...T.docIn)); return { x: lerp(1320, VIL_X, p), y: sY(VIL_S), rot: 0, s: VIL_S, sq: 0 } }
  const p = prog(t, ...T.bonk2), e = ease.outQuad(p)
  const k = t - T.bonk2[1]
  return { x: lerp(VIL_X, 900, e), y: sY(170) - Math.sin(Math.PI * p) * 260, rot: p < 1 ? p * TAU : 0, s: lerp(VIL_S, 170, e), sq: p >= 1 ? 0.18 + 0.1 * Math.exp(-k * 8) * Math.cos(k * 20) : 0 }
}

// talk hops
const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })
const C_HOPS = [...hopsOf(CT), T.no1, T.no2, T.cameoWall, T.capBack[1] + 0.1, T.capes, T.capes + 0.45, T.lesson + 0.2, T.stamps[2] + 0.1]
const P_HOPS = [...hopsOf(PT), T.cred[1], ...T.yes, T.grow[1], T.wall3 + 0.6, T.cheer + 0.4, T.capes + 0.1, T.capes + 0.55, T.capes + 1.0]
const B_HOPS = [...hopsOf(BT), T.borIn[1]], D_HOPS = [...hopsOf(DT), T.docIn[1], T.shrink1[0], T.shrink2[0]], K_HOPS = hopsOf(KT)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 120px Inter", "italic 900 120px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 34px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1480, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { ...BOX, lines, open: lines[0].t - 0.2, close }))
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.7 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const stroked = (txt, X, Y, size, col, lw = 10, font = MONO, weight = 700) => { x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  /** a star with costume: under() is drawn behind it (the cape), over() on top, both in sprite cells */
  function star(cx, cy, size, t, opts, over, under) {
    const F = starFrame(cx, cy, size, t, opts)
    if (under) inSprite(x, F, () => under(F))
    drawStarChar(x, cx, cy, size, t, opts)
    if (over) inSprite(x, F, () => over(F))
    return F
  }
  function puff(t, cx, cy, t0, n = 8, spread = 160, dur = 0.6) {
    const k = t - t0
    if (k < 0 || k > dur) return
    const p = ease.outCubic(k / dur)
    x.save(); x.globalAlpha = 1 - p
    for (let i = 0; i < n; i++) { const side = i % 2 ? 1 : -1, d = (0.4 + (i >> 1) / n) * spread * p; const r = 18 * (1 - 0.5 * p) + (i % 3) * 4; x.fillStyle = INK; x.fillRect(cx + side * d - r - 4, cy - 10 - p * 30 * ((i % 3) + 1) - r - 4, r * 2 + 8, r * 2 + 8); x.fillStyle = '#e6dcff'; x.fillRect(cx + side * d - r, cy - 10 - p * 30 * ((i % 3) + 1) - r, r * 2, r * 2) }
    x.restore()
  }
  function speedLines(t, a, b, w) {
    // white streaks trailing a dash from a → b during w
    const p = prog(t, ...w)
    if (p <= 0 || p >= 1) return
    const px = lerp(a.x, b.x, ease.inOutCubic(p)), py = lerp(a.y, b.y, ease.inOutCubic(p)), ang = Math.atan2(b.y - a.y, b.x - a.x)
    x.save(); x.translate(px, py); x.rotate(ang); x.globalAlpha = Math.sin(Math.PI * p)
    for (let i = 0; i < 7; i++) { const off = (i - 3) * 22, len = 160 + (i % 3) * 70; x.fillStyle = i % 2 ? '#ffffff' : '#ffe9a8'; x.fillRect(-len - 60, off, len, 6) }
    x.restore()
  }

  // ═══════════════════════ the skyline (pre-rendered) ═══════════════════════
  const sky2 = document.createElement('canvas'); sky2.width = W; sky2.height = 520
  {
    const s = sky2.getContext('2d'), Y0 = 920
    for (const tw of TOWERS) {
      const top = tw.top - Y0
      s.fillStyle = INK; s.fillRect(tw.x - 6, top - 6, tw.w + 12, 520)
      s.fillStyle = '#3a2f6e'; s.fillRect(tw.x, top, tw.w, 520)
      s.fillStyle = '#4a3d86'; s.fillRect(tw.x, top, 12, 520)
      s.fillStyle = '#6a5cb0'; s.fillRect(tw.x, top, tw.w, 8)
      // a puffy cloud cap on each roof
      for (let i = 0; i < tw.w; i += 24) { const bh = 10 + ((i * 7) % 3) * 6; s.fillStyle = INK; s.fillRect(tw.x + i - 3, top - bh - 3, 30, bh + 3); s.fillStyle = '#b9aef0'; s.fillRect(tw.x + i, top - bh, 24, bh) }
      // windows
      const R = rng(tw.x + 3)
      for (let y = top + 34; y < 520; y += 44) for (let xx = tw.x + 22; xx < tw.x + tw.w - 28; xx += 40) { const on = R() > 0.45; s.fillStyle = on ? '#ffd98a' : '#241c4e'; s.fillRect(xx, y, 20, 24); if (on) { s.fillStyle = '#fff2c4'; s.fillRect(xx, y, 6, 6) } }
    }
  }
  function skyline(t) {
    x.drawImage(sky2, 0, 920)
    // a few windows flicker
    for (let i = 0; i < 6; i++) { const ph = (t * 0.3 + i * 0.37) % 1; if (ph > 0.12) continue; const tw = TOWERS[i % TOWERS.length]; x.fillStyle = '#fff2c4'; x.fillRect(tw.x + 22 + (i % 2) * 40, tw.top + 78 + (i % 3) * 44, 20, 24) }
  }
  function roof(t) {
    // the foreground cloud rooftop: a puffy lavender top edge, then the slab
    const top = ROOF
    x.fillStyle = INK; x.fillRect(-200, top - 6, W + 400, H - top + 400)
    const g = x.createLinearGradient(0, top, 0, H); g.addColorStop(0, '#8f80d8'); g.addColorStop(0.2, '#5b4ca6'); g.addColorStop(1, '#2a1f5c')
    x.fillStyle = g; x.fillRect(-200, top, W + 400, H - top + 400)
    for (let i = -200; i < W + 200; i += 36) { const bh = 14 + Math.abs(Math.sin(i * 0.05)) * 18; x.fillStyle = INK; x.fillRect(i - 4, top - bh - 4, 44, bh + 6); x.fillStyle = '#d6ccff'; x.fillRect(i, top - bh, 36, bh + 2); x.fillStyle = '#f1ecff'; x.fillRect(i + 4, top - bh, 12, 6) }
    // drifting wisps
    for (let i = 0; i < 5; i++) { const xx = ((i * 260 + t * 18) % (W + 300)) - 150; x.fillStyle = 'rgba(214,204,255,0.25)'; x.fillRect(xx, top + 70 + i * 34, 140, 10) }
  }

  // ═══════════════════════ the signal (hook) ═══════════════════════
  const SIG = { x: 540, y: 690 }
  function signal(t) {
    const k = clamp(prog(t, ...T.beam)) * outK(t, T.signalOut)
    if (k <= 0) return
    // the searchlight on the roof
    const lx = 880, ly = ROOF - 40
    // the beam
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = k
    const g = x.createLinearGradient(lx, ly, SIG.x, SIG.y); g.addColorStop(0, 'rgba(255,240,180,0.55)'); g.addColorStop(1, 'rgba(255,240,180,0.18)')
    x.fillStyle = g; x.beginPath(); x.moveTo(lx - 20, ly); x.lineTo(lx + 20, ly); x.lineTo(SIG.x + 210, SIG.y + 30); x.lineTo(SIG.x - 190, SIG.y - 40); x.closePath(); x.fill()
    x.restore()
    // the cloud
    x.save(); x.globalAlpha = clamp(k * 1.5)
    blit(x, ['......XXXXXX..........', '...XXXXXXXXXXX.XXXX...', '..XXXXXXXXXXXXXXXXXXX.', 'XXXXXXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXXXXXX', '.XXXXXXXXXXXXXXXXXXXX.', '...XXXXXXXXXXXXXXXX...'], { X: '#6f6694' }, SIG.x, SIG.y, 22)
    // the projected emblem: a bright oval with a dark diamond-B silhouette
    const fl = bump(t, T.signal, 0.35)
    x.fillStyle = mixHex('#ffe58a', '#ffffff', fl); x.beginPath(); x.ellipse(SIG.x, SIG.y, 170, 64, -0.06, 0, TAU); x.fill()
    blit(x, ['...KK...', '..KYYK..', '.KKYKYK.', 'KKKYYKKK', '.KKYKYK.', '..KYYK..', '...KK...'], { K: '#2a1b46', Y: '#ffe58a' }, SIG.x, SIG.y, 14, { outline: null })
    x.restore()
    x.save(); x.globalAlpha = k
    blit(x, ['.KKKK.', 'KGGGGK', 'KGWWGK', 'KGGGGK', '.KKKK.', '..KK..', '.KKKK.'], { K: '#3a2f6e', G: '#8a8fa8', W: '#fff2a8' }, lx, ly, 12)
    x.restore()
  }
  const YES = ['yes!', 'sure!', 'of course!!']
  function yesBalloons(t) {
    if (t > T.land) return
    const pos = [[150, 960], [470, 930], [300, 850]]
    T.yes.forEach((y0, i) => {
      const k = pop01(t, y0, 0.3, 2.4) * outK(t, [T.swoop[0] + 0.1, T.land])
      drawBalloon(x, pos[i][0], pos[i][1], YES[i], { k, tx: PIS_X, ty: sY(PIS_S) - 40, size: 30 })
    })
  }

  // ═══════════════════════ characters ═══════════════════════
  function citizens(t) {
    for (const c of CITS) {
      const shock = [T.no1, T.no2, T.wall3].some(s => inR(t, s, s + 1.0))
      const cheer = t >= T.cheer && t < T.cut4
      const hops = [T.no1 + 0.9, T.no2 + 0.9, T.cheer + c.seed * 0.03, T.cheer + 0.5 + c.seed * 0.02, T.capes + 0.1 * (c.seed - 20), T.capes + 0.5 + 0.1 * (c.seed - 20)]
      const mood = t >= T.capes ? 'heart' : shock ? 'wide' : cheer ? 'happy' : t < T.land ? 'wide' : 'neutral'
      const capeK = ease.outBack(prog(t, T.capes + 0.1 * (c.seed - 20), T.capes + 0.1 * (c.seed - 20) + 0.35))
      star(c.x, c.y, c.s, t, { color: c.c, mood, seed: c.seed, hops, glow: 0.6 }, null, capeK > 0.05 ? () => capeCells(x, t, { fly: 0.3, dir: c.x > 540 ? 1 : -1, color: c.cape, len: capeK }) : null)
      if (cheer && t < T.cheer + 1.6) sparkleRing(t, c.x, c.y - 30, T.cheer + 0.1, 6, 50, c.seed, [GOLD, PINK, BONE], 0.6, 14)
    }
  }
  function captain(t) {
    const P = capPose(t)
    if (!P.vis) return
    star(P.x, P.y, P.s, t, { color: VIR.color, mood: P.mood, look: P.look, squash: P.squash, hops: C_HOPS, seed: 4, blush: P.blush, bob: P.fly > 0.3 ? P.s * 0.05 : undefined },
      () => { if (P.mask) maskCells(x); emblemCells(x, bump(t, T.gleam, 0.5) + bump(t, T.capes, 0.5)) },
      () => capeCells(x, t, { fly: P.fly, dir: P.dir }))
    // the mask flies off
    if (t >= T.maskOff[0] && t < T.maskOff[1] + 0.6) {
      const p = prog(t, T.maskOff[0], T.maskOff[1] + 0.6), mx = P.x - 20 - p * 420, my = P.y - 20 - Math.sin(Math.PI * Math.min(1, p * 1.2)) * 380 + p * 300
      x.save(); x.translate(mx, my); x.rotate(-p * 8); x.globalAlpha = 1 - prog(p, 0.75, 1)
      blit(x, ['.MMMMMM...MMMMMM.', 'MMMMMMMMMMMMMMMMM', 'MM....MMMMM....MM', 'MM....MM.MM....MM', '.MMMMMM...MMMMMM.'], { M: '#e8344e' }, 0, 0, 7)
      x.restore()
    }
    if (inR(t, T.dash1[0], T.dash1[1] + 0.05)) speedLines(t, CAP_H, CAP_W, T.dash1)
    if (inR(t, T.dash2[0], T.dash2[1] + 0.05)) speedLines(t, CAP_H, CAP_W, T.dash2)
    if (inR(t, ...T.capAway)) speedLines(t, CAP_W, CAP_BG, T.capAway)
    if (inR(t, ...T.capBack)) speedLines(t, CAP_BG, { x: CAP_BACK.x, y: sY(CAP_BACK.s) }, T.capBack)
    if (inR(t, ...T.swoop)) speedLines(t, { x: 1300, y: -260 }, { x: CAP_STAND.x, y: sY(CAP_STAND.s) }, T.swoop)
  }
  function pisces(t) {
    const ps = pisState(t), sc = pisScale(t), s = PIS_S * sc
    let px = PIS_X, py = sY(s)
    if (t >= T.flyoff[0] + 0.15) { const p = ease.inQuad(prog(t, T.flyoff[0] + 0.15, T.flyoff[1])); px = lerp(PIS_X, 1250, p); py = lerp(py, -260, p) }
    const flying = t >= T.flyoff[0] + 0.15
    star(px, py, s, t, { color: PIS.color, mood: ps.mood, look: ps.look, hops: P_HOPS, seed: 3, squash: ps.squash },
      () => { tearsCells(x, t, ps.tears); sweatCells(x, t, ps.sweat) },
      ps.cape > 0.05 ? () => capeCells(x, t, { fly: flying ? 1 : 0.25, dir: flying ? -1 : -1, color: '#5aa0ff', lining: '#ffd66e', len: ps.cape }) : null)
    // wallet + moth (V1)
    if (ps.wallet) {
      const k = pop01(t, T.wallet[0], 0.3, 2), open = prog(t, ...T.wallet)
      x.save(); x.translate(px + 108, py + 34); x.scale(k, k); drawWallet(x, 0, 0, 7, open); x.restore()
      if (t >= T.moth) { const m = t - T.moth; drawMoth(x, px + 108 + Math.sin(m * 5) * 40 + m * 30, py - m * 150, 7, t) }
    } else if (t >= T.no1 && t < T.cut2 && t - T.moth < 3) { const m = t - T.moth; drawMoth(x, px + 108 + Math.sin(m * 5) * 40 + m * 30, py - m * 150, 7, t) }
    // the phone (V3)
    if (ps.phone) drawPhone(x, px + 130, py + 10, t, { k: ease.outBack(prog(t, ...T.phone)) * 0.72, rot: 0.06 })
    // shrink sparkle / grow sparkle
    sparkleRing(t, px, py, T.grow[0], 10, 150, 1, [GOLD, PINK, BONE, LAV], 0.7, 24)
  }
  function borrower(t) {
    const B = borPose(t)
    if (!B) return
    const talking = inR(t, T.l3, T.l4 + 2)
    x.save(); x.translate(B.x, B.y); x.rotate(B.rot); x.translate(-B.x, -B.y)
    star(B.x, B.y, B.s, t, { color: BOR_C, mood: t >= T.bonk1 ? 'wide' : t > T.l4 - 0.3 ? 'wink' : talking ? 'happy' : 'neutral', look: [-1, 0], hops: B_HOPS, seed: 8 },
      () => { monocleCells(x); tophatCells(x, { tilt: -0.1, lift: t >= T.bonk1 ? 4 * clamp((t - T.bonk1) * 3) : 0 }) })
    x.restore()
    // the IOU scroll
    if (t >= T.iou[0] && t < T.bonk1) drawIOU(x, B.x + 168, B.y - 90, ease.outCubic(prog(t, ...T.iou)), ['$20', '$50', 'your car', 'your hoodie', 'your couch'])
  }
  function doctor(t) {
    const D = docPose(t)
    if (!D) return
    const dazed = t >= T.bonk2[1]
    x.save(); x.translate(D.x, D.y); x.rotate(D.rot); x.translate(-D.x, -D.y)
    star(D.x, D.y, D.s, t, { color: DOC_C, mood: t >= T.bonk2[0] ? (t > T.wallQuip[0] ? 'squint' : 'wide') : inR(t, T.l8, T.bonk2[0]) ? 'eyeroll' : t >= T.l7 ? 'squint' : 'neutral', look: dazed ? [-1, 0] : [-1, 0], hops: D_HOPS, seed: 6, squash: D.sq },
      () => { labcoatCells(x); gogglesCells(x, t) })
    x.restore()
    if (dazed) dizzy(x, D.x, D.y - D.s * 0.55, 70, t, drawPixelStar)
  }
  function peeker(t) {
    if (t < T.scope[0] || t >= T.cut4) return
    // the periscope (retracts on the wall)
    const up = ease.outCubic(prog(t, ...T.scope)) * (1 - ease.inCubic(prog(t, T.wall3, T.wall3 + 0.25)))
    const glint = bump(t, T.scopeTurn[1], 0.4) + bump(t, T.scopeTurn[1] + 0.9, 0.4)
    drawPeriscope(x, 600, ROOF + 10, up * 360, t, { dir: -1, glint })
    // the Peeker rises out of the cloud behind (and gets bonked back down)
    const rise = ease.outBack(prog(t, ...T.peekUp)) * (1 - ease.inCubic(prog(t, T.wall3 + 0.06, T.wall3 + 0.3)))
    if (rise <= 0.01) return
    const s = 176, y = lerp(ROOF + s * 0.7, sY(s) + 30, rise)
    x.save(); x.beginPath(); x.rect(0, 0, W, ROOF + 4); x.clip()
    star(660, y, s, t, { color: PEEK_C, mood: t >= T.wall3 ? 'wide' : 'neutral', look: [-1, 1], hops: K_HOPS, seed: 9 }, () => { shadesCells(x, (t * 0.7) % 1); fedoraCells(x) })
    x.restore()
  }
  function cameo(t) {
    // in the background: the Borrower is back, in a fake-nose disguise; the Captain is busy saying no to him
    if (t < T.cameo[0] || t >= T.cut4) return
    const k = pop01(t, T.cameo[0], 0.3, 2)
    const p = prog(t, ...T.cameoBonk), bx = lerp(990, 1300, ease.inQuad(p)), by = 690 - Math.sin(Math.PI * Math.min(1, p)) * 160
    if (p < 1) {
      x.save(); x.translate(bx, by); x.rotate(p * 7); x.translate(-bx, -by)
      star(bx, by, 100 * k, t, { color: BOR_C, mood: p > 0 ? 'wide' : 'happy', look: [-1, 0], seed: 15 }, () => { grouchoCells(x); tophatCells(x, { tilt: 0.15 }) })
      x.restore()
    }
    drawBalloon(x, 920, 540, 'hi. new guy.|$40?', { k: pop01(t, T.cameoAsk[0], 0.3, 2.2) * outK(t, [T.cameoAsk[1] - 0.2, T.cameoAsk[1]]), tx: 990, ty: 640, size: 28 })
    drawBalloon(x, 720, 540, 'NO.', { k: pop01(t, T.cameoNo[0], 0.3, 2.6) * outK(t, [T.cameoNo[1] - 0.2, T.cameoNo[1]]), tx: CAP_BG.x, ty: CAP_BG.y - 40, size: 34, color: '#c42540' })
    drawField(x, 930, 600, 760, 24, t, { k: ease.inQuad(prog(t, T.cameoWall - 0.15, T.cameoWall)), alpha: outK(t, [34.4, 34.8]) })
  }

  // ═══════════════════════ effects ═══════════════════════
  function fields(t) {
    // the Captain's gold force field (V1, V2) and Pisces' own pink one (V3)
    if (inR(t, T.no1 - 0.25, T.cut2)) drawField(x, WALL_X, 790, ROOF + 6, 48, t, { k: ease.inQuad(prog(t, T.no1 - 0.2, T.no1)), alpha: outK(t, [18.6, 19.1]) })
    if (inR(t, T.no2 - 0.25, T.cut3)) drawField(x, WALL_X + 40, 790, ROOF + 6, 48, t, { k: ease.inQuad(prog(t, T.no2 - 0.2, T.no2)), alpha: outK(t, [29.9, 30.4]), seed: 0.4 })
    if (inR(t, T.wall3 - 0.25, T.cut4)) drawField(x, 520, 930, ROOF + 6, 40, t, { k: ease.inQuad(prog(t, T.wall3 - 0.18, T.wall3)), col: '#ff8fb1', hi: '#ffe0ea', alpha: outK(t, [40.6, 41.1]), seed: 0.7 })
    puff(t, WALL_X, ROOF, T.no1, 10, 200)
    puff(t, WALL_X + 40, ROOF, T.no2, 10, 200)
    puff(t, 520, ROOF, T.wall3, 12, 240)
    puff(t, CAP_STAND.x, ROOF, T.land, 12, 260, 0.7)
  }
  function bursts(t) {
    const B = (t0, t1, bx, by, r, text, o = {}) => { if (t < t0 || t > t1) return; drawBurst(x, bx, by, r, { text, k: easeOutBack(prog(t, t0, t0 + 0.22), 2.6) * outK(t, [t1 - 0.2, t1]), ...o }) }
    B(T.no1 - 0.02, T.no1 + 1.2, 760, 880, 180, 'NO!', { size: 150, rot: -0.08, seed: 3 })
    B(T.bonk1, T.bonk1 + 0.75, 860, 1000, 100, 'BOING!', { size: 54, rot: 0.15, seed: 5, fill: '#7fe0ff', dots: '#4aa8ff', ink: '#ffffff' })
    B(T.no2 - 0.02, T.no2 + 1.2, 780, 860, 190, 'NOPE!', { size: 128, rot: 0.07, seed: 7 })
    B(T.bonk2[0], T.bonk2[0] + 0.7, 820, 1000, 100, 'BOING!', { size: 54, rot: -0.12, seed: 9, fill: '#7fe0ff', dots: '#4aa8ff', ink: '#ffffff' })
    B(T.tinyNo, T.wall3 + 0.1, 420, 850, 52, 'no.', { size: 40, rot: -0.05, seed: 11, fill: '#ffd6e2', dots: '#ff9ab8', ink: '#c42540' })
    B(T.wall3 + 0.08, T.wall3 + 1.15, 730, 1010, 150, 'BONK!', { size: 104, rot: 0.1, seed: 13, fill: '#ff8fb1', dots: '#ff5a8a', ink: '#ffffff' })
  }
  function balloons(t) {
    const D = docPose(t)
    if (D && t >= T.wallQuip[0]) drawBalloon(x, 790, 880, "wall... you're|overreacting.", { k: pop01(t, T.wallQuip[0], 0.3, 2.2) * outK(t, [T.wallQuip[1] - 0.2, T.wallQuip[1]]), tx: D.x - 20, ty: D.y - 80, size: 30 })
    if (inR(t, ...T.heroQuip)) drawBalloon(x, 330, 900, "I'M A HERO!!", { k: pop01(t, T.heroQuip[0], 0.3, 2.4) * outK(t, [T.heroQuip[1] - 0.2, T.heroQuip[1]]), tx: PIS_X, ty: sY(PIS_S) - 20, size: 36, color: '#c42540' })
  }
  // credit / villain chips (world, so they ride the camera)
  const CHIPS = [
    { win: [T.cred[0], T.cut1 - 0.25], text: '♍︎ CAPTAIN BOUNDARIES', sub: '(power: saying no)', col: '#ff7e8e', x: CAP_STAND.x, y: 880 },
    { win: [T.cred[1], T.cut1 - 0.25], text: '♓︎ PISCES', sub: '(says yes to everything)', col: LAV, x: 300, y: 1000 },
    { win: T.borChip, text: 'WEAKNESS: PAYING BACK', col: BOR_C, x: VIL_X + 70, y: 950 },
    { win: T.docChip, text: 'PHD IN DISMISSING', col: DOC_C, x: VIL_X + 60, y: 950 },
    { win: T.peekChip, text: 'READS OVER SHOULDERS', col: PEEK_C, x: 760, y: 880 },
  ]
  function chips(t) {
    for (const c of CHIPS) {
      if (t < c.win[0] || t > c.win[1]) continue
      const k = pop01(t, c.win[0], 0.32, 2.2) * outK(t, [c.win[1] - 0.2, c.win[1]])
      x.save(); x.translate(clamp(c.x, 250, 830), c.y); x.scale(k, k)
      x.font = `700 28px ${MONO}`; const tw = x.measureText(c.text).width + 40
      x.fillStyle = INK; x.fillRect(-tw / 2 - 6, -28, tw + 12, 56); x.fillStyle = 'rgba(20,12,44,0.95)'; x.fillRect(-tw / 2, -22, tw, 44)
      x.fillStyle = c.col; x.fillRect(-tw / 2, -22, tw, 4)
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(c.text, 0, 2)
      if (c.sub) { x.font = `italic 500 36px ${SERIF}`; x.lineWidth = 6; x.strokeStyle = 'rgba(6,4,18,0.85)'; x.strokeText(c.sub, 0, 52); x.fillStyle = BONE; x.fillText(c.sub, 0, 52) }
      x.restore()
    }
  }

  // ═══════════════════════ the dealbreaker card (screen) ═══════════════════════
  const PANEL = { x: 160, y: 560, w: 760, h: 640 }
  const DB = ['BORROWS MONEY', '“YOU’RE OVERREACTING”', 'READS MY PHONE']
  function panel(t) {
    if (t < T.panel[0] || t > T.panelOut[1]) return
    const k = easeOutBack(prog(t, ...T.panel), 1.8), o = 1 - ease.inCubic(prog(t, ...T.panelOut))
    const { x: L0, y: T0, w, h } = PANEL, cx = L0 + w / 2
    x.fillStyle = `rgba(6,4,18,${0.55 * clamp(k) * o})`; x.fillRect(0, 0, W, H)
    x.save(); x.globalAlpha = clamp(k * 2) * o
    x.translate(cx, T0 + h / 2 + (1 - k) * 260 + (1 - o) * 140); x.scale(lerp(0.85, 1, k), lerp(0.85, 1, k)); x.translate(-cx, -(T0 + h / 2))
    // a force-field rim
    x.save(); x.shadowColor = rgba(GOLD, 0.6); x.shadowBlur = 60
    x.beginPath(); x.roundRect(L0, T0, w, h, 38)
    const g = x.createLinearGradient(0, T0, 0, T0 + h); g.addColorStop(0, '#2c1660'); g.addColorStop(1, '#160934')
    x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 8; x.strokeStyle = '#f2d27a'; x.beginPath(); x.roundRect(L0, T0, w, h, 38); x.stroke()
    const sweep = ((t * 0.9) % 1) * (w + h) * 2
    x.save(); x.beginPath(); x.roundRect(L0, T0, w, h, 38); x.clip(); x.globalCompositeOperation = 'lighter'
    const sg = x.createLinearGradient(L0 + sweep - 300, T0, L0 + sweep, T0 + h); sg.addColorStop(0, 'rgba(255,242,168,0)'); sg.addColorStop(0.5, 'rgba(255,242,168,0.12)'); sg.addColorStop(1, 'rgba(255,242,168,0)')
    x.fillStyle = sg; x.fillRect(L0, T0, w, h); x.restore()
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.fillStyle = GOLD; x.font = `700 26px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.fillText('DEALBREAKERS · ON YOUR CARD', cx, T0 + 76)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.fillStyle = BONE; x.font = `800 52px ${INTER}`
    x.fillText('What ends it', cx, T0 + 150); x.fillText('before it starts?', cx, T0 + 210)
    DB.forEach((label, i) => {
      const cy = T0 + 302 + i * 96, st = T.stamps[i], sel = t >= st
      const sk = sel ? 1 + (1 - ease.outCubic(prog(t, st, st + 0.18))) * 0.25 : 1
      x.save(); x.translate(cx, cy); x.scale(sk, sk)
      x.beginPath(); x.roundRect(-310, -38, 620, 76, 38)
      if (sel) { x.fillStyle = '#4a1236'; x.fill(); x.lineWidth = 4; x.strokeStyle = RED; x.stroke() } else { x.fillStyle = 'rgba(48,32,92,0.72)'; x.fill(); x.lineWidth = 2; x.strokeStyle = 'rgba(154,123,224,0.55)'; x.stroke() }
      x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
      const tw = x.measureText(label).width + (sel ? 50 : 0)
      let tx = -tw / 2
      if (sel) { x.fillStyle = RED; for (let q = -2; q <= 2; q++) { x.fillRect(tx + 12 + q * 4, q * 4 - 2, 5, 5); x.fillRect(tx + 12 - q * 4, q * 4 - 2, 5, 5) } tx += 50 }
      x.fillStyle = sel ? '#fff1ea' : 'rgba(239,230,214,0.78)'; x.fillText(label, tx, 2)
      x.restore()
      if (sel && t - st < 0.4) { const p = ease.outCubic((t - st) / 0.4); x.save(); x.globalAlpha *= 1 - p; x.fillStyle = '#ffd0d8'; for (let q = 0; q < 14; q++) { const an = q / 14 * TAU; x.fillRect(cx + Math.cos(an) * (320 + p * 60) - 4, cy + Math.sin(an) * (46 + p * 40) - 4, 8, 8) } x.restore() }
    })
    x.fillStyle = 'rgba(239,230,214,0.62)'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('PICKED AT SIGNUP', cx, T0 + h - 36)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
  }
  function drumFlash(t) {
    // the reveal: a spotlight narrows on the Captain during the drumroll
    const k = clamp(prog(t, T.roll[0], T.roll[0] + 0.3)) * (1 - prog(t, T.maskOff[0] + 0.2, T.maskOff[0] + 0.8))
    if (k <= 0) return
    const P = capPose(t)
    const g = x.createRadialGradient(P.x, P.y, 120, P.x, P.y, 560)
    g.addColorStop(0, 'rgba(5,4,12,0)'); g.addColorStop(1, `rgba(5,4,12,${0.6 * k})`)
    x.fillStyle = g; x.fillRect(0, 0, W, H)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t), S = shake(t)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      const outP = popOut(t, T.out)
      x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z + S.dx, C.sy - C.fy * C.z + S.dy)
      signal(t)
      skyline(t)
      citizens(t)
      cameo(t)
      peeker(t)
      fields(t)
      borrower(t)
      doctor(t)
      pisces(t)
      captain(t)
      roof(t)
      yesBalloons(t)
      bursts(t)
      balloons(t)
      chips(t)
      x.restore()
      drumFlash(t)
      panel(t)
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
// 9.55 (→ the Borrower), 19.3 (→ Dr. Overreacting), 30.6 (→ the Phone Peeker), 41.35 (→ the secret identity).
export const CUTS = [4.45, T.cut1, 14.0, T.cut2, 25.0, T.cut3, 36.0, T.cut4, 50.85]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
export const _T = T, _LESSON = LESSON, _HEADS = HEADS
void lineTimes; void rng

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into E minor's relative, G major);
// brass / chip / strings / tom are written straight in E minor.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { E2: 82.41, B2: 123.47, E3: 164.81, G3: 196.0, B3: 246.94, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.0, B4: 493.88, E5: 659.25 }
const r3 = v => +v.toFixed(3)
const FX = { rev: 0.25, dly: 0, bus: 'fx' }
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }], ['tom', r3(t), low, { gain: 0.34, decay: 0.7, rev: 0.4, bus: 'fx' }], ['whoosh', r3(t + 0.04), 0.3, 0.06]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const womp = t0 => [['chip', r3(t0), 330, 0.5, { ...FX, wave: 'tri', slide: -14, gain: 0.05, decay: 0.35, sustain: 0.5 }], ['chip', r3(t0 + 0.22), 247, 0.55, { ...FX, wave: 'tri', slide: -18, gain: 0.05, decay: 0.4, sustain: 0.5 }]]
const sob = t0 => [0, 0.16, 0.3].map((d, i) => ['chip', r3(t0 + d), 760 - i * 60, 0.13, { ...FX, duty: 0.5, slide: -6, vib: 0.06, gain: 0.014, decay: 0.1, sustain: 0.5 }])
const boing = t0 => [['chip', r3(t0), 180, 0.55, { ...FX, wave: 'square', duty: 0.3, slide: 30, vib: 0.12, gain: 0.04, decay: 0.4, sustain: 0.6 }], ['tom', r3(t0), 140, { gain: 0.22, decay: 0.25, rev: 0.3, bus: 'fx' }]]
const thud = (t0, g = 0.34) => [['tom', r3(t0), 55, { gain: g, decay: 0.8, rev: 0.4, bus: 'fx' }], ['boom', r3(t0), g * 0.9], ['crash', r3(t0), { gain: 0.04, len: 1.6 }]]
const fieldHum = (t0, f = N.E4) => [['whoosh', r3(t0 - 0.2), 0.25, 0.06], ['chip', r3(t0), f, 0.7, { ...FX, wave: 'saw', vib: 0.03, gain: 0.018, decay: 0.5, sustain: 0.5 }], ['glitter', r3(t0), r3(t0 + 0.6)]]
const shrink = t0 => [['chip', r3(t0), 900, 0.35, { ...FX, wave: 'square', duty: 0.25, slide: -20, gain: 0.03, decay: 0.3, sustain: 0.5 }]]
const roll = (t0, t1) => { const out = []; for (let tt = t0; tt < t1; tt += 0.045) out.push(['snare', r3(tt), { gain: 0.05 + 0.08 * (tt - t0) / (t1 - t0), tone: 190, decay: 0.07, snappy: 0.9, rev: 0.2, bus: 'fx' }]); return out }
const cheer = (t0, t1) => [['swell', r3(t0), r3(t1), { gain: 0.035, f0: 900, f1: 3200, rev: 0.4, bus: 'fx' }], ['glitter', r3(t0), r3(t0 + 0.8)]]
export const CUES = [
  // 0 · the signal
  ['whoosh', 0.2, 0.4, 0.06],
  ...sting(T.signal, [N.E3, N.B3, N.E4, N.G4], 1.2, 0.05, 60), ['boom', T.signal, 0.32],
  ['strings', T.signal, r3(T.signal + 2.6), [N.E3, N.B3, N.E4, N.G4], { gain: 0.012, attack: 0.05, release: 0.7, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[0]),
  ...T.yes.map((y, i) => ['pop', y, NOTE[3 + i], 0.04, (i - 1) * 0.4]),
  ...sob(3.3),
  ['riser', 3.4, 4.47, 0.05], ['whoosh', T.swoop[0], 0.5, 0.09],
  // 1 · the hero lands
  ...sting(T.land, [N.E2, N.B2, N.E3, N.G3, N.B3], 1.4, 0.055, 52), ...thud(T.land, 0.36),
  ['strings', T.land, r3(T.land + 2.4), [N.E3, N.G3, N.B3, N.E4], { gain: 0.013, attack: 0.08, release: 0.8, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[1]),
  ...T.cred.flatMap((c, i) => [['pop', c, NOTE[2 + i * 2], 0.04, (i - 0.5) * 0.6], ['tick', c, 0.04]]),
  ['bell', T.gleam, 1760, 0.03, 1.2, 0.3],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CT]: 740, [PT]: 1046.5, [BT]: 587.33, [DT]: 880, [KT]: 659.25 } }),
  // 2 · the Borrower
  ['whoosh', T.borIn[0] + 0.05, 0.5, 0.05], ...headCues(HEADS[2]),
  ['pop', T.borChip[0], 523.25, 0.03, 0.3],
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.iou[0] + i * 0.14), 0.025]),
  ['pop', T.wallet[1], 784, 0.03, -0.3], ['chip', T.moth, 1500, 0.5, { ...FX, wave: 'noise', gain: 0.012, decay: 0.3, sustain: 0.4 }],
  ['whoosh', T.dash1[0], 0.3, 0.08],
  ...fieldHum(T.no1), ...thud(T.no1 + 0.02), ...sting(T.no1, [N.E3, N.G3, N.B3, N.E4], 0.6, 0.05, 64),
  ...boing(T.bonk1), ['whoosh', T.bonk1 + 0.1, 0.6, 0.05],
  ...headCues(HEADS[3]),
  ...sob(18.3),
  // 3 · Dr. Overreacting
  ['whoosh', T.docIn[0] + 0.05, 0.5, 0.05], ...headCues(HEADS[4]), ['pop', T.docChip[0], 523.25, 0.03, 0.3],
  ...sob(21.4), ...shrink(T.shrink1[0]), ...womp(T.shrink1[1]), ...shrink(T.shrink2[0]), ...womp(T.shrink2[1]),
  ['whoosh', T.dash2[0], 0.3, 0.08],
  ...fieldHum(T.no2), ...thud(T.no2 + 0.02), ...sting(T.no2, [N.E3, N.G3, N.B3, N.E4], 0.6, 0.05, 64),
  ...boing(T.bonk2[0]), ['tom', T.bonk2[1], 90, { gain: 0.26, decay: 0.3, rev: 0.3, bus: 'fx' }],
  ...[0, 0.18, 0.36].map(d => ['bell', r3(T.bonk2[1] + 0.1 + d), 2093, 0.012, 0.5, 0.4]),
  ...headCues(HEADS[5]),
  ['glitter', T.grow[0], r3(T.grow[1] + 0.3)], ['chip', T.grow[0], 400, 0.45, { ...FX, wave: 'square', duty: 0.25, slide: 22, gain: 0.03, decay: 0.3, sustain: 0.6 }],
  ['pop', T.wallQuip[0], 880, 0.03, 0.4],
  // 4 · the Phone Peeker
  ['whoosh', T.capAway[0], 0.5, 0.06], ...headCues(HEADS[6]),
  ['pop', T.phone[0], 1318.51, 0.03, -0.3],
  ['chip', T.scope[0], 220, 0.8, { ...FX, wave: 'square', duty: 0.5, slide: 12, gain: 0.015, decay: 0.6, sustain: 0.6 }],
  ['tick', T.scopeTurn[1], 0.05], ['bell', r3(T.scopeTurn[1] + 0.02), 2637, 0.02, 0.5, 0.2],
  ['pop', T.cameo[0], 659.25, 0.025, 0.6], ['pop', T.cameoNo[0], 587.33, 0.03, 0.6], ['tom', T.cameoWall, 110, { gain: 0.12, decay: 0.3, rev: 0.4, bus: 'fx' }], ...boing(T.cameoBonk[0]).map(c => c[0] === 'chip' ? [c[0], c[1], c[2], c[3], { ...c[4], gain: 0.018 }] : c),
  ['pop', T.peekUp[1], 1174.66, 0.035, 0.2], ['pop', T.peekChip[0], 523.25, 0.03, 0.3],
  ['tapeStop', r3(T.look - 0.1), 0.4], ['chip', r3(T.look + 0.2), 1600, 0.6, { ...FX, wave: 'tri', gain: 0.01, decay: 0.4, sustain: 0.5 }], ['chip', r3(T.look + 0.5), 1900, 0.4, { ...FX, wave: 'tri', gain: 0.01, decay: 0.3, sustain: 0.5 }],
  ...headCues(HEADS[7]),
  ['whoosh', T.breath[0], 0.6, 0.03],
  ['pop', T.tinyNo, 1318.51, 0.02, 0],
  ...fieldHum(T.wall3, N.B4), ...thud(T.wall3 + 0.03, 0.4), ...sting(T.wall3, [N.E2, N.B2, N.E3, N.G3, N.B3], 1.0, 0.055, 52),
  ...headCues(HEADS[8]), ...cheer(T.cheer, T.cheer + 1.8), ...sob(T.cheer + 0.6),
  ['whoosh', T.capBack[0], 0.5, 0.06],
  // 5 · the secret identity
  ...headCues(HEADS[9]), ...roll(T.roll[0], T.maskOff[0]), ['crash', T.maskOff[0], { gain: 0.06, len: 2 }], ['whoosh', T.maskOff[0], 0.5, 0.05],
  ['brass', T.maskOff[0], [N.E3, N.B3, N.E4, N.G4], 0.7, { gain: 0.04, bright: 1.2, ...FXB }],
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.capes + 0.1 * i), NOTE[i], 0.03, (i - 2.5) * 0.25]), ['glitter', T.capes, r3(T.capes + 0.9)],
  ...headCues(HEADS[10]), ...sob(T.heroQuip[0] + 0.2),
  // 6 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Em' }),
  // 7 · dealbreakers
  ['whoosh', r3(T.panel[0] + 0.05), 0.45, 0.05], ['tick', T.panel[1], 0.04],
  ...headCues(HEADS[11]),
  ...T.stamps.flatMap((s, i) => [['tom', r3(s), 120, { gain: 0.24, decay: 0.2, rev: 0.2, bus: 'fx' }], ['tick', r3(s), 0.06], ['pop', r3(s + 0.02), NOTE[3 + i], 0.04, (i - 1) * 0.4]]),
  ['whoosh', T.panelOut[0], 0.4, 0.05],
  // 8 · fly away
  ...headCues(HEADS[12]),
  ['whoosh', T.flyoff[0], 0.8, 0.08], ['brass', r3(T.flyoff[0] + 0.2), [N.E3, N.G3, N.B3, N.E4], 1.0, { gain: 0.045, bright: 1.2, ...FXB }], ['glitter', r3(T.flyoff[0] + 0.2), r3(T.flyoff[1])],
  ...sob(T.flyoff[0] + 0.4),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
