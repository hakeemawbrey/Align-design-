// citynashville · line-art props: generic bar-row facades, festoon lights, a neon guitar sign, a neon "live music" sign,
// a cowboy-hatted pictogram with an acoustic guitar, a heart-headed music note that cracks in two, little ♪ notes.
// Bold, friendly, thick glowing strokes over flat fills; no faces, no logos, no brands. Pure functions of their args.
import { clamp, lerp, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', HOT = '#ff5fa2', CYAN = '#6fe6ff', SILVER = '#e3ecff', TAN = '#e9a94a', VIOLET = '#c9a6ff', AMBER = '#ffb54a'
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
/** neon tube: a fat coloured glow stroke with a hot white core */
export function neon(x, col, w = 12, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = 40; x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 10; x.strokeStyle = rgba('#ffffff', 0.75); x.lineWidth = w * 0.32; x.stroke()
  x.restore()
}
/** deterministic neon flicker: 0 or ~1 for a sign switched on at t0 (stutters on, then steady; `stutter` adds a sad flicker window) */
export function flick(t, t0, seed = 1, stutter = null) {
  if (t < t0) return 0
  const h = n => { const s = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453; return s - Math.floor(s) }
  if (t - t0 < 0.32) return h(Math.floor((t - t0) * 24)) > 0.42 ? 1 : 0.12
  if (stutter && t > stutter[0] && t < stutter[1]) return h(Math.floor(t * 22) + 7) > 0.5 ? 1 : 0.15
  return 0.94 + 0.06 * Math.sin(t * 31 + seed)
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

// ───────────────────────── the bar row: three generic brick-front buildings with lit windows (drawn in screen space)
export const BLDGS = [
  { x0: -20, x1: 368, top: 930, col: '#2a1a46' },
  { x0: 352, x1: 728, top: 840, col: '#231741', windows: true },
  { x0: 712, x1: 1100, top: 960, col: '#2c1946' },
]
export function facades(x, t, dy = 0, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(0, dy)
  BLDGS.forEach((B, bi) => {
    const w = B.x1 - B.x0
    x.beginPath(); x.rect(B.x0, B.top, w, 1920 - B.top + 40)
    x.fillStyle = B.col; x.fill()
    x.strokeStyle = rgba(BONE, 0.55); x.lineWidth = 5; x.shadowColor = VIOLET; x.shadowBlur = 14; x.stroke(); x.shadowBlur = 0
    // cornice + parapet
    x.beginPath(); x.rect(B.x0 - 10, B.top - 8, w + 20, 34); ink(x, BONE, { w: 5, fa: 0.16, glow: 10 })
    for (let k = 0; k < 6; k++) { x.fillStyle = rgba(BONE, 0.35); x.fillRect(B.x0 + 20 + k * (w - 40) / 5.6, B.top + 30, 14, 12) }
    // upper windows: 3 tall arched windows, warm, softly breathing
    if (B.windows) for (let k = 0; k < 3; k++) {
      const cx = B.x0 + w * (0.22 + k * 0.28), wy = B.top + 80, ww = 62, wh = 120
      const on = 0.55 + 0.35 * Math.sin(t * 1.7 + k * 2.1 + bi * 1.3)
      x.beginPath(); x.moveTo(cx - ww / 2, wy + wh); x.lineTo(cx - ww / 2, wy + ww / 2); x.arc(cx, wy + ww / 2, ww / 2, Math.PI, 0); x.lineTo(cx + ww / 2, wy + wh); x.closePath()
      ink(x, AMBER, { w: 5, fa: on * 0.7, glow: 18, fill: '#ff9a3c' })
      x.beginPath(); x.moveTo(cx, wy + 4); x.lineTo(cx, wy + wh); x.moveTo(cx - ww / 2, wy + wh * 0.62); x.lineTo(cx + ww / 2, wy + wh * 0.62); x.strokeStyle = rgba(B.col, 0.9); x.lineWidth = 5; x.stroke()
    }
    // storefront: a wide warm window with a striped awning
    const sy = 1440
    x.beginPath(); x.rect(B.x0 + 30, sy, w - 60, 260); ink(x, AMBER, { w: 6, fa: 0.22, glow: 26, fill: '#ff8a3a' })
    x.strokeStyle = rgba(AMBER, 0.55); x.lineWidth = 4
    for (let k = 1; k < 3; k++) { const mx = B.x0 + 30 + (w - 60) * k / 3; x.beginPath(); x.moveTo(mx, sy); x.lineTo(mx, sy + 260); x.stroke() }
    // a little crowd of heads inside, bobbing
    for (let k = 0; k < 5; k++) { const hx = B.x0 + 60 + (w - 120) * k / 4, hy = sy + 200 - 10 * Math.abs(Math.sin(t * 5.65 + k * 1.3 + bi)); x.fillStyle = rgba('#3a1f3a', 0.85); x.beginPath(); x.arc(hx, hy, 24, 0, TAU); x.fill(); x.fillRect(hx - 32, hy + 22, 64, 60) }
    const n = 7, aw = (w - 30) / n
    for (let k = 0; k < n; k++) {
      x.beginPath(); x.moveTo(B.x0 + 15 + k * aw, sy - 70); x.lineTo(B.x0 + 15 + (k + 1) * aw, sy - 70); x.lineTo(B.x0 + 15 + (k + 1) * aw, sy - 22); x.quadraticCurveTo(B.x0 + 15 + (k + 0.5) * aw, sy + 2, B.x0 + 15 + k * aw, sy - 22); x.closePath()
      x.fillStyle = k % 2 ? rgba(BONE, 0.85) : ['#e2475f', '#3f7cf0', '#2fc79a'][bi]; x.fill()
    }
  })
  x.restore()
}

/** festoon bulbs on a sagging wire (y0 at the ends, sag in the middle), twinkling */
export function festoon(x, t, y0, sag, a = 1, dy = 0) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(0, dy)
  const yAt = u => y0 + 4 * sag * u * (1 - u) + Math.sin(t * 1.6) * 4 * Math.sin(Math.PI * u)
  x.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; i ? x.lineTo(u * 1080, yAt(u)) : x.moveTo(0, yAt(0)) }
  x.strokeStyle = rgba('#120c22', 0.95); x.lineWidth = 4; x.stroke()
  const N = 15
  for (let i = 0; i <= N; i++) {
    const u = (i + 0.5) / (N + 1), px = u * 1080, py = yAt(u) + 14
    const tw = 0.7 + 0.3 * Math.sin(t * 5 + i * 1.9)
    const g = x.createRadialGradient(px, py, 0, px, py, 34); g.addColorStop(0, rgba('#ffd98a', 0.55 * tw)); g.addColorStop(1, rgba('#ffd98a', 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, 34, 0, TAU); x.fill()
    x.beginPath(); x.arc(px, py, 9, 0, TAU); x.fillStyle = rgba('#fff1c4', 0.6 + 0.4 * tw); x.fill()
  }
  x.restore()
}

// ───────────────────────── acoustic guitar (body centred near 0,0; neck up; ~440 tall)
export function guitarPath(x) {
  x.beginPath()
  x.moveTo(0, -112)
  x.bezierCurveTo(52, -116, 66, -58, 42, -18)
  x.bezierCurveTo(98, 4, 98, 124, 0, 126)
  x.bezierCurveTo(-98, 124, -98, 4, -42, -18)
  x.bezierCurveTo(-66, -58, -52, -116, 0, -112)
  x.closePath()
}
export function guitar(x, col = TAN, { strum = 0 } = {}) {
  x.save()
  // neck + headstock
  x.beginPath(); x.rect(-13, -300, 26, 196); ink(x, '#c98a3a', { w: 6, fa: 0.85, glow: 8, fill: '#7a4a22' })
  x.beginPath(); x.moveTo(-20, -300); x.lineTo(-24, -352); x.quadraticCurveTo(0, -364, 24, -352); x.lineTo(20, -300); x.closePath(); ink(x, '#c98a3a', { w: 6, fa: 0.85, glow: 8, fill: '#5a3418' })
  x.fillStyle = BONE; for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(s * 30, -312 - k * 14, 5, 0, TAU); x.fill() }
  // body
  guitarPath(x); ink(x, col, { w: 9, fa: 0.85, glow: 22, fill: '#d98a3a' })
  x.beginPath(); x.arc(0, -22, 26, 0, TAU); x.fillStyle = '#2a160c'; x.fill(); x.strokeStyle = rgba(BONE, 0.7); x.lineWidth = 4; x.stroke()
  x.beginPath(); x.roundRect(-34, 62, 68, 14, 6); x.fillStyle = '#4a2a14'; x.fill()
  // strings (they shiver on a strum)
  x.strokeStyle = rgba('#fff3e0', 0.85); x.lineWidth = 2
  for (let k = -1; k <= 1; k++) {
    x.beginPath(); x.moveTo(k * 7, 66)
    const wob = strum * 5 * Math.sin(k * 2 + strum * 30)
    x.quadraticCurveTo(k * 7 + wob, -100, k * 6, -300); x.stroke()
  }
  x.restore()
}

/** neon guitar sign (outline only), centred on its body */
export function neonGuitar(x, col, a) {
  if (a <= 0) return
  x.save()
  guitarPath(x); neon(x, col, 13, a)
  x.beginPath(); x.arc(0, -22, 26, 0, TAU); neon(x, col, 9, a)
  x.beginPath(); x.moveTo(-12, -112); x.lineTo(-12, -300); x.lineTo(-22, -352); x.lineTo(22, -352); x.lineTo(12, -300); x.lineTo(12, -112); neon(x, col, 10, a)
  x.restore()
}

/** neon "live / MUSIC" sign, centred */
export function neonLive(x, a, t) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.textAlign = 'center'; x.textBaseline = 'middle'
  const glowText = (txt, font, col, y) => {
    x.font = font
    x.shadowColor = col; x.shadowBlur = 40; x.fillStyle = col; x.fillText(txt, 0, y)
    x.shadowBlur = 8; x.fillStyle = rgba('#ffffff', 0.8); x.fillText(txt, 0, y)
  }
  glowText('live', "italic 500 120px 'EB Garamond', serif", HOT, -46)
  glowText('MUSIC', `900 70px ${INTER}`, CYAN, 54)
  // a little neon star either side
  x.shadowBlur = 0
  x.restore()
  x.save()
  x.beginPath(); x.rect(-150, -130, 300, 250); neon(x, VIOLET, 7, a * 0.8)
  x.restore()
}

// ───────────────────────── cowboy hat (sits on the pictogram head at 0,-238)
export function cowboyHat(x, col = TAN) {
  x.save()
  x.beginPath(); x.moveTo(-36, -262); x.lineTo(-34, -306); x.quadraticCurveTo(-18, -322, 0, -308); x.quadraticCurveTo(18, -322, 34, -306); x.lineTo(36, -262); x.closePath()
  ink(x, col, { w: 8, fa: 0.85, glow: 16, fill: '#b9772e' })
  x.beginPath(); x.moveTo(-35, -276); x.lineTo(35, -276); x.strokeStyle = '#5a3418'; x.lineWidth = 8; x.stroke()
  x.beginPath(); x.moveTo(-88, -282); x.quadraticCurveTo(-64, -256, 0, -258); x.quadraticCurveTo(64, -256, 88, -282); x.quadraticCurveTo(76, -246, 0, -244); x.quadraticCurveTo(-76, -246, -88, -282); x.closePath()
  ink(x, col, { w: 8, fa: 0.9, glow: 16, fill: '#c98a3a' })
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

// ───────────────────────── the heart note: a heart-shaped note head with a stem + flag.
// At s = 60 the heart is ~110 wide. split 0..1 cracks it along a zigzag; the halves tip apart (the stem rides the right half).
const CRACK = [[0, -30], [-12, -12], [9, 2], [-9, 18], [4, 30], [0, 44]]
function heartPath(x) {
  x.beginPath(); x.moveTo(0, 44)
  x.bezierCurveTo(-74, -4, -48, -66, 0, -28)
  x.bezierCurveTo(48, -66, 74, -4, 0, 44)
  x.closePath()
}
function halfClip(x, side) {
  x.beginPath(); x.moveTo(CRACK[0][0], -200)
  for (const [px, py] of CRACK) x.lineTo(px, py)
  x.lineTo(0, 200); x.lineTo(side * 200, 200); x.lineTo(side * 200, -200); x.closePath(); x.clip()
}
export function heartNote(x, s, col, { split = 0, crack = 0, stem = 1, a = 1, glow = 26, only = 0 } = {}) {
  if (a <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= a; x.scale(s / 60, s / 60)
  const sp = split
  for (const side of [-1, 1]) {
    if (only && side !== only) continue
    x.save()
    if (sp > 0) { x.translate(side * 34 * sp, (side < 0 ? 26 : 10) * sp); x.rotate(side * (side < 0 ? 0.42 : 0.22) * sp) }
    if (sp > 0 || crack > 0 || only) halfClip(x, side)
    heartPath(x); ink(x, col, { w: 8, fa: 0.7, glow })
    x.beginPath(); x.arc(-24, -24, 14, Math.PI * 1.1, Math.PI * 1.7); x.strokeStyle = rgba('#ffffff', 0.55); x.lineWidth = 6; x.lineCap = 'round'; x.stroke()
    if (side > 0 && stem > 0) {
      x.restore(); x.save()
      if (sp > 0) { x.translate(34 * sp, 10 * sp); x.rotate(0.22 * sp) }
      x.globalAlpha *= stem
      x.beginPath(); x.moveTo(38, -24); x.lineTo(38, -24 - 150 * stem)
      x.bezierCurveTo(44, -150, 92, -136, 84, -82)
      ink(x, col, { w: 9, fa: 0, glow })
    }
    x.restore()
  }
  if (crack > 0 && sp < 0.05 && !only) {
    x.save(); x.beginPath(); CRACK.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)))
    x.strokeStyle = rgba('#1a1030', crack); x.lineWidth = 6; x.lineJoin = 'miter'; x.stroke(); x.restore()
  }
  x.restore()
}

/** a little ♪ (head at 0,0, ~60 tall at s 1) */
export function note(x, px, py, s, col, a = 1, rot = 0) {
  if (a <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= clamp(a); x.translate(px, py); x.rotate(rot); x.scale(s, s)
  x.shadowColor = col; x.shadowBlur = 14; x.fillStyle = col; x.strokeStyle = col; x.lineCap = 'round'
  x.beginPath(); x.ellipse(0, 0, 17, 12, -0.4, 0, TAU); x.fill()
  x.lineWidth = 6; x.beginPath(); x.moveTo(14, -4); x.lineTo(14, -62); x.bezierCurveTo(18, -44, 38, -44, 34, -22); x.stroke()
  x.restore()
}

export { lerp }
