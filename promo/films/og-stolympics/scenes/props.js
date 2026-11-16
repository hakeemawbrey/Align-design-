// stolympics props — the pixel prop kit for "The Relationship Olympics." (a sports broadcast), kept inside this film's
// folder (STARTALK2.md: props are shared helpers inside your own film folder). Pure functions of their arguments (and t);
// nothing touches `document` at module top level (the sound build imports scenes/index.js in node).
//
//   starFrame / inSprite / cellToWorld   the exact transform drawStarChar uses (mirrors startalk.js), so accessories drawn in
//                                        sprite CELLS (the 36-cell grid) stay seated through hops and squash
//   bodyRows()                           the sprite body's [i0, i1] extent per row
//   headbandCells(ctx, t, flap, cols)    a sweatband across the forehead, knot + two tails (cells)
//   tearsCells(ctx, t, k)                tears, k: 0 none · 1 sniffle · 2 streams · 3 fountains (cells)
//   bmp(ctx, rows, x, y, px, pal, o)     a char bitmap ('.' = clear), anchored (ax, ay), rotated, flipped, ink-outlined
//   drawCrown / drawMic / pixelPanel / confetti / sparkBurst / drawHearts / dizzyStars / sweatDrop
//   makeStadium(doc)                     the static backdrop (stands, wall, floating track slab, press box, torch base),
//                                        baked once at a quarter resolution (4 px pixels) and drawn with smoothing off
//   drawJumbotron / drawPhone / drawBubble / drawMedal / drawBaton / drawPlateStack / drawBigPlate / drawHighJump /
//   drawMat / drawSnail / drawSign / drawTorchFlame / drawPodium / drawPomPom / drawScoreCard / drawStamp / drawHeadset
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
const HEART = BM(`.XX.XX. XWXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
// ───────────────────────────────────────── panels
const step = (ctx, X, Y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(X + 2 * P, Y, w - 4 * P, h); ctx.fillRect(X, Y + 2 * P, w, h - 4 * P); ctx.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P) }
export function pixelPanel(ctx, X, Y, w, h, { P = 8, fill = 'rgba(13,8,32,0.94)', border = '#f2c75c', glow = 0.5 } = {}) {
  ctx.save(); ctx.shadowColor = rgba(border, glow); ctx.shadowBlur = 30; step(ctx, X, Y, w, h, P, border); ctx.restore()
  step(ctx, X, Y, w, h, P, border)
  step(ctx, X + P, Y + P, w - 2 * P, h - 2 * P, P, INK)
  step(ctx, X + P * 1.5, Y + P * 1.5, w - 3 * P, h - 3 * P, P, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(X + 2 * P, Y, P * 4, P / 2); ctx.fillRect(X, Y + 2 * P, P / 2, P * 3)
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

/** a sweatband across the forehead (cells): three rows just above the eyes, a knot and two flapping tails */
export function headbandCells(ctx, t, flap = 1, { band = '#fff8ee', stripe = '#3fd08a', shade = '#e6dccf' } = {}) {
  const R = bodyRows(), cells = []
  ;[[11, band], [12, stripe], [13, shade]].forEach(([j, c]) => { const [i0, i1] = R[j]; for (let i = i0; i <= i1; i++) cells.push([i, j, c]) })
  const e = R[12][1] + 1, f = Math.sin(t * 15) * flap, a = Math.round(0.9 * f), b = Math.round(1.8 * f)
  cells.push([e, 11, band], [e, 12, stripe], [e, 13, band])
  cells.push([e + 1, 11 + a, band], [e + 2, 10 + b, band], [e + 3, 10 + b, stripe])
  cells.push([e + 1, 13 - a, band], [e + 2, 14 - a, band], [e + 3, 14 + b, stripe])
  paintCells(ctx, cells)
}

const R4 = (ctx, X, Y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(X), Math.round(Y), Math.ceil(w), Math.ceil(h)) }

// ───────────────────────────────────────── the stadium (baked once, quarter resolution)
export const STAD = { standsTop: 742, wallY: 962, wallH: 40, slabTop: 1002, slabBot: 1418, ground: 1336 }
export function makeStadium(doc, { Q = 4, W = 1080, H = 1920 } = {}) {
  const c = doc.createElement('canvas'); c.width = W / Q; c.height = H / Q
  const x = c.getContext('2d')
  const R = (X, Y, w, h, col) => { x.fillStyle = col; x.fillRect(Math.round(X / Q), Math.round(Y / Q), Math.max(1, Math.round(w / Q)), Math.max(1, Math.round(h / Q))) }
  const S = STAD
  // stands: a shallow bowl, three bench tiers, railings
  for (let y = S.standsTop; y < S.wallY; y += 4) {
    const k = (y - S.standsTop) / (S.wallY - S.standsTop), inset = 40 * (1 - k)
    R(inset, y, W - 2 * inset, 4, k < 0.02 ? '#3b2a6e' : '#221646')
  }
  for (const [y, h] of [[838, 10], [934, 10]]) { R(0, y, W, h, '#2f2160'); R(0, y, W, 3, '#4a3a8a') }
  R(0, S.standsTop, W, 4, '#6a58b8')
  // aisle stairs
  for (const ax of [216, 540, 864]) for (let y = S.standsTop + 8; y < S.wallY; y += 16) R(ax - 10, y, 20, 8, '#33256a')
  // the wall (the banner text is drawn live, crisp) + gold trim
  R(0, S.wallY, W, S.wallH, '#160e34'); R(0, S.wallY, W, 4, '#f2c75c'); R(0, S.wallY + S.wallH - 4, W, 4, '#8a6a2a')
  // the floating slab: infield strip, track with lanes, front lip, rocky underside
  R(0, S.slabTop, W, 36, '#2a6a52'); R(0, S.slabTop, W, 4, '#3f8f6e')
  for (let y = S.slabTop + 36; y < S.slabBot; y += 4) {
    const k = (y - S.slabTop - 36) / (S.slabBot - S.slabTop - 36)
    R(0, y, W, 4, k < 0.5 ? '#6e2f48' : '#7a3550')
  }
  for (const ly of [1094, 1176, 1258, 1340]) R(0, ly, W, 4, 'rgba(239,230,214,0.55)')
  for (let i = 0; i < 24; i++) R((i * 97 + 31) % W, S.slabTop + 60 + ((i * 53) % 330), 8, 4, 'rgba(0,0,0,0.12)')
  R(0, S.slabBot, W, 12, '#4a1f34'); R(0, S.slabBot, W, 4, '#a24a6c')
  for (let y = S.slabBot + 12; y < S.slabBot + 120; y += 4) {
    const k = (y - S.slabBot - 12) / 108, inset = 30 + 300 * k * k
    R(inset + ((y * 7) % 13) * 2, y, W - 2 * inset - ((y * 5) % 11) * 2, 4, k < 0.4 ? '#2a1a40' : '#1e1232')
  }
  // the press box (left) and the torch pedestal (right)
  R(28, 552, 248, 176, '#0e0a24'); R(32, 556, 240, 168, '#3a2a6e'); R(44, 576, 216, 112, '#100a2a'); R(44, 576, 216, 6, '#6a58b8')
  R(32, 556, 240, 8, '#f2c75c'); R(28, 724, 248, 18, '#241850')
  R(940, 640, 80, 102, '#0e0a24'); R(944, 640, 72, 98, '#6a58b8'); R(952, 648, 56, 90, '#4a3a8a'); R(916, 612, 128, 34, '#0e0a24'); R(920, 616, 120, 26, '#c98a1c'); R(920, 616, 120, 6, '#f2c75c')
  return c
}

// ───────────────────────────────────────── panels
/** the LED jumbotron. rows: [{ text, col, size, dy }] centred; st: { flash, flip (0…1 squash), hearts } */
export function drawJumbotron(ctx, t, box, rows, st = {}) {
  const { x, y, w, h } = box
  // two legs down to the stands
  R4(ctx, x + 60, y + h, 16, 742 - y - h + 4, INK); R4(ctx, x + w - 76, y + h, 16, 742 - y - h + 4, INK)
  R4(ctx, x + 64, y + h, 8, 742 - y - h, '#4a3a8a'); R4(ctx, x + w - 72, y + h, 8, 742 - y - h, '#4a3a8a')
  pixelPanel(ctx, x, y, w, h, { P: 8, glow: 0.4 + 0.5 * (st.flash || 0), border: st.border || '#f2c75c' })
  ctx.save(); ctx.beginPath(); ctx.rect(x + 16, y + 16, w - 32, h - 32); ctx.clip()
  ctx.fillStyle = 'rgba(255,190,90,0.05)'
  for (let yy = y + 18; yy < y + h - 16; yy += 6) for (let xx = x + 18; xx < x + w - 16; xx += 6) ctx.fillRect(xx, yy, 2, 2)
  const cx = x + w / 2, cy = y + h / 2, flip = clamp(st.flip || 0)
  ctx.translate(cx, cy); ctx.scale(1, 1 - 0.8 * Math.sin(Math.PI * flip)); ctx.translate(-cx, -cy)
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  for (const r of rows) {
    ctx.font = `700 ${r.size || 48}px ${MONO}`
    const ty = cy + (r.dy || 0)
    ctx.fillStyle = rgba(r.col, 0.14); ctx.fillText(r.text.replace(/[^\s·:–-]/g, '8'), cx + (r.dx || 0), ty + 2)
    ctx.save(); ctx.shadowColor = r.col; ctx.shadowBlur = 14; ctx.fillStyle = r.col; ctx.fillText(r.text, cx + (r.dx || 0), ty + 2); ctx.restore()
  }
  ctx.restore()
  if (st.live !== false) {
    const on = Math.floor(t * 1.6) % 2 === 0
    ctx.fillStyle = INK; ctx.fillRect(x + w - 124, y - 18, 112, 38)
    ctx.fillStyle = '#e8344e'; ctx.fillRect(x + w - 120, y - 14, 104, 30)
    ctx.fillStyle = '#ffffff'; if (on) ctx.fillRect(x + w - 110, y - 5, 12, 12)
    ctx.font = `700 22px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('LIVE', x + w - 90, y + 2)
  }
}

// ───────────────────────────────────────── phones + bubbles
/** a pixel phone, (x, y) = centre; screen: 'dots' | 'sent' | null; text shown when sent */
export function drawPhone(ctx, t, x, y, px, { screen = 'dots', text = 'fine.', rot = 0, alpha = 1, glow = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  const w = 14 * px, h = 24 * px
  if (glow > 0) { ctx.save(); ctx.shadowColor = '#9fe4ff'; ctx.shadowBlur = 40 * glow; ctx.fillStyle = 'rgba(159,228,255,0.25)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore() }
  R4(ctx, -w / 2 - px, -h / 2 + px, w + 2 * px, h - 2 * px, INK); R4(ctx, -w / 2 + px, -h / 2 - px, w - 2 * px, h + 2 * px, INK)
  R4(ctx, -w / 2, -h / 2, w, h, '#3a3060'); R4(ctx, -w / 2 + px, -h / 2 + 2 * px, w - 2 * px, h - 5 * px, '#141034')
  R4(ctx, -2 * px, h / 2 - 2 * px, 4 * px, px, '#6a5aa0'); R4(ctx, -2 * px, -h / 2 + 0.5 * px, 4 * px, px * 0.7, '#6a5aa0')
  if (screen === 'dots') {
    const bw = 9 * px, bh = 4 * px
    R4(ctx, -bw / 2, -bh / 2, bw, bh, '#ece6ff')
    for (let i = 0; i < 3; i++) { const on = Math.floor(t * 5 - i) % 3 === 0; R4(ctx, -bw / 2 + (1.5 + i * 2.5) * px, -px * 0.75 - (on ? px * 0.7 : 0), 1.5 * px, 1.5 * px, on ? '#6a5aa0' : '#a99ad6') }
  } else if (screen === 'sent') {
    ctx.font = `700 ${Math.round(px * 3.1)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const tw = ctx.measureText(text).width + 2 * px
    R4(ctx, -tw / 2, -2.5 * px, tw, 5 * px, '#5ec8ff'); ctx.fillStyle = '#0b1a2e'; ctx.fillText(text, 0, 0)
    ctx.font = `700 ${Math.round(px * 1.8)}px ${MONO}`; ctx.fillStyle = '#9fe4ff'; ctx.fillText('sent', 0, 4.4 * px)
  }
  ctx.restore()
}
/** a speech-ish pixel label bubble with a tail pointing down, (x, y) = bottom of the tail */
export function drawBubble(ctx, x, y, text, { col = '#efe6d6', ink = INK, size = 34, k = 1, rot = 0 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(rot)
  ctx.font = `700 ${size}px ${MONO}`; const tw = ctx.measureText(text).width, w = tw + size * 1.1, h = size * 1.7
  R4(ctx, -w / 2 - 4, -h - 22, w + 8, h + 8, INK); R4(ctx, -w / 2, -h - 18, w, h, col)
  R4(ctx, -12, -22, 24, 10, INK); R4(ctx, -8, -22, 16, 8, col); R4(ctx, -4, -14, 8, 10, INK)
  ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, -h / 2 - 16)
  ctx.restore()
}

// ───────────────────────────────────────── medals, baton, plates
const MEDAL = BM(`
..XXXXX..
.XHHXXXX.
XHXXSXXXY
XHXSSSXXY
XXSSSSSXY
XXXSSSXXY
XXXSXSXXY
.XXXXXXY.
..YYYYY..`)
/** a gold medal on a ribbon; (x, y) = the ribbon's top centre (it hangs below) */
export function drawMedal(ctx, x, y, px, { rot = 0, alpha = 1, ribbon = 1, shine = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  if (ribbon) {
    for (const s of [-1, 1]) {
      ctx.save(); ctx.rotate(s * 0.32)
      R4(ctx, -2.2 * px, 0, 4.4 * px, 11 * px, INK); R4(ctx, -1.6 * px, 0, 3.2 * px, 10.6 * px, s < 0 ? '#e8344e' : '#3f7cf0'); R4(ctx, -0.4 * px, 0, 0.8 * px, 10.6 * px, '#ffffff')
      ctx.restore()
    }
  }
  bmp(ctx, MEDAL, 0, 10 * px, px, { X: '#f7c948', H: '#fff4b8', S: '#fff1a8', Y: '#c98a1c' }, { ay: 0, outline: '#3a1c08' })
  ctx.restore()
  if (shine > 0) sparkBurst(ctx, shine, x + 3 * px, y + 13 * px, 0, { n: 6, R: 9 * px, size: 3.5 * px, seed: 3, life: 0.9 })
}
/** the relay baton with a hanging tag; (x, y) = centre */
export function drawBaton(ctx, x, y, px, { rot = 0, label = 'COMPROMISE', alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  const L = 18 * px
  R4(ctx, -L / 2 - px, -2 * px, L + 2 * px, 4 * px, INK)
  for (let i = 0; i < 6; i++) R4(ctx, -L / 2 + i * L / 6, -1.4 * px, L / 6 + 0.5, 2.8 * px, i % 2 ? '#f2c75c' : '#e8344e')
  R4(ctx, -L / 2, -1.4 * px, L, 0.8 * px, 'rgba(255,255,255,0.45)')
  ctx.restore()
  if (label) {
    ctx.save(); ctx.globalAlpha *= alpha
    ctx.font = `700 ${Math.round(px * 3.6)}px ${MONO}`; const tw = ctx.measureText(label).width + px * 3
    const ty = y + 7 * px
    ctx.strokeStyle = 'rgba(239,230,214,0.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + px); ctx.lineTo(x, ty - 2.5 * px); ctx.stroke()
    R4(ctx, x - tw / 2 - 3, ty - 2.5 * px - 3, tw + 6, 5 * px + 6, INK); R4(ctx, x - tw / 2, ty - 2.5 * px, tw, 5 * px, '#efe6d6')
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x, ty + 1)
    ctx.restore()
  }
}
/** a stack of n plates seen edge-on, (x, y) = bottom centre; wob = sway in rad; returns the top y */
export function drawPlateStack(ctx, t, x, y, n, { w = 150, ph = 15, wob = 0, alpha = 1, gone = 0 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  for (let i = 0; i < n; i++) {
    const off = Math.sin(wob) * i * i * 0.9 + ((i * 37) % 7 - 3)
    const py = y - (i + 1) * ph
    R4(ctx, x - w / 2 + off - 3, py - 3, w + 6, ph + 3, INK)
    R4(ctx, x - w / 2 + off, py, w, ph - 3, '#f4f1ff'); R4(ctx, x - w / 2 + off, py + ph - 6, w, 3, '#7fb8ff'); R4(ctx, x - w / 2 + off + 8, py + 2, w * 0.3, 3, '#ffffff')
  }
  ctx.restore()
  return y - n * ph
}
/** one big shiny plate (face-on), (x, y) = centre */
export function drawBigPlate(ctx, t, x, y, r, { alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  const P = Math.max(4, Math.round(r / 9))
  for (let j = -r; j <= r; j += P) for (let i = -r; i <= r; i += P) {
    const d = Math.hypot(i + P / 2, j + P / 2)
    if (d > r) continue
    const col = d > r - P * 1.1 ? INK : d > r - P * 2.4 ? '#7fb8ff' : d > r * 0.62 && d < r * 0.62 + P ? '#d6e4ff' : '#f6f4ff'
    ctx.fillStyle = col; ctx.fillRect(i, j, P + 0.5, P + 0.5)
  }
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-r * 0.55, -r * 0.5, P * 2, P); ctx.fillRect(-r * 0.6, -r * 0.4, P, P * 2)
  ctx.restore()
}

// ───────────────────────────────────────── high jump
/** two striped posts and the bar between them at barY with a label plaque; k = pop-in 0…1 */
export function drawHighJump(ctx, t, x0, x1, ground, barY, label, { k = 1, wob = 0, alpha = 1, top: topY = null } = {}) {
  if (k <= 0 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const top = Math.min(ground - 40, (topY ?? barY) - 26)
  const hgt = (ground - top) * k
  for (const px of [x0, x1]) {
    R4(ctx, px - 11, ground - hgt, 22, hgt, INK)
    for (let yy = ground - hgt + 3, i = 0; yy < ground; yy += 24, i++) R4(ctx, px - 7, yy, 14, Math.min(24, ground - yy), i % 2 ? '#efe6d6' : '#3f7cf0')
    R4(ctx, px - 22, ground - 6, 44, 10, INK); R4(ctx, px - 18, ground - 4, 36, 6, '#6a58b8')
  }
  if (k > 0.98 && barY > -40) {
    const by = barY + Math.sin(t * 30) * wob
    R4(ctx, x0 - 6, by - 9, x1 - x0 + 12, 18, INK)
    for (let xx = x0, i = 0; xx < x1; xx += 40, i++) R4(ctx, xx, by - 5, Math.min(40, x1 - xx), 10, i % 2 ? '#ffffff' : '#e8344e')
    if (label) {
      ctx.font = `700 30px ${MONO}`; const tw = ctx.measureText(label).width + 30
      const cx = (x0 + x1) / 2
      pixelPanel(ctx, cx - tw / 2, by + 16, tw, 54, { P: 4, glow: 0.3, fill: 'rgba(20,12,44,0.97)' })
      ctx.fillStyle = '#f2c75c'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, cx, by + 44)
      R4(ctx, cx - 2, by + 6, 4, 12, '#f2c75c')
    }
  }
  ctx.restore()
}
/** the landing mat, (x, y) = top centre; squish 0…1 */
export function drawMat(ctx, x, y, w, h, { squish = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const hh = h * (1 - 0.35 * squish), ww = w * (1 + 0.08 * squish), yy = y + (h - hh)
  R4(ctx, x - ww / 2 - 4, yy - 4, ww + 8, hh + 8, INK); R4(ctx, x - ww / 2, yy, ww, hh, '#2f6fd8'); R4(ctx, x - ww / 2, yy, ww, 8, '#7fb8ff')
  R4(ctx, x - ww / 2, yy + hh - 10, ww, 10, '#1e4a9a')
  for (let i = 1; i < 4; i++) R4(ctx, x - ww / 2 + ww * i / 4 - 2, yy + 8, 4, hh - 18, '#2558b8')
  ctx.restore()
}

// ───────────────────────────────────────── crowd + misc props
const SNAIL = BM(`
....SSSSS......
...SsSSSsS.....
..SsSssSSsS....
..SsSsSsSsS....
..SsSsssSsS..E.E
..SsSSSSSsS..e.e
...SsssssS...BBB
.BBBBBBBBBBBBBBB
BBBBBBBBBBBBBBB.`)
/** the snail who wins the relay (bib "1" on the shell), (x, y) = bottom centre */
export function drawSnail(ctx, t, x, y, px, { alpha = 1 } = {}) {
  const sq = Math.sin(t * 6) * 0.06
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + sq, 1 - sq); ctx.translate(-x, -y)
  bmp(ctx, SNAIL, x, y, px, { S: '#c98a4a', s: '#ffd28a', B: '#9cf08a', E: '#9cf08a', e: INK }, { ay: 1, outline: INK, alpha })
  ctx.fillStyle = '#ffffff'; ctx.fillRect(x - 4.8 * px, y - 7 * px, 4 * px, 3.6 * px)
  ctx.fillStyle = INK; ctx.font = `700 ${Math.round(px * 3.2)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('1', x - 2.8 * px, y - 5.1 * px)
  ctx.restore()
}
/** a hand-held crowd sign on a stick, (x, y) = the bottom of the stick */
export function drawSign(ctx, x, y, text, { col = '#efe6d6', ink = INK, size = 26, k = 1, rot = 0, stick = 46 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${MONO}`; const tw = ctx.measureText(text).width, w = tw + 20, h = size + 18
  R4(ctx, -4, -stick, 8, stick, INK); R4(ctx, -2, -stick, 4, stick, '#c98a4a')
  R4(ctx, -w / 2 - 4, -stick - h - 4, w + 8, h + 8, INK); R4(ctx, -w / 2, -stick - h, w, h, col)
  ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, -stick - h / 2 + 2)
  ctx.restore()
}
/** the torch's flame (a flickering pixel heart of fire), (x, y) = the cauldron rim centre */
export function drawTorchFlame(ctx, t, x, y, px, { k = 1 } = {}) {
  if (k <= 0) return
  const cols = ['#ff4a5e', '#ff8a3c', '#ffd25c', '#fff3c4']
  for (let layer = 0; layer < 4; layer++) {
    const s = (1 - layer * 0.22) * k
    for (let j = 0; j < 12; j++) for (let i = -6; i <= 6; i++) {
      const u = i / 6, v = j / 11
      const heart = (u * u + (v * 1.1 - Math.sqrt(Math.abs(u)) * 0.55 - 0.15) ** 2 * 1.4) < 0.5
      const flick = Math.sin(t * 13 + i * 1.7 + j * 0.9 + layer) * 0.5 + 0.5
      if (!heart || (j < 3 && flick < 0.35)) continue
      ctx.fillStyle = cols[layer]; ctx.fillRect(Math.round(x + i * px * s), Math.round(y - (11 - j) * px * s - px * (1 + flick * 0.6)), Math.ceil(px * s), Math.ceil(px * s))
    }
  }
}
/** the winners' podium: one wide gold step "1", (x, y) = top centre */
export function drawPodium(ctx, x, y, w, h, { k = 1, label = '1' } = {}) {
  if (k <= 0) return
  const hh = h * k
  ctx.save()
  R4(ctx, x - w / 2 - 5, y + h - hh - 5, w + 10, hh + 10, INK); R4(ctx, x - w / 2, y + h - hh, w, hh, '#f2c75c'); R4(ctx, x - w / 2, y + h - hh, w, 10, '#fff1a8'); R4(ctx, x - w / 2, y + h - 12, w, 12, '#c98a1c')
  ctx.font = `700 ${Math.round(h * 0.62)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#8a5a12'
  if (k > 0.6) ctx.fillText(label, x, y + h - hh / 2 + 6)
  ctx.restore()
}
/** a cheerleader pom-pom, (x, y) = centre */
export function drawPomPom(ctx, t, x, y, px, col = '#ff8fb1', seed = 1) {
  const r = rng(seed)
  for (let i = 0; i < 22; i++) {
    const a = r() * TAU, d = Math.sqrt(r()) * 5 * px, j = Math.sin(t * 20 + i) * px * 0.6
    const xx = x + Math.cos(a) * d + j, yy = y + Math.sin(a) * d
    ctx.fillStyle = INK; ctx.fillRect(xx - px * 1.2, yy - px * 1.2, px * 2.4, px * 2.4)
  }
  const r2 = rng(seed)
  for (let i = 0; i < 22; i++) {
    const a = r2() * TAU, d = Math.sqrt(r2()) * 5 * px, j = Math.sin(t * 20 + i) * px * 0.6
    ctx.fillStyle = i % 4 ? col : '#ffffff'; ctx.fillRect(x + Math.cos(a) * d + j - px * 0.8, y + Math.sin(a) * d - px * 0.8, px * 1.6, px * 1.6)
  }
}
/** a judge's score card on a stick, (x, y) = the bottom of the stick */
export function drawScoreCard(ctx, x, y, text, { k = 1, rot = 0 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  R4(ctx, -4, -40, 8, 40, INK); R4(ctx, -2, -40, 4, 40, '#c98a4a')
  R4(ctx, -46, -122, 92, 86, INK); R4(ctx, -42, -118, 84, 78, '#ffffff'); R4(ctx, -42, -118, 84, 8, '#f2c75c')
  ctx.font = `700 46px ${MONO}`; ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, -76)
  ctx.restore()
}
/** a rubber stamp label (double border), (x, y) = centre */
export function drawStamp(ctx, x, y, text, { col = '#7dffb0', k = 1, rot = -0.12, size = 54 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${MONO}`; const tw = ctx.measureText(text).width, w = tw + 46, h = size + 40
  ctx.fillStyle = 'rgba(12,7,30,0.86)'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 11, -h / 2 + 11, w - 22, h - 22)
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3)
  ctx.restore()
}
/** a commentator headset on a star frame F (world coords) */
export function drawHeadset(ctx, F) {
  const [lx, ly] = cellToWorld(F, 6.5, 17), [rx, ry] = cellToWorld(F, 29.5, 17), [tx, ty] = cellToWorld(F, 18, 4.5)
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = F.cell * 2.2; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.quadraticCurveTo(tx, ty - F.cell * 7, rx, ry); ctx.stroke()
  ctx.strokeStyle = '#4a3d6b'; ctx.lineWidth = F.cell * 1.1; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.quadraticCurveTo(tx, ty - F.cell * 7, rx, ry); ctx.stroke()
  for (const [ex, ey] of [[lx, ly], [rx, ry]]) { R4(ctx, ex - F.cell * 2, ey - F.cell * 2.5, F.cell * 4, F.cell * 5, INK); R4(ctx, ex - F.cell * 1.3, ey - F.cell * 1.8, F.cell * 2.6, F.cell * 3.6, '#e8344e') }
  ctx.restore()
}
