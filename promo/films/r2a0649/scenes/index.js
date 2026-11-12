// r2a0649: star_advice, ADVICE SOLO (cancer), "How to surprise | *a Cancer.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine small, thoughtful surprises a sentimental Cancer would love, one light gag each.
// Ending: lesson.
//   cook their childhood favorite · frame an old photo they forgot (US, AGE 9) · remember the tiny thing they said once
//   · surprise party: six people, perfect · bring the soft blanket · a handwritten note · a night in on their couch
//   · happy tears count (tissues) · learn their moon sign
//   group "Small things. | *Big feelings.*"  lesson "Thoughtful beats fancy. | It *feels like home.*"  HEART: FULL
//   last  "Now hide. | *They’re home.*"
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Cook their | *childhood favorite.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BOWL', 790, 880, 22 * k); if (k > 0.8) steam(x, t, 790, 820, { n: 3, alpha: 0.8, h: 120 })
      L(x, 790, 1070, 'JUST LIKE GRANDMA’S', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Frame a photo | they *forgot existed.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 280, h: 300, head: 'US, AGE 9', headBg: GOLD, headInk: INK, lines: ['', '♡  ♡'], size: 60, ink: PINK })
      hearts(x, t, 420, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Remember the tiny thing | they *said once.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'the blue ones!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'br' })
      bubble(x, 560, 1000, 'you REMEMBERED?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Surprise party? | *Six people. Perfect.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.2))
      L(x, 790, 860, `GUESTS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, 0.05, 48)
      L(x, 790, 1040, 'COZY SIZE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Bring a blanket. | *The soft one.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      L(x, 790, 1060, 'SOFTNESS: MAX', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.04, 34)
    } },
  { sign: S, cap: 'A handwritten note | *beats any gift.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'FOR YOU', headBg: PINK, headInk: INK, lines: ['you make', 'everywhere', ['feel like home', RED]], size: 30, progress: prog(lt, 0.5, 1.5) })
    } },
  { sign: S, cap: 'Plan a night in. | *Their couch, your snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'COOKIE', 790, 780, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 1090, 'BEST NIGHT EVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'They’ll cry. | *Happy tears count.*', mood: 'heart', tears: lt => lt > 0.8 ? 2 : 0, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1060, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: S, cap: 'Know their sun sign? | Learn their *moon.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MOON', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1050, 'MOON: CANCER ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 36)
      sparkles(x, t, 790, 820, P.t0 + 1.0, 7, 160, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0649', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to surprise | *a Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Small things. | *Big feelings.*', mood: 'heart' },
  lesson: { text: 'Thoughtful beats fancy. | It *feels like home.*', chip: 'HEART: FULL' },
  last: { text: 'Now hide. | *They’re home.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
