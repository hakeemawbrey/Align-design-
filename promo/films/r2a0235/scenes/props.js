// small drawing helpers for this film's props (canvas, 1080×1920 kit coordinates). Pure functions of their inputs.
import { clamp, ease, lerp, prog } from '../../../src/lib.js'
import { drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', WOOD = '#c98f2a', BROWN = '#8a4a2e', GREY = '#9aa5c4', DEEP = '#140c30', PHONEC = '#2a2350', GREEN = '#5fd068', SUN = '#ffd23a'

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
/** a phone with a coloured header and chat pills [text, colour, k] */
export function phone(x, cx, cy, k, { head = 'CHAT', headCol = LAV, lines = [], rot = 0.05, size = 24, w = 248, h = 388 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 2, -h / 2 + 2, w + 8, h + 12)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = PHONEC; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = DEEP; x.fillRect(-w / 2 + 12, -h / 2 + 24, w - 24, h - 48)
  x.fillStyle = headCol; x.fillRect(-w / 2 + 24, -h / 2 + 38, w - 48, 46)
  txt(x, head, 0, -h / 2 + 62, { size: 22, font: MONO, weight: 700 })
  lines.forEach(([s, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 12 : -12, -h / 2 + 130 + i * 62); x.scale(kk, kk)
    x.font = `800 ${size}px ${INTER}`; const tw = Math.min(w - 30, x.measureText(s).width + 28)
    x.fillStyle = col; x.fillRect(-tw / 2, -24, tw, 48); txt(x, s, 0, 2, { size })
    x.restore()
  })
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
/** a little birth-chart wheel */
export function chart(x, cx, cy, r, k, t, spin = 0.25) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * spin)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = DEEP; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.55 - 7, Math.sin(a) * r * 0.55 - 7, 14, 14)
  x.restore()
}
/** a round wall clock showing h:m */
export function clock(x, cx, cy, r, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-w / 2, -len, w, len); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 10); hand(m / 60 * Math.PI * 2, r * 0.75, 6)
  x.fillStyle = RED; x.fillRect(-7, -7, 14, 14)
  x.restore()
}
/** paper confetti falling around (cx, cy) from t0 */
export function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, cy - h / 2 + ph * h); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel sun with turning rays */
export function sun(x, t, cx, cy, r, k, { face = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(t * 0.4)
  for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); x.fillStyle = INK; x.fillRect(-11, -r - 46, 22, 40); x.fillStyle = i % 2 ? ORANGE : SUN; x.fillRect(-7, -r - 42, 14, 32) }
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = SUN; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(-r * 0.3, -r * 0.3, r * 0.28, 0, Math.PI * 2); x.fill()
  if (face) { x.fillStyle = INK; x.fillRect(-r * 0.35, -r * 0.1, r * 0.16, r * 0.2); x.fillRect(r * 0.2, -r * 0.1, r * 0.16, r * 0.2); x.fillRect(-r * 0.25, r * 0.3, r * 0.5, r * 0.1) }
  x.restore()
}
/** a warm light beam from (tx, ty) down to a floor ellipse at (bx, by) */
export function beam(x, tx, ty, bx, by, w, k, { col = '#fff1b0', a = 0.32 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = a * k; x.fillStyle = col
  x.beginPath(); x.moveTo(tx - 40, ty); x.lineTo(tx + 40, ty); x.lineTo(bx + w, by); x.lineTo(bx - w, by); x.closePath(); x.fill()
  x.globalAlpha = 0.5 * a / 0.32 * k; x.beginPath(); x.ellipse(bx, by, w, 34, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** pixel sunglasses centred on (cx, cy), width ~ 9·cell */
const SHADES = ['KKKKKKKKKKKKK', 'KBBBBKKKBBBBK', 'KBWBBK.KBWBBK', '.KBBK...KBBK.']
export function shades(x, cx, cy, cell, k = 1) { drawBits(x, SHADES, { K: INK, B: '#2a2350', W: '#8fe3ff' }, cx, cy, cell * k, { outline: null }) }
/** a laptop (screen fn draws inside a 240×150 screen centred at 0, -90) */
export function laptop(x, cx, cy, k, fn, { rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 200); x.fillStyle = PHONEC; x.fillRect(-140, -180, 280, 180)
  x.fillStyle = DEEP; x.fillRect(-126, -166, 252, 152)
  if (fn) { x.save(); x.translate(0, -90); fn(); x.restore() }
  x.fillStyle = INK; x.fillRect(-190, 6, 380, 30); x.fillStyle = GREY; x.fillRect(-182, 10, 364, 20)
  x.restore()
}
/** a pill-shaped progress bar with a caption above */
export function bar(x, cx, cy, k, p, text, { col = MINT, w = 360 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -40, w + 20, 80); x.fillStyle = PHONEC; x.fillRect(-w / 2, -30, w, 60)
  x.fillStyle = col; x.fillRect(-w / 2, -30, w * clamp(p), 60)
  if (text) txt(x, text, 0, -80, { size: 34, font: MONO, weight: 700, color: BONE })
  x.restore()
}
export const pulse = (t, f = 6) => 1 + 0.04 * Math.sin(t * f)
/** a fancy white plate (big rim, tiny centre); fn() draws the food around (0, 0) */
export function plate(x, cx, cy, r, k, fn, { rim = CREAM, well = '#f4ead8' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k * 0.62)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 16, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = rim; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = well; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.restore()
  if (fn) { x.save(); x.translate(cx, cy); x.scale(k, k); fn(); x.restore() }
}
/** a rounded pill with text (for little UI chips) */
export function pill(x, cx, cy, text, k, { size = 30, bg = MINT, color = INK, font = MONO, weight = 700, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 40, h = size + 24
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, h / 2 + 5); x.fill()
  x.fillStyle = bg; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.fill()
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export { clamp, ease, lerp, prog, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO }
