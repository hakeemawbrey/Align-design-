// r2t0413: star_talk, BE LIKE, "Zodiacs “listening” | *be like.*" (~62 s vertical, signs3kit social cut, music: lofi · G). Ending: lesson.
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
//   ♈ already interrupting · ♉ thinking about dinner · ♊ on three calls · ♋ planning your birthday · ♌ waiting to talk about them
//   ♍ fixing your grammar · ♎ agrees with both of you · ♏ reading your birth chart · ♐ tops it with a wilder story
//   ♑ doing taxes in their head · ♒ mentally on another planet · ♓ cries at the milk part
const ACC = '#ffe76a'
const PIZZA = ['YYYYYYYYYYY', 'YRYYYYYRYYY', '.YYYRYYYYY.', '.YYYYYYRY..', '..YRYYYY...', '..YYYYY....', '...YRY.....', '...YYY.....', '....Y......']
const PIZZA_C = { Y: '#ffd36b', R: RED }
/** a cloud-shaped thought bubble with dots leading to it */
function thought(x, cx, cy, k, w = 260, h = 190) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK
  for (const [a, b, r] of [[0, 0, 1], [-w * 0.3, -h * 0.12, 0.7], [w * 0.3, -h * 0.1, 0.72], [-w * 0.18, h * 0.18, 0.7], [w * 0.2, h * 0.18, 0.7]]) { x.beginPath(); x.ellipse(a, b, w * 0.32 * r + 6, h * 0.36 * r + 6, 0, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE
  for (const [a, b, r] of [[0, 0, 1], [-w * 0.3, -h * 0.12, 0.7], [w * 0.3, -h * 0.1, 0.72], [-w * 0.18, h * 0.18, 0.7], [w * 0.2, h * 0.18, 0.7]]) { x.beginPath(); x.ellipse(a, b, w * 0.32 * r, h * 0.36 * r, 0, 0, Math.PI * 2); x.fill() }
  for (const [a, b, r] of [[-w * 0.5, h * 0.55, 18], [-w * 0.68, h * 0.8, 11]]) { x.fillStyle = INK; x.beginPath(); x.arc(a, b, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
/** a birth chart wheel */
function chartWheel(x, t, cx, cy, k, R = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, R + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, R * 0.62, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * R * 0.62, Math.sin(a) * R * 0.62); x.lineTo(Math.cos(a) * R, Math.sin(a) * R); x.stroke() }
  x.strokeStyle = PINK; x.lineWidth = 3; x.beginPath(); x.moveTo(Math.cos(0.4) * R * 0.6, Math.sin(0.4) * R * 0.6); x.lineTo(Math.cos(2.6) * R * 0.6, Math.sin(2.6) * R * 0.6); x.lineTo(Math.cos(4.4) * R * 0.6, Math.sin(4.4) * R * 0.6); x.closePath(); x.stroke()
  x.restore()
}
/** a ringed planet */
function planet(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.ellipse(0, 0, 170, 46, -0.3, 0, Math.PI * 2); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c58bff'; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#a06ee6'; x.fillRect(-60, -30, 70, 18); x.fillRect(-20, 30, 80, 16)
  x.strokeStyle = GOLD; x.lineWidth = 14; x.beginPath(); x.ellipse(0, 0, 170, 46, -0.3, -0.1, Math.PI + 0.1); x.stroke()
  x.restore()
}
function miniPhone(x, cx, cy, k, txt, col, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-58, -96, 116, 192); x.fillStyle = '#2a2350'; x.fillRect(-50, -88, 100, 176)
  x.fillStyle = col; x.fillRect(-40, -30, 80, 60); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Nodding. | *Already interrupting.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so then my—', K(t, P, 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 760, 900, 'ANYWAY, ME!', K(t, P, 0.6, 0.25, 2.6), { size: 48, col: '#ff6b6b', tail: 'bl' })
      L(x, 790, 1090, 'WAITED: 0.4 SEC', K(t, P, 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: '“Mm-hm.” | *Thinking about dinner.*', mood: 'heart', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      thought(x, 790, 720, K(t, P, 0.2))
      drawBits(x, PIZZA, PIZZA_C, 790, 720, 14 * K(t, P, 0.5), { rot: 0.1 * Math.sin(t * 3) })
      L(x, 790, 1060, 'BRAIN: AT DINNER', K(t, P, 1.3, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Listening. | *On three calls.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      miniPhone(x, 660, 860, K(t, P, 0.2), 'MOM', MINT, -0.12)
      miniPhone(x, 790, 820, K(t, P, 0.5), 'WORK', SKYB, 0.02)
      miniPhone(x, 920, 860, K(t, P, 0.8), 'MATCH', PINK, 0.12)
      L(x, 790, 1080, 'AND YOU. HI.', K(t, P, 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'cancer', cap: '“Totally.” | *Planning your birthday.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 820, K(t, P, 0.2), ['cake ✓', 'balloons ✓', 'surprise ✓'], { head: 'YOUR BDAY', headBg: PINK, w: 290, size: 30, rot: 0.05 })
      L(x, 790, 1060, 'IT’S IN 8 MONTHS', K(t, P, 1.4, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Nodding. | *Waiting to talk about them.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'speaking of ME…', K(t, P, 1.3, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      const n = Math.max(0, 3 - Math.floor(lt / 0.45))
      L(x, 790, 900, n > 0 ? `MY TURN IN ${n}…` : 'MY TURN ✦', K(t, P, 0.2, 0.3, 2.2), '#ffb34a', 0.04, 38)
      sparkles(x, t, 790, 700, P.t0 + 1.4, 6, 170, 0.5)
    } },
  { sign: 'virgo', cap: 'Listening. | *Fixing your grammar.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, K(t, P, 0.2), 330, 180, ['“your so right”'], { head: 'YOU SAID', headBg: GREY, size: 34, rot: -0.04 })
      L(x, 790, 1040, '*YOU’RE', K(t, P, 0.9, 0.3, 2.6), RED, 0.05, 48, CREAM)
    } },
  { sign: 'libra', cap: '“Totally agree.” | *With both of you.*', mood: 'happy', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 700, 680, 'tea is best', K(t, P, 0.2, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
      bubble(x, 860, 820, 'no, coffee!', K(t, P, 0.5, 0.25, 2.2), { size: 32, col: '#ffb34a', tail: 'br' })
      L(x, 790, 1050, 'AGREES WITH: BOTH', K(t, P, 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: '“Uh-huh.” | *Reading your birth chart.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 830, K(t, P, 0.2, 0.35))
      L(x, 790, 1070, 'OH. A GEMINI MOON.', K(t, P, 1.3, 0.3, 2.4), '#c58bff', -0.04, 30)
    } },
  { sign: 'sagittarius', cap: '“Same!” | *Then a wilder story.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'that’s nothing. | once I…', K(t, P, 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 940, 'STORY: TOPPED', K(t, P, 1.1, 0.3, 2.4), '#c58bff', 0.05, 40)
      L(x, 790, 1080, '(involves a goat)', K(t, P, 1.6, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'capricorn', cap: '“Fascinating.” | *Doing taxes in their head.*', mood: 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      thought(x, 790, 740, K(t, P, 0.2), 300, 210)
      if (K(t, P, 0.2) > 0.9) { x.save(); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1,204', 790, 710); x.fillText('+ 387 = ?', 790, 755); x.restore() }
      L(x, 790, 1060, 'DEDUCTIONS: FOUND', K(t, P, 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: '“Mhm.” | *Mentally on another planet.*', mood: 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      planet(x, t, 790, 800, K(t, P, 0.2, 0.35))
      L(x, 790, 1060, 'SIGNAL: LOST', K(t, P, 1.2, 0.3, 2.4), SKYB, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Listening. | *Crying at the wrong part.*', tears: lt => lt > 0.9 ? 3 : 1, mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'and then I | bought milk', K(t, P, 0.2, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      L(x, 790, 940, 'SO BEAUTIFUL', K(t, P, 1.0, 0.3, 2.4), SKYB, 0.04, 42)
      drawBits(x, TISSUE, TISSUE_C, 790, 1080, 20 * K(t, P, 1.4))
    } },
]

const F = makeFilm({
  id: 'r2t0413', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Zodiacs “listening” | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone nodding. | *Nobody listening.*' },
  lesson: { text: 'Real listening is | *a love language.*', chip: 'EARS: OPEN' },
  last: {
    text: 'Pisces is still crying | about *the milk.*',
    draw(x, t, lt) { drawBits(x, TISSUE, TISSUE_C, 540, 1540, 16 * pop01(t, t - lt + 0.6, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
