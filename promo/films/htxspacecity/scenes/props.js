// htxspacecity · line-art props (bold, friendly, thick glowing strokes, flat 20–40% fills, no faces, no logos).
// Every draw fn is a pure function of its arguments (t only drives idle wobble).
import { clamp, lerp, rng, noise1 } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', BLUE = '#8fd8f6', ROSE = '#f59cc4', VIOLET = '#9a7be0', FIRE = '#f0603a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
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

// ───────────────────────── pixel-star sparkle burst
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

// ───────────────────────── a generic night skyline (no real tower shapes copied, no logos)
// x = centre, w = width, h = height above the base, top = roof style
const TOWERS = [
  { x: 40, w: 100, h: 300, top: 'flat' }, { x: 145, w: 92, h: 440, top: 'slant' }, { x: 248, w: 112, h: 560, top: 'step' },
  { x: 360, w: 96, h: 700, top: 'spire' }, { x: 478, w: 128, h: 820, top: 'pyramid' }, { x: 600, w: 106, h: 640, top: 'flat' },
  { x: 705, w: 92, h: 760, top: 'slant2' }, { x: 812, w: 116, h: 520, top: 'step' }, { x: 925, w: 100, h: 400, top: 'spire' },
  { x: 1035, w: 104, h: 300, top: 'flat' },
]
const WIN = TOWERS.map((b, i) => {
  const r = rng(40 + i), out = []
  const cols = Math.max(2, Math.floor((b.w - 30) / 24)), rows = Math.floor((b.h - 70) / 34)
  for (let rr = 0; rr < rows; rr++) for (let c = 0; c < cols; c++) if (r() < 0.42) out.push({ c, rr, cols, seed: r() * 100, gold: r() < 0.8 })
  return out
})
const ORDER = [4, 3, 6, 5, 2, 7, 1, 8, 0, 9]
function towerPath(ctx, b, h) {
  const l = b.x - b.w / 2, r = b.x + b.w / 2, y = -h
  ctx.beginPath(); ctx.moveTo(l, 0)
  switch (b.top) {
    case 'slant': ctx.lineTo(l, y + 40); ctx.lineTo(r, y); break
    case 'slant2': ctx.lineTo(l, y); ctx.lineTo(r, y + 50); break
    case 'step': ctx.lineTo(l, y + 50); ctx.lineTo(l + b.w * 0.2, y + 50); ctx.lineTo(l + b.w * 0.2, y); ctx.lineTo(r - b.w * 0.2, y); ctx.lineTo(r - b.w * 0.2, y + 50); ctx.lineTo(r, y + 50); break
    case 'spire': ctx.lineTo(l, y + 30); ctx.lineTo(b.x - 10, y + 10); ctx.lineTo(b.x, y - 60); ctx.lineTo(b.x + 10, y + 10); ctx.lineTo(r, y + 30); break
    case 'pyramid': ctx.lineTo(l, y + 60); ctx.lineTo(b.x, y - 20); ctx.lineTo(r, y + 60); break
    default: ctx.lineTo(l, y); ctx.lineTo(r, y)
  }
  ctx.lineTo(r, 0); ctx.closePath()
}
/** the skyline standing on baseY. k(i) 0..1 per tower (springs up), sc scales heights */
export function skyline(ctx, t, baseY, k = () => 1, { sc = 1, a = 1 } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.translate(0, baseY); ctx.globalAlpha = a
  // a warm city glow behind
  const g = ctx.createLinearGradient(0, -520 * sc, 0, 0)
  g.addColorStop(0, 'rgba(242,140,90,0)'); g.addColorStop(1, rgba('#f29a4a', 0.22 * a))
  ctx.fillStyle = g; ctx.fillRect(0, -520 * sc, 1080, 520 * sc)
  ORDER.forEach((i, j) => {
    const b = TOWERS[i], kk = k(j)
    if (kk <= 0) return
    const h = b.h * sc * kk
    ctx.save()
    towerPath(ctx, b, h)
    ctx.fillStyle = '#120c2c'; ctx.fill()
    ctx.fillStyle = rgba(VIOLET, 0.16); ctx.fill()
    ctx.clip()
    for (const wdw of WIN[i]) {
      const wx = b.x - (wdw.cols * 24) / 2 + wdw.c * 24 + 4, wy = -h + 70 + wdw.rr * 34
      if (wy > -16) continue
      const tw = 0.6 + 0.4 * noise1(t * 0.8 + wdw.seed, wdw.seed)
      ctx.fillStyle = rgba(wdw.gold ? '#ffd98a' : '#bfe6ff', 0.8 * tw)
      ctx.fillRect(wx, wy, 12, 16)
    }
    ctx.restore()
    towerPath(ctx, b, h); ctx.fillStyle = 'rgba(0,0,0,0)'
    ink(ctx, j < 2 ? '#c9a6ff' : '#b39ce8', { w: 5, fa: 0, glow: 14 })
    if (b.top === 'spire' || b.top === 'pyramid') {   // a blinking red aircraft light
      const on = Math.sin(t * 4 + i) > 0.2
      if (on) { ctx.fillStyle = '#ff5a5a'; ctx.shadowColor = '#ff5a5a'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(b.x, -h - (b.top === 'spire' ? 64 : 24), 6, 0, TAU); ctx.fill(); ctx.shadowBlur = 0 }
    }
  })
  // street line
  ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(1090, 0); ink(ctx, '#c9a6ff', { w: 6, fa: 0, glow: 12 })
  ctx.fillStyle = '#0b0620'; ctx.fillRect(0, 3, 1080, 400)
  ctx.restore()
}

// ───────────────────────── a generic rocket (≈ 380 px tall at s 1, nose up). fl 0..1 = flame strength
export function rocket(ctx, x, y, s, t, { rot = 0, fl = 1, a = 1, body = '#fff3e0' } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  if (fl > 0) {
    const L = (60 + 170 * fl) * (1 + 0.16 * Math.sin(t * 43) + 0.08 * Math.sin(t * 71))
    ctx.beginPath(); ctx.moveTo(-38, 150); ctx.quadraticCurveTo(-34, 150 + L * 0.6, 0, 150 + L); ctx.quadraticCurveTo(34, 150 + L * 0.6, 38, 150); ctx.closePath(); ink(ctx, FIRE, { w: 7, fa: 0.65, fill: '#ffb03a', glow: 30 })
    ctx.beginPath(); ctx.moveTo(-17, 150); ctx.quadraticCurveTo(0, 150 + L * 0.72, 17, 150); ink(ctx, '#ffe7a8', { w: 5, fa: 0.85, fill: '#fff3e0' })
  }
  ;[-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(d * 50, 40); ctx.lineTo(d * 108, 130); ctx.lineTo(d * 108, 168); ctx.lineTo(d * 50, 132); ctx.closePath(); ink(ctx, FIRE, { w: 8, fa: 0.5 }) })
  ctx.beginPath(); ctx.moveTo(-55, 150); ctx.lineTo(-55, -60); ctx.quadraticCurveTo(-55, -150, 0, -218); ctx.quadraticCurveTo(55, -150, 55, -60); ctx.lineTo(55, 150); ctx.closePath()
  ink(ctx, BONE, { w: 9, fa: 0.32, fill: body })
  ctx.beginPath(); ctx.moveTo(-44, -118); ctx.quadraticCurveTo(0, -102, 44, -118); ink(ctx, PINK, { w: 7, fa: 0, glow: 10 })
  ctx.beginPath(); ctx.arc(0, -22, 27, 0, TAU); ink(ctx, BLUE, { w: 8, fa: 0.55 })
  ctx.beginPath(); ctx.roundRect(-40, 150, 80, 16, 4); ink(ctx, BONE, { w: 5, fa: 0.4 })
  ctx.restore()
}
/** billowing smoke puffs at a launch point; p 0..1 grows them */
export function smoke(ctx, x, y, t, p, a = 1, spread = 220) {
  if (p <= 0 || a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  for (let k = 0; k < 9; k++) {
    const d = (k - 4) / 4, r = (34 + 34 * (1 - Math.abs(d)) + 12 * ((k * 7) % 3)) * (0.4 + p)
    ctx.beginPath(); ctx.arc(x + d * spread * p, y - (20 + 50 * (1 - Math.abs(d)) + 18 * (k % 2)) * p + 5 * Math.sin(t * 3 + k), r, 0, TAU)
    ink(ctx, BONE, { w: 5, fa: 0.4, glow: 8, fill: '#d9cfe8' })
  }
  ctx.restore()
}

// ───────────────────────── a generic swipe-app profile card (pictogram silhouette, no face, no brand)
export function swipeCard(ctx, x, y, s, rot, col, a = 1, sq = 1) {
  if (a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s / sq, s * sq); ctx.globalAlpha *= a
  const w = 120, h = 168
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16)
  ctx.fillStyle = '#1a1236'; ctx.fill(); ink(ctx, col, { w: 6, fa: 0.22, glow: 12 })
  ctx.fillStyle = rgba(col, 0.75)
  ctx.beginPath(); ctx.arc(0, -36, 20, 0, TAU); ctx.fill()
  ctx.beginPath(); ctx.moveTo(-36, 14); ctx.quadraticCurveTo(-34, -12, 0, -12); ctx.quadraticCurveTo(34, -12, 36, 14); ctx.closePath(); ctx.fill()
  ctx.fillStyle = rgba(BONE, 0.5); ctx.fillRect(-38, 34, 76, 9); ctx.fillRect(-38, 52, 50, 9)
  ctx.restore()
}

// ───────────────────────── a pictogram person holding an umbrella (no face). (x, y) = feet
export function umbrellaPerson(ctx, x, y, s, t, { a = 1, tilt = 0 } = {}) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  // body
  ctx.beginPath(); ctx.moveTo(-46, 0); ctx.lineTo(-40, -150); ctx.quadraticCurveTo(-40, -186, 0, -188); ctx.quadraticCurveTo(40, -186, 40, -150); ctx.lineTo(46, 0); ctx.closePath()
  ink(ctx, BONE, { w: 8, fa: 0.3, fill: '#c9a6ff' })
  ctx.beginPath(); ctx.arc(0, -232, 36, 0, TAU); ink(ctx, BONE, { w: 8, fa: 0.85, fill: BONE })
  // arm up to the handle
  ctx.beginPath(); ctx.moveTo(30, -150); ctx.lineTo(58, -210); ink(ctx, BONE, { w: 12, fa: 0, glow: 8 })
  // umbrella (pivots at the hand)
  ctx.translate(60, -214); ctx.rotate(tilt)
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(0, -150); ink(ctx, BONE, { w: 7, fa: 0, glow: 8 })
  ctx.beginPath(); ctx.arc(-14, 30, 14, 0, Math.PI); ink(ctx, BONE, { w: 7, fa: 0, glow: 8 })
  ctx.translate(0, -150)
  ctx.beginPath(); ctx.moveTo(-190, 40); ctx.quadraticCurveTo(-180, -150, 0, -160); ctx.quadraticCurveTo(180, -150, 190, 40)
  for (let k = 4; k >= 0; k--) { const x0 = -190 + k * 76, x1 = x0 + 76; ctx.lineTo(x1, 40); ctx.quadraticCurveTo((x0 + x1) / 2, 6, x0, 40) }
  ctx.closePath(); ink(ctx, PINK, { w: 9, fa: 0.42, glow: 22 })
  ctx.beginPath(); ctx.moveTo(-114, 30); ctx.quadraticCurveTo(-90, -110, 0, -158); ctx.moveTo(114, 30); ctx.quadraticCurveTo(90, -110, 0, -158); ink(ctx, PINK, { w: 5, fa: 0, glow: 6 })
  ctx.beginPath(); ctx.moveTo(0, -160); ctx.lineTo(0, -184); ink(ctx, BONE, { w: 7, fa: 0, glow: 6 })
  ctx.restore()
}
/** where a falling thing at x hits the umbrella canopy (or null); canopy is centred at (cx, cy) with half-width hw */
export const canopyY = (x, cx, cy, hw) => Math.abs(x - cx) > hw ? null : cy - 150 * Math.sqrt(1 - ((x - cx) / hw) ** 2) * 0.95

// ───────────────────────── a glowing orb with a pixel glint
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

/** heart curve (classic), u in [0, 1] starting at the bottom tip and going round anticlockwise on screen; returns unit coords */
export function heartAt(u) {
  const th = Math.PI + u * TAU
  const x = 16 * Math.pow(Math.sin(th), 3)
  const y = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th))
  return { x, y }
}
export { easeOutBack, lerp }
