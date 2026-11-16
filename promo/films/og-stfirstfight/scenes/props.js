// stfirstfight props — the pixel prop kit for "The First Fight." (a tennis match), kept inside this film's folder
// (STARTALK2.md: props are shared helpers inside your own film folder). Pure functions of their arguments (and t);
// nothing touches `document` at module top level (the sound build imports scenes/index.js in node).
//
//   starFrame / inSprite / cellToWorld   the exact transform drawStarChar uses (mirrors startalk.js), so accessories drawn in
//                                        sprite CELLS (the 36-cell grid) stay seated through hops and squash
//   bodyRows()                           the sprite body's [i0, i1] extent per row (the same rounded-star mask as startalk.js)
//   headbandCells(ctx, t, flap)          Aries' sweatband across the forehead, knot + two tails (cells)
//   tearsCells(ctx, t, k)                tears, k: 0 none · 1 sniffle · 2 streams · 3 fountains (cells)
//   bmp(ctx, rows, x, y, px, pal, o)     a char bitmap ('.' = clear), anchored (ax, ay), rotated, flipped, ink-outlined
//   drawCrown / drawRacket / drawBall / drawCookie / drawFork / drawBowl / drawClock / drawMic / drawScales
//   makeArena(doc, geo)                  the static backdrop (stands, wall, floating court slab, lines, net, umpire chair),
//                                        baked once at a quarter resolution (4 px pixels) and drawn with smoothing off
//   drawScoreboard(ctx, t, box, st)      the LED board: names on top, the score line under (or DEUCE / AD / LOVE – LOVE)
//   drawMachine(ctx, t, x, y, px, st)    the ball machine labelled THE PROBLEM (fires left; dents, smoke, a sprung spring)
//   statPanel(ctx, t, box, st)           a VS-screen stat card (header + rows of filling pixel blocks)
//   confetti / sparkBurst / drawHearts / dizzyStars / steamPuffs / sweatDrop / crumbs
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const G = 36, HALF = 18
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
const SC = { x: HALF, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
export function hopState(t, hops) {
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
/** sprite cell → world point (ignores squash; for things that sit beside or leave the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// the body mask, per row (same polygon + rounding as startalk.js)
function starPoly() {
  const V = [], R0 = SC.R - SC.round, r0 = SC.r - SC.round * 0.55
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0; V.push([SC.x + Math.cos(a) * rr, SC.y + Math.sin(a) * rr]) }
  return V
}
function sdPoly(px, py, V) {
  let d = (px - V[0][0]) ** 2 + (py - V[0][1]) ** 2, s = 1
  for (let i = 0, j = V.length - 1; i < V.length; j = i, i++) {
    const ex = V[j][0] - V[i][0], ey = V[j][1] - V[i][1], wx = px - V[i][0], wy = py - V[i][1]
    const h = clamp((wx * ex + wy * ey) / (ex * ex + ey * ey), 0, 1), bx = wx - ex * h, by = wy - ey * h
    d = Math.min(d, bx * bx + by * by)
    const c1 = py >= V[i][1], c2 = py < V[j][1], c3 = ex * wy > ey * wx
    if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s
  }
  return s * Math.sqrt(d)
}
let ROWS = null
export function bodyRows() {
  if (ROWS) return ROWS
  const V = starPoly()
  ROWS = []
  for (let j = 0; j < G; j++) { let i0 = -1, i1 = -1; for (let i = 0; i < G; i++) if (sdPoly(i + 0.5, j + 0.5, V) - SC.round <= 0) { if (i0 < 0) i0 = i; i1 = i } ROWS.push([i0, i1]) }
  return ROWS
}

// ───────────────────────────────────────── cell painting (1-cell ink outline)
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

/** Aries' sweatband: three rows across the forehead (just above the eyes), a knot on the right and two flapping tails */
export function headbandCells(ctx, t, flap = 1) {
  const R = bodyRows(), cells = [], W = '#fff8ee', S = '#ff3b4e', SH = '#e6dccf'
  ;[[11, W], [12, S], [13, W]].forEach(([j, c]) => { const [i0, i1] = R[j]; for (let i = i0; i <= i1; i++) cells.push([i, j, j === 13 ? SH : c]) })
  const e = R[12][1] + 1, f = Math.sin(t * 15) * flap, a = Math.round(0.9 * f), b = Math.round(1.8 * f)
  cells.push([e, 11, W], [e, 12, S], [e, 13, W])
  cells.push([e + 1, 11 + a, W], [e + 2, 10 + b, W], [e + 3, 10 + b, S])
  cells.push([e + 1, 13 - a, W], [e + 2, 14 - a, W], [e + 3, 14 + b, S])
  paintCells(ctx, cells)
}

/** tears from both eyes (cells). Eyes sit at (13.4, 19.2) and (22.6, 19.2); drops leave the outer corners. */
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

// ───────────────────────────────────────── bitmaps
export const BM = s => s.trim().split(/\s+/)
/** char bitmap painter: (x, y) is the anchor point at (ax, ay) of the bitmap; rot about it; flip mirrors horizontally */
export function bmp(ctx, rows, x, y, px, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, flip = false } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot); if (flip) ctx.scale(-1, 1)
  const ox = -w * px * ax, oy = -h * px * ay, c = px + 0.5
  if (outline) {
    ctx.fillStyle = outline
    rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) {
      if (row[i] === '.' || !pal[row[i]]) continue
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const r2 = rows[j + b], ch2 = r2 ? r2[i + a] : undefined; if (!ch2 || ch2 === '.' || !pal[ch2]) ctx.fillRect(ox + (i + a) * px, oy + (j + b) * px, c, c) }
    } })
  }
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const col = pal[row[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * px, oy + j * px, c, c) } })
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
/** Leo's crown; (x, y) = bottom centre */
export function drawCrown(ctx, x, y, cell, rot = 0, alpha = 1) { bmp(ctx, CROWN, x, y, cell, CROWN_PAL, { rot, ax: 0.5, ay: 1, outline: '#3a1c08', alpha }) }

// the racket (13 × 31 cells): an oval head with a string grid, the throat, a taped grip
let RACKET = null
function racketRows() {
  if (RACKET) return RACKET
  const rows = []
  for (let j = 0; j < 31; j++) {
    let r = ''
    for (let i = 0; i < 13; i++) {
      let c = '.'
      if (j <= 17) {
        const dx = (i + 0.5 - 6.5) / 6.45, dy = (j + 0.5 - 9) / 8.95, d = dx * dx + dy * dy
        if (d <= 1) c = d > 0.6 ? (i < 6 && j < 9 ? 'f' : 'F') : (i % 2 === 1 || j % 2 === 0) ? 's' : '.'
      } else if (j <= 21) {
        const k = j - 18, l = 3 + k, rr = 9 - k
        if (i === l || i === rr) c = 'F'
      } else if (i >= 5 && i <= 7) c = j === 30 ? 'K' : (j % 3 === 0 ? 'g' : 'G')
      r += c
    }
    rows.push(r)
  }
  RACKET = rows; return rows
}
export const RACKET_LEN = 31
/** a racket, the grip end at (x, y), pointing up when ang = 0 (radians, clockwise); px = cell size */
export function drawRacket(ctx, x, y, px, ang, pal, { alpha = 1, blur = 0 } = {}) {
  const P = { s: '#f4efe6', G: '#2b2140', g: '#5a4a86', K: '#120b24', ...pal }
  if (blur > 0) for (let k = 1; k <= 3; k++) bmp(ctx, racketRows(), x, y, px, P, { rot: ang - blur * k * 0.22, ax: 0.5, ay: 1, alpha: alpha * 0.18 })
  bmp(ctx, racketRows(), x, y, px, P, { rot: ang, ax: 0.5, ay: 1, outline: INK, alpha })
}

const BALL = BM(`
..XXX..
.XYYWX.
XYYWYYX
XYWYYLX
XWYYYLX
.XYYLX.
..XXX..`)
const BALL_PAL = { X: '#c8e02e', Y: '#e4f75a', W: '#fffbe6', L: '#a9c42a' }
/** a tennis ball (pixel), centre (x, y), px = cell size; spin = cells of seam rotation */
export function drawBall(ctx, x, y, px, { alpha = 1, rot = 0 } = {}) { bmp(ctx, BALL, Math.round(x), Math.round(y), px, BALL_PAL, { outline: '#22300c', alpha, rot }) }

// the cookie (13 × 13): bites taken out of the top-right, or snapped in half (-1 left · +1 right)
const CHIPS = [[4, 3], [8, 4], [3, 7], [6, 6], [9, 8], [5, 10], [8, 11], [2, 5], [10, 5]]
export function drawCookie(ctx, x, y, px, { bites = 0, half = 0, rot = 0, alpha = 1 } = {}) {
  const N = 13, c0 = 6.5, R = 6.3, rows = []
  const B = Array.from({ length: Math.floor(bites) }, (_, k) => { const a = -0.6 - k * 0.62; return [c0 + Math.cos(a) * 6.4, c0 + Math.sin(a) * 6.4, 2.6] })
  for (let j = 0; j < N; j++) {
    let r = ''
    for (let i = 0; i < N; i++) {
      const dx = i + 0.5 - c0, dy = j + 0.5 - c0, d = Math.hypot(dx, dy)
      let ch = d <= R ? (d > R - 1.1 ? 'E' : 'c') : '.'
      if (ch !== '.' && B.some(([bx, by, br]) => Math.hypot(i + 0.5 - bx, j + 0.5 - by) < br)) ch = '.'
      if (ch !== '.' && half) { const cut = 6 + ((j % 3) - 1); if ((half < 0 && i > cut) || (half > 0 && i <= cut)) ch = '.' }
      if (ch === 'c' && CHIPS.some(([a, b]) => a === i && b === j)) ch = 'K'
      if (ch === 'c' && dx + dy < -5) ch = 'L'
      r += ch
    }
    rows.push(r)
  }
  bmp(ctx, rows, x, y, px, { E: '#a8652c', c: '#dda45e', L: '#f2c98a', K: '#3d2013' }, { outline: '#3a1c08', rot, alpha })
}

const FORK = BM(`
S.S.S.S
S.S.S.S
H.S.S.S
H.S.S.S
SSSSSSS
.SSSSS.
..SSS..
...S...
...S...
...H...
..SSS..
..HSS..
..HSS..
..HSS..
..SSS..
...S...`)
/** a big silver fork, centre (x, y) */
export function drawFork(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, FORK, x, y, px, { S: '#c9d3e6', H: '#ffffff' }, { outline: INK, rot, alpha }) }

/** a washing-up bowl full of suds with the fork soaking in it; (x, y) = bottom centre */
export function drawBowl(ctx, t, x, y, px, { alpha = 1, fork = true } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const w = 22, h = 9
  if (fork) drawFork(ctx, x + 4 * px, y - 12 * px, px * 0.9, 0.42)
  // basin (stepped trapezoid)
  for (let j = 0; j < h; j++) {
    const inset = Math.floor(j * 0.45), x0 = x + (-w / 2 + inset) * px, ww = (w - 2 * inset) * px, yy = y - (h - j) * px
    ctx.fillStyle = INK; ctx.fillRect(x0 - px, yy, ww + 2 * px, px + 0.5)
    ctx.fillStyle = j < 2 ? '#bfe9ff' : j < 5 ? '#6cc3ea' : '#4aa2cf'; ctx.fillRect(x0, yy, ww, px + 0.5)
  }
  ctx.fillStyle = INK; ctx.fillRect(x + (-w / 2 + 4) * px, y, (w - 8) * px, px)
  // suds on top
  const r = rng(5)
  for (let k = 0; k < 9; k++) {
    const bx = x + (-9 + k * 2.2 + r() * 0.8) * px, by = y - (h + 0.6 + r() * 1.4) * px, br = (1.4 + r() * 1.1) * px
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(bx, by, br + px * 0.5, 0, TAU); ctx.fill()
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill()
    ctx.fillStyle = '#d6eefc'; ctx.fillRect(bx - br * 0.2, by + br * 0.2, br * 0.7, br * 0.5)
  }
  // bubbles drifting up
  for (let k = 0; k < 6; k++) {
    const ph = (t * 0.55 + k / 6) % 1, bx = x + (-7 + k * 2.8 + Math.sin(ph * 6 + k) * 1.2) * px, by = y - (h + 2 + ph * 14) * px
    ctx.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.9
    ctx.strokeStyle = '#e8f7ff'; ctx.lineWidth = Math.max(2, px * 0.35); ctx.beginPath(); ctx.arc(bx, by, px * (0.7 + 0.5 * (k % 2)), 0, TAU); ctx.stroke()
  }
  ctx.restore()
}

/** a digital alarm clock with two bells, ringing (shake); (x, y) = centre; text on the LCD */
export function drawClock(ctx, t, x, y, px, { text = '7:40', ring = 1, alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  const sh = ring > 0 ? Math.sin(t * 60) * px * 0.35 * ring : 0
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x + sh, y); ctx.rotate(rot + (ring > 0 ? Math.sin(t * 47) * 0.05 * ring : 0))
  const w = 22 * px, h = 13 * px
  // bells + hammer
  for (const s of [-1, 1]) {
    const bx = s * 7 * px, by = -h / 2 - 2.2 * px
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(bx, by, 3.6 * px, Math.PI, TAU); ctx.fill()
    ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.arc(bx, by, 2.8 * px, Math.PI, TAU); ctx.fill()
    ctx.fillStyle = '#fff1c8'; ctx.fillRect(bx - 1.6 * px, by - 2 * px, px, px)
  }
  ctx.fillStyle = INK; ctx.fillRect(-0.6 * px, -h / 2 - 5 * px, 1.2 * px, 3 * px)
  // legs
  for (const s of [-1, 1]) { ctx.fillStyle = INK; ctx.fillRect(s * 7 * px - 1.5 * px, h / 2 - px, 3 * px, 3 * px) }
  // body
  const step = (X, Y, W2, H2, P, col) => { ctx.fillStyle = col; ctx.fillRect(X + P, Y, W2 - 2 * P, H2); ctx.fillRect(X, Y + P, W2, H2 - 2 * P) }
  step(-w / 2 - px, -h / 2 - px, w + 2 * px, h + 2 * px, px, INK)
  step(-w / 2, -h / 2, w, h, px, '#e8344e')
  ctx.fillStyle = '#ff7a86'; ctx.fillRect(-w / 2 + px, -h / 2 + px * 0.5, w - 2 * px, px * 0.6)
  // LCD
  ctx.fillStyle = '#12091e'; ctx.fillRect(-w / 2 + 2 * px, -h / 2 + 2 * px, w - 4 * px, h - 4 * px)
  ctx.font = `700 ${Math.round(7.6 * px)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(255,80,70,0.25)'; ctx.fillText('8:88', 0, px * 0.6)
  ctx.fillStyle = '#ff5a4a'; ctx.shadowColor = '#ff3020'; ctx.shadowBlur = 10; ctx.fillText(text, 0, px * 0.6)
  ctx.restore()
  // ringing marks
  if (ring > 0.2 && Math.floor(t * 8) % 2 === 0) {
    ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = BONE_; ctx.lineWidth = px * 0.9; ctx.lineCap = 'round'
    for (const s of [-1, 1]) for (let k = 0; k < 2; k++) { const a = -Math.PI / 2 + s * (0.7 + k * 0.45); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 15 * px, y - 4 * px + Math.sin(a) * 13 * px); ctx.lineTo(x + Math.cos(a) * 19 * px, y - 4 * px + Math.sin(a) * 16.5 * px); ctx.stroke() }
    ctx.restore()
  }
}
const BONE_ = '#efe6d6'

const MIC = BM(`
.MMM.
MHMMM
MMMMM
.MMM.
.GGG.
..K..
..K..
..K..
..K..
..k..`)
/** a handheld announcer mic, (x, y) = grille centre */
export function drawMic(ctx, x, y, px, rot = 0, alpha = 1) { bmp(ctx, MIC, x, y, px, { M: '#a9b0d6', H: '#ffffff', G: '#f2c75c', K: '#2b2140', k: '#4a3d6b' }, { rot, ax: 0.5, ay: 0.12, outline: INK, alpha }) }

/** Libra's balance scales: post + beam (tilt rad, + = right pan down) + two hanging pans; (x, y) = base centre */
export function drawScales(ctx, t, x, y, px, tilt, { alpha = 1, heart = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const R = (X, Y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(X), Math.round(Y), Math.ceil(w), Math.ceil(h)) }
  // base + post
  R(x - 5 * px, y - px, 10 * px, 2 * px, INK); R(x - 4 * px, y - 0.5 * px, 8 * px, px, '#c98a1c')
  R(x - 1.5 * px, y - 16 * px, 3 * px, 16 * px, INK); R(x - 0.5 * px, y - 15.5 * px, px, 15 * px, '#f2c75c')
  const top = y - 16 * px
  R(x - 1.5 * px, top - 2 * px, 3 * px, 3 * px, INK); R(x - 0.5 * px, top - 1.5 * px, px, px, '#fff1c8')
  // beam + pans
  const L = 11 * px, ca = Math.cos(tilt), sa = Math.sin(tilt)
  ctx.save(); ctx.translate(x, top); ctx.rotate(tilt)
  R(-L - px, -1.5 * px, 2 * L + 2 * px, 3 * px, INK); R(-L, -0.5 * px, 2 * L, px, '#f2c75c')
  ctx.restore()
  for (const s of [-1, 1]) {
    const ex = x + s * L * ca, ey = top + s * L * sa
    ctx.strokeStyle = 'rgba(242,199,92,0.9)'; ctx.lineWidth = Math.max(2, px * 0.5)
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 4 * px, ey + 7 * px); ctx.moveTo(ex, ey); ctx.lineTo(ex + 4 * px, ey + 7 * px); ctx.stroke()
    R(ex - 5 * px, ey + 7 * px, 10 * px, 2 * px, INK); R(ex - 4.5 * px, ey + 7 * px, 9 * px, px, '#f2c75c')
    R(ex - 3 * px, ey + 8.5 * px, 6 * px, px, INK)
  }
  if (heart > 0) {
    const k = easeOutBack(clamp(heart), 2.4)
    bmp(ctx, HEART, x, top - 6 * px, px * 0.9 * k, { X: '#ff5c8a', W: '#ffc2d6' }, { outline: INK })
  }
  ctx.restore()
}
const HEART = BM(`.XX.XX. XWXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)

// ───────────────────────────────────────── the arena (baked once, quarter resolution)
// geo: { P(u, v) → {x, y} (screen px), netX(v), netH(v), stands: [{ x0, x1, y }] (bench tops), wall: { y0, y1 }, chair: { x, seat, foot } }
export function makeArena(doc, geo, { Q = 4, W = 1080, H = 1920 } = {}) {
  const c = doc.createElement('canvas'); c.width = W / Q; c.height = H / Q
  const x = c.getContext('2d')
  const R = (X, Y, w, h, col) => { x.fillStyle = col; x.fillRect(Math.round(X / Q), Math.round(Y / Q), Math.max(1, Math.round(w / Q)), Math.max(1, Math.round(h / Q))) }
  const px = (i, j, col) => { x.fillStyle = col; x.fillRect(i, j, 1, 1) }
  const { P, inv } = geo
  // underglow beneath the floating slab
  // (drawn at full res by the film; here only the pixels)
  // ── stands: two tiers per block (bench top + front face + legs), behind the court
  for (const blk of geo.stands) {
    for (const [k, by] of blk.tiers.entries()) {
      R(blk.x0, by - 4, blk.x1 - blk.x0, 12, '#6b4fa8')
      R(blk.x0, by, blk.x1 - blk.x0, 4, '#8a6fc8')
      R(blk.x0, by + 8, blk.x1 - blk.x0, 40 + k * 4, '#2d1f52')
      R(blk.x0, by + 8, blk.x1 - blk.x0, 4, '#1c1238')
      for (let xx = blk.x0 + 24; xx < blk.x1 - 12; xx += 96) R(xx, by + 16, 8, 32 + k * 4, '#22173f')
    }
  }
  // ── the wall in front of the stands (a padded wall with a banner), just behind the court's far run-off
  const { y0: wy0, y1: wy1 } = geo.wall
  R(0, wy0, W, wy1 - wy0, '#3a2a6e'); R(0, wy0, W, 4, '#5a46a0'); R(0, wy1 - 4, W, 4, '#1c1238')
  for (let xx = 0; xx < W; xx += 120) R(xx, wy0 + 4, 4, wy1 - wy0 - 8, '#2d2058')
  // ── the court slab: pixels by inverse-projecting each quarter-res pixel
  const LINES_U = [-0.9, 0.9, -0.5, 0.5], LINES_V = [0, 1, 0.13, 0.87]
  for (let j = 0; j < c.height; j++) for (let i = 0; i < c.width; i++) {
    const X = (i + 0.5) * Q, Y = (j + 0.5) * Q, { u, v, sx } = inv(X, Y)
    if (v < -0.13 || v > 1.1 || Math.abs(u) > 1.18) continue
    const inCourt = Math.abs(u) <= 0.9 && v >= 0 && v <= 1
    let col = inCourt ? (v < 0.5 ? '#2e63b4' : '#3169bd') : '#1d3f80'
    // checker of the run-off for texture
    if (!inCourt && ((i + j) % 2 === 0)) col = '#1f4386'
    // lines (≈ 5 px wide on screen)
    const near = (a, b, s) => Math.abs(a - b) * s < Q * 0.75
    let line = false
    if (v >= -0.005 && v <= 1.005) for (const lu of LINES_U) if (near(u, lu, sx) && (Math.abs(lu) > 0.6 || (v >= 0.13 && v <= 0.87))) line = true
    if (Math.abs(u) <= 0.905) for (const lv of LINES_V) if (near(v, lv, 280)) line = true
    if (Math.abs(u) <= 0.5 && near(v, 0.5, 280)) line = true
    if (line) col = v > 0.5 ? '#f1ebff' : '#dcd4f2'
    px(i, j, col)
  }
  // the slab's front face + gold trim
  const fl = P(-1.18, 1.1), fr = P(1.18, 1.1)
  R(fl.x, fl.y, fr.x - fl.x, 8, '#f2c75c')
  R(fl.x, fl.y + 8, fr.x - fl.x, 40, '#15295a')
  R(fl.x, fl.y + 44, fr.x - fl.x, 8, '#0c1838')
  for (let xx = fl.x + 40; xx < fr.x - 20; xx += 160) R(xx, fl.y + 20, 48, 8, '#22407e')
  // ── the umpire chair (behind the net's far post): legs, crossbars, a ladder on the left, the seat
  const ch = geo.chair
  const legL = ch.x - 52, legR = ch.x + 44
  R(legL, ch.seat, 12, ch.foot - ch.seat, '#d9d2ea'); R(legR, ch.seat, 12, ch.foot - ch.seat, '#d9d2ea')
  R(legL + 8, ch.seat, 4, ch.foot - ch.seat, '#9a90b8'); R(legR + 8, ch.seat, 4, ch.foot - ch.seat, '#9a90b8')
  for (let yy = ch.seat + 60; yy < ch.foot - 20; yy += 72) R(legL, yy, legR - legL + 12, 8, '#b8afd2')
  // ladder (left)
  const lx0 = legL - 44, lx1 = legL - 8
  R(lx0, ch.seat + 4, 8, ch.foot - ch.seat - 4, '#e8e2f6'); R(lx1 - 8, ch.seat + 4, 8, ch.foot - ch.seat - 4, '#e8e2f6')
  for (let yy = ch.seat + 28; yy < ch.foot - 8; yy += 52) R(lx0, yy, lx1 - lx0, 8, '#c9c0e0')
  // seat + back + gold trim
  R(ch.x - 64, ch.seat - 12, 132, 20, '#f2c75c'); R(ch.x - 60, ch.seat - 8, 124, 12, '#3a8a7a')
  R(ch.x - 60, ch.seat - 92, 12, 84, '#2c6e62'); R(ch.x + 52, ch.seat - 92, 12, 84, '#2c6e62')
  R(ch.x - 60, ch.seat - 96, 124, 12, '#3a8a7a'); R(ch.x - 60, ch.seat - 96, 124, 4, '#5cc0a8')
  // ── the net (a vertical mesh along the court's centre line): column by column
  for (let i = 0; i < c.width; i++) {
    const X = (i + 0.5) * Q, v = geo.netV(X)
    if (v < -0.04 || v > 1.04) continue
    const base = P(0, v).y, h = geo.netH(v)
    const post = v < 0.012 || v > 0.988
    for (let j = Math.floor((base - h - (post ? 10 : 0)) / Q); j <= Math.floor(base / Q); j++) {
      const Y = (j + 0.5) * Q, hh = base - Y
      if (hh < 0) continue
      let col
      if (post) col = hh > h ? '#f2c75c' : '#d9d2ea'
      else if (hh > h - 7) col = '#fbf7ff'
      else if (hh > h - 10) col = '#9a90b8'
      else col = ((i + j) % 2 === 0) ? 'rgba(12,8,30,0.92)' : 'rgba(200,190,230,0.55)'
      px(i, j, col)
    }
  }
  return c
}

// ───────────────────────────────────────── the scoreboard
const step = (ctx, X, Y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(X + 2 * P, Y, w - 4 * P, h); ctx.fillRect(X, Y + 2 * P, w, h - 4 * P); ctx.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P) }
export function pixelPanel(ctx, X, Y, w, h, { P = 8, fill = 'rgba(13,8,32,0.94)', border = '#f2c75c', glow = 0.5 } = {}) {
  ctx.save(); ctx.shadowColor = rgba(border, glow); ctx.shadowBlur = 30; step(ctx, X, Y, w, h, P, border); ctx.restore()
  step(ctx, X, Y, w, h, P, border)
  step(ctx, X + P, Y + P, w - 2 * P, h - 2 * P, P, INK)
  step(ctx, X + P * 1.5, Y + P * 1.5, w - 3 * P, h - 3 * P, P, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(X + 2 * P, Y, P * 4, P / 2); ctx.fillRect(X, Y + 2 * P, P / 2, P * 3)
}
/** st: { names: [[glyph, name, colour], [..]], score: ['15', '30'] | null, center: 'DEUCE' | null, love: 0…1, flip: 0…1 (a
 *  squash on change), flash: 0…1, live: bool } — box: { x, y, w, h } */
export function drawScoreboard(ctx, t, box, st) {
  const { x, y, w, h } = box
  pixelPanel(ctx, x, y, w, h, { P: 8, glow: 0.45 + 0.4 * (st.flash || 0) })
  // LED dot screen texture
  ctx.save(); ctx.beginPath(); ctx.rect(x + 16, y + 16, w - 32, h - 32); ctx.clip()
  ctx.fillStyle = 'rgba(255,190,90,0.05)'
  for (let yy = y + 18; yy < y + h - 16; yy += 6) for (let xx = x + 18; xx < x + w - 16; xx += 6) ctx.fillRect(xx, yy, 2, 2)
  ctx.restore()
  const cx = x + w / 2, half = w / 4
  // names
  ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
  st.names.forEach(([g, n, col], k) => {
    const nx = cx + (k ? half : -half) + (k ? 6 : -6)
    ctx.font = `700 31px ${MONO}`
    const label = `${n}`, tw = ctx.measureText(label).width
    ctx.font = `700 34px ${GLYPH_FONT}`
    const gw = 34
    ctx.fillStyle = col; ctx.fillText(g + '︎', nx - tw / 2 - 6, y + 47)
    ctx.font = `700 31px ${MONO}`; ctx.fillStyle = col; ctx.fillText(label, nx + gw / 2 - 6, y + 48)
  })
  // the score line
  const sy = y + h * 0.66, flip = st.flip || 0
  ctx.save(); ctx.translate(cx, sy); ctx.scale(1, 1 - 0.75 * Math.sin(Math.PI * clamp(flip))); ctx.translate(-cx, -sy)
  const led = (txt, X, col, size = 66) => {
    ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'
    ctx.fillStyle = rgba(col, 0.16); ctx.fillText(txt.replace(/[^\s–]/g, '8'), X, sy + 3)
    ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 16; ctx.fillStyle = col; ctx.fillText(txt, X, sy + 3); ctx.restore()
  }
  const AMB = '#ffb43c'
  if (st.love > 0) {
    const k = clamp(st.love), pink = '#ff6fa3'
    led('LOVE', cx - half - 4, pink, 60); led('–', cx, pink, 60); led('LOVE', cx + half + 4, pink, 60)
    void k
  } else if (st.center) led(st.center, cx, AMB, 66)
  else if (st.score) { led(st.score[0], cx - half, AMB); led('–', cx, AMB); led(st.score[1], cx + half, AMB) }
  ctx.restore()
  // ● LIVE
  if (st.live) {
    const on = Math.floor(t * 1.6) % 2 === 0
    ctx.fillStyle = INK; ctx.fillRect(x + w - 124, y - 18, 112, 38)
    ctx.fillStyle = '#e8344e'; ctx.fillRect(x + w - 120, y - 14, 104, 30)
    ctx.fillStyle = '#ffffff'; if (on) { ctx.fillRect(x + w - 110, y - 5, 12, 12) }
    ctx.font = `700 22px ${MONO}`; ctx.textAlign = 'left'; ctx.fillText('LIVE', x + w - 90, y + 2)
  }
}

// ───────────────────────────────────────── the ball machine "THE PROBLEM" (faces left)
/** (x, y) = ground point under the body centre; px ≈ 7. st: { fire 0…1 (recoil since the last shot), eyes: 'angry'|'x',
 *  broken 0…1, shake 0…1, dents n, alpha } */
export function drawMachine(ctx, t, x, y, px, st = {}) {
  const alpha = st.alpha ?? 1
  if (alpha <= 0) return
  const br = clamp(st.broken || 0), sh = (st.shake || 0) * Math.sin(t * 70) * px * 0.6
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x + sh + (st.fire || 0) * px * 1.6, y); ctx.rotate(br * 0.12)
  const R = (X, Y, w, h, col) => { ctx.fillStyle = col; ctx.fillRect(Math.round(X * px), Math.round(Y * px), Math.ceil(w * px), Math.ceil(h * px)) }
  // wheels
  for (const wx of [-11, 11]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(wx * px, -3 * px, 4.2 * px, 0, TAU); ctx.fill(); ctx.fillStyle = '#5d6288'; ctx.beginPath(); ctx.arc(wx * px, -3 * px, 3 * px, 0, TAU); ctx.fill(); const a = -t * 9 * (st.roll || 0); ctx.fillStyle = '#a9b0d6'; ctx.fillRect(wx * px + Math.cos(a) * 1.6 * px - px / 2, -3 * px + Math.sin(a) * 1.6 * px - px / 2, px, px) }
  // body
  R(-18, -27, 36, 22, INK); R(-17, -26, 34, 20, '#4d5c86'); R(-17, -26, 34, 2, '#7a89b8'); R(-17, -8, 34, 2, '#323c5e')
  for (const [rx, ry] of [[-15, -24], [14, -24], [-15, -10], [14, -10]]) R(rx, ry, 1, 1, '#a9b0d6')
  // dents
  for (let k = 0; k < Math.min(5, st.dents || 0); k++) { const dx = [-6, 8, -12, 3, 11][k], dy = [-21, -14, -16, -9, -22][k]; R(dx, dy, 3, 2, '#2c3550'); R(dx, dy, 3, 0.6, '#1d2340') }
  // eyes on the face (angry slits / X X)
  const ey = -21
  if (br > 0.5 || st.eyes === 'x') { for (const ex of [-8, 4]) { R(ex, ey - 1, 1, 1, '#ff4a4a'); R(ex + 2, ey - 1, 1, 1, '#ff4a4a'); R(ex + 1, ey, 1, 1, '#ff4a4a'); R(ex, ey + 1, 1, 1, '#ff4a4a'); R(ex + 2, ey + 1, 1, 1, '#ff4a4a') } }
  else {
    const blink = Math.floor(t * 2.2) % 5 === 0 ? 0.4 : 1
    for (const [ex, s] of [[-9, 1], [3, -1]]) { R(ex, ey, 5, 2 * blink, '#ff4a4a'); R(ex + (s > 0 ? 0 : 2), ey - 1.4, 3, 1, INK) }
    ctx.save(); ctx.shadowColor = '#ff2020'; ctx.shadowBlur = 14; R(-9, ey, 5, 2 * blink, '#ff6a5a'); R(3, ey, 5, 2 * blink, '#ff6a5a'); ctx.restore()
  }
  // label plate
  ctx.save(); ctx.translate(br * 4 * px, br * 3 * px); ctx.rotate(br * 0.35)
  R(-16, -17, 32, 8, INK); R(-15.5, -16.5, 31, 7, '#e8344e'); R(-15.5, -16.5, 31, 1, '#ff7a86')
  ctx.font = `700 ${Math.round(px * 4.1)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(20,6,12,0.6)'; ctx.fillText('THE PROBLEM', 0, -12.7 * px + 3)
  ctx.fillStyle = '#fff6ea'; ctx.fillText('THE PROBLEM', 0, -12.8 * px)
  ctx.restore()
  // barrel (pointing left)
  R(-28, -20, 11, 7, INK); R(-27, -19, 10, 5, '#323c5e'); R(-27, -19, 10, 1, '#5d6288'); R(-25, -20, 2, 7, '#f2c75c')
  R(-29, -19.5, 2, 6, INK)
  // hopper of balls on top
  R(-14, -36, 28, 10, INK); R(-13, -35, 26, 9, 'rgba(120,130,170,0.35)')
  for (let i = -13; i <= 13; i += 2) R(i, -35, 0.5, 9, '#7a89b8')
  const nB = Math.max(0, 9 - Math.floor((st.used || 0) / 2))
  for (let k = 0; k < nB; k++) { const bx = -11 + (k % 5) * 5 + (k >= 5 ? 2.5 : 0), by = k >= 5 ? -39.5 : -37; ctx.fillStyle = '#22300c'; ctx.beginPath(); ctx.arc(bx * px, by * px, 2.3 * px, 0, TAU); ctx.fill(); ctx.fillStyle = '#d8f03c'; ctx.beginPath(); ctx.arc(bx * px, by * px, 1.7 * px, 0, TAU); ctx.fill() }
  R(-14, -36, 28, 1, '#a9b0d6')
  // the red light on top
  const on = br > 0 ? (Math.floor(t * 7) % 2 === 0) : (Math.floor(t * 3) % 2 === 0)
  R(13, -40, 4, 4, INK); R(13.5, -39.5, 3, 3, on ? '#ff4a4a' : '#7a1f2a')
  // the sprung spring (broken)
  if (br > 0) {
    const k = easeOutBack(clamp(br * 1.4), 3), sx = 2, sy0 = -36
    ctx.strokeStyle = '#d9d2ea'; ctx.lineWidth = px * 0.9; ctx.beginPath()
    for (let s = 0; s <= 40; s++) { const u = s / 40, yy = (sy0 - u * 16 * k) * px, xx = (sx + Math.sin(u * TAU * 4) * 2.4) * px + Math.sin(t * 18) * px * (1 - clamp(br * 2 - 1)) * 2; s ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) }
    ctx.stroke()
  }
  ctx.restore()
  // smoke when broken
  if (br > 0) for (let k = 0; k < 6; k++) {
    const ph = (t * 0.7 + k / 6) % 1, sx2 = x + (-4 + k * 3) * px + Math.sin(ph * 5 + k) * px * 3, sy2 = y - (38 + ph * 40) * px
    ctx.save(); ctx.globalAlpha = alpha * br * Math.sin(Math.PI * ph) * 0.55; ctx.fillStyle = '#b8b2c8'
    ctx.beginPath(); ctx.arc(sx2, sy2, px * (2.5 + ph * 4), 0, TAU); ctx.fill(); ctx.restore()
  }
}

// ───────────────────────────────────────── the VS stat card
/** box { x, y, w, h }, st: { col, glyph, name, rows: [{ label, n (blocks lit, may be fractional), max: 5, zero, over }], k (pop 0…1) } */
export function statPanel(ctx, t, box, st) {
  const k = st.k ?? 1
  if (k <= 0.01) return
  const { x, y, w, h } = box
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-(x + w / 2), -(y + h / 2))
  pixelPanel(ctx, x, y, w, h, { P: 8, border: st.col, glow: 0.55 })
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  ctx.font = `700 46px ${GLYPH_FONT}`; ctx.fillStyle = st.col; ctx.fillText(st.glyph + '︎', x + 34, y + 58)
  ctx.font = `700 44px ${MONO}`; ctx.fillText(st.name, x + 86, y + 60)
  st.rows.forEach((r, i) => {
    const ry = y + 132 + i * 74
    ctx.font = `700 29px ${MONO}`; ctx.fillStyle = '#efe6d6'; ctx.textAlign = 'left'; ctx.fillText(r.label, x + 34, ry)
    const bx0 = x + 210, bs = 34, gap = 8
    for (let b = 0; b < 5; b++) {
      const lit = clamp(r.n - b)
      const X = bx0 + b * (bs + gap), Y = ry - bs / 2
      ctx.fillStyle = INK; ctx.fillRect(X - 3, Y - 3, bs + 6, bs + 6)
      ctx.fillStyle = 'rgba(239,230,214,0.12)'; ctx.fillRect(X, Y, bs, bs)
      if (lit > 0) {
        const s = easeOutBack(lit, 2.6)
        ctx.save(); ctx.translate(X + bs / 2, Y + bs / 2); ctx.scale(s, s)
        ctx.fillStyle = r.col || st.col; ctx.fillRect(-bs / 2, -bs / 2, bs, bs)
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fillRect(-bs / 2, -bs / 2, bs, 6)
        ctx.restore()
      }
    }
    if (r.zero > 0) {      // a red "0" stamped over the empty bar
      const s = easeOutBack(clamp(r.zero), 3), X = bx0 + 2.5 * (bs + gap) - gap / 2
      ctx.save(); ctx.translate(X, ry); ctx.rotate(-0.12); ctx.scale(s, s)
      ctx.font = `700 52px ${MONO}`; ctx.textAlign = 'center'; ctx.lineWidth = 10; ctx.strokeStyle = INK; ctx.strokeText('ZERO', 0, 2)
      ctx.fillStyle = '#ff4a5e'; ctx.fillText('ZERO', 0, 2); ctx.restore()
    }
  })
  ctx.restore()
}

// ───────────────────────────────────────── small fx
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3), k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF_COLS[Math.floor(r() * CONF_COLS.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k, xx = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt), yy = y0 + vty * dt + (vy0 - vty) * e
    if (yy > 2000) continue
    ctx.save(); ctx.globalAlpha = clamp((life - dt0) / 0.6); ctx.translate(xx, yy); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7); ctx.restore()
  }
}
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.7 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed, rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1); drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, rise = 260, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.18) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx, y - k * rise, px, { X: cols[i % cols.length], W: '#ffe0ea' }, { alpha: alpha * Math.sin(Math.PI * k), outline: INK })
  }
}
/** dizzy pixel stars orbiting over a head */
export function dizzyStars(ctx, t, x, y, r, { n = 3, size = 24, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  for (let i = 0; i < n; i++) { const a = t * 5 + i * TAU / n; drawPixelStar(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.32, size, 1, ['#f2c75c', '#efe6d6', '#ff8fb1'][i % 3]) }
  ctx.restore()
}
/** angry steam puffs from the top of a head */
export function steamPuffs(ctx, t, x, y, px, k = 1) {
  if (k <= 0) return
  for (let s = 0; s < 4; s++) {
    const ph = (t * 1.7 + s * 0.25) % 1, side = s % 2 ? 1 : -1
    const sx = x + side * (2 + ph * 7) * px, sy = y - ph * 10 * px
    ctx.save(); ctx.globalAlpha = k * Math.sin(Math.PI * ph) * 0.9
    ctx.fillStyle = INK; ctx.fillRect(sx - px * 1.6, sy - px * 1.6, px * 3.2, px * 3.2)
    ctx.fillStyle = '#f4f0ff'; ctx.fillRect(sx - px * 1.1, sy - px * 1.1, px * 2.2, px * 2.2)
    ctx.restore()
  }
}
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function sweatDrop(ctx, t, x, y, px, alpha = 1) { const ph = (t * 1.4) % 1; bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, { alpha: alpha * (1 - ph * 0.6), outline: INK }) }
/** cookie crumbs falling from (x, y) since t0 */
export function crumbs(ctx, t, t0, x, y, { n = 7, px = 5, seed = 1 } = {}) {
  const dt = t - t0
  if (dt < 0 || dt > 0.9) return
  const r = rng(seed * 31 + 7)
  for (let i = 0; i < n; i++) {
    const vx = (r() - 0.5) * 220, vy = -80 - r() * 140, xx = x + vx * dt, yy = y + vy * dt + 900 * dt * dt
    ctx.save(); ctx.globalAlpha = 1 - dt / 0.9; ctx.fillStyle = i % 3 ? '#dda45e' : '#3d2013'; ctx.fillRect(Math.round(xx), Math.round(yy), px, px); ctx.restore()
  }
}
