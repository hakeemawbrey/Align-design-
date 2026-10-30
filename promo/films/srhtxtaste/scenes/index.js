// srhtxtaste (20 s vertical, Star Talk Remix of htxtaste "Houston has taste") · story 0–15.6, then the shared end card.
// ♉ Taurus (Venus-ruled, the zodiac's foodie) is Houston's food critic: gingham bib, fork, score paddles.
// ♓ Pisces sits on the right and sobs at the crawfish (they're basically family).
//   0.00–4.40  "Houston | has *taste.*"  Tacos, a kolache and a crawfish pop in on the beat. Taurus scores them in the box:
//              "taco: 10. kolache: 10. crawfish: *11.*" (a paddle per number, the third one twisted). Pisces cries.
//   4.40–8.60  "Your dating app? | *Fast food.*"  The food pops out, a phone pops in, faceless cards swipe faster and faster.
//              Taurus' eyes chase them, then roll. Box: "babe. you'd never pick a taco by its *photo.*" (card cut 8.62)
//   8.62–12.7  "Matched by your | *birth chart.*"  The plate is back with the food on it; it whirls, flings the food (the
//              kolache lands on Taurus' head, the crawfish escapes past a relieved Pisces), its rim becomes a zodiac
//              wheel, a second chart snaps inside and Push / Pull / Align lines draw between the two people's planets.
//              Box: "read the chart first. *that's* taste."
//   12.7–15.4  "Have good | taste in | *people.*"  The locked charts float up with a heart; Taurus eats the kolache off its
//              head in three bites (heart-eyes), Pisces happy-cries. Everything out by 15.42.
// One canvas (sky + props + stars), DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, bibCells, forkCells, drawPhone, drawFaceCard, scoreChip, taco, kolache, crawfish, plate, heart, sparkle, ink, rgba,
  BONE, GOLD, PINK, FIRE, RED, SILVER, CRUST, CYAN, MONO } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const TAU = Math.PI * 2, D2R = Math.PI / 180
const TAU_ = signStar('taurus'), PIS = signStar('pisces')
const TS = '♉ TAURUS STAR'

// ── the timeline
const T = {
  h0: 0.12, h0Late: 0.66, h0Out: [4.22, 4.4],
  tauIn: 0.42, pisIn: 0.9, foods: [BEAT(1), BEAT(2), BEAT(3)],
  open: 1.55, l1: 1.75, foodOut: [4.2, 4.42],
  h1: 4.49, h1Late: 4.95, h1Out: [8.3, 8.48],
  phone: 4.55, sw0: 5.0, l2: 5.55, roll: 7.0, phoneOut: [8.3, 8.5],
  h2: 8.7, h2Late: 9.05, h2Out: [12.55, 12.72],
  plate: [8.66, 9.0], spin: [9.15, BEAT(18)], fling: 9.55, kLand: 10.12, wheelIn: [9.5, 10.0], wB: [9.98, BEAT(18)], lock: BEAT(18),
  dots: BEAT(18.5), lines: [BEAT(19), BEAT(19.4), BEAT(19.8)], l3: 10.95,
  h3: BEAT(22), h3Late: 13.2, move: [12.62, 13.25], heart: 13.62, cheer: BEAT(23) + 0.05,
  bites: [13.95, 14.35, 14.75], close: 14.9,
  out: [15.0, 15.42], h3Out: [15.2, 15.42],
}
const LINES = [
  { t: T.l1, speaker: TS, text: 'taco: 10. kolache: 10. crawfish: *11.*' },
  { t: T.l2, speaker: TS, text: "babe. you'd never pick a taco by its *photo.*" },
  { t: T.l3, speaker: TS, text: "read the chart first. *that's* taste." },
]
const CPS = 30
// the three score paddles pop as Taurus types each number
const LT = lineTimes(LINES, { cps: CPS })
const plain = LINES[0].text.replace(/\*/g, '')
const SCORE_T = [plain.indexOf('10'), plain.indexOf('10', plain.indexOf('10') + 2), plain.indexOf('11')].map(i => LT[0].chars[i + 1])
const SCORES = ['10', '10', '11']

// accelerating swipes on the phone
const GAPS = [0.46, 0.4, 0.34, 0.29, 0.25, 0.21, 0.18, 0.16, 0.14, 0.12, 0.11, 0.1, 0.1, 0.09, 0.09]
const SWIPES = GAPS.reduce((a, g) => [...a, +(a.at(-1) + g).toFixed(3)], [T.sw0]).filter(s => s < T.roll)
const DIRS = SWIPES.map((_, i) => [-1, 1, -1, -1, 1, -1, 1, 1, -1, 1][i % 10])
const HUES = ['#f29a4a', '#3fb6f0', '#e163d6', '#2fc79a', '#f2cf4a', '#a35cf0', '#f0603a', '#38c4ec', '#ef5c94', '#7c74f0']
const lastSwipe = t => { let k = -1; for (let i = 0; i < SWIPES.length; i++) if (t >= SWIPES[i]) k = i; return k }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const SEAT = { x: 290, y: 1262, size: 290 }
const PSEAT = { x: 884, y: 1300, size: 160 }
const C = { x: 540, y: 850 }                       // plate / chart centre
const PS = 0.62                                     // plate scale in beat 3
const WA = { cx: 0, cy: 0, rOut: 440, rIn: 352, rGlyph: 396, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 330, rIn: 258, rGlyph: 294, alpha: 0.92 }
const FOODS = [
  { name: 'TACOS', row: { x: 205, y: 850, s: 0.8 }, onPlate: { a: 210, r: 190, s: 0.72 }, draw: (x, t) => taco(x, t), col: GOLD },
  { name: 'KOLACHES', row: { x: 540, y: 840, s: 0.82 }, onPlate: { a: 90, r: 180, s: 0.74 }, draw: (x, t) => kolache(x, t), col: CRUST },
  { name: 'CRAWFISH', row: { x: 872, y: 862, s: 0.64 }, onPlate: { a: 330, r: 190, s: 0.6 }, draw: (x, t) => crawfish(x, t, 0.5 + 0.5 * Math.sin(t * 9)), col: RED },
]
const CHIP_Y = 1050, LABEL_Y = 616
const PAIRS = [{ a: 30, b: 120, lab: 'PULL', col: GOLD }, { a: 150, b: 260, lab: 'PUSH', col: PINK }, { a: 245, b: 20, lab: 'ALIGN', col: GOLD }]
const R_A = 222, R_B = 128
const ptC = (lon, r, cx, cy, s) => ({ x: cx + Math.cos(Math.PI - lon * D2R) * r * s, y: cy + Math.sin(Math.PI - lon * D2R) * r * s })
const END = { x: 540, y: 905, s: 0.36 }             // where the locked charts float in beat 4

const TAU_HOPS = [T.tauIn + 0.3, ...SCORE_T, ...talkHops(LINES, TS, { cps: CPS }).filter(h => (h > T.l2 && h < T.l2 + 0.6) || h > T.l3), T.kLand + 0.5, T.cheer, T.cheer + 0.62]
const PIS_HOPS = [T.pisIn + 0.3, T.fling + 0.55, T.cheer + 0.12, T.cheer + 0.74, T.cheer + 1.36]

function tauState(t) {
  if (t < T.foods[0]) return { mood: 'neutral', look: [1, -1] }
  if (t < SCORE_T[0]) { const k = t < T.foods[1] ? 0 : t < T.foods[2] ? 1 : 2; return { mood: 'wide', look: [[-1, -1], [1, -1], [1, -1]][k], blink: false } }
  if (t < SCORE_T[2] - 0.05) return { mood: 'heart' }
  if (t < SCORE_T[2] + 0.45) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.phone) return { mood: 'heart' }
  if (t < T.sw0) return { mood: 'neutral', look: [1, -1] }
  if (t < T.roll) { const k = lastSwipe(t); return { mood: 'wide', look: k < 0 ? [1, -1] : [DIRS[k], -1], blink: false } }
  if (t < T.roll + 0.75) return { mood: 'eyeroll' }
  if (t < 8.62) return { mood: 'squint', look: [1, 0] }
  if (t < T.fling) return { mood: 'happy' }
  if (t < T.kLand) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.lock) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.h3) return { mood: t > T.lines[0] ? 'heart' : 'wide', look: [1, -1], blink: false }
  if (t < T.bites[0]) return { mood: 'happy' }
  return { mood: 'heart' }
}
function pisState(t) {
  if (t < T.foods[2]) return { mood: 'neutral', tears: 0 }
  if (t < T.foods[2] + 0.5) return { mood: 'wide', look: [-1, -1], tears: 0, blink: false }
  if (t < T.phone) return { mood: 'squint', tears: 3 }
  if (t < 8.62) return { mood: 'squint', tears: 2 }
  if (t < T.fling) return { mood: 'squint', tears: 1 }
  if (t < T.fling + 0.5) return { mood: 'wide', look: [1, -1], tears: 0, blink: false }
  if (t < T.h3) return { mood: 'happy', tears: 0 }
  return { mood: 'happy', tears: 3 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Houston | has *taste.*', { top: 150, size: 150, accentSize: 190, at: T.h0, accentColor: FIRE, wobble: true, late: 1, lateAt: T.h0Late, lineHeight: 0.98 })
  const H1 = popText(root, 'Your dating app? | *Fast food.*', { top: 190, size: 100, accentSize: 150, at: T.h1, gap: 0.07, accentColor: RED, wobble: true, late: 2, lateAt: T.h1Late, lateGap: 0.14, fit: true })
  const H2 = popText(root, 'Matched by your | *birth chart.*', { top: 190, size: 104, accentSize: 140, at: T.h2, gap: 0.07, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h2Late, lateGap: 0.12, fit: true })
  const H3 = popText(root, 'Have good | taste in | *people.*', { top: 140, size: 120, accentSize: 170, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Late, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── beat 1: the food row, labels and score paddles
  function drawFoodRow(t) {
    if (t > T.foodOut[1]) return
    const ok = popOut(t, T.foodOut)
    FOODS.forEach((F, i) => {
      const k = pop01(t, T.foods[i], 0.42, 2.4) * ok
      if (k <= 0) return
      const sq = t > T.foods[i] ? 1 + 0.12 * Math.sin((t - T.foods[i]) * 20) * Math.exp(-(t - T.foods[i]) * 6) : 1
      // the "11" makes every food jump
      const j = t > SCORE_T[2] ? Math.abs(Math.sin((t - SCORE_T[2]) * 12)) * Math.exp(-(t - SCORE_T[2]) * 4) * 30 : 0
      x.save(); x.translate(F.row.x, F.row.y - j); x.scale(F.row.s * k / sq, F.row.s * k * sq); F.draw(x, t); x.restore()
      const lk = pop01(t, T.foods[i] + 0.12, 0.3) * ok
      if (lk > 0) {
        x.save(); x.translate(F.row.x, LABEL_Y); x.scale(lk, lk); x.globalAlpha = clamp(lk * 2)
        x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 16; x.fillStyle = F.col; x.fillText(F.name, 0, 0)
        x.restore()
      }
      sparkle(x, F.row.x, F.row.y, t, T.foods[i] + 0.1, { n: 9, R: 170, seed: 3 + i, size: 24 })
      // paddle
      const pk = pop01(t, SCORE_T[i], 0.36, i === 2 ? 3.2 : 2.2) * ok
      const big = i === 2 ? 1.18 : 1
      scoreChip(x, F.row.x, CHIP_Y, SCORES[i], pk * big, i === 2 ? FIRE : GOLD)
      sparkle(x, F.row.x, CHIP_Y, t, SCORE_T[i], { n: i === 2 ? 14 : 8, R: i === 2 ? 220 : 130, seed: 11 + i, size: 24, cols: i === 2 ? [FIRE, GOLD, '#fff3e0', PINK] : undefined })
    })
  }

  // ── beat 2: the phone, swiping faces
  function drawPhoneBeat(t) {
    if (t < T.phone || t > T.phoneOut[1]) return
    const k = pop01(t, T.phone, 0.4, 2.0) * popOut(t, T.phoneOut)
    if (k <= 0.01) return
    const tilt = 0.05 * Math.sin(t * 1.4)
    x.save(); x.translate(540, 830); x.scale(k, k)
    drawPhone(x, 0, 0, 360, 600, { rot: tilt, screen: (sx, sy, sw, sh) => {
      const mid = sx + sw / 2, cy = sy + sh * 0.46, cw = sw * 0.78, chh = sh * 0.66
      const kk = lastSwipe(t)
      for (let d = 2; d >= 1; d--) drawFaceCard(x, mid + d * 8, cy + d * 6, cw, chh, HUES[(kk + 1 + d) % HUES.length], 0, 0.9)
      drawFaceCard(x, mid, cy, cw, chh, HUES[(kk + 1) % HUES.length], 0, 1)
      for (let i = Math.max(0, kk - 3); i <= kk; i++) {
        const p = prog(t, SWIPES[i], SWIPES[i] + 0.24)
        if (p >= 1) continue
        const e = ease.inCubic(p), dx = DIRS[i] * e * sw * 0.9
        if ((GAPS[i] || 0.1) < 0.2) for (let g = 3; g >= 1; g--) drawFaceCard(x, mid + dx - DIRS[i] * g * 26, cy, cw, chh, HUES[i % HUES.length], DIRS[i] * e * 0.5, 0.18)
        drawFaceCard(x, mid + dx, cy - Math.sin(Math.PI * p) * 16, cw, chh, HUES[i % HUES.length], DIRS[i] * e * 0.5, 1)
      }
      // ✕ / ♥ buttons
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = RED; x.fillText('✕', mid - 70, sy + sh - 42); x.fillStyle = PINK; x.fillText('♥', mid + 70, sy + sh - 42)
      // speed lines once it's a blur
      const fast = SWIPES[5] ? clamp((t - SWIPES[5]) / 0.6) * (t < T.roll ? 1 : 1 - clamp((t - T.roll) / 0.3)) : 0
      if (fast > 0) { x.fillStyle = `rgba(255,143,177,${0.5 * fast})`; for (let i = 0; i < 7; i++) { const yy = sy + 30 + ((i * 53 + t * 900) % (sh - 60)); x.fillRect(sx + ((i * 37) % 40), yy, 90 + (i % 3) * 30, 4) } }
    } })
    x.restore()
    // FAST FOOD stamp-ish tag when the eyes roll
    const sk = pop01(t, T.roll, 0.3, 2.6) * popOut(t, T.phoneOut)
    if (sk > 0) {
      x.save(); x.translate(540, 1010); x.rotate(-0.08); x.scale(sk, sk)
      x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 6; x.strokeStyle = RED; x.shadowColor = RED; x.shadowBlur = 16
      x.strokeRect(-210, -40, 420, 80); x.shadowBlur = 0; x.fillStyle = RED; x.fillText('0 REVIEWS', 0, 3)
      x.restore()
    }
  }

  // ── beat 3/4: the plate → charts
  const rotA = t => -2.5 * TAU * ease.inOutCubic(prog(t, ...T.spin))
  function chartPose(t) {
    const mv = ease.inOutCubic(prog(t, ...T.move))
    return { cx: lerp(C.x, END.x, mv), cy: lerp(C.y, END.y, mv) + Math.sin(t * 2.2) * 8 * mv, s: lerp(PS, END.s, mv), mv }
  }
  function foodOnPlate(i, t, tauTop) {
    const F = FOODS[i], P = chartPose(t)
    const ra = rotA(t) - F.onPlate.a * D2R
    let px = P.cx + Math.cos(ra) * F.onPlate.r * PS / 0.62 * 0.62, py = P.cy + Math.sin(ra) * F.onPlate.r * PS / 0.62 * 0.62
    let s = F.onPlate.s * PS, rot = rotA(t), fa = 1
    const fl = prog(t, T.fling + i * 0.05, i === 1 ? T.kLand : T.fling + i * 0.05 + 0.55)
    if (fl > 0) {
      if (i === 1) {                                     // the kolache arcs onto Taurus' head
        const e = ease.inOutQuad(fl)
        px = lerp(px, tauTop.x, e); py = lerp(py, tauTop.y, e) - Math.sin(Math.PI * fl) * 340; rot += fl * 6.28 * 2; s = lerp(s, 0.34, e)
      } else {
        if (fl >= 1) return null
        const dir = i === 0 ? Math.PI * 1.1 : -0.15
        const out = ease.inQuad(fl) * 900
        px += Math.cos(dir) * out; py += Math.sin(dir) * out - Math.sin(Math.PI * fl) * 160; rot += fl * 9; s *= 1 - 0.3 * fl; fa = clamp(1 - fl * 1.2)
      }
    }
    return { px, py, s, rot, fa }
  }
  function drawCharts(t) {
    if (t < T.plate[0] || t > T.out[1]) return
    const P = chartPose(t), ok = popOut(t, T.out)
    const pk = pop01(t, T.plate[0], 0.4, 1.6)
    const wk = ease.inOutQuad(prog(t, ...T.wheelIn))
    const bump = t > T.lock ? 1 + 0.07 * Math.exp(-(t - T.lock) * 7) : 1
    const idle = t > T.lock ? (t - T.lock) * 0.25 : 0
    const sa = P.s * bump * ok * pk
    x.save(); x.translate(P.cx, P.cy); x.rotate(rotA(t) + idle); x.scale(sa, sa)
    plate(x, WA.rOut, WA.rIn, 1 - wk)
    if (wk > 0) {
      x.save(); x.globalAlpha = wk; x.beginPath(); x.arc(0, 0, WA.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.75)'; x.fill(); x.restore()
      drawWheelH(x, { W: WA, k: wk, glyphK: wk })
    }
    x.restore()
    // swooshes while it whirls
    const sv = Math.sin(Math.PI * prog(t, T.spin[0] + 0.2, T.spin[1] - 0.3))
    if (sv > 0.01) {
      x.save(); x.globalAlpha = 0.7 * sv
      for (let k = 0; k < 3; k++) { const a0 = rotA(t) + k * TAU / 3; x.beginPath(); x.arc(C.x, C.y, WA.rOut * PS + 30, a0, a0 + 0.9); ink(x, GOLD, { w: 8, fa: 0, glow: 22 }) }
      x.restore()
    }
    sparkle(x, C.x, C.y, t, T.wheelIn[0] + 0.1, { n: 14, R: 360, seed: 21, size: 26 })
    // wheel B flies in and snaps inside on the lock beat
    if (t >= T.wB[0]) {
      const pb = easeOutBack(prog(t, T.wB[0], T.lock), 1.2)
      const rb = 2.2 * TAU * (1 - ease.outCubic(prog(t, T.wB[0], T.lock)))
      const bx = lerp(1400, P.cx, pb), by = lerp(-200, P.cy, pb)
      const bs = lerp(1.4, 1, pb) * P.s * bump * ok
      x.save(); x.translate(bx, by); x.rotate(rb - idle * 1.3); x.scale(bs, bs)
      x.beginPath(); x.arc(0, 0, WB.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.82)'; x.fill()
      drawWheelH(x, { W: WB })
      x.restore()
    }
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(C.x, C.y, 220 + 160 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 14 * (1 - fk) + 2, fa: 0, glow: 34 }); x.restore() }
    sparkle(x, C.x, C.y, t, T.lock, { n: 18, R: 360, seed: 31, size: 30 })
    // planets + Push / Pull / Align lines (they ride along as the charts float up)
    if (t >= T.dots) PAIRS.forEach((Q, i) => {
      const A_ = ptC(Q.a, R_A, P.cx, P.cy, sa / 1), B_ = ptC(Q.b, R_B, P.cx, P.cy, sa / 1)
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * ok
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.34))
      if (lk > 0) {
        const pulse = 1 + 0.3 * Math.exp(-Math.max(0, t - T.lines[i] - 0.34) * 4)
        x.save(); x.globalAlpha = ok; x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, Q.col, { w: 9 * pulse * lerp(1, 0.6, P.mv), fa: 0, glow: 28 }); x.restore()
        // label chip at the line's midpoint (fades as the charts float up)
        const la = pop01(t, T.lines[i] + 0.2, 0.3, 2.4) * (1 - P.mv) * ok
        if (la > 0) {
          const mx = (A_.x + B_.x) / 2, my = (A_.y + B_.y) / 2
          x.save(); x.translate(mx, my); x.scale(la, la)
          x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
          const w = x.measureText(Q.lab).width + 28
          x.fillStyle = 'rgba(16,9,38,0.92)'; x.fillRect(-w / 2, -24, w, 48); x.strokeStyle = Q.col; x.lineWidth = 4; x.strokeRect(-w / 2, -24, w, 48)
          x.fillStyle = Q.col; x.fillText(Q.lab, 0, 2)
          x.restore()
        }
      }
      if (dk > 0) { orb(A_.x, A_.y, 20 * dk * lerp(1, 0.7, P.mv), GOLD, clamp(dk * 2)); orb(B_.x, B_.y, 20 * dk * lerp(1, 0.7, P.mv), SILVER, clamp(dk * 2)) }
    })
    // the heart over the locked pair
    const hk = pop01(t, T.heart, 0.45, 3) * ok
    if (hk > 0) {
      const beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.heart) * 8))
      x.save(); x.translate(P.cx, P.cy - 205); heart(x, 64 * hk * beat, PINK, clamp(hk * 2)); x.restore()
      sparkle(x, P.cx, P.cy - 205, t, T.heart, { n: 16, R: 260, seed: 61, size: 28 })
    }
  }
  function orb(px, py, r, col, a) {
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(px, py, 0, px, py, r * 3.2); g.addColorStop(0, rgba(col, 0.75)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 3.2, 0, TAU); x.fill()
    x.globalCompositeOperation = 'source-over'
    x.beginPath(); x.arc(px, py, r, 0, TAU); x.fillStyle = col; x.fill()
    x.restore()
  }
  function drawPlateFood(t, tauTop) {
    if (t < T.plate[0] || t > T.kLand) return
    const pk = pop01(t, T.plate[0], 0.4, 1.6)
    FOODS.forEach((F, i) => {
      const Q = foodOnPlate(i, t, tauTop)
      if (!Q) return
      x.save(); x.globalAlpha = Q.fa; x.translate(Q.px, Q.py); x.rotate(Q.rot); x.scale(Q.s * pk, Q.s * pk); F.draw(x, t); x.restore()
    })
  }
  // the kolache on Taurus' head (after landing), eaten in three bites
  function drawHatKolache(t, top, ok) {
    if (t < T.kLand) return
    const bitten = T.bites.filter(b => t >= b).length
    if (bitten >= 3) return
    const land = t - T.kLand
    const sq = 1 + 0.18 * Math.sin(land * 22) * Math.exp(-land * 6)
    const s = 0.34 * ok * (1 - bitten * 0.22)
    x.save(); x.translate(top.x, top.y - 8); x.scale(s / sq, s * sq)
    kolache(x, t, 1)
    // bite marks: dark scallops on the right edge
    if (bitten > 0) {
      x.globalCompositeOperation = 'destination-out'
      for (let b = 0; b < bitten; b++) { x.beginPath(); x.arc(118 - b * 30, -30 + b * 34, 42, 0, TAU); x.fill() }
      x.globalCompositeOperation = 'source-over'
    }
    x.restore()
    for (let b = 0; b < 3; b++) sparkle(x, top.x + 30, top.y, t, T.bites[b], { n: 8, R: 90, seed: 70 + b, size: 18, cols: ['#fff1cf', CRUST, BONE], dur: 0.5 })
  }

  function drawPisces(t, ok) {
    const pp = pop01(t, T.pisIn, 0.36, 2.1) * ok
    if (pp <= 0.02) return
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    drawStarChar(x, PSEAT.x, PSEAT.y, PSEAT.size, t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
    const F = starFrame(PSEAT.x, PSEAT.y, PSEAT.size, t, opts)
    inSprite(x, F, () => tearsCells(x, t, st.tears))
  }
  function drawTaurus(t, ok) {
    const tp = pop01(t, T.tauIn, 0.38, 2.2) * ok
    if (tp <= 0.02) return null
    const st = tauState(t)
    let squash = 0
    if (t >= T.kLand && t < T.kLand + 0.5) squash = 0.22 * Math.exp(-(t - T.kLand) * 8) * Math.cos((t - T.kLand) * 24)
    for (const b of T.bites) if (t >= b && t < b + 0.3) squash += -0.08 * Math.sin(Math.PI * (t - b) / 0.3)
    if (t >= T.roll && t < T.roll + 0.5) squash += 0.05 * Math.sin((t - T.roll) * 30) * (1 - (t - T.roll) / 0.5)
    const opts = { hops: TAU_HOPS, seed: 3, pop: tp, squash }
    const r = drawStarChar(x, SEAT.x, SEAT.y, SEAT.size, t, { color: TAU_.color, glyph: TAU_.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1, ...opts })
    const F = starFrame(SEAT.x, SEAT.y, SEAT.size, t, opts)
    const raise = t > SCORE_T[2] && t < SCORE_T[2] + 1.2 ? Math.sin(Math.PI * prog(t, SCORE_T[2], SCORE_T[2] + 1.2)) : 0
    inSprite(x, F, () => {
      bibCells(x); forkCells(x, raise)
      if (t >= T.roll && t < 8.62) sweatCells(x, t)
    })
    return r
  }
  function hearts(t, t0, n, cx, cy) {
    for (let i = 0; i < n; i++) {
      const born = t0 + i * 0.36, p = (t - born) / 1.2
      if (p < 0 || p >= 1) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * p); drawPixelStar(x, cx + Math.sin(p * 6 + i) * 34 + (i % 2 ? 40 : -40), cy - p * 200, 22, 2, PINK); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        drawCharts(t)
        drawFoodRow(t)
        drawPhoneBeat(t)
        drawPisces(t, ok)
        const r = drawTaurus(t, ok)
        const top = r ? { x: r.x, y: r.top } : { x: SEAT.x, y: SEAT.y - 140 }
        drawPlateFood(t, top)
        drawHatKolache(t, top, ok)
        if (t > SCORE_T[0] && t < T.phone) hearts(t, SCORE_T[0] + 0.1, 6, SEAT.x, SEAT.y - 150)
        if (t > T.bites[0]) hearts(t, T.bites[0], 4, SEAT.x, SEAT.y - 190)
        if (t >= T.cheer) sparkle(x, 540, 1160, t, T.cheer, { n: 14, R: 380, seed: 4, size: 28, cols: [GOLD, PINK, BONE, CYAN] })
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.44 (food → phone), 8.62 (phone → plate), 12.76 (charts → people).
// cardfx keeps one for a 20 s film: the 8.62 flip, which also hides the phone → plate swap.
const CUTS = [4.44, { t: 8.62, kind: 'flip' }, 12.76]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/clap sit on a private sfx bus)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const chomp = t => [['tom', t, 150, { ...FX, gain: 0.12, decay: 0.08 }], ['tick', t + 0.02, 0.06], ['chip', t + 0.04, 520, 0.06, { ...FX, wave: 'square', duty: 0.25, gain: 0.012, decay: 0.05, sustain: 0.4 }]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.06, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook: the food
  ...wordPops(T.h0, 2, 0.08, 0, 0.026), ['pop', T.h0Late, 1318.51, 0.055, 0], ['pluck', T.h0Late, 1174.66, 0.05, 0.6, 0], ['whoosh', 0.05, 0.4, 0.03],
  ['pop', T.tauIn + 0.05, 739.99, 0.045, -0.3], ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4],
  ...T.foods.map((f, i) => ['pop', f, [587.33, 739.99, 880][i], 0.06, (i - 1) * 0.5]),
  ...T.foods.map((f, i) => ['pluck', +(f + 0.03).toFixed(3), [293.66, 369.99, 440][i], 0.04, 0.35, (i - 1) * 0.5]),
  ['tick', T.foods[2] + 0.2, 0.05], ['tick', T.foods[2] + 0.35, 0.05],
  ...sob(T.foods[2] + 0.55, 1320), ...sob(3.4, 1250, 2),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [TS]: 587.33 } }),
  ...SCORE_T.slice(0, 2).map((s, i) => ['bell', s, [987.77, 1174.66][i], 0.04, 1.0, (i - 0.5) * 0.6]),
  ['boom', SCORE_T[2], 0.12], ['bell', SCORE_T[2], 1318.51, 0.05, 1.4, 0.4], ['glitter', SCORE_T[2], SCORE_T[2] + 0.6],
  // the phone
  ['whoosh', T.foodOut[0], 0.3, 0.04], ...head(T.h1, 3, 0.07, T.h1Late, 2), ['pop', T.h1Late + 0.14, 1318.51, 0.045, 0],
  ['pop', T.phone + 0.05, 440, 0.045, 0],
  ...SWIPES.map((s, i) => ['whoosh', s, 0.14, Math.min(0.08, 0.025 + i * 0.005)]),
  ...SWIPES.map((s, i) => ['tick', s, 0.02 + Math.min(0.04, i * 0.003)]),
  ['tapeStop', T.roll - 0.3, 0.3], ['pluck', T.roll, 392, 0.04, 0.6, 0], ['pluck', T.roll + 0.18, 349.23, 0.04, 0.6, 0],
  ['tom', T.roll + 0.05, 90, { ...FX, gain: 0.2, decay: 0.25 }], ['clap', T.roll + 0.06, { ...FX, gain: 0.08 }],
  ...sob(5.2, 1400), ...sob(6.6, 1480, 2),
  // the plate → charts
  ...head(T.h2, 3, 0.07, T.h2Late, 1), ['pop', T.h2Late + 0.12, 1318.51, 0.045, 0],
  ['whoosh', T.plate[0], 0.4, 0.04], ['riser', T.spin[0], T.lock, 0.045],
  ['whoosh', T.fling, 0.5, 0.05], ['pop', T.fling + 0.05, 987.77, 0.04, -0.5], ['pop', T.fling + 0.15, 880, 0.04, 0.5],
  ['tom', T.kLand, 120, { ...FX, gain: 0.2, decay: 0.15 }], ['pop', T.kLand + 0.02, 659.25, 0.05, -0.3],
  ['pluck', T.fling + 0.55, 1174.66, 0.035, 0.5, 0.5],
  ['glitter', T.wheelIn[0] + 0.1, T.wheelIn[1]], ['whoosh', T.wB[0], 0.5, 0.045],
  ['boom', T.lock, 0.13], ['bell', T.lock, 587.33, 0.05, 2.0, 0], ['glitter', T.lock, T.lock + 0.6],
  ['pop', T.dots, 880, 0.045, -0.3], ['pop', T.dots + 0.08, 987.77, 0.045, 0], ['pop', T.dots + 0.16, 1174.66, 0.045, 0.3],
  ...T.lines.map((l, i) => ['pluck', +(l + 0.3).toFixed(3), [987.77, 1174.66, 1318.51][i], 0.045, 0.7, (i - 1) * 0.4]),
  // have good taste in people
  ['whoosh', T.move[0], 0.5, 0.035],
  ...wordPops(T.h3, 5, 0.08, 2, 0.028), ['pop', T.h3Late, 1318.51, 0.055, 0], ['pluck', T.h3Late, 1174.66, 0.05, 0.7, 0],
  ['bell', T.heart, 1174.66, 0.05, 1.4, 0], ['bell', T.heart + 0.08, 1760, 0.035, 1.4, 0.2], ['glitter', T.heart, T.heart + 0.6],
  ...cheers(T.cheer, T.cheer + 1.6), ...T.bites.flatMap(chomp),
  ...sob(T.cheer + 0.3, 1568), ...sob(T.cheer + 1.0, 1660, 2),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
