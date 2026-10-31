// sxrecapbowl — DATE NIGHT RECAP: "The Bowling Date." (45 s vertical Align ad, Star Talk Shows #11, music: funk in C).
// A sportscast: THE BOOTH (♊ GEMINI + ♐ SAG in headsets, one mic, a desk) calls a date like a big game on a jumbotron.
// ♌ LEO and ♋ CANCER bowl on the jumbotron. ♓ Pisces sits on the jumbotron with a pennant, crying. Story 0–40.6, end card.
//   0.00–3.85   "Date night: | *bowling.*"  GEMINI: "Welcome to DATE NIGHT RECAP!"  The STAR CAM goes LIVE on the lane.
//   3.95–8.55   "Frame *one.*"  Leo winds up, rolls, and the ball drifts straight into the gutter. SAG: "Gutter ball. Brutal."
//               STAT: PINS: UNBOTHERED.  (scorebug: G)
//   8.7–13.4    "Frame *two.*"  Cancer's ball rolls… slower… and stops in the gutter, halfway. GEMINI: "Slow… slower… stopped."
//               STAT: BALL SPEED: SCENIC.
//  13.5        card cut.
//  13.6–19.4   "Frame three: | *together.*"  Both roll at once; the balls BONK in the middle and bounce into both gutters.
//               The booth gives up: Gemini face-plants on the desk, Sag rolls its eyes. SAG: "I've seen enough. Call it."
//               STAT: BOOTH MORALE: GONE.  Pisces: SOB!  (Up on the lane, the two stars are already laughing. Nobody notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  REWIND, then SLO-MO of the bonk; the telestrator circles both faces: they're
//               laughing. GEMINI: "Wait. Look at their faces."  SAG: "They're laughing."  STAT: LAUGHS: UNCOUNTABLE.
//  25.04–27.8  "Play of | *the night.*"  A gold PLAY OF THE NIGHT slab slams onto the jumbotron, the bulbs flash, confetti,
//               the booth jumps. GEMINI: "THAT'S THE HIGHLIGHT!"
//  27.9        card cut.
//  28.38–32.55 ★ LESSON UNLOCKED: "The stumble | is the *story.*"  +1 PLAY OF THE NIGHT
//  32.65–36.5  "Tonight's *deck.*"  Three cards deal onto the lane. SAG: "New deck tonight. Bring your worst throw."
//  36.6–40.5   "Final *call.*"  The pins all fall over by themselves. THE BOOTH: "And that's a strike for the heart."
// One canvas (sky + jumbotron + booth), a low-res lane canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
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
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), LEO = signStar('leo'), CAN = signStar('cancer')
export const KEY = 'C'
const { LW, LH, SCR } = GEO

// ── the timeline
const T = {
  black: [0, 0.25],
  monIn: 0.05, deskIn: 0.12, gemIn: 0.2, sagIn: 0.28, micIn: 0.34, pisIn: 0.45, live: 0.5,
  h0: 0.12, h0Land: 0.45, h0Out: [3.65, 3.85], l0: 0.95, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], wind1: 4.05, rel1: BEAT(7), pit1: 6.25, l1: 6.0, close1: 8.5, stat1: [6.35, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], wind2: 8.85, rel2: 9.2, stop2: 11.6, l2: 10.2, close2: 13.3, stat2: [11.7, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], wind3: 13.75, rel3: 14.1, bonk: 14.62, gut3: 15.1, laugh: 15.35,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.6, close4: 24.85,
  c1: 22.25, c2: 22.55, stat4: [23.6, 24.95],
  erupt: BEAT(44), h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,                    // 25.04
  cut2: 27.9,
  lesson: BEAT(50), lessonOut: [32.35, 32.55],                                         // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], deal: 33.0, l7: 33.1, close6: 36.45, stat6: [33.6, 36.5],
  fin: 36.6, h7: 36.6, h7Land: 36.95, pins: 37.55, l8: 36.75, close7: 40.0, out: [40.05, 40.5],
}
// the replay maps the picture back onto frame three, slowed down
const SLO = [14.55, 15.95]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Welcome to DATE NIGHT *RECAP!*' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'Gutter ball. *Brutal.*' },
  { t: T.l2, speaker: GT, color: GC, text: 'Slow… slower… *stopped.*' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'I’ve seen enough. *Call it.*' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Look at *their faces.*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'They’re… *laughing.*' },
  { t: T.l6, speaker: GT, color: GC, text: 'THAT’S THE *HIGHLIGHT!*' },
  { t: T.l7, speaker: ST, color: SCOL, text: 'New deck tonight. Bring *your worst throw.*' },
  { t: T.l8, speaker: BT, color: PINK, text: 'And that’s a *strike* for the heart.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'The stumble | is the *story.*', chip: '+1 PLAY OF THE NIGHT' }

const STATS = [[...T.stat1, 'PINS: UNBOTHERED'], [...T.stat2, 'BALL SPEED: SCENIC'], [...T.stat3, 'BOOTH MORALE: GONE'], [...T.stat4, 'LAUGHS: UNCOUNTABLE'], [...T.stat6, 'NEXT GAME: TONIGHT']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const smooth = x => ease.inOutQuad(clamp(x))

// ── the lane (low-res perspective)
const FAR = 38, NEAR = LH, LCX = 84
const hw = y => lerp(13, 62, (y - FAR) / (NEAR - FAR))
const laneXY = (u, lat) => { const y = lerp(106, FAR + 3, u); return [LCX + lat * hw(y), y, lerp(4.6, 1.4, u)] }
// the players on the jumbotron (full-res, inside the screen)
const LEOP = { x: SX(30), y: SY(86), s: 156 }, CANP = { x: SX(138), y: SY(86), s: 156 }

/** a ball's state at picture time pt: { u, lat, vis } or { held } */
function ballLeo(pt) {
  if (pt >= T.rel1 && pt < T.pit1 + 0.05) { const u = prog(pt, T.rel1, T.pit1); return { u, lat: lerp(-0.12, -1.2, smooth(u / 0.4)) } }
  if (pt >= T.rel3 && pt < 16.6) {
    const tb = T.bonk
    if (pt < tb) { const k = prog(pt, T.rel3, tb); return { u: 0.36 * k, lat: lerp(-0.5, -0.06, k) } }
    const k = prog(pt, tb, 16.6); return { u: 0.36 + 0.64 * k, lat: lerp(-0.06, -1.2, smooth(k / 0.28)) }
  }
  return { held: true }
}
function ballCan(pt) {
  if (pt >= T.rel2 && pt < T.cut1) { const u = 0.6 * ease.outQuad(prog(pt, T.rel2, T.stop2)); return { u, lat: lerp(0.25, 1.2, smooth((u - 0.06) / 0.3)) } }
  if (pt >= T.rel3 && pt < 16.6) {
    const tb = T.bonk
    if (pt < tb) { const k = prog(pt, T.rel3, tb); return { u: 0.36 * k, lat: lerp(0.5, 0.06, k) } }
    const k = prog(pt, tb, 16.6); return { u: 0.36 + 0.6 * k, lat: lerp(0.06, 1.2, smooth(k / 0.28)) }
  }
  return { held: true }
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

  // ── bake the static lane once
  const laneBG = document.createElement('canvas'); laneBG.width = LW; laneBG.height = LH
  {
    const b = laneBG.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    P(0, 0, LW, LH, '#1d1330')
    // back wall: stripes + a neon star + chevrons
    P(0, 0, LW, FAR - 12, '#2a1840'); for (let i = 0; i < LW; i += 12) P(i, 4, 6, 2, '#3c2558')
    P(0, FAR - 14, LW, 2, '#ff6fa0'); P(0, FAR - 12, LW, 1, '#7a2a50')
    // the pin deck (dark, lit from above)
    P(LCX - 18, FAR - 12, 36, 12, '#0e0a18'); P(LCX - 16, FAR - 11, 32, 1, '#5a4a70')
    // floor beyond the lane
    for (let y = FAR; y < LH; y++) { const w = hw(y); P(0, y, LW, 1, (y % 6 < 3) ? '#221838' : '#1e1532'); P(Math.round(LCX - w * 1.32), y, Math.round(w * 2.64), 1, '#151022') }
    // gutters + lane boards
    for (let y = FAR; y < LH; y++) {
      const w = hw(y), g = w * 0.16
      P(Math.round(LCX - w - g), y, Math.round(g), 1, '#3a3656'); P(Math.round(LCX + w), y, Math.round(g) + 1, 1, '#3a3656')
      for (let i = Math.round(LCX - w); i < Math.round(LCX + w); i++) {
        const bi = Math.floor((i - LCX) / w * 9 + 9)
        P(i, y, 1, 1, bi % 2 ? '#d9a868' : '#c99556')
      }
      // shine
      const sh = Math.round(LCX - w * 0.15); P(sh, y, Math.max(1, Math.round(w * 0.12)), 1, '#e8bd82')
    }
    // the arrows
    for (let k = -3; k <= 3; k++) { const y = 84 - Math.abs(k) * 2, w = hw(y); const ax = Math.round(LCX + k * w * 0.18); P(ax, y, 2, 2, '#8a5a2a'); P(ax, y - 1, 2, 1, '#6a3e1a') }
    // foul line
    { const y = 104, w = hw(y); P(Math.round(LCX - w), y, Math.round(2 * w), 1, '#2a1830') }
  }
  // the pins (back row first): positions on the deck
  const PINS = []
  ;[[4, FAR - 9], [3, FAR - 7], [2, FAR - 5], [1, FAR - 3]].forEach(([n, y]) => { for (let i = 0; i < n; i++) PINS.push([LCX + (i - (n - 1) / 2) * 6, y]) })
  function pins(fallK, wob = 0) {
    PINS.forEach(([px, py], i) => {
      const f = clamp(fallK * 1.6 - (i % 4) * 0.12 - Math.floor(i / 4) * 0.05)
      if (f < 0.5) {
        const wx = Math.round(Math.sin(i + wob * 30) * wob)
        R(px - 1 + wx, py - 6, 3, 7, INK); R(px + wx, py - 5, 1, 5, '#fbf6ec'); R(px - 1 + wx + 1, py - 5, 1, 5, '#ffffff'); R(px + wx, py - 4, 1, 1, RED); R(px - 1 + wx, py - 5, 1, 4, '#fbf6ec')
      } else {
        const d = i % 2 ? 1 : -1
        R(px - 3 + d, py - 2, 7, 3, INK); R(px - 2 + d, py - 1, 5, 1, '#fbf6ec'); R(px + d * 2, py - 1, 1, 1, RED)
      }
    })
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *bowling.*', { top: 118, size: 100, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'Frame *one.*', { top: 168, size: 112, accentSize: 164, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Frame *two.*', { top: 168, size: 112, accentSize: 164, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Frame three: | *together.*', { top: 118, size: 100, accentSize: 150, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 1.0 }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Play of | *the night.*', { top: 118, size: 104, accentSize: 156, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Tonight’s *deck.*', { top: 168, size: 108, accentSize: 160, at: T.h6, gap: 0.12, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Final *call.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
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
  function drawBall(u, lat, col, hi) {
    const [bx, by, r] = laneXY(u, lat)
    const X = SX(bx), Y = SY(by), rr = r * GEO.PS
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.beginPath(); x.ellipse(X, Y + rr * 0.8, rr, rr * 0.35, 0, 0, Math.PI * 2); x.fill()
    ballAt(X, Y, rr, col, hi, u * 9)
  }
  function ballAt(X, Y, rr, col, hi, spin = 0) {
    x.fillStyle = INK; x.beginPath(); x.arc(X, Y, rr + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(X, Y, rr, 0, Math.PI * 2); x.fill()
    x.fillStyle = hi; x.beginPath(); x.arc(X - rr * 0.35, Y - rr * 0.35, rr * 0.3, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK
    for (let k = 0; k < 3; k++) { const a = spin + k * 0.5; x.beginPath(); x.arc(X + Math.cos(a) * rr * 0.4, Y + Math.sin(a) * rr * 0.3 + rr * 0.1, Math.max(2, rr * 0.13), 0, Math.PI * 2); x.fill() }
  }
  function playerState(t, pt, who) {
    const isL = who === 'leo'
    let mood = 'happy', look = [isL ? 1 : -1, -1], squash = 0, dx = 0, hops = [], blink
    const wind = isL ? [T.wind1, T.rel1] : [T.wind2, T.rel2]
    // frame windups
    const wk = (a, b) => { const p = prog(pt, a, b); return p > 0 && p < 1 ? p : 0 }
    const w1 = wk(...wind), w3 = wk(T.wind3, T.rel3)
    const w = Math.max(w1, w3)
    if (w > 0) { squash = 0.18 * Math.sin(Math.PI * w); dx = (isL ? -1 : 1) * 18 * Math.sin(Math.PI * w); mood = 'squint' }
    hops = isL ? [T.rel1, T.rel3] : [T.rel2, T.rel3]
    if (pt < T.h1) { mood = 'happy'; look = [isL ? 1 : -1, 0] }
    // frame 1
    if (isL && pt >= T.rel1 && pt < T.h2) { mood = pt < 5.2 ? 'happy' : 'wide'; look = [0, -1] }
    if (!isL && pt >= T.h1 && pt < T.h2) { mood = 'neutral'; look = [-1, -1] }
    // frame 2
    if (!isL && pt >= T.rel2 && pt < T.cut1) { mood = pt < 10.2 ? 'happy' : pt < T.stop2 ? 'squint' : 'wide'; look = [0, -1] }
    if (isL && pt >= T.h2 && pt < T.cut1) { mood = pt < T.stop2 ? 'neutral' : 'wide'; look = [1, -1] }
    // frame 3: the bonk, then they turn to each other and crack up
    if (pt >= T.rel3 && pt < T.laugh) { mood = pt < T.bonk ? 'happy' : 'wide'; look = [0, -1] }
    if (pt >= T.laugh) { mood = 'happy'; look = [isL ? 1 : -1, 0]; const ph = (pt - T.laugh) % 0.36; squash = -0.08 * Math.sin(Math.PI * ph / 0.36) + 0.05 }
    if (pt >= T.bonk && pt < T.bonk + 0.4) squash += 0.2 * Math.exp(-(pt - T.bonk) * 8)
    // after the replay: hearts, then sparkle at the deck, then the last call
    if (t >= T.erupt && t < T.deck) { mood = 'heart'; look = [isL ? 1 : -1, 0] }
    if (t >= T.deck) { mood = 'sparkle'; look = [isL ? 1 : -1, 1] }
    if (t >= T.fin) { mood = t > T.pins ? 'heart' : 'happy'; look = [isL ? 1 : -1, 0] }
    if (t >= T.erupt) hops = [...hops, T.erupt + 0.1, T.erupt + 0.6, T.pins + 0.1]
    return { mood, look, squash, dx, hops, blink }
  }
  function drawPlayer(t, pt, who) {
    const isL = who === 'leo', P = isL ? LEOP : CANP, S = isL ? LEO : CAN
    const st = playerState(t, pt, who)
    let px = P.x + st.dx
    if (t >= T.fin) px = lerp(P.x, isL ? SX(58) : SX(110), ease.inOutQuad(prog(t, T.fin, T.fin + 0.6)))
    drawStarChar(x, px, P.y, P.s, pt, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: st.hops, seed: isL ? 4 : 9, glow: 0.7 })
    return px
  }

  function picture(t) {
    const pt = picTime(t)
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(laneBG, 0, 0)
    const fallK = t >= T.fin ? prog(t, T.pins, T.pins + 0.35) : 0
    const wob = pt >= 11.4 && pt < 12.2 ? 1 - prog(pt, 11.4, 12.2) : 0         // the pins flinch when the ball stops
    pins(fallK, wob * 0.6)
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    // the deck dims behind the cards
    if (t >= T.deck && t < T.fin + 0.3) { const k = prog(t, T.deck, T.deck + 0.3) * (1 - prog(t, T.fin, T.fin + 0.3)); x.fillStyle = `rgba(10,6,26,${0.55 * k})`; x.fillRect(sx0, sy0, sw, sh) }
    // balls (rolling ones are drawn over the players, so a gutter ball is never hidden)
    const bl = t < T.deck ? ballLeo(pt) : { held: true }, bc = t < T.deck ? ballCan(pt) : { held: true }
    // the bonk
    const bk = pt - T.bonk
    if (bk > 0 && bk < 0.7) {
      const [bx, by] = laneXY(0.36, 0)
      const p = ease.outCubic(bk / 0.7)
      x.save(); x.globalAlpha = 1 - ease.inQuad(bk / 0.7)
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.3; drawPixelStar(x, SX(bx) + Math.cos(a) * 90 * p, SY(by) + Math.sin(a) * 60 * p, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, i % 2 ? GOLD : BONE) }
      x.restore()
      teleTag(x, pt, T.bonk, 'BONK!', SX(bx), SY(by) - 70, { size: 44, rot: 0.1, out: [T.bonk + 0.5, T.bonk + 0.7] })
    }
    // the players
    const lx = drawPlayer(t, pt, 'leo'), cx = drawPlayer(t, pt, 'can')
    if (!bl.held) drawBall(bl.u, bl.lat, '#ff8a3c', '#ffd2a0')
    if (!bc.held) drawBall(bc.u, bc.lat, '#4a9df0', '#bfe4ff')
    if (bl.held) ballAt(lx + 62, LEOP.y + 40, 20, '#ff8a3c', '#ffd2a0', 0.5)
    if (bc.held) ballAt(cx - 62, CANP.y + 40, 20, '#4a9df0', '#bfe4ff', 2)
    // HA HA while they laugh (live: tiny; nobody in the booth notices)
    if (pt >= T.laugh && t < T.deck) {
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      for (let i = 0; i < 12; i++) {
        const t0 = T.laugh + i * 0.3, k = pt - t0
        if (k < 0 || k > 1.0) continue
        const side = i % 2 ? CANP.x : LEOP.x, cx2 = side + (i % 3 - 1) * 30, cy = LEOP.y - 100 - k * 70
        x.globalAlpha = Math.sin(Math.PI * k)
        x.lineWidth = 7; x.strokeStyle = INK; x.strokeText('HA', cx2, cy); x.fillStyle = i % 4 < 2 ? GOLD : PINK; x.fillText('HA', cx2, cy)
      }
      x.globalAlpha = 1
    }
    // tonight's deck
    if (t >= T.deck && t < T.fin + 0.3) {
      const o = 1 - prog(t, T.fin, T.fin + 0.3)
      ;[-1, 0, 1].forEach((d, i) => {
        const t0 = T.deal + i * 0.2, k = ease.outCubic(prog(t, t0, t0 + 0.3))
        if (k <= 0) return
        x.save(); x.globalAlpha = o
        miniCard(x, lerp(540, 540 + d * 150, k), lerp(SY(LH) + 120, SY(56), k), 120, { rot: d * 0.12 * k + Math.sin(t * 2 + i) * 0.02, k: 1 })
        x.restore()
      })
      teleTag(x, t, T.deal + 0.8, "TONIGHT'S DECK", 540, SY(20), { size: 34, rot: -0.04, out: [T.fin, T.fin + 0.25] })
    }
    // the strike: hearts out of the pins
    if (t >= T.pins) {
      const k = t - T.pins
      if (k < 1.6) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, d = 60 + k * 160; x.save(); x.globalAlpha = 1 - prog(k, 1.0, 1.6); drawPixelStar(x, SX(LCX) + Math.cos(a) * d, SY(FAR - 6) + Math.sin(a) * d * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
      teleTag(x, t, T.pins + 0.15, 'STRIKE ♥', SX(LCX), SY(FAR + 16), { size: 46, rot: -0.06 })
    }
    return pt
  }
  function scoreBug(t) {
    const k = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (k <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 20
    x.save(); x.translate(X, Y); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [[`${LEO.glyph}︎ LEO`, '#ff8a3c', [[6.1, 'G'], null, [15.2, 'G'], [T.pins + 0.1, '♥']]], [`${CAN.glyph}︎ CAN`, '#4a9df0', [null, [11.65, 'G'], [15.2, 'G'], [T.pins + 0.1, '♥']]]]
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
    // switch-on line
    picture(t)
    const on = prog(t, T.live - 0.2, T.live + 0.1)
    if (on < 1) { const hh = sh * ease.outCubic(on); x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2) }
    const rew = inR(t, ...T.rew), rep = inR(t, T.rew[0], T.erupt)
    if (rep) {
      vhs(x, t, rew)
      replayBug(x, t, rew ? '◀◀ REWIND' : t >= T.slo[1] ? '❚❚ REPLAY' : '▶ REPLAY', !rew && t < T.slo[1])
      // the telestrator: both faces circled, an arrow between, HA tags
      const o = [T.erupt - 0.3, T.erupt - 0.05]
      teleCircle(x, t, T.c1, LEOP.x, LEOP.y - 6, 100, 92, { seed: 1, out: o })
      teleCircle(x, t, T.c2, CANP.x, CANP.y - 6, 100, 92, { seed: 2, out: o })
      teleArrow(x, t, T.c2 + 0.35, LEOP.x + 90, LEOP.y - 130, CANP.x - 90, CANP.y - 130, { out: o })
      teleTag(x, t, T.c1 + 0.3, 'HA!', LEOP.x + 40, LEOP.y - 120, { size: 40, out: o })
      teleTag(x, t, T.c2 + 0.3, 'HA!', CANP.x - 40, CANP.y - 120, { size: 40, rot: 0.08, out: o })
    } else if (t >= T.live && t < T.out[0]) liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'LEO ♥ CANCER · FRAME THREE', { out: T.h5Out })
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
// 13.5 (→ frame three) and 27.9 (→ LESSON UNLOCKED). The end card flips at 40.6.
export const CUTS = [8.65, T.cut1, 19.45, T.cut2, T.deck]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1046.5, 0.05, 0], ['pluck', land, 1046.5, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const roll = (t0, len, g = 0.02) => [['chip', t0, 300, len, { wave: 'noise', slide: -2, gain: g, decay: len, sustain: 0.85, ...FXO }]]
const clunk = t0 => [['pop', t0, 110, 0.07, 0], ['tick', t0, 0.05]]
const womp = t0 => [['chip', t0, 392, 0.28, { wave: 'tri', slide: -8, gain: 0.03, decay: 0.25, sustain: 0.7, ...FXO }], ['chip', t0 + 0.3, 330, 0.6, { wave: 'tri', slide: -14, gain: 0.03, decay: 0.55, sustain: 0.7, ...FXO }]]
const scratch = t0 => [['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FXO }], ['chip', t0 + 0.09, 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FXO }]]
const sob = t0 => [0, 0.22, 0.44].map((d, i) => ['chip', +(t0 + d).toFixed(3), 880 - i * 60, 0.18, { duty: 0.25, slide: -6, vib: 0.05, gain: 0.016, decay: 0.15, sustain: 0.6, pan: 0.5, rev: 0.2, dly: 0, bus: 'fx' }])
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.11 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const pinCrash = t0 => Array.from({ length: 9 }, (_, i) => ['tick', +(t0 + i * 0.03 + (i % 3) * 0.01).toFixed(3), 0.06 - i * 0.004])
const pt = (t, a) => +(t + a).toFixed(3)
export const CUES = [
  // 0 · welcome
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['pop', T.monIn + 0.05, 262, 0.04, 0], ['pop', T.gemIn + 0.12, 784, 0.03, -0.3], ['pop', T.sagIn + 0.12, 659.25, 0.03, 0.3], ['pop', T.pisIn + 0.12, 988, 0.025, 0.4],
  ['tick', T.live, 0.05], ['bell', T.live + 0.05, 1568, 0.022, 0.8, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · frame one
  ...wordPops(T.h1, 2, 0.12, 1), ['whoosh', T.wind1, 0.35, 0.02], ['pop', T.rel1, 196, 0.05, -0.3], ...roll(T.rel1, T.pit1 - T.rel1), ...clunk(pt(T.rel1, 0.6)), ...clunk(T.pit1),
  ...womp(pt(T.pit1, 0.1)), ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · frame two
  ...wordPops(T.h2, 2, 0.12, 3), ['whoosh', T.wind2, 0.35, 0.02], ['pop', T.rel2, 220, 0.05, 0.3], ...roll(T.rel2, T.stop2 - T.rel2, 0.015), ...clunk(pt(T.rel2, 0.8)),
  ['chip', T.stop2, 1400, 0.4, { duty: 0.25, slide: 0, gain: 0.014, decay: 0.3, sustain: 0.4, ...FXO }], ['chip', T.stop2 + 0.4, 1600, 0.3, { duty: 0.25, gain: 0.012, decay: 0.2, sustain: 0.4, ...FXO }],   // crickets
  ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · frame three
  ...head(T.h3, 2, T.h3Land, 2), ['whoosh', T.wind3, 0.35, 0.02], ['pop', T.rel3, 196, 0.05, -0.3], ['pop', T.rel3 + 0.02, 220, 0.05, 0.3], ...roll(T.rel3, 0.55),
  ['boom', T.bonk, 0.22], ['pop', T.bonk, 330, 0.08, 0], ['pop', T.bonk + 0.05, 165, 0.06, 0], ['glitter', T.bonk, T.bonk + 0.5],
  ...clunk(T.gut3), ...clunk(T.gut3 + 0.05), ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06],
  ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ['pop', pt(T.slo[0], (T.bonk - SLO[0]) / (SLO[1] - SLO[0]) * (T.slo[1] - T.slo[0])), 110, 0.06, 0],
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
  // 8 · final call
  ...head(T.h7, 1, T.h7Land, 0), ...pinCrash(T.pins), ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1568, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.6, 23),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
