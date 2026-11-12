// r2t0475: star_talk, SOLO (scorpio), "Scorpios when you | *fib to them.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine tiny fibs and the Scorpio who sees straight through each one. Kind: the joke is on the
// fib, never scary. Ending: lesson.
//   "on my way!" (you're in bed) · loved the gift (they saw the face) · "I already ate" (your stomach disagrees)
//   · "I'm 25 again" (31 candles) · blamed the dog (no dog) · "saw the movie" (how did it end?) · one eyebrow · "traffic" on a
//   Sunday at 6 a.m. · told the truth, already forgiven.
//   group "Lie detector? | *Built in.*"   lesson "Just tell them. | *They know.*"   last "And the dog? | *Still imaginary.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, calendar, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const ACC = '#ff5c8a', S = 'scorpio', ST = { x: -190 }
const BONEBM = ['WW.....WW', 'WWWWWWWWW', 'WWWWWWWWW', 'WW.....WW']
const BROW = ['KKKK....', '..KKKK..', '....KKKK']

const CAMEOS = [
  { sign: S, cap: '“On my way!” | They know *you’re in bed.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: 'SCORPIO', msg: lt > 0.9 ? 'enjoy | the nap :)' : 'ok', bg: '#ff9ab8', rot: 0.05 })
    } },
  { sign: S, cap: '“I love the gift!” | *They saw your face.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'gift', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'TINY FROWN: SEEN', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: ACC, color: INK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“I already ate.” | *Your stomach disagrees.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'i already ate.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 800 + Math.sin(t * 40) * 4 * (lt > 1.0 ? 1 : 0), 960, 'GRRRRR', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 60, bg: GOLD, rot: -0.06 })
    } },
  { sign: S, cap: '“I’m 25 again.” | *They brought 31 candles.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'cake', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, lt > 1.0 ? 'CANDLES: 31' : 'CANDLES: 25?', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: lt > 1.0 ? ACC : BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.3, 8, 170, 0.3)
    } },
  { sign: S, cap: 'You blamed the dog. | *You don’t have a dog.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BONEBM, { W: PAPER }, 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      label(x, 800, 760, 'DOGS OWNED: 0', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Saw that movie!” | *“How did it end?”*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'how did | it end? :)', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: ACC, tail: 'bl' })
      label(x, 800, 1000, 'YOU: SWEATING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A tiny fib. | *One eyebrow. Up.*', mood: 'squint', look: [1, 0], star: { x: -190, y: 20, s: 340 },
    front(x, t, lt, P, F) {
      const up = ease.outBack(clamp((lt - 0.5) / 0.4))
      drawBits(x, BROW, { K: INK }, F.x + 70, F.top + 76 - up * 26, 10 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.2 })
      label(x, 790, 900, 'ONE (1) EYEBROW', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Traffic was awful.” | *At 6 a.m. Sunday?*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'SUNDAY', '6 AM')
      label(x, 800, 1090, 'ROADS: EMPTY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Told them the truth? | *Forgiven. Instantly.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'heart', 800, 900, 18 * pop01(t, P.t0 + 0.9, 0.35, 2))
      hearts(x, t, 800, 900, P.t0 + 1.1, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 4 })
      label(x, 800, 1100, 'ALL GOOD ♥︎', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0475', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpios when you | *fib to them.*',
  cameos: CAMEOS,
  group: { cap: 'Lie detector? | *Built in.*', mood: 'wink' },
  lesson: { text: 'Just tell them. | *They know.*', chip: 'HONESTY: ON' },
  last: {
    text: 'And the dog? | *Still imaginary.*',
    draw(x, t, lt) {
      label(x, 540, 1180, 'DOGS OWNED: 0', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 44, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
