// stcomet props — small pixel drawings on canvas, shared inside this film (STARTALK2.md: "props are shared helpers
// inside your own film folder"). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame / inSprite        the exact transform drawStarChar uses (same maths as startalk.js), so overlays drawn in
//                               sprite CELLS (the 36-cell grid) stay seated through hops, bobs and squash
//   tearsCells(ctx, t, k)       happy tears (k: 1 sniffle · 2 streams · 3 fountains)   hankieCells(ctx, side)
//   jealousEyesCells(ctx, o)    side-eye over the star's eyes: heavy lids, white sclera, an iris that turns envy green
//   veinCells(ctx, t, k)        a pulsing pixel anger mark beside the top point
//   cheekSparkleCells(ctx, k)   the comet's sparkle "kiss" on a star's right cheek
//   drawComet(ctx, x, y, R, t, o) / drawCometTail(...)   the flashy comet: icy pixel head, shades, HELLO sticker, sparkly tail
//   drawPopcorn(ctx, x, y, c, o)   Pisces' striped popcorn bucket (and the phone that lands in it)
//   drawFin(ctx, cx, t, o)      the telenovela "Fin" card hanging on two ropes
//   petals(ctx, t, t0, o)       falling rose petals (pure f(t))
//   makeTalkCard(doc, img, lines)  card-talk-6.png (VI The Lovers) with our own question set in (call in build only)
import { clamp, lerp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

/** cells with a 1-cell ink outline */
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ── happy tears (cells). Eyes sit at (13.4, 19.2) and (22.6, 19.2); drops leave the outer corners.
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
export function hankieCells(ctx, side) {
  const x0 = side < 0 ? 9 : 20, cells = []
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) cells.push([x0 + i, 19 + j, (i === 0 || j === 0 || i === 5 || j === 4) ? '#ff8fb1' : (i + j) % 3 ? '#fff6ee' : '#ffd6e2'])
  paintCells(ctx, cells)
}

// ── jealous eyes: drawn over the plain 'neutral' eyes of a star drawn with look [0, 0] and blink: false
// (the two 6×8 eye boxes at cells x 10–15 and 20–25, y 15–22). k: 0 ink iris → 1 envy green.
const mixRgb = (a, b, k) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(',')})`
export function jealousEyesCells(ctx, { k = 1, look = 1, lookY = 0, lid = 2, low = 0, shut = 0 } = {}) {
  const iris = mixRgb([38, 24, 70], [84, 214, 92], k), irisHi = mixRgb([120, 104, 170], [214, 255, 196], k), pupil = mixRgb([12, 8, 26], [12, 54, 26], k)
  const ic = look > 0.3 ? 3 : look < -0.3 ? 1 : 2, jy = lookY > 0.3 ? 4 : lookY < -0.3 ? 3 : 3.5
  for (const x0 of [10, 20]) {
    for (let j = 0; j < 8; j++) for (let i = 0; i < 6; i++) {
      if ((i === 0 || i === 5) && (j === 0 || j === 7)) continue
      ctx.fillStyle = i === 0 || i === 5 || j === 0 || j === 7 ? INK : '#fffaf0'
      ctx.fillRect(x0 + i, 15 + j, 1.02, 1.02)
    }
    const iy = Math.round(jy)
    for (let j = iy; j < iy + 3; j++) for (let i = ic; i < ic + 2; i++) { ctx.fillStyle = iris; ctx.fillRect(x0 + i, 15 + j, 1.02, 1.02) }
    ctx.fillStyle = pupil; ctx.fillRect(x0 + ic + (look > 0.3 ? 1 : look < -0.3 ? 0 : 1), 15 + iy + 1, 1.02, 1.02)
    ctx.fillStyle = irisHi; ctx.fillRect(x0 + ic + (look > 0.3 ? 0 : 1), 15 + iy, 1.02, 1.02)
    // lids: heavy and suspicious from the top, a twitchy one from the bottom
    ctx.fillStyle = INK
    const top = Math.round(clamp(lid + shut * 6, 0, 6))
    if (top > 0) ctx.fillRect(x0 + 1, 16, 4.02, top + 0.02)
    if (low > 0) ctx.fillRect(x0 + 1, 22 - low, 4.02, low + 0.02)
  }
}

// ── a pulsing anger mark (four little brackets) floating beside the top point (cells)
export function veinCells(ctx, t, k = 1) {
  if (k <= 0) return
  const s = 1 + 0.18 * Math.max(0, Math.sin(t * 9))
  ctx.save(); ctx.translate(27.5, 8.5); ctx.scale(s * k, s * k)
  const R = ['.XX.XX.', 'XX...XX', 'X.....X', '.......', 'X.....X', 'XX...XX', '.XX.XX.']
  const cells = []
  R.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') cells.push([i - 3.5, j - 3.5, '#ff4058']) }))
  paintCells(ctx, cells)
  ctx.restore()
}

// ── the comet's sparkle kiss on the right cheek (cells)
export function cheekSparkleCells(ctx, k = 1, t = 0) {
  if (k <= 0) return
  const tw = 0.85 + 0.15 * Math.sin(t * 8)
  ctx.save(); ctx.translate(26, 24.5); ctx.scale(k * tw, k * tw)
  const cells = [[0, -3, '#ffd3ea'], [0, -2, '#ff8fc8'], [0, -1, '#ff8fc8'], [-3, 0, '#ffd3ea'], [-2, 0, '#ff8fc8'], [-1, 0, '#ff8fc8'], [0, 0, '#ffffff'],
    [1, 0, '#ff8fc8'], [2, 0, '#ff8fc8'], [3, 0, '#ffd3ea'], [0, 1, '#ff8fc8'], [0, 2, '#ff8fc8'], [0, 3, '#ffd3ea'], [-1, -1, '#ffe08a'], [1, 1, '#ffe08a']]
  paintCells(ctx, cells.map(([i, j, c]) => [i - 0.5, j - 0.5, c]))
  ctx.restore()
}

// ═══════════════════════════════════════════ the comet ═══════════════════════════════════════════
const C_PAL = { line: '#16234e', rim: '#5fc4f0', shade: '#9fd2f2', deep: '#78b4e2', body: '#dcf4ff', light: '#f4fcff', hi: '#ffffff', ice: '#bfe6fa' }
const EYE_O = ['.XX.', 'XWXX', 'XXXX', 'XXXX', '.XX.']
const EYE_H = ['....', '.XX.', 'X..X', '....', '....']
/** the tail: a soft ribbon + streaming pixel sparkles. ang = the direction the tail points (from the head, radians) */
export function drawCometTail(ctx, x, y, R, t, { ang = -0.62, len = 3.4, alpha = 1, wag = 0, seed = 7 } = {}) {
  if (alpha <= 0) return
  const L = R * len, c = Math.max(2, Math.round(R / 11))
  const dir = (u) => ang + wag * Math.sin(t * 7 - u * 3) * u
  const pt = (u, v) => { const a = dir(u), w = R * (0.9 + 1.1 * u) * v; return [x + Math.cos(a) * L * u - Math.sin(a) * w, y + Math.sin(a) * L * u + Math.cos(a) * w] }
  ctx.save(); ctx.globalAlpha *= alpha; ctx.globalCompositeOperation = 'lighter'
  // ribbon glow
  for (const [wk, a] of [[1, 0.3], [0.55, 0.42], [0.22, 0.6]]) {
    ctx.beginPath()
    for (let i = 0; i <= 20; i++) { const [px, py] = pt(i / 20, -wk); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
    for (let i = 20; i >= 0; i--) { const [px, py] = pt(i / 20, wk); ctx.lineTo(px, py) }
    ctx.closePath()
    const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * L, y + Math.sin(ang) * L)
    g.addColorStop(0, `rgba(170,232,255,${a})`); g.addColorStop(0.45, `rgba(255,150,200,${a * 0.6})`); g.addColorStop(1, 'rgba(200,160,255,0)')
    ctx.fillStyle = g; ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'
  // sparkles streaming out along the tail
  const r = rng(seed * 131 + 5), COLS = ['#ffffff', '#bff0ff', '#ff9ed0', '#ffe08a', '#d3b8ff', '#9fe8ff']
  for (let i = 0; i < 96; i++) {
    const sp = 0.35 + r() * 0.5, off = r(), v = (r() * 2 - 1) * 0.85, big = r() < 0.26, col = COLS[i % COLS.length]
    const u = ((t * sp + off) % 1 + 1) % 1
    const [px, py] = pt(u, v * (0.3 + 0.7 * u))
    const a = (1 - u) ** 1.2 * (0.55 + 0.45 * Math.sin(t * 9 + i))
    if (a < 0.05) continue
    ctx.globalAlpha = alpha * clamp(a)
    ctx.fillStyle = col
    const s = big ? c * 1.5 : c * (u < 0.3 ? 1 : 0.75)
    const X = Math.round(px), Y = Math.round(py)
    ctx.fillRect(X - s / 2, Y - s / 2, s, s)
    if (big && a > 0.45) { ctx.fillRect(X - s * 1.5, Y - s / 4, s * 3, s / 2); ctx.fillRect(X - s / 4, Y - s * 1.5, s / 2, s * 3) }
  }
  ctx.restore()
}
/** the comet head. o: pop, alpha, shades (1 on the eyes … 0 pushed up), mood 'neutral' | 'happy' | 'wink', look, blink (0…1),
 *  squash (+ wide), tilt (rad), tag (the HELLO sticker), glint (time of a lens glint) */
export function drawComet(ctx, x, y, R, t, o = {}) {
  const { pop = 1, alpha = 1, shades = 1, mood = 'neutral', look = [0, 0], blink = 0, squash = 0, tilt = 0, tag = true, glint = -9, stretch = 0, stretchAng = 0 } = o
  if (pop <= 0.01 || alpha <= 0) return
  const n = 11, c = Math.max(2, Math.round(R * pop / n))
  ctx.save(); ctx.globalAlpha *= alpha
  // coma glow
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, R * 2.1 * pop)
  g.addColorStop(0, 'rgba(190,240,255,0.55)'); g.addColorStop(0.45, 'rgba(120,200,255,0.18)'); g.addColorStop(1, 'rgba(120,200,255,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R * 2.1 * pop, 0, TAU); ctx.fill(); ctx.restore()
  ctx.translate(Math.round(x), Math.round(y))
  if (stretch) { ctx.rotate(stretchAng); ctx.scale(1 + stretch, 1 - stretch * 0.5); ctx.rotate(-stretchAng) }
  ctx.rotate(tilt)
  ctx.scale(1 + squash, 1 - squash * 0.85)
  const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
  // head: a pixel disc, lit from the upper left
  for (let j = -n - 1; j <= n; j++) for (let i = -n - 1; i <= n; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > n + 0.9) continue
    if (d > n) { px(i, j, C_PAL.line); continue }
    const s = (i + 0.5 + j + 0.5) / n
    let col = C_PAL.body
    if (d > n - 1.3 && s > 0.35) col = C_PAL.deep
    else if (s > 0.62) col = C_PAL.shade
    else if (d > n - 1.2) col = C_PAL.rim
    else if (s < -0.75 && d < n - 2) col = C_PAL.light
    px(i, j, col)
  }
  for (const [i, j] of [[-6, -7], [-7, -6], [-5, -8], [-7, -5], [-8, -4]]) px(i, j, C_PAL.hi)
  for (const [i, j] of [[4, 5], [5, 4], [-3, 6], [6, -2], [2, 7]]) px(i, j, C_PAL.ice)
  // eyes (seen when the shades are pushed up)
  const eyeY = -1, eyes = [[-4.5, eyeY], [1.5, eyeY]]
  const lx = clamp(Math.round(look[0]), -1, 1), ly = clamp(Math.round(look[1]), -1, 1)
  for (const [ex, ey] of eyes) {
    const bm = mood === 'happy' || (mood === 'wink' && ex > 0) ? EYE_H : blink > 0.5 ? ['....', '....', '....', 'XXXX', '.XX.'] : EYE_O
    const ox = bm === EYE_O ? lx : 0, oy = bm === EYE_O ? ly : 0
    bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') px(ex + i + ox, ey + j - 2 + oy, INK); else if (ch === 'W') px(ex + i + ox, ey + j - 2 + oy, '#ffffff') }))
  }
  // cheeks
  ctx.globalAlpha *= 0.85; for (const i of [-7, -6, 5, 6]) px(i, 3, '#ff9ec8'); ctx.globalAlpha /= 0.85
  // shades: on the eyes (shades = 1) … pushed up onto the head (0)
  const sy = Math.round(lerp(-9, -3, clamp(shades))), sr = lerp(-0.12, 0, clamp(shades))
  ctx.save(); ctx.rotate(sr)
  const FR = '#ff4fa3', FRH = '#ffa3d2', LENS = '#140c26'
  for (let i = -8; i <= 7; i++) px(i, sy, i < -6 ? FRH : FR)
  for (const [x0, w] of [[-7, 6], [1, 6]]) {
    for (let j = 1; j <= 4; j++) {
      const inset = j === 4 ? 1 : 0
      for (let i = x0 + inset; i < x0 + w - inset; i++) px(i, sy + j, LENS)
      px(x0 - 1 + inset, sy + j, FR); px(x0 + w - inset, sy + j, FR)
    }
    px(x0 + 1, sy + 1, '#ffffff'); px(x0 + 2, sy + 2, '#cfd6ff'); px(x0 + 1, sy + 2, '#7f86b8')
  }
  px(-1, sy + 1, FR); px(0, sy + 1, FR)
  px(-9, sy, FR); px(8, sy, FR)
  ctx.restore()
  // glint: a 4-point star flashing on the left lens
  const gt = t - glint
  if (gt >= 0 && gt < 0.45 && shades > 0.5) {
    const k = Math.sin(Math.PI * gt / 0.45), L = Math.round(2 + 4 * k)
    ctx.fillStyle = '#ffffff'
    const gx = -5, gy = sy + 1.5
    ctx.fillRect((gx - 0.5) * c, (gy - L) * c, c, (2 * L) * c); ctx.fillRect((gx - L) * c, (gy - 0.5) * c, (2 * L) * c, c)
  }
  // the HELLO sticker
  if (tag) {
    ctx.save(); ctx.translate(-0.15 * n * c, 0.62 * n * c); ctx.rotate(-0.1)
    const w = 13.5 * c, h = 7.6 * c
    ctx.fillStyle = INK; ctx.fillRect(-w / 2 - c * 0.5, -h / 2 - c * 0.5, w + c, h + c)
    ctx.fillStyle = '#e8344e'; ctx.fillRect(-w / 2, -h / 2, w, h * 0.42)
    ctx.fillStyle = '#fbf6ec'; ctx.fillRect(-w / 2, -h / 2 + h * 0.42, w, h * 0.58)
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#ffffff'; ctx.font = `800 ${Math.round(h * 0.3)}px Inter, Arial, sans-serif`; ctx.fillText('HELLO', 0, -h / 2 + h * 0.22)
    ctx.fillStyle = INK; ctx.font = `800 ${Math.round(h * 0.4)}px Inter, Arial, sans-serif`; ctx.fillText('COMET', 0, -h / 2 + h * 0.72)
    ctx.restore()
  }
  ctx.restore()
}

// ═══════════════════════════════════════════ Pisces' popcorn ═══════════════════════════════════════════
const BUCKET = [
  '....pPp.pPp...',
  '..pPPpPpPPpp..',
  '.pPpPPpPpPPpP.',
  'pPPpPPpPPpPPpP',
  'KKKKKKKKKKKKKK',
  'KRRWWRRWWRRWWK',
  '.KRWWRRWWRRWK.',
  '.KRWWRRWWRRWK.',
  '.KRWWRRWWRRWK.',
  '..KWWRRWWRRK..',
  '..KWWRRWWRRK..',
  '..KKKKKKKKKK..',
]
const B_PAL = { p: '#fff4d6', P: '#ffd66e', K: INK, R: '#e8344e', W: '#fbf3e6' }
/** the bucket centred at (x, y) (cell px c); rot tips it; phone = a tiny phone sticking out of the popcorn */
export function drawPopcorn(ctx, x, y, c, { rot = 0, phone = false, alpha = 1, empty = 0 } = {}) {
  if (alpha <= 0 || c <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const w = BUCKET[0].length, h = BUCKET.length, ox = -w * c / 2, oy = -h * c / 2
  if (phone) {   // the phone, upside down in the popcorn
    ctx.save(); ctx.translate(ox + 9.5 * c, oy + 0.5 * c); ctx.rotate(0.35)
    ctx.fillStyle = INK; ctx.fillRect(-2.2 * c, -4.6 * c, 4.4 * c, 5.4 * c)
    ctx.fillStyle = '#3b2370'; ctx.fillRect(-1.6 * c, -4 * c, 3.2 * c, 4.4 * c)
    ctx.fillStyle = '#7be36a'; ctx.fillRect(-1.6 * c, -4 * c, 3.2 * c, 0.8 * c)
    ctx.restore()
  }
  BUCKET.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const col = B_PAL[r[i]]; if (!col) continue; if (empty > 0 && j < 4 && (i * 7 + j * 3) % 10 < empty * 10) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5) } })
  ctx.restore()
}
/** one popcorn kernel (a little cream cross with a butter dot) */
export function kernel(ctx, x, y, c, rot = 0) {
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.fillRect(-1.5 * c, -1 * c, 3 * c, 2 * c); ctx.fillRect(-1 * c, -1.5 * c, 2 * c, 3 * c)
  ctx.fillStyle = '#fff4d6'; ctx.fillRect(-1 * c, -0.5 * c, 2 * c, c); ctx.fillRect(-0.5 * c, -1 * c, c, 2 * c)
  ctx.fillStyle = '#ffd66e'; ctx.fillRect(0, 0, c / 2, c / 2)
  ctx.restore()
}

// ═══════════════════════════════════════════ the "Fin" card ═══════════════════════════════════════════
const ROSE = ['.rr.', 'rRRr', 'rRRr', '.rr.', '.gg.']
/** hangs from two ropes under a pivot at (cx, py); rot = swing (rad, about the pivot); dx/dy push it away (the shoo) */
export function drawFin(ctx, cx, t, { py = -60, rope = 360, w = 600, h = 300, rot = 0, dx = 0, dy = 0, spin = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(cx + dx, py + dy); ctx.rotate(rot)
  // ropes
  ctx.strokeStyle = '#d9b26a'; ctx.lineWidth = 6
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * w * 0.2, 0); ctx.lineTo(s * w * 0.36, rope); ctx.stroke() }
  ctx.translate(0, rope + h / 2); ctx.rotate(spin)
  // velvet panel + gold frame
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18
  ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 26); ctx.fill(); ctx.restore()
  const v = ctx.createLinearGradient(0, -h / 2, 0, h / 2); v.addColorStop(0, '#8a1838'); v.addColorStop(1, '#4a0a22')
  ctx.fillStyle = v; ctx.beginPath(); ctx.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 16); ctx.fill()
  ctx.strokeStyle = 'rgba(255,214,140,0.75)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-w / 2 + 28, -h / 2 + 28, w - 56, h - 56, 10); ctx.stroke()
  // a velvet sheen
  const sh = ctx.createRadialGradient(-w * 0.15, -h * 0.25, 10, -w * 0.15, -h * 0.25, w * 0.6); sh.addColorStop(0, 'rgba(255,120,170,0.28)'); sh.addColorStop(1, 'rgba(255,120,170,0)')
  ctx.fillStyle = sh; ctx.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
  // roses in the corners
  const c = 7
  for (const [rx, ry] of [[-w / 2 + 40, -h / 2 + 34], [w / 2 - 68, -h / 2 + 34], [-w / 2 + 40, h / 2 - 70], [w / 2 - 68, h / 2 - 70]]) {
    ROSE.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = ch === 'r' ? '#ff4f7e' : ch === 'R' ? '#c8143e' : '#3fbf6a'; ctx.fillRect(rx + i * c, ry + j * c, c, c) }))
  }
  // "Fin"
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.font = "italic 600 196px 'EB Garamond', Georgia, serif"
  ctx.fillStyle = 'rgba(20,0,10,0.55)'; ctx.fillText('Fin', 6, h * 0.2 + 8)
  const gg = ctx.createLinearGradient(0, -h * 0.35, 0, h * 0.25); gg.addColorStop(0, '#fff1c8'); gg.addColorStop(0.5, '#f2c75c'); gg.addColorStop(1, '#c98a1f')
  ctx.fillStyle = gg; ctx.fillText('Fin', 0, h * 0.2)
  ctx.font = "700 22px 'Space Mono', monospace"; ctx.fillStyle = 'rgba(255,225,170,0.85)'; ctx.letterSpacing = '6px'
  ctx.fillText('— THE END —', 4, h * 0.2 + 52)
  ctx.letterSpacing = '0px'
  ctx.restore()
}

/** falling rose petals from t0 (pure f(t)) */
export function petals(ctx, t, t0, { n = 26, life = 3.2, seed = 3, W = 1080 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life + 2) return
  const r = rng(seed * 71 + 9)
  for (let i = 0; i < n; i++) {
    const d = r() * 1.2, x0 = r() * W, sp = 260 + r() * 260, sw = 30 + r() * 50, ph = r() * TAU, sz = 10 + r() * 10, col = ['#ff4f7e', '#c8143e', '#ff8fb1'][i % 3]
    const dt = dt0 - d
    if (dt < 0) continue
    const y = -40 + sp * dt, xx = x0 + Math.sin(dt * 2.4 + ph) * sw
    if (y > 1960) continue
    ctx.save(); ctx.globalAlpha = clamp((life + 1.2 - dt0) / 0.8); ctx.translate(xx, y); ctx.rotate(ph + dt * 2); ctx.scale(1, 0.55 + 0.45 * Math.cos(dt * 4 + ph))
    ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, sz, sz * 0.62, 0, 0, TAU); ctx.fill()
    ctx.restore()
  }
}

// ═══════════════════════════════════════════ the talk card ═══════════════════════════════════════════
/** card-talk-6.png (VI The Lovers, 732×1170) with its question repainted: lines = ['What helps you', 'feel secure?'] */
export function makeTalkCard(doc, img, lines, { label = 'QUESTION' } = {}) {
  if (!img) return null
  const c = doc.createElement('canvas'); c.width = img.width; c.height = img.height
  const x = c.getContext('2d'); x.drawImage(img, 0, 0)
  const g = x.createLinearGradient(0, 822, 0, 990); g.addColorStop(0, 'rgb(17,9,45)'); g.addColorStop(1, 'rgb(15,8,40)')
  x.fillStyle = g; x.fillRect(114, 822, 504, 162)
  x.fillStyle = '#efe6d6'; x.font = "italic 500 58px 'EB Garamond', Georgia, serif"; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
  lines.forEach((s, i) => x.fillText(s, 366, 874 + i * 62))
  x.fillStyle = 'rgb(14,7,38)'; x.fillRect(340, 1036, 250, 23)
  x.font = "400 21px 'Space Mono', monospace"; x.letterSpacing = '4px'; x.textAlign = 'right'; x.fillStyle = 'rgb(166,144,105)'
  x.fillText(label, 574, 1055)
  x.letterSpacing = '0px'
  return c
}
