// srvotemap · line-art props (copied from votemap): ink, orb, sparkle, chip.
// Every draw fn is a pure function of its arguments.
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

/** a pictogram person (no face), feet at (x, y), ~270 units tall at s = 1 */
export function person(ctx, x, y, s, { body = LAV, line = BONE, a = 1, sq = 1, w = 8 } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s / sq, s * sq); ctx.globalAlpha *= a
  ctx.beginPath(); ctx.moveTo(-46, 0); ctx.lineTo(-40, -150); ctx.quadraticCurveTo(-40, -186, 0, -188); ctx.quadraticCurveTo(40, -186, 40, -150); ctx.lineTo(46, 0); ctx.closePath()
  ink(ctx, line, { w, fa: 0.45, fill: body, glow: 10 })
  ctx.beginPath(); ctx.arc(0, -232, 36, 0, TAU); ink(ctx, line, { w, fa: 0.9, fill: line, glow: 10 })
  ctx.restore()
}

/** a map pin, tip at (x, y), head radius r */
export function pin(ctx, x, y, r, col, a = 1) {
  if (a <= 0 || r <= 0) return
  const d = 1.75 * r, b = Math.acos(r / d)
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y)
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, -d, r, Math.PI / 2 + b, Math.PI / 2 - b + TAU); ctx.closePath()
  ink(ctx, col, { w: Math.max(2, r * 0.22), fa: 0.85, glow: r * 0.8 })
  ctx.beginPath(); ctx.arc(0, -d, r * 0.42, 0, TAU); ctx.fillStyle = '#fff6ea'; ctx.fill()
  ctx.restore()
}

/** a magnifying glass: lens centred at (x, y), radius R; inner(ctx) draws the magnified view (clipped) */
export function magnifier(ctx, x, y, R, s, inner) {
  if (s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  // handle
  ctx.save(); ctx.rotate(Math.PI / 4)
  ctx.beginPath(); ctx.roundRect(R + 4, -22, 150, 44, 20); ink(ctx, BONE, { w: 8, fa: 0.55, fill: VIOLET, glow: 14 })
  ctx.restore()
  // glass
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.clip()
  ctx.fillStyle = 'rgba(16,10,40,0.92)'; ctx.fillRect(-R, -R, 2 * R, 2 * R)
  inner(ctx)
  const g = ctx.createRadialGradient(-R * 0.4, -R * 0.5, 4, 0, 0, R)
  g.addColorStop(0, 'rgba(255,255,255,0.10)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g; ctx.fillRect(-R, -R, 2 * R, 2 * R)
  ctx.restore()
  ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ink(ctx, BONE, { w: 16, fa: 0, glow: 26 })
  ctx.beginPath(); ctx.arc(0, 0, R - 26, -2.5, -1.75); ink(ctx, 'rgba(255,255,255,0.7)', { w: 7, fa: 0, glow: 0 })
  ctx.restore()
}

/** a plain freeway shield (no official marks), centred at (x, y), height h */
export function shield(ctx, x, y, h, label, col, a = 1) {
  if (a <= 0 || h <= 0) return
  const w = h * (label.length > 1 ? 1.12 : 0.9)
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y)
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, -h / 2); ctx.lineTo(w / 2, h * 0.08)
  ctx.quadraticCurveTo(w / 2, h * 0.4, 0, h / 2); ctx.quadraticCurveTo(-w / 2, h * 0.4, -w / 2, h * 0.08); ctx.closePath()
  ctx.fillStyle = '#120c2c'; ctx.fill(); ink(ctx, col, { w: Math.max(2, h * 0.07), fa: 0.25, glow: 12 })
  ctx.fillStyle = BONE; ctx.font = `700 ${Math.round(h * 0.44)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(label, 0, -h * 0.04)
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
