// small drawing helpers for this film's props (canvas, 1080×1920 kit coordinates). Pure functions of their inputs.
import { clamp, ease, lerp, prog } from '../../../src/lib.js'
import { drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', WOOD = '#c98f2a', BROWN = '#8a4a2e', GREY = '#9aa5c4', DEEP = '#140c30', PHONEC = '#2a2350', GREEN = '#5fd068', SUN = '#ffd23a', CLAY = '#c97a52', TEAL = '#4fc3b0'

/** a card: soft shadow, ink border, fill; fn() draws its content around (0, 0) */
export function card(x, cx, cy, w, h, k, { bg = CREAM, rot = 0.04, border = 6 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - border, -h / 2 - border, w + 2 * border, h + 2 * border)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** text at (px, py) in the current transform */
export function txt(x, s, px, py, { size = 30, font = INTER, weight = 800, color = INK, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a phone; fn() draws on the screen (screen is w-24 × h-48 around (0, 0)) */
export function phone(x, cx, cy, k, { rot = 0.05, w = 250, h = 400, head, headCol = LAV } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 4, -h / 2 + 8, w + 8, h + 12)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = PHONEC; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = DEEP; x.fillRect(-w / 2 + 12, -h / 2 + 24, w - 24, h - 48)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2 + 24, -h / 2 + 38, w - 48, 46); txt(x, head, 0, -h / 2 + 62, { size: 22, font: MONO, weight: 700 }) }
  if (fn) fn()
  x.restore()
}
/** a chat pill inside a phone (local coords) */
export function pill(x, s, px, py, k, { col = BONE, size = 24, w } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(px, py); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const W = w || x.measureText(s).width + 28
  x.fillStyle = INK; x.fillRect(-W / 2 - 3, -size * 0.75 - 3, W + 6, size * 1.5 + 6)
  x.fillStyle = col; x.fillRect(-W / 2, -size * 0.75, W, size * 1.5)
  txt(x, s, 0, 1, { size })
  x.restore()
}
/** a round wall clock; hands spin at `speed` */
export function clock(x, cx, cy, k, t, { r = 110, speed = 1, col = CREAM, rim = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 14, 0, 7); x.fill()
  x.fillStyle = rim; x.beginPath(); x.arc(0, 0, r + 6, 0, 7); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, r - 4, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * (r - 22) - 5, Math.sin(a) * (r - 22) - 5, 10, 10) }
  x.lineCap = 'round'; x.strokeStyle = INK
  const a1 = t * speed * 0.5 - Math.PI / 2, a2 = t * speed * 6 - Math.PI / 2
  x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a1) * r * 0.5, Math.sin(a1) * r * 0.5); x.stroke()
  x.lineWidth = 8; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a2) * r * 0.78, Math.sin(a2) * r * 0.78); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 12, 0, 7); x.fill()
  x.restore()
}
/** a mug or cup with optional steam and a word on it */
export function mug(x, cx, cy, k, t, { col = CREAM, fillCol = BROWN, w = 150, h = 170, steam = true, text, textCol = INK, rot = 0, handle = true, size = 28 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
  if (handle) { x.fillStyle = INK; x.fillRect(w / 2 - 6, -h / 2 + 30, 58, h - 70); x.fillStyle = col; x.fillRect(w / 2, -h / 2 + 38, 44, h - 86); x.fillStyle = INK; x.fillRect(w / 2, -h / 2 + 58, 24, h - 126) }
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = fillCol; x.fillRect(-w / 2 + 8, -h / 2 + 6, w - 16, 18)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2 + 14, -h / 2 + 34, 12, h - 60)
  if (text) txt(x, text, 0, 10, { size, color: textCol, font: MONO, weight: 700 })
  if (steam) {
    x.fillStyle = 'rgba(239,230,214,0.75)'
    for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) {
      const ph = ((t * 0.8 + j / 5 + i * 0.3) % 1)
      x.globalAlpha = Math.sin(Math.PI * ph) * 0.8
      x.fillRect(-36 + i * 36 + Math.sin(ph * 6 + i) * 10 - 6, -h / 2 - 20 - ph * 110, 12, 12)
    }
    x.globalAlpha = 1
  }
  x.restore()
}
/** a sticky note with a word (and a tilt) */
export function sticky(x, cx, cy, k, s, { col = SUN, rot = 0.05, w = 150, size = 28 } = {}) {
  card(x, cx, cy, w, w, k, { bg: col, rot, border: 4 }, () => {
    x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(-w / 2, -w / 2, w, 22)
    const lines = String(s).split('|')
    lines.forEach((l, i) => txt(x, l.trim(), 0, 8 + (i - (lines.length - 1) / 2) * size * 1.15, { size }))
  })
}
/** confetti falling over (cx, cy) from t0 */
export function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** speed lines trailing left of (cx, cy) */
export function speed(x, cx, cy, k, { n = 5, len = 160, col = BONE } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k) * 0.8; x.fillStyle = col
  for (let i = 0; i < n; i++) x.fillRect(cx - len - (i % 2) * 40, cy - (n - 1) * 14 + i * 28, len * (0.6 + 0.4 * ((i * 7) % 3) / 2), 8)
  x.restore()
}
/** a plate with optional food */
export function plate(x, cx, cy, k, { w = 260, col = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.ellipse(8, 14, w / 2, w * 0.16, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 6, w * 0.16 + 6, 0, 0, 7); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, w / 2, w * 0.16, 0, 0, 7); x.fill()
  x.fillStyle = 'rgba(0,0,0,0.08)'; x.beginPath(); x.ellipse(0, 0, w * 0.34, w * 0.1, 0, 0, 7); x.fill()
  if (fn) fn()
  x.restore()
}
export { clamp, ease, lerp, prog }
