// r2a0378: star_advice ADVICE-SOLO (aries), "Aries, it’s not | *a race.*" (~51 s vertical, signs3kit social cut, lofi · C)
// Nine warm truths for the Aries who sprints through everything, each with one cute visual gag:
//   won the race nobody else started · ten steps ahead, wait for them · lunch isn't a sprint · game night, fun counts
//   · rest isn't falling behind · slow mornings are allowed · patience is a superpower too · not every text needs an
//   answer now · your fire is a gift, pace it
//  37.8   "Fast heart. | *Big heart.*"  Aries comes back, big.
//  41.0   LESSON UNLOCKED: "Go at your pace. | *You still arrive.*"  PACE: PERFECT
//  46.9   "Slow down, Aries. | *We’ll wait for you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8a6a'
const TROPHY = [
  'YYYYYYYY',
  'YyYYYYyY',
  '.YYYYYY.',
  '..YYYY..',
  '...YY...',
  '...YY...',
  '..BBBB..',
  '.BBBBBB.',
]
const TROPHY_C = { Y: GOLD, y: '#fff1b0', B: '#a8743f' }
const PLATE = ['..SSSSSS..', '.SWWWWWWS.', 'SWWcWWWcWS', 'SWWWWcWWWS', '.SWWWWWWS.', '..SSSSSS..']
const PLATE_C = { S: '#9aa5c4', W: '#fff4e2', c: '#c98f5a' }
const SUN = [
  '..Y..Y..Y..',
  '...OOOOO...',
  'Y.OOOOOOO.Y',
  '..OOOOOOO..',
  'HHHHHHHHHHH',
  'HHHHHHHHHHH',
]
const SUN_C = { Y: '#ffe36a', O: '#ff9a4a', H: '#6b62a8' }
const CAPE = ['RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '.RRRRRR.', '..RRRR..', '..RRRR..', '...RR...']
const FIRE = [
  '....O.....',
  '...OYO....',
  '..OYYO.O..',
  '.OYYYYOYO.',
  '.OYWWYYYO.',
  'OYYWWYYYYO',
  '.OOYYYYOO.',
  'BBBBBBBBBB',
  '.BB.BB.BB.',
]
const FIRE_C = { O: '#ff6b5a', Y: '#ffd23a', W: '#fff4e2', B: '#a8743f' }
// a hammock slung between two posts
function hammock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-250, -150, 22, 230); x.fillRect(228, -150, 22, 230)
  x.fillStyle = '#a8743f'; x.fillRect(-246, -146, 14, 222); x.fillRect(232, -146, 14, 222)
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(-230, -110); x.quadraticCurveTo(0, 90, 230, -110); x.stroke()
  x.strokeStyle = '#7dffb0'; x.lineWidth = 24; x.beginPath(); x.moveTo(-230, -110); x.quadraticCurveTo(0, 90, 230, -110); x.stroke()
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Won the race. | *Nobody else started.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(690, 680, 14, 420); x.fillRect(890, 680, 14, 420)
      x.fillStyle = '#ff6b5a'; x.fillRect(704, 760, 186, 18)
      x.restore()
      label(x, 797, 650, 'FINISH', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: 0, font: MONO, weight: 700 })
      bubble(x, 797, 980, 'wait, what race?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Ten steps ahead? | *Wait for them.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), catchUp = ease.outCubic(prog(lt, 1.0, 1.8))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(940, 760, catchUp), 1000, 170 * k, { mood: catchUp > 0.9 ? 'heart' : 'wide', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.3] })
      bubble(x, 800, 740, 'wait up!!', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (1 - prog(lt, 1.6, 1.8)), { size: 44, col: '#ffe36a', tail: 'br' })
      label(x, 760, 740, 'TOGETHER', pop01(t, P.t0 + 1.85, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04 })
    } },
  { sign: 'aries', cap: 'Lunch isn’t | *a sprint.* Taste it.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'LUNCH TIME: 0:03', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'TRY: 20 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'aries', cap: 'Game night? | *Fun counts too.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.3 ? 0.25 : 0 })
      label(x, 790, 1090, lt > 1.3 ? 'SCORE: WHO CARES' : 'SCORE: 47–2', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: lt > 1.3 ? PINK : GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Rest isn’t | *falling behind.*', mood: 'sleepy', star: { x: 0, y: 40 },
    back(x, t, lt, P) { hammock(x, 540, 960, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 640, 'DAY OFF: EARNED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.03 })
    } },
  { sign: 'aries', cap: 'Slow mornings | *are allowed.*', mood: lt => lt > 1.0 ? 'happy' : 'sleepy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const rise = ease.outCubic(prog(lt, 0.2, 1.4))
      x.save(); x.beginPath(); x.rect(600, 600, 380, 400); x.clip()
      drawBits(x, SUN, SUN_C, 790, lerp(1000, 880, rise), 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.restore()
      label(x, 790, 1080, 'ALARM: SNOOZED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aries', cap: 'Patience is | *also a superpower.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    back(x, t, lt, P, F) {
      drawBits(x, CAPE, { R: '#e23d4e' }, F.x - 120 + Math.sin(t * 4) * 8, F.cy + 10, 30 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.9 })
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'NEW POWER:', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, 'WAITING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 52, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.5, 7, 180, 0.3)
    } },
  { sign: 'aries', cap: 'Not every text | needs *an answer now.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'no rush!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: BONE, tail: 'br' })
      label(x, 790, 900, 'REPLYING…', pop01(t, P.t0 + 0.7, 0.3, 2) * (1 - prog(lt, 1.3, 1.45)), { size: 38, bg: '#ff6b5a', color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'LATER IS OK', pop01(t, P.t0 + 1.45, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Your fire is | *a gift.* Pace it.', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FIRE, FIRE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + 0.05 * Math.sin(t * 8) })
      label(x, 790, 650, 'COZY, NOT WILDFIRE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0378', key: 'C', accent: ACC, solo: 'aries', ending: 'lesson',
  title: 'Aries, it’s not | *a race.*',
  cameos: CAMEOS,
  group: { cap: 'Fast heart. | *Big heart.*', mood: 'heart' },
  lesson: { text: 'Go at your pace. | *You still arrive.*', chip: 'PACE: PERFECT' },
  last: { text: 'Slow down, Aries. | *We’ll wait for you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
