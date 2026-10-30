// srhtxgameday props — pixel drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells   the stlive5th star-seated helpers (same maths as startalk.js).
//   heart / bench / chartRing                        the film's props.
import { clamp, lerp } from '../../../src/lib.js'
const INK = '#1b1236'
export const RED = '#ff4d4a', GREEN = '#5df29a', BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', CYAN = '#8fd8f6'
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

// ── headset: band over the top point, two cups, and a little boom mic on the left cup
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
// sweat drop on the right temple (cells)
export function sweatCells(ctx, t) {
  const ph = (t * 1.3) % 1
  const j = 12 + ph * 6
  ctx.fillStyle = INK; ctx.fillRect(28.6, j - 1.2, 1.8, 2.6)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(28.9, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(28.9, j - 0.9, 0.5, 0.5)
}


// ─────────────────────────────────────────────── the film's props
export const VIOLET = '#c9a6ff', AMBER = '#ffb36b', TEAL = '#2fd6c4', BLUE = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const TAU = Math.PI * 2
export const rgba = (hex, a) => `rgba(${[1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(',')},${clamp(a)})`

export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

/** a pixel heart centred on (px, py), cell size c */
export function heart(x, px, py, c, a = 1, col = PINK) {
  const B = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  x.save(); x.globalAlpha *= a
  for (let j = 0; j < B.length; j++) for (let i = 0; i < 7; i++) if (B[j][i] === 'X') {
    x.fillStyle = INK; x.fillRect(px + (i - 3.5) * c - 2, py + (j - 3) * c - 2, c + 4, c + 4)
  }
  for (let j = 0; j < B.length; j++) for (let i = 0; i < 7; i++) if (B[j][i] === 'X') {
    x.fillStyle = (i === 1 && j === 1) ? '#fff' : col; x.fillRect(px + (i - 3.5) * c, py + (j - 3) * c, c, c)
  }
  x.restore()
}


/** a pixel bleacher bench across the frame at y (top edge), pixel P */
export function bench(x, y, a = 1) {
  const P = 8
  x.save(); x.globalAlpha *= a
  x.fillStyle = '#120a28'; x.fillRect(0, y, 1080, P * 5)
  x.fillStyle = '#3a2a66'; x.fillRect(0, y, 1080, P * 2)
  x.fillStyle = rgba(BONE, 0.35); x.fillRect(0, y, 1080, 3)
  for (let i = 0; i < 1080; i += 135) { x.fillStyle = '#0a0618'; x.fillRect(i + 60, y + P * 2, P * 2, P * 3) }
  x.restore()
}

/** a small chart ring (12 ticks + glyph-free wheel) spinning round (cx, cy) */
export function chartRing(x, cx, cy, R, t, k = 1, col = GOLD) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.globalAlpha *= k; x.rotate(t * 0.6)
  x.strokeStyle = col; x.shadowColor = col; x.shadowBlur = 16; x.lineWidth = 4
  x.beginPath(); x.arc(0, 0, R * k, 0, Math.PI * 2); x.stroke()
  x.globalAlpha *= 0.6; x.beginPath(); x.arc(0, 0, R * k * 0.84, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * R * k * 0.84, Math.sin(a) * R * k * 0.84); x.lineTo(Math.cos(a) * R * k, Math.sin(a) * R * k); x.stroke() }
  x.restore()
}
