// r2a0652: star_advice, ADVICE SOLO, "Libra, your people | *will stay.*" (topic: "Libra, the right people will stay",
// trimmed to fit two lines; ~51 s vertical, signs3kit social cut, music: lofi · F). One sign the whole way, 9 cards:
//   said no to a plan (they still love you) · picked the restaurant (nobody left) · shared a real opinion (still invited:
//   the pineapple) · not everyone's tea (you're someone's) · apologised four times (once is plenty) · balanced everyone's
//   mood (rest yours too) · ten outfit changes (great in one) · waiting to be chosen (choose you first) · real friends stay
//   for the messy bits
//  37.8  "Lovely. | *And loved.*"   41.0  LESSON "Be honest and kind. | *Your people stay.*" STATUS: SECURE
//  46.9  "They stayed. | *Pineapple and all.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'libra', ACC = '#ff8fb1', ST = { x: -170 }

const PINE = ['..G.G.G..', '...GGG...', '..GGGGG..', '..YYYYY..', '.YOYYYOY.', '.YYYOYYY.', '.YOYYYOY.', '.YYYOYYY.', '..YYYYY..']
const PINE_C = { G: '#4fbf6a', Y: '#ffd23a', O: '#c98f2a' }
const MENU = ['WWWWWWWW', 'WRRRRRRW', 'WWWWWWWW', 'WKKKK.WW', 'WWWWWWWW', 'WKKK..WW', 'WWWWWWWW', 'WKKKKK.W', 'WWWWWWWW']
const MENU_C = { W: CREAM, R: RED, K: '#6b62a8' }
const SCALE = ['.....YY.....', '.....YY.....', 'YYYYYYYYYYYY', 'Y....YY....Y', 'Y....YY....Y', 'PPP..YY..PPP', 'PPP..YY..PPP', '.....YY.....', '...YYYYYY...']
const SCALE_C = { Y: GOLD, P: PINK }
const SHIRT = ['.CC..CC.', 'CCCCCCCC', 'CCCCCCCC', '.CCCCCC.', '.CCCCCC.', '.CCCCCC.']
const MIRROR = ['..WWWWWW..', '.WSSSSSSW.', 'WSSSSSSSSW', 'WSSSSSSSSW', 'WSSSSSSSSW', 'WSSSSSSSSW', 'WSSSSSSSSW', '.WSSSSSSW.', '..WWWWWW..', '....WW....', '...WWWW...']
const MIRROR_C = { W: GOLD, S: '#ffd6e4' }

const CAMEOS = [
  { sign: S, cap: 'Said no to a plan? | They *still love you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP', headCol: PINK, lines: [['can’t tonight', LAV, pop01(t, P.t0 + 0.4, 0.25, 2.2), true], ['all good!!', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)], ['love u ♡', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2)]], typing: lt > 0.7 && lt < 1.1 ? 1 : 0 })
      hearts(x, t, 470, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Picked the restaurant? | *Nobody left.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, MENU, MENU_C, 790, 850, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 790, 640, 'YOU CHOSE!', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 40)
      L(x, 790, 1090, 'EVERYONE: FED ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Shared a real opinion? | *Still invited.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PINE, PINE_C, 820, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 760, 650, 'no pineapple. | sorry!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1100, 'INVITE: STILL ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Not everyone’s tea? | *You’re someone’s.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 780, 780, P.t0 + 0.7, { n: 5, life: 1.8, spread: 120, cell: 7, seed: 5 })
      L(x, 790, 1090, 'FAVOURITE CUP ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Said sorry four times? | *Once is plenty.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'sorry sorry | sorry sorry', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
      swapLabel(x, 790, 930, lt, 1.1, 'SORRY ×4', 'SORRY ×1 ♡', { size: 40, fromBg: STEEL, toBg: PINK })
      L(x, 790, 1100, 'ENOUGH, LOVE', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Keeping the peace? | *Find yours too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170, y: 20 },
    front(x, t, lt, P) {
      const tip = lt > 1.2 ? 0 : 0.18 * Math.sin(lt * 7)
      drawBits(x, SCALE, SCALE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: tip })
      bits(x, 'PILLOW', 400, 1080, 20 * pop01(t, P.t0 + 1.3, 0.3, 2))
      L(x, 790, 1090, 'BALANCED. NAP.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Ten outfit changes? | *Great in all ten.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const n = Math.min(10, Math.floor(Math.max(0, lt - 0.2) / 0.13))
      const COLS = [PINK, MINT, LAV, GOLD, SKYB, RED, BONE, '#ffb34a', '#6fc3ff', '#b7a6ff']
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { C: COLS[i] }, 740 + (i % 3) * 60 + (i * 7 % 13), 1040 - Math.floor(i / 3) * 45, 12, { rot: (i % 2 ? 0.3 : -0.25) })
      L(x, 790, 660, `OUTFIT ${Math.max(1, n)}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.05, 40)
      bubble(x, 790, 820, 'all cute!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Waiting to be chosen? | *Choose you first.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MIRROR, MIRROR_C, 790, 860, 22 * k)
      if (k > 0.6) signChar(x, t, S, 790, 820, 120, { mood: lt > 1.2 ? 'heart' : 'happy', seed: 81, glyph: false, glow: 0.4, alpha: 0.8 })
      L(x, 790, 1110, 'CHOSEN: ME ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 34)
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 150, 0.7)
    } },
  { sign: S, cap: 'Real friends stay | for *the messy bits.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 720, 960, 170, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.4] })
      friend(x, t, 'gemini', 880, 960, 170, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.5] })
      bubble(x, 790, 650, 'ugly cry? | we’re here', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1120, 'STILL HERE ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0652', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Libra, your people | *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Lovely. | *And loved.*', mood: 'heart' },
  lesson: { text: 'Be honest and kind. | *Your people stay.*', chip: 'STATUS: SECURE' },
  last: {
    text: 'They stayed. | *Pineapple and all.*',
    draw(x, t, lt) {
      drawBits(x, PINE, PINE_C, 790, 930, 18 * pop01(t, t - lt + 0.8, 0.3, 2), { rot: 0.1 })
      hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
