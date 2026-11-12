// r2a0558: star_advice, ADVICE SOLO (pisces), "Pisces, come back | to earth gently." (signs3kit social cut, music: lofi · C).
// Nine soft, grounding nudges for a Pisces, each with one visual gag; Pisces cries (happy, little tears) in every card.
// Ending: group.
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, zzz, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', ST = { x: -180 }, PIS = 'pisces'
const GLASS = ['S........S', 'S........S', 'SBBBBBBBBS', 'SBWBBBBBBS', 'SBWBBBBBBS', 'SBBBBBBBBS', 'SBBBBBBBBS', '.SSSSSSSS.']
const GLASS_C = { S: '#c9e6ff', B: '#6fc3ff', W: '#ffffff' }
const SPONGE = ['YYYYYYYYYYYY', 'YHYYYHYYYHYY', 'YYYYYYYYYYYY', 'YYYHYYYYHYYY', 'YYYYYYYYYYYY', 'YHYYYYHYYYHY', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG']
const SPONGE_C = { Y: '#ffe27a', H: '#d9b84a', G: '#4fbf6a' }
const GRASS = ['..F.......F...', '.FYF.....FPF..', '..F...G...F...', 'G.G.G.GG.G.G.G', 'GGGGGGGGGGGGGG', 'DDDDDDDDDDDDDD', 'DDDDDDDDDDDDDD']
const GRASS_C = { G: '#4fbf6a', F: '#ffffff', Y: GOLD, P: PINK, D: '#8a5a32' }
const RUG = ['PPPPPPPPPPPPPPPP', 'PLLLLLLLLLLLLLLP', 'PLPPLLPPLLPPLLLP', 'PLLLLLLLLLLLLLLP', 'PPPPPPPPPPPPPPPP']
const RUG_C = { P: '#c97bff', L: '#ffd2e6' }

const CAMEOS = [
  { sign: PIS, cap: 'Head in the clouds? | Feet *on the rug.*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', tears: 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'CLOUD', 660 + i * 100, 680 + (i % 2) * 40 + 8 * Math.sin(t * 2 + i), 17 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      drawBits(x, RUG, RUG_C, 360, 1110, 16 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      L(x, 800, 1000, 'GROUNDED (SOFTLY)', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: PIS, cap: 'Drink some water. | You’ve *cried a lot.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: lt => lt < 1.2 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 660, 'TEARS TODAY: 14', pop01(t, P.t0 + 0.2, 0.3, 2.2), SKYB, 0.05, 32)
      L(x, 800, 1100, 'REFILL: YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: PIS, cap: 'Feel it all. | Then *eat a snack.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: lt => lt < 1.2 ? 3 : 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 900, 20 * pop01(t, P.t0 + 1.0, 0.35, 2.2))
      L(x, 800, 660, 'FEELINGS: 100%', pop01(t, P.t0 + 0.2, 0.3, 2.2), LAV, 0.05, 32)
      L(x, 800, 1100, 'SNACK: ALSO 100%', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: PIS, cap: 'Not every sad song | is *about you.*', mood: lt => lt > 1.3 ? 'wink' : 'sleepy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 800, 960, { n: 5, cell: 9, col: SKYB, alpha: pop01(t, P.t0 + 0.2, 0.3, 2) })
      bubble(x, 800, 660, 'this one is | though', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 1110, 'NOW PLAYING: RAIN', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: PIS, cap: 'Dream big. | Set *an alarm* too.', mood: lt => lt < 1.1 ? 'sleepy' : 'wide', tears: 2, look: [1, 0], star: ST, hops: [1.15],
    front(x, t, lt, P) {
      const ring = lt > 1.0 ? Math.sin(t * 40) * 0.14 : 0
      bits(x, 'CLOCK', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: ring })
      if (lt < 1.0) zzz(x, t, 470, 700)
      else L(x, 800, 660, 'RING RING', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, 0.05, 32)
      L(x, 800, 1080, 'BACK BY 3 P.M.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: PIS, cap: 'Say no sometimes. | You’re *not a sponge.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', tears: 2, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const sq = lt > 1.2 ? 1 - 0.2 * Math.abs(Math.sin(t * 6)) * clamp((lt - 1.2) * 2) : 1
      drawBits(x, SPONGE, SPONGE_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: sq })
      L(x, 800, 660, 'EVERYONE’S FEELINGS', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.05, 28)
      L(x, 800, 1100, 'ABSORBING: PAUSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: PIS, cap: 'Tiny to-do list. | *Three* things.', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', tears: lt => lt > 1.6 ? 3 : 2, look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      const d = n => lt > 0.6 + n * 0.45 ? '✓ ' : '○ '
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 290, head: 'TODAY', headBg: ACC, headInk: INK, lines: [d(0) + 'water', d(1) + 'shower', d(2) + 'cry (done)'], size: 34, align: 'left' })
      if (lt > 1.6) bubble(x, 800, 620, 'so proud!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: PIS, cap: 'Go touch some grass. | *Literally.* It helps.', mood: lt => lt > 1.1 ? 'heart' : 'happy', tears: 2, look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, GRASS, GRASS_C, 800, 990, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 960, P.t0 + 1.0, 7, 190, 0.3, [MINT, GOLD, BONE])
      L(x, 800, 700, 'GRASS: TOUCHED', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.05, 34)
    } },
  { sign: PIS, cap: 'Your softness | is *a strength.*', mood: 'heart', tears: 2, look: [1, 0], star: ST, hops: [1.0, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 880, 'ARMOR', pop01(t, P.t0 + 0.6, 0.3, 2.4), GOLD, -0.06, 40)
      hearts(x, t, 800, 820, P.t0 + 1.1, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 5 })
      L(x, 800, 1100, 'SOFT + STRONG', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0558', key: 'C', accent: ACC, solo: PIS, ending: 'group',
  title: 'Pisces, come back | *to earth gently.*',
  cameos: CAMEOS,
  group: { cap: 'Welcome back, | *dreamer.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
