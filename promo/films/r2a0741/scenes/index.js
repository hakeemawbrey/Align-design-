// r2a0741: star_advice, ADVICE SOLO (cancer), "Cancer, it's okay | *to start over.*" (signs3kit social cut, lofi · D).
// One sign the whole way: nine gentle truths for a Cancer starting over, each with a warm reframe and one light gag.
// Ending: callback (the good mug, packed first in card 1, is the first thing unpacked).
//   moving out, packed the good mug · 4,812 saved texts · new city, a neighbour with cookies · plants change pots too
//   · takeout on the floor = housewarming · plan B is also good · keep the best bits (the KEEP box)
//   · home is portable (shell) · your chart didn't end
//   group "New start. | *Same big heart.*"   last "First thing unpacked? | *The good mug.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }
const PLANT = ['..G.G...G.', '.GGGG.GGG.', '..GGGGGG..', '...GGGG...', '....GG....', 'PPPPPPPPPP', '.PPPPPPPP.', '.PPPPPPPP.', '..PPPPPP..']
const POTS = ['.....', '.....', '.....', '.....', '.....', 'PPPPP', '.PPP.', '.PPP.', '..P..']
const BOXK = ['BBBBBBBBBBBB', 'BDDDDDDDDDDB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB']

const CAMEOS = [
  { sign: S, cap: 'Leaving the old place? | *Pack the good mug.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOXK, { B: '#c98f5a', D: '#8a5a32' }, 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const up = ease.outCubic(clamp((lt - 0.5) / 0.6)), dn = ease.inCubic(clamp((lt - 1.4) / 0.5))
      bits(x, 'MUG', 800, lerp(lerp(980, 760, up), 900, dn), 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 650, 'BOX 1: FRAGILE', pop01(t, P.t0 + 0.3, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1120, 'THE GOOD MUG: SAFE', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Saved every old text? | *Room for new ones.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SAVED', headCol: SKYB, lines: [['2016: lol', BONE, 1], ['2018: miss u', BONE, 1], ['2019: ok bye', BONE, 1], ['new: hi!', MINT, pop01(t, P.t0 + 1.4, 0.3, 2.4), true]] })
      L(x, 800, 1110, 'STORAGE: FEELINGS', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'New city, no one yet? | *Neighbours count.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 820, 950, 200, pop01(t, P.t0 + 0.35, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.0] })
      bits(x, 'COOKIE', 700, 1050, 12 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      bubble(x, 820, 680, 'hi! i baked | too many.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Even plants change pots. | *Then they bloom.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = lt > 1.2
      drawBits(x, PLANT, { G: '#4fbf6a', P: g ? '#ff8a6a' : '#9aa5c4' }, 800, 900, 24 * k)
      if (g) bits(x, 'FLOWER', 800, 760, 10 * pop01(t, P.t0 + 1.2, 0.3, 2.4))
      L(x, 800, 1110, g ? 'NEW POT: THRIVING' : 'OLD POT: TOO SMALL', 1, g ? MINT : STEEL, 0.04, 30)
      sparkles(x, t, 800, 760, P.t0 + 1.25, 7, 150, 0.3)
    } },
  { sign: S, cap: 'Takeout on the floor? | *Still a housewarming.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: { x: -190, y: 10 },
    front(x, t, lt, P) {
      bits(x, 'DISH', 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 950, { n: 3, alpha: 0.7, h: 120 })
      L(x, 800, 700, 'TABLE: COMING SOON', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 800, 1110, 'VIBES: ALREADY HERE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Changed the plan? | *That’s not failing.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 780, 800, lt, 0.9, 'PLAN A', 'PLAN B: ALSO GOOD', { size: 30, fromBg: STEEL, toBg: SKYB })
      L(x, 800, 1020, 'STILL YOU. STILL GOOD.', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Miss the old you? | *Keep the best bits.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOXK, { B: SKYB, D: '#4a8ab8' }, 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 985, 'KEEP', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.03, 40)
      const items = [['HEARTB', 690, 0.7], ['BOOK', 800, 1.0], ['STUB', 910, 1.3]]
      for (const [n, xx, at] of items) { const d = ease.outCubic(clamp((lt - at) / 0.4)); if (lt > at) bits(x, n, xx, lerp(640, 840, d), 9) }
      L(x, 800, 650, 'PACKED: THE GOOD STUFF', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Starting from zero? | *Home comes with you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      const d = ease.outBack ? ease.outBack(clamp((lt - 0.3) / 0.5)) : ease.outCubic(clamp((lt - 0.3) / 0.5))
      if (lt > 0.3) bits(x, 'HOUSE', F.x, lerp(560, F.top - 40, d), 14)
      L(x, 800, 760, 'HOME: PORTABLE', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ff8a6a', -0.04, 34)
      L(x, 800, 900, 'CRAB ENERGY', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.05, 32)
    } },
  { sign: S, cap: 'One chapter ended. | *Your chart didn’t.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1100, 'NEXT CHAPTER: LOADING', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 28)
      sparkles(x, t, 800, 860, P.t0 + 1.4, 7, 160, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0741', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Cancer, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'New start. | *Same big heart.*', mood: 'heart' },
  last: {
    text: 'First thing unpacked? | *The good mug.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      bits(x, 'MUG', 540, 1020, 32 * k)
      if (k > 0.9) steam(x, t, 540, 900, { n: 3, alpha: 0.8, h: 160 })
      L(x, 540, 1240, 'HOME NOW', pop01(t, t - lt + 1.4, 0.3, 2.2), MINT, -0.03, 36)
      hearts(x, t, 540, 880, t - lt + 1.2, { n: 6, life: 2.0, spread: 280, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
