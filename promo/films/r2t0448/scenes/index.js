// r2t0448: star_talk, BE LIKE, "Wrong order? | Zodiacs *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// When the waiter gets it wrong: twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   3.6–49.2   ♈ marched into the kitchen, cooked it themself · ♉ held a small funeral for the order · ♊ "it's fine", texted
//              everyone it's not · ♋ apologised to the waiter · ♌ posted the drama · ♍ fixed the order and the menu's typos
//              · ♎ ate it smiling · ♏ said nothing, filed it forever · ♐ new favourite · ♑ formal complaint, cc head office
//              · ♒ ordered soup, got a plant, loved it · ♓ the waiter said sorry, Pisces sobbed
//  49.2        "Table for twelve. | *Twelve problems.*"
//  52.6        callback: "Aries | *works there now.*" (the chef hat and pan from card 1)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const HAT = ['..WWWWWW..', '.WWWWWWWW.', 'WWWWWWWWWW', 'WWWWWWWWWW', '.WWWWWWWW.', '..WWWWWW..', '..WSWSWW..', '..WWWWWW..']
const HAT_C = { W: '#ffffff', S: '#d8dbe8' }
const PAN = ['..KKKKKK.........', '.KDDDDDDK........', 'KDDYYDDDDKKKKKKKK', 'KDDDDDDDDKKKKKKKK', '.KDDDDDDK........', '..KKKKKK.........']
const PAN_C = { K: INK, D: '#8a8aa8', Y: GOLD }
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PLATE_C = { W: '#fff4e2' }
const FLOWER = ['.P.', 'PYP', '.P.', '.G.', '.G.']
const FLOWER_C = { P: PINK, Y: GOLD, G: GREEN }
const ENV = ['WWWWWWWWWWWW', 'WKWWWWWWWWKW', 'WWKKWWWWKKWW', 'WWWWKKKKWWWW', 'WWWWWRRWWWWW', 'WWWWWRRWWWWW', 'WWWWWWWWWWWW']
const ENV_C = { W: CREAM, K: SLATE, R: RED }

const CAMEOS = [
  { sign: 'aries', cap: 'Marched into the kitchen. | *Cooked it themself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: -160 }, hops: [0.5, 1.0],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x, F.top - 40, 13 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, PAN, PAN_C, 780, 920 + 10 * Math.sin(t * 9), 22 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.1 + 0.1 * Math.sin(t * 9) })
      label(x, 790, 690, 'STAFF ONLY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'i got this!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Wrong dish. | Held a *small funeral.*', mood: lt => lt > 1.0 ? 'sleepy' : 'wide', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, FLOWER_C, 730 + i * 60, 920, 12 * pop01(t, P.t0 + 0.8 + i * 0.2, 0.3, 2.2))
      label(x, 790, 720, 'RIP, MY ORDER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Said "it’s fine." | Texted *everyone it’s not.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', headCol: GOLD, lines: [
        ['NOT FINE', PINK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['NOT FINE', PINK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['it’s fine ♡', BONE, pop01(t, P.t0 + 1.1, 0.2, 2), true], ['NOT. FINE.', PINK, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Apologised | *to the waiter.*', mood: 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'so sorry!! | my fault!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      label(x, 790, 900, '(it was not)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1020, 'TIP: 40%', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Turned it into | *a whole post.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '♌︎ NEW POST', headCol: ORANGE, lines: [
        ['THE AUDACITY.', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2)], ['part 1 of 9', BONE, pop01(t, P.t0 + 0.9, 0.2, 2)], ['♡ 12 friends', PINK, pop01(t, P.t0 + 1.4, 0.2, 2), true],
      ] })
    } },
  { sign: 'virgo', cap: 'Fixed the order. | *And the menu.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 380, head: 'MENU', headCol: MINT, size: 28, rows: [
        ['expresso', INK], ['→ espresso', RED, pop01(t, P.t0 + 0.6, 0.2, 2)], ['tomatoe', INK], ['→ tomato', RED, pop01(t, P.t0 + 1.0, 0.2, 2)], ['you’re welcome', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Too polite to say. | *Ate it smiling.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.SOUP, BM.SOUP_C, 520, 1040, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 700, 'it’s perfect!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      bubble(x, 790, 920, '(i ordered | pizza)', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Filed it forever.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'FILE: TABLE 4', headCol: '#c97bff', size: 28, rows: [
        ['date: noted', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['waiter: noted', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['forgiven: no', RED, pop01(t, P.t0 + 1.2, 0.2, 2)],
      ] })
      drawBits(x, BM.LOCK, BM.LOCK_C, 890, 1040, 10 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: 'sagittarius', cap: 'Tried the wrong dish. | *New favourite.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: 150 }, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 320, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BM.PIZZA, BM.PIZZA_C, 320, 960, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 320, 640, 'ORDERING IT FOREVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 660, 780, P.t0 + 1.0, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
  { sign: 'capricorn', cap: 'Sent a formal complaint. | *Cc’d head office.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      drawBits(x, ENV, ENV_C, 320, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 320, 700, 'RE: THE SALAD', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 320, 1060, 'PAGES: 4', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ordered soup. Got a plant. | *Loved it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 1040, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BM.PLANT, BM.PLANT_C, 790, 950, 13 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 790, 700, 'meet my | new friend', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The waiter said sorry. | Pisces *sobbed.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so sorry | about that!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 940, 'THEY’RE SO KIND', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 370, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 180, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0448', key: 'G', accent: GOLD, ending: 'callback',
  title: 'Wrong order? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Table for twelve. | *Twelve problems.*' },
  last: {
    text: 'Aries | *works there now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      const F = signChar(x, t, 'aries', 540, 1000, 300, { mood: 'sparkle', pop: k, seed: 12, hops: [t - lt + 0.9, t - lt + 2.0] })
      drawBits(x, HAT, HAT_C, F.x, F.top - 40, 13 * k)
      drawBits(x, PAN, PAN_C, 800, 1010 + 10 * Math.sin(t * 9), 16 * k, { rot: -0.1 + 0.1 * Math.sin(t * 9) })
      label(x, 540, 1260, 'HEAD CHEF (DAY 1)', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
