// r2a0538: star_advice, ADVICE SOLO (capricorn), "How to surprise | *a Capricorn.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine warm, slightly funny ways to surprise a Capricorn. Ending: group.
//   put the surprise in their calendar · plan everything so they can rest · gift them a nap · frame a win they forgot
//   · "i'm proud of you" (they glitch) · do one of their chores · even the chart loves a plan · a small, thoughtful gift
//   · remember their exact order
//   group "Surprised. | *Right on schedule.*" (pays off the calendar in card one)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, frame, calendar, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#2fc79a', S = 'capricorn', ST = { x: -180 }
const PEN = ['..........KG', '.........KGK', '........KGK.', '.......KGK..', '......KGK...', '.....KGK....', '....KGK.....', '...YYK......', '..YYK.......', '.WY.........']
const PEN_C = { K: INK, G: '#2fc79a', Y: GOLD, W: PAPER }

const CAMEOS = [
  { sign: S, cap: 'Put the surprise | *in their calendar.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      calendar(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'FRI 7 PM', 'SURPRISE', { topBg: ACC })
      label(x, 800, 1090, 'ACCEPTED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plan every detail. | *Let them rest.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), '6:00 dinner | 7:30 dessert | 8:00 you relax', { head: 'PLANNED BY: US', headBg: GOLD, size: 30, w: 360, rot: 0.04 })
      label(x, 800, 1090, 'YOU: OFF DUTY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gift them a nap. | *Seriously.*', mood: lt => lt > 1.1 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'gift', 800, 800, 18 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - clamp((lt - 1.0) * 4)))
      bits(x, 'pillow', 800, 900, 22 * pop01(t, P.t0 + 1.3, 0.35, 2))
      label(x, 800, 650, 'GIFT: ONE NAP', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Frame a win | *they already forgot.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      frame(x, 800, 860, pop01(t, P.t0 + 0.25, 0.35, 2), 200, 230, x2 => { bits(x2, 'trophy', 0, 0, 18) }, { col: GOLD, rot: 0.04 })
      bubble(x, 800, 1080, 'oh... that? | from 2019?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Say “I’m proud of you.” | *Watch them glitch.*', mood: lt => lt > 1.0 ? (Math.floor(lt * 8) % 2 ? 'wide' : 'heart') : 'neutral', look: [1, 0], star: ST, squash: lt => lt > 1.0 && lt < 1.8 ? 0.1 * Math.sin(lt * 40) : 0,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'i’m so proud | of you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      label(x, 800, 930, 'ERROR: FEELINGS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: RED, color: '#fff', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Do one of their chores. | *Best gift ever.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'taxes | dishes | laundry', { head: 'THEIR LIST', headBg: '#9aa5c4', size: 36, w: 300, rot: -0.04, strike: lt > 1.0 ? [1] : [] })
      label(x, 800, 1080, 'DISHES: DONE FOR YOU', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even their chart | *loves a good plan.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'surprises: maybe | plans: YES | ' + (lt > 1.2 ? 'you: SO LOVED' : 'you: ...'), { head: '♑︎ BIRTH CHART', headBg: ACC, size: 30, w: 360, rot: 0.04 })
      sparkles(x, t, 800, 920, P.t0 + 1.25 * 1.29, 7, 170, 0.5)
    } },
  { sign: S, cap: 'Small and thoughtful | *beats big and flashy.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, PEN, PEN_C, 800, 860, 18 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 650, 'ONE NICE PEN', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'it’s perfect.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Remember their exact order. | *They notice.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4, 1.9],
    front(x, t, lt, P) {
      bits(x, 'mug', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 660, 'BLACK. NO SUGAR. 7:02.', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: PAPER, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'NOTICED ♥︎', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0538', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'How to surprise | *a Capricorn.*',
  cameos: CAMEOS,
  group: {
    cap: 'Surprised. | *Right on schedule.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
