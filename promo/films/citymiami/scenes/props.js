// citymiami · line-art props: neon palm, generic deco hotels, the night ocean, a traveller + rolling suitcase,
// a pictogram person, a heart, sparkles. Bold, friendly, thick glowing strokes over flat fills; no faces, no brands.
// Pure functions of their args.
import { clamp, lerp, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff4fa3', ROSE = '#ff8fb1', TEAL = '#3ff0d8', AQUA = '#8fd8f6',
  RED = '#ff3d4d', VIOLET = '#c9a6ff', SUN = '#ff9a4a', LIME = '#c8ff6a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 8, fa = 0.3, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

// ───────────────────────── pixel-star sparkle burst
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

// ───────────────────────── neon palm (base at 0,0, ~h tall). lean bends the trunk; sway moves the fronds.
export function palm(x, t, { h = 600, lean = 0.18, trunk = PINK, frond = TEAL, sway = 1, seed = 0 } = {}) {
  const topX = lean * h, topY = -h
  const cx = lean * h * 0.15, cy = -h * 0.55
  // trunk: a thick glowing curve + ring ticks
  x.beginPath(); x.moveTo(-6, 0); x.quadraticCurveTo(cx, cy, topX, topY)
  ink(x, trunk, { w: 22, fa: 0, glow: 26 })
  x.save(); x.strokeStyle = rgba('#2a0b2a', 0.9); x.lineWidth = 5; x.lineCap = 'round'
  for (let i = 1; i < 12; i++) {
    const u = i / 12, px = lerp(lerp(-6, cx, u), lerp(cx, topX, u), u), py = lerp(lerp(0, cy, u), lerp(cy, topY, u), u)
    x.beginPath(); x.moveTo(px - 9, py + 3); x.lineTo(px + 9, py - 3); x.stroke()
  }
  x.restore()
  // fronds
  const N = 7
  for (let i = 0; i < N; i++) {
    const base = lerp(-Math.PI * 1.02, Math.PI * 0.02, i / (N - 1)) + 0.07 * Math.sin(t * 1.7 + i * 0.9 + seed) * sway
    const L = (i === 0 || i === N - 1 ? 250 : 300) * (h / 600)
    const dx = Math.cos(base), dy = Math.sin(base)
    const tipX = topX + dx * L, tipY = topY + dy * L * 0.55 + L * 0.42
    const midX = topX + dx * L * 0.5, midY = topY + dy * L * 0.5 - L * 0.12
    const nx = -(tipY - topY), ny = tipX - topX, nl = Math.hypot(nx, ny) || 1, wv = 40 * (h / 600)
    x.beginPath(); x.moveTo(topX, topY)
    x.quadraticCurveTo(midX + nx / nl * wv, midY + ny / nl * wv, tipX, tipY)
    x.quadraticCurveTo(midX - nx / nl * wv * 0.3, midY - ny / nl * wv * 0.3, topX, topY)
    ink(x, frond, { w: 7, fa: 0.45, glow: 22 })
  }
  // coconuts
  for (const [ox, oy] of [[-18, 16], [14, 20], [-2, 34]]) { x.beginPath(); x.arc(topX + ox, topY + oy, 13 * (h / 600), 0, TAU); ink(x, GOLD, { w: 5, fa: 0.8, glow: 12 }) }
}

// ───────────────────────── generic deco hotel (baseline at 0,0): stepped top, neon trim, lit windows. k 0..1 = rise.
export function hotel(x, t, { w = 200, h = 380, col = PINK, seed = 1, step = true, k = 1 } = {}) {
  if (k <= 0) return
  const r = rng(seed)
  x.save(); x.scale(1, k)
  const top = -h
  x.beginPath()
  x.moveTo(-w / 2, 0); x.lineTo(-w / 2, top)
  if (step) { x.lineTo(-w * 0.28, top); x.lineTo(-w * 0.28, top - 46); x.lineTo(-w * 0.1, top - 46); x.lineTo(-w * 0.1, top - 90); x.lineTo(w * 0.1, top - 90); x.lineTo(w * 0.1, top - 46); x.lineTo(w * 0.28, top - 46); x.lineTo(w * 0.28, top) }
  x.lineTo(w / 2, top); x.lineTo(w / 2, 0); x.closePath()
  x.fillStyle = 'rgba(22,12,44,0.96)'; x.fill()
  ink(x, col, { w: 6, fa: 0.08, glow: 22 })
  // deco "eyebrow" bands
  x.strokeStyle = rgba(col, 0.85); x.lineWidth = 4; x.shadowColor = col; x.shadowBlur = 12
  for (const yy of [top + 28, top + 44]) { x.beginPath(); x.moveTo(-w / 2 + 10, yy); x.lineTo(w / 2 - 10, yy); x.stroke() }
  x.beginPath(); x.moveTo(0, top + 60); x.lineTo(0, -20); x.stroke()
  x.shadowBlur = 0
  // windows
  const cols = Math.max(2, Math.floor(w / 46)), rows = Math.floor((h - 90) / 44)
  const gw = (w - 40) / cols
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const on = r() < 0.55, fl = on ? 0.55 + 0.45 * Math.sin(t * 2 + i * 3 + j * 7 + seed) : 0
    const wx = -w / 2 + 20 + i * gw + gw * 0.22, wy = top + 74 + j * 44
    x.fillStyle = on ? rgba(r() < 0.3 ? AQUA : '#ffd98a', 0.45 + 0.35 * fl) : 'rgba(60,40,100,0.35)'
    x.fillRect(wx, wy, gw * 0.56, 22)
  }
  x.restore()
}

// ───────────────────────── the night ocean band (yTop..yBot), wave lines drifting, the moon's reflection at mx
export function ocean(x, t, yTop, yBot, { mx = 930, k = 1 } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const g = x.createLinearGradient(0, yTop, 0, yBot); g.addColorStop(0, 'rgba(18,40,78,0.96)'); g.addColorStop(1, 'rgba(8,10,30,0.98)')
  x.fillStyle = g; x.fillRect(0, yTop, 1080, yBot - yTop)
  x.beginPath(); x.moveTo(0, yTop); x.lineTo(1080, yTop); ink(x, AQUA, { w: 4, fa: 0, glow: 14 })
  for (let j = 0; j < 6; j++) {
    const y0 = yTop + 30 + j * (yBot - yTop - 40) / 6, amp = 6 + j * 2, ph = t * (1.2 + j * 0.25) + j
    x.beginPath()
    for (let px = -20; px <= 1100; px += 20) { const yy = y0 + Math.sin(px * 0.018 + ph) * amp; px === -20 ? x.moveTo(px, yy) : x.lineTo(px, yy) }
    x.globalAlpha = k * (0.6 - j * 0.06)
    ink(x, j % 2 ? TEAL : AQUA, { w: 4, fa: 0, glow: 10 })
  }
  x.globalAlpha = k
  // moon glitter path
  x.fillStyle = 'rgba(255,243,224,0.75)'
  for (let j = 0; j < 9; j++) {
    const yy = yTop + 14 + j * (yBot - yTop - 20) / 9, ww = 30 + j * 8 + 10 * Math.sin(t * 3 + j * 1.7)
    x.globalAlpha = k * (0.75 - j * 0.06); x.fillRect(mx - ww / 2, yy, ww, 5)
  }
  x.restore()
}

// ───────────────────────── rolling suitcase (wheels at 0,0; tilted by tilt radians; handle up). spin = wheel angle.
export function suitcase(x, { col = PINK, tilt = -0.25, spin = 0, s = 1, sticker = 0 } = {}) {
  x.save(); x.scale(s, s); x.rotate(tilt)
  // handle
  x.beginPath(); x.moveTo(-22, -132); x.lineTo(-22, -200); x.lineTo(22, -200); x.lineTo(22, -132); ink(x, BONE, { w: 7, fa: 0, glow: 10 })
  // body
  x.beginPath(); x.roundRect(-52, -136, 104, 124, 20); ink(x, col, { w: 8, fa: 0.6, glow: 22 })
  x.strokeStyle = rgba('#1a1030', 0.55); x.lineWidth = 5
  for (const xx of [-20, 20]) { x.beginPath(); x.moveTo(xx, -126); x.lineTo(xx, -22); x.stroke() }
  // sticker: a star or a little palm dot
  x.save(); x.translate(26, -98)
  if (sticker === 0) { x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 7 : 16; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath(); x.fillStyle = GOLD; x.fill() }
  else { x.beginPath(); x.arc(0, 0, 14, 0, TAU); x.fillStyle = sticker === 1 ? TEAL : BONE; x.fill(); x.fillStyle = '#1a1030'; x.font = `700 16px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✈︎', 0, 1) }
  x.restore()
  // wheels
  for (const xx of [-34, 34]) {
    x.save(); x.translate(xx, -2); x.rotate(spin)
    x.beginPath(); x.arc(0, 0, 13, 0, TAU); x.fillStyle = '#1a1030'; x.fill(); ink(x, BONE, { w: 4, fa: 0, glow: 6 })
    x.beginPath(); x.moveTo(-9, 0); x.lineTo(9, 0); x.strokeStyle = BONE; x.lineWidth = 3; x.stroke()
    x.restore()
  }
  x.restore()
}

// ───────────────────────── pictogram person (feet at 0,0; ~270 tall); no face. arm: optional hand target (local coords)
export function person(x, col, { a = 1, lean = 0, arm = null } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.rotate(lean)
  if (arm) { x.beginPath(); x.moveTo(-30, -160); x.quadraticCurveTo((arm.x - 30) / 2, (arm.y - 160) / 2 + 22, arm.x, arm.y); ink(x, col, { w: 14, fa: 0, glow: 14 }) }
  x.beginPath(); x.moveTo(-50, 0); x.lineTo(-44, -150); x.quadraticCurveTo(-44, -190, 0, -192); x.quadraticCurveTo(44, -190, 44, -150); x.lineTo(50, 0); x.closePath()
  ink(x, col, { w: 9, fa: 0.38, glow: 20 })
  x.beginPath(); x.arc(0, -238, 38, 0, TAU); ink(x, col, { w: 9, fa: 0.85, glow: 20 })
  x.restore()
}

/** a plump heart centred at 0,0 (~2s wide) */
export function heart(x, s, col, a = 1) {
  if (a <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= a; x.scale(s / 60, s / 60)
  x.beginPath(); x.moveTo(0, 42)
  x.bezierCurveTo(-70, -6, -46, -62, 0, -26)
  x.bezierCurveTo(46, -62, 70, -6, 0, 42)
  x.closePath(); ink(x, col, { w: 8, fa: 0.6, glow: 26 })
  x.restore()
}
