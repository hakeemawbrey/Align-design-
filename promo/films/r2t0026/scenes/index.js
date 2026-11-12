// r2t0026: star_talk, BELIKE, "Zodiac plus-ones | be like." (~63 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each one's most extreme version of being someone's plus-one. Ending: card.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ dance-off, started three · ♉ came for you, stayed for the buffet · ♊ knew nobody, left with twelve best friends
//              · ♋ met your family once, now they text daily · ♌ brought their own hype crew · ♍ lint-rolled the groom
//              · ♎ matched your outfit down to the socks · ♏ asked everyone's sign, knew everything
//              · ♐ came for the party, left with the band · ♑ fun party, brought a laptop · ♒ requested a song: whale noises
//              · ♓ party ended, cried at the coat check
//  49.2        "Best. Guest. | *Ever.*"
//  52.4        LESSON: "Bring the one who | makes *any room* fun."  PLUS-ONE: PICKED
//  58.3        "Aries danced. | *Pisces cried.*" over the match card: Aries + Pisces.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff7aa8', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#5fd068'

// ── props
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const ROLLER = ['RRRRRRRRRR', 'RWWWWWWWWR', 'RWWWWWWWWR', 'RRRRRRRRRR', '....KK....', '....KK....', '....KK....', '....KK....', '....KK....']
const SOCK = ['.SSS', '.SSS', '.SSS', '.SSS', '.SSS', 'SSSS', 'SSSS', 'SSS.']
const LAPTOP = ['.KKKKKKKKKKKK.', '.KSSSSSSSSSSK.', '.KSGGGGSSSSSK.', '.KSSSSSSSSSSK.', '.KSGGGGGGSSSK.', '.KSSSSSSSSSSK.', '.KKKKKKKKKKKK.', 'GGGGGGGGGGGGGG', '.GGGGGGGGGGGG.']
const HANGER = ['....KK....', '...K..K...', '......K...', '.....K....', '...KKKK...', '.KK....KK.', 'KKKKKKKKKK']
const GUITAR = ['..............KK', '.............KK.', '............KK..', '...........KK...', '..........KK....', '.........KK.....', '..ooo...KK......', '.OOOOO.KK.......', 'OOOOOOKK........', 'OOOWWKOO........', 'OOOWWOOO........', '.OOOOOOO........', '..OOOOO.........', '...ooo..........']

const CAMEOS = [
  { sign: 'aries', cap: 'Dance-off? | Aries *started three.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 3)
      label(x, 790, 700, `DANCE-OFF #${Math.min(3, n)}`, pop01(t, P.t0 + 0.35, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 960, 190 * k, { mood: lt > 1.5 ? 'sleepy' : 'wide', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 1130, 'again?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Came for you. | Stayed for *the buffet.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.3) + 1)
      for (let i = 0; i < n; i++) drawBits(x, PLATE, { W: CREAM }, 790, 1080 - i * 34, 16 * pop01(t, P.t0 + 0.3 + i * 0.38, 0.25, 2))
      label(x, 790, 720, `PLATE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 880, 'who are | we here for?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Knew nobody. | Left with *twelve besties.*', mood: lt => lt > 1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(clamp((lt - 0.3) / 1.6) * 12))
      for (let i = 0; i < n; i++) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: i % 2 ? PINK : '#ff4f86' }, 640 + (i % 4) * 100, 820 + Math.floor(i / 4) * 90, 9)
      label(x, 790, 680, `BEST FRIENDS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'group chat made!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Met your family once. | *Now they text daily.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'your mom: | hi sweetie!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 900, 'your aunt: | soup recipe?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      label(x, 790, 1090, 'NEW TEXTS: 14', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Your plus-one | brought a *hype crew.*', mood: 'sparkle', look: [1, 0], star: { x: -200, s: 280 }, hops: [1.2],
    front(x, t, lt, P) {
      const k1 = pop01(t, P.t0 + 0.4, 0.3, 2), k2 = pop01(t, P.t0 + 0.7, 0.3, 2)
      if (k1 > 0.01) signChar(x, t, 'aries', 720, 1020, 150 * k1, { mood: 'wide', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.6] })
      if (k2 > 0.01) signChar(x, t, 'sagittarius', 880, 1020, 150 * k2, { mood: 'sparkle', look: [-1, 0], seed: 32, glyph: false, hops: [P.t0 + 1.3, P.t0 + 1.9] })
      label(x, 800, 820, 'LEO! LEO! LEO!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 360, 760, P.t0 + 1.2, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Spotted lint. | Lint-rolled *the groom.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        const F2 = signChar(x, t, 'capricorn', 820, 960, 220 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 22, glyph: false })
        drawBits(x, ['BB...BB', 'BBBKBBB', 'BB...BB'], { B: INK, K: '#444' }, F2.x, F2.cy + 48, 9, { outline: null })
      }
      const roll = Math.sin(Math.max(0, lt - 0.6) * 9) * 40
      drawBits(x, ROLLER, { R: '#7dffb0', W: CREAM, K: '#6b62a8' }, 680, 920 + roll, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.5 })
      label(x, 790, 670, 'LINT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Matched your outfit. | *Down to the socks.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, SOCK, { S: ROSE }, 720, 900, 22 * k, { rot: -0.1 })
      drawBits(x, SOCK, { S: ROSE }, 860, 900, 22 * k, { rot: 0.1, sx: -1 })
      label(x, 790, 1110, 'COORDINATED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 160, 0.5)
    } },
  { sign: 'scorpio', cap: 'Asked everyone’s sign. | *Knew everything.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'what’s your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      const n = Math.min(40, Math.floor(clamp((lt - 0.8) / 1.2) * 40))
      label(x, 790, 900, `GUESTS READ: ${n}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'NOTHING MISSED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Came for the party. | Left *with the band.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { O: '#ff9a4a', o: '#c96a3a', K: '#8a4a2e', W: CREAM }, 790, 900, 15 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.2 })
      notes(x, t, 820, 820, { n: 4, cell: 7, col: '#ff9a4a', seed: 1 })
      label(x, 790, 1110, 'ON TOUR: 6 WEEKS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 680, 'text you | from the bus!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Fun party. | *Brought a laptop.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: SKYB, G: '#9aa5c4' }, 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 820, 760, { n: 3, cell: 6, col: PINK, seed: 4, alpha: 0.7 })
      bubble(x, 790, 680, 'one quick email.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1110, 'EMAILS: 31', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Requested a song. | *Whale noises.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'play the whales!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 900, '~ wooOOOooo ~', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bc' })
      label(x, 790, 1110, 'DANCE FLOOR: FULL', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Party’s over. | *Cried at the coat check.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, HANGER, { K: '#c9c9d8' }, 800, 830, 24 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 800, 990, 'COAT #12', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 680, 'best night | EVER', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0026', key: 'C', accent: ROSE, ending: 'card',
  title: 'Zodiac plus-ones | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Best. Guests. | *Ever.*' },
  lesson: { text: 'Bring the one who | makes *any room* fun.', chip: 'PLUS-ONE: PICKED' },
  card: { a: 'aries', b: 'pisces', chip: 'ALIGNED' },
  last: { text: 'Aries danced. | *Pisces cried.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
