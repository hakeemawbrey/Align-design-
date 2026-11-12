// r2t0307: star_talk, ROLLCALL, "The signs hosting | overnight guests." (signs3kit social cut, music: lofi · E). Ending: group.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
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
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
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
const ST = { x: -170 }

const ACC = '#ffb38a'
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const BOOK = ['KKKKKKKKKKKKKK', 'KRRRRRRKWWWWWK', 'KRYYYYRKWKKKWK', 'KRRRRRRKWWWWWK', 'KRYYYYRKWKKKWK', 'KRRRRRRKWWWWWK', 'KRRRRRRKWKKKWK', 'KKKKKKKKKKKKKK']
const SWAN = ['...WW.......', '..WWKW......', '..WWW.......', '...WW.......', '...WW.......', '...WWW..WW..', '..WWWWWWWWW.', '.WWWWWWWWWWW', '..WWWWWWWWW.', '...TTTTTTT..']
const FLASK = ['...KK...', '...GG...', '...GG...', '..GGGG..', '.GGGGGG.', 'GGGGGGGG', 'GGWGGGGG', '.GGGGGG.']
/** a gold picture frame with a mini sign star inside */
function portrait(x, t, cx, cy, k, sign) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-132, -162, 264, 324); x.fillStyle = GOLD; x.fillRect(-124, -154, 248, 308)
  x.fillStyle = '#3a2a6a'; x.fillRect(-100, -130, 200, 260); x.restore()
  if (k > 0.5) signChar(x, t, sign, cx, cy + 10, 170 * k, { mood: 'sparkle', seed: 31, glyph: false })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Gave the house tour. | *At a sprint.*', mood: 'sparkle', star: { x: -150 }, hops: [0.3, 0.6, 0.9, 1.2],
    back(x, t, lt, P) {
      x.save(); x.fillStyle = 'rgba(239,230,214,0.5)'
      for (let i = 0; i < 4; i++) { const w = 120 + 40 * Math.sin(t * 20 + i); x.fillRect(150, 780 + i * 50, w, 10) }
      x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'kitchen bathroom | bed BYE', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 920, 'TOUR TIME: 9 SEC', pop01(t, P.t0 + 1.1, 0.3, 2.4), P.color, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Nine pillows. | *Zero room* for the guest.', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: { x: -160, y: 30 },
    front(x, t, lt, P) {
      const COL = [PINK, CREAM, LAV, MINT, '#ffe76a', SKYB, '#ffb34a', CREAM, PINK]
      for (let i = 0; i < 9; i++) drawBits(x, PILLOW, { W: COL[i] }, 790 + (i % 2 ? 16 : -16), 1110 - i * 58, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2))
      L(x, 790, 560, 'GUEST BED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Just one quick chat. | *Until 6 a.m.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const TOP = ['and THEN—', 'oh! also—', 'wait, wait—', 'last thing—', 'ok but—']
      bubble(x, 780, 700, TOP[Math.min(4, Math.floor(lt * 2.4))], pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 42, tail: 'bl' })
      const h = Math.min(6, Math.floor(lt * 2.6))
      L(x, 790, 920, `${['11:58 PM', '1:30 AM', '2:47 AM', '3:59 AM', '4:44 AM', '5:21 AM', '5:59 AM'][h]}`, pop01(t, P.t0 + 0.4, 0.3, 2), LAV, 0.04, 38)
    } },
  { sign: 'cancer', cap: 'Tucked the guest in. | Read *a bedtime story.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { K: INK, R: '#5fa0d0', Y: GOLD, W: CREAM }, 790, 860, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.05 })
      L(x, 790, 680, 'ONCE UPON A TIME…', pop01(t, P.t0 + 0.8, 0.3, 2), PINK, 0.04, 30)
      L(x, 790, 1060, 'GUEST AGE: 34', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'leo', cap: 'The guest room has | *a portrait of Leo.*', mood: 'sparkle', star: ST,
    front(x, t, lt, P) {
      portrait(x, t, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), 'leo')
      sparkles(x, t, 790, 820, P.t0 + 0.6, 8, 190, 0.3)
      L(x, 790, 1080, 'SO YOU’RE NOT LONELY', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#ffb34a', -0.04, 28)
    } },
  { sign: 'virgo', cap: 'Printed a | *house rules booklet.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ['HOUSE RULES', 'VOL. 1', '(of 3)'], { bg: CREAM, size: 36, rot: 0.04 })
      L(x, 790, 1080, 'PAGES: 30 · TABBED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Folded the towels | *into swans.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, SWAN, { W: '#ffffff', K: INK, T: PINK }, 720, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, SWAN, { W: '#ffffff', K: INK, T: PINK }, 880, 900, 18 * pop01(t, P.t0 + 0.7, 0.3, 2), { sx: -1 })
      hearts(x, t, 800, 820, P.t0 + 1.1, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 2 })
      L(x, 790, 680, 'ALSO: A SWAN SOAP', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Guest Wi-Fi password? | *A riddle.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 680, 'WI-FI: ???', pop01(t, P.t0 + 0.25, 0.3, 2), '#c97bff', 0.04, 40)
      bubble(x, 790, 880, 'what has no name | and sees all?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 790, 1070, 'HINT: NO.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'The guest arrived. | Sag was *abroad.*', mood: 'sparkle', star: { x: 170 },
    front(x, t, lt, P) {
      note(x, 330, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ['KEYS: UNDER MAT', 'FOOD: FRIDGE', 'BACK: ???'], { bg: '#ffe76a', size: 28, rot: -0.05 })
      bubble(x, 760, 640, 'make yourself | at home!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Checkout is 9 a.m. | Invoice *at 9:01.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 640, 'CHECKOUT: 9:00', pop01(t, P.t0 + 0.2, 0.3, 2), '#9aa5c4', 0.04, 34)
      note(x, 790, 880, pop01(t, P.t0 + 0.8, 0.35, 2), ['INVOICE', '1 night · 1 snack', 'thank you :)'], { bg: CREAM, size: 30, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'The guest room | *is also the lab.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, FLASK, { K: INK, G: [MINT, PINK, SKYB][i], W: '#fff' }, 680 + i * 110, 960 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.2))
      for (let i = 0; i < 3; i++) if (lt > 0.8) sparkles(x, t, 680 + i * 110, 900, P.t0 + 0.8 + i * 0.3, 4, 50, i, [MINT, BONE])
      bubble(x, 790, 700, 'don’t touch | the green one', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The guest left. | *Cried* in the guest bed.', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 700, 'MISS YOU ALREADY', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, 0.04, 32)
      L(x, 790, 850, 'THEY LEFT 4 MIN AGO', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0307', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs hosting | *overnight guests.*',
  cameos: CAMEOS,
  group: {
    cap: 'Checkout time? | *Nobody’s leaving.*',
    draw(x, t, lt) { L(x, 540, 760, 'GUESTBOOK: ★★★★★', pop01(t, t - lt + 1.4, 0.35, 2.4), GOLD, -0.03, 40) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
