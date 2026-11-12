// shared prop drawers for this film (a private copy per film folder; the kit is untouched)
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const RED = '#e23d4e', CREAM = '#fff8ea', WOOD = '#c98f5a', ORANGE = '#ffb34a', SLATE = '#9fb4c8', GREEN = '#5fd068', PURPLE = '#b07bff'

/** a paper sheet / card with a coloured header and text rows: [text, colour?, k?] */
export function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, paper = CREAM, ink = INK, font = MONO, headSize = 30, align = 'left' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 ${headSize}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = align; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, align === 'center' ? 0 : -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}

/** a phone with message bubbles: [text, colour, k, right?] */
export function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 ${size}px ${INTER}`; const w = Math.min(236, x.measureText(txt).width + 28)
    x.save(); x.translate(right ? 118 - w : -118, -70 + i * 74); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 14, 2, 210)
    x.restore()
  })
  x.restore()
}

/** a mini birth-chart wheel */
export function chartWheel(x, t, cx, cy, k, r = 140) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 140, k * r / 140); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', '#f3d79a', SKYB, GOLD, '#b6e08a', PINK, PURPLE, '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}

/** a cone of light from above */
export function spot(x, cx, top, bottom, w, k, col = '#fff6c8') {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.32 * k
  const g = x.createLinearGradient(0, top, 0, bottom); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,246,200,0.08)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, top); x.lineTo(cx + 40, top); x.lineTo(cx + w / 2, bottom); x.lineTo(cx - w / 2, bottom); x.closePath(); x.fill()
  x.restore()
}

/** a framed picture on the wall: draws `inner(x)` inside a w×h frame centred at 0,0 */
export function frame(x, cx, cy, k, w, h, inner, { rot = 0, col = GOLD, bg = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 - 14, -h / 2 - 8, w + 36, h + 36)
  x.fillStyle = INK; x.fillRect(-w / 2 - 24, -h / 2 - 24, w + 48, h + 48)
  x.fillStyle = col; x.fillRect(-w / 2 - 18, -h / 2 - 18, w + 36, h + 36)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); if (inner) inner(x); x.restore()
  x.restore()
}

/** a progress / meter bar with a label */
export function meter(x, cx, cy, k, p, { w = 300, h = 44, col = MINT, text = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w * clamp(p), h)
  if (text) { x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2) }
  x.restore()
}

/** a round clock face */
export function clock(x, cx, cy, k, hh, mm, r = 120) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 120, k * r / 120)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 56, Math.sin(ha) * 56); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 88, Math.sin(ma) * 88); x.stroke()
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 20)
  x.restore()
}

/** a big pixel number / word stamp in a box (for counters) */
export function counter(x, cx, cy, k, text, { size = 64, bg = GOLD, color = INK, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 30
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

// ── common pixel bitmaps
export const BM = {
  TOPHAT: ['..KKKKKK..', '..KKKKKK..', '..KKKKKK..', '..KKKKKK..', '..RRRRRR..', 'KKKKKKKKKK'],
  TOPHAT_C: { K: '#2a2350', R: RED },
  WAND: ['WW......', 'WWK.....', '..KK....', '...KK...', '....KK..', '.....KK.', '......KK'],
  WAND_C: { W: '#ffffff', K: INK },
  BUNNY: ['.W...W.', '.WP.PW.', '.WP.PW.', '.WW.WW.', 'WWWWWWW', 'WKWWWKW', 'WWWPWWW', '.WWWWW.'],
  BUNNY_C: { W: '#ffffff', P: PINK, K: INK },
  DOVE: ['....WW...', '...WWKW..', 'WWWWWWWO.', '.WWWWWW..', '..WWWW...', '...W.W...'],
  DOVE_C: { W: '#ffffff', K: INK, O: ORANGE },
  CARD: ['WWWWWW', 'WRWWWW', 'WWRRWW', 'WRRRRW', 'WWRRWW', 'WWWWRW', 'WWWWWW'],
  CARD_C: { W: '#ffffff', R: RED },
  MUG: ['.WWWWW..', 'WMMMMMWW', 'WMMMMMW.W', 'WMMMMMWW', 'WMMMMMW.', '.WWWWW..'],
  MUG_C: { W: CREAM, M: '#8a4a2e' },
  TENT: ['......K......', '.....KOK.....', '....KOOOK....', '...KOOKOOK...', '..KOOOKOOOK..', '.KOOOOKOOOOK.', 'KOOOOKKKOOOOK', 'KKKKKKKKKKKKK'],
  TENT_C: { K: INK, O: ORANGE },
  FIRE: ['...R.....', '..RR..R..', '..RYR.RR.', '.RYYRRYR.', '.RYYYYYR.', 'RRYWWYYRR', '.RYWWWYR.', 'BBBBBBBBB', '.BB...BB.'],
  FIRE_C: { R: RED, Y: GOLD, W: '#fff1a8', B: '#8a4a2e' },
  GIFT: ['...R.R...', '....R....', 'PPPPRPPPP', 'PPPPRPPPP', 'RRRRRRRRR', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP'],
  GIFT_C: { P: PINK, R: GOLD },
  PLANT: ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.....L.....', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...'],
  PLANT_C: { L: GREEN, T: '#d9774a' },
  BLANKET: ['PPPPPPPPPPPPPP', 'PWPPWPPWPPWPPW', 'PPPPPPPPPPPPPP', 'PPWPPWPPWPPWPP', 'PPPPPPPPPPPPPP'],
  BLANKET_C: { P: LAV, W: CREAM },
  TROPHY: ['YYYYYYYYY', 'Y.YYYYY.Y', 'Y.YYYYY.Y', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..'],
  TROPHY_C: { Y: GOLD, K: '#8a4a2e' },
  BALLOON: ['.RRR.', 'RRWRR', 'RRRRR', 'RRRRR', '.RRR.', '..K..', '..K..', '...K.', '..K..'],
  BALLOON_C: { R: PINK, W: '#ffffff', K: BONE },
  SOUP: ['.S.S.S.', '..S.S..', 'WWWWWWW', 'WOOOOOW', '.WOOOW.', '..WWW..'],
  SOUP_C: { S: '#d8dbe8', W: CREAM, O: ORANGE },
  CHEESE: ['....YY', '..YYYY', 'YYYYYY', 'YKYYKY', 'YYYYYY'],
  CHEESE_C: { Y: GOLD, K: '#d9a43a' },
  LOCK: ['..KKKK..', '.K....K.', '.K....K.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYYYYY'],
  LOCK_C: { K: '#c9c9d8', Y: GOLD },
  KEY: ['.YYY.......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......'],
  KEY_C: { Y: GOLD },
  BOOK: ['KKKKKKKKKKKKKKKK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLWWK', 'KWWWWWWKKWWWWWWK', 'KWLLLWWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KKKKKKKKKKKKKKKK'],
  BOOK_C: { K: '#8a4a2e', W: CREAM, L: '#9a90b8' },
  COUCH: ['.BBBBBBBBBBBB.', 'BBBBBBBBBBBBBB', 'BBCCCCCBCCCCBB', 'BBCCCCCBCCCCBB', 'BBBBBBBBBBBBBB', 'K............K'],
  COUCH_C: { B: '#6b62a8', C: '#8f86cc', K: INK },
  PIZZA: ['YYYYYYYYYY', '.YRYYYRYY.', '..YYYRYY..', '...YRYY...', '....YY....'],
  PIZZA_C: { Y: '#ffd23a', R: RED },
  CAMERA: ['..KKK.......', 'KKKKKKKKKKKK', 'KSSSKKKKSSSK', 'KSSKWWWKKSSK', 'KSSKWBWKKSSK', 'KSSKWWWKKSSK', 'KSSSKKKKSSSK', 'KKKKKKKKKKKK'],
  CAMERA_C: { K: '#2a2350', S: '#6b62a8', W: SKYB, B: INK },
  STAR5: ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY'],
  STAR5_C: { Y: GOLD },
  SHIELD: ['GGGGGGGGG', 'GWWWWWWWG', 'GWWWGWWWG', 'GWWGGGWWG', '.GWWGWWG.', '..GWWWG..', '...GGG...'],
  SHIELD_C: { G: MINT, W: CREAM },
}
export { drawBits }
