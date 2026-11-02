// hxfarmers — DATE NIGHT RECAP: "The Farmers Market Date." (45 s vertical Align ad, Star Talk: Houston, music: lofi in C).
// The sxrecapbowl sportscast booth: ♊ GEMINI + ♐ SAG in headsets at the DATE NIGHT RECAP desk call a date like a big game on
// the STAR CAM jumbotron. ♑ CAPRICORN (has a list) and ♓ PISCES (adopts every vegetable) at a Saturday farmers market.
// The show's own ♓ Pisces fan sits on the jumbotron with a pennant, crying, as always. Story 0–40.6, then the end card.
//   0.00–3.85   "Date night: | *farmers market.*"  GEMINI: "Live from the Saturday market!"  Stalls, canopies, LIVE.
//   3.95–8.55   "The *list.*"  Capricorn unrolls a list… and it keeps unrolling, down to the ground.
//               SAG: "Capricorn's list is laminated."  STAT: CAPRICORN: ON SCHEDULE.  (scorebug: CAP OK · PIS ♥)
//   8.7–13.4    "The *adoptions.*"  Pisces picks up a two-legged carrot, a lumpy tomato, a bumpy squash; each one gets a face.
//               GEMINI: "Pisces is adopting vegetables."  STAT: PISCES: VERY ATTACHED.
//  13.5        the one card cut (cardfx.js).
//  13.6–19.4   "The *checkout.*"  Capricorn checks the haul against the list: no match. The list snaps shut (SNAP). The booth gives
//               up: Gemini face-plants, Sag rolls its eyes. SAG: "Nothing on the list. Call it."  STAT: LIST: IGNORED.  Pisces: SOB!
//               (In the picture Capricorn picks up the carrot, smiles, and writes a new line. Nobody notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  REWIND, SLO-MO: the telestrator circles Capricorn's face (SMILING) and the list
//               (NEW PLAN). GEMINI: "Wait. Is Capricorn smiling?"  SAG: "New plan: ugly soup."  STAT: MENU: IMPROVISED.
//  25.04–27.8  "Play of | *the night.*"  PLAY OF THE NIGHT: one pot on a camp stove, the adopted vegetables bobbing in it.
//               GEMINI: "LOOKS ROUGH. SMELLS AMAZING!"
//  28.38–32.55 ★ LESSON UNLOCKED: "Imperfect is *delicious.*"
//  32.65–36.5  "Tonight's *deck.*"  Three cards deal over the stalls. SAG: "New deck tonight. Bring a spoon."
//  36.6–40.5   "Final *taste.*"  Two spoons, one taste, two hearts: DELICIOUS ♥. THE BOOTH: "Dinner's ugly. Love it."
// Rewatch bait: the two-legged carrot waves at the camera from Pisces' arms, and again from the pot.
// One canvas (sky + jumbotron + booth), a low-res market canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
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
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), CAP = signStar('capricorn')
export const KEY = 'C'
const { LW, LH, SCR } = GEO
const TAU2 = Math.PI * 2

// ── the timeline
const T = {
  black: [-1, -0.9],                                   // frame 0 is the thumbnail: everything is already in at t = 0
  monIn: -0.85, deskIn: -0.78, gemIn: -0.7, sagIn: -0.62, micIn: -0.56, pisIn: -0.45, live: -0.4,
  h0: -0.8, h0Land: -0.45, h0Out: [3.65, 3.85], l0: 0.85, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], loop1: [4.2, 7.4], l1: 5.5, close1: 8.55, stat1: [6.6, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], loop2: [9.0, 12.6], adopt: [9.1, 10.2, 11.3], l2: 9.9, close2: 13.3, stat2: [11.8, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], check: [13.8, 14.6], bonk: 14.7, laugh: 15.35, pick: 15.6, write: 16.2,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.6, close4: 24.85,
  c1: 22.25, c2: 22.55, stat4: [23.6, 24.95],
  erupt: BEAT(44), h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,                    // 25.04
  lesson: BEAT(50), lessonOut: [32.35, 32.55],                                         // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], deal: 33.0, l7: 33.1, close6: 36.45, stat6: [33.6, 36.5],
  fin: 36.6, h7: 36.6, h7Land: 36.95, spoon: [37.4, 38.2], pins: 38.4, l8: 37.0, close7: 40.0, out: [40.05, 40.5],
}
// the replay maps the picture back onto the checkout, slowed down
const SLO = [14.4, 16.9]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Live from the *Saturday market!*' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'Capricorn’s list is *laminated.*' },
  { t: T.l2, speaker: GT, color: GC, text: 'Pisces is *adopting* vegetables.' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'Nothing on the list. *Call it.*' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Is Capricorn *smiling?*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'New plan: *ugly soup.*' },
  { t: T.l6, speaker: GT, color: GC, text: 'LOOKS ROUGH. *SMELLS AMAZING!*' },
  { t: T.l7, speaker: ST, color: SCOL, text: 'New deck tonight. *Bring a spoon.*' },
  { t: T.l8, speaker: BT, color: PINK, text: 'Dinner’s *ugly.* Love it.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES, LT })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Imperfect is *delicious.*', chip: 'BONUS: SECONDS' }

const STATS = [[...T.stat1, 'CAPRICORN: ON SCHEDULE'], [...T.stat2, 'PISCES: VERY ATTACHED'], [...T.stat3, 'LIST: IGNORED'], [...T.stat4, 'MENU: IMPROVISED'], [...T.stat6, 'NEXT DINNER: TONIGHT']]
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b

// ── the market (low-res): three stalls with striped canopies; our path in front
const PY = SY(84)                     // the stars' centre line (full-res)
const STAR_S = 150
const CAPX = 330, PISX = 730

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 27px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }
  // ── bake the static market once: a warm evening sky, trees, three stalls with striped canopies and produce, the path
  const marketBG = document.createElement('canvas'); marketBG.width = LW; marketBG.height = LH
  {
    const b = marketBG.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    ;['#5a4a8a', '#7a5a96', '#a86a96', '#d88a8e', '#f0a888', '#f6c494'].forEach((c, i) => P(0, i * 4, LW, 4, c))
    const r = rng(23)
    for (let i = -4; i < LW + 4; i += 6) { const h = 8 + Math.floor(r() * 8); P(i, 34 - h, 8, h, i % 2 ? '#3a5a3e' : '#446a46'); P(i + 2, 34 - h - 1, 4, 1, '#5a8a52') }
    P(0, 34, LW, 30, '#c9b48a')                       // the lot behind the stalls
    const stalls = [[4, '#e8344e'], [58, '#46cf82'], [112, '#4a9df0']]
    const PROD = ['#ff8a3c', '#e8344e', '#ffd95a', '#46cf82', '#8a4ab8', '#f4efe4']
    for (const [sx, c] of stalls) {
      const w = 52
      P(sx + 2, 22, 2, 34, INK); P(sx + w - 4, 22, 2, 34, INK)                            // poles
      P(sx - 1, 13, w + 2, 11, INK); for (let k = 0; k < w; k += 6) { P(sx + k, 14, 3, 9, c); P(sx + k + 3, 14, 3, 9, '#fbf6ec') }
      for (let k = 0; k < w; k += 6) { P(sx + k, 23, 3, 2, c); P(sx + k + 1, 25, 1, 1, c) }                                   // scallops
      P(sx, 46, w, 2, '#8a5a2e'); P(sx, 48, w, 10, '#a8743e'); P(sx, 48, w, 1, '#c99556')   // table + cloth
      for (let k = 0; k < 4; k++) { const cx = sx + 4 + k * 12; P(cx, 40, 10, 6, '#6a4a2e'); for (let q = 0; q < 6; q++) P(cx + 1 + (q % 3) * 3, 39 + Math.floor(q / 3) * 2, 2, 2, PROD[(k + Math.floor(sx / 50)) % PROD.length]) }
    }
    // the path + grass edges
    for (let y = 58; y < LH; y++) P(0, y, LW, 1, y % 6 ? '#d8c8a0' : '#cdbb92')
    for (let i = 0; i < 90; i++) P(Math.floor(r() * LW), 60 + Math.floor(r() * 50), 1, 1, '#b8a47c')
    P(0, 58, LW, 2, '#7a9a5a')
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *farmers market.*', { top: 118, size: 100, accentSize: 128, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'The *list.*', { top: 168, size: 112, accentSize: 164, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'The *adoptions.*', { top: 168, size: 112, accentSize: 150, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'The *checkout.*', { top: 168, size: 112, accentSize: 156, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Play of | *the night.*', { top: 118, size: 104, accentSize: 156, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Tonight’s *deck.*', { top: 168, size: 108, accentSize: 160, at: T.h6, gap: 0.12, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Final *taste.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
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
  const VEG_HOME = [[SX(70), SY(46)], [SX(86), SY(46)], [SX(128), SY(46)]]       // on the stall tables: carrot, tomato, squash
  const POT = { x: 540, y: PY + 46 }
  /** one wonky vegetable (bottom-centre X, Y); face = googly eyes; wave = the carrot's little leaf-arm wave */
  function veg(kind, X, Y, face, t, wave = 0) {
    x.save(); x.translate(Math.round(X), Math.round(Y))
    const C = 6
    if (kind === 0) {           // the two-legged carrot
      BLK(-3 * C, -10 * C, 6 * C, 8 * C, INK); BLK(-2 * C, -10 * C + C, 4 * C, 7 * C, '#ff8a3c')
      BLK(-3 * C, -2 * C, 2 * C, 2 * C, INK); BLK(C, -2 * C, 2 * C, 2 * C, INK); BLK(-2.5 * C, -2 * C, C, 1.5 * C, '#ff8a3c'); BLK(1.5 * C, -2 * C, C, 1.5 * C, '#ff8a3c')
      BLK(-2 * C, -13 * C, C, 3 * C, '#46cf82'); BLK(0, -14 * C, C, 4 * C, '#46cf82'); BLK(C, -12 * C + Math.round(-Math.sin(t * 12) * wave * 2) * C, C, 2 * C, '#46cf82')
      if (wave > 0) { const a = Math.sin(t * 12) * 0.6; x.save(); x.translate(2 * C, -7 * C); x.rotate(-0.8 + a); BLK(0, -C / 2, 3 * C, C, INK); x.restore() }
    } else if (kind === 1) {    // the lumpy tomato
      x.fillStyle = INK; x.beginPath(); x.arc(-C * 1.5, -4 * C, 4 * C, 0, TAU2); x.arc(C * 2, -3.6 * C, 3.6 * C, 0, TAU2); x.fill()
      x.fillStyle = '#e8344e'; x.beginPath(); x.arc(-C * 1.5, -4 * C, 3.3 * C, 0, TAU2); x.arc(C * 2, -3.6 * C, 2.9 * C, 0, TAU2); x.fill()
      BLK(-C, -9 * C, 3 * C, C, '#46cf82'); BLK(0, -10 * C, C, 2 * C, '#46cf82'); BLK(-C * 2.5, -5.5 * C, C, C, '#ff8fa0')
    } else {                    // the bumpy squash
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, -4 * C, 6 * C, 3.6 * C, 0.2, 0, TAU2); x.fill()
      x.fillStyle = '#ffd95a'; x.beginPath(); x.ellipse(0, -4 * C, 5.2 * C, 2.9 * C, 0.2, 0, TAU2); x.fill()
      for (const [bx, by] of [[-3, -5], [0, -3], [2, -6], [3, -3]]) BLK(bx * C, by * C, C, C, '#e8a84a')
      BLK(5 * C, -6 * C, 2 * C, C, '#46cf82')
    }
    if (face) { const ey = kind === 0 ? -7 * C : -4.5 * C; for (const d of [-1, 1]) { BLK(d * 1.2 * C - C, ey - C, 2 * C, 2 * C, '#ffffff'); BLK(d * 1.2 * C - C / 2 + Math.round(Math.sin(t * 2 + d)) * 2, ey - C / 2, C, C, INK) } }
    x.restore()
  }
  /** where veg i is: { x, y, face, wave, vis } */
  function vegState(i, pt, t) {
    if (t >= T.erupt) {
      const bob = Math.sin(t * 3 + i * 2) * 6, dx = (i - 1) * 46
      return { x: POT.x + dx, y: POT.y - 98 + bob, face: true, wave: i === 0 ? 1 : 0, vis: true, inPot: true }
    }
    const at = T.adopt[i]
    const pile = { x: PISX - 150 + i * 44, y: PY + 66 - (i === 1 ? 10 : 0) }
    if (pt < at) return { x: VEG_HOME[i][0], y: VEG_HOME[i][1], face: false, wave: 0, vis: true }
    const k = ease.inOutQuad(prog(pt, at, at + 0.45))
    let p = { x: lerp(VEG_HOME[i][0], pile.x, k), y: lerp(VEG_HOME[i][1], pile.y, k) - Math.sin(Math.PI * k) * 120, face: pt > at + 0.3, wave: i === 0 && pt > 12.6 ? 1 : 0, vis: true }
    if (i === 0 && pt >= T.pick) { const q = ease.inOutQuad(prog(pt, T.pick, T.pick + 0.4)); p = { ...p, x: lerp(pile.x, CAPX + 70, q), y: lerp(pile.y, PY + 20, q) - Math.sin(Math.PI * q) * 60, wave: 1 } }
    return p
  }
  /** Capricorn's list: unrolled length (px) */
  function listLen(pt, t) {
    if (t >= T.erupt) return 0
    if (pt < T.loop1[0]) return 30
    if (pt < T.bonk) return lerp(30, 330, ease.outQuad(prog(pt, ...T.loop1)))
    if (pt < T.write) return lerp(330, 0, prog(pt, T.bonk, T.bonk + 0.15))
    return lerp(0, 110, ease.outQuad(prog(pt, T.write, T.write + 0.4)))
  }
  function drawList(pt, t) {
    const L = listLen(pt, t)
    if (t >= T.erupt) return
    const lx = CAPX + 78, ly = PY - 36
    BLK(lx - 34, ly - 14, 68, 20, INK); BLK(lx - 30, ly - 10, 60, 12, '#efe6d6')            // the roll
    if (L > 2) {
      BLK(lx - 30, ly, 60, L + 4, INK); BLK(lx - 26, ly, 52, L, '#fbf6ec')
      const rows = Math.floor(L / 20)
      for (let i = 0; i < rows; i++) {
        const y = ly + 8 + i * 20
        if (pt >= T.write) { BLK(lx - 18, y, 36, 4, '#e8344e'); continue }          // the new line: ugly soup (a red scribble)
        BLK(lx - 20, y - 2, 8, 8, INK); BLK(lx - 18, y, 4, 4, '#fbf6ec'); BLK(lx - 8, y, 26 - (i % 3) * 5, 4, '#9a96b0')
        if (pt > T.loop1[0] + 0.5 + i * 0.25 && pt < T.bonk) { BLK(lx - 19, y + 1, 2, 2, '#46cf82'); BLK(lx - 17, y - 1, 2, 2, '#46cf82') }
      }
      if (t < T.erupt) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(lx - 24, ly + 2, 4, L - 4) }    // laminated shine
    }
  }
  function drawPot(t) {
    // camp stove + pot; the adopted vegetables bob in it; steam
    BLK(POT.x - 110, POT.y + 4, 220, 50, INK); BLK(POT.x - 104, POT.y + 8, 208, 40, '#6a6484'); BLK(POT.x - 60, POT.y - 4, 120, 10, '#ff8a3c')
    for (let i = 0; i < 5; i++) BLK(POT.x - 50 + i * 24, POT.y - 10 - Math.abs(Math.sin(t * 9 + i)) * 8, 10, 10, i % 2 ? '#ffd95a' : '#ff8a3c')
    for (let k = 0; k < 3; k++) vegState(k, t, t)
  }
  function potFront() {
    BLK(POT.x - 116, POT.y - 110, 232, 112, INK); BLK(POT.x - 110, POT.y - 104, 220, 100, '#3a3656'); BLK(POT.x - 110, POT.y - 104, 220, 10, '#5a5478')
    BLK(POT.x - 136, POT.y - 92, 24, 12, INK); BLK(POT.x + 112, POT.y - 92, 24, 12, INK)
    // the soup surface (a lumpy brown, honestly)
    BLK(POT.x - 104, POT.y - 112, 208, 12, '#8a5a2e'); BLK(POT.x - 80, POT.y - 116, 30, 6, '#6a4a2e'); BLK(POT.x + 30, POT.y - 115, 40, 6, '#a8743e')
  }
  function steam(t) {
    for (let i = 0; i < 6; i++) { const k = ((t * 0.6 + i / 6) % 1); x.globalAlpha = 0.5 * Math.sin(Math.PI * k); BLK(POT.x - 60 + i * 24 + Math.sin(t * 2 + i) * 10, POT.y - 140 - k * 120, 16, 16, '#efe6d6') }
    x.globalAlpha = 1
  }
  function playerState(t, pt, isC) {
    let mood = 'happy', look = [isC ? 1 : -1, 0], squash = 0, hops = [], blink
    if (pt >= T.loop1[0] && pt < T.h2) { if (isC) { mood = 'sparkle'; look = [1, 1] } else { mood = 'wide'; look = [-1, 1] } }
    if (pt >= T.h2 && pt < T.cut1) { if (isC) { mood = 'neutral'; look = [1, 0] } else { mood = 'heart'; look = [-1, -1]; hops = T.adopt.map(a => a + 0.4) } }
    if (pt >= T.cut1 && pt < T.bonk) { if (isC) { mood = 'squint'; look = [Math.sin(pt * 6) > 0 ? 1 : 0, 1] } else { mood = 'sparkle'; look = [-1, 0] } }
    if (pt >= T.bonk && pt < T.laugh) { mood = isC ? 'wide' : 'neutral'; look = [isC ? 1 : -1, 0] }
    if (pt >= T.laugh && t < T.erupt) { mood = 'happy'; look = isC ? [1, 1] : [-1, 0] }
    if (t >= T.erupt && t < T.deck) { mood = 'heart'; look = [isC ? 1 : -1, 1] }
    if (t >= T.deck) { mood = 'sparkle'; look = [0, 1] }
    if (t >= T.fin) { mood = t > T.pins ? 'heart' : 'squint'; look = [isC ? 1 : -1, 1] }
    hops = [...hops, T.h3 + 0.2]
    if (t >= T.erupt) hops = [...hops, T.erupt + 0.1, T.erupt + 0.6, T.pins + 0.1]
    return { mood, look, squash, hops, blink }
  }

  function picture(t) {
    const pt = picTime(t)
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(marketBG, 0, 0)
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    if (t >= T.deck && t < T.fin + 0.3) { const k = prog(t, T.deck, T.deck + 0.3) * (1 - prog(t, T.fin, T.fin + 0.3)); x.fillStyle = `rgba(10,6,26,${0.45 * k})`; x.fillRect(sx0, sy0, sw, sh) }
    const pos = [{ x: CAPX, y: PY }, { x: PISX, y: PY }]
    // vegetables still at home on the stall tables (behind the stars)
    for (let i = 0; i < 3; i++) { const v = vegState(i, pt, t); if (t < T.erupt && pt < T.adopt[i]) veg(i === 0 ? 0 : i, v.x, v.y, false, pt) }
    if (t >= T.erupt) { drawPot(t); steam(t) }
    for (const [isC, P] of [[true, pos[0]], [false, pos[1]]]) {
      const S = isC ? CAP : PIS, st = playerState(t, pt, isC)
      drawStarChar(x, P.x, P.y, STAR_S, pt, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: st.hops, blink: st.blink, seed: isC ? 4 : 9, glow: 0.7 })
      if (!isC && t < T.erupt && pt >= T.adopt[0]) inSprite(x, starFrame(P.x, P.y, STAR_S, pt, { hops: st.hops, seed: 9 }), () => tearsCells(x, pt, 1))
    }
    if (t >= T.erupt) {
      for (let i = 0; i < 3; i++) { const v = vegState(i, pt, t); veg(i, v.x, v.y, true, t, v.wave) }
      potFront()
      // spoons on the final taste
      if (t >= T.fin) for (const [d, P] of [[-1, pos[0]], [1, pos[1]]]) {
        const k = Math.sin(Math.PI * prog(t, ...T.spoon)), ex = lerp(P.x - d * 60, POT.x + d * 40, k), ey = lerp(PY + 10, POT.y - 120, k)
        x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(P.x - d * 50, PY + 20); x.lineTo(ex, ey); x.stroke(); x.strokeStyle = '#c9c1b4'; x.lineWidth = 6; x.stroke()
        BLK(ex - 12, ey - 8, 24, 16, INK); BLK(ex - 9, ey - 5, 18, 10, '#c9c1b4')
      }
    } else for (let i = 0; i < 3; i++) { const v = vegState(i, pt, t); if (pt >= T.adopt[i]) veg(i, v.x, v.y, v.face, pt, v.wave) }
    drawList(pt, t)
    // little hearts as each vegetable is adopted
    if (t < T.erupt) for (let i = 0; i < 3; i++) { const k = pt - T.adopt[i] - 0.4; if (k > 0 && k < 0.9) { x.globalAlpha = 1 - k / 0.9; drawPixelStar(x, PISX - 150 + i * 44, PY - 40 - k * 60, 26, 2, PINK); x.globalAlpha = 1 } }
    if (t < T.rew[0]) teleTag(x, pt, T.bonk, 'SNAP!', CAPX + 120, PY - 150, { size: 44, rot: 0.08, out: [T.bonk + 0.7, T.bonk + 0.9] })
    // tonight's deck
    if (t >= T.deck && t < T.fin + 0.3) {
      const o = 1 - prog(t, T.fin, T.fin + 0.3)
      ;[-1, 0, 1].forEach((d, i) => {
        const t0 = T.deal + i * 0.2, k = ease.outCubic(prog(t, t0, t0 + 0.3))
        if (k <= 0) return
        x.save(); x.globalAlpha = o
        miniCard(x, lerp(540, 540 + d * 150, k), lerp(SY(LH) + 120, SY(40), k), 116, { rot: d * 0.12 * k + Math.sin(t * 2 + i) * 0.02, k: 1 })
        x.restore()
      })
      teleTag(x, t, T.deal + 0.8, "TONIGHT'S DECK", 540, SY(12), { size: 34, rot: -0.04, out: [T.fin, T.fin + 0.25] })
    }
    if (t >= T.pins) {
      const k = t - T.pins
      if (k < 1.6) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, dd = 60 + k * 160; x.save(); x.globalAlpha = 1 - prog(k, 1.0, 1.6); drawPixelStar(x, POT.x + Math.cos(a) * dd, POT.y - 160 + Math.sin(a) * dd * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
      teleTag(x, t, T.pins + 0.15, 'DELICIOUS ♥', 640, SY(26), { size: 46, rot: -0.06 })
    }
    return { pt, pos }
  }
  function scoreBug(t) {
    const kk = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (kk <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 20
    x.save(); x.translate(X, Y); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [[`${CAP.glyph}︎ CAP`, CAP.color, [[5.0, 'OK'], [6.2, 'OK'], [T.bonk, '!'], [T.pins + 0.1, '♥']]], [`${PIS.glyph}︎ PIS`, PIS.color, [[T.adopt[0] + 0.4, '♥'], [T.adopt[1] + 0.4, '♥'], [T.adopt[2] + 0.4, '♥'], [T.pins + 0.1, '♥']]]]
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
          x.fillStyle = m[1] === '♥' ? PINK : m[1] === 'OK' ? MINT : RED; x.fillRect(-18, -16, 36, 32)
          x.font = `700 ${m[1].length > 1 ? 17 : 22}px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ffffff'; x.fillText(m[1], 0, 1)
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
      teleCircle(x, t, T.c1, pos[0].x, pos[0].y - 4, 72, 68, { seed: 1, out: o })
      teleCircle(x, t, T.c2, CAPX + 78, PY + 10, 56, 74, { seed: 2, out: o })
      teleArrow(x, t, T.c2 + 0.35, CAPX + 150, PY - 40, PISX - 80, PY - 40, { out: o })
      teleTag(x, t, T.c1 + 0.3, 'SMILING', pos[0].x - 10, pos[0].y - 120, { size: 36, out: o })
      teleTag(x, t, T.c2 + 0.3, 'NEW PLAN', CAPX + 120, PY + 100, { size: 34, rot: 0.06, out: o })
    } else if (t >= T.live && t < T.out[0]) {
      liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
      const pk = pop01(t, T.live + 0.25, 0.3, 2.2)
      if (pk > 0.01 && t < T.h1) { x.save(); x.translate(sx0 + sw - 336, sy0 + 76); x.scale(pk, pk); pill(x, 0, 0, 312, 38, MINT, 'SATURDAY MARKET', INK, 22); x.restore() }
    }
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'CAPRICORN ♥ PISCES · THE SOUP', { out: T.h5Out })
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

// the one card cut (cardfx.js plays a single cut, the middle candidate): 13.5, into the checkout. The end card has none.

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
const unroll = (t0, len) => Array.from({ length: Math.floor(len / 0.12) }, (_, i) => ['tick', +(t0 + i * 0.12).toFixed(3), 0.012 + 0.006 * (i % 2)])
const bubbles = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.18 + r() * 0.2) out.push(['pop', +t.toFixed(3), 300 + r() * 300, 0.012, r() * 0.8 - 0.4]); return out }
const ALL_CUES = [
  // 0 · welcome (everything is already on screen at frame 0: one hit on the first frame)
  ['pop', 0.02, 1046.5, 0.05, 0], ['pluck', 0.02, 1046.5, 0.04, 0.6, 0], ['tick', 0.03, 0.05], ['bell', 0.06, 1568, 0.022, 0.8, 0], ['pop', 0.1, 988, 0.025, 0.4],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · the list unrolls… and unrolls
  ...wordPops(T.h1, 2, 0.12, 1), ...unroll(T.loop1[0], T.loop1[1] - T.loop1[0]), ['chip', T.loop1[0], 700, T.loop1[1] - T.loop1[0], { wave: 'tri', slide: -6, gain: 0.01, decay: 3, sustain: 0.8, ...FXO }],
  ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · the adoptions
  ...wordPops(T.h2, 2, 0.12, 3), ...T.adopt.flatMap((a, i) => [['whoosh', a, 0.3, 0.016], ['pop', +(a + 0.45).toFixed(3), NOTE[(i * 2 + 2) % 7], 0.035, 0.3], ['bell', +(a + 0.5).toFixed(3), 1760, 0.016, 0.6, 0.3]]),
  ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · the checkout: SNAP
  ...wordPops(T.h3, 1, 0.08, 2), ['pop', T.h3Land, 1046.5, 0.05, 0], ['pluck', T.h3Land, 1046.5, 0.04, 0.6, 0],
  ['tick', T.check[0] + 0.2, 0.03], ['tick', T.check[0] + 0.5, 0.03],
  ['chip', T.bonk, 2400, 0.15, { wave: 'noise', slide: -20, gain: 0.04, decay: 0.12, sustain: 0.4, ...FXO }], ['pop', T.bonk + 0.12, 220, 0.06, 0], ['tick', T.bonk + 0.14, 0.05],
  ['pop', T.pick + 0.4, 784, 0.03, -0.3], ...unroll(T.write, 0.4),
  ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06],
  ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0],
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ...[T.c1, T.c2].flatMap((c, i) => [['chip', c, 2600, 0.32, { wave: 'noise', slide: 4, gain: 0.014, decay: 0.3, sustain: 0.6, ...FXO }], ['pop', c + 0.32, NOTE[(i * 2 + 3) % 7], 0.035, i ? 0.3 : -0.3]]),
  ['whoosh', T.c2 + 0.35, 0.3, 0.02], ['tick', T.slo[1], 0.05],
  ['tick', T.stat4[0], 0.04], ['pop', T.stat4[0] + 0.05, 1318.5, 0.025, 0],
  // 5 · play of the night: the soup
  ['swell', T.erupt - 0.7, T.erupt, { gain: 0.05, f0: 600, f1: 4000 }], ['boom', T.erupt + 0.27, 0.22], ['glitter', T.erupt, T.erupt + 0.8],
  ['brass', T.erupt + 0.27, [523.25, 659.25, 783.99], 0.6, { gain: 0.05, bright: 1.4, rev: 0.2, bus: 'fx' }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.erupt + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ...claps(T.erupt + 0.1, T.erupt + 2.4, 11), ...bubbles(T.erupt + 0.5, T.lesson - 0.2, 7),
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · tonight's deck
  ...wordPops(T.h6, 2, 0.12, 2), ...[0, 1, 2].flatMap(i => [['tick', pt(T.deal, i * 0.2 + 0.25), 0.05], ['pop', pt(T.deal, i * 0.2 + 0.28), NOTE[(i * 2) % 7], 0.03, -0.3 + i * 0.3]]),
  ['bell', T.deal + 0.8, 1318.5, 0.03, 1.2, 0], ['tick', T.stat6[0], 0.04], ['pop', T.stat6[0] + 0.05, 1318.5, 0.025, 0],
  // 8 · final taste
  ...head(T.h7, 1, T.h7Land, 0), ...bubbles(T.fin, T.pins, 9), ['tick', T.spoon[0] + 0.4, 0.04], ['tick', T.spoon[0] + 0.42, 0.04],
  ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1568, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.4, 23),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = ALL_CUES.filter(c => c[1] >= 0)
