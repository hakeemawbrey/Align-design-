// r2a0485: star_advice, ADVICE ROLLCALL, "First date: what | each sign notices." (~63 s vertical, signs3kit social cut,
// music: lofi · G). One warm, specific line per sign with a light visual gag. Ending: card (lesson + last line + match).
//   0.0–3.6    "First date: what | *each sign notices.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one thing per sign (3.8 s each):
//              ♈ you laugh at their jokes · ♉ you share the dessert · ♊ you ask a follow-up · ♋ how you treat the
//              waiter · ♌ a specific compliment · ♍ you were on time · ♎ the vibe feels easy · ♏ you mean what you
//              say · ♐ you're up for "one more stop" · ♑ you talk about your dreams · ♒ you let them be weird
//              · ♓ you're gentle with their heart
//  49.2        "Not the outfit. | *The kindness.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Be kind. Be curious. | *That’s the spark.*"  SPARK: FOUND
//  58.3        "Kind to the waiter? | *Extra dessert.*" over the match card: Cancer + Taurus.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#ff8fb1'

const SLICE = [
  '.........R',
  '.......PPP',
  '.....PPPPP',
  '...PPPPPPP',
  '.WWWWWWWWW',
  'CCCCCCCCCC',
  'WWWWWWWWWW',
  'CCCCCCCCCC',
]
const SLICE_C = { R: RED, P: PINK, W: PAPER, C: '#8a4a2e' }
const FORK = ['K.K.K', 'K.K.K', 'KKKKK', '..K..', '..K..', '..K..', '..K..']
const CLOCK = [
  '..KKKKK..',
  '.KWWWWWK.',
  'KWWWKWWWK',
  'KWWWKWWWK',
  'KWWWKKKWK',
  'KWWWWWWWK',
  'KWWWWWWWK',
  '.KWWWWWK.',
  '..KKKKK..',
]
const BIGHEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'You laughed | *at their jokes.*', mood: 'sparkle', star: L, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'and THEN the | goat ran in—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 990, 'HAHA', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 56, col: GOLD, tail: 'br' })
      label(x, 790, 1150, 'CONFIDENCE: SOARING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'You shared | *the dessert.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SLICE, SLICE_C, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, FORK, { K: '#cfe3ff' }, 700, 820, 14 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.4 })
      drawBits(x, FORK, { K: '#cfe3ff' }, 880, 820, 14 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.4 })
      label(x, 790, 1140, 'FORKS: TWO', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'You asked | *a follow-up question.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'wait, how did | that start?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1000, 'LISTENING: CONFIRMED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 420, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'cancer', cap: 'How you treat | *the waiter.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: L, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'thank you so | much!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1010, 'KINDNESS: NOTED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 780, P.t0 + 1.0, 6, 180, 0.2)
    } },
  { sign: 'leo', cap: 'A real compliment. | *Not just “nice.”*', mood: 'sparkle', star: L, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'your laugh | is so warm', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1000, 'LEO: GLOWING', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.2, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'You were | *on time.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CLOCK, { K: INK, W: PAPER }, 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, '7:00 SHARP', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'RESPECT: EARNED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'The vibe | *felt easy.*', mood: 'heart', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 960); x.scale(k, k); x.fillStyle = INK; x.fillRect(-14, -10, 28, 160); x.fillStyle = GOLD; x.fillRect(-8, -4, 16, 150); x.fillStyle = INK; x.fillRect(-170, -14, 340, 22); x.fillStyle = GOLD; x.fillRect(-166, -10, 332, 14); x.restore() }
      label(x, 790, 760, 'VIBE: PERFECTLY EVEN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'no awkward pauses', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'You meant | *what you said.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'i had a | great time.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1000, 'LIE DETECTOR: CALM', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'TRUST: +1', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'You said yes | *to “one more stop.”*', mood: 'sparkle', star: R, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const STOPS = ['dinner ✓', 'ice cream ✓', 'night walk ✓', 'karaoke?']
      STOPS.forEach((s, i) => label(x, 320, 720 + i * 110, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), { size: 32, bg: i === 3 ? GOLD : MINT, rot: i % 2 ? 0.04 : -0.04 }))
    } },
  { sign: 'capricorn', cap: 'You talked | *about your dreams.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], star: R, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 320, 760, 'i want to open | a bakery one day', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'br' })
      label(x, 320, 1000, 'AMBITION: ATTRACTIVE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 740, 860, P.t0 + 1.3, 6, 170, 0.2)
    } },
  { sign: 'aquarius', cap: 'You let them | *be weird.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'octopuses have | THREE hearts', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      bubble(x, 790, 980, 'tell me more!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'br' })
      label(x, 790, 1140, 'WEIRD: WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You were gentle | *with their heart.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 3 : 2, star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      drawBits(x, BIGHEART, { H: '#ff4f86', W: '#fff' }, 790, 940 + 6 * Math.sin(t * 3), 30 * k)
      label(x, 790, 1150, 'HANDLED WITH CARE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0485', key: 'G', accent: ACC, ending: 'card',
  title: 'First date: what | *each sign notices.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'taurus', chip: "IT'S A MATCH" },
  group: { cap: 'Not the outfit. | *The kindness.*' },
  lesson: { text: 'Be kind. Be curious. | *That’s the spark.*', chip: 'SPARK: FOUND' },
  last: { text: 'Kind to the waiter? | *Extra dessert.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
