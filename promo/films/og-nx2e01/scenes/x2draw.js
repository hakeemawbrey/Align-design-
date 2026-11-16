// x2draw — chalk-board drawing helpers for "Star Talk Explains, Volume 2" (import from '../../nx2e01/scenes/x2draw.js').
//   disc(x, cx, cy, r, color, a)            a filled chalk disc (no draw-on), for things that move
//   sunChalk(x, cx, cy, r, t, a)            the Sun: a yellow disc with turning chalk rays
//   earthChalk(x, cx, cy, r, a)             Earth: a blue disc with two green blobs
//   moonPhase(x, cx, cy, r, phase, a)       the Moon as seen from Earth; phase 0 new · 0.25 first quarter · 0.5 full ·
//                                           0.75 last quarter (lit on the right while waxing, Northern Hemisphere view)
//   litHalf(x, cx, cy, r, ang, a)           a body with the half facing angle `ang` lit (orbit diagrams, seen from above)
//   pixHeart(x, cx, cy, px, a, col)         a pixel heart
//   popK(t, at, d)                          0…1 springy pop-in
// Pure f(t); nothing touches `document`.
import { clamp, prog } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { EX } from '../../stexplain.js'

const INK = '#1b1236'
export const popK = (t, at, d = 0.35) => (t < at ? 0 : easeOutBack(prog(t, at, at + d), 2))
export const fadeK = (t, at, d = 0.3) => clamp(prog(t, at, at + d))

export function disc(x, cx, cy, r, color, a = 1, fillA = 0.35) {
  if (a <= 0 || r <= 0) return
  x.save(); x.globalAlpha *= a
  x.shadowColor = color; x.shadowBlur = 14
  x.save(); x.globalAlpha *= fillA; x.fillStyle = color; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  x.lineWidth = 5; x.strokeStyle = color; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  x.restore()
}
export function sunChalk(x, cx, cy, r, t, a = 1) {
  if (a <= 0) return
  disc(x, cx, cy, r, EX.chalkYellow, a, 0.45)
  x.save(); x.globalAlpha *= a; x.strokeStyle = EX.chalkYellow; x.lineWidth = 5; x.lineCap = 'round'
  x.shadowColor = EX.chalkYellow; x.shadowBlur = 10
  for (let i = 0; i < 8; i++) {
    const g = i * Math.PI / 4 + t * 0.4
    x.beginPath(); x.moveTo(cx + Math.cos(g) * (r + 10), cy + Math.sin(g) * (r + 10)); x.lineTo(cx + Math.cos(g) * (r + 26), cy + Math.sin(g) * (r + 26)); x.stroke()
  }
  x.restore()
}
export function earthChalk(x, cx, cy, r, a = 1) {
  if (a <= 0) return
  disc(x, cx, cy, r, EX.chalkBlue, a, 0.5)
  x.save(); x.globalAlpha *= a * 0.85; x.fillStyle = EX.chalkGreen
  x.beginPath(); x.ellipse(cx - r * 0.25, cy - r * 0.2, r * 0.35, r * 0.25, 0.5, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.ellipse(cx + r * 0.3, cy + r * 0.3, r * 0.22, r * 0.3, -0.3, 0, Math.PI * 2); x.fill()
  x.restore()
}
const LIT = '#f4f1e8', DARK = '#142820'
export function moonPhase(x, cx, cy, r, phase, a = 1) {
  if (a <= 0) return
  const ph = ((phase % 1) + 1) % 1
  x.save(); x.globalAlpha *= a
  x.shadowColor = LIT; x.shadowBlur = 16 * (0.3 + Math.sin(Math.PI * ph))
  x.fillStyle = DARK; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.shadowBlur = 0
  const waxing = ph < 0.5
  const c = Math.cos(2 * Math.PI * ph)                 // 1 new · 0 quarter · −1 full
  // the lit half (right while waxing, left while waning)
  x.fillStyle = LIT; x.beginPath()
  if (waxing) x.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2); else x.arc(cx, cy, r, Math.PI / 2, Math.PI * 1.5)
  x.closePath(); x.fill()
  // the terminator ellipse: dark over the lit half for crescents, lit over the dark half for gibbous
  const w = Math.abs(c) * r
  if (w > 0.5) {
    x.fillStyle = c > 0 ? DARK : LIT
    x.beginPath(); x.ellipse(cx, cy, w, r, 0, 0, Math.PI * 2); x.fill()
  }
  x.lineWidth = 4; x.strokeStyle = 'rgba(244,241,232,0.8)'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  x.restore()
}
export function litHalf(x, cx, cy, r, ang, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.fillStyle = DARK; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = LIT; x.beginPath(); x.arc(cx, cy, r, ang - Math.PI / 2, ang + Math.PI / 2); x.closePath(); x.fill()
  x.lineWidth = 4; x.strokeStyle = 'rgba(244,241,232,0.85)'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  x.restore()
}
const HEART = ['.HH...HH.', 'HHHH.HHHH', 'HHHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
export function pixHeart(x, cx, cy, px, a = 1, col = '#ff4f86') {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  for (const pass of [0, 1]) HEART.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch !== 'H') return
    const X = Math.round(cx + (i - 4.5) * px), Y = Math.round(cy + (j - 4) * px)
    if (!pass) { x.fillStyle = INK; x.fillRect(X - 3, Y - 3, Math.ceil(px) + 6, Math.ceil(px) + 6) }
    else { x.fillStyle = j < 2 && i % 3 === 1 ? '#ffd1de' : col; x.fillRect(X, Y, Math.ceil(px), Math.ceil(px)) }
  }))
  x.restore()
}
