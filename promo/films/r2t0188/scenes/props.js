// small prop helpers for this film (local copy; the format look lives in ../../signs3kit.js)
import { INK, BONE, GOLD, PINK, MINT, LAV, SKYB, INTER, MONO, SERIF } from '../../signs3kit.js'

export const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ff9a4a', WOOD = '#8a4a2e', GREY = '#9aa5c4', DEEP = '#140c30', GREEN = '#5fd068', PURPLE = '#c97bff', NIGHT = '#2a2350'

/** text at (cx, cy) */
export function txt(x, s, cx, cy, { size = 32, font = INTER, weight = 800, color = INK, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
/** a shadowed, ink-outlined card scaled by k; fn draws inside (origin at the card centre) */
export function card(x, cx, cy, w, h, k, { bg = CREAM, rot = 0 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** a phone; fn draws on the screen (origin at the screen centre, screen 216 × 320) */
export function phone(x, cx, cy, k, { rot = 0.05 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = NIGHT; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = DEEP; x.fillRect(-108, -160, 216, 320)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  if (fn) { x.save(); x.beginPath(); x.rect(-108, -160, 216, 320); x.clip(); fn(); x.restore() }
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
export function wheel(x, cx, cy, r, k, t, spin = 0.25) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * spin)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = DEEP; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
/** sunglasses on the star sprite (call inside inSprite: sprite cell units) */
export function shadesCells(x, col = INK) {
  x.fillStyle = col
  x.fillRect(6, 17, 10, 6); x.fillRect(20, 17, 10, 6); x.fillRect(15, 18, 6, 1.6)
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(7.5, 18, 3, 1.4); x.fillRect(21.5, 18, 3, 1.4)
}
/** a soft speech-free sticker: a small coloured tag on a string (price tags, labels on props) */
export function tag(x, cx, cy, text, k, { rot = 0.2, bg = CREAM, size = 22 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + 24, h = size + 18
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a glass tank of water with rising bubbles; fn draws inside (clipped, origin at the tank centre) */
export function tank(x, t, cx, cy, w, h, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#3d8fd8'); g.addColorStop(1, '#1a3f8a')
  x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  x.fillStyle = 'rgba(255,255,255,0.35)'
  for (let i = 0; i < 6; i++) { const ph = ((t * 0.35 + i / 6) % 1); x.fillRect(-w / 2 + 20 + ((i * 53) % (w - 40)), h / 2 - ph * h, 8, 8) }
  if (fn) fn()
  x.restore()
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(-w / 2 + 12, -h / 2 + 12, 18, h - 24)
  x.restore()
}
