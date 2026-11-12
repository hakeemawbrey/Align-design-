// r2t0633: star_talk, SOLO (aries), "Your Aries mom | *be like.*" (signs3kit social cut, music: lofi · G). Ending: callback.
//   up at 5, already ran a marathon · "leaving in 5" means 1 · someone was rude to you, she's on the phone · built the
//   furniture without instructions · loudest parent at your game · texts in all caps (just excited) · lost a board game,
//   demanded a rematch · asked for a ride, already outside · hugs like a tackle
//   group "Zero to a hundred. | *With love.*"   last "She still wants | *the rematch.*" (the board game, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, friend, bits, sheet, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }
const DICE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']
const dice = (x, cx, cy, cell, rot = 0) => drawBits(x, DICE, { W: BONE, K: INK }, cx, cy, cell, { rot })
const SHELF = ['WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW']

const CAMEOS = [
  { sign: S, cap: 'Up at 5 a.m. | Already *ran a marathon.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SUN', 820, 760, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 960, '5:00 AM · MILE 26', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.04, 32)
      bubble(x, 800, 1110, 'you up yet?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: '“Leaving in five” | means *leaving in one.*', mood: 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'GO GO GO', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, 0.05, 40)
    } },
  { sign: S, cap: 'Someone was rude to you? | *She’s on the phone.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLING…', headCol: ACC, lines: [['the manager,', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['please.', BONE, pop01(t, P.t0 + 0.8, 0.25, 2)]] })
      bubble(x, 800, 1110, 'i’d like a WORD.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Built the shelf | *without instructions.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fly = ease.outCubic(prog(lt, 0.3, 0.9))
      bits(x, 'PAPERS', lerp(760, 880, fly), lerp(900, 700, fly), 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: fly * 1.4, alpha: 1 - 0.6 * fly })
      drawBits(x, SHELF, { W: '#c98f5a' }, 790, 960, 20 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 800, 1180, 'DONE IN 6 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Your game? | *Loudest parent there.*', mood: 'wide', look: [1, -1], star: ST, hops: [0.6, 1.1, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'THAT’S MY KID!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 44, tail: 'bl' })
      L(x, 800, 900, 'SCORE: 0–0', pop01(t, P.t0 + 0.9, 0.3, 2.2), BONE, -0.04, 32)
      L(x, 800, 1060, 'MOM: 100 dB', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: S, cap: 'Texts in all caps. | *Not mad. Just excited.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM', headCol: ACC, lines: [['DINNER??', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['CALL ME!!', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)], ['LOVE YOU!!!', PINK, pop01(t, P.t0 + 1.4, 0.25, 2)]], size: 22 })
    } },
  { sign: S, cap: 'Lost the board game. | *Demanded a rematch.*', mood: lt => lt > 0.9 ? 'squint' : 'neutral', look: [1, 1], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      dice(x, 740, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), 0.2)
      dice(x, 870, 990, 18 * pop01(t, P.t0 + 0.35, 0.3, 2), -0.15)
      L(x, 800, 720, 'REMATCH #4', pop01(t, P.t0 + 1.0, 0.3, 2.4), ACC, -0.04, 38)
    } },
  { sign: S, cap: 'Asked for a ride. | *She’s already outside.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.25, 2.4), { rot: Math.sin(t * 10) * 0.15 })
      bubble(x, 800, 690, 'in the car!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1090, 'ETA: ALREADY HERE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Her hugs? | *Basically a tackle.*', mood: 'heart', look: [1, 0], star: { x: -120 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const go = ease.inOutCubic(prog(lt, 0.6, 1.0))
      friend(x, t, 'cancer', lerp(820, 640, go), 930, 200, k, { mood: go > 0.9 ? 'heart' : 'wide', look: [-1, 0] })
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 4 })
      L(x, 600, 1170, 'HUG: 10/10', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0633', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Aries mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero to a hundred. | *With love.*', mood: 'sparkle' },
  last: {
    text: 'She still wants | *the rematch.*',
    draw(x, t, lt) {
      dice(x, 450, 1220, 22 * pop01(t, t - lt + 0.7, 0.35, 2), 0.25)
      dice(x, 630, 1250, 22 * pop01(t, t - lt + 0.9, 0.35, 2), -0.2)
      label(x, 540, 1460, 'REMATCH #5', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 40, bg: ACC, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
