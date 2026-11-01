// hxpaddle — DATE NIGHT RECAP: "The Paddle Boat Date." (45 s vertical Align ad, Star Talk: Houston, music: funk in E).
// The sxrecapbowl sportscast booth: ♊ GEMINI + ♐ SAG in headsets at the DATE NIGHT RECAP desk call a date like a big game on
// the STAR CAM jumbotron. ♉ TAURUS and ♒ AQUARIUS take a pedal boat out on the lake in Hermann Park. ♓ Pisces sits on the
// jumbotron with a pennant, crying. Story 0–40.6, then the end card.
//   0.00–3.85   "Date night: | *paddle boats.*"  GEMINI: "Live from Hermann Park, folks!"  The STAR CAM goes LIVE on the lake.
//   3.95–8.55   "Lap *one.*"  They pedal hard… and draw one big, perfect circle. SAG: "That's a circle. A full one."
//               STAT: HEADING: ALL OF THEM.  (scorebug: BOAT O)
//   8.7–13.4    "Lap *two.*"  Taurus yanks the tiller: a tighter, faster circle. Two dizzy stars. GEMINI: "Tighter circle. Bold
//               strategy."  STAT: STEERING: THEORETICAL.
//  13.5        the one card cut (cardfx.js).
//  13.6–19.4   "Lap three: | *the duck.*"  They pedal flat out, spinning on the spot, and a duck glides calmly past them (QUACK).
//               The booth gives up: Gemini face-plants, Sag rolls its eyes. SAG: "They lost to a duck. Call it."
//               STAT: DUCK: UNBOTHERED.  Pisces: SOB!  (In the boat the two stars are already cracking up. Nobody notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  REWIND, SLO-MO of the duck pass; the telestrator circles both faces: laughing.
//               GEMINI: "Wait. Look at their faces."  SAG: "They're cracking up."  STAT: LAUGHS: NONSTOP.
//  25.04–27.8  "Play of | *the night.*"  PLAY OF THE NIGHT slams on: hands off the tiller, feet up. GEMINI: "THEY QUIT STEERING!"
//  28.38–32.55 ★ LESSON UNLOCKED: "Laughing *together* | beats getting it right."
//  32.65–36.5  "Tonight's *deck.*"  Three cards deal onto the water. SAG: "New deck tonight. No steering needed."
//  36.6–40.5   "Final *lap.*"  One slow lazy circle, the duck riding in the wake; FULL CIRCLE ♥. THE BOOTH: "Circles count."
// Rewatch bait: the turtle on the log turns its head to follow every lap, and in the final lap it is wearing a tiny headset.
// One canvas (sky + jumbotron + booth), a low-res lake canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
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
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), TAUR = signStar('taurus'), AQU = signStar('aquarius')
export const KEY = 'E'
const { LW, LH, SCR } = GEO
const TAU2 = Math.PI * 2

// ── the timeline
const T = {
  black: [-1, -0.9],                                   // frame 0 is the thumbnail: everything is already in at t = 0
  monIn: -0.85, deskIn: -0.78, gemIn: -0.7, sagIn: -0.62, micIn: -0.56, pisIn: -0.45, live: -0.4,
  h0: -0.8, h0Land: -0.45, h0Out: [3.65, 3.85], l0: 0.85, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], ped1: 4.15, loop1: [4.25, 6.55], l1: 5.6, close1: 8.55, stat1: [6.4, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], yank: 8.95, loop2: [9.15, 12.35], l2: 10.0, close2: 13.3, stat2: [11.6, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], wind3: 13.7, spin: [13.85, 16.3], duck: [13.9, 16.2], bonk: 14.75, laugh: 15.35,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.6, close4: 24.85,
  c1: 22.25, c2: 22.55, stat4: [23.6, 24.95],
  erupt: BEAT(44), h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,                    // 25.04
  lesson: BEAT(50), lessonOut: [32.35, 32.55],                                         // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], deal: 33.0, l7: 33.1, close6: 36.45, stat6: [33.6, 36.5],
  fin: 36.6, h7: 36.6, h7Land: 36.95, loopF: [36.8, 38.6], pins: 38.6, l8: 37.0, close7: 40.0, out: [40.05, 40.5],
}
// the replay maps the picture back onto lap three, slowed down
const SLO = [14.3, 15.95]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Live from *Hermann Park,* folks!' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'That’s a circle. A *full* one.' },
  { t: T.l2, speaker: GT, color: GC, text: 'Tighter circle. *Bold* strategy.' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'They lost to a duck. *Call it.*' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Look at *their faces.*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'They’re *cracking up.*' },
  { t: T.l6, speaker: GT, color: GC, text: 'THEY QUIT *STEERING!*' },
  { t: T.l7, speaker: ST, color: SCOL, text: 'New deck tonight. *No steering* needed.' },
  { t: T.l8, speaker: BT, color: PINK, text: 'Circles *count.*' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES, LT })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Laughing *together* | beats getting it right.', chip: 'BONUS: GIGGLES' }

const STATS = [[...T.stat1, 'HEADING: ALL OF THEM'], [...T.stat2, 'STEERING: THEORETICAL'], [...T.stat3, 'DUCK: UNBOTHERED'], [...T.stat4, 'LAUGHS: NONSTOP'], [...T.stat6, 'NEXT LAP: TONIGHT']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b

// ── the lake (low-res) and the boat's path
const SHORE = 34
const toLX = X => (X - SCR.sx0) / GEO.PS, toLY = Y => (Y - SCR.sy0) / GEO.PS
/** the boat at picture time pt (and the film time t, for the bits after the replay):
 *  { x, y, s (depth scale), sx (−1…1: the hull turning; sign = heading), pedal (wheel speed), moving } */
function boatState(pt, t = pt) {
  const loop = (a, cx, cy, R, r) => ({ x: cx + R * Math.sin(a), y: cy + r * Math.cos(a), s: lerp(0.84, 1, (Math.cos(a) + 1) / 2), sx: Math.cos(a) })
  let b = { x: 540, y: SY(78), s: 1, sx: 1, pedal: 0, moving: false }
  if (t >= T.fin) {
    const p = ease.inOutQuad(prog(t, ...T.loopF)), a = p * TAU2
    return { ...loop(a, 540, SY(72), 200, 34), pedal: p > 0 && p < 1 ? 1.2 : 0.2, moving: p > 0 && p < 1 }
  }
  if (t >= T.erupt) {                                      // after the replay: feet up, drifting in a lazy arc
    const a = (t - T.erupt) * 0.32
    return { ...loop(a, 540, SY(72), 120, 20), pedal: 0, moving: true }
  }
  if (pt < T.loop1[0]) return { ...b, pedal: pt > T.ped1 ? 3 : 0.4 }
  if (pt < T.h2) {
    const p = ease.inOutQuad(prog(pt, ...T.loop1))
    return { ...loop(p * TAU2, 540, SY(72), 220, 36), pedal: p < 1 ? 3 : 0.5, moving: p > 0 && p < 1 }
  }
  if (pt < T.cut1) {
    const p = ease.inOutQuad(prog(pt, ...T.loop2))
    return { ...loop(p * TAU2 * 2, 540, SY(76), 110, 18), pedal: p < 1 ? 4 : 0.5, moving: p > 0 && p < 1 }
  }
  // lap three: flat out, spinning on the spot, slowing to a stop once they crack up
  const k = prog(pt, ...T.spin)
  const a = pt < T.spin[0] ? 0 : (pt < T.laugh ? (pt - T.spin[0]) * 7 : (T.laugh - T.spin[0]) * 7 + (1 - Math.pow(1 - prog(pt, T.laugh, T.spin[1]), 2)) * (T.spin[1] - T.laugh) * 3.5)
  return { ...loop(a, 540, SY(76), 26, 5), pedal: pt < T.laugh ? 5 : 0.3 * (1 - k), moving: pt >= T.spin[0] && pt < T.spin[1] }
}
/** the duck: { x, y, dir, vis } */
function duckState(pt, t = pt) {
  if (t >= T.fin) {                                       // riding the wake on the final lap
    const p = ease.inOutQuad(prog(t, T.loopF[0] + 0.25, T.loopF[1] + 0.35)), a = p * TAU2 - 0.55
    return { x: 540 + 200 * Math.sin(a), y: SY(72) + 34 * Math.cos(a) + 26, dir: Math.cos(a) >= 0 ? 1 : -1, vis: t < T.out[1] }
  }
  if (t >= T.erupt) return { x: SX(150), y: SY(96), dir: -1, vis: true }
  if (pt >= T.duck[0] && pt < T.duck[1]) { const p = prog(pt, ...T.duck); return { x: lerp(SX(-14), SX(184), p), y: SY(97), dir: 1, vis: true } }
  return { vis: false }
}
// the two stars in the boat (seats front / back, offsets along the hull)
const SEAT = 64, STAR_S = 140

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 27px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }

  // ── bake the static lake once: a sunset sky, a tree line, the far bank, the water
  const lakeBG = document.createElement('canvas'); lakeBG.width = LW; lakeBG.height = LH
  {
    const b = lakeBG.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    const sky = ['#3b2a63', '#5a3374', '#8a3f7c', '#c45a7a', '#ec8a6e', '#f7b26a']
    sky.forEach((c, i) => P(0, i * 4, LW, 4, c))
    P(0, 24, LW, 12, '#f7c47a')
    // the sun, low and soft
    for (let j = 0; j < 6; j++) { const w = [6, 10, 12, 12, 10, 6][j]; P(118 - w / 2, 16 + j, w, 1, '#ffe2a0') }
    // tree line: lumpy crowns
    const r = rng(41)
    for (let i = -4; i < LW + 4; i += 5) {
      const h = 7 + Math.floor(r() * 7), w = 6 + Math.floor(r() * 5)
      P(i, SHORE - h, w, h, i % 2 ? '#1f3b3a' : '#24463f'); P(i + 1, SHORE - h - 2, w - 2, 2, '#2c5446'); P(i + 2, SHORE - h + 1, 2, 1, '#3d6a52')
    }
    // a little footbridge on the left bank
    P(10, SHORE - 6, 26, 2, '#e8d6b2'); for (let k = 0; k < 6; k++) P(11 + k * 5, SHORE - 9, 1, 3, '#e8d6b2'); P(10, SHORE - 10, 26, 1, '#e8d6b2')
    // far bank + reeds
    P(0, SHORE, LW, 3, '#2d4a33'); P(0, SHORE + 3, LW, 1, '#1d2f26')
    // water: bands, the sun's reflection
    for (let y = SHORE + 4; y < LH; y++) {
      const k = (y - SHORE) / (LH - SHORE)
      P(0, y, LW, 1, k < 0.25 ? '#4c6d9a' : k < 0.5 ? '#3f5f8e' : k < 0.75 ? '#35527f' : '#2c4672')
    }
    for (let y = SHORE + 5; y < SHORE + 30; y += 2) { const w = Math.max(2, 14 - (y - SHORE) * 0.4); P(118 - w / 2, y, w, 1, '#f3b47c') }
    // lily pads
    for (const [px, py] of [[16, 70], [22, 74], [150, 64], [140, 88], [30, 100]]) { P(px - 3, py, 7, 2, '#3f8a5a'); P(px - 2, py - 1, 5, 1, '#53a66a'); P(px + 1, py, 1, 1, '#2c4672') }
    // the log (the turtle is drawn live)
    P(128, SHORE + 9, 22, 3, '#6a4a2e'); P(128, SHORE + 9, 22, 1, '#8a6440'); P(127, SHORE + 10, 1, 2, '#4a3220')
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *paddle boats.*', { top: 118, size: 100, accentSize: 140, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'Lap *one.*', { top: 168, size: 112, accentSize: 164, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Lap *two.*', { top: 168, size: 112, accentSize: 164, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Lap three: | *the duck.*', { top: 118, size: 100, accentSize: 150, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 1.0 }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Play of | *the night.*', { top: 118, size: 104, accentSize: 156, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Tonight’s *deck.*', { top: 168, size: 108, accentSize: 160, at: T.h6, gap: 0.12, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Final *lap.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
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
  /** the pedal boat, full-res pixel blocks. (cx, cy) = the waterline centre; s = depth scale; sx = the turn (−1…1) */
  function drawBoat(cx, cy, s, sx, wheelA) {
    const P = 6 * s, w = 330 * s * Math.max(0.3, Math.abs(sx)), dir = sx >= 0 ? 1 : -1, h = 8 * P
    const x0 = cx - w / 2
    // the hull: ink, white, a teal stripe, a darker belly in the water
    BLK(x0 - P, cy - h - P, w + 2 * P, h + 2 * P, INK)
    BLK(x0, cy - h, w, h, '#f4efe4')
    BLK(x0, cy - h, w, P, '#ffffff')
    BLK(x0, cy - h * 0.48, w, 2.4 * P, '#2fb5a8')
    BLK(x0, cy - 2 * P, w, 2 * P, '#c9c1b4')
    // the raised bow (in the heading) and a little seat back at the stern
    const bx = dir > 0 ? x0 + w - 5 * P : x0
    BLK(bx - P, cy - h - 4 * P, 5 * P + 2 * P, 5 * P, INK); BLK(bx, cy - h - 3 * P, 5 * P, 4 * P, '#f4efe4'); BLK(bx + (dir > 0 ? 3 * P : P), cy - h - 2 * P, P, P, '#2fb5a8')
    // the paddle wheel at the stern
    const wx = dir > 0 ? x0 - 2 * P : x0 + w + 2 * P, wy = cy - 3 * P, wr = 4.5 * P
    x.save(); x.translate(wx, wy)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, wr + P, 0, TAU2); x.fill()
    x.fillStyle = '#e8344e'; x.beginPath(); x.arc(0, 0, wr, 0, TAU2); x.fill()
    x.fillStyle = '#ffffff'
    for (let k = 0; k < 4; k++) { const a = wheelA + k * Math.PI / 2; x.save(); x.rotate(a); x.fillRect(-P * 0.5, -wr, P, wr * 2); x.restore() }
    x.fillStyle = INK; x.fillRect(-P, -P, 2 * P, 2 * P)
    x.restore()
  }
  function drawDuck(X, Y, dir, t, s = 1, hat = false) {
    const P = 5 * s
    x.save(); x.translate(Math.round(X), Math.round(Y)); x.scale(dir, 1)
    const cells = [
      '......ii....', '.....iGGi...', '.....iGkGoo.', '.....iGGGi..', 'i....iGWi...', 'iWiiiWWWWi..', 'iWWWWWWWWWi.', '.iWWWbWWWWi.', '..iWWWWWWi..', '...iiiiii...',
    ]
    const C = { i: INK, G: '#2f8a4e', k: INK, o: '#f2a33a', W: '#c9a27a', b: '#8a6440' }
    cells.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') { x.fillStyle = C[c]; x.fillRect((i - 6) * P, (j - 9) * P + Math.round(Math.sin(t * 4) * 1), P, P) } }))
    x.restore()
  }
  function ripplesLow(t) {
    // drifting ripple dashes on the water
    const r = rng(7)
    for (let i = 0; i < 26; i++) {
      const y = SHORE + 6 + Math.floor(r() * (LH - SHORE - 8)), w = 3 + Math.floor(r() * 5), sp = 2 + r() * 3
      const X = ((r() * LW + t * sp) % (LW + 10)) - 5
      R(X, y, w, 1, y < 70 ? '#6d8fbf' : '#5577a8')
    }
  }
  function wakeLow(pt, t) {
    // the wake: the boat's own path, a fading trail of foam behind it (it draws the circles)
    for (let k = 1; k <= 26; k++) {
      const pp = pt - k * 0.07, tt = t - k * 0.07
      const b = boatState(pp, tt), now = boatState(pt, t)
      if (!b.moving || !now.moving) continue
      const lx = toLX(b.x), ly = toLY(b.y) + 1
      const a = 1 - k / 27
      R(lx - 2, ly, 4, 1, a > 0.6 ? '#e8f6ff' : a > 0.3 ? '#a9c9ea' : '#7d9dcc')
    }
  }
  function turtleLow(t, pt, bx) {
    // the turtle on the log turns its head to follow the boat (rewatch bait); final lap: a tiny headset
    const look = bx > 540 ? 1 : -1
    R(134, SHORE + 6, 7, 3, '#3f6a3a'); R(135, SHORE + 5, 5, 1, '#55864a'); R(136, SHORE + 7, 1, 1, '#2c4c2a'); R(138, SHORE + 7, 1, 1, '#2c4c2a')
    const hx = look > 0 ? 141 : 132
    R(hx, SHORE + 6, 2, 2, '#6d9a52'); R(look > 0 ? hx + 1 : hx, SHORE + 6, 1, 1, INK)
    if (t >= T.fin) { R(134, SHORE + 4, 7, 1, INK); R(133, SHORE + 5, 1, 2, '#ffd95a'); R(141, SHORE + 5, 1, 2, '#ffd95a') }
  }
  function seatPos(b, which) {
    // which: 0 = Taurus (front), 1 = Aquarius (back)
    const d = (which === 0 ? 1 : -1) * SEAT * b.s * Math.sign(b.sx || 1) * Math.max(0.3, Math.abs(b.sx))
    return { x: b.x + d, y: b.y - 96 * b.s }
  }
  function playerState(t, pt, which) {
    const isT = which === 0
    let mood = 'happy', look = [isT ? 1 : -1, 0], squash = 0, hops = [], blink
    if (pt >= T.ped1 && pt < T.loop1[1]) { mood = 'squint'; look = [Math.sign(boatState(pt, t).sx), 0] }
    if (pt >= T.loop1[1] && pt < T.h2) { mood = isT ? 'wide' : 'neutral'; look = [0, 0] }
    if (pt >= T.h2 && pt < T.cut1) { mood = pt < T.loop2[0] ? (isT ? 'squint' : 'wide') : pt < T.loop2[1] ? 'wide' : (isT ? 'sleepy' : 'wide'); look = pt > T.loop2[0] && pt < T.loop2[1] ? [Math.sin(pt * 9 + which), Math.cos(pt * 9 + which)] : [0, 0]; blink = false }
    if (pt >= T.h3 && pt < T.laugh) { mood = pt < T.bonk - 0.3 ? 'squint' : 'wide'; look = pt < T.bonk - 0.3 ? [0, 0] : [0, 1] }
    if (pt >= T.laugh && t < T.deck) { mood = 'happy'; look = [isT ? -1 : 1, 0]; const ph = (pt - T.laugh) % 0.36; squash = -0.08 * Math.sin(Math.PI * ph / 0.36) + 0.05 }
    if (t >= T.erupt && t < T.deck) { mood = 'heart'; look = [isT ? -1 : 1, 0] }
    if (t >= T.deck) { mood = 'sparkle'; look = [0, 1] }
    if (t >= T.fin) { mood = t > T.pins ? 'heart' : 'happy'; look = [isT ? -1 : 1, 0] }
    hops = [T.ped1, T.h3 + 0.2]
    if (t >= T.erupt) hops = [...hops, T.erupt + 0.1, T.erupt + 0.6, T.pins + 0.1]
    // pedalling jiggle
    const b = boatState(pt, t)
    if (b.pedal > 1) squash += 0.04 * Math.sin(pt * 26 + which * 1.6)
    return { mood, look, squash, hops, blink }
  }
  function drawPlayers(t, pt, b) {
    const out = []
    for (const which of [1, 0]) {
      const S = which === 0 ? TAUR : AQU, st = playerState(t, pt, which), p = seatPos(b, which)
      drawStarChar(x, p.x, p.y, STAR_S * b.s, pt, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: st.hops, blink: st.blink, seed: which ? 9 : 4, glow: 0.7 })
      out[which] = p
    }
    return out
  }

  function picture(t) {
    const pt = picTime(t)
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(lakeBG, 0, 0)
    ripplesLow(pt)
    const b = boatState(pt, t)
    wakeLow(pt, t)
    turtleLow(t, pt, b.x)
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    if (t >= T.deck && t < T.fin + 0.3) { const k = prog(t, T.deck, T.deck + 0.3) * (1 - prog(t, T.fin, T.fin + 0.3)); x.fillStyle = `rgba(10,6,26,${0.55 * k})`; x.fillRect(sx0, sy0, sw, sh) }
    // the duck behind the boat on the final lap; in front of it on lap three
    const d = duckState(pt, t)
    const duckBehind = t >= T.fin && d.y < b.y
    if (d.vis && duckBehind) drawDuck(d.x, d.y, d.dir, pt, 0.9, t >= T.fin)
    // the boat: stars first, then the hull over their lower halves
    const pos = drawPlayers(t, pt, b)
    const wheelA = (() => { // wheel angle: integral-ish of pedal speed (pure: piecewise by time)
      return pt * (b.pedal || 0) * 2
    })()
    drawBoat(b.x, b.y, b.s, b.sx, wheelA)
    // splash puffs while pedalling hard
    if (b.pedal >= 3) {
      const dir = b.sx >= 0 ? 1 : -1, wx = b.x - dir * (150 * b.s * Math.max(0.3, Math.abs(b.sx)) + 12)
      for (let i = 0; i < 3; i++) { const k = ((pt * 3 + i / 3) % 1); x.globalAlpha = 1 - k; BLK(wx - dir * k * 40 - 6, b.y - 30 - Math.sin(Math.PI * k) * 30, 12, 12, '#e8f6ff') }
      x.globalAlpha = 1
    }
    if (d.vis && !duckBehind) drawDuck(d.x, d.y, d.dir, pt, 1.1)
    // QUACK as the duck passes
    if (d.vis && t < T.erupt) teleTag(x, pt, T.bonk, 'QUACK.', d.x + 10, d.y - 90, { size: 42, rot: -0.06, out: [T.bonk + 0.9, T.bonk + 1.1] })
    // dizzy stars over lap two
    if (pt > T.loop2[1] - 0.2 && pt < T.cut1 && t < T.rew[0]) {
      for (let i = 0; i < 4; i++) { const a = pt * 5 + i * Math.PI / 2; drawPixelStar(x, pos[0].x + Math.cos(a) * 60, pos[0].y - 80 + Math.sin(a) * 14, 22, 2, GOLD) }
    }
    // HA HA while they laugh
    if (pt >= T.laugh && t < T.deck) {
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      for (let i = 0; i < 12; i++) {
        const t0 = T.laugh + i * 0.3, k = pt - t0
        if (k < 0 || k > 1.0) continue
        const side = i % 2 ? pos[1].x : pos[0].x, cx2 = side + (i % 3 - 1) * 30, cy = pos[0].y - 100 - k * 70
        x.globalAlpha = Math.sin(Math.PI * k)
        x.lineWidth = 7; x.strokeStyle = INK; x.strokeText('HA', cx2, cy); x.fillStyle = i % 4 < 2 ? GOLD : PINK; x.fillText('HA', cx2, cy)
      }
      x.globalAlpha = 1
    }
    // play of the night: feet up
    if (t >= T.erupt && t < T.lesson) teleTag(x, t, T.erupt + 0.6, 'HANDS OFF!', b.x, b.y - 190, { size: 40, rot: 0.05, out: [T.h5Out[0], T.h5Out[1]] })
    // tonight's deck
    if (t >= T.deck && t < T.fin + 0.3) {
      const o = 1 - prog(t, T.fin, T.fin + 0.3)
      ;[-1, 0, 1].forEach((dd, i) => {
        const t0 = T.deal + i * 0.2, k = ease.outCubic(prog(t, t0, t0 + 0.3))
        if (k <= 0) return
        x.save(); x.globalAlpha = o
        miniCard(x, lerp(540, 540 + dd * 150, k), lerp(SY(LH) + 120, SY(56), k), 120, { rot: dd * 0.12 * k + Math.sin(t * 2 + i) * 0.02, k: 1 })
        x.restore()
      })
      teleTag(x, t, T.deal + 0.8, "TONIGHT'S DECK", 540, SY(20), { size: 34, rot: -0.04, out: [T.fin, T.fin + 0.25] })
    }
    // the final lap closes: hearts out of the wake
    if (t >= T.pins) {
      const k = t - T.pins
      if (k < 1.6) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, dd = 60 + k * 160; x.save(); x.globalAlpha = 1 - prog(k, 1.0, 1.6); drawPixelStar(x, 540 + Math.cos(a) * dd, b.y - 120 + Math.sin(a) * dd * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
      teleTag(x, t, T.pins + 0.15, 'FULL CIRCLE ♥', 650, SY(30), { size: 46, rot: -0.06 })
    }
    return { pt, b, pos }
  }
  function scoreBug(t) {
    const k = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (k <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 20
    x.save(); x.translate(X, Y); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [['BOAT', '#2fb5a8', [[T.loop1[1], 'O'], [T.loop2[1] - 0.1, 'O'], [T.laugh, 'O'], [T.pins + 0.1, '♥']]], ['DUCK', '#f2a33a', [null, null, [T.bonk + 0.2, 'W'], [T.pins + 0.1, '♥']]]]
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
          x.fillStyle = m[1] === '♥' ? PINK : m[1] === 'W' ? GOLD : RED; x.fillRect(-18, -16, 36, 32)
          x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = m[1] === 'W' ? INK : '#ffffff'; x.fillText(m[1], 0, 1)
          x.restore()
        }
      })
    })
    x.restore()
  }
  function drawScreen(t) {
    const { sx0, sy0, sw, sh } = SCR
    x.save(); x.beginPath(); x.rect(sx0, sy0, sw, sh); x.clip()
    const { pos } = picture(t)
    const on = prog(t, T.live - 0.2, T.live + 0.1)
    if (on < 1) { const hh = sh * ease.outCubic(on); x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2) }
    const rew = inR(t, ...T.rew), rep = inR(t, T.rew[0], T.erupt)
    if (rep) {
      vhs(x, t, rew)
      replayBug(x, t, rew ? '◀◀ REWIND' : t >= T.slo[1] ? '❚❚ REPLAY' : '▶ REPLAY', !rew && t < T.slo[1])
      // the telestrator: both faces circled, an arrow between, HA tags (positions follow the slowed boat)
      const o = [T.erupt - 0.3, T.erupt - 0.05]
      const [a, b] = [pos[0], pos[1]]
      teleCircle(x, t, T.c1, a.x, a.y - 4, 66, 62, { seed: 1, out: o })
      teleCircle(x, t, T.c2, b.x, b.y - 4, 66, 62, { seed: 2, out: o })
      teleArrow(x, t, T.c2 + 0.35, a.x, a.y - 130, b.x, b.y - 130, { out: o })
      teleTag(x, t, T.c1 + 0.3, 'HA!', a.x, a.y - 112, { size: 40, out: o })
      teleTag(x, t, T.c2 + 0.3, 'HA!', b.x, b.y - 112, { size: 40, rot: 0.08, out: o })
    } else if (t >= T.live && t < T.out[0]) {
      liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
      const pk = pop01(t, T.live + 0.25, 0.3, 2.2)
      if (pk > 0.01 && t < T.h1) { x.save(); x.translate(sx0 + sw - 290, sy0 + 76); x.scale(pk, pk); pill(x, 0, 0, 266, 38, '#2fb5a8', 'HERMANN PARK', INK, 22); x.restore() }
    }
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'TAURUS ♥ AQUARIUS · THE DUCK LAP', { out: T.h5Out })
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
    // lap two: the booth sways along with the circles
    if (inR(t, T.loop2[0], T.loop2[1])) dx += 14 * Math.sin((t - T.loop2[0]) * TAU2 * 2 / (T.loop2[1] - T.loop2[0])) * (isG ? 1 : -1)
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

// the one card cut (cardfx.js plays a single cut, the middle candidate): 13.5, into lap three. The end card has none.
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
const ALL_CUES = [
  // 0 · welcome (everything is already on screen at frame 0: one hit on the first frame)
  ['pop', 0.02, 1046.5, 0.05, 0], ['pluck', 0.02, 1046.5, 0.04, 0.6, 0], ['tick', 0.03, 0.05], ['bell', 0.06, 1568, 0.022, 0.8, 0], ['pop', 0.1, 988, 0.025, 0.4],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · lap one
  ...wordPops(T.h1, 2, 0.12, 1), ...churn(T.ped1, T.loop1[1] - T.ped1), ...swirl(T.loop1[0], T.loop1[1] - T.loop1[0]), ...womp(pt(T.loop1[1], 0.1)),
  ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · lap two
  ...wordPops(T.h2, 2, 0.12, 3), ['whoosh', T.yank, 0.35, 0.02], ['pop', T.yank, 220, 0.05, 0.3], ...churn(T.loop2[0], T.loop2[1] - T.loop2[0], 0.08),
  ...swirl(T.loop2[0], T.loop2[1] - T.loop2[0]), ['chip', T.loop2[1], 1400, 0.6, { duty: 0.25, vib: 0.1, gain: 0.014, decay: 0.5, sustain: 0.4, ...FXO }],
  ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · lap three: the duck
  ...head(T.h3, 2, T.h3Land, 2), ['whoosh', T.wind3, 0.35, 0.02], ...churn(T.spin[0], T.laugh - T.spin[0], 0.06, 0.026), ...splash(T.spin[0]), ...splash(pt(T.spin[0], 0.7), 0.02),
  ...quack(T.bonk), ['glitter', T.bonk, T.bonk + 0.4],
  ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06],
  ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ['chip', pt(T.slo[0], (T.bonk - SLO[0]) / (SLO[1] - SLO[0]) * (T.slo[1] - T.slo[0])), 420, 0.4, { duty: 0.25, slide: -6, vib: 0.06, gain: 0.03, decay: 0.35, sustain: 0.6, ...FXO }],
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
  // 8 · final lap
  ...head(T.h7, 1, T.h7Land, 0), ...churn(T.loopF[0], 0.6, 0.12, 0.016), ...quack(pt(T.loopF[0], 0.9)), ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1568, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.4, 23),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = ALL_CUES.filter(c => c[1] >= 0)
