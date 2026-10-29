// stmagic props: small pixel drawings on canvas (Star Talk "Wild Lessons" #14 "The Great Starzini."). Every function is a
// pure function of its arguments; nothing touches `document` at module top level.
//   starFrame / inSprite              the transform drawStarChar uses (same maths as startalk.js), so props drawn in sprite
//                                     CELLS (the 36-cell grid) stay seated through hops and squash
//   tearsCells · sweatCell            props in sprite cells
//   hatCells · capeCells · bowCells · wandCells · tiaraCells   the magician's kit (in cells)
//   drawStage · drawMarquee · drawTable · drawSpot · drawFootlights   the dinner-theatre stage in the night sky
//   drawMagicHat · drawPedestal       trick 1: the hat the question vanishes into
//   drawFlag · drawDrape              trick 2: the red flag and the little curtain on a frame
//   drawBox · drawSaw · drawFight     trick 3: the sawing box and the fight (an angry scribble)
//   drawQBubble                       the unanswered question (a speech bubble you can hold)
//   drawDove · drawRabbit · drawFlower · drawTalkCard · drawHeart · dustPuff · confetti · sparkleBurst
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
export const CURTAIN = '#c8283f', FLAG_RED = '#ff4a5e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ─────────────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
const G = 36, HALF = 18, SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** happy tears from both eyes, k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a nervous sweat drop on the upper-left of the head (k 0…1 slides down) */
export function sweatCell(ctx, k) {
  if (k <= 0) return
  const y = 9 + 4 * clamp(k)
  ctx.fillStyle = INK; ctx.fillRect(6.6, y - 0.4, 2.8, 3.6)
  ctx.fillStyle = '#9fe9ff'; ctx.fillRect(7, y, 2, 2.8); ctx.fillRect(7.5, y - 0.6, 1, 0.8)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(7.2, y + 0.4, 0.6, 0.8)
}

// ─────────────────────────────────────────────── bitmap helper
/** rows of chars → pixels; pal maps char → colour. Draws a 1-px ink outline first (outline = null for none). (x, y) = top-left. */
export function bitmap(ctx, rows, pal, x, y, px, outline = INK) {
  const on = (i, j) => j >= 0 && j < rows.length && i >= 0 && i < rows[j].length && pal[rows[j][i]]
  if (outline) {
    ctx.fillStyle = outline
    rows.forEach((r, j) => [...r].forEach((ch, i) => {
      if (!pal[ch]) return
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!on(i + a, j + b)) ctx.fillRect(x + (i + a) * px, y + (j + b) * px, px + 0.5, px + 0.5)
    }))
  }
  rows.forEach((r, j) => [...r].forEach((ch, i) => { const c = pal[ch]; if (c) { ctx.fillStyle = c; ctx.fillRect(x + i * px, y + j * px, px + 0.5, px + 0.5) } }))
}

// ─────────────────────────────────────────────── the magician's kit (in sprite cells)
const HAT = [
  '...hKKKKKKKK...',
  '...hKKKKKKKK...',
  '...hKKKKKKKK...',
  '...hKKKKKKKK...',
  '...hKKKKKKKK...',
  '...RRRRRRRRR...',
  '...rRRRRRRRR...',
  'hhKKKKKKKKKKKKK',
  '.KKKKKKKKKKKKK.',
]
const HAT_PAL = { K: '#2e2350', h: '#6c5aa8', R: '#e0405a', r: '#ff8a9a' }
/** the top hat on the head. tilt (rad) around the brim centre; down (cells): slide it down over the eyes */
export function hatCells(ctx, { tilt = -0.12, down = 0, lift = 0 } = {}) {
  ctx.save(); ctx.translate(18, 5.5 + down - lift); ctx.rotate(tilt)
  bitmap(ctx, HAT, HAT_PAL, -7.5, -8, 1, '#0a0618')
  ctx.restore()
}
/** the cape behind the body: a red trapezoid with a gold hem, the bottom edge flutters */
export function capeCells(ctx, t, { flap = 1 } = {}) {
  ctx.save()
  const wav = i => Math.sin(t * 5 + i * 0.9) * 0.9 * flap
  ctx.fillStyle = '#0a0618'
  ctx.beginPath(); ctx.moveTo(8.5, 12); ctx.lineTo(27.5, 12)
  for (let i = 0; i <= 8; i++) ctx.lineTo(lerp(35, 1, i / 8), 35.5 + wav(i))
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#a81e34'
  ctx.beginPath(); ctx.moveTo(9.5, 13); ctx.lineTo(26.5, 13)
  for (let i = 0; i <= 8; i++) ctx.lineTo(lerp(34, 2, i / 8), 34.5 + wav(i))
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = GOLD
  for (let i = 0; i < 8; i++) { const x0 = lerp(34, 2, i / 8), y0 = 34.5 + wav(i); ctx.fillRect(Math.min(x0, lerp(34, 2, (i + 1) / 8)), y0 - 0.2, 4.1, 1) }
  ctx.restore()
}
/** a red bow tie under the eyes */
export function bowCells(ctx) {
  bitmap(ctx, ['RR...RR', 'RRRkRRR', 'RR...RR'], { R: '#e0405a', k: '#ffd36b' }, 14.5, 26, 1, '#0a0618')
}
/** the wand from the right arm tip; ang = direction (rad, 0 = right, −π/2 = up); a sparkle at the tip when spark > 0 */
export function wandCells(ctx, t, { ang = -0.9, spark = 0, flower = 0 } = {}) {
  ctx.save(); ctx.translate(31.5, 15.5); ctx.rotate(ang)
  ctx.fillStyle = '#0a0618'; ctx.fillRect(-0.6, -1.1, 12.2, 2.2)
  ctx.fillStyle = '#1d1630'; ctx.fillRect(0, -0.6, 9, 1.2)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(9, -0.6, 2.4, 1.2)
  ctx.restore()
  if (flower > 0) {
    const tx = 31.5 + Math.cos(ang) * 12.5, ty = 15.5 + Math.sin(ang) * 12.5, k = easeOutBack(clamp(flower), 2.4)
    ctx.save(); ctx.translate(tx, ty); ctx.scale(k, k)
    bitmap(ctx, ['.pp.pp.', 'ppppppp', 'ppyyypp', 'ppyyypp', '.ppppp.', '..ggg..', '...g...'], { p: PINK, y: '#ffd36b', g: '#46cf82' }, -3.5, -4, 1, '#0a0618')
    ctx.restore()
  }
  if (spark > 0) {
    const tx = 31.5 + Math.cos(ang) * 11.5, ty = 15.5 + Math.sin(ang) * 11.5
    ctx.save(); ctx.globalAlpha *= clamp(spark)
    const s = 1.2 + 0.8 * Math.abs(Math.sin(t * 14))
    ctx.fillStyle = '#fff6c8'; ctx.fillRect(tx - s * 1.5, ty - 0.5, s * 3, 1); ctx.fillRect(tx - 0.5, ty - s * 1.5, 1, s * 3)
    ctx.fillStyle = GOLD; ctx.fillRect(tx - 0.5, ty - 0.5, 1, 1)
    ctx.restore()
  }
}
/** the assistant's tiara on Pisces' top tip */
export function tiaraCells(ctx, t) {
  bitmap(ctx, ['g.g.g', 'gpgpg', 'ggggg'], { g: GOLD, p: PINK }, 15.5, 1, 1, '#0a0618')
  if ((t * 1.3) % 1 < 0.15) { ctx.fillStyle = '#ffffff'; ctx.fillRect(17.5, 0.5, 1, 1) }
}

// ─────────────────────────────────────────────── the stage
/** the side curtains, the valance and the boards. open 0…1 (the curtains part in the hook). */
export function drawStage(ctx, t, { open = 1, W = 1080, top = 420, floor = 1410 } = {}) {
  // boards
  ctx.fillStyle = INK; ctx.fillRect(0, floor - 8, W, 90)
  ctx.fillStyle = '#5a3a2e'; ctx.fillRect(0, floor, W, 70)
  ctx.fillStyle = '#7a5040'; ctx.fillRect(0, floor, W, 10)
  ctx.fillStyle = '#3e2820'; for (let k = 0; k < 9; k++) ctx.fillRect(60 + k * 125 + ((k % 2) * 30), floor + 14, 6, 52)
  ctx.fillStyle = '#2e1c18'; ctx.fillRect(0, floor + 44, W, 4)
  // side curtains: closed = meet in the middle; open = tied back at the sides
  const half = W / 2
  const wOpen = 130, w = lerp(half + 10, wOpen, ease.inOutCubic(clamp(open)))
  for (const side of [-1, 1]) {
    ctx.save()
    if (side > 0) { ctx.translate(W, 0); ctx.scale(-1, 1) }
    const folds = 6
    for (let f = 0; f < folds; f++) {
      const x0 = (f / folds) * w, fw = w / folds + 1
      ctx.fillStyle = f % 2 ? '#a81e34' : CURTAIN
      // tied-back curtains pinch in near the tie (y ≈ 1000)
      ctx.beginPath(); ctx.moveTo(x0, top)
      const pinch = open > 0.5 ? (1 - x0 / w) * 0 : 0
      ctx.lineTo(x0 + fw, top); ctx.lineTo(x0 + fw - pinch, floor); ctx.lineTo(x0 - pinch, floor); ctx.closePath(); ctx.fill()
      ctx.fillStyle = 'rgba(255,140,150,0.18)'; ctx.fillRect(x0 + 4, top, 6, floor - top)
    }
    // the edge + gold tie-back
    ctx.fillStyle = '#0a0618'; ctx.fillRect(w - 2, top, 8, floor - top)
    if (open > 0.6) { ctx.fillStyle = INK; ctx.fillRect(w - 46, 1000, 56, 26); ctx.fillStyle = GOLD; ctx.fillRect(w - 42, 1004, 48, 18); ctx.fillStyle = '#fff1c8'; ctx.fillRect(w - 42, 1004, 48, 4) }
    ctx.restore()
  }
  // valance across the top, scalloped
  ctx.fillStyle = '#0a0618'; ctx.fillRect(0, top - 34, W, 70)
  ctx.fillStyle = '#8f1a2e'; ctx.fillRect(0, top - 30, W, 56)
  for (let k = 0; k < 12; k++) { ctx.fillStyle = '#0a0618'; ctx.beginPath(); ctx.arc(45 + k * 90, top + 26, 46, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#8f1a2e'; ctx.beginPath(); ctx.arc(45 + k * 90, top + 22, 42, 0, Math.PI); ctx.fill() }
  ctx.fillStyle = GOLD; for (let k = 0; k < 12; k++) ctx.fillRect(41 + k * 90, top + 60, 8, 8)
  ctx.fillStyle = GOLD; ctx.fillRect(0, top - 30, W, 6)
}
/** the bulb sign "THE GREAT STARZINI": bulbs chase around the border */
export function drawMarquee(ctx, cx, cy, t, { k = 1, text = 'THE GREAT STARZINI', w = 840, h = 104, chase = 1 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k)
  ctx.fillStyle = '#0a0618'; ctx.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  ctx.fillStyle = '#3a1030'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#5a1a44'; ctx.fillRect(-w / 2, -h / 2, w, 8)
  // bulbs
  const n = 30, per = (w + h) * 2
  for (let i = 0; i < n; i++) {
    const d = (i / n) * per
    let bx, by
    if (d < w) { bx = -w / 2 + d; by = -h / 2 } else if (d < w + h) { bx = w / 2; by = -h / 2 + (d - w) } else if (d < 2 * w + h) { bx = w / 2 - (d - w - h); by = h / 2 } else { bx = -w / 2; by = h / 2 - (d - 2 * w - h) }
    const lit = chase <= 0 ? 0.25 : ((Math.floor(t * 9 * chase) + i) % 3 === 0 ? 1 : 0.35)
    ctx.fillStyle = INK; ctx.fillRect(bx - 9, by - 9, 18, 18)
    ctx.fillStyle = lit > 0.5 ? '#fff4c2' : '#a08040'; ctx.fillRect(bx - 6, by - 6, 12, 12)
    if (lit > 0.5) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,220,120,0.25)'; ctx.fillRect(bx - 16, by - 16, 32, 32); ctx.restore() }
  }
  ctx.font = `700 54px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = '#0a0618'; ctx.fillText(text, 3, 7)
  ctx.fillStyle = GOLD; ctx.fillText(text, 0, 3)
  ctx.restore()
}
/** a soft spotlight cone from (x0, y0) to a pool at (x1, y1) */
export function drawSpot(ctx, x0, y0, x1, y1, r, k, col = '255,236,180') {
  if (k <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(x0, y0, x1, y1)
  g.addColorStop(0, `rgba(${col},${0.02 * k})`); g.addColorStop(1, `rgba(${col},${0.16 * k})`)
  ctx.fillStyle = g
  ctx.beginPath(); ctx.moveTo(x0 - 20, y0); ctx.lineTo(x0 + 20, y0); ctx.lineTo(x1 + r, y1); ctx.lineTo(x1 - r, y1); ctx.closePath(); ctx.fill()
  const p = ctx.createRadialGradient(x1, y1, 0, x1, y1, r * 1.1)
  p.addColorStop(0, `rgba(${col},${0.22 * k})`); p.addColorStop(1, `rgba(${col},0)`)
  ctx.fillStyle = p; ctx.save(); ctx.translate(x1, y1); ctx.scale(1, 0.25); ctx.beginPath(); ctx.arc(0, 0, r * 1.1, 0, TAU); ctx.restore(); ctx.fill()
  ctx.restore()
}
export function drawFootlights(ctx, y, t, { W = 1080 } = {}) {
  for (let k = 0; k < 10; k++) {
    const x = 70 + k * 104
    ctx.fillStyle = INK; ctx.fillRect(x - 22, y - 8, 44, 24)
    ctx.fillStyle = '#ffe9a8'; ctx.fillRect(x - 16, y - 4, 32, 10)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,220,140,${0.12 + 0.04 * Math.sin(t * 3 + k)})`; ctx.fillRect(x - 40, y - 30, 80, 40); ctx.restore()
  }
}
/** the little date table with a tablecloth and a candle */
export function drawTable(ctx, cx, top, t, { w = 300 } = {}) {
  ctx.fillStyle = INK; ctx.fillRect(cx - 20, top + 20, 40, 112); ctx.fillRect(cx - 80, top + 120, 160, 16)
  ctx.fillStyle = '#4a3a6a'; ctx.fillRect(cx - 14, top + 24, 28, 100); ctx.fillRect(cx - 74, top + 124, 148, 8)
  ctx.fillStyle = INK; ctx.fillRect(cx - w / 2 - 6, top - 6, w + 12, 62)
  ctx.fillStyle = '#f4ecdc'; ctx.fillRect(cx - w / 2, top, w, 50)
  ctx.fillStyle = '#d8ccb8'; ctx.fillRect(cx - w / 2, top + 36, w, 14)
  ctx.fillStyle = '#e0405a'; for (let k = 0; k < 7; k++) ctx.fillRect(cx - w / 2 + 10 + k * (w - 20) / 6 - 6, top + 40, 12, 6)
  // candle
  ctx.fillStyle = INK; ctx.fillRect(cx - 12, top - 58, 24, 56)
  ctx.fillStyle = '#fff6e6'; ctx.fillRect(cx - 8, top - 54, 16, 52)
  const fl = Math.sin(t * 13) * 2
  ctx.fillStyle = INK; ctx.fillRect(cx - 10 + fl * 0.5, top - 90, 20, 32)
  ctx.fillStyle = '#ffb347'; ctx.fillRect(cx - 6 + fl * 0.5, top - 86, 12, 26)
  ctx.fillStyle = '#fff1a8'; ctx.fillRect(cx - 3 + fl, top - 78, 6, 14)
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(cx, top - 70, 0, cx, top - 70, 110); g.addColorStop(0, 'rgba(255,190,100,0.35)'); g.addColorStop(1, 'rgba(255,190,100,0)')
  ctx.fillStyle = g; ctx.fillRect(cx - 110, top - 180, 220, 220); ctx.restore()
}

// ─────────────────────────────────────────────── trick 1: the hat
/** a magic top hat sitting crown-down with the opening up (bottom centre on (cx, by)). shake: px jiggle. */
export function drawMagicHat(ctx, cx, by, t, { px = 10, shake = 0, glow = 0, sc = 1, rot = 0 } = {}) {
  const rows = [
    '.hhhhhhhhhhhhhh.',
    'hoooooooooooooob',
    '.KKKKKKKKKKKKKK.',
    '..hKKKKKKKKKKK..',
    '..RRRRRRRRRRRR..',
    '..rRRRRRRRRRRR..',
    '..hKKKKKKKKKKK..',
    '..hKKKKKKKKKKK..',
    '..hKKKKKKKKKKK..',
    '..hKKKKKKKKKKK..',
    '...KKKKKKKKKK...',
  ]
  const W = 16 * px, H = rows.length * px
  ctx.save()
  const jx = shake ? Math.sin(t * 47) * shake : 0, jr = shake ? Math.sin(t * 31) * shake * 0.006 : 0
  ctx.translate(cx + jx, by); ctx.rotate(rot + jr); ctx.scale(sc, sc)
  bitmap(ctx, rows, { h: '#6c5aa8', b: '#6c5aa8', o: '#0a0618', K: '#2e2350', R: '#e0405a', r: '#ff8a9a' }, -W / 2, -H, px, '#0a0618')
  if (glow > 0) {
    ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(0, -H, 0, 0, -H, 150); g.addColorStop(0, `rgba(255,236,170,${0.5 * glow})`); g.addColorStop(1, 'rgba(255,236,170,0)')
    ctx.fillStyle = g; ctx.fillRect(-160, -H - 160, 320, 320)
  }
  ctx.restore()
  return { top: by - H * sc }
}
/** a little gold-trimmed pedestal; the top plate centre at (cx, top) */
export function drawPedestal(ctx, cx, top, h = 170) {
  ctx.fillStyle = INK; ctx.fillRect(cx - 100, top - 6, 200, 30); ctx.fillRect(cx - 30, top + 18, 60, h - 30); ctx.fillRect(cx - 70, top + h - 18, 140, 26)
  ctx.fillStyle = '#4a3a6a'; ctx.fillRect(cx - 94, top, 188, 18); ctx.fillRect(cx - 24, top + 18, 48, h - 32); ctx.fillRect(cx - 64, top + h - 14, 128, 18)
  ctx.fillStyle = GOLD; ctx.fillRect(cx - 94, top, 188, 5); ctx.fillRect(cx - 64, top + h - 14, 128, 4)
  ctx.fillStyle = '#6c5aa8'; ctx.fillRect(cx - 24, top + 18, 8, h - 32)
}

// ─────────────────────────────────────────────── the question, as an object
export function drawQBubble(ctx, cx, cy, text, { sc = 1, rot = 0, alpha = 1, size = 40, fill = '#fbf6ec', color = INK, tail = 'r' } = {}) {
  if (sc <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sc, sc)
  ctx.font = `800 ${size}px ${INTER}`
  const w = ctx.measureText(text).width + size * 1.4, h = size * 1.9
  const path = () => {
    ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
    if (tail) { const d = tail === 'r' ? 1 : -1, sx = d * (w / 2 - h * 0.6); ctx.moveTo(sx - 14 * d, h / 2 - 4); ctx.lineTo(sx + 18 * d, h / 2 + 22); ctx.lineTo(sx + 10 * d, h / 2 - 4) }
  }
  ctx.fillStyle = INK; ctx.save(); ctx.translate(0, 0); ctx.lineWidth = 12; ctx.strokeStyle = INK; path(); ctx.stroke(); ctx.restore()
  ctx.fillStyle = fill; path(); ctx.fill()
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, size * 0.06)
  ctx.restore()
}

// ─────────────────────────────────────────────── trick 2: the red flag + the drape
/** a red flag on a pole; base at (x, baseY), pole height poleH; lean (rad) pivots on the base; sc scales it all */
export function drawFlag(ctx, x, baseY, poleH, t, { label = 'FLAKED 3×', lean = 0, sc = 1, wave = 1, alpha = 1, fw = 230, fh = 128, col = FLAG_RED } = {}) {
  if (sc <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, baseY); ctx.rotate(lean); ctx.scale(sc, sc)
  // pole
  ctx.fillStyle = INK; ctx.fillRect(-9, -poleH - 14, 18, poleH + 14)
  ctx.fillStyle = '#d8ccb8'; ctx.fillRect(-5, -poleH - 10, 10, poleH + 10)
  ctx.fillStyle = GOLD; ctx.fillRect(-12, -poleH - 26, 24, 18)
  // cloth: vertical strips with a travelling wave
  const n = 12, sw = fw / n, top = -poleH + 2
  for (let i = 0; i < n; i++) {
    const off = Math.sin(t * 7 * wave - i * 0.6) * 9 * wave * (i / n + 0.15)
    ctx.fillStyle = INK; ctx.fillRect(6 + i * sw - 1, top + off - 5, sw + 2, fh + 10)
  }
  for (let i = 0; i < n; i++) {
    const off = Math.sin(t * 7 * wave - i * 0.6) * 9 * wave * (i / n + 0.15)
    const shade = Math.sin(t * 7 * wave - i * 0.6 - 1.2)
    ctx.fillStyle = shade > 0.4 ? '#ff7a88' : shade < -0.4 ? '#c8283f' : col
    ctx.fillRect(6 + i * sw, top + off, sw + 0.6, fh)
  }
  if (label) {
    ctx.save()
    const off = Math.sin(t * 7 * wave - 6 * 0.6) * 9 * wave * 0.65
    ctx.font = `800 ${Math.round(fh * 0.3)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(60,0,10,0.55)'; ctx.fillText(label, 6 + fw / 2 + 2, top + off + fh / 2 + 4)
    ctx.fillStyle = '#fff4ec'; ctx.fillText(label, 6 + fw / 2, top + off + fh / 2 + 1)
    ctx.restore()
  }
  ctx.restore()
}
/** the little curtain on a gold frame; frame centre x, top y, w × h. drop 0…1: the drape falls to the floor (the frame stays) */
export function drawDrape(ctx, cx, top, w, h, t, { k = 1, drop = 0, bulge = 0, rip = 0 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, top + h); ctx.scale(k, k); ctx.translate(-cx, -(top + h))
  // frame posts + bar
  ctx.fillStyle = INK; ctx.fillRect(cx - w / 2 - 14, top - 14, 28, h + 28); ctx.fillRect(cx + w / 2 - 14, top - 14, 28, h + 28); ctx.fillRect(cx - w / 2 - 20, top - 20, w + 40, 26)
  ctx.fillStyle = GOLD; ctx.fillRect(cx - w / 2 - 8, top - 8, 16, h + 16); ctx.fillRect(cx + w / 2 - 8, top - 8, 16, h + 16); ctx.fillRect(cx - w / 2 - 14, top - 14, w + 28, 14)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(cx - w / 2 - 14, top - 14, w + 28, 4)
  // feet
  ctx.fillStyle = INK; ctx.fillRect(cx - w / 2 - 40, top + h + 4, 80, 18); ctx.fillRect(cx + w / 2 - 40, top + h + 4, 80, 18)
  ctx.fillStyle = GOLD; ctx.fillRect(cx - w / 2 - 34, top + h + 8, 68, 10); ctx.fillRect(cx + w / 2 - 34, top + h + 8, 68, 10)
  // drape
  const dh = h * (1 - ease.inCubic(clamp(drop))) , dy = top + h * ease.inCubic(clamp(drop))
  if (dh > 4) {
    const folds = 8, fw = (w - 8) / folds
    for (let f = 0; f < folds; f++) {
      const bx = Math.sin(Math.PI * (f + 0.5) / folds) * bulge * 14 * Math.sin(t * 30 + f)
      const x0 = cx - w / 2 + 4 + f * fw + bx
      ctx.fillStyle = INK; ctx.fillRect(x0 - 1, dy, fw + 2, dh + 4)
      ctx.fillStyle = f % 2 ? '#a81e34' : CURTAIN; ctx.fillRect(x0, dy, fw, dh)
      ctx.fillStyle = 'rgba(255,150,160,0.25)'; ctx.fillRect(x0 + 3, dy, 4, dh)
      // scalloped hem
      ctx.fillStyle = GOLD; ctx.fillRect(x0, dy + dh - 10, fw, 8)
    }
    if (rip > 0) { // a jagged tear through the middle
      ctx.fillStyle = '#0a0618'
      for (let j = 0; j < 8; j++) ctx.fillRect(cx - 10 + (j % 2 ? 12 : -12), dy + j * dh / 8, 20, dh / 8 * rip + 2)
    }
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── trick 3: the box, the saw, the fight
/** the sawing box: centre (cx, cy), w × h. split = gap (px) between the halves; holes show what's inside via ends(dx) callback.
 *  lid 0…1 closes the top doors. rattle: px jiggle per half. */
export function drawBox(ctx, cx, cy, w, h, t, { split = 0, rattle = 0, k = 1, label = 'TUESDAY', open = 0 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k)
  // magic glow under it (it floats)
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(0, h / 2 + 40, 0, 0, h / 2 + 40, w * 0.6); g.addColorStop(0, 'rgba(201,166,255,0.35)'); g.addColorStop(1, 'rgba(201,166,255,0)')
  ctx.fillStyle = g; ctx.fillRect(-w, h / 2 - 40, 2 * w, 160); ctx.restore()
  for (const s of [-1, 1]) {
    const jx = rattle ? Math.sin(t * 53 + s) * rattle : 0, jy = rattle ? Math.cos(t * 41 + s * 2) * rattle * 0.6 : 0
    const ox = s * split / 2 + jx
    ctx.save(); ctx.translate(ox, jy)
    const x0 = s < 0 ? -w / 2 : 0, hw = w / 2
    const lidA = s * open * 0.9
    ctx.fillStyle = INK; ctx.fillRect(x0 - 8, -h / 2 - 8, hw + 16, h + 16)
    ctx.fillStyle = '#6a2fb0'; ctx.fillRect(x0, -h / 2, hw, h)
    ctx.fillStyle = '#8a4fd8'; ctx.fillRect(x0, -h / 2, hw, 10)
    ctx.fillStyle = GOLD; ctx.fillRect(x0, -h / 2, hw, 5); ctx.fillRect(x0, h / 2 - 5, hw, 5)
    // stars on the side
    for (let q = 0; q < 2; q++) drawPixelStar(ctx, x0 + hw * (0.32 + q * 0.4), (q ? 10 : -14), 30, 1, q ? GOLD : '#ffd6f0')
    // the cut edge (once split): dark interior band
    if (split > 2) { ctx.fillStyle = '#1a0a30'; ctx.fillRect(s < 0 ? -10 : 0, -h / 2, 10, h) }
    // lid flap when bursting
    if (open > 0) { ctx.save(); ctx.translate(s < 0 ? x0 : x0 + hw, -h / 2); ctx.rotate(-lidA); ctx.fillStyle = INK; ctx.fillRect(s < 0 ? -4 : -hw - 4, -10, hw + 8, 18); ctx.fillStyle = '#8a4fd8'; ctx.fillRect(s < 0 ? 0 : -hw, -6, hw, 10); ctx.restore() }
    ctx.restore()
  }
  // the label plate across the middle (only while whole)
  if (split < 2 && label) {
    ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const lw = ctx.measureText(label).width + 30
    ctx.fillStyle = INK; ctx.fillRect(-lw / 2 - 4, h / 2 - 50, lw + 8, 42)
    ctx.fillStyle = '#f4ecdc'; ctx.fillRect(-lw / 2, h / 2 - 46, lw, 34)
    ctx.fillStyle = INK; ctx.fillText(label, 0, h / 2 - 28)
  }
  ctx.restore()
}
/** a handsaw: blade centre (x, y), rot */
export function drawSaw(ctx, x, y, rot = 0, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-170, -26); ctx.lineTo(120, -36); ctx.lineTo(120, 30); ctx.lineTo(-170, 10); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#c9d2e6'; ctx.beginPath(); ctx.moveTo(-164, -20); ctx.lineTo(120, -30); ctx.lineTo(120, 24); ctx.lineTo(-164, 4); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-150, -18, 240, 5)
  ctx.fillStyle = INK; for (let k = 0; k < 15; k++) { const tx = -160 + k * 19; ctx.beginPath(); ctx.moveTo(tx, 6 + k * 1.2); ctx.lineTo(tx + 9, 20 + k * 1.3); ctx.lineTo(tx + 18, 6 + k * 1.3); ctx.fill() }
  // handle
  ctx.fillStyle = INK; ctx.fillRect(112, -46, 86, 88)
  ctx.fillStyle = '#b8743c'; ctx.fillRect(118, -40, 74, 76)
  ctx.fillStyle = INK; ctx.fillRect(140, -18, 32, 32)
  ctx.fillStyle = '#d89a5c'; ctx.fillRect(118, -40, 74, 8)
  ctx.restore()
}
/** the fight: an angry red scribble with eyebrows, a zig-zag mouth and swearing symbols. (x, y) centre, s = radius */
export function drawFight(ctx, x, y, s, t, { seed = 1, alpha = 1, mad = 1, sc = 1, label = null, deflate = 0 } = {}) {
  if (alpha <= 0 || sc <= 0) return
  const r = rng(seed * 13 + 5)
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(sc * (1 + 0.3 * deflate), sc * (1 - 0.7 * deflate))
  const jit = Math.floor(t * 12)
  const blobs = Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * TAU + r() * 0.5, d = s * (0.35 + r() * 0.3); return [Math.cos(a) * d, Math.sin(a) * d * 0.85, s * (0.42 + r() * 0.2)] })
  // spikes
  ctx.fillStyle = INK
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU + (jit % 2) * 0.12, L = s * (1.15 + 0.15 * ((i + jit) % 2)); ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.2) * s * 0.7, Math.sin(a - 0.2) * s * 0.7); ctx.lineTo(Math.cos(a) * L, Math.sin(a) * L); ctx.lineTo(Math.cos(a + 0.2) * s * 0.7, Math.sin(a + 0.2) * s * 0.7); ctx.fill() }
  for (const [bx, by, br] of blobs) { ctx.beginPath(); ctx.arc(bx, by, br + 7, 0, TAU); ctx.fill() }
  ctx.fillStyle = '#e8364e'
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU + (jit % 2) * 0.12, L = s * (1.05 + 0.15 * ((i + jit) % 2)); ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.14) * s * 0.7, Math.sin(a - 0.14) * s * 0.7); ctx.lineTo(Math.cos(a) * L, Math.sin(a) * L); ctx.lineTo(Math.cos(a + 0.14) * s * 0.7, Math.sin(a + 0.14) * s * 0.7); ctx.fill() }
  for (const [bx, by, br] of blobs) { ctx.fillStyle = '#e8364e'; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill() }
  ctx.fillStyle = '#ff7a5c'; ctx.beginPath(); ctx.arc(-s * 0.25, -s * 0.3, s * 0.3, 0, TAU); ctx.fill()
  // scribble lines
  ctx.strokeStyle = '#8a1024'; ctx.lineWidth = Math.max(3, s * 0.05)
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = r() * TAU, d = s * 0.6 * r(); ctx.lineTo(Math.cos(a) * d, Math.sin(a) * d) } ctx.stroke()
  // face
  const e = s * 0.13, ex = s * 0.3, ey = -s * 0.05
  for (const d of [-1, 1]) {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(d * ex - e, ey - e, e * 2, e * 2)
    ctx.fillStyle = INK; ctx.fillRect(d * ex - e * 0.5 + d * e * 0.2, ey - e * 0.3, e, e * 1.1)
    // angry brows
    ctx.save(); ctx.translate(d * ex, ey - e * 1.6); ctx.rotate(d * 0.45 * mad); ctx.fillStyle = INK; ctx.fillRect(-e * 1.4, -e * 0.35, e * 2.8, e * 0.7); ctx.restore()
  }
  ctx.strokeStyle = INK; ctx.lineWidth = Math.max(4, s * 0.07)
  ctx.beginPath(); const mw = s * 0.42, my = s * 0.32
  for (let i = 0; i <= 6; i++) ctx.lineTo(-mw / 2 + (mw * i) / 6, my + (i % 2 ? -1 : 1) * s * 0.06)
  ctx.stroke()
  // swearing symbols
  if (mad > 0.5) {
    ctx.font = `800 ${Math.round(s * 0.42)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const sym = ['#', '@', '!', '%', '&', '$'], o = jit % 6
    for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + (k - 1) * 0.7, d = s * 1.45; ctx.fillStyle = INK; ctx.fillText(sym[(o + k) % 6], Math.cos(a) * d + 2, Math.sin(a) * d + 3); ctx.fillStyle = '#ffd36b'; ctx.fillText(sym[(o + k) % 6], Math.cos(a) * d, Math.sin(a) * d) }
  }
  ctx.restore()
  if (label) {
    ctx.save(); ctx.globalAlpha *= alpha
    ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const lw = ctx.measureText(label).width + 24
    ctx.fillStyle = INK; ctx.fillRect(x - lw / 2 - 3, y + s * sc + 22, lw + 6, 40)
    ctx.fillStyle = '#ffd36b'; ctx.fillRect(x - lw / 2, y + s * sc + 25, lw, 34)
    ctx.fillStyle = INK; ctx.fillText(label, x, y + s * sc + 43)
    ctx.restore()
  }
}

// ─────────────────────────────────────────────── chaos extras
export function drawDove(ctx, x, y, px, t, { seed = 1, dir = 1 } = {}) {
  const up = Math.floor(t * 10 + seed) % 2 === 0
  const rows = up
    ? ['W.....W.', 'WW...WW.', '.WWWWWWo', '..WWWWW.', '...W.W..']
    : ['........', '........', 'WWWWWWWo', '.WWWWWW.', 'WW.W.W..']
  ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1)
  bitmap(ctx, rows, { W: '#ffffff', o: '#ffb347' }, -4 * px, -2.5 * px, px)
  ctx.fillStyle = INK; ctx.fillRect(5 * px, 2 * px, px, px)
  ctx.restore()
}
export function drawRabbit(ctx, x, y, px, t, { look = 0 } = {}) {
  const rows = [
    '.W..W.',
    '.Wp.Wp',
    '.Wp.Wp',
    '.WWWWW',
    'WWWWWWW',
    'WkWWkWW',
    'WWWnWWW',
    '.WWWWW.',
  ]
  bitmap(ctx, rows, { W: '#f4f1ea', p: '#ffb0c8', k: INK, n: '#ff8fb1' }, x - 3.5 * px, y - 8 * px, px)
}
export function drawFlower(ctx, x, y, px, t, { sc = 1 } = {}) {
  if (sc <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc)
  ctx.fillStyle = INK; ctx.fillRect(-px * 0.9, 0, px * 1.8, px * 9)
  ctx.fillStyle = '#46cf82'; ctx.fillRect(-px * 0.5, 0, px, px * 9); ctx.fillRect(px * 0.5, px * 4, px * 2, px)
  bitmap(ctx, ['.pp.', 'pyyp', 'pyyp', '.pp.'], { p: PINK, y: '#ffd36b' }, -2 * px, -4 * px, px)
  ctx.restore()
}
/** a talk card. face: 0 = back up, 1 = face up (pass flip 0…1 to animate a flip through edge-on) */
export function drawTalkCard(ctx, cx, cy, w, h, t, { flip = 1, q = '', a = null, k = 1, rot = 0, tag = 'TALK CARD', check = 0 } = {}) {
  if (k <= 0) return
  const sx = Math.abs(Math.cos(Math.PI * clamp(flip)))
  const face = flip >= 0.5
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k * Math.max(0.02, face ? sx : sx), k)
  const P = 6, x0 = -w / 2, y0 = -h / 2
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(x0 + o + 2 * P, y0 + o, w - 2 * o - 4 * P, h - 2 * o); ctx.fillRect(x0 + o, y0 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); ctx.fillRect(x0 + o + P, y0 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  ctx.save(); ctx.shadowColor = 'rgba(242,199,92,0.5)'; ctx.shadowBlur = 30; step(0, GOLD); ctx.restore()
  if (!face) {
    step(P, '#2a1a5a')
    ctx.strokeStyle = 'rgba(242,199,92,0.6)'; ctx.lineWidth = 3
    ctx.strokeRect(x0 + 3 * P, y0 + 3 * P, w - 6 * P, h - 6 * P)
    drawPixelStar(ctx, 0, 0, Math.min(w, h) * 0.32, 2, GOLD)
  } else {
    step(P, '#1a1036')
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.font = `700 ${Math.round(Math.max(16, h * 0.075))}px ${MONO}`; ctx.fillStyle = 'rgba(242,199,92,0.85)'; ctx.fillText(tag, 0, y0 + h * 0.15)
    const lines = String(a ?? q).split('|')
    const fs = Math.round(a ? h * 0.2 : h * 0.15)
    ctx.font = a ? `800 ${fs}px ${INTER}` : `italic 600 ${Math.round(fs * 1.15)}px ${SERIF}`
    ctx.fillStyle = BONE
    lines.forEach((L, i) => ctx.fillText(L.trim(), 0, (i - (lines.length - 1) / 2) * fs * 1.15 + h * 0.06))
    if (check > 0) {
      const c = easeOutBack(clamp(check), 2.6)
      ctx.save(); ctx.translate(w / 2 - 30, -h / 2 + 30); ctx.scale(c, c)
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 30, 0, TAU); ctx.fill()
      ctx.fillStyle = '#46cf82'; ctx.beginPath(); ctx.arc(0, 0, 25, 0, TAU); ctx.fill()
      ctx.font = `800 34px ${INTER}`; ctx.fillStyle = '#ffffff'; ctx.fillText('✓', 0, 2)
      ctx.restore()
    }
  }
  ctx.restore()
}
export function drawHeart(ctx, x, y, px, col = '#ff4f7e') {
  const H = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  ctx.fillStyle = INK; H.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') ctx.fillRect(Math.round(x + (i - 3.5) * px - px * 0.4), Math.round(y + (j - 3) * px - px * 0.4), Math.ceil(px * 1.8), Math.ceil(px * 1.8)) }))
  H.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { ctx.fillStyle = i === 1 && j === 1 ? '#ffffff' : col; ctx.fillRect(Math.round(x + (i - 3.5) * px), Math.round(y + (j - 3) * px), Math.ceil(px), Math.ceil(px)) } }))
}
/** a puff of smoke (k 0 → 1), rising when rise > 0 */
export function dustPuff(ctx, x, y, k, { n = 7, spread = 110, seed = 3, col = '#d8cfe8', rise = 18 } = {}) {
  if (k <= 0 || k >= 1) return
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha *= (1 - ease.inQuad(k)) * 0.95
  for (let i = 0; i < n; i++) {
    const a = r() * TAU, d = spread * (0.25 + r() * 0.75) * ease.outCubic(k), s = (22 + r() * 30) * (0.6 + 0.8 * k)
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * 0.6 - k * rise
    ctx.fillStyle = INK; ctx.fillRect(Math.round(px - s / 2 - 4), Math.round(py - s / 2 - 4), Math.round(s + 8), Math.round(s + 8))
    ctx.fillStyle = col; ctx.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), Math.round(s), Math.round(s))
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), Math.round(s * 0.4), Math.round(s * 0.3))
  }
  ctx.restore()
}
/** pixel confetti falling from the top since t0 */
export function confetti(ctx, t, t0, { n = 40, seed = 7, W = 1080, alpha = 1 } = {}) {
  const d0 = t - t0
  if (d0 < 0 || alpha <= 0) return
  const r = rng(seed), cols = [GOLD, PINK, '#7fe0ff', '#7dffb0', '#c9a6ff', '#ffffff']
  ctx.save(); ctx.globalAlpha *= alpha
  for (let k = 0; k < n; k++) {
    const x0 = r() * W, sp = 300 + r() * 380, ph = r() * TAU, delay = r() * 0.5, d = d0 - delay
    if (d < 0) continue
    const y = -30 + d * sp
    if (y > 2000) continue
    ctx.fillStyle = cols[k % cols.length]
    const w = 14 * (0.5 + 0.5 * Math.abs(Math.sin(d * 6 + ph)))
    ctx.fillRect(Math.round(x0 + Math.sin(d * 3 + ph) * 50), Math.round(y), Math.round(w), 14)
  }
  ctx.restore()
}
/** a ring of pixel sparkles bursting out of (cx, cy) since t0 */
export function sparkleBurst(ctx, t, cx, cy, t0, { n = 10, R = 160, seed = 0, cols = [GOLD, BONE, PINK, '#c9a6ff'], dur = 0.7, size = 28 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const p = ease.outCubic(tt / dur)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / dur)
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(ctx, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
void lerp; void prog; void rgba
