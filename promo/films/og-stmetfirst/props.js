// stmetfirst props — small pixel drawings on canvas (the season-2 prop kit, kept inside this film's folder).
//   drawPixels(ctx, bitmap, x, y, cell, palette, { rot, ax, ay, outline })   generic bitmap painter (rows of chars, '.' = empty)
//   drawCrown(ctx, x, y, cell, rot)        tiny gold crown; (x, y) = bottom centre
//   drawBowTie(ctx, x, y, cell)            tiny bow tie; (x, y) = centre
//   drawPadlock(ctx, x, y, cell, open)     gold padlock; open 0…1 lifts the shackle; (x, y) = centre of the body
//   drawFlame(ctx, x, y, cell, t, seed)    flickering pixel flame; (x, y) = bottom centre
//   drawTears(ctx, x, y, cell, t, k, dir, seed)  happy-tear fountain from an eye corner (k = intensity 0…2, dir ±1)
//   drawSpark(ctx, x, y, r, a)             a 4-point contact flash
// Pure functions of their arguments; no document access.
import { clamp } from '../../src/lib.js'

const BM = s => s.trim().split(/\s+/)

export function drawPixels(ctx, bm, x, y, cell, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot)
  const ox = -w * cell * ax, oy = -h * cell * ay
  const c = Math.ceil(cell) + 0.5
  if (outline) {
    ctx.fillStyle = outline
    bm.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const r2 = bm[j + b], ch2 = r2 ? r2[i + a] : undefined
        if (!ch2 || ch2 === '.') ctx.fillRect(ox + (i + a) * cell, oy + (j + b) * cell, c, c)
      }
    }))
  }
  bm.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.' || !pal[ch]) return
    ctx.fillStyle = pal[ch]; ctx.fillRect(ox + i * cell, oy + j * cell, c, c)
  }))
  ctx.restore()
}

const CROWN = BM(`
X...X...X
XH.XHX.XX
XHXXXXXXX
XXXXXXXXX
XRXXBXXRX
XXXXXXXXX
YYYYYYYYY`)
const CROWN_PAL = { X: '#f7c948', H: '#fff4b8', R: '#ff4d6d', B: '#5ec8ff', Y: '#c98a1c' }
export function drawCrown(ctx, x, y, cell, rot = 0) {
  drawPixels(ctx, CROWN, x, y, cell, CROWN_PAL, { rot, ax: 0.5, ay: 1, outline: '#3a1c08' })
}

const BOW = BM(`
XX...XX
XHX.XXX
XXXKXXX
XXX.XXX
XX...XX`)
const BOW_PAL = { X: '#ff5c8e', H: '#ffc2d6', K: '#c2185b' }
export function drawBowTie(ctx, x, y, cell) {
  drawPixels(ctx, BOW, x, y, cell, BOW_PAL, { outline: '#3a0a22' })
}

const SHACKLE = BM(`
..XXXXX..
.XX...XX.
.X.....X.
.X.....X.
.X.....X.`)
const LOCK = BM(`
GGGGGGGGG
GHHGGGGGG
GHGGKGGGG
GGGKKKGGG
GGGGKGGGG
GGGGKGGGG
GGGGGGGGG
DDDDDDDDD`)
export function drawPadlock(ctx, x, y, cell, open = 0, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const lift = clamp(open) * 2.2 * cell
  drawPixels(ctx, SHACKLE, open > 0.5 ? cell * 1.5 : 0, -4 * cell - lift, cell, { X: '#d9dde8' }, { ay: 1, outline: '#1b1236' })
  drawPixels(ctx, LOCK, 0, 0, cell, { G: '#f7c948', H: '#fff4b8', K: '#3a1c08', D: '#c98a1c' }, { ay: 0.5, outline: '#1b1236' })
  ctx.restore()
}

const FLAMES = [BM(`
...X...
..XX...
..XYX..
.XYYX..
.XYWYX.
XYYWYYX
XYYYYYX
.XXXXX.`), BM(`
....X..
...XX..
..XYX..
..XYYX.
.XYWYX.
XYYWYYX
XYYYYYX
.XXXXX.`), BM(`
..X....
..XX...
.XYX...
.XYYX..
.XYWYX.
XYYWYYX
XYYYYYX
.XXXXX.`)]
const FLAME_PAL = { X: '#ff5a1f', Y: '#ffb02e', W: '#fff2a8' }
export function drawFlame(ctx, x, y, cell, t, seed = 0, scale = 1) {
  if (scale <= 0) return
  const f = FLAMES[Math.floor(t * 9 + seed * 1.7) % 3]
  drawPixels(ctx, f, x, y, cell * scale, FLAME_PAL, { ax: 0.5, ay: 1, outline: '#5a1206' })
}

// happy tears: little pixel drops arcing outward from an eye corner and falling
export function drawTears(ctx, x, y, cell0, t, k = 1, dir = 1, seed = 0) {
  if (k <= 0) return
  const cell = cell0 * 1.8
  const n = Math.round(3 + 4 * Math.min(2, k))
  const period = 0.9 / Math.max(0.6, k)
  for (let i = 0; i < n; i++) {
    const ph = ((t / period) + i / n + seed * 0.13) % 1
    const vx = dir * cell * (3 + 6 * k) * (0.7 + 0.3 * ((i * 7) % 3) / 2)
    const vy = -cell * (2 + 5 * k)
    const g = cell * 34
    const px = x + vx * ph * 1.6, py = y + vy * ph * 1.6 + g * (ph * 1.6) ** 2 * 0.5
    const a = ph < 0.1 ? ph / 0.1 : 1 - Math.max(0, (ph - 0.7) / 0.3)
    ctx.globalAlpha = clamp(a)
    const c = Math.max(4, Math.round(cell * 0.8))
    ctx.fillStyle = '#8fd8ff'; ctx.fillRect(px, py, c, c * 1.6); ctx.fillRect(px - c * 0.5, py + c * 0.6, c * 2, c)
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px, py + c * 0.5, c * 0.5, c * 0.5)
  }
  ctx.globalAlpha = 1
}

export function drawSpark(ctx, x, y, r, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalAlpha *= clamp(a); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, 'rgba(255,248,214,0.95)'); g.addColorStop(0.3, 'rgba(247,207,104,0.55)'); g.addColorStop(1, 'rgba(247,207,104,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#fff8d6'
  const w = Math.max(4, r * 0.08)
  ctx.fillRect(x - r * 0.9, y - w / 2, r * 1.8, w); ctx.fillRect(x - w / 2, y - r * 0.9, w, r * 1.8)
  ctx.restore()
}
