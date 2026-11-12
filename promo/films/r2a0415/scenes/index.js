// r2a0415: star_advice, ADVICE ROLL CALL, "Each sign's | *phone-free hour.*" (~62 s vertical, signs3kit social cut, music: lofi · G). Ending: lesson.
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
//   ♈ a run with no tracker · ♉ cook something slow · ♊ talk face to face · ♋ bake for someone · ♌ dance in the kitchen
//   ♍ water (and chat to) the plants · ♎ paint something, keep it · ♏ bath, candle, mystery novel · ♐ walk somewhere new
//   ♑ sit still and do nothing · ♒ name a new constellation · ♓ journal it out, happy tears count
const ACC = '#7de3ff'
const SHOE = ['......KKK...', '.....KRRK...', '....KRRRK...', 'KKKKRRRRRKK.', 'KRRRRRRRRRRK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const POT = ['..S..S..S..', '.S..S..S...', 'KKKKKKKKKKK', 'KRRRRRRRRRK', 'KRRRRRRRRRKK', 'KRRRRRRRRRK', 'KRRRRRRRRRK', '.KKKKKKKKK.']
const BREAD = ['..BBBBBBB..', '.BbBBbBBbB.', 'BBBBBBBBBBB', 'BBBBBBBBBBB', 'BBBBBBBBBBB', '.BBBBBBBBB.']
const CANDLE = ['..Y..', '.YOY.', '..Y..', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'KKKKK']
const POST = ['....W....', 'GGGGWGGG.', 'GGGGWGGGG', 'GGGGWGGG.', '....W....', '.PPPWPPPP', 'PPPPWPPPP', '.PPPWPPPP', '....W....', '....W....', '....W....', '...WWW...']
/** an easel with a little painted sunset on it */
function easel(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-110, 100, 16, 120); x.fillRect(94, 100, 16, 120); x.fillRect(-8, -150, 16, 360)
  x.fillStyle = INK; x.fillRect(-140, -130, 280, 240); x.fillStyle = CREAM; x.fillRect(-130, -120, 260, 220)
  x.fillStyle = '#ff9ab0'; x.fillRect(-120, -110, 240, 90); x.fillStyle = '#ffb34a'; x.fillRect(-120, -20, 240, 40)
  x.fillStyle = '#ffe76a'; x.beginPath(); x.arc(0, -10, 40, Math.PI, 0); x.fill()
  x.fillStyle = '#6fc3ff'; x.fillRect(-120, 20, 240, 70)
  x.restore()
}
/** a hand-drawn constellation that connects itself */
function constellation(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const pts = [[-140, -60], [-70, -110], [10, -80], [60, -10], [140, 20], [90, 90], [10, 60]]
  const n = Math.min(pts.length, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.18))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = 'rgba(239,230,214,0.8)'; x.lineWidth = 4; x.beginPath()
  pts.slice(0, n).forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  pts.forEach(([a, b], i) => { x.fillStyle = i < n ? GOLD : 'rgba(239,230,214,0.4)'; x.fillRect(a - 8, b - 8, 16, 16) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A run with *no tracker.* | Just for fun.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { K: INK, R: '#ff6b6b', W: CREAM }, 790, 860, 20 * K(t, P, 0.2), { rot: 0.1 * Math.sin(t * 10) })
      L(x, 790, 1060, 'PACE: WHO KNOWS ♥', K(t, P, 1.0, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Cook something slow. | *Taste everything.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, R: '#ff6b6b', S: CREAM }, 790, 860, 20 * K(t, P, 0.2))
      L(x, 790, 660, `STIRRING: ${Math.floor(clamp(lt / 1.8) * 90)} MIN`, K(t, P, 0.5, 0.3, 2.2), BONE, 0.04, 30)
      L(x, 790, 1060, 'TASTE TEST #9 ✓', K(t, P, 1.4, 0.3, 2.4), '#7ee0a4', -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Talk to a friend. | *Face to face.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const k = K(t, P, 0.3, 0.35)
      if (k > 0.01) signChar(x, t, 'cancer', 850, 920, 180 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 760, 680, 'so what’s your | rising sign?', K(t, P, 0.8, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 790, 1100, 'SCREEN TIME: 0', K(t, P, 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Bake for someone. | *Deliver it warm.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BREAD, { B: '#e8b86a', b: '#c98f5a' }, 790, 860, 24 * K(t, P, 0.2))
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillStyle = CREAM; x.fillRect(740 + i * 50, 780 - ph * 120, 10, 30); x.restore() }
      L(x, 790, 1060, 'STILL WARM ♥', K(t, P, 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Dance in the kitchen. | *Nobody filming.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.9, 1.4, 1.9],
    front(x, t, lt, P, F) {
      notes(x, t, 790, 900, { n: 5, cell: 8, col: GOLD, seed: 1 })
      L(x, 790, 1060, 'AUDIENCE: THE FRIDGE', K(t, P, 1.1, 0.3, 2.4), '#ffb34a', -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Water the plants. | *Cheer them on.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 22 * K(t, P, 0.2))
      if (lt > 0.6 && lt < 1.6) rain(x, t, 790, 700, 160, 120, 6, SKYB, 1.6)
      bubble(x, 790, 650, 'so proud of you', K(t, P, 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Paint something pretty. | *Keep it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      easel(x, 790, 820, 0.9 * K(t, P, 0.2))
      L(x, 790, 1080, 'MASTERPIECE (ISH)', K(t, P, 1.3, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'A bath, a candle, | *a mystery novel.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { K: INK, P: '#8a2a4a' }, 760, 880, 22 * K(t, P, 0.2), { rot: -0.05 })
      drawBits(x, CANDLE, { Y: GOLD, O: '#ff6b6b', W: CREAM, K: INK }, 920, 860, 14 * K(t, P, 0.5))
      L(x, 790, 680, 'PAGE 212. NO SPOILERS.', K(t, P, 1.0, 0.3, 2.2), BONE, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Walk somewhere new. | *No map.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, POST, { W: '#c98f5a', G: MINT, P: PINK }, 790, 860, 22 * K(t, P, 0.2))
      L(x, 790, 1080, 'THIS WAY? SURE.', K(t, P, 1.2, 0.3, 2.4), '#c58bff', -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Sit still. | *Do absolutely nothing.*', mood: lt => lt > 1.2 ? 'squint' : 'sleepy', look: [0, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, 'TASKS: 0', K(t, P, 0.2, 0.3, 2.2), MINT, 0.04, 48)
      L(x, 790, 940, `RELAXING… ${String(Math.floor(lt * 4)).padStart(2, '0')}s`, K(t, P, 0.5, 0.3, 2.2), BONE, -0.04, 32)
      if (lt > 1.4) bubble(x, 760, 1080, 'this is hard', pop01(lt, 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Stargaze. | *Name a constellation.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      constellation(x, t, 790, 780, K(t, P, 0.2), lt)
      L(x, 790, 1040, '“THE BIG SPOON”', K(t, P, 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Journal it out. | *Happy tears count.*', tears: 3, mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 840, K(t, P, 0.2), ['today I felt…', 'everything ♥', 'and it’s ok'], { head: 'DEAR DIARY', headBg: LAV, w: 300, size: 30, rot: 0.04 })
      L(x, 790, 1080, 'PAGE: DAMP', K(t, P, 1.4, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0415', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *phone-free hour.*',
  cameos: CAMEOS,
  group: { cap: 'No phones. | *All calm.*' },
  lesson: { text: 'The phone can wait. | *You come first.*', chip: 'RECHARGED: YOU' },
  last: {
    text: 'Capricorn lasted | *eleven minutes.*',
    draw(x, t, lt) { drawBits(x, CLOCK, CLOCK_C, 540, 1540, 16 * pop01(t, t - lt + 0.6, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
