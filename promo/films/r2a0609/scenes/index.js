// r2a0609: star_advice, ADVICE SOLO (virgo), "Signs a Virgo | *misses you.*" (signs3kit, lofi · E).
// Nine quiet ways a Virgo says "I miss you", each with a warm reframe and one light gag. Ending: card.
//   sends you an article · remembers your exact coffee order · fixes your typo, lovingly · made you a list
//   · asks if you ate (every day) · cleans when they miss you · checked your week ahead · plans the reunion
//   to the minute · says "no big deal" (it is)
//   lesson "A Virgo’s love | *is in the details.*"  MISSED: VERY
//   last "Did you eat? | *Virgo’s asking.*" over the Virgo + Taurus match card (Taurus: the one who always ate)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'virgo', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Sent you an article? | *That’s a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'VIRGO', headCol: MINT, lines: [['saw this,', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), false], ['thought of u', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), false], ['[article]', GOLD, pop01(t, P.t0 + 1.1, 0.25, 2), false]], size: 24 })
      L(x, 810, 1100, 'MEANS: MISS YOU', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Remembers your order. | *Exactly.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 730, { alpha: clamp((lt - 0.5) * 2) })
      L(x, 800, 1000, 'OAT, EXTRA HOT,', pop01(t, P.t0 + 0.9, 0.3, 2.2), CREAM, -0.04, 28)
      L(x, 800, 1070, 'HALF A SUGAR', pop01(t, P.t0 + 1.2, 0.3, 2.2), CREAM, 0.03, 28)
    } },
  { sign: S, cap: 'Fixed your typo? | *Lovingly.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'see u tmrw!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 800, 900, '*tomorrow ♥', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 46, col: MINT, tail: 'br' })
      L(x, 800, 1080, 'CARE LEVEL: HIGH', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Made you a list? | *You’re on their mind.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, head: 'FOR YOU', headBg: PINK, headInk: INK, lines: ['☐ a good book', '☐ that snack', '☐ warm socks', '☐ call me'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
    } },
  { sign: S, cap: 'Asks if you ate? | *Every single day.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'did you eat?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: MINT, tail: 'bl' })
      bits(x, 'APPLE', 800, 900, 14 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 800, 1070, 'LOVE LANGUAGE: CHECK-INS', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 26)
    } },
  { sign: S, cap: 'Cleaning at midnight? | *They miss you.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BROOM', 800 + 20 * Math.sin(t * 6), 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 * Math.sin(t * 6) })
      sparkles(x, t, 800, 1000, P.t0 + 0.8, 8, 150, 0.3)
      L(x, 800, 1090, 'HOUSE: SPOTLESS', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Checked your week ahead? | *That’s care.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 810, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1040, 'YOUR WEEK: LOOKS GOOD', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Planned the reunion | *to the minute.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'REUNION', headBg: GOLD, headInk: INK, lines: ['6:00 hug', '6:02 snacks', '6:15 catch up', '9:00 hug again'], size: 30, align: 'left', font: "'Space Mono', monospace", weight: 700, progress: clamp((lt - 0.3) / 1.2) })
    } },
  { sign: S, cap: 'Said “no big deal”? | *It’s a big deal.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'no big deal.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      hearts(x, t, 800, 960, P.t0 + 1.0, { n: 8, life: 2.0, spread: 240, cell: 8, seed: 5 })
      L(x, 800, 1070, 'HEART: FULL', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0609', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Signs a Virgo | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Quiet love. | *Loud details.*', mood: 'heart' },
  lesson: { text: 'A Virgo’s love | *is in the details.*', chip: 'MISSED: VERY' },
  last: { text: 'Did you eat? | *Virgo’s asking.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
