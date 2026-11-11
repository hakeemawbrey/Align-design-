// props for this film: small pixel props and paper / phone / screen cards, drawn in the kit's 1080×1920 coordinates.
// (a per-film copy, so this film never depends on another film's folder)
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'

export const RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e', CREAM = '#fff4e2', GREY = '#9aa5c4', DEEP = '#2a2350', NIGHT = '#140c30'

function frame(x, cx, cy, k, rot, w, h, bg) {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
function fitFont(x, text, size, weight, font, maxW) {
  let s = size
  x.font = `${weight} ${s}px ${font}`
  while (s > 14 && x.measureText(text).width > maxW) { s -= 2; x.font = `${weight} ${s}px ${font}` }
  return s
}

/** a paper card / document: optional coloured header bar with a title, then text lines (strings or { t, c, s }) */
export function paper(x, cx, cy, k, { w = 300, h = 360, rot = 0.04, bg = BONE, head = null, headBg = RED, headColor = CREAM, lines = [], size = 28, color = INK, font = MONO, weight = 700, align = 'center', n = 99, gap = null, top = null } = {}) {
  if (k <= 0.01) return
  x.save(); frame(x, cx, cy, k, rot, w, h, bg)
  let y0 = -h / 2 + 24
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 64)
    x.fillStyle = headColor; x.textAlign = 'center'; x.textBaseline = 'middle'
    fitFont(x, head, 32, 800, INTER, w - 30); x.fillText(head, 0, -h / 2 + 33)
    y0 = -h / 2 + 64 + 18
  }
  if (top !== null) y0 = top
  const lg = gap || size * 1.55
  x.textBaseline = 'middle'
  lines.slice(0, n).forEach((l, i) => {
    const L = typeof l === 'string' ? { t: l } : l
    x.fillStyle = L.c || color; x.textAlign = align
    fitFont(x, L.t, L.s || size, L.w || weight, L.f || font, w - 36)
    x.fillText(L.t, align === 'left' ? -w / 2 + 22 : 0, y0 + lg * (i + 0.5))
  })
  x.restore()
}

/** a phone: dark screen, a header, chat bubbles (array of { t, me?, c? }) appearing one by one up to n */
export function phone(x, cx, cy, k, { rot = 0.05, w = 280, h = 470, head = '', headBg = DEEP, msgs = [], n = 99, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); frame(x, cx, cy, k, rot, w, h, '#2a2350')
  x.fillStyle = NIGHT; x.fillRect(-w / 2 + 12, -h / 2 + 34, w - 24, h - 68)
  x.fillStyle = '#6b62a8'; x.fillRect(-28, -h / 2 + 14, 56, 8); x.fillRect(-26, h / 2 - 22, 52, 8)
  let y = -h / 2 + 46
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2 + 12, -h / 2 + 34, w - 24, 52)
    x.fillStyle = CREAM; x.textAlign = 'center'; x.textBaseline = 'middle'; fitFont(x, head, 24, 700, MONO, w - 50); x.fillText(head, 0, -h / 2 + 60)
    y = -h / 2 + 100
  }
  msgs.slice(0, n).forEach(m => {
    const lines = String(m.t).split('|').map(s => s.trim())
    x.font = `800 ${size}px ${INTER}`
    const bw = Math.min(w - 50, Math.max(...lines.map(l => x.measureText(l).width)) + 28), bh = lines.length * size * 1.2 + 16
    const bx = m.me ? w / 2 - 22 - bw : -w / 2 + 22
    x.fillStyle = m.c || (m.me ? GOLD : BONE); x.fillRect(bx, y, bw, bh)
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((l, i) => x.fillText(l, bx + 14, y + 8 + size * 1.2 * (i + 0.5) + 1))
    y += bh + 12
  })
  x.restore()
}

/** a video-call tile: a little window with a sign star inside (or "camera off"), a name strip */
export function tile(x, t, cx, cy, k, { w = 230, h = 170, sign = 'aries', mood = 'happy', name = '', off = false, bg = DEEP, eyes = false, rot = 0, look } = {}) {
  if (k <= 0.01) return
  x.save(); frame(x, cx, cy, k, rot, w, h, off ? '#0b0718' : bg)
  if (off) {
    if (eyes) { x.fillStyle = MINT; const bl = Math.sin(t * 2.3) > 0.94 ? 2 : 14; x.fillRect(-34, -14, 16, bl); x.fillRect(18, -14, 16, bl) }
    else { x.fillStyle = '#6b62a8'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAMERA OFF', 0, -6) }
  } else signChar(x, t, sign, 0, 4, h * 0.62, { mood, seed: 50 + w, glyph: false, glow: 0.6, look })
  if (name) { x.fillStyle = 'rgba(6,4,18,0.75)'; x.fillRect(-w / 2, h / 2 - 30, w, 30); x.fillStyle = BONE; x.font = `700 18px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(name, -w / 2 + 10, h / 2 - 15) }
  x.restore()
}

/** a birth-chart wheel: twelve coloured houses, a few aspect lines */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
export function chart(x, cx, cy, r, k, t, { spin = 0.25, glitch = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * spin)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) {
    const g = glitch ? Math.sin(t * 17 + i * 3) * glitch * 18 : 0
    x.fillStyle = WHEEL[(i + Math.floor(glitch * t * 9)) % 12]; x.beginPath(); x.moveTo(g, 0); x.arc(g, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill()
  }
  x.fillStyle = NIGHT; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 3
  for (const [a, b] of [[0.4, 2.6], [2.6, 4.5], [4.5, 0.4], [1.2, 3.9]]) { x.beginPath(); x.moveTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55); x.lineTo(Math.cos(b) * r * 0.55, Math.sin(b) * r * 0.55); x.stroke() }
  x.fillStyle = GOLD
  for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.55 - 7, Math.sin(a) * r * 0.55 - 7, 14, 14)
  x.restore()
}

/** paper confetti falling */
export function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, cy - h / 2 + ph * h); x.rotate(t * 3 + i)
    x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}

/** a big digital readout (timer / clock) */
export function readout(x, cx, cy, k, text, { bg = NIGHT, color = MINT, size = 64, rot = 0.03, w = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `700 ${size}px ${MONO}`
  const W = w || x.measureText(text).width + 60, H = size + 40
  frame(x, cx, cy, k, rot, W, H, bg)
  x.fillStyle = color; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}

// ── bitmaps (cells; '.' = empty)
export const B = {
  MUG: { bm: ['.WWWWWW...', '.WRRRRW...', '.WRRRRWWW.', '.WRRRRW.W.', '.WRRRRWWW.', '.WRRRRW...', '..WWWW....'], c: { W: CREAM, R: RED } },
  PILLOW: { bm: ['W............W', '.WWWWWWWWWWWW.', '.WWWWWWWWWWWW.', '.WWWWWWWWWWWW.', '.WWWWWWWWWWWW.', 'W............W'], c: { W: BONE } },
  GIFT: { bm: ['..RR...RR..', '...RR.RR...', 'GGGGGRGGGGG', 'GGGGGRGGGGG', 'RRRRRRRRRRR', 'GGGGGRGGGGG', 'GGGGGRGGGGG', 'GGGGGRGGGGG', 'GGGGGRGGGGG'], c: { R: RED, G: MINT } },
  PIGGY: { bm: ['....P..P.....', '...PPPPPPP...', '..PPPPPPPPPP.', 'PPPPKPPPPPPPP', 'PPPPPPPPPPPPN', 'PPPPPPPPPPPPN', '.PPPPPPPPPPP.', '..PP....PP...'], c: { P: PINK, K: INK, N: '#ff4f86' } },
  TIMER: { bm: ['....RR....', '..RRRRRR..', '.RRWWWWRR.', 'RRWWWKWWRR', 'RRWWWKWWRR', 'RRWWKKWWRR', 'RRWWWWWWRR', '.RRWWWWRR.', '..RRRRRR..'], c: { R: RED, W: CREAM, K: INK } },
  SCALES: { bm: ['......Y......', '.....YYY.....', 'YYYYYYYYYYYYY', 'Y.....Y.....Y', 'Y.....Y.....Y', 'YYY...Y...YYY', 'YYYYY.Y.YYYYY', '......Y......', '......Y......', '....YYYYY....'], c: { Y: GOLD } },
  LAMP: { bm: ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', '....K....', '....K....', '....K....', '....K....', '..KKKKK..'], c: { Y: GOLD, K: '#6b62a8' } },
  DOOR: { bm: ['BBBBBBBB', 'BbbbbbbB', 'BbBBBBbB', 'BbBBBBbB', 'BbBBBBbB', 'BbbbbbbB', 'BbBBBBbB', 'BbBBBYbB', 'BbBBBBbB', 'BbBBBBbB', 'BbbbbbbB', 'BBBBBBBB'], c: { B: BROWN, b: '#6b3520', Y: GOLD } },
  CAKE: { bm: ['....F....', '....W....', '.PPPPPPP.', 'PWPWPWPWP', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC', '.WWWWWWW.'], c: { F: ORANGE, W: CREAM, P: PINK, C: '#c98f5a' } },
  BOWL: { bm: ['..Y.YY.Y.YY..', '.YYYYYYYYYYY.', 'RRRRRRRRRRRRR', '.RRRRRRRRRRR.', '..RRRRRRRRR..', '....RRRRR....'], c: { Y: GOLD, R: RED } },
  COOKIES: { bm: ['..CCC...CCC..', '.CkCCC.CCkCC.', '.CCCkC.CkCCC.', '..CCC...CCC..', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.'], c: { C: '#c98f5a', k: '#5a2e1a', W: CREAM } },
  PENCIL: { bm: ['PPPPPPPPPPPPYYYK', 'PPPPPPPPPPPPYYKK', 'PPPPPPPPPPPPYYYK'], c: { P: GOLD, Y: '#e8c39a', K: INK } },
  STUB: { bm: ['PPPYYK', 'PPPYKK', 'PPPYYK'], c: { P: GOLD, Y: '#e8c39a', K: INK } },
  KEY: { bm: ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y..Y.Y.', '.YYY.......'], c: { Y: GOLD } },
  HOOK: { bm: ['BBBBBBBBBBBB', 'BBBBBBBBBBBB', '..K..K..K...', '..K..K..K...', '..KK.KK.KK..'], c: { B: BROWN, K: GREY } },
  CASE: { bm: ['....KKKK....', '....K..K....', 'SSSSSSSSSSSS', 'SsSSSSSSSSsS', 'SsSSSSSSSSsS', 'SsSSSSSSSSsS', 'SsSSSSSSSSsS', 'SsSSSSSSSSsS', 'SSSSSSSSSSSS', '.K........K.'], c: { K: INK, S: SKYB, s: '#5fa8c9' } },
  MOUNTAIN: { bm: ['......WW......', '.....WWWW.....', '....GGGGGG....', '...GGGGGGGG...', '..GGGgGGGGGG..', '.GGGGGGGGgGGG.', 'GGGgGGGGGGGGGG'], c: { W: '#ffffff', G: '#8a87a8', g: '#6b6890' } },
  TREE: { bm: ['...G...', '..GGG..', '.GGGGG.', '..GGG..', '.GGGGG.', 'GGGGGGG', '...B...', '...B...'], c: { G: GREEN, B: BROWN } },
  SNAIL: { bm: ['....SSSS...', '...SsssSS..', '..SsSSsSS..', '..SsSsSSS.E', '..SSssSSS.E', 'BBBBBBBBBBB', '.BBBBBBBBB.'], c: { S: ORANGE, s: '#c97a2a', B: MINT, E: INK } },
  LEAF: { bm: ['.....GG', '...GGGG', '.GGGgGG', 'GGGgGG.', 'GGgGG..', '.gG....', 'g......'], c: { G: ORANGE, g: '#c9542a' } },
  SANDWICH: { bm: ['.BBBBBBBBBB.', 'BBBBBBBBBBBB', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', 'BBBBBBBBBBBB', '.BBBBBBBBBB.'], c: { B: '#e8a24a', G: GREEN, R: RED, Y: GOLD } },
  MICRO: { bm: ['KKKKKKKKKKKKKK', 'KGGGGGGGGKSSSK', 'KGGGGGGGGKSRSK', 'KGGGGGGGGKSSSK', 'KGGGGGGGGKSSSK', 'KGGGGGGGGKSSSK', 'KKKKKKKKKKKKKK'], c: { K: GREY, G: '#3a3466', S: '#c9c9d8', R: RED } },
  BOTTLE: { bm: ['.WWWW.', '.WWWW.', 'OOOOOO', 'OCCCCO', 'OCKKCO', 'OCCCCO', 'OOOOOO', 'OOOOOO'], c: { W: CREAM, O: ORANGE, C: CREAM, K: RED } },
  MOTH: { bm: ['G.....G', 'GG.K.GG', 'GGGKGGG', '.GGKGG.', 'GG.K.GG'], c: { G: GREY, K: INK } },
  HOODIE: { bm: ['...HHHH...', '..HHhhHH..', 'HHHHhhHHHH', 'HHHHHHHHHH', 'HH.HHHH.HH', 'HH.HHHH.HH', 'HH.HHHH.HH', '...HHHH...'], c: { H: LAV, h: '#6b62a8' } },
  PLANE: { bm: ['......S......', '.....SSS.....', 'SSSSSSSSSSSSS', '.....SSS.....', '....SSSSS....'], c: { S: '#ffffff' } },
  RINGLIGHT: { bm: ['..WWWWW..', '.WW...WW.', 'WW.....WW', 'W.......W', 'WW.....WW', '.WW...WW.', '..WWWWW..', '....K....', '....K....', '...KKK...'], c: { W: '#fff7c8', K: GREY } },
  MOON: { bm: ['..WWW..', '.WWWgW.', 'WWgWWWW', 'WWWWWgW', 'WgWWWWW', '.WWWgW.', '..WWW..'], c: { W: '#e8e4d8', g: '#b9b0a0' } },
  BOOT: { bm: ['.BBB....', '.BBB....', '.BBB....', '.BBBBBB.', 'BBBBBBBB', 'KKKKKKKK'], c: { B: BROWN, K: INK } },
  CAR: { bm: ['...RRRRRR....', '..RSSRSSSR...', 'RRRRRRRRRRRRR', 'RRRRRRRRRRRRR', '.KK.......KK.'], c: { R: RED, S: SKYB, K: INK } },
  CROWN: { bm: ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY'], c: { Y: GOLD, R: RED, B: SKYB } },
  DINO: { bm: ['......GGG.', '......GKGG', '......GGGG', 'G.....GG..', 'GG...GGG..', '.GGGGGGG..', '..GGGGG...', '..G...G...'], c: { G: GREEN, K: INK } },
  HANDS: { bm: ['..SSS..SSS..', '.SSSSSSSSSS.', 'SSSSSSSSSSSS', '.CCCC..CCCC.'], c: { S: '#e8c39a', C: SKYB } },
  TEAR: { bm: ['..S..', '.SSS.', 'SSSWS', 'SSSSS', '.SSS.'], c: { S: SKYB, W: '#ffffff' } },
  BAG: { bm: ['..KKKK..', '.K....K.', 'GGGGGGGG', 'GgGGGGgG', 'GGGGGGGG', 'GgGGGGgG', 'GGGGGGGG'], c: { K: INK, G: GREEN, g: '#3a9a48' } },
  SIGN: { bm: ['BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.....P......', '.....P......', '.....P......'], c: { B: BROWN, P: '#5a2e1a' } },
}
export const bits = (x, name, cx, cy, cell, opts) => drawBits(x, B[name].bm, B[name].c, cx, cy, cell, opts)
export { clamp, lerp, prog, ease }
