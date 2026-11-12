// r2a0311: star_advice, ADVICE SOLO, "Tauruses need | to feel heard." (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine relatable Taurus truths, each with a warm reframe and one light visual gag. Ending: lesson.
//   0.0–3.6    "Tauruses need | *to feel heard.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a snail-paced story, let it finish · talk over dinner · not stubborn, sure (a lovingly immovable rock)
//              · remember the order · a night to decide · quiet company counts · the plant lives there, ask first
//              · the pie that means "I love you" · "i'm fine", asked again gently
//  37.8        "Steady heart. | *Soft center.*"  Taurus comes back, big.
//  41.0        LESSON UNLOCKED: "Patience is how | a Taurus *feels heard.*"  STATUS: HEARD
//  46.9        "Also? | Bring *snacks.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', PAPER = '#fff4e2', WOOD = '#8a4a2e'

// ── props
const SNAIL = [
  '.........K..K',
  '..SSSS....K.K',
  '.SsssSS...KK.',
  'SssSSsSS..YY.',
  'SsSssSsS.YYY.',
  'SssSSsSSYYYY.',
  '.SSSSSSYYYY..',
  'YYYYYYYYYYY..',
]
const SNAIL_C = { S: '#c98f5a', s: '#e8b77e', K: INK, Y: '#b7e37a' }
const BOWL = [
  '..W...W...W..',
  '...W...W...W.',
  '..W...W...W..',
  'OOOOOOOOOOOOO',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
  '..BBBBBBBBB..',
  '....BBBBB....',
]
const BOWL_C = { W: '#d8dbe8', O: '#ffb34a', B: '#6fc3ff' }
const ROCK = [
  '....GGGGG....',
  '..GGgGGGGGG..',
  '.GGGGGGgGGGG.',
  'GGgGGGGGGGgGG',
  'GGGGGgGGGGGGG',
  'GGGGGGGGGgGGG',
  'GgGGGGGGGGGGG',
  '.GGGGGgGGGGG.',
]
const ROCK_C = { G: '#9aa5c4', g: '#c3cbe0' }
const MUG = [
  '.WWWWWWW...',
  'WBBBBBBBW..',
  'WBBBBBBBWWW',
  'WBBHBHBBW.W',
  'WBBHHHBBW.W',
  'WBBBHBBBWWW',
  'WBBBBBBBW..',
  '.WWWWWWW...',
]
const MUG_C = { W: PAPER, B: '#c98f5a', H: PINK }
const MOON = [
  '..YYYY.',
  '.YYY...',
  'YYY....',
  'YYY....',
  'YYY....',
  '.YYY...',
  '..YYYY.',
]
const PILLOW = [
  '.WWWWWWWWWW.',
  'WWWWWWWWWWWW',
  'WWWLWWWWLWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const PILLOW_C = { W: '#e8e2ff', L: LAV }
const PLANT = [
  '...G.G.G...',
  '..GGGGGGG..',
  '.GGgGGGgGG.',
  '..GGGGGGG..',
  '....GGG....',
  '.OOOOOOOOO.',
  '..OOOOOOO..',
  '..OOOOOOO..',
  '...OOOOO...',
]
const PLANT_C = { G: GREEN, g: '#9ae58a', O: '#e07a4a' }
const PIE = [
  '....W..W....',
  '...W..W.....',
  '..CCCCCCCC..',
  '.CHCCCCCHCC.',
  'CCCCCHCCCCCC',
  'FFFFFFFFFFFF',
  '.FFFFFFFFFF.',
]
const PIE_C = { W: '#d8dbe8', C: '#e8a24a', H: '#ff4f86', F: '#c98f5a' }

const CAMEOS = [
  { sign: 'taurus', cap: 'Let them finish | *the whole story.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SNAIL, SNAIL_C, lerp(860, 720, ease.inOutCubic(prog(lt, 0.3, 2.3))), 1080, 13 * k)
      bubble(x, 790, 690, '…and THEN | the bread…', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 900, 'STORY: CHAPTER 3', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Ask about their day | *over dinner.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'okay, NOW | i’ll talk', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'They’re not stubborn. | They’re *sure.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ROCK, ROCK_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 730, 'IMMOVABLE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 820, '(LOVINGLY)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Remember their order. | It *says everything.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      label(x, 790, 690, 'OAT · WARM · NO FOAM', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'you remembered?!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: 'taurus', cap: 'Big decision? | *Give them a night.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', star: { x: -170 }, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MOON, { Y: GOLD }, 820, 660, 16 * k)
      drawBits(x, PILLOW, PILLOW_C, 790, 980, 20 * k)
      label(x, 790, 840, lt > 1.6 ? 'DECIDED: YES' : 'DECIDING… ZZZ', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: lt > 1.6 ? MINT : LAV, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.6) sparkles(x, t, 790, 840, P.t0 + 1.65, 6, 140, 0.3)
    } },
  { sign: 'taurus', cap: 'Quiet company | *counts as talking.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 960, 220 * k, { mood: 'sleepy', look: [-1, 0], seed: 19, glyph: false })
      label(x, 760, 690, 'WORDS SAID: 0', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 760, 1150, 'SAID: A LOT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
      hearts(x, t, 560, 820, P.t0 + 1.6, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'taurus', cap: 'Moved their plant? | *Ask first.*', mood: lt => lt > 0.9 && lt < 1.7 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const off = lt < 0.7 ? 0 : lt < 1.6 ? 130 : lerp(130, 0, ease.inOutCubic(prog(lt, 1.6, 2.0)))
      drawBits(x, PLANT, PLANT_C, 790 + off * 0.6, 1000, 18 * k)
      x.save(); x.globalAlpha = k * 0.6; x.strokeStyle = BONE; x.lineWidth = 4; x.setLineDash([10, 10]); x.strokeRect(790 - 100, 900, 200, 190); x.restore()
      label(x, 790, 720, 'IT LIVES HERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
      if (lt > 2.0) sparkles(x, t, 790, 1000, P.t0 + 2.0, 6, 130, 0.5)
    } },
  { sign: 'taurus', cap: 'They baked for you. | *That’s “I love you.”*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PIE, PIE_C, 790, 980, 25 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'TRANSLATION:', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 780, '“I LOVE YOU”', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 920, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 8 })
    } },
  { sign: 'taurus', cap: 'Heard “I’m fine”? | *Ask again, gently.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: lt => lt > 1.4 ? [0, 0] : [0, 1], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'i’m fine.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      bubble(x, 780, 880, 'okay… | not really', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1080, 'HEARD', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0311', key: 'D', accent: GREEN, solo: 'taurus', ending: 'lesson',
  title: 'Tauruses need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Steady heart. | *Soft center.*', mood: 'heart' },
  lesson: { text: 'Patience is how | a Taurus *feels heard.*', chip: 'STATUS: HEARD' },
  last: {
    text: 'Also? | Bring *snacks.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
