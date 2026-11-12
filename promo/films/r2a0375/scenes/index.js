// r2a0375: star_advice, ADVICE ROLLCALL, "Each sign’s | *tradition to start.*" (signs3kit social cut, music: lofi · G). Ending: callback.
//   ♈ try one new thing every birthday · ♉ slow Sunday pancakes, every week · ♊ a question jar at dinner
//   · ♋ a recipe passed down with love · ♌ a yearly talent show at home · ♍ a monthly thank-you note
//   · ♎ the same photo, same pose, every year · ♏ a midnight walk to talk about the year · ♐ a mystery day trip every spring
//   · ♑ a yearly "look how far" list · ♒ a made-up holiday only you celebrate · ♓ a letter to your future self
//   Callback: the talent show, year ten: still all Leo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#ffd27a', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** a card with a header and handwritten-ish rows */
function card(x, cx, cy, k, head, rows, { bg = CREAM, bar = PINK, rot = -0.04, w = 320, h = 260, n = 99 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w - 4, h - 8)
  x.fillStyle = INK; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = bg; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16)
  x.fillStyle = bar; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, 52)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 36)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'
  rows.slice(0, n).forEach((r, i) => x.fillText(r, -w / 2 + 24, -h / 2 + 98 + i * 44))
  x.restore()
}
/** a spotlight cone from above */
function spotlight(x, cx, top, bottom, w, a = 0.22) {
  x.save(); x.globalAlpha = a; x.fillStyle = '#fff1c0'
  x.beginPath(); x.moveTo(cx - 30, top); x.lineTo(cx + 30, top); x.lineTo(cx + w, bottom); x.lineTo(cx - w, bottom); x.closePath(); x.fill()
  x.restore()
}
/** three polaroids of the same pose, year after year */
function polaroids(x, t, cx, cy, n) {
  for (let i = 0; i < n; i++) {
    const px = cx - 150 + i * 150, py = cy + (i % 2 ? 20 : -10), k = pop01(t, i * 0.4, 0.3, 2)
    if (k <= 0.01) continue
    x.save(); x.translate(px, py); x.rotate((i - 1) * 0.1); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-74, -92, 148, 184); x.fillStyle = CREAM; x.fillRect(-68, -86, 136, 172)
    x.fillStyle = '#ffd8e8'; x.fillRect(-56, -74, 112, 112)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText(String(2024 + i), 0, 66)
    x.restore()
    signChar(x, t, 'libra', px - 22 * k, py - 20 * k, 60 * k, { mood: 'happy', seed: 70 + i, glyph: false, glow: 0.4 })
    signChar(x, t, 'gemini', px + 22 * k, py - 20 * k, 60 * k, { mood: 'wink', seed: 74 + i, glyph: false, glow: 0.4 })
  }
}
const PANCAKES = ['...YY.....', '..BBBBBB..', '.CCCCCCCC.', '..BBBBBB..', '.CCCCCCCC.', '..BBBBBB..', '.CCCCCCCC.', 'PPPPPPPPPP', '.PPPPPPPP.']
const JAR = ['.KKKKKKK.', 'KLLLLLLLK', 'KKKKKKKKK', 'KSSSSSSSK', 'KSWSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', '.KKKKKKK.']
const ENVELOPE = ['KKKKKKKKKKKKK', 'KWKWWWWWWWKWK', 'KWWKWWWWWKWWK', 'KWWWKWWWKWWWK', 'KWWWWKHKWWWWK', 'KWWWWWHWWWWWK', 'KWWWWWWWWWWWK', 'KKKKKKKKKKKKK']
const MOON = ['...MMMM..', '.MMMMM...', 'MMMMM....', 'MMMMM....', 'MMMMM....', 'MMMMMM...', '.MMMMMMM.', '...MMMM..']
const TICKET = ['KKKKKKKKKKKKKKK', 'KGGGGGGGGGGKGGK', 'KGGGGGGGGGG.GGK', 'KGGGGGGGGGGKGGK', 'KGGGGGGGGGG.GGK', 'KGGGGGGGGGGKGGK', 'KKKKKKKKKKKKKKK']
const SOCK = ['WWWWW..', 'RRRRR..', 'RWRWR..', 'RRRRR..', 'RWRWRRR', 'RRRRRRR', '.RRRRR.']

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Try one new thing | *every birthday.*', mood: 'sparkle', star: ST, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      card(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 'NEW THINGS', ['28: pottery ✓', '29: surfing ✓', '30: juggling…'], { bar: ORANGE, n: Math.floor(Math.max(0, lt - 0.4) / 0.4) + 1 })
      L(x, 790, 1060, 'NEXT: ???', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Slow Sunday pancakes. | *Every week.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, { Y: '#fff1a8', B: '#c98f5a', C: '#e8b878', P: CREAM }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'SUNDAY #52', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 38)
      hearts(x, t, 600, 820, P.t0 + 1.3, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'A question jar | *at dinner.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: INK, L: '#6b62a8', S: 'rgba(143,227,255,0.35)', W: '#fff' }, 790, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.4 + i * 0.1, 0.25, 2); if (k > 0.01) { x.save(); x.translate(760 + (i % 2) * 60, 960 + Math.floor(i / 2) * 50); x.rotate(i * 0.4); x.fillStyle = [PINK, GOLD, MINT, SKYB][i]; x.fillRect(-24 * k, -14 * k, 48 * k, 28 * k); x.restore() } }
      bubble(x, 790, 660, 'what’s your | rising sign?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: CREAM, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'A recipe | *passed down with love.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), 'GRAN’S COOKIES', ['2 cups love', '1 cup butter', 'bake till home'], { bar: SKYB, w: 340, n: Math.floor(Math.max(0, lt - 0.4) / 0.35) + 1 })
      L(x, 790, 1080, 'PASS IT ON ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'A talent show | *at home. Yearly.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.8, 1.6],
    back(x, t, lt, P) { spotlight(x, 390, 480, 1120, 220, 0.18 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      card(x, 790, 820, pop01(t, P.t0 + 0.4, 0.35, 2), 'PROGRAMME', ['act 1: Leo', 'act 2: Leo', 'act 3: Leo'], { bar: GOLD, rot: 0.04, n: Math.floor(Math.max(0, lt - 0.6) / 0.35) + 1 })
      sparkles(x, t, 390, 820, P.t0 + 1.0, 8, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'A monthly | *thank-you note.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ENVELOPE, { K: INK, W: CREAM, H: RED }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 790, 680, 'TO: THE BUS DRIVER', pop01(t, P.t0 + 0.8, 0.3, 2.4), MINT, 0.04, 28)
      L(x, 790, 1060, 'SENT THIS YEAR: 12', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Same photo, same pose. | *Every year.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, y: 120, s: 220 },
    front(x, t, lt, P) {
      polaroids(x, t - P.t0 - 0.2, 690, 760, Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.5) + 1))
    } },
  { sign: 'scorpio', cap: 'A midnight walk | *to talk about the year.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: '#e6e0ff' }, 820, 700, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      signChar(x, t, 'cancer', 820, 1010, 170 * pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      L(x, 600, 1140, 'DEEP TALK: BOOKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#c97bff', -0.04, 28, CREAM)
    } },
  { sign: 'sagittarius', cap: 'A mystery day trip. | *Every spring.*', mood: 'sparkle', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, TICKET, { K: INK, G: GOLD }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.3) { x.save(); x.translate(760, 860); x.rotate(0.06); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = clamp(k); x.fillText('TO: ???', 0, 0); x.restore() }
      L(x, 790, 1060, 'BAGS: PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'A yearly list of | *how far you came.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(Math.max(0, lt - 0.4) / 0.3) + 1
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 'LOOK HOW FAR', ['new job ✓', 'learned to rest ✓', 'called mum ✓', 'proud ✓'], { bar: '#2fc79a', h: 300, w: 360, n })
    } },
  { sign: 'aquarius', cap: 'A made-up holiday | *only you celebrate.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 'MARCH 9', ['', '  SOCK DAY!'], { bar: SKYB, h: 220 })
      drawBits(x, SOCK, { W: CREAM, R: PINK }, 700, 1050, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      drawBits(x, SOCK, { W: CREAM, R: MINT }, 880, 1050, 14 * pop01(t, P.t0 + 1.1, 0.3, 2), { sx: -1 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 180, 0.5)
    } },
  { sign: 'pisces', cap: 'A letter to | *your future self.*', mood: 'heart', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), 'DEAR ME,', ['you’re doing', 'so well.', 'love, me ♡'], { bar: LAV, n: Math.floor(Math.max(0, lt - 0.4) / 0.4) + 1 })
      L(x, 790, 1080, 'OPEN IN: 1 YEAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0375', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *tradition to start.*',
  cameos: CAMEOS,
  group: { cap: 'Start small. | *Keep it forever.*' },
  last: {
    text: 'Talent show, year ten: | *still all Leo.*',
    draw(x, t, lt) {
      const t0 = t - lt
      spotlight(x, 420, 700, 1260, 230, 0.2 * pop01(t, t0 + 0.2, 0.4, 2))
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 420, 1060, 300 * k, { mood: lt > 1.0 ? 'wink' : 'sparkle', seed: 9, hops: [t0 + 0.9, t0 + 1.8] })
      card(x, 790, 1040, pop01(t, t0 + 0.7, 0.35, 2), 'YEAR 10', ['act 1: Leo', 'act 2: Leo', 'encore: Leo'], { bar: GOLD, rot: 0.05, n: Math.floor(Math.max(0, lt - 0.9) / 0.35) + 1 })
      sparkles(x, t, 420, 1000, t0 + 1.0, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
