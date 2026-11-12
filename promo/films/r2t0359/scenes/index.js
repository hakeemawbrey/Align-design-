// r2t0359: star_talk, BE LIKE, "Gift they hate? | Zodiacs *be like.*" (topic: Zodiacs when they get a gift they hate) (signs3kit social cut, music: lofi · D). Ending: group.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a sheet of paper with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
/** a pixel phone with chat chips: lines = [[text, colour, k, right?], …] */
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
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 58); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** a polaroid with a sign star inside */
function polaroid(x, t, cx, cy, k, id, { cap = '', rot = 0.06, mood = 'happy', seed = 50, tears = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -142, 256, 304)
  x.fillStyle = INK; x.fillRect(-134, -154, 268, 308); x.fillStyle = CREAM; x.fillRect(-126, -146, 252, 292)
  x.fillStyle = '#2a2350'; x.fillRect(-108, -128, 216, 196)
  signChar(x, t, id, 0, -24, 150, { mood, seed, glyph: false, glow: 0.6, tears })
  if (cap) { x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, 0, 108) }
  x.restore()
}

const GIFT = ['..R...R..', '.R.R.R.R.', '..RRRRR..', 'BBBBRBBBB', 'BBBBRBBBB', 'RRRRRRRRR', 'BBBBRBBBB', 'BBBBRBBBB', 'BBBBRBBBB', 'BBBBRBBBB']
const gift = (x, cx, cy, cell, box = LAV, ribbon = GOLD, opts = {}) => drawBits(x, GIFT, { B: box, R: ribbon }, cx, cy, cell, opts)
const SWEATER = ['KK.....KK', 'KKKKKKKKK', 'KKKWKWKKK', '.KKKKKKK.', '.KWKWKWK.', '.KKKKKKK.', '.KKKKKKK.']
const CACTUS = ['...G...', '.G.G...', '.GGG.G.', '...GGG.', '...G...', '.PPPPP.', '.PPPPP.', '..PPP..']
const LAMP = ['...YYYYY...', '..YYYYYYY..', '.YYYYYYYYY.', 'YYYYYYYYYYY', '.....K.....', '.....K.....', '.....K.....', '.....K.....', '...KKKKK...']
const CAMEOS = [
  { sign: 'aries', cap: 'Said “thanks!” | Returned it *by noon.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      gift(x, 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.2 ? 1 - clamp((lt - 1.2) / 0.3) : 1))
      if (lt > 1.4) L(x, 790, 820, 'RETURNED ✓', pop01(lt, 1.45, 0.3, 2.4), MINT, -0.04, 40)
      L(x, 790, 1080, 'TIME: 11:58 AM', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'It wasn’t food. | *Visibly grieving.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { K: '#7a8a5a', W: '#d8dbe8' }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'A… SWEATER.', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, -0.04, 36)
      L(x, 790, 1060, 'SNACKS: NONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 34, CREAM)
    } },
  { sign: 'gemini', cap: 'Loved it! Hated it! | *Loved it?*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wide' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      gift(x, 790, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), MINT, PINK)
      const m = Math.floor(lt * 2.5) % 3
      L(x, 790, 640, ['LOVE IT!', 'HATE IT!', 'LOVE IT??'][m], pop01(t, P.t0 + 0.4, 0.3, 2), [PINK, '#9aa5c4', GOLD][m], m % 2 ? 0.05 : -0.05, 40)
    } },
  { sign: 'cancer', cap: 'Hated it. | Kept it *forever anyway.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      gift(x, 790, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), PINK, BONE)
      L(x, 790, 1040, 'FROM GRANDMA ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.04, 34)
      L(x, 790, 640, 'SHELF: FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'leo', cap: 'It wasn’t a portrait | *of them?*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: ST, hops: [0.4],
    front(x, t, lt, P) {
      gift(x, 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), ORANGE, RED)
      bubble(x, 790, 650, 'where am I | in this?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1080, 'CONFUSION: TOTAL', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Left feedback. | *On the gift tag.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      paper(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['1. wrong size', '2. wrong colour', '3. thank you!'], { head: 'GIFT TAG', headBg: MINT, w: 330, size: 32, rot: 0.04, bg: CREAM })
      L(x, 790, 1090, 'TONE: HELPFUL', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'libra', cap: '“I LOVE it!!” | *(Hates it.)*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'I LOVE it!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
      L(x, 790, 900, 'ACTING: FLAWLESS', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 32)
      L(x, 790, 1060, 'INSIDE: SCREAMING', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Smiled. Said nothing. | *Remembers forever.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, 'NOTED.', pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.04, 56)
      L(x, 790, 960, 'FILED UNDER: 2014', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Laughed out loud. | *“It’s so ugly!”*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      gift(x, 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), '#7a8a5a', '#c98f2a')
      bubble(x, 790, 650, 'HAHA what IS it', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: BONE, tail: 'bl' })
      L(x, 790, 1080, 'FILTER: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), ORANGE, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Checked the resale value. | *Before saying thanks.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      gift(x, 790, 780, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), BONE, MINT)
      L(x, 790, 980, 'LISTED ✓', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 40)
      bubble(x, 790, 620, 'oh. thanks.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Turned it into | *a lamp.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const on = lt > 1.2
      drawBits(x, LAMP, { Y: on ? '#ffe76a' : '#9aa5c4', K: BONE }, 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (on) { sparkles(x, t, 790, 800, P.t0 + 1.25, 8, 160, 0.3) }
      L(x, 790, 1080, 'WAS: A VASE', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Cried happy tears. | *For a cactus.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      drawBits(x, CACTUS, { G: '#5fd068', P: '#c0504d' }, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 640, 'HIS NAME IS SPIKE', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 30)
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0359', key: 'D', accent: ACC, ending: 'group',
  title: 'Gift they hate? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Thank you so much! | *(Receipt?)*',
    draw(x, t, lt) { gift(x, 540, 700, 24 * pop01(t, t - lt + 1.2, 0.35, 2.2), LAV, GOLD, { rot: 0.06 * Math.sin(t * 3) }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
