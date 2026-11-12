// r2t0411: star_talk, ROLL CALL, "The signs on | a *long bus ride.*" (~59 s vertical, signs3kit social cut, music: lofi · C). Ending: lesson.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const K = (t, P, d, dur = 0.3, s = 2) => pop01(t, P.t0 + d, dur, s)
const ST = { x: -170 }

/** a sheet of paper / list with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { if (typeof l === 'function') l = l(); if (l) x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)) })
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a crossed-out sticker swapped for a new one at local time `at` */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = GREY, toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const DROP = ['.B.', 'BBB', 'BBB', '.B.']
function rain(x, t, cx, cy, w, h, n, col = SKYB, rate = 1.2) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * rate + i * 0.173) % 1 + 1) % 1
    drawBits(x, DROP, { B: col }, cx - w / 2 + ((i * 97) % w), cy + ph * h, 7, { alpha: Math.sin(Math.PI * ph) })
  }
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 20, spread = 320, h = 480 } = {}) {
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
/** a plain rounded box with centred text lines (screens, signs, tickets) */
function card(x, cx, cy, k, w, h, lines, { bg = BONE, fg = INK, rot = 0.04, size = 32, font = INTER, weight = 800, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let top = -h / 2, hh = h
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); top += 56; hh -= 56 }
  x.fillStyle = fg; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, top + hh / 2 + (i - (lines.length - 1) / 2) * size * 1.3))
  x.restore()
}

// ── shared pixel props
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const CLOUD = ['....CCCC......', '..CCCCCCCC....', '.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.']
const SUN = ['...Y..Y..Y...', '.............', 'Y...OOOOO...Y', '...OOOOOOO...', '..OOOOOOOOO..', 'Y.OOOOOOOOO.Y', '..OOOOOOOOO..', '...OOOOOOO...', 'Y...OOOOO...Y', '.............', '...Y..Y..Y...']
const MUG = ['.S.S....', 'S.S.....', 'WWWWWW..', 'WCCCCWWW', 'WCCCCW.W', 'WCCCCW.W', 'WCCCCWWW', 'WCCCCW..', '.WWWW...']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSBBBBBBSK.', '.KSBBBBBBSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG']
const LAPTOP_C = { K: INK, S: '#6fc3ff', B: '#bfe8ff', G: '#9aa5c4' }
const PILLOW = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPWPPPPPPPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const GIFT = ['...R...R...', '....R.R....', 'GGGGGRGGGGG', 'GGGGGRGGGGG', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.']
const GIFT_C = { R: RED, G: GOLD, B: PINK }
const BAG = ['...KKKK...', '..K....K..', '.BBBBBBBB.', 'BBBBBBBBBB', 'BBBWWWWBBB', 'BBBWWWWBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const HOUSE = ['.....R.....', '....RRR....', '...RRRRR...', '..RRRRRRR..', '.RRRRRRRRR.', '..WWWWWWW..', '..WBBWWDW..', '..WBBWWDW..', '..WWWWWDW..']
const HOUSE_C = { R: RED, W: CREAM, B: SKYB, D: '#8a4a2e' }
const BOOK = ['KKKKKKKKKK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KPPPPKPPPK', 'KKKKKKKKKK']
const PLANT = ['..G..G..', '.GGG.GG.', 'GG.GGG.G', '.GGGGGG.', '...GG...', '.TTTTTT.', '.TTTTTT.', '..TTTT..', '..TTTT..']
const PLANT_C = { G: '#5bd18b', T: '#c46a3a' }
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const CLOCK_C = { K: INK, W: CREAM }
const STOPSIGN = ['..RRRR..', '.RRRRRR.', 'RRRRRRRR', 'RWWWWWWR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..', '...KK...', '...KK...', '...KK...', '...KK...']
const PUMPKIN = ['.....G.....', '....GG.....', '..OOOOOOO..', '.OOoOOOoOO.', 'OOOoOOOoOOO', 'OOOoOOOoOOO', 'OOOoOOOoOOO', '.OOoOOOoOO.', '..OOOOOOO..']
const PUMPKIN_C = { G: '#5bd18b', O: ORANGE, o: '#d9792a' }
const HEADPH = ['..KKKKKK..', '.K......K.', 'K........K', 'K........K', 'PP......PP', 'PP......PP', 'PP......PP']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BWWBBWWB', 'BBBBBBBB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB }
const BLANKET = ['LLLLLLLLLLLL', 'LPLPLPLPLPLP', 'LLLLLLLLLLLL', 'PLPLPLPLPLPL', 'LLLLLLLLLLLL']
const SNACK = ['.KKKKKK.', 'KYYYYYYK', 'KYRRRRYK', 'KYRWWRYK', 'KYRRRRYK', 'KYYYYYYK', '.KKKKKK.']
const SNACK_C = { K: INK, Y: GOLD, R: RED, W: CREAM }
const TEA = ['..S.S..', '.S.S...', 'KKKKKKK', 'KWWWWWKK', 'KWWWWWK.K', 'KWWWWWKK', '.KWWWK..', '..KKK...']
const TEA_C = { K: INK, W: '#c9f0d8', S: CREAM }
//   ♈ asked the driver to go faster · ♉ a three-course picnic · ♊ opened 38 chats by row five · ♋ called home every stop
//   ♌ window seat for the lighting · ♍ cleaned the whole bus · ♎ moved seats seven times · ♏ back row, hood up, zero words
//   ♐ got off at a random stop and moved there · ♑ laptop on a bumpy road · ♒ named the bus Brenda · ♓ cried at the hills
const ACC = '#ffd86b'
const SPRAY = ['..KKK....', '..KBK.WW.', '.KKKKK...', '.KBBBK.W.', 'KBBBBBK..', 'KBWWBBK..', 'KBWWBBK..', 'KBBBBBK..', 'KBBBBBK..', 'KKKKKKK..']
const SAND = ['..YYYYYY..', '.YYYYYYYY.', 'GGGGGGGGGG', 'RRRRRRRRRR', 'CCCCCCCCCC', '.YYYYYYYY.']
const SAND_C = { Y: '#e8b86a', G: '#5bd18b', R: RED, C: '#ffe76a' }
const HOOD = ['....KKKKKK....', '..KKVVVVVVKK..', '.KVVVVVVVVVVK.', 'KVVV......VVVK', 'KVV........VVK', 'KVV........VVK']
const SHADES = ['KKKKK..KKKKK', 'KKKKKKKKKKKK', 'KKKKK..KKKKK', '.KKK....KKK.']
/** a big speed gauge, needle 0…1 */
function gauge(x, cx, cy, k, v) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, Math.PI, 0); x.lineTo(170, 30); x.lineTo(-170, 30); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 156, Math.PI, 0); x.lineTo(156, 18); x.lineTo(-156, 18); x.fill()
  x.lineWidth = 26; x.strokeStyle = MINT; x.beginPath(); x.arc(0, 0, 124, Math.PI, Math.PI * 1.5); x.stroke()
  x.strokeStyle = GOLD; x.beginPath(); x.arc(0, 0, 124, Math.PI * 1.5, Math.PI * 1.8); x.stroke()
  x.strokeStyle = RED; x.beginPath(); x.arc(0, 0, 124, Math.PI * 1.8, Math.PI * 2); x.stroke()
  const a = Math.PI + v * Math.PI
  x.strokeStyle = INK; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 120, Math.sin(a) * 120); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 18, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a bus window: hills scrolling past */
function busWindow(x, t, cx, cy, k, { w = 340, h = 240, speed = 120 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28)
  x.fillStyle = '#c9d3ea'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  x.fillStyle = '#8fd0ff'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#ffe9a8'; x.fillRect(w / 2 - 90, -h / 2 + 24, 44, 44)
  const off = (t * speed) % 240
  for (let i = -1; i < 4; i++) { x.fillStyle = i % 2 ? '#5bd18b' : '#3fae6f'; x.beginPath(); x.ellipse(-w / 2 + i * 240 - off + 120, h / 2 + 30, 160, 120, 0, 0, Math.PI * 2); x.fill() }
  const off2 = (t * speed * 2.2) % 140
  for (let i = -1; i < 5; i++) { x.fillStyle = '#2e7d52'; x.fillRect(-w / 2 + i * 140 - off2, h / 2 - 70, 18, 70); x.beginPath(); x.arc(-w / 2 + i * 140 - off2 + 9, h / 2 - 78, 30, 0, Math.PI * 2); x.fill() }
  x.restore()
}
/** a row of bus seats */
function seats(x, cx, cy, k, n, hi = -1, col = '#6b62a8') {
  if (k <= 0.01) return
  for (let i = 0; i < n; i++) {
    const sx = cx + (i - (n - 1) / 2) * 92
    x.save(); x.translate(sx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-40, -70, 80, 130)
    x.fillStyle = i === hi ? GOLD : col; x.fillRect(-32, -62, 64, 114)
    x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-24, -54, 48, 18)
    x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asked the driver | to go *faster.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const k = K(t, P, 0.2)
      gauge(x, 790, 860, k, 0.15 + 0.8 * clamp((lt - 0.3) / 1.4) + 0.03 * Math.sin(t * 30))
      bubble(x, 760, 600, 'FASTER!!', K(t, P, 0.7, 0.25, 2.2), { size: 46, col: '#ff6b6b', tail: 'bl' })
      L(x, 790, 1090, 'ARE WE THERE YET?', K(t, P, 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Packed a picnic. | *Three courses.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SAND, SAND_C, 790, 800, 22 * K(t, P, 0.2))
      paper(x, 790, 1010, K(t, P, 0.8), ['1. soup', '2. this', '3. cake'], { head: 'BUS MENU', headBg: '#7ee0a4', w: 260, size: 28, rot: -0.04 })
      L(x, 790, 610, 'COURSE 2 OF 3', K(t, P, 1.5, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Made friends with | *every single row.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      seats(x, 790, 860, K(t, P, 0.2), 3, Math.floor(lt * 2.5) % 3)
      const n = Math.max(1, Math.floor(clamp((lt - 0.4) / 1.6) * 38))
      L(x, 790, 1090, `CHATS OPENED: ${n}`, K(t, P, 0.5, 0.3, 2.2), MINT, 0.04, 32)
      bubble(x, 790, 640, 'and YOUR sign?', K(t, P, 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Called home | at *every stop.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, K(t, P, 0.2), { head: 'CALLING MOM ♥', headCol: PINK, lines: [
        ['stop 3: hi!', BONE, K(t, P, 0.5, 0.25, 2.2), true],
        ['stop 4: me again', BONE, K(t, P, 1.0, 0.25, 2.2), true],
        ['stop 5: miss u', BONE, K(t, P, 1.5, 0.25, 2.2), true],
      ] })
      L(x, 790, 1110, 'CALL 14 TODAY', K(t, P, 1.7, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Took the window seat. | *For the lighting.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.3],
    back(x, t, lt, P) {
      const k = K(t, P, 0.2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.28 * clamp(k); x.fillStyle = '#ffe08a'
      x.beginPath(); x.moveTo(640, 640); x.lineTo(940, 600); x.lineTo(560, 1180); x.lineTo(200, 1180); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      busWindow(x, t, 790, 780, K(t, P, 0.2), { w: 300, h: 220, speed: 40 })
      L(x, 790, 1040, 'GOLDEN HOUR: MINE', K(t, P, 1.2, 0.3, 2.4), GOLD, 0.04, 30)
      sparkles(x, t, 420, 760, P.t0 + 1.3, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Cleaned the whole bus. | *Seat by seat.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SPRAY, { K: INK, B: MINT, W: CREAM }, 700, 820, 20 * K(t, P, 0.2), { rot: -0.2 })
      const n = Math.min(12, 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 12))
      L(x, 830, 700, `SEATS DONE: ${n}/12`, K(t, P, 0.4, 0.3, 2.2), MINT, 0.04, 30)
      sparkles(x, t, 860, 900, P.t0 + 0.8, 6, 110, 0.1, [MINT, BONE, SKYB])
      sparkles(x, t, 860, 900, P.t0 + 1.6, 6, 140, 1.0, [MINT, BONE, SKYB])
      L(x, 790, 1100, 'DRIVER: “who are you”', K(t, P, 1.7, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Changed seats seven times. | *Still deciding.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      seats(x, 790, 860, K(t, P, 0.2), 3, Math.floor(lt * 3.2) % 3, '#b993ff')
      L(x, 790, 1090, `SEAT ${1 + Math.floor(lt * 3.2) % 7}… OR?`, K(t, P, 0.4, 0.3, 2.2), PINK, -0.04, 34)
      L(x, 790, 650, 'SEAT MATCH: PENDING', K(t, P, 1.4, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Back row. Hood up. | *Zero words.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = K(t, P, 0.3)
      drawBits(x, HOOD, { K: INK, V: '#4a2a6e' }, F.x, F.top - F.cell * 2, F.cell * 2.6 * k)
      drawBits(x, SHADES, { K: INK }, F.x, F.top + F.cell * 15, F.cell * 1.9 * K(t, P, 0.7))
      L(x, 790, 760, 'WORDS SPOKEN: 0', K(t, P, 1.0, 0.3, 2.2), BONE, 0.04, 32)
      L(x, 790, 1060, 'VIBE: UNREADABLE', K(t, P, 1.6, 0.3, 2.4), '#c58bff', -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Hopped off at random. | *Lives there now.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, STOPSIGN, { R: RED, W: CREAM, K: INK }, 640, 820, 18 * K(t, P, 0.2))
      drawBits(x, HOUSE, HOUSE_C, 850, 900, 20 * K(t, P, 0.9))
      L(x, 830, 680, 'STOP 9: ???', K(t, P, 0.4, 0.3, 2.2), BONE, 0.04, 30)
      L(x, 790, 1100, 'NEW HOMETOWN!!', K(t, P, 1.5, 0.3, 2.4), '#c58bff', -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Bumpy road? | *Still answering emails.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const bump = Math.abs(Math.sin(t * 9)) * 18
      drawBits(x, LAPTOP, LAPTOP_C, 790, 860 - bump, 22 * K(t, P, 0.2), { rot: 0.06 * Math.sin(t * 9) })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 46)
      L(x, 790, 650, `EMAILS SENT: ${n}`, K(t, P, 0.5, 0.3, 2.2), BONE, 0.04, 30)
      L(x, 790, 1090, 'OUT OF OFFICE: NEVER', K(t, P, 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Named the bus. | *It’s Brenda now.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 820, K(t, P, 0.2), 300, 170, ['BRENDA'], { head: 'HELLO MY NAME IS', headBg: '#6fc3ff', size: 54, rot: -0.04 })
      bubble(x, 790, 1050, 'thanks, Brenda', K(t, P, 1.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'pisces', cap: 'Cried at the hills. | *All six hours.*', tears: lt => lt > 0.9 ? 3 : 2, mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      busWindow(x, t, 790, 800, K(t, P, 0.2), { w: 300, h: 220 })
      drawBits(x, TISSUE, TISSUE_C, 640, 1010, 14 * K(t, P, 0.8))
      L(x, 830, 1060, 'HOUR 6: STILL ♥', K(t, P, 1.3, 0.3, 2.4), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0411', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs on | a *long bus ride.*',
  cameos: CAMEOS,
  group: { cap: 'Six hours. | *Twelve vibes.*' },
  lesson: { text: 'Any road is shorter | with *your people.*', chip: 'ROUTE: TOGETHER' },
  last: {
    text: 'Brenda the bus | *misses you already.*',
    draw(x, t, lt) {
      const t0 = t - lt
      card(x, 540, 1530, pop01(t, t0 + 0.6, 0.35, 2), 280, 150, ['BRENDA'], { head: 'HELLO MY NAME IS', headBg: '#6fc3ff', size: 48, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
