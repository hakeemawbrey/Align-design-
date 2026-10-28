// stfirstfight — "The First Fight." (60 s vertical Align ad, Star Talk season 3 #15, music: chiptune, Bm). A tennis match.
// Story 0–55.6, then the shared end card.
//   0.00–3.93   "Your first *fight.* | Live."  A floating court in the nebula, the 7TH HOUSE ARENA (partnership, and in
//               the old books "open enemies"). ♎ Libra umpires from a very tall chair, the crowd of stars sits in the stands.
//               ♌ LEO, centre court with a mic: "First fight… PLAY!" On the drop ♈ Aries serves a rocket that knocks Leo's
//               crown crooked; Leo scurries to his seat. Every shot, the whole crowd turns its heads in sync (running gag).
//   3.93–8.35   FREEZE (VS screen). "Aries vs. *Taurus.*" Stat cards: ARIES SPEED ■■■■■ · PATIENCE ZERO; TAURUS SPEED ■□□□□
//               · SNACKS ■■■■■ (overflows). Everything is frozen… except Taurus, who keeps eating the cookie.
//   8.35        card cut (flip)
//   8.45–14.5   "Game one: | *the dishes.*"  ARIES: "you left ONE fork." (holds up the fork) → 15–0. TAURUS: "it's soaking."
//               (the fork flies into a bowl of suds) → 15–15. Shots every 2 beats; Libra's scales tip with the score.
//  14.55–20.15  "Game two: | *you're late.*"  Shots every beat. TAURUS: "you said 7. it's 7:40." (a ringing alarm clock)
//               → 15–30. Aries leaps: "7-ISH!!" and smashes the clock clean off the screen → 30–30.
//  20.25        card cut (deal)
//  20.35–25.6   "Game three: | *the tone.*"  Half-beat shots. ARIES: "it's not what you said. it's HOW." → 40–30. Then the
//               ball becomes a streak: the crowd's heads spin, the board flickers DEUCE / AD / DEUCE, Libra goes dizzy.
//  25.6–26.75   The ball pops up, falls, bounces, rolls. Silence. Crickets. Heads stuck at odd angles pop back one by one.
//  26.75–30.3   "Time *out.*"  Libra climbs all the way down the ladder, step… step… step… LIBRA: "who's the opponent here?"
//  30.3–35.9    "The real *opponent.*"  A ball machine labelled THE PROBLEM rolls in and opens fire. They look at each other.
//               ARIES: "…doubles?" TAURUS (mouth full): "mm-hm." Taurus hops the net, cookie and all.
//  36.05       card cut (shuffle: two half-decks riffle into one)
//  36.3–39.0    "Doubles. | *Together.*"  Same side of the net, they return every ball. The machine dents, sparks, breaks.
//  39.0–43.9    "Game. Set. *Match.*"  The crowd erupts, Pisces bawls, the board flips to LOVE – LOVE. Taurus snaps the
//               cookie in half and shares it. The crowd gasps. LEO: "Taurus SHARED the snack. Folks."
//  43.93–48.3   ★ LESSON UNLOCKED: "It's you two | vs the problem. | Not each *other*."  +1 TEAMWORK
//  48.35       card cut (flip)
//  48.45–51.9   "Before the | first *serve.*"  A broadcast match-up graphic: the Push / Pull / Align reading between the two
//               charts, the arcs lobbing over like shots (the crowd follows them). LIBRA: "push shows where you'll rub."
//  52.0–55.45   "Fight fair. | Score: *love–love.*"  Everything pops out by 55.45; the end card takes over at 55.6.
// One canvas (sky + the baked arena + cast + props), DOM type, dialogue boxes and the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  INK, rgba, starFrame, inSprite, cellToWorld, headbandCells, tearsCells, drawCrown, drawRacket, drawBall, drawCookie, drawFork,
  drawBowl, drawClock, drawMic, drawScales, makeArena, drawScoreboard, drawMachine, statPanel, pixelPanel, confetti, sparkBurst,
  drawHearts, dizzyStars, steamPuffs, sweatDrop, crumbs,
} from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BL = 60 / 108
const B = n => +(0.6 + n * BL).toFixed(3)     // the 108 bpm grid
const ARI = signStar('aries'), TAU_ = signStar('taurus'), LIB = signStar('libra'), LEO = signStar('leo'), PIS = signStar('pisces')
const A_COL = '#ff7a5c', T_COL = '#ffd27a', L_COL = '#ff9ce8', LEO_COL = '#ffb45c'
const A_TAG = `${ARI.glyph}︎ ARIES`, T_TAG = `${TAU_.glyph}︎ TAURUS`, L_TAG = `${LIB.glyph}︎ LIBRA`, LEO_TAG = `${LEO.glyph}︎ LEO`

// ── the timeline
const T = {
  black: [0, 0.3],
  // 0 · hook
  h0: 0.15, h0Land: 0.6, h0Out: [3.7, 3.88],
  leoIn: 0.35, openA: 0.75, l0: 0.947, serve: B(2), knock: 1.99, crownLand: 2.45, leoRun: [2.55, 3.05], closeA: 3.5,
  // 1 · the VS freeze
  freeze: B(6), unfreeze: 8.35,
  h1: 4.05, h1Land: 4.45, h1Out: [7.98, 8.14], vs: 4.12, vsOut: [7.95, 8.2],
  panA: 4.45, fillA: [4.8, 5.15], zeroA: 5.6, panT: 6.0, fillT1: [6.45, 6.95], fillT2: [7.0, 7.35], overflow: 7.42, panOut: [7.95, 8.2],
  cut1: 8.35,
  // 2 · game one: the dishes
  h2: 8.45, h2Land: 8.8, h2Out: [14.25, 14.42], openB: 8.73, l1: 8.95, l2: 12.29, closeB: 14.3,
  fork: 9.05, forkFly: [12.3, 12.72], bowlOut: [14.3, 14.55],
  // 3 · game two: you're late
  h3: 14.55, h3Land: 14.9, h3Out: [19.98, 20.12], openC: 15.4, l3: 15.62, l4: 18.39, smash: B(32), closeC: 20.15,
  clock: 15.7, clockHit: 18.62,
  cut2: 20.25,
  // 4 · game three: the tone
  h4: 20.35, h4Land: 20.7, h4Out: [25.5, 25.66], openD: 21.23, l5: 21.45, closeD: 24.4,
  streak: [B(42), B(45)], pop: [B(45), 26.25], bounces: [26.25, 26.55, 26.74], rollEnd: 27.3, upright: 26.3, crick: [26.3, 27.5],
  // 5 · time out / the real opponent
  h5: 26.78, h5Land: 27.0, h5Out: [30.1, 30.25],
  libLadder: [27.05, 27.25], steps: [B(48), B(49), B(50), B(51)], libHop: [29.0, 29.35], openE: 29.23, l6: 29.45,
  rollIn: [30.3, 31.1], scoot: [30.5, 30.85], h6: 30.35, h6Land: 30.7, h6Out: [35.85, 36.0],
  fire1: 31.4, fire2: 31.95, libBack: [31.3, 31.7], libClimb: [31.7, 32.5], libSeat: [32.5, 32.7],
  lookEach: 32.08, l7: 32.3, l8: 34.15, tHop: [34.5, 35.05], closeE: 35.9,
  cut3: 36.05,
  // 6 · doubles
  h7: 36.3, h7Land: 36.65, openH: 36.58, l11: 36.8, closeH: 39.62, h7Out: [38.9, 39.05], volley0: B(64), breakAt: B(69) + 0.04, dribble: [39.5, 40.3],
  // 7 · game, set, match
  cheer: 39.05, h8: 39.3, h8Land: 39.7, h8Out: [43.72, 43.88], love: 39.6, snap: 40.2, offer: [40.25, 40.6], gasp: [40.3, 40.95],
  openF: 40.53, l9: 40.75, closeF: 43.6,
  // 8 · lesson
  lesson: B(78), lessonOut: [48.1, 48.3],
  cut4: 48.35,
  // 9 · before the first serve
  h9: 48.45, h9Land: 48.85, h9Out: [51.75, 51.9], panel: [48.4, 48.75], panelOut: [51.55, 51.9], arcs: [49.05, 49.6, 50.15],
  openG: 48.98, l10: 49.2, closeG: 51.7,
  // 10 · fight fair
  h10: 52.0, h10Land: 52.45, h10Out: [55.02, 55.25], out: [55.0, 55.42],
}
const BOX_A = [{ t: T.l0, speaker: LEO_TAG, color: LEO_COL, text: 'First fight… *PLAY!*' }]
const BOX_B = [
  { t: T.l1, speaker: A_TAG, color: A_COL, text: 'you left *ONE* fork.' },
  { t: T.l2, speaker: T_TAG, color: T_COL, text: "it's *soaking.*" },
]
const BOX_C = [
  { t: T.l3, speaker: T_TAG, color: T_COL, text: "you said 7. it's *7:40.*" },
  { t: T.l4, speaker: A_TAG, color: A_COL, text: '*7-ISH!!*' },
]
const BOX_D = [{ t: T.l5, speaker: A_TAG, color: A_COL, text: "it's not what you said. it's *HOW.*" }]
const BOX_E = [
  { t: T.l6, speaker: L_TAG, color: L_COL, text: "who's the *opponent* here?" },
  { t: T.l7, speaker: A_TAG, color: A_COL, text: '…doubles?' },
  { t: T.l8, speaker: T_TAG, color: T_COL, text: '*mm-hm.*' },
]
const BOX_H = [{ t: T.l11, speaker: LEO_TAG, color: LEO_COL, text: "they're on the *SAME SIDE,* folks!" }]
const BOX_F = [{ t: T.l9, speaker: LEO_TAG, color: LEO_COL, text: 'Taurus *SHARED* the snack. Folks.' }]
const BOX_G = [{ t: T.l10, speaker: L_TAG, color: L_COL, text: "push shows where you'll *rub.*" }]
const BOXES = [[BOX_A, T.openA, T.closeA], [BOX_B, T.openB, T.closeB], [BOX_C, T.openC, T.closeC], [BOX_D, T.openD, T.closeD], [BOX_E, T.openE, T.closeE], [BOX_H, T.openH, T.closeH], [BOX_F, T.openF, T.closeF], [BOX_G, T.openG, T.closeG]]
const ALL_LINES = BOXES.flatMap(b => b[0])
const CPS = 28
const LT = new Map(BOXES.map(([L]) => [L, lineTimes(L, { cps: CPS })]))
const doneOf = (L, i) => LT.get(L)[i].done
const LESSON = { at: T.lesson, out: T.lessonOut, text: "It's you two | vs the problem. | Not each *other*.", chip: '+1 TEAMWORK' }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const D2R = Math.PI / 180, TAU = Math.PI * 2
/** rally time: frozen during the VS screen */
const rt = t => (t >= T.freeze && t < T.unfreeze) ? T.freeze : t

// ── the court (an oblique side view: u −1…1 left→right baseline, v 0 far → 1 near sideline)
const SK = 120
const P = (u, v) => ({ x: 540 + u * (420 + 70 * v) + (0.5 - v) * SK, y: 1000 + 280 * v })
const inv = (X, Y) => { const v = (Y - 1000) / 280, sx = 420 + 70 * v; return { u: (X - 540 - (0.5 - v) * SK) / sx, v, sx } }
const GEO = {
  P, inv, netV: X => 0.5 - (X - 540) / SK, netH: v => lerp(54, 72, v),
  stands: [{ x0: 36, x1: 500, tiers: [820, 925] }, { x0: 682, x1: 1044, tiers: [820, 925] }],
  wall: { y0: 944, y1: 986 }, chair: { x: 605, seat: 716, foot: 992 },
}
const GROUND = P(0, 0.55).y                      // 1154: the players' feet
const PSIZE = 230, PCELL = 6, PBASE = (19.6 + 17.6 * Math.cos(Math.PI / 5) - 18) * PCELL
const PY = GROUND - PBASE                        // player sprite centre y
const A_HOME = { x: 204, y: PY }, T_HOME = { x: 864, y: PY }, A_DUB = { x: 190, y: PY }, T_DUB = { x: 462, y: PY }, T_SCOOT = { x: 722, y: PY }
const LIB_SEAT = { x: 605, y: 655 }, LIB_S = 156
const LEO_MID = { x: 540, y: 1151, s: 240 }, LEO_SEAT = { x: 118, y: 877, s: 108 }
const MACH = { x: 905, y: 1176, px: 7 }
const BOARD = { x: 230, y: 392, w: 620, h: 150 }
const SCALES = { x: 742, y: 714, px: 3.5 }

// ── the crowd (stands behind the court): [x, y, colour, seed, row]
const CROWD = [
  [100, 772, '#f2cf4a', 21, 0], [235, 772, '#ef5c94', 22, 0], [370, 772, '#2fc79a', 23, 0],
  [255, 877, '#3fb6f0', 24, 1], [390, 877, '#e23d66', 25, 1],
  [742, 772, '#a35cf0', 26, 0], [868, 772, '#38c4ec', 27, 0], [990, 772, STAR.sky, 28, 0],
  [728, 877, PIS.color, 29, 1, 'pisces'], [858, 877, '#ff9cc0', 30, 1], [985, 877, '#c9a6ff', 31, 1],
]

// ── positions
function ariesPos(t) {
  let p = t < T.tHop[0] ? A_HOME : { x: lerp(A_HOME.x, A_DUB.x, ease.inOutCubic(prog(t, T.tHop[0], T.tHop[1]))), y: PY }
  let dy = 0
  if (inR(t, T.smash - 0.3, T.smash + 0.3)) dy = -Math.sin(Math.PI * prog(t, T.smash - 0.3, T.smash + 0.3)) * 150
  if (inR(t, T.fire2 + 0.25, T.fire2 + 0.6)) dy = -Math.sin(Math.PI * prog(t, T.fire2 + 0.25, T.fire2 + 0.6)) * 70
  return { x: p.x, y: p.y + dy }
}
function taurusPos(t) {
  if (t < T.scoot[0]) return { ...T_HOME }
  if (t < T.tHop[0]) return { x: lerp(T_HOME.x, T_SCOOT.x, ease.inOutCubic(prog(t, ...T.scoot))), y: PY - (inR(t, T.fire1 + 0.2, T.fire1 + 0.55) ? Math.sin(Math.PI * prog(t, T.fire1 + 0.2, T.fire1 + 0.55)) * 60 : 0) }
  const p = prog(t, ...T.tHop)
  return { x: lerp(T_SCOOT.x, T_DUB.x, ease.inOutCubic(p)), y: PY - Math.sin(Math.PI * p) * 300 }
}
const tDir = t => t < (T.tHop[0] + T.tHop[1]) / 2 ? -1 : 1
function libraPos(t) {
  const LT0 = { x: 528, y: 700 }, ys = [770, 840, 910, 975], FRONT = { x: 468, y: 1100 }
  if (t < T.libLadder[0]) return { ...LIB_SEAT }
  if (t < T.steps[0]) return { x: lerp(LIB_SEAT.x, LT0.x, ease.inOutCubic(prog(t, ...T.libLadder))), y: lerp(LIB_SEAT.y, LT0.y, ease.inOutCubic(prog(t, ...T.libLadder))) }
  if (t < T.libHop[0]) {
    let y = LT0.y
    T.steps.forEach((s, i) => { y = lerp(y, ys[i], ease.outCubic(prog(t, s, s + 0.16))) })
    return { x: LT0.x, y }
  }
  if (t < T.libBack[0]) { const p = prog(t, ...T.libHop); return { x: lerp(LT0.x, FRONT.x, p), y: lerp(975, FRONT.y, ease.inOutQuad(p)) - Math.sin(Math.PI * p) * 90 } }
  if (t < T.libClimb[0]) { const p = prog(t, ...T.libBack); return { x: lerp(FRONT.x, LT0.x, p), y: lerp(FRONT.y, 975, ease.inOutQuad(p)) - Math.sin(Math.PI * p) * 90 } }
  if (t < T.libSeat[0]) return { x: LT0.x + Math.sin(t * 40) * 3, y: lerp(975, LT0.y, ease.inOutCubic(prog(t, ...T.libClimb))) }
  return { x: lerp(LT0.x, LIB_SEAT.x, ease.inOutCubic(prog(t, ...T.libSeat))), y: lerp(LT0.y, LIB_SEAT.y, ease.inOutCubic(prog(t, ...T.libSeat))) }
}
function leoPos(t) {
  if (t < T.leoRun[0]) return { ...LEO_MID }
  if (t < T.leoRun[1]) { const p = prog(t, ...T.leoRun), e = ease.inOutCubic(p); return { x: lerp(LEO_MID.x, LEO_SEAT.x, e), y: lerp(LEO_MID.y, LEO_SEAT.y, e) - Math.sin(Math.PI * p) * 240, s: lerp(LEO_MID.s, LEO_SEAT.s, e) } }
  return { ...LEO_SEAT }
}
function machX(t) { return t < T.rollIn[0] ? 1400 : lerp(1400, MACH.x, ease.outCubic(prog(t, ...T.rollIn))) }

// ── rackets: grip offset + swing angle (0 = up, + = clockwise); dir +1 faces right
const RPX = 4
function grip(pos, dir) { return { x: pos.x + dir * 0.42 * PCELL * 36, y: pos.y + 0.2 * PCELL * 36 } }
function contactOf(who, t) {
  if (who === 'A') { const g = grip(ariesPos(t), 1); return { x: g.x + 66, y: g.y - 52 } }
  if (who === 'T') { const d = tDir(t), g = grip(taurusPos(t), d); return { x: g.x + d * 66, y: g.y - 52 } }
  if (who === 'M') return { x: machX(t) - 29 * MACH.px, y: MACH.y - 16.5 * MACH.px }
  if (who === 'MB') return { x: machX(t) - 70, y: MACH.y - 130 }
  if (who === 'CLOCK') return { x: T_HOME.x, y: 905 }
  if (who === 'OFFL') return { x: -120, y: 990 }
  return { x: 540, y: 1000 }
}
// shots (s): [time, who, arc?]; consecutive shots in one rally are connected
const RALLIES = [
  [[T.serve, 'A', 30], [B(3), 'T'], [B(5), 'A'], [B(7), 'T']],
  [[B(15), 'A', 60], [B(17), 'T'], [B(19), 'A'], [B(21), 'T'], [B(23), 'A'], [B(25), 'T'], [B(26), 'A'], [B(27), 'T'], [B(28), 'A'], [B(29), 'T'], [B(30), 'A'], [B(31), 'T'], [T.smash, 'A', -60], [T.clockHit, 'CLOCK']],
  (() => { const out = []; for (let k = 0; k <= 8; k++) out.push([B(36 + k / 2), k % 2 ? 'A' : 'T', 70]); for (let k = 1; k <= 8; k++) out.push([B(40 + k / 4), k % 2 ? 'A' : 'T', 30]); return out })(),
  [[T.fire1, 'M', 20], [T.fire1 + 0.55, 'OFFL']], [[T.fire2, 'M', 60], [T.fire2 + 0.55, 'OFFL']],
  ...Array.from({ length: 5 }, (_, k) => { const tf = B(64 + k); return [[tf, 'M', 40], [tf + BL / 2, k % 2 ? 'A' : 'T', 50], [tf + BL, 'MB']] }),
]
const SEGS = RALLIES.flatMap(R => R.slice(0, -1).map((s, i) => ({ t0: s[0], t1: R[i + 1][0], a: s[1], b: R[i + 1][1], arc: s[2] ?? Math.min(220, Math.max(50, (R[i + 1][0] - s[0]) * 240)) })))
const HITS = { A: [], T: [] }
for (const R of RALLIES) for (const [t, who] of R) if (who === 'A' || who === 'T') HITS[who].push(t)
HITS.A.sort((a, b) => a - b); HITS.T.sort((a, b) => a - b)
function ballAt(t) {
  const r = rt(t)
  for (const s of SEGS) if (r >= s.t0 && r < s.t1) {
    const u = (r - s.t0) / (s.t1 - s.t0), A_ = contactOf(s.a, s.t0), B_ = contactOf(s.b, s.t1)
    return { x: lerp(A_.x, B_.x, u), y: lerp(A_.y, B_.y, u) - s.arc * 4 * u * (1 - u), s }
  }
  // the pop-up after the streak: straight up, down, bounces, roll
  if (t >= T.pop[0] && t < T.rollEnd + 0.8) {
    const g = GROUND - 14
    if (t < T.pop[1]) { const u = prog(t, ...T.pop); return { x: lerp(540, 600, u), y: lerp(1030, g, u) - 4 * 760 * u * (1 - u) * (u < 0.5 ? 1 : 1) } }
    const bs = [T.pop[1], ...T.bounces], hs = [120, 55, 20]
    for (let i = 0; i < 3; i++) if (t < bs[i + 1]) { const u = prog(t, bs[i], bs[i + 1]); return { x: 600 + (i + u) * 14, y: g - hs[i] * 4 * u * (1 - u) } }
    const u = ease.outCubic(prog(t, T.bounces[2], T.rollEnd)); return { x: 642 + u * 40, y: g, rolling: true }
  }
  // the last sad ball dribbling out of the broken machine
  if (t >= T.dribble[0] && t < T.dribble[1] + 3) { const u = prog(t, ...T.dribble), m = contactOf('M', t); return { x: m.x - u * 70, y: m.y + (GROUND - 14 - m.y) * ease.inQuad(clamp(u * 1.4)) } }
  return null
}
const inStreak = t => t >= T.streak[0] && t < T.streak[1]

// ── score
function scoreAt(t) {
  const d1 = doneOf(BOX_B, 0) + 0.05, d2 = doneOf(BOX_B, 1) + 0.05, d3 = doneOf(BOX_C, 0) + 0.05, d4 = T.clockHit + 0.05, d5 = doneOf(BOX_D, 0) + 0.05
  const st = { names: [[ARI.glyph, 'ARIES', A_COL], [TAU_.glyph, 'TAURUS', T_COL]], score: ['0', '0'], center: null, love: 0, flip: 0, flash: 0, live: true, diff: 0 }
  const flips = [d1, d2, d3, d4, d5, T.love]
  for (const f of flips) if (t >= f && t < f + 0.3) { st.flip = prog(t, f, f + 0.3); st.flash = 1 - prog(t, f, f + 0.6) }
  if (t >= T.love) { st.love = 1; st.score = null; st.flash = Math.max(st.flash, 0.4 + 0.3 * Math.sin(t * 5)); return st }
  if (t >= T.streak[0]) {
    if (t < T.streak[1]) { const k = Math.floor((t - T.streak[0]) * 9) % 4; st.score = k === 1 ? ['AD', '40'] : k === 3 ? ['40', 'AD'] : null; st.center = k % 2 ? null : 'DEUCE'; st.diff = 0; return st }
    st.center = (Math.floor(t * 2) % 2 === 0 || t < 27) ? 'DEUCE' : 'DEUCE'; st.score = null; return st
  }
  const pts = [[d5, '40', '30', 1], [d4, '30', '30', 0], [d3, '15', '30', -1], [d2, '15', '15', 0], [d1, '15', '0', 1]]
  for (const [d, a, b, df] of pts) if (t >= d) { st.score = [a, b]; st.diff = df; return st }
  return st
}

// ── moods
function crowdTurn(t) {
  const r = rt(t)
  const b = ballAt(t)
  if (inR(t, T.streak[0], T.streak[1])) return 0
  if (b && !b.rolling) return clamp((b.x - 540) / 210, -1, 1)
  if (r < T.serve) return 0
  if (inR(t, T.rollIn[0], T.fire1)) return 1
  return 0
}
function spinAt(t, i) {
  if (t < T.streak[0]) return 0
  const s0 = T.streak[0], s1 = T.streak[1]
  const acc = tt => { const d = tt - s0; return TAU * (0.8 * d + 0.55 * d * d) }       // revolutions accelerate
  if (t < s1) return acc(t)
  const end = acc(s1), stopAt = rng(i * 7 + 3)() * 2.4 - 1.2                         // each stops at its own odd angle
  const wobble = lerp(0, stopAt, ease.outCubic(prog(t, s1, s1 + 0.4)))
  const up = T.upright + i * 0.09
  const k = t < up ? 1 : 1 - ease.spring(prog(t, up, up + 0.45), 0.25)
  return (end % TAU + wobble) * k
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS())]
function CUTS() { return [3.95, { t: T.cut1, kind: 'flip' }, 14.4, { t: T.cut2, kind: 'deal' }, 26.7, 30.3, { t: T.cut3, kind: 'shuffle' }, 39.0, { t: T.cut4, kind: 'flip' }, 51.95] }

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "900 200px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const ARENA = makeArena(document, GEO)
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 146, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Your first *fight.* | Live.', { top: 128, at: T.h0, late: 2, lateAt: T.h0Land, accentColor: A_COL }), T.h0Out],
    [H('Aries vs. *Taurus.*', { top: 170, at: T.h1, lateAt: T.h1Land, accentColor: T_COL }), T.h1Out],
    [H('Game one: | *the dishes.*', { top: 128, at: T.h2, late: 2, lateAt: T.h2Land, accentColor: '#9fe4ff' }), T.h2Out],
    [H("Game two: | *you're late.*", { top: 128, at: T.h3, late: 2, lateAt: T.h3Land, accentColor: '#ff6a5a' }), T.h3Out],
    [H('Game three: | *the tone.*', { top: 128, at: T.h4, late: 2, lateAt: T.h4Land, accentColor: PINK }), T.h4Out],
    [H('Time *out.*', { top: 170, size: 112, accentSize: 164, at: T.h5, lateAt: T.h5Land, accentColor: L_COL }), T.h5Out],
    [H('The real *opponent.*', { top: 128, at: T.h6, lateAt: T.h6Land, accentColor: '#ff4a5e' }), T.h6Out],
    [H('Doubles. | *Together.*', { top: 128, at: T.h7, lateAt: T.h7Land, accentColor: GOLD }), T.h7Out],
    [H('Game. Set. | *Match.*', { top: 128, at: T.h8, lateAt: T.h8Land, accentColor: PINK, size: 96, accentSize: 140 }), T.h8Out],
    [H('Before the | first *serve.*', { top: 128, at: T.h9, lateAt: T.h9Land, accentColor: READING.push }), T.h9Out],
    [H('Fight fair. | Score: *love–love.*', { top: 128, at: T.h10, lateAt: T.h10Land, accentColor: PINK, size: 96, accentSize: 140 }), T.h10Out],
  ]
  const BOX = { y: 1450, width: 960, height: 270, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the cast
  function racket(t, pos, dir, hits, pal, k = 1) {
    const g = grip(pos, dir)
    let a = 0.45
    let last = -1e9
    for (const h of hits) if (h <= t + 0.2 && h > last) last = h
    const d = t - last
    if (d > -0.2 && d < -0.04) a = lerp(0.45, -0.9, ease.outCubic(prog(d, -0.2, -0.04)))
    else if (d >= -0.04 && d < 0.08) a = lerp(-0.9, 1.6, ease.outCubic(prog(d, -0.04, 0.08)))
    else if (d >= 0.08 && d < 0.4) a = lerp(1.6, 0.45, ease.inOutCubic(prog(d, 0.08, 0.4)))
    let blur = d >= -0.04 && d < 0.12 ? 1 : 0
    if (inStreak(t)) { a = 0.4 + 1.1 * Math.sin(t * 38 + (dir > 0 ? 0 : 1.5)); blur = 1 }
    drawRacket(x, g.x, g.y, RPX * k, dir * a, pal, { blur })
  }
  const A_PAL = { F: '#ff4a3d', f: '#ffb3a8' }, T_PAL = { F: '#d99a2b', f: '#ffe6a3', G: '#3b2a1a', g: '#7a5530' }
  const A_HOPS = [...talkHops(ALL_LINES, A_TAG, { cps: CPS }), T.serve - 0.05, doneOf(BOX_B, 0) + 0.1, T.lookEach + 0.05, T.cheer, T.cheer + 0.6, T.offer[1] + 0.1, T.lesson + 0.1]
  const T_HOPS = [...talkHops(ALL_LINES, T_TAG, { cps: CPS }), doneOf(BOX_B, 1) + 0.1, T.lookEach + 0.1, T.cheer + 0.1, T.cheer + 0.7, T.snap, T.lesson + 0.15]
  const L_HOPS = [...talkHops(ALL_LINES, L_TAG, { cps: CPS }), ...T.steps, T.libHop[1], T.libSeat[1], T.cheer + 0.2, T.arcs[0]]
  const LEO_HOPS = [...talkHops(ALL_LINES, LEO_TAG, { cps: CPS }), T.leoIn + 0.3, T.serve, T.leoRun[1], T.cheer + 0.3]

  function ariesState(t) {
    const st = { mood: 'squint', look: [1, 0], squash: 0, steam: 0, sweat: 0 }
    const sp = ALL_LINES.find((L, i) => L.speaker === A_TAG && t >= L.t && t < L.t + 1.6)
    if (t < T.serve) { st.mood = 'squint'; st.look = [1, 0] }
    else if (t >= T.freeze && t < T.unfreeze) { st.mood = 'squint'; st.look = [1, 0] }
    else if (inR(t, doneOf(BOX_B, 0), doneOf(BOX_B, 0) + 0.8)) st.mood = 'happy'
    else if (inR(t, T.l2, T.l2 + 1.4)) { st.mood = 'wide'; st.sweat = 1 }
    else if (inR(t, T.l3, T.l4)) { st.mood = 'squint'; st.steam = 1 }
    else if (inR(t, T.l4, T.l4 + 1.2)) { st.mood = 'wide'; st.steam = 1 }
    else if (inR(t, T.l5, T.streak[1])) { st.mood = 'squint'; st.steam = 1; st.sweat = inStreak(t) ? 1 : 0 }
    else if (inR(t, T.streak[1], T.h5)) { st.mood = 'wide'; st.look = [0, -1] }
    else if (inR(t, T.h5, T.l6)) { st.mood = 'neutral'; st.look = [1, -1] }
    else if (inR(t, T.l6, T.rollIn[0])) { st.mood = 'neutral'; st.look = [1, 0] }
    else if (inR(t, T.rollIn[0], T.lookEach)) { st.mood = 'wide'; st.look = [1, 0]; st.sweat = 1 }
    else if (inR(t, T.lookEach, T.tHop[1])) { st.mood = t < T.l8 ? 'wide' : 'sparkle'; st.look = [1, 0] }
    else if (inR(t, T.tHop[1], T.breakAt)) { st.mood = 'squint'; st.look = [1, 0] }
    else if (inR(t, T.breakAt, T.offer[1])) { st.mood = inR(t, ...T.gasp) ? 'wide' : 'happy'; st.look = [1, 0] }
    else if (t >= T.offer[1]) { st.mood = t < T.lesson ? 'heart' : t > T.h10 ? 'happy' : 'sparkle'; st.look = [1, 0] }
    if (sp && st.mood === 'squint' && t < T.streak[0]) st.mood = 'wide'
    return st
  }
  function taurusState(t) {
    const st = { mood: 'sleepy', look: [-1, 0], squash: 0, munch: 0, bites: 0, half: 0, offerK: 0 }
    const MUNCH = [0.95, 5.2, 7.62, 11.45, 13.9, 17.0, 20.9]
    st.bites = Math.min(4, MUNCH.filter(m => t >= m + 0.2).length)
    for (const m of MUNCH) st.munch = Math.max(st.munch, bump(t, m, 0.45))
    if (t >= T.freeze && t < T.unfreeze) { st.mood = 'sleepy' }
    if (inR(t, T.l2, T.l2 + 1.2)) st.mood = 'neutral'
    if (inR(t, T.l3, T.l3 + 1.6)) { st.mood = 'neutral'; st.look = [-1, 0] }
    if (inR(t, T.clockHit - 0.1, T.clockHit + 0.9)) st.mood = 'neutral'
    if (inR(t, doneOf(BOX_D, 0) - 0.3, T.streak[1])) { st.mood = 'squint'; st.munch = 0 }
    if (inR(t, T.streak[1], T.h5)) { st.mood = 'wide'; st.look = [0, -1] }
    if (inR(t, T.h5, T.rollIn[0])) { st.mood = 'neutral'; st.look = [-1, -1] }
    if (inR(t, T.rollIn[0], T.lookEach)) { st.mood = 'wide'; st.look = [1, 0] }
    if (inR(t, T.lookEach, T.l8)) { st.mood = 'wide'; st.look = [-1, 0] }
    if (inR(t, T.l8, T.tHop[1])) { st.mood = 'happy'; st.munch = Math.max(st.munch, bump(t, T.l8 - 0.1, 0.5)) }
    if (inR(t, T.tHop[1], T.breakAt)) { st.mood = 'squint'; st.look = [1, 0]; st.munch = 0 }
    if (t >= T.breakAt) { st.mood = 'happy'; st.look = [1, 0] }
    if (t >= T.snap) { st.half = 1; st.offerK = ease.inOutCubic(prog(t, ...T.offer)) }
    if (t >= T.snap && t < T.lesson) st.mood = inR(t, T.snap, T.snap + 0.4) ? 'wide' : 'sparkle'
    if (t >= T.lesson) st.munch = Math.max(bump(t, 46.0, 0.5), bump(t, 53.2, 0.5))
    return st
  }
  function libraState(t) {
    const st = { mood: 'neutral', look: [crowdTurn(t) > 0.3 ? 1 : crowdTurn(t) < -0.3 ? -1 : 0, 0], squash: 0, rot: 0, dizzy: 0 }
    if (t < T.serve) st.look = [-1, 1]
    if (inStreak(t)) { st.mood = 'eyeroll'; st.rot = 0.22 * Math.sin(t * 9); st.dizzy = clamp((t - T.streak[0]) * 1.5) }
    if (inR(t, T.streak[1], 26.85)) { st.mood = 'eyeroll'; st.rot = 0.18 * Math.sin(t * 6) * (1 - prog(t, 26.4, 26.85)); st.dizzy = 1 - prog(t, 26.5, 26.85) }
    if (inR(t, 26.85, T.libLadder[0])) { st.mood = 'squint'; st.look = [0, 0] }
    if (inR(t, T.libLadder[0], T.libHop[0])) { st.mood = 'neutral'; st.look = [0, 1] }
    if (inR(t, T.libHop[0], T.rollIn[0])) { st.mood = t >= T.l6 ? 'squint' : 'neutral'; st.look = [0, 0] }
    if (inR(t, T.rollIn[0], T.libSeat[1])) { st.mood = 'wide'; st.look = [1, 0] }
    if (t >= T.breakAt && t < T.lesson) st.mood = 'happy'
    if (t >= T.lesson) { st.mood = t >= T.panel[0] && t < T.panelOut[1] ? 'sparkle' : 'happy'; st.look = [0, 0] }
    return st
  }

  function drawPlayer(t, who) {
    const isA = who === 'A'
    const pos = isA ? ariesPos(t) : taurusPos(t), dir = isA ? 1 : tDir(t)
    const st = isA ? ariesState(t) : taurusState(t)
    const tt = rt(t)
    const opts = { color: isA ? ARI.color : TAU_.color, glyph: isA ? ARI.glyph : TAU_.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: isA ? A_HOPS : T_HOPS, seed: isA ? 3 : 8, bob: isA ? 9 : 5, glow: 0.9, zzz: false }
    if (t >= T.freeze && t < T.unfreeze && isA) { opts.bob = 0; opts.hops = null; opts.blink = false }
    const tDraw = isA ? tt : t
    // Aries bounces on its toes while receiving
    const bounce = isA && t > T.serve && t < T.l6 && !(t >= T.freeze && t < T.unfreeze) ? -Math.abs(Math.sin(t * Math.PI / BL)) * 10 : 0
    const y = pos.y + bounce
    drawStarChar(x, pos.x, y, PSIZE, tDraw, opts)
    const F = starFrame(pos.x, y, PSIZE, tDraw, opts)
    if (isA) inSprite(x, F, () => headbandCells(x, tDraw, inStreak(t) ? 2 : 1))
    racket(rt(t), { x: pos.x, y }, dir, isA ? HITS.A : HITS.T, isA ? A_PAL : T_PAL)
    if (isA) {
      const [hx, hy] = cellToWorld(F, 18, 2)
      if (st.steam) steamPuffs(x, t, hx, hy, 6, st.steam)
      if (st.sweat) sweatDrop(x, t, hx + 70, hy + 50, 6)
    } else {
      // the cookie: held on the far side, lifted to the mouth for a munch; snapped in half and shared at the payoff
      const side = -dir
      const cx0 = pos.x + side * 0.46 * F.S, cy0 = y + 0.14 * F.S
      const mx = pos.x + side * 0.14 * F.S, my = y + 0.12 * F.S
      const cx = lerp(cx0, mx, st.munch), cy = lerp(cy0, my, st.munch)
      if (st.half) {
        drawCookie(x, cx, cy, 6, { half: -side, bites: 0, rot: 0.1 })
        // the other half travels to Aries (and stays with Aries after)
        const a = ariesPos(t), ax2 = a.x + 0.4 * F.S, ay2 = a.y + 0.14 * F.S
        const ox = lerp(cx + side * 10, ax2, st.offerK), oy = lerp(cy, ay2, st.offerK) - Math.sin(Math.PI * st.offerK) * 70
        drawCookie(x, ox, oy, 6, { half: side, rot: -0.1 })
      } else drawCookie(x, cx, cy, 6, { bites: st.bites, rot: 0.15 * Math.sin(t * 1.3) })
      if (st.munch > 0.6) crumbs(x, t, Math.floor(t * 2) / 2, mx, my + 30, { seed: Math.floor(t * 2) })
      if (t >= T.snap) crumbs(x, t, T.snap, cx, cy, { n: 12, seed: 4 })
    }
    return { F, pos: { x: pos.x, y } }
  }
  function drawLibra(t) {
    const p = libraPos(t), st = libraState(t)
    const opts = { color: LIB.color, glyph: LIB.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: L_HOPS, seed: 5, glow: 0.85 }
    x.save(); x.translate(p.x, p.y + 50); x.rotate(st.rot); x.translate(-p.x, -(p.y + 50))
    const r = drawStarChar(x, p.x, p.y, LIB_S, t, opts)
    x.restore()
    if (st.dizzy > 0) dizzyStars(x, t, p.x, r.top - 14, 70, { alpha: st.dizzy })
  }
  function drawLeo(t) {
    if (t < T.leoIn) return
    const p = leoPos(t), s = p.s
    const k = pop01(t, T.leoIn, 0.36, 2.2) * popOut(t, T.out)
    if (k <= 0.01) return
    let mood = 'sparkle', look = [0, 0]
    if (t < T.knock) { mood = t < T.l0 ? 'happy' : 'sparkle' }
    else if (t < T.leoRun[1]) { mood = 'wide'; look = [-1, 0] }
    else { mood = 'neutral'; look = [crowdTurn(t) > 0.3 ? 1 : crowdTurn(t) < -0.3 ? -1 : 0, 0] }
    if (inR(t, T.l11, T.l11 + 1.5)) mood = 'wide'
    if (t >= T.cheer && t < T.lesson) mood = inR(t, T.l9, T.l9 + 1.6) ? 'wide' : 'happy'
    if (inR(t, ...T.gasp)) mood = 'wide'
    const opts = { color: LEO.color, glyph: s >= 150 ? LEO.glyph : null, mood, look, hops: LEO_HOPS, seed: 11, pop: k, glow: 0.85, squash: t >= T.knock && t < T.knock + 0.35 ? 0.15 * bump(t, T.knock, 0.35) : 0 }
    drawStarChar(x, p.x, p.y, s, t, opts)
    const F = starFrame(p.x, p.y, s, t, opts)
    // crown: on the top point; knocked spinning up by the serve, lands crooked
    const [cx, cy] = cellToWorld(F, 18, 3.6)
    if (t < T.knock) drawCrown(x, cx, cy, F.cell)
    else if (t < T.crownLand) { const u = prog(t, T.knock, T.crownLand); drawCrown(x, cx + u * 20, cy - Math.sin(Math.PI * u) * 150, F.cell, u * TAU * 1.5 + 0.45 * u) }
    else drawCrown(x, cx + 4 * F.cell * 0.6, cy + F.cell, F.cell, 0.45)
    // mic in the left hand
    const [mx, my] = cellToWorld(F, 2, 15)
    drawMic(x, mx - F.cell * 2, my, F.cell * 0.9, -0.35)
  }
  function drawCrowd(t) {
    const turn = crowdTurn(t)
    CROWD.forEach(([cx, cy, col, seed, row, kind], i) => {
      const isP = kind === 'pisces'
      let mood = 'neutral', look = [Math.round(turn), 0], hopT = null, sq = 0
      const dir = turn
      if (t < T.serve) { look = [Math.sign(LEO_MID.x - cx) * 0.6, 1]; mood = t > T.l0 ? 'wide' : 'neutral' }
      if (inStreak(t) || inR(t, T.streak[1], T.upright + i * 0.09)) mood = 'wide'
      if (inR(t, T.libLadder[0], T.l6)) { look = [Math.sign(libraPos(t).x - cx), 1] }
      if (inR(t, T.l6, T.rollIn[0])) look = [Math.sign(470 - cx), 0]
      if (inR(t, T.rollIn[0], T.tHop[1])) { mood = 'wide'; look = [1, 0] }
      if (t >= T.cheer && t < T.lesson) { mood = (i % 3 === 0) ? 'heart' : 'happy'; hopT = T.cheer + (i % 4) * 0.12 }
      if (inR(t, ...T.gasp)) { mood = 'wide'; look = [-1, 0]; sq = -0.08 }
      if (t >= T.lesson) mood = t >= T.h10 && i % 2 ? 'heart' : 'happy'
      if (inR(t, T.panel[0], T.panelOut[1])) { const ak = T.arcs.map(a => prog(t, a, a + 0.45)); const live = ak.findIndex(k => k > 0 && k < 1); look = [live >= 0 ? (ak[live] < 0.5 ? -1 : 1) : 0, -1]; mood = 'sparkle' }
      if (isP) mood = t >= T.cheer ? 'happy' : (inStreak(t) ? 'wide' : 'sparkle')
      const hops = hopT ? [hopT, hopT + 0.62, hopT + 1.24, hopT + 1.86] : null
      const frozen = t >= T.freeze && t < T.unfreeze
      const tt = frozen ? T.freeze : t
      const rot = (frozen ? crowdTurnFrozen : dir) * 0.24 + spinAt(t, i)
      const opts = { color: col, mood, look, seed, hops, squash: sq, glow: 0.7, bob: frozen ? 0 : undefined, blink: frozen ? false : undefined }
      x.save(); x.translate(cx + dir * 6, cy + 20); x.rotate(rot); x.translate(-(cx + dir * 6), -(cy + 20))
      drawStarChar(x, cx + dir * 6, cy, 108, tt, opts)
      if (isP) { const F = starFrame(cx + dir * 6, cy, 108, tt, opts); inSprite(x, F, () => tearsCells(x, t, t >= T.cheer && t < T.lesson ? 3 : inStreak(t) || inR(t, T.rollIn[0], T.tHop[1]) ? 2 : 1)) }
      x.restore()
    })
  }
  const crowdTurnFrozen = crowdTurn(T.freeze)

  // ── props over the court
  function drawBallFx(t) {
    if (inStreak(t)) {
      const a = contactOf('A', t), b = contactOf('T', t)
      const fl = 0.75 + 0.25 * Math.sin(t * 90)
      x.save(); x.lineCap = 'round'
      x.strokeStyle = rgba('#d8f03c', 0.35 * fl); x.lineWidth = 34; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke()
      x.strokeStyle = rgba('#f4ffb0', 0.95 * fl); x.lineWidth = 12; x.beginPath(); x.moveTo(a.x, a.y + Math.sin(t * 70) * 6); x.lineTo(b.x, b.y - Math.sin(t * 70) * 6); x.stroke()
      x.restore()
      for (const [p, s] of [[a, 1], [b, 2]]) sparkBurst(x, t, p.x, p.y, Math.floor(t * 7) / 7, { n: 6, R: 60, size: 18, seed: s + Math.floor(t * 7), life: 0.14 })
      // speed lines
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 4
      const r = rng(Math.floor(t * 20))
      for (let i = 0; i < 6; i++) { const yy = 980 + r() * 120, x0 = 300 + r() * 400; x.beginPath(); x.moveTo(x0, yy); x.lineTo(x0 + 80 + r() * 90, yy); x.stroke() }
      x.restore()
      return
    }
    const b = ballAt(t)
    if (!b) return
    // shadow
    x.save(); x.fillStyle = 'rgba(6,4,20,0.4)'; x.beginPath(); x.ellipse(b.x, GROUND - 6, 16 * clamp(1 - (GROUND - b.y) / 900, 0.4, 1), 6, 0, 0, Math.PI * 2); x.fill(); x.restore()
    // trail
    const fast = b.s && (b.s.t1 - b.s.t0) < 0.6
    if (b.s) for (let k = 4; k >= 1; k--) {
      const tp = rt(t) - k * (fast ? 0.022 : 0.035)
      if (tp < b.s.t0) continue
      const u = (tp - b.s.t0) / (b.s.t1 - b.s.t0), A_ = contactOf(b.s.a, b.s.t0), B_ = contactOf(b.s.b, b.s.t1)
      x.save(); x.globalAlpha = 0.16 * (5 - k); x.fillStyle = '#e4f75a'; x.beginPath(); x.arc(lerp(A_.x, B_.x, u), lerp(A_.y, B_.y, u) - b.s.arc * 4 * u * (1 - u), 13 - k, 0, Math.PI * 2); x.fill(); x.restore()
    }
    drawBall(x, b.x, b.y, 4, { rot: rt(t) * 9 })
  }
  function drawProps(t, aR, tR) {
    // the fork (Aries holds it up), then it flies into Taurus's bowl
    if (t >= T.fork && t < T.forkFly[1]) {
      const k = pop01(t, T.fork, 0.35, 2.4), a = aR.pos, home = { x: a.x + 10, y: a.y - 210 }
      const bw = { x: tR.pos.x + 20, y: tR.pos.y - 225 }
      const u = prog(t, ...T.forkFly), fx = lerp(home.x, bw.x, ease.inOutCubic(u)), fy = lerp(home.y, bw.y, ease.inOutCubic(u)) - Math.sin(Math.PI * u) * 160
      drawFork(x, fx, fy + Math.sin(t * 3) * 4, 9 * k, -0.25 + u * TAU * 0.9 + 0.05 * Math.sin(t * 5))
      if (t < T.forkFly[0]) sparkBurst(x, t, home.x + 18, home.y - 40, T.fork + 0.25, { n: 5, R: 50, size: 18, seed: 2, life: 0.5 })
    }
    if (t >= T.forkFly[0] && t < T.bowlOut[1]) {
      const k = pop01(t, T.forkFly[0], 0.35, 2.2) * (1 - ease.inCubic(prog(t, ...T.bowlOut)))
      drawBowl(x, t, tR.pos.x + 10, tR.pos.y - 150, 7 * k, { fork: t >= T.forkFly[1] })
      sparkBurst(x, t, tR.pos.x + 10, tR.pos.y - 240, T.forkFly[1], { n: 8, R: 90, size: 18, seed: 5, cols: ['#ffffff', '#bfe9ff', '#9fe4ff'], life: 0.6 })
    }
    // the ringing alarm clock; the smash knocks it clean off the screen
    if (t >= T.clock && t < T.clockHit + 1.2) {
      const k = pop01(t, T.clock, 0.35, 2.4), c = contactOf('CLOCK', t)
      if (t < T.clockHit) drawClock(x, t, c.x, c.y, 6.5 * k, { ring: t < T.l3 + 1.8 ? 1 : 0.35 })
      else { const u = t - T.clockHit; drawClock(x, t, c.x + u * 900, c.y - u * 700 + u * u * 500, 6.5, { ring: 1, rot: u * 14 }); sparkBurst(x, t, c.x, c.y, T.clockHit, { n: 10, R: 120, size: 22, seed: 7, cols: [GOLD, '#ff6a5a', BONE] }) }
    }
  }
  function drawVS(t) {
    if (t < T.freeze || t >= T.unfreeze) return
    // a dark freeze tint + scanlines
    const fk = clamp(prog(t, T.freeze, T.freeze + 0.15)) * outK(t, T.vsOut)
    x.save(); x.globalAlpha = 0.32 * fk; x.fillStyle = '#0c0624'; x.fillRect(0, 0, W, 1920)
    x.globalAlpha = 0.08 * fk; x.fillStyle = '#ffffff'; for (let y = 0; y < 1920; y += 8) x.fillRect(0, y, W, 2)
    x.restore()
    // the VS emblem
    const vk = pop01(t, T.vs, 0.4, 3) * (1 - ease.inCubic(prog(t, ...T.vsOut)))
    if (vk > 0.01) {
      x.save(); x.translate(540, 1080); x.scale(vk, vk); x.rotate(-0.08 + 0.02 * Math.sin(t * 6))
      x.font = `italic 900 210px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 26; x.strokeStyle = INK; x.lineJoin = 'round'; x.strokeText('VS', 0, 0)
      const g = x.createLinearGradient(0, -90, 0, 90); g.addColorStop(0, '#fff3c4'); g.addColorStop(0.5, GOLD); g.addColorStop(1, '#ff7a3c')
      x.fillStyle = g; x.fillText('VS', 0, 0)
      x.restore()
      sparkBurst(x, t, 540, 1080, T.vs + 0.08, { n: 14, R: 260, size: 30, seed: 3 })
    }
    const ok = 1 - ease.inCubic(prog(t, ...T.panOut))
    const fa = ease.outCubic(prog(t, ...T.fillA)) * 5
    statPanel(x, t, { x: 40, y: 1440, w: 490, h: 290 }, { col: A_COL, glyph: ARI.glyph, name: 'ARIES', k: pop01(t, T.panA, 0.32, 2.4) * ok,
      rows: [{ label: 'SPEED', n: fa }, { label: 'PATIENCE', n: 0, zero: prog(t, T.zeroA, T.zeroA + 0.3) }] })
    const f1 = ease.inOutQuad(prog(t, ...T.fillT1)), f2 = ease.outCubic(prog(t, ...T.fillT2)) * 5
    statPanel(x, t, { x: 550, y: 1440, w: 490, h: 290 }, { col: T_COL, glyph: TAU_.glyph, name: 'TAURUS', k: pop01(t, T.panT, 0.32, 2.4) * ok,
      rows: [{ label: 'SPEED', n: f1 }, { label: 'SNACKS', n: f2 }] })
    // the snack meter overflows: blocks spill out of the card
    if (t >= T.overflow && ok > 0.5) {
      const d = t - T.overflow
      for (let i = 0; i < 6; i++) {
        const vx = 140 + i * 70, vy = -620 - i * 60, bx = 970 + vx * d * 0.6, by = 1646 + vy * d + 1500 * d * d
        if (by > 1930) continue
        x.save(); x.translate(bx, by); x.rotate(d * (4 + i)); x.fillStyle = INK; x.fillRect(-20, -20, 40, 40); x.fillStyle = T_COL; x.fillRect(-17, -17, 34, 34); x.restore()
      }
      const mk = pop01(t, T.overflow + 0.05, 0.3, 3)
      x.save(); x.translate(860, 1452); x.rotate(0.12); x.scale(mk, mk); x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('MAX!!', 0, 0); x.fillStyle = '#7dffb0'; x.fillText('MAX!!', 0, 0); x.restore()
    }
  }
  // the broadcast match-up graphic: the Push / Pull / Align reading
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
    pixelPanel(x, 60, 610, 960, 600, { P: 8, glow: 0.5, fill: 'rgba(12,7,30,0.95)' })
    x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('THE MATCH-UP', 540, 652)
    for (const [side, C] of [[0, CHA], [1, CHB]]) {
      x.save(); x.translate(C.x, C.y); x.rotate((side ? 1 : -1) * (1 - ease.outCubic(prog(t, ...T.panel))) * 1.4 + (side ? -1 : 1) * t * 0.04)
      x.scale(CH_S, CH_S); drawWheelH(x, { W: CHART_W, k: 1 }); x.restore()
      x.font = `700 64px 'EB Garamond', 'Segoe UI Symbol', serif`; x.fillStyle = side ? T_COL : A_COL; x.fillText((side ? TAU_.glyph : ARI.glyph) + '︎', C.x, C.y + 4)
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
      let hx = A_.x, hy = A_.y
      for (let s = 1; s <= Math.round(N * lk); s++) { const u = s / N, v = 1 - u; hx = v * v * A_.x + 2 * v * u * cX + u * u * B_.x; hy = v * v * A_.y + 2 * v * u * cY + u * u * B_.y; x.lineTo(hx, hy) }
      x.stroke(); x.restore()
      if (lk < 1) drawBall(x, hx, hy, 3)
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

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = popOut(t, T.out)
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1100); x.scale(lerp(0.85, 1, clamp(o)), lerp(0.85, 1, clamp(o))); x.translate(-540, -1100)
        // the slab's underglow + the baked arena
        const g = x.createRadialGradient(540, 1340, 20, 540, 1340, 620); g.addColorStop(0, 'rgba(120,170,255,0.32)'); g.addColorStop(1, 'rgba(120,170,255,0)')
        x.fillStyle = g; x.fillRect(0, 1000, W, 700)
        x.imageSmoothingEnabled = false; x.drawImage(ARENA, 0, 0, W, 1920); x.imageSmoothingEnabled = true
        x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.78)'
        x.fillText('★ 7TH HOUSE ARENA ★', 270, 966); x.fillText('★ 7TH HOUSE ARENA ★', 862, 966)
        // board + scales + crowd + umpire
        const sb = scoreAt(t)
        const bk = 1 - clamp(prog(t, T.lesson, T.lesson + 0.25)) * (1 - prog(t, T.lessonOut[0], T.lessonOut[1] + 0.1))
        x.save(); x.globalAlpha *= bk; drawScoreboard(x, t, BOARD, sb); x.restore()
        if (t >= T.love) drawHearts(x, t, T.love + 0.1, 540, BOARD.y + 40, { n: 8, px: 7, spread: 520, life: 1.6 })
        drawCrowd(t)
        let tilt = -sb.diff * 0.22
        if (inStreak(t)) tilt = 0.55 * Math.sin(t * 22)
        if (t >= T.love) tilt = 0
        drawScales(x, t, SCALES.x, SCALES.y, SCALES.px, tilt, { heart: t >= T.love ? prog(t, T.love + 0.2, T.love + 0.5) : 0 })
        drawLibra(t)
        drawLeo(t)
        // the machine
        if (t >= T.rollIn[0]) {
          const used = [0, 1, 2, 3, 4].filter(k => t >= B(64 + k)).length + (t >= T.fire1 ? 1 : 0) + (t >= T.fire2 ? 1 : 0)
          const fires = [T.fire1, T.fire2, ...[0, 1, 2, 3, 4].map(k => B(64 + k))]
          let fire = 0; for (const f of fires) fire = Math.max(fire, bump(t, f, 0.18))
          const dents = [0, 1, 2, 3, 4].filter(k => t >= B(64 + k) + BL).length
          drawMachine(x, t, machX(t), MACH.y, MACH.px, { fire, used, dents, broken: prog(t, T.breakAt, T.breakAt + 0.3), shake: inR(t, T.breakAt - 0.6, T.breakAt + 0.2) ? 1 : 0, roll: inR(t, ...T.rollIn) ? 1 : 0 })
          for (let k = 0; k < 5; k++) sparkBurst(x, t, contactOf('MB', t).x, contactOf('MB', t).y, B(64 + k) + BL, { n: 8, R: 90, size: 20, seed: 20 + k, cols: [GOLD, '#ffffff', '#ff6a5a'] })
        }
        // players + ball
        const aR = drawPlayer(t, 'A'), tR = drawPlayer(t, 'T')
        drawBallFx(t)
        drawProps(t, aR, tR)
        // crickets in the silence
        if (inR(t, ...T.crick)) {
          x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#9cf08a'
          for (let i = 0; i < 3; i++) { const t0 = T.crick[0] + i * 0.42, kk = t - t0; if (kk < 0 || kk > 0.6) continue; x.globalAlpha = Math.sin(Math.PI * kk / 0.6) * 0.9; x.fillText('chirp.', [300, 820, 560][i], [1300, 1290, 1340][i] - kk * 16) }
          x.globalAlpha = 1
        }
        // payoff confetti
        confetti(x, t, T.cheer, { x0: 300, y0: 900, n: 70, seed: 3 })
        confetti(x, t, T.cheer + 0.1, { x0: 800, y0: 900, n: 70, seed: 9 })
        if (t >= T.offer[1]) drawHearts(x, t, T.offer[1], ariesPos(t).x, ariesPos(t).y - 120, { n: 5, px: 7, spread: 120 })
        drawVS(t)
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

// ── sound (pop / pluck / bell are written in D major and follow the key; chip / lead are written in B minor directly)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const Bm = { B3: 246.94, D4: 293.66, Fs4: 369.99, B4: 493.88, Cs5: 554.37, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, B5: 987.77, D6: 1174.66, Fs6: 1479.98 }
const FX = { rev: 0.06, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, ...FX, ...o }]
const thwack = (t, hi, g = 1) => [chip(t, hi ? 1500 : 1100, 0.05, { wave: 'noise', gain: 0.05 * g, decay: 0.03, sustain: 0 }), chip(t, hi ? Bm.Fs5 : Bm.D5, 0.06, { duty: 0.125, slide: -20, gain: 0.03 * g, decay: 0.04, sustain: 0 }), ['tick', +t.toFixed(3), 0.035 * g]]
const crunch = t => [0, 0.09, 0.2].map((d, i) => chip(t + d, 2400 - i * 300, 0.05, { wave: 'noise', gain: 0.03, decay: 0.03, sustain: 0 }))
const point = t => [chip(t, Bm.B5, 0.07, { gain: 0.03 }), chip(t + 0.07, Bm.D6, 0.07, { gain: 0.03 }), chip(t + 0.14, Bm.Fs6, 0.2, { gain: 0.03, decay: 0.15 }), ['tick', +t.toFixed(3), 0.04]]
const womp = t => [[Bm.Fs5, 0], [Bm.E5 * 1.0, 0.16], [Bm.D5, 0.32], [Bm.B4, 0.48]].map(([f, d], i) => chip(t + d, f, i === 3 ? 0.5 : 0.15, { duty: 0.5, gain: 0.035, slide: i === 3 ? -4 : 0, decay: 0.1 }))
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => chip(t0 + d, 4400, 0.03, { gain: 0.022, decay: 0.02, sustain: 0.7, pan }))
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.1 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const ALL_HITS = RALLIES.flatMap(R => R.filter(s => s[1] === 'A' || s[1] === 'T'))

export const CUES = [
  // 0 · hook
  ...head(T.h0, 3, T.h0Land, 0),
  ['pop', T.leoIn + 0.1, 880, 0.035, 0], ['tick', T.leoIn + 0.1, 0.03],
  ['whoosh', T.serve + 0.2, 0.45, 0.06], ['crash', T.serve, { gain: 0.045, len: 1.6 }],
  ['pop', T.knock, 1318.51, 0.045, 0], ['bell', T.knock + 0.02, 1760, 0.025, 0.6, 0], chip(T.knock + 0.03, Bm.B5, 0.35, { slide: 14, gain: 0.025 }),
  ['pop', T.crownLand, 523.25, 0.035, -0.2], ...[0, 1, 2, 3, 4, 5].map(i => ['tick', +(T.leoRun[0] + i * 0.08).toFixed(3), 0.025]), ['pop', T.leoRun[1], 659.25, 0.03, -0.5],
  // 1 · VS freeze
  chip(T.freeze, Bm.B5, 0.08, { gain: 0.04 }), chip(T.freeze + 0.09, Bm.Fs5, 0.08, { gain: 0.04 }), chip(T.freeze, 300, 0.25, { wave: 'noise', gain: 0.02, decay: 0.2, sustain: 0 }),
  ['boom', T.vs + 0.05, 0.12], ['crash', T.vs + 0.05, { gain: 0.05, len: 1.8 }], ...head(T.h1, 2, T.h1Land, 2),
  ['pop', T.panA + 0.05, 440, 0.04, -0.4], ...[0, 1, 2, 3, 4].map(i => chip(T.fillA[0] + i * 0.07, [Bm.B4, Bm.D5, Bm.Fs5, Bm.A5, Bm.B5][i], 0.06, { gain: 0.03 })),
  ...womp(T.zeroA),
  ['pop', T.panT + 0.05, 440, 0.04, 0.4], chip(T.fillT1[0] + 0.25, Bm.B4, 0.25, { gain: 0.03, slide: -3 }),
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => chip(T.fillT2[0] + i * 0.05, Bm.B4 * 2 ** ((i * 2) / 12), 0.05, { gain: 0.03 })), ['bell', T.overflow + 0.05, 1760, 0.03, 0.8, 0.4],
  ...crunch(5.25), ...crunch(7.67),
  // 2 · game one
  ...head(T.h2, 2, T.h2Land, 1),
  ['pop', T.fork + 0.05, 1174.66, 0.04, -0.3], ['bell', T.fork + 0.25, 1567.98, 0.03, 0.9, -0.3],
  ['whoosh', T.forkFly[0] + 0.2, 0.4, 0.04], ['pop', T.forkFly[1], 392, 0.05, 0.3], ...[0, 1, 2, 3].map(i => ['pop', +(T.forkFly[1] + 0.08 + i * 0.07).toFixed(3), [1318.51, 1567.98, 1174.66, 1760][i], 0.02, 0.3]),
  ...point(doneOf(BOX_B, 0) + 0.05), ...point(doneOf(BOX_B, 1) + 0.05), ...crunch(11.47), ...crunch(13.92),
  // 3 · game two
  ...head(T.h3, 2, T.h3Land, 3),
  ...Array.from({ length: 22 }, (_, i) => chip(T.clock + 0.1 + i * 0.06, i % 2 ? Bm.Fs6 : Bm.D6, 0.04, { gain: 0.016 })),
  ...point(doneOf(BOX_C, 0) + 0.05),
  ['whoosh', T.smash - 0.1, 0.5, 0.07], ['boom', T.smash, 0.14], chip(T.smash - 0.3, Bm.B4, 0.3, { slide: 24, gain: 0.03 }),
  ['bell', T.clockHit, 1046.5, 0.05, 1.2, 0.4], ...Array.from({ length: 10 }, (_, i) => chip(T.clockHit + 0.05 + i * 0.05, i % 2 ? Bm.Fs6 : Bm.D6, 0.04, { gain: 0.014 * (1 - i / 10), pan: 0.6 })), ...point(T.clockHit + 0.05), ...crunch(17.02),
  // 4 · game three + the streak
  ...head(T.h4, 2, T.h4Land, 4),
  ...point(doneOf(BOX_D, 0) + 0.05),
  ['riser', T.streak[0] - 0.6, T.streak[1], 0.05], ['swell', T.streak[0], T.streak[1], { gain: 0.05, f0: 500, f1: 7000 }],
  ...Array.from({ length: 40 }, (_, i) => ['tick', +(T.streak[0] + i * 0.042).toFixed(3), 0.03]),
  ...Array.from({ length: 12 }, (_, i) => chip(T.streak[0] + i * 0.14, i % 2 ? Bm.B5 : Bm.Fs5, 0.05, { gain: 0.018, pan: i % 2 ? 0.5 : -0.5 })),
  ['tapeStop', T.streak[1], 0.9], chip(T.pop[0], Bm.B4, 0.3, { slide: 24, gain: 0.03 }), chip(T.pop[0] + 0.32, Bm.B5, 0.33, { slide: -24, gain: 0.03 }),
  ...T.bounces.map((b, i) => ['pop', b, [220, 247, 277][i], 0.06 - i * 0.015, 0.1]), ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.bounces[2] + 0.08 + i * 0.07).toFixed(3), 0.012]),
  ...[0, 1, 2].flatMap(i => chirp(T.crick[0] + i * 0.42 + 0.02, [-0.5, 0.5, 0][i])),
  ...Array.from({ length: 11 }, (_, i) => ['pop', +(T.upright + i * 0.09).toFixed(3), NOTE[i % 7], 0.018, i % 2 ? 0.4 : -0.4]),
  // 5 · time out
  ...head(T.h5, 1, T.h5Land, 0),
  ...T.steps.flatMap(s => [['tick', s, 0.05], ['pop', s, 196, 0.04, -0.1]]), ['pop', T.libHop[1], 293.66, 0.05, 0],
  ['whoosh', T.rollIn[0] + 0.3, 0.6, 0.04], ...Array.from({ length: 7 }, (_, i) => chip(T.rollIn[0] + i * 0.11, i % 2 ? 3200 : 2700, 0.05, { gain: 0.012, pan: 0.6 })),
  chip(T.rollIn[0], 70, 0.8, { wave: 'tri', gain: 0.05, vib: 0.05, decay: 0.6, sustain: 0.8, bus: 'fx' }),
  ...head(T.h6, 2, T.h6Land, 2),
  ...[T.fire1, T.fire2].flatMap(f => [chip(f, Bm.B5, 0.18, { slide: -36, gain: 0.04 }), ['boom', f, 0.06], ['whoosh', f + 0.25, 0.35, 0.04]]),
  ['pop', T.lookEach, 659.25, 0.035, -0.3], ['pop', T.lookEach + 0.05, 659.25, 0.035, 0.3],
  ['whoosh', T.tHop[0] + 0.3, 0.45, 0.05], ['pop', T.tHop[1], 392, 0.05, 0], ['glitter', T.tHop[1], T.tHop[1] + 0.4],
  // 6 · doubles
  ...head(T.h7, 2, T.h7Land, 1),
  ...[0, 1, 2, 3, 4].flatMap(k => { const tf = B(64 + k); return [chip(tf, Bm.B5, 0.15, { slide: -30, gain: 0.03 }), ['bell', +(tf + BL).toFixed(3), [987.77, 1174.66, 1318.51, 1479.98, 1760][k], 0.03, 0.5, 0.5]] }),
  chip(T.breakAt - 0.5, 120, 0.6, { wave: 'tri', gain: 0.04, vib: 0.08, decay: 0.5, sustain: 0.9 }),
  ['boom', T.breakAt + 0.05, 0.3], chip(T.breakAt + 0.1, Bm.B4, 0.6, { slide: 12, vib: 0.06, gain: 0.04, duty: 0.5 }), chip(T.breakAt + 0.1, 900, 0.5, { wave: 'noise', gain: 0.03, decay: 0.4, sustain: 0.3 }),
  ...[0, 1, 2].map(i => ['pop', +(T.dribble[0] + 0.25 + i * 0.2).toFixed(3), 220 - i * 20, 0.03 - i * 0.008, 0.4]),
  // 7 · game, set, match
  ['swell', T.cheer - 0.6, T.cheer, { gain: 0.05, f0: 600, f1: 4000 }], ...claps(T.cheer + 0.05, T.cheer + 3.2, 11), ['glitter', T.cheer, T.cheer + 0.8],
  ...head(T.h8, 2, T.h8Land, 3),
  ['bell', T.love, 1174.66, 0.04, 1.6, 0], ['pluck', T.love + 0.08, 1479.98, 0.035, 0.6, 0], ['glitter', T.love + 0.05, T.love + 0.6],
  chip(T.cheer + 0.3, Bm.D6, 1.0, { slide: -4, vib: 0.035, gain: 0.014, decay: 0.8, sustain: 0.8, pan: 0.4 }),
  chip(T.snap, 1800, 0.08, { wave: 'noise', gain: 0.05, decay: 0.05, sustain: 0 }), ['pop', T.snap, 330, 0.045, 0],
  ['pop', T.gasp[0] + 0.05, 392, 0.04, -0.3], ['pop', T.gasp[0] + 0.09, 349.23, 0.04, 0.3], ['whoosh', T.offer[0] + 0.15, 0.3, 0.03], ['pop', T.offer[1], 1318.51, 0.04, -0.3],
  // 8 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Bm' }),
  // 9 · before the first serve
  ...head(T.h9, 3, T.h9Land, 1), ['whoosh', T.panel[0] + 0.2, 0.4, 0.04],
  ...T.arcs.flatMap((a, i) => [['whoosh', a + 0.3, 0.4, 0.025], ['pluck', +(a + 0.42).toFixed(3), [1046.5, 1318.51, 1567.98][i], 0.035, 0.6, (i - 1) * 0.3]]),
  ['whoosh', T.panelOut[0] + 0.15, 0.3, 0.03],
  // 10 · fight fair
  ...head(T.h10, 4, T.h10Land, 2), ['bell', T.h10Land + 0.05, 1174.66, 0.03, 1.4, 0], ...crunch(53.22),
  ['whoosh', T.out[0], 0.35, 0.03],
  // racket hits (every shot) + ball bounces, and the dialogue
  ...ALL_HITS.flatMap(([t, who]) => thwack(t, who === 'A', inStreak(t) ? 0.6 : 1)),
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [A_TAG]: 1046.5, [T_TAG]: 587.33, [L_TAG]: 880, [LEO_TAG]: 783.99 } })),
  ...cardCutCues(CUTS()),
  ...endcardCues(STORY_END),
]
