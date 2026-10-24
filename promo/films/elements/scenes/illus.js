// elements · line-art (copied from dummies part c, plus a wave and a stopwatch) · illustrations (bold, friendly, thick glowing strokes, flat 20–40% fills, no faces).
// Every draw fn takes a canvas ctx and draws around (x, y) at scale s; time t drives idle wobble only (pure fn of t).
import { mix } from '../../../src/lib.js'
import { ELEMENT_COLOR } from '../../wheel.js'

export const BONE = '#efe6d6'
const VS = '︎'
export const hexA = (hex, a) => hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0')

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
export function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }

// ───────────────────────── element icons (≈ 260 px tall at s 1)
function flamePath(ctx, w, h, wob) {
  ctx.beginPath()
  ctx.moveTo(0, h * 0.42)
  ctx.bezierCurveTo(-w * 0.62, h * 0.42, -w * 0.64, -h * 0.02, -w * 0.3, -h * 0.24)
  ctx.bezierCurveTo(-w * 0.16, -h * 0.33, -w * 0.06 + wob * 0.3, -h * 0.42, wob, -h * 0.6)
  ctx.bezierCurveTo(w * 0.22 + wob * 0.3, -h * 0.38, w * 0.64, -h * 0.2, w * 0.56, h * 0.12)
  ctx.bezierCurveTo(w * 0.5, h * 0.36, w * 0.26, h * 0.42, 0, h * 0.42)
  ctx.closePath()
}
/** a flame; roar 0–1 makes it flicker harder and lean (as if blown from the left) */
export function flame(ctx, x, y, s, t, { a = 1, roar = 0, seed = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.fire
  const f = 9 + 8 * roar
  const wob = 14 * Math.sin(t * f + seed) + 6 * Math.sin(t * f * 1.7 + seed * 2) + 40 * roar
  const sq = 1 + (0.04 + 0.05 * roar) * Math.sin(t * f * 1.3 + seed)
  begin(ctx, x, y, s, a)
  ctx.scale(1 / sq, sq)
  // outer glow blob
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 220)
  g.addColorStop(0, hexA(col, 0.35 + 0.2 * roar)); g.addColorStop(1, hexA(col, 0))
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -10, 220, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  flamePath(ctx, 200, 270, wob); ink(ctx, col, { w: 8, fa: 0.3 })
  ctx.translate(0, 52); flamePath(ctx, 96, 140, wob * 0.6); ink(ctx, '#ffc861', { w: 6, fa: 0.45, glow: 12 })
  ctx.restore()
}

/** a mountain; sprout 0–1 grows a stem with leaves from the main peak, bloom 0–1 opens a flower on top */
export function mountain(ctx, x, y, s, t, { a = 1, sprout = 0.35, bloom = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.earth
  begin(ctx, x, y, s, a)
  ctx.beginPath(); ctx.moveTo(-170, 100); ctx.lineTo(-55, -40); ctx.lineTo(-10, 10); ctx.lineTo(60, -95); ctx.lineTo(175, 100); ctx.closePath()
  ink(ctx, col, { w: 8, fa: 0.3 })
  // snowy ridge line
  ctx.beginPath(); ctx.moveTo(30, -50); ctx.lineTo(60, -95); ctx.lineTo(90, -50); ink(ctx, mix(col, '#ffffff', 0.5), { w: 6, fa: 0, glow: 8 })
  ctx.beginPath(); ctx.moveTo(-200, 100); ctx.lineTo(205, 100); ink(ctx, col, { w: 8, fa: 0 })
  if (sprout > 0.01) {
    const green = '#5fdc7a', top = -95, hgt = 170 * sprout, sw = 6 * Math.sin(t * 2.4) * sprout
    ctx.beginPath(); ctx.moveTo(60, top); ctx.quadraticCurveTo(60 + 22, top - hgt * 0.5, 60 + sw, top - hgt)
    ink(ctx, green, { w: 7, fa: 0 })
    const leaf = (lx, ly, ang, L) => { ctx.save(); ctx.translate(lx, ly); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(L * 0.5, 0, L * 0.5, L * 0.22, 0, 0, Math.PI * 2); ink(ctx, green, { w: 5, fa: 0.4, glow: 10 }); ctx.restore() }
    const L = 70 * Math.min(1, sprout * 1.4)
    leaf(66, top - hgt * 0.45, -0.6, L); leaf(70, top - hgt * 0.62, Math.PI + 0.5, L * 0.85)
    if (bloom > 0.01) {
      const fx = 60 + sw, fy = top - hgt
      ctx.save(); ctx.translate(fx, fy); ctx.scale(bloom, bloom); ctx.rotate(t * 0.6)
      for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; ctx.beginPath(); ctx.ellipse(Math.cos(an) * 26, Math.sin(an) * 26, 22, 14, an, 0, Math.PI * 2); ink(ctx, '#ff7fb0', { w: 5, fa: 0.45, glow: 12 }) }
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ink(ctx, '#f2c75c', { w: 5, fa: 0.8, glow: 12 })
      ctx.restore()
    }
  }
  ctx.restore()
}

/** a wind swirl (three curled gust lines) */
export function wind(ctx, x, y, s, t, { a = 1, puff = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.air
  begin(ctx, x + 8 * Math.sin(t * 2.2), y, s * (1 + 0.08 * puff), a)
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 200)
  g.addColorStop(0, hexA(col, 0.22)); g.addColorStop(1, hexA(col, 0))
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 200, 0, Math.PI * 2); ctx.fill(); ctx.globalCompositeOperation = 'source-over'
  const w = 6 * Math.sin(t * 3)
  ctx.beginPath(); ctx.moveTo(-160, -55 + w * 0.3); ctx.lineTo(60, -55); ctx.arc(60, -95, 40, Math.PI / 2, Math.PI / 2 - 1.6 * Math.PI, true); ink(ctx, col, { w: 9, fa: 0 })
  ctx.beginPath(); ctx.moveTo(-190, 10 - w * 0.3); ctx.lineTo(115, 10); ctx.arc(115, -22, 32, Math.PI / 2, Math.PI / 2 - 1.5 * Math.PI, true); ink(ctx, col, { w: 9, fa: 0 })
  ctx.beginPath(); ctx.moveTo(-140, 75 + w * 0.3); ctx.lineTo(30, 75); ctx.arc(30, 108, 33, -Math.PI / 2, -Math.PI / 2 + 1.5 * Math.PI); ink(ctx, col, { w: 9, fa: 0 })
  ctx.restore()
}

/** gust streaks flowing from (x0,y) to (x1,y) */
export function gusts(ctx, x0, x1, y, t, a) {
  if (a <= 0.003) return
  const col = ELEMENT_COLOR.air
  ctx.save(); ctx.globalAlpha *= a
  for (let i = 0; i < 4; i++) {
    const yy = y - 90 + i * 60, ph = i * 1.3
    ctx.beginPath()
    for (let k = 0; k <= 24; k++) { const u = k / 24, xx = x0 + (x1 - x0) * u; const v = yy + 16 * Math.sin(u * 7 + t * 9 + ph); k ? ctx.lineTo(xx, v) : ctx.moveTo(xx, v) }
    ctx.setLineDash([70, 50]); ctx.lineDashOffset = -t * 520 - i * 40
    ink(ctx, col, { w: 6, fa: 0, glow: 14 })
  }
  ctx.restore()
}

function dropPath(ctx) {
  ctx.beginPath(); ctx.moveTo(0, -130)
  ctx.bezierCurveTo(40, -70, 92, -12, 92, 38); ctx.arc(0, 38, 92, 0, Math.PI); ctx.bezierCurveTo(-92, -12, -40, -70, 0, -130); ctx.closePath()
}
/** a water drop (stretch > 1 elongates it while falling) */
export function drop(ctx, x, y, s, t, { a = 1, stretch = 1 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.water
  begin(ctx, x, y + 4 * Math.sin(t * 2.6), s, a)
  ctx.scale(1 / Math.sqrt(stretch), stretch)
  dropPath(ctx); ink(ctx, '#5f95ff', { w: 8, fa: 0.32, fill: col })
  ctx.beginPath(); ctx.arc(-6, 40, 56, Math.PI * 1.05, Math.PI * 1.45); ink(ctx, '#cfe0ff', { w: 7, fa: 0, glow: 10 })
  ctx.restore()
}
/** a splash ring of little droplets at (x, y), p 0–1 */
export function splash(ctx, x, y, p) {
  if (p <= 0 || p >= 1) return
  ctx.save(); ctx.globalAlpha *= 1 - p
  for (let i = 0; i < 7; i++) {
    const an = Math.PI + (i / 6) * Math.PI, d = 30 + 110 * p
    ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d * 0.7 + 60 * p * p, 9 * (1 - p * 0.5), 0, Math.PI * 2)
    ink(ctx, '#5f95ff', { w: 4, fa: 0.6, fill: '#5f95ff', glow: 10 })
  }
  ctx.restore()
}

// ───────────────────────── water: a curling wave (≈ 460 wide × 260 tall at s 1). surge 0–1 lifts and curls the crest.
export function wave(ctx, x, y, s, t, { a = 1, surge = 0 } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  const col = ELEMENT_COLOR.water, lite = '#5f95ff', foam = '#cfe0ff'
  begin(ctx, x, y, s, a)
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 240)
  g.addColorStop(0, hexA(col, 0.3 + 0.15 * surge)); g.addColorStop(1, hexA(col, 0))
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 240, 0, Math.PI * 2); ctx.fill(); ctx.globalCompositeOperation = 'source-over'
  const b = 6 * Math.sin(t * 2.6), h = 1 + 0.22 * surge, k = 14 * surge   // bob, crest height, extra curl
  ctx.save(); ctx.scale(1, h)
  ctx.beginPath()
  ctx.moveTo(-230, 120 / h); ctx.lineTo(-230, 62 + b)
  ctx.bezierCurveTo(-150, 58 + b, -95, 12, -55, -50)
  ctx.bezierCurveTo(-15, -112, 55, -140, 112, -122)
  ctx.bezierCurveTo(168 + k, -104, 192 + k, -42, 152 + k, -8)
  ctx.bezierCurveTo(122 + k, 16, 84, -2, 90, -34)
  ctx.bezierCurveTo(92, -52, 112, -60, 124, -50)
  ctx.bezierCurveTo(106, -42, 102, -20, 112, -4)
  ctx.bezierCurveTo(70, 18, 130, 72, 230, 74 - b)
  ctx.lineTo(230, 120 / h); ctx.closePath()
  ink(ctx, lite, { w: 8, fa: 0.32, fill: col })
  // the foam line along the crest
  ctx.beginPath(); ctx.moveTo(-40, -70); ctx.bezierCurveTo(0, -112, 60, -126, 108, -110); ink(ctx, foam, { w: 6, fa: 0, glow: 10 })
  ctx.restore()
  // ripples in the body
  for (let i = 0; i < 2; i++) {
    const yy = 96 + i * 0, x0 = i ? 20 : -200, x1 = i ? 200 : -20
    ctx.beginPath()
    for (let q = 0; q <= 16; q++) { const u = q / 16, xx = x0 + (x1 - x0) * u, v = yy + 9 * Math.sin(u * 9 + t * 5 + i * 2); q ? ctx.lineTo(xx, v) : ctx.moveTo(xx, v) }
    ink(ctx, foam, { w: 5, fa: 0, glow: 8 })
  }
  // spray off the crest
  if (surge > 0.02) {
    for (let i = 0; i < 9; i++) {
      const an = -2.1 + i * 0.27 + 0.12 * Math.sin(i * 7.3), d = (30 + 22 * ((i * 5) % 4) + 70 * surge) * (1 + 0.08 * Math.sin(t * 6 + i))
      ctx.beginPath(); ctx.arc(150 + Math.cos(an) * d, -120 * h + Math.sin(an) * d * 0.8, (5 + 3 * ((i * 3) % 3)) * surge, 0, Math.PI * 2)
      ink(ctx, foam, { w: 3, fa: 0.8, fill: foam, glow: 10 })
    }
  }
  ctx.restore()
}

// ───────────────────────── a stopwatch (face r 100 at s 1). frac 0–1 = elapsed (gold pie + hand); num = optional numeral
export function stopwatch(ctx, x, y, s, frac, { a = 1, num = null, rot = 0, col = '#f2c75c' } = {}) {
  if (a <= 0.003 || s <= 0.01) return
  begin(ctx, x, y, s, a, rot)
  ctx.beginPath(); ctx.roundRect(-22, -142, 44, 26, 8); ink(ctx, col, { w: 7, fa: 0.4 })
  ctx.beginPath(); ctx.moveTo(0, -116); ctx.lineTo(0, -102); ink(ctx, col, { w: 9, fa: 0 })
  ctx.save(); ctx.rotate(0.8); ctx.beginPath(); ctx.roundRect(-12, -126, 24, 20, 6); ink(ctx, col, { w: 6, fa: 0.4 }); ctx.restore()
  ctx.beginPath(); ctx.arc(0, 0, 100, 0, Math.PI * 2); ink(ctx, col, { w: 9, fa: 0.16, fill: '#6a4fc2' })
  if (frac > 0.001) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 80, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2); ctx.closePath(); ctx.fillStyle = hexA(col, 0.3); ctx.fill() }
  ctx.beginPath(); for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; ctx.moveTo(Math.cos(an) * 80, Math.sin(an) * 80); ctx.lineTo(Math.cos(an) * 90, Math.sin(an) * 90) } ink(ctx, BONE, { w: 5, fa: 0, glow: 6 })
  if (num != null) {
    ctx.font = `800 92px Inter, 'Helvetica Neue', Arial, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = BONE; ctx.shadowColor = 'rgba(11,6,32,0.9)'; ctx.shadowBlur = 12; ctx.fillText(String(num), 0, 6); ctx.shadowBlur = 0
  }
  const an = -Math.PI / 2 + frac * Math.PI * 2
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * 76, Math.sin(an) * 76); ink(ctx, '#f0603a', { w: 7, fa: 0, glow: 12 })
  ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2); ink(ctx, '#f0603a', { w: 4, fa: 1, glow: 10 })
  ctx.restore()
}
