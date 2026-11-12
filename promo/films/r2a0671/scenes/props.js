// props for this film (pixel/canvas helpers in the signs3kit look; local to this film folder)
import { clamp, lerp, ease, prog } from '../../../src/lib.js'
import { drawBits, label, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const RED = '#e23d4e', CREAM = '#fff4e2', STEEL = '#9aa5c4', WOOD = '#8a4a2e', PLUM = '#2a2350', NIGHT = '#140c30'

/** mono sticker label */
export const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function shadowBox(x, l, tp, w, h, fillC, border = 8) {
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 12, tp + 14, w, h)
  x.fillStyle = INK; x.fillRect(l - border, tp - border, w + 2 * border, h + 2 * border)
  x.fillStyle = fillC; x.fillRect(l, tp, w, h)
}

/** a paper note / sheet with a header strip and text lines */
export function sheet(x, cx, cy, k, { w = 300, h = 300, rot = -0.04, bg = CREAM, head = '', headBg = RED, headInk = CREAM, lines = [], size = 30, font = INTER, weight = 800, ink = INK, align = 'center', progress = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadowBox(x, -w / 2, -h / 2, w, h, bg)
  let y0 = -h / 2 + 30
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = headInk; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 = -h / 2 + 100 }
  x.fillStyle = ink; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  const n = Math.ceil(lines.length * clamp(progress))
  const ax = align === 'left' ? -w / 2 + 24 : 0
  for (let i = 0; i < n; i++) { const l = lines[i]; if (Array.isArray(l)) { x.fillStyle = l[1]; x.fillText(l[0], ax, y0 + i * size * 1.35); x.fillStyle = ink } else x.fillText(l, ax, y0 + i * size * 1.35) }
  x.restore()
}

/** a pixel phone: head bar + chat chips [[text, colour, k, right?], …]; typing dots if typing > 0 */
export function phone(x, t, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, typing = 0, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = PLUM; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = NIGHT; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  let row = 0
  lines.forEach(([txt, col, kk, right]) => {
    if (kk <= 0.01) { row++; return }
    x.font = `700 ${size}px ${MONO}`; const w = Math.min(200, x.measureText(txt).width + 24)
    x.save(); x.translate(right ? 100 - w : -100, -64 + row * 62); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2, w - 20)
    x.restore(); row++
  })
  if (typing > 0.01) {
    x.save(); x.globalAlpha = clamp(typing); x.translate(-100, -64 + row * 62)
    x.fillStyle = BONE; x.fillRect(0, -22, 96, 44)
    for (let i = 0; i < 3; i++) { const up = Math.max(0, Math.sin(t * 9 - i * 0.9)) * 6; x.fillStyle = INK; x.fillRect(18 + i * 26, -6 - up, 12, 12) }
    x.restore()
  }
  x.restore()
}

/** little "z z z" drifting up */
export function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
/** steam wisps rising */
export function steam(x, t, cx, cy, { n = 3, alpha = 0.7, h = 110 } = {}) {
  x.save(); x.fillStyle = BONE
  for (let i = 0; i < n; i++) for (let j = 0; j < 6; j++) {
    const ph = ((t * 0.8 + i / n + j / 6) % 1 + 1) % 1
    x.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.8
    x.fillRect(cx + (i - (n - 1) / 2) * 34 + Math.sin(ph * 8 + i) * 8, cy - ph * h, 8, 8)
  }
  x.restore()
}
/** confetti burst from t0 */
export function confetti(x, t, cx, cy, t0, { n = 22, spread = 300, cols = [GOLD, PINK, MINT, SKYB, LAV] } = {}) {
  const tt = t - t0; if (tt < 0 || tt > 1.8) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(clamp(tt / 1.8))
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n - 0.5) * 2.4, v = 0.6 + (i * 37 % 10) / 14
    x.fillStyle = cols[i % cols.length]
    x.fillRect(cx + Math.cos(a) * spread * v * Math.min(1, tt * 2), cy + Math.sin(a) * spread * 0.8 * v * Math.min(1, tt * 2) + 260 * tt * tt, 12, 12)
  }
  x.restore()
}
/** a strike-through sticker swapped for a new one at lt = at */
export function swapLabel(x, cx, cy, lt, at, from, to, { size = 36, fromBg = STEEL, toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** a tiny pixel friend star */
export const friend = (x, t, id, cx, cy, s, k, o = {}) => (k > 0.01 ? signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 31, ...o }) : null)

// ── bitmaps
export const B = {
  MUG: ['.WWWWWW...', 'WBBBBBBW..', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW..', '.WWWWWW...'],
  APPLE: ['....G....', '...GG....', '.RRR.RRR.', 'RRWRRRRRR', 'RWRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '..RR.RR..'],
  PLATE: ['..PPPPPPPP..', '.PFFFFFFFFP.', 'PFOOFFGGFFFP', 'PFOOFFGGGFFP', 'PFFFFMMMFFFP', '.PFFFMMMFFP.', '..PPPPPPPP..'],
  BOWL: ['.N.N..N.N.N.', 'NNNNNNNNNNNN', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..', '...BBBBBB...', '....DDDD....'],
  SANDWICH: ['...CCCCCC...', '.CCCCCCCCCC.', 'CCCCCCCCCCCC', 'GGLGGLGGLGGL', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', 'CCCCCCCCCCCC', '.CCCCCCCCCC.'],
  BITTEN: ['...CCCCCC...', '.CCCCCCCC...', 'CCCCCCCCC...', 'GGLGGLGGL...', 'RRRRRRRRR..R', 'YYYYYYYYYY.Y', 'CCCCCCCCCCCC', '.CCCCCCCCCC.'],
  PIZZA: ['CCCCCCCCCC', '.YRYYYYRY.', '.YYYYRYYY.', '..YRYYYY..', '..YYYYR...', '...YYY....', '...YR.....', '....Y.....'],
  TROPHY: ['YYYYYYYYYY', 'YYWYYYYYYY', '.YYYYYYYY.', '..YYYYYY..', '...YYYY...', '....YY....', '....YY....', '..YYYYYY..', '.KKKKKKKK.'],
  BATT: ['KKKKKKKKKKKK.', 'KWWWWWWWWWWKK', 'KWWWWWWWWWWKK', 'KWWWWWWWWWWKK', 'KKKKKKKKKKKK.'],
  KEY: ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y..Y.Y.', '.YYY.......'],
  WRENCH: ['.S.S.......', '.S.S.......', '.SSS.......', '..SSSSSSSSS', '..SSSSSSSSS', '.SSS.......', '.S.S.......'],
  GIFT: ['...R...R...', '....R.R....', 'PPPPPRPPPPP', 'PPPPPRPPPPP', 'PPPPPRPPPPP', 'RRRRRRRRRRR', 'PPPPPRPPPPP', 'PPPPPRPPPPP', 'PPPPPRPPPPP'],
  HOUSE: ['..RRR..', '.RRRRR.', 'RRRRRRR', '.WWWWW.', '.WWDWW.', '.WWDWW.'],
  CLOCK: ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..'],
  MOON: ['..YYY..', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYY..'],
  LAPTOP: ['.KKKKKKKKKKKK.', '.KSSSSSSSSSSK.', '.KSSSSSSSSSSK.', '.KSSSSSSSSSSK.', '.KSSSSSSSSSSK.', '.KKKKKKKKKKKK.', 'GGGGGGGGGGGGGG', '.GGGGGGGGGGGG.'],
  BOX: ['BBBBBBBBBB', 'BDDDDDDDDB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB'],
  TISSUE: ['....WW....', '...WWWW...', '..WWWWW...', 'BBBBBBBBBB', 'BPPPPPPPPB', 'BPPHPPHPPB', 'BPPPPPPPPB', 'BBBBBBBBBB'],
  BAG: ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RRRRWWRRRR', 'RRRWWWWRRR', 'RRRRWWRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR'],
  BLANKET: ['..LLLLLLLLLLLL..', '.LLPLLPLLPLLPLL.', 'LLLLLLLLLLLLLLLL', 'LPLLPLLPLLPLLPLL', 'LLLLLLLLLLLLLLLL', 'LLPLLPLLPLLPLLPL'],
  UMB: ['....RRRR....', '..RRRRRRRR..', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', '.....K......', '.....K......', '.....K......', '.....K......', '...K.K......', '....K.......'],
  CLOUD: ['...WWWW.....', '.WWWWWWWW...', 'WWWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.'],
  DISH: ['.HH......HH.', 'DDDDDDDDDDDD', 'DOOOOOOOOOOD', 'DOROOROOROOD', 'DOOOOOOOOOOD', '.DDDDDDDDDD.'],
  SHIELD: ['SSSSSSSSS', 'SPPPPPPPS', 'SPHHPHHPS', 'SPHHHHHPS', 'SPPHHHPPS', '.SPPHPPS.', '..SPPPS..', '...SSS...'],
  PLANE: ['....W....', '...WWW...', 'WWWWWWWWW', '...WWW...', '...WWW...', '..WWWWW..'],
  SUITCASE: ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', '.K......K.'],
  SPRAY: ['..KKK...', '..KWK.WW', '..KKKKW.', '.BBBB...', '.BBBB...', 'BBBBBB..', 'BWWWWB..', 'BWWWWB..', 'BBBBBB..'],
  PILLOW: ['.WWWWWWWWWW.', 'WWWLWWWWLWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWLWWWWWLWWW', '.WWWWWWWWWW.'],
  LAMP: ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', '...KK...', '...KK...', '...KK...', '..KKKK..'],
  SHADES: ['KKKKK.KKKKK', 'KSSSKKKSSSK', 'KSSSK.KSSSK', '.KKK...KKK.'],
  MAP: ['GGGBBBBGGG', 'GGBBBBGGGG', 'GBBBGGGRGG', 'GBBGGGRRRG', 'GGGGGGGRGG', 'GGGBBGGGGG'],
  REMOTE: ['KKKKK', 'KRKBK', 'KKKKK', 'KWKWK', 'KKKKK', 'KWKWK', 'KKKKK', 'KWKWK', 'KKKKK'],
  COUCH: ['.CC......CC.', 'CCCCCCCCCCCC', 'CPPPPCPPPPPC', 'CPPPPCPPPPPC', 'CCCCCCCCCCCC', '.K........K.'],
  TV: ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK', '....KKKK....', '..KKKKKKKK..'],
  LENS: ['.KKKK....', 'KWWWWK...', 'KWBBWK...', 'KWBBWK...', 'KWWWWK...', '.KKKKK...', '.....KK..', '......KK.', '.......KK'],
  BACKPACK: ['..GGGG..', '.G....G.', 'GGGGGGGG', 'GGDDDDGG', 'GGDDDDGG', 'GGGGGGGG', 'GGGGGGGG', '.GGGGGG.'],
  GADGET: ['K.....K', '.K...K.', '..KKK..', 'SSSSSSS', 'SRSSSGS', 'SSSSSSS', 'SBSBSBS', 'SSSSSSS'],
  CANDLE: ['...Y...', '..YOY..', '...Y...', '..WWW..', '..WWW..', '..WWW..', '..WWW..', '.KKKKK.'],
  PEN: ['K.........', 'KYYYYYYYYR', 'KYYYYYYYYR'],
  GLOVE: ['.Y.Y.Y.', '.Y.Y.Y.', 'YYYYYYY', 'YYYYYYY', 'YYYYYY.', 'YYYYYY.', '.YYYY..', '.YYYY..'],
  CLIP: ['.SSSS.', 'S....S', 'S.SS.S', 'S.S..S', 'S.S.S.', 'S.S...', '.SS...'],
  PAPERS: ['WWWWWWWWW.', 'WLLLLLLLW.', 'WWWWWWWWWW', '.WLLLLLLLW', 'WWWWWWWWWW', 'WLLLLLLLW.', 'WWWWWWWWW.'],
  TWEEZ: ['S.....S', 'S.....S', '.S...S.', '.S...S.', '..S.S..', '..S.S..', '...S...', '...S...'],
  ROPE: ['YY............YY', 'YYRRRRRRRRRRRRYY', 'YY..RRRRRRRR..YY', 'YY............YY', 'YY............YY', 'YY............YY', 'YY............YY', 'YYYY........YYYY'],
  BROOM: ['....W...', '....W...', '....W...', '....W...', '....W...', '...YYY..', '..YYYYY.', '.YYYYYYY', 'YYYYYYYY'],
  COOKIE: ['..CCCC..', '.CCKCCC.', 'CCCCCKCC', 'CKCCCCCC', 'CCCCKCCC', '.CCCCCC.', '..CCCC..'],
  STUB: ['RRRRRRRRRRRR', 'RWWWWWWWWWWR', 'R.WWWWWWWW.R', 'RWWWWWWWWWWR', 'RRRRRRRRRRRR'],
  BOOK: ['KKKKKKKKKK', 'KBBBBKBBBK', 'KBWWBKBWWK', 'KBBBBKBBBK', 'KBWWBKBWWK', 'KBBBBKBBBK', 'KKKKKKKKKK'],
  FORK: ['S.S.S', 'S.S.S', 'SSSSS', '..S..', '..S..', '..S..', '..S..'],
  MEGA: ['......RR', '....RRRR', 'KKRRRRRR', 'KKRRRRRR', '....RRRR', '......RR'],
  HEARTB: ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'],
}
export const C = {
  MUG: { W: BONE, B: '#6b4a3a' },
  APPLE: { G: '#4fbf6a', R: RED, W: '#ffb0b0' },
  PLATE: { P: BONE, F: '#ffffff', O: '#ffb34a', G: '#4fbf6a', M: '#b5653d' },
  BOWL: { N: '#ffe27a', B: RED, D: '#a02a38' },
  SANDWICH: { C: '#e8b36a', G: '#4fbf6a', L: '#8fdc6a', R: RED, Y: '#ffe76a' },
  PIZZA: { C: '#c98f2a', Y: '#ffd23a', R: RED },
  TROPHY: { Y: GOLD, W: '#fff4c0', K: INK },
  BATT: { K: BONE, W: NIGHT }, KEY: { Y: GOLD }, WRENCH: { S: STEEL }, GIFT: { P: LAV, R: PINK }, HOUSE: { R: RED, W: CREAM, D: WOOD },
  CLOCK: { K: INK, W: BONE }, MOON: { Y: '#ffe7a8' }, LAPTOP: { K: INK, S: '#8fe3ff', G: STEEL },
  BOX: { B: '#c98f5a', D: '#8a5a32' }, TISSUE: { W: '#ffffff', B: '#6fc3ff', P: '#bfe6ff', H: PINK },
  BAG: { K: INK, R: RED, W: '#ffffff' }, BLANKET: { L: LAV, P: PINK }, UMB: { R: PINK, K: INK }, CLOUD: { W: STEEL },
  DISH: { H: STEEL, D: '#ffb34a', O: '#ffe27a', R: RED }, SHIELD: { S: STEEL, P: '#ff9a5a', H: PINK },
  PLANE: { W: BONE }, SUITCASE: { K: INK, B: '#6fc3ff', Y: GOLD }, SPRAY: { K: INK, W: '#ffffff', B: SKYB },
  PILLOW: { W: '#ffffff', L: LAV }, LAMP: { Y: '#ffe76a', K: INK }, SHADES: { K: INK, S: '#3a3a5a' },
  MAP: { G: '#7dd18a', B: SKYB, R: RED }, REMOTE: { K: '#2a2350', R: RED, B: SKYB, W: '#9aa5c4' },
  COUCH: { C: '#b46cff', P: '#d9a6ff', K: INK }, TV: { K: INK, B: '#3a5a9a' }, LENS: { K: INK, W: '#c9c9d8', B: SKYB },
  BACKPACK: { G: '#4fbf6a', D: '#2f8a48' }, GADGET: { K: INK, S: STEEL, R: RED, G: MINT, B: SKYB },
  CANDLE: { Y: GOLD, O: '#ff8a3a', W: CREAM, K: INK }, PEN: { K: INK, Y: '#ffd23a', R: PINK },
  GLOVE: { Y: '#ffe76a' }, CLIP: { S: STEEL }, PAPERS: { W: '#ffffff', L: STEEL }, TWEEZ: { S: STEEL },
  ROPE: { Y: GOLD, R: RED }, BROOM: { W: WOOD, Y: '#ffd23a' }, BITTEN: { C: '#e8b36a', G: '#4fbf6a', L: '#8fdc6a', R: RED, Y: '#ffe76a' }, COOKIE: { C: '#d99a52', K: '#5a3420' },
  STUB: { R: PINK, W: CREAM }, BOOK: { K: INK, B: LAV, W: CREAM }, FORK: { S: STEEL }, MEGA: { R: RED, K: INK },
  HEARTB: { H: PINK, W: '#fff' },
}
export const bits = (x, name, cx, cy, cell, o) => drawBits(x, B[name], C[name], cx, cy, cell, o)
export { clamp, lerp, ease, prog }

// ── extra helpers for this film
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
/** a little birth-chart wheel */
export function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.2)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = NIGHT; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; for (const a of [0.9, 2.4, 4.1, 5.4]) x.fillRect(Math.cos(a) * r * 0.42 - 7, Math.sin(a) * r * 0.42 - 7, 14, 14)
  x.restore()
}
/** soap bubbles floating up around (cx, cy) */
export function soap(x, t, cx, cy, { n = 7, spread = 260, r = 26, h = 300, alpha = 1, seed = 0 } = {}) {
  x.save(); x.lineWidth = 5
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.35 + i / n + seed * 0.13) % 1 + 1) % 1
    const rr = r * (0.6 + ((i * 37 + seed) % 7) / 8)
    const bx = cx + Math.sin(i * 2.3 + seed) * spread * 0.5 + Math.sin(ph * 6 + i) * 14, by = cy - ph * h
    x.globalAlpha = alpha * Math.sin(Math.PI * ph)
    x.fillStyle = 'rgba(190,235,255,0.25)'; x.beginPath(); x.arc(bx, by, rr, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#d9f4ff'; x.stroke()
    x.fillStyle = '#ffffff'; x.fillRect(bx - rr * 0.5, by - rr * 0.55, rr * 0.3, rr * 0.3)
  }
  x.restore()
}
/** rain streaks falling under a cloud */
export function rain(x, t, cx, cy, { w = 220, h = 220, n = 9, alpha = 1 } = {}) {
  x.save(); x.fillStyle = SKYB
  for (let i = 0; i < n; i++) { const ph = ((t * 1.6 + i / n * 0.7 + i * 0.37) % 1 + 1) % 1; x.globalAlpha = alpha * (1 - ph); x.fillRect(cx - w / 2 + (i + 0.5) * w / n, cy + ph * h, 6, 22) }
  x.restore()
}

// ── more bitmaps (this batch)
Object.assign(B, {
  FLOWER: ['..PP.PP..', '.PPPPPPP.', 'PPPYYYPPP', '.PPYYYPP.', 'PPPYYYPPP', '.PPPPPPP.', '..PP.PP..', '....G....', '..G.G....', '...GG.G..', '....GG...', '....G....'],
  SUN: ['...Y..Y...', 'Y...YY...Y', '..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', 'YYYYYYYYYY', '.YYYYYYYY.', '..YYYYYY..', 'Y...YY...Y', '...Y..Y...'],
  DUCK: ['...YYY....', '..YYKYY...', '..YYYYYOO.', '...YYY....', '.YYYYYYY..', 'YYYYYYYYY.', '.YYYYYYY..', '..OO.OO...'],
  SNOW: ['..W..', 'W.W.W', '.WWW.', 'WWWWW', '.WWW.', 'W.W.W', '..W..'],
  CART: ['K..........', '.K.........', '.KSSSSSSSSK', '..SKSKSKSK.', '..SSSSSSSS.', '...KKKKKK..', '...K....K..', '..KK....KK.'],
  TAG: ['..KKKKKKKK', '.KWWWWWWWK', 'KWWRWWWWWK', '.KWWWWWWWK', '..KKKKKKKK'],
  DOORX: ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDYDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KKKKKKKKKK'],
  SCALE: ['....K....', '...KKK...', 'KKKKKKKKK', 'K...K...K', 'K...K...K', 'YY..K..YY', 'YY..K..YY', '....K....', '..KKKKK..'],
  STAR5: ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY'],
  SEED: ['..GG..', '.GGGG.', '..GG..', '..BB..', 'BBBBBB', 'BBBBBB'],
  TENT: ['.....K.....', '....OOO....', '...OOOOO...', '..OOODOOO..', '.OOOODOOOO.', 'OOOOODOOOOO'],
})
Object.assign(C, {
  FLOWER: { P: PINK, Y: GOLD, G: '#4fbf6a' }, SUN: { Y: '#ffd23a' }, DUCK: { Y: '#ffe76a', K: INK, O: '#ff9a3a' },
  SNOW: { W: '#ffffff' }, CART: { K: INK, S: STEEL }, TAG: { K: INK, W: CREAM, R: RED },
  DOORX: { K: INK, W: '#c98f5a', D: WOOD, Y: GOLD }, SCALE: { K: STEEL, Y: GOLD }, STAR5: { Y: GOLD },
  SEED: { G: '#4fbf6a', B: WOOD }, TENT: { K: INK, O: '#ff9a4a', D: '#a8552a' },
})

// ── this film's bitmaps
Object.assign(B, {
  TUFT: ['..O...O..O', '.OO..OO.OO', 'OOOOOOOOOO', '.OOOOOOOO.', 'OOOO.OOOOO'],
  CLAP: ['KWKWKWKWKW', 'WKWKWKWKWK', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KKKKKKKKKK'],
})
Object.assign(C, { TUFT: { O: '#ffb34a' }, CLAP: { K: INK, W: BONE, S: '#3a3a5a' } })
