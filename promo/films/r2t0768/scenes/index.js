// r2t0768: THE SIGNS AS… v3, SOLO film (sagittarius), "Late Sagittarians | *be like.*" (signs3kit social cut, lofi · G).
// (Batch topic "Sagittarians running late be like", tightened so line one fits the title box.)
// One sign the whole way: nine ways a Sagittarius runs late, each the most extreme (and lovable) version.
// Ending: group ("Always late. | *Always worth it.*").
//   "five minutes away" from the shower · stopped to pet dog number six · park shortcut, joined a frisbee game
//   · arrived with a legendary excuse · missed the bus, made a best friend · went back for keys, three times
//   · the watch is decorative · late to their own party · brought an apology pizza
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, confetti, soap, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9a4a', S = 'sagittarius', ST = { x: -180 }
const DOG = ['K.........K.', 'BB.......BBB', 'BBBBBBBBBBKB', 'BBBBBBBBBBBB', 'BBBBBBBBBBB.', '.BB..BB..BB.', '.BB..BB..BB.']
const DISC = ['..RRRRRR..', '.RWWWWWWR.', 'RRRRRRRRRR', '.RRRRRRRR.']
const WATCH = ['...KKKK...', '...KKKK...', '..KKKKKK..', '.KWWWWWWK.', 'KWWWKWWWWK', 'KWWWKWWWWK', 'KWWWKKKWWK', 'KWWWWWWWWK', '.KWWWWWWK.', '..KKKKKK..', '...KKKK...', '...KKKK...']

const CAMEOS = [
  { sign: S, cap: '“Five minutes away!” | *Still in the shower.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      soap(x, t, F.x, F.top + 40, { n: 8, spread: 280, r: 24, h: 320, alpha: clamp((lt - 0.4) * 2) })
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TEXT', headCol: ACC, lines: [['where r u', LAV, 1], ['5 min away!', ACC, pop01(t, P.t0 + 0.6, 0.25, 2.2), true], ['…1 hr ago?', LAV, pop01(t, P.t0 + 1.6, 0.25, 2.2)]], size: 26 })
    } },
  { sign: S, cap: 'Left on time. | *Then met six dogs.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      drawBits(x, DOG, { K: INK, B: '#c98f5a' }, 800, 920, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: Math.floor(t * 3) % 2 ? 1 : -1 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 5)
      L(x, 800, 690, `DOG #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.04, 44)
      hearts(x, t, 600, 1000, P.t0 + 1.0, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 2 })
      L(x, 790, 1100, 'ETA: UPDATED', pop01(t, P.t0 + 1.8, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Cut through the park. | *Joined a frisbee game.*', mood: 'sparkle', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const fl = lt > 0.4 ? (lt - 0.4) * 2.6 : 0
      drawBits(x, DISC, { R: '#ff6b5a', W: CREAM }, 780 + Math.sin(fl) * 150, 860 - Math.abs(Math.cos(fl)) * 80, 17 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(fl) * 0.3 })
      L(x, 790, 660, 'SCORE: 3–1', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 38)
      L(x, 790, 1090, 'DESTINATION: ???', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: S, cap: 'Arrived an hour late | *with a legendary story.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you will NOT | believe this', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 950, 'EXCUSE: LEGENDARY', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 32)
      L(x, 790, 1090, 'FORGIVEN', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Missed the bus. | *Made a best friend.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      L(x, 800, 660, 'BUS: GONE', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 36)
      friend(x, t, 'cancer', 820, 960, 190, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: lt > 1.1 ? 'happy' : 'neutral', look: [-1, 0], hops: [P.t0 + 1.5] })
      bubble(x, 820, 790, 'bff??', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl', col: PINK })
      L(x, 780, 1120, 'NEXT BUS? WHO CARES', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 26)
    } },
  { sign: S, cap: 'Forgot the keys. | *Went back three times.*', mood: lt => lt > 1.4 ? 'squint' : 'wide', star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 4) * 0.1 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.3) * 2)
      L(x, 800, 680, `TRIP BACK #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.04, 40)
      L(x, 800, 1080, 'KEYS: IN POCKET', pop01(t, P.t0 + 1.9, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: S, cap: 'Wears a watch. | *Purely decorative.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, WATCH, { K: '#ffb34a', W: CREAM }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      L(x, 800, 1090, 'TIME: VIBES', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 36)
      sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Late to their own party. | *Still the life of it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'HOST: ON THE WAY', pop01(t, P.t0 + 0.3, 0.3, 2.2), CREAM, -0.04, 32)
      confetti(x, t, 600, 820, P.t0 + 1.2)
      L(x, 800, 1100, 'PARTY: BEGINS NOW', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Brought pizza | *as an apology.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      L(x, 800, 650, 'SORRY PIZZA', pop01(t, P.t0 + 0.5, 0.3, 2.2), ACC, -0.04, 36)
      L(x, 800, 1090, 'FORGIVEN. AGAIN.', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
      hearts(x, t, 600, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0768', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'Late Sagittarians | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Always late. | *Always worth it.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
