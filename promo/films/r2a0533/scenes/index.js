// r2a0533: star_advice, ADVICE SOLO (libra), "Libra, protect | your peace." (signs3kit social cut, music: lofi · C).
// Nine gentle permission slips for the peacekeeper, each with one visual gag. Ending: group.
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, zzz, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -180 }
const FLOWERS = ['.P...Y...P.', 'PWP.YWY.PWP', '.P...Y...P.', '..G..G..G..', '...G.G.G...', '....GGG....', '...BBBBB...', '...BBBBB...', '....BBB....']
const FLOWERS_C = { P: PINK, Y: '#ffe76a', W: '#ffffff', G: '#4fbf6a', B: LAV }

const CAMEOS = [
  { sign: 'libra', cap: 'You can say *no.* | Nicely. Still no.', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'can you cover | my shift? again?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 28, col: STEEL, tail: 'br' })
      L(x, 780, 960, 'NO, THANK YOU ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Not every fight | is *yours to fix.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 720, 900, 140, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'squint', look: [1, 0], seed: 39, hops: [P.t0 + 0.5, P.t0 + 1.0] })
      friend(x, t, 'capricorn', 880, 900, 140, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'squint', look: [-1, 0], seed: 40, hops: [P.t0 + 0.7, P.t0 + 1.2] })
      L(x, 800, 1090, 'MEDIATOR: OFF DUTY', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Mute the group chat. | *Just* for tonight.', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const n = 12 + Math.floor(clamp(lt / 1.1) * 87)
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt > 1.2 ? 'MUTED ✓' : `CHAT (${n})`, headCol: lt > 1.2 ? MINT : RED, lines: [['ok but who', BONE, 1], ['wait what', BONE, 1], ['LIBRA??', BONE, 1]] })
    } },
  { sign: 'libra', cap: 'Your opinion | *counts* too.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'VOTES', headBg: GOLD, headInk: INK, lines: ['friends: ✓✓✓', 'libra: ✓'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1090, 'ALSO COUNTS', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Rest is | *balance,* too.', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      zzz(x, t, 470, 700)
      L(x, 800, 690, 'SCALES: LEVEL', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Pretty things help. | *Buy the flowers.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 800, 840, 24 * pop01(t, P.t0 + 0.25, 0.35, 2))
      L(x, 800, 1080, 'FOR: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 36)
      sparkles(x, t, 800, 820, P.t0 + 1.3, 7, 180, 0.6)
    } },
  { sign: 'libra', cap: 'Leave the party | *when you want.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 820, 830, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 1070, 'bye, love you all!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
      L(x, 820, 650, '9:30 PM. HOME.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Explained once? | That’s *plenty.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'EXPLANATION', headBg: STEEL, headInk: INK, lines: ['v1', 'v2', 'v3…'], size: 32 })
      if (lt > 0.3) swapLabel(x, 800, 1070, lt, 1.1, 'WRITING v4', 'v1 WAS FINE', { size: 32 })
    } },
  { sign: 'libra', cap: 'Candle lit. | Phone *down.*', mood: lt => lt > 1.1 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 790, 830, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'DO NOT DISTURB', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 32)
      hearts(x, t, 760, 700, P.t0 + 1.3, { n: 3, life: 1.4, spread: 100, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0533', key: 'C', accent: ACC, solo: 'libra', ending: 'group',
  title: 'Libra, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Peace looks | *good* on you.', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
