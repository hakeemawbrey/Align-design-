// saturnreturn · drawing kit: the big lovable Saturn (rings front/back), Sun, Earth, sparkle bursts, shock waves and the
// line-art props (moving boxes, briefcase, ring, plant, signpost, clipboard, flag, birth star). Pure canvas, no DOM.
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { SIGNS, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', INK = '#1a1430', EARTH_BLUE = '#4f9cf0'
export const SAT = '#f0b46a', RING_A = '#f7e2b8', RING_B = '#e9b47a'
export const FIRE = ELEMENT_COLOR.fire, EARTHC = ELEMENT_COLOR.earth, AIR = ELEMENT_COLOR.air, WATER = ELEMENT_COLOR.water
export const GREEN = SIGNS[9].color, VIOLET = SIGNS[8].color
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const D2R = Math.PI / 180

export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
/** a little "boing" then shrink to 0 */
export const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }
/** damped wobble after t0 (deg-ish units scaled by amp) */
export const wob = (t, t0, amp = 1, f = 13, k = 3.4) => t > t0 ? amp * Math.sin((t - t0) * f) * Math.exp(-(t - t0) * k) : 0

/** a glowing orb: soft halo, shaded sphere, pixel glint */
export function orb(x, px, py, r, color, a, halo = 3.6, glint = true) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.4, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
  if (glint) drawPixelStar(x, Math.round(px + r * 0.8), Math.round(py - r * 0.8), r > 24 ? 21 : 14, 0, rgba('#fff3e0', 0.9))
  x.restore()
}

export function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
export function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, color)
  }
  x.restore()
}
/** an expanding glow ring (the "DING" wave) */
export function wave(x, px, py, t, t0, color, maxR = 220, dur = 0.7, w = 8) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  x.save(); glowStroke(x, color, w * (1 - p * 0.6), 24); x.globalAlpha = 1 - ease.inQuad(p)
  x.beginPath(); x.arc(px, py, maxR * ease.outCubic(p), 0, Math.PI * 2); x.stroke(); x.restore()
}

// ── Saturn ────────────────────────────────────────────────────────────────────────────────────────────────────────────
const F = 0.3   // ring ellipse flattening
function ringBand(x, rIn, rOut, a0, a1) {
  x.beginPath(); x.ellipse(0, 0, rOut, rOut * F, 0, a0, a1, false); x.ellipse(0, 0, rIn, rIn * F, 0, a1, a0, true); x.closePath()
}
function ringHalf(x, r, back, a, t, lw) {
  const [a0, a1] = back ? [Math.PI, Math.PI * 2] : [0, Math.PI]
  const Ro = r * 2.2, Go = r * 1.8, Gi = r * 1.7, Ri = r * 1.32
  x.save()
  x.globalAlpha = a * (back ? 0.9 : 0.97)
  x.shadowBlur = 0
  ringBand(x, Go, Ro, a0, a1); x.fillStyle = RING_A; x.fill()
  ringBand(x, Ri, Gi, a0, a1); x.fillStyle = RING_B; x.fill()
  // a faint inner stripe on each band
  x.globalAlpha = a * 0.35; x.strokeStyle = '#c98a52'; x.lineWidth = Math.max(1, lw * 0.4)
  x.beginPath(); x.ellipse(0, 0, r * 2.0, r * 2.0 * F, 0, a0, a1); x.stroke()
  x.beginPath(); x.ellipse(0, 0, r * 1.5, r * 1.5 * F, 0, a0, a1); x.stroke()
  // glowing outlines
  x.globalAlpha = a
  glowStroke(x, '#fff1d0', lw, lw * 2.6)
  x.beginPath(); x.ellipse(0, 0, Ro, Ro * F, 0, a0, a1); x.stroke()
  x.lineWidth = lw * 0.7
  x.beginPath(); x.ellipse(0, 0, Ri, Ri * F, 0, a0, a1); x.stroke()
  // sparkles riding the ring
  if (r > 18) {
    x.shadowBlur = 0
    for (let i = 0; i < 5; i++) {
      const th = t * 0.9 + i * 1.2566
      const s = Math.sin(th)
      if ((s < 0) !== back) continue
      const rr = r * (i % 2 ? 1.95 : 1.5)
      const tw = 0.5 + 0.5 * Math.sin(t * 5 + i * 2)
      x.globalAlpha = a * (0.4 + 0.6 * tw)
      drawPixelStar(x, Math.cos(th) * rr, s * rr * F, Math.max(7, Math.round(r * 0.16)), i % 4, '#fff6dc')
    }
  }
  x.restore()
}
/** Saturn: big, round, striped butterscotch body + cream rings drawn behind and in front. */
export function saturn(x, cx, cy, r, { a = 1, tilt = -0.36, t = 0, sx = 1, sy = 1, rot = 0, halo = 1, glow = 0 } = {}) {
  if (a <= 0 || r <= 0.5) return
  const lw = clamp(r * 0.055, 2.5, 9)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  // halo
  x.globalCompositeOperation = 'lighter'
  const hr = r * (3.0 + glow * 0.8), g = x.createRadialGradient(0, 0, r * 0.5, 0, 0, hr)
  g.addColorStop(0, rgba(SAT, (0.42 + 0.3 * glow) * a * halo)); g.addColorStop(0.35, rgba(SAT, (0.13 + 0.1 * glow) * a * halo)); g.addColorStop(1, rgba(SAT, 0))
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, hr, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.rotate(tilt)
  ringHalf(x, r, true, a, t, lw)
  // body
  x.save(); x.globalAlpha = a
  const s = x.createRadialGradient(-r * 0.35, -r * 0.45, r * 0.05, 0, 0, r)
  s.addColorStop(0, '#fff6dd'); s.addColorStop(0.45, '#f6c886'); s.addColorStop(1, '#d98848')
  x.fillStyle = s; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
  const bands = [[-0.62, 0.1, '#fff3d4', 0.35], [-0.36, 0.13, '#c9763e', 0.32], [-0.08, 0.08, '#fff0cc', 0.3], [0.2, 0.16, '#c06a36', 0.3], [0.56, 0.1, '#b9612f', 0.28]]
  for (const [y, h, c, al] of bands) { x.fillStyle = rgba(c, al); x.beginPath(); x.ellipse(0, y * r + r * 0.1, r * 1.25, h * r, 0, 0, Math.PI * 2); x.fill() }
  // soft shading on the lower right


  x.restore()
  glowStroke(x, '#ffe2a8', lw, lw * 3); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke()
  x.restore()
  ringHalf(x, r, false, a, t, lw)
  x.restore()
  // glint (axis aligned)
  x.save(); x.globalAlpha = a * (0.85 + 0.15 * Math.sin(t * 3))
  const gl = { x: cx + (-0.48 * r) * sx, y: cy + (-0.5 * r) * sy }
  drawPixelStar(x, Math.round(gl.x), Math.round(gl.y), r > 60 ? 28 : r > 26 ? 18 : 10, 0, '#ffffff')
  x.restore()
}

/** the Sun: glowing orb + slowly turning rays */
export function sun(x, cx, cy, r, t, a = 1) {
  if (a <= 0 || r <= 0.5) return
  x.save(); glowStroke(x, '#ffd45e', Math.max(3, r * 0.09), 18); x.globalAlpha = a
  for (let i = 0; i < 12; i++) {
    const th = i * Math.PI / 6 + t * 0.35, l0 = r * 1.3, l1 = r * (1.62 + 0.1 * Math.sin(t * 4 + i * 1.7))
    x.beginPath(); x.moveTo(cx + Math.cos(th) * l0, cy + Math.sin(th) * l0); x.lineTo(cx + Math.cos(th) * l1, cy + Math.sin(th) * l1); x.stroke()
  }
  x.restore()
  orb(x, cx, cy, r, '#ffc94a', a, 3.2)
}
/** a little blue Earth with a green continent */
export function earth(x, cx, cy, r, a = 1, spin = 0) {
  if (a <= 0 || r <= 0.5) return
  orb(x, cx, cy, r, EARTH_BLUE, a, 3.2, r > 14)
  x.save(); x.globalAlpha = a; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.clip()
  x.fillStyle = 'rgba(70,205,140,0.85)'
  x.beginPath(); x.ellipse(cx - r * 0.25 + Math.sin(spin) * r * 0.3, cy + r * 0.1, r * 0.45, r * 0.3, 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** five-point star */
export function star(x, cx, cy, R, color, a = 1, rot = 0, fillA = 0.35) {
  if (a <= 0 || R <= 0.5) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = a
  x.beginPath()
  for (let i = 0; i < 10; i++) { const rr = i % 2 ? R * 0.45 : R, th = -Math.PI / 2 + i * Math.PI / 5; x.lineTo(Math.cos(th) * rr, Math.sin(th) * rr) }
  x.closePath(); x.fillStyle = rgba(color, fillA); x.fill()
  glowStroke(x, color, Math.max(3, R * 0.16), 18); x.stroke()
  x.restore()
}

/** a pennant flag planted at (px, py) (the base), label on the pennant */
export function flag(x, px, py, k, color, label) {
  if (k <= 0) return
  x.save(); x.translate(px, py); x.scale(k, k)
  glowStroke(x, BONE, 5, 10); x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -120); x.stroke()
  x.beginPath(); x.moveTo(0, -120); x.lineTo(92, -100); x.lineTo(0, -78); x.closePath()
  x.fillStyle = rgba(color, 0.85); x.fill(); glowStroke(x, color, 5, 16); x.stroke()
  x.shadowBlur = 0; x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(label, 8, -99)
  x.restore()
}

// ── montage props (drawn around (0,0), ≈ 220 px tall at s = 1) ─────────────────────────────────────────────────────────
function begin(x, cx, cy, s, a, rot = 0, sx = 1, sy = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s * sx, s * sy); x.globalAlpha = a }
export function boxes(x, cx, cy, s, { a = 1, rot = 0, sx = 1, sy = 1 } = {}) {
  if (a <= 0 || s <= 0) return
  begin(x, cx, cy, s, a, rot, sx, sy)
  const box = (bx, by, w, h, r0) => {
    x.save(); x.translate(bx, by); x.rotate(r0)
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 10); x.fillStyle = rgba(EARTHC, 0.32); x.fill()
    glowStroke(x, EARTHC, 7, 16); x.stroke()
    // flaps + tape
    x.beginPath(); x.moveTo(-w / 2, -h / 2 + h * 0.22); x.lineTo(w / 2, -h / 2 + h * 0.22); x.stroke()
    glowStroke(x, BONE, 6, 8); x.beginPath(); x.moveTo(0, -h / 2); x.lineTo(0, -h / 2 + h * 0.42); x.stroke()
    x.restore()
  }
  box(0, 50, 190, 125, 0)
  box(-12, -72, 140, 105, -0.08)
  // a little up-arrow (this side up)
  glowStroke(x, BONE, 5, 8); x.beginPath(); x.moveTo(52, 92); x.lineTo(52, 58); x.moveTo(40, 70); x.lineTo(52, 56); x.lineTo(64, 70); x.stroke()
  x.restore()
}
export function briefcase(x, cx, cy, s, { a = 1, rot = 0, sx = 1, sy = 1 } = {}) {
  if (a <= 0 || s <= 0) return
  begin(x, cx, cy, s, a, rot, sx, sy)
  x.beginPath(); x.roundRect(-40, -88, 80, 46, 16); glowStroke(x, FIRE, 9, 16); x.stroke()
  x.beginPath(); x.roundRect(-105, -52, 210, 140, 20); x.fillStyle = rgba(FIRE, 0.32); x.fill(); glowStroke(x, FIRE, 7, 16); x.stroke()
  x.beginPath(); x.moveTo(-105, -2); x.lineTo(105, -2); x.stroke()
  x.beginPath(); x.roundRect(-18, -16, 36, 30, 6); x.fillStyle = GOLD; x.fill(); glowStroke(x, GOLD, 4, 10); x.stroke()
  x.restore()
}
export function weddingRing(x, cx, cy, s, t, { a = 1, rot = 0, sx = 1, sy = 1 } = {}) {
  if (a <= 0 || s <= 0) return
  begin(x, cx, cy, s, a, rot, sx, sy)
  glowStroke(x, GOLD, 15, 22); x.beginPath(); x.ellipse(0, 30, 74, 70, 0, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 4; x.strokeStyle = '#fff4cf'; x.shadowBlur = 0; x.globalAlpha = a * 0.7
  x.beginPath(); x.ellipse(0, 30, 74, 70, 0, Math.PI * 1.1, Math.PI * 1.45); x.stroke(); x.globalAlpha = a
  // the gem
  x.beginPath(); x.moveTo(-38, -58); x.lineTo(-20, -82); x.lineTo(20, -82); x.lineTo(38, -58); x.lineTo(0, -28); x.closePath()
  x.fillStyle = rgba(AIR, 0.45); x.fill(); glowStroke(x, AIR, 6, 18); x.stroke()
  x.beginPath(); x.moveTo(-38, -58); x.lineTo(38, -58); x.moveTo(-10, -82); x.lineTo(0, -58); x.lineTo(10, -82); x.stroke()
  x.shadowBlur = 0; x.globalAlpha = a * (0.5 + 0.5 * Math.sin(t * 6))
  drawPixelStar(x, 30, -92, 21, 0, '#ffffff')
  x.restore()
}
/** potted plant: grow 0..1 raises the stem + leaves, bloom 0..1 opens a flower */
export function plant(x, cx, cy, s, t, { a = 1, grow = 1, bloom = 0, rot = 0 } = {}) {
  if (a <= 0 || s <= 0) return
  begin(x, cx, cy, s, a, rot)
  const top = 30 - 140 * grow, sway = 0.06 * Math.sin(t * 2.2)
  // stem + leaves
  x.save(); x.translate(0, 30); x.rotate(sway); x.translate(0, -30)
  glowStroke(x, GREEN, 7, 14); x.beginPath(); x.moveTo(0, 30); x.quadraticCurveTo(8, (30 + top) / 2, 0, top); x.stroke()
  const leaf = (ly, dir, k) => {
    if (k <= 0) return
    x.save(); x.translate(2, ly); x.rotate(dir * 0.7); x.scale(k * dir, k)
    x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(30, -34, 70, -10); x.quadraticCurveTo(34, 18, 0, 0); x.closePath()
    x.fillStyle = rgba(GREEN, 0.4); x.fill(); glowStroke(x, GREEN, 5, 12); x.stroke(); x.restore()
  }
  leaf(-10, 1, easeOutBack(prog(grow, 0.35, 0.65)))
  leaf(-48, -1, easeOutBack(prog(grow, 0.6, 0.9)))
  if (bloom > 0) {
    x.save(); x.translate(0, top); x.scale(bloom, bloom); x.rotate(t * 0.4)
    for (let i = 0; i < 6; i++) {
      x.save(); x.rotate(i * Math.PI / 3); x.beginPath(); x.ellipse(0, -24, 15, 24, 0, 0, Math.PI * 2)
      x.fillStyle = rgba(PINK, 0.55); x.fill(); glowStroke(x, PINK, 4, 14); x.stroke(); x.restore()
    }
    x.shadowBlur = 0; x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 13, 0, Math.PI * 2); x.fill()
    x.restore()
  } else if (grow > 0.9) {
    x.fillStyle = GREEN; x.beginPath(); x.arc(0, top, 9, 0, Math.PI * 2); x.fill()
  }
  x.restore()
  // pot
  x.beginPath(); x.moveTo(-70, 30); x.lineTo(70, 30); x.lineTo(54, 120); x.lineTo(-54, 120); x.closePath()
  x.fillStyle = rgba('#e07a4a', 0.38); x.fill(); glowStroke(x, '#e88a5a', 7, 14); x.stroke()
  x.beginPath(); x.moveTo(-78, 30); x.lineTo(78, 30); x.lineTo(78, 50); x.lineTo(-78, 50); x.closePath(); x.stroke()
  x.restore()
}
export function signpost(x, cx, cy, s, t, { a = 1, swing = 0 } = {}) {
  if (a <= 0 || s <= 0) return
  begin(x, cx, cy, s, a)
  glowStroke(x, BONE, 8, 12); x.beginPath(); x.moveTo(0, 120); x.lineTo(0, -110); x.stroke()
  x.beginPath(); x.moveTo(-34, 120); x.lineTo(34, 120); x.stroke()
  const board = (by, dir, col, ang) => {
    x.save(); x.translate(0, by); x.rotate(ang)
    x.beginPath(); x.moveTo(-dir * 14, -28); x.lineTo(dir * 92, -28); x.lineTo(dir * 122, 0); x.lineTo(dir * 92, 28); x.lineTo(-dir * 14, 28); x.closePath()
    x.fillStyle = rgba(col, 0.38); x.fill(); glowStroke(x, col, 6, 16); x.stroke()
    // arrow mark
    glowStroke(x, BONE, 5, 6); x.beginPath(); x.moveTo(dir * 18, 0); x.lineTo(dir * 74, 0); x.moveTo(dir * 56, -14); x.lineTo(dir * 76, 0); x.lineTo(dir * 56, 14); x.stroke()
    x.restore()
  }
  board(-72, 1, GREEN, swing)
  board(2, -1, AIR, -swing * 0.8)
  x.restore()
}
/** clipboard with 3 rows; checks[i] 0..1 draws each tick */
export function clipboard(x, cx, cy, s, checks, { a = 1, rot = 0 } = {}) {
  if (a <= 0 || s <= 0) return
  begin(x, cx, cy, s, a, rot)
  x.beginPath(); x.roundRect(-110, -140, 220, 290, 22); x.fillStyle = 'rgba(20,14,40,0.82)'; x.fill()
  x.fillStyle = rgba(BONE, 0.12); x.fill(); glowStroke(x, BONE, 7, 16); x.stroke()
  x.beginPath(); x.roundRect(-46, -162, 92, 42, 12); x.fillStyle = rgba(GOLD, 0.6); x.fill(); glowStroke(x, GOLD, 6, 14); x.stroke()
  for (let i = 0; i < 3; i++) {
    const y = -62 + i * 76
    glowStroke(x, BONE, 5, 8); x.beginPath(); x.roundRect(-78, y - 22, 44, 44, 8); x.stroke()
    x.globalAlpha = a * 0.6; x.beginPath(); x.moveTo(-14, y); x.lineTo(76, y); x.stroke(); x.globalAlpha = a
    const k = checks[i] || 0
    if (k > 0) {
      x.save(); glowStroke(x, GREEN, 9, 16)
      const pts = [[-72, y - 2], [-58, y + 14], [-26, y - 30]]
      const L1 = Math.hypot(14, 16), L2 = Math.hypot(32, 44), d = k * (L1 + L2)
      x.beginPath(); x.moveTo(...pts[0])
      if (d <= L1) x.lineTo(lerp(pts[0][0], pts[1][0], d / L1), lerp(pts[0][1], pts[1][1], d / L1))
      else { x.lineTo(...pts[1]); const q = (d - L1) / L2; x.lineTo(lerp(pts[1][0], pts[2][0], q), lerp(pts[1][1], pts[2][1], q)) }
      x.stroke(); x.restore()
    }
  }
  x.restore()
}
/** a big stamp-style check mark */
export function bigCheck(x, cx, cy, s, k, a = 1) {
  if (k <= 0 || a <= 0) return
  x.save(); x.translate(cx, cy); x.scale(s, s); x.globalAlpha = a
  x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fillStyle = rgba(GREEN, 0.3); x.fill(); glowStroke(x, GREEN, 8, 22); x.stroke()
  glowStroke(x, '#eafff6', 13, 22)
  const d = clamp(k)
  x.beginPath(); x.moveTo(-32, 2)
  if (d < 0.35) x.lineTo(lerp(-32, -8, d / 0.35), lerp(2, 26, d / 0.35))
  else { x.lineTo(-8, 26); const q = (d - 0.35) / 0.65; x.lineTo(lerp(-8, 36, q), lerp(26, -28, q)) }
  x.stroke(); x.restore()
}
