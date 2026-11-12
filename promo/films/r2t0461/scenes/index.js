// r2t0461: star_talk, SOLO (aquarius), "Aquarians at a party | *be like.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine party moments, each the most extreme Aquarius version. Ending: lesson.
//   came in costume, not a costume party · small talk became "is time real?" · spent the night with the host's cat
//   · fifty new friends, zero names · put on whale sounds · found the one guest who also loves rocks (IT'S A MATCH)
//   · fixed the host's wifi, upgraded it · danced alone, unbothered · left without a single goodbye
//   group "Weird? | Iconic, actually."   lesson "Love an Aquarius? | Let them be weird."   last "Gone by nine. | Still the best guest."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aquarius', ACC = '#38c4ec', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

// ── props
const PROP_HAT = [
  '....RRRRR....',
  '......K......',
  '.....YYY.....',
  '...BBYYYBB...',
  '..BBBRRRBBB..',
  '.BBBRRRRRBBB.',
  'YYYYYYYYYYYYY',
]
const PROP_HAT_C = { R: RED, K: INK, Y: GOLD, B: SKYB }
const CAT = [
  'O.......O..',
  'OO.....OO..',
  'OOOOOOOOO..',
  'OWOOOOOWO..',
  'OOOOPOOOO..',
  '.OOOOOOO..T',
  '.OOOOOOOO.T',
  'OOOOOOOOOOT',
  'OOOOOOOOOT.',
  'OO.OO.OO...',
]
const CAT_C = { O: ORANGE, W: '#ffffff', P: PINK, T: ORANGE }
const ROCK = [
  '...GGGG...',
  '.GGgGGGGG.',
  'GGGGGGgGGG',
  'GgGGGGGGGG',
  'GGGGGgGGGG',
  '.GGGGGGGG.',
]
const ROCK_C = { G: GREY, g: '#6b7590' }
const ROUTER = [
  'A.......A',
  'A.......A',
  'A.......A',
  'A.......A',
  'BBBBBBBBB',
  'BMBYBMBBB',
  'BBBBBBBBB',
]
const ROUTER_C = { A: GREY, B: DEEP, M: MINT, Y: GOLD }
const DISCO = [
  '....K....',
  '....K....',
  '..SWSWS..',
  '.WSWSWSW.',
  'SWSWSWSWS',
  'WSWSWSWSW',
  'SWSWSWSWS',
  '.WSWSWSW.',
  '..SWSWS..',
]
const DISCO_C = { K: GREY, S: '#c9c9d8', W: SKYB }
const DOOR = [
  'KKKKKKK',
  'KDDDDDK',
  'KDDDDDK',
  'KDDDDDK',
  'KDDDDYK',
  'KDDDDDK',
  'KDDDDDK',
  'KDDDDDK',
]
const DOOR_C = { K: INK, D: '#8a5a3a', Y: GOLD }

/** wifi bars rising one by one, n of max */
function bars(x, cx, cy, n, max, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < max; i++) {
    const h = 20 + i * 12, px = -max * 13 + i * 26
    x.fillStyle = INK; x.fillRect(px - 3, -h - 3, 22, h + 6)
    x.fillStyle = i < n ? MINT : '#3a3260'; x.fillRect(px, -h, 16, h)
  }
  x.restore()
}
const CAMEOS = [
  // 1 · arrival: the costume
  { sign: S, cap: 'Came in costume. | Not a *costume party.*', mood: lt => lt < 1.2 ? 'sparkle' : 'happy', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, PROP_HAT, PROP_HAT_C, F.x, F.top - 30, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      // the propeller spins
      const sw = Math.cos(t * 14)
      x.save(); x.fillStyle = RED; x.fillRect(F.x - 40 * Math.abs(sw), F.top - 98, 80 * Math.abs(sw), 12); x.restore()
      L(x, 790, 760, 'DRESS CODE:', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, 0.04, 34)
      L(x, 790, 830, 'CASUAL', pop01(t, P.t0 + 0.8, 0.3, 2), BONE, 0.04, 40)
      bubble(x, 790, 1040, 'nailed it.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  // 2 · small talk
  { sign: S, cap: 'Small talk? | Asked *“is time real?”*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'nice weather!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      bubble(x, 760, 860, 'but is time | even real?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1100, 'HOUR 3', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 44)
    } },
  // 3 · the cat
  { sign: S, cap: 'Spent the party | with *the host’s cat.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 690, 820, P.t0 + 0.9, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 5 })
      L(x, 790, 650, 'BEST FRIEND', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 40)
      bubble(x, 790, 1140, 'people? where?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  // 4 · fifty friends
  { sign: S, cap: 'Fifty new friends. | Knows *zero names.*', mood: lt => lt < 1.2 ? 'sparkle' : 'squint', star: ST, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      const n = Math.min(50, Math.floor(clamp((lt - 0.3) / 1.0) * 50))
      L(x, 790, 640, `FRIENDS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, 0.04, 44)
      const ids = ['leo', 'gemini', 'libra']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.5 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 680 + i * 120, 900 + (i % 2) * 30, 120 * k, { mood: 'happy', seed: 30 + i, glyph: false }) })
      bubble(x, 790, 1110, 'hey… you!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  // 5 · the playlist
  { sign: S, cap: 'Took the aux. | Played *whale sounds.*', mood: lt => lt < 1.0 ? 'happy' : 'sleepy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 680, 'NOW PLAYING:', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 34)
      L(x, 790, 750, 'WHALES, VOL. 4', pop01(t, P.t0 + 0.5, 0.3, 2), SKYB, -0.04, 38)
      notes(x, t, 790, 1000, { n: 5, cell: 8, col: SKYB, seed: 3 })
      bubble(x, 790, 1100, 'ooooOOOOooo', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  // 6 · Align nod: the match
  { sign: S, cap: 'Found the one guest | who *also loves rocks.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 920, 190 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      drawBits(x, ROCK, ROCK_C, 640, 1100, 19 * pop01(t, P.t0 + 0.5, 0.3, 2))
      drawBits(x, ROCK, ROCK_C, 880, 1110, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { sx: -1 })
      L(x, 760, 640, '✦ IT’S A MATCH ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.03, 38)
      sparkles(x, t, 760, 640, P.t0 + 1.3, 7, 200, 0.4)
    } },
  // 7 · the wifi
  { sign: S, cap: 'Fixed the host’s wifi. | Then *upgraded it.*', mood: lt => lt < 1.1 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROUTER, ROUTER_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = lt < 0.9 ? 1 : Math.min(9, 1 + Math.floor((lt - 0.9) / 0.1))
      bars(x, 790, 760, n, 9, pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1150, 'SIGNAL: 9 OF 5', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 36)
    } },
  // 8 · the dance floor
  { sign: S, cap: 'Danced alone. | *Totally unbothered.*', mood: 'sparkle', star: ST, hops: [0.5, 0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      drawBits(x, DISCO, DISCO_C, 790, 650, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 3) })
      notes(x, t, 400, 820, { n: 4, cell: 7, col: GOLD, seed: 6 })
      L(x, 790, 1000, 'DANCE FLOOR:', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, 0.04, 32)
      L(x, 790, 1070, 'POPULATION 1', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, 0.04, 38)
    } },
  // 9 · the exit
  { sign: S, cap: 'Left the party. | *No goodbyes.*', mood: lt => lt < 1.2 ? 'happy' : 'wink', look: [1, 0],
    back(x, t, lt, P) { drawBits(x, DOOR, DOOR_C, 800, 880, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 330, 620, 'where’s | Aquarius?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      L(x, 800, 1180, 'GONE: 9:04 PM', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 36)
    },
    star: { x: -170, y: 20 } },
]

const F = makeFilm({
  id: 'r2t0461', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aquarians at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird? | *Iconic, actually.*', mood: 'sparkle' },
  lesson: { text: 'Love an Aquarius? | Let them be *weird.*', chip: 'VIBE: ORIGINAL' },
  last: {
    text: 'Gone by nine. | Still *the best guest.*',
    draw(x, t, lt) { drawBits(x, CAT, CAT_C, 540, 1240, 20 * pop01(t, t - lt + 0.6, 0.4, 2)); hearts(x, t, 540, 1150, t - lt + 1.0, { n: 6, life: 2, spread: 400, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
