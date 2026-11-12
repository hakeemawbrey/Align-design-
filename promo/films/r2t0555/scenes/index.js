// r2t0555: star_talk, SOLO (taurus), "Tauruses shopping | be like." (signs3kit social cut, music: lofi · F).
// Nine cards, each the most extreme comfort-loving Taurus shopper. Ending: group ("Treat yourself. | Then again.").
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -180 }
const SWEATER = ['.PP...PP.', 'PPPPPPPPP', 'PPWPPPWPP', '.PPPPPPP.', '.PPWPWPP.', '.PPPPPPP.', '.PPPPPPP.']
const SW_C = { P: '#7dd18a', W: CREAM }
const CART = ['K..........', '.KKKKKKKKKK', '.K.K.K.K.KK', '.KKKKKKKKK.', '..K.K.K.KK.', '..KKKKKKK..', '...........', '...KK..KK..']
const CART_C = { K: STEEL }

const CAMEOS = [
  { sign: 'taurus', cap: 'Came in for socks. | Left with *a couch.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      L(x, 800, 660, 'LIST: SOCKS', pop01(t, P.t0 + 0.2, 0.3, 2.2), BONE, 0.05, 34)
      bits(x, 'COUCH', 800, 890, 20 * pop01(t, P.t0 + 1.0, 0.35, 2))
      L(x, 800, 1090, 'SOCKS: FORGOT', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Free samples aisle. | *Lap nine.*', mood: 'heart', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 840, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 8)
      L(x, 800, 680, `LAP ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.05, 40)
      bubble(x, 800, 1070, 'just one more', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Touched every blanket. | *Bought the softest.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BLANKET', 800, 980 - i * 70, 12 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2))
      L(x, 800, 690, 'SOFTNESS: TESTED', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.05, 30)
      L(x, 800, 1100, 'WINNER: #47', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Waited six months | *for the sale.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.3) swapLabel(x, 800, 1060, lt, 1.2, 'FULL PRICE', 'ON SALE!', { size: 36, toBg: GOLD })
      sparkles(x, t, 800, 1060, P.t0 + 1.6, 7, 140, 0.3)
    } },
  { sign: 'taurus', cap: 'Tried it on. | *Never took it off.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SWEATER, SW_C, 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 660, 'FITTING ROOM 3', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.05, 30)
      bubble(x, 800, 1070, 'wearing it home.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Same order. | *Every time.* For years.', mood: 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 290, h: 320, head: 'RECEIPT', headBg: STEEL, headInk: INK, lines: ['the usual', 'the usual', 'the usual', 'the usual'], size: 28, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1100, 'NEW THINGS: NO', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Smelled every candle. | *Twice.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'CANDLE', 700 + i * 100, 860, 13 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      steam(x, t, 800, 780, { n: 3, h: 90 })
      L(x, 800, 1060, 'NOSE: WORKING HARD', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Cart full of snacks. | Called it *groceries.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CART, CART_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'PIZZA', 740, 780, 9 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.2 })
      bits(x, 'COOKIE', 830, 790, 9 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bits(x, 'SANDWICH', 900, 770, 8 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.2 })
      L(x, 800, 1100, 'VEGGIES: CHIPS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Splurged on a pillow. | *Zero regrets.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 840, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 800, 840, P.t0 + 0.6, 8, 180, 0.4)
      L(x, 800, 1070, 'WORTH EVERY PENNY', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 30)
      if (lt > 1.6) zzz(x, t, 470, 700)
    } },
]

const F = makeFilm({
  id: 'r2t0555', key: 'F', accent: ACC, solo: 'taurus', ending: 'group',
  title: 'Tauruses shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Treat yourself. | *Then do it again.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
