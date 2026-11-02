// hxtrailride — "Swap Worlds." (45 s vertical Align ad, Star Talk "Wild Lessons", Houston: a western; music: lofi · Am,
// a spaghetti-western whistle on top). Story 0–40.6, then the shared end card. No show bug.
//   0.0–4.5    "Trail ride, | meet *the city.*"  A trail ride on a prairie road, the downtown skyline far ahead: ♉ TAURUS
//              (a red bandana) leads on horseback, two more riders and a hay wagon behind (♓ Pisces cries in the hay, as
//              ever). ♒ AQUARIUS stands on the roadside with headphones and a phone. TAURUS: "howdy. you lost, *city star?*"
//   4.6–8.8    "The *swap.*"  Western extreme close-ups: Taurus' squint · Aquarius' squint · a handshake, sparkle.
//              AQUARIUS: "trade? my world for *yours.*"
//   8.85–11.9  "Their world: | *the trail.*"  Aquarius in the saddle, wobbling; the horse stops to eat grass.
//              AQUARIUS: "the horse is *ignoring* me."
//  12.0–15.2   "Campfire. | *No signal.*"  Dusk falls; a campfire; Aquarius' phone shows no bars, then it looks up: out here
//              the sky is full of stars. AQUARIUS: "no signal… but *whoa.*"
//  15.3        the one card cut.
//  15.35–19.4 "Their world: | *the city.*"  A downtown rooftop at night; Taurus steps out of the stairwell… and the horse
//              peeks out behind it. TAURUS: "everything's so *tall.*"
//  19.5–23.5  "The *view.*"  The city lights twinkle. TAURUS: "ok. *this* is pretty."
//  23.6–28.7  "Two worlds, | *one* sky."  They sit on the ledge and look up. AQUARIUS: "same sky as the *trail.*"  A heart.
//  28.93      ★ LESSON UNLOCKED: "Visit *their* world."
//  33.5–37.85 "Show me | *your* place."  A talk card ("Where do you feel | most *you?*"); both play; both flip: "Come |
//              see." ✓ ✓  TAURUS: "deal. *bring boots.*"
//  37.95–40.42 "See you on | the *trail.*"  Frame 0's shot, changed: the trail ride rolls on, and Aquarius rides beside
//              Taurus now. Everything clears by 40.42; the end card takes over at 40.6.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OUT, GOLD, BONE, PINK, LAV, SUN, SKYBLUE, MONO, BEAT, R, bitmap, rgba, pop01, outK, popOut, inW, bump, keyed, S_, win,
  drawPixelHeart, drawTissue, drawSweat, makeFx, drawCardBack, drawTalkCard, drawAnswerCard, SND } from './kit.js'

export { BEAT }
export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
export const KEY = 'Am'

const TAU = signStar('taurus'), AQU = signStar('aquarius'), PIS = signStar('pisces')
const TAU_T = '#ffd27a', AQU_T = '#8fe4ff'

export const T = {
  h0Out: [4.3, 4.48], l1: -2.0,
  h1: 4.6, h1Land: BEAT(8), h1Out: [8.62, 8.78], ecu: [4.62, 5.6, 6.55, 7.4], shake: 7.0, l2: 6.6,
  h2: 8.85, h2Land: 9.25, h2Out: [11.75, 11.9], mount: [8.85, 9.35], graze: [10.1, 11.6], l3: 9.4, l4: 11.2,
  h3: 12.0, h3Land: 12.4, h3Out: [15.06, 15.2], dusk: [11.9, 12.6], bars: 11.95, lookUp: 12.75, l5: 12.15, closeA: 15.28,
  cut: 15.3,
  h4: 15.36, h4Land: 15.8, h4Out: [19.25, 19.4], doorOpen: 15.45, step: [15.6, 16.1], horse: 16.6, l6: 16.3,
  h5: 19.5, h5Land: 19.85, h5Out: [23.4, 23.55], l7: 20.0,
  h6: 23.6, h6Land: 24.0, h6Out: [28.55, 28.7], sit: [23.65, 24.2], l8: 24.4, heart1: 26.4, closeB: 27.9,
  lesson: BEAT(51), lessonOut: [33.25, 33.45],
  h7: 33.5, h7Land: BEAT(60), h7Out: [37.7, 37.85], tie: [33.4, 33.9], talk: [33.5, 33.92], playA: 34.25, playB: 34.42, l9: 34.6, trem: [35.4, BEAT(64)], flip: BEAT(64),
  cardsOut: [37.5, 37.8], closeC: 37.7,
  back: 37.85, h8: 37.98, h8Land: BEAT(68), heart2: 38.9, out: [39.98, 40.42], h8Out: [40.18, 40.42],
}

const STAU = `${TAU.glyph}︎ TAURUS`, SAQU = `${AQU.glyph}︎ AQUARIUS`
const LINES_A = [
  { t: T.l1, speaker: STAU, color: TAU_T, text: 'howdy. you lost, *city star?*' },
  { t: T.l2, speaker: SAQU, color: AQU_T, text: 'trade? my world for *yours.*' },
  { t: T.l3, speaker: SAQU, color: AQU_T, text: 'the horse is *ignoring* me.' },
  { t: T.l5, speaker: SAQU, color: AQU_T, text: 'no signal… but *whoa.*' },
]
const LINES_B = [
  { t: T.l6, speaker: STAU, color: TAU_T, text: "everything's so *tall.*" },
  { t: T.l7, speaker: STAU, color: TAU_T, text: 'ok. *this* is pretty.' },
  { t: T.l8, speaker: SAQU, color: AQU_T, text: 'same sky as the *trail.*' },
]
const LINES_C = [{ t: T.l9, speaker: STAU, color: TAU_T, text: 'deal. *bring boots.*' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS }), LTC = lineTimes(LINES_C, { cps: CPS })
const ALL = [LINES_A, LINES_B, LINES_C]
const HOPS = { tau: ALL.flatMap(L => talkHops(L, STAU, { cps: CPS })), aqu: ALL.flatMap(L => talkHops(L, SAQU, { cps: CPS })) }
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Visit *their* world.', chip: 'EXPLORER ★', accentColor: GOLD, dim: 0.62 }

// ── the trail set (world == screen at rest)
const ROADY = 1300
const SEED = { tau: 12, aqu: 7, pis: 23 }
// the horse (facing left), anchor = between the hooves
const HORSE = [
  '..OO......................',
  '.OMMO.....................',
  'OMMHHO....................',
  'OHHHHHO...................',
  'OHEHHHHO..................',
  'OHHHHHHHOOOOOOOOOOOOOO....',
  '.OOHHHHHHHHHHHHHHHHHHHOO..',
  '...OHHHHHHHHHHHHHHHHHHHHOM',
  '....OHHHHHHHHHHHHHHHHHHHOM',
  '....OHHHHHHHHHHHHHHHHHHHOM',
  '.....OHHHHHHHHHHHHHHHHHO.M',
  '.....OHHOOOOOOOOOOOOHHO...',
  '.....OHO.........OHHO.....',
  '.....OHO..........OHO.....',
  '.....OHO..........OHO.....',
  '....OOOO.........OOOO.....',
]
function horse(x, hx, hy, px, t, { col = '#8a5a3c', mane = '#3a2418', walk = 1, graze = 0, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  const bob = walk ? Math.abs(Math.sin(t * 6)) * px * 0.8 : 0
  x.save(); x.globalAlpha *= alpha; x.translate(hx, hy - bob)
  if (graze > 0) { x.translate(-6 * px, -10 * px); x.rotate(-0.35 * graze); x.translate(6 * px, 10 * px) }
  bitmap(x, HORSE, { O: OUT, H: col, M: mane, E: '#0b0814' }, -13 * px, -HORSE.length * px, px)
  // a saddle
  R(x, -1 * px, -11 * px, 7 * px, 2 * px, '#5a2a20'); R(x, 0, -12 * px, 5 * px, px, '#c8324a')
  x.restore()
}
const RIDERS = [
  { x: 330, sz: 150, px: 11, col: '#8a5a3c', star: 'tau' },
  { x: 160, sz: 96, px: 7, col: '#e9e0d0', star: 'leo', y: -70 },
  { x: 900, sz: 96, px: 7, col: '#4a3030', star: 'scorpio', y: -70 },
]

const TAU_K = [
  [0, S_('happy', [1, 0])], [T.l1 + 2, S_('neutral', [1, 0])], [T.h1, S_('squint', [1, 0], { blink: false })], [T.shake, S_('happy', [1, 0])],
  [T.l3, S_('happy', [-1, 0])], [T.l4, S_('neutral', [-1, 0])], [T.lookUp, S_('sparkle', [0, -1])],
  [T.h4, S_('wide', [0, -1], { blink: false })], [T.l6 + 1.2, S_('wide', [1, -1])], [T.l7, S_('sparkle', [1, 0])], [T.sit[1], S_('sparkle', [0, -1])],
  [T.heart1, S_('heart', [1, 0])], [T.lessonOut[0], S_('neutral', [1, -1])], [T.flip, S_('wide', [1, 0])], [T.flip + 0.4, S_('happy', [1, 0])],
  [T.back, S_('happy', [-1, 0])], [T.heart2, S_('heart', [-1, 0])],
]
const AQU_K = [
  [0, S_('squint', [-1, 0])], [T.h1, S_('squint', [-1, 0], { blink: false })], [T.shake, S_('happy', [-1, 0])],
  [T.mount[1], S_('wide', [0, 1], { blink: false, sq: -0.05 })], [T.graze[0], S_('squint', [0, 1])], [T.l4 + 0.4, S_('happy', [-1, 0])],
  [T.bars, S_('wide', [0, 1], { blink: false })], [T.lookUp, S_('sparkle', [0, -1])],
  [T.h4, S_('happy', [-1, 0])], [T.l7, S_('happy', [-1, 0])], [T.l8, S_('sparkle', [0, -1])], [T.heart1, S_('heart', [-1, 0])],
  [T.lessonOut[0], S_('neutral', [-1, -1])], [T.flip, S_('wide', [-1, 0])], [T.flip + 0.4, S_('happy', [-1, 0])],
  [T.back, S_('happy', [1, 0])], [T.heart2, S_('heart', [1, 0])],
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "italic 500 190px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { ono, sparkleRing, tears } = makeFx(x)

  const H0 = popText(root, 'Trail ride, | meet *the city.*', { top: 172, size: 108, accentSize: 170, at: -2, late: 2, lateAt: -1, accentColor: SUN })
  const H1 = popText(root, 'The *swap.*', { top: 196, size: 124, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Their world: | *the trail.*', { top: 172, size: 100, accentSize: 160, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: SUN, fit: true })
  const H3 = popText(root, 'Campfire. | *No signal.*', { top: 172, size: 104, accentSize: 166, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: SKYBLUE, fit: true })
  const H4 = popText(root, 'Their world: | *the city.*', { top: 172, size: 100, accentSize: 160, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: AQU_T, fit: true })
  const H5 = popText(root, 'The *view.*', { top: 196, size: 124, accentSize: 190, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD })
  const H6 = popText(root, 'Two worlds, | *one* sky.', { top: 172, size: 108, accentSize: 170, at: T.h6, late: 2, lateAt: T.h6Land, wobble: true, accentColor: PINK, fit: true })
  const H7 = popText(root, 'Show me | *your* place.', { top: 168, size: 104, accentSize: 160, at: T.h7, late: 2, lateAt: T.h7Land, wobble: true, accentColor: LAV, fit: true })
  const H8 = popText(root, 'See you on | the *trail.*', { top: 172, size: 112, accentSize: 176, at: T.h8, late: 1, lateAt: T.h8Land, wobble: true, gap: 0.1, accentColor: SUN, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out]]
  const box = (L, open, close) => dialogueBox(root, { lines: L, y: 1478, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [box(LINES_A, -2.3, T.closeA), box(LINES_B, T.l6 - 0.24, T.closeB), box(LINES_C, T.l9 - 0.24, T.closeC)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const inCity = t => t >= T.cut && t < T.back
  function cam(t) {
    let s = 1.3 + 0.03 * ease.inOutQuad(prog(t, 0, 4.4)), fx = 560, fy = 1150
    const kg = win(t, T.h2, T.h2Out[1], 0.4)
    s += 0.12 * kg; fx = lerp(fx, 470, kg); fy = lerp(fy, 1170, kg)
    const kc = win(t, T.h3, T.cut, 0.4)
    s += 0.06 * kc; fx = lerp(fx, 500, kc); fy = lerp(fy, 1150, kc)
    if (inCity(t)) {
      s = 1.28; fx = 430; fy = 1080
      const kv = win(t, T.h5, T.h5Out[1], 0.5); s -= 0.12 * kv; fy = lerp(fy, 1000, kv)
      const ks = win(t, T.h6, T.lesson, 0.6); s += 0.08 * ks; fx = lerp(fx, 470, ks)
    }
    if (t >= T.back) { s = 1.32 + 0.03 * ease.inOutQuad(prog(t, T.back, T.out[0])); fx = 520; fy = 1150 }
    s += 0.04 * bump(t, T.shake, 0.35) + 0.04 * bump(t, T.lookUp, 0.4)
    return { s, fx, fy }
  }
  const worldK = t => 1 - ease.inCubic(prog(t, T.out[0] + 0.1, T.out[1]))
  const duskK = t => t >= T.back ? 0.25 : t < T.cut ? ease.inOutCubic(prog(t, ...T.dusk)) : 0

  // ── the trail
  function drawTrail(t) {
    const dk = duskK(t)
    // warm late-afternoon wash over the sky, cooling at dusk
    const g = x.createLinearGradient(0, 500, 0, 1100); g.addColorStop(0, rgba('#ff9a5a', 0)); g.addColorStop(1, rgba('#ffb066', 0.38 * (1 - dk)))
    x.fillStyle = g; x.fillRect(-200, 500, W + 400, 600)
    if (dk > 0) { x.fillStyle = rgba('#06031a', 0.35 * dk); x.fillRect(-200, -200, W + 400, 1300) }
    // the far skyline (small, on the horizon)
    const SK = [[560, 60, 150], [625, 44, 210], [672, 52, 175], [728, 38, 250], [770, 56, 190], [830, 40, 140], [875, 48, 165]]
    for (const [bx, bw, bh] of SK) {
      R(x, bx, 1040 - bh, bw, bh, '#2a1a44')
      for (let wy = 1040 - bh + 14; wy < 1030; wy += 22) for (let wx = bx + 8; wx < bx + bw - 10; wx += 16) if (((wx + wy) * 3 % 7) < 2) R(x, wx, wy, 5, 8, rgba('#ffcf6a', 0.3 + 0.4 * dk))
    }
    // prairie
    const pg = x.createLinearGradient(0, 1040, 0, H + 200); pg.addColorStop(0, '#6a7a3a'); pg.addColorStop(0.3, '#4a5a2c'); pg.addColorStop(1, '#1e2414')
    x.fillStyle = pg; x.fillRect(-300, 1040, W + 600, H + 400 - 1040)
    if (dk > 0) { x.fillStyle = rgba('#06031a', 0.45 * dk); x.fillRect(-300, 1040, W + 600, H + 400 - 1040) }
    for (let i = 0; i < 70; i++) { const px = (i * 131.7) % (W + 200) - 100, py = 1060 + (i * 47.3) % 760; R(x, px, py, 6, 16, i % 3 ? 'rgba(150,170,80,0.5)' : 'rgba(30,40,14,0.4)') }
    // the road toward town
    x.fillStyle = '#a07a52'; x.beginPath(); x.moveTo(690, 1040); x.lineTo(760, 1040); x.lineTo(W + 300, ROADY + 140); x.lineTo(-300, ROADY + 140); x.closePath(); x.fill()
    if (dk > 0) { x.fillStyle = rgba('#06031a', 0.45 * dk); x.beginPath(); x.moveTo(690, 1040); x.lineTo(760, 1040); x.lineTo(W + 300, ROADY + 140); x.lineTo(-300, ROADY + 140); x.closePath(); x.fill() }
    // a fence line
    for (let k = 0; k < 12; k++) R(x, 20 + k * 92, 1100, 10, 50, '#4a3020')
    R(x, 0, 1112, W, 6, '#5a3a24')
  }
  function drawStarsOut(t) {
    // out of town, the sky fills with stars (the dark-sky moment)
    const k = ease.inOutCubic(prog(t, T.lookUp - 0.2, T.lookUp + 0.8)) * (1 - ease.inCubic(prog(t, T.closeA - 0.2, T.cut)))
    if (k <= 0.01) return
    x.save(); x.globalAlpha = k
    for (let i = 0; i < 80; i++) { const sx = (i * 137.5) % W, sy = 120 + (i * 71.3) % 820, tw = 0.6 + 0.4 * Math.sin(t * 2 + i); drawPixelStar(x, sx, sy, 8 + (i % 4) * 5, i % 2, rgba('#fffbea', tw)) }
    x.restore()
  }
  function drawCampfire(t) {
    const k = ease.outBack(prog(t, T.dusk[1] - 0.3, T.dusk[1] + 0.1)) * (t < T.cut ? 1 : 0)
    if (k <= 0.02) return
    const cx = 620, cy = 1330
    const g = x.createRadialGradient(cx, cy - 30, 0, cx, cy - 30, 300); g.addColorStop(0, 'rgba(255,170,80,0.5)'); g.addColorStop(1, 'rgba(255,170,80,0)')
    x.fillStyle = g; x.fillRect(cx - 300, cy - 330, 600, 600)
    R(x, cx - 60, cy - 10, 120, 16, '#4a2a1a'); R(x, cx - 40, cy - 18, 80, 12, '#5a3420')
    for (let i = 0; i < 5; i++) { const fh = (40 + i * 14) * k * (0.8 + 0.2 * Math.sin(t * 13 + i)); R(x, cx - 40 + i * 16, cy - 18 - fh, 14, fh, i % 2 ? '#ffd23f' : '#ff7a2e') }
  }
  function drawWagon(t, wx, wy) {
    R(x, wx - 150, wy - 90, 300, 70, OUT); R(x, wx - 144, wy - 84, 288, 58, '#7a4a2c')
    for (let k = 0; k < 7; k++) R(x, wx - 140 + k * 42, wy - 120 + (k % 2) * 8, 40, 40, '#e9c95a')
    for (const dx of [-100, 100]) { x.fillStyle = OUT; x.beginPath(); x.arc(wx + dx, wy - 14, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a3a24'; x.beginPath(); x.arc(wx + dx, wy - 14, 26, 0, Math.PI * 2); x.fill() }
    // Pisces in the hay
    const r = drawStarChar(x, wx + 10, wy - 120, 100, t, { color: PIS.color, mood: 'sparkle', look: [-1, 0], seed: SEED.pis, glow: 0.6, hops: [T.shake, T.lookUp, T.heart2] })
    drawTissue(x, r.x + 46, r.y + 20, 3, t)
    tears(r.x, r.y, r.size, t, 0.3, 40, { gap: 0.13, spread: 0.6, life: 0.4 })
    void t
  }

  // ── the rooftop
  function drawCity(t) {
    // big skyline, lights
    const B = [[-40, 170, 760], [120, 150, 980], [260, 190, 640], [440, 140, 900], [570, 170, 720], [730, 130, 1040], [850, 160, 820], [1000, 140, 700]]
    for (const [bx, bw, top] of B) {
      R(x, bx, top, bw, 1300 - top, '#1c1236'); R(x, bx, top, bw, 8, '#2c1e50')
      for (let wy = top + 24; wy < 1280; wy += 32) for (let wx = bx + 14; wx < bx + bw - 18; wx += 24) { const on = ((wx * 7 + wy * 13) % 11) < 4; if (on) R(x, wx, wy, 10, 14, `rgba(255,207,106,${0.45 + 0.25 * Math.sin(t * 0.9 + wx * 0.3 + wy)})`) }
      R(x, bx + bw / 2 - 3, top - 40, 6, 40, '#2c1e50'); if (Math.sin(t * 3 + bx) > 0) R(x, bx + bw / 2 - 5, top - 46, 10, 10, '#ff3b4a')
    }
    // the rooftop deck
    R(x, -200, 1300, W + 400, H, '#3a3048'); R(x, -200, 1300, W + 400, 14, '#5a4e6a')
    for (let k = 0; k < 10; k++) R(x, k * 120, 1340, 6, 600, 'rgba(20,14,30,0.4)')
    // the ledge
    R(x, -200, 1228, W + 400, 76, OUT); R(x, -200, 1236, W + 400, 60, '#6a5a78'); R(x, -200, 1236, W + 400, 10, '#8a7a98')
    // the stairwell door (left), the horse peeks out of it
    R(x, 40, 1010, 200, 230, OUT); R(x, 48, 1018, 184, 222, '#4a3e5c')
    const open = ease.outBack(prog(t, T.doorOpen, T.doorOpen + 0.4))
    R(x, 70, 1050, 140, 190, '#120a20'); x.save(); x.translate(70, 0); x.scale(1 - 0.85 * open, 1); R(x, 0, 1050, 140, 190, '#7a6a8c'); R(x, 112, 1140, 12, 12, GOLD); x.restore()
    const hk = ease.outCubic(prog(t, T.horse, T.horse + 0.5))
    if (hk > 0.01) { x.save(); x.beginPath(); x.rect(70, 1050, 140, 190); x.clip(); horse(x, 70 + 150 - 90 * hk, 1290, 9, t, { walk: 0 }); x.restore() }
  }

  // ── the cast
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, color } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = color || (id === 'tau' ? TAU.color : id === 'aqu' ? AQU.color : PIS.color)
    const g = glyph && sz >= 120 ? (id === 'tau' ? TAU.glyph : id === 'aqu' ? AQU.glyph : null) : null
    return drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: col, glyph: g, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id] || 31, pop, glow: 0.8, alpha })
  }
  function bandana(r) { const c = r.size / 36; R(x, r.x - r.size * 0.26, r.y + r.size * 0.14, r.size * 0.52, c * 3, '#c8324a'); R(x, r.x - c * 2, r.y + r.size * 0.14 + c * 3, c * 4, c * 3, '#c8324a'); for (let i = 0; i < 3; i++) R(x, r.x - r.size * 0.2 + i * r.size * 0.16, r.y + r.size * 0.15 + c, c, c, '#ffffff') }
  function headphones(r) {
    const c = r.size / 36
    x.save(); x.strokeStyle = '#2a2440'; x.lineWidth = c * 2; x.beginPath(); x.arc(r.x, r.y - r.size * 0.05, r.size * 0.3, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); x.restore()
    for (const s of [-1, 1]) { R(x, r.x + s * r.size * 0.3 - c * 2.5, r.y - r.size * 0.06, c * 5, c * 7, '#2a2440'); R(x, r.x + s * r.size * 0.3 - c * 1.5, r.y - r.size * 0.05, c * 3, c * 5, '#ff8fb1') }
  }
  // where Taurus / Aquarius are (and whether on a horse)
  function placeTau(t) {
    if (t < T.cut) return { P: [RIDERS[0].x, ROADY - 11 * RIDERS[0].px - 44, 150], horse: [RIDERS[0].x + 10, ROADY], hpx: 11 }
    if (t < T.back) {
      if (t < T.sit[0]) { const p = prog(t, ...T.step), e = ease.outCubic(p); return { P: [lerp(140, 330, e), 1140 - Math.sin(p * Math.PI) * 60, 190] } }
      const p = prog(t, ...T.sit), e = ease.inOutCubic(p); return { P: [lerp(330, 420, e), lerp(1140, 1150, e) - Math.sin(p * Math.PI) * 80, 190] }
    }
    return { P: [300, ROADY - 11 * 11 - 44, 150], horse: [310, ROADY], hpx: 11 }
  }
  function placeAqu(t) {
    if (t < T.mount[0]) return { P: [595, 1215, 170] }
    if (t < T.cut) {
      const p = prog(t, ...T.mount), e = ease.inOutCubic(p)
      const onH = [480, ROADY + 30 - 9 * 11 - 40, 150]
      return { P: [lerp(595, onH[0], e), lerp(1215, onH[1], e) - Math.sin(p * Math.PI) * 160, lerp(170, 150, e)], horse: p > 0.5 ? [490, ROADY + 30] : null, hpx: 9, wob: p >= 1 }
    }
    if (t < T.back) { const p = prog(t, ...T.sit), e = ease.inOutCubic(p); return { P: [lerp(700, 640, e), lerp(1140, 1150, e) - Math.sin(p * Math.PI) * 80, 190] } }
    return { P: [560, ROADY + 30 - 9 * 11 - 40, 140], horse: [570, ROADY + 30], hpx: 9 }
  }
  function drawTau(t, k) {
    const s = placeTau(t), st = keyed(t, TAU_K)
    if (s.horse) horse(x, s.horse[0], s.horse[1], s.hpx, t, { col: '#8a5a3c', walk: t >= T.back || t < T.h2 ? 1 : 0, alpha: clamp(k) })
    const r = star('tau', s.P, t, st, { pop: k, hops: [...HOPS.tau, T.shake, T.heart1, T.flip + 0.35, T.heart2] })
    if (r) bandana(r)
    return r
  }
  function drawAqu(t, k) {
    const s = placeAqu(t), st = keyed(t, AQU_K)
    const graze = ease.inOutCubic(prog(t, T.graze[0], T.graze[0] + 0.3)) * (1 - ease.inOutCubic(prog(t, T.graze[1] - 0.3, T.graze[1])))
    if (s.horse) horse(x, s.horse[0], s.horse[1], s.hpx, t, { col: '#e9e0d0', mane: '#8a7a6a', walk: t >= T.back ? 1 : 0, graze, alpha: clamp(k) })
    const wob = s.wob && t < T.l4 + 0.6 ? Math.sin(t * 9) * 0.12 : 0
    x.save(); x.translate(s.P[0], s.P[1] + 60); x.rotate(wob); x.translate(-s.P[0], -(s.P[1] + 60))
    const r = star('aqu', s.P, t, st, { pop: k, hops: [...HOPS.aqu, T.shake, T.heart1, T.flip + 0.35, T.heart2] })
    x.restore()
    if (!r) return null
    headphones(r)
    // the phone: at the roadside, and "no signal" at dusk
    if (t < T.mount[0] || inW(t, T.bars - 0.3, T.lookUp + 0.4)) {
      const c = r.size / 36, px0 = r.x + r.size * 0.5, py0 = r.y - r.size * 0.02
      R(x, px0 - c * 4, py0 - c * 7, c * 8, c * 14, OUT); R(x, px0 - c * 3, py0 - c * 6, c * 6, c * 11, t > T.bars - 0.3 ? '#2a2440' : '#bff0ff')
      if (t > T.bars - 0.3) { x.fillStyle = '#ff6a7a'; x.font = `700 ${Math.round(c * 3)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', px0, py0) }
    }
    return r
  }
  function drawRiders(t, k) {
    // the trail ride behind Taurus (small, set back on the road)
    RIDERS.slice(1).forEach((R0, i) => {
      const xx = R0.x + 30 * Math.sin(t * 0.4 + i)
      const hy = ROADY + (R0.y || 0)
      horse(x, xx + 10, hy, R0.px, t + i * 0.3, { col: R0.col, walk: t < T.h2 || t >= T.back ? 1 : 0, alpha: clamp(k) })
      drawStarChar(x, xx, hy - 11 * R0.px - 30, R0.sz, t, { color: signStar(R0.star).color, mood: t >= T.lookUp && t < T.cut ? 'sparkle' : 'happy', look: t >= T.lookUp && t < T.cut ? [0, -1] : [-1, 0], seed: 40 + i, glow: 0.5, pop: k })
    })
  }

  // ── the western close-ups (screen space)
  const BAND = [610, 1190]
  function drawECU(t) {
    const [e0, e1, e2, e3] = T.ecu
    if (t < e0 || t >= e3) return
    const kb = ease.outCubic(prog(t, e0, e0 + 0.2)) * (1 - ease.inCubic(prog(t, e3 - 0.2, e3)))
    x.fillStyle = 'rgba(4,2,10,0.97)'; x.fillRect(0, 0, W, BAND[0] * kb); x.fillRect(0, H - (H - BAND[1]) * kb, W, (H - BAND[1]) * kb)
    x.save(); x.beginPath(); x.rect(0, BAND[0], W, BAND[1] - BAND[0]); x.clip()
    if (t < e2) {
      const tau = t < e1, p = prog(t, tau ? e0 : e1, tau ? e1 : e2), size = 1680 + 120 * p
      x.fillStyle = '#120a22'; x.fillRect(0, BAND[0], W, BAND[1] - BAND[0])
      const r = drawStarChar(x, 540 + (tau ? 30 : -30), 900 - size * 0.04 + size * 0.06, size, t, { color: tau ? TAU.color : AQU.color, mood: 'squint', look: tau ? [1, 0] : [-1, 0], blink: 0.3, bob: 0, glow: 0, tips: false, seed: tau ? 12 : 7 })
      if (tau) bandana(r); else headphones(r)
      x.fillStyle = tau ? 'rgba(255,200,120,0.14)' : 'rgba(120,200,255,0.12)'; x.fillRect(0, BAND[0], W, BAND[1] - BAND[0])
    } else {
      // the handshake: two points meet
      const g = x.createLinearGradient(0, BAND[0], 0, BAND[1]); g.addColorStop(0, '#ffc98a'); g.addColorStop(1, '#f39a3a')
      x.fillStyle = g; x.fillRect(0, BAND[0], W, BAND[1] - BAND[0])
      const meet = ease.outBack(prog(t, e2, e2 + 0.3))
      for (const [side, col] of [[-1, TAU.color], [1, AQU.color]]) {
        const tip = 540 + side * (12 + 400 * (1 - meet)), P = 12
        for (let dy = -170; dy <= 170; dy += P) { const reach = Math.abs(dy) * 1.6; const xx = side < 0 ? 0 : tip + reach; const ww = side < 0 ? tip - reach : W - xx; if (ww > 0) { x.fillStyle = OUT; x.fillRect(xx - (side < 0 ? 0 : P), 900 + dy, ww + P, P); x.fillStyle = col; x.fillRect(xx, 900 + dy, ww, P) } }
      }
      if (t >= e2 + 0.25) sparkleRing(t, 540, 900, e2 + 0.25, 10, 200, 0.4, 0.6)
    }
    x.restore()
  }

  // ── the tie-in
  const TALK_AT = { x: 540, y: 760, w: 400 }, ANS_W = 182
  const ANS = [{ x: 388, y: 1260, from: 'tau', tp: T.playA, rot: -0.06 }, { x: 692, y: 1260, from: 'aqu', tp: T.playB, rot: 0.06 }]
  function drawTie(t, toScreen) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.55 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    drawTalkCard(x, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * clamp(tp, 0, 1.2), 'Where do you feel | most *you?*', { rot: (1 - clamp(tp)) * -0.4, alpha: clamp(tp * 3) * (1 - o) })
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = toScreen((C.from === 'tau' ? placeTau(t) : placeAqu(t)).P), p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(S0[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) drawCardBack(x, cx, cy, ANS_W, { rot, sx, alpha: clamp(p * 4) })
      else drawAnswerCard(x, cx, cy, ANS_W, 'Come | see.', { rot, sx: -sx, stampK: prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1) })
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), wk = worldK(t), k = popOut(t, T.out)
        const toScreen = P => [540 + (P[0] - C.fx) * C.s, 1000 + (P[1] - C.fy) * C.s]
        x.save(); x.globalAlpha = wk
        x.translate(540, 1000); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        if (!inCity(t)) {
          drawStarsOut(t)
          drawTrail(t)
          drawWagon(t, 820 + 14 * Math.sin(t * 0.4), ROADY + 120)
          drawRiders(t, k)
          drawCampfire(t)
          drawTau(t, k)
          drawAqu(t, k)
          ono('*munch*', 420, ROADY - 60, t, T.graze[0] + 0.3, { size: 40, life: 0.9, rise: 14 })
          ono('*munch*', 440, ROADY - 70, t, T.graze[0] + 1.0, { size: 40, life: 0.8, rise: 14, rot: 0.1 })
          ono('NO SIGNAL', 560, 1000, t, T.bars, { size: 46, life: 0.9, rise: 14, color: '#ff8a8a' })
          ono('whoa.', 520, 900, t, T.lookUp + 0.1, { size: 64, life: 0.9, rise: 20, color: GOLD, ticks: false })
          ono('*clip clop*', 280, 1080, t, 1.4, { size: 34, life: 1.0, rise: 12, ticks: false })
          ono('*clip clop*', 300, 1080, t, T.back + 0.6, { size: 34, life: 1.0, rise: 12, ticks: false })
          ono('*neigh*', 150, 1060, t, T.mount[1], { size: 40, life: 0.8, rise: 16 })
        } else {
          drawCity(t)
          drawTau(t, k)
          drawAqu(t, k)
          ono('*clop*', 150, 1000, t, T.horse + 0.2, { size: 38, life: 0.8, rise: 14 })
          if (inW(t, T.l7 - 0.3, T.h6)) for (let i = 0; i < 6; i++) { const q = ((t - T.l7) * 0.8 + i / 6) % 1; if (q > 0) drawPixelStar(x, 200 + i * 140, 800 + Math.sin(i * 2) * 120 - q * 40, 24 * Math.sin(q * Math.PI), i % 2, GOLD) }
        }
        if (t >= T.heart1 && t < T.lessonOut[0]) {
          const hk = pop01(t, T.heart1, 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.lesson, T.lesson + 0.3)))
          if (hk > 0.02) { x.save(); x.translate(530, 960 - 6 * Math.sin(t * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 9); x.restore() }
        }
        if (t >= T.heart2) {
          const hk = pop01(t, T.heart2, 0.34, 2.4) * popOut(t, T.out)
          if (hk > 0.02) { x.save(); x.translate(430, 960 - 8 * Math.sin((t - T.heart2) * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 10); x.restore() }
        }
        x.restore()
        drawECU(t)
        drawTie(t, toScreen)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// the one card transition: the trail at dusk → the city rooftop
export const CUTS = [T.cut]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (the whistle is written in A minor on the SFX bus; pop / pluck / bell are re-keyed by the engine)
const { N, FX } = SND
const NA = { E4: 329.63, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880 }
const whistle = (t0, notes, gain = 0.05) => notes.map(([d, f, len, from]) => ['lead', +(t0 + d).toFixed(3), f, len, { ...FX, wave: 'sine', gain, detune: 0.0015, cutoff: 7000, env: 0, vib: 0.014, vibRate: 5.6, from, glide: 0.12, attack: 0.04, decay: 0.25, sustain: 0.85, release: 0.18, rev: 0.55, dly: 0.3 }])
const clop = (t0, n, gap = 0.28) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), 0.035 + 0.01 * (i % 2)])
const twang = (t, f = 110, g = 0.06) => [['pluck', +t.toFixed(3), f, g, 1.4, -0.2], ['pluck', +(t + 0.012).toFixed(3), f * 2, g * 0.5, 1.0, 0.2]]
const PITCH = { [STAU]: 700, [SAQU]: 1000 }
const CUES_ = [
  ['busFx', 'sfx', { gain: 25 }],
  ...whistle(0.2, [[0, NA.A4, 0.34, NA.E4], [0.42, NA.E5, 0.7, NA.D5], [1.2, NA.D5, 0.2], [1.42, NA.E5, 1.0, NA.C5]]),
  ...clop(0.3, 13), ...SND.sob(1.0, N.E6), ...SND.sob(3.0, N.D6),
  // 2 · the swap: close-ups, a handshake
  ...SND.head(T.h1, 1, T.h1Land, 2), ...twang(T.h1Land, 110, 0.07),
  ...T.ecu.slice(0, 3).flatMap((e, i) => [['whoosh', +(e - 0.08).toFixed(3), 0.2, 0.05], ['tick', e, 0.06], ...twang(e + 0.02, [82.41, 87.31, 98][i], 0.05)]),
  ['clap', T.shake, { ...FX, gain: 0.1 }], ...SND.sparkle(T.shake + 0.05),
  // 3 · the trail: mounting, grazing
  ...SND.head(T.h2, 2, T.h2Land, 3), ['whoosh', T.mount[0], 0.4, 0.04], ['chip', T.mount[1], 520, 0.5, { ...FX, wave: 'tri', slide: 8, vib: 0.08, gain: 0.03, decay: 0.3, sustain: 0.6 }],
  ...Array.from({ length: 5 }, (_, i) => ['tick', +(T.graze[0] + 0.3 + i * 0.25).toFixed(3), 0.03]),
  // 4 · campfire, no signal, the stars
  ...SND.head(T.h3, 2, T.h3Land, 1), ['whoosh', T.dusk[0], 1.0, 0.03], ['chip', T.bars, 440, 0.4, { ...FX, wave: 'square', duty: 0.3, slide: -10, gain: 0.03, decay: 0.2, sustain: 0.5 }],
  ['glitter', T.lookUp - 0.1, T.lookUp + 1.2], ['bell', T.lookUp, N.A5, 0.04, 2.0, 0], ['bell', T.lookUp + 0.3, N.E6, 0.03, 2.0, 0.2],
  ...whistle(T.lookUp + 0.2, [[0, NA.E5, 0.5, NA.G5], [0.55, NA.C5, 0.45, NA.E5], [1.05, NA.A4, 0.9, NA.C5]], 0.035),
  // 5 · the city rooftop
  ...SND.head(T.h4, 2, T.h4Land, 0), ['tick', T.doorOpen, 0.06], ['whoosh', T.doorOpen, 0.3, 0.04], ...clop(T.horse, 3, 0.2),
  // 6 · the view
  ...SND.head(T.h5, 1, T.h5Land, 2), ['glitter', T.l7 - 0.2, T.l7 + 0.8],
  // 7 · two worlds, one sky
  ...SND.head(T.h6, 2, T.h6Land, 4), ['whoosh', T.sit[0], 0.4, 0.04], ['pop', T.heart1, N.A5, 0.04, 0], ['bell', T.heart1 + 0.02, N.E6, 0.03, 1.2, 0],
  // 8 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 9 · talk cards
  ...SND.head(T.h7, 2, T.h7Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N.E6, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N.A5, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N.E6, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N.D6, 0.04, -0.3], ['pop', T.flip + 0.4, N.E6, 0.04, 0.3], ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 10 · see you on the trail
  ['whoosh', T.back, 0.5, 0.05], ...SND.head(T.h8, 3, T.h8Land, 0), ...clop(T.back + 0.3, 7),
  ...whistle(T.h8Land + 0.05, [[0, NA.C5, 0.3, NA.A4], [0.34, NA.E5, 0.3], [0.68, NA.G5, 0.3], [1.02, NA.A5, 0.9, NA.G5]], 0.045),
  ['pop', T.heart2, N.A5, 0.04, 0], ['bell', T.heart2 + 0.02, N.E6, 0.03, 1.2, 0], ...SND.sob(T.heart2 + 0.2, N.D6),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_C, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = CUES_.filter(c => typeof c[1] !== 'number' || c[1] >= 0)
