// r2t0622: star_talk, SOLO (scorpio), "Scorpios shopping | *be like.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine shopping moments, each the most extreme Scorpio version. Ending: callback.
//   twelve shirts, all black · sniffed every candle, bought "MIDNIGHT" · a sale? suspected a trap · your gift, nine
//   months early · tried on sunglasses, never took them off · stared at the price tag until it dropped
//   · "need a bag?" "why?" · cart of forty, bought none, still watching · asked the jacket its sign
//   group "Dark. Decisive. | *Fully stocked.*"
//   last "That price tag | *is still scared.*" (card 6, paid off: the tag comes back, trembling)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff5a7a', S = 'scorpio', ST = { x: -190 }
const SHIRT = ['KK...KK', 'KKKKKKK', 'KKKKKKK', '.KKKKK.', '.KKKKK.', '.KKKKK.']
const JACKET = ['.LL.LL.', 'LLLWLLL', 'LLLWLLL', 'LLLWLLL', 'LLLWLLL', 'LLLWLLL', 'LLLWLLL']
const priceTag = (x, cx, cy, k, txt, rot = 0.1) => L(x, cx, cy, `PRICE: ${txt}`, k, CREAM, rot, 56)

const CAMEOS = [
  { sign: S, cap: 'Bought twelve shirts. | All *black.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(Math.max(0, lt - 0.2) / 0.12) + 1)
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { K: '#1a1424' }, 625 + (i % 4) * 90, 690 + Math.floor(i / 4) * 120, 11, { outline: STEEL })
      L(x, 800, 1110, 'PALETTE: VOID', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Sniffed every candle. | Bought *“Midnight.”*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'CANDLE', 660 + i * 115, 960, 26 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { alpha: i === 2 || lt < 1.2 ? 1 : 0.35 })
      L(x, 800, 720, 'MIDNIGHT', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#5a3a8a', -0.05, 44)
    } },
  { sign: S, cap: 'Saw a sale. | Suspected *a trap.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 810, 760, 'SALE!', pop01(t, P.t0 + 0.2, 0.3, 2), RED, 0.06, 64)
      bits(x, 'LENS', 760 + Math.sin(t * 2) * 30, 960, 26 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bubble(x, 800, 1150, 'what’s the catch', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Bought your birthday gift | *nine months early.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'BOUGHT: MARCH', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, -0.05, 32)
      L(x, 800, 1110, 'YOUR B-DAY: DEC', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.05, 32)
    } },
  { sign: S, cap: 'Tried on sunglasses. | *Never took them off.*', mood: 'happy', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) drawBits(x, ['KKKKKKK.KKKKKKK', 'KSSSSSKKKSSSSSK', 'KSSSSSK.KSSSSSK', '.KKKKK...KKKKK.'], { K: INK, S: '#2a2340' }, F.x, F.cy - 4, 14 * k)
      L(x, 800, 700, 'INDOORS. AT NIGHT.', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.04, 30)
      L(x, 800, 1100, 'STILL ON', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Stared at the price tag | until it *dropped.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shake = lt > 0.7 ? Math.sin(t * 40) * 6 : 0
      priceTag(x, 780 + shake, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.4 ? '80' : '40')
      if (lt > 1.4) L(x, 780, 1060, 'NEW PRICE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.05, 34)
    } },
  { sign: S, cap: 'Cashier: “Need a bag?” | Scorpio: *“Why?”*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 810, 700, 'need a bag?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: BONE, tail: 'br' })
      bubble(x, 780, 960, 'why?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 70, col: '#ff5a7a', tail: 'bl' })
    } },
  { sign: S, cap: 'Cart: forty items. | Bought *none.* Still watching.', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * 40)
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `CART (${n})`, headCol: '#ff5a7a', lines: [['checkout?', STEEL, 1, true], ['not yet.', BONE, pop01(t, P.t0 + 1.4, 0.25, 2), false], ['watching.', LAV, pop01(t, P.t0 + 1.9, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'Asked the jacket | *its sign.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, JACKET, { L: '#2a2340', W: STEEL }, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'your sign?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 770, 1110, '✦ ALSO SCORPIO', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#ff5a7a', 0.04, 34)
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2t0622', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Scorpios shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Dark. Decisive. | *Fully stocked.*', mood: 'squint' },
  last: {
    text: 'That price tag | *is still scared.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.35, 2)
      priceTag(x, 540 + Math.sin(t * 40) * 7, 1150, k * 1.4, '40', -0.08)
      for (let i = 0; i < 3; i++) { const ph = ((t * 1.2 + i / 3) % 1); x.save(); x.globalAlpha = k * (1 - ph); x.fillStyle = SKYB; x.fillRect(330 + i * 34, 1020 + ph * 80, 12, 18); x.restore() }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
