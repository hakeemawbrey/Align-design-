// r2t0607: star_talk, SOLO (pisces), "Pisces on a trip | *be like.*" (signs3kit social cut, music: lofi · E).
// Nine trip moments, each the most extreme Pisces version, and Pisces cries in every one. Ending: callback.
//   packed six plushies, one sock · waved goodbye to the house · saw the ocean, sobbed · adopted a lonely rock
//   · followed a butterfly, now lost · one sunset, nine hundred photos · said bye to the hotel pillow
//   · met a Cancer on day one, soulmates by day two · got home, misses the trip
//   group "One trip. | *So many tears.*"
//   callback "The rock? | *Has its own pillow.*" (card 4's rock is back, tucked in)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, bits, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'pisces', ST = { x: -190 }
const BM = {
  BEAR: ['.B...B.', 'BBBBBBB', 'BKBBBKB', 'BBBNBBB', '.BBBBB.'],
  WAVES: ['..W.....W.....W.', '.WBW...WBW...WBW', 'BBBBBBBBBBBBBBBB', 'BDBBBDBBBDBBBDBB', 'BBBBBBBBBBBBBBBB', 'DDDDDDDDDDDDDDDD'],
  ROCK: ['..GGGG..', '.GGGGGG.', 'GGKGGKGG', 'GGGGGGGG', 'GGGKKGGG', '.GGGGGG.'],
  FLY: ['PP...PP', 'PPP.PPP', '.PPKPP.', 'PPP.PPP', 'PP...PP'],
  SUN: ['....YYYY....', '..YYYYYYYY..', '.YYYYYYYYYY.', 'YYYYYYYYYYYY', 'OOOOOOOOOOOO', '.OOOOOOOOOO.'],
}
const BC = { BEAR: { B: '#c98f5a', K: INK, N: INK }, WAVES: { W: BONE, B: '#3a8fd0', D: '#2a5a9a' }, ROCK: { G: STEEL, K: INK }, FLY: { P: PINK, K: INK }, SUN: { Y: '#ffb34a', O: '#ff6b5a' } }
const bm = (x, n, cx, cy, cell, o) => drawBits(x, BM[n], BC[n], cx, cy, cell, o)

const CAMEOS = [
  { sign: S, cap: 'Packed six plushies. | *One sock.*', mood: 'heart', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) bm(x, 'BEAR', 700 + i * 100, 760 - (i % 2) * 20, 16 * pop01(t, P.t0 + 0.5 + i * 0.2, 0.25, 2), { rot: (i - 1) * 0.15 })
      L(x, 800, 1100, 'SOCKS: 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Waved goodbye | *to the house.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'i’ll miss you', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, 800, 1090, 'TRIP LENGTH: 3 DAYS', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: S, cap: 'Saw the ocean. | *Sobbed for an hour.*', mood: lt => lt < 0.8 ? 'sparkle' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: ST,
    back(x, t, lt, P) { bm(x, 'WAVES', 640, 1090 + 6 * Math.sin(t * 2.4), 30 * clamp(lt * 2), { alpha: 0.95 }) },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s so BIG', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 790, 900, 'VIEW: OVERWHELMING', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 28)
    } },
  { sign: S, cap: 'Adopted a rock. | It *looked lonely.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bm(x, 'ROCK', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1060, 'NAME: PEBBLE', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 34)
      hearts(x, t, 800, 820, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Followed a butterfly. | Now *very lost.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wide', tears: lt => lt < 1.2 ? 1 : 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bm(x, 'FLY', 760 + 90 * Math.sin(t * 1.7), 640 + 40 * Math.sin(t * 3.1), 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 0.6 + 0.4 * Math.abs(Math.sin(t * 9)) })
      bits(x, 'MAP', 800, 920, 22 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.08 })
      L(x, 800, 1090, 'WHERE ARE WE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'One sunset. | *Nine hundred photos.*', mood: 'sparkle', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bm(x, 'SUN', 800, 790, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)); bm(x, 'WAVES', 800, 880, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(900, Math.floor(Math.max(0, lt - 0.3) * 520))
      L(x, 800, 980, `PHOTOS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 34)
      L(x, 800, 1090, 'STORAGE: FULL', pop01(t, P.t0 + 1.9, 0.3, 2.2), RED, 0.05, 30)
    } },
  { sign: S, cap: 'Checked out. | Said bye *to the pillow.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'we had | something.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 800, 1080, 'NIGHTS TOGETHER: 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: S, cap: 'Met a Cancer on day one. | *Soulmates by day two.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 800, 900, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      L(x, 800, 640, '✦ MATCH: CANCER', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 30)
      hearts(x, t, 660, 880, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Finally home. | *Misses the trip.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'take me back', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, 800, 1080, 'HOME FOR: 4 MINUTES', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0607', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Pisces on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One trip. | *So many tears.*', mood: 'wide' },
  last: {
    text: 'The rock? | *Has its own pillow.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      bits(x, 'PILLOW', 600, 1140, 26 * k)
      bm(x, 'ROCK', 600, 1080, 20 * pop01(t, t - lt + 0.9, 0.35, 2.2))
      if (k > 0.01) signChar(x, t, 'pisces', 360, 1080, 230 * k, { mood: 'heart', tears: 2, seed: 9, glyph: false, hops: [t - lt + 1.4] })
      hearts(x, t, 600, 1020, t - lt + 1.3, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
