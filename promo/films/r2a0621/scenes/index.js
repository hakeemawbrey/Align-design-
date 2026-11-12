// r2a0621: star_advice, ADVICE SOLO (libra), "Libra, you can't | *please everyone.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle truths about a people-pleasing Libra, each with a warm reframe and one light gag.
// Ending: lesson.
//   three plans one Saturday · agreed with both sides (the scale) · draft eleven · their restaurant again (pizza)
//   · "it's fine" → the real thing · someone's grumpy cloud isn't yours · said sorry to a chair · one bad review, eleven
//   good · the ones who stay (Aquarius: true match)
//   group "Kind to all. | *Kind to you too.*"  lesson "Balance includes | *your side of the scale.*"  BALANCE: RESTORED
//   last "Now go order | *the pizza.*" (the restaurant card, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, rain, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fd8', S = 'libra', ST = { x: -190 }
const CHAIR = ['K......', 'K......', 'K......', 'K......', 'KKKKKKK', 'K.....K', 'K.....K', 'K.....K']

const CAMEOS = [
  { sign: S, cap: 'Three plans, one Saturday? | *Pick yours.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'SATURDAY', headBg: PINK, headInk: INK, lines: [['brunch · 11', RED], ['move a couch · 11', RED], ['party · 11', RED]], size: 28, progress: clamp((lt - 0.4) / 0.9) })
      L(x, 800, 1110, 'ALSO YOU: NAP', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.05, 32)
    } },
  { sign: S, cap: 'Agreed with both sides? | You can *have one.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tip = 0.25 * Math.sin(t * 3)
      bits(x, 'SCALE', 800, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.3 ? tip : 0 })
      L(x, 760, 1090, 'YOUR VIEW: ALLOWED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Rewrote it eleven times? | *Send the honest one.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 10)
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `DRAFT ${n}`, headCol: PINK, lines: [['sorry if this', BONE, 1, true], ['is too much but', BONE, lt > 0.8 ? 1 : 0, true], ['i miss you', MINT, pop01(t, P.t0 + 1.8, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'Their restaurant again? | Your *cravings count.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'i wanted pizza', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      bits(x, 'PIZZA', 800, 870, 18 * pop01(t, P.t0 + 1.5, 0.3, 2), { rot: 0.2 })
    } },
  { sign: S, cap: '“It’s fine”? | *Say the real thing.*', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 860, lt, 1.0, 'IT’S FINE :)', 'I’M A BIT HURT', { size: 44, fromBg: BONE, toBg: LAV })
      hearts(x, t, 800, 800, P.t0 + 1.8, { n: 3, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Their bad mood? | *Not your weather.*', mood: 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 800, 700, 20 * k)
      if (k > 0.5) rain(x, t, 800, 760, { w: 220, h: 260 })
      bits(x, 'UMB', 390, 690, 18 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      L(x, 800, 1110, 'FORECAST: YOURS', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, 0.04, 30)
    } },
  { sign: S, cap: 'Bumped a chair. | *Apologised to it.*', mood: lt => lt > 0.7 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { K: WOOD }, 800 + (lt > 0.6 && lt < 0.9 ? 12 : 0), 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'so sorry!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1180, 'CHAIR: FINE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'One person frowned? | *Eleven smiled.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.3) * 12)
      for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4); i === 5 ? bubble(x, 630 + c * 90, 700 + r * 130, ':(', 1, { size: 34, col: STEEL, tail: 'bc' }) : bubble(x, 630 + c * 90, 700 + r * 130, ':)', 1, { size: 34, col: i % 2 ? PINK : GOLD, tail: 'bc' }) }
      L(x, 800, 1120, 'COUNT THE SMILES', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'The ones who stay? | *Love the real you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'aquarius', 810, 920, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 810, 660, '✦ TRUE MATCH', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 34)
      hearts(x, t, 660, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0621', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Libra, you can’t | *please everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Kind to all. | *Kind to you too.*', mood: 'heart' },
  lesson: { text: 'Balance includes | *your side of the scale.*', chip: 'BALANCE: RESTORED' },
  last: {
    text: 'Now go order | *the pizza.*',
    draw(x, t, lt) { bits(x, 'PIZZA', 540, 1450, 24 * pop01(t, t - lt + 0.7, 0.35, 2), { rot: 0.15 }); sparkles(x, t, 540, 1450, t - lt + 1.0, 7, 160, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
