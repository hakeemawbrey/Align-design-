// r2a0733: star_advice, ADVICE SOLO (gemini), "What Geminis need | *after a fight.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine gentle truths about making up with a Gemini, each with a warm reframe and one light gag.
// Ending: card (lesson + last line over the match card).
//   talk it all the way out · a small laugh (the duck) · room to change their mind · a text, then a real talk
//   · don't go quiet (typing… still typing) · walk it off together · both sides heard (the scale)
//   · a fresh topic, a fresh start · a long hug (Libra)
//   group "Quick words. | *Quicker to forgive.*"  lesson "Fights pass. | Good talks *stay.*"
//   last "Hugged it out. | *Twice.*" over the match card: Gemini + Libra (the long hug, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Talk it out. | *All the way out.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['so here’s the thing—', 'also, one more—', 'okay, last thing—', 'and ANOTHER thing—']
      bubble(x, 800, 760, W[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.5))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 980, `TALKING: ${Math.min(47, Math.floor(lt * 22))} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'A small laugh. | *It helps.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'DUCK', 800, 960, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 4) * 0.1 })
      bubble(x, 820, 760, 'quack?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1130, 'JOKE: LANDED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Room to | *change their mind.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'I’M RIGHT', 'OKAY, FAIR POINT', { size: 34, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1020, 'GROWTH: VISIBLE', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'A text first. | *Then a real talk.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOU', headCol: MINT, lines: [
        ['sorry about earlier', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['can we talk?', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['yes. calling!', '#ffd23a', pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Don’t go quiet. | *Silence feels huge.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TYPING…', headCol: LAV, lines: [], typing: lt < 1.5 ? 1 : 0 })
      if (lt >= 1.5) bubble(x, 800, 900, 'still here ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: PINK, tail: 'bc' })
      L(x, 800, 1130, 'SMALL TEXTS COUNT', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Walk it off. | *Together.*', mood: 'happy', star: { x: -190 }, hops: [0.6, 1.1, 1.6],
    back(x, t, lt, P) { bits(x, 'SUN', 820, 660, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 }) },
    front(x, t, lt, P) {
      friend(x, t, 'libra', 820, 980, 170, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 0.7, P.t0 + 1.2, P.t0 + 1.7] })
      L(x, 820, 820, `LAPS: ${1 + Math.floor(lt / 0.8)}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Both sides | *heard.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const b = Math.sin(Math.min(1, lt / 1.3) * Math.PI * 3) * (1 - clamp(lt / 1.3)) * 0.3
      bits(x, 'SCALE', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: b })
      L(x, 800, 700, 'YOURS + MINE', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 800, 1130, 'BALANCED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'A fresh topic. | *A fresh start.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'so… pizza?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bits(x, 'PIZZA', 800, 960, 16 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.15 })
      L(x, 800, 1130, 'MOOD: RESET', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'A hug after. | *A long one.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -130 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 730, 900, 260, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      hearts(x, t, 560, 1060, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 8 })
      L(x, 760, 680, `HUG: ${Math.min(3, 1 + Math.floor(lt / 0.7))} MINUTES`, pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0733', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'What Geminis need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: 'MADE UP' },
  group: { cap: 'Quick words. | *Quicker to forgive.*', mood: 'heart' },
  lesson: { text: 'Fights pass. | Good talks *stay.*', chip: 'BOND: STRONGER' },
  last: {
    text: 'Hugged it out. | *Twice.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 2 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
