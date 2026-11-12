// r2a0721: star_advice, ADVICE SOLO (virgo), "Allowed to ask | for help, Virgo." (the batch hook "Virgo, you're allowed to ask for help", re-split to fit two lines) (signs3kit social cut, lofi · D).
// One sign the whole way: nine gentle truths for a Virgo who does everything alone, each with a warm reframe and one
// light gag. Ending: lesson.
//   a wobbling tower of boxes · asked, and Libra said "of course!" · redoing someone's part, good enough
//   · the list has a list (tear off a page) · 2 a.m. fixing it, sleep · help folded the shirt wrong, still folded
//   · you help everyone, Cancer brings soup back · delegated one task · your chart says let people in
//   group "Strong alone. | *Lighter together.*"  LESSON "Asking for help | *is its own strength.*"  HELP: ACCEPTED
//   last "They folded it wrong. | *Let them anyway.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, zzz, steam, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'virgo', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Doing it all alone? | *You don’t have to.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const wob = Math.sin(t * 4) * 0.07 * clamp(lt / 0.8)
      bits(x, 'STACK', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: wob })
      L(x, 800, 620, 'TASKS: ALL OF THEM', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 800, 1130, 'HELP: AVAILABLE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Asking isn’t failing. | *It’s smart.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 740, 640, 'um… can you help?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, tail: 'bl' })
      friend(x, t, 'libra', 820, 960, 180, pop01(t, P.t0 + 0.7, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.2] })
      bubble(x, 830, 790, 'of course!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
      hearts(x, t, 820, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Redoing their part? | *Good enough is good.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 290, h: 300, rot: 0.07, head: 'GROUP PROJECT', headBg: '#6fc3ff', headInk: INK, lines: ['slide 3:', 'font is', 'a bit big'], size: 30 })
      swapLabel(x, 800, 1110, lt, 1.2, 'REDO IT ALL?', 'IT’S FINE. REALLY.', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Your list has a list. | *Share a page.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const go = ease.inOutCubic(clamp((lt - 1.0) / 0.6))
      sheet(x, 760, 860, k, { w: 260, h: 360, head: 'TO DO', headBg: ACC, headInk: INK, lines: ['make list', 'sort list', 'list lists', '…'], size: 28 })
      sheet(x, lerp(800, 860, go), lerp(870, 1040, go), k, { w: 220, h: 160, rot: lerp(0.05, 0.18, go), lines: ['page 2:', 'yours now'], size: 28 })
      friend(x, t, 'gemini', 880, 1110, 120, pop01(t, P.t0 + 1.2, 0.35, 2), { mood: 'sparkle', look: [-1, -1] })
    } },
  { sign: S, cap: 'Fixing it at 2 a.m.? | *Sleep. Ask tomorrow.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'LAPTOP', 800, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MOON', 860, 640, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 760, 700, '2:00 A.M.', pop01(t, P.t0 + 0.5, 0.3, 2.2), LAV, -0.05, 34)
      if (lt > 1.3) zzz(x, t, F.x + 70, F.top - 10, { alpha: clamp((lt - 1.3) / 0.3), size: 46 })
      L(x, 800, 1130, 'ASK IN THE MORNING', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'They folded it wrong? | *Still folded.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SHIRT', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.22 })
      L(x, 800, 700, 'FOLDED BY: A FRIEND', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.04, 30)
      swapLabel(x, 800, 1110, lt, 1.2, 'WRONG', 'CREATIVE', { size: 36, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'You help everyone. | *Let them help back.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      friend(x, t, 'cancer', 830, 980, 170, k, { mood: 'happy', look: [-1, 0] })
      bits(x, 'BOWL', 700, 1060, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      steam(x, t, 700, 1020, { n: 3, alpha: 0.6, h: 90 })
      bubble(x, 800, 690, 'your turn | for soup!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Handed off one task. | *Nothing fell apart.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const go = ease.inOutCubic(clamp((lt - 0.5) / 0.7))
      bits(x, 'CLIP', lerp(640, 860, go), lerp(900, 930, go), 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'capricorn', 880, 1060, 150, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, -1] })
      L(x, 800, 690, 'TASK: DELEGATED', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
      sparkles(x, t, 800, 700, P.t0 + 1.3, 6, 140, 0.4)
    } },
  { sign: S, cap: 'Your chart says: | *let people in.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1100, 'VIRGO: ALSO HUMAN', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 140, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0721', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Allowed to ask | *for help, Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Strong alone. | *Lighter together.*', mood: 'heart' },
  lesson: { text: 'Asking for help | *is its own strength.*', chip: 'HELP: ACCEPTED' },
  last: { text: 'They folded it wrong. | *Let them anyway.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
