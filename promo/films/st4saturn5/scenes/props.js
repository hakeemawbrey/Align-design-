// st4saturn5 props — Saturn the teacher (drawn exactly like stsaturn: banded pixel disc, tilted ring, round glasses,
// pointer) and the parchment scroll (staunties' drawScroll, plus a check that can land late). Copies live here so this
// film doesn't depend on another film's folder. Pure functions of their arguments; no `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const INK = '#1b1236', BONE = '#efe6d6'
export const SAT = '#e8c27a'
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const BANDS = ['#f6dca0', '#e8c27a', '#d9a85e', '#f0cf8c', '#c98f4a', '#e8c27a', '#f6dca0']

/** Saturn at (cx, cy), radius r px. eyes: 'stern' | 'open' | 'happy' | 'wink'; look [x, y]; glint 0…1 (a flash on the
 *  glasses); pointer: null or { ang (deg, 180 = pointing left), alpha }. k = pop scale. */
export function drawSaturn(x, t, { cx, cy, r, k = 1, eyes = 'open', look = [0, 0], glint = 0, pointer = null, tilt0 = -0.32 }) {
  if (k <= 0.01) return
  const RC = 11, R = RC
  const c = Math.max(2, Math.round(r * k / RC))
  cx = Math.round(cx); cy = Math.round(cy)
  // glow
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r * 3)
  g.addColorStop(0, rgba(SAT, 0.3 * k)); g.addColorStop(0.45, rgba(SAT, 0.1 * k)); g.addColorStop(1, rgba(SAT, 0))
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r * 3, 0, Math.PI * 2); x.fill(); x.restore()
  const tilt = tilt0 + 0.04 * Math.sin(t * 1.3)
  const ct = Math.cos(tilt), sn = Math.sin(tilt)
  const ringCell = (i, j) => {
    const u = (i + 0.5) * ct + (j + 0.5) * sn, v = -(i + 0.5) * sn + (j + 0.5) * ct
    const e = (u / (2.15 * R)) ** 2 + (v / (0.6 * R)) ** 2, e2 = (u / (1.42 * R)) ** 2 + (v / (0.36 * R)) ** 2
    return e <= 1 && e2 > 1 ? { v, edge: e > 0.82 } : null
  }
  const drawRing = back => {
    for (let j = -Math.ceil(1.3 * R); j <= Math.ceil(1.3 * R); j++) for (let i = -Math.ceil(2.3 * R); i <= Math.ceil(2.3 * R); i++) {
      const q = ringCell(i, j)
      if (!q || (q.v < 0) !== back) continue
      x.fillStyle = q.edge ? '#b07a3a' : back ? '#c99a5a' : '#f3d9a2'
      x.fillRect(cx + i * c, cy + j * c, c, c)
    }
  }
  x.save()
  x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(cx + c / 2, cy + c / 2, (R + 1.2) * c, 0, Math.PI * 2); x.fill()
  drawRing(true)
  for (let j = -R; j < R; j++) for (let i = -R; i < R; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > R) continue
    const band = BANDS[clamp(Math.floor(((j + R) / (2 * R)) * BANDS.length), 0, BANDS.length - 1)]
    x.fillStyle = d > R - 1 && i + j > 0 ? '#b07a3a' : (i + j < -R * 0.9 && d < R - 1 ? '#fff1c8' : band)
    x.fillRect(cx + i * c, cy + j * c, c, c)
  }
  const [lx, ly] = look
  const blinkT = (t + 0.7) % 3.7 < 0.13
  for (const s of [-1, 1]) {
    const ex = cx + s * 4 * c, ey = cy - 1 * c
    x.strokeStyle = INK; x.lineWidth = Math.max(2, c * 0.7)
    x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3.3 * c, 0, Math.PI * 2); x.stroke()
    x.fillStyle = 'rgba(190,230,255,0.25)'; x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3 * c, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK
    const e = eyes === 'wink' && s > 0 ? 'happy' : eyes === 'wink' ? 'open' : eyes
    if (blinkT && e !== 'happy') x.fillRect(ex - c, ey + c, 3 * c, c)
    else if (e === 'happy') { x.fillRect(ex - c, ey + c, c, c); x.fillRect(ex, ey, c, c); x.fillRect(ex + c, ey + c, c, c) }
    else if (e === 'stern') { x.fillRect(ex - c + lx * c, ey, 3 * c, c); x.fillRect(ex + lx * c, ey + c, 2 * c, c); x.fillRect(ex - 2 * c, ey - 2 * c, 4 * c, c * 0.8) }
    else { x.fillRect(ex + lx * c, ey + ly * c - c, 2 * c, 3 * c); x.fillStyle = '#ffffff'; x.fillRect(ex + lx * c, ey + ly * c - c, c * 0.8, c * 0.8) }
  }
  x.fillStyle = INK; x.fillRect(cx - c, cy - c * 0.6, 2 * c, c * 0.7)
  if (glint > 0) drawPixelStar(x, cx - 2 * c, cy - 3 * c, 40 * Math.sin(Math.PI * glint) + 8, 2, '#ffffff')
  drawRing(false)
  x.restore()
  if (pointer && pointer.alpha > 0) {
    const a = pointer.ang * Math.PI / 180, L = r * 2.1
    const bx = cx - r * 0.6, by = cy + r * 0.8
    const tx = bx + Math.cos(a) * L, ty = by - Math.sin(a) * L * -0.55 + L * 0.3
    x.save(); x.globalAlpha = pointer.alpha; x.lineCap = 'round'
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.strokeStyle = '#8a5a2a'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.fillStyle = BONE; x.beginPath(); x.arc(tx, ty, 8, 0, Math.PI * 2); x.fill()
    x.restore()
  }
}

/** a parchment scroll, top roller at `top`, unrolled `len` px; items [{ text, check, at }] (an item shows from `at`). */
export function drawScroll(ctx, t, cx, top, w, len, items, { font = "italic 600 44px 'EB Garamond', serif", alpha = 1, rowH = 74 } = {}) {
  if (alpha <= 0 || len <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const x0 = cx - w / 2
  const g = ctx.createLinearGradient(x0, 0, x0 + w, 0)
  g.addColorStop(0, '#e6cf9f'); g.addColorStop(0.12, '#f7ead0'); g.addColorStop(0.88, '#f7ead0'); g.addColorStop(1, '#dcc290')
  ctx.fillStyle = 'rgba(14,8,32,0.7)'; ctx.fillRect(x0 - 6, top, w + 12, len + 6)
  ctx.fillStyle = g; ctx.fillRect(x0, top, w, len)
  ctx.fillStyle = '#c9a76a'
  for (let yy = top; yy < top + len; yy += 24) { ctx.fillRect(x0, yy, 6, 12); ctx.fillRect(x0 + w - 6, yy + 12, 6, 12) }
  ctx.save(); ctx.beginPath(); ctx.rect(x0, top, w, len); ctx.clip()
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  items.forEach((it, i) => {
    if (it.at != null && t < it.at) return
    const y = top + 62 + i * rowH
    if (y > top + len + 40) return
    const pk = it.at != null ? easeOutBack(prog(t, it.at, it.at + 0.25), 2.2) : 1
    ctx.save(); ctx.translate(0, (1 - clamp(pk)) * 14); ctx.globalAlpha *= clamp(pk * 2)
    ctx.font = font; ctx.fillStyle = '#4a2814'
    const bx = x0 + 30, bs = 30
    ctx.lineWidth = 4; ctx.strokeStyle = '#6b3a1e'; ctx.strokeRect(bx, y - bs / 2, bs, bs)
    ctx.fillText(it.text, bx + bs + 18, y + 2)
    if (it.check != null && t >= it.check) {
      const k = easeOutBack(prog(t, it.check, it.check + 0.22), 2.2)
      ctx.save(); ctx.translate(bx + bs / 2, y); ctx.scale(k, k); ctx.strokeStyle = '#d23a5a'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath(); ctx.moveTo(-14, -2); ctx.lineTo(-3, 12); ctx.lineTo(20, -22); ctx.stroke(); ctx.restore()
    }
    ctx.restore()
  })
  ctx.restore()
  const roller = y => {
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(x0 - 26, y - 16, w + 52, 32)
    ctx.fillStyle = '#b37a3c'; ctx.fillRect(x0 - 26, y - 16, w + 52, 10)
    ctx.fillStyle = '#5b3517'; ctx.fillRect(x0 - 26, y + 10, w + 52, 6)
    ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0 - 40, y - 20, 18, 40); ctx.fillRect(x0 + w + 22, y - 20, 18, 40)
  }
  roller(top); roller(top + len)
  ctx.restore()
}
export { lerp, ease }
