// srhtxloops · props: helpers copied from srcitynyc/scenes/props.js (ink, sparkle, chip, the star transform, tears, asides)
// plus a tiny pixel car and a passport. Every draw fn is a pure function of its arguments.
import { clamp, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', BLUE = '#8fd8f6', ROSE = '#f59cc4', VIOLET = '#9a7be0', LAV = '#c9a6ff', AMBER = '#ffb86b'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = rgba(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}

// ── pixel-star sparkle burst
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(ctx, x, y, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  ctx.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

// ── a glowing orb with a soft halo
export function orb(ctx, px, py, r, color, a = 1, halo = 3.2) {
  if (a <= 0 || r <= 0.5) return
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = ctx.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, hr, 0, TAU); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = a
  const s = ctx.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  ctx.fillStyle = s; ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill()
  ctx.restore()
}

/** a label chip (mono caps on a dark pill) centred at (x, y) */
export function chip(ctx, x, y, text, k, { size = 26, col = BONE, edge = LAV } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + size * 1.1, h = size * 1.6
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
  ctx.fillStyle = 'rgba(14,9,34,0.88)'; ctx.fill(); ink(ctx, edge, { w: 3, fa: 0, glow: 10 })
  ctx.fillStyle = col; ctx.fillText(text, 0, 1)
  ctx.restore()
}

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar; from stelevator's kit)
const G = 36, HALF = 18
const SC = { y: 19.6, R: 17.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
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
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]
const INKC = '#1b1236'
/** tears from both eyes (cells). k: 0 none · 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INKC; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
/** a pixel speech chip with a little tail toward (tx, ty) (Pisces' asides) */
export function aside(ctx, x, y, text, k, { size = 30, col = BONE, edge = '#c9a6ff', tx = null, ty = null } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + 36, h = size + 26
  if (tx !== null) { ctx.fillStyle = INKC; ctx.beginPath(); ctx.moveTo(-14, h / 2 - 2); ctx.lineTo((tx - x) / k * 0.35, (ty - y) / k * 0.6); ctx.lineTo(14, h / 2 - 2); ctx.fill() }
  ctx.fillStyle = INKC; ctx.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  ctx.fillStyle = 'rgba(20,12,44,0.97)'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = edge; ctx.fillRect(-w / 2, h / 2 - 5, w, 5)
  ctx.fillStyle = col; ctx.fillText(text, 0, 2)
  ctx.restore()
}

// ───────────────────────────────────────── a tiny toy car (seen from the side, nose to +x), centred at (0, 0) after translate
/** draws a little car of width w at (x, y) rotated by rot (radians), colour col; t spins the wheels */
export function toyCar(ctx, x, y, w, rot, col, t, { a = 1, flip = false } = {}) {
  if (a <= 0) return
  const h = w * 0.42
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); if (flip) ctx.scale(1, -1); ctx.globalAlpha *= a
  ctx.beginPath(); ctx.roundRect(-w / 2, -h * 0.55, w, h * 0.6, h * 0.18)
  ink(ctx, BONE, { w: Math.max(3, w * 0.035), fa: 0.95, fill: col, glow: 10 })
  ctx.beginPath(); ctx.moveTo(-w * 0.28, -h * 0.55); ctx.lineTo(-w * 0.16, -h * 1.0); ctx.lineTo(w * 0.2, -h * 1.0); ctx.lineTo(w * 0.32, -h * 0.55); ctx.closePath()
  ink(ctx, BONE, { w: Math.max(3, w * 0.03), fa: 0.85, fill: '#bfe6ff', glow: 6 })
  for (const d of [-0.28, 0.28]) {
    ctx.save(); ctx.translate(d * w, h * 0.06); ctx.rotate(t * 9)
    ctx.beginPath(); ctx.arc(0, 0, h * 0.24, 0, TAU); ink(ctx, BONE, { w: Math.max(2, w * 0.025), fa: 1, fill: '#1b1236', glow: 4 })
    ctx.fillStyle = BONE; ctx.fillRect(-h * 0.04, -h * 0.2, h * 0.08, h * 0.4)
    ctx.restore()
  }
  ctx.fillStyle = '#ffe7a8'; ctx.shadowColor = '#ffe7a8'; ctx.shadowBlur = 14; ctx.fillRect(w * 0.44, -h * 0.4, w * 0.07, h * 0.16); ctx.shadowBlur = 0
  ctx.restore()
}

// ───────────────────────────────────────── a passport (pixel booklet with a gold star), centred at (x, y)
export function passport(ctx, x, y, s, rot, a = 1) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = '#1b1236'; ctx.fillRect(-58, -78, 116, 156)
  ctx.fillStyle = '#2a3f8f'; ctx.fillRect(-52, -72, 104, 144)
  ctx.fillStyle = '#3b55b8'; ctx.fillRect(-52, -72, 12, 144)
  drawPixelStar(ctx, 6, -14, 46, 0, GOLD)
  ctx.fillStyle = GOLD; ctx.font = `700 15px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('PASSPORT', 6, 42)
  ctx.fillRect(-26, 56, 64, 4)
  ctx.restore()
}
