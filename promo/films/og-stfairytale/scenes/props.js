// stfairytale props — small pixel drawings on canvas, kept inside this film's folder (STARTALK2.md: props are shared
// helpers inside your own film). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn) / cellToWorld(F, i, j)
//        the exact transform drawStarChar uses for a frame (same maths as startalk.js), so props drawn in sprite CELLS
//        (the 36-cell grid) stay seated on a star through hops and squash.
//   tiaraCells · crownCells(ctx, tilt) · bunCells · sweatpantsCells(ctx, col) · gownCells(ctx, t) · sandalCells
//   slipperCells(ctx, side)   fuzzy pink slippers on the two lower points
//   tearsCells(ctx, t, k)     Pisces' tears: 1 sniffle · 2 streams · 3 fountains.
//   drawBook(ctx, t, o)       the open pop-up storybook lying in the sky (+ a page leaf turning over)
//   popUp(ctx, x, y, k, fn)   a paper cut-out folding up from the page (k 0…1, anchored at its base)
//   drawCastle · drawClockTower(ctx, cell, hourK) · drawHouse · drawApartment · drawCouch
//   drawGlassSlipper · drawPillow · drawWand · drawBowl · drawSpray · drawMysteryCard
//   drawCloud · confetti · drawPixels
import { clamp, lerp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
const G = 36, HALF = 18
const SC = { x: 18, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
const BM = s => s.trim().split(/\s+/)

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
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

function starPath(ctx) {
  const R0 = SC.R - SC.round * 0.4, r0 = SC.r - SC.round * 0.2
  ctx.beginPath()
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0
    const px = SC.x + Math.cos(a) * rr, py = SC.y + Math.sin(a) * rr
    k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
  }
  ctx.closePath()
}
/** paint a bitmap in cell units with an ink outline (for use inside inSprite) */
function cells(ctx, bm, x0, y0, pal, outline = true) {
  if (outline) {
    ctx.fillStyle = INK
    bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.' && pal[ch]) ctx.fillRect(x0 + i - 0.35, y0 + j - 0.35, 1.7, 1.7) }))
  }
  bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.' && pal[ch]) { ctx.fillStyle = pal[ch]; ctx.fillRect(x0 + i, y0 + j, 1.02, 1.02) } }))
}

// ── costume pieces (cells)
const TIARA = BM(`
....D....
.G..G..G.
.GG.G.GG.
GGGGGGGGG
GPGGDGGPG`)
export function tiaraCells(ctx) { cells(ctx, TIARA, 13.5, 3.2, { G: '#f2c75c', D: '#bff3ff', P: '#ff5c9a' }) }

const CROWN = BM(`
G....G....G
GG..GGG..GG
GGG.GGG.GGG
GGGGGGGGGGG
GRGGGBGGGRG
GGGGGGGGGGG`)
export function crownCells(ctx, tilt = 0, lift = 0) {
  ctx.save(); ctx.translate(18, 4.5 - lift); ctx.rotate(tilt); ctx.translate(-18, -4.5)
  cells(ctx, CROWN, 12.5, -1.4, { G: '#ffcf4a', R: '#e8344e', B: '#5ab4ff' })
  ctx.restore()
}

const BUN = BM(`
.H......H.
..H.HH.H..
...HHHH...
..HHhHHH..
.HHHHHhHH.
.HhHHHHHH.
..HHHHHH..
..PPPPPP..
...PPPP...`)
export function bunCells(ctx) { ctx.save(); ctx.translate(18, 4); ctx.scale(1.4, 1.4); ctx.translate(-18, -4); cells(ctx, BUN, 13, -5.6, { H: '#6a3a28', h: '#a8714f', P: '#ff6fa8' }); ctx.restore() }

/** grey sweatpants on the lower body (clipped to the star) */
export function sweatpantsCells(ctx, col = '#8f8aa8') {
  ctx.save(); starPath(ctx); ctx.clip()
  ctx.fillStyle = col; ctx.fillRect(0, 24.6, 36, 14)
  ctx.fillStyle = 'rgba(27,18,54,0.28)'; ctx.fillRect(17.4, 27, 1.2, 4)           // the seam
  ctx.fillStyle = '#6c6788'; ctx.fillRect(0, 24.6, 36, 1.6)                         // waistband
  ctx.fillStyle = INK; ctx.fillRect(0, 24.0, 36, 0.6)
  ctx.fillStyle = '#6c6788'; ctx.fillRect(0, 31.4, 11.6, 1.6); ctx.fillRect(24.4, 31.4, 11.6, 1.6)   // cuffs
  ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(6, 27, 1, 4); ctx.fillRect(29, 27, 1, 4)
  ctx.restore()
  ctx.fillStyle = '#ffffff'; ctx.fillRect(16.2, 26, 0.8, 3.2); ctx.fillRect(19, 26, 0.8, 2.6)         // drawstrings
}
/** the ball gown's bell skirt: drawn BEFORE the star so the body sits on top */
export function gownCells(ctx, t, col = '#ff8fb1', deep = '#d9568a') {
  const sw = Math.sin(t * 2.4) * 0.8
  const pts = []
  for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([lerp(0.5, 35.5, u) + sw * (1 - Math.abs(u - 0.5)), 41.5 + (i % 2 ? 1.2 : 0)]) }
  const path = () => { ctx.beginPath(); ctx.moveTo(10.5, 23); ctx.lineTo(25.5, 23); pts.slice().reverse().forEach(([x, y]) => ctx.lineTo(x, y)); ctx.closePath() }
  ctx.save(); ctx.lineJoin = 'round'
  path(); ctx.lineWidth = 1.4; ctx.strokeStyle = INK; ctx.stroke(); ctx.fillStyle = col; ctx.fill()
  path(); ctx.clip()
  ctx.fillStyle = deep
  for (let k = 0; k < 5; k++) { const x = 4 + k * 7 + sw; ctx.beginPath(); ctx.moveTo(18, 24); ctx.lineTo(x - 0.8, 43); ctx.lineTo(x + 0.8, 43); ctx.closePath(); ctx.fill() }
  ctx.fillStyle = '#ffd6e6'; ctx.fillRect(0, 39.6, 36, 1.2)
  ctx.restore()
  ctx.fillStyle = '#ffffff'
  for (let k = 0; k < 7; k++) { const ph = (t * 1.3 + k * 0.37) % 1; if (ph < 0.5) ctx.fillRect(5 + ((k * 13) % 26), 30 + ((k * 7) % 10), 0.8, 0.8) }
}
const FUZZY = BM(`
..WWW......
.WWWWWFF...
WWWWWWWFFF.
FPPPPPPPPPF
FPPPPPPPPPF
.FFFFFFFFF.`)
export function slipperCells(ctx) {
  const pal = { W: '#ffffff', F: '#ff8fb1', P: '#ffc2d6' }
  cells(ctx, FUZZY, 2.2, 31.6, pal); cells(ctx, FUZZY, 22.8, 31.6, pal)
}
export function sandalCells(ctx) {
  ctx.fillStyle = INK
  for (const x0 of [3.4, 24]) { ctx.fillRect(x0 - 0.4, 33.6, 9.6, 2.2); ctx.fillRect(x0 + 2.6, 30.6, 1.8, 3.4); ctx.fillRect(x0 + 5.2, 30.6, 1.8, 3.4) }
  ctx.fillStyle = '#b07a46'
  for (const x0 of [3.4, 24]) { ctx.fillRect(x0, 34, 8.8, 1.4); ctx.fillRect(x0 + 3, 31, 1, 3); ctx.fillRect(x0 + 5.6, 31, 1, 3) }
}

// ── tears (cells)
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

// ── generic bitmap painter (world px)
export function drawPixels(ctx, bm, x, y, cell, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot); if (flip) ctx.scale(-1, 1)
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

// ═══════════════════════ the storybook ═══════════════════════
export const BOOK = { yT: 1196, yB: 1436, hwT: 452, hwB: 506, cx: 540 }
const PAGE = '#eadcbc', PAGE_D = '#cdb98f', COVER = '#7a2446', COVER_D = '#4e1530'
function quad(ctx, p) { ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]); for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]); ctx.closePath() }
function pageLines(ctx, side, alpha) {
  const { yT, yB, hwT, hwB, cx } = BOOK
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = 'rgba(80,60,40,0.22)'
  for (let k = 0; k < 6; k++) {
    const v = 0.2 + k * 0.13, y = lerp(yT, yB, v), hw = lerp(hwT, hwB, v)
    const x0 = side < 0 ? cx - hw + 44 : cx + 40, len = hw - 90 - (k === 5 ? 120 : (k * 37) % 60)
    ctx.fillRect(x0, y, len, 5)
  }
  ctx.restore()
}
/** o = { k: 0…1 overall alpha/scale-in, cover: 0…1 (0 = closed: the cover lies over the right page, 1 = open),
 *        leaf: null | 0…1 (a page turning from right to left) } */
export function drawBook(ctx, t, { k = 1, cover = 1, leaf = null, title = 'ONCE UPON A STAR' } = {}) {
  if (k <= 0.01) return
  const { yT, yB, hwT, hwB, cx } = BOOK
  ctx.save(); ctx.globalAlpha *= clamp(k)
  ctx.translate(cx, yB); ctx.scale(lerp(0.9, 1, k), lerp(0.9, 1, k)); ctx.translate(-cx, -yB)
  // soft glow under the book
  const g = ctx.createRadialGradient(cx, yB - 60, 40, cx, yB - 60, 620); g.addColorStop(0, 'rgba(255,214,150,0.16)'); g.addColorStop(1, 'rgba(255,214,150,0)')
  ctx.fillStyle = g; ctx.fillRect(0, yT - 400, 1080, 900)
  // the cover board + page stack (thickness)
  quad(ctx, [[cx - hwT - 16, yT - 8], [cx + hwT + 16, yT - 8], [cx + hwB + 20, yB + 34], [cx - hwB - 20, yB + 34]])
  ctx.fillStyle = INK; ctx.fill()
  quad(ctx, [[cx - hwT - 10, yT - 2], [cx + hwT + 10, yT - 2], [cx + hwB + 14, yB + 28], [cx - hwB - 14, yB + 28]])
  ctx.fillStyle = COVER; ctx.fill()
  ctx.fillStyle = COVER_D; ctx.fillRect(cx - hwB - 14, yB + 18, 2 * hwB + 28, 10)
  for (let s = 0; s < 3; s++) { ctx.fillStyle = s % 2 ? PAGE_D : PAGE; ctx.fillRect(cx - hwB + 4, yB + 2 + s * 5, 2 * hwB - 8, 5) }
  // the two pages
  for (const side of [-1, 1]) {
    quad(ctx, [[cx, yT], [cx + side * hwT, yT], [cx + side * hwB, yB], [cx, yB]])
    ctx.fillStyle = PAGE; ctx.fill()
    const gg = ctx.createLinearGradient(cx, 0, cx + side * 140, 0); gg.addColorStop(0, 'rgba(120,90,50,0.35)'); gg.addColorStop(1, 'rgba(120,90,50,0)')
    ctx.fillStyle = gg; ctx.fill()
    pageLines(ctx, side, 1)
  }
  // gold page border + gutter
  ctx.strokeStyle = 'rgba(190,140,60,0.6)'; ctx.lineWidth = 4
  for (const side of [-1, 1]) { quad(ctx, [[cx + side * 14, yT + 14], [cx + side * (hwT - 18), yT + 14], [cx + side * (hwB - 22), yB - 14], [cx + side * 14, yB - 14]]); ctx.stroke() }
  ctx.fillStyle = 'rgba(70,40,20,0.45)'; ctx.fillRect(cx - 3, yT, 6, yB - yT)
  // the closed cover lying over the right page, swinging open (and then gone)
  if (cover < 1) leafQuad(ctx, cover, COVER, title)
  if (leaf !== null && leaf > 0 && leaf < 1) leafQuad(ctx, leaf, PAGE, null)
  ctx.restore()
}
function leafQuad(ctx, p, col, title) {
  const { yT, yB, hwT, hwB, cx } = BOOK
  const th = Math.PI * p, c = Math.cos(th), s = Math.sin(th)
  const L = 300
  const pts = [[cx, yT], [cx + hwT * c, yT - s * L * 0.9], [cx + hwB * c, yB - s * L], [cx, yB]]
  quad(ctx, pts); ctx.fillStyle = INK; ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke()
  ctx.fillStyle = col; ctx.fill()
  ctx.fillStyle = `rgba(40,20,30,${0.35 * (1 - Math.abs(c))})`; ctx.fill()
  if (title && c > 0.3) {
    ctx.save(); ctx.globalAlpha *= clamp((c - 0.3) / 0.4)
    const mx = cx + (hwT + hwB) / 4 * c, my = (yT + yB) / 2 - s * L * 0.95
    ctx.translate(mx, my); ctx.scale(c, 0.8)
    ctx.font = "700 34px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#f2c75c'; ctx.fillText(title.split(' ').slice(0, 2).join(' '), 0, -26); ctx.fillText(title.split(' ').slice(2).join(' '), 0, 22)
    ctx.restore()
  }
}

/** a paper cut-out folding up off the page: fn draws it with its base at (0, 0) */
export function popUp(ctx, x, y, k, fn) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y)
  // the fold shadow on the page
  ctx.fillStyle = `rgba(60,40,20,${0.25 * clamp(k)})`; ctx.fillRect(-160, -4, 320, 10)
  ctx.scale(1, Math.max(0.02, k)); ctx.transform(1, 0, -0.18 * (1 - clamp(k)), 1, 0, 0)
  fn(); ctx.restore()
}

// ── pixel shapes in cell units (c = cell px), base at y = 0, centred on x = 0
function box(ctx, c, x0, y0, w, h, col, line = true) {
  if (line) { ctx.fillStyle = INK; ctx.fillRect((x0 - 0.5) * c, (y0 - 0.5) * c, (w + 1) * c, (h + 1) * c) }
  ctx.fillStyle = col; ctx.fillRect(x0 * c, y0 * c, w * c, h * c)
}
function stepRoof(ctx, c, xc, yb, hw, h, col) {
  ctx.fillStyle = INK
  for (let r = 0; r < h; r++) { const w = Math.max(0.5, hw * (1 - r / h)); ctx.fillRect((xc - w - 0.5) * c, (yb - r - 1.5) * c, (2 * w + 1) * c, 1.5 * c) }
  for (let r = 0; r < h; r++) { const w = Math.max(0.5, hw * (1 - r / h)); ctx.fillStyle = r % 3 === 1 ? '#5f42a0' : col; ctx.fillRect((xc - w) * c, (yb - r - 1) * c, 2 * w * c, c) }
}
function flag(ctx, c, x, y, t, col = '#ff8fb1') {
  ctx.fillStyle = INK; ctx.fillRect((x - 0.2) * c, (y - 4) * c, 0.6 * c, 4 * c)
  const w = Math.sin(t * 5 + x) * 0.5
  ctx.fillStyle = INK; ctx.fillRect((x + 0.2) * c, (y - 4.2) * c, 3.6 * c, 2.2 * c)
  ctx.fillStyle = col; ctx.fillRect((x + 0.4) * c, (y - 4 + w * 0.2) * c, 3.2 * c, 1.8 * c)
}
const WALL = '#d9cdf0', WALL_S = '#b3a6d8', ROOF = '#7a5ab8', LIT = '#ffd166'
export function drawCastle(ctx, c, t) {
  // side towers
  for (const sx of [-1, 1]) {
    box(ctx, c, sx < 0 ? -18 : 12, -19, 6, 19, WALL)
    ctx.fillStyle = WALL_S; ctx.fillRect((sx < 0 ? -13 : 17) * c, -19 * c, c, 19 * c)
    stepRoof(ctx, c, sx * 15, -19, 4, 7, ROOF)
    flag(ctx, c, sx * 15, -26, t)
    box(ctx, c, sx * 15 - 0.6, -15, 1.2, 2.4, LIT, false)
  }
  // main wall + crenellations
  box(ctx, c, -12, -12, 24, 12, WALL)
  for (let i = -12; i < 12; i += 2) box(ctx, c, i, -13.4, 1, 1.4, WALL)
  ctx.fillStyle = WALL_S; ctx.fillRect(-12 * c, -1.4 * c, 24 * c, 1.4 * c)
  // centre keep
  box(ctx, c, -5, -21, 10, 9, WALL)
  stepRoof(ctx, c, 0, -21, 6.5, 8, ROOF)
  flag(ctx, c, 0, -29, t, '#f2c75c')
  // windows (lit, flickering a touch) + the door
  for (const [wx, wy] of [[-9, -9], [-5.5, -9], [4.5, -9], [8, -9], [-1.5, -18], [0.5, -18]]) {
    box(ctx, c, wx, wy, 1, 2.2, (Math.sin(t * 3 + wx) > -0.7) ? LIT : '#f2a640', false)
  }
  box(ctx, c, -2.5, -5.5, 5, 5.5, '#5a3f8a')
  ctx.fillStyle = '#ffd166'; ctx.fillRect(1.2 * c, -3 * c, 0.6 * c, 0.6 * c)
}
/** hourK: 0 = 11:59, 1 = 12:00 (the minute hand clicks up) */
export function drawClockTower(ctx, c, t, hourK = 0, shake = 0) {
  ctx.save(); ctx.translate(Math.sin(t * 60) * shake * c * 0.3, 0)
  box(ctx, c, -6, -30, 12, 30, WALL)
  ctx.fillStyle = WALL_S; ctx.fillRect(4.8 * c, -30 * c, 1.2 * c, 30 * c)
  for (let y = -27; y < -1; y += 4) ctx.fillRect(-6 * c, y * c, 10.8 * c, 0.4 * c)
  stepRoof(ctx, c, 0, -30, 8, 9, ROOF)
  flag(ctx, c, 0, -39, t, '#f2c75c')
  box(ctx, c, -2, -6, 4, 6, '#5a3f8a')
  // the clock face
  const cy = -22 * c, R = 4.6 * c
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, cy, R + 0.6 * c, 0, TAU); ctx.fill()
  ctx.fillStyle = '#fff6dc'; ctx.beginPath(); ctx.arc(0, cy, R, 0, TAU); ctx.fill()
  ctx.fillStyle = INK
  for (let h = 0; h < 12; h++) { const a = h / 12 * TAU; ctx.fillRect(Math.sin(a) * R * 0.8 - c * 0.3, cy - Math.cos(a) * R * 0.8 - c * 0.3, c * 0.6, c * 0.6) }
  const hand = (a, len, w) => { ctx.save(); ctx.translate(0, cy); ctx.rotate(a); ctx.fillRect(-w / 2, -len, w, len); ctx.restore() }
  hand(-0.06 * (1 - hourK), R * 0.55, c * 0.8)
  hand(lerp(-TAU / 60, 0, hourK), R * 0.85, c * 0.5)
  ctx.fillStyle = '#e8344e'; ctx.fillRect(-c * 0.5, cy - c * 0.5, c, c)
  ctx.restore()
}
export function drawHouse(ctx, c, t, wall = '#f3c9a8', roof = '#b8506a', lit = true) {
  box(ctx, c, -5, -9, 10, 9, wall)
  ctx.fillStyle = 'rgba(27,18,54,0.15)'; ctx.fillRect(3.6 * c, -9 * c, 1.4 * c, 9 * c)
  stepRoof(ctx, c, 0, -9, 6.5, 6, roof)
  box(ctx, c, -1.4, -4.6, 2.8, 4.6, '#6a4a8a')
  box(ctx, c, -4, -7.4, 2, 2, lit ? (Math.sin(t * 2.3 + c) > -0.8 ? LIT : '#f2a640') : '#3a2c66')
  box(ctx, c, 2, -7.4, 2, 2, LIT)
}
/** the cosy flat: a back wall with a window (the moon), a framed picture, a lamp; base at y = 0 */
export function drawApartment(ctx, c, t, { tiaraOnLamp = true } = {}) {
  box(ctx, c, -30, -32, 60, 32, '#3d2f6e')
  // wallpaper stripes
  ctx.fillStyle = 'rgba(255,255,255,0.05)'
  for (let x = -29; x < 30; x += 4) ctx.fillRect(x * c, -32 * c, 1.4 * c, 32 * c)
  ctx.fillStyle = '#2a1f52'; ctx.fillRect(-30 * c, -3 * c, 60 * c, 3 * c)     // skirting
  // window with the moon + curtains
  box(ctx, c, 6, -28, 14, 11, '#152048')
  ctx.fillStyle = '#fff3c4'; ctx.beginPath(); ctx.arc(15.5 * c, -24 * c, 2.4 * c, 0, TAU); ctx.fill()
  ctx.fillStyle = '#152048'; ctx.beginPath(); ctx.arc(16.6 * c, -24.6 * c, 2.1 * c, 0, TAU); ctx.fill()
  for (let i = 0; i < 4; i++) { ctx.fillStyle = '#fff'; ctx.fillRect((8 + i * 3.3) * c, (-26 + (i % 2) * 4) * c, 0.5 * c, 0.5 * c) }
  ctx.fillStyle = INK; ctx.fillRect(12.8 * c, -28 * c, 0.5 * c, 11 * c); ctx.fillRect(6 * c, -22.8 * c, 14 * c, 0.5 * c)
  box(ctx, c, 4.5, -29, 2.6, 13, '#c95a8a'); box(ctx, c, 19, -29, 2.6, 13, '#c95a8a')
  // a framed picture: a little crown (the old life)
  box(ctx, c, -4, -27, 7, 6, '#f2c75c'); box(ctx, c, -3.2, -26.2, 5.4, 4.4, '#2a1f52', false)
  ctx.fillStyle = '#ffcf4a'; ctx.fillRect(-2.4 * c, -23.6 * c, 3.8 * c, 1.2 * c); for (const x of [-2.4, -1, 0.4]) ctx.fillRect(x * c, -24.8 * c, 0.8 * c, 1.4 * c)
  // the lamp (wearing the tiara)
  box(ctx, c, -27.5, -14, 0.8, 11, '#c8c2e0')
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-31 * c, -13.5 * c); ctx.lineTo(-24 * c, -13.5 * c); ctx.lineTo(-25.5 * c, -18.5 * c); ctx.lineTo(-29.5 * c, -18.5 * c); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#ffd98a'; ctx.beginPath(); ctx.moveTo(-30.3 * c, -14 * c); ctx.lineTo(-24.7 * c, -14 * c); ctx.lineTo(-26 * c, -18 * c); ctx.lineTo(-29 * c, -18 * c); ctx.closePath(); ctx.fill()
  const lg = ctx.createRadialGradient(-27.5 * c, -12 * c, c, -27.5 * c, -12 * c, 14 * c); lg.addColorStop(0, 'rgba(255,217,138,0.35)'); lg.addColorStop(1, 'rgba(255,217,138,0)')
  ctx.fillStyle = lg; ctx.fillRect(-42 * c, -26 * c, 30 * c, 26 * c)
  if (tiaraOnLamp) {
    ctx.save(); ctx.translate(-27.5 * c, -18.4 * c); ctx.rotate(-0.25); ctx.scale(c * 0.55, c * 0.55); ctx.translate(-18, -8.2)
    cells(ctx, TIARA, 13.5, 3.2, { G: '#f2c75c', D: '#bff3ff', P: '#ff5c9a' }); ctx.restore()
  }
}
export function drawCouch(ctx, c, w = 26) {
  const hw = w / 2
  box(ctx, c, -hw, -10, w, 6, '#c75b7a')                          // back
  ctx.fillStyle = '#e07a96'; ctx.fillRect(-hw * c, -10 * c, w * c, 1.2 * c)
  box(ctx, c, -hw, -4.5, w, 3.5, '#b04a69')                       // seat
  box(ctx, c, -hw - 2.5, -7, 3, 6, '#c75b7a'); box(ctx, c, hw - 0.5, -7, 3, 6, '#c75b7a')   // arms
  box(ctx, c, -hw, -1, 1.4, 1.4, INK, false); box(ctx, c, hw - 1.4, -1, 1.4, 1.4, INK, false)
}
export function drawTV(ctx, c, t) {
  box(ctx, c, -4, -12, 8, 6, '#2b2440')
  const fl = 0.75 + 0.25 * Math.sin(t * 13) * Math.sin(t * 7.3)
  ctx.fillStyle = `rgba(127,224,255,${fl})`; ctx.fillRect(-3.2 * c, -11.2 * c, 6.4 * c, 4.4 * c)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(-3.2 * c, (-11.2 + ((t * 3) % 4.4)) * c, 6.4 * c, 0.4 * c)
  box(ctx, c, -0.5, -6, 1, 3, '#2b2440'); box(ctx, c, -3, -3, 6, 3, '#6a4a8a')
  const g = ctx.createRadialGradient(0, -9 * c, c, 0, -9 * c, 16 * c); g.addColorStop(0, `rgba(127,224,255,${0.22 * fl})`); g.addColorStop(1, 'rgba(127,224,255,0)')
  ctx.fillStyle = g; ctx.fillRect(-18 * c, -26 * c, 36 * c, 26 * c)
}
export function drawDoor(ctx, c, open = 0) {
  box(ctx, c, -5, -22, 10, 22, '#2a1f52')
  ctx.save(); ctx.fillStyle = '#ffe2a0'; ctx.globalAlpha *= 0.25 + 0.5 * open; ctx.fillRect(-4.5 * c, -21.5 * c, 9 * c, 21.5 * c); ctx.restore()
  const w = 9 * (1 - 0.8 * open)
  box(ctx, c, -4.5, -21.5, w, 21.5, '#8a5a3a', false)
  ctx.fillStyle = '#6a4228'; ctx.fillRect((-4.5 + 1) * c, -19.5 * c, (w - 2) * c, 7 * c); ctx.fillRect((-4.5 + 1) * c, -10.5 * c, (w - 2) * c, 8 * c)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect((-4.5 + w - 1.8) * c, -11 * c, c, c)
}

// ── hand props (world px)
const SLIPPER = BM(`
C...........
CC..........
CWC.....CC..
CWWCCCCCWWC.
CWWWWWWWWWWC
CCCCCCCCCCCC
C...........
C...........`)
export function drawGlassSlipper(ctx, x, y, cell, t, { rot = 0, glint = true, alpha = 1 } = {}) {
  drawPixels(ctx, SLIPPER, x, y, cell, { C: '#9fe8ff', W: '#e8fbff' }, { outline: INK, rot, alpha, ay: 0.8 })
  if (glint) {
    const ph = (t * 0.8) % 1
    if (ph < 0.35) {
      const s = Math.sin(Math.PI * ph / 0.35)
      ctx.save(); ctx.globalAlpha *= alpha * s; ctx.fillStyle = '#ffffff'
      const gx = x + cell * 3, gy = y - cell * 5
      ctx.fillRect(gx - cell * 0.4, gy - cell * 2 * s, cell * 0.8, cell * 4 * s); ctx.fillRect(gx - cell * 2 * s, gy - cell * 0.4, cell * 4 * s, cell * 0.8)
      ctx.restore()
    }
  }
}
const PILLOW = BM(`
T..............T
.RRRRRRRRRRRRRR.
RrrRRRRRRRRRRRRR
RRRRRRRRRRRRRRRR
.RRRRRRRRRRRRRR.
T..............T`)
export function drawPillow(ctx, x, y, cell, rot = 0) { drawPixels(ctx, PILLOW, x, y, cell, { R: '#b0304f', r: '#e0607f', T: '#f2c75c' }, { outline: INK, rot }) }
export function drawWand(ctx, x, y, len, rot, t, drawStar) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.fillRect(-5, -len, 10, len); ctx.fillStyle = '#efe6d6'; ctx.fillRect(-2.5, -len, 5, len)
  drawStar(ctx, 0, -len, 34 + 4 * Math.sin(t * 6), 1, '#f2c75c')
  ctx.restore()
}
const BOWL = BM(`
..K.....K...
...K...K....
..YYYYYYYY..
BBBBBBBBBBBB
.BWBBBBBBBB.
..BBBBBBBB..`)
const POPCORN = BM(`
..WW.W.WW...
.WWWWWWWWWW.
WWYWWWWYWWWW
RWRWRWRWRWRW
.RWRWRWRWRW.
..RWRWRWRW..`)
export function drawBowl(ctx, x, y, cell, kind = 'noodles', rot = 0) {
  if (kind === 'noodles') drawPixels(ctx, BOWL, x, y, cell, { K: '#c9a46a', Y: '#ffe08a', B: '#ff8a6a', W: '#ffd0c0' }, { outline: INK, rot })
  else drawPixels(ctx, POPCORN, x, y, cell, { W: '#fff6e0', Y: '#ffd166', R: '#e8344e' }, { outline: INK, rot })
}
const SPRAY = BM(`
.KKKK.
.KKKKN
..WW..
.BBBB.
.BLLB.
.BLLB.
.BBBB.`)
export function drawSpray(ctx, x, y, cell, t, t0) {
  drawPixels(ctx, SPRAY, x, y, cell, { K: '#efe6d6', N: '#efe6d6', W: '#c8c2e0', B: '#7fe0ff', L: '#c9f3ff' }, { outline: INK })
  const k = t - t0
  if (k > 0 && k < 1.2) {
    for (let i = 0; i < 6; i++) {
      const ph = (k * 1.6 + i / 6) % 1
      ctx.save(); ctx.globalAlpha *= (1 - ph) * 0.9; ctx.fillStyle = '#c9f3ff'
      ctx.fillRect(x + cell * 3 + ph * 120, y - cell * 2.6 + Math.sin(i * 2.3) * ph * 40, 10, 10); ctx.restore()
    }
  }
}
/** the veiled mystery card: words up front, face hidden */
export function drawMysteryCard(ctx, x, y, w, h, t, { glyph = '♎', lines = [], badge = '#ff8fb1', k = 1, rot = 0 } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  const rr = (X, Y, W2, H2, r) => { ctx.beginPath(); ctx.roundRect(X, Y, W2, H2, r) }
  rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 30); ctx.fillStyle = INK; ctx.fill()
  rr(-w / 2, -h / 2, w, h, 24); const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2c1f5e'); g.addColorStop(1, '#170f36'); ctx.fillStyle = g; ctx.fill()
  ctx.strokeStyle = '#f2c75c'; ctx.lineWidth = 4; rr(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 16); ctx.stroke()
  // the veiled face
  const fy = -h / 2 + h * 0.3, fr = w * 0.22
  ctx.save(); ctx.beginPath(); ctx.arc(0, fy, fr, 0, TAU); ctx.clip()
  ctx.fillStyle = '#3c2f74'; ctx.fillRect(-fr, fy - fr, 2 * fr, 2 * fr)
  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { const n = Math.sin(i * 7.1 + j * 3.3 + Math.floor(t * 4) * 1.7); if (n > 0.2) { ctx.fillStyle = `rgba(201,166,255,${0.18 + 0.2 * n})`; ctx.fillRect(-fr + i * fr * 2 / 9, fy - fr + j * fr * 2 / 9, fr * 2 / 9 + 1, fr * 2 / 9 + 1) } }
  ctx.restore()
  ctx.strokeStyle = 'rgba(242,199,92,0.7)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, fy, fr, 0, TAU); ctx.stroke()
  ctx.font = "800 64px Inter, sans-serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(239,230,214,0.85)'; ctx.fillText('?', 0, fy + 4)
  // sign badge
  const bx = fr * 0.95, by = fy + fr * 0.75, glow = 0.6 + 0.4 * Math.sin(t * 4)
  ctx.fillStyle = `rgba(255,143,177,${0.35 * glow})`; ctx.beginPath(); ctx.arc(bx, by, 40, 0, TAU); ctx.fill()
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(bx, by, 29, 0, TAU); ctx.fill()
  ctx.fillStyle = badge; ctx.beginPath(); ctx.arc(bx, by, 25, 0, TAU); ctx.fill()
  ctx.font = "600 34px 'EB Garamond', 'Noto Sans Symbols', serif"; ctx.fillStyle = INK; ctx.fillText(glyph, bx, by + 2)
  // words
  ctx.font = "700 27px 'Space Mono', monospace"
  lines.forEach((s, i) => { ctx.fillStyle = i === 0 ? '#f2c75c' : '#efe6d6'; ctx.fillText(s, 0, -h / 2 + h * 0.62 + i * 46) })
  ctx.restore()
}

// ── Pisces' cloud seat
const CLOUD = BM(`
.....WWWW.........
...WWWWWWWW.WWW...
..WWWWWWWWWWWWWWW.
.WWWWWWWWWWWWWWWWW
WWWWWWWWWWWWWWWWWW
SSWWWWWWWWWWWWWWSS
.SSSSSSSSSSSSSSSS.`)
export function drawCloud(ctx, x, y, cell, alpha = 1) {
  drawPixels(ctx, CLOUD, x, y, cell, { W: '#d9d2f2', S: '#a89cd6' }, { outline: INK, alpha })
}
export const HEART = ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']

// ── confetti
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 4 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3)
  const k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF_COLS[Math.floor(r() * CONF_COLS.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k
    const x = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt)
    const y = y0 + vty * dt + (vy0 - vty) * e
    if (y > 2000) continue
    const a = clamp((life - dt0) / 0.6)
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7)
    ctx.restore()
  }
}
