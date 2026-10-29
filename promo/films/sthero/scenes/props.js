// sthero props — small pixel drawings on canvas, shared inside this film (STARTALK2.md: "props are shared helpers
// inside your own film folder"). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame / inSprite / tearsCells / FOOT   the overlay maths from stpirates (the same transform drawStarChar uses), so
//                                              costume pieces drawn in sprite CELLS (the 36-cell grid) ride every hop and squash
//   capeCells · maskCells · emblemCells        Captain Boundaries' costume (the cape is drawn BEFORE the star, the rest after)
//   tophatCells · monocleCells · grouchoCells  the Borrower (and his "new guy" disguise)
//   gogglesCells · labcoatCells · dizzy        Dr. Overreacting
//   fedoraCells · shadesCells                  the Phone Peeker
//   blit · drawBurst · drawBalloon · drawField · drawWallet · drawMoth · drawPhone · drawPeriscope · drawIOU   world props (px)
import { clamp, lerp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ── colour helpers
export const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
export const rgba = (hex, a) => { const [r, g, b] = hexRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

// ── star transform (mirrors startalk.js drawStarChar)
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
/** the star's base (feet) y offset from its centre, as a fraction of size: a star standing on y0 sits at y0 − FOOT·size */
export const FOOT = (FOOT_ROW - HALF) / G

function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
/** rows of chars → cells, using a palette; ox/oy = the cell of the top-left char */
function grid(rows, pal, ox, oy) {
  const out = []
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (pal[c]) out.push([ox + i, oy + j, pal[c]]) }))
  return out
}

// ── tears (from stcomet). k: 1 sniffle · 2 streams · 3 fountains
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
/** a sweat drop on the upper right of the head (k 0…1) */
export function sweatCells(ctx, t, k = 1) {
  if (k <= 0) return
  const dy = (t * 2.2) % 1 * 3
  ctx.globalAlpha *= clamp(k)
  paintCells(ctx, grid(['.B.', 'BBB', 'BWB', '.B.'], { B: '#8fe3ff', W: '#ffffff' }, 27, 8 + dy))
  ctx.globalAlpha /= clamp(k) || 1
}

// ═══════════════════════════════════ Captain Boundaries (cells) ═══════════════════════════════════
/** the cape, drawn BEHIND the star. fly 0 = hanging · 1 = streaming flat behind; dir = which way it streams (−1 left, +1 right) */
export function capeCells(ctx, t, { fly = 0, dir = -1, color = '#e8344e', lining = '#f2c75c', len = 1 } = {}) {
  const rows = Math.round(lerp(28, 30, fly) * clamp(len, 0, 1.2))
  if (rows < 2) return
  const L = [], R = []
  for (let j = 0; j < rows; j++) {
    const v = j / rows
    const wave = Math.sin(t * lerp(3, 11, fly) - j * 0.42) * lerp(0.8, 2.2, fly) * v
    const sweep = dir * fly * j * 0.95
    const y = 10 + j * lerp(1, 0.42, fly) - fly * v * v * 4
    const half = lerp(11, 19, v) * lerp(1, 0.78, fly)
    const cx = 18 + sweep + wave
    L.push([cx - half, y]); R.push([cx + half, y])
  }
  const row = (j, pad, col) => {
    const [lx, y] = L[j], [rx] = R[j]
    ctx.fillStyle = col; ctx.fillRect(Math.round(lx) - pad, Math.round(y) - pad, Math.round(rx - lx) + 2 * pad, 1.02 + 2 * pad * 0.5 + (fly > 0.4 ? 0.6 : 0))
  }
  for (let j = 0; j < rows; j++) row(j, 1, INK)
  for (let j = 0; j < rows; j++) row(j, 0, j === rows - 1 ? lining : j % 6 === 3 ? mixHex(color, '#7a1030', 0.25) : color)
  // the gold lining peeks at the hem
  const [lx, y] = L[rows - 1], [rx] = R[rows - 1]
  ctx.fillStyle = lining; ctx.fillRect(Math.round(lx), Math.round(y), Math.round(rx - lx), 1.02)
}
/** the red domino mask (holes around both eyes) */
export function maskCells(ctx, { color = '#e8344e', off = 0 } = {}) {
  if (off >= 1) return
  const rows = [
    '....MMMMMM...MMMMMM....',
    'M.MMMMMMMMMMMMMMMMMMM.M',
    'MMMM......MMMM......MMM',
    '.MMM......MMMM......MM.',
    '..MM......MMMM......MM.',
    '..MM......MMMM......MM.',
    '..MM......MMMM......MM.',
    '..MM......MMMM......MM.',
    '..MM......MMMM......MM.',
    '..MM......MMMM......MM.',
    '...MMMMMMMM..MMMMMMMM..',
  ]
  paintCells(ctx, grid(rows, { M: color }, 6, 13))
  ctx.fillStyle = '#ff8fa6'; ctx.fillRect(9, 14, 4, 0.6); ctx.fillRect(20, 14, 3, 0.6)
}
/** the gold diamond chest emblem with a red pixel "B" */
export function emblemCells(ctx, gleam = 0) {
  const rows = [
    '...YY...',
    '..YRRY..',
    '.YYRYRY.',
    'YYYRRYYY',
    '.YYRYRY.',
    '..YRRY..',
    '...YY...',
  ]
  paintCells(ctx, grid(rows, { Y: '#f2c75c', R: '#e8344e' }, 14, 23.2))
  if (gleam > 0) { ctx.globalAlpha *= clamp(gleam); ctx.fillStyle = '#ffffff'; ctx.fillRect(15.5, 24.5, 1, 1); ctx.fillRect(14.5, 25.5, 1, 1); ctx.globalAlpha /= clamp(gleam) || 1 }
}

// ═══════════════════════════════════ villains (cells) ═══════════════════════════════════
/** the Borrower's tall top hat (tilt in radians) */
export function tophatCells(ctx, { tilt = 0, lift = 0 } = {}) {
  ctx.save(); ctx.translate(18, 2 - lift); ctx.rotate(tilt); ctx.translate(-18, -2)
  const rows = [
    '..KKKKKKKKKK..',
    '..KKKKKKKKKK..',
    '..KKKKKKKKKK..',
    '..KKKKKKKKKK..',
    '..KKKKKKKKKK..',
    '..GGGGGGGGGG..',
    '..KKKKKKKKKK..',
    'KKKKKKKKKKKKKK',
  ]
  paintCells(ctx, grid(rows, { K: '#24183e', G: '#7dffb0' }, 11, -6))
  ctx.fillStyle = '#4a3672'; ctx.fillRect(14, -5, 1, 4)
  ctx.restore()
}
/** a gold monocle over the right eye, with its chain */
export function monocleCells(ctx) {
  const c = []
  for (let a = 0; a < 24; a++) { const an = a / 24 * TAU; c.push([Math.round(22.5 + Math.cos(an) * 4.2), Math.round(18.5 + Math.sin(an) * 4.6), '#f2c75c']) }
  const seen = new Set(), cells = c.filter(([i, j]) => { const k = i + ',' + j; if (seen.has(k)) return false; seen.add(k); return true })
  paintCells(ctx, cells, null)
  ctx.fillStyle = '#f2c75c'; for (let i = 0; i < 6; i++) ctx.fillRect(26 + i * 0.5, 22 + i, 0.8, 0.8)
}
/** the "new guy" disguise: glasses rims, a big nose and a moustache */
export function grouchoCells(ctx) {
  const rows = [
    'KKKKKKKK..KKKKKKKK',
    'K......KKKK......K',
    'K......K..K......K',
    'K......K..K......K',
    'KKKKKKKK..KKKKKKKK',
    '.......PPPP.......',
    '.......PPPP.......',
    '...BBBBBBBBBBBB...',
    '..BBBBB....BBBBB..',
  ]
  paintCells(ctx, grid(rows, { K: '#120a24', P: '#ff9ab0', B: '#3a2416' }, 9, 15), null)
}
/** Dr. Overreacting's goggles on the forehead + a wild tuft of hair */
export function gogglesCells(ctx, t = 0) {
  const tuft = Math.round(Math.sin(t * 5) * 0.6)
  paintCells(ctx, grid(['W.W.W', 'WWWWW', '.WWW.'], { W: '#fbf3e6' }, 15.5 + tuft, -1.5))
  ctx.fillStyle = '#2a1b46'; ctx.fillRect(7, 11, 22, 1.4)
  for (const cx of [13, 23]) {
    paintCells(ctx, grid(['.GGGG.', 'GCCCCG', 'GCWCCG', 'GCCCCG', '.GGGG.'], { G: '#8a8fa8', C: '#7fe0ff', W: '#ffffff' }, cx - 3, 9))
  }
}
/** a white lab-coat bib with a pocket and two pens */
export function labcoatCells(ctx) {
  const rows = [
    'WWWW.....WWWW',
    'WWWWW...WWWWW',
    'WWWWWW.WWWWWW',
    'WWWWWWWWWPPWW',
    'WWWWWWWWWBRWW',
    'WWWWWWWWWLLWW',
    '.WWWWWWWWWWW.',
  ]
  paintCells(ctx, grid(rows, { W: '#f4f1ea', P: '#c9c2e6', B: '#5aa0ff', R: '#e8344e', L: '#c9c2e6' }, 11.5, 23.4))
}
/** a sneaky fedora */
export function fedoraCells(ctx, { tilt = -0.12 } = {}) {
  ctx.save(); ctx.translate(18, 3); ctx.rotate(tilt); ctx.translate(-18, -3)
  const rows = [
    '....KKKKKKKKKK....',
    '...KKKKKDDKKKKK...',
    '...KKKKKKKKKKKK...',
    '...BBBBBBBBBBBB...',
    'KKKKKKKKKKKKKKKKKK',
  ]
  paintCells(ctx, grid(rows, { K: '#4a3a5e', D: '#3a2c4c', B: '#120a24' }, 9, -2))
  ctx.restore()
}
/** big black shades across both eyes, with a glint */
export function shadesCells(ctx, glint = 0) {
  const rows = [
    '.KKKKKKKK..KKKKKKKK.',
    'KKSSSSSSKKKKSSSSSSKK',
    '.KSSSSSSK..KSSSSSSK.',
    '.KSSSSSSK..KSSSSSSK.',
    '..KSSSSK....KSSSSK..',
    '...KKKK......KKKK...',
  ]
  paintCells(ctx, grid(rows, { K: '#0c0718', S: '#2b2350' }, 8, 15.5), null)
  ctx.fillStyle = '#ffffff'
  const g = Math.round(glint * 4)
  ctx.fillRect(10 + g, 17.5, 1, 1); ctx.fillRect(22 + g, 17.5, 1, 1)
}

// ═══════════════════════════════════ world props (px) ═══════════════════════════════════
/** px-cell blitter: rows of chars at (x, y) with cell size c, centred */
export function blit(ctx, rows, pal, x, y, c, { outline = INK, flip = false } = {}) {
  const w = rows[0].length, h = rows.length, ox = Math.round(x - w * c / 2), oy = Math.round(y - h * c / 2)
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && pal[rows[j][flip ? w - 1 - i : i]]
  if (outline) {
    ctx.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) ctx.fillRect(ox + i * c, oy + j * c, c, c)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const col = on(i, j); if (col) { ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5) } }
}

/** the comic-book impact burst ("NO!" / "BOING!"): a jagged star with a hard shadow, Ben-Day dots and big outlined type */
export function drawBurst(ctx, x, y, r, { text = '', k = 1, rot = 0, fill = '#ffd84a', dots = '#ff9f3a', ink = '#e8344e', size = 120, spikes = 14, seed = 1, font = "Inter, 'Helvetica Neue', Arial, sans-serif" } = {}) {
  if (k <= 0) return
  const R = rng(seed)
  const pts = []
  for (let i = 0; i < spikes * 2; i++) {
    const a = (i / (spikes * 2)) * TAU, rr = (i % 2 ? r * (0.62 + R() * 0.08) : r * (0.92 + R() * 0.16))
    pts.push([Math.round(Math.cos(a) * rr * 1.18 / 6) * 6, Math.round(Math.sin(a) * rr / 6) * 6])
  }
  const path = (dx = 0, dy = 0) => { ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px + dx, py + dy) : ctx.moveTo(px + dx, py + dy)); ctx.closePath() }
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  path(14, 14); ctx.fillStyle = INK; ctx.fill()
  path(); ctx.lineJoin = 'miter'; ctx.lineWidth = 14; ctx.strokeStyle = INK; ctx.stroke(); ctx.fillStyle = fill; ctx.fill()
  ctx.save(); path(); ctx.clip(); ctx.fillStyle = dots
  for (let yy = -r * 1.2; yy < r * 1.2; yy += 22) for (let xx = -r * 1.4; xx < r * 1.4; xx += 22) { const off = (Math.round(yy / 22) % 2) * 11; const d = Math.hypot(xx, yy) / r; if (d < 0.45) continue; const s = 4 + 5 * clamp(d - 0.45); ctx.fillRect(xx + off - s / 2, yy - s / 2, s, s) }
  ctx.restore()
  if (text) {
    ctx.font = `italic 900 ${size}px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = INK; ctx.strokeText(text, 6, size * 0.06 + 6)
    ctx.strokeText(text, 0, size * 0.06); ctx.fillStyle = ink; ctx.fillText(text, 0, size * 0.06)
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(-size * 0.02, -size * 0.36, 0, 0)
  }
  ctx.restore()
}

/** a comic speech balloon (white, ink outline, stepped corners) with a tail toward (tx, ty). font = Space Mono 700 */
export function drawBalloon(ctx, x, y, text, { k = 1, tx = null, ty = null, size = 30, color = INK, fill = '#fbf6ec', font = "'Space Mono', ui-monospace, monospace" } = {}) {
  if (k <= 0) return
  ctx.save()
  ctx.font = `700 ${size}px ${font}`
  const lines = String(text).split('|').map(s => s.trim())
  const tw = Math.max(...lines.map(l => ctx.measureText(l).width)), lh = size * 1.2
  const w = Math.round((tw + size * 1.2) / 6) * 6, h = Math.round((lines.length * lh + size * 0.8) / 6) * 6
  ctx.translate(x, y); ctx.scale(k, k)
  const P = 6
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(-w / 2 - o + 2 * P, -h / 2 - o, w + 2 * o - 4 * P, h + 2 * o); ctx.fillRect(-w / 2 - o, -h / 2 - o + 2 * P, w + 2 * o, h + 2 * o - 4 * P); ctx.fillRect(-w / 2 - o + P, -h / 2 - o + P, w + 2 * o - 2 * P, h + 2 * o - 2 * P) }
  // tail
  if (tx !== null) {
    const lx = (tx - x) / k, ly = (ty - y) / k, bx = clamp(lx * 0.35, -w / 2 + 30, w / 2 - 30), by = ly > 0 ? h / 2 - 4 : -h / 2 + 4
    const tri = (o, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(bx - 20 - o, by); ctx.lineTo(bx + 20 + o, by); ctx.lineTo(lx * 0.75 + (ly > 0 ? 0 : 0), ly * 0.75 + (ly > 0 ? o : -o)); ctx.closePath(); ctx.fill() }
    tri(7, INK)
    step(P, INK); step(0, fill); tri(0, fill)
  } else { step(P, INK); step(0, fill) }
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  lines.forEach((l, i) => ctx.fillText(l, 0, (i - (lines.length - 1) / 2) * lh + 2))
  ctx.restore()
}

/** the force field: a glowing slab of pixel cells between top and bot, centred on x, w wide. k = 0…1 slammed in (from above) */
export function drawField(ctx, x, top, bot, w, t, { col = '#f2c75c', hi = '#fff6c8', k = 1, alpha = 1, seed = 0 } = {}) {
  if (k <= 0 || alpha <= 0) return
  const C = 12
  const h = bot - top, dy = (1 - k) * -(h + 900)
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(0, dy)
  // the glow
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(x - w * 2.4, 0, x + w * 2.4, 0)
  g.addColorStop(0, rgba(col, 0)); g.addColorStop(0.5, rgba(col, 0.42)); g.addColorStop(1, rgba(col, 0))
  ctx.fillStyle = g; ctx.fillRect(x - w * 2.4, top - 30, w * 4.8, h + 60)
  ctx.restore()
  // the slab (ink outline + cells)
  ctx.fillStyle = INK; ctx.fillRect(Math.round(x - w / 2) - 6, top - 6, w + 12, h + 12)
  const cols = Math.round(w / C), rows = Math.ceil(h / C)
  const scan = ((t * 1.6 + seed) % 1) * rows
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const near = Math.abs(rows - 1 - j - scan) < 2.2
    const base = (i + j) % 2 ? col : mixHex(col, '#ffffff', 0.28)
    ctx.fillStyle = near ? hi : base
    ctx.fillRect(Math.round(x - w / 2) + i * C, top + j * C, C, Math.min(C, h - j * C))
  }
  // rim lights
  ctx.fillStyle = hi; ctx.fillRect(Math.round(x - w / 2), top, w, 6)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(Math.round(x - w / 2), top, 6, h)
  ctx.restore()
}

/** Pisces' wallet; open 0…1 (the flap swings up) */
export function drawWallet(ctx, x, y, c, open = 0) {
  blit(ctx, ['WWWWWWWWWW', 'WBBBBBBBBW', 'WBBBBBBBBW', 'WBBBBBBGBW', 'WBBBBBBBBW', 'WWWWWWWWWW'], { W: '#8a5a2c', B: '#a8742a', G: '#f2c75c' }, x, y, c)
  if (open > 0) {
    ctx.save(); ctx.translate(x, y - 3 * c); ctx.scale(1, 1 - 2 * clamp(open))
    blit(ctx, ['WWWWWWWWWW', 'WBBBBBBBBW'], { W: '#6b4220', B: '#8a5a2c' }, 0, -c, c)
    ctx.restore()
  }
}
/** a little grey moth, flapping */
export function drawMoth(ctx, x, y, c, t) {
  const up = Math.sin(t * 30) > 0
  blit(ctx, up ? ['G...G', 'GG.GG', '.GBG.', '..B..'] : ['.....', 'GG.GG', 'GGBGG', '..B..'], { G: '#c9c2d6', B: '#6f6694' }, x, y, c)
}
/** Pisces' phone (the screen faces us): a chat with "Mom ❤". k = 0…1 raised */
export function drawPhone(ctx, x, y, t, { k = 1, rot = 0, font = "'Space Mono', ui-monospace, monospace" } = {}) {
  if (k <= 0) return
  const w = 176, h = 300
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  ctx.fillStyle = '#2a1b46'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#16102c'; ctx.fillRect(-w / 2 + 10, -h / 2 + 12, w - 20, h - 24)
  // header
  ctx.fillStyle = '#3a2a66'; ctx.fillRect(-w / 2 + 10, -h / 2 + 12, w - 20, 54)
  ctx.font = `700 28px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#efe6d6'; ctx.fillText('Mom', -10, -h / 2 + 40)
  ctx.fillStyle = '#ff6b9a'; ctx.fillRect(34, -h / 2 + 32, 6, 6); ctx.fillRect(44, -h / 2 + 32, 6, 6); ctx.fillRect(32, -h / 2 + 37, 20, 6); ctx.fillRect(37, -h / 2 + 43, 10, 5)
  // bubbles
  const bub = (bx, by, bw, col) => { ctx.fillStyle = col; ctx.fillRect(bx, by, bw, 30) }
  bub(-w / 2 + 22, -h / 2 + 84, 104, '#4a3a7a'); bub(-w / 2 + 22, -h / 2 + 122, 70, '#4a3a7a')
  bub(w / 2 - 22 - 98, -h / 2 + 168, 98, '#ff8fb1'); bub(w / 2 - 22 - 64, -h / 2 + 206, 64, '#ff8fb1')
  // typing dots
  for (let i = 0; i < 3; i++) { ctx.fillStyle = Math.floor(t * 4) % 3 === i ? '#efe6d6' : '#6f6694'; ctx.fillRect(-w / 2 + 30 + i * 16, h / 2 - 50, 9, 9) }
  ctx.restore()
}
/** the periscope rising out of the cloud floor: pipe up from (x, baseY) to height h, elbow toward dir (−1 = left) */
export function drawPeriscope(ctx, x, baseY, h, t, { dir = -1, glint = 0 } = {}) {
  if (h <= 0) return
  const W = 30, top = baseY - h
  ctx.fillStyle = INK; ctx.fillRect(x - W / 2 - 6, top, W + 12, h)
  ctx.fillStyle = '#6f8f86'; ctx.fillRect(x - W / 2, top, W, h)
  ctx.fillStyle = '#9fc4b8'; ctx.fillRect(x - W / 2, top, 8, h)
  for (let y = top + 40; y < baseY; y += 60) { ctx.fillStyle = INK; ctx.fillRect(x - W / 2 - 4, y, W + 8, 6) }
  // the elbow + lens
  const ex = x + dir * 54
  ctx.fillStyle = INK; ctx.fillRect(Math.min(x, ex) - W / 2 - 6, top - 6, Math.abs(ex - x) + W + 12, W + 12)
  ctx.fillStyle = '#6f8f86'; ctx.fillRect(Math.min(x, ex) - W / 2, top, Math.abs(ex - x) + W, W)
  ctx.fillStyle = '#9fc4b8'; ctx.fillRect(Math.min(x, ex) - W / 2, top, Math.abs(ex - x) + W, 7)
  const lx = ex + dir * (W / 2)
  ctx.fillStyle = INK; ctx.fillRect(lx - 8, top - 6, 16, W + 12)
  ctx.fillStyle = '#7fe0ff'; ctx.fillRect(lx - 4, top + 2, 8, W - 4)
  if (glint > 0) { ctx.save(); ctx.globalAlpha *= glint; ctx.fillStyle = '#ffffff'; ctx.fillRect(lx - 14, top + W / 2 - 3, 28, 6); ctx.fillRect(lx - 3, top - 8, 6, W + 16); ctx.restore() }
  void t
}
/** the IOU scroll unrolling down from (x, y0): p = 0…1 unrolled. Items are written on it, top to bottom. */
export function drawIOU(ctx, x, y0, p, items, { w = 236, rowH = 46, font = "'Space Mono', ui-monospace, monospace" } = {}) {
  if (p <= 0) return
  const full = 70 + items.length * rowH, h = Math.max(20, full * clamp(p))
  ctx.fillStyle = INK; ctx.fillRect(x - w / 2 - 6, y0 - 6, w + 12, h + 12)
  ctx.fillStyle = '#f3e3bb'; ctx.fillRect(x - w / 2, y0, w, h)
  ctx.fillStyle = '#d8c08c'; for (let y = y0 + 12; y < y0 + h; y += 18) ctx.fillRect(x - w / 2, y, 4, 8)
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y0, w, h); ctx.clip()
  ctx.font = `700 34px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#c42540'
  ctx.fillText('I.O.U.', x, y0 + 36)
  ctx.font = `700 27px ${font}`; ctx.fillStyle = '#5a3418'
  items.forEach((s, i) => ctx.fillText(s, x, y0 + 84 + i * rowH))
  ctx.restore()
  // the roll at the bottom
  ctx.fillStyle = INK; ctx.fillRect(x - w / 2 - 14, y0 + h - 4, w + 28, 26)
  ctx.fillStyle = '#e2cd96'; ctx.fillRect(x - w / 2 - 8, y0 + h + 2, w + 16, 14)
}
/** small spinning pixel stars around a dazed head */
export function dizzy(ctx, x, y, r, t, drawPixelStar) {
  for (let i = 0; i < 3; i++) {
    const a = t * 5 + i * TAU / 3
    drawPixelStar(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.35, 26, 1, i % 2 ? '#fff2a8' : '#f2c75c')
  }
}
