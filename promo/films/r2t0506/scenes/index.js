// r2t0506: star_talk ROLLCALL, "The signs as | *only children.*" (signs3kit social cut, music: lofi · C). Ending: callback.
//   ♈ raced themselves, won · ♉ a mini fridge with their name on it · ♊ no siblings, invented a twin · ♋ best friends
//   with Mom since birth · ♌ every family photo is just Leo · ♍ toys still in the box · ♎ settled pizza vs pasta for the
//   parents · ♏ found every hidden gift by Dec 2 · ♐ befriended the whole street · ♑ adults' table since age four
//   · ♒ played alone, built a planet (population 1) · ♓ their imaginary friend moved away.
//   group: "Never shared. | Never bored."   callback: the planet again, "Population? | Now two."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** text lines centred inside a card (call from card's fn) */
function lines(x, arr, { size = 26, color = INK, lh = 1.35, font = MONO, weight = 700, dy = 0 } = {}) {
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, dy + (i - (arr.length - 1) / 2) * size * lh))
}
/** a phone with a screen; fn draws on the screen in phone-local coords (screen 200×340 centred) */
function phone(x, cx, cy, k, fn, { rot = 0.04, scale = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 240, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412)
  x.fillStyle = '#3a3360'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#1b1236'; x.fillRect(-104, -176, 208, 352)
  if (fn) fn()
  x.restore()
}
const ACC = '#ffb34a'
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..']
const FRIDGE = ['KKKKKKKKK', 'KWWWWWWWK', 'KWWWWWWHK', 'KWWWWWWHK', 'KKKKKKKKK', 'KWWWWWWWK', 'KWWWWWWHK', 'KWWWWWWHK', 'KWWWWWWWK', 'KWWWWWWWK', 'KKKKKKKKK', '.K.....K.']
const BOX = ['KKKKKKKKKKK', 'KRRRRYRRRRK', 'KRRRRYRRRRK', 'KYYYYYYYYYK', 'KRRRRYRRRRK', 'KRRRRYRRRRK', 'KRRRRYRRRRK', 'KKKKKKKKKKK']
const GIFT = ['..Y...Y..', '...YYY...', 'KKKKKKKKK', 'KPPPYPPPK', 'KPPPYPPPK', 'KYYYYYYYK', 'KPPPYPPPK', 'KPPPYPPPK', 'KKKKKKKKK']
const PLANET = ['....GGGGG....', '..GGBBBGGGG..', '.GBBBBBGGGBB.', 'GGBBBGGGBBBBG', 'GBBBGGGBBBBBG', 'GBBBBGGBBBGGG', 'GGBBBBBBBGGGG', '.GGBBBBGGGGB.', '..GGGBBBBBG..', '....GGGGG....']
const PLANET_C = { G: GREEN, B: '#4aa8ff' }
const RING = ['.KK.', 'K..K', 'K..K', '.KK.']

const CAMEOS = [
  { sign: 'aries', cap: 'Raced themselves. | *And won.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: INK }, 790, 900, 22 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 790, 680, 'RUNNERS: 1', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 36)
      L(x, 790, 1110, 'PLACE: 1ST OF 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 140, 0.4)
    } },
  { sign: 'taurus', cap: 'Their own room. | Their own *fridge.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FRIDGE, { K: INK, W: '#e8f0ff', H: '#9aa5c4' }, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 820, 'TAURUS ONLY', pop01(t, P.t0 + 0.8, 0.3, 2.4), PINK, -0.06, 30)
      L(x, 790, 1130, 'SNACKS: ALL MINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'No siblings. | So they *invented a twin.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 900, 220 * k, { mood: lt > 1 ? 'wink' : 'happy', look: [-1, 0], seed: 13, glyph: false, alpha: 0.8 })
      bubble(x, 790, 650, 'meet me. again.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'br' })
      L(x, 790, 1120, 'TWIN: IMAGINARY', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Best friends with Mom. | *Since birth.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 210, pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.05 }, () => lines(x, ['BFF', 'BRACELET', '♥ MOM ♥'], { size: 34 }))
      L(x, 790, 1110, 'FRIENDSHIP: DAY 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 30)
      hearts(x, t, 790, 760, P.t0 + 0.9, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Every family photo. | *Just Leo.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), cx = 700 + (i % 2) * 180, cy = 730 + Math.floor(i / 2) * 230
        card(x, cx, cy, 150, 180, k, { rot: (i % 2 ? 0.06 : -0.06), bg: GOLD }, () => { x.fillStyle = '#2a2350'; x.fillRect(-60, -75, 120, 150) })
        if (k > 0.5) signChar(x, t, 'leo', cx, cy + 10, 110, { mood: i % 2 ? 'wink' : 'sparkle', seed: 30 + i, glyph: false })
      }
      L(x, 790, 1150, 'GALLERY: 412 OF LEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.03, 28)
    } },
  { sign: 'virgo', cap: 'Every toy still | *in the box.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOX, { K: INK, R: PINK, Y: MINT }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'DO NOT OPEN', pop01(t, P.t0 + 0.7, 0.3, 2.2), RED, -0.05, 34, CREAM)
      L(x, 790, 1110, 'CONDITION: MINT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Settled pizza vs pasta | *for the parents.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 700, 660, 'PIZZA!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: ORANGE, tail: 'bl' })
      bubble(x, 870, 800, 'PASTA!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: '#ffe36a', tail: 'br' })
      L(x, 790, 1060, 'VERDICT: BOTH', pop01(t, P.t0 + 1.3, 0.3, 2.6), MINT, -0.04, 38)
      sparkles(x, t, 790, 1060, P.t0 + 1.35, 6, 150, 0.2)
    } },
  { sign: 'scorpio', cap: 'Found every hidden gift. | *By December 2.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, GIFT, { K: INK, P: i === 1 ? '#c97bff' : PINK, Y: GOLD }, 680 + i * 120, 960 - (i === 1 ? 40 : 0), 15 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      L(x, 790, 700, 'FOUND: 3 OF 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#c97bff', -0.04, 34, CREAM)
      L(x, 790, 1130, 'ACTS SURPRISED: YES', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'No playmates? | Befriended *the whole street.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      ;['hi!', 'hey!!', 'yo!', 'hiii'].forEach((s, i) => bubble(x, 690 + (i % 2) * 190, 640 + i * 110, s, pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2.2), { size: 34, col: i % 2 ? SKYB : BONE, tail: i % 2 ? 'br' : 'bl' }))
      L(x, 790, 1140, 'FRIENDS: ENTIRE BLOCK', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.03, 28)
    } },
  { sign: 'capricorn', cap: 'At the adults’ table. | *Since age four.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'and how are | interest rates?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: BONE, tail: 'bl' })
      L(x, 790, 940, 'AGE: 4', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.05, 44)
      L(x, 790, 1100, 'BEDTIME: OPTIONAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Played alone. | Built *a whole planet.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 790, 880, 22 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.1 * Math.sin(t) })
      L(x, 790, 1120, 'POPULATION: 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 36)
      sparkles(x, t, 790, 880, P.t0 + 0.6, 8, 170, 0.2)
    } },
  { sign: 'pisces', cap: 'Their imaginary friend | *moved away.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'bye, gary…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      L(x, 790, 960, 'GARY: RELOCATED', pop01(t, P.t0 + 1.1, 0.3, 2.4), BONE, -0.04, 32)
      L(x, 790, 1110, 'TISSUES: 40', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0506', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs as | *only children.*',
  cameos: CAMEOS,
  group: { cap: 'Never shared. | *Never bored.*' },
  last: {
    text: 'The planet? | Population: *two.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, PLANET, PLANET_C, 540, 1060, 30 * pop01(t, t0 + 0.2, 0.45, 1.8), { rot: 0.08 * Math.sin(t) })
      const a = pop01(t, t0 + 0.5, 0.4, 1.8), b = pop01(t, t0 + 0.9, 0.4, 1.8)
      if (a > 0.01) signChar(x, t, 'aquarius', 440, 880, 170 * a, { mood: 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.4], glyph: false })
      if (b > 0.01) signChar(x, t, 'gemini', 640, 880, 170 * b, { mood: 'happy', seed: 8, look: [-1, 0], hops: [t0 + 1.6], glyph: false })
      if (lt > 1.3) L(x, 540, 1300, 'POPULATION: 2', pop01(t, t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 44)
      if (lt > 1.4) hearts(x, t, 540, 800, t0 + 1.4, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
