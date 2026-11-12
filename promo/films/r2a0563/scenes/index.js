// r2a0563: star_advice, ADVICE SOLO (aquarius), "Signs an Aquarius | *trusts you.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine signs an Aquarius trusts you, each a relatable truth + a warm reframe with one light gag.
// Ending: callback (the rock collection gets a new rock, named after you).
//   a 2 a.m. theory · showed you the rock collection · admitted they were wrong · invited you to the alien watch party
//   · "I'm like a satellite" is a feeling · shared their birth chart · comfy silence · asked your opinion and meant it
//   · called you their favourite human
//   group "Weird together. | *Safe together.*"   last "The rock collection? | *Now has you in it.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const ROCK = ['..GGGG..', '.GGgGGG.', 'GGGGGgGG', 'GgGGGGGG', '.GGGGGG.']
const ROCKS = ['#9aa5c4', '#c9a27a', '#7a84a6', '#b7a6ff', '#a9c4b0', '#d9b0a0']
const UFO = ['.....SSS.....', '....SSSSS....', '..GGGGGGGGG..', 'GGGYGGYGGYGGG', '..GGGGGGGGG..']
const UFO_C = { S: SKYB, G: '#9aa5c4', Y: GOLD }

// a shelf of labelled rocks
function rockShelf(x, cx, cy, k, n, extra = null) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, 40, 380, 26); x.fillStyle = WOOD; x.fillRect(-184, 44, 368, 16)
  for (let i = 0; i < n; i++) drawBits(x, ROCK, { G: ROCKS[i % 6], g: '#5a5a70' }, -138 + i * 92, 10, 11)
  x.fillStyle = INK; x.fillRect(-190, -110, 380, 26); x.fillStyle = WOOD; x.fillRect(-184, -106, 368, 16)
  for (let i = 0; i < 4; i++) drawBits(x, ROCK, { G: ROCKS[(i + 3) % 6], g: '#5a5a70' }, -138 + i * 92, -140, 11)
  if (extra) extra(x)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Sent you a 2 a.m. theory? | *That’s trust.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '2:07', head: 'NEW THEORY', msg: 'what if | clouds are | shy?', bg: SKYB, size: 32 })
      label(x, 800, 1110, 'ONLY SENT TO YOU', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Showed you their rocks? | *You’re in.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      rockShelf(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 4)
      label(x, 790, 680, 'ROCKS: 212', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'this one’s Gary', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Admitted they were wrong? | *Rare. Treasure it.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const w = ['I was…', 'I was… wr—', 'I was… wrong.'][Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.45))]
      bubble(x, 790, 760, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      label(x, 790, 1000, 'SIGHTING: CONFIRMED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.5, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Invited you | to the *alien watch party.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, UFO, UFO_C, 800, 680 + 10 * Math.sin(t * 3), 18 * k)
      note(x, 800, 930, pop01(t, P.t0 + 0.7, 0.3, 2), 'roof, 11 p.m. | bring snacks | +1: YOU', { head: 'INVITE ✦', headBg: MINT, size: 32, w: 300, rot: 0.04 })
    } },
  { sign: S, cap: 'Said “I’m like a satellite”? | *That’s a feeling.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'i orbit. | from afar. | you know?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1020, 'TRANSLATION: I CARE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Shared their birth chart? | *Full access.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'sun: AQUARIUS | moon: ??? | rising: secret… | (for you: all)', { head: '♒︎ MY CHART', headBg: ACC, size: 30, w: 320, rot: -0.04 })
      label(x, 790, 1110, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sat in silence with you? | *Highest honour.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 760, 990, 200 * k, { mood: lt > 1.0 ? 'sleepy' : 'happy', look: [-1, 0], seed: 17, glyph: false })
      label(x, 600, 700, 'SILENCE: COZY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked for your opinion? | *They mean it.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'what do YOU | think?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      label(x, 790, 940, 'TAKING NOTES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Called you their | *favourite human.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 780, 'FAVOURITE HUMAN', pop01(t, P.t0 + 0.3, 0.35, 2.2), { size: 40, bg: PINK, rot: -0.04 })
      label(x, 790, 960, 'OUT OF 8 BILLION', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 8, 210, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0563', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Signs an Aquarius | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Weird together. | *Safe together.*', mood: 'heart' },
  last: {
    text: 'The rock collection? | *Now has you in it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 330, 1140, 260 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.4] })
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.9, 1.4)) : ease.outCubic(prog(lt, 0.9, 1.4))
      rockShelf(x, 740, 1080, pop01(t, t - lt + 0.5, 0.35, 2) * 1.15, 3, x2 => { if (lt > 0.85) drawBits(x2, ROCK, { G: PINK, g: '#c95a86' }, 138, lerp(-260, 10, d), 12) })
      label(x, 740, 1280, 'ROCK #213: YOU', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 330, 1000, t - lt + 1.6, { n: 5, life: 2.0, spread: 200, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
