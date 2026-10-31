// sxrecapcook — DATE NIGHT RECAP: "The Cooking Date." (45 s vertical Align ad, Star Talk Shows #12, music: house in A minor).
// The same sportscast booth as sxrecapbowl: ♊ GEMINI + ♐ SAG in headsets at the DATE NIGHT RECAP desk, calling a date on
// the STAR CAM jumbotron. ♉ TAURUS and ♏ SCORPIO cook dinner together. ♓ Pisces sits on the jumbotron with a pennant, crying.
//   0.00–3.85   "Date night: | *cooking.*"  GEMINI: "Welcome to DATE NIGHT RECAP!"  The STAR CAM goes LIVE in a pixel kitchen.
//   3.95–8.55   "First *quarter.*"  The pasta pot foams up and boils over the stove. SAG: "Boil-over. Early."  STAT: POT: OVERWHELMED.
//   8.7–13.4    "Second *quarter.*"  Scorpio stirs; a glob of sauce launches and SPLATS on the ceiling (it stays up there the
//               rest of the film), then drips on Scorpio. GEMINI: "Sauce is… on the ceiling."  STAT: SAUCE: AIRBORNE.
//  13.5        card cut.
//  13.6–19.4   "Third quarter: | *crunch.*"  Taurus lifts the colander: the noodles are burned to a crisp (CRUNCH) and crumble.
//               The booth gives up: Gemini face-plants, Sag rolls its eyes. SAG: "That's a fumble. Call it."  STAT: NOODLES:
//               CRUNCHY.  Pisces: SOB!  (On the jumbotron, Taurus holds up a phone: "order in?" "YES." Then they dance. Nobody
//               in the booth notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  REWIND, SLO-MO: the telestrator circles the phone (ORDERING IN) and then the two
//               of them dancing (DANCING). GEMINI: "Wait. Is that a phone?"  SAG: "Ordered in. Now dancing."
//  25.04–27.8  "Kitchen | *dance party.*"  PLAY OF THE NIGHT slams on, bulbs flash, confetti. GEMINI: "THAT'S A COMEBACK!"
//  27.9        card cut.
//  28.38–32.55 ★ LESSON UNLOCKED: "Plans flop. | *Chemistry* doesn't | need a recipe."  +1 CHEF'S KISS
//  32.65–36.5  "Talk *cards.*"  Over takeout: a talk card, "WORST DISH YOU'VE MADE?"; both answers flip together: "THIS ONE." ✓ ✓
//               SAG: "Answers stay hidden till you both play."
//  36.6–40.5   "Final *score.*"  They dance; hearts on the scorebug. THE BOOTH: "Final score: two happy stars."
// One canvas (sky + jumbotron + booth), a low-res kitchen canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
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
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), TAU = signStar('taurus'), SCO = signStar('scorpio')
export const KEY = 'Am'
const { LW, LH, SCR } = GEO

// ── the timeline (the booth keys match sxrecapbowl's so the booth code is shared: rel1 = the boil, pit1 = the boil-over,
//    stop2 = the splat, bonk = the crunch, pins = the final hearts)
const T = {
  black: [0, 0.25],
  monIn: 0.05, deskIn: 0.12, gemIn: 0.2, sagIn: 0.28, micIn: 0.34, pisIn: 0.45, live: 0.5,
  h0: 0.12, h0Land: 0.45, h0Out: [3.65, 3.85], l0: 0.95, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], rel1: BEAT(7), pit1: 5.7, l1: 6.0, close1: 8.5, stat1: [6.35, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], stir: 8.9, launch: 9.95, stop2: 10.35, drip: 11.7, plop: 12.1, l2: 10.45, close2: 13.3, stat2: [10.7, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], lift: 13.9, bonk: 14.55, crumble: 14.9, phone: 15.5, ask: 15.65, yes: 16.15, dance: 16.6,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.4, close4: 24.85,
  c1: 21.0, c2: 22.55, stat4: [23.6, 24.95],
  erupt: BEAT(44), h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,                    // 25.04
  cut2: 27.9,
  lesson: BEAT(50), lessonOut: [32.45, 32.6],                                         // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], deal: 32.95, l7: 33.0, flip: 35.0, close6: 36.45,
  fin: 36.6, h7: 36.6, h7Land: 36.95, pins: 37.55, l8: 36.75, close7: 40.0, out: [40.05, 40.5],
}
const SLO = [15.3, 17.3]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}
const ptOf = p => T.slo[0] + (p - SLO[0]) / (SLO[1] - SLO[0]) * (T.slo[1] - T.slo[0])   // picture time → film time in the replay

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Welcome to DATE NIGHT *RECAP!*' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'Boil-over. *Early.*' },
  { t: T.l2, speaker: GT, color: GC, text: 'The sauce is… on the *ceiling.*' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'That’s a *fumble.* Call it.' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Is that *a phone?*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'Ordered in. Now *dancing.*' },
  { t: T.l6, speaker: GT, color: GC, text: 'THAT’S A *COMEBACK!*' },
  { t: T.l7, speaker: ST, color: SCOL, text: 'Answers stay hidden till *you both play.*' },
  { t: T.l8, speaker: BT, color: PINK, text: 'Final score: *two* happy stars.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Plans flop. | *Chemistry* doesn’t | need a recipe.', chip: '+1 CHEF’S KISS' }

const STATS = [[...T.stat1, 'POT: OVERWHELMED'], [...T.stat2, 'SAUCE: AIRBORNE'], [...T.stat3, 'NOODLES: CRUNCHY'], [...T.stat4, 'DINNER: DELIVERED'], [36.7, 39.95, 'KITCHEN: STILL STICKY']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const smooth = x => ease.inOutQuad(clamp(x))

// the kitchen (low-res): the stove in the middle, the pot (left burner) and the pan (right burner)
const POT = { x: 72, y: 60 }, PAN = { x: 98, y: 60 }, SPLAT = { x: 100, y: 3 }, COL = { x: 84, y: 61 }
const TAUP = { x: SX(26), y: SY(82), s: 156 }, SCOP = { x: SX(134), y: SY(82), s: 156 }
const dancing = (t, pt) => (pt >= T.dance && t < T.deck) || t >= T.fin

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 27px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }

  // ── bake the static kitchen once
  const bg = document.createElement('canvas'); bg.width = LW; bg.height = LH
  {
    const b = bg.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    P(0, 0, LW, 9, '#3a2a4a'); P(0, 8, LW, 1, '#2a1d38')                                   // ceiling
    for (let j = 9; j < 62; j += 6) for (let i = 0; i < LW; i += 6) P(i, j, 6, 6, ((i + j) / 6) % 2 ? '#8cc8b4' : '#9fd8c4')
    for (let j = 9; j < 62; j += 6) P(0, j, LW, 1, '#7ab3a0')
    // window + moon
    P(8, 14, 34, 28, INK); P(10, 16, 30, 24, '#1b1846'); P(24, 16, 2, 24, INK); P(10, 27, 30, 2, INK); P(32, 19, 4, 4, '#fff1b8'); P(33, 20, 3, 3, '#ffe08a')
    for (const [sx, sy] of [[14, 20], [18, 34], [36, 33]]) P(sx, sy, 1, 1, '#ffffff')
    // shelf with jars (generic)
    P(118, 22, 40, 2, '#7d5438'); for (let k = 0; k < 5; k++) { const c = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ffffff'][k]; P(121 + k * 7, 15, 5, 7, INK); P(122 + k * 7, 16, 3, 5, c) }
    // range hood
    P(62, 9, 44, 4, '#5d6288'); P(66, 13, 36, 10, '#7d83ad'); P(66, 22, 36, 2, '#5d6288'); P(70, 15, 28, 1, '#9aa0c8')
    // counter + cabinets
    P(0, 62, LW, 5, '#c98a56'); P(0, 62, LW, 1, '#e8b17a'); P(0, 67, LW, 1, '#7a4a28')
    P(0, 68, LW, 44, '#5a347a')
    for (let i = 4; i < LW; i += 28) { P(i, 72, 24, 36, '#6a3f8a'); P(i + 10, 76, 4, 1, GOLD) }
    // stove
    P(60, 60, 50, 3, '#1a1626'); for (const bx of [POT.x, PAN.x]) { P(bx - 6, 60, 12, 1, '#ff5a3c') }
    P(62, 68, 46, 40, '#2c2f4c'); P(66, 74, 38, 24, '#14121f'); P(68, 76, 34, 2, '#3a3e60'); for (let k = 0; k < 4; k++) P(68 + k * 9, 70, 3, 2, '#9aa0c8')
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *cooking.*', { top: 118, size: 100, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'First *quarter.*', { top: 168, size: 108, accentSize: 160, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Second *quarter.*', { top: 168, size: 100, accentSize: 150, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Third quarter: | *crunch.*', { top: 118, size: 100, accentSize: 156, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 1.0 }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Kitchen | *dance party.*', { top: 118, size: 104, accentSize: 150, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Talk *cards.*', { top: 168, size: 112, accentSize: 164, at: T.h6, gap: 0.12, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Final *score.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
  ]
  const BOX = { y: 1504, width: 960, height: 250, cps: CPS }
  const box = (from, to, open, close) => dialogueBox(root, { ...BOX, lines: LINES.slice(from, to), open, close })
  const boxes = [
    box(0, 1, T.l0 - 0.22, T.close0), box(1, 2, T.l1 - 0.22, T.close1), box(2, 3, T.l2 - 0.22, T.close2), box(3, 4, T.l3 - 0.22, T.close3),
    box(4, 6, T.l4 - 0.22, T.close4), box(6, 7, T.l6 - 0.2, T.close5), box(7, 8, T.l7 - 0.22, T.close6), box(8, 9, T.l8 - 0.22, T.close7),
  ]
  const bug = showBug(root)
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.62 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ the picture ═══════════════════════
  function pot(pt) {
    const { x: px, y: py } = POT
    R(px - 8, py - 12, 17, 13, INK); R(px - 7, py - 11, 15, 11, '#b9bfd8'); R(px - 7, py - 11, 15, 2, '#e0e4f4'); R(px - 7, py - 4, 15, 3, '#8a90b0')
    R(px - 10, py - 9, 3, 2, INK); R(px + 8, py - 9, 3, 2, INK)
    // the boil: bubbles → foam rising over the rim → spilling down the sides
    const rise = smooth(prog(pt, T.rel1, T.pit1)), spill = smooth(prog(pt, T.pit1 - 0.2, T.pit1 + 0.6))
    const calm = t => pt >= T.h2 ? 0.35 : 1
    if (pt >= T.rel1 - 0.6) {
      const fh = Math.round(1 + rise * 9 * calm())
      for (let i = -7; i <= 7; i++) { const h = fh + Math.round(Math.abs(Math.sin(i * 1.7 + pt * 9)) * 2); R(px + i, py - 11 - h, 1, h, (i + Math.floor(pt * 8)) % 3 ? '#fffdf4' : '#f0ead8') }
      if (spill > 0) for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const len = Math.round(spill * (10 + k * 2)); R(px + s * (8 + k), py - 11 + k, 1, len, '#fffdf4') }
      if (spill > 0.6) R(px - 12, py, 25, 2, '#f4eedc')
    }
    // steam
    for (let k = 0; k < 3; k++) { const ph = (pt * 0.8 + k / 3) % 1; R(px - 3 + k * 3 + Math.round(Math.sin(ph * 6 + k) * 2), py - 18 - ph * 14, 2, 2, `rgba(255,255,255,${0.5 * Math.sin(Math.PI * ph)})`) }
  }
  function pan(pt) {
    const { x: px, y: py } = PAN
    R(px - 7, py - 4, 15, 5, INK); R(px - 6, py - 3, 13, 3, '#4a4f72'); R(px - 5, py - 3, 11, 2, '#d8343e'); R(px + 8, py - 3, 10, 2, INK)
    // the spoon, stirring (faster and faster, then the launch)
    if (pt >= T.stir && pt < T.cut1) {
      const sp = pt < T.launch ? lerp(6, 22, prog(pt, T.stir, T.launch)) : 4
      const a = Math.sin(pt * sp) * 3
      R(px + Math.round(a) - 1, py - 12, 2, 10, '#c98a56'); R(px + Math.round(a) - 2, py - 4, 4, 2, '#c98a56')
    }
  }
  function sauceFlight(pt) {
    // the glob flies from the pan to the ceiling, then the splat stays; a drip falls on Scorpio
    if (pt >= T.launch && pt < T.stop2) {
      const k = prog(pt, T.launch, T.stop2)
      const gx2 = lerp(PAN.x, SPLAT.x, k), gy2 = lerp(PAN.y - 5, SPLAT.y + 3, ease.outQuad(k))
      R(gx2 - 2, gy2 - 2, 5, 5, INK); R(gx2 - 1, gy2 - 1, 3, 3, '#e8344e')
    }
    if (pt >= T.stop2) {
      const k = easeOutBack(prog(pt, T.stop2, T.stop2 + 0.2), 2)
      const blob = [[-6, 0, 13, 4], [-4, 4, 9, 2], [-8, 1, 3, 2], [6, 1, 3, 2], [-2, 6, 2, 2], [3, 5, 2, 3]]
      for (const [dx, dy, w, h] of blob) R(SPLAT.x + dx * k, SPLAT.y + dy * k, Math.max(1, Math.round(w * k)), Math.max(1, Math.round(h * k)), '#c8243a')
      R(SPLAT.x - 4, SPLAT.y + 1, 3, 1, '#ff6a6a')
    }
    if (pt >= T.drip && pt < T.plop) { const k = ease.inQuad(prog(pt, T.drip, T.plop)); R(SPLAT.x - 2, lerp(SPLAT.y + 7, PAN.y - 4, k), 2, 3, '#c8243a') }
  }
  function colander(pt) {
    if (pt < T.lift - 0.2 || pt >= T.erupt) return
    const up = pt < T.erupt ? smooth(prog(pt, T.lift, T.lift + 0.4)) : 0
    const cx = COL.x, cy = COL.y - Math.round(up * 6)
    // the noodles, burned black, then crumbling
    const cr = prog(pt, T.crumble, T.crumble + 0.6)
    if (cr < 1) for (let i = 0; i < 9; i++) { const nx = cx - 6 + i * 1.5, ny = cy - 7 - (i % 3) - Math.round(cr * 0) ; R(nx, ny + Math.round(Math.sin(i * 2) * 1), 1, 3, i % 2 ? '#1a1012' : '#2c1a14') }
    if (cr > 0) for (let i = 0; i < 10; i++) { const d = cr * (6 + (i % 4) * 3); R(cx - 6 + i * 1.3 + (i % 2 ? d * 0.4 : -d * 0.4), cy - 5 + d, 1, 1, '#1a1012') }
    R(cx - 8, cy - 5, 17, 6, INK); R(cx - 7, cy - 5, 15, 5, '#e8b14a'); for (let i = -6; i <= 6; i += 3) R(cx + i, cy - 3, 1, 1, '#7a5a20')
    R(cx - 11, cy - 4, 3, 2, INK); R(cx + 9, cy - 4, 3, 2, INK)
    // a little smoke puff over the crunch
    const sk = pt - T.bonk
    if (sk > 0 && sk < 1.6) for (let k = 0; k < 4; k++) { const ph = clamp(sk / 1.6 + k * 0.08); R(cx - 4 + k * 3, cy - 10 - ph * 16 - k * 2, 3, 3, `rgba(80,76,96,${0.75 * (1 - ph)})`) }
  }
  function takeout(t) {
    const k = pop01(t, T.erupt + 0.1, 0.3, 2.4)
    if (k <= 0 || t >= T.deck) return
    for (const [bx, d] of [[52, 0], [116, 1]]) {
      const by = 61 - Math.round(k * 1)
      R(bx - 5, by - 9, 11, 10, INK); R(bx - 4, by - 8, 9, 8, '#fbf6ec'); R(bx - 4, by - 5, 9, 2, '#e8344e'); R(bx - 2, by - 11, 5, 2, INK); R(bx - 1, by - 10, 3, 1, '#c9a061')
    }
  }
  function starState(t, pt, isT) {
    let mood = 'happy', look = [isT ? 1 : -1, 0], squash = 0, dx = 0, hops = []
    if (pt >= T.h1 && pt < T.h2) { mood = pt < T.rel1 + 0.3 ? 'happy' : pt < T.pit1 ? 'squint' : 'wide'; look = isT ? [1, 0] : [-1, 0] }
    if (pt >= T.h2 && pt < T.cut1) {
      if (isT) { mood = pt < T.stop2 ? 'neutral' : 'wide'; look = pt < T.stop2 ? [1, 0] : [1, -1] }
      else { mood = pt < T.launch ? 'squint' : pt < T.plop ? 'wide' : 'squint'; look = pt < T.launch ? [-1, 1] : [0, -1]; if (pt >= T.plop) squash = 0.2 * Math.exp(-(pt - T.plop) * 6) }
    }
    if (pt >= T.h3) {
      if (pt < T.bonk) { mood = 'neutral'; look = [isT ? 1 : -1, 0] }
      else if (pt < T.phone) { mood = 'wide'; look = [isT ? 1 : -1, 0]; squash = 0.15 * Math.exp(-(pt - T.bonk) * 6) }
      else if (pt < T.yes) { mood = isT ? 'happy' : 'neutral'; look = [isT ? 1 : -1, 0] }
      else if (pt < T.dance) { mood = 'sparkle'; look = [isT ? 1 : -1, 0] }
    }
    if (dancing(t, pt)) {
      mood = t >= T.erupt && t < T.deck ? 'heart' : 'happy'; look = [isT ? 1 : -1, 0]
      const fz = inR(t, T.slo[1], T.erupt)
      const ph = fz ? 0.3 : pt
      dx = Math.sin(ph * 5.6 + (isT ? 0 : Math.PI)) * 22
      squash = -0.08 * Math.abs(Math.sin(ph * 5.6))
    }
    if (t >= T.deck && t < T.fin) { mood = 'sparkle'; look = [isT ? 1 : -1, -1]; if (t >= T.flip + 0.3) mood = 'heart' }
    return { mood, look, squash, dx, hops }
  }
  function drawStars(t, pt) {
    for (const isT of [true, false]) {
      const P = isT ? TAUP : SCOP, S = isT ? TAU : SCO, st = starState(t, pt, isT)
      let px = P.x + st.dx
      if (dancing(t, pt)) px = lerp(P.x, isT ? SX(58) : SX(110), smooth(prog(pt >= T.dance && t < T.deck ? pt : t, pt >= T.dance && t < T.deck ? T.dance : T.fin, (pt >= T.dance && t < T.deck ? T.dance : T.fin) + 0.5))) + st.dx
      drawStarChar(x, px, P.y, P.s, pt, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: st.hops, seed: isT ? 4 : 9, glow: 0.7 })
    }
    // the phone (Taurus) + the bubbles
    if (pt >= T.phone && pt < T.dance + 0.3 && t < T.deck) {
      const k = pop01(pt, T.phone, 0.25, 2.4) * (1 - prog(pt, T.dance, T.dance + 0.3))
      x.save(); x.translate(TAUP.x + 80, TAUP.y - 40); x.rotate(-0.15); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-22, -38, 44, 76); x.fillStyle = '#7fe0ff'; x.fillRect(-16, -30, 32, 56); x.fillStyle = '#ffffff'; x.fillRect(-12, -22, 24, 4); x.fillRect(-12, -14, 16, 4)
      x.restore()
    }
    bubble(['order in?'], TAUP.x + 120, TAUP.y - 160, TAUP.x + 70, TAUP.y - 80, bubK(pt, T.ask, T.dance + 0.2))
    bubble(['YES.'], SCOP.x - 70, SCOP.y - 165, SCOP.x - 20, SCOP.y - 90, bubK(pt, T.yes, T.dance + 0.3))
    // music notes while they dance
    if (dancing(t, pt) && t < T.deck) {
      for (let i = 0; i < 6; i++) { const ph = (pt * 0.6 + i / 6) % 1, nx = 540 + (i - 2.5) * 110 + Math.sin(ph * 6 + i) * 20, ny = SY(70) - ph * 200; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 9; x.strokeStyle = INK; x.strokeText('♪', nx, ny); x.fillStyle = i % 2 ? PINK : GOLD; x.fillText('♪', nx, ny); x.restore() }
    }
  }
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function bubble(lines, bx, by, tx, ty, k, { fs = 34 } = {}) {
    if (k <= 0.01) return
    x.save(); x.font = `700 ${fs}px ${MONO}`
    const w = Math.max(...lines.map(s => x.measureText(s).width)) + 44, h = lines.length * fs * 1.2 + 28
    x.translate(bx, by); x.scale(k, k)
    const ax = clamp(tx - bx, -w / 2 + 40, w / 2 - 40), dir = ty > by ? 1 : -1, ey = dir * h / 2
    x.fillStyle = INK; rr(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 18); x.fill()
    x.beginPath(); x.moveTo(ax - 16, ey); x.lineTo((tx - bx) * 0.55 + ax * 0.45, ey + dir * 40); x.lineTo(ax + 14, ey); x.fill()
    x.fillStyle = '#fbf6ec'; rr(-w / 2, -h / 2, w, h, 14); x.fill()
    x.beginPath(); x.moveTo(ax - 10, ey - dir * 2); x.lineTo((tx - bx) * 0.5 + ax * 0.5, ey + dir * 28); x.lineTo(ax + 8, ey - dir * 2); x.fill()
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    lines.forEach((s, i) => x.fillText(s, 0, (i - (lines.length - 1) / 2) * fs * 1.2 + 2))
    x.restore()
  }
  const bubK = (t, a, b) => pop01(t, a, 0.3, 2.2) * (1 - ease.inQuad(prog(t, b - 0.18, b)))
  function talkCards(t) {
    const o = 1 - prog(t, T.fin, T.fin + 0.3)
    if (o <= 0) return
    x.save(); x.globalAlpha = o
    // the question card
    const qk = pop01(t, T.deal, 0.32, 2)
    if (qk > 0) {
      x.save(); x.translate(540, SY(26)); x.scale(qk, qk)
      x.fillStyle = INK; x.fillRect(-300, -62, 600, 124); x.fillStyle = '#fbf6ec'; x.fillRect(-292, -54, 584, 108); x.fillStyle = LAV; x.fillRect(-292, -54, 584, 8)
      x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#7a5ac0'; x.fillText('T A L K   C A R D', 0, -26)
      x.font = `700 32px ${MONO}`; x.fillStyle = INK; x.fillText("WORST DISH YOU'VE MADE?", 0, 14)
      x.restore()
    }
    // the two answers: face-down, then they flip together
    ;[-1, 1].forEach((d, i) => {
      const t0 = T.deal + 0.4 + i * 0.2, k = ease.outCubic(prog(t, t0, t0 + 0.3))
      if (k <= 0) return
      const f = prog(t, T.flip, T.flip + 0.25), sx = Math.cos(f * Math.PI)
      const cxp = lerp(540 + d * 400, 540 + d * 150, k), cyp = SY(64)
      if (sx > 0) miniCard(x, cxp, cyp, 150, { rot: d * 0.06, sx })
      else {
        miniCard(x, cxp, cyp, 150, { rot: d * 0.06, sx: -sx, face: ['THIS', 'ONE.'] })
        const ck = easeOutBack(prog(t, T.flip + 0.35 + i * 0.12, T.flip + 0.6 + i * 0.12), 2.6)
        if (ck > 0) { x.save(); x.translate(cxp + 45, cyp + 80); x.scale(ck, ck); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 32, 0, Math.PI * 2); x.fill(); x.fillStyle = MINT; x.beginPath(); x.arc(0, 0, 27, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(-12, 1); x.lineTo(-3, 10); x.lineTo(13, -9); x.stroke(); x.restore() }
      }
    })
    x.restore()
  }

  function picture(t) {
    const pt = picTime(t)
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(bg, 0, 0)
    pot(pt); pan(pt); colander(pt); sauceFlight(pt); takeout(t)
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    // SPLAT on the ceiling
    teleTag(x, pt, T.stop2, 'SPLAT!', SX(SPLAT.x) + 40, SY(SPLAT.y) + 75, { size: 44, rot: 0.08, out: [T.stop2 + 1.0, T.stop2 + 1.3] })
    teleTag(x, pt, T.plop, 'PLOP.', SX(PAN.x) + 60, SY(PAN.y) - 70, { size: 32, rot: -0.1, out: [T.plop + 0.8, T.plop + 1.0] })
    teleTag(x, pt, T.bonk, 'CRUNCH!', SX(COL.x), SY(COL.y) - 110, { size: 46, rot: -0.08, out: [T.bonk + 0.9, T.bonk + 1.1] })
    if (t >= T.deck && t < T.fin + 0.3) { const k = prog(t, T.deck, T.deck + 0.3) * (1 - prog(t, T.fin, T.fin + 0.3)); x.fillStyle = `rgba(10,6,26,${0.6 * k})`; x.fillRect(sx0, sy0, sw, sh) }
    drawStars(t, pt)
    if (t >= T.deck) talkCards(t)
    if (t >= T.pins) {
      const k = t - T.pins
      if (k < 1.6) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, d = 60 + k * 160; x.save(); x.globalAlpha = 1 - prog(k, 1.0, 1.6); drawPixelStar(x, 540 + Math.cos(a) * d, SY(60) + Math.sin(a) * d * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
    }
    return pt
  }
  function scoreBug(t) {
    const k = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (k <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 20
    x.save(); x.translate(X, Y); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [[`${TAU.glyph}︎ TAU`, '#5fd08a', [[T.pit1 + 0.3, 'X'], null, [T.bonk + 0.2, 'X'], [T.pins + 0.1, '♥']]], [`${SCO.glyph}︎ SCO`, '#d0506a', [null, [T.stop2 + 0.3, 'X'], [T.bonk + 0.2, 'X'], [T.pins + 0.1, '♥']]]]
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
          x.fillStyle = m[1] === '♥' ? PINK : RED; x.fillRect(-18, -16, 36, 32)
          x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ffffff'; x.fillText(m[1], 0, 1)
          x.restore()
        }
      })
    })
    x.restore()
  }
  function drawScreen(t) {
    const { sx0, sy0, sw, sh } = SCR
    x.save(); x.beginPath(); x.rect(sx0, sy0, sw, sh); x.clip()
    picture(t)
    const on = prog(t, T.live - 0.2, T.live + 0.1)
    if (on < 1) { const hh = sh * ease.outCubic(on); x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2) }
    const rew = inR(t, ...T.rew), rep = inR(t, T.rew[0], T.erupt)
    if (rep) {
      vhs(x, t, rew)
      replayBug(x, t, rew ? '◀◀ REWIND' : t >= T.slo[1] ? '❚❚ REPLAY' : '▶ REPLAY', !rew && t < T.slo[1])
      const o = [T.erupt - 0.3, T.erupt - 0.05]
      teleCircle(x, t, T.c1, TAUP.x + 80, TAUP.y - 40, 70, 80, { seed: 1, out: o })
      teleTag(x, t, T.c1 + 0.3, 'ORDERING IN', TAUP.x + 120, TAUP.y + 80, { size: 30, out: o })
      teleCircle(x, t, T.c2, 540, TAUP.y - 10, 300, 120, { seed: 2, out: o })
      teleTag(x, t, T.c2 + 0.35, 'DANCING!', 540, TAUP.y - 160, { size: 42, rot: 0.06, out: o })
    } else if (t >= T.live && t < T.out[0]) liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'TAURUS ♥ SCORPIO · KITCHEN', { out: T.h5Out })
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
    const G = [[T.live, T.plant], [T.erupt, T.cut2 - 0.1], [T.deck, T.close7]]
    if (!G.some(([a, b]) => inR(t, a, b))) return { dy: 0, sq: 0 }
    const ph = (((t - 0.6) / BL) % 1 + 1) % 1
    return { dy: -8 * Math.sin(Math.PI * ph) ** 2, sq: 0.04 * Math.exp(-ph * 12) }
  }
  function boothState(t, isG) {
    let mood = 'happy', look = [0, -1], tears = 0, blink
    if (t < T.h1) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.rel1 + 0.6) { mood = 'neutral'; look = [isG ? 1 : -1, -1] }
    else if (t < T.h2) { mood = t < 5.4 ? 'wide' : isG ? 'wide' : 'squint'; look = [0, -1] }
    else if (t < T.stop2) { mood = 'squint'; look = [0, -1] }
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
    // the face-plant (Gemini) / slump (Sag)
    const pl = ease.outCubic(prog(t, T.plant, T.plant + 0.25)) * (1 - ease.inOutQuad(prog(t, T.rew[0] - 0.1, T.rew[0] + 0.3)))
    if (isG) { dy += 70 * pl; sq += 0.25 * pl + 0.12 * Math.exp(-Math.max(0, t - T.plant - 0.25) * 9) * pl } else { dy += 22 * pl; sq += 0.08 * pl }
    // the double-take on the replay
    if (inR(t, T.c1, T.c1 + 0.4)) dx += (isG ? 1 : -1) * 10 * Math.sin((t - T.c1) * 40) * Math.exp(-(t - T.c1) * 8)
    // erupt: jump
    if (inR(t, T.erupt, T.erupt + 0.7)) { const p = prog(t, T.erupt, T.erupt + 0.7); dy -= Math.sin(Math.PI * p) * 220; sq -= 0.1 * Math.sin(Math.PI * p) }
    if (inR(t, T.pins, T.pins + 0.6)) { const p = prog(t, T.pins, T.pins + 0.6); dy -= Math.sin(Math.PI * p) * 120 }
    const lean = (isG ? 1 : -1) * 16 * talkWeight(t, isG ? GT : ST)
    const hops = isG ? [...GEM_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS] : [...SAG_HOPS, ...BOOTH_HOPS, ...ERUPT_HOPS.map(h => h + 0.12)]
    const opts = { color: isG ? GEM.color : SAG.color, glyph: isG ? GEM.glyph : SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: sq, hops, seed: isG ? 3 : 8, pop: k, bob: 0, glow: 0.9 }
    x.save(); x.translate(D.x + lean + dx, D.y + dy)
    drawStarChar(x, 0, 0, D.s, t, opts)
    const F = starFrame(0, 0, D.s, t, opts)
    inSprite(x, F, () => headsetCells(x, isG ? GC : '#b07cff'))
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    x.restore()
    // "…" over the face-plant
    if (isG && pl > 0.6) { x.save(); x.globalAlpha = pl; x.font = `700 54px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('…', D.x, D.y - 40); x.fillStyle = BONE; x.fillText('…', D.x, D.y - 40); x.restore() }
  }
  function pisState(t) {
    if (t < T.h1) return { mood: 'sparkle', tears: 1, sq: 0 }
    if (t < T.cut1) return { mood: 'sparkle', tears: t > T.pit1 ? 2 : 1, sq: 0 }
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
        drawLights(x, t, prog(t, 0, 0.6) * outP)
        const monK = pop01(t, T.monIn, 0.42, 1.7) * outP
        const flash = inR(t, T.erupt, T.erupt + 1.6) || inR(t, T.pins, T.pins + 1.2) ? 1 : 0
        const shake = inR(t, T.bonk, T.bonk + 0.4) ? 8 * Math.sin((t - T.bonk) * 60) * Math.exp(-(t - T.bonk) * 8) : 0
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

// card-motif candidates (beat changes). The default selection keeps 2 of these 5 (indices 1 and 3):
// 13.5 (→ third quarter) and 27.9 (→ LESSON UNLOCKED). The end card flips at 40.6.
export const CUTS = [8.65, T.cut1, 19.45, T.cut2, T.deck]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [440, 493.88, 523.25, 587.33, 659.25, 783.99, 880]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 880, 0.05, 0], ['pluck', land, 880, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const bubbles = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.06 + r() * 0.08) out.push(['pop', +t.toFixed(3), 300 + r() * 500, 0.012 + r() * 0.01, r() * 0.6 - 0.3]); return out }
const scratch = t0 => [['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FXO }], ['chip', t0 + 0.09, 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FXO }]]
const sob = t0 => [0, 0.22, 0.44].map((d, i) => ['chip', +(t0 + d).toFixed(3), 880 - i * 60, 0.18, { duty: 0.25, slide: -6, vib: 0.05, gain: 0.016, decay: 0.15, sustain: 0.6, pan: 0.5, rev: 0.2, dly: 0, bus: 'fx' }])
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.11 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const crunch = t0 => Array.from({ length: 8 }, (_, i) => ['chip', +(t0 + i * 0.045).toFixed(3), 3000 + (i % 3) * 900, 0.04, { wave: 'noise', gain: 0.04 - i * 0.003, decay: 0.03, sustain: 0.2, ...FXO }])
const pt = (t, a) => +(t + a).toFixed(3)
export const CUES = [
  // 0 · welcome
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', T.h0Land, 880, 0.05, 0], ['pluck', T.h0Land, 880, 0.04, 0.6, 0],
  ['pop', T.monIn + 0.05, 262, 0.04, 0], ['pop', T.gemIn + 0.12, 784, 0.03, -0.3], ['pop', T.sagIn + 0.12, 659.25, 0.03, 0.3], ['pop', T.pisIn + 0.12, 988, 0.025, 0.4],
  ['tick', T.live, 0.05], ['bell', T.live + 0.05, 1318.5, 0.022, 0.8, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · first quarter: the boil-over
  ...wordPops(T.h1, 2, 0.12, 1), ...bubbles(T.rel1 - 0.5, T.pit1 + 0.4, 5), ['swell', T.rel1, T.pit1, { gain: 0.03, f0: 400, f1: 2400 }],
  ['chip', T.pit1, 2200, 0.7, { wave: 'noise', slide: -3, gain: 0.03, decay: 0.6, sustain: 0.6, ...FXO }], ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · second quarter: the splat
  ...wordPops(T.h2, 2, 0.12, 3), ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.stir + 0.2 + i * (0.22 - i * 0.013)).toFixed(3), 0.025]),
  ['whoosh', T.launch, 0.4, 0.03], ['pop', T.stop2, 90, 0.09, 0.3], ['chip', T.stop2, 900, 0.18, { wave: 'noise', gain: 0.05, decay: 0.15, sustain: 0.3, ...FXO }], ['boom', T.stop2, 0.15],
  ['pop', T.plop, 330, 0.05, 0.4], ['pop', T.plop + 0.06, 220, 0.04, 0.4], ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · third quarter: the crunch
  ...head(T.h3, 2, T.h3Land, 2), ['whoosh', T.lift, 0.3, 0.02], ...crunch(T.bonk), ['pop', T.bonk, 150, 0.06, 0],
  ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06], ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0],
  ['pop', T.phone + 0.05, 1318.5, 0.025, -0.4], ['pop', T.ask, 659.25, 0.03, -0.3], ['pop', T.yes, 880, 0.035, 0.3],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ...[T.c1, T.c2].flatMap((c, i) => [['chip', c, 2600, 0.32, { wave: 'noise', slide: 4, gain: 0.014, decay: 0.3, sustain: 0.6, ...FXO }], ['pop', c + 0.32, NOTE[(i * 2 + 3) % 7], 0.035, i ? 0.3 : -0.3]]),
  ['tick', T.slo[1], 0.05], ['tick', T.stat4[0], 0.04], ['pop', T.stat4[0] + 0.05, 1318.5, 0.025, 0],
  // 5 · kitchen dance party
  ['swell', T.erupt - 0.7, T.erupt, { gain: 0.05, f0: 600, f1: 4000 }], ['boom', T.erupt + 0.27, 0.22], ['glitter', T.erupt, T.erupt + 0.8],
  ['brass', T.erupt + 0.27, [440, 523.25, 659.25], 0.6, { gain: 0.05, bright: 1.4, rev: 0.2, bus: 'fx' }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.erupt + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ...claps(T.erupt + 0.1, T.erupt + 2.4, 13),
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · talk cards
  ...wordPops(T.h6, 2, 0.12, 2), ['pop', T.deal + 0.1, 659.25, 0.03, 0], ['tick', T.deal + 0.55, 0.05], ['tick', T.deal + 0.75, 0.05],
  ['chip', T.flip - 0.9, 200, 0.9, { wave: 'noise', gain: 0.02, decay: 0.9, sustain: 0.9, ...FXO }], ['tick', T.flip + 0.1, 0.06], ['bell', T.flip + 0.15, 1318.5, 0.035, 1.2, 0], ['glitter', T.flip + 0.1, T.flip + 0.6],
  ['pluck', T.flip + 0.4, 880, 0.035, 0.4, -0.3], ['pluck', T.flip + 0.52, 1046.5, 0.035, 0.4, 0.3],
  // 8 · final score
  ...head(T.h7, 1, T.h7Land, 0), ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1318.5, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.6, 29),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
