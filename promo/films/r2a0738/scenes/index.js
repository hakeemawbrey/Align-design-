// r2a0738: star_advice, ADVICE SOLO (cancer), "Allowed to be | a beginner, Cancer." (the batch hook, re-split to fit two lines) (signs3kit social cut, lofi · C). Ending: group.
// Nine gentle "first try" moments for a Cancer, each with a warm reframe and one light gag:
//   the cake sank (still cake) · meant a blanket, made a coaster · stalled the car four times · said "I am bread" in French
//   · nervous on day one ("HI, I'M NEW") · grew exactly one tomato · swim class with a duck float · first place alone, homesick
//   · a new shell that feels too big (grow into it)
//   group "Beginner era: | very cute."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, waves, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'The cake sank? | *Still cake.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SANKCAKE', 800, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 - 0.15 * ease.outCubic(prog(lt, 0.4, 0.8)) })
      swapLabel(x, 800, 730, lt, 1.1, 'RISE: NONE', 'TASTE: GREAT', { size: 36, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Meant a blanket. | Made *a coaster.* Cute.', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COASTER', 800, 920, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.08 })
      L(x, 800, 720, 'BLANKET: IN PROGRESS', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, -0.04, 28)
      L(x, 800, 1110, 'HOLDS A MUG!', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Stalled the car? | *Everyone has.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', star: ST,
    front(x, t, lt, P) {
      const sh = lt < 1.2 ? Math.sin(t * 40) * 4 : 0
      bits(x, 'CAR', 800 + sh, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.3))
      L(x, 800, 730, `STALLS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.04, 38)
      bubble(x, 800, 1120, "you're doing great", pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Said "I am bread" | in French? *Progress.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'je suis pain!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 950, 'FRENCH: DAY 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.04, 34)
      L(x, 800, 1080, 'WAITER: CHARMED', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Nervous on day one? | *Everyone is.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      bits(x, 'BADGE', 800, 880, 24 * k, { rot: -0.05 })
      if (k > 0.8) { x.save(); x.translate(800, 880); x.rotate(-0.05); x.fillStyle = INK; x.font = `800 34px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText("HI, I'M NEW", 0, 2); x.restore() }
      L(x, 800, 1080, 'BY FRIDAY: NOT NEW', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Grew one tomato? | *Proud gardener.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'TOMATO', 800, 920, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 920, P.t0 + 1.0, 7, 170, 0.2)
      L(x, 800, 700, 'HARVEST: 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.04, 38)
      L(x, 800, 1110, 'NAMED IT, TOO', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Swim class with floaties? | *Still swimming.*', mood: 'sparkle', star: { x: -190, y: -20 },
    front(x, t, lt, P, F) {
      waves(x, t, 540, 1040, 760, pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'DUCK', F.x + 150, F.cy + 60 + Math.sin(t * 3) * 6, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 740, 'LESSON 1 OF 10', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: S, cap: 'First place alone? | *Homesick is normal.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'hi mom, again', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1120, 'CALLS TODAY: 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'New shell feels big? | *Grow into it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'SHELL', 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 1.5) * 0.05 })
      L(x, 800, 700, 'SIZE: ROOMY', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 800, 1120, 'FITS BETTER DAILY', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
      sparkles(x, t, 800, 920, P.t0 + 1.5, 7, 170, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0738', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Allowed to be | a beginner, *Cancer.*',
  cameos: CAMEOS,
  group: {
    cap: 'Beginner era: | *very cute.*', mood: 'heart',
    draw(x, t, lt) { sparkles(x, t, 540, 860, t - lt + 1.2, 9, 260, 0.1); hearts(x, t, 540, 760, t - lt + 1.6, { n: 6, life: 2.0, spread: 420, cell: 8, seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
