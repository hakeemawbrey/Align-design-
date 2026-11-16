// srhtxtraffic props — pixel drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / drawBits / stepRect   (the stlive5th helpers, same maths as startalk.js)
//   drawCar(x, cx, cy, w, color, { brake, convertible, flat, t })   a rear-view pixel car (cy = its bottom)
//   drawRoad(x, t, { a, flow })   the Katy Freeway in perspective (VP 540, 600) with moving lane dashes
//   drawGantry(x, t, label, clock, a)   an overhead road sign with a digital clock
import { clamp, lerp } from '../../../src/lib.js'

const INK = '#1b1236'
export const RED = '#ff4d4a', BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1'
export const MONO = "'Space Mono', ui-monospace, monospace"
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
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ── tears (cells): k 1 sniffle · 2 streams · 3 fountains
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
/** bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// stepped-corner pixel rectangle (P = pixel size), filled
export function stepRect(x, X, Y, w, h, P, col) {
  x.fillStyle = col
  x.fillRect(X + 2 * P, Y, w - 4 * P, h)
  x.fillRect(X, Y + 2 * P, w, h - 4 * P)
  x.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P)
}

const INK2 = '#1b1236'
export const VP = { x: 540, y: 600 }
export const roadY = d => VP.y + d * d * 1250            // depth d (0 = horizon … 1 = bottom of frame)
export const laneX = (L, d) => VP.x + L * d * d * 560

// ── a rear-view pixel car; (cx, cy) = bottom centre
const CAR = ['..BBBBBBBBBBBB..', '.BwwwwwwwwwwwwB.', '.BwgwwwwwwwwwwB.', 'BBBBBBBBBBBBBBBB', 'BLLBBBBBBBBBBLLB', 'BBBBBBkkkkBBBBBB', 'dddddddddddddddd', 'TT............TT']
const CONV = ['BBBBBBBBBBBBBBBB', 'BLLBBBBBBBBBBLLB', 'BBBBBBkkkkBBBBBB', 'dddddddddddddddd', 'TT............TT']
export function drawCar(x, cx, cy, w, color, { brake = 0, convertible = false, flat = 0, shade = '#00000055' } = {}) {
  const bm = convertible ? CONV : CAR
  const cell = w / 16, h = bm.length * cell
  const sq = 1 - 0.12 * flat
  const rows = flat > 0 ? bm.map((r, j) => j === bm.length - 1 ? 'TTTT........TTTT' : r) : bm
  const cols = { B: color, w: '#2a2350', g: '#5d5a8a', L: brake > 0.5 ? '#ff3b3b' : '#8a1f28', k: '#efe6d6', d: '#2c2f4c', T: '#140f26' }
  x.save(); x.translate(cx, cy); x.scale(1 + 0.08 * flat, sq); x.translate(-cx, -cy)
  drawBits(x, rows, cols, cx, cy - h / 2, cell)
  x.restore()
  if (brake > 0.5) {
    x.save(); x.globalCompositeOperation = 'lighter'
    for (const s of [-1, 1]) {
      const lx = cx + s * cell * 5.5, ly = cy - h + (convertible ? 1.5 : 4.5) * cell * sq
      const g = x.createRadialGradient(lx, ly, 0, lx, ly, cell * 4)
      g.addColorStop(0, 'rgba(255,60,60,0.55)'); g.addColorStop(1, 'rgba(255,60,60,0)')
      x.fillStyle = g; x.beginPath(); x.arc(lx, ly, cell * 4, 0, Math.PI * 2); x.fill()
    }
    x.restore()
  }
}

// ── the freeway
export function drawRoad(x, t, { a = 1, flow = 0 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // asphalt
  const L = laneX(-1.6, 1.15), R = laneX(1.6, 1.15)
  const g = x.createLinearGradient(0, VP.y, 0, 1920)
  g.addColorStop(0, '#1d1638'); g.addColorStop(1, '#120d26')
  x.fillStyle = g; x.beginPath(); x.moveTo(VP.x - 6, VP.y); x.lineTo(VP.x + 6, VP.y); x.lineTo(R, roadY(1.15)); x.lineTo(L, roadY(1.15)); x.closePath(); x.fill()
  // edge lines (solid) + lane dashes (moving toward us by `flow`)
  for (const Lx of [-1.5, 1.5]) for (let i = 0; i < 60; i++) {
    const d = i / 50; const y = roadY(d); if (y > 1940) break
    const s = Math.max(3, d * 14); x.fillStyle = '#efe6d6'; x.fillRect(Math.round(laneX(Lx, d) - s / 2), Math.round(y), s, Math.max(3, d * 26))
  }
  for (const Lx of [-0.5, 0.5]) for (let i = 0; i < 14; i++) {
    const d = ((i / 12 + flow) % 1.17)
    const y0 = roadY(d), y1 = roadY(d + 0.035)
    if (y0 > 1940) continue
    const s = Math.max(3, d * 12)
    x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillRect(Math.round(laneX(Lx, d) - s / 2), Math.round(y0), s, Math.max(2, y1 - y0))
  }
  x.restore()
}

// ── overhead sign with a digital clock
export function drawGantry(x, t, label, clock, a = 1, y = 430) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  const P = 6, w = 560, h = 120, X = 540 - w / 2
  x.fillStyle = '#5d6288'; x.fillRect(X - 40, y + h / 2, 12, VP.y - y); x.fillRect(X + w + 28, y + h / 2, 12, VP.y - y)
  stepRect(x, X - P, y - P, w + 2 * P, h + 2 * P, P, INK2)
  stepRect(x, X, y, w, h, P, '#1f7a4c')
  x.strokeStyle = '#efe6d6'; x.lineWidth = 4; x.strokeRect(X + 10, y + 10, w - 20, h - 20)
  x.font = "700 40px 'Space Mono', monospace"; x.textBaseline = 'middle'
  x.fillStyle = '#efe6d6'; x.textAlign = 'left'; x.fillText(label, X + 30, y + h / 2 + 2)
  // clock panel
  x.fillStyle = '#0d0a1c'; x.fillRect(X + w - 214, y + 24, 186, h - 48)
  x.fillStyle = '#ffb648'; x.shadowColor = '#ffb648'; x.shadowBlur = 12; x.textAlign = 'center'; x.font = "700 38px 'Space Mono', monospace"
  x.fillText(clock, X + w - 121, y + h / 2 + 2)
  x.restore()
}
