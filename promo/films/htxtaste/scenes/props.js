// htxtaste · line-art props: taco, kolache, crawfish, the plate, a pictogram person, a heart.
// Bold, friendly, thick glowing strokes over flat fills; generic food (no brands), no faces. Pure functions of their args.
import { clamp, lerp, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', FIRE = '#f0603a', RED = '#ff4d3a', GREEN = '#7be08a', SILVER = '#e3ecff', CRUST = '#e9a94a', BERRY = '#ff4f7b', VIOLET = '#c9a6ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
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

// ───────────────────────── taco (side view, ~300 wide, centred on the shell)
export function taco(x, t) {
  // filling: meat, lettuce bumps, tomato, cheese
  x.save()
  x.beginPath(); x.moveTo(-122, 0)
  for (let i = 0; i <= 8; i++) { const px = -122 + i * 30.5; x.quadraticCurveTo(px - 15, -58 - (i % 2) * 18, px, -8) }
  x.lineTo(122, 0); x.closePath()
  ink(x, GREEN, { w: 8, fa: 0.55, glow: 14 })
  x.beginPath(); x.moveTo(-110, 4); x.quadraticCurveTo(-60, -34, 0, -16); x.quadraticCurveTo(60, -36, 110, 4); x.closePath()
  ink(x, '#b8613a', { w: 6, fa: 0.75, glow: 6, fill: '#7a3b22' })
  for (const [cx, cy, r] of [[-58, -40, 15], [12, -50, 17], [72, -38, 14]]) { x.beginPath(); x.arc(cx, cy + Math.sin(t * 3 + cx) * 2, r, 0, TAU); ink(x, RED, { w: 6, fa: 0.8, glow: 12 }) }
  x.strokeStyle = '#ffe07a'; x.lineWidth = 7; x.lineCap = 'round'
  for (const [cx, cy, a] of [[-90, -22, -0.6], [-22, -30, 0.5], [40, -24, -0.4], [95, -20, 0.7]]) { x.beginPath(); x.moveTo(cx - 12 * Math.cos(a), cy - 12 * Math.sin(a)); x.lineTo(cx + 12 * Math.cos(a), cy + 12 * Math.sin(a)); x.stroke() }
  // the shell (front half-moon band)
  x.beginPath(); x.ellipse(0, -6, 158, 112, 0, Math.PI, 0, true); x.ellipse(0, -6, 128, 84, 0, 0, Math.PI, false); x.closePath()
  ink(x, GOLD, { w: 9, fa: 0.5, glow: 22, fill: '#f2b84a' })
  // toasty dots on the shell
  x.fillStyle = rgba('#a5652a', 0.7)
  for (const ax of [0.75, 0.6, 0.45, 0.3, 0.85, 0.18]) { const a = Math.PI * ax; x.beginPath(); x.arc(Math.cos(a) * 143, -6 + Math.sin(a) * 98, 5, 0, TAU); x.fill() }
  x.restore()
}

// ───────────────────────── kolache (fruit, 3/4 view, ~250 wide) with steam
export function kolache(x, t, steam = 1) {
  x.save()
  x.save(); x.scale(1, 0.8)
  // thickness
  x.beginPath(); x.ellipse(0, 26, 124, 118, 0, 0, TAU); x.fillStyle = '#8a5523'; x.fill()
  x.beginPath(); x.ellipse(0, 26, 124, 118, 0, 0, Math.PI); ink(x, CRUST, { w: 8, fa: 0, glow: 10 })
  // top
  x.beginPath(); x.ellipse(0, 0, 124, 118, 0, 0, TAU); ink(x, CRUST, { w: 9, fa: 0.85, glow: 22, fill: '#d99542' })
  // puffy dough ring highlight
  x.beginPath(); x.ellipse(-8, -10, 96, 88, 0, Math.PI * 1.05, Math.PI * 1.55); x.strokeStyle = rgba('#ffe2a8', 0.65); x.lineWidth = 9; x.stroke()
  // fruit well
  x.beginPath(); x.ellipse(0, 4, 60, 56, 0, 0, TAU); ink(x, BERRY, { w: 8, fa: 0.85, glow: 20 })
  x.beginPath(); x.ellipse(-14, -10, 26, 14, -0.5, 0, TAU); x.fillStyle = rgba('#ffd0dc', 0.75); x.fill()
  // streusel crumbs
  const r = rng(5)
  x.fillStyle = '#fff1cf'
  for (let i = 0; i < 14; i++) { const a = r() * TAU, d = 74 + r() * 30; x.fillRect(Math.cos(a) * d - 4, Math.sin(a) * d - 4, 8, 8) }
  x.restore()
  // steam
  if (steam > 0) {
    x.save(); x.lineCap = 'round'
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.9 + i * 0.33) % 1, sx = (i - 1) * 46
      x.globalAlpha = steam * Math.sin(Math.PI * ph) * 0.85
      x.strokeStyle = BONE; x.lineWidth = 8; x.shadowColor = BONE; x.shadowBlur = 12
      x.beginPath()
      for (let k = 0; k <= 12; k++) { const yy = -110 - ph * 70 - k * 9, xx = sx + 14 * Math.sin(k * 0.6 + t * 4 + i); k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
      x.stroke()
    }
    x.restore()
  }
  x.restore()
}

// ───────────────────────── crawfish (top view, head up, ~300 tall); snap 0..1 opens/closes the claws
function claw(x, side, snap) {
  x.save(); x.scale(side, 1)
  // arm
  x.beginPath(); x.moveTo(26, -64); x.quadraticCurveTo(70, -80, 72, -118); ink(x, RED, { w: 14, fa: 0, glow: 10 })
  x.translate(76, -126); x.rotate(-0.25)
  // big pincer (fixed jaw) + moving finger
  x.beginPath(); x.ellipse(0, -44, 30, 56, 0.15, 0, TAU); ink(x, RED, { w: 8, fa: 0.55, glow: 18 })
  x.save(); x.translate(-12, -4); x.rotate(-0.15 - 0.5 * snap)
  x.beginPath(); x.ellipse(-8, -46, 13, 46, -0.12, 0, TAU); ink(x, RED, { w: 7, fa: 0.55, glow: 12 })
  x.restore()
  x.fillStyle = '#ffd4c8'; for (const [px, py] of [[8, -70], [12, -42], [6, -16]]) { x.beginPath(); x.arc(px, py, 4, 0, TAU); x.fill() }
  x.restore()
}
export function crawfish(x, t, snap = 0) {
  x.save()
  // antennae
  x.lineCap = 'round'
  for (const s of [-1, 1]) {
    x.beginPath(); x.moveTo(s * 10, -100); x.bezierCurveTo(s * 30, -200, s * (120 + 10 * Math.sin(t * 3 + s)), -210, s * (150 + 14 * Math.sin(t * 2.6 + s)), -280)
    ink(x, '#ff8a6a', { w: 5, fa: 0, glow: 8 })
  }
  // legs
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) {
    const y0 = -40 + i * 20, w = Math.sin(t * 9 + i * 1.3) * 5
    x.beginPath(); x.moveTo(s * 34, y0); x.lineTo(s * 66, y0 + 10 + w); x.lineTo(s * 76, y0 + 30 + w); ink(x, RED, { w: 5, fa: 0, glow: 6 })
  }
  claw(x, -1, snap); claw(x, 1, snap)
  // tail: segments + fan
  for (let i = 4; i >= 0; i--) {
    const w = 72 - i * 8, y = 50 + i * 30
    x.beginPath(); x.roundRect(-w / 2, y - 18, w, 36, 14); ink(x, RED, { w: 7, fa: 0.55, glow: 12 })
  }
  for (const [a, l] of [[-0.55, 56], [0, 62], [0.55, 56]]) {
    x.save(); x.translate(0, 192); x.rotate(a)
    x.beginPath(); x.ellipse(0, 30, 18, l / 2, 0, 0, TAU); ink(x, RED, { w: 7, fa: 0.55, glow: 12 })
    x.restore()
  }
  // carapace
  x.beginPath(); x.ellipse(0, -16, 44, 74, 0, 0, TAU); ink(x, RED, { w: 9, fa: 0.62, glow: 22 })
  x.beginPath(); x.moveTo(0, -84); x.lineTo(0, 46); x.strokeStyle = rgba('#ffd4c8', 0.45); x.lineWidth = 4; x.stroke()
  x.beginPath(); x.moveTo(-18, -96); x.lineTo(0, -122); x.lineTo(18, -96); ink(x, RED, { w: 7, fa: 0.6, glow: 10 })
  x.fillStyle = '#1a1430'; for (const s of [-1, 1]) { x.beginPath(); x.arc(s * 20, -84, 7, 0, TAU); x.fill() }
  x.restore()
}

// ───────────────────────── the plate (top view). Its rim rings sit exactly where the zodiac wheel's rings will be.
export function plate(x, R, Rin, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 50; x.shadowOffsetY = 18
  x.beginPath(); x.arc(0, 0, R, 0, TAU); x.fillStyle = 'rgba(30,22,58,0.92)'; x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.beginPath(); x.arc(0, 0, R, 0, TAU); x.arc(0, 0, Rin, 0, TAU, true); x.fillStyle = rgba(BONE, 0.14); x.fill('evenodd')
  x.beginPath(); x.arc(0, 0, R, 0, TAU); ink(x, BONE, { w: 7, fa: 0, glow: 22 })
  x.beginPath(); x.arc(0, 0, Rin, 0, TAU); ink(x, BONE, { w: 4, fa: 0, glow: 8 })
  // a shine on the rim
  x.beginPath(); x.arc(0, 0, (R + Rin) / 2, Math.PI * 1.1, Math.PI * 1.4); x.strokeStyle = rgba('#ffffff', 0.4); x.lineWidth = 10; x.lineCap = 'round'; x.stroke()
  x.restore()
}

// ───────────────────────── pictogram person (feet at 0,0; ~270 tall); no face
export function person(x, col, { a = 1, lean = 0 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.rotate(lean)
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

export { lerp }
