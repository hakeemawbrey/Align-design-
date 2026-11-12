// r2t0412: star_talk, BE LIKE, "Zodiacs when someone asks a favour | *be like.*" (~62 s vertical, signs3kit social cut, music: lofi · E). Ending: lesson.
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
//   ♈ yes before you finished · ♉ after their nap · ♊ six favours at 2 pm · ♋ also made you lunch · ♌ wants a thank-you speech
//   ♍ redid it, correctly · ♎ can't say no (favour 14) · ♏ IOU, noted forever · ♐ turned the move into a road trip
//   ♑ sent a calendar invite · ♒ built a machine for it · ♓ cried from honour
const ACC = '#7dffb0'
const ROBOT = ['....R....', '....K....', '.KKKKKKK.', '.KGGGGGK.', '.KGYGYGK.', '.KGGGGGK.', '.KGKKKGK.', '.KKKKKKK.', 'KK.GGG.KK', 'K.KGGGK.K', '..KGGGK..', '..K...K..', '.KK...KK.']
const ROBOT_C = { K: INK, G: '#d8dbe8', Y: GOLD, R: RED }
const MAP = ['GGGGGGGGGGGG', 'GBBGGGGGGGGG', 'GBBGGRRRGGGG', 'GGGGRGGGRGGG', 'GGGRGGGGGRGG', 'GGRGGGBBGGRG', 'GRGGGGBBGGGR', 'RGGGGGGGGGGG']
const MAP_C = { G: '#7ee0a4', B: SKYB, R: RED }

const CAMEOS = [
  { sign: 'aries', cap: 'Said yes | *before you finished.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'could you h—', K(t, P, 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      L(x, 790, 900, 'YES!!', K(t, P, 0.55, 0.3, 2.6), '#ff6b6b', -0.06, 64)
      L(x, 790, 1080, '…WHAT WAS IT?', K(t, P, 1.5, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Happy to help. | *After the nap.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, PILLOW, { P: '#c9d3ea', W: '#ffffff' }, F.x, F.cy + 120, 22 * K(t, P, 0.2))
      zzz(x, t, F.x + 120, F.top, { alpha: clamp(lt * 2) })
      card(x, 800, 820, K(t, P, 0.6), 280, 170, ['BACK AT', '4 PM'], { head: 'HELP DESK', headBg: '#7ee0a4', size: 40, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Said yes to | *six favours at once.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      paper(x, 790, 850, K(t, P, 0.2), [
        'move couch', lt > 0.5 && 'dog sit', lt > 0.75 && 'pick a gift', lt > 1.0 && 'rate a match', lt > 1.25 && 'fix wifi', lt > 1.5 && 'paint wall'],
      { head: 'ALL AT 2 PM', headBg: GOLD, w: 300, size: 28, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Did the favour. | Also *made you lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BAG, { K: INK, B: '#7ee0a4', W: CREAM }, 790, 850, 24 * K(t, P, 0.3))
      L(x, 790, 640, 'LUNCH FOR YOU ♥', K(t, P, 0.8, 0.3, 2.2), PINK, 0.04, 32)
      L(x, 790, 1070, '+ A NOTE + A SNACK', K(t, P, 1.4, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Helped. | Now wants *a speech.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 790, 820, K(t, P, 0.2), 320, 190, ['thank you,', 'LEO ✦'], { head: 'YOUR SPEECH', headBg: '#ffb34a', size: 40, rot: -0.04 })
      L(x, 790, 1060, 'APPLAUSE: REQUIRED', K(t, P, 1.2, 0.3, 2.4), GOLD, 0.04, 30)
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Redid your favour. | *Correctly.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 820, K(t, P, 0.2), ['your plan', 'my plan ✓', 'better plan ✓'], { head: 'VERSION 7', headBg: MINT, w: 310, size: 30, rot: -0.04 })
      if (lt > 0.7) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(660, 790 - 6); x.lineTo(660 + 170 * clamp((lt - 0.7) / 0.3), 790 - 12); x.stroke(); x.restore() }
      L(x, 790, 1060, 'YOU’RE WELCOME', K(t, P, 1.5, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Can’t say no. | *Favour number 14.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 13)
      L(x, 790, 820, `YES #${n}`, K(t, P, 0.2, 0.3, 2.2), PINK, 0.05, 58)
      bubble(x, 790, 640, 'what’s your sign? | ok, yes', K(t, P, 0.8, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 790, 1050, 'NO: NOT FOUND', K(t, P, 1.6, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Helped. | Now *you owe them.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, K(t, P, 0.3), ['IOU', 'one favour', '(noted)'], { bg: '#ff9ab0', size: 36, rot: 0.05 })
      L(x, 790, 1060, 'FILED: FOREVER', K(t, P, 1.3, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Helped you move. | *Made it a road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 790, 830, 24 * K(t, P, 0.2), { rot: 0.05 })
      L(x, 790, 640, 'DETOUR #6', K(t, P, 0.8, 0.3, 2.2), '#c58bff', -0.04, 36)
      bubble(x, 790, 1050, 'couch can wait!', K(t, P, 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Sent a *calendar invite* | for the favour.', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 830, K(t, P, 0.2), 330, 220, ['FAVOUR', '2:00–2:15', 'agenda attached'], { head: 'INVITE', headBg: '#7ee0a4', size: 32, rot: 0.04 })
      L(x, 790, 1070, 'PLEASE BE ON TIME', K(t, P, 1.4, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Helped. | *Built a machine for it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, { ...ROBOT_C, Y: Math.floor(t * 4) % 2 ? GOLD : MINT }, 800, 860, 22 * K(t, P, 0.3), { rot: 0.06 * Math.sin(t * 6) })
      L(x, 800, 620, 'FAVOUR-BOT 3000', K(t, P, 0.9, 0.3, 2.2), SKYB, 0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.0, 6, 170, 0.6)
    } },
  { sign: 'pisces', cap: 'Said yes. | *Cried from honour.*', tears: 3, mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'you asked ME?', K(t, P, 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      drawBits(x, TISSUE, TISSUE_C, 790, 900, 24 * K(t, P, 0.8))
      L(x, 790, 1070, 'SO HONOURED ♥', K(t, P, 1.4, 0.3, 2.4), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0412', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Asked a favour? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One favour. | *Twelve versions.*' },
  lesson: { text: 'Your people | *show up for you.*', chip: 'FAVOUR: GRANTED' },
  last: {
    text: 'Scorpio is still | *keeping score.*',
    draw(x, t, lt) { note(x, 540, 1560, pop01(t, t - lt + 0.6, 0.35, 2), ['IOU', '(noted)'], { bg: '#ff9ab0', size: 40, rot: 0.05 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
