// citydallas · line-art props: the big-hair pictogram, a lifted pickup, a giant star, a heart.
// Bold, friendly, thick glowing strokes over flat fills; generic shapes (no brands), no faces. Pure functions of their args.
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

export const CYAN = '#8fd8f6', HAIR = '#ffd36b', HAIR_D = '#d9962e', TRUCK = '#ff5a4e', INKC = '#1a1430'

// ───────────────────────── big hair: a bouffant cloud over the pictogram's head (person feet at 0,0; head at -238).
// R = size of the do in person units (~40 = normal, ~170 = Dallas). wob 0..1 = a jiggle after each poof.
export function bigHair(x, R, wob = 0, t = 0) {
  if (R <= 0) return
  const cy = -246 - 0.5 * R, rx = R, ry = R * 0.86, br = R * 0.42 + 10
  const bumps = []
  const N = 9
  for (let i = 0; i < N; i++) {
    const a = Math.PI * (1.02 + 0.96 * i / (N - 1))       // upper arc, left to right
    const j = 1 + 0.08 * wob * Math.sin(i * 2.1 + t * 22)
    bumps.push([Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j, br * (i % 2 ? 0.9 : 1.05)])
  }
  bumps.push([0, cy + ry * 0.1, R * 0.85 + 6])               // the core
  bumps.push([-rx * 0.72, cy + ry * 0.62, br * 0.85]); bumps.push([rx * 0.72, cy + ry * 0.62, br * 0.85]) // side flips
  x.save()
  // outline pass (glowing), then an opaque fill pass that hides the inner overlaps
  x.shadowColor = HAIR; x.shadowBlur = 26; x.strokeStyle = HAIR; x.lineWidth = 18
  for (const [bx, by, r] of bumps) { x.beginPath(); x.arc(bx, by, r, 0, TAU); x.stroke() }
  x.shadowBlur = 0
  x.fillStyle = HAIR_D
  for (const [bx, by, r] of bumps) { x.beginPath(); x.arc(bx, by, r, 0, TAU); x.fill() }
  // swirls / shine
  x.strokeStyle = rgba('#fff2c4', 0.75); x.lineCap = 'round'; x.lineWidth = Math.max(5, R * 0.06)
  for (const [sx, sy, s, a0] of [[-0.42, -0.2, 0.42, 3.4], [0.3, -0.42, 0.36, 3.9], [0.05, 0.12, 0.3, 3.1]]) {
    x.beginPath(); x.arc(sx * rx, cy + sy * ry, s * R, a0, a0 + 1.5); x.stroke()
  }
  x.restore()
}

// ───────────────────────── a lifted pickup (side view, facing LEFT, ground at y=0, ~560 wide).
// bounce = body offset in px (springs), spin = wheel angle.
export function truck(x, { bounce = 0, spin = 0, lights = 1, col = TRUCK } = {}) {
  x.save()
  // wheels
  for (const wx of [-172, 168]) {
    x.save(); x.translate(wx, -66)
    x.beginPath(); x.arc(0, 0, 66, 0, TAU); x.fillStyle = INKC; x.fill(); ink(x, BONE, { w: 9, fa: 0, glow: 14 })
    x.beginPath(); x.arc(0, 0, 30, 0, TAU); ink(x, '#c8c2d8', { w: 6, fa: 0.5, glow: 6 })
    x.rotate(spin); x.strokeStyle = BONE; x.lineWidth = 6; x.lineCap = 'round'
    for (let k = 0; k < 5; k++) { const a = k * TAU / 5; x.beginPath(); x.moveTo(Math.cos(a) * 10, Math.sin(a) * 10); x.lineTo(Math.cos(a) * 28, Math.sin(a) * 28); x.stroke() }
    x.restore()
  }
  x.translate(0, -bounce)
  // lift-kit struts
  x.strokeStyle = rgba(BONE, 0.8); x.lineWidth = 8
  x.lineCap = 'round'
  for (const wx of [-172, 168]) { x.beginPath(); x.moveTo(wx, -100); for (let k = 1; k <= 6; k++) x.lineTo(wx + (k % 2 ? 14 : -14), -100 - k * 9); x.lineTo(wx, -158); x.stroke() }
  // body: hood + cab + bed in one silhouette
  x.beginPath()
  x.moveTo(-282, -150); x.lineTo(-282, -214); x.quadraticCurveTo(-280, -232, -258, -236)
  x.lineTo(-150, -246); x.lineTo(-104, -338); x.quadraticCurveTo(-98, -350, -84, -350)
  x.lineTo(30, -350); x.quadraticCurveTo(44, -350, 44, -336); x.lineTo(44, -252)
  x.lineTo(282, -252); x.lineTo(282, -150)
  // wheel arches
  x.lineTo(238, -150); x.arc(168, -150, 72, 0, Math.PI, true); x.lineTo(-102, -150); x.arc(-172, -150, 72, 0, Math.PI, true)
  x.closePath()
  ink(x, col, { w: 9, fa: 0.82, glow: 24 })
  // window
  x.beginPath(); x.moveTo(-136, -258); x.lineTo(-96, -334); x.lineTo(-30, -334); x.lineTo(-30, -258); x.closePath(); ink(x, CYAN, { w: 6, fa: 0.55, glow: 10 })
  x.beginPath(); x.moveTo(-14, -334); x.lineTo(26, -334); x.lineTo(26, -258); x.lineTo(-14, -258); x.closePath(); ink(x, CYAN, { w: 6, fa: 0.55, glow: 10 })
  // door line, handle, bed rail, bumper
  x.strokeStyle = rgba(INKC, 0.55); x.lineWidth = 5
  x.beginPath(); x.moveTo(-34, -252); x.lineTo(-34, -160); x.moveTo(44, -252); x.lineTo(44, -160); x.stroke()
  x.fillStyle = BONE; x.fillRect(-20, -230, 30, 8)
  x.beginPath(); x.moveTo(52, -262); x.lineTo(278, -262); ink(x, BONE, { w: 7, fa: 0, glow: 8 })
  x.beginPath(); x.roundRect(-298, -176, 40, 30, 8); ink(x, '#c8c2d8', { w: 6, fa: 0.7, glow: 6 })
  x.beginPath(); x.roundRect(272, -176, 26, 26, 6); ink(x, '#c8c2d8', { w: 6, fa: 0.7, glow: 6 })
  // headlight + beam, tail light
  if (lights > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * lights
    const g = x.createLinearGradient(-282, 0, -560, 0); g.addColorStop(0, rgba('#fff3c0', 0.9)); g.addColorStop(1, rgba('#fff3c0', 0))
    x.fillStyle = g; x.beginPath(); x.moveTo(-280, -212); x.lineTo(-580, -260); x.lineTo(-580, -130); x.lineTo(-280, -192); x.closePath(); x.fill()
    x.restore()
  }
  x.beginPath(); x.ellipse(-272, -202, 12, 14, 0, 0, TAU); x.fillStyle = '#fff3c0'; x.shadowColor = '#fff3c0'; x.shadowBlur = 20; x.fill(); x.shadowBlur = 0
  x.beginPath(); x.roundRect(272, -246, 12, 36, 4); x.fillStyle = '#ff2a3a'; x.shadowColor = '#ff2a3a'; x.shadowBlur = 16; x.fill(); x.shadowBlur = 0
  x.restore()
}

// ───────────────────────── a five-point star centred at 0,0 (outer radius R)
export function starPath(x, R, r = R * 0.45) {
  x.beginPath()
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
  x.closePath()
}
/** the giant star: rays + glow + bold gold star with an inner outline. glow 0..1+ boosts the halo. */
export function bigStar(x, R, { glow = 0.5, rays = 0, rot = 0, t = 0 } = {}) {
  if (R <= 0) return
  x.save()
  if (rays > 0) {
    x.save(); x.rotate(t * 0.35); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 16; i++) {
      const a = i * TAU / 16, L = R * (1.5 + 0.35 * (i % 2)) * rays
      x.beginPath(); x.moveTo(Math.cos(a - 0.06) * R * 0.5, Math.sin(a - 0.06) * R * 0.5); x.lineTo(Math.cos(a) * L, Math.sin(a) * L); x.lineTo(Math.cos(a + 0.06) * R * 0.5, Math.sin(a + 0.06) * R * 0.5); x.closePath()
      x.fillStyle = rgba(GOLD, 0.16 * Math.min(1, rays)); x.fill()
    }
    x.restore()
  }
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(0, 0, 0, 0, 0, R * 1.9); g.addColorStop(0, rgba(GOLD, 0.45 * glow)); g.addColorStop(1, rgba(GOLD, 0))
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, R * 1.9, 0, TAU); x.fill()
  x.restore()
  x.rotate(rot)
  starPath(x, R); ink(x, GOLD, { w: Math.max(6, R * 0.035), fa: 0.62, glow: 30 + 30 * glow, fill: '#f2b84a' })
  starPath(x, R * 0.7); x.strokeStyle = rgba('#fff2c4', 0.7); x.lineWidth = Math.max(3, R * 0.018); x.lineJoin = 'round'; x.stroke()
  x.restore()
}

export { lerp }
