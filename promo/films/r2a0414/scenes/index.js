// r2a0414: star_advice, ADVICE ROLL CALL, "Remind each sign | *they’re loved.*" (~54 s vertical, signs3kit social cut, music: lofi · E). Ending: group.
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
//   ♈ text them first · ♉ save them the last slice · ♊ listen to the long voice note · ♋ remember the little things
//   ♌ hype them up in public · ♍ "you did enough" · ♎ pick the date spot · ♏ keep their secrets · ♐ say yes to the trip
//   ♑ tell them they can log off · ♒ love the weird ideas · ♓ hold their hand through the sad movie
const ACC = '#ff9ab0'
const CAKE = ['.....R.....', '.....Y.....', '..PPPPPPP..', '.PWPWPWPWP.', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'PPPPPPPPPPP', 'CCCCCCCCCCC', 'CCCCCCCCCCC']
const CAKE_C = { R: RED, Y: GOLD, P: PINK, W: '#ffffff', C: CREAM }
const LOCK = ['..KKKKK..', '.K.....K.', '.K.....K.', 'KKKKKKKKK', 'KYYYYYYYK', 'KYYYKYYYK', 'KYYYKYYYK', 'KYYYYYYYK', 'KKKKKKKKK']
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const POP = ['.W.W.W.', 'WWWWWWW', 'RWRWRWR', 'RWRWRWR', 'RWRWRWR', '.RWRWR.']
function voiceNote(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -50, 340, 100); x.fillStyle = MINT; x.fillRect(-162, -42, 324, 84)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -20); x.lineTo(-110, 0); x.lineTo(-140, 20); x.fill()
  for (let i = 0; i < 18; i++) { const h = 10 + 26 * Math.abs(Math.sin(i * 1.7 + t * 3)); x.fillRect(-90 + i * 13, -h / 2, 7, h) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Text them *first.* | They’re secretly waiting.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 850, K(t, P, 0.2), { head: 'YOUR MATCH', headCol: '#ff6b6b', lines: [
        ['thinking of u', BONE, K(t, P, 0.6, 0.25, 2.2), true],
        ['FINALLY!!', '#ffb34a', K(t, P, 1.1, 0.25, 2.4)],
        ['(was not waiting)', '#ffb34a', K(t, P, 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: 'taurus', cap: 'Save them | *the last slice.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 840, 22 * K(t, P, 0.2))
      L(x, 790, 640, 'RESERVED: TAURUS', K(t, P, 0.8, 0.3, 2.2), GOLD, 0.04, 30)
      hearts(x, t, 790, 800, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'gemini', cap: 'Listen to the voice note. | *All nine minutes.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      voiceNote(x, t, 790, 820, K(t, P, 0.2))
      L(x, 790, 980, `${Math.floor(clamp(lt / 2) * 9)}:${String(Math.floor(lt * 37) % 60).padStart(2, '0')} / 9:12`, K(t, P, 0.4, 0.3, 2.2), BONE, 0.04, 32)
      L(x, 790, 1100, 'LISTENED ✓ ♥', K(t, P, 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Remember the little things. | *They always do.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 840, K(t, P, 0.2), ['fav tea ✓', 'mom’s name ✓', 'that one song ✓'], { head: 'I REMEMBERED', headBg: SKYB, w: 320, size: 30, rot: 0.04 })
      hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 4, life: 1.4, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Hype them up. | *Loudly. In public.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 800, K(t, P, 0.2), 330, 170, ['WE ♥ LEO'], { head: 'HOMEMADE SIGN', headBg: '#ffb34a', size: 54, rot: 0.05 * Math.sin(t * 5) })
      confetti(x, t, 660, 820, P.t0 + 0.9, { n: 16, spread: 260, h: 400 })
      L(x, 790, 1060, 'LEO: GLOWING', K(t, P, 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Say *“you did enough.”* | They need it.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 820, K(t, P, 0.2), ['task ✓', 'task ✓', lt > 1.0 ? 'rest ✓ ♥' : 'rest ?'], { head: 'TODAY', headBg: MINT, w: 280, size: 32, rot: -0.04 })
      L(x, 790, 1060, 'ENOUGH: YES', K(t, P, 1.3, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Pick the date spot. | *That’s romance.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 790, 820, K(t, P, 0.2), 320, 190, ['8 PM · booked'], { head: 'DATE: DECIDED ✓', headBg: ACC, size: 36, rot: 0.04 })
      L(x, 790, 1050, 'LIBRA: RELIEVED', K(t, P, 1.2, 0.3, 2.4), MINT, -0.04, 32)
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: 'scorpio', cap: 'Keep their secrets. | *Like a vault.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LOCK, { K: INK, Y: GOLD }, 790, 830, 24 * K(t, P, 0.2))
      L(x, 790, 1060, 'TRUST: UNLOCKED', K(t, P, 1.2, 0.3, 2.4), '#c58bff', -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Say yes to | *the spontaneous trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      card(x, 790, 820, K(t, P, 0.2), 340, 180, ['TO: ANYWHERE', 'LEAVES: NOW'], { head: '2 TICKETS', headBg: '#c58bff', size: 32, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'I’m in!', K(t, P, 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Tell them | *they can log off.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CLOCK, CLOCK_C, 790, 820, 22 * K(t, P, 0.2))
      L(x, 790, 1050, lt > 1.2 ? 'OFF THE CLOCK ♥' : '6:01 PM…', K(t, P, 0.4, 0.3, 2.2), lt > 1.2 ? MINT : BONE, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Love their *weird* ideas. | Out loud.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: '#ffe76a', W: '#ffffff', G: GREY }, 790, 800, 18 * K(t, P, 0.2))
      sparkles(x, t, 790, 800, P.t0 + 0.6, 6, 120, 0.2)
      bubble(x, 790, 1050, 'genius. tell me more', K(t, P, 1.1, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Hold their hand | *through the sad movie.*', tears: 3, mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POP, { W: CREAM, R: RED }, 790, 820, 22 * K(t, P, 0.2))
      L(x, 790, 1050, 'TISSUES: SHARED ♥', K(t, P, 1.2, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0414', key: 'E', accent: ACC, ending: 'group',
  title: 'Remind each sign | *they’re loved.*',
  cameos: CAMEOS,
  group: {
    cap: 'Love them | *in their language.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.2, { n: 10, life: 2.6, spread: 760, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
