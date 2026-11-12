// r2a0730: star_advice, ADVICE SOLO (pisces), "Pisces, have you | *eaten today?*" (signs3kit social cut, lofi · G).
// One sign the whole way: nine gentle nudges to feed a big-hearted Pisces, each a relatable truth, a warm reframe and one
// gag; Pisces cries (mostly happy tears) in every card. Ending: group.
//   forgot lunch again, snack time · big feelings need snacks · daydreamed past dinner, toast counts · fed the cat first,
//   you're next · soup on a sad day, always yes · forgot the tea, reheat it · cared for everyone, your turn
//   · ate with a friend, double cozy · compatibility test: you + a warm meal
//   group "Little snack. | *Big love.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, bits, swapLabel, steam, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }
const TEARS = lt => lt > 1.2 ? 3 : 2
Object.assign(B, {
  TOAST: ['.CCCCCCCC.', 'CCBBBBBBCC', 'CBBBBBBBBC', 'CBBBYYBBBC', 'CBBYYYYBBC', 'CBBBYYBBBC', 'CBBBBBBBBC', 'CCCCCCCCCC'],
  CAT: ['K.....K..', 'KK...KK..', 'KKKKKKK..', 'KGKKKGK..', 'KKKPKKK..', '.KKKKK...', 'KKKKKKKK.', 'KKKKKKKKK', 'KKKKKKKKK'],
  CATBOWL: ['.FF.F.FF.', 'BBBBBBBBB', '.BBBBBBB.', '..BBBBB..'],
})
Object.assign(C, { TOAST: { C: '#c98f2a', B: '#ffd28a', Y: '#ffe76a' }, CAT: { K: '#6b62a8', G: MINT, P: PINK }, CATBOWL: { F: '#c98f5a', B: SKYB } })
const tiny = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 80, ...o }) }

const CAMEOS = [
  { sign: S, cap: 'Forgot lunch again? | *Snack time, love.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'APPLE', 800, 920, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      swapLabel(x, 800, 700, lt, 1.0, 'LUNCH: SKIPPED', 'LUNCH: 3 PM (OK!)', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Big feelings today? | *Feelings need snacks.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 920, 26 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 700, 'FEELINGS: ALL OF THEM', pop01(t, P.t0 + 0.2, 0.3, 2.2), LAV, -0.04, 30)
      L(x, 800, 1120, 'COOKIE: HELPING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Daydreamed past dinner? | *Toast counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', tears: TEARS, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 690, '...is it 9 pm?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      bits(x, 'TOAST', 800, 930, 26 * pop01(t, P.t0 + 0.9, 0.3, 2))
      sparkles(x, t, 800, 930, P.t0 + 1.2, 7, 160, 0.3)
      L(x, 800, 1140, 'DINNER: TOAST ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Fed the cat first? | *You\'re next.*', mood: lt => lt > 1.3 ? 'happy' : 'heart', tears: TEARS, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CAT', 760, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CATBOWL', 880, 1040, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 760, 690, 'mrrp.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1150, 'NEXT IN LINE: YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Soup on a sad day? | *Always a yes.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: TEARS, look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) steam(x, t, 800, 880, { n: 3, alpha: 0.8, h: 160 })
      L(x, 800, 690, 'SOUP: HUGS, BUT LIQUID', pop01(t, P.t0 + 1.0, 0.3, 2.2), CREAM, -0.04, 28)
    } },
  { sign: S, cap: 'Forgot your tea? | *Reheat it. Try again.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.3) steam(x, t, 790, 840, { n: 2, alpha: 0.8, h: 140 })
      swapLabel(x, 800, 700, lt, 1.2, 'TEA: COLD (4TH TIME)', 'TEA: WARM ♡', { size: 30, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'Took care of everyone? | *Your turn.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: TEARS, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 980, 24 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 740, 'TABLE FOR: PISCES', pop01(t, P.t0 + 0.2, 0.3, 2.2), GOLD, -0.04, 34)
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 7 })
    } },
  { sign: S, cap: 'Ate with a friend? | *Double cozy.*', mood: 'heart', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tiny(x, t, 'cancer', 860, 860, 170, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'heart', look: [-1, 0] })
      bits(x, 'PIZZA', 720, 1030, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.3 })
      bits(x, 'PIZZA', 880, 1050, 16 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.2 })
      bubble(x, 860, 680, 'split it?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Compatibility test: | you + *a warm meal.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', tears: TEARS, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 840, { n: 3, alpha: 0.7, h: 140 })
      L(x, 800, 700, 'PISCES + PASTA', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 800, 1120, '✦ ALIGNED ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 40)
      hearts(x, t, 800, 930, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0730', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'Pisces, have you | *eaten today?*',
  cameos: CAMEOS,
  group: {
    cap: 'Little snack. | *Big love.*', mood: 'heart',
    draw(x, t, lt) {
      const items = [['COOKIE', 300, 1080, 16], ['TOAST', 780, 1080, 14], ['APPLE', 300, 640, 14], ['MUG', 780, 640, 14]]
      items.forEach(([n, ix, iy, c], i) => bits(x, n, ix, iy + Math.sin(t * 2 + i) * 8, c * pop01(t, t - lt + 0.8 + i * 0.2, 0.3, 2)))
      hearts(x, t, 540, 860, t - lt + 1.6, { n: 6, life: 2.0, spread: 420, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
