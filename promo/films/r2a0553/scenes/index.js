// r2a0553: star_advice, ADVICE SOLO (aries), "How to make friends | with an Aries." (signs3kit social cut, music: lofi · C).
// Nine warm, light tips for befriending an Aries, each with one visual gag. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff7a5a', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Say yes to | *the last-minute plan.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'ARIES', headCol: RED, lines: [['ADVENTURE?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['leaving in 5', GOLD, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['yes!!', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2), true]] })
      L(x, 800, 1090, 'SHOES: ON', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'aries', cap: 'Be honest. | They *respect it.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'that hat? no.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 900, 'finally, a REAL one', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, col: GOLD, tail: 'br' })
      L(x, 800, 1090, 'FRIENDSHIP: +10', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'aries', cap: 'Challenge them. | Watch them *light up.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 830, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 6) * 0.05 })
      L(x, 800, 660, 'BEST OF 3?', pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, 0.05, 36)
      L(x, 800, 1070, 'NOW BEST OF 47', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'aries', cap: 'Late text back? | *Not personal.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DELIVERED', headCol: STEEL, lines: [['hey!', BONE, 1], ['(3 days later)', LAV, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['HEY!!! sorry', GOLD, pop01(t, P.t0 + 1.2, 0.25, 2.2), true]] })
      L(x, 800, 1090, 'JUST BUSY LIVING', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aries', cap: 'Cheer their wins. | *Loudly.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 820, 920, 160, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 49, hops: [P.t0 + 1.0, P.t0 + 1.5] })
      bubble(x, 800, 680, 'GO ARIES!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bc' })
      confetti(x, t, 800, 820, P.t0 + 1.1)
      L(x, 800, 1110, 'HYPE SQUAD: YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'aries', cap: 'Arguments pass fast. | *Like, minutes.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.3) swapLabel(x, 800, 1060, lt, 1.2, 'MOOD: FIERY', 'MOOD: SNACKS?', { size: 34, fromBg: RED, toBg: GOLD })
    } },
  { sign: 'aries', cap: 'They’ll defend you. | *Fiercely.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'GLOVE', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.2 + Math.sin(t * 8) * 0.05 })
      L(x, 800, 1060, 'IN YOUR CORNER', pop01(t, P.t0 + 1.1, 0.3, 2.4), RED, -0.04, 34)
      sparkles(x, t, 800, 830, P.t0 + 1.0, 7, 160, 0.2)
    } },
  { sign: 'aries', cap: 'Can’t keep up? | Just say *“wait up.”*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 860, 960, 130, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'sleepy', look: [-1, 0], seed: 50 })
      bubble(x, 860, 760, 'wait up!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      L(x, 800, 1110, 'PACE: ADJUSTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aries', cap: 'Show up. | *That’s the whole test.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 820, 920, 170, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 51, hops: [P.t0 + 1.2] })
      L(x, 800, 1100, 'FRIEND: FOR LIFE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
      hearts(x, t, 700, 780, P.t0 + 1.3, { n: 5, life: 1.6, spread: 120, cell: 6, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0553', key: 'C', accent: ACC, solo: 'aries', ending: 'lesson',
  title: 'Making friends | *with an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Fast friends. | *Forever friends.*', mood: 'sparkle' },
  lesson: { text: 'Aries love fast and loyal. | Just *match the energy.*', chip: 'FRIEND: UNLOCKED' },
  last: { text: 'Ready? | *They already are.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
