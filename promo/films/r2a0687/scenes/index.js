// r2a0687: star_advice, ADVICE SOLO (libra), "Libra, it's okay | *to be alone.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine moments of a Libra on their own, each a warm reframe with one light gag.
//   cinema solo (both armrests) · nobody to agree with (council of one) · a date with yourself (compatibility: perfect)
//   · single, not on hold · a quiet night in · dressed up to go nowhere · the weird pizza · alone is a recharge
//   · your own company (it's a match: you + you)
// Ending: lesson. group "Party of one. | *Still a party.*" · lesson "Time alone | is *time with you.*" · "Both armrests. | *Every time.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, steam, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Went to the cinema solo? | *Both armrests. Yours.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'STUB', 800, 760, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      L(x, 800, 760, 'ADMIT ONE', pop01(t, P.t0 + 0.4, 0.3, 2), CREAM, -0.08, 30)
      L(x, 800, 980, 'ARMRESTS: BOTH', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 38)
    } },
  { sign: S, cap: 'Nobody to agree with? | *Your opinion is enough.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: lt => [lt > 1.3 ? -1 : 1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'is this good?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      bubble(x, 800, 860, 'yes. it is.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      L(x, 800, 1070, 'COUNCIL OF ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Took yourself on a date? | *Charming company.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'MUG', 690, 900, 18 * k); bits(x, 'MUG', 910, 900, 18 * k, { sx: -1 })
      steam(x, t, 680, 840, { n: 2, alpha: 0.5, h: 90 }); steam(x, t, 920, 840, { n: 2, alpha: 0.5, h: 90 })
      L(x, 800, 680, 'TABLE FOR: ME', pop01(t, P.t0 + 0.6, 0.3, 2), PINK, 0.04, 34)
      L(x, 800, 1080, 'COMPATIBILITY: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Single for a while? | *You’re not on hold.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'STATUS: ON HOLD', 'STATUS: LIVING', { size: 38, fromBg: STEEL, toBg: MINT })
      sparkles(x, t, 800, 820, P.t0 + 1.7, 6, 170, 0.4)
    } },
  { sign: S, cap: 'A quiet night in? | *That’s a whole plan.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 960, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOOK', 800, 820, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.05 })
      L(x, 800, 660, 'COZY LEVEL: MAX', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: S, cap: 'Dressed up to go nowhere? | *Iconic, actually.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.3, 0.8))
      if (lt > 0.25) bits(x, 'SHADES', F.x, lerp(F.cy - 260, F.cy - 6, d), 11)
      sparkles(x, t, F.x, F.cy - 20, P.t0 + 0.9, 6, 150, 0.6)
      L(x, 800, 760, 'GOING: NOWHERE', pop01(t, P.t0 + 0.9, 0.3, 2.4), STEEL, 0.04, 34)
      L(x, 800, 900, 'LOOKING: GREAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'No one to compromise with? | *Order the weird one.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 800, 1080, 'PINEAPPLE + PICKLE', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 30)
      bubble(x, 790, 660, 'no notes.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Alone isn’t lonely. | *It’s a recharge.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), f = 0.15 + 0.85 * ease.inOutCubic(prog(lt, 0.4, 1.6))
      bits(x, 'BATT', 800, 860, 26 * k)
      if (k > 0.6) { x.fillStyle = f > 0.95 ? MINT : GOLD; x.fillRect(800 - 6.5 * 26 + 26, 860 - 1.5 * 26, (10 * 26) * f, 3 * 26) }
      L(x, 800, 1060, f > 0.95 ? 'FULLY CHARGED' : 'CHARGING…', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 34)
    } },
  { sign: S, cap: 'Your own company? | *A perfect match.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ IT’S A MATCH', headCol: PINK, lines: [['♎ you', GOLD, pop01(t, P.t0 + 0.6, 0.2, 2), false], ['+ ♎ you', GOLD, pop01(t, P.t0 + 1.0, 0.2, 2), true]], size: 30 })
      hearts(x, t, 810, 800, P.t0 + 1.4, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0687', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Libra, it’s okay | *to be alone.*',
  cameos: CAMEOS,
  group: { cap: 'Party of one. | *Still a party.*', mood: 'sparkle' },
  lesson: { text: 'Time alone | is *time with you.*', chip: 'COMPANY: GREAT' },
  last: { text: 'Both armrests. | *Every time.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
