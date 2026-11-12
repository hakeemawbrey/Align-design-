// r2a0744: star_advice, ADVICE SOLO (cancer), "Cancer, have you | *eaten today?*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine gentle nudges for the Cancer who feeds everyone but forgets themself. Each card: a relatable
// truth + a warm reframe, one light gag. Ending: callback (the empty lunch slot in card 1 gets a plate at last).
//   knows everyone's allergies, remember lunch · packed three lunches, pack a fourth · crying into cereal, still
//   breakfast · leftovers again, the first slice is yours · a glass of water is love too · caring all day, a snack
//   break is care · made soup for the street, eat a bowl · someone offered to cook, say yes · you're on the list too
//   group "Feed the feeder. | *That’s you.*"   last "Dinner’s ready. | *Your plate first.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }
const GLASS = ['W.......W', 'WBBBBBBBW', 'WBBBBBBBW', 'WBSBBBBBW', 'WBBBBBBBW', '.WBBBBBW.', '.WBBBBBW.', '..WWWWW..']
const GLASS_C = { W: '#e8f6ff', B: '#8fd8ff', S: '#ffffff' }
const POT = ['.KK.....KK.', 'KRRRRRRRRRK', 'KRRRRRRRRRK', 'KRRWRRRRRRK', 'KRRRRRRRRRK', '.KRRRRRRRK.', '..KKKKKKK..']

const CAMEOS = [
  { sign: S, cap: 'Know everyone’s allergies? | *Remember your lunch.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'EVERYONE', headBg: SKYB, headInk: INK, lines: ['mia: nuts', 'sam: dairy', 'jo: no onion', ['me: ???', RED]], size: 30, align: 'left', progress: clamp((lt - 0.2) / 1.2) })
      L(x, 800, 1110, 'LUNCH: FORGOTTEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: S, cap: 'Packed three lunches? | *Pack a fourth for you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BAG', 690 + i * 110, 900, 10 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      if (lt > 1.3) bits(x, 'BAG', 800, 1040, 10 * pop01(t, P.t0 + 1.3, 0.3, 2.4), { rot: 0.08 })
      swapLabel(x, 800, 690, lt, 1.2, 'LUNCHES: 3', 'LUNCH #4: YOURS', { size: 30, fromBg: CREAM, toBg: MINT })
    } },
  { sign: S, cap: 'Crying into cereal? | *Still counts as breakfast.*', mood: 'wide', look: [1, 1], star: ST, tears: 2,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'BREAKFAST ✓', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 36)
      L(x, 800, 1090, 'FEELINGS: ALSO FED', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Leftovers again? | *The first slice is yours.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outCubic(clamp((lt - 0.7) / 0.5))
      bits(x, 'PIZZA', lerp(860, 700, d), 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.1, -0.2, d) })
      L(x, 800, 690, 'FRESH. HOT. YOURS.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'A glass of water? | *That’s love too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1090, 'HYDRATED & ADORED', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 30)
      sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 150, 0.2)
    } },
  { sign: S, cap: 'Caring for everyone? | *A snack break is care.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'APPLE', 800, 880, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 690, 'SHIFT: ALL DAY', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 32)
      L(x, 800, 1090, 'BREAK: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Made soup for the street? | *Eat a bowl.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, R: RED, W: '#ff9a9a' }, 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 860, { n: 4, alpha: 0.7, h: 140 })
      swapLabel(x, 800, 680, lt, 1.2, 'BOWLS FOR: 11 NEIGHBOURS', 'BOWL 12: YOU', { size: 26, fromBg: CREAM, toBg: GOLD })
    } },
  { sign: S, cap: 'Someone offered to cook? | *Say yes. Sit down.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 840, 950, 190, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'sparkle', look: [-1, 0] })
      bits(x, 'SANDWICH', 840, 760, 12 * pop01(t, P.t0 + 0.7, 0.3, 2.2))
      bubble(x, 760, 620, 'sit. i got this.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'You look after everyone. | *You’re on the list too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 320, head: 'LOOK AFTER', headBg: PINK, headInk: INK, lines: ['mum', 'friends', 'the cat', ['ME ♡', '#2f8a48']], size: 32, progress: clamp((lt - 0.3) / 1.2) })
      hearts(x, t, 800, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0744', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Cancer, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Feed the feeder. | *That’s you.*', mood: 'heart' },
  last: {
    text: 'Dinner’s ready. | *Your plate first.*',
    draw(x, t, lt) {
      bits(x, 'PLATE', 540, 1020, 30 * pop01(t, t - lt + 0.6, 0.4, 2))
      steam(x, t, 540, 930, { n: 3, alpha: 0.7, h: 140 })
      L(x, 540, 1240, 'LUNCH: REMEMBERED', pop01(t, t - lt + 1.4, 0.3, 2.4), MINT, -0.03, 34)
      hearts(x, t, 540, 880, t - lt + 1.6, { n: 6, life: 1.8, spread: 300, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
