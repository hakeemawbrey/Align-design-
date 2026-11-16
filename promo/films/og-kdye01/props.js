// DATE YOURSELF (Month 2 boost, batch m16): the pixel prop + set library for kdye01–kdye20.
// Lives in kdye01's folder; the other kdye films import it read-only. Pure canvas drawing, no DOM, no state.
//   helpers: R, box, drawBits, sparkles, hearts, confetti, bubble, label, shadow, starFrame, inSprite, tearsCells
//   sets:    room(x, opts) · street(x, t, opts) · park(x, t, opts) · cafeFloor(x, opts) · sunsetSky(x, k)
//   props:   table, chair, bench, plant, mug, plate, candle, book, phone, laptop, painting, lamp, window, door, tissues …
import { clamp, lerp, prog, ease } from '../../src/lib.js'
import { drawPixelStar } from '../sky.js'
import { easeOutBack } from '../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const TEAL = '#5fd3c4', SKYB = '#7fd0ff', MINT = '#9fe6b0', CORAL = '#ff8a6a', WOOD = '#8a5a3a', WOOD_D = '#6b4428'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inWin = (t, a, b) => t >= a && t < b

export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble (canvas), popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glow(x, cx, cy, r, col = '255,214,150', a = 0.25) {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** speed lines streaking across (for mid-action frame 0s) */
export function speedLines(x, t, { n = 16, a = 1, dir = -1, col = 'rgba(239,230,214,0.5)', y0 = 300, y1 = 1500 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  for (let i = 0; i < n; i++) {
    const y = y0 + ((i * 97) % (y1 - y0)), len = 140 + (i * 53) % 220, sp = 2600 + (i % 4) * 500
    const px = ((((t * sp * -dir) + i * 211) % 1500) + 1500) % 1500 - 210
    R(x, col, px, y, len, 6 + (i % 3) * 2)
  }
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props can sit on a sprite through hops
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}

// ═════════════════════════════════════════════════════════════ sets (full-frame backgrounds, drawn over the sky)
/** an interior: back wall from top to floorY, floor below, optional window (night/day/sunset) + skirting */
export function room(x, { wall = '#3b2c5e', wall2 = '#33264f', floor = '#2a1f40', floorY = 1180, win = null, stripes = true, alpha = 1 } = {}) {
  x.save(); x.globalAlpha = alpha
  R(x, wall, 0, 0, 1080, floorY)
  if (stripes) for (let i = 0; i < 1080; i += 120) R(x, wall2, i, 0, 60, floorY)
  R(x, INK, 0, floorY - 10, 1080, 10); R(x, '#4a3a70', 0, floorY - 26, 1080, 16)
  R(x, floor, 0, floorY, 1080, 1920 - floorY)
  for (let j = floorY + 70; j < 1920; j += 90) R(x, 'rgba(0,0,0,0.18)', 0, j, 1080, 6)
  if (win) windowFrame(x, win)
  x.restore()
}
/** a window: { x, y, w, h, sky: 'night'|'day'|'sunset'|'dawn' } */
export function windowFrame(x, { x: X, y: Y, w, h, sky = 'night', t = 0 }) {
  const skies = { night: ['#141038', '#2a2266'], day: ['#8fd3ff', '#cdeeff'], sunset: ['#ff9a6a', '#ffd38a'], dawn: ['#7aa2e8', '#ffc9a8'] }
  const [a, b] = skies[sky] || skies.night
  box(x, X, Y, w, h, a, { b: 10 })
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(X, Y, w, h)
  if (sky === 'night') for (let i = 0; i < 9; i++) drawPixelStar(x, X + 20 + ((i * 71) % (w - 40)), Y + 20 + ((i * 53) % (h * 0.6)), 10 + (i % 3) * 4, 1, i % 2 ? BONE : GOLD)
  if (sky === 'sunset' || sky === 'dawn') { x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip(); x.fillStyle = '#fff1b8'; x.beginPath(); x.arc(X + w * 0.6, Y + h * 0.75, w * 0.18, 0, Math.PI * 2); x.fill(); x.restore() }
  R(x, INK, X + w / 2 - 5, Y, 10, h); R(x, INK, X, Y + h / 2 - 5, w, 10)
  R(x, '#5a4680', X - 18, Y + h + 8, w + 36, 18)
  void t
}
/** a street at dusk/night: buildings with lit windows, a pavement, lamp posts */
export function street(x, t, { horizon = 1180, sky = 'night', lamps = [180, 900], tint = '#2b2150', shops = null } = {}) {
  const cols = ['#2f2458', '#3a2d66', '#281f4a', '#352a60']
  for (let i = 0; i < 6; i++) {
    const bx = i * 190 - 20, bh = 420 + ((i * 137) % 260), by = horizon - bh
    R(x, cols[i % 4], bx, by, 200, bh); R(x, INK, bx, by - 8, 200, 8)
    for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) {
      const lit = ((i * 7 + r * 3 + c * 5) % 4) !== 0
      const wy = by + 40 + r * 80; if (wy > horizon - 120) continue
      R(x, lit ? (sky === 'day' ? '#9fc9e8' : '#ffd98a') : '#1c1640', bx + 24 + c * 58, wy, 34, 44)
    }
  }
  if (shops) shops(x, horizon)
  R(x, tint, 0, horizon, 1080, 1920 - horizon)
  R(x, '#8c86a8', 0, horizon, 1080, 22); R(x, INK, 0, horizon + 22, 1080, 8)
  for (let i = 0; i < 8; i++) R(x, 'rgba(239,230,214,0.12)', i * 150, horizon + 180, 80, 8)
  for (const lx of lamps) lampPost(x, lx, horizon + 10, t, sky !== 'day')
}
export function lampPost(x, lx, base, t, lit = true) {
  R(x, INK, lx - 8, base - 520, 16, 520); R(x, '#4b4470', lx - 4, base - 520, 8, 520)
  box(x, lx - 34, base - 580, 68, 60, lit ? '#ffe9a8' : '#6a6488', { b: 6 })
  if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, lx, base - 550, 260, '255,220,150', 0.22 + 0.02 * Math.sin(t * 3)); x.restore() }
}
/** a park: grass, trees, a path, sky above (pass a sky colour pair) */
export function park(x, t, { horizon = 1100, top = '#ff9f7a', bottom = '#ffd8a0', grass = '#3f8f5a', sun = 0.4, trees = [120, 960] } = {}) {
  const g = x.createLinearGradient(0, 0, 0, horizon); g.addColorStop(0, top); g.addColorStop(1, bottom); x.fillStyle = g; x.fillRect(0, 0, 1080, horizon)
  if (sun > 0) { x.save(); x.globalAlpha = sun; x.fillStyle = '#fff4c8'; x.beginPath(); x.arc(760, horizon - 220, 110, 0, Math.PI * 2); x.fill(); glow(x, 760, horizon - 220, 420, '255,240,190', 0.35); x.restore() }
  R(x, '#2f6e48', 0, horizon - 40, 1080, 60)
  for (let i = 0; i < 12; i++) { const hx = i * 100 - 20; x.fillStyle = '#2f6e48'; x.beginPath(); x.arc(hx, horizon - 30, 70 + (i % 3) * 20, Math.PI, 0); x.fill() }
  R(x, grass, 0, horizon, 1080, 1920 - horizon)
  for (let i = 0; i < 40; i++) R(x, '#357c4d', (i * 137) % 1080, horizon + 40 + (i * 61) % (1920 - horizon - 60), 14, 6)
  for (const tx of trees) tree(x, tx, horizon + 40, t)
}
export function tree(x, tx, base, t) {
  R(x, INK, tx - 20, base - 260, 40, 260); R(x, WOOD_D, tx - 13, base - 260, 26, 260)
  const sw = 6 * Math.sin(t * 1.3 + tx)
  for (const [dx, dy, r] of [[0, -330, 120], [-80, -270, 90], [80, -270, 90]]) { x.fillStyle = INK; x.beginPath(); x.arc(tx + dx + sw, base + dy, r + 8, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[0, -330, 120], [-80, -270, 90], [80, -270, 90]]) { x.fillStyle = '#3d9b62'; x.beginPath(); x.arc(tx + dx + sw, base + dy, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#5bbf7f'; x.beginPath(); x.arc(tx - 30 + sw, base - 370, 40, 0, Math.PI * 2); x.fill()
}

// ═════════════════════════════════════════════════════════════ props
export function table(x, cx, top, w = 420, { col = WOOD, cloth = null } = {}) {
  box(x, cx - w / 2, top, w, 30, col, { b: 6, hi: '#a87650' })
  if (cloth) { R(x, INK, cx - w / 2 - 6, top - 6, w + 12, 70); R(x, cloth, cx - w / 2, top, w, 58); for (let i = 0; i < w; i += 40) R(x, 'rgba(255,255,255,0.25)', cx - w / 2 + i, top, 20, 58) }
  for (const d of [-1, 1]) { R(x, INK, cx + d * (w / 2 - 40) - 10, top + 30, 20, 210); R(x, WOOD_D, cx + d * (w / 2 - 40) - 5, top + 30, 10, 206) }
}
export function chair(x, cx, base, { col = '#c45a7a', flip = 1 } = {}) {
  R(x, INK, cx - 70, base - 140, 140, 22); R(x, col, cx - 64, base - 136, 128, 14)
  R(x, INK, cx + flip * 60 - 10, base - 340, 20, 220); R(x, col, cx + flip * 60 - 5, base - 336, 10, 200)
  for (const d of [-1, 1]) R(x, INK, cx + d * 56 - 6, base - 120, 12, 120)
}
export function bench(x, cx, base, w = 460) {
  box(x, cx - w / 2, base - 150, w, 24, WOOD, { b: 5 }); box(x, cx - w / 2, base - 230, w, 24, WOOD, { b: 5 })
  for (const d of [-1, 1]) { R(x, INK, cx + d * (w / 2 - 40) - 8, base - 230, 16, 230) }
}
export function plant(x, cx, base, s = 1, t = 0, { pot = CORAL, leaf = '#4fbf6f' } = {}) {
  const sw = 0.06 * Math.sin(t * 2 + cx)
  x.save(); x.translate(cx, base); x.scale(s, s)
  for (const [a, l] of [[-0.6, 90], [0, 120], [0.6, 90], [-0.25, 105], [0.3, 100]]) {
    x.save(); x.rotate(a + sw); R(x, INK, -11, -l - 6, 22, l + 6); R(x, leaf, -7, -l, 14, l); R(x, '#7fdc95', -7, -l, 6, l * 0.6); x.restore()
  }
  box(x, -50, -10, 100, 70, pot, { b: 6, hi: '#ffb08f' })
  x.restore()
}
export function mug(x, cx, base, { col = BONE, steam = 0, t = 0, s = 1 } = {}) {
  x.save(); x.translate(cx, base); x.scale(s, s)
  box(x, -36, -76, 72, 76, col, { b: 5 }); R(x, INK, 36, -60, 26, 8); R(x, INK, 54, -60, 8, 40); R(x, INK, 36, -26, 26, 8)
  R(x, '#6b3a22', -30, -70, 60, 10)
  if (steam > 0) for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); x.globalAlpha = steam * (1 - p); R(x, '#e8e2f4', -20 + i * 18 + 8 * Math.sin(t * 3 + i), -96 - p * 90, 10, 22) }
  x.restore()
}
export function plate(x, cx, cy, w = 200, { food = null, col = BONE, rim = '#c9b8e8' } = {}) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 6, w * 0.18 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = rim; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.18, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, w * 0.36, w * 0.12, 0, 0, Math.PI * 2); x.fill(); x.restore()
  if (food) food(x, cx, cy - w * 0.08)
}
export function candle(x, cx, base, t, { h = 90, col = BONE, lit = 1 } = {}) {
  box(x, cx - 16, base - h, 32, h, col, { b: 5 })
  if (lit > 0) {
    const f = 1 + 0.12 * Math.sin(t * 17 + cx) + 0.08 * Math.sin(t * 29)
    x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, base - h - 26, 140, '255,200,120', 0.35 * lit); x.restore()
    drawBits(x, ['.F.', 'FYF', 'FYF', '.F.'], { F: '#ff9a3a', Y: '#fff1a8' }, cx, base - h - 24 * f, 7 * f, { alpha: lit })
  }
}
export function book(x, cx, cy, { col = '#4f7cd8', open = 0, rot = 0, s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (open > 0.5) {
    box(x, -130, -80, 126, 160, BONE, { b: 5 }); box(x, 4, -80, 126, 160, BONE, { b: 5 })
    for (let i = 0; i < 6; i++) { R(x, '#b8acd0', -116, -60 + i * 22, 98, 6); R(x, '#b8acd0', 18, -60 + i * 22, 98, 6) }
    R(x, col, -6, -86, 12, 172)
  } else { box(x, -70, -96, 140, 192, col, { b: 6, hi: 'rgba(255,255,255,0.25)' }); R(x, BONE, 54, -86, 10, 172) }
  x.restore()
}
/** a chunky phone with a screen callback */
export function phone(x, cx, cy, { rot = 0, s = 1, screen = '#14102a', draw = null, faceDown = false } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (faceDown) { box(x, -70, -125, 140, 250, '#4a3e78', { b: 7 }); R(x, '#5a4e88', -30, -100, 26, 26); x.restore(); return }
  box(x, -70, -125, 140, 250, '#2a2148', { b: 7 }); R(x, screen, -58, -108, 116, 210)
  if (draw) draw(x)
  x.restore()
}
export function laptop(x, cx, base, { open = 1, s = 1, screen = '#7fd0ff' } = {}) {
  x.save(); x.translate(cx, base); x.scale(s, s)
  box(x, -180, -24, 360, 24, '#8c86a8', { b: 6 })
  const a = lerp(Math.PI * 0.02, Math.PI * 0.5, clamp(open))
  x.save(); x.translate(0, -24); x.scale(1, Math.sin(a)); box(x, -160, -220, 320, 220, '#5a5470', { b: 6 }); R(x, screen, -144, -204, 288, 188)
  for (let i = 0; i < 5; i++) R(x, 'rgba(27,18,54,0.35)', -124, -184 + i * 34, 140 + (i * 41) % 100, 12)
  x.restore(); x.restore()
}
export function painting(x, cx, cy, w, h, { t = 0, kind = 'sea' } = {}) {
  box(x, cx - w / 2 - 22, cy - h / 2 - 22, w + 44, h + 44, GOLD, { b: 8, hi: '#ffe08a', lo: '#b8902e' })
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2)
  if (kind === 'sea') { g.addColorStop(0, '#ffb38a'); g.addColorStop(0.5, '#ffd8a0'); g.addColorStop(0.51, '#3f7cf0'); g.addColorStop(1, '#1f3f9a') }
  else { g.addColorStop(0, '#2a2266'); g.addColorStop(1, '#6a4fb8') }
  x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  if (kind === 'sea') { x.fillStyle = '#fff1b8'; x.beginPath(); x.arc(cx, cy, w * 0.12, Math.PI, 0); x.fill(); for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.5)', cx - w * 0.35 + i * w * 0.2 + 6 * Math.sin(t + i), cy + 30 + i * 22, w * 0.14, 6) }
  else for (let i = 0; i < 8; i++) drawPixelStar(x, cx - w * 0.4 + ((i * 61) % (w * 0.8)), cy - h * 0.4 + ((i * 37) % (h * 0.8)), 14, 1, i % 2 ? BONE : GOLD)
}
export function tissues(x, cx, cy, s = 90) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
export function door(x, cx, base, { open = 0, col = '#7a4fb0' } = {}) {
  box(x, cx - 130, base - 420, 260, 420, '#1c1640', { b: 8 })
  const w = 260 * (1 - 0.8 * clamp(open))
  box(x, cx - 130, base - 420, w, 420, col, { b: 6, hi: '#9a6fd0' })
  if (w > 60) R(x, GOLD, cx - 130 + w - 40, base - 220, 18, 18)
}
/** a pixel sun for outdoor scenes */
export function sun(x, cx, cy, r, a = 1) { x.save(); x.globalAlpha = a; glow(x, cx, cy, r * 4, '255,236,180', 0.4); x.fillStyle = '#fff1b8'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore() }
/** a small sign post / sticker label on canvas: dark plate + bone text */
export function plateText(x, text, cx, cy, { size = 30, col = BONE, bg = INK, rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + 36, h = size + 24
  R(x, bg, -w / 2, -h / 2, w, h); x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
