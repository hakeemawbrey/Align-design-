// r2a0672: star_advice, ADVICE SOLO (aries), "Allowed to be | a beginner, *Aries.*" (the batch hook, re-split so it fits two lines) (signs3kit social cut, lofi · F).
// One sign the whole way: nine gentle truths for an Aries who wants to be great at everything on day one, each with a
// warm reframe and one light gag. Ending: group.
//   wobbly first bowl · fell off the skateboard (attempt 3) · first pancake burnt, second golden · guitar day one
//   · asked the "dumb" question · read the instructions (gasp) · lost to Virgo at chess, rematch · not first today,
//   still in it · every star started small (a tiny star in the chart grows)
//   group "Start messy. | *Keep going.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, board, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'First bowl is wobbly? | *Still yours.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWLW', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 5) * 0.18, sx: 1 + Math.sin(t * 4) * 0.08 })
      L(x, 800, 680, 'POTTERY: DAY 1', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1100, 'HOLDS SOUP (MOSTLY)', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Fell off the board? | *Everyone does.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', star: { x: -190, y: -30 }, squash: lt => lt > 0.8 && lt < 1.1 ? 0.15 : 0,
    front(x, t, lt, P) {
      const roll = clamp((lt - 0.4) / 1.2)
      bits(x, 'SKATE', lerp(420, 860, ease.outCubic(roll)), 1080, 14 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: roll * 0.1 })
      L(x, 800, 720, 'ATTEMPT #3', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 36)
      bubble(x, 800, 900, 'again!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Burnt the first pancake? | *Practice batch.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const gold = lt > 1.2
      bits(x, 'PANCAKE', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: gold ? 0.45 : 1 })
      if (gold) drawBits(x, ['..YYYYYYYY..', '.YYYYYYYYYY.', 'YYYYOYYYOYYY', '.YYYYYYYYYY.', '..PPPPPPPP..'], { Y: '#ffc65a', O: '#e89a3a', P: BONE }, 800, 820, 22 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      swapLabel(x, 800, 660, lt, 1.0, 'PANCAKE #1', 'PANCAKE #2: GOLDEN', { size: 32, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'Guitar sounds bad? | *Day one does.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: { x: -150 },
    front(x, t, lt, P, F) {
      bits(x, 'GUITAR', F.x + 130, F.cy + 40, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      notes(x, t, F.x + 230, F.cy - 40, { n: 4, cell: 7, col: STEEL, seed: 4 })
      L(x, 820, 690, 'CHORDS KNOWN: 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, 0.05, 30)
      L(x, 820, 1100, 'DAY 2 TOMORROW', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Asked the “dumb” question? | *Brave move.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'wait, how?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 960, 'THREE PEOPLE: SAME Q', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, -0.04, 28)
      L(x, 800, 1100, 'THANK YOU, ARIES', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Read the instructions? | *Allowed. Wild, but allowed.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 340, head: 'HOW TO', headBg: ACC, lines: ['step 1:', 'read this', 'step 2:', 'then go'], size: 30, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1110, 'NOTHING EXPLODED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Lost to Virgo at chess? | *Rematch is learning.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 800, 1020, 6, 30, pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'virgo', 820, 780, 170, pop01(t, P.t0 + 0.35, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 780, 600, 'rematch tuesday?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'Not first today? | *Still in the race.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      swapLabel(x, 800, 760, lt, 1.0, 'PLACE: 7TH', 'STILL RUNNING', { size: 40, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1020, 'PERSONAL BEST', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.05, 36)
      sparkles(x, t, 800, 1020, P.t0 + 1.75, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Every star | *started small.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      const g = lerp(10, 60, ease.inOutCubic(clamp((lt - 0.6) / 1.0)))
      drawPixelStar(x, 800, 860, g, 2, GOLD)
      L(x, 800, 1100, 'YOUR CHART: GROWING', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, -0.04, 30)
      sparkles(x, t, 800, 860, P.t0 + 1.6, 7, 140, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0672', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Allowed to be | a beginner, *Aries.*',
  cameos: CAMEOS,
  group: {
    cap: 'Start messy. | *Keep going.*', mood: 'sparkle',
    draw(x, t, lt) { sparkles(x, t, 540, 860, t - lt + 1.2, 9, 260, 0.1) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
