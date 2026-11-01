// hxfoodtrucks — DATE NIGHT RECAP: "The Food Truck Date." (45 s vertical Align ad, Star Talk: Houston, music: pop in A).
// The sxrecapbowl sportscast booth: ♊ GEMINI + ♐ SAG in headsets at the DATE NIGHT RECAP desk call a date like a big game on
// the STAR CAM jumbotron. ♎ LIBRA (cannot pick) and ♈ ARIES (picks everything) at a food-truck park under string lights.
// ♓ Pisces sits on the jumbotron with a pennant, crying. Story 0–40.6, then the end card.
//   0.00–3.85   "Date night: | *food trucks.*"  GEMINI: "Live from the truck park, folks!"  Six trucks, string lights, LIVE.
//   3.95–8.55   "Libra *decides.*"  The camera pans truck to truck to truck as Libra looks, and looks… HMM.
//               SAG: "Libra's still reading the menus."  STAT: LIBRA: STILL DECIDING.
//   8.7–13.4    "Aries *decides.*"  Aries sprints the whole row and comes back with a tower of takeout.
//               GEMINI: "Aries ordered from every truck."  STAT: ARIES: ORDERED IT ALL.
//  13.5        the one card cut (cardfx.js).
//  13.6–19.4   "The *table.*"  The tower lands on the picnic table and wobbles (THUD). The booth gives up: Gemini face-plants,
//               Sag rolls its eyes. SAG: "Total mismatch. Call it."  STAT: PACE: MISMATCHED.  Pisces: SOB!
//               (At the table Libra opens a box, tastes, and slides it over; they split it. Nobody notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  REWIND, SLO-MO: the telestrator circles the box changing hands: SHARING / TASTING.
//               GEMINI: "Wait. Are they sharing?"  SAG: "Libra gets to try everything."  STAT: CHOICES: ALL OF THEM.
//  25.04–27.8  "Play of | *the night.*"  PLAY OF THE NIGHT: six open boxes, two forks. GEMINI: "THE SAMPLER PLATTER!"
//  28.38–32.55 ★ LESSON UNLOCKED: "Different paces | can still *share* a table."
//  32.65–36.5  "Tonight's *deck.*"  Three cards deal onto the table between the boxes. SAG: "New deck tonight. Bring snacks."
//  36.6–40.5   "Final *bite.*"  One bite left: each slides it to the other. SHARED ♥. THE BOOTH: "Six trucks. One table."
// Rewatch bait: the menu boards change from MENU to SOLD OUT one by one as Aries passes.
// One canvas (sky + jumbotron + booth), a low-res truck-park canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, headsetCells, tearsCells, drawMic, confetti } from './props.js'
import { GEO, SX, SY, GOLD, BONE, PINK, LAV, INK, RED, MINT, CYAN, TELE, MONO, showBug, drawLights, drawJumbo, drawDeskFront, screenFx, pill, liveBug, replayBug, vhs, statBox, teleCircle, teleArrow, teleTag, bigBanner, pennant, miniCard } from './booth.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const BL = 60 / 108
const BEAT = n => 0.6 + n * BL
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), LIB = signStar('libra'), ARI = signStar('aries')
export const KEY = 'A'
const { LW, LH, SCR } = GEO
const TAU2 = Math.PI * 2

// ── the timeline
const T = {
  black: [-1, -0.9],                                   // frame 0 is the thumbnail: everything is already in at t = 0
  monIn: -0.85, deskIn: -0.78, gemIn: -0.7, sagIn: -0.62, micIn: -0.56, pisIn: -0.45, live: -0.4,
  h0: -0.8, h0Land: -0.45, h0Out: [3.65, 3.85], l0: 0.85, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], loop1: [4.1, 8.3], l1: 5.3, close1: 8.55, stat1: [6.4, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], loop2: [8.9, 12.2], l2: 9.9, close2: 13.3, stat2: [11.6, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], walk3: [13.6, 14.3], bonk: 14.45, laugh: 15.35, pass: 15.9,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.6, close4: 24.85,
  c1: 22.25, c2: 22.55, stat4: [23.6, 24.95],
  erupt: BEAT(44), h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,                    // 25.04
  lesson: BEAT(50), lessonOut: [32.35, 32.55],                                         // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], deal: 33.0, l7: 33.1, close6: 36.45, stat6: [33.6, 36.5],
  fin: 36.6, h7: 36.6, h7Land: 36.95, slide: [37.6, 38.4], pins: 38.6, l8: 37.0, close7: 40.0, out: [40.05, 40.5],
}
// the replay maps the picture back onto the table, slowed down
const SLO = [14.3, 16.9]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Live from the *truck park,* folks!' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'Libra’s still *reading the menus.*' },
  { t: T.l2, speaker: GT, color: GC, text: 'Aries ordered from *every truck.*' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'Total mismatch. *Call it.*' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Are they *sharing?*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'Libra gets to try *everything.*' },
  { t: T.l6, speaker: GT, color: GC, text: 'THE SAMPLER *PLATTER!*' },
  { t: T.l7, speaker: ST, color: SCOL, text: 'New deck tonight. *Bring snacks.*' },
  { t: T.l8, speaker: BT, color: PINK, text: 'Six trucks. *One* table.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES, LT })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Different paces | can still *share* a table.', chip: 'BONUS: SECOND HELPINGS' }

const STATS = [[...T.stat1, 'LIBRA: STILL DECIDING'], [...T.stat2, 'ARIES: ORDERED IT ALL'], [...T.stat3, 'PACE: MISMATCHED'], [...T.stat4, 'CHOICES: ALL OF THEM'], [...T.stat6, 'NEXT ROUND: TONIGHT']]
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b

// ── the truck park: a long strip (low-res world, 2× the screen); the camera pans along it
const WW = LW * 2, GROUND = 84
const TRUCKS = [12, 64, 116, 168, 220, 272].map((wx, i) => ({ wx, i }))     // left edge, world low-res x (each 46 wide)
const TABLE = { wx: 290 }                                                  // the picnic table (centre), right of the last truck… in front of it
/** camera (world low-res x of the screen's left edge) at picture time pt / film time t */
function camX(pt, t = pt) {
  if (t >= T.erupt || pt >= T.cut1) return WW - LW
  if (pt < T.loop1[0]) return 40
  if (pt < T.h2) return 40 + 56 * Math.sin((pt - T.loop1[0]) * 1.6)                     // Libra looks… and looks
  if (pt < T.loop2[0]) return lerp(40 + 56 * Math.sin((T.h2 - T.loop1[0]) * 1.6), 0, ease.inOutQuad(prog(pt, T.h2, T.loop2[0])))
  return lerp(0, WW - LW, ease.inOutQuad(prog(pt, T.loop2[0], T.loop2[1])))           // follow Aries down the row
}
/** how many takeout boxes Aries carries / has put down */
const boxesHeld = pt => pt < T.loop2[0] ? 0 : pt >= T.bonk ? 0 : Math.min(6, 1 + Math.floor(prog(pt, T.loop2[0], T.loop2[1] - 0.4) * 6))
const toLX = X => (X - SCR.sx0) / GEO.PS
const STAR_S = 150

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 27px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }
  // ── bake the truck park once (2× wide strip): night sky, a fence, six trucks with roof signs, the gravel lot
  const parkBG = document.createElement('canvas'); parkBG.width = WW; parkBG.height = LH
  const TRUCK_COL = [['#f2c75c', '#c48a2a'], ['#ff8fb1', '#c45a7a'], ['#7fe0ff', '#3a9ab8'], ['#9cf08a', '#4a9a4a'], ['#c9a6ff', '#7a5ab8'], ['#ff8a5c', '#c4502a']]
  {
    const b = parkBG.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    ;['#16123a', '#1c1744', '#241c4e', '#2c2258'].forEach((c, i) => P(0, i * 6, WW, 6, c))
    const r = rng(31)
    for (let i = 0; i < 40; i++) P(Math.floor(r() * WW), Math.floor(r() * 20), 1, 1, '#d8d0ff')
    // a far tree line + fence
    for (let i = -3; i < WW + 3; i += 5) { const h = 6 + Math.floor(r() * 6); P(i, 36 - h, 6, h, '#141a30') }
    P(0, 36, WW, 4, '#1c2238'); for (let i = 0; i < WW; i += 4) P(i, 32, 1, 8, '#3a3a58'); P(0, 33, WW, 1, '#3a3a58')
    // the lot
    for (let y = 40; y < LH; y++) P(0, y, WW, 1, y % 4 ? '#2b2740' : '#2f2a46')
    for (let i = 0; i < 160; i++) P(Math.floor(r() * WW), 44 + Math.floor(r() * 66), 1, 1, '#45405e')
    // the trucks
    const icon = (i, cx, cy) => {
      const I = [
        () => { P(cx - 3, cy, 7, 2, '#ffffff'); P(cx - 2, cy + 2, 5, 1, '#ffffff'); P(cx - 2, cy - 2, 1, 2, '#e8d6b2'); P(cx + 1, cy - 3, 1, 3, '#e8d6b2') },     // a bowl + chopsticks
        () => { P(cx - 3, cy - 2, 7, 2, '#e8a84a'); P(cx - 3, cy, 7, 1, '#46cf82'); P(cx - 3, cy + 1, 7, 1, '#8a4a2a'); P(cx - 3, cy + 2, 7, 1, '#e8a84a') },   // a burger
        () => { P(cx - 3, cy - 2, 7, 1, '#e8a84a'); P(cx - 2, cy - 1, 5, 1, '#ffd95a'); P(cx - 1, cy, 3, 1, '#ffd95a'); P(cx, cy + 1, 1, 2, '#ffd95a'); P(cx - 1, cy - 1, 1, 1, '#e8344e') },   // a pizza slice
        () => { P(cx - 2, cy - 3, 1, 3, '#ffd95a'); P(cx, cy - 4, 1, 4, '#ffd95a'); P(cx + 2, cy - 3, 1, 3, '#ffd95a'); P(cx - 3, cy, 7, 3, '#e8344e') },          // fries
        () => { P(cx - 2, cy - 3, 5, 3, '#ff8fb1'); P(cx - 1, cy - 4, 3, 1, '#7fe0ff'); P(cx - 1, cy, 3, 1, '#efe6d6'); P(cx, cy + 1, 1, 2, '#efe6d6') },          // a snow cone
        () => { P(cx - 3, cy - 1, 7, 3, '#efe6d6'); P(cx - 2, cy - 2, 5, 1, '#efe6d6'); P(cx - 2, cy, 1, 1, '#cfc6b0'); P(cx, cy, 1, 1, '#cfc6b0'); P(cx + 2, cy, 1, 1, '#cfc6b0') },  // dumplings
      ][i]; I()
    }
    for (const { wx, i } of TRUCKS) {
      const [c1, c2] = TRUCK_COL[i], y0 = 50, w = 46, h = 30
      P(wx - 1, y0 - 1, w + 2, h + 2, INK); P(wx, y0, w, h, c1); P(wx, y0 + h - 6, w, 6, c2)
      P(wx + w - 12, y0 + 3, 10, 9, '#9fd4ff'); P(wx + w - 12, y0 + 3, 10, 2, '#cfeaff')            // the cab window
      P(wx + 4, y0 + 6, 26, 12, '#1b1236'); P(wx + 5, y0 + 7, 24, 10, '#ffe9b8')                  // the serving hatch, lit
      for (let k = 0; k < 7; k++) P(wx + 3 + k * 4, y0 + 3, 4, 3, k % 2 ? '#ffffff' : c2)        // the awning
      P(wx + 3, y0 + 18, 28, 1, '#8a6440')                                                         // the counter
      for (const wxx of [wx + 6, wx + w - 10]) { P(wxx - 1, y0 + h - 1, 7, 6, INK); P(wxx, y0 + h, 5, 4, '#3a3656'); P(wxx + 2, y0 + h + 1, 1, 1, '#9a96b0') }
      // roof sign with the icon
      P(wx + 10, y0 - 10, 18, 10, INK); P(wx + 11, y0 - 9, 16, 8, '#efe6d6'); icon(i, wx + 19, y0 - 5)
    }
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *food trucks.*', { top: 118, size: 100, accentSize: 146, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'Libra *decides.*', { top: 168, size: 112, accentSize: 164, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Aries *decides.*', { top: 168, size: 112, accentSize: 164, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'The *table.*', { top: 168, size: 112, accentSize: 164, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Play of | *the night.*', { top: 118, size: 104, accentSize: 156, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Tonight’s *deck.*', { top: 168, size: 108, accentSize: 160, at: T.h6, gap: 0.12, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Final *bite.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
  ]
  const BOX = { y: 1504, width: 960, height: 250, cps: CPS }
  const box = (from, to, open, close) => dialogueBox(root, { ...BOX, lines: LINES.slice(from, to), open, close })
  const boxes = [
    box(0, 1, T.l0 - 0.22, T.close0), box(1, 2, T.l1 - 0.22, T.close1), box(2, 3, T.l2 - 0.22, T.close2), box(3, 4, T.l3 - 0.22, T.close3),
    box(4, 6, T.l4 - 0.22, T.close4), box(6, 7, T.l6 - 0.2, T.close5), box(7, 8, T.l7 - 0.22, T.close6), box(8, 9, T.l8 - 0.22, T.close7),
  ]
  const bug = showBug(root, { at: -0.6 })
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.62 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ the picture ═══════════════════════
  const BLK = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  const FOOD = ['#e8a84a', '#8a4a2a', '#ffd95a', '#e8344e', '#ff8fb1', '#efe6d6']
  const LIDS = TRUCK_COL.map(c => c[0])
  const TOP = SY(88)                  // the table top
  const PY = SY(80)                   // the stars' centre line
  const soldAt = i => T.loop2[0] + (i + 0.6) / 6 * (T.loop2[1] - T.loop2[0] - 0.4)
  function libraX(pt, t) {
    if (t >= T.erupt || pt >= T.cut1) return lerp(330, 250, ease.inOutQuad(prog(pt, ...T.walk3)))
    if (pt < T.h2) return 430
    if (pt < T.loop2[1] + 0.05) { const w = camX(T.h2) + toLX(430); return SX(w - camX(pt)) }
    return lerp(-100, 330, ease.outQuad(prog(pt, T.loop2[1] + 0.05, T.cut1 - 0.1)))
  }
  function ariesX(pt, t) {
    if (t >= T.erupt || pt >= T.cut1) return lerp(720, 830, ease.inOutQuad(prog(pt, ...T.walk3)))
    if (pt < T.loop2[0]) return 760
    if (pt < T.loop2[1]) return 540 + 230 * Math.sin((pt - T.loop2[0]) * 4.2)
    return 700
  }
  /** a takeout box: bottom-centre (cx, by), open or closed, lid colour, food colour */
  function drawBox(cx, by, open, lid, food, rot = 0, empty = false) {
    x.save(); x.translate(cx, by); x.rotate(rot)
    if (open) { BLK(-34, -66, 68, 26, INK); BLK(-30, -62, 60, 20, lid) }            // the lid, flipped up behind
    BLK(-36, -42, 72, 44, INK); BLK(-32, -38, 64, 36, '#f4efe4'); BLK(-32, -14, 64, 12, '#ddd5c6')
    if (open && !empty) { BLK(-26, -46, 52, 14, INK); BLK(-22, -44, 44, 10, food); BLK(-14, -48, 10, 4, food); BLK(4, -47, 12, 3, food) }
    if (!open) { BLK(-36, -46, 72, 12, INK); BLK(-32, -44, 64, 8, lid) }
    x.restore()
  }
  /** where box i is at picture time pt / film time t: { x, by, open, rot, vis, empty } */
  function boxState(i, pt, t) {
    const row = { x: 540 + (i - 2.5) * 84, by: TOP }
    if (t >= T.fin) {
      if (i !== 2) { const off = [-215, -140, 0, 140, 215, -215][i]; return { x: 540 + off, by: i === 5 ? TOP - 40 : TOP, open: i !== 0, empty: true, rot: 0, vis: true } }
      let bx = 540
      if (t >= T.slide[0]) bx = t < 37.95 ? lerp(540, 640, ease.inOutQuad(prog(t, T.slide[0], 37.95))) : t < T.slide[1] ? lerp(640, 440, ease.inOutQuad(prog(t, 37.95, T.slide[1]))) : lerp(440, 540, ease.outBack(prog(t, T.slide[1], T.pins)))
      return { x: bx, by: TOP, open: true, rot: 0, vis: true }
    }
    if (t >= T.erupt) return { ...row, open: true, rot: 0, vis: true }
    if (pt < T.loop2[0]) return { vis: false }
    const held = pt < T.bonk
    if (held) {
      if (i >= boxesHeld(pt)) return { vis: false }
      const ax = ariesX(pt, t), sway = Math.sin(pt * 9) * 0.05 * i
      return { x: ax + Math.sin(pt * 6 + i) * 3 * i, by: PY - 80 - i * 40, open: false, rot: sway, vis: true }
    }
    // on the table: a tower that wobbles, the top box goes to Libra (opened, tasted), slides to Aries; then they all spread out
    const k = pt - T.bonk, wob = 0.18 * Math.exp(-k * 3) * Math.sin(k * 16)
    const tower = { x: 560 + Math.sin(wob) * i * 30, by: TOP - i * 40, rot: wob, open: false, vis: true }
    const spread = ease.inOutQuad(prog(pt, 16.5 + i * 0.12, 17.1 + i * 0.12))
    if (i === 5) {
      let p = tower
      if (pt >= T.laugh) p = { ...p, x: lerp(560, 400, ease.inOutQuad(prog(pt, T.laugh, T.laugh + 0.3))), by: lerp(TOP - 200, TOP, ease.outBack(prog(pt, T.laugh, T.laugh + 0.3))), rot: 0, open: pt >= T.laugh + 0.35 }
      if (pt >= T.pass) p = { ...p, x: lerp(400, 680, ease.inOutQuad(prog(pt, T.pass, T.pass + 0.4))) }
      return { ...p, x: lerp(p.x, row.x, spread), by: lerp(p.by, row.by, spread), open: p.open || spread > 0.5 }
    }
    return { x: lerp(tower.x, row.x, spread), by: lerp(tower.by, row.by, spread), rot: tower.rot * (1 - spread), open: spread > 0.6, vis: true }
  }
  function playerState(t, pt, isL) {
    let mood = 'happy', look = [isL ? -1 : 1, -1], squash = 0, hops = [], blink
    if (pt >= T.loop1[0] && pt < T.h2) { if (isL) { mood = 'squint'; look = [Math.sin(pt * 2.2), -1] } else { mood = pt > 6.5 ? 'eyeroll' : 'neutral'; look = pt > 6.5 ? undefined : [-1, 0]; hops = [4.6, 5.0, 5.4, 5.8, 6.2, 7.4, 7.8, 8.2] } }
    if (pt >= T.h2 && pt < T.cut1) { if (isL) { mood = 'neutral'; look = [1, 0] } else { mood = 'happy'; look = [Math.sign(Math.cos((pt - T.loop2[0]) * 4.2)) || 1, -1]; hops = Array.from({ length: 9 }, (_, i) => T.loop2[0] + i * 0.37); if (pt > T.loop2[1]) { mood = 'sparkle'; look = [-1, 0] } } }
    if (pt >= T.cut1 && pt < T.bonk) { mood = isL ? 'neutral' : 'happy'; look = [isL ? 1 : -1, 0] }
    if (pt >= T.bonk && pt < T.laugh) { mood = 'wide'; look = [isL ? 1 : -1, 1] }
    if (pt >= T.laugh && t < T.erupt) { mood = 'happy'; look = pt < T.pass ? [isL ? 1 : -1, 1] : [isL ? 1 : -1, 0]; if (isL && pt > T.laugh + 0.35 && pt < T.pass) { mood = 'sparkle' } }
    if (t >= T.erupt && t < T.deck) { mood = 'heart'; look = [isL ? 1 : -1, 0] }
    if (t >= T.deck) { mood = 'sparkle'; look = [0, 1] }
    if (t >= T.fin) { mood = t > T.pins ? 'heart' : 'happy'; look = t < T.pins ? [Math.sign(boxState(2, pt, t).x - 540) || (isL ? 1 : -1), 1] : [isL ? 1 : -1, 0] }
    hops = [...hops, T.h3 + 0.2]
    if (t >= T.erupt) hops = [...hops, T.erupt + 0.1, T.erupt + 0.6, T.pins + 0.1]
    return { mood, look, squash, hops, blink }
  }
  function lightsLine(t, cam) {
    // string lights across the top, with parallax
    for (let i = -2; i < 30; i++) {
      const wx = i * 14 - cam * 0.6, X = SX(wx), sag = Math.sin(((i % 4) + 0.5) / 4 * Math.PI) * 18, Y = SCR.sy0 + 30 + sag
      if (X < SCR.sx0 - 20 || X > SCR.sx0 + SCR.sw + 20) continue
      const on = 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7)
      x.fillStyle = INK; x.fillRect(X - 7, Y - 2, 14, 14)
      x.fillStyle = i % 3 === 0 ? `rgba(255,214,140,${on})` : i % 3 === 1 ? `rgba(255,160,190,${on})` : `rgba(180,230,255,${on})`; x.fillRect(X - 5, Y, 10, 10)
    }
    x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(SCR.sx0, SCR.sy0 + 34); x.lineTo(SCR.sx0 + SCR.sw, SCR.sy0 + 34); x.stroke()
  }
  function drawTable() {
    BLK(250, TOP - 4, 580, 26, INK); BLK(256, TOP, 568, 18, '#a8743e'); BLK(256, TOP, 568, 4, '#c99556')
    for (const lx of [300, 760]) { BLK(lx - 10, TOP + 22, 20, 80, INK); BLK(lx - 6, TOP + 22, 12, 76, '#8a5a2e') }
    BLK(230, TOP + 62, 620, 20, INK); BLK(236, TOP + 66, 608, 12, '#8a5a2e')
  }

  function picture(t) {
    const pt = picTime(t)
    const cam = camX(pt, t)
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(parkBG, -Math.round(cam), 0)
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    lightsLine(t, cam)
    // menu boards in the hatches: MENU → SOLD OUT as Aries passes (rewatch bait)
    x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (const { wx, i } of TRUCKS) {
      const X = SX(wx + 17 - cam), Y = SY(62)
      if (X < sx0 - 60 || X > sx0 + sw + 60) continue
      const sold = pt >= soldAt(i) || t >= T.erupt || pt >= T.cut1
      x.fillStyle = sold ? RED : INK; x.fillText(sold ? 'SOLD OUT' : 'MENU', X, Y)
    }
    if (t >= T.deck && t < T.fin + 0.3) { const k = prog(t, T.deck, T.deck + 0.3) * (1 - prog(t, T.fin, T.fin + 0.3)); x.fillStyle = `rgba(10,6,26,${0.45 * k})`; x.fillRect(sx0, sy0, sw, sh) }
    const atTable = pt >= T.cut1 || t >= T.erupt
    const lx = libraX(pt, t), ax = ariesX(pt, t)
    const sy = atTable ? PY - 30 * ease.inOutQuad(t >= T.erupt ? 1 : prog(pt, ...T.walk3)) : PY
    const pos = [{ x: lx, y: sy }, { x: ax, y: sy }]
    for (const [isL, P] of [[true, pos[0]], [false, pos[1]]]) {
      const S = isL ? LIB : ARI, st = playerState(t, pt, isL)
      drawStarChar(x, P.x, P.y, STAR_S, pt, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: st.hops, blink: st.blink, seed: isL ? 4 : 9, glow: 0.7 })
    }
    // Aries' speed lines on the sprint
    if (pt >= T.loop2[0] && pt < T.loop2[1] && t < T.rew[0]) { const v = Math.cos((pt - T.loop2[0]) * 4.2); for (let i = 0; i < 4; i++) BLK(ax - Math.sign(v) * (90 + i * 26), PY - 40 + i * 24, 40, 6, '#efe6d6') }
    if (atTable) drawTable()
    for (let i = 0; i < 6; i++) { const b = boxState(i, pt, t); if (b.vis) drawBox(b.x, b.by, b.open, LIDS[i], FOOD[i], b.rot, b.empty) }
    // Libra thinking: HMM…
    if (pt >= T.loop1[0] + 0.3 && pt < T.h2 && t < T.rew[0]) {
      const k = ((pt - T.loop1[0]) % 1.4) / 1.4
      x.save(); x.globalAlpha = Math.sin(Math.PI * k); x.font = `700 34px ${MONO}`; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('HMM…', lx, PY - 110 - k * 20); x.fillStyle = BONE; x.fillText('HMM…', lx, PY - 110 - k * 20); x.restore()
    }
    if (t < T.rew[0]) teleTag(x, pt, T.bonk, 'THUD.', 680, TOP - 300, { size: 44, rot: 0.06, out: [T.bonk + 0.8, T.bonk + 1.0] })
    // MMM while they share (live: tiny)
    if (pt >= T.laugh + 0.35 && t < T.erupt) {
      x.font = `700 28px ${MONO}`; x.textAlign = 'center'
      for (let i = 0; i < 8; i++) { const t0 = T.laugh + 0.4 + i * 0.35, k = pt - t0; if (k < 0 || k > 0.9) continue; x.globalAlpha = Math.sin(Math.PI * k / 0.9); const cx = pos[i % 2].x, cy = PY - 100 - k * 60; x.lineWidth = 7; x.strokeStyle = INK; x.strokeText('MMM', cx, cy); x.fillStyle = i % 2 ? PINK : GOLD; x.fillText('MMM', cx, cy) }
      x.globalAlpha = 1
    }
    // tonight's deck, dealt between the boxes
    if (t >= T.deck && t < T.fin + 0.3) {
      const o = 1 - prog(t, T.fin, T.fin + 0.3)
      ;[-1, 0, 1].forEach((d, i) => {
        const t0 = T.deal + i * 0.2, k = ease.outCubic(prog(t, t0, t0 + 0.3))
        if (k <= 0) return
        x.save(); x.globalAlpha = o
        miniCard(x, lerp(540, 540 + d * 150, k), lerp(SY(LH) + 120, SY(42), k), 116, { rot: d * 0.12 * k + Math.sin(t * 2 + i) * 0.02, k: 1 })
        x.restore()
      })
      teleTag(x, t, T.deal + 0.8, "TONIGHT'S DECK", 540, SY(14), { size: 34, rot: -0.04, out: [T.fin, T.fin + 0.25] })
    }
    // the last bite: shared
    if (t >= T.pins) {
      const k = t - T.pins
      if (k < 1.6) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, dd = 60 + k * 160; x.save(); x.globalAlpha = 1 - prog(k, 1.0, 1.6); drawPixelStar(x, 540 + Math.cos(a) * dd, TOP - 90 + Math.sin(a) * dd * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
      teleTag(x, t, T.pins + 0.15, 'SHARED ♥', 640, SY(26), { size: 46, rot: -0.06 })
    }
    return { pt, pos }
  }
  function scoreBug(t) {
    const kk = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (kk <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 56
    x.save(); x.translate(X, Y); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [[`${LIB.glyph}︎ LIB`, LIB.color, [[5.2, '?'], [7.2, '?'], [T.pass, '♥'], [T.pins + 0.1, '♥']]], [`${ARI.glyph}︎ ARI`, ARI.color, [[soldAt(1), '!'], [soldAt(3), '!'], [soldAt(5), '!'], [T.pins + 0.1, '♥']]]]
    rows.forEach(([name, col, marks], j) => {
      const y = 6 + j * 42
      x.fillStyle = col; x.fillRect(6, y, 6, 34)
      x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(name, 20, y + 18)
      marks.forEach((m, i) => {
        const bx = 138 + i * 42
        x.fillStyle = '#2a3550'; x.fillRect(bx, y + 2, 36, 32)
        if (m && t >= m[0]) {
          const pk = easeOutBack(prog(t, m[0], m[0] + 0.25), 3)
          x.save(); x.translate(bx + 18, y + 18); x.scale(pk, pk)
          x.fillStyle = m[1] === '♥' ? PINK : m[1] === '?' ? GOLD : RED; x.fillRect(-18, -16, 36, 32)
          x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = m[1] === '?' ? INK : '#ffffff'; x.fillText(m[1], 0, 1)
          x.restore()
        }
      })
    })
    x.restore()
  }
  function drawScreen(t) {
    const { sx0, sy0, sw, sh } = SCR
    x.save(); x.beginPath(); x.rect(sx0, sy0, sw, sh); x.clip()
    const { pt, pos } = picture(t)
    const on = prog(t, T.live - 0.2, T.live + 0.1)
    if (on < 1) { const hh = sh * ease.outCubic(on); x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2) }
    const rew = inR(t, ...T.rew), rep = inR(t, T.rew[0], T.erupt)
    if (rep) {
      vhs(x, t, rew)
      replayBug(x, t, rew ? '◀◀ REWIND' : t >= T.slo[1] ? '❚❚ REPLAY' : '▶ REPLAY', !rew && t < T.slo[1])
      const o = [T.erupt - 0.3, T.erupt - 0.05]
      const bx = boxState(5, pt, t)
      teleCircle(x, t, T.c1, pos[0].x, pos[0].y - 4, 70, 66, { seed: 1, out: o })
      teleCircle(x, t, T.c2, bx.x, bx.by - 30, 70, 52, { seed: 2, out: o })
      teleArrow(x, t, T.c2 + 0.35, pos[0].x + 40, TOP - 110, pos[1].x - 40, TOP - 110, { out: o })
      teleTag(x, t, T.c1 + 0.3, 'TASTING', pos[0].x, pos[0].y - 120, { size: 36, out: o })
      teleTag(x, t, T.c2 + 0.3, 'SHARING', bx.x + 30, TOP + 50, { size: 36, rot: 0.06, out: o })
    } else if (t >= T.live && t < T.out[0]) {
      liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
      const pk = pop01(t, T.live + 0.25, 0.3, 2.2)
      if (pk > 0.01 && t < T.h1) { x.save(); x.translate(sx0 + sw - 276, sy0 + 76); x.scale(pk, pk); pill(x, 0, 0, 252, 38, GOLD, 'TRUCK PARK', INK, 22); x.restore() }
    }
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'LIBRA ♥ ARIES · THE SAMPLER', { out: T.h5Out })
    screenFx(x)
    x.restore()
  }

  // ═══════════════════════ the booth ═══════════════════════
  function talkWeight(t, who) {
    let w = 0
    LINES.forEach((L, i) => { if (L.speaker !== who && L.speaker !== BT) return; w = Math.max(w, prog(t, L.t - 0.25, L.t) * (1 - prog(t, LT[i].done + 0.4, LT[i].done + 0.8))) })
    return ease.inOutQuad(w)
  }
  function grooveAt(t) {
    const G = [[T.live, T.plant], [T.erupt, T.lesson - 0.1], [T.deck, T.close7]]
    if (!G.some(([a, b]) => inR(t, a, b))) return { dy: 0, sq: 0 }
    const ph = (((t - 0.6) / BL) % 1 + 1) % 1
    return { dy: -8 * Math.sin(Math.PI * ph) ** 2, sq: 0.04 * Math.exp(-ph * 12) }
  }
  function boothState(t, isG) {
    let mood = 'happy', look = [0, -1], tears = 0, blink
    if (t < T.h1) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.loop1[0] + 0.6) { mood = 'neutral'; look = [isG ? 1 : -1, -1] }
    else if (t < T.h2) { mood = t < T.loop1[1] ? (isG ? 'wide' : 'squint') : 'wide'; look = [Math.sin(t * 2.7), -1] }
    else if (t < T.loop2[1]) { mood = 'squint'; look = [Math.sin(t * 6), -1] }
    else if (t < T.cut1) { mood = 'wide'; look = [0, 0] }
    else if (t < T.bonk) { mood = 'neutral'; look = [0, -1] }
    else if (t < T.plant) { mood = 'wide'; look = [0, -1] }
    else if (t < T.rew[0]) { mood = isG ? 'neutral' : 'eyeroll'; blink = isG ? 1 : undefined; look = isG ? [0, 1] : undefined }
    else if (t < T.c1) { mood = 'squint'; look = [0, -1]; blink = false }
    else if (t < T.erupt) { mood = 'wide'; look = [0, -1] }
    else if (t < T.lesson) { mood = 'heart'; look = [0, 0]; tears = isG ? 0 : 1 }
    else if (t < T.deck) { mood = 'sparkle'; look = [0, -1] }
    else if (t < T.fin) { mood = 'happy'; look = [isG ? 1 : -1, -1] }
    else { mood = t > T.pins ? 'heart' : 'happy'; look = [0, 0] }
    return { mood, look, tears, blink }
  }
  function drawBoothStar(t, isG, k) {
    const D = isG ? GEO.G : GEO.S, st = boothState(t, isG)
    const gv = grooveAt(t)
    let sq = gv.sq, dy = gv.dy, dx = 0
    const pl = ease.outCubic(prog(t, T.plant, T.plant + 0.25)) * (1 - ease.inOutQuad(prog(t, T.rew[0] - 0.1, T.rew[0] + 0.3)))
    if (isG) { dy += 70 * pl; sq += 0.25 * pl + 0.12 * Math.exp(-Math.max(0, t - T.plant - 0.25) * 9) * pl } else { dy += 22 * pl; sq += 0.08 * pl }
    if (inR(t, T.c1, T.c1 + 0.4)) dx += (isG ? 1 : -1) * 10 * Math.sin((t - T.c1) * 40) * Math.exp(-(t - T.c1) * 8)
    if (inR(t, T.erupt, T.erupt + 0.7)) { const p = prog(t, T.erupt, T.erupt + 0.7); dy -= Math.sin(Math.PI * p) * 220; sq -= 0.1 * Math.sin(Math.PI * p) }
    if (inR(t, T.pins, T.pins + 0.6)) { const p = prog(t, T.pins, T.pins + 0.6); dy -= Math.sin(Math.PI * p) * 120 }
    // (T.sway) the booth sways along with the action in segment two
    if (T.sway && inR(t, T.loop2[0], T.loop2[1])) dx += 14 * Math.sin((t - T.loop2[0]) * TAU2 * 2 / (T.loop2[1] - T.loop2[0])) * (isG ? 1 : -1)
    const lean = (isG ? 1 : -1) * 16 * talkWeight(t, isG ? GT : ST)
    const hops = isG ? [...GEM_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS] : [...SAG_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS.map(h => h + 0.12)]
    const opts = { color: isG ? GEM.color : SAG.color, glyph: isG ? GEM.glyph : SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: sq, hops, seed: isG ? 3 : 8, pop: k, bob: 0, glow: 0.9 }
    x.save(); x.translate(D.x + lean + dx, D.y + dy)
    drawStarChar(x, 0, 0, D.s, t, opts)
    const F = starFrame(0, 0, D.s, t, opts)
    inSprite(x, F, () => headsetCells(x, isG ? GC : '#b07cff'))
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    x.restore()
    if (isG && pl > 0.6) { x.save(); x.globalAlpha = pl; x.font = `700 54px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('…', D.x, D.y - 40); x.fillStyle = BONE; x.fillText('…', D.x, D.y - 40); x.restore() }
  }
  function pisState(t) {
    if (t < T.h1) return { mood: 'sparkle', tears: 1, sq: 0 }
    if (t < T.cut1) return { mood: 'sparkle', tears: t > T.loop1[1] ? 2 : 1, sq: 0 }
    if (t < T.plant) return { mood: 'wide', tears: 0, sq: 0 }
    if (t < T.rew[0]) return { mood: 'happy', tears: 3, sq: 0.08 * Math.sin(t * 22) }
    if (t < T.erupt) return { mood: 'wide', tears: 1, sq: 0 }
    if (t < T.lesson) return { mood: 'happy', tears: 3, sq: 0.08 * Math.sin(t * 22) }
    if (t < T.fin) return { mood: 'sparkle', tears: 2, sq: 0 }
    return { mood: t > T.pins ? 'happy' : 'sparkle', tears: t > T.pins ? 3 : 2, sq: 0 }
  }
  function drawPisces(t, k) {
    const st = pisState(t), P = GEO.PIS
    const opts = { color: PIS.color, glyph: null, mood: st.mood, look: [-1, 1], squash: st.sq, seed: 12, pop: k, bob: 0, glow: 0.8 }
    pennant(x, P.x - 50, P.y + 40, t, k)
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    const sk = t - T.plant - 0.2
    if (sk > 0 && sk < 1.5) {
      const p = easeOutBack(prog(sk, 0, 0.25), 3), a = 1 - prog(sk, 1.2, 1.5)
      x.save(); x.globalAlpha = a; x.translate(P.x - 150, P.y - 10 - sk * 16); x.rotate(-0.12); x.scale(p, p)
      x.font = `700 50px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('SOB!', 0, 0); x.fillStyle = '#8fe3ff'; x.fillText('SOB!', 0, 0)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const outP = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        drawLights(x, t, prog(t, -1, -0.4) * outP)
        const monK = pop01(t, T.monIn, 0.42, 1.7) * outP
        const flash = inR(t, T.erupt, T.erupt + 1.6) || inR(t, T.pins, T.pins + 1.2) ? 1 : 0
        const shake = inR(t, T.bonk, T.bonk + 0.4) ? 6 * Math.sin((t - T.bonk) * 60) * Math.exp(-(t - T.bonk) * 8) : 0
        if (monK > 0.01) {
          const cy = GEO.MON.y0 + GEO.MON.h / 2
          x.save(); x.translate(540 + shake, cy); x.scale(monK, monK); x.translate(-540, -cy)
          drawJumbo(x, t, { plate: 'STAR CAM', flash })
          drawScreen(t)
          x.restore()
        }
        const pk = pop01(t, T.pisIn, 0.38, 2.2) * outP
        if (pk > 0.02) drawPisces(t, pk)
        const micK = pop01(t, T.micIn, 0.34, 2) * outP
        const ang = -0.38 * talkWeight(t, GT) + 0.38 * talkWeight(t, ST)
        if (micK > 0.02) drawMic(x, GEO.MIC.x, GEO.MIC.y - (1 - micK) * 40, ang, micK)
        const gk = pop01(t, T.gemIn, 0.36, 2.2) * outP, sk = pop01(t, T.sagIn, 0.36, 2.2) * outP
        if (gk > 0.02) drawBoothStar(t, true, gk)
        if (sk > 0.02) drawBoothStar(t, false, sk)
        const dk = pop01(t, T.deskIn, 0.36, 1.8) * outP
        const D = GEO.DESK
        if (dk > 0.02) { x.save(); x.translate(540, D.y + D.h); x.scale(dk, dk); x.translate(-540, -(D.y + D.h)); drawDeskFront(x, D.x0, D.x1, D.y, D.h, t); x.restore() }
        confetti(x, t, T.erupt, { x0: 540, y0: 1330, n: 90, seed: 3, life: 2.7 })
        confetti(x, t, T.pins, { x0: 540, y0: 1330, n: 50, seed: 6, life: 2.6 })
      }
      for (const b of boxes) b.update(t)
      bug.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of H) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// the one card cut (cardfx.js plays a single cut, the middle candidate): 13.5, into the table. The end card has none.

export const CUTS = [T.cut1]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1046.5, 0.05, 0], ['pluck', land, 1046.5, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const churn = (t0, len, rate = 0.11, g = 0.022) => Array.from({ length: Math.floor(len / rate) }, (_, i) => ['tick', +(t0 + i * rate).toFixed(3), g * (i % 2 ? 0.7 : 1)])
const splash = (t0, g = 0.03) => [['chip', t0, 2400, 0.3, { wave: 'noise', slide: -6, gain: g, decay: 0.28, sustain: 0.5, ...FXO }]]
const quack = t0 => [0, 0.2].map(d => ['chip', +(t0 + d).toFixed(3), 620, 0.13, { duty: 0.25, slide: -9, vib: 0.06, gain: 0.032, decay: 0.11, sustain: 0.6, ...FXO }])
const womp = t0 => [['chip', t0, 392, 0.28, { wave: 'tri', slide: -8, gain: 0.03, decay: 0.25, sustain: 0.7, ...FXO }], ['chip', t0 + 0.3, 330, 0.6, { wave: 'tri', slide: -14, gain: 0.03, decay: 0.55, sustain: 0.7, ...FXO }]]
const swirl = (t0, len) => [['chip', t0, 500, len, { wave: 'tri', slide: 2, vib: 0.08, gain: 0.014, decay: len, sustain: 0.8, ...FXO }]]
const scratch = t0 => [['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FXO }], ['chip', t0 + 0.09, 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FXO }]]
const sob = t0 => [0, 0.22, 0.44].map((d, i) => ['chip', +(t0 + d).toFixed(3), 880 - i * 60, 0.18, { duty: 0.25, slide: -6, vib: 0.05, gain: 0.016, decay: 0.15, sustain: 0.6, pan: 0.5, rev: 0.2, dly: 0, bus: 'fx' }])
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.11 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const pt = (t, a) => +(t + a).toFixed(3)
const steps = (t0, t1, gap, g = 0.02) => { const out = []; for (let t = t0, i = 0; t < t1; t += gap, i++) out.push(['tick', +t.toFixed(3), g * (i % 2 ? 0.7 : 1)]); return out }
const ding = (t0, i) => [['pop', +t0.toFixed(3), NOTE[(i * 2) % 7], 0.03, -0.4 + (i % 3) * 0.4], ['bell', +(t0 + 0.02).toFixed(3), 1568, 0.012, 0.4, 0]]
const ALL_CUES = [
  // 0 · welcome (everything is already on screen at frame 0: one hit on the first frame)
  ['pop', 0.02, 1046.5, 0.05, 0], ['pluck', 0.02, 1046.5, 0.04, 0.6, 0], ['tick', 0.03, 0.05], ['bell', 0.06, 1568, 0.022, 0.8, 0], ['pop', 0.1, 988, 0.025, 0.4],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · Libra decides: HMM…
  ...wordPops(T.h1, 2, 0.12, 1), ...[0, 1, 2].map(i => ['chip', +(T.loop1[0] + 0.4 + i * 1.4).toFixed(3), 330 + i * 30, 0.4, { wave: 'tri', vib: 0.03, gain: 0.016, decay: 0.35, sustain: 0.6, ...FXO }]),
  ...steps(4.6, 6.4, 0.4, 0.014), ...steps(7.4, 8.4, 0.4, 0.014),
  ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · Aries decides: the sprint, a ding at every truck
  ...wordPops(T.h2, 2, 0.12, 3), ['whoosh', T.loop2[0], 0.4, 0.025], ...steps(T.loop2[0], T.loop2[1], 0.1, 0.02),
  ...[0, 1, 2, 3, 4, 5].flatMap(i => ding(T.loop2[0] + (i + 0.6) / 6 * (T.loop2[1] - T.loop2[0] - 0.4), i)),
  ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · the table
  ...wordPops(T.h3, 1, 0.08, 2), ['pop', T.h3Land, 1046.5, 0.05, 0], ['pluck', T.h3Land, 1046.5, 0.04, 0.6, 0],
  ['boom', T.bonk, 0.2], ['pop', T.bonk, 130, 0.08, 0], ['tick', T.bonk + 0.02, 0.06], ...[0.15, 0.3, 0.45].map(d => ['tick', +(T.bonk + d).toFixed(3), 0.03]),
  ['pop', T.laugh + 0.35, 880, 0.03, -0.3], ['whoosh', T.pass, 0.3, 0.018],
  ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06],
  ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ...[T.c1, T.c2].flatMap((c, i) => [['chip', c, 2600, 0.32, { wave: 'noise', slide: 4, gain: 0.014, decay: 0.3, sustain: 0.6, ...FXO }], ['pop', c + 0.32, NOTE[(i * 2 + 3) % 7], 0.035, i ? 0.3 : -0.3]]),
  ['whoosh', T.c2 + 0.35, 0.3, 0.02], ['tick', T.slo[1], 0.05],
  ['tick', T.stat4[0], 0.04], ['pop', T.stat4[0] + 0.05, 1318.5, 0.025, 0],
  // 5 · play of the night
  ['swell', T.erupt - 0.7, T.erupt, { gain: 0.05, f0: 600, f1: 4000 }], ['boom', T.erupt + 0.27, 0.22], ['glitter', T.erupt, T.erupt + 0.8],
  ['brass', T.erupt + 0.27, [523.25, 659.25, 783.99], 0.6, { gain: 0.05, bright: 1.4, rev: 0.2, bus: 'fx' }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.erupt + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ...claps(T.erupt + 0.1, T.erupt + 2.4, 11),
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · tonight's deck
  ...wordPops(T.h6, 2, 0.12, 2), ...[0, 1, 2].flatMap(i => [['tick', pt(T.deal, i * 0.2 + 0.25), 0.05], ['pop', pt(T.deal, i * 0.2 + 0.28), NOTE[(i * 2) % 7], 0.03, -0.3 + i * 0.3]]),
  ['bell', T.deal + 0.8, 1318.5, 0.03, 1.2, 0], ['tick', T.stat6[0], 0.04], ['pop', T.stat6[0] + 0.05, 1318.5, 0.025, 0],
  // 8 · final bite: slid back and forth
  ...head(T.h7, 1, T.h7Land, 0), ['whoosh', T.slide[0], 0.3, 0.016], ['whoosh', 37.95, 0.3, 0.016], ['tick', T.pins, 0.04],
  ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1568, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.4, 23),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = ALL_CUES.filter(c => c[1] >= 0)
