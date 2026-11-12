// r2a0593: star_advice, ADVICE SOLO (sagittarius), "The right people | *will stay, Sag.*" (signs3kit social cut, music:
// lofi · C). Nine cards, a relatable Sagittarius truth + a warm reframe: gone a month, they kept your plant alive · too
// honest? the right ones love it · cancel to travel, they ask for postcards · need space, they hand you a map · plans
// change hourly, they pack light · overshare at dinner, they pull up a chair · late again, they saved you a seat · your
// chart says free spirit, theirs says same · you come back, they never left.
// Ending: lesson ("Your people don't need you | to *stay still.*") then "Go explore. | *Bring snacks back.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -180 }, SG = 'sagittarius'
const POT = ['...G.G...', '..GGGGG..', '.GG.G.GG.', '...GGG...', '....G....', 'TTTTTTTTT', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..']
const POT_C = { G: '#4fbf6a', T: '#d9774a' }
const CHAIR = ['RRRRRR', 'R....R', 'RRRRRR', 'R....R', 'R....R']

const CAMEOS = [
  { sign: SG, cap: 'Gone a month? | They *kept your plant alive.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'DAY 31', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 38)
      L(x, 800, 1060, 'STILL THRIVING ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Too honest? | The right ones *love it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'that hat? no.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      friend(x, t, 'gemini', 800, 940, 190, pop01(t, P.t0 + 0.7, 0.3, 2), { mood: lt > 1.2 ? 'happy' : 'wide', look: [-1, 0], seed: 23 })
      L(x, 800, 1120, 'HAT: RETIRED. THANKS!', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'Cancelled to travel? | They ask for *postcards.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 230, rot: 0.06, head: 'POSTCARD', headBg: SKYB, headInk: INK, lines: ['wish you', 'were here ♡'], size: 36 })
      L(x, 800, 1050, 'FRIDGE: FULL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: SG, cap: 'Need space? | They *hand you a map.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 30 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.05 })
      L(x, 800, 680, 'GO. WE’LL BE HERE.', pop01(t, P.t0 + 0.9, 0.3, 2.3), GOLD, 0.04, 30)
      L(x, 800, 1050, 'SPACE: GRANTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Plans change hourly? | They *pack light.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 4)
      L(x, 800, 680, `PLAN ${String.fromCharCode(64 + n)}`, pop01(t, P.t0 + 0.3, 0.3, 2), RED, 0.04, 44)
      bits(x, 'BACKPACK', 800, 880, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1070, 'READY IN 2 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Overshared at dinner? | They *pull up a chair.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'so, my feelings…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      drawBits(x, CHAIR, { R: GOLD }, 800, 900, 24 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 1070, 'TELL US MORE', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: SG, cap: 'Late again? | They *saved you a seat.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.5, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, '+40 MIN', pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, 0.04, 40)
      L(x, 800, 1030, 'SEAT: SAVED ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 38)
    } },
  { sign: SG, cap: 'Your chart says free spirit. | Theirs says *same.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 720, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 220, h: 190, rot: -0.08, head: 'YOU', headBg: LAV, headInk: INK, lines: ['free spirit'], size: 26 })
      sheet(x, 880, 960, pop01(t, P.t0 + 0.9, 0.35, 2), { w: 220, h: 190, rot: 0.08, head: 'THEM', headBg: PINK, headInk: INK, lines: ['same ♡'], size: 30 })
      hearts(x, t, 800, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: SG, cap: 'You come back. | They *never left.*', mood: 'heart', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 850, 30 * pop01(t, P.t0 + 0.25, 0.3, 2))
      L(x, 800, 1060, 'WELCOME HOME', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 38)
      sparkles(x, t, 800, 850, P.t0 + 1.2, 8, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0593', key: 'C', accent: ACC, solo: SG, ending: 'lesson',
  title: 'The right people | *will stay, Sag.*',
  cameos: CAMEOS,
  group: { cap: 'Wander far. | *Still loved.*', mood: 'heart' },
  lesson: { text: 'Your people don’t need you | to *stay still.*', chip: 'CREW: LOYAL' },
  last: { text: 'Go explore. | *Bring snacks back.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
