// r2t0672: star_talk, SOLO (aquarius), "Your Aquarius mom | *be like.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine Aquarius-mom moments, each the most extreme (and lovable) version. Ending: callback.
//   packed lunch: an experiment · grounded? a debate · birthday theme: your birth chart · curfew: time is a construct
//   · met your crush, asked their rising sign · family dinner: group brainstorm · asked for advice, got a manifesto
//   · socks + sandals at graduation · biggest fan, foam finger
//   group "Weird. Wonderful. | *Mom.*"
//   last "Still waiting on | *the lunch results.*" (card 1 paid off: the jar is back, still bubbling)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, confetti, jar, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Packed your lunch. | It’s *an experiment.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      jar(x, t, 800, 880, 22, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'LUNCH #7: GLOWING', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 30)
      bubble(x, 800, 1120, 'it’s protein!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Grounded you? | No. *A debate.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'AGENDA', headBg: SKYB, headInk: INK, lines: ['1. curfew?', '2. your rebuttal', '3. snacks'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      bubble(x, 800, 1110, 'opening statements', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Your birthday party theme? | *Your birth chart.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 640, 'HAPPY 9TH!', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, 0.05, 36)
      L(x, 800, 1090, 'MOON IN 4TH HOUSE', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, -0.04, 30)
      confetti(x, t, 800, 760, P.t0 + 0.9)
    } },
  { sign: S, cap: 'Curfew? | *“Time is a construct.”*', mood: 'wink', star: ST,
    front(x, t, lt, P) {
      const melt = clamp((lt - 0.5) / 1.4)
      bits(x, 'CLOCK', 800, 860 + melt * 40, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + melt * 0.6, sx: 1 - melt * 0.2, rot: melt * 0.2 })
      L(x, 800, 650, 'CURFEW: ???', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Met your crush. | Asked their *rising sign.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 820, 930, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0] })
      bubble(x, 760, 660, 'and your rising?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 820, 1120, 'INTERVIEW: ONGOING', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 28)
    } },
  { sign: S, cap: 'Family dinner? | *Group brainstorm.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 300, bg: '#ffffff', head: 'IDEAS', headBg: MINT, headInk: INK, lines: [['world peace', '#3a5a9a'], ['a pet goat?', '#3a5a9a'], ['pass the peas', '#3a5a9a']], size: 30, progress: clamp((lt - 0.4) / 1.1) })
      bits(x, 'PEN', 800, 1060, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 })
    } },
  { sign: S, cap: 'Asked for advice. | Got *a manifesto.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 13)
      for (let i = 0; i < 3; i++) sheet(x, 790 + i * 14, 880 - i * 14, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { w: 280, h: 330, rot: -0.05 + i * 0.04, head: i === 2 ? 'MANIFESTO' : '', headBg: RED, lines: i === 2 ? ['', '', '', ''] : [] })
      L(x, 800, 1110, `PAGE ${n} OF 14`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Your graduation? | *Socks and sandals.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -190, y: -40 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'SOCK', F.x - 70, 1080, 15 * k); bits(x, 'SOCK', F.x + 70, 1080, 15 * k, { sx: -1 })
      L(x, 800, 760, 'FRONT ROW', pop01(t, P.t0 + 0.7, 0.3, 2.2), LAV, 0.05, 36)
      L(x, 800, 960, 'FASHION: AHEAD', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Your biggest fan. | *Weirdest fan too.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GLOVE', 800, 870 + Math.sin(t * 8) * 14, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 8) * 0.12 })
      L(x, 800, 640, 'FAN #1', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.05, 40)
      bubble(x, 800, 1120, 'THAT’S MY KID', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 800, 780, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2t0672', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Aquarius mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird. Wonderful. | *Mom.*', mood: 'heart' },
  last: {
    text: 'Still waiting on | *the lunch results.*',
    draw(x, t, lt) {
      jar(x, t, 540, 1150, 26, pop01(t, t - lt + 0.6, 0.35, 2))
      L(x, 540, 1400, 'DAY 3: STILL GLOWING', pop01(t, t - lt + 1.2, 0.3, 2.2), MINT, -0.04, 32)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
