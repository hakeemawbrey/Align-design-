// v3t033: THE SIGNS AS… v3, "The signs | giving gifts." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   one gift per sign, each pushed to the extreme:
//              ♈ couldn't wait, opened it for you · ♉ bought you cake, ate half · ♊ can't keep a secret: "it's a lamp!"
//              · ♋ a scrapbook of your whole life · ♌ a framed photo of themself · ♍ ironed the bow
//              · ♎ the wrapping cost more than the gift · ♏ gift tag: "you know why." · ♐ a rock from another country
//              · ♑ a planner, pre-filled · ♒ adopted a penguin in your name · ♓ cried when you opened it
//  49.2        group: "It’s the *thought.*"
//  52.6        callback: "Taurus brought | *the other half.*" (the cake from Taurus' card comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const BOX = [
  '...R...R...',
  '....R.R....',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
  'RRRRRRRRRRR',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
]
const OPENBOX = [
  'P.........P',
  '.P.......P.',
  '..P.....P..',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
]
// a cake: full, or half (right half bitten off)
const CAKE = [
  '.....R.....',
  '.....W.....',
  'PPPPPPPPPPP',
  'WWWWWWWWWWW',
  'CCCCCCCCCCC',
  'PPPPPPPPPPP',
  'CCCCCCCCCCC',
  'KKKKKKKKKKK',
]
const HALFCAKE = [
  '.....R',
  '.....W',
  'PPPPPP',
  'WWWWWW',
  'CCCCCC',
  'PPPPPP',
  'CCCCCC',
  'KKKKKK',
]
const CAKE_C = { R: RED, W: CREAM, P: PINK, C: '#b9784a', K: '#c4c8e0' }
const BOOK = [
  'BBBBBBBBBBBBBB',
  'BWWWWWWBWWWWWB',
  'BWAAAAWBWCCCWB',
  'BWAAAAWBWCCCWB',
  'BWAAAAWBWCCCWB',
  'BWWWWWWBWWWWWB',
  'BWDDDDWBWEEEWB',
  'BWDDDDWBWEEEWB',
  'BWWWWWWBWWWWWB',
  'BBBBBBBBBBBBBB',
]
const BOOK_C = { B: '#c24a6a', W: CREAM, A: SKYB, C: GOLD, D: MINT, E: LAV }
const FRAME = [
  'GGGGGGGGGGG',
  'GKKKKKKKKKG',
  'GKKKKKKKKKG',
  'GKKKKKKKKKG',
  'GKKKKKKKKKG',
  'GKKKKKKKKKG',
  'GKKKKKKKKKG',
  'GKKKKKKKKKG',
  'GGGGGGGGGGG',
]
const ROCK = [
  '...GGGG...',
  '.GGgGGGGG.',
  'GGGGGGgGGG',
  'GgGGGGGGGG',
  'GGGGGgGGGG',
  '.GGGGGGGG.',
]
const PENGUIN = [
  '..KKKK..',
  '.KKKKKK.',
  '.KWKKWK.',
  '.KKYYKK.',
  'KKWWWWKK',
  'KKWWWWKK',
  'KKWWWWKK',
  '.KWWWWK.',
  '.YY..YY.',
]
const PENG_C = { K: '#2a2350', W: CREAM, Y: ORANGE }
const PLANNER = [
  'KKKKKKKKKKKK',
  'KWWWWWWWWWWK',
  'KWRRWWRRWWWK',
  'KWWWWWWWWWWK',
  'KWRRRWWRRRWK',
  'KWWWWWWWWWWK',
  'KWRRWRRRWRWK',
  'KWWWWWWWWWWK',
  'KWRRRWRRWWWK',
  'KWWWWWWWWWWK',
  'KKKKKKKKKKKK',
]
const BOW = [
  'RR.......RR',
  'RRRR...RRRR',
  'RRrRR.RRrRR',
  'RRRRRYRRRRR',
  'RRrRR.RRrRR',
  'RRRR...RRRR',
  'RR..R.R..RR',
  '...R...R...',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Couldn’t wait. | Opened it *for you.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      const open = lt > 0.9, k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, open ? OPENBOX : BOX, { B: SKYB, R: RED, P: CREAM }, 800, 920, 24 * k)
      if (open) sparkles(x, t, 800, 850, P.t0 + 0.9 * 1.29, 7, 170, 0.1)
      label(x, 800, 650, 'SURPRISE!', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Bought you a cake. | *Ate half.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, lt > 1.0 ? HALFCAKE : CAKE, CAKE_C, lt > 1.0 ? 760 : 800, 930, 30 * k)
      label(x, 800, 660, 'FOR YOU ♥', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.05 })
      if (lt > 1.0) bubble(x, 840, 1120, 'quality check', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Can’t keep a secret. | *“It’s a lamp!”*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, { B: MINT, R: PINK }, 800, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'it’s a LAMP! | oops', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'A scrapbook of | *your whole life.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      label(x, 790, 660, 'VOLUME 9', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 1060, P.t0 + 1.5, { n: 4, life: 1.2, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'A framed photo. | *Of themself.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, FRAME, { G: GOLD, K: '#3a2a60' }, 800, 880, 26 * k)
      if (k > 0.6) signChar(x, t, 'leo', 800, 900, 170 * clamp(k), { mood: 'wink', seed: 31, glyph: false })
      label(x, 800, 1110, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Perfect wrapping. | *Ironed the bow.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, { B: '#f3eedf', R: MINT }, 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 650, 'CORNERS: 90°', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.5, 6, 150, 0.4, [BONE, MINT])
    } },
  { sign: 'libra', cap: 'The wrapping cost | *more than the gift.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BOW, { R: PINK, r: '#ff4f86', Y: GOLD }, 790, 820, 30 * k)
      drawBits(x, BOX, { B: LAV, R: PINK }, 790, 1010, 8 * k)
      label(x, 790, 1110, 'GIFT: TINY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'The gift tag: | *“You know why.”*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, { B: '#2a2350', R: '#c23a5a' }, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 690, 'you know why.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: CREAM, rot: 0.08, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Gave you a rock. | From *another country.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      drawBits(x, ROCK, { G: '#9a9ab0', g: '#6a6a80' }, 330, 960, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 330, 690, 'it’s special! | i think', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'br' })
      label(x, 330, 1120, 'SOUVENIR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Gave you a planner. | *Already filled in.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PLANNER, { K: INK, W: CREAM, R: '#2fc79a' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      label(x, 790, 650, 'DATE NIGHT: SET', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Adopted a penguin | *in your name.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PENGUIN, PENG_C, 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 6) })
      label(x, 800, 660, 'MEET: “YOU”', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You opened it. | *They cried.*', mood: lt => lt < 0.7 ? 'happy' : 'wide', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, OPENBOX, { B: LAV, R: PINK, P: CREAM }, 800, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'do you | like it??', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t033', key: 'E', accent: '#ff8fb1', ending: 'callback',
  title: 'The signs | *giving gifts.*',
  cameos: CAMEOS,
  group: { cap: 'It’s the *thought.*' },
  last: {
    text: 'Taurus brought | *the other half.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      const j = ease.inOutCubic(prog(lt, 0.9, 1.6))
      drawBits(x, HALFCAKE, CAKE_C, lerp(330, 438, j), 1150, 34 * k)
      drawBits(x, HALFCAKE, CAKE_C, lerp(750, 642, j), 1150, 34 * k, { sx: -1 })
      if (j >= 1) sparkles(x, t, 540, 1150, t - lt + 1.6, 8, 220, 0.3)
      signChar(x, t, 'taurus', 540, 1450, 210, { mood: 'heart', pop: pop01(t, t - lt + 0.8, 0.4, 1.8), seed: 12, hops: [t - lt + 1.4] })
      label(x, 540, 960, 'WHOLE AGAIN ♥', pop01(t, t - lt + 1.7, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
