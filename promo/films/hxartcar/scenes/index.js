// hxartcar — DATE NIGHT RECAP: "The Art Car Date." (45 s vertical Align ad, Star Talk: Houston, music: house in F).
// The sxrecapbowl sportscast booth: ♊ GEMINI + ♐ SAG in headsets at the DATE NIGHT RECAP desk call a date like a big game on
// the STAR CAM jumbotron. ♌ LEO (wants to be IN the parade) and ♍ VIRGO (wants to watch it) at an art car parade.
// ♓ Pisces sits on the jumbotron with a pennant, crying. Story 0–40.6, then the end card.
//   0.00–3.85   "Date night: | *art cars.*"  GEMINI: "Live from the art car parade!"  Crowd, bunting, LIVE.
//   3.95–8.55   "Car *one.*"  The disco car rolls by; Leo hops off the curb and struts along beside it.
//               SAG: "Leo just joined the parade."  STAT: LEO: IN THE PARADE.  (scorebug: LEO GO · VIR NO)
//   8.7–13.4    "Car *two.*"  Virgo reels Leo back to the curb, clipboard out, as the snail car slides by.
//               GEMINI: "Virgo brought a clipboard."  STAT: VIRGO: TAKING NOTES.
//  13.5        the one card cut (cardfx.js).
//  13.6–19.4   "The *standoff.*"  Leo leans street-ward, Virgo leans curb-ward… the clipboard flies (FWIP). The booth gives up:
//               Gemini face-plants, Sag rolls its eyes. SAG: "Different plans. Call it."  STAT: AGREEMENT: PENDING.  Pisces: SOB!
//               (On the curb the clipboard has landed face up: a sketch of a tiny car. Leo grabs the box. Nobody notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  REWIND, SLO-MO: the telestrator circles the clipboard (A SKETCH) and the box
//               (A BOX). GEMINI: "Wait. Is that a sketch?"  SAG: "They're building something."  STAT: PLAN: NEW.
//  25.04–27.8  "Play of | *the night.*"  PLAY OF THE NIGHT: their cardboard art car rolls into the parade. GEMINI: "A CARDBOARD
//               ART CAR!"
//  28.38–32.55 ★ LESSON UNLOCKED: "Make something *together.*"
//  32.65–36.5  "Tonight's *deck.*"  Three cards deal onto the street. SAG: "New deck tonight. Bring tape."
//  36.6–40.5   "Final *judging.*"  A rosette lands on the box car: BEST CAR ♥. THE BOOTH: "Best car in the parade."
// Rewatch bait: the cardboard box is already sitting on the curb in frame 0.
// One canvas (sky + jumbotron + booth), a low-res street canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
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
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), LEO = signStar('leo'), VIR = signStar('virgo')
export const KEY = 'F'
const { LW, LH, SCR } = GEO
const TAU2 = Math.PI * 2

// ── the timeline
const T = {
  black: [-1, -0.9],                                   // frame 0 is the thumbnail: everything is already in at t = 0
  monIn: -0.85, deskIn: -0.78, gemIn: -0.7, sagIn: -0.62, micIn: -0.56, pisIn: -0.45, live: -0.4,
  h0: -0.8, h0Land: -0.45, h0Out: [3.65, 3.85], l0: 0.85, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], loop1: [4.0, 8.6], hop1: 4.9, l1: 5.6, close1: 8.55, stat1: [6.6, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], loop2: [8.7, 13.4], reel: [8.8, 9.6], l2: 10.0, close2: 13.3, stat2: [11.6, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], bonk: 14.7, laugh: 15.35, grab: 16.2,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.6, close4: 24.85,
  c1: 22.25, c2: 22.55, stat4: [23.6, 24.95],
  erupt: BEAT(44), roll: [25.04, 26.6], h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,          // 25.04
  lesson: BEAT(50), lessonOut: [32.35, 32.55],                                                  // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], deal: 33.0, l7: 33.1, close6: 36.45, stat6: [33.6, 36.5],
  fin: 36.6, h7: 36.6, h7Land: 36.95, pins: 38.3, l8: 37.0, close7: 40.0, out: [40.05, 40.5],
}
// the replay maps the picture back onto the standoff, slowed down
const SLO = [14.4, 16.8]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Live from the *art car parade!*' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'Leo just *joined* the parade.' },
  { t: T.l2, speaker: GT, color: GC, text: 'Virgo brought a *clipboard.*' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'Different plans. *Call it.*' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Is that a *sketch?*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'They’re *building* something.' },
  { t: T.l6, speaker: GT, color: GC, text: 'A CARDBOARD *ART CAR!*' },
  { t: T.l7, speaker: ST, color: SCOL, text: 'New deck tonight. *Bring tape.*' },
  { t: T.l8, speaker: BT, color: PINK, text: '*Best* car in the parade.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES, LT })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Make something *together.*', chip: 'BONUS: GLITTER' }

const STATS = [[...T.stat1, 'LEO: IN THE PARADE'], [...T.stat2, 'VIRGO: TAKING NOTES'], [...T.stat3, 'AGREEMENT: PENDING'], [...T.stat4, 'PLAN: NEW'], [...T.stat6, 'NEXT BUILD: TONIGHT']]
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b

// ── the street (low-res): storefronts, a crowd behind the barricade, the parade lane, our curb in front
const LANE = SY(74), CURB = SY(90)                          // full-res baselines: the cars' wheels, the stars' centre line
const toLX = X => (X - SCR.sx0) / GEO.PS
const STAR_S = 154
const disco = pt => lerp(-260, 1340, prog(pt, 3.95, 8.6))
const snail = pt => lerp(-260, 1340, prog(pt, 8.9, 13.4))
const boxCar = t => t < T.erupt ? -400 : t < T.fin ? lerp(-150, 560, ease.outQuad(prog(t, ...T.roll))) : 560 + 30 * Math.sin((t - T.fin) * 0.8)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 27px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }
  // ── bake the static street once: dusk sky, storefronts + bunting, the barricade, the lane, the curb and sidewalk
  const streetBG = document.createElement('canvas'); streetBG.width = LW; streetBG.height = LH
  {
    const b = streetBG.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    ;['#2a2058', '#3a2768', '#5a3478', '#8a4a80', '#c46a84'].forEach((c, i) => P(0, i * 3, LW, 3, c))
    // storefronts: plain, colourful, no names
    const shops = [[0, 30, '#e8a84a'], [30, 26, '#4a9df0'], [56, 34, '#ff8fb1'], [90, 24, '#46cf82'], [114, 30, '#c9a6ff'], [144, 24, '#ff8a5c']]
    for (const [sx, w, c] of shops) {
      P(sx, 12, w, 34, INK); P(sx + 1, 13, w - 2, 33, c)
      P(sx + 1, 13, w - 2, 2, 'rgba(255,255,255,0.3)')
      for (let wx = sx + 4; wx < sx + w - 5; wx += 8) { P(wx, 18, 5, 6, '#1b1236'); P(wx + 1, 19, 3, 4, '#ffe9b8') }
      P(sx + 3, 30, w - 6, 3, '#1b1236'); for (let k = 0; k < w - 6; k += 4) P(sx + 3 + k, 30, 2, 3, '#efe6d6')   // awning
    }
    // bunting across the street
    for (let i = 0; i < LW; i += 6) { const y = 8 + Math.round(Math.sin(i / LW * Math.PI) * 4); P(i, y, 5, 1, INK); P(i + 1, y + 1, 3, 2, ['#e8344e', '#f2c75c', '#46cf82', '#7fe0ff', '#ff8fb1'][(i / 6) % 5]); P(i + 2, y + 3, 1, 1, ['#e8344e', '#f2c75c', '#46cf82', '#7fe0ff', '#ff8fb1'][(i / 6) % 5]) }
    // sidewalk behind the barricade (the crowd is drawn live), then the barricade
    P(0, 46, LW, 6, '#4a4466')
    P(0, 50, LW, 4, '#efe6d6'); for (let i = 0; i < LW; i += 8) P(i, 50, 4, 4, '#e8344e'); P(0, 54, LW, 1, INK)
    // the parade lane
    for (let y = 55; y < 82; y++) P(0, y, LW, 1, y % 5 ? '#34304a' : '#38334f')
    for (let i = 4; i < LW; i += 16) P(i, 68, 8, 1, '#f2c75c')
    // our curb + sidewalk
    P(0, 82, LW, 2, '#9a96b0'); P(0, 84, LW, 1, INK)
    for (let y = 85; y < LH; y++) P(0, y, LW, 1, y % 7 ? '#7a7494' : '#6a6484')
    for (let i = 0; i < LW; i += 20) P(i, 85, 1, LH - 85, '#5e5878')
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *art cars.*', { top: 118, size: 100, accentSize: 156, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'Car *one.*', { top: 168, size: 112, accentSize: 164, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Car *two.*', { top: 168, size: 112, accentSize: 164, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'The *standoff.*', { top: 168, size: 112, accentSize: 164, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Play of | *the night.*', { top: 118, size: 104, accentSize: 156, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Tonight’s *deck.*', { top: 168, size: 108, accentSize: 160, at: T.h6, gap: 0.12, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Final *judging.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
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
  const ST_Y = LANE - 62                         // a star's centre when it walks in the lane
  const CLIP_LAND = { x: 500, y: CURB + 58 }
  function leoPos(pt, t) {
    if (t >= T.erupt) return { x: boxCar(t) - 190, y: ST_Y }
    if (pt < T.hop1) return { x: 350, y: CURB }
    if (pt < T.h2) { const h = prog(pt, T.hop1, T.hop1 + 0.4); return { x: lerp(350, 880, prog(pt, T.hop1, 8.5)), y: lerp(CURB, ST_Y, ease.outQuad(h)) - Math.sin(Math.PI * h) * 50 } }
    if (pt < T.cut1) { const k = ease.inOutQuad(prog(pt, ...T.reel)); return { x: lerp(880, 380, k), y: lerp(ST_Y, CURB, k) } }
    const tug = pt < T.bonk ? Math.sin((pt - T.h3) * 6) * 18 : 0
    if (pt < T.grab) return { x: 420 + tug, y: CURB - Math.max(0, tug) }
    return { x: lerp(420, 250, ease.inOutQuad(prog(pt, T.grab, T.grab + 0.5))), y: CURB }
  }
  function virgoPos(pt, t) {
    if (t >= T.erupt) return { x: boxCar(t) + 190, y: ST_Y }
    if (pt < T.cut1) return { x: 590, y: CURB }
    const tug = pt < T.bonk ? Math.sin((pt - T.h3) * 6) * 18 : 0
    return { x: 640 + tug, y: CURB }
  }
  /** Virgo's clipboard: held, flying (FWIP), on the ground face up (the sketch), held up again */
  function clipState(pt, t, vp) {
    if (t >= T.erupt) return { vis: false }
    if (pt < T.bonk) return { x: vp.x + 76, y: vp.y + 10, rot: 0.15, sketch: false, vis: true }
    const k = prog(pt, T.bonk, T.bonk + 0.7)
    if (k < 1) { const sx = vp.x + 76, sy = vp.y + 10; return { x: lerp(sx, CLIP_LAND.x, k), y: lerp(sy, CLIP_LAND.y, k) - Math.sin(Math.PI * k) * 220, rot: k * 9, sketch: k > 0.6, vis: true } }
    if (pt < T.grab + 0.3) return { ...CLIP_LAND, rot: 1.5708 * 0 + 0.1, flat: true, sketch: true, vis: true }
    return { x: vp.x + 76, y: vp.y - 20, rot: -0.1, sketch: true, vis: true }
  }
  function drawClip(c, sc = 1) {
    if (!c.vis) return
    x.save(); x.translate(c.x, c.y); x.rotate(c.rot); x.scale(sc, c.flat ? sc * 0.7 : sc)
    BLK(-32, -42, 64, 84, INK); BLK(-28, -38, 56, 76, '#a8743e'); BLK(-24, -30, 48, 64, '#fbf6ec'); BLK(-12, -44, 24, 10, INK); BLK(-9, -42, 18, 6, '#c9c1b4')
    if (c.sketch) { BLK(-18, -6, 36, 14, '#4a9df0'); BLK(-12, -14, 20, 8, '#4a9df0'); BLK(-14, 8, 8, 8, INK); BLK(8, 8, 8, 8, INK); BLK(-20, -22, 6, 6, '#f2c75c') }
    else for (let i = 0; i < 5; i++) BLK(-18, -22 + i * 11, 36 - (i % 2) * 10, 3, '#9a96b0')
    x.restore()
  }
  function drawCurbBox(bx, by, k = 1) {
    BLK(bx - 54, by - 70, 108, 74, INK); BLK(bx - 50, by - 66, 100, 66, '#c8955a'); BLK(bx - 50, by - 66, 100, 8, '#a8743e'); BLK(bx - 6, by - 66, 12, 66, '#e8c890')
  }
  function wheel(cx, cy, r, col, ang) {
    x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 5, 0, TAU2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, TAU2); x.fill()
    x.fillStyle = '#ffffff'; x.fillRect(cx + Math.cos(ang) * r * 0.5 - 3, cy + Math.sin(ang) * r * 0.5 - 3, 6, 6)
  }
  function carBody(cx, base, w, h, col, top) {
    BLK(cx - w / 2 - 6, base - h - 6, w + 12, h + 12, INK); BLK(cx - w / 2, base - h, w, h, col)
    BLK(cx - w * 0.28 - 6, base - h - 56, w * 0.56 + 12, 60, INK); BLK(cx - w * 0.28, base - h - 50, w * 0.56, 54, top)
    BLK(cx - w * 0.22, base - h - 42, w * 0.18, 32, '#9fd4ff'); BLK(cx + w * 0.04, base - h - 42, w * 0.18, 32, '#9fd4ff')
  }
  function drawDisco(cx, t) {
    const base = LANE, w = 300, h = 70
    carBody(cx, base - 22, w, h, '#b8b4c8', '#d8d4e8')
    for (let j = 0; j < 4; j++) for (let i = 0; i < 18; i++) { const on = (i + j + Math.floor(t * 8)) % 5 === 0; BLK(cx - w / 2 + 4 + i * 16.4, base - 22 - h + 4 + j * 16, 12, 12, on ? '#ffffff' : (i + j) % 2 ? '#9a96b0' : '#cfcbe0') }
    // the disco ball on the roof
    const by = base - 22 - h - 90
    BLK(cx - 2, by + 20, 4, 24, INK)
    x.fillStyle = INK; x.beginPath(); x.arc(cx, by, 30, 0, TAU2); x.fill(); x.fillStyle = '#d8d4e8'; x.beginPath(); x.arc(cx, by, 26, 0, TAU2); x.fill()
    for (let k = 0; k < 6; k++) { const a = t * 3 + k; BLK(cx + Math.cos(a) * 16 - 4, by + Math.sin(k * 1.7) * 14 - 4, 8, 8, '#ffffff') }
    for (let k = 0; k < 4; k++) { const a = t * 2 + k * 1.6; drawPixelStar(x, cx + Math.cos(a) * 70, by + Math.sin(a) * 30, 20, 1, ['#7fe0ff', '#ff8fb1', '#f2c75c', '#9cf08a'][k]) }
    for (const d of [-1, 1]) wheel(cx + d * 100, base - 14, 24, '#3a3656', t * 8)
  }
  function drawSnail(cx, t) {
    const base = LANE, w = 300, h = 60
    BLK(cx - w / 2 - 6, base - 22 - h - 6, w + 12, h + 12, INK); BLK(cx - w / 2, base - 22 - h, w, h, '#46cf82'); BLK(cx - w / 2, base - 22 - h, w, 8, '#7ef0a8')
    // the shell
    const sx = cx - 20, sy = base - 22 - h - 70
    for (const [r, c] of [[94, INK], [88, '#e8a84a'], [66, INK], [60, '#f2c75c'], [40, INK], [34, '#e8a84a'], [16, INK], [10, '#f2c75c']]) { x.fillStyle = c; x.beginPath(); x.arc(sx, sy + 20, r, Math.PI, TAU2); x.fill() }
    // eye stalks at the front
    for (const d of [0, 22]) { BLK(cx + w / 2 - 30 + d, base - 22 - h - 70, 6, 70, INK); BLK(cx + w / 2 - 28 + d, base - 22 - h - 68, 2, 68, '#46cf82'); x.fillStyle = INK; x.beginPath(); x.arc(cx + w / 2 - 27 + d, base - 22 - h - 76, 12, 0, TAU2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(cx + w / 2 - 27 + d, base - 22 - h - 76, 8, 0, TAU2); x.fill(); BLK(cx + w / 2 - 25 + d, base - 22 - h - 78, 4, 4, INK) }
    for (const d of [-1, 1]) wheel(cx + d * 100, base - 14, 24, '#3a3656', t * 6)
  }
  /** their cardboard art car: a box, bottle-cap wheels, Leo's paper mane, Virgo's neat stripes, a gold star; rosette on win */
  function drawBoxCar(cx, t, rosette) {
    const base = LANE, w = 220, h = 96
    BLK(cx - w / 2 - 6, base - 18 - h - 6, w + 12, h + 12, INK); BLK(cx - w / 2, base - 18 - h, w, h, '#c8955a')
    BLK(cx - w / 2, base - 18 - h, w, 10, '#a8743e'); BLK(cx - 4, base - 18 - h, 8, h, '#e8c890')                    // tape
    BLK(cx - w / 2, base - 18 - h * 0.45, w, 10, '#4a9df0'); BLK(cx - w / 2, base - 18 - h * 0.45 + 16, w, 6, '#4a9df0')   // Virgo's stripes
    // flaps
    BLK(cx - w / 2 - 6, base - 18 - h - 30, 60, 30, INK); BLK(cx - w / 2, base - 18 - h - 26, 50, 24, '#d8a86a')
    BLK(cx + w / 2 - 54, base - 18 - h - 30, 60, 30, INK); BLK(cx + w / 2 - 50, base - 18 - h - 26, 50, 24, '#d8a86a')
    // the paper mane at the front (Leo)
    for (let k = 0; k < 5; k++) { const y = base - 18 - h + 8 + k * 18; x.fillStyle = INK; x.beginPath(); x.moveTo(cx + w / 2, y - 8); x.lineTo(cx + w / 2 + 34 + Math.sin(t * 6 + k) * 4, y + 2); x.lineTo(cx + w / 2, y + 12); x.fill(); x.fillStyle = k % 2 ? '#ff8a3c' : '#f2c75c'; x.beginPath(); x.moveTo(cx + w / 2, y - 4); x.lineTo(cx + w / 2 + 26 + Math.sin(t * 6 + k) * 4, y + 2); x.lineTo(cx + w / 2, y + 8); x.fill() }
    drawPixelStar(x, cx - 50, base - 18 - h * 0.72, 40, 2, GOLD)
    for (const d of [-1, 1]) wheel(cx + d * 70, base - 12, 20, '#e8344e', t * 5)
    if (rosette > 0) {
      const k = easeOutBack(clamp(rosette), 2.4), rx = cx + 40, ry = base - 18 - h - 40
      x.save(); x.translate(rx, ry); x.scale(k, k)
      BLK(-10, 10, 8, 50, INK); BLK(4, 10, 8, 50, INK); BLK(-8, 12, 4, 46, '#e8344e'); BLK(6, 12, 4, 46, '#e8344e')
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU2; x.fillStyle = INK; x.beginPath(); x.arc(Math.cos(a) * 30, Math.sin(a) * 30, 14, 0, TAU2); x.fill() }
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU2; x.fillStyle = i % 2 ? GOLD : '#ffd95a'; x.beginPath(); x.arc(Math.cos(a) * 30, Math.sin(a) * 30, 10, 0, TAU2); x.fill() }
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 28, 0, TAU2); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, 24, 0, TAU2); x.fill()
      x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.fillText('♥', 0, 2)
      x.restore()
    }
  }
  function crowdLow(t) {
    const r = rng(5), cheer = t >= T.erupt && t < T.lesson ? 1 : t >= T.pins ? 1 : 0.3
    for (let i = 0; i < 40; i++) {
      const cx = Math.floor(i * 4.2 + r() * 2), col = ['#ff8fb1', '#7fe0ff', '#f2c75c', '#9cf08a', '#c9a6ff', '#ff8a5c', '#efe6d6'][i % 7]
      const j = Math.round(Math.max(0, Math.sin(t * (5 + r() * 3) + i)) * 2 * cheer)
      R(cx, 44 - j, 3, 3, col); R(cx, 47 - j, 3, 3, i % 2 ? '#3a3656' : '#4a4466')
      if (cheer > 0.5 && i % 3 === 0) R(cx + 1, 41 - j * 2, 1, 2, col)
    }
  }
  function playerState(t, pt, isL) {
    let mood = 'happy', look = [isL ? 1 : -1, 0], squash = 0, hops = [], blink
    if (pt >= T.h1 && pt < T.h2) { if (isL) { mood = pt > T.hop1 ? 'sparkle' : 'happy'; look = [1, 0]; hops = pt > T.hop1 ? Array.from({ length: 10 }, (_, i) => T.hop1 + 0.4 + i * BL) : [] } else { mood = pt > T.hop1 ? 'wide' : 'happy'; look = [1, -1] } }
    if (pt >= T.h2 && pt < T.cut1) { if (isL) { mood = pt < T.reel[1] ? 'wide' : 'neutral'; look = [1, -1] } else { mood = 'happy'; look = [0, 1] } }
    if (pt >= T.cut1 && pt < T.bonk) { mood = 'squint'; look = [isL ? 1 : -1, -1] }
    if (pt >= T.bonk && pt < T.laugh) { mood = 'wide'; look = [isL ? 1 : -1, 1] }
    if (pt >= T.laugh && t < T.erupt) { mood = 'happy'; look = [isL ? 1 : -1, pt < T.grab ? 1 : 0]; if (pt > T.grab + 0.6) mood = 'sparkle' }
    if (t >= T.erupt && t < T.deck) { mood = 'heart'; look = [isL ? 1 : -1, 0] }
    if (t >= T.deck) { mood = 'sparkle'; look = [0, 1] }
    if (t >= T.fin) { mood = t > T.pins ? 'heart' : 'happy'; look = [isL ? 1 : -1, -1] }
    hops = [...hops, T.h3 + 0.2]
    if (t >= T.erupt) hops = [...hops, T.erupt + 0.1, T.erupt + 0.6, T.pins + 0.1, ...(t < T.lesson ? Array.from({ length: 4 }, (_, i) => T.roll[0] + 0.3 + i * BL) : [])]
    return { mood, look, squash, hops, blink }
  }

  function picture(t) {
    const pt = picTime(t)
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(streetBG, 0, 0)
    crowdLow(pt)
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    if (t < T.erupt) {
      if (pt >= 3.95 && pt < 8.7) drawDisco(disco(pt), pt)
      if (pt >= 8.9 && pt < 13.5) drawSnail(snail(pt), pt)
    }
    if (t >= T.erupt) drawBoxCar(boxCar(t), t, t >= T.pins ? prog(t, T.pins, T.pins + 0.35) : 0)
    if (t >= T.deck && t < T.fin + 0.3) { const k = prog(t, T.deck, T.deck + 0.3) * (1 - prog(t, T.fin, T.fin + 0.3)); x.fillStyle = `rgba(10,6,26,${0.45 * k})`; x.fillRect(sx0, sy0, sw, sh) }
    const lp = leoPos(pt, t), vp = virgoPos(pt, t)
    // the box on the curb (there from frame 0), until Leo grabs it
    const grabbed = t < T.erupt && pt >= T.grab + 0.5
    if (t < T.erupt && !grabbed) drawCurbBox(190, CURB + 70)
    // the scarf: Virgo reels Leo back in
    if (t < T.erupt && pt >= T.reel[0] && pt < T.reel[1] + 0.2) { x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(vp.x - 40, vp.y); x.lineTo(lp.x + 30, lp.y + 10); x.stroke(); x.strokeStyle = PINK; x.lineWidth = 6; x.stroke() }
    // the tug: one scarf between them, pulled both ways
    if (t < T.erupt && pt >= T.cut1 && pt < T.bonk) { x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(lp.x + 40, lp.y + 10); x.quadraticCurveTo((lp.x + vp.x) / 2, lp.y + 10, vp.x - 40, vp.y + 10); x.stroke(); x.strokeStyle = PINK; x.lineWidth = 6; x.stroke() }
    for (const [isL, P] of [[false, vp], [true, lp]]) {
      const S = isL ? LEO : VIR, st = playerState(t, pt, isL)
      drawStarChar(x, P.x, P.y, STAR_S, pt, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: st.hops, blink: st.blink, seed: isL ? 4 : 9, glow: 0.7 })
    }
    if (grabbed) drawCurbBox(lp.x, lp.y - 82)
    const clip = clipState(pt, t, vp)
    drawClip(clip)
    if (t < T.rew[0]) teleTag(x, pt, T.bonk + 0.05, 'FWIP!', vp.x + 90, vp.y - 170, { size: 42, rot: 0.08, out: [T.bonk + 0.8, T.bonk + 1.0] })
    // tonight's deck
    if (t >= T.deck && t < T.fin + 0.3) {
      const o = 1 - prog(t, T.fin, T.fin + 0.3)
      ;[-1, 0, 1].forEach((d, i) => {
        const t0 = T.deal + i * 0.2, k = ease.outCubic(prog(t, t0, t0 + 0.3))
        if (k <= 0) return
        x.save(); x.globalAlpha = o
        miniCard(x, lerp(540, 540 + d * 150, k), lerp(SY(LH) + 120, SY(46), k), 116, { rot: d * 0.12 * k + Math.sin(t * 2 + i) * 0.02, k: 1 })
        x.restore()
      })
      teleTag(x, t, T.deal + 0.8, "TONIGHT'S DECK", 540, SY(18), { size: 34, rot: -0.04, out: [T.fin, T.fin + 0.25] })
    }
    if (t >= T.pins) {
      const k = t - T.pins, bx = boxCar(t)
      if (k < 1.6) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, dd = 60 + k * 160; x.save(); x.globalAlpha = 1 - prog(k, 1.0, 1.6); drawPixelStar(x, bx + Math.cos(a) * dd, LANE - 200 + Math.sin(a) * dd * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
      teleTag(x, t, T.pins + 0.15, 'BEST CAR ♥', 640, SY(28), { size: 46, rot: -0.06 })
    }
    return { pt, lp, vp, clip }
  }
  function scoreBug(t) {
    const kk = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (kk <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 74
    x.save(); x.translate(X, Y); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [[`${LEO.glyph}︎ LEO`, LEO.color, [[T.hop1, 'GO'], [T.reel[0], 'GO'], [T.bonk, '?'], [T.pins + 0.1, '♥']]], [`${VIR.glyph}︎ VIR`, VIR.color, [[T.hop1 + 0.3, 'NO'], [T.reel[0] + 0.2, 'NO'], [T.bonk, '?'], [T.pins + 0.1, '♥']]]]
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
          x.font = `700 ${m[1].length > 1 ? 17 : 22}px ${MONO}`; x.textAlign = 'center'; x.fillStyle = m[1] === '?' ? INK : '#ffffff'; x.fillText(m[1], 0, 1)
          x.restore()
        }
      })
    })
    x.restore()
  }
  function drawScreen(t) {
    const { sx0, sy0, sw, sh } = SCR
    x.save(); x.beginPath(); x.rect(sx0, sy0, sw, sh); x.clip()
    const { pt, lp, clip } = picture(t)
    const on = prog(t, T.live - 0.2, T.live + 0.1)
    if (on < 1) { const hh = sh * ease.outCubic(on); x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2) }
    const rew = inR(t, ...T.rew), rep = inR(t, T.rew[0], T.erupt)
    if (rep) {
      vhs(x, t, rew)
      replayBug(x, t, rew ? '◀◀ REWIND' : t >= T.slo[1] ? '❚❚ REPLAY' : '▶ REPLAY', !rew && t < T.slo[1])
      const o = [T.erupt - 0.3, T.erupt - 0.05]
      const held = pt >= T.grab + 0.5, bx = held ? lp.x : 190, by = held ? lp.y - 117 : CURB + 35
      teleCircle(x, t, T.c1, clip.x, clip.y, 64, 56, { seed: 1, out: o })
      teleCircle(x, t, T.c2, bx, by, 80, 56, { seed: 2, out: o })
      teleArrow(x, t, T.c2 + 0.35, clip.x - 50, clip.y - 70, bx + 60, by - 60, { out: o })
      teleTag(x, t, T.c1 + 0.3, 'A SKETCH', clip.x + 60, clip.y - 100, { size: 34, out: o })
      teleTag(x, t, T.c2 + 0.3, 'A BOX', bx, by - 90, { size: 36, rot: 0.06, out: o })
    } else if (t >= T.live && t < T.out[0]) {
      liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
      const pk = pop01(t, T.live + 0.25, 0.3, 2.2)
      if (pk > 0.01 && t < T.h1) { x.save(); x.translate(sx0 + sw - 316, sy0 + 76); x.scale(pk, pk); pill(x, 0, 0, 292, 38, PINK, 'ART CAR PARADE', INK, 22); x.restore() }
    }
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'LEO ♥ VIRGO · THE BOX CAR', { out: T.h5Out })
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

// the one card cut (cardfx.js plays a single cut, the middle candidate): 13.5, into the standoff. The end card has none.

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
const horn = (t0, f = 392) => [['chip', +t0.toFixed(3), f, 0.22, { duty: 0.5, gain: 0.024, decay: 0.2, sustain: 0.7, ...FXO }], ['chip', +(t0 + 0.26).toFixed(3), f * 1.26, 0.3, { duty: 0.5, gain: 0.024, decay: 0.28, sustain: 0.7, ...FXO }]]
const cheer = (t0, t1, seed) => claps(t0, t1, seed).map(c => [c[0], c[1], { ...c[2], gain: c[2].gain * 0.6 }])
const ALL_CUES = [
  // 0 · welcome (everything is already on screen at frame 0: one hit on the first frame)
  ['pop', 0.02, 1046.5, 0.05, 0], ['pluck', 0.02, 1046.5, 0.04, 0.6, 0], ['tick', 0.03, 0.05], ['bell', 0.06, 1568, 0.022, 0.8, 0], ['pop', 0.1, 988, 0.025, 0.4],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · car one: the disco car; Leo hops in
  ...wordPops(T.h1, 2, 0.12, 1), ...horn(4.3), ['glitter', 4.6, 6.0], ['pop', T.hop1, 660, 0.04, -0.3], ['whoosh', T.hop1, 0.3, 0.02],
  ...cheer(5.0, 6.4, 5), ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · car two: reeled back in; the snail
  ...wordPops(T.h2, 2, 0.12, 3), ['chip', T.reel[0], 900, 0.7, { wave: 'tri', slide: -10, gain: 0.02, decay: 0.6, sustain: 0.6, ...FXO }], ['pop', T.reel[1], 196, 0.05, 0],
  ...horn(10.6, 262), ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · the standoff
  ...wordPops(T.h3, 1, 0.08, 2), ['pop', T.h3Land, 1046.5, 0.05, 0], ['pluck', T.h3Land, 1046.5, 0.04, 0.6, 0],
  ...[0, 1, 2].map(i => ['chip', +(13.75 + i * 0.32).toFixed(3), 300 + i * 40, 0.16, { wave: 'tri', slide: 6, gain: 0.02, decay: 0.15, sustain: 0.5, ...FXO }]),
  ['whoosh', T.bonk, 0.5, 0.03], ['chip', T.bonk, 1200, 0.4, { wave: 'noise', slide: 20, gain: 0.03, decay: 0.35, sustain: 0.4, ...FXO }], ['tick', T.bonk + 0.7, 0.05],
  ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06],
  ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0], ['pop', T.grab + 0.5, 523.25, 0.03, 0.3],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ...[T.c1, T.c2].flatMap((c, i) => [['chip', c, 2600, 0.32, { wave: 'noise', slide: 4, gain: 0.014, decay: 0.3, sustain: 0.6, ...FXO }], ['pop', c + 0.32, NOTE[(i * 2 + 3) % 7], 0.035, i ? 0.3 : -0.3]]),
  ['whoosh', T.c2 + 0.35, 0.3, 0.02], ['tick', T.slo[1], 0.05],
  ['tick', T.stat4[0], 0.04], ['pop', T.stat4[0] + 0.05, 1318.5, 0.025, 0],
  // 5 · play of the night: the box car rolls in
  ['swell', T.erupt - 0.7, T.erupt, { gain: 0.05, f0: 600, f1: 4000 }], ['boom', T.erupt + 0.27, 0.22], ['glitter', T.erupt, T.erupt + 0.8],
  ['brass', T.erupt + 0.27, [523.25, 659.25, 783.99], 0.6, { gain: 0.05, bright: 1.4, rev: 0.2, bus: 'fx' }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.erupt + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ...claps(T.erupt + 0.1, T.erupt + 2.4, 11), ...horn(T.erupt + 1.2, 523.25),
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · tonight's deck
  ...wordPops(T.h6, 2, 0.12, 2), ...[0, 1, 2].flatMap(i => [['tick', pt(T.deal, i * 0.2 + 0.25), 0.05], ['pop', pt(T.deal, i * 0.2 + 0.28), NOTE[(i * 2) % 7], 0.03, -0.3 + i * 0.3]]),
  ['bell', T.deal + 0.8, 1318.5, 0.03, 1.2, 0], ['tick', T.stat6[0], 0.04], ['pop', T.stat6[0] + 0.05, 1318.5, 0.025, 0],
  // 8 · final judging: the rosette
  ...head(T.h7, 1, T.h7Land, 0), ['swell', T.pins - 0.6, T.pins, { gain: 0.03, f0: 800, f1: 3000 }],
  ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1568, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.6, 23),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = ALL_CUES.filter(c => c[1] >= 0)
