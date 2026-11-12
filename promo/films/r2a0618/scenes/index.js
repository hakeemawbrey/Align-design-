// r2a0618: star_advice, ADVICE SOLO (aries), "Aries, you don't | *have to win.*" (topic: you don't have to win this one; signs3kit social cut, lofi · C).
// One sign the whole way: nine gentle truths about an Aries who has to win, each with a warm reframe and one light gag.
// Ending: lesson ("You don't have to win. | *You're already loved.*" STATUS: AT EASE), then "Final score: | *everyone had fun.*"
//   raced a stranger to the door · lost game night · "but actually" → "fair point" · sprinted the charity walk
//   · argued with the map · the 1 a.m. reply, deleted · let a friend win · said sorry first (Pisces cries) · a rest day
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, swapLabel, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Raced a stranger to the door? | *They weren’t racing.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 860, 1000, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.3 ? 'wide' : 'neutral', look: [-1, 0] })
      L(x, 780, 700, 'WINNER: ME!', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.05, 40)
      bubble(x, 860, 820, 'uh… ok?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: STEEL, tail: 'bc' })
    } },
  { sign: S, cap: 'Lost at game night? | *Fun still counts.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'GAME NIGHT', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, -0.03, 30)
      swapLabel(x, 800, 1000, lt, 1.2, 'SCORE: 2ND', 'FUN: 1ST', { size: 40, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Need the last word? | *“Fair point” works too.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'but ACTUALLY—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      swapLabel(x, 800, 960, lt, 1.2, 'ROUND 14', 'FAIR POINT.', { size: 42, fromBg: RED, toBg: MINT })
    } },
  { sign: S, cap: 'Sprinted the charity walk? | *You can stroll.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      L(x, 800, 700, 'CHARITY WALK', pop01(t, P.t0 + 0.2, 0.3, 2), SKYB, 0.04, 38)
      swapLabel(x, 800, 900, lt, 1.2, 'PACE: SPRINT', 'PACE: STROLL', { size: 40, fromBg: RED, toBg: MINT })
      hearts(x, t, 800, 1060, P.t0 + 1.7 * 1.29, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Arguing with the map? | *Rerouting is fine.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      bubble(x, 800, 660, 'recalculating…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      L(x, 800, 1060, 'ME: NO. YOU.', pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.2), RED, -0.04, 34)
    } },
  { sign: S, cap: 'Long reply at 1 a.m.? | *Delete is a win.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '1:04 AM', headCol: RED, lines: [['well, ACTUALLY', BONE, lt < 1.3 ? 1 : 0, true]], typing: lt < 1.3 ? 1 : 0 })
      L(x, 800, 1100, 'DRAFT: DELETED', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Let a friend win? | *Look how happy they are.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'libra', 820, 990, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 1.0, P.t0 + 1.6] })
      bits(x, 'TROPHY', 820, 760, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      confetti(x, t, 820, 780, P.t0 + 1.0, { n: 20, spread: 220 })
    } },
  { sign: S, cap: 'Said sorry first? | *That’s real strength.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      friend(x, t, 'pisces', 830, 980, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'wide', look: [-1, 0], tears: 3 })
      bubble(x, 760, 690, 'my bad. | i’m sorry.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 680, 940, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Took a whole rest day? | *Champions rest too.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 800, 760, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1080, 'REST DAY: WON', pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.2), GOLD, -0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0618', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aries, you don’t | *have to win.*',
  cameos: CAMEOS,
  group: { cap: 'All that fire. | *All heart.*', mood: 'sparkle' },
  lesson: { text: 'You don’t have to win. | *You’re already loved.*', chip: 'STATUS: AT EASE' },
  last: { text: 'Final score: | *everyone had fun.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
