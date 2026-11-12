// r2t0565: star_talk, SOLO (scorpio), "Scorpios vs. | *small talk.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine small-talk moments, each the most extreme Scorpio version. Ending: lesson.
//   "nice weather, huh?" "is it?" · skipped "how's work", asked about your fears · elevator small talk, took the stairs (floor 12)
//   · weekend plans? classified · party small talk, hid with the dog · got a "hey", replied "why?"
//   · first-date small talk, skipped to "what's your rising?" · the hairdresser chats, pretended to sleep
//   · finally a deep talk, stayed till 3 a.m.
//   group "No small talk. | *Only big talk.*"   lesson "Go deep with a Scorpio. | They *open up* slowly."   last "Weather talk? | *They already left.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = '#c97bff', S = 'scorpio', ST = { x: -180 }
const DOG = ['BB.......BB.', 'BBB.....BBB.', '.BWWWWWWWB..', '.WWKWWWKWW..', '.WWWWWWWWW..', '..WWWNNWW...', '...WWWWW....', '..WWWWWWWWWW', '..WWWWWWWWWW', '..WW.WW.WW.W']
const DOG_C = { B: '#8a5a3a', W: '#e8c9a0', K: INK, N: INK }
const STAIRS = ['.........WW', '.........WW', '.......WWWW', '.......WWWW', '.....WWWWWW', '.....WWWWWW', '...WWWWWWWW', '...WWWWWWWW', '.WWWWWWWWWW', '.WWWWWWWWWW']

const CAMEOS = [
  { sign: S, cap: '“Nice weather, huh?” | Scorpio: *“Is it?”*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'sun', 820, 660, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 860, 'nice weather, | huh?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      bubble(x, 520, 1110, 'is it?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Skipped “how’s work.” | Asked about *your fears.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'how’s work? | fun plans? | busy week?', { head: 'SMALL TALK', headBg: BONE, size: 32, w: 290, rot: 0.04, strike: lt > 0.8 ? [0, 1, 2] : [] })
      bubble(x, 790, 1080, 'what keeps you | up at night?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Elevator small talk? | *Took the stairs.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.4, 1.7],
    front(x, t, lt, P) {
      drawBits(x, STAIRS, { W: '#9aa5c4' }, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fl = 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 11)
      label(x, 800, 690, `FLOOR ${fl} / 12`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.9) label(x, 800, 1150, 'WORTH IT.', pop01(t, P.t0 + 1.9 * 1.29, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Weekend plans?” | *“Classified.”*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'sat: ████ | sun: ██████ | mon: ███', { head: 'WEEKEND', headBg: SKYB, size: 34, w: 300, rot: -0.04 })
      label(x, 800, 900, 'CLASSIFIED', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 48, bg: RED, color: PAPER, rot: -0.18, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Small talk at a party? | *Hid with the dog.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -150, y: 40 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 760, 1000, 17 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 800, 700, 'finally, | a real one.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      hearts(x, t, 680, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Got a “hey.” | Replied *“why?”*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '7:41', head: lt > 1.1 ? 'YOU REPLIED' : 'NEW MESSAGE', msg: lt > 1.1 ? 'why?' : 'hey', bg: lt > 1.1 ? ACC : BONE, size: 52 })
      label(x, 800, 1120, 'SUSPICIOUS OF “HEY”', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'First-date small talk? | Skipped to *the chart.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'what’s your | rising sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'MINUTE ONE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'MOON TOO, PLEASE.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Chatty hairdresser? | *Pretended to sleep.*', mood: lt => lt > 0.8 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'so, any | holidays?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      label(x, 800, 980, 'ZZZ (FAKE)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1110, 'TIP: GENEROUS', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Finally, a deep talk. | Stayed *till 3 a.m.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const m = Math.round(clamp((lt - 0.3) / 1.6) * 180), h = Math.floor(m / 60) || 12
      label(x, 790, 820, `${h}:${String(m % 60).padStart(2, '0')} A.M.`, pop01(t, P.t0 + 0.2, 0.35, 2), { size: 70, bg: PAPER, rot: -0.03, font: MONO, weight: 700 })
      bits(x, 'moon', 920, 650, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 1060, 'okay, one | more thing…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0565', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpios vs. | *small talk.*',
  cameos: CAMEOS,
  group: { cap: 'No small talk. | *Only big talk.*', mood: 'wink' },
  lesson: { text: 'Go deep with a Scorpio. | They *open up* slowly.', chip: 'TRUST: LOADING' },
  last: { text: 'Weather talk? | *They already left.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
