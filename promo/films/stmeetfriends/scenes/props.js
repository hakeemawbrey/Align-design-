// stmeetfriends props — copied from stlive5th (Ep. 1) so Ep. 2 shares its booth, CRT and tears; small pixel drawings on canvas,
// shared inside this film. Everything is a pure function of its arguments; nothing touches `document` at load.
//
//   starFrame(x, y, size, t, opts)   the exact transform drawStarChar uses for that frame (same maths as startalk.js),
//   inSprite(ctx, F, fn)             so props drawn in sprite CELLS (the 36-cell grid) stay seated through hops/squash.
//   headsetCells(ctx, accent)        a pixel headset over the top point (cells). headsetWorld(...) for a flying one.
//   tearsCells(ctx, t, k)            happy tears from both eyes, k: 0 none · 1 sniffle · 2 streams · 3 fountains.
//   tissueCells(ctx, k) / hankieCells(ctx, side)   the honk tissue and the eye-dabbing hankie.
//   drawMic(ctx, x, y, ang, s)       a broadcast desk mic on a short stand, capsule swivelled by ang (rad).
//   drawTV(ctx, geo, t, opts)        the chunky CRT (body, bezel, knobs, antennas, CH 05 LED); the screen is drawn by the film.
//   drawDesk(ctx, x0, x1, y, h)      the booth desk front.
//   pixelPanel(cv, w, h, opts)       a stepped-corner pixel panel (gold border) into a canvas (the LESSON banner).
//   tumbleweedLow(l, cx, cy, r, ang) the tumbleweed, drawn on the low-res café canvas.
//   confetti(ctx, t, t0, opts)       a confetti cannon burst (pure f(t): analytic drag).
import { clamp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

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
/** sprite cell → world point (ignores squash; for spawning things that leave the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ── tiny cell painter with a 1-cell ink outline
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ── headset: band over the top point, two cups on the sides of the top arm
let HEADSET = null
function headsetCellsList(accent) {
  const out = [], seen = new Set()
  const put = (i, j, c) => { const k = i + ',' + j; if (seen.has(k)) return; seen.add(k); out.push([i, j, c]) }
  // band (an arch: centre (18, 11), rx 6, ry 10.5)
  for (let a = 0; a <= 180; a += 2) {
    const r = a * Math.PI / 180, i = Math.round(17.5 - Math.cos(r) * 6.2), j = Math.round(11 - Math.sin(r) * 10.6)
    put(i, j, a > 60 && a < 120 ? '#9aa0c8' : '#5d6288')
  }
  // cups
  for (const [x0, d] of [[9, 1], [23, -1]]) {
    for (let j = 8; j <= 14; j++) for (let i = 0; i < 4; i++) {
      const edge = (j === 8 || j === 14) && (i === 0 || i === 3)
      if (edge) continue
      const c = (i === (d > 0 ? 3 : 0)) ? accent : (j === 9 && i === (d > 0 ? 1 : 2)) ? '#6e7399' : '#2c2f4c'
      put(x0 + i, j, c)
    }
  }
  return out
}
export function headsetCells(ctx, accent) {
  const k = 'h' + accent
  HEADSET = HEADSET || new Map()
  if (!HEADSET.has(k)) HEADSET.set(k, headsetCellsList(accent))
  paintCells(ctx, HEADSET.get(k))
}
/** a headset in flight: centred at (x, y) world, rotated, cell px */
export function headsetWorld(ctx, x, y, rot, cell, accent, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(cell, cell); ctx.translate(-18, -9)
  headsetCells(ctx, accent); ctx.restore()
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
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }        // fountain arcs
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }      // streams down the cheeks
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }                      // a sniffle
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    // the welling pool under the eye
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
export function tissueCells(ctx, k = 1) {
  const cells = []
  const rows = ['..WWWWWW..', '.WWWWWWWW.', 'WWWWgWWWWW', 'WWWWWWWgWW', 'WWgWWWWWWW', '.WWWWWWWW.', '..WWWWWW..']
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') cells.push([13 + i, 21 + j + (1 - k) * 2, c === 'g' ? '#cfc6dc' : '#fbf7ee']) }))
  paintCells(ctx, cells)
}
export function hankieCells(ctx, side) {
  const x0 = side < 0 ? 9 : 20, cells = []
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) cells.push([x0 + i, 19 + j, (i === 0 || j === 0 || i === 5 || j === 4) ? '#ff8fb1' : (i + j) % 3 ? '#fff6ee' : '#ffd6e2'])
  paintCells(ctx, cells)
}

// ── broadcast desk mic
export function drawMic(ctx, x, y, ang, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  const P = 6
  // base + stand
  ctx.fillStyle = INK; ctx.fillRect(-7 * P, -2 * P, 14 * P, 3 * P); ctx.fillRect(-1.5 * P, -16 * P, 3 * P, 15 * P)
  ctx.fillStyle = '#4a4f72'; ctx.fillRect(-6 * P, -1.5 * P, 12 * P, 2 * P); ctx.fillStyle = '#7d83ad'; ctx.fillRect(-6 * P, -1.5 * P, 12 * P, P / 2)
  ctx.fillStyle = '#5d6288'; ctx.fillRect(-0.75 * P, -15.5 * P, 1.5 * P, 14 * P)
  // capsule
  ctx.translate(0, -16 * P); ctx.rotate(ang)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-4.5 * P, -13 * P, 9 * P, 14 * P, 4 * P); ctx.fill()
  ctx.fillStyle = '#9097bd'; ctx.beginPath(); ctx.roundRect(-3.5 * P, -12 * P, 7 * P, 12 * P, 3.4 * P); ctx.fill()
  ctx.fillStyle = '#5d6288'
  for (let j = -10; j <= -2; j += 2) ctx.fillRect(-3.5 * P, j * P, 7 * P, P * 0.5)
  for (let i = -2; i <= 2; i += 2) ctx.fillRect(i * P - P * 0.25, -11.5 * P, P * 0.5, 11 * P)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(-2.6 * P, -10.5 * P, P * 0.8, 5 * P)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-4.5 * P, -1.5 * P, 9 * P, 1.6 * P)
  ctx.restore()
}

// ── the CRT. geo = { x0, y0, w, h, sx0, sy0, sw, sh } (body box + screen box, world px)
const step = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
export function drawTV(ctx, g, t, { led = 'CH 05', antennaWiggle = 0 } = {}) {
  const P = 8
  const cx = g.x0 + g.w / 2
  // antennas (behind the body)
  ctx.save(); ctx.lineCap = 'square'
  for (const [dx, dy, ph] of [[-150, -190, 0], [140, -205, 1.3]]) {
    const w = antennaWiggle * Math.sin(t * 9 + ph) * 18
    const ex = cx + dx + w, ey = g.y0 + dy
    ctx.strokeStyle = INK; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(cx, g.y0 - 10); ctx.lineTo(ex, ey); ctx.stroke()
    ctx.strokeStyle = '#b9b2d6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, g.y0 - 10); ctx.lineTo(ex, ey); ctx.stroke()
    ctx.fillStyle = INK; ctx.fillRect(ex - 13, ey - 13, 26, 26); ctx.fillStyle = '#f2c75c'; ctx.fillRect(ex - 9, ey - 9, 18, 18); ctx.fillStyle = '#fff1c8'; ctx.fillRect(ex - 9, ey - 9, 6, 6)
  }
  ctx.restore()
  // antenna dome
  step(ctx, cx - 60, g.y0 - 34, 120, 44, P, INK)
  step(ctx, cx - 52, g.y0 - 26, 104, 36, P, '#5b4690')
  ctx.fillStyle = '#7a63b4'; ctx.fillRect(cx - 36, g.y0 - 22, 40, 6)
  // feet
  for (const fx of [g.x0 + 90, g.x0 + g.w - 150]) { step(ctx, fx, g.y0 + g.h - 10, 60, 34, 4, INK); ctx.fillStyle = '#2a1d48'; ctx.fillRect(fx + 6, g.y0 + g.h - 6, 48, 22) }
  // body: ink outline, plastic, highlight + shadow bands
  step(ctx, g.x0 - P, g.y0 - P, g.w + 2 * P, g.h + 2 * P, P, INK)
  step(ctx, g.x0, g.y0, g.w, g.h, P, '#3e2c66')
  ctx.fillStyle = '#5b4690'; ctx.fillRect(g.x0 + 2 * P, g.y0 + P, g.w - 4 * P, P); ctx.fillRect(g.x0 + P, g.y0 + 2 * P, P, g.h - 4 * P)
  ctx.fillStyle = '#2a1d48'; ctx.fillRect(g.x0 + 2 * P, g.y0 + g.h - 2 * P, g.w - 4 * P, P); ctx.fillRect(g.x0 + g.w - 2 * P, g.y0 + 2 * P, P, g.h - 4 * P)
  ctx.fillStyle = '#8a72c8'; ctx.fillRect(g.x0 + 3 * P, g.y0 + P, 6 * P, P / 2)
  // bezel + gold trim
  const bz = 14
  ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.roundRect(g.sx0 - bz - 5, g.sy0 - bz - 5, g.sw + 2 * bz + 10, g.sh + 2 * bz + 10, 44); ctx.fill()
  ctx.fillStyle = '#0b0816'; ctx.beginPath(); ctx.roundRect(g.sx0 - bz, g.sy0 - bz, g.sw + 2 * bz, g.sh + 2 * bz, 40); ctx.fill()
  // control strip
  const by = g.sy0 + g.sh + bz + 14, bh = g.y0 + g.h - by - 2 * P
  ctx.fillStyle = '#2a1d48'; ctx.fillRect(g.x0 + 3 * P, by, g.w - 6 * P, bh)
  // speaker slots
  ctx.fillStyle = '#140d26'
  for (let i = 0; i < 9; i++) ctx.fillRect(g.x0 + 5 * P + i * 22, by + 14, 10, bh - 28)
  // LED readout
  ctx.fillStyle = '#140d26'; ctx.fillRect(cx - 80, by + 12, 160, bh - 24)
  ctx.fillStyle = '#ff4a5e'; ctx.font = `700 ${Math.round((bh - 24) * 0.62)}px 'Space Mono', monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(led, cx, by + bh / 2 + 2)
  // knobs
  for (const [kx, ph] of [[g.x0 + g.w - 7 * P - 70, 0.6], [g.x0 + g.w - 7 * P, -0.9]]) {
    const ky = by + bh / 2, r = bh / 2 - 6
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(kx, ky, r + 4, 0, TAU); ctx.fill()
    ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.arc(kx, ky, r, 0, TAU); ctx.fill()
    ctx.fillStyle = '#c98a1f'; ctx.beginPath(); ctx.arc(kx, ky, r * 0.55, 0, TAU); ctx.fill()
    ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(ph - Math.PI / 2) * r, ky + Math.sin(ph - Math.PI / 2) * r); ctx.stroke()
  }
}

export function drawDesk(ctx, x0, x1, y, h) {
  const P = 8
  step(ctx, x0 - P, y - P, x1 - x0 + 2 * P, h + 2 * P, P, INK)
  step(ctx, x0, y, x1 - x0, h, P, '#2c1f4e')
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0 + P, y, x1 - x0 - 2 * P, P)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x0 + 3 * P, y, 8 * P, P / 2)
  ctx.fillStyle = '#3d2c68'; ctx.fillRect(x0 + 2 * P, y + 2 * P, x1 - x0 - 4 * P, P / 2)
  ctx.fillStyle = '#1f1538'
  for (let xx = x0 + 6 * P; xx < x1 - 6 * P; xx += 18 * P) ctx.fillRect(xx, y + 3 * P, P / 2, h - 4 * P)
}

/** a pixel panel (stepped corners, gold border, bone hairline) on a canvas sized (w + 2m) × (h + 2m) */
export function pixelPanel(cv, w, h, { m = 28, fill = 'rgba(16,9,38,0.95)', border = '#f2c75c', P = 8 } = {}) {
  cv.width = w + 2 * m; cv.height = h + 2 * m
  const x = cv.getContext('2d'); x.translate(m, m)
  x.save(); x.shadowColor = 'rgba(242,199,92,0.65)'; x.shadowBlur = 26; step(x, 0, 0, w, h, P, border); x.restore()
  step(x, 0, 0, w, h, P, border)
  step(x, P, P, w - 2 * P, h - 2 * P, P, INK)
  step(x, 2 * P, 2 * P, w - 4 * P, h - 4 * P, P, fill)
  x.fillStyle = 'rgba(239,230,214,0.45)'; x.fillRect(3 * P, 3 * P - P / 2, w - 6 * P, P / 3); x.fillRect(3 * P, h - 3 * P + P / 6, w - 6 * P, P / 3)
  x.fillStyle = '#fff1c8'; x.fillRect(2 * P, 0, P * 4, P / 2); x.fillRect(0, 2 * P, P / 2, P * 3)
  // corner gems
  for (const [gx, gy] of [[P * 1.5, P * 1.5], [w - P * 2.5, P * 1.5], [P * 1.5, h - P * 2.5], [w - P * 2.5, h - P * 2.5]]) { x.fillStyle = '#ff8fb1'; x.fillRect(gx, gy, P, P) }
}

/** tumbleweed on the low-res canvas (1 unit = 1 screen pixel) */
export function tumbleweedLow(l, cx, cy, r, ang) {
  const ca = Math.cos(ang), sa = Math.sin(ang)
  for (let j = -r - 1; j <= r + 1; j++) for (let i = -r - 1; i <= r + 1; i++) {
    const d = Math.hypot(i, j)
    if (d > r + 0.3) continue
    const u = i * ca + j * sa, v = -i * sa + j * ca
    const ring = d > r - 1.1
    const spoke = Math.abs(Math.sin(Math.atan2(v, u) * 3 + d * 0.9)) < 0.28
    const swirl = Math.abs(Math.sin(u * 1.3) * Math.cos(v * 1.1)) > 0.86
    if (ring || spoke || swirl) {
      l.fillStyle = ring ? '#7a5428' : (u + v > 0 ? '#c9a061' : '#a47a3c')
      l.fillRect(Math.round(cx + i), Math.round(cy + j), 1, 1)
    }
  }
}

/** confetti cannon from (x0, y0) at t0 — rectangles flipping in 3D-ish, analytic drag so it's pure f(t) */
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5 } = {}) {
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
