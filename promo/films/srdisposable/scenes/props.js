// srdisposable props (copied from stwereup/props.js, Star Talk season 2): tiny pixel drawings, pure functions, no document at top level.
import { clamp } from '../../../src/lib.js'

export function drawBitmap(ctx, rows, x, y, cell, pal, { ax = 0.5, ay = 0.5, rot = 0, flip = false, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length, c = Math.max(1, Math.round(cell))
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y))
  if (rot) ctx.rotate(rot)
  if (flip) ctx.scale(-1, 1)
  const ox = -Math.round(w * c * ax), oy = -Math.round(h * c * ay)
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const col = pal[r[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c, c) } })
  ctx.restore()
}

// ── tears: arcs of blue pixel drops spurting sideways from each eye
export function drawTears(ctx, eyes, t, t0, { cell = 6, strength = 1, alpha = 1 } = {}) {
  if (t < t0 || strength <= 0) return
  const c = Math.max(2, Math.round(cell))
  ctx.save(); ctx.globalAlpha *= alpha
  eyes.forEach(([ex, ey], side) => {
    const dir = side === 0 ? -1 : 1
    for (let k = 0; k < 9; k++) {
      const ph = ((t - t0) * 2.1 + k / 9) % 1
      const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
      const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
      const a = (1 - ph) * clamp(strength)
      if (a <= 0.03) continue
      ctx.globalAlpha = alpha * a
      const X = Math.round(px), Y = Math.round(py)
      ctx.fillStyle = '#16204a'; ctx.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
      ctx.fillStyle = '#5cc6ff'; ctx.fillRect(X, Y, c, 2 * c)
      ctx.fillStyle = '#e6f8ff'; ctx.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
    }
  })
  ctx.restore()
}
const WHISTLE = [
  'XXXXXXXX......',
  'XLLLLLLLXXXX..',
  'XLHHLLLLLLLLX.',
  'XXXXXXLLLLLLLX',
  '.....XLLHLLLLX',
  '.....XLLLDDLLX',
  '.....XLLDDDLLX',
  '......XLLLLLX.',
  '.......XXXXX..',
]
export function drawWhistle(ctx, x, y, cell, { blow = 0, t = 0, flip = false, alpha = 1 } = {}) {
  const c = Math.max(2, Math.round(cell))
  const jig = blow > 0 ? Math.round(Math.sin(t * 80) * c * 0.5) : 0
  drawBitmap(ctx, WHISTLE, x, y + jig, c, { X: '#2a2440', L: '#d9dde8', H: '#ffffff', D: '#7d8396' }, { ax: 0, ay: 0.25, flip, alpha })
  // lanyard: a red cord dropping from the ring
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = '#e8484f'
  const lx = x + (flip ? -1 : 1) * 12 * c
  for (let k = 0; k < 6; k++) ctx.fillRect(Math.round(lx + (flip ? -1 : 1) * k * c * 0.6), Math.round(y + 6 * c + k * c), c, c)
  ctx.restore()
  // air puffs when blowing: little lines out of the far end
  if (blow > 0) {
    ctx.save(); ctx.globalAlpha *= alpha * clamp(blow); ctx.fillStyle = '#ffffff'
    const sx = x + (flip ? -1 : 1) * 15 * c
    for (let k = 0; k < 3; k++) {
      const ph = (t * 6 + k / 3) % 1, len = 3 + Math.round(ph * 3)
      const dy = (k - 1) * 3 * c - (k - 1) * ph * 2 * c
      for (let i = 0; i < len; i++) ctx.fillRect(Math.round(sx + (flip ? -1 : 1) * (ph * 6 + i) * c), Math.round(y + c + dy), c, c)
    }
    ctx.restore()
  }
}
