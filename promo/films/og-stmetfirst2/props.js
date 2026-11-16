// stmetfirst2 props — small pixel drawings on canvas (copied from stmetfirst's prop kit and extended; kept in this folder).
//   drawPixels(ctx, bitmap, x, y, cell, palette, { rot, ax, ay, outline })   generic bitmap painter (rows of chars, '.' = empty)
//   drawCrown / drawBowTie                 Ep. 1's Leo crown and Sag bow tie (the couple from Ep. 1, now guests in the back)
//   drawPadlock(ctx, x, y, cell, open)     gold padlock (the lips button)
//   drawTears(ctx, x, y, cell, t, k, dir)  happy-tear fountain from an eye corner (k = intensity 0…2, dir ±1)
//   drawSpark(ctx, x, y, r, a)             a 4-point contact flash
//   drawTie(ctx, x, y, cell)               Capricorn's tiny necktie; (x, y) = top centre of the knot
//   drawPlanner(ctx, x, y, u, open, t)     Capricorn's planner: closed leather book → open gantt pages; (x, y) = centre
//   drawJournal(ctx, x, y, u, t)           Pisces' dream journal (moon + cloud cover); (x, y) = centre
//   drawClock(ctx, x, y, r, t, mode)       alarm clock: mode 'neat' (ticks politely) or 'chaos' (hands spinning)
//   drawPatch(ctx, x, y, cell)             a floating patch of earth; (x, y) = centre of the grass line
//   drawSprout(ctx, x, y, cell, g, bloom, t)  a sprout growing from (x, y) (g 0…1), then blooming (bloom 0…1)
//   drawDrop(ctx, x, y, cell)              one big pixel tear
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
// ── Capricorn's tiny necktie
const TIE = BM(`
.KKK.
.KHK.
..K..
.XXX.
.XXX.
XXSXX
XXXXX
XSXXX
XXXXX
.XXX.
..X..`)
const TIE_PAL = { X: '#d83a5a', K: '#a01f3e', H: '#ff7a92', S: '#f2c75c' }
export function drawTie(ctx, x, y, cell) {
  drawPixels(ctx, TIE, x, y, cell, TIE_PAL, { ax: 0.5, ay: 0, outline: '#0c0a24' })
}

// ── Capricorn's planner: closed = a leather book with a gold band; open = two pages of gantt bars and ticks
const BAR_COLS = ['#2fc79a', '#f2c75c', '#5ec8ff', '#ff8fb1', '#c9a6ff']
export function drawPlanner(ctx, x, y, u, open = 0, t = 0) {
  ctx.save(); ctx.translate(x, y)
  const o = clamp(open)
  const ink = '#0c0a24'
  if (o < 0.5) {
    // closed: 10 × 12 cells; squash horizontally while it opens
    const sx = 1 - o * 1.4
    ctx.scale(Math.max(0.12, sx), 1)
    const w = 10 * u, h = 12 * u
    ctx.fillStyle = ink; ctx.fillRect(-w / 2 - u, -h / 2 - u, w + 2 * u, h + 2 * u)
    ctx.fillStyle = '#5a3a22'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = '#7a5232'; ctx.fillRect(-w / 2, -h / 2, w, u)
    ctx.fillStyle = '#3d2615'; ctx.fillRect(-w / 2, -h / 2, u, h)
    ctx.fillStyle = '#f2c75c'; ctx.fillRect(w / 2 - 3 * u, -h / 2, u * 1.2, h)          // the elastic band
    // embossed label plate + a tiny goat-horn swirl (♑-ish) in gold
    ctx.fillStyle = '#3d2615'; ctx.fillRect(-w / 2 + 2 * u, -h / 2 + 2.5 * u, 5 * u, 3 * u)
    ctx.fillStyle = '#f2c75c'; ctx.fillRect(-w / 2 + 2.5 * u, -h / 2 + 3.5 * u, 4 * u, u)
    ctx.fillRect(-w / 2 + 2.5 * u, -h / 2 + 7 * u, 3 * u, u * 0.6); ctx.fillRect(-w / 2 + 2.5 * u, -h / 2 + 8.5 * u, 2 * u, u * 0.6)
  } else {
    // open: 22 × 13 cells, two pages; the spread unfolds from the spine
    const sx = (o - 0.5) * 2
    ctx.scale(Math.max(0.12, sx), 1)
    const w = 22 * u, h = 13 * u
    ctx.fillStyle = ink; ctx.fillRect(-w / 2 - u, -h / 2 - u, w + 2 * u, h + 2 * u)
    ctx.fillStyle = '#5a3a22'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = '#f6eedb'; ctx.fillRect(-w / 2 + u * 0.6, -h / 2 + u * 0.6, w / 2 - u, h - 1.2 * u); ctx.fillRect(u * 0.4, -h / 2 + u * 0.6, w / 2 - u, h - 1.2 * u)
    ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-u * 0.4, -h / 2 + u * 0.6, u * 0.8, h - 1.2 * u)
    // left page: five years, each a gantt bar of its own colour, staggered like a staircase
    for (let r = 0; r < 5; r++) {
      const yy = -h / 2 + (1.8 + r * 2.1) * u
      ctx.fillStyle = '#bfb39a'; ctx.fillRect(-w / 2 + 1.6 * u, yy, 1.4 * u, u)        // the year label
      ctx.fillStyle = BAR_COLS[r]; ctx.fillRect(-w / 2 + (3.6 + r * 1.2) * u, yy, (4.2 - r * 0.35) * u, u)
    }
    // right page: a checklist, every box ticked
    for (let r = 0; r < 5; r++) {
      const yy = -h / 2 + (1.8 + r * 2.1) * u
      ctx.fillStyle = '#2c3f7a'; ctx.fillRect(1.8 * u, yy - 0.2 * u, 1.4 * u, 1.4 * u)
      ctx.fillStyle = '#f6eedb'; ctx.fillRect(2.1 * u, yy + 0.1 * u, 0.8 * u, 0.8 * u)
      ctx.fillStyle = '#2fc79a'; ctx.fillRect(2.2 * u, yy + 0.3 * u, 0.4 * u, 0.6 * u); ctx.fillRect(2.5 * u, yy - 0.3 * u, 0.4 * u, 1.1 * u)
      ctx.fillStyle = '#bfb39a'; ctx.fillRect(4 * u, yy + 0.2 * u, (4.5 - (r % 2) * 1.6) * u, 0.6 * u)
    }
    ctx.fillStyle = '#f2c75c'; ctx.fillRect(w / 2 - 2.4 * u, -h / 2 - 1.6 * u, u, 2.6 * u)   // ribbon bookmark
  }
  ctx.restore()
}

// ── Pisces' dream journal: lavender cover, a moon, a cloud, little stars
export function drawJournal(ctx, x, y, u, t = 0) {
  ctx.save(); ctx.translate(x, y)
  const w = 11 * u, h = 13 * u
  ctx.fillStyle = '#0c0a24'; ctx.fillRect(-w / 2 - u, -h / 2 - u, w + 2 * u, h + 2 * u)
  ctx.fillStyle = '#8a7cf0'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#6a5cd0'; ctx.fillRect(-w / 2, -h / 2, u, h)
  ctx.fillStyle = '#b3a8ff'; ctx.fillRect(-w / 2 + u, -h / 2, w - u, u)
  // moon (crescent)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(-1 * u, -h / 2 + 2 * u, 3 * u, 3 * u); ctx.fillRect(-1.5 * u, -h / 2 + 2.5 * u, 4 * u, 2 * u)
  ctx.fillStyle = '#8a7cf0'; ctx.fillRect(0.4 * u, -h / 2 + 1.8 * u, 2.4 * u, 2.4 * u)
  // cloud
  ctx.fillStyle = '#f6f2ff'
  ctx.fillRect(-3.5 * u, 0.5 * u, 7 * u, 2 * u); ctx.fillRect(-2.5 * u, -0.5 * u, 3 * u, u); ctx.fillRect(0.5 * u, -1 * u, 2 * u, 1.5 * u)
  // twinkling stars
  const tw = Math.floor(t * 4) % 2
  ctx.fillStyle = '#fff1c8'
  for (const [a, b, k] of [[-3.5, -4.5, 0], [3.5, -0.5, 1], [-3, 4, 1], [3, 4.5, 0]]) {
    const s = (k === tw) ? 1 : 0.6
    ctx.fillRect((a - 0.5 * s) * u, (b - 0.5 * s) * u, s * u, s * u)
  }
  // zZ on the cover
  ctx.fillStyle = '#3a2a9e'; ctx.fillRect(-2 * u, 4 * u, 1.6 * u, 0.5 * u); ctx.fillRect(-1.2 * u, 4.4 * u, 0.5 * u, 0.6 * u); ctx.fillRect(-2 * u, 5 * u, 1.6 * u, 0.5 * u)
  ctx.restore()
}

// ── alarm clock. 'neat': hands parked at 8:59, a tidy tick; 'chaos': both hands spinning, the clock rattling
export function drawClock(ctx, x, y, r, t, mode = 'neat') {
  ctx.save(); ctx.translate(x, y)
  if (mode === 'chaos') ctx.rotate(0.12 * Math.sin(t * 38))
  const rim = mode === 'chaos' ? '#8a7cf0' : '#2fc79a'
  // bells + legs
  ctx.fillStyle = '#0c0a24'
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(s * r * 0.62, -r * 0.86, r * 0.36, 0, Math.PI * 2); ctx.fill() }
  ctx.fillStyle = rim
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(s * r * 0.62, -r * 0.86, r * 0.27, Math.PI, Math.PI * 2); ctx.fill() }
  ctx.fillStyle = '#0c0a24'; for (const s of [-1, 1]) ctx.fillRect(s * r * 0.55 - r * 0.08, r * 0.8, r * 0.16, r * 0.32)
  ctx.beginPath(); ctx.arc(0, 0, r + 8, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#f6eedb'; ctx.beginPath(); ctx.arc(0, 0, r * 0.8, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#1b1236'
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; ctx.fillRect(Math.cos(a) * r * 0.66 - 3, Math.sin(a) * r * 0.66 - 3, 6, 6) }
  let ah, am
  if (mode === 'chaos') { ah = t * 7; am = t * 23 }
  else { const tick = Math.floor(t * 2); am = -Math.PI / 2 + (59 + (tick % 2) * 0.4) * Math.PI / 30; ah = -Math.PI / 2 + 8.98 * Math.PI / 6 }
  ctx.strokeStyle = '#1b1236'; ctx.lineCap = 'round'
  ctx.lineWidth = Math.max(6, r * 0.14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(ah) * r * 0.42, Math.sin(ah) * r * 0.42); ctx.stroke()
  ctx.lineWidth = Math.max(4, r * 0.09); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(am) * r * 0.62, Math.sin(am) * r * 0.62); ctx.stroke()
  ctx.fillStyle = '#ff5c8e'; ctx.fillRect(-5, -5, 10, 10)
  ctx.restore()
}

// ── a floating patch of earth (grass on top), and the sprout that grows out of it
const PATCH = BM(`
.g.G..g.gG.g.
gGgGggGgGGgGg
DDDDDDDDDDDDD
DDdDDDDDDdDDD
.DDDDdDDDDDD.
..DDDDDDdDD..
...DdDDDDD...
....DDDdD....
......DD.....`)
const PATCH_PAL = { g: '#6fe08a', G: '#3fae5a', D: '#7a4a2a', d: '#5a3418' }
export function drawPatch(ctx, x, y, cell) {
  drawPixels(ctx, PATCH, x, y - 1.5 * cell, cell, PATCH_PAL, { ax: 0.5, ay: 0, outline: '#1b0f08' })
}

/** a pixel sprout: the stem grows up to 9 cells (g 0…1), two leaves unfurl, then a bud opens into a pink bloom */
export function drawSprout(ctx, x, y, cell, g, bloom = 0, t = 0) {
  if (g <= 0) return
  const c = Math.ceil(cell)
  const H = Math.max(1, Math.round(9 * clamp(g)))
  const sway = Math.round(Math.sin(t * 2.4) * 0.6 * clamp(g))
  ctx.save(); ctx.translate(Math.round(x), Math.round(y))
  const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(i * cell - cell / 2, -j * cell - cell, c, c) }
  for (let j = 0; j < H; j++) px(j > 5 ? sway : 0, j, j % 3 === 1 ? '#3fae5a' : '#4fc36a')
  if (g > 0.35) { const k = clamp((g - 0.35) / 0.3); px(-1, 3, '#6fe08a'); if (k > 0.5) { px(-2, 4, '#6fe08a'); px(-1, 4, '#3fae5a') } }
  if (g > 0.5) { const k = clamp((g - 0.5) / 0.3); px(1, 5, '#6fe08a'); if (k > 0.5) { px(2, 6, '#6fe08a'); px(1, 6, '#3fae5a') } }
  const tx = sway, ty = H
  if (bloom <= 0 && g >= 0.95) { px(tx, ty, '#ff8fb1'); px(tx, ty + 1, '#ff5c8e') }      // the bud
  if (bloom > 0) {
    const b = clamp(bloom), r = b < 0.5 ? 1 : 2
    const P = '#ff8fb1', Pd = '#ff5c8e'
    for (let a = -r; a <= r; a++) for (let d = -r; d <= r; d++) {
      if (Math.abs(a) + Math.abs(d) > r + (r > 1 ? 1 : 0) || (a === 0 && d === 0)) continue
      px(tx + a, ty + 1 + d, (a + d) % 2 ? Pd : P)
    }
    px(tx, ty + 1, '#ffd84a')
    if (r > 1) { px(tx - 1, ty + 2, '#fff1c8') }
  }
  ctx.restore()
}

// ── one big pixel tear (falling)
const DROP = BM(`
..X..
..X..
.XXX.
.XHX.
XXHXX
XXXXX
XXXXX
.XXX.`)
export function drawDrop(ctx, x, y, cell) {
  drawPixels(ctx, DROP, x, y, cell, { X: '#8fd8ff', H: '#ffffff' }, { ax: 0.5, ay: 1, outline: '#1b3a6b' })
}
