// r2a0606: star_advice, ADVICE SOLO (virgo), "Virgo, it’s okay | *to be a beginner.*" (signs3kit, lofi · D).
// Nine gentle truths for a Virgo trying something new, each with a warm reframe and one light gag. Ending: callback.
//   first pancake flopped · notes on how to relax · a wonky first painting · four guides read, nothing started
//   · asking a question · comparing to a pro (year 10 vs day 2) · said the wrong word · new to your birth chart
//   · the learner plate
//   group "Perfect later. | *Learning now.*"
//   callback "Pancake ten? | *Chef’s kiss.*" (card 1's pancake comes back as a tidy stack)
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, chart, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'virgo', ST = { x: -190 }
const BM = {
  FLOP: ['...PPPP.....', '.PPPPPPPP...', 'PPPBPPPPPPP.', '.PPPPPPBPPPP', '..PPPPPPPP..', '....PPP.....'],
  CAKE: ['....YYY.....', '..PPPPPPPP..', '.PPPPPPPPPP.', 'PBPPPPPPPPBP', '.PPPPPPPPPP.', '..PPPPPPPP..'],
  PLATE: ['WWWWWWWWWWWWWWWW', '.WWWWWWWWWWWWWW.'],
  EASEL: ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWWOWWWOWWWK', 'KWWOOOOOWWWK', 'KWWOKOOKOWWK', 'KWWOOOOOOWWK', 'KWWWOOOOWWWK', 'KWWWWWOWWWWK', 'KKKKKKKKKKKK', '..D......D..', '.D........D.', 'D..........D'],
}
const BC = { FLOP: { P: '#e8b36a', B: '#b5793a' }, CAKE: { P: '#e8b36a', B: '#b5793a', Y: '#ffe76a' }, PLATE: { W: BONE }, EASEL: { K: INK, W: CREAM, O: '#ff9a4a', D: WOOD } }
const bm = (x, n, cx, cy, cell, o) => drawBits(x, BM[n], BC[n], cx, cy, cell, o)

const CAMEOS = [
  { sign: S, cap: 'First pancake flopped? | *Still breakfast.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bm(x, 'PLATE', 800, 920, 20 * k); bm(x, 'FLOP', 800, 880, 20 * k, { rot: 0.06 })
      L(x, 800, 1060, 'PANCAKE #1: ABSTRACT', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 28)
      bubble(x, 790, 680, 'tastes great!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Took notes on relaxing? | *Just try it.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, head: 'HOW TO RELAX', headBg: '#7dffb0', headInk: INK, lines: ['1. relax', '2. see step 1', '3. ???'], size: 34, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1090, 'STEP 1: BREATHE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'First painting is wonky? | *Wonky counts.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bm(x, 'EASEL', 800, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 })
      L(x, 800, 1100, 'IT’S A CAT. PROBABLY.', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 28)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 3, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Read four guides first? | *Just begin.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'BOOK', 800 + (i % 2 ? 14 : -14), 1000 - i * 82, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), { rot: (i % 2 ? 0.04 : -0.04) })
      L(x, 800, 620, 'GUIDES: 4 · TRIED: 0', pop01(t, P.t0 + 1.0, 0.3, 2.2), CREAM, -0.04, 28)
      swapLabel2(x, lt, P, t)
    } },
  { sign: S, cap: 'Asked a question? | That’s *smart,* not slow.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'um, quick q?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: BONE, tail: 'bl' })
      bubble(x, 800, 920, 'great question!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      L(x, 800, 1090, 'QUESTIONS: WELCOME', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Comparing to a pro? | *They started here too.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 760, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 930, 'PRO: YEAR 10', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 800, 1040, 'YOU: DAY 2', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 34)
      sparkles(x, t, 800, 1040, P.t0 + 1.2, 6, 140, 0.4)
    } },
  { sign: S, cap: 'Said the wrong word? | Laugh. *Keep going.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'one horse, please', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      L(x, 800, 900, 'MEANT: ONE COFFEE', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 30)
      bits(x, 'MUG', 800, 1040, 12 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
    } },
  { sign: S, cap: 'New to your birth chart? | *Everyone starts confused.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 800, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 590, 'what’s a house?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1040, 'ONE PLANET AT A TIME', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 26)
    } },
  { sign: S, cap: 'Not perfect yet? | That’s *the fun part.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 820, 'L', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 140, bg: CREAM, color: RED, rot: 0.06 })
      L(x, 790, 1040, 'STATUS: LEARNING', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 30)
      sparkles(x, t, 790, 820, P.t0 + 0.5, 7, 150, 0.2)
    } },
]
// card 4: after the guides, a fresh sticker: page one of trying
function swapLabel2(x, lt, P, t) { L(x, 800, 1110, 'TRIED: 1 ✦', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.05, 32) }

const F = makeFilm({
  id: 'r2a0606', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Virgo, it’s okay | *to be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Perfect later. | *Learning now.*', mood: 'heart' },
  last: {
    text: 'Pancake ten? | *Chef’s kiss.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      bm(x, 'PLATE', 540, 1260, 26 * k)
      for (let i = 0; i < 4; i++) bm(x, 'CAKE', 540, 1215 - i * 52, 26 * pop01(t, t - lt + 0.6 + i * 0.15, 0.3, 2))
      sparkles(x, t, 540, 1100, t - lt + 1.3, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
