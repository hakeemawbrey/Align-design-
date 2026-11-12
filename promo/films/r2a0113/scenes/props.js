// Small prop helpers for this film (pixel cards, paper lists, a phone, a clock, a birth chart). Pure canvas drawing:
// every function takes the 2D context first and draws at the 1080×1920 stage coordinates the kit uses.
import { clamp } from '../../../src/lib.js'
import { drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a', SAGE = '#9fd8a8', BROWN = '#8a4a2e', GREY = '#9aa5c4'

/** an ink-outlined card with a soft drop shadow; fn(x) draws inside it in card-local coordinates */
export function card(x, cx, cy, w, h, col, { k = 1, rot = 0, shadow = true } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h) }
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(x)
  x.restore()
}
/** text in the card's coordinates */
export function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = col; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a paper list: a coloured header and rows of text; rows[i] = string or { s, col, strike, hi } */
export function list(x, cx, cy, k, { title, rows, w = 330, rowH = 52, head = RED, paper = CREAM, rot = 0.03, size = 26, shown = 99 }) {
  const h = 70 + rows.length * rowH + 20
  card(x, cx, cy, w, h, paper, { k, rot }, x => {
    x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, 62)
    txt(x, title, 0, -h / 2 + 32, 28, CREAM, { font: MONO, weight: 700 })
    rows.slice(0, shown).forEach((r, i) => {
      const o = typeof r === 'string' ? { s: r } : r, y = -h / 2 + 70 + rowH * (i + 0.5) + 6
      if (o.hi) { x.fillStyle = o.hi; x.fillRect(-w / 2 + 12, y - rowH / 2 + 4, w - 24, rowH - 8) }
      txt(x, o.s, -w / 2 + 24, y, o.size || size, o.col || INK, { font: MONO, weight: 700, align: 'left' })
      if (o.strike) { x.fillStyle = o.strike === true ? RED : o.strike; x.fillRect(-w / 2 + 18, y - 3, w - 36, 6) }
    })
  })
}
/** a phone; screen(x, w, h) draws on the screen in phone-local coordinates (origin at the screen's centre) */
export function phone(x, cx, cy, k, screen, { w = 260, h = 440, rot = 0.04, col = '#2a2350' } = {}) {
  card(x, cx, cy, w, h, col, { k, rot }, x => {
    x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 66)
    x.fillStyle = '#6b62a8'; x.fillRect(-26, h / 2 - 22, 52, 8)
    if (screen) { x.save(); x.beginPath(); x.rect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 66); x.clip(); x.translate(0, -18); screen(x, w - 28, h - 66); x.restore() }
  })
}
/** a chat bubble inside a phone screen */
export function chat(x, s, px, py, { col = LAV, ink = INK, size = 22, right = false, w } = {}) {
  x.font = `800 ${size}px ${INTER}`
  const ww = w || x.measureText(s).width + 28, hh = size + 20
  const l = right ? px - ww : px
  x.fillStyle = col; x.fillRect(l, py - hh / 2, ww, hh)
  txt(x, s, l + ww / 2, py + 1, size, ink)
}
/** a round clock face; minutes runs the big hand */
export function clock(x, cx, cy, k, { h = 9, m = 0, r = 110 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 10, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  x.strokeStyle = INK; x.lineCap = 'round'
  const hm = (h % 12 + m / 60) / 12 * Math.PI * 2, mm = m / 60 * Math.PI * 2
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(hm) * r * 0.45, -Math.cos(hm) * r * 0.45); x.stroke()
  x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(mm) * r * 0.72, -Math.cos(mm) * r * 0.72); x.stroke()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 9, 0, Math.PI * 2); x.fill()
  x.restore()
}
const SIGN_COLS = ['#ff6b5a', '#7fd67a', '#ffd84a', '#bfe3ff', '#ffb34a', '#c8e6a0', '#ff9ccf', '#b0386b', '#c58cff', '#8a8f9e', '#5fd0ff', '#9be7d8']
/** a little birth-chart wheel (twelve coloured wedges, ink spokes, a few planet dots) */
export function chart(x, t, cx, cy, k, { r = 130, spin = 0.15 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 10, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 12, 0, Math.PI * 2); x.fill()
  x.rotate(t * spin)
  for (let i = 0; i < 12; i++) { x.fillStyle = SIGN_COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.64, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3
  for (let i = 0; i < 4; i++) { const a = i * 1.3 + 0.4; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6); x.lineTo(Math.cos(a + 2.2) * r * 0.6, Math.sin(a + 2.2) * r * 0.6); x.stroke() }
  for (let i = 0; i < 5; i++) { const a = i * 1.25; x.fillStyle = [GOLD, PINK, MINT, SKYB, BONE][i]; x.fillRect(Math.cos(a) * r * 0.5 - 7, Math.sin(a) * r * 0.5 - 7, 14, 14) }
  x.restore()
}
/** a profile card: a sign star, a name line, an optional badge */
export function profile(x, t, cx, cy, k, { id, name, w = 250, h = 320, mood = 'happy', rot = 0.05, col = '#2a2350', ink = ORANGE } = {}) {
  card(x, cx, cy, w, h, col, { k, rot }, x => {
    x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
    signChar(x, t, id, 0, -26, 150, { mood, seed: 71, glyph: false, glow: 0.9 })
    txt(x, name, 0, h / 2 - 38, 28, ink, { font: MONO, weight: 700 })
  })
}

// ── pixel bitmaps
export const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
export const MUG = ['WWWWWWW..', 'WCCCCCWWW', 'WCCCCCW.W', 'WCCCCCW.W', 'WCCCCCWWW', 'WCCCCCW..', '.WWWWW...']
export const SUITCASE = ['....KKKK....', '....K..K....', 'OOOOOOOOOOOO', 'OOyOOOOOOyOO', 'OOyOOOOOOyOO', 'OOyOOOOOOyOO', 'OOyOOOOOOyOO', 'OOOOOOOOOOOO', '.K........K.']
export const SUITCASE_C = { K: INK, O: ORANGE, y: WOOD }
export const PEN = ['......RR', '.....RRR', '....RRR.', '...RRR..', '..RRR...', '.WRR....', 'WWW.....', 'W.......']
export const FLOWER = ['.PP.PP.', 'PPPPPPP', '.PPYPP.', 'PPPPPPP', '.PP.PP.', '...G...', '.GGG...', '...G...', '...GGG.', '...G...']
export const FLOWER_C = { P: PINK, Y: GOLD, G: '#5fd068' }
export const GIFT = ['...R.R...', '....R....', 'GGGGRGGGG', 'GGGGRGGGG', 'RRRRRRRRR', 'GGGGRGGGG', 'GGGGRGGGG', 'GGGGRGGGG']
export const GIFT_C = { R: RED, G: MINT }
export const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BbbbbbbB', 'BbbbbbbB', 'BBBBBBBB']
export const TISSUE_C = { W: '#ffffff', B: SKYB, b: '#c9f1ff' }
export const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
export const CLOUD = ['...WWW....', '..WWWWW.W.', '.WWWWWWWWW', 'WWWWWWWWWW', '.WWWWWWWW.']
export const COOKIE = ['..BBBB..', '.BBcBBB.', 'BBBBBcBB', 'BcBBBBBB', 'BBBBcBBB', '.BBBBBB.', '..BBBB..']
export const COOKIE_C = { B: '#d9a05b', c: BROWN }
export const PIZZA = ['RRRRRRRRRRR', '.YYYYYYYYY.', '.YRYYYYRYY.', '..YYYYYYY..', '..YYRYYYY..', '...YYYYY...', '....YRY....', '....YYY....', '.....Y.....']
export const PIZZA_C = { R: WOOD, Y: '#ffd84a' }
export const STAR5 = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y']
export const BALLOON = ['.RRR.', 'RRWRR', 'RRRRR', 'RRRRR', '.RRR.', '..K..', '..K..', '.K...', '..K..']
export const DIE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']
export const KEY_ = ['.YYY......', 'YY.YYYYYYY', 'YY.YY..Y.Y', '.YYY......']
export const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
export const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
export const BLANKET = ['LLLLLLLLLLLL', 'LWLLLLWLLLLW', 'LLLLLLLLLLLL', 'LLLWLLLLLWLL', 'LLLLLLLLLLLL', 'LWLLLLWLLLLW', 'LLLLLLLLLLLL']
export const HEARTBM = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export { drawBits, clamp }
