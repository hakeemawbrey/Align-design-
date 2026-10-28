// sthold props — small pixel drawings on canvas for "Cosmic Customer Service" (Star Talk season 3 #11). Shared helpers
// inside this film's folder (STARTALK2.md). Every prop is a pure draw call; nothing touches `document` at load.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn) / cellToWorld(F, i, j)
//        the exact transform drawStarChar uses for a frame (same maths as startalk.js), so props drawn in sprite CELLS
//        (the 36-cell grid) stay seated through hops and squash.
//   headsetCells(ctx, accent)          a call-centre headset (band over the top point, two cups, a mic boom), in cells
//   headsetWorld(ctx, x, y, rot, cell, accent)   the same headset off the head (held, flying, or lying on the desk)
//   tearsCells(ctx, t, k)              tears from both eyes, k: 1 sniffle · 2 streams · 3 fountains
//   sweatCells(ctx, t)                 a nervous sweat drop on the upper right
//   dizzyCells(ctx, t)                 little stars circling the top point (after a bonk)
//   drawDeskPhone(ctx, cx, by, px, t, { ring, light, jolt })   a chunky retro office phone (cx = centre, by = bottom)
//   drawHandset(ctx, x, y, px, rot, col, { ring, t })          a loose phone handset (Aries juggles three)
//   drawDesk(ctx, x0, x1, y, h, { label, color })              a desk front with a painted label
//   drawMug(ctx, cx, by, px, { t, steam, tilt })               a coffee mug (cx = centre, by = bottom)
//   drawTissueBox(ctx, cx, by, px, t)                          Pisces' tissue box, a tissue fluttering out of it
//   drawFinger(ctx, x, y, px, press)                           a pixel hand pointing up; (x, y) = the fingertip
//   drawStamp(ctx, x, y, s, rot, text, col)                    a rubber-stamp mark
//   ringWaves(ctx, x, y, r, t, k, col)                         ringing arcs either side of a point
//   confetti(ctx, t, t0, opts)                                 a confetti burst (pure f(t))
import { clamp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ─────────────────────────────── star transform (mirrors startalk.js drawStarChar)
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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** sprite cell → world point (ignores squash; for spawning things that leave the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ─────────────────────────────── a cell painter with a 1-cell ink outline
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ─────────────────────────────── the headset: band over the top point, two cups, a mic boom down past the left eye
const HS = new Map()
function headsetList(accent) {
  const out = [], seen = new Set()
  const put = (i, j, c) => { const k = i + ',' + j; if (seen.has(k)) return; seen.add(k); out.push([i, j, c]) }
  for (let a = 0; a <= 180; a += 2) {
    const r = a * Math.PI / 180, i = Math.round(17.5 - Math.cos(r) * 6.2), j = Math.round(11 - Math.sin(r) * 10.6)
    put(i, j, a > 60 && a < 120 ? '#a3a9d4' : '#5d6288')
  }
  for (const [x0, d] of [[9, 1], [23, -1]]) {
    for (let j = 8; j <= 14; j++) for (let i = 0; i < 4; i++) {
      if ((j === 8 || j === 14) && (i === 0 || i === 3)) continue
      const c = (i === (d > 0 ? 3 : 0)) ? accent : (j === 9 && i === (d > 0 ? 1 : 2)) ? '#6e7399' : '#2c2f4c'
      put(x0 + i, j, c)
    }
  }
  // the mic boom: out of the left cup, down past the left eye, the mic under it
  for (const [i, j] of [[8, 15], [8, 16], [8, 17], [8, 18], [8, 19], [8, 20], [9, 21], [9, 22], [10, 23], [11, 24]]) put(i, j, '#3a3e60')
  for (const [i, j] of [[12, 24], [13, 24], [12, 25], [13, 25], [14, 24], [14, 25]]) put(i, j, i === 12 && j === 24 ? '#ffffff' : accent)
  return out
}
export function headsetCells(ctx, accent) {
  if (!HS.has(accent)) HS.set(accent, headsetList(accent))
  paintCells(ctx, HS.get(accent))
}
/** a headset off the head: centred at (x, y) (the band's middle), rotated, `cell` px per cell */
export function headsetWorld(ctx, x, y, rot, cell, accent, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(cell, cell); ctx.translate(-17.5, -12)
  headsetCells(ctx, accent); ctx.restore()
}

// ─────────────────────────────── tears / sweat / dizzy (cells; eyes sit at (13.4, 19.2) and (22.6, 19.2))
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
export function sweatCells(ctx, t) {
  const ph = (t * 0.9) % 1, y = 7 + ph * 6
  ctx.globalAlpha = Math.sin(Math.PI * Math.min(1, ph * 1.3))
  ctx.fillStyle = INK; ctx.fillRect(25.6, y - 0.6, 2.8, 3.6)
  ctx.fillStyle = '#9be8ff'; ctx.fillRect(26, y, 2, 2.6); ctx.fillRect(26.5, y - 0.6, 1, 0.8)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(26.2, y + 0.4, 0.7, 0.7)
  ctx.globalAlpha = 1
}
export function dizzyCells(ctx, t) {
  for (let k = 0; k < 3; k++) {
    const a = t * 5.5 + k * TAU / 3, x = 18 + Math.cos(a) * 9, y = 1.5 + Math.sin(a) * 2.4
    ctx.fillStyle = INK; ctx.fillRect(x - 1.5, y - 0.5, 3, 1); ctx.fillRect(x - 0.5, y - 1.5, 1, 3)
    ctx.fillStyle = k === 1 ? '#ff8fb1' : '#ffe36a'; ctx.fillRect(x - 1, y - 0.25, 2, 0.5); ctx.fillRect(x - 0.25, y - 1, 0.5, 2)
  }
}

// ─────────────────────────────── a rect-list painter in "art pixels" with an ink outline (convex unions)
function artBlock(ctx, ox, oy, px, rects, outline = true) {
  if (outline) { ctx.fillStyle = INK; for (const [x, y, w, h] of rects) ctx.fillRect(ox + (x - 1) * px, oy + (y - 1) * px, (w + 2) * px, (h + 2) * px) }
  for (const [x, y, w, h, c] of rects) { if (!c) continue; ctx.fillStyle = c; ctx.fillRect(ox + x * px, oy + y * px, w * px, h * px) }
}

// ─────────────────────────────── the desk phone (art: 30 × 18 px; origin = bottom centre)
const PH = { body: '#4a3478', bodyHi: '#6a50a8', bodyLo: '#2e2052', trim: '#f2c75c', hand: '#efe6d6', handHi: '#fffaf0', handLo: '#bfb2a0', key: '#efe6d6', keyLo: '#a99c88', lcd: '#123a3a', lcdHi: '#38c49a' }
/** ring 0…1 (shake + rattling handset), light: 'red' | 'green' | 'blink' | 'off', jolt: handset hop 0…1 */
export function drawDeskPhone(ctx, cx, by, px, t, { ring = 0, light = 'off', jolt = 0 } = {}) {
  const jx = ring > 0 ? Math.round(Math.sin(t * 95) * 0.7 * ring) * px : 0
  const ox = Math.round(cx + jx), oy = Math.round(by)
  // body (a stepped trapezoid) + the cradle prongs
  artBlock(ctx, ox, oy, px, [[-14, -11, 28, 11], [-13, -12, 26, 1], [-9, -14, 3, 2], [6, -14, 3, 2]])
  ctx.fillStyle = PH.body; ctx.fillRect(ox - 14 * px, oy - 11 * px, 28 * px, 11 * px); ctx.fillRect(ox - 13 * px, oy - 12 * px, 26 * px, px)
  ctx.fillStyle = PH.bodyHi; ctx.fillRect(ox - 13 * px, oy - 12 * px, 26 * px, px); ctx.fillRect(ox - 14 * px, oy - 11 * px, px, 8 * px)
  ctx.fillStyle = PH.bodyLo; ctx.fillRect(ox - 14 * px, oy - 2 * px, 28 * px, 2 * px)
  ctx.fillStyle = PH.trim; ctx.fillRect(ox - 13 * px, oy - 3 * px, 26 * px, Math.max(1, px * 0.5))
  ctx.fillStyle = '#2a1d48'; ctx.fillRect(ox - 9 * px, oy - 14 * px, 3 * px, 2 * px); ctx.fillRect(ox + 6 * px, oy - 14 * px, 3 * px, 2 * px)
  // LCD + line light (left), keypad (right)
  ctx.fillStyle = INK; ctx.fillRect(ox - 12 * px, oy - 10 * px, 11 * px, 5 * px)
  ctx.fillStyle = PH.lcd; ctx.fillRect(ox - 11 * px, oy - 9 * px, 9 * px, 3 * px)
  ctx.fillStyle = PH.lcdHi; for (let i = 0; i < 4; i++) if ((Math.floor(t * 3) + i) % 3) ctx.fillRect(ox + (-10 + i * 2) * px, oy - 8 * px, px, px)
  const on = light === 'red' || light === 'green' || (light === 'blink' && Math.floor(t * 4) % 2 === 0)
  ctx.fillStyle = INK; ctx.fillRect(ox - 12 * px, oy - 5 * px, 4 * px, 2 * px)
  ctx.fillStyle = on ? (light === 'green' ? '#5dff9a' : '#ff4a5e') : '#5a2030'; ctx.fillRect(ox - 11 * px, oy - 5 * px, 2 * px, px)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const kx = ox + (1 + c * 4) * px, ky = oy - (10 - r * 2) * px
    ctx.fillStyle = INK; ctx.fillRect(kx - px * 0.5, ky - px * 0.5, 4 * px, 2 * px)
    ctx.fillStyle = PH.key; ctx.fillRect(kx, ky, 3 * px, px); ctx.fillStyle = PH.keyLo; ctx.fillRect(kx, ky + px * 0.6, 3 * px, px * 0.4)
  }
  // handset: lying on the cradle; rattles while ringing, hops on a jolt
  const hop = (ring > 0 ? (Math.floor(t * 22) % 2) * ring : 0) + jolt * 3
  const hy = oy - Math.round(hop) * px
  artBlock(ctx, ox, hy, px, [[-11, -17, 22, 3], [-15, -18, 6, 5], [9, -18, 6, 5]])
  ctx.fillStyle = PH.hand; ctx.fillRect(ox - 11 * px, hy - 17 * px, 22 * px, 3 * px); ctx.fillRect(ox - 15 * px, hy - 18 * px, 6 * px, 5 * px); ctx.fillRect(ox + 9 * px, hy - 18 * px, 6 * px, 5 * px)
  ctx.fillStyle = PH.handHi; ctx.fillRect(ox - 10 * px, hy - 17 * px, 19 * px, px); ctx.fillRect(ox - 14 * px, hy - 18 * px, 4 * px, px); ctx.fillRect(ox + 10 * px, hy - 18 * px, 4 * px, px)
  ctx.fillStyle = PH.handLo; ctx.fillRect(ox - 15 * px, hy - 14 * px, 6 * px, px); ctx.fillRect(ox + 9 * px, hy - 14 * px, 6 * px, px); ctx.fillRect(ox - 9 * px, hy - 15 * px, 18 * px, px)
  // the curly cord (left side, down to the body)
  ctx.fillStyle = '#d9cdb8'
  for (let k = 0; k < 4; k++) ctx.fillRect(ox - (17 - (k % 2)) * px, hy - (13 - k * 2.4) * px, 2 * px, px)
}

/** a loose phone handset centred at (x, y), rotated (art: 22 × 6 px) */
export function drawHandset(ctx, x, y, px, rot, col, { ring = 0, t = 0 } = {}) {
  const hi = col === '#efe6d6' ? '#fffaf0' : 'rgba(255,255,255,0.45)'
  const jr = ring > 0 ? Math.sin(t * 80) * 0.12 * ring : 0
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot + jr)
  artBlock(ctx, 0, 0, px, [[-8, -2, 16, 3, col], [-11, -3, 5, 6, col], [6, -3, 5, 6, col]])
  ctx.fillStyle = hi; ctx.fillRect(-7 * px, -2 * px, 13 * px, px); ctx.fillRect(-10 * px, -3 * px, 3 * px, px); ctx.fillRect(7 * px, -3 * px, 3 * px, px)
  ctx.fillStyle = 'rgba(20,10,40,0.35)'; ctx.fillRect(-11 * px, 2 * px, 5 * px, px); ctx.fillRect(6 * px, 2 * px, 5 * px, px)
  // ear / mouth grilles
  ctx.fillStyle = INK; for (const gx of [-9, 8]) { ctx.fillRect((gx - 0.5) * px, 0, px, px); ctx.fillRect((gx + 0.7) * px, 0, px, px) }
  ctx.restore()
  if (ring > 0) ringWaves(ctx, x, y, 16 * px, t, ring, '#efe6d6', 0.7)
}

/** a ringing smartphone centred at (x, y), rotated (art: 10 × 17 px): case colour, a lit screen with a green call button */
export function drawSmartphone(ctx, x, y, px, rot, col, { ring = 0, t = 0 } = {}) {
  const jr = ring > 0 ? Math.sin(t * 85) * 0.1 * ring : 0
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot + jr)
  artBlock(ctx, 0, 0, px, [[-5, -8, 10, 17, col], [-4, -9, 8, 1, col], [-4, 9, 8, 1, col]])
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(-4 * px, -9 * px, 5 * px, px)
  const lit = ring > 0 && Math.floor(t * 9) % 2 === 0
  ctx.fillStyle = INK; ctx.fillRect(-4 * px, -7 * px, 8 * px, 14 * px)
  ctx.fillStyle = lit ? '#5af0c0' : '#2fc79a'; ctx.fillRect(-3.5 * px, -6.5 * px, 7 * px, 13 * px)
  ctx.fillStyle = lit ? '#b8ffe8' : '#7de8c6'; ctx.fillRect(-3.5 * px, -6.5 * px, 7 * px, 3 * px)
  // caller "avatar" + the green accept button with a white handset
  ctx.fillStyle = '#efe6d6'; ctx.fillRect(-1 * px, -5.5 * px, 2 * px, 2 * px)
  ctx.fillStyle = INK; ctx.fillRect(-2.5 * px, 2 * px, 5 * px, 4 * px); ctx.fillRect(-2 * px, 1.5 * px, 4 * px, 5 * px)
  ctx.fillStyle = '#38e070'; ctx.fillRect(-2 * px, 2 * px, 4 * px, 4 * px)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-1.5 * px, 3.5 * px, 3 * px, px); ctx.fillRect(-1.5 * px, 3 * px, px, px); ctx.fillRect(0.5 * px, 3 * px, px, px)
  ctx.restore()
  if (ring > 0) ringWaves(ctx, x, y, 10 * px, t, ring, '#efe6d6', 0.6)
}

/** ringing arcs either side of (x, y) at radius r */
export function ringWaves(ctx, x, y, r, t, k, col = '#efe6d6', thin = 1) {
  if (k <= 0) return
  ctx.save(); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 7 * thin
  for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) {
    const ph = ((t * 3.2 + i * 0.5) % 1)
    ctx.globalAlpha = k * (1 - ph) * 0.9
    const rr = r + ph * r * 0.45 + i * 6
    ctx.beginPath(); ctx.arc(x, y, rr, sd < 0 ? Math.PI - 0.38 : -0.38, sd < 0 ? Math.PI + 0.38 : 0.38); ctx.stroke()
  }
  ctx.restore()
}

// ─────────────────────────────── desk front (+ top surface) with a painted label
const step = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
export function drawDesk(ctx, x0, x1, y, h, { label = '', color = '#f2c75c', size = 32 } = {}) {
  const P = 8
  step(ctx, x0 - P, y - P, x1 - x0 + 2 * P, h + 2 * P, P, INK)
  step(ctx, x0, y, x1 - x0, h, P, '#2c1f4e')
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0 + P, y, x1 - x0 - 2 * P, P)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x0 + 3 * P, y, 8 * P, P / 2)
  ctx.fillStyle = '#3d2c68'; ctx.fillRect(x0 + 2 * P, y + 2 * P, x1 - x0 - 4 * P, P / 2)
  ctx.fillStyle = '#1f1538'; ctx.fillRect(x0 + 2 * P, y + h - 3 * P, x1 - x0 - 4 * P, P / 2)
  if (label) {
    const cx = (x0 + x1) / 2, ly = y + h * 0.55
    ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const w = ctx.measureText(label).width + 44
    ctx.fillStyle = '#1a1030'; ctx.fillRect(cx - w / 2, ly - size * 0.8, w, size * 1.6)
    ctx.fillStyle = color; ctx.fillRect(cx - w / 2, ly - size * 0.8, w, 3); ctx.fillRect(cx - w / 2, ly + size * 0.8 - 3, w, 3)
    ctx.fillStyle = color; ctx.fillText(label, cx, ly + 2)
  }
}

// ─────────────────────────────── the mug (art: 9 × 8 px; origin = bottom centre)
export function drawMug(ctx, cx, by, px, { t = 0, steam = 1, tilt = 0 } = {}) {
  ctx.save(); ctx.translate(Math.round(cx), Math.round(by)); ctx.rotate(tilt)
  artBlock(ctx, 0, 0, px, [[-4, -8, 7, 8, '#f2c75c'], [3, -6, 2, 1, '#f2c75c'], [4, -6, 1, 4, '#f2c75c'], [3, -3, 2, 1, '#f2c75c']])
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(-3 * px, -7 * px, px, 5 * px)
  ctx.fillStyle = '#c98a1f'; ctx.fillRect(2 * px, -7 * px, px, 7 * px)
  ctx.fillStyle = '#5a3020'; ctx.fillRect(-3 * px, -8 * px, 5 * px, px)            // coffee
  ctx.fillStyle = '#1b1236'; ctx.font = `700 ${Math.round(px * 3.4)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('♄', -0.5 * px, -3.6 * px)                                              // Saturn (Capricorn's ruler)
  ctx.restore()
  if (steam > 0) {
    for (let k = 0; k < 3; k++) {
      const ph = (t * 0.7 + k / 3) % 1
      ctx.globalAlpha = Math.sin(Math.PI * ph) * 0.7 * steam; ctx.fillStyle = '#efe6d6'
      ctx.fillRect(Math.round(cx + (-1.5 + k * 1.5 + Math.sin(t * 3 + k) * 0.8) * px), Math.round(by - (10 + ph * 7) * px), px, px * 1.5)
    }
    ctx.globalAlpha = 1
  }
}

// ─────────────────────────────── Pisces' tissue box (art: 14 × 7 px + the tissue)
export function drawTissueBox(ctx, cx, by, px, t) {
  const ox = Math.round(cx), oy = Math.round(by)
  artBlock(ctx, ox, oy, px, [[-7, -7, 14, 7, '#c9a6ff']])
  ctx.fillStyle = '#e3d0ff'; ctx.fillRect(ox - 7 * px, oy - 7 * px, 14 * px, px)
  ctx.fillStyle = '#9a7be0'; for (let i = 0; i < 4; i++) ctx.fillRect(ox + (-5 + i * 3) * px, oy - 4 * px, px, px)
  ctx.fillStyle = '#7c5cc8'; ctx.fillRect(ox - 7 * px, oy - px, 14 * px, px)
  // the slot + a fluttering tissue
  ctx.fillStyle = INK; ctx.fillRect(ox - 3 * px, oy - 7 * px, 6 * px, px)
  const fl = Math.sin(t * 7) * 1.2
  ctx.fillStyle = INK; ctx.fillRect(ox - 2.5 * px + fl * px * 0.3, oy - 12 * px, 5 * px, 5.2 * px)
  ctx.fillStyle = '#fbf7ee'; ctx.fillRect(ox - 2 * px + fl * px * 0.3, oy - 11.6 * px, 4 * px, 4.6 * px)
  ctx.fillRect(ox - 1 * px + fl * px * 0.6, oy - 13 * px, 2 * px, 1.6 * px)
}

// ─────────────────────────────── a pixel hand pointing up; (x, y) = the fingertip
const HAND = [
  '...XXX....',
  '..XWWWX...',
  '..XWWWX...',
  '..XWWWX...',
  '..XWWWXXX.',
  '..XWWWXWWX',
  'XXXWWWXWWXX',
  'XWXWWWWWWXWX',
  'XWWWWWWWWWWX',
  'XWWWWWWWWWWX',
  'XWWWWWWWWWWX',
  '.XWWWWWWWWX.',
  '..XWWWWWWX..',
  '..XGGGGGGX..',
  '..XGgGGgGX..',
  '..XGGGGGGX..',
]
export function drawFinger(ctx, x, y, px, press = 0) {
  const pal = { X: INK, W: '#f3e6d2', G: '#f2c75c', g: '#c98a1f' }
  const ox = Math.round(x - 4 * px), oy = Math.round(y + press * px * 0.6)
  HAND.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(ox + i * px, oy + j * px, px, px) } } })
  ctx.fillStyle = '#fffaf0'; ctx.fillRect(ox + 3 * px, oy + px, px, 2 * px)
  ctx.fillStyle = '#d9c4a8'; ctx.fillRect(ox + 4 * px, oy + 9 * px, 6 * px, px)
}

// ─────────────────────────────── rubber stamp
export function drawStamp(ctx, x, y, s, rot, text, col = '#ff4a5e') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  ctx.font = `700 64px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + 56, h = 96
  ctx.fillStyle = 'rgba(20,6,20,0.35)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 8, w, h)
  ctx.strokeStyle = col; ctx.lineWidth = 9; ctx.strokeRect(-w / 2, -h / 2, w, h)
  ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 11, -h / 2 + 11, w - 22, h - 22)
  ctx.fillStyle = col; ctx.fillText(text, 0, 4)
  ctx.restore()
}

/** confetti from (x0, y0) at t0: rectangles flipping, analytic drag so it's a pure f(t) */
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#2fc79a', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3)
  const k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1400 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF_COLS[Math.floor(r() * CONF_COLS.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k
    const x = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt)
    const y = y0 + vty * dt + (vy0 - vty) * e
    if (y > 2000) continue
    ctx.save(); ctx.globalAlpha = clamp((life - dt0) / 0.6); ctx.translate(x, y); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7)
    ctx.restore()
  }
}
