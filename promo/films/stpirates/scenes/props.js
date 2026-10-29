// stpirates props — small pixel drawings on canvas, shared inside this film (STARTALK2.md: "props are shared helpers
// inside your own film folder"). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame / inSprite / tearsCells   the overlay maths from stcomet (the same transform drawStarChar uses), so
//                                       costume pieces drawn in sprite CELLS (the 36-cell grid) ride every hop and squash
//   tricornCells · eyepatchCells · bandanaCells · spyglassCells     the pirate crew's costumes
//   sixpackCells · bicepCells · shadesCells · chainCells · phoneCells   the three fake treasures' costumes
//   blanketCells                                                     the plaid blanket the quiet star drapes on Scorpio
//   drawTeapot · drawMug · drawCoin · drawChest · drawPalm · drawAnchor · drawCloud   world props (px)
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
/** the star's base (feet) y offset from its centre, as a fraction of size: place a star standing on y0 at y0 − FOOT·size */
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

// ── happy tears (from stcomet). k: 1 sniffle · 2 streams · 3 fountains
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

// ═══════════════════════════════════ costumes (cells) ═══════════════════════════════════
/** Captain Scorpio's tricorn: sits on the top point. tilt in radians (about the hat's centre), lift in cells */
export function tricornCells(ctx, { tilt = 0, lift = 0, droop = 0 } = {}) {
  ctx.save(); ctx.translate(18, 3 - lift); ctx.rotate(tilt); ctx.translate(-18, -3)
  const d = Math.round(droop * 2)
  const rows = [
    '.......KKKKKKKKKKKK.......',
    '.....KKKKKKKKKKKKKKKK.....',
    '....KKKKKKKKKPPKKKKKKK....',
    '...KKKKKKKKKPPPPKKKKKKK...',
    '.YKKKKKKKKKKKPPKKKKKKKKKY.',
    'YYYKKKKKKKKKKKKKKKKKKKKYYY',
    'YKYYYYYYYYYYYYYYYYYYYYYYKY',
    'KK..KKKKKKKKKKKKKKKKKK..KK',
  ]
  const pal = { K: '#2a1b46', Y: '#f2c75c', P: '#ff6b9a' }
  const cells = grid(rows, pal, 5, -4 + d)
  paintCells(ctx, cells)
  // a dim sheen on the crown
  ctx.fillStyle = '#4a3672'; ctx.fillRect(10, -3 + d, 5, 1)
  ctx.restore()
}
/** the eyepatch over the star's left eye (viewer's left), with its strap. up: 0 on · 1 flipped up onto the forehead */
export function eyepatchCells(ctx, up = 0) {
  const u = clamp(up)
  const strap = '#2a1b46'
  ctx.fillStyle = strap
  // strap: across the face, above the right eye, off the right side
  for (let i = 4; i <= 32; i++) { const y = Math.round(lerp(lerp(17, 10.5, u), lerp(12, 9, u), (i - 4) / 28)); ctx.fillRect(i, y, 1.02, 1.02) }
  const py = lerp(14, 7, u), h = lerp(9, 4, u)
  const cells = []
  for (let j = 0; j < Math.round(h); j++) for (let i = 0; i < 8; i++) {
    if ((i === 0 || i === 7) && (j === 0 || j === Math.round(h) - 1)) continue
    cells.push([9 + i, Math.round(py) + j, j === 0 && i > 1 && i < 4 ? '#4a3672' : '#120a24'])
  }
  paintCells(ctx, cells)
}
/** Aries the first mate's red bandana, knotted on the left */
export function bandanaCells(ctx, t = 0) {
  const rows = [
    '.......RRRRRRR.......',
    '.....RRRWRRRRRWR.....',
    '...RRRRRRRRWRRRRRR...',
    '..RRWRRRRRRRRRRRWRR..',
  ]
  paintCells(ctx, grid(rows, { R: '#e8344e', W: '#fbf3e6' }, 7.5, 3))
  const wv = Math.round(Math.sin(t * 7) * 0.8)
  paintCells(ctx, [[7, 7, '#e8344e'], [6, 8 + wv, '#e8344e'], [5, 9 + wv, '#c42540'], [8, 8, '#c42540'], [8, 9, '#e8344e'], [8, 10 - wv, '#c42540']])
}
/** Pisces' spyglass, held up to its right eye (k = 0…1 raised) */
export function spyglassCells(ctx, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.translate(23, 19); ctx.rotate(lerp(1.2, -0.25, k))
  const rows = ['BYYYYYYYBBBB', 'BYYYYYYYBBBB', 'BYYYYYYYBBBB']
  paintCells(ctx, grid(rows, { Y: '#e9b24a', B: '#a8742a' }, -1, -1.5))
  ctx.fillStyle = '#bff0ff'; ctx.fillRect(10.5, -1.5, 0.8, 3)
  ctx.restore()
}
/** the hunk's six-pack (k = flex: the abs pop and shade deeper) */
export function sixpackCells(ctx, k = 0) {
  const sh = mixHex('#d97a3a', '#b8582a', k), hi = '#ffd2a0'
  for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
    const x0 = 14.5 + c * 4, y0 = 22.5 + r * 2.3
    ctx.fillStyle = sh; ctx.fillRect(x0, y0, 3, 1.8)
    ctx.fillStyle = hi; ctx.fillRect(x0, y0, 1, 0.6)
  }
  ctx.fillStyle = sh; ctx.fillRect(17.75, 22.5, 0.5, 6.6)
}
/** biceps on the two side points (k = flex 0…1) — chubby bumps that swell */
export function bicepCells(ctx, k = 0, body = '#ffb26b') {
  const s = 1.6 + 1.6 * clamp(k)
  for (const [cx, side] of [[6.2, -1], [29.8, 1]]) {
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(cx, 12.6 - s * 0.4, s + 0.8, Math.PI, TAU); ctx.fill()
    ctx.fillStyle = body; ctx.beginPath(); ctx.arc(cx, 12.6 - s * 0.4, s, Math.PI, TAU); ctx.fill()
    ctx.fillStyle = '#ffe2c0'; ctx.fillRect(cx - side * 0.2 - 0.8, 12.6 - s * 1.2, 1, 0.8)
  }
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
/** a fat gold chain with a medallion */
export function chainCells(ctx, t = 0) {
  ctx.fillStyle = INK
  for (let i = 0; i <= 12; i++) { const a = i / 12, x = 11 + a * 14, y = 22.5 + Math.sin(a * Math.PI) * 3.2; ctx.fillRect(x - 0.6, y - 0.6, 1.7, 1.7) }
  for (let i = 0; i <= 12; i++) { const a = i / 12, x = 11 + a * 14, y = 22.5 + Math.sin(a * Math.PI) * 3.2; ctx.fillStyle = i % 2 ? '#ffd66e' : '#e9a92a'; ctx.fillRect(x - 0.4, y - 0.4, 1.2, 1.2) }
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(18, 28, 2.6, 0, TAU); ctx.fill()
  ctx.fillStyle = '#ffd66e'; ctx.beginPath(); ctx.arc(18, 28, 1.9, 0, TAU); ctx.fill()
  ctx.fillStyle = '#fff2b8'; ctx.fillRect(17.2, 27, 0.8, 0.8)
  if (Math.sin(t * 5) > 0.7) { ctx.fillStyle = '#ffffff'; ctx.fillRect(19, 26.4, 0.6, 0.6) }
}
/** the influencer's phone, held up on the right (screen faces the star; we see the back + camera) */
export function phoneCells(ctx, flash = 0) {
  const rows = ['KKKKK', 'KCCCK', 'KCWCK', 'KCCCK', 'KCCCK', 'KCCCK', 'KKKKK']
  paintCells(ctx, grid(rows, { K: '#120a24', C: '#ff8fb1', W: flash > 0.5 ? '#ffffff' : '#3a2a5a' }, 30, 13), null)
}
/** the plaid blanket over the star's shoulders (k = 0…1 drop-in, from above) */
export function blanketCells(ctx, k = 1) {
  if (k <= 0) return
  const dy = (1 - k) * -18
  const cells = []
  for (let j = 0; j < 9; j++) {
    const half = 9 + j * 1.2
    for (let i = Math.round(18 - half); i < Math.round(18 + half); i++) {
      const plaid = (Math.floor(i / 2) % 3 === 0) || (j % 3 === 1)
      cells.push([i, Math.round(21 + j + dy), plaid ? '#c43a52' : '#f2c75c'])
    }
  }
  paintCells(ctx, cells)
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
const TEAPOT = [
  '.....LL.....',
  '....LTTL....',
  '..TTTTTTTT..',
  'H.TTTTTTTT.S',
  'HHTTPPTTTTSS',
  'H.TTTTTTTTS.',
  '..TTTTTTTT..',
  '...TTTTTT...',
]
export function drawTeapot(ctx, x, y, c, tilt = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(tilt)
  blit(ctx, TEAPOT, { L: '#ffd6e2', T: '#9fe3d0', P: '#ff8fb1', H: '#7cc6b2', S: '#7cc6b2' }, 0, 0, c)
  ctx.restore()
}
const MUG = ['.MMMMM..', 'MTTTTTMH', 'MTTTTTM.H', 'MMMMMMMH', 'MMMMMMM.', '.MMMMM..']
export function drawMug(ctx, x, y, c, t, { steam = 1, heart = true } = {}) {
  blit(ctx, MUG.map(r => r.padEnd(9, '.')), { M: '#fbf3e6', T: '#c98a4a', H: '#fbf3e6' }, x, y, c)
  if (heart) { ctx.fillStyle = '#ff6b9a'; ctx.fillRect(x - c * 1.5, y + c * 0.6, c, c); ctx.fillRect(x - c * 0.5, y + c * 0.6, c, c); ctx.fillRect(x - c, y + c * 1.4, c, c * 0.8) }
  if (steam > 0) {
    for (let k = 0; k < 3; k++) {
      const ph = (t * 0.7 + k / 3) % 1
      ctx.globalAlpha = Math.sin(Math.PI * ph) * 0.8 * steam
      ctx.fillStyle = '#ffffff'
      const sx = x + (k - 1) * c * 1.6 + Math.sin(ph * 6 + k) * c * 0.8, sy = y - c * 4 - ph * c * 8
      ctx.fillRect(Math.round(sx), Math.round(sy), c, c * 1.4)
    }
    ctx.globalAlpha = 1
  }
}
/** a gold coin, face-on (spin: −1…1 squashes it horizontally). bitten: 0…1 the foil peels to chocolate */
export function drawCoin(ctx, x, y, r, { spin = 1, bitten = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(Math.max(0.12, Math.abs(spin)), 1)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, r + 4, 0, TAU); ctx.fill()
  ctx.fillStyle = '#e9a92a'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill()
  ctx.fillStyle = '#ffd66e'; ctx.beginPath(); ctx.arc(0, 0, r * 0.78, 0, TAU); ctx.fill()
  ctx.fillStyle = '#e9a92a'; ctx.font = `800 ${Math.round(r * 1.1)}px Inter, Arial, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('★', 0, r * 0.05)
  if (bitten > 0) {
    // the foil peels back from the top-right: chocolate underneath, with a bite out of it
    const k = clamp(bitten)
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, -Math.PI * 0.5, -Math.PI * 0.5 + TAU * 0.55 * k); ctx.lineTo(0, 0); ctx.closePath(); ctx.clip()
    ctx.fillStyle = '#6b3a22'; ctx.fillRect(-r, -r, 2 * r, 2 * r)
    ctx.fillStyle = '#8a4e2c'; ctx.fillRect(r * 0.1, -r * 0.7, r * 0.4, r * 0.25)
    ctx.restore()
    if (k > 0.5) {   // the bite
      ctx.globalCompositeOperation = 'destination-out'
      for (const [bx, by] of [[0.55, -0.55], [0.85, -0.1], [0.2, -0.85]]) { ctx.beginPath(); ctx.arc(bx * r, by * r, r * 0.3, 0, TAU); ctx.fill() }
      ctx.globalCompositeOperation = 'source-over'
    }
  }
  ctx.restore()
}
const CHEST = [
  'KWWWWWWWWWWWWWWWWWWWWK',
  'WBBBBBBBBBYYBBBBBBBBBW',
  'WBBBBBBBBYYYYBBBBBBBBW',
  'YYYYYYYYYYKKYYYYYYYYYY',
  'WBBBBBBBBBKKBBBBBBBBBW',
  'WBDBBBBBBBBBBBBBBBBDBW',
  'WBDBBBBBBBBBBBBBBBBDBW',
  'YYYYYYYYYYYYYYYYYYYYYY',
  'WBBBBBBBBBBBBBBBBBBBBW',
]
const LID = [
  '...WWWWWWWWWWWWWWWW...',
  '.WWBBBBBBBBBBBBBBBBWW.',
  'WBBBBBBBBBBBBBBBBBBBBW',
  'YYYYYYYYYYYYYYYYYYYYYY',
]
/** the big open treasure chest (lid open, gold heaped). x,y = the chest's centre; c = cell px */
export function drawChest(ctx, x, y, c, t, { glow = 1 } = {}) {
  const pal = { K: '#3a1e14', W: '#8a5a2c', B: '#6b4220', D: '#4f2e16', Y: '#f2c75c' }
  // the lid, open behind
  blit(ctx, LID, pal, x, y - c * 8.5, c)
  // the gold heap
  if (glow > 0) { const g = ctx.createRadialGradient(x, y - c * 4, 0, x, y - c * 4, c * 22); g.addColorStop(0, `rgba(255,214,110,${0.45 * glow})`); g.addColorStop(1, 'rgba(255,214,110,0)'); ctx.fillStyle = g; ctx.fillRect(x - c * 22, y - c * 26, c * 44, c * 44) }
  const r = rng(9)
  for (let i = 0; i < 26; i++) { const px = x + (r() * 2 - 1) * c * 9.5, py = y - c * 4.2 - r() * c * 2.6 * (1 - Math.abs(px - x) / (c * 11)); ctx.fillStyle = INK; ctx.fillRect(px - c * 1.2, py - c * 0.7, c * 2.4, c * 1.6); ctx.fillStyle = i % 3 ? '#ffd66e' : '#e9a92a'; ctx.fillRect(px - c, py - c * 0.5, c * 2, c * 1.1) }
  blit(ctx, CHEST, pal, x, y, c)
  // twinkles on the gold
  for (let i = 0; i < 5; i++) { const ph = (t * 0.9 + i * 0.21) % 1; if (ph > 0.25) continue; const a = Math.sin(Math.PI * ph / 0.25); ctx.globalAlpha = a; ctx.fillStyle = '#ffffff'; const px = x + (i - 2) * c * 3.6, py = y - c * 5.5 - (i % 2) * c; ctx.fillRect(px - c * 0.4, py - c * 1.4, c * 0.8, c * 2.8); ctx.fillRect(px - c * 1.4, py - c * 0.4, c * 2.8, c * 0.8); ctx.globalAlpha = 1 }
}
/** a pixel palm tree; sway in radians */
export function drawPalm(ctx, x, y, c, t, { h = 16, sway = 0.05, seed = 1 } = {}) {
  const lean = Math.sin(t * 1.3 + seed) * sway
  ctx.save(); ctx.translate(x, y)
  for (let j = 0; j < h; j++) {
    const bend = Math.round((j / h) ** 2 * 4 + lean * j * 2)
    ctx.fillStyle = INK; ctx.fillRect((bend - 1.5) * c, -j * c - c, c * 3, c * 1.02)
    ctx.fillStyle = j % 2 ? '#8a5a2c' : '#a8742a'; ctx.fillRect((bend - 1) * c, -j * c - c, c * 2, c * 1.02)
  }
  const top = Math.round(4 + lean * h * 2)
  ctx.translate(top * c, -h * c - c)
  for (let k = 0; k < 5; k++) {
    const a = -Math.PI + k * Math.PI / 4 + lean * 2 + Math.sin(t * 2 + k + seed) * 0.05
    for (let i = 0; i < 7; i++) {
      const rr = i * c * 1.1, px = Math.cos(a) * rr, py = Math.sin(a) * rr + (i * i) * c * 0.06
      ctx.fillStyle = INK; ctx.fillRect(px - c * 1.2, py - c * 1.2, c * 2.4, c * 2.4)
    }
    for (let i = 0; i < 7; i++) {
      const rr = i * c * 1.1, px = Math.cos(a) * rr, py = Math.sin(a) * rr + (i * i) * c * 0.06
      ctx.fillStyle = i % 2 ? '#4fbf6a' : '#6fd987'; ctx.fillRect(px - c * 0.8, py - c * 0.8, c * 1.6, c * 1.6)
    }
  }
  ctx.fillStyle = '#6b4220'; ctx.fillRect(-c * 1.5, c * 0.3, c * 1.4, c * 1.4); ctx.fillRect(c * 0.4, c * 0.6, c * 1.4, c * 1.4)
  ctx.restore()
}
const ANCHOR = [
  '....KKK....',
  '...KYYYK...',
  '...KYKYK...',
  '....KYK....',
  '.KKKKYKKKK.',
  '....KYK....',
  '....KYK....',
  '....KYK....',
  'K...KYK...K',
  'YK..KYK..KY',
  'KYK.KYK.KYK',
  '.KYYKYKYYK.',
  '..KYYYYYK..',
  '....KKK....',
]
export function drawAnchor(ctx, x, y, c, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  blit(ctx, ANCHOR, { Y: '#f2c75c' }, 0, 0, c, { outline: null })
  ctx.restore()
}
/** a chubby pixel rain cloud; mood: 'grump' gives it a little frown */
export function drawCloud(ctx, x, y, c, { alpha = 1, dark = 1, grump = false } = {}) {
  if (alpha <= 0) return
  const rows = [
    '......XXXX.........',
    '....XXXXXXXX.XXX...',
    '...XXXXXXXXXXXXXXX.',
    '.XXXXXXXXXXXXXXXXXX',
    'XXXXXXXXXXXXXXXXXXX',
    'XXXXXXXXXXXXXXXXXXX',
    '.XXXXXXXXXXXXXXXXX.',
  ]
  ctx.save(); ctx.globalAlpha *= alpha
  blit(ctx, rows, { X: mixHex('#c9c2e6', '#6f6694', dark) }, x, y, c)
  ctx.fillStyle = mixHex('#efeaff', '#8f86b6', dark); ctx.fillRect(x - c * 5, y - c * 2.5, c * 6, c)
  if (grump) {
    ctx.fillStyle = INK
    ctx.fillRect(x - c * 4, y, c, c * 1.4); ctx.fillRect(x + c * 3, y, c, c * 1.4)
    ctx.fillRect(x - c * 1.5, y + c * 2.2, c * 3, c * 0.8); ctx.fillRect(x - c * 2.5, y + c * 2.8, c, c * 0.8); ctx.fillRect(x + c * 1.5, y + c * 2.8, c, c * 0.8)
  }
  ctx.restore()
}
