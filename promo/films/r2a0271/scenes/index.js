// r2a0271: star_advice, ADVICE SOLO (capricorn), "Signs a Capricorn | *likes you.*" (~50 s vertical, signs3kit social cut, music: lofi · D)
// One sign, nine cards: the quiet, practical ways a Capricorn shows they like you, each a relatable truth with a warm
// reframe and one gag. Ending: card (lesson + last line over the match card).
//   you're in their calendar · they send you useful links · you're in the five-year plan · they show up early
//   · they fix your stuff without asking · they laughed out loud (first time this year) · they checked your compatibility
//   (twice) · they told you about their day · they remember your order
//   LESSON "Their love is quiet. | It’s *built to last.*"   last "Their Friday plan? | *Just you.*" over CAPRICORN + CANCER
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, meter, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'capricorn', L = { x: -180 }
const CLOCK = [['..WWWWWWW..', '.WWWWIWWWW.', 'WWWWWIWWWWW', 'WWWWWIWWWWW', 'WIIIII.WWWW'.replace('.', 'W'), 'WWWWWWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..'], { W: PAPER, I: INK }]
const SHELF = [['WWWWWWWWWWWWWW', 'DDDDDDDDDDDDDD', '.K..........K.', '.K..........K.'], { W: WOOD, D: '#8a5a2a', K: SLATE }]
const WRENCH = [['.SS...', 'SS....', 'SS.S..', '.SSSS.', '...SSS', '....SS', '.....S'], { S: '#c9c9d8' }]

const CAMEOS = [
  { sign: S, cap: 'You’re in | *their calendar.*', mood: 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      calendar(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 'BLOCKED: 7PM', lt > 0.9 ? 'YOU' : '—', { topBg: SLATE })
      label(x, 790, 1060, 'NON-NEGOTIABLE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They send you | *useful links.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: 'NEW MESSAGE', msg: 'how to fix | a leaky tap', bg: LAV })
      label(x, 790, 1080, 'THIS IS FLIRTING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’re in the | *five-year plan.*', mood: 'sparkle', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 'promotion | buy a house | you ♡' : 'promotion | buy a house', { head: '5-YEAR PLAN', headBg: GOLD, size: 38, w: 360 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 6, 170, 0.4)
    } },
  { sign: S, cap: 'They show up early. | *Every time.*', mood: 'happy', look: [1, 0], star: L, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, CLOCK[0], CLOCK[1], 790, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1020, 'DATE: 7:00 | THEM: 6:40'.split(' | ')[lt > 1.0 ? 1 : 0], pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They fix your stuff | *without asking.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHELF[0], SHELF[1], 790, 880, 24 * k, { rot: lt > 1.0 ? 0 : 0.09 * Math.sin(t * 7) })
      drawBits(x, WRENCH[0], WRENCH[1], 720, 740, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: Math.sin(t * 9) * 0.3 * (lt < 1.0 ? 1 : 0) })
      label(x, 820, 1040, 'SHELF: FIXED ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They laughed. | *Out loud.* At you.', mood: lt => lt > 0.9 ? 'happy' : 'neutral', look: [1, 0], star: L, hops: [0.9, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 720, 'HA.', pop01(t, P.t0 + 0.8, 0.3, 2.6), { size: 72, bg: GOLD, rot: -0.08, font: MONO, weight: 700 })
      label(x, 790, 940, 'FIRST ONE THIS YEAR', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They checked | *your compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        signChar(x, t, 'capricorn', 700, 750, 160 * k, { mood: 'happy', seed: 51, glyph: false, glow: 0.5 })
        signChar(x, t, 'cancer', 880, 750, 160 * k, { mood: 'happy', seed: 52, glyph: false, glow: 0.5 })
        x.save(); x.globalAlpha = k; x.fillStyle = BONE; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+', 790, 750); x.restore()
      }
      meter(x, 790, 940, k, ease.inOutCubic(prog(lt, 0.4, 1.3)), { w: 300, col: MINT, title: 'COMPATIBILITY' })
      label(x, 790, 1070, 'CHECKED. TWICE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They told you | *about their day.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'so… my day | was long.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      label(x, 790, 960, 'WALLS: DOWN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'They remember | *your exact order.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'mug', 790, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1030, 'oat, extra hot, | no foam. right?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0271', key: 'D', accent: LAV, solo: S, ending: 'card',
  title: 'Signs a Capricorn | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Quiet. Steady. | *All in.*', mood: 'heart' },
  lesson: { text: 'Their love is quiet. | It’s *built to last.*', chip: 'STATUS: SECURE' },
  last: { text: 'Their Friday plan? | *Just you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
