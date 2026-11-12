// r2a0650: star_advice, ADVICE SOLO (taurus), "Signs a Taurus | *trusts you.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine warm, relatable signs a slow-to-trust Taurus has let you in, one light gag each.
// Ending: callback.
//   a spare key · the secret snack drawer · plant clearance · the five-year plan · they changed the plan for you (rare)
//   · cried in front of you (once) · lent you their favorite mug · the good playlist · checked your compatibility, then relaxed
//   group "Slow to trust. | *Loyal forever.*"
//   last  "The spare key? | *Keep it.*" (the first card, paid off: IT'S YOURS NOW)
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#a8d86a', S = 'taurus', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'They give you | a *spare key.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'KEY', 790, 850, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.15 })
      sparkles(x, t, 790, 850, P.t0 + 0.6, 7, 160, 0.2)
      L(x, 790, 1050, 'A HUGE DEAL', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 40)
    } },
  { sign: S, cap: 'They show you | *the snack drawer.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'COOKIE', 790, 760, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 1060, 'TOP SECRET', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, -0.04, 38)
    } },
  { sign: S, cap: 'You’re allowed | to *water the plants.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'FLOWER', 790, 850, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'PLANT CLEARANCE ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'You’ve heard | *the five-year plan.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 870, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 300, h: 300, head: 'THE PLAN', headBg: '#a8d86a', headInk: INK, lines: ['a garden', 'a cozy home', ['you, around', RED]], size: 30, progress: prog(lt, 0.5, 1.5) })
    } },
  { sign: S, cap: 'They changed the plan. | For you. *Rare.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k < 1) L(x, 790, 860, 'PLAN A ONLY', k, STEEL, -0.04, 38)
      else { L(x, 790, 860, lt < 1.1 ? 'PLAN A ONLY' : 'PLAN B: OKAY', 1, lt < 1.1 ? STEEL : MINT, -0.04, 38) }
      if (lt > 1.1) sparkles(x, t, 790, 860, P.t0 + 1.1 * 1.29, 7, 170, 0.3)
    } },
  { sign: S, cap: 'They cried in front of you. | *Once.*', mood: 'neutral', tears: lt => lt > 0.6 ? 1 : 0, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 790, 870, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1060, 'YOU’RE IN', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 40)
    } },
  { sign: S, cap: 'They lent you | *their favorite mug.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'MUG', 790, 870, 24 * k); if (k > 0.8) steam(x, t, 780, 790, { n: 2, alpha: 0.7, h: 100 })
      L(x, 790, 1070, 'HANDLE WITH LOVE', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'They play you | *the good playlist.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 960, { n: 5, cell: 9, col: '#a8d86a', seed: 3, alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      L(x, 790, 1060, 'TRACK 1 OF 400', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, 0.04, 34)
    } },
  { sign: S, cap: 'Checked compatibility. | *Then relaxed.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 32)
      L(x, 790, 900, 'TAURUS + YOU', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, 0.03, 36)
      L(x, 790, 1040, 'SAFE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.05, 48)
      hearts(x, t, 400, 800, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0650', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Signs a Taurus | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Slow to trust. | *Loyal forever.*', mood: 'heart' },
  last: {
    text: 'The spare key? | *Keep it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1160, 250 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [1, 0], seed: 12, glyph: false, hops: [t0 + 1.3] })
      bits(x, 'KEY', 720, 1150, 22 * pop01(t, t0 + 0.7, 0.35, 2), { rot: -0.15 })
      L(x, 560, 1400, 'IT’S YOURS NOW', pop01(t, t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 40)
      sparkles(x, t, 720, 1150, t0 + 1.0, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
