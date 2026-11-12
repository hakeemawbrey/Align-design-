// props for this film: small pixel drawings and paper/phone cards, kept in the film's own folder.
// Nothing here touches `document` (the sound build imports scenes/index.js in node).
import { clamp } from '../../src/lib.js'
import { drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../signs3kit.js'

export const ORANGE = '#ffb34a', RED = '#e23d4e', WOOD = '#c98f2a', PAPER = '#fff4e2', GREEN = '#58c26a', SLATE = '#2a2350'

const shadow = (x, l, tp, w, h) => { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }

/** a phone: clock line on top, an optional small header, then a message card */
export function phone(x, cx, cy, k, { top = '9:41', head = '', msg = '', bg = LAV, rot = 0.05, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -124, -194, 248, 388)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = SLATE; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = BONE; x.font = `700 40px ${MONO}`; x.fillText(top, 0, -112)
  if (msg) {
    const lines = String(msg).split('|').map(s => s.trim())
    x.font = `800 ${size}px ${INTER}`
    const mw = Math.max(...lines.map(l => x.measureText(l).width))
    if (mw > 172) size = Math.floor(size * 172 / mw)
    const h = (head ? 40 : 0) + lines.length * size * 1.2 + 34
    x.fillStyle = bg; x.fillRect(-94, -40, 188, h)
    x.fillStyle = INK
    if (head) { x.font = `700 20px ${MONO}`; x.fillText(head, 0, -16) }
    x.font = `800 ${size}px ${INTER}`
    lines.forEach((l, i) => x.fillText(l, 0, -40 + (head ? 40 : 0) + 17 + size * 1.2 * (i + 0.5)))
  }
  x.restore()
}

/** a paper note / card: optional coloured header band, then lines of text */
export function note(x, cx, cy, k, lines, { w = 340, head = '', headBg = PINK, bg = PAPER, size = 34, rot = -0.04, font = INTER, weight = 800, color = INK, lh = 1.3, strike = [] } = {}) {
  if (k <= 0.01) return
  const L = String(lines).split('|').map(s => s.trim()).filter(Boolean)
  const hh = head ? 56 : 0, h = hh + L.length * size * lh + 40
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, hh); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + hh / 2 + 2) }
  x.font = `${weight} ${size}px ${font}`
  L.forEach((l, i) => {
    const y = -h / 2 + hh + 20 + size * lh * (i + 0.5)
    x.fillStyle = color; x.fillText(l, 0, y)
    if (strike.includes(i)) { const tw = x.measureText(l).width; x.fillStyle = RED; x.fillRect(-tw / 2 - 6, y - 3, tw + 12, 7) }
  })
  x.restore()
}

/** a horizontal meter that fills (battery-free version: a rounded bar with a label above) */
export function meter(x, cx, cy, k, p, { w = 300, col = MINT, title = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (title) { x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -62) }
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -36, w + 16, 72)
  x.fillStyle = SLATE; x.fillRect(-w / 2, -28, w, 56)
  x.fillStyle = col; x.fillRect(-w / 2, -28, w * clamp(p), 56)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2, -28, w * clamp(p), 10)
  x.restore()
}

/** a framed picture: draw(x) paints inside a w×h box centred on 0,0 */
export function frame(x, cx, cy, k, w, h, draw, { col = GOLD, rot = -0.03 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -w / 2 - 18, -h / 2 - 18, w + 36, h + 36)
  x.fillStyle = INK; x.fillRect(-w / 2 - 24, -h / 2 - 24, w + 48, h + 48)
  x.fillStyle = col; x.fillRect(-w / 2 - 18, -h / 2 - 18, w + 36, h + 36)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = '#241a52'; x.fillRect(-w / 2, -h / 2, w, h)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); draw(x); x.restore()
  x.restore()
}

/** a page-a-day calendar */
export function calendar(x, cx, cy, k, top, big, { rot = 0.04, topBg = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -130, -140, 260, 280)
  x.fillStyle = INK; x.fillRect(-136, -146, 272, 292)
  x.fillStyle = PAPER; x.fillRect(-130, -140, 260, 280)
  x.fillStyle = topBg; x.fillRect(-130, -140, 260, 70)
  x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(top, 0, -104)
  x.fillStyle = INK; x.font = `800 ${String(big).length > 4 ? 52 : 92}px ${INTER}`; x.fillText(big, 0, 30)
  x.restore()
}

// ── pixel bitmaps (use with drawBits)
export const BM = {
  gift: [['..R...R..', '...R.R...', 'YYYYRYYYY', 'YYYYRYYYY', 'RRRRRRRRR', 'YYYYRYYYY', 'YYYYRYYYY', 'YYYYRYYYY', 'YYYYRYYYY'], { Y: '#7dc8ff', R: PINK }],
  mug: [['.WWWWWW...', 'WRRRRRRW..', 'WRRRRRRWWW', 'WRRWRRRW.W', 'WRRRRRRWWW', 'WRRRRRRW..', '.WWWWWW...'], { W: PAPER, R: PINK }],
  plant: [['...G.G...', '..GGGGG..', '.GG.G.GG.', '..GGGGG..', '...GGG...', '..PPPPP..', '..PPPPP..', '...PPP...'], { G: GREEN, P: ORANGE }],
  envelope: [['WWWWWWWWWWW', 'WPWWWWWWWPW', 'WWPWWWWWPWW', 'WWWPWWWPWWW', 'WWWWPHPWWWW', 'WWWWWPWWWWW', 'WWWWWWWWWWW'], { W: PAPER, P: '#d9c9ad', H: '#ff4f86' }],
  cookie: [['..CCCC..', '.CCcCCC.', 'CCCCCcCC', 'CcCCCCCC', 'CCCCcCCC', 'CCcCCCcC', '.CCCCCC.', '..CCCC..'], { C: '#d9a35a', c: '#5a3a1e' }],
  flower: [['..P.P..', '.PPPPP.', 'PPYYYPP', '.PYYYP.', 'PPYYYPP', '.PPPPP.', '..PGP..', '...G...', '..GG...', '...G...'], { P: PINK, Y: GOLD, G: GREEN }],
  sun: [['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...'], { Y: GOLD }],
  moon: [['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.'], { Y: '#fff1b0' }],
  house: [['....R....', '...RRR...', '..RRRRR..', '.RRRRRRR.', 'RRRRRRRRR', '.WWWWWWW.', '.WYWWWDW.', '.WWWWWDW.', '.WWWWWDW.'], { R: RED, W: PAPER, Y: GOLD, D: WOOD }],
  book: [['BBBBBBBBB.', 'BWWWWWWWBB', 'BWWWWWWWBB', 'BWWWWWWWBB', 'BWWWWWWWBB', 'BBBBBBBBBB', '.BBBBBBBBB'], { B: '#6f8cff', W: PAPER }],
  clock: [['..WWWWW..', '.W.....W.', 'W...I...W', 'W...I...W', 'W...IIII.W'.slice(0, 9), 'W.......W', '.W.....W.', '..WWWWW..'], { W: BONE, I: INK }],
  suitcase: [['...BBB...', '...B.B...', 'OOOOOOOOO', 'OBOOOOOBO', 'OBOOOOOBO', 'OBOOOOOBO', 'OOOOOOOOO'], { O: ORANGE, B: WOOD }],
  pillow: [['.WWWWWWWWW.', 'WLLLLLLLLLW', 'WWWWWWWWWWW', 'WLLLLLLLLLW', '.WWWWWWWWW.'], { W: PAPER, L: PINK }],
  trophy: [['YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '...Y...', '..YYY..', '.WWWWW.'], { Y: GOLD, W: WOOD }],
  star: [['...Y...', '...Y...', 'YYYYYYY', '.YYYYY.', '..YYY..', '.YY.YY.', 'Y.....Y'], { Y: GOLD }],
  key: [['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......'], { Y: GOLD }],
  umbrella: [['...RRRRR...', '.RRRRRRRRR.', 'RRRRRRRRRRR', 'R...R.R...R', '.....W.....', '.....W.....', '.....W.....', '...W.W.....', '....W......'], { R: '#6f8cff', W: BONE }],
  heart: [['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }],
  cake: [['...F.F.F...', '...C.C.C...', '.PPPPPPPPP.', 'WWWWWWWWWWW', 'PPPPPPPPPPP', 'WWWWWWWWWWW', 'PPPPPPPPPPP'], { F: GOLD, C: BONE, P: PINK, W: PAPER }],
  bowl: [['..S.S.S..', '...S.S...', 'BBBBBBBBB', 'BWWWWWWWB', '.BWWWWWB.', '..BBBBB..'], { S: BONE, B: SKYB, W: PAPER }],
  shell: [['....SSS....', '..SSSSSSS..', '.SSsSSSsSS.', 'SSsSSSSSsSS', 'SSSSSSSSSSS', 'BBBBBBBBBBB'], { S: '#ffd6b0', s: '#e0a77a', B: '#8a5a3a' }],
  balloon: [['.RRR.', 'RRRRR', 'RWRRR', 'RRRRR', '.RRR.', '..R..', '..W..', '..W..', '..W..', '..W..'], { R: '#ff4f86', W: BONE }],
}
export const bits = (x, name, cx, cy, cell, o) => { const [bm, c] = BM[name]; drawBits(x, bm, c, cx, cy, cell, o) }
