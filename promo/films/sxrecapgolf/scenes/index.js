// sxrecapgolf — DATE NIGHT RECAP: "The Mini-Golf Date." (45 s vertical Align ad, Star Talk Shows #13, music: chiptune in E).
// The same sportscast booth as sxrecapbowl / sxrecapcook: ♊ GEMINI + ♐ SAG in headsets at the DATE NIGHT RECAP desk,
// calling a date on the STAR CAM jumbotron. ♈ ARIES (very competitive) and ♎ LIBRA (does not care) play the windmill hole.
// ♓ Pisces sits on the jumbotron with a pennant, crying.
//   0.00–3.85   "Date night: | *mini-golf.*"  GEMINI: "Welcome to DATE NIGHT RECAP!"  A pixel course with a windmill goes LIVE.
//   3.95–8.55   "Hole *one.*"  Aries sinks it and runs a full victory lap. SAG: "Aries just did a victory lap."  STAT: ARIES:
//               VERY INTO THIS.
//   8.7–13.4    "Hole *two.*"  Libra's ball wanders off the green; Libra stops to smell a flower while Aries keeps score.
//               GEMINI: "Libra is… smelling a flower."  STAT: LIBRA: VIBING.
//  13.5        card cut.
//  13.6–19.4   "The *windmill.*"  Drumroll. Aries lines up the winning putt, sweats… and the ball BONKS off a blade. The booth
//               gives up (Gemini face-plants). SAG: "Aries choked. Call it."  STAT: WINDMILL: UNDEFEATED.  Pisces: SOB!
//               (On the jumbotron, Libra is laughing. Aries is smiling. Nobody in the booth notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  SLO-MO: the telestrator circles Aries peeking at Libra (PEEKS AT LIBRA), then the
//               ball aimed right at the blade (ON PURPOSE). GEMINI: "Wait. Did Aries look over?"  SAG: "Missed it… on purpose."
//  25.04–27.8  "Play of | *the night.*"  PLAY OF THE NIGHT slams on, bulbs flash, confetti. GEMINI: "ALL FOR THE LAUGH!"
//  27.9        card cut.
//  28.38–32.55 ★ LESSON UNLOCKED: "Win the *date,* | not the game."  +1 GOOD SPORT
//  32.65–36.5  "Push. *Pull.* Align."  Their reading on the jumbotron: two charts, the PUSH line draws.
//               SAG: "Push: only one of you keeps score."
//  36.6–40.5   "Final *putt.*"  Libra taps it without looking: straight through the windmill. HOLE IN ONE. Aries cheers loudest.
//               THE BOOTH: "Hole in one."
// One canvas (sky + jumbotron + booth), a low-res course canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, READING, drawWheelH, easeOutBack } from '../../wheel.js'
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
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), ARI = signStar('aries'), LIB = signStar('libra')
export const KEY = 'E'
const { LW, LH, SCR } = GEO

// ── the timeline (booth keys shared with sxrecapbowl: bonk = the blade, pins = the hole in one)
const T = {
  black: [0, 0.25],
  monIn: 0.05, deskIn: 0.12, gemIn: 0.2, sagIn: 0.28, micIn: 0.34, pisIn: 0.45, live: 0.5,
  h0: 0.12, h0Land: 0.45, h0Out: [3.65, 3.85], l0: 0.95, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], wind1: 4.05, rel1: BEAT(7), sink1: 5.45, lap: [5.6, 7.4], l1: 5.75, close1: 8.5, stat1: [6.35, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], wind2: 8.85, rel2: 9.2, stop2: 10.6, flower: 10.4, l2: 10.3, close2: 13.3, stat2: [11.0, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], crouch: 13.7, peek: [14.15, 14.5], rel3: 14.6, bonk: 14.95, back: 15.5, laugh: 15.3,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.4, close4: 24.85,
  c1: 20.55, c2: 21.75, stat4: [23.6, 24.95],
  erupt: BEAT(44), h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,                    // 25.04
  cut2: 27.9,
  lesson: BEAT(50), lessonOut: [32.4, 32.58],                                          // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], read: 32.7, pushT: 33.4, l7: 33.0, close6: 36.45, stat6: [33.8, 36.5],
  fin: 36.6, h7: 36.6, h7Land: 36.95, rel4: 36.85, pins: 37.25, l8: 37.4, close7: 40.0, out: [40.05, 40.5],
}
const SLO = [14.0, 15.9]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Welcome to DATE NIGHT *RECAP!*' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'Aries just did *a victory lap.*' },
  { t: T.l2, speaker: GT, color: GC, text: 'Libra is… *smelling a flower.*' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'Aries *choked.* Call it.' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Did Aries *look over?*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'Missed it… *on purpose.*' },
  { t: T.l6, speaker: GT, color: GC, text: 'ALL FOR *THE LAUGH!*' },
  { t: T.l7, speaker: ST, color: READING.push, text: 'Push: only one of you *keeps score.*' },
  { t: T.l8, speaker: BT, color: PINK, text: '*Hole* in one.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Win the *date,* | not the game.', chip: '+1 GOOD SPORT' }

const STATS = [[...T.stat1, 'ARIES: VERY INTO THIS'], [...T.stat2, 'LIBRA: VIBING'], [...T.stat3, 'WINDMILL: UNDEFEATED'], [...T.stat4, 'ARIES: SECRETLY SWEET'], [...T.stat6, 'ALIGN: YOU LAUGH TOGETHER']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const smooth = x => ease.inOutQuad(clamp(x))

// the course (low-res): the windmill at the back centre, its tunnel at the foot; cups for holes one and two
const MILL = { x: 84, y: 54 }, CUP1 = { x: 40, y: 64 }, TEE = { x: 84, y: 100 }
const ARIP = { x: SX(30), y: SY(86), s: 150 }, LIBP = { x: SX(138), y: SY(86), s: 150 }
const millAng = pt => pt * 1.6

/** the ball at picture time pt: [x, y] in low-res units, or null */
function ballAt(t, pt) {
  if (t >= T.deck && t < T.fin) return null
  if (t >= T.fin) {
    const k = prog(t, T.rel4, T.pins)
    if (t < T.rel4) return [TEE.x, TEE.y - 2]
    if (k < 1) return [TEE.x, lerp(TEE.y - 2, MILL.y + 4, ease.outQuad(k))]
    return null
  }
  if (pt < T.h2) {                                   // hole one: Aries sinks it
    if (pt < T.rel1) return [CUP1.x + 8, 100]
    const k = prog(pt, T.rel1, T.sink1)
    return k < 1 ? [lerp(CUP1.x + 8, CUP1.x, k), lerp(100, CUP1.y, ease.outQuad(k))] : null
  }
  if (pt < T.h3) {                                   // hole two: Libra's ball wanders off and stops in the rough
    if (pt < T.rel2) return [128, 100]
    const k = prog(pt, T.rel2, T.stop2)
    const a = ease.outQuad(k)
    return [lerp(128, 160, Math.min(1, a * 1.6)) - (a > 0.62 ? (a - 0.62) * 60 : 0), lerp(100, 74, a)]
  }
  // the windmill: Aries' putt goes straight at a blade, bonks, rolls back
  if (pt < T.rel3) return [TEE.x, TEE.y - 2]
  if (pt < T.bonk) return [TEE.x, lerp(TEE.y - 2, MILL.y + 10, prog(pt, T.rel3, T.bonk))]
  const k = prog(pt, T.bonk, T.back)
  return [TEE.x + k * 5, lerp(MILL.y + 10, TEE.y - 6, ease.outQuad(k))]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 27px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }

  // ── bake the static course once
  const bg = document.createElement('canvas'); bg.width = LW; bg.height = LH
  {
    const b = bg.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    P(0, 0, LW, 40, '#1b1846')
    for (const [sx, sy] of [[12, 6], [30, 14], [58, 4], [110, 9], [140, 5], [156, 18], [96, 20], [20, 26]]) P(sx, sy, 1, 1, '#ffffff')
    // far hedges + a fence
    for (let i = 0; i < LW; i += 8) P(i, 30 + ((i / 8) % 2), 8, 12, (i / 8) % 2 ? '#1f5a3a' : '#246840')
    // string lights
    for (let i = 2; i < LW; i += 7) { const y = 22 + Math.round(Math.sin(i / 14) * 3); P(i, y, 1, 1, '#3a3358') }
    // the green (stripes) with wooden rails
    for (let y = 42; y < LH; y++) P(0, y, LW, 1, Math.floor((y - 42) / 6) % 2 ? '#3fa860' : '#47b86a')
    P(0, 42, LW, 3, '#a0603a'); P(0, 42, LW, 1, '#c98a56')
    P(0, 42, 4, 70, '#a0603a'); P(LW - 4, 42, 4, 70, '#a0603a')
    // rocks + a little pond-free decoration: flower bed by the right rail
    for (const [rx, ry] of [[10, 80], [150, 96], [18, 104]]) { P(rx, ry, 6, 4, '#6a6a80'); P(rx + 1, ry, 4, 1, '#9a9ab0') }
    // the cup for hole one (a flag)
    P(CUP1.x - 3, CUP1.y - 1, 7, 3, '#0d2a18'); P(CUP1.x, CUP1.y - 16, 1, 16, '#efe6d6'); P(CUP1.x + 1, CUP1.y - 16, 7, 5, '#e8344e')
    // the windmill body
    const mx = MILL.x, my = MILL.y
    P(mx - 13, my - 26, 27, 30, INK); P(mx - 12, my - 25, 25, 28, '#c9a6ff'); P(mx - 12, my - 25, 4, 28, '#e0ccff'); P(mx + 8, my - 25, 5, 28, '#9a7be0')
    P(mx - 15, my - 30, 31, 6, INK); P(mx - 14, my - 29, 29, 4, '#e8344e'); P(mx - 10, my - 34, 21, 5, INK); P(mx - 9, my - 33, 19, 3, '#e8344e')
    P(mx - 3, my - 18, 6, 6, INK); P(mx - 2, my - 17, 4, 4, '#fff1b8')
    // the tunnel at the foot
    P(mx - 5, my - 6, 11, 10, INK); P(mx - 4, my - 5, 9, 9, '#05040c')
  }
  function blades(pt) {
    const mx = MILL.x, my = MILL.y - 24, a0 = millAng(pt)
    for (let k = 0; k < 4; k++) {
      const a = a0 + k * Math.PI / 2
      for (let r = 2; r < 22; r++) {
        const bx = mx + Math.cos(a) * r, by = my + Math.sin(a) * r
        R(bx - 1, by - 1, 3, 3, INK)
        const px = -Math.sin(a), py = Math.cos(a)
        if (r > 6) for (let w = 1; w < 5; w++) R(bx + px * w, by + py * w, 1, 1, (r + w) % 3 ? '#fbf6ec' : '#d8c7a0')
      }
    }
    R(mx - 2, my - 2, 5, 5, INK); R(mx - 1, my - 1, 3, 3, GOLD)
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *mini-golf.*', { top: 118, size: 100, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'Hole *one.*', { top: 168, size: 112, accentSize: 164, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Hole *two.*', { top: 168, size: 112, accentSize: 164, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'The *windmill.*', { top: 168, size: 108, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Play of | *the night.*', { top: 118, size: 104, accentSize: 156, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Push. *Pull.* Align.', { top: 172, size: 92, accentSize: 132, at: T.h6, gap: 0.16, wobble: true, accentColor: READING.pull }), T.h6Out],
    [popText(root, 'Final *putt.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
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
  function putter(px, py, hx, hy, swing = 0) {
    // a putter from the star's side (px, py) down to its head at (hx, hy); swing rotates it back
    x.save(); x.translate(px, py); x.rotate(swing)
    const dx = hx - px, dy = hy - py
    x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(dx, dy); x.stroke()
    x.strokeStyle = '#c9cede'; x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(dx, dy); x.stroke()
    x.fillStyle = INK; x.fillRect(dx - 26, dy - 9, 52, 20); x.fillStyle = '#8a90b0'; x.fillRect(dx - 22, dy - 5, 44, 12)
    x.fillStyle = '#e8344e'; x.fillRect(-7, -6, 14, 26)
    x.restore()
  }
  function golfBall(X, Y, r = 13) {
    x.fillStyle = 'rgba(0,0,0,0.3)'; x.beginPath(); x.ellipse(X, Y + r * 0.8, r, r * 0.35, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(X, Y, r + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(X, Y, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d8dce8'; x.fillRect(X - 2, Y + 3, 3, 3); x.fillRect(X + 4, Y - 2, 3, 3); x.fillRect(X - 6, Y - 4, 3, 3)
  }
  function ariesState(t, pt) {
    let mood = 'squint', look = [1, -1], squash = 0, dx = 0, dy = 0, hops = [T.rel1, T.sink1 + 0.05, T.rel3]
    if (pt < T.h1) { mood = 'happy'; look = [1, 0] }
    if (pt >= T.wind1 && pt < T.sink1) { mood = 'squint'; look = [0, -1] }
    if (pt >= T.sink1 && pt < T.h2) {
      mood = 'sparkle'; look = [0, 0]
      const k = prog(pt, ...T.lap)
      if (k > 0 && k < 1) { const a = k * Math.PI * 2; dx = (1 - Math.cos(a)) * 170; dy = -Math.abs(Math.sin(a)) * 80; squash = -0.1 * Math.abs(Math.sin(pt * 14)) }
      if (k >= 1) { mood = 'happy' }
    }
    if (pt >= T.h2 && pt < T.cut1) { mood = 'squint'; look = [1, 0] }
    if (pt >= T.h3) {
      mood = 'squint'; look = [0, -1]
      const w = prog(pt, T.crouch, T.rel3); if (w > 0 && w < 1) squash = 0.16 * Math.sin(Math.PI * Math.min(1, w * 1.3))
      if (inR(pt, ...T.peek)) { look = [1, 0]; mood = 'neutral' }
      if (pt >= T.rel3) { mood = pt < T.bonk ? 'neutral' : 'happy'; look = pt < T.laugh ? [0, -1] : [1, 0] }
    }
    if (t >= T.erupt && t < T.deck) { mood = 'sparkle'; look = [1, 0] }
    if (t >= T.fin) { mood = t >= T.pins ? 'heart' : 'happy'; look = [1, -1]; if (t >= T.pins) hops = [...hops, T.pins + 0.05, T.pins + 0.45, T.pins + 0.85] }
    return { mood, look, squash, dx, dy, hops }
  }
  function libraState(t, pt) {
    let mood = 'happy', look = [-1, 0], squash = 0, dx = 0, hops = [T.rel2]
    if (pt >= T.sink1 && pt < T.h2) { mood = 'happy'; look = [-1, 0]; hops = [T.sink1 + 0.3, T.sink1 + 0.7] }
    if (pt >= T.rel2 && pt < T.cut1) { mood = pt < T.flower ? 'neutral' : 'sparkle'; look = pt < T.flower ? [-1, -1] : [-1, 1] }
    if (pt >= T.h3) { mood = 'neutral'; look = [-1, 0] }
    if (pt >= T.laugh) { mood = 'happy'; look = [-1, 0]; const ph = (pt - T.laugh) % 0.36; squash = -0.08 * Math.sin(Math.PI * ph / 0.36) + 0.05 }
    if (t >= T.erupt && t < T.deck) { mood = 'heart' }
    if (t >= T.fin) { mood = t >= T.pins ? 'wide' : 'neutral'; look = t >= T.pins ? [0, -1] : [-1, 0]; if (t > T.pins + 0.6) mood = 'happy' }
    return { mood, look, squash, dx, hops }
  }
  function drawPlayers(t, pt) {
    const a = ariesState(t, pt), b = libraState(t, pt)
    const ax = ARIP.x + a.dx, ay = ARIP.y + a.dy
    let lx = LIBP.x
    if (t >= T.fin) lx = lerp(LIBP.x, SX(104), smooth(prog(t, T.fin, T.fin + 0.2)))
    // putters (the active player only)
    const ball = ballAt(t, pt)
    if (pt >= T.wind1 && pt < T.rel1 + 0.5 && pt < T.h2) putter(ax + 40, ay + 10, SX(CUP1.x + 8) + 20, SY(100), -0.25 * Math.sin(Math.PI * prog(pt, T.wind1, T.rel1)))
    if (pt >= T.wind2 && pt < T.rel2 + 0.5 && pt >= T.h2 && pt < T.cut1) putter(lx - 40, LIBP.y + 10, SX(128) + 20, SY(100), 0.2 * Math.sin(Math.PI * prog(pt, T.wind2, T.rel2)))
    if (pt >= T.crouch && pt < T.rel3 + 0.5 && t < T.erupt) putter(ax + 40, ay + 10, SX(TEE.x) - 24, SY(TEE.y - 2) + 12, -0.2 * Math.sin(Math.PI * prog(pt, T.rel3 - 0.5, T.rel3)))
    if (t >= T.fin && t < T.rel4 + 0.5) putter(lx - 40, LIBP.y + 10, SX(TEE.x) + 24, SY(TEE.y - 2) + 12, 0.15 * Math.sin(Math.PI * prog(t, T.fin + 0.1, T.rel4)))
    drawStarChar(x, ax, ay, ARIP.s, pt, { color: ARI.color, glyph: ARI.glyph, mood: a.mood, look: a.look, squash: a.squash, hops: a.hops, seed: 4, glow: 0.7 })
    drawStarChar(x, lx, LIBP.y, LIBP.s, pt, { color: LIB.color, glyph: LIB.glyph, mood: b.mood, look: b.look, squash: b.squash, hops: b.hops, seed: 9, glow: 0.7 })
    if (ball) golfBall(SX(ball[0]), SY(ball[1]), lerp(9, 14, prog(ball[1], 50, 100)))
    // Aries' sweat during the windmill putt
    if (inR(pt, T.crouch + 0.2, T.rel3) && t < T.erupt) { const ph = (pt * 1.4) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = INK; x.fillRect(ax + 60, ay - 70 + ph * 40, 16, 22); x.fillStyle = '#8fe3ff'; x.fillRect(ax + 62, ay - 68 + ph * 40, 12, 18); x.restore() }
    // the flower Libra stops to smell (hole two)
    if (pt >= T.flower - 0.3 && pt < T.cut1) {
      const k = pop01(pt, T.flower - 0.3, 0.3, 2.4) * 1.3, fx = lx - 100, fy = LIBP.y + 70
      x.save(); x.translate(fx, fy); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-4, -40, 8, 44); x.fillStyle = MINT; x.fillRect(-2, -38, 4, 40); x.fillRect(2, -18, 10, 5)
      for (const [px, py] of [[-12, -52], [0, -64], [12, -52], [0, -40]]) { x.fillStyle = INK; x.fillRect(px - 9, py - 9, 18, 18); x.fillStyle = PINK; x.fillRect(px - 7, py - 7, 14, 14) }
      x.fillStyle = GOLD; x.fillRect(-6, -58, 12, 12)
      x.restore()
    }
    // Aries' scorecard (hole two)
    if (pt >= T.rel2 && pt < T.cut1) {
      const k = pop01(pt, T.rel2, 0.3, 2.4)
      x.save(); x.translate(ax + 70, ay - 10); x.rotate(0.12); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-32, -42, 64, 84); x.fillStyle = '#fbf6ec'; x.fillRect(-28, -38, 56, 76); x.fillStyle = '#a0603a'; x.fillRect(-14, -46, 28, 10)
      x.fillStyle = '#9aa0c8'; for (let i = 0; i < 5; i++) x.fillRect(-22, -26 + i * 12, 44, 3)
      x.fillStyle = RED; x.fillRect(-22, -26, 18, 3)
      x.restore()
    }
    // HA HA while Libra laughs
    if (pt >= T.laugh && t < T.deck) {
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      for (let i = 0; i < 12; i++) {
        const t0 = T.laugh + i * 0.3, k = pt - t0
        if (k < 0 || k > 1.0) continue
        const cx2 = lx + (i % 3 - 1) * 34, cy = LIBP.y - 100 - k * 70
        x.globalAlpha = Math.sin(Math.PI * k)
        x.lineWidth = 7; x.strokeStyle = INK; x.strokeText('HA', cx2, cy); x.fillStyle = i % 2 ? GOLD : PINK; x.fillText('HA', cx2, cy)
      }
      x.globalAlpha = 1
    }
  }

  // the Push / Pull / Align reading on the jumbotron (from stmeetfriends), PUSH highlighted
  const D2R = Math.PI / 180
  function reading(t) {
    const { sx0, sy0, sw, sh } = SCR
    const k = easeOutBack(prog(t, T.read + 0.1, T.read + 0.6), 1.6) * (1 - ease.inCubic(prog(t, T.fin - 0.3, T.fin - 0.05)))
    x.fillStyle = '#0d0820'; x.fillRect(sx0, sy0, sw, sh)
    const g = x.createRadialGradient(540, 780, 30, 540, 780, 420); g.addColorStop(0, 'rgba(245,156,196,0.14)'); g.addColorStop(1, 'rgba(245,156,196,0)'); x.fillStyle = g; x.fillRect(sx0, sy0, sw, sh)
    if (k <= 0) return
    const CHA = { x: 345, y: 760 }, CHB = { x: 735, y: 760 }, S = 0.27, RD = 330 * S
    for (const [side, P] of [[0, CHA], [1, CHB]]) {
      x.save(); x.translate(P.x, P.y); x.rotate((side ? -1 : 1) * t * 0.05); x.scale(S * k, S * k); drawWheelH(x, { W: { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.92 }, k: clamp(k) }); x.restore()
      x.save(); x.globalAlpha = clamp(k); x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
      x.fillText(side ? 'LIBRA' : 'ARIES', P.x, P.y + 2); x.restore()
    }
    const LN = [
      { a: -60, b: -120, apex: 610, col: READING.push, label: 'PUSH', t: T.pushT, dim: false },
      { a: 50, b: 130, apex: 945, col: READING.pull, label: 'PULL', t: T.read + 0.55, dim: true },
      { a: -14, b: -166, apex: 700, col: READING.align, label: 'ALIGN', t: T.read + 0.75, dim: true },
    ]
    for (const L of LN) {
      const A_ = { x: CHA.x + Math.cos(L.a * D2R) * RD * k, y: CHA.y + Math.sin(L.a * D2R) * RD * k }
      const B_ = { x: CHB.x + Math.cos(L.b * D2R) * RD * k, y: CHB.y + Math.sin(L.b * D2R) * RD * k }
      const cX = (A_.x + B_.x) / 2, cY = 2 * L.apex - (A_.y + B_.y) / 2
      const lk = ease.inOutCubic(prog(t, L.t, L.t + 0.5)) * clamp(k)
      if (lk <= 0) continue
      const pulse = L.dim ? 1 : 1 + 0.5 * Math.exp(-Math.max(0, t - L.t - 0.5) * 3) + 0.12 * Math.sin(t * 6)
      x.save(); x.globalAlpha = clamp(k) * (L.dim ? 0.35 : 1); x.strokeStyle = L.col; x.lineCap = 'round'; x.lineWidth = (L.dim ? 5 : 11) * pulse; x.shadowColor = L.col; x.shadowBlur = L.dim ? 0 : 26
      x.beginPath(); x.moveTo(A_.x, A_.y)
      const N = 40
      for (let s = 1; s <= Math.round(N * lk); s++) { const u = s / N, v = 1 - u; x.lineTo(v * v * A_.x + 2 * v * u * cX + u * u * B_.x, v * v * A_.y + 2 * v * u * cY + u * u * B_.y) }
      x.stroke(); x.restore()
      const ck = easeOutBack(prog(t, L.t + 0.35, L.t + 0.65), 2.4) * clamp(k)
      if (ck > 0) {
        const ax = cX * 0.5 + (A_.x + B_.x) * 0.25, ay = 0.5 * cY + 0.25 * (A_.y + B_.y)
        const big = !L.dim
        x.save(); x.globalAlpha = L.dim ? 0.55 : 1; x.translate(ax, ay); x.scale(ck * (big ? 1.25 : 0.8), ck * (big ? 1.25 : 0.8))
        x.font = `700 30px ${MONO}`; const tw = x.measureText(L.label).width + 40
        x.fillStyle = 'rgba(14,8,32,0.94)'; x.fillRect(-tw / 2, -24, tw, 48); x.fillStyle = L.col; x.fillRect(-tw / 2, -24, tw, 4); x.fillRect(-tw / 2, 20, tw, 4)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.label, 0, 2); x.restore()
      }
    }
  }

  function picture(t) {
    const pt = picTime(t)
    if (t >= T.deck && t < T.fin) { reading(t); return pt }
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(bg, 0, 0)
    // the cup for hole two: none (Libra never got near it); the windmill blades spin
    blades(t >= T.fin ? t : pt)
    // the blade jolts on the bonk
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    drawPlayers(t, pt)
    teleTag(x, pt, T.sink1, 'PLINK.', SX(CUP1.x), SY(CUP1.y) - 110, { size: 36, rot: -0.08, out: [T.sink1 + 0.9, T.sink1 + 1.1] })
    teleTag(x, pt, T.bonk, 'BONK!', SX(MILL.x) + 110, SY(MILL.y) - 10, { size: 46, rot: 0.1, out: [T.bonk + 0.8, T.bonk + 1.0] })
    if (t >= T.pins) {
      const k = t - T.pins
      if (k < 1.6) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, d = 50 + k * 170; x.save(); x.globalAlpha = 1 - prog(k, 1.0, 1.6); drawPixelStar(x, SX(MILL.x) + Math.cos(a) * d, SY(MILL.y) + Math.sin(a) * d * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
      teleTag(x, t, T.pins + 0.1, 'HOLE IN ONE!', SX(MILL.x), SY(MILL.y) + 80, { size: 50, rot: -0.05 })
    }
    return pt
  }
  function scoreBug(t) {
    const k = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (k <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 20
    x.save(); x.translate(X, Y); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [[`${ARI.glyph}︎ ARI`, ARI.color, [[T.sink1 + 0.1, '✓', MINT], null, [T.bonk + 0.2, 'X', RED], [T.pins + 0.2, '♥', PINK]]], [`${LIB.glyph}︎ LIB`, LIB.color, [null, [T.stop2 + 0.1, '?', LAV], [T.laugh + 0.2, 'HA', GOLD], [T.pins + 0.1, '★', PINK]]]]
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
          x.fillStyle = m[2]; x.fillRect(-18, -16, 36, 32)
          x.font = `700 ${m[1].length > 1 ? 18 : 22}px ${MONO}`; x.textAlign = 'center'; x.fillStyle = m[2] === GOLD || m[2] === MINT ? INK : '#ffffff'; x.fillText(m[1], 0, 1)
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
      const o1 = [T.c2 - 0.25, T.c2]
      teleCircle(x, t, T.c1, ARIP.x, ARIP.y - 10, 95, 85, { seed: 1, out: o1 })
      teleArrow(x, t, T.c1 + 0.35, ARIP.x + 100, ARIP.y + 10, LIBP.x - 95, LIBP.y + 10, { out: o1 })
      teleTag(x, t, T.c1 + 0.55, 'PEEKS AT LIBRA', 540, ARIP.y + 85, { size: 34, out: o1 })
      teleCircle(x, t, T.c2, SX(MILL.x), SY(MILL.y) - 10, 120, 90, { seed: 2, out: o })
      teleTag(x, t, T.c2 + 0.35, 'ON PURPOSE', SX(MILL.x), SY(MILL.y) + 90, { size: 40, rot: 0.06, out: o })
    } else if (t >= T.live && t < T.out[0] && !inR(t, T.deck, T.fin)) liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'ARIES ♥ LIBRA · THE WINDMILL', { out: T.h5Out })
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
// 13.5 (→ the windmill) and 27.9 (→ LESSON UNLOCKED). The end card flips at 40.6.
export const CUTS = [8.65, T.cut1, 19.45, T.cut2, T.deck]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; chip notes are written in E)
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1318.51, 0.05, 0], ['pluck', land, 1318.51, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const tock = t0 => [['pop', t0, 1800, 0.045, 0], ['tick', t0, 0.05]]
const plink = t0 => [['chip', t0, 1975.5, 0.12, { duty: 0.25, gain: 0.02, decay: 0.1, sustain: 0.3, ...FXO }], ['chip', t0 + 0.1, 2637, 0.2, { duty: 0.25, gain: 0.018, decay: 0.18, sustain: 0.3, ...FXO }]]
const roll = (t0, len) => [['chip', t0, 2500, len, { wave: 'noise', slide: -2, gain: 0.008, decay: len, sustain: 0.8, ...FXO }]]
const scratch = t0 => [['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FXO }], ['chip', t0 + 0.09, 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FXO }]]
const sob = t0 => [0, 0.22, 0.44].map((d, i) => ['chip', +(t0 + d).toFixed(3), 880 - i * 60, 0.18, { duty: 0.25, slide: -6, vib: 0.05, gain: 0.016, decay: 0.15, sustain: 0.6, pan: 0.5, rev: 0.2, dly: 0, bus: 'fx' }])
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.11 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const drumroll = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.05) out.push(['tick', +t.toFixed(3), 0.02 + 0.03 * (t - t0) / (t1 - t0)]); return out }
const pt = (t, a) => +(t + a).toFixed(3)
export const CUES = [
  // 0 · welcome
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', T.h0Land, 1318.51, 0.05, 0], ['pluck', T.h0Land, 1318.51, 0.04, 0.6, 0],
  ['pop', T.monIn + 0.05, 330, 0.04, 0], ['pop', T.gemIn + 0.12, 784, 0.03, -0.3], ['pop', T.sagIn + 0.12, 659.25, 0.03, 0.3], ['pop', T.pisIn + 0.12, 988, 0.025, 0.4],
  ['tick', T.live, 0.05], ['bell', T.live + 0.05, 1318.51, 0.022, 0.8, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · hole one: in, then the victory lap
  ...wordPops(T.h1, 2, 0.12, 1), ['whoosh', T.wind1, 0.3, 0.02], ...tock(T.rel1), ...roll(T.rel1, T.sink1 - T.rel1), ...plink(T.sink1),
  ...Array.from({ length: 6 }, (_, i) => ['chip', pt(T.lap[0], i * 0.28), NOTE[[0, 2, 4, 2, 4, 5][i]], 0.2, { duty: 0.5, gain: 0.014, decay: 0.15, sustain: 0.5, ...FXO }]),
  ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · hole two: the wander, the flower
  ...wordPops(T.h2, 2, 0.12, 3), ...tock(T.rel2), ...roll(T.rel2, T.stop2 - T.rel2), ['tick', 9.9, 0.04],
  ['pop', T.flower, 1318.5, 0.03, 0.4], ['bell', T.flower + 0.1, 1975.5, 0.02, 1, 0.4], ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · the windmill
  ...head(T.h3, 1, T.h3Land, 2), ...drumroll(T.crouch, T.rel3), ...tock(T.rel3), ...roll(T.rel3, T.bonk - T.rel3),
  ['pop', T.bonk, 220, 0.08, 0], ['boom', T.bonk, 0.18], ['chip', T.bonk, 880, 0.3, { wave: 'tri', slide: -10, gain: 0.03, decay: 0.3, sustain: 0.5, ...FXO }],
  ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06], ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ...[T.c1, T.c2].flatMap((c, i) => [['chip', c, 2600, 0.32, { wave: 'noise', slide: 4, gain: 0.014, decay: 0.3, sustain: 0.6, ...FXO }], ['pop', c + 0.32, NOTE[(i * 2 + 3) % 7], 0.035, i ? 0.3 : -0.3]]),
  ['whoosh', T.c1 + 0.35, 0.3, 0.02], ['tick', T.slo[1], 0.05], ['tick', T.stat4[0], 0.04], ['pop', T.stat4[0] + 0.05, 1318.5, 0.025, 0],
  // 5 · play of the night
  ['swell', T.erupt - 0.7, T.erupt, { gain: 0.05, f0: 600, f1: 4000 }], ['boom', T.erupt + 0.27, 0.22], ['glitter', T.erupt, T.erupt + 0.8],
  ['brass', T.erupt + 0.27, [659.25, 830.61, 987.77], 0.6, { gain: 0.05, bright: 1.4, rev: 0.2, bus: 'fx' }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.erupt + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ...claps(T.erupt + 0.1, T.erupt + 2.4, 17),
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · the reading
  ['chip', T.read, 5000, 0.14, { wave: 'noise', gain: 0.02, decay: 0.1, sustain: 0.8, ...FXO }],
  ...wordPops(T.h6, 3, 0.16, 0, 0.03), ['whoosh', T.pushT, 0.5, 0.035], ['bell', T.pushT + 0.5, 1318.51, 0.035, 1.4, -0.2], ['glitter', T.pushT + 0.45, T.pushT + 1.0],
  ['tick', T.stat6[0], 0.04], ['pop', T.stat6[0] + 0.05, 1318.5, 0.025, 0],
  // 8 · the final putt
  ...head(T.h7, 1, T.h7Land, 0), ...tock(T.rel4), ...roll(T.rel4, T.pins - T.rel4), ...plink(T.pins),
  ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1975.5, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.8, 31),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
