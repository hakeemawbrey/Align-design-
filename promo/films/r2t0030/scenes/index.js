// r2t0030: star_talk, SOLO, "Your Taurus mom | be like." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): the most extreme Taurus parent. Ending: the group beat.
//   0.0–3.6    "Your Taurus mom | *be like.*"
//   3.6–37.8   you said you ate, mom fed you anyway · sent leftovers home, wants the tub back · fancy soap nobody may use
//              · new phone, still uses the old one · same restaurant order since 2005 · touch the thermostat? don't you dare
//              · the recipe: "a little of this" · kitchen chairs from 1998, still "new" · you moved out, your room's untouched
//  37.8        group (the ending): "Never changes. | *Thank goodness.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const MOSS = '#9be08a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
const PLATE = ['....SSS......', '..SSSSSSS....', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const TUB = ['LLLLLLLLLLLL', 'LLLLLLLLLLLL', 'TTTTTTTTTTTT', 'TOOOOOOOOOOT', 'TOOOOOOOOOOT', 'TOOOOOOOOOOT', '.TTTTTTTTTT.']
const SOAP = ['....GG....', '...G..G...', '.PPPPPPPP.', 'PPWPPPPPPP', 'PPPPPPPPPP', '.PPPPPPPP.', 'DDDDDDDDDD']
const OLDPHONE = ['KKKKKK', 'KGGGGK', 'KGGGGK', 'KKKKKK', 'KBKBKK', 'KKBKBK', 'KBKBKK', 'KKKKKK']
const NEWPHONE = ['KKKKKKK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KKKKKKK']
const THERMO = ['.KKKKKKK.', 'KWWWWWWWK', 'KWRRRRRWK', 'KWWWWWWWK', 'KWW.K.WWK', 'KWWKKKWWK', 'KWWWWWWWK', '.KKKKKKK.']
const POT = ['KKKKKKKKK', 'PPPPPPPPP', 'PPPPPPPPP', 'PPPPPPPPP', '.PPPPPPP.']
const STEAM = ['.S...S.', 'S...S..', '.S...S.', '..S...S']
const CHAIR = ['B......', 'B......', 'B......', 'BBBBBBB', 'B.....B', 'B.....B']
const BED = ['B...........', 'BPPP........', 'BPPPQQQQQQQB', 'BQQQQQQQQQQB', 'B..........B']

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'You said you ate. | Mom *fed you anyway.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'i already | ate, mom!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.6) / 0.35) + 1)
      for (let i = 0; i < n; i++) drawBits(x, PLATE, { S: '#e6e0f0', W: CREAM }, 790, 1090 - i * 60, 18 * pop01(t, P.t0 + 0.6 + i * 0.35, 0.25, 2))
      label(x, 790, 860, 'EAT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 52, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent leftovers home. | *Wants the tub back.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TUB, { L: SKYB, T: '#e8f6ff', O: '#ff9a4a' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, 'PROPERTY OF MOM', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 690, 'by sunday.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Bought fancy soap. | *Nobody may use it.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SOAP, { G: GOLD, P: PINK, W: CREAM, D: '#c9c9d8' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.7, 7, 170, 0.4)
      label(x, 790, 1090, 'FOR GUESTS. (NEVER)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got a new phone. | *Still uses the old one.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, NEWPHONE, { K: INK, S: SKYB }, 880, 880, 20 * k, { rot: 0.1 })
      label(x, 880, 1060, 'IN THE BOX', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.06, font: MONO, weight: 700 })
      drawBits(x, OLDPHONE, { K: '#6a7594', G: MINT, B: '#c9c9d8' }, 680, 920, 18 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.1 })
      bubble(x, 700, 690, 'this one works!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Same restaurant order. | *Since 2005.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'the usual.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 50, tail: 'bl' })
      const y = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 899)
      label(x, 790, 960, `SAME DISH ×${y}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'MENU: UNOPENED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Touch the thermostat? | *Don’t you dare.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, THERMO, { K: INK, W: CREAM, R: RED }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'SET: 1998. FOREVER.', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 680, 'put on | a sweater.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'The recipe? | *“A little of this.”*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const kp = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, { K: INK, P: '#c98f2a' }, 790, 960, 20 * kp)
      drawBits(x, STEAM, { S: '#e6e0f0' }, 790, 960 - 20 * 6 - Math.sin(t * 3) * 6, 12 * kp, { outline: null, alpha: 0.8 })
      bubble(x, 790, 720, 'how much salt?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 790, 1120, 'UNTIL IT’S RIGHT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Kitchen chairs from 1998. | *Still “new.”*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CHAIR, { B: BROWN }, 720, 930, 20 * k)
      drawBits(x, CHAIR, { B: BROWN }, 870, 930, 20 * k, { sx: -1 })
      label(x, 790, 1100, 'THE NEW CHAIRS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: MOSS, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 700, 'don’t lean back.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'You moved out. | *Your room’s untouched.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BED, { B: BROWN, P: CREAM, Q: SKYB }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 730, 'POSTERS: STILL UP', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'it’s ready for you.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MOSS, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0030', key: 'F', accent: MOSS, solo: 'taurus', ending: 'group',
  title: 'Your Taurus mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never changes. | *Thank goodness.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
