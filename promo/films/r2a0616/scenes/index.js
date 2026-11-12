// r2a0616: star_advice, ADVICE SOLO (taurus), "Taurus, you're not | *too much.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle truths about a Taurus, each with a warm reframe and one light gag.
// Ending: callback (order #84, the same dish again, comes back as order #85: still perfect).
//   two pillows packed · the same order, #84 · new plan? give me a day · a three-hour nap · the fancy candle
//   · the 2019 grudge folder · do not disturb · loyal to the bone (Pisces cries) · hugs are free
//   group "Cozy. Loyal. | *Just right.*"   last "Order #85. | *Still perfect.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, friend, swapLabel, zzz, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd068', S = 'taurus', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Packed your own pillow? | *Comfort isn’t fussy.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 800, 720, 18 * pop01(t, P.t0 + 0.7, 0.3, 2.2), { rot: -0.08 })
      L(x, 800, 1100, 'PILLOWS PACKED: 2', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Same order again? | *You know what you love.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 850, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'ORDER #84', pop01(t, P.t0 + 0.5, 0.3, 2), STEEL, 0.04, 36)
      L(x, 800, 1060, 'SAME AS ALWAYS', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Slow to change plans? | *Steady is a gift.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'new plan!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      bits(x, 'CLOCK', 800, 880, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      swapLabel(x, 800, 1080, lt, 1.2, 'RIGHT NOW?', 'GIVE ME A DAY', { size: 36, fromBg: RED, toBg: MINT })
    } },
  { sign: S, cap: 'Napped for three hours? | *Rest isn’t lazy.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, 780, 760, { alpha: clamp((lt - 0.4) / 0.4), size: 52 })
      L(x, 800, 1080, `NAP: ${Math.min(3, Math.floor(lt * 1.6))} HRS`, pop01(t, P.t0 + 0.6, 0.3, 2), LAV, -0.04, 36)
    } },
  { sign: S, cap: 'Bought the fancy candle? | *Joy counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 800, 860, 34 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 700, { n: 2, alpha: clamp((lt - 0.6) / 0.4) * 0.6, h: 90 })
      L(x, 800, 1090, 'SCENT: “COZY CLOUD”', pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Still mad about 2019? | *You can set it down.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'GRUDGES', headBg: RED, lines: ['2019: the fries', '2021: the seat', '2023: “ok.”'], size: 30, align: 'left', progress: prog(lt, 0.3, 1.2) })
      bubble(x, 800, 1100, 'eh. | forgiven.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Need a quiet night in? | *That’s not too much.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'DO NOT DISTURB', pop01(t, P.t0 + 0.9 * 1.29, 0.3, 2.2), PINK, -0.04, 34)
      bits(x, 'MOON', 900, 660, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
  { sign: S, cap: 'Loyal to the bone? | *That’s rare.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'pisces', 820, 950, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], tears: 2 })
      bubble(x, 820, 690, 'you showed | up again', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#b7a6ff', tail: 'bl' })
      hearts(x, t, 640, 920, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Want a long hug? | *Hugs are free.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 790, 950, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.3] })
      L(x, 800, 660, `HUG: ${Math.min(10, 1 + Math.floor(lt * 4))} MIN`, pop01(t, P.t0 + 0.7, 0.3, 2), PINK, 0.04, 34)
      hearts(x, t, 700, 950, P.t0 + 1.0, { n: 6, life: 1.8, spread: 260, cell: 8, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0616', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Taurus, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Cozy. Loyal. | *Just right.*', mood: 'heart' },
  last: {
    text: 'Order #85. | *Still perfect.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) friend(x, t, 'taurus', 360, 1120, 320, k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], hops: [t0 + 1.4] })
      bits(x, 'PLATE', 740, 1100, 24 * pop01(t, t0 + 0.7, 0.3, 2))
      L(x, 740, 1280, 'SAME AS ALWAYS', pop01(t, t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
      hearts(x, t, 540, 1050, t0 + 1.5, { n: 6, life: 2.0, spread: 360, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
