// r2a0532: star_advice, ADVICE SOLO (taurus), "Signs a Taurus | likes you." (signs3kit social cut, music: lofi · F).
// Nine sweet, slow-burn Taurus tells, each with one visual gag. Ending: card (lesson + last line over Taurus + Cancer).
import { makeFilm, drawBits, sparkles, hearts, bubble, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -180 }
const PLANT = ['..G.G..', '.GGGGG.', 'GGLGLGG', '.GGGGG.', '..GGG..', '...G...', 'TTTTTTT', '.TTTTT.', '.TTTTT.', '..TTT..']
const PLANT_C = { G: '#4fbf6a', L: '#8fdc6a', T: '#c96a3a' }

const CAMEOS = [
  { sign: 'taurus', cap: 'They saved you | *the last bite.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 850, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 660, 'RESERVED: YOU', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 32)
      L(x, 800, 1070, 'THIS IS HUGE', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'You got | *couch privileges.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 680, 'INNER CIRCLE', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'They cooked for you. | *Three courses.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2); bits(x, 'DISH', 800, 700 + i * 150, 14 * k); if (k > 0.5) steam(x, t, 800, 660 + i * 150, { n: 2, h: 60, alpha: 0.5 }) }
      L(x, 800, 1140, 'COURSE 4: DESSERT', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Shared their | *private playlist.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FOR YOU ♡', headCol: MINT, lines: [['slow song 1', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['slow song 2', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['slow song 47', BONE, pop01(t, P.t0 + 1.2, 0.25, 2.2)]] })
      notes(x, t, 560, 760, { n: 4, cell: 7, col: MINT, seed: 3 })
    } },
  { sign: 'taurus', cap: 'Replies *slowly.* | But always.', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TAURUS ♉︎', headCol: '#7dffb0', lines: [['hey!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true]], typing: lt > 0.7 ? 1 : 0 })
      L(x, 800, 1100, 'ETA: TUESDAY ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'You got | *the good blanket.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 860, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      L(x, 800, 1060, 'NOBODY GETS THIS', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Bought you a plant. | *Named it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawPlant(x, 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1080, 'MEET BASIL', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 36)
      hearts(x, t, 800, 720, P.t0 + 1.4, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'taurus', cap: 'Asked your sign. | Then *your rising.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'YOUR CHART', headBg: LAV, headInk: INK, lines: ['sun: ✓', 'moon: ✓', 'rising: ✓'], size: 32, progress: clamp((lt - 0.4) / 0.9) })
      L(x, 800, 1090, 'COMPATIBLE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Changed their *routine.* | For you.', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 220, head: 'SATURDAY', headBg: STEEL, headInk: INK, lines: [], size: 30 })
      if (lt > 0.3) swapLabel(x, 800, 850, lt, 1.1, '2 PM: NAP', '2 PM: YOU', { size: 34, fromBg: BONE, toBg: PINK })
      sparkles(x, t, 800, 850, P.t0 + 1.6, 7, 160, 0.5)
    } },
]
function drawPlant(x, cx, cy, cell) { drawBits(x, PLANT, PLANT_C, cx, cy, cell) }

const F = makeFilm({
  id: 'r2a0532', key: 'F', accent: ACC, solo: 'taurus', ending: 'card',
  title: 'Signs a Taurus | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'IT’S A MATCH' },
  group: { cap: 'Slow to fall. | *All in.*', mood: 'heart' },
  lesson: { text: 'Taurus love is slow. | And it *stays.*', chip: 'STATUS: CHOSEN' },
  last: { text: 'Taurus + you? | *Comfy forever.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
