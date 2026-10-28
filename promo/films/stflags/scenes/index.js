// stflags — "Red Flag, Green Flag." (60 s vertical Align ad, Star Talk season 3 #13, music: house · Eb).
// Story 0–55.6, then the shared end card. A game show floating in the nebula: ♌ LEO hosts from a gold lectern (sequined
// jacket, bow tie, crown), six contestants stand at podiums with a GREEN and a RED buzzer each, and a flag pops out of the
// podium for every vote. ♓ PISCES is the ring-card assistant in the corner, crying a little more every round.
//   0.0–4.6   "Welcome to | *Red Flag,* | *Green Flag.*"  Leo drops out of the sky and body-slams the giant red buzzer
//             (BZZZT). On the drop the spotlights snap on and the camera pulls back to the whole set. LEO: "contestants!
//             buzzers ready!" Everyone squats over their buzzers on the beat.
//   R1 4.85   "They text back | four hours later."  ♐ SAG slams GREEN, ♋ CANCER slams RED. SAG: "GREEN. they have a
//             life!" CANCER: "RED. I was dying." … and faints behind its podium (womp).
//   R2        "They want to | meet your mum | on date two."  Cancer springs back up with heart-eyes: "GREEN. obviously."
//             ♒ AQUARIUS: "RED. I need a year." … and slowly floats up out of the show.
//   R3        "They planned | the date in a | spreadsheet."  ♍ VIRGO (in tears): "GREEN. I'm crying." SAG: "RED. I'm
//             boarding." A little airliner swoops in and Sag rides it off. Leo's eyes ping-pong; the first bead of sweat.
//   R4        "Still friends with | all their exes."  ♎ LIBRA: "GREEN. so mature!" ♏ SCORPIO: "RED. explain. now." An
//             interrogation lamp drops on Scorpio and the two start a buzzer war, faster and faster.
//   30.8      "Technical | difficulties."  The scoreboard melts down (ERR), every flag flips red-green-red, Leo flop-sweats:
//             "the judges can't agree!!"
//   33.5      "Final round."  Drumroll. "They told you their | dealbreakers first."  Silence. Aquarius floats back down,
//             Sag's plane drops it back at its podium. They glance at each other… then all six slam GREEN at once
//             (37.27, the lift): green flags, confetti, Pisces throws its sign and bawls.
//   38.1      "Even | Scorpio."  Push in: Scorpio does one tiny happy hop. Everyone turns. Scorpio squints: "…that was a
//             sneeze."
//   42.82     ★ LESSON UNLOCKED: "Not every flag | is universal. | Know yours." (+1 SELF-AWARENESS)
//   47.05     "Your flags. | Your card."  YOUR CARD flips in: DEALBREAKERS stamp on as little red flags. LEO: "pick yours
//             at signup. they're on your card."
//   50.95     "Green flags | go first."  A closer group shot: green flags wave, Leo bows, everyone hops on the beat.
//             All pop out by 55.45; the end card takes over at 55.6.
// One canvas (sky + camera-moved stage + screen-space board, Pisces, the card), DOM headlines + dialogue boxes + the
// shared LESSON beat, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, leoSuitCells, crownCells, micCells, tearsCells, sweatCells, hankieCells, drawPodium, drawButtons, drawFlag,
  drawLectern, drawBigBuzzer, drawScoreBox, drawMarquee, spotCone, drawRiser, drawFloor, drawBoard, drawSign, drawPlane,
  drawHangLamp, drawDealCard, confetti, RED, GRN, RED_L, GRN_L } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN          // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff'
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)     // the 108 bpm grid
const CPS = 28

// ── the cast
const ID = ['aqu', 'can', 'sag', 'vir', 'lib', 'sco']
const SG = { aqu: signStar('aquarius'), can: signStar('cancer'), sag: signStar('sagittarius'), vir: signStar('virgo'), lib: signStar('libra'), sco: signStar('scorpio'), leo: signStar('leo'), pis: signStar('pisces') }
const NAMES = { aqu: 'AQUARIUS', can: 'CANCER', sag: 'SAG', vir: 'VIRGO', lib: 'LIBRA', sco: 'SCORPIO', leo: 'LEO' }
const SEED = { aqu: 17, can: 5, sag: 8, vir: 11, lib: 14, sco: 7, leo: 3, pis: 23 }
const TG = id => `${SG[id].glyph}︎ ${NAMES[id]}`
const SLOT = 250
const X = id => 540 + (ID.indexOf(id) - 2.5) * SLOT
const CY = 1176, CS = 210, PT = 1232, FLOOR = 1400       // contestant star centre / size, podium top, stage floor (world)
const LEO = { x: 506, y: 900, s: 200 }, LECT = { x: 556, top: 990 }, BUZZ = { x: 628, y: 990 - 18 }
const P = 6

// ── the timeline
const lineDone = (text, t) => lineTimes([{ t, speaker: '', text }], { cps: CPS })[0].done
function round(S, a, b) {
  const sg = +(S + 0.85).toFixed(3), sr = +(S + 1.1).toFixed(3), la = +(S + 1.35).toFixed(3), da = lineDone(a, la)
  const lb = +(da + 1.5).toFixed(3), db = lineDone(b, lb), close = +(db + 1.52).toFixed(3)
  return { S, sg, sr, la, da, lb, db, close, next: +(close + 0.3).toFixed(3) }
}
const TXT = {
  r1a: '*GREEN.* they have a life!', r1b: '*RED.* I was dying.',
  r2a: '*GREEN.* obviously.', r2b: '*RED.* I need a year.',
  r3a: "*GREEN.* I'm crying.", r3b: "*RED.* I'm boarding.",
  r4a: '*GREEN.* so mature!', r4b: '*RED.* explain. now.',
}
const R1 = round(4.85, TXT.r1a, TXT.r1b)
const R2 = round(R1.next, TXT.r2a, TXT.r2b)
const R3 = round(R2.next, TXT.r3a, TXT.r3b)
const R4 = round(R3.next, TXT.r4a, TXT.r4b)
const RS = [R1, R2, R3, R4]
const PAIRS = [['can', 'sag'], ['aqu', 'can'], ['sag', 'vir'], ['lib', 'sco']]      // [green voter's partner order: left, right]
const VOTERS = [{ g: 'sag', r: 'can' }, { g: 'can', r: 'aqu' }, { g: 'vir', r: 'sag' }, { g: 'lib', r: 'sco' }]

const T = {
  black: [0, 0.25],
  h0: 0.1, h0Late: 0.46, h0Out: [4.4, 4.58],
  fall: [0.06, 0.42], slam0: 0.42, press0: [0.42, 1.02], hop0: [1.02, 1.62],
  on: BEAT(2), pull: [BEAT(2), 3.25],
  l1: 1.9, ready: BEAT(5), pisIn: 4.85,
  faint: [R1.db + 0.38, R1.db + 0.9],
  float: [R2.db + 0.3, R2.db + 2.9],
  lamp: [R4.lb + 0.12, R4.lb + 0.5],
  war: [R4.db + 0.2, R4.close - 0.08],
  // glitch
  S5: +(R4.next).toFixed(3),
}
Object.assign(T, {
  plane: [R3.db + 0.1, R3.db + 0.62, R3.db + 1.7],      // swoops in · Sag hops on · gone
  l10: +(T.S5 + 0.28).toFixed(3),
})
Object.assign(T, {
  closeG: +(lineDone("the judges *can't agree!!*", T.l10) + 1.52).toFixed(3),
  S6: 33.5,
  roll: [33.75, 34.72], reveal: 34.75, stopM: 34.78,
  aquBack: [35.5, 36.35], sagBack: [35.7, 36.65], glance: [36.45, 37.05],
  slamF: BEAT(66),                                          // 37.267: everyone slams GREEN (the lift)
  push: [38.1, 38.45], tinyHop: 38.58, turn: 38.98, busted: 39.36, l12: 39.55,
  lesson: BEAT(76),                                         // 42.822
  lessonOut: [46.8, 47.0],
  card: [47.05, 47.45], tag: 47.55, l13: 47.45, stamps: [48.0, 48.5, 49.0], cardOff: [50.72, 51.02],
  hLast: 50.95, bow: 52.3, out: [55.0, 55.45],
})
T.close12 = +(lineDone('…that was a *sneeze.*', T.l12) + 1.52).toFixed(3)
T.close13 = +(lineDone("pick yours at signup. *they're on your card.*", T.l13) + 1.52).toFixed(3)
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Not every flag | is universal. | Know *yours.*', chip: '+1 SELF-AWARENESS' }

// the slams: [id, t, 'G' | 'R'] (each one presses that buzzer and sets the podium's vote)
const WAR = []
{ let t = T.war[0], g = 0.34, k = 0; while (t < T.war[1]) { WAR.push([k % 2 ? 'sco' : 'lib', +t.toFixed(3), k % 2 ? 'R' : 'G']); t += g; g = Math.max(0.1, g * 0.84); k++ } }
const FINAL_ORDER = ['aqu', 'can', 'sag', 'vir', 'lib', 'sco']
const SLAMS = [
  ...RS.flatMap((R, i) => [[VOTERS[i].g, R.sg, 'G'], [VOTERS[i].r, R.sr, 'R']]),
  ...WAR,
  ...FINAL_ORDER.map((id, i) => [id, +(T.slamF + i * 0.035).toFixed(3), 'G']),
]
const slamsOf = id => SLAMS.filter(s => s[0] === id)

// ── dialogue
const LC = SG.leo.color
const LINES_A = [{ t: T.l1, speaker: TG('leo'), color: LC, text: 'contestants! *buzzers ready!*' }]
const RLINES = RS.map((R, i) => [
  { t: R.la, speaker: TG(VOTERS[i].g), color: GRN, text: TXT[`r${i + 1}a`] },
  { t: R.lb, speaker: TG(VOTERS[i].r), color: RED, text: TXT[`r${i + 1}b`] },
])
const LINES_G = [{ t: T.l10, speaker: TG('leo'), color: LC, text: "the judges *can't agree!!*" }]
const LINES_S = [{ t: T.l12, speaker: TG('sco'), color: SG.sco.color, text: '…that was a *sneeze.*' }]
const LINES_T = [{ t: T.l13, speaker: TG('leo'), color: LC, text: "pick yours at signup. *they're on your card.*" }]
const ALL_LINES = [...LINES_A, ...RLINES.flat(), ...LINES_G, ...LINES_S, ...LINES_T]
const HOPS = {}
for (const id of [...ID, 'leo']) HOPS[id] = talkHops(ALL_LINES, TG(id), { cps: CPS })

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── the camera: keys [t, s, fx, fy]; consecutive keys tween (inOutCubic; < 0.5 s = a whip, inOutQuad)
const HOOK = [2.3, BUZZ.x, 880], WIDE = [0.72, 540, 800], LEOCAM = [1.4, 540, 930], SCOCAM = [1.5, 1120, 1097]
const pairCam = ([a, b]) => [1.45, (X(a) + X(b)) / 2 + 28, 1097]
const CAM = [
  [0, ...HOOK], [T.pull[0], ...HOOK], [T.pull[1], ...WIDE], [4.55, ...WIDE],
  ...RS.flatMap((R, i) => [[R.S, ...pairCam(PAIRS[i])], [i < 3 ? RS[i + 1].S - 0.3 : T.S5 - 0.25, ...pairCam(PAIRS[i])]]),
  [T.S5, ...LEOCAM], [T.S6 - 0.12, ...LEOCAM], [T.S6 + 0.35, ...WIDE],
  [T.push[0], ...WIDE], [T.push[1], ...SCOCAM], [T.close12 - 0.1, ...SCOCAM], [T.lesson - 0.2, ...WIDE],
  [T.cardOff[0], ...WIDE], [T.cardOff[1] + 0.5, 0.8, 540, 860], [T.out[1], 0.83, 540, 870],
]
function cam(t) {
  if (t <= CAM[0][0]) return { s: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0]
      const e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { s: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { s: z[1], fx: z[2], fy: z[3] }
}
const toScreen = (C, x, y) => [540 + (x - C.fx) * C.s, 1000 + (y - C.fy) * C.s]

// ── votes → podium state, buttons, flags
function voteAt(id, t) {
  let v = null
  for (const s of SLAMS) if (s[0] === id && s[1] <= t) v = s
  if (v && v[1] < T.S6 && t >= T.S6) return null                  // the final round resets the board
  return v
}
function flagSide(id) { return ID.indexOf(id) < 3 ? -1 : 1 }
/** the giant score tally after each round (cumulative), the war's climb, the final */
function tallyAt(t) {
  if (t >= T.S6) return t >= T.slamF + 0.25 ? [0, 6] : [0, 0]
  let n = 0
  for (const R of RS) if (t >= R.sr + 0.1) n++
  let w = 0
  for (const s of WAR) if (t >= s[1]) w++
  return [n + Math.floor(w / 2), n + Math.ceil(w / 2)]          // the war opens with Libra's GREEN
}
const glitchAt = t => clamp(prog(t, T.war[1] - 0.25, T.S5 + 0.1)) * (1 - prog(t, T.closeG - 0.6, T.S6 - 0.05))

// ── poses: a slam = wind-up, a chop onto the chosen buzzer (green left / red right), recoil
function slamPose(id, t) {
  let best = null
  for (const s of SLAMS) if (s[0] === id && s[1] - 0.14 <= t && t < s[1] + 0.55) best = s
  if (!best) return { rot: 0, dx: 0, dy: 0, sq: 0 }
  const d = t - best[1], side = best[2] === 'G' ? -1 : 1
  if (d < 0) { const p = ease.outQuad(prog(d, -0.14, 0)); return { rot: -side * 0.12 * p, dx: 0, dy: -16 * p, sq: -0.06 * p } }
  const k = d < 0.05 ? ease.outQuad(d / 0.05) : d < 0.18 ? 1 : 1 - ease.outCubic(prog(d, 0.18, 0.55))
  return { rot: side * 0.32 * k, dx: -side * 22 * k, dy: 20 * k, sq: 0.1 * k }
}
function buttonState(id, t) {
  let pg = 0, pr = 0
  for (const s of SLAMS) if (s[0] === id) { const p = bump(t, s[1] - 0.01, 0.26); if (s[2] === 'G') pg = Math.max(pg, p > 0 ? 1 : 0); else pr = Math.max(pr, p > 0 ? 1 : 0) }
  const v = voteAt(id, t)
  return { press: [pg, pr], lit: [v && v[2] === 'G' ? 1 : 0, v && v[2] === 'R' ? 1 : 0] }
}

// ── who looks where, feels what (keyframes: [t, mood, look, blink?])
const LEOL = id => [Math.sign(LEO.x - X(id)) || 0, -1]
const UP = [0, -1], FWD = [0, 0], L_ = [-1, 0], R_ = [1, 0]
const KEYS = {
  sag: [[0, 'neutral', UP], [T.on + 0.2, 'happy', LEOL('sag')], [T.ready, 'squint', FWD], [R1.S, 'wide', UP], [R1.sg - 0.12, 'squint', FWD], [R1.sg + 0.02, 'happy', FWD], [R1.la, 'sparkle', FWD], [R1.da + 0.15, 'happy', L_],
    [R1.lb, 'wide', L_], [T.faint[0], 'wide', [-1, 1]], [R1.close, 'neutral', L_], [R2.S, 'neutral', [-1, -1]], [R3.S, 'wide', UP], [R3.sr - 0.12, 'squint', FWD], [R3.sr + 0.02, 'squint', R_],
    [R3.la, 'neutral', R_], [R3.da + 0.3, 'squint', FWD], [R3.lb, 'squint', FWD]],
  can: [[0, 'neutral', UP], [T.on + 0.2, 'happy', LEOL('can')], [T.ready, 'squint', FWD], [R1.S, 'wide', UP], [R1.sr - 0.12, 'wide', FWD], [R1.sr + 0.02, 'squint', FWD], [R1.la, 'wide', R_],
    [R1.da + 0.2, 'squint', R_], [R1.lb, 'sparkle', FWD], [R1.db + 0.1, 'wide', FWD], [T.faint[0], 'neutral', FWD, 1], [R2.S, 'heart', FWD], [R2.sg + 0.02, 'heart', FWD], [R2.la, 'heart', FWD],
    [R2.da + 0.2, 'happy', L_], [R2.lb, 'wide', L_], [T.float[0], 'wide', [-1, -1]], [R2.close, 'neutral', [-1, -1]], [R3.S, 'neutral', R_]],
  aqu: [[0, 'neutral', UP, 0.5], [T.on + 0.2, 'neutral', LEOL('aqu'), 0.5], [T.ready, 'squint', FWD], [R1.S, 'neutral', R_, 0.5], [R2.S, 'neutral', UP, 0.5], [R2.sr - 0.12, 'neutral', FWD, 0.55], [R2.la, 'neutral', R_, 0.55],
    [R2.lb, 'neutral', FWD, 0.55], [T.float[0], 'sleepy', FWD]],
  vir: [[0, 'neutral', UP], [T.on + 0.2, 'happy', LEOL('vir')], [T.ready, 'squint', FWD], [R1.S, 'neutral', L_], [R3.S, 'squint', UP], [R3.sg - 0.12, 'wide', FWD], [R3.sg + 0.02, 'sparkle', FWD], [R3.la, 'sparkle', FWD],
    [R3.da + 0.3, 'sparkle', L_], [R3.lb, 'wide', L_], [T.plane[1], 'wide', [-1, -1]], [T.plane[1] + 0.5, 'wide', [1, -1]], [R4.S, 'neutral', R_]],
  lib: [[0, 'neutral', UP], [T.on + 0.2, 'happy', LEOL('lib')], [T.ready, 'squint', FWD], [R1.S, 'neutral', L_], [R4.S, 'happy', UP], [R4.sg - 0.12, 'squint', FWD], [R4.sg + 0.02, 'sparkle', FWD], [R4.la, 'sparkle', FWD],
    [R4.da + 0.2, 'happy', R_], [R4.lb, 'wide', R_], [T.war[0], 'squint', R_]],
  sco: [[0, 'neutral', UP], [T.on + 0.2, 'squint', LEOL('sco')], [T.ready, 'squint', FWD], [R1.S, 'squint', L_], [R4.S, 'squint', UP], [R4.sr - 0.12, 'squint', FWD], [R4.sr + 0.02, 'squint', L_], [R4.la, 'squint', L_],
    [R4.lb, 'squint', FWD], [T.war[0], 'squint', L_]],
}
// shared later beats (glitch → final → Scorpio → lesson → tie-in → last line)
for (const id of ID) {
  const i = ID.indexOf(id), lk = LEOL(id)
  KEYS[id].push([T.S5, 'wide', lk], [T.S6, 'wide', UP], [T.reveal + 0.2, 'squint', UP], [T.glance[0], 'neutral', i < 3 ? R_ : L_], [T.glance[0] + 0.3, 'neutral', i < 3 ? L_ : R_],
    [T.glance[0] + 0.55, 'squint', FWD], [T.slamF - 0.15, 'wide', FWD], [T.slamF + 0.05, id === 'sco' ? 'squint' : 'heart', FWD], [T.slamF + 0.9, id === 'sco' ? 'squint' : 'happy', FWD],
    [T.turn, 'wide', id === 'sco' ? FWD : [1, 0]], [T.lesson - 0.3, 'sparkle', UP], [T.card[0], 'happy', FWD], [T.hLast, 'happy', FWD])
}
KEYS.sco.push([T.tinyHop - 0.05, 'happy', FWD], [T.tinyHop + 0.4, 'happy', FWD], [T.turn, 'happy', FWD], [T.busted, 'squint', FWD], [T.l12, 'squint', FWD], [T.lesson - 0.3, 'sparkle', UP], [T.card[0], 'happy', FWD], [T.hLast, 'happy', FWD])
for (const id of ID) KEYS[id].sort((a, b) => a[0] - b[0])
function moodOf(id, t) {
  let k = KEYS[id][0]
  for (const e of KEYS[id]) if (e[0] <= t) k = e
  return { mood: k[1], look: k[2], blink: k[3] }
}

// Leo
const LEO_KEYS = [[0, 'wide', [0, 1]], [T.slam0, 'squint', [0, 1]], [T.press0[0] + 0.3, 'happy', FWD], [T.hop0[0], 'wide', FWD], [T.on, 'sparkle', FWD], [T.l1, 'sparkle', FWD], [T.ready + 0.4, 'happy', FWD],
  ...RS.flatMap((R, i) => { const [a, b] = PAIRS[i], la = [Math.sign(X(a) - LEO.x), 1], lb = [Math.sign(X(b) - LEO.x), 1]; return [[R.S, 'neutral', UP], [R.sg, 'wide', la], [R.la, 'neutral', VOTERS[i].g === a ? la : lb], [R.lb, 'neutral', VOTERS[i].r === a ? la : lb], [R.db + 0.4, i >= 2 ? 'wide' : 'happy', FWD]] }),
  [T.plane[1], 'wide', [1, -1]], [T.plane[2], 'wide', FWD], [T.S5, 'wide', FWD], [T.S6, 'squint', FWD], [T.reveal, 'squint', UP], [T.slamF, 'heart', FWD], [T.turn, 'wide', [1, 1]], [T.busted + 0.5, 'happy', FWD],
  [T.lesson - 0.3, 'sparkle', UP], [T.card[0], 'happy', FWD], [T.l13, 'sparkle', FWD], [T.hLast, 'happy', FWD]].sort((a, b) => a[0] - b[0])
function leoMood(t) { let k = LEO_KEYS[0]; for (const e of LEO_KEYS) if (e[0] <= t) k = e; return { mood: k[1], look: k[2] } }

// Pisces (the corner): its sign, how hard it cries
const PIS = { x: 936, y: 1352, s: 150 }
const SIGNS_P = [[R1.S, ['ROUND', '1']], [R2.S, ['ROUND', '2']], [R3.S, ['ROUND', '3']], [R4.S, ['ROUND', '4']], [T.S5, ['ROUND', '?']], [T.S6, ['FINAL', 'ROUND']]]
const PIS_LOW = { x: 930, y: 1612 }
/** Pisces' corner spot: beside the pair in the round shots, down below the stage in the wide ones (a hop between) */
const PIS_SPOTS = [[0, PIS], [T.S6 - 0.1, PIS_LOW], [T.push[0], PIS], [T.lesson - 0.3, PIS_LOW]]
function pisPos(t) {
  let i = 0
  for (let k = 0; k < PIS_SPOTS.length; k++) if (t >= PIS_SPOTS[k][0]) i = k
  const cur = PIS_SPOTS[i][1], prev = i ? PIS_SPOTS[i - 1][1] : cur, p = prog(t, PIS_SPOTS[i][0], PIS_SPOTS[i][0] + 0.4)
  if (p >= 1 || prev === cur) return { x: cur.x, y: cur.y }
  return { x: lerp(prev.x, cur.x, ease.inOutQuad(p)), y: lerp(prev.y, cur.y, ease.inOutQuad(p)) - Math.sin(Math.PI * p) * 120 }
}
function pisSign(t) { let s = null, at = -1; for (const [t0, txt] of SIGNS_P) if (t >= t0) { s = txt; at = t0 } return { txt: s, at } }
function pisCry(t) {
  if (t < R1.S) return t > T.ready ? 1 : 0
  if (t < R2.S) return t > R1.db ? 2 : 1
  if (t < T.S5) return 2
  if (t < T.S6) return 0
  if (t < T.slamF) return 1
  if (t < T.lesson) return 3
  if (t < T.hLast) return 2
  return 3
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── headlines (on the board during the game)
  const H = (text, o) => popText(root, text, { wobble: true, fit: true, ...o })
  const H0 = H('Welcome to | *Red Flag,* | *Green Flag.*', { top: 176, size: 76, accentSize: 122, at: T.h0, late: 4, lateAt: T.h0Late, lateGap: 0.12, accentColor: RED })
  for (const [i, s] of [...H0.root.querySelectorAll('span')].entries()) if (i >= 4) s.style.color = GRN
  const HR = [
    H('They text back | *four hours* later.', { top: 236, size: 82, accentSize: 116, at: R1.S + 0.06, late: 2, lateAt: R1.S + 0.42, accentColor: GOLD }),
    H('They want to | meet your *mum* | on date two.', { top: 196, size: 78, accentSize: 110, at: R2.S + 0.06, late: 0, accentColor: PINK }),
    H('They planned | the date in a | *spreadsheet.*', { top: 196, size: 78, accentSize: 112, at: R3.S + 0.06, late: 1, lateAt: R3.S + 0.5, accentColor: '#7fe0ff' }),
    H('Still friends with | *all* their exes.', { top: 236, size: 80, accentSize: 120, at: R4.S + 0.06, late: 0, accentColor: LAV }),
  ]
  const H5 = H('Technical | *difficulties.*', { top: 226, size: 98, accentSize: 128, at: T.S5 + 0.08, late: 1, lateAt: T.S5 + 0.32, accentColor: RED })
  const H6a = H('Final *round.*', { top: 262, size: 112, accentSize: 150, at: T.S6 + 0.08, late: 1, lateAt: T.S6 + 0.3, accentColor: GOLD })
  const H6 = H('They told you their | *dealbreakers* first.', { top: 236, size: 76, accentSize: 110, at: T.reveal + 0.04, late: 1, lateAt: T.reveal + 0.3, accentColor: GRN })
  const H7 = H('Even | *Scorpio.*', { top: 210, size: 104, accentSize: 150, at: T.tinyHop - 0.02, late: 1, lateAt: T.tinyHop + 0.3, accentColor: SG.sco.color })
  const H8 = H('Your flags. | Your *card.*', { top: 160, size: 100, accentSize: 140, at: T.card[0] + 0.05, late: 1, lateAt: T.card[0] + 0.4, accentColor: RED })
  const H9 = H('Green flags | go *first.*', { top: 168, size: 108, accentSize: 156, at: T.hLast, late: 1, lateAt: T.hLast + 0.4, accentColor: GRN })
  const HEADS = [[H0, T.h0Out], ...HR.map((h, i) => [h, [(i < 3 ? RS[i + 1].S : T.S5) - 0.32, (i < 3 ? RS[i + 1].S : T.S5) - 0.16]]),
    [H5, [T.S6 - 0.3, T.S6 - 0.14]], [H6a, [T.reveal - 0.25, T.reveal - 0.08]], [H6, [T.tinyHop - 0.3, T.tinyHop - 0.12]], [H7, [T.close12 - 0.1, T.close12 + 0.08]],
    [H8, [T.cardOff[0], T.cardOff[0] + 0.16]], [H9, [T.out[0] + 0.1, T.out[1]]]]

  // ── dialogue boxes
  const BOX = { y: 1500, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES_A, open: T.l1 - 0.24, close: 4.62 }),
    ...RS.map((R, i) => dialogueBox(root, { ...BOX, lines: RLINES[i], open: R.la - 0.24, close: R.close })),
    dialogueBox(root, { ...BOX, lines: LINES_G, open: T.l10 - 0.24, close: T.closeG }),
    dialogueBox(root, { ...BOX, lines: LINES_S, open: T.l12 - 0.24, close: T.close12 }),
    dialogueBox(root, { ...BOX, lines: LINES_T, open: T.l13 - 0.24, close: T.close13 }),
  ]

  // ── the shared LESSON beat (on top of the scene and the headlines)
  const lesson = buildLesson(root, { ...LESSON, accentColor: GRN, dim: 0.6 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ the contestants ═══════════════════════
  function placeOf(id, t) {
    let dx = 0, dy = 0, rot = 0, hidden = false, extraHops = []
    if (id === 'can') {
      if (t >= T.faint[0] && t < R2.S + 0.4) {
        if (t < R2.S) { const w = prog(t, T.faint[0] - 0.3, T.faint[0]), p = ease.inCubic(prog(t, ...T.faint)); rot = -Math.PI * p + 0.07 * Math.sin(w * 20) * (1 - p) * (w > 0 ? 1 : 0); dy = 92 * p; dx = -14 * p
          const tw = t - T.faint[1]; if (tw > 0.25) rot += 0.06 * Math.sin(tw * 30) * Math.exp(-((tw - 0.25) % 0.9) * 6) }
        else { const p = easeOutBack(prog(t, R2.S, R2.S + 0.42), 2.2); rot = -Math.PI * (1 - p); dy = 92 * (1 - p) - Math.sin(Math.PI * prog(t, R2.S, R2.S + 0.42)) * 60 }
      }
    }
    if (id === 'aqu') {
      if (t >= T.float[0] && t < T.aquBack[1]) {
        if (t < T.S6) { const p = prog(t, ...T.float); dy = -1250 * ease.inQuad(p); dx = 60 * Math.sin(p * 4); rot = 0.18 * Math.sin(p * 5); if (p >= 1) hidden = true }
        else if (t < T.aquBack[0]) hidden = true
        else { const p = prog(t, ...T.aquBack); dy = -1250 * (1 - ease.outCubic(p)); dx = 40 * Math.sin(p * 3) * (1 - p) }
      }
    }
    if (id === 'sag') {
      const [a, b, c] = T.plane
      const [d, e] = T.sagBack
      if (t >= b - 0.25 && t < e) {
        if (t < b + 0.05) { const pl = planeAt(t), q = ease.inOutQuad(prog(t, b - 0.25, b + 0.05)); dx = (pl[0] - X('sag')) * q; dy = (pl[1] - 135 - CY) * q - Math.sin(Math.PI * q) * 70 }
        else if (t < c) { const pl = planeAt(t); dx = pl[0] - X('sag'); dy = pl[1] - 135 - CY; rot = -0.1 + 0.05 * Math.sin(t * 9) }
        else if (t < d) hidden = true
        else if (t < d + 0.55) { const pl = planeAt(t); dx = pl[0] - X('sag'); dy = pl[1] - 135 - CY; rot = 0.08 }
        else { const pl0 = planeAt(d + 0.55), q = prog(t, d + 0.55, e); dx = (pl0[0] - X('sag')) * (1 - ease.inOutQuad(q)); dy = (pl0[1] - 135 - CY) * (1 - ease.inQuad(q)) - Math.sin(Math.PI * q) * 80 }
      }
      void a
    }
    return { dx, dy, rot, hidden, extraHops }
  }
  /** the plane's world position (or null): R3 in from the left under Sag, then off to the upper right; the final: back from the right */
  function planeAt(t) {
    const [a, b, c] = T.plane, STOP = [X('sag') - 118, CY - 128], FAR = [-760, 380]
    const leg = (t0, t1, inbound) => { const p = prog(t, t0, t1), e = inbound ? ease.outCubic(p) : ease.inCubic(p); const [A, B] = inbound ? [FAR, STOP] : [STOP, FAR]; return [lerp(A[0], B[0], e), lerp(A[1], B[1], e) + (inbound ? 0 : -Math.sin(Math.PI * p) * 40)] }
    if (t >= a && t < c) return t < b ? leg(a, b, true) : leg(b, c, false)
    const [d] = T.sagBack
    if (t >= d && t < d + 1.35) return t < d + 0.55 ? leg(d, d + 0.55, true) : leg(d + 0.55, d + 1.35, false)
    return null
  }
  function drawContestant(id, t, k) {
    const pl = placeOf(id, t)
    if (pl.hidden || k <= 0.01) return
    const m = moodOf(id, t), sp = slamPose(id, t)
    let sq = sp.sq, dy = sp.dy + pl.dy
    // "buzzers ready!": a synced crouch on the beat, bobbing to the groove until round 1
    if (inR(t, T.ready, R1.S)) { const c = easeOutBack(prog(t, T.ready, T.ready + 0.25), 2.4); sq += 0.13 * c + 0.03 * Math.sin((t - 0.6) / BL * Math.PI * 2); dy += 10 * c }
    // drumroll tremble
    let jx = 0
    if (inR(t, T.roll[0], T.reveal)) jx = 2.5 * Math.sin(t * 61 + SEED[id])
    // the final slam: everyone bounces up after
    if (inR(t, T.slamF + 0.25, T.slamF + 1.25)) { const p = prog(t, T.slamF + 0.25 + ID.indexOf(id) * 0.04, T.slamF + 0.85 + ID.indexOf(id) * 0.04); dy -= Math.sin(Math.PI * p) * (id === 'sco' ? 0 : 70); sq -= 0.08 * Math.sin(Math.PI * p) }
    // Scorpio's tiny happy hop
    if (id === 'sco' && inR(t, T.tinyHop, T.tinyHop + 0.42)) { const p = prog(t, T.tinyHop, T.tinyHop + 0.42); dy -= Math.sin(Math.PI * p) * 26; sq -= 0.05 * Math.sin(Math.PI * p) }
    // the turn to look at Scorpio: a little lean
    let lean = 0
    if (id !== 'sco' && inR(t, T.turn, T.busted + 0.9)) lean = 0.08 * clamp(prog(t, T.turn, T.turn + 0.2))
    // the last line: a happy sway
    if (t >= T.hLast) { sq += 0.03 * Math.sin((t - 0.6) / BL * Math.PI) }
    const hops = [...HOPS[id]]
    if (t >= T.lesson) hops.push(T.hLast + 0.4 + ID.indexOf(id) * 0.05, BEAT(93), BEAT(95), BEAT(97))
    if (id === 'aqu' && t >= T.aquBack[0]) hops.push(T.aquBack[1])
    if (id === 'sag' && t >= T.sagBack[0]) hops.push(T.sagBack[1])
    const opts = { color: SG[id].color, mood: m.mood, look: m.look, blink: m.blink, squash: sq, hops, seed: SEED[id], pop: k, bob: CS * 0.025, glow: 0.85 }
    x.save(); x.translate(X(id) + sp.dx + pl.dx + jx, CY + dy); x.rotate(sp.rot + pl.rot + lean * (X('sco') > X(id) ? 1 : -1))
    drawStarChar(x, 0, 0, CS, t, opts)
    const F = starFrame(0, 0, CS, t, opts)
    if (id === 'vir' && inR(t, R3.sg + 0.1, R4.S)) inSprite(x, F, () => tearsCells(x, t, 2))
    if (id === 'can' && inR(t, R1.lb, T.faint[0])) inSprite(x, F, () => tearsCells(x, t, 1))
    x.restore()
  }

  // ═══════════════════════ Leo ═══════════════════════
  function leoPlace(t) {
    if (t < T.fall[1]) { const p = ease.inQuad(prog(t, ...T.fall)); return { x: BUZZ.x, y: lerp(260, 835, p), front: true, sq: -0.12 * p } }
    if (t < T.hop0[0]) { const d = t - T.slam0; return { x: BUZZ.x, y: 835 + 14 * Math.exp(-d * 9), front: true, sq: 0.32 * Math.exp(-d * 7) * Math.cos(d * 22) + 0.1 } }
    if (t < T.hop0[1]) { const p = prog(t, ...T.hop0); return { x: lerp(BUZZ.x, LEO.x, ease.inOutQuad(p)), y: lerp(835, LEO.y, p) - Math.sin(Math.PI * p) * 230, front: p < 0.5, sq: -0.08 * Math.sin(Math.PI * p) } }
    return { x: LEO.x, y: LEO.y, front: false, sq: 0 }
  }
  function sweatK(t) {
    if (t < R3.S) return 0
    if (t < R4.S) return 1
    if (t < T.S5) return 2
    if (t < T.S6) return 3
    if (t < T.slamF) return 1
    return 0
  }
  function drawLeo(t, k) {
    const P0 = leoPlace(t), m = leoMood(t)
    let sq = P0.sq, dy = 0, rot = 0
    if (inR(t, T.slamF, T.slamF + 0.7)) { const p = prog(t, T.slamF, T.slamF + 0.7); dy -= Math.sin(Math.PI * p) * 110 }
    if (inR(t, T.bow, T.bow + 0.9)) { const p = Math.sin(Math.PI * prog(t, T.bow, T.bow + 0.9)); rot = 0.35 * p; dy += 26 * p }
    if (inR(t, T.S5, T.S6)) rot = 0.04 * Math.sin(t * 13)
    const hops = [...HOPS.leo, T.on + 0.05, BEAT(95), BEAT(97)]
    const opts = { color: SG.leo.color, mood: m.mood, look: m.look, squash: sq, hops, seed: SEED.leo, pop: k, bob: 5, glow: 1 }
    x.save(); x.translate(P0.x, P0.y + dy); x.rotate(rot)
    drawStarChar(x, 0, 0, LEO.s, t, opts)
    const F = starFrame(0, 0, LEO.s, t, opts)
    inSprite(x, F, () => { leoSuitCells(x, t); crownCells(x, -0.12 + 0.05 * Math.sin(t * 2)) })
    if (t >= T.hop0[1] - 0.1) inSprite(x, F, () => micCells(x, inR(t, T.l1, T.l1 + 1.4) || inR(t, T.l10, T.l10 + 1.2) || inR(t, T.l13, T.l13 + 2) ? 1 : 0))
    const sk = sweatK(t)
    if (sk) inSprite(x, F, () => sweatCells(x, t, sk))
    if (inR(t, T.l10 + 0.95, T.S6 - 0.1)) inSprite(x, F, () => hankieCells(x, Math.floor((t - T.l10) / 0.32) % 2 ? 1 : -1))
    x.restore()
    // flying sweat in the meltdown
    if (inR(t, T.S5, T.S6)) {
      for (let q = 0; q < 10; q++) {
        const b = T.S5 + q * 0.27, a = t - b
        if (a < 0 || a > 0.6) continue
        const side = q % 2 ? 1 : -1, vx = side * (180 + (q * 37) % 90), vy = -(260 + (q * 53) % 120)
        const px = P0.x + side * 40 + vx * a, py = P0.y - 70 + vy * a + 900 * a * a
        x.fillStyle = '#1b1236'; x.fillRect(px - 7, py - 7, 14, 18); x.fillStyle = '#bfefff'; x.fillRect(px - 4, py - 4, 8, 12); x.fillStyle = '#fff'; x.fillRect(px - 4, py - 4, 4, 4)
      }
    }
  }

  // ═══════════════════════ the set ═══════════════════════
  const lightsOn = t => t >= T.on
  function drawSet(t, C) {
    const g = glitchAt(t), on = lightsOn(t) ? 1 : 0.25
    const allG = t >= T.slamF ? 1 : 0
    const mq = (1 - clamp(prog(t, T.lesson - 0.2, T.lesson + 0.2)) * (1 - clamp(prog(t, T.lessonOut[0], T.lessonOut[1])))) * clamp((1.12 - C.s) / 0.3)
    if (mq > 0.01) { x.save(); x.globalAlpha *= mq; drawMarquee(x, 540, 236, 720, 132, t, { glitch: g, allGreen: allG }); x.restore() }
    void on
    // the score boxes
    const [rv, gv] = tallyAt(t)
    const flashR = Math.max(...RS.map(R => bump(t, R.sr + 0.1, 0.5))), flashG = Math.max(bump(t, T.slamF + 0.25, 0.6), ...RS.map(R => bump(t, R.sr + 0.1, 0.5)))
    drawScoreBox(x, 290, 800, { label: 'RED', value: rv, col: RED, t, glitch: g, seed: 3, flash: flashR })
    drawScoreBox(x, 790, 800, { label: 'GREEN', value: gv, col: GRN, t, glitch: g, seed: 7, flash: flashG })
    // sparks + smoke off the boxes in the meltdown
    if (g > 0.3) {
      const r = rng(Math.floor(t * 9) + 41)
      for (let q = 0; q < 8; q++) {
        const bx = q % 2 ? 790 : 290, ph = (t * 2.2 + q * 0.13) % 1
        const sx = bx + (r() - 0.5) * 140 + (q % 2 ? 1 : -1) * ph * 120, sy = 800 + r() * 30 - ph * 160 + ph * ph * 260
        x.fillStyle = q % 3 ? '#fff3a8' : '#ffb347'; x.fillRect(sx, sy, 8, 8)
      }
      x.save(); x.globalAlpha = 0.35 * g
      for (let q = 0; q < 4; q++) { const ph = (t * 0.7 + q * 0.25) % 1; x.fillStyle = '#8a84a8'; x.beginPath(); x.arc((q % 2 ? 790 : 290) + (q - 1.5) * 20, 790 - ph * 200, 24 + ph * 40, 0, Math.PI * 2); x.fill() }
      x.restore()
    }
    // spotlights (additive): Leo always, the pair in a round, everyone at the end
    const spot = t >= T.on ? (t < T.on + 0.12 ? (Math.floor(t * 40) % 2 ? 1 : 0.4) : 1) : 0
    const flick = g > 0.2 ? (Math.floor(t * 23) % 3 ? 1 : 0.3) : 1
    if (spot) spotCone(x, LEO.x, 150, LEO.x, LECT.top + 110, 60, 420, '#ffe6b0', spot * flick * (t >= T.lesson && t < T.lessonOut[1] ? 0.5 : 1))
    RS.forEach((R, i) => {
      const a = clamp(prog(t, R.S - 0.1, R.S + 0.2)) * (1 - prog(t, R.close, R.close + 0.25))
      if (a > 0) for (const id of PAIRS[i]) spotCone(x, X(id), 150, X(id), FLOOR - 10, 50, 300, id === VOTERS[i].g ? '#c8ffd8' : '#ffd0d6', a)
    })
    const fa = clamp(prog(t, T.slamF, T.slamF + 0.2))
    if (fa > 0) for (const id of ID) spotCone(x, X(id), 150, X(id), FLOOR - 10, 50, 300, '#c8ffd8', fa * 0.8)
    drawRiser(x, -330, 1410, 1090, FLOOR, t)
  }
  function drawPodiums(t) {
    for (const id of ID) {
      const v = voteAt(id, t), vt = v ? v[1] : -9, flash = v ? 1 - prog(t, vt, vt + 1.2) : 0
      drawPodium(x, X(id), PT, { glyph: SG[id].glyph, name: NAMES[id], color: SG[id].color, vote: v ? v[2] : null, flash, t, seed: SEED[id] })
      const b = buttonState(id, t)
      drawButtons(x, X(id), PT, b)
    }
  }
  function drawFlags(t) {
    const g = glitchAt(t)
    for (const id of ID) {
      let v = voteAt(id, t)
      let vote = v ? v[2] : null, k = v ? easeOutBack(prog(t, v[1] + 0.04, v[1] + 0.4), 2.2) : 0
      // the final round lowers every flag first
      if (!v && inR(t, T.S6, T.S6 + 0.35)) { const prev = voteAt(id, T.S6 - 0.01); if (prev) { vote = prev[2]; k = 1 - ease.inCubic(prog(t, T.S6, T.S6 + 0.35)) } }
      if (g > 0.4 && vote) { const r = rng(Math.floor(t * 7) * 13 + ID.indexOf(id)); vote = r() < 0.5 ? 'G' : 'R' }
      if (!vote || k <= 0) continue
      // a re-slam of the same vote (the war) gives the flag a little shake
      drawFlag(x, X(id) + flagSide(id) * 92, PT, { k, vote, t, side: flagSide(id), seed: SEED[id], H: 46 })
    }
  }
  function drawLamp(t) {
    if (t < T.lamp[0] || t >= T.S5 + 0.6) return
    const p = prog(t, ...T.lamp)
    const ay = lerp(420, 760, ease.outCubic(p)), d = t - T.lamp[1]
    const ang = d > 0 ? 0.3 * Math.exp(-d * 1.1) * Math.sin(d * 4.2) : 0.25 * (1 - p)
    const on = d > 0.05 ? 1 : 0
    const [bx, by] = drawHangLamp(x, X('sco') - 6, ay, 250, ang, 9, on)
    if (on) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(bx, by + 140, 0, bx, by + 140, 260); gr.addColorStop(0, 'rgba(255,243,168,0.42)'); gr.addColorStop(1, 'rgba(255,243,168,0)')
      x.fillStyle = gr; x.beginPath(); x.moveTo(bx - 26, by + 40); x.lineTo(bx + 26, by + 40); x.lineTo(bx + 200, by + 330); x.lineTo(bx - 200, by + 330); x.closePath(); x.fill()
      x.restore()
    }
  }

  // ═══════════════════════ screen space ═══════════════════════
  const BOARD = { cx: 540, top: 150, w: 960, h: 380 }
  const BOARD_BEATS = [  // [t, label, labelBg, labelFg]
    [T.h0, '', GOLD, '#1b1236'], [R1.S, 'ROUND 1', GOLD, '#1b1236'], [R2.S, 'ROUND 2', GOLD, '#1b1236'], [R3.S, 'ROUND 3', GOLD, '#1b1236'], [R4.S, 'ROUND 4', GOLD, '#1b1236'],
    [T.S5, 'ERROR', RED, '#ffffff'], [T.S6, 'FINAL ROUND', GOLD, '#1b1236'], [T.reveal, 'FINAL ROUND', GOLD, '#1b1236'], [T.tinyHop - 0.02, 'UNANIMOUS', GRN, '#0b2a18'],
  ]
  const boardEnd = T.close12 + 0.1
  function drawBoardAt(t) {
    if (t < T.h0 - 0.05 || t > boardEnd + 0.3) return
    let cur = BOARD_BEATS[0]
    for (const b of BOARD_BEATS) if (t >= b[0]) cur = b
    // open at the start, a quick squash-flip at every new beat, close at the end
    let k = easeOutBack(prog(t, T.h0 - 0.05, T.h0 + 0.25), 1.8)
    for (const b of BOARD_BEATS.slice(1)) { const d = t - b[0]; if (d > -0.16 && d < 0.24) k = Math.min(k, d < 0 ? 1 - ease.inQuad((d + 0.16) / 0.16) * 0.9 : 0.1 + 0.9 * easeOutBack(d / 0.24, 2)) }
    k *= 1 - ease.inCubic(prog(t, boardEnd, boardEnd + 0.3))
    const tint = t >= T.slamF ? GRN : t >= T.S5 && t < T.S6 ? RED : null
    const tintK = t >= T.slamF ? 1 - 0.6 * prog(t, T.slamF, T.slamF + 2) : 0.6
    const sc = t < R1.S ? null : tallyAt(t)
    drawBoard(x, BOARD.cx, BOARD.top, BOARD.w, BOARD.h, t, { k, label: cur[1], labelBg: cur[2], labelFg: cur[3], score: t >= T.S6 && t < T.slamF ? null : sc, glitch: glitchAt(t), tint, tintK })
  }
  function drawPisces(t) {
    if (t < T.pisIn || t > T.out[1] + 0.05) return
    const k = pop01(t, T.pisIn, 0.38, 2.2) * popOut(t, [T.out[0] + 0.15, T.out[1]])
    const dim = t >= T.card[0] - 0.1 && t < T.cardOff[1] ? 0 : 1
    if (k <= 0.02 || dim <= 0) return
    const cry = pisCry(t)
    let mood = cry >= 2 ? 'sparkle' : 'sparkle', look = [-1, -1], sq = 0, dy = 0
    if (inR(t, T.S5, T.S6)) { mood = 'wide'; look = [-1, -1]; sq = 0.03 * Math.sin(t * 40) }
    if (inR(t, T.roll[0], T.slamF)) { mood = 'wide'; look = [-1, -1] }
    if (t >= T.slamF) { mood = 'happy'; sq = 0.06 * Math.sin(t * 20); if (inR(t, T.slamF, T.slamF + 0.6)) dy = -Math.sin(Math.PI * prog(t, T.slamF, T.slamF + 0.6)) * 60 }
    if (inR(t, T.turn, T.busted + 0.8)) { mood = 'wide'; look = [-1, 0] }
    const hops = [R1.S + 0.12, R2.S + 0.12, R3.S + 0.12, R4.S + 0.12, T.S6 + 0.12]
    const opts = { color: SG.pis.color, glyph: SG.pis.glyph, mood, look, squash: sq, hops, seed: SEED.pis, pop: k, bob: 4, glow: 0.8 }
    const pp = pisPos(t)
    drawStarChar(x, pp.x, pp.y + dy, PIS.s, t, opts)
    const F = starFrame(pp.x, pp.y + dy, PIS.s, t, opts)
    if (cry) inSprite(x, F, () => tearsCells(x, t, cry))
    // the sign (tossed in the air at the final slam)
    const { txt, at } = pisSign(t)
    if (!txt) return
    const flip = at > R1.S ? Math.abs(Math.cos(Math.PI * clamp((t - at + 0.12) / 0.24))) : 1
    const wet = t < R2.S ? 0 : t < R3.S ? 0.4 : t < T.S6 ? 0.85 : 1
    let sx = pp.x, sy = pp.y + 66 + dy * 0.5, rot = -0.06, a = 1
    if (t >= T.slamF) { const d = t - T.slamF; sx += 260 * d; sy += -900 * d + 1500 * d * d; rot += d * 9; a = clamp(1 - d) }
    if (a <= 0) return
    x.save(); x.globalAlpha = k * a
    drawSign(x, sx, sy, 176, 92, txt, { rot, wet, t, sy: Math.max(0.08, flip) })
    x.restore()
  }
  function flashes(t) {
    // the hook slam: a red flash + rays
    const fr = 1 - prog(t, T.slam0, T.slam0 + 0.4)
    if (t >= T.slam0 && fr > 0) { x.fillStyle = `rgba(255,60,80,${0.32 * fr})`; x.fillRect(0, 0, W, 1920) }
    const fg = 1 - prog(t, T.slamF, T.slamF + 0.45)
    if (t >= T.slamF && fg > 0) { x.fillStyle = `rgba(80,255,150,${0.26 * fg})`; x.fillRect(0, 0, W, 1920) }
  }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, life = 0.7, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p) * 0.8, 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  const CHIPS = ['One-word texts', 'Flaky plans', '“Calm down”']
  function drawCard(t) {
    if (t < T.card[0] || t > T.cardOff[1]) return
    const p = prog(t, ...T.card), e = easeOutBack(p, 1.5), o = ease.inCubic(prog(t, ...T.cardOff))
    const cx = lerp(1300, 540, e) + o * 900, cy = 986 - Math.sin(p * Math.PI) * 80 - o * 200
    const sxp = Math.cos(Math.PI * clamp((t - T.card[0] - 0.05) / 0.4)) // back → face flip
    // scrim
    x.fillStyle = `rgba(6,4,16,${0.55 * clamp(p * 2) * (1 - o)})`; x.fillRect(0, 0, W, 1920)
    if (sxp > 0) {
      x.save(); x.translate(cx, cy); x.rotate((1 - e) * 0.3 + o * 0.4); x.scale(sxp, 1)
      x.beginPath(); x.roundRect(-300, -410, 600, 820, 34); const gg = x.createLinearGradient(0, -410, 0, 410); gg.addColorStop(0, '#6a3fd0'); gg.addColorStop(1, '#3a1d86'); x.fillStyle = gg; x.fill()
      x.lineWidth = 6; x.strokeStyle = 'rgba(255,240,200,0.9)'; x.stroke()
      drawPixelStar(x, 0, 0, 120, 2, '#fff6dc')
      x.restore()
    } else {
      x.save(); x.translate(cx, cy); x.rotate(o * 0.4); x.translate(-cx, -cy)
      drawDealCard(x, cx, cy, 600, 820, t, { stamps: T.stamps, chips: CHIPS, sx: -sxp, tagK: pop01(t, T.tag, 0.34, 2.6) })
      x.restore()
    }
    if (p > 0.6 && t < T.card[1] + 0.5) sparkleRing(t, cx, cy, T.card[0] + 0.3, 12, 380, 1)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const outAll = popOut(t, T.out)
      if (t < T.out[1] + 0.05) {
        const C = cam(t)
        // shake: the hook slam, the meltdown, the final slam
        let sh = 0
        for (const [t0, amp] of [[T.slam0, 22], [T.S5 + 0.05, 10], [T.slamF, 14]]) { const kk = t - t0; if (kk >= 0 && kk < 0.35) sh = Math.max(sh, amp * (1 - kk / 0.35)) }
        if (inR(t, T.S5, T.closeG)) sh = Math.max(sh, 3)
        const shx = sh * Math.sin(t * 97), shy = sh * Math.cos(t * 83)
        x.save()
        x.translate(540 + shx, 1000 + shy); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        x.globalAlpha = outAll
        drawSet(t, C)
        const lp = leoPlace(t)
        if (!lp.front) drawLeo(t, 1)
        drawLectern(x, LECT.x, LECT.top, { t })
        const bp = t >= T.slam0 && t < T.hop0[0] + 0.05 ? 1 : 0
        drawBigBuzzer(x, BUZZ.x, LECT.top, { press: bp, lit: bp ? (Math.floor(t * 12) % 2 ? 1 : 0.6) : 0 })
        if (lp.front) drawLeo(t, 1)
        drawFlags(t)
        const pl = planeAt(t)
        if (pl) { const tb = t < T.plane[2] ? T.plane[1] : T.sagBack[0] + 0.55; drawPlane(x, pl[0], pl[1], 9, Math.cos(Math.PI * clamp((t - tb) / 0.16)), t) }
        const order = ['aqu', 'can', 'sag', 'vir', 'lib', 'sco']
        for (const id of order) drawContestant(id, t, 1)
        drawPodiums(t)
        drawFloor(x, -330, 1410, FLOOR, t, { allGreen: t >= T.slamF ? 1 : 0 })
        drawLamp(t)
        // the hook: impact rays round the buzzer
        const rk = 1 - prog(t, T.slam0, T.slam0 + 0.45)
        if (t >= T.slam0 && rk > 0) {
          x.save(); x.globalAlpha = rk; x.fillStyle = '#fff1c8'
          for (let i = 0; i < 8; i++) { const sd = i < 4 ? -1 : 1, a = (sd < 0 ? Math.PI : 0) + sd * (-0.5 + (i % 4) * 0.33), r0 = 150 + (1 - rk) * 110; x.save(); x.translate(BUZZ.x + Math.cos(a) * r0, LECT.top - 40 + Math.sin(a) * r0 * 0.7); x.rotate(a); x.fillRect(0, -5, 46, 10); x.restore() }
          x.restore()
        }
        x.globalAlpha = 1
        x.restore()
        // screen space
        x.save(); x.globalAlpha = outAll
        drawBoardAt(t)
        x.restore()
        drawPisces(t)
        confetti(x, t, T.slamF, { x0: 120, y0: 1460, n: 70, seed: 3, spread: 0.7 })
        confetti(x, t, T.slamF + 0.08, { x0: 960, y0: 1460, n: 70, seed: 9, spread: 0.7 })
        confetti(x, t, T.hLast, { x0: 540, y0: 1500, n: 90, seed: 13, spread: 1.1, cols: ['#39dd7e', '#b5ffd0', '#f2c75c', '#efe6d6', '#7dffb0'] })
        flashes(t)
        drawCard(t)
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change (hook → R1 → R2 → R3 → R4 → meltdown → final → lesson → tie-in → last line).
// The default selection keeps 4 of these 9 (indices 1, 3, 5, 7). End card flips at 55.6.
export const CUTS = [4.72, +(R2.S - 0.1).toFixed(3), +(R3.S - 0.1).toFixed(3), +(R4.S - 0.1).toFixed(3), +(T.S5 - 0.1).toFixed(3), 33.42, 42.7, 46.98, 50.85]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are moved into Eb by the engine; chip / lead cues are written in Eb on the 'fx' bus.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const Eb = { Bb2: 116.54, Eb3: 155.56, G3: 196, Ab3: 207.65, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392, Ab4: 415.3, Bb4: 466.16, C5: 523.25, Eb5: 622.25, G5: 783.99, Bb5: 932.33, Eb6: 1244.51 }
const FX = { rev: 0.08, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
/** the RED buzzer: a fat, beating square-wave BZZZT */
const buzz = (t, len = 0.42, g = 1) => [['chip', t, 98, len, { ...FX, wave: 'square', duty: 0.5, gain: 0.05 * g, decay: 0.04, sustain: 0.92 }], ['chip', t, 103.6, len, { ...FX, wave: 'square', duty: 0.3, gain: 0.045 * g, decay: 0.04, sustain: 0.92 }], ['chip', t, 196, len * 0.9, { ...FX, wave: 'square', duty: 0.25, gain: 0.02 * g, decay: 0.04, sustain: 0.9 }], ['tick', t, 0.06 * g]]
/** the GREEN ding-ding */
const ding = (t, g = 1) => [['bell', t, 1174.66, 0.05 * g, 0.9, 0], ['bell', +(t + 0.09).toFixed(3), 1567.98, 0.045 * g, 1.1, 0], ['chip', t, Eb.Eb6, 0.08, { ...FX, wave: 'square', duty: 0.25, gain: 0.02 * g, decay: 0.06, sustain: 0.5 }], ['tick', t, 0.04 * g]]
const womp = t0 => [[Eb.Bb4, 0, 0.28], [Eb.Ab4 * 1.06, 0.32, 0.28], [Eb.Ab4, 0.64, 0.28], [Eb.G4, 0.96, 0.9]].map(([f, d, len]) => ['lead', +(t0 + d).toFixed(3), f, len, { wave: 'saw', gain: 0.05, cutoff: 1300, env: 500, envDecay: 4, vib: d > 0.9 ? 0.018 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, rev: 0.18, dly: 0, bus: 'fx' }])
const slideUp = (t, len) => [['chip', t, Eb.Bb3, len, { ...FX, wave: 'tri', slide: 22 / len, vib: 0.02, gain: 0.03, decay: len, sustain: 0.8 }]]
const slideDown = (t, len) => [['chip', t, Eb.Bb5, len, { ...FX, wave: 'tri', slide: -22 / len, vib: 0.02, gain: 0.026, decay: len, sustain: 0.8 }]]
const roll = (t0, t1) => { const out = []; for (let t = t0, i = 0; t < t1; t += 1 / 22, i++) { const p = (t - t0) / (t1 - t0); out.push(['snare', +t.toFixed(3), { gain: 0.05 + 0.13 * p * p, decay: 0.07, snappy: 0.9, tone: 200, pan: (i % 2 ? 0.12 : -0.12), rev: 0.15, bus: 'fx' }]) } return out }
const cheers = (t0, t1, seed) => { const r = rng(seed), out = [['swell', t0, t0 + 0.6, { gain: 0.04, f0: 700, f1: 3600 }]]; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.1 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const applause = (t0, len, seed, g = 0.6) => cheers(t0, t0 + len, seed).slice(1).map(c => (c[2].gain *= g, c))
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => ['chip', +(t0 + d).toFixed(3), 4400, 0.03, { duty: 0.25, gain: 0.024, decay: 0.02, sustain: 0.7, pan, rev: 0.1, dly: 0, bus: 'fx' }])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const glitchFx = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.06 + r() * 0.1) out.push(['chip', +t.toFixed(3), 300 + r() * 2400, 0.05 + r() * 0.06, { ...FX, wave: r() < 0.4 ? 'noise' : 'square', duty: 0.25, gain: 0.018, decay: 0.03, sustain: 0.6 }]); return out }
const stamp = t => [['tom', t, 82, { ...FX, gain: 0.3, decay: 0.3 }], ['boom', t, 0.08], ['clap', t + 0.005, { ...FX, gain: 0.14 }], ['tick', t, 0.08]]
const boing = t => [['chip', t, Eb.Eb5, 0.18, { ...FX, wave: 'tri', slide: 30, gain: 0.03, decay: 0.15, sustain: 0.4 }]]
const PITCH = { [TG('leo')]: 760, [TG('sag')]: 1020, [TG('can')]: 1180, [TG('aqu')]: 900, [TG('vir')]: 1100, [TG('lib')]: 1250, [TG('sco')]: 700 }

export const CUES = [
  // hook: Leo drops onto the giant buzzer
  ['whoosh', 0.05, 0.4, 0.05],
  ...buzz(T.slam0, 0.58, 1.4), ['boom', T.slam0, 0.16], ['tick', T.slam0, 0.09],
  ...head(T.h0, 2, T.h0Late, 0), ['pop', T.h0Late + 0.12, 1318.51, 0.04, 0], ['pop', T.h0Late + 0.24, 1567.98, 0.04, 0], ['pop', T.h0Late + 0.36, 1760, 0.04, 0],
  ['riser', 0.7, T.on, 0.05],
  ['boom', T.on, 0.12], ['tick', T.on, 0.08], ['whoosh', T.on + 0.1, 1.3, 0.05], ...applause(T.on + 0.05, 1.6, 2, 0.7),
  ['pop', T.pisIn + 0.08, 1318.51, 0.025, 0.5],
  ...ID.map((id, i) => ['pop', +(T.ready + i * 0.02).toFixed(3), 440, 0.02, (i - 2.5) * 0.25]), ['tick', T.ready, 0.05],
  // the rounds
  ...RS.flatMap((R, i) => [
    ['whoosh', +(R.S - 0.28).toFixed(3), 0.32, 0.05], ['tick', R.S, 0.05],
    ...head(R.S + 0.06, i === 1 ? 6 : 4, R.S + 0.45, i),
    ...ding(R.sg), ...buzz(R.sr),
    ['pop', +(R.sg + 0.06).toFixed(3), 1318.51, 0.02, -0.3], ['pop', +(R.sr + 0.06).toFixed(3), 659.25, 0.02, 0.3],
  ]),
  // R1: Cancer faints · R2: Aquarius floats away · R3: Sag boards a plane · R4: the lamp + the buzzer war
  ['whoosh', T.faint[0] + 0.1, 0.4, 0.04], ['boom', T.faint[1], 0.06], ...womp(T.faint[1] + 0.05),
  ['pop', R2.S + 0.05, 880, 0.035, -0.3], ['pluck', R2.S + 0.2, 1318.51, 0.03, 0.4, -0.3],
  ...slideUp(T.float[0], 2.2),
  ['whoosh', T.plane[0], 0.6, 0.07], ['pop', T.plane[1], 784, 0.03, 0], ['whoosh', T.plane[1] + 0.1, 1.0, 0.08], ['swell', T.plane[1], T.plane[2], { gain: 0.02, f0: 300, f1: 1800 }],
  ['tick', T.lamp[1], 0.09], ['tom', T.lamp[1], 160, { ...FX, gain: 0.12, decay: 0.12 }], ['chip', T.lamp[1], 120, 1.2, { ...FX, wave: 'square', duty: 0.5, gain: 0.006, decay: 1, sustain: 1 }],
  ...WAR.flatMap(([, t, v]) => v === 'G' ? ding(t, 0.6) : buzz(t, 0.16, 0.7)),
  // the meltdown
  ['tapeStop', T.S5 - 0.25, 0.4], ...glitchFx(T.S5 - 0.1, T.S5 + 2.4, 5), ['boom', T.S5 + 0.05, 0.1], ['whoosh', T.S5 - 0.28, 0.32, 0.05],
  ...head(T.S5 + 0.08, 1, T.S5 + 0.32, 3),
  // the final round
  ['whoosh', T.S6 - 0.25, 0.4, 0.05], ...head(T.S6 + 0.08, 1, T.S6 + 0.3, 2),
  ['pop', T.S6 + 0.05, 330, 0.03, -0.4], ['pop', T.S6 + 0.12, 294, 0.03, 0.4],
  ...roll(T.roll[0], T.roll[1]), ['tick', T.reveal, 0.08], ['boom', T.reveal, 0.1],
  ...head(T.reveal + 0.04, 4, T.reveal + 0.3, 1),
  ['tapeStop', T.stopM, 0.42],
  ...[0, 1, 2, 3].flatMap(i => chirp(T.stopM + 0.5 + i * 0.55, i % 2 ? 0.5 : -0.5)),
  ...slideDown(T.aquBack[0], 0.85), ['pop', T.aquBack[1], 523.25, 0.03, -0.4],
  ['whoosh', T.sagBack[0], 0.8, 0.07], ['pop', T.sagBack[1], 587.33, 0.03, -0.2],
  ...[0, 1, 2].map(i => ['tick', +(T.glance[0] + i * 0.28).toFixed(3), 0.03]),
  ...FINAL_ORDER.flatMap((id, i) => ding(+(T.slamF + i * 0.035).toFixed(3), 0.55)), ['boom', T.slamF, 0.12],
  ...cheers(T.slamF + 0.05, T.slamF + 2.6, 11), ['glitter', T.slamF, T.slamF + 1.0],
  ...sob(T.slamF + 0.3, 1046.5), ...sob(T.slamF + 0.9, 987.77, 2),
  // even Scorpio
  ['whoosh', T.push[0], 0.35, 0.04], ...head(T.tinyHop - 0.02, 1, T.tinyHop + 0.3, 4),
  ...boing(T.tinyHop), ['tick', T.turn, 0.07], ['pop', T.turn, 392, 0.03, 0],
  ['pop', T.busted, 220, 0.04, 0],
  // the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Eb' }),
  // the tie-in: YOUR CARD
  ['whoosh', T.card[0] + 0.05, 0.45, 0.06], ['tick', T.card[0] + 0.25, 0.06], ['bell', T.card[1], 1318.51, 0.035, 1.4, 0], ['glitter', T.card[0] + 0.2, T.card[1] + 0.4],
  ...head(T.card[0] + 0.05, 3, T.card[0] + 0.4, 2),
  ['pop', T.tag, 1567.98, 0.03, 0.3],
  ...T.stamps.flatMap(stamp),
  ['whoosh', T.cardOff[0], 0.35, 0.05],
  // the last line
  ...head(T.hLast, 3, T.hLast + 0.4, 0), ...cheers(T.hLast + 0.05, T.hLast + 1.8, 21), ['glitter', T.hLast, T.hLast + 0.8],
  ['pluck', T.bow, 659.25, 0.03, 0.5, 0], ['pop', T.bow + 0.45, 523.25, 0.03, 0],
  ...[93, 95, 97].map(n => ['pop', BEAT(n), 784, 0.025, 0]),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0], T.out[0] + 0.5],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export { T, R1, R2, R3, R4, LESSON }
