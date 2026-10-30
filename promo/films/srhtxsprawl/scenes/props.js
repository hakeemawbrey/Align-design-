// srhtxsprawl props — drawings for this film only (STARTALK2.md: props live in your own folder). Pure f(args); nothing
// touches `document` at load. The star helpers (starFrame / inSprite / tears / sweat) mirror startalk.js maths so they
// stay seated on a star through hops and squash; the map, lens, crowd and chips are simple line art for this film.
import { clamp, lerp, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', FIRE = '#f0603a', INK = '#1a1430'
export const DULL = '#b9b3d6', LAV = '#c9a6ff', BLUE = '#8fd8f6', ROSE = '#f59cc4', MINT = '#7af0b8'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

// ── star transform (mirrors startalk.js drawStarChar)
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
/** a cell (i, j) of a star's sprite → world coords */
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]

// tears (cells): k 1 sniffle · 2 streams · 3 fountains
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
  }
}
// sweat drop on the right temple (cells)
export function sweatCells(ctx, t) {
  const ph = (t * 1.3) % 1, j = 12 + ph * 6
  ctx.fillStyle = INK; ctx.fillRect(28.6, j - 1.2, 1.8, 2.6)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(28.9, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(28.9, j - 0.9, 0.5, 0.5)
}

/** a little pictogram person (head + shoulders), centred bottom at (x, y), height ≈ 90·s */
export function mini(x, px, py, s, col, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(px, py); x.scale(s, s)
  x.beginPath(); x.moveTo(-26, 0); x.lineTo(-26, -34); x.quadraticCurveTo(-26, -56, 0, -56); x.quadraticCurveTo(26, -56, 26, -34); x.lineTo(26, 0); x.closePath()
  ink(x, col, { w: 4, fa: 0.4, glow: 6 })
  x.beginPath(); x.arc(0, -74, 15, 0, TAU); ink(x, col, { w: 4, fa: 0.5, glow: 6 })
  x.restore()
}

/** the magnifying glass: lens at (cx, cy), radius R, handle toward angle ang; inner(x) draws the magnified view */
export function lens(x, cx, cy, R, ang, a, inner) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // handle
  const hx = cx + Math.cos(ang) * R, hy = cy + Math.sin(ang) * R
  x.beginPath(); x.moveTo(hx, hy); x.lineTo(hx + Math.cos(ang) * R * 0.75, hy + Math.sin(ang) * R * 0.75)
  x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 34; x.stroke(); x.strokeStyle = '#a27a4a'; x.lineWidth = 24; x.stroke()
  // glass
  x.save(); x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.clip()
  x.fillStyle = 'rgba(16,10,40,0.92)'; x.fillRect(cx - R, cy - R, 2 * R, 2 * R)
  const g = x.createRadialGradient(cx, cy, R * 0.2, cx, cy, R); g.addColorStop(0, 'rgba(143,216,246,0.18)'); g.addColorStop(1, 'rgba(143,216,246,0.04)')
  x.fillStyle = g; x.fillRect(cx - R, cy - R, 2 * R, 2 * R)
  if (inner) inner(cx, cy, R)
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.beginPath(); x.ellipse(cx - R * 0.35, cy - R * 0.45, R * 0.4, R * 0.16, -0.6, 0, TAU); x.fill()
  x.restore()
  x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.strokeStyle = INK; x.lineWidth = 22; x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 12; x.shadowColor = GOLD; x.shadowBlur = 16; x.stroke(); x.shadowBlur = 0
  x.restore()
}

/** a text chip (rounded, dark, coloured rim) centred at (cx, cy), popped by k */
export function chip(x, cx, cy, text, k, { size = 26, col = BONE, edge = LAV, a = 1 } = {}) {
  if (k <= 0.01 || a <= 0) return
  x.save(); x.globalAlpha *= a * clamp(k * 2); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + size * 1.2, h = size * 1.7
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.fillStyle = 'rgba(16,10,36,0.9)'; x.fill(); ink(x, edge, { w: 3, fa: 0, glow: 10 })
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

/** the YOU map pin */
export function pin(x, px, py, r, col, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(px, py)
  x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(-r * 0.9, -r * 1.2, -r, -r * 2.6, 0, -r * 2.6); x.bezierCurveTo(r, -r * 2.6, r * 0.9, -r * 1.2, 0, 0); x.closePath()
  ink(x, col, { w: 5, fa: 0.9, glow: 18 })
  x.beginPath(); x.arc(0, -r * 1.75, r * 0.38, 0, TAU); x.fillStyle = INK; x.fill()
  x.restore()
}
