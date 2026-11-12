// r2a0608: star_advice, ADVICE SOLO (cancer), "Cancer, protect | *your peace.*" (signs3kit, lofi · C).
// Nine gentle truths for a Cancer guarding their calm, each with a warm reframe and one light gag. Ending: group.
//   phone on do-not-disturb · said no to the party (couch: booked) · mom friend, mother yourself too
//   · not my drama (the box slides away) · a shell day (boundary: cute) · feeling everything (feelings: valid)
//   · moon-ruled and moody · make home cozier · text back tomorrow
//   group (the ending) "Soft heart. | *Strong shell.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, rain, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Phone on silent? | *That’s allowed.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DO NOT DISTURB', headCol: LAV, lines: [['quiet hours', BONE, pop01(t, P.t0 + 0.6, 0.25, 2), false]] })
      bits(x, 'MOON', 810, 900, 12 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 810, 1100, 'PEACE: ON', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Skipped the party? | *Rest is a plan too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 650, 'party tonight?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'br' })
      bubble(x, 790, 820, 'no thanks!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      bits(x, 'COUCH', 800, 1000, 16 * pop01(t, P.t0 + 1.3, 0.3, 2))
      L(x, 800, 1120, 'COUCH: BOOKED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Everyone’s mom friend? | *Mother yourself too.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 800, 770, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      steam(x, t, 800, 700, { alpha: clamp((lt - 0.8) * 2) })
      L(x, 800, 1060, 'NOW: YOUR TURN', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Holding their drama? | *Hand it back.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const go = ease.inOutCubic(prog(lt, 1.0, 1.7))
      bits(x, 'BOX', 760 + go * 80, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: go * 0.2, alpha: 1 - go * 0.6 })
      L(x, 760 + go * 80, 760, 'NOT MY DRAMA', pop01(t, P.t0 + 0.5, 0.3, 2), RED, -0.04, 30)
      L(x, 800, 1080, 'RETURNED: KINDLY', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Need a shell day? | *Boundaries are cozy.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 0.6, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Feeling everything? | *Feel it, then rest.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 800, 700, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      rain(x, t, 800, 760, { w: 220, h: 200, alpha: clamp((lt - 0.3) * 2) * (1 - clamp((lt - 1.4) * 2)) })
      L(x, 800, 1060, 'FEELINGS: VALID', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: S, cap: 'Moon-ruled and moody? | *Be gentle with you.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 800, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1060, 'MOON: IN CHARGE', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 32)
      sparkles(x, t, 800, 800, P.t0 + 0.6, 7, 170, 0.5, [GOLD, BONE, SKYB])
    } },
  { sign: S, cap: 'Home is your happy place? | *Make it cozier.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 740, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'LAMP', 910, 900, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      L(x, 800, 1090, 'COZY LEVEL: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Text back tomorrow. | *They’ll understand.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MESSAGES', headCol: SKYB, lines: [['hey!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), false], ['no rush :)', MINT, pop01(t, P.t0 + 1.1, 0.25, 2), false]] })
      L(x, 810, 1100, 'REPLY: TOMORROW', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0608', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Cancer, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong shell.*', mood: 'heart' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
