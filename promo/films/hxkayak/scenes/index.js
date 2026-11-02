// hxkayak — DATE NIGHT RECAP: "The Kayak Date." (45 s vertical Align ad, Star Talk: Houston, music: cinematic in D).
// The sxrecapbowl sportscast booth: ♊ GEMINI + ♐ SAG in headsets at the DATE NIGHT RECAP desk call a date like a big game on
// the STAR CAM jumbotron. ♋ CANCER and ♏ SCORPIO share a tandem kayak on Buffalo Bayou, under the skyline at dusk. ♓ Pisces
// sits on the jumbotron with a pennant, crying. Story 0–40.6, then the end card.
//   0.00–3.85   "Date night: | *kayaking.*"  GEMINI: "Live from Buffalo Bayou, folks!"  The STAR CAM is LIVE on the water.
//   3.95–8.55   "Stroke *one.*"  Cancer paddles LEFT only, Scorpio paddles RIGHT only: the kayak turns one full circle on the
//               spot. SAG: "Left. Right. Around."  STAT: DIRECTION: YES.  (scorebug: CAN L · SCO R)
//   8.7–13.4    "Stroke *two.*"  Harder. Two spins, faster. GEMINI: "They're a ceiling fan now."  STAT: SPIN SPEED: CEILING FAN.
//  13.5        the one card cut (cardfx.js).
//  13.6–19.4   "The spin | *cycle.*"  Flat-out spinning, they drift into the reeds (BOINK). The heron on the bank looks away.
//               The booth gives up: Gemini face-plants, Sag rolls its eyes. SAG: "Pure chaos. Call it."  STAT: HERON:
//               UNIMPRESSED.  Pisces: SOB!  (In the kayak, they laugh, then start counting strokes. Nobody notices.)
//  19.45–24.95 "Hold on. | *Instant replay.*"  REWIND, SLO-MO: the telestrator circles them: IN… / …OUT. GEMINI: "Wait. Are they
//               counting?"  SAG: "In… out… they synced up."  STAT: RHYTHM: FOUND.
//  25.04–27.8  "Play of | *the night.*"  PLAY OF THE NIGHT: the kayak glides straight across the bayou. GEMINI: "LOOK AT THAT GLIDE!"
//  28.38–32.55 ★ LESSON UNLOCKED: "Find your *rhythm.*"
//  32.65–36.5  "Talk *cards.*"  A talk card floats over the water: FAST OR SLOW? SAG: "Card first. Face last."
//  36.6–40.5   "Final *stretch.*"  They glide under the skyline, paddles in time: IN SYNC ♥. THE BOOTH: "Paddle together."
// Rewatch bait: the heron looks away from every spin, and nods (once) when they finally glide past in time.
// One canvas (sky + jumbotron + booth), a low-res bayou canvas for the picture, DOM type + boxes + lesson, grain. Pure f(t).
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
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces'), CANS = signStar('cancer'), SCO = signStar('scorpio')
export const KEY = 'D'
const { LW, LH, SCR } = GEO
const TAU2 = Math.PI * 2

// ── the timeline
const T = {
  black: [-1, -0.9],                                   // frame 0 is the thumbnail: everything is already in at t = 0
  monIn: -0.85, deskIn: -0.78, gemIn: -0.7, sagIn: -0.62, micIn: -0.56, pisIn: -0.45, live: -0.4,
  h0: -0.8, h0Land: -0.45, h0Out: [3.65, 3.85], l0: 0.85, close0: 3.7,
  h1: 3.95, h1Out: [8.4, 8.6], loop1: [4.3, 7.3], tagLR: 4.5, l1: 5.4, close1: 8.55, stat1: [6.4, 8.55],
  h2: 8.7, h2Out: [13.2, 13.4], loop2: [9.0, 12.4], l2: 9.9, close2: 13.3, stat2: [11.6, 13.4],
  cut1: 13.5,
  h3: 13.6, h3Land: 13.95, h3Out: [19.2, 19.4], spin: [13.8, 14.75], bonk: 14.75, laugh: 15.35, count: 16.0,
  plant: BEAT(26), l3: 15.75, close3: 19.2, stat3: [15.6, 19.35],
  rew: [19.45, 20.05], slo: [20.1, 23.5], h4: 19.6, h4Land: 19.95, h4Out: [24.7, 24.9], l4: 20.25, l5: 22.6, close4: 24.85,
  c1: 22.25, c2: 22.55, stat4: [23.6, 24.95],
  erupt: BEAT(44), glide: [25.1, 28.3], h5Out: [27.55, 27.75], l6: 25.15, close5: 27.75,          // 25.04
  lesson: BEAT(50), lessonOut: [32.35, 32.55],                                                  // 28.38
  deck: 32.65, h6: 32.7, h6Out: [36.35, 36.55], deal: 33.0, l7: 33.4, close6: 36.45, stat6: [33.6, 36.5],
  fin: 36.6, h7: 36.6, h7Land: 36.95, glideF: [36.7, 40.2], pins: 38.6, l8: 37.0, close7: 40.0, out: [40.05, 40.5],
}
// the replay maps the picture back onto the spin cycle, slowed down
const SLO = [14.3, 16.6]
function picTime(t) {
  if (t >= T.rew[0] && t < T.rew[1]) return lerp(19.4, SLO[0], ease.inOutQuad(prog(t, ...T.rew)))
  if (t >= T.rew[1] && t < T.erupt) return lerp(SLO[0], SLO[1], prog(t, ...T.slo))
  return t
}

const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, BT = `${GEM.glyph}︎${SAG.glyph}︎ THE BOOTH`
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l0, speaker: GT, color: GC, text: 'Live from *Buffalo Bayou,* folks!' },
  { t: T.l1, speaker: ST, color: SCOL, text: 'Left. Right. *Around.*' },
  { t: T.l2, speaker: GT, color: GC, text: 'They’re a *ceiling fan* now.' },
  { t: T.l3, speaker: ST, color: SCOL, text: 'Pure chaos. *Call it.*' },
  { t: T.l4, speaker: GT, color: GC, text: 'Wait. Are they *counting?*' },
  { t: T.l5, speaker: ST, color: SCOL, text: 'In… out… they *synced up.*' },
  { t: T.l6, speaker: GT, color: GC, text: 'LOOK AT THAT *GLIDE!*' },
  { t: T.l7, speaker: ST, color: SCOL, text: 'Card first. *Face* last.' },
  { t: T.l8, speaker: BT, color: PINK, text: 'Paddle *together.*' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), BOOTH_HOPS = talkHops(LINES, BT, { cps: CPS })
const ERUPT_HOPS = [T.erupt + BL * 2, T.erupt + BL * 4]

export const _DBG = () => ({ T, LINES, LT })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Find your *rhythm.*', chip: 'BONUS: IN SYNC' }

const STATS = [[...T.stat1, 'DIRECTION: YES'], [...T.stat2, 'SPIN SPEED: CEILING FAN'], [...T.stat3, 'HERON: UNIMPRESSED'], [...T.stat4, 'RHYTHM: FOUND'], [...T.stat6, 'NEXT PADDLE: TONIGHT']]
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b

// ── the bayou (low-res) and the kayak
const BANK = 40
const toLX = X => (X - SCR.sx0) / GEO.PS, toLY = Y => (Y - SCR.sy0) / GEO.PS
const KY = SY(82)
/** the kayak at picture time pt (and film time t): { x, y, s, sx (−1…1: the turn), rate (strokes/s), mode 'idle'|'opp'|'sync', moving } */
function kayak(pt, t = pt) {
  const spinAt = (a, cx) => ({ x: cx + 14 * Math.sin(a), y: KY + 4 * Math.cos(a), s: lerp(0.9, 1, (Math.cos(a) + 1) / 2), sx: Math.cos(a) })
  if (t >= T.fin) { const p = prog(t, ...T.glideF); return { x: lerp(250, 860, p), y: KY, s: 1, sx: 1, rate: 1.1, mode: 'sync', moving: p > 0 && p < 1 } }
  if (t >= T.deck) return { x: 540 + 10 * Math.sin(t * 0.8), y: KY, s: 1, sx: 1, rate: 0, mode: 'idle', moving: false }
  if (t >= T.erupt) { const p = prog(t, ...T.glide); return { x: lerp(230, 850, ease.inOutQuad(p)), y: KY, s: 1, sx: 1, rate: 1.2, mode: 'sync', moving: p > 0 && p < 1 } }
  if (pt < T.loop1[0]) return { x: 540, y: KY, s: 1, sx: 1, rate: 0, mode: 'idle', moving: false }
  if (pt < T.h2) { const p = ease.inOutQuad(prog(pt, ...T.loop1)); return { ...spinAt(p * TAU2, 540), rate: p < 1 ? 1.3 : 0, mode: p < 1 ? 'opp' : 'idle', moving: p > 0 && p < 1 } }
  if (pt < T.cut1) { const p = ease.inOutQuad(prog(pt, ...T.loop2)); return { ...spinAt(p * TAU2 * 2, 540), rate: p < 1 ? 2.2 : 0, mode: p < 1 ? 'opp' : 'idle', moving: p > 0 && p < 1 } }
  // the spin cycle: flat out, drifting right into the reeds; BOINK; then still, laughing; then counting strokes, in time
  if (pt < T.bonk) { const p = prog(pt, ...T.spin); return { ...spinAt(TAU2 * 2 * Math.pow(p, 1.3), lerp(540, 700, ease.inQuad(p))), rate: 3, mode: 'opp', moving: p > 0 } }
  const k = pt - T.bonk, back = 700 - 40 * (1 - Math.exp(-k * 6))
  return { x: back + 10 * Math.sin(k * 30) * Math.exp(-k * 7), y: KY, s: 1, sx: 1, rate: pt >= T.count ? 0.9 : 0, mode: pt >= T.count ? 'sync' : 'idle', moving: false }
}
const SEAT = 84, STAR_S = 140

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 27px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')
  const R = (X, Y, w, h, c) => { l.fillStyle = c; l.fillRect(Math.round(X), Math.round(Y), w, h) }
  // ── bake the static bayou once: a dusk sky, the skyline, the far bank, the water, the reeds on the near bank
  const bayouBG = document.createElement('canvas'); bayouBG.width = LW; bayouBG.height = LH
  {
    const b = bayouBG.getContext('2d'), P = (X, Y, w, h, c) => { b.fillStyle = c; b.fillRect(X, Y, w, h) }
    ;['#24204a', '#33285a', '#4a2f66', '#6d3a70', '#a14e74', '#d8707a', '#f09a7c'].forEach((c, i) => P(0, i * 4, LW, 4, c))
    P(0, 28, LW, 12, '#f6b884')
    // the skyline: generic towers, lit windows (no landmarks)
    const r = rng(77)
    const towers = [[18, 12, 24], [30, 9, 30], [40, 14, 18], [55, 8, 34], [64, 12, 26], [77, 10, 31], [88, 15, 20], [104, 9, 28], [114, 12, 22], [127, 7, 33], [135, 11, 25], [150, 13, 19]]
    for (const [tx, w, h] of towers) {
      P(tx, BANK - h, w, h, '#1d1c3c'); P(tx, BANK - h, 1, h, '#2a2950')
      if (h > 28) P(tx + Math.floor(w / 2), BANK - h - 3, 1, 3, '#1d1c3c')
      for (let wy = BANK - h + 2; wy < BANK - 3; wy += 3) for (let wx = tx + 2; wx < tx + w - 1; wx += 3) if (r() < 0.45) P(wx, wy, 1, 1, r() < 0.5 ? '#ffd98a' : '#ffeec2')
    }
    // the far bank: trees + the trail's railing
    for (let i = -3; i < LW + 3; i += 4) { const h = 4 + Math.floor(r() * 4); P(i, BANK - h + 2, 5, h, i % 3 ? '#1f3d34' : '#24493b'); P(i + 1, BANK - h + 1, 3, 1, '#2f5a46') }
    P(0, BANK, LW, 2, '#2a4a36'); P(0, BANK + 2, LW, 1, '#bfae8a'); for (let i = 2; i < LW; i += 6) P(i, BANK - 1, 1, 3, '#bfae8a')
    P(0, BANK + 3, LW, 1, '#1a2c24')
    // the bayou: green-brown bands, the skyline's lights mirrored as streaks
    for (let y = BANK + 4; y < LH; y++) { const k = (y - BANK) / (LH - BANK); P(0, y, LW, 1, k < 0.25 ? '#3d6662' : k < 0.5 ? '#355b57' : k < 0.75 ? '#2e504d' : '#284643') }
    for (const [tx, w] of towers) for (let y = BANK + 5; y < BANK + 16; y += 2) if (r() < 0.6) P(tx + 2 + Math.floor(r() * (w - 3)), y, 2, 1, '#8e8a6a')
    // the near bank, bottom right: a wedge of grass and reeds
    for (let y = 72; y < LH; y++) { const x0 = Math.round(lerp(150, 128, (y - 72) / (LH - 72))); P(x0, y, LW - x0, 1, y % 3 ? '#3d6b3a' : '#467a40') }
    for (let i = 0; i < 9; i++) { const rx = 132 + i * 4 + Math.floor(r() * 2), rh = 8 + Math.floor(r() * 6); P(rx, 74 - rh + (i % 2) * 3, 1, rh, '#5f8f46'); P(rx, 74 - rh + (i % 2) * 3, 1, 2, '#8a5a2e') }
  }

  // ── type
  const H = [
    [popText(root, 'Date night: | *kayaking.*', { top: 118, size: 100, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h0Out],
    [popText(root, 'Stroke *one.*', { top: 168, size: 112, accentSize: 164, at: T.h1, gap: 0.12, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Stroke *two.*', { top: 168, size: 112, accentSize: 164, at: T.h2, gap: 0.12, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'The spin | *cycle.*', { top: 118, size: 100, accentSize: 150, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 1.0 }), T.h3Out],
    [popText(root, 'Hold on. | *Instant replay.*', { top: 118, size: 100, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: TELE, lineHeight: 1.0 }), T.h4Out],
    [popText(root, 'Play of | *the night.*', { top: 118, size: 104, accentSize: 156, at: T.erupt, late: 2, lateAt: T.erupt + 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h5Out],
    [popText(root, 'Talk *cards.*', { top: 168, size: 108, accentSize: 160, at: T.h6, gap: 0.12, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Final *stretch.*', { top: 168, size: 112, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK }), T.out],
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
  /** the tandem kayak, full-res pixel blocks: a long thin hull with pointed (stepped) ends. (cx, cy) = waterline centre */
  function drawHull(cx, cy, s, sx) {
    const P = 6 * s, w = 420 * s * Math.max(0.22, Math.abs(sx)), h = 4 * P, x0 = cx - w / 2
    // reflection
    x.fillStyle = 'rgba(255,140,80,0.18)'; x.fillRect(x0 + 2 * P, cy + P, w - 4 * P, 2 * P)
    for (let k = 0; k < 4; k++) {          // stepped taper to the tips
      const inset = (3 - k) * 2 * P * Math.max(0.3, Math.abs(sx))
      BLK(x0 + inset - P, cy - h + k * P - P * (k === 0 ? 1 : 0), w - 2 * inset + 2 * P, P + (k === 0 ? P : 0), INK)
    }
    for (let k = 0; k < 4; k++) {
      const inset = (3 - k) * 2 * P * Math.max(0.3, Math.abs(sx)), y = cy - h + k * P
      BLK(x0 + inset, y, w - 2 * inset, P, k === 0 ? '#ffb27a' : k === 3 ? '#c4512a' : '#ff7a3c')
    }
    BLK(x0 + 4 * P, cy - h + P, w - 8 * P, P * 0.6, '#ffe2b8')
    BLK(x0 + 6 * P, cy, w - 12 * P, P, INK)
  }
  /** a double-bladed paddle through (px, py): shaft angle ang, length L; the blades ink-outlined */
  function drawPaddle(px, py, ang, L, col, alpha = 1) {
    x.save(); x.globalAlpha *= alpha; x.translate(px, py); x.rotate(ang)
    x.fillStyle = INK; x.fillRect(-L / 2, -5, L, 10); x.fillStyle = '#d9c39a'; x.fillRect(-L / 2, -2, L, 4)
    for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(d * L / 2 - (d > 0 ? 6 : 34), -15, 40, 30); x.fillStyle = col; x.fillRect(d * L / 2 - (d > 0 ? 2 : 30), -11, 32, 22) }
    x.restore()
  }
  function heron(t, pt, k) {
    // the heron on the near bank: looks away from every spin; nods once at the final glide (rewatch bait)
    const X = SX(156), Y = SY(78)
    const away = (k.mode === 'opp' || (pt >= T.bonk && pt < T.laugh)) && t < T.erupt
    const nod = t >= T.fin ? Math.max(0, Math.sin(Math.PI * prog(t, T.pins - 0.2, T.pins + 0.4))) : 0
    const C = 6
    x.save(); x.translate(X, Y)
    BLK(-1 * C, 0, C, 6 * C, INK); BLK(1 * C, 0, C, 6 * C, INK)                               // legs
    BLK(-3 * C, -6 * C, 7 * C, 6 * C, INK); BLK(-2 * C, -5 * C, 5 * C, 4 * C, '#9fb3c8')      // body
    BLK(2 * C, -5 * C, 2 * C, 3 * C, '#7e93aa')
    const dir = away ? 1 : -1
    x.save(); x.translate(dir * 1 * C, -6 * C + nod * 2 * C)
    BLK(-C, -6 * C, 3 * C, 6 * C, INK); BLK(0, -6 * C, C, 6 * C, '#c7d6e4')                  // neck
    BLK(-2 * C + dir * C, -9 * C, 4 * C, 3 * C, INK); BLK(-C + dir * C, -8 * C, 2 * C, 2 * C, '#c7d6e4')
    BLK(dir > 0 ? 2 * C + C : -4 * C, -8 * C, 3 * C, C, '#f2c75c')                            // beak
    BLK(-C + dir * C + (dir > 0 ? C : 0), -8 * C, C, C, INK)                                   // eye
    x.restore()
    x.restore()
  }
  function ripplesLow(t) {
    const r = rng(9)
    for (let i = 0; i < 24; i++) {
      const y = BANK + 6 + Math.floor(r() * (LH - BANK - 8)), w = 3 + Math.floor(r() * 5), sp = 1.5 + r() * 2.5
      const X = ((r() * LW + t * sp) % (LW + 10)) - 5
      if (X > 126 && y > 70) continue
      R(X, y, w, 1, y < 70 ? '#5d8a80' : '#4a7670')
    }
  }
  function wakeLow(pt, t) {
    for (let k = 1; k <= 22; k++) {
      const pp = pt - k * 0.08, tt = t - k * 0.08
      const b = kayak(pp, tt), now = kayak(pt, t)
      if (!b.moving || !now.moving) continue
      const a = 1 - k / 23
      R(toLX(b.x) - 3, toLY(b.y) + 2, 6, 1, a > 0.6 ? '#d6efe6' : a > 0.3 ? '#9ec9bd' : '#76a499')
    }
  }
  function seatPos(k, which) {        // 0 = Cancer (front), 1 = Scorpio (back)
    const d = (which === 0 ? 1 : -1) * SEAT * k.s * Math.sign(k.sx || 1) * Math.max(0.22, Math.abs(k.sx))
    return { x: k.x + d, y: k.y - 66 * k.s }
  }
  function playerState(t, pt, which, k) {
    const isC = which === 0
    let mood = 'happy', look = [isC ? -1 : 1, 0], squash = 0, hops = [T.loop1[0], T.h3 + 0.2], blink
    if (pt >= T.loop1[0] && pt < T.h2) { mood = k.mode === 'opp' ? 'squint' : 'wide'; look = [0, 0] }
    if (pt >= T.h2 && pt < T.cut1) { mood = k.mode === 'opp' ? 'wide' : (isC ? 'sleepy' : 'wide'); look = k.mode === 'opp' ? [Math.sin(pt * 9 + which), Math.cos(pt * 9 + which)] : [0, 0]; blink = false }
    if (pt >= T.h3 && pt < T.laugh) { mood = pt < T.bonk ? 'wide' : 'squint'; look = [Math.sin(pt * 11 + which), 0] }
    if (pt >= T.laugh && pt < T.count) { mood = 'happy'; look = [isC ? -1 : 1, 0]; const ph = (pt - T.laugh) % 0.36; squash = -0.08 * Math.sin(Math.PI * ph / 0.36) + 0.05 }
    if (pt >= T.count && t < T.erupt) { mood = 'neutral'; look = [isC ? -1 : 1, 0] }
    if (t >= T.erupt && t < T.deck) { mood = 'sparkle'; look = [1, 0] }
    if (t >= T.deck) { mood = 'happy'; look = [0, -1] }
    if (t >= T.fin) { mood = t > T.pins ? 'heart' : 'happy'; look = [1, 0] }
    if (t >= T.erupt) hops = [...hops, T.erupt + 0.1, T.erupt + 0.6, T.pins + 0.1]
    return { mood, look, squash, hops, blink }
  }
  /** the paddle angle for a seat: opposite sides ('opp', a half stroke apart), in time ('sync'), or resting */
  function paddleAng(pt, k, which) {
    if (k.mode === 'idle' || !k.rate) return 0.12 * (which ? -1 : 1)
    const ph = pt * k.rate * TAU2 + (k.mode === 'opp' && which ? Math.PI : 0)
    return 0.7 * Math.sin(ph)
  }
  function drawPlayers(t, pt, k) {
    const pos = []
    for (const which of [1, 0]) {
      const S = which === 0 ? CANS : SCO, st = playerState(t, pt, which, k), p = seatPos(k, which)
      drawStarChar(x, p.x, p.y, STAR_S * k.s, pt, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash, hops: st.hops, blink: st.blink, seed: which ? 9 : 4, glow: 0.7 })
      pos[which] = p
    }
    return pos
  }

  function picture(t) {
    const pt = picTime(t)
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.drawImage(bayouBG, 0, 0)
    ripplesLow(pt)
    wakeLow(pt, t)
    const k = kayak(pt, t)
    const { sx0, sy0, sw, sh } = SCR
    x.imageSmoothingEnabled = false; x.drawImage(low, sx0, sy0, sw, sh); x.imageSmoothingEnabled = true
    if (t >= T.deck && t < T.fin + 0.3) { const kk = prog(t, T.deck, T.deck + 0.3) * (1 - prog(t, T.fin, T.fin + 0.3)); x.fillStyle = `rgba(10,6,26,${0.5 * kk})`; x.fillRect(sx0, sy0, sw, sh) }
    heron(t, pt, k)
    const pos = drawPlayers(t, pt, k)
    drawHull(k.x, k.y, k.s, k.sx)
    for (const which of [0, 1]) drawPaddle(pos[which].x, pos[which].y + 26, paddleAng(pt, k, which), 210 * k.s, which ? SCO.color : CANS.color)
    // splashes on each stroke
    if (k.rate > 0) for (const which of [0, 1]) {
      const ph = ((pt * k.rate + (k.mode === 'opp' && which ? 0.5 : 0)) % 1 + 1) % 1
      if (ph < 0.35) { const p = ph / 0.35; x.globalAlpha = 1 - p; BLK(pos[which].x + (which ? -1 : 1) * 70 - 8, k.y - 10 - Math.sin(Math.PI * p) * 34, 14, 14, '#d6efe6'); x.globalAlpha = 1 }
    }
    // live telestrator: LEFT / RIGHT on stroke one
    if (t < T.rew[0]) {
      teleTag(x, pt, T.tagLR, `${CANS.glyph}︎ LEFT ONLY`, 330, SY(52), { size: 32, rot: -0.06, out: [T.loop1[1] - 0.3, T.loop1[1]] })
      teleTag(x, pt, T.tagLR + 0.25, `${SCO.glyph}︎ RIGHT ONLY`, 760, SY(52), { size: 32, rot: 0.06, out: [T.loop1[1] - 0.3, T.loop1[1]] })
      teleTag(x, pt, T.bonk, 'BOINK!', k.x + 150, k.y - 150, { size: 44, rot: 0.08, out: [T.bonk + 0.7, T.bonk + 0.9] })
    }
    // dizzy stars after stroke two
    if (pt > T.loop2[1] - 0.2 && pt < T.cut1 && t < T.rew[0]) for (let i = 0; i < 4; i++) { const a = pt * 5 + i * Math.PI / 2; drawPixelStar(x, pos[0].x + Math.cos(a) * 60, pos[0].y - 84 + Math.sin(a) * 14, 22, 2, GOLD) }
    // HA HA, then the quiet count (tiny, live: nobody in the booth notices)
    if (t < T.erupt) {
      x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      for (let i = 0; i < 6; i++) {
        const t0 = T.laugh + i * 0.1, kk = pt - t0
        if (kk < 0 || kk > 0.6 || t0 > T.count) continue
        x.globalAlpha = Math.sin(Math.PI * kk / 0.6); x.lineWidth = 7; x.strokeStyle = INK
        const cx2 = pos[i % 2].x + (i % 3 - 1) * 26, cy = pos[0].y - 96 - kk * 60
        x.strokeText('HA', cx2, cy); x.fillStyle = i % 2 ? PINK : GOLD; x.fillText('HA', cx2, cy)
      }
      for (let i = 0; i < 8; i++) {
        const t0 = T.count + i * 0.55, kk = pt - t0
        if (kk < 0 || kk > 0.5) continue
        const word = i % 2 ? 'OUT' : 'IN', p = pos[i % 2]
        x.globalAlpha = Math.sin(Math.PI * kk / 0.5); x.lineWidth = 7; x.strokeStyle = INK; x.strokeText(word, p.x, p.y - 100 - kk * 30); x.fillStyle = BONE; x.fillText(word, p.x, p.y - 100 - kk * 30)
      }
      x.globalAlpha = 1
    }
    // play of the night: the glide
    if (t >= T.erupt && t < T.lesson) teleTag(x, t, T.erupt + 0.6, 'STRAIGHT LINE!', 540, SY(102), { size: 36, rot: -0.04, out: [T.h5Out[0], T.h5Out[1]] })
    // talk cards: one card floats over the water
    if (t >= T.deck && t < T.fin + 0.3) {
      const o = 1 - prog(t, T.fin, T.fin + 0.3), kk = ease.outCubic(prog(t, T.deal, T.deal + 0.4))
      const flip = prog(t, T.deal + 0.9, T.deal + 1.2), sxx = Math.abs(Math.cos(Math.PI * flip))
      x.save(); x.globalAlpha = o
      miniCard(x, 540, lerp(SY(LH) + 160, SY(40), kk) + Math.sin(t * 2) * 6, 190, { rot: Math.sin(t * 1.6) * 0.03, sx: Math.max(0.04, sxx), k: kk, face: flip > 0.5 ? ['TALK CARD', '', 'FAST', 'OR SLOW?'] : null })
      x.restore()
    }
    // the final glide: hearts, IN SYNC
    if (t >= T.pins) {
      const kk = t - T.pins
      if (kk < 1.6) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, dd = 60 + kk * 160; x.save(); x.globalAlpha = 1 - prog(kk, 1.0, 1.6); drawPixelStar(x, k.x + Math.cos(a) * dd, k.y - 140 + Math.sin(a) * dd * 0.6, 26, 2, i % 2 ? PINK : GOLD); x.restore() }
      teleTag(x, t, T.pins + 0.15, 'IN SYNC ♥', 640, SY(30), { size: 46, rot: -0.06 })
    }
    return { pt, k, pos }
  }
  function scoreBug(t) {
    const kk = pop01(t, T.h1 + 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[0] + 0.2))
    if (kk <= 0.01 || inR(t, T.rew[0], T.erupt) || inR(t, T.deck, T.fin)) return
    const X = SCR.sx0 + 22, Y = SCR.sy0 + 20
    x.save(); x.translate(X, Y); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-4, -4, 318, 96); x.fillStyle = 'rgba(14,10,34,0.95)'; x.fillRect(0, 0, 310, 88)
    const rows = [[`${CANS.glyph}︎ CAN`, CANS.color, [[T.tagLR, 'L'], [T.loop2[0] + 0.3, 'L'], [T.bonk, '?'], [T.pins + 0.1, '♥']]], [`${SCO.glyph}︎ SCO`, SCO.color, [[T.tagLR + 0.25, 'R'], [T.loop2[0] + 0.45, 'R'], [T.bonk, '?'], [T.pins + 0.1, '♥']]]]
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
    const { pos } = picture(t)
    const on = prog(t, T.live - 0.2, T.live + 0.1)
    if (on < 1) { const hh = sh * ease.outCubic(on); x.fillStyle = '#05040c'; x.fillRect(sx0, sy0, sw, (sh - hh) / 2); x.fillRect(sx0, sy0 + (sh + hh) / 2, sw, (sh - hh) / 2) }
    const rew = inR(t, ...T.rew), rep = inR(t, T.rew[0], T.erupt)
    if (rep) {
      vhs(x, t, rew)
      replayBug(x, t, rew ? '◀◀ REWIND' : t >= T.slo[1] ? '❚❚ REPLAY' : '▶ REPLAY', !rew && t < T.slo[1])
      const o = [T.erupt - 0.3, T.erupt - 0.05]
      const [a, b] = [pos[0], pos[1]]
      teleCircle(x, t, T.c1, a.x, a.y - 4, 66, 62, { seed: 1, out: o })
      teleCircle(x, t, T.c2, b.x, b.y - 4, 66, 62, { seed: 2, out: o })
      teleArrow(x, t, T.c2 + 0.35, b.x, b.y - 130, a.x, a.y - 130, { out: o })
      teleTag(x, t, T.c1 + 0.3, '…OUT', a.x + 20, a.y - 150, { size: 40, out: o })
      teleTag(x, t, T.c2 + 0.3, 'IN…', b.x - 20, b.y - 150, { size: 40, rot: 0.08, out: o })
    } else if (t >= T.live && t < T.out[0]) {
      liveBug(x, t, pop01(t, T.live, 0.3, 2.4))
      const pk = pop01(t, T.live + 0.25, 0.3, 2.2)
      if (pk > 0.01 && t < T.h1) { x.save(); x.translate(sx0 + sw - 300, sy0 + 76); x.scale(pk, pk); pill(x, 0, 0, 276, 38, '#46cf82', 'BUFFALO BAYOU', INK, 22); x.restore() }
    }
    if (!rep) scoreBug(t)
    statBox(x, t, STATS)
    bigBanner(x, t, T.erupt + 0.05, 'PLAY OF THE NIGHT', 'CANCER ♥ SCORPIO · THE GLIDE', { out: T.h5Out })
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

// the one card cut (cardfx.js plays a single cut, the middle candidate): 13.5, into the spin cycle. The end card has none.

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
const strokes = (t0, t1, gap, g = 0.022, alt = true) => { const out = []; let i = 0; for (let t = t0; t < t1; t += gap, i++) out.push(['chip', +t.toFixed(3), 1800, 0.18, { wave: 'noise', slide: -5, gain: g, decay: 0.16, sustain: 0.4, pan: alt ? (i % 2 ? 0.4 : -0.4) : 0, ...FXO }]); return out }
const ALL_CUES = [
  // 0 · welcome (everything is already on screen at frame 0: one hit on the first frame)
  ['pop', 0.02, 1046.5, 0.05, 0], ['pluck', 0.02, 1046.5, 0.04, 0.6, 0], ['tick', 0.03, 0.05], ['bell', 0.06, 1568, 0.022, 0.8, 0], ['pop', 0.1, 988, 0.025, 0.4],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1100, [ST]: 760, [BT]: 900 } }),
  // 1 · stroke one: left, right, around
  ...wordPops(T.h1, 2, 0.12, 1), ...strokes(T.loop1[0] + 0.1, T.loop1[1] - 0.2, 0.385), ...swirl(T.loop1[0], T.loop1[1] - T.loop1[0]),
  ['pop', T.tagLR, 660, 0.03, -0.4], ['pop', T.tagLR + 0.25, 880, 0.03, 0.4], ...womp(pt(T.loop1[1], 0.05)),
  ['tick', T.stat1[0], 0.04], ['pop', T.stat1[0] + 0.05, 1318.5, 0.025, 0],
  // 2 · stroke two: the ceiling fan
  ...wordPops(T.h2, 2, 0.12, 3), ...strokes(T.loop2[0] + 0.1, T.loop2[1] - 0.2, 0.227), ...swirl(T.loop2[0], T.loop2[1] - T.loop2[0]),
  ['chip', T.loop2[1], 1400, 0.6, { duty: 0.25, vib: 0.1, gain: 0.014, decay: 0.5, sustain: 0.4, ...FXO }],
  ['tick', T.stat2[0], 0.04], ['pop', T.stat2[0] + 0.05, 1318.5, 0.025, 0],
  // 3 · the spin cycle
  ...wordPops(T.h3, 2, 0.08, 2), ['pop', T.h3Land, 1046.5, 0.05, 0], ['pluck', T.h3Land, 1046.5, 0.04, 0.6, 0],
  ...strokes(T.spin[0], T.bonk, 0.16, 0.026), ['whoosh', T.spin[0], 0.6, 0.02],
  ['pop', T.bonk, 150, 0.08, 0.3], ['pop', T.bonk + 0.06, 300, 0.05, 0.3], ['chip', T.bonk, 300, 0.35, { wave: 'tri', slide: 12, gain: 0.03, decay: 0.3, sustain: 0.5, ...FXO }], ['glitter', T.bonk, T.bonk + 0.4],
  ...scratch(T.plant - 0.1), ['pop', T.plant + 0.2, 98, 0.08, -0.3], ['tick', T.plant + 0.2, 0.06],
  ...sob(T.plant + 0.25), ['tick', T.stat3[0], 0.04], ['pop', T.stat3[0] + 0.05, 1318.5, 0.025, 0],
  ...strokes(T.count + 0.1, T.h3Out[0], 0.55, 0.012, false),
  // 4 · instant replay
  ['chip', T.rew[0] + 0.05, 220, 0.55, { duty: 0.5, slide: 30, gain: 0.012, decay: 0.6, sustain: 0.8, ...FXO }],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.rew[0] + 0.05 + i * 0.08).toFixed(3), 0.025]),
  ...head(T.h4, 2, T.h4Land, 4), ['tapeStop', T.slo[0], 0.6],
  ['pop', pt(T.slo[0], (T.bonk - SLO[0]) / (SLO[1] - SLO[0]) * (T.slo[1] - T.slo[0])), 110, 0.06, 0],
  ...[T.c1, T.c2].flatMap((c, i) => [['chip', c, 2600, 0.32, { wave: 'noise', slide: 4, gain: 0.014, decay: 0.3, sustain: 0.6, ...FXO }], ['pop', c + 0.32, NOTE[(i * 2 + 3) % 7], 0.035, i ? 0.3 : -0.3]]),
  ['whoosh', T.c2 + 0.35, 0.3, 0.02], ['tick', T.slo[1], 0.05],
  ['tick', T.stat4[0], 0.04], ['pop', T.stat4[0] + 0.05, 1318.5, 0.025, 0],
  // 5 · play of the night: the glide
  ['swell', T.erupt - 0.7, T.erupt, { gain: 0.05, f0: 600, f1: 4000 }], ['boom', T.erupt + 0.27, 0.22], ['glitter', T.erupt, T.erupt + 0.8],
  ['brass', T.erupt + 0.27, [523.25, 659.25, 783.99], 0.6, { gain: 0.05, bright: 1.4, rev: 0.2, bus: 'fx' }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.erupt + 0.02 + i * 0.03).toFixed(3), NOTE[(i * 3) % 7], 0.03, +(((i % 5) / 4 - 0.5) * 1.2).toFixed(2)]),
  ...claps(T.erupt + 0.1, T.erupt + 2.4, 11), ...strokes(T.glide[0] + 0.3, T.glide[1], 0.833, 0.016, false),
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · talk cards
  ...wordPops(T.h6, 2, 0.12, 2), ['whoosh', T.deal, 0.4, 0.02], ['tick', T.deal + 0.9, 0.04], ['pop', T.deal + 1.05, 1174.66, 0.035, 0], ['bell', T.deal + 1.1, 1318.5, 0.03, 1.2, 0],
  ['tick', T.stat6[0], 0.04], ['pop', T.stat6[0] + 0.05, 1318.5, 0.025, 0],
  // 8 · final stretch
  ...head(T.h7, 1, T.h7Land, 0), ...strokes(T.glideF[0] + 0.3, T.glideF[1] - 0.3, 0.909, 0.014, false),
  ['boom', T.pins + 0.05, 0.18], ['glitter', T.pins + 0.1, T.pins + 0.8], ['bell', T.pins + 0.2, 1568, 0.03, 1.2, 0],
  ...claps(T.pins + 0.1, T.pins + 1.4, 23),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = ALL_CUES.filter(c => c[1] >= 0)
