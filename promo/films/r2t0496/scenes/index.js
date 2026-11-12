// r2t0496: star_talk, ROLLCALL, "The signs | *at a block party.*" (~57 s vertical, signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme version of itself at a street party. Ending: callback.
//   ♈ won the egg race with no egg · ♉ guarding the potato salad · ♊ met every neighbour twice · ♋ brought food for
//   every house · ♌ gave a toast nobody asked for · ♍ seating chart for a street · ♎ settled the fence fight, both won
//   · ♏ mystery bake table, no labels · ♐ invited the next street (and the next) · ♑ lemonade stand turned a profit
//   · ♒ brought a telescope at noon · ♓ cried at the bouncy castle
//   group "Same time | *next year?*"   last "Aries went back. | *Found the egg.*" (the egg race, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', YEL = '#ffe36b'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// ── props
const SPOON = ['SSSS..........', 'SSSS..........', '.SSSSSSSSSSSSS', '.SSSSSSSSSSSSS', 'SSSS..........', 'SSSS..........']
const EGG = ['..WWW..', '.WWWWW.', 'WWWWWWW', 'WWWWWWW', 'WWWWWWW', '.WWWWW.', '..WWW..']
const BOWL = [
  '..YYYYYYYYYYYY..',
  '.YYyYYYYyYYYyYY.',
  'BBBBBBBBBBBBBBBB',
  '.BBWWBBBBBBWWBB.',
  '..BBBBBBBBBBBB..',
  '...BBBBBBBBBB...',
]
const BOWL_C = { Y: YEL, y: '#e0b84a', B: SKYB, W: '#ffffff' }
const DISH = ['.KKKKKKKKKKKK.', 'KRRRRRRRRRRRRK', 'KRRYYRRRYYRRRK', 'KRRRRRRRRRRRRK', '.KKKKKKKKKKKK.']
const DISH_C = { K: INK, R: '#e06a3a', Y: YEL }
const CLIP = [
  '....KKKK....',
  'BBBBKKKKBBBB',
  'BWWWWWWWWWWB',
  'BWKKWKKWKKWB',
  'BWWWWWWWWWWB',
  'BWKKWKKWKKWB',
  'BWWWWWWWWWWB',
  'BWKKWKKWKKWB',
  'BWWWWWWWWWWB',
  'BWKKWKKWKKWB',
  'BWWWWWWWWWWB',
  'BBBBBBBBBBBB',
]
const CLIP_C = { B: BROWN, W: CREAM, K: '#6b62a8' }
const FENCE = ['W.W.W.W.W', 'WWWWWWWWW', 'W.W.W.W.W', 'W.W.W.W.W', 'WWWWWWWWW', 'W.W.W.W.W']
const CAKE = [
  '.....C.....',
  '.....Y.....',
  '.PPPPPPPPP.',
  'PPWPPWPPWPP',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
]
const CAKE_C = { C: '#ff6b5a', Y: YEL, P: PINK, W: '#ffffff', B: '#a06a4a' }
const STAND = [
  'RWRWRWRWRWRWRW',
  'RWRWRWRWRWRWRW',
  '.K..........K.',
  '.K..........K.',
  'YYYYYYYYYYYYYY',
  'YKKKKKKKKKKKKY',
  'YYYYYYYYYYYYYY',
  'Y............Y',
  'Y............Y',
]
const STAND_C = { R: RED, W: CREAM, K: INK, Y: YEL }
const SCOPE = [
  '.............GG',
  '...........GGGG',
  '.........GGGGG.',
  '.......GGGGG...',
  '.....GGGGG.....',
  '...GGGGG.......',
  '..GGGG.........',
  '....K..........',
  '...K.K.........',
  '..K...K........',
  '.K.....K.......',
]
const SCOPE_C = { G: '#c9c9d8', K: '#2a2350' }
const SUN = ['..Y..Y..Y..', '...........', 'Y..YYYYY..Y', '..YYYYYYY..', '..YYYYYYY..', 'Y.YYYYYYY.Y', '..YYYYYYY..', '..YYYYYYY..', 'Y..YYYYY..Y', '...........', '..Y..Y..Y..']
const CASTLE = [
  'P.P.P...P.P.P',
  'PPPPP...PPPPP',
  'PPPPPMMMPPPPP',
  'PWPWPMMMPWPWP',
  'PPPPPMMMPPPPP',
  'MMMMMMMMMMMMM',
  'MMMMMKKKMMMMM',
  'MMMMKKKKKMMMM',
  'MMMMKKKKKMMMM',
]
const CASTLE_C = { P: PINK, M: '#ff6fa3', W: '#ffffff', K: '#5a2a5a' }

function chart(x, cx, cy, k, lt) {
  // a little bar chart with an arrow climbing
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = CREAM; x.fillRect(-142, -102, 284, 204)
  const H = [40, 70, 110, 160]
  for (let i = 0; i < 4; i++) { const g = ease.outCubic(prog(lt, 0.4 + i * 0.2, 0.7 + i * 0.2)); x.fillStyle = ['#9aa5c4', '#6fc3ff', '#2fc79a', GOLD][i]; x.fillRect(-110 + i * 60, 90 - H[i] * g, 40, H[i] * g) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Won the egg race. | With *no egg.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SPOON, { S: '#d8dbe8' }, F.x + 170, F.cy + 20, 12 * k, { rot: -0.1 })
      const p = prog(lt, 0.5, 1.3)
      if (p < 1) drawBits(x, EGG, { W: CREAM }, lerp(F.x + 220, 900, p), F.cy - 40 - Math.sin(Math.PI * p) * 220 + p * 320, 12 * k, { rot: p * 6 })
      L(x, 790, 640, '1ST PLACE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.05, 44)
      bubble(x, 790, 1060, 'eggs are optional', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Guarding the potato salad. | *With their life.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 780, 900, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 700, 'MINE', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, 0.06, 54)
      bubble(x, 790, 1090, 'one scoop. ONE.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Met every neighbour. | *Twice.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(clamp((lt - 0.2) / 1.2) * 6) + 1)
      for (let i = 0; i < n; i++) { const c = i % 2, r = Math.floor(i / 2); L(x, 700 + c * 170, 640 + r * 120, 'HI AGAIN', 1, [MINT, PINK, GOLD, SKYB][(i + r) % 4], i % 2 ? 0.08 : -0.08, 26) }
      bubble(x, 790, 1080, 'wait, we met?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought a casserole. | For *every house.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(clamp((lt - 0.2) / 1.4) * 7) + 1)
      for (let i = 0; i < n; i++) drawBits(x, DISH, DISH_C, 790 + (i % 2 ? 10 : -10), 1060 - i * 64, 15)
      L(x, 790, 560, `HOUSE ${n * 6}`, pop01(t, P.t0 + 0.4, 0.3, 2), PINK, 0.05, 36)
    } },
  { sign: 'leo', cap: 'Gave a toast. | *Nobody asked.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'and ANOTHER thing', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      const m = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 13)
      L(x, 790, 860, `SPEECH: ${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2), ACC, 0.05, 40)
      L(x, 790, 1040, '(it was the mail)', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, -0.05, 28)
    } },
  { sign: 'virgo', cap: 'Made a seating chart. | For *a street.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CLIP, CLIP_C, 790, 880, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05 })
      L(x, 790, 610, 'HOUSE 4: TABLE 9', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.05, 30)
      L(x, 790, 1150, 'ALSO: THE DOGS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.05, 30)
    } },
  { sign: 'libra', cap: 'Settled the fence fight. | *Both sides won.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: 0, y: -30, s: 260 }, hops: [1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, FENCE, { W: CREAM }, 540, 1150, 16 * k)
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'taurus', 250, 1000, 150 * k, { mood: lt > 1.4 ? 'happy' : 'squint', look: [1, 0], seed: 31, glyph: false }); signChar(x, t, 'capricorn', 830, 1000, 150 * k, { mood: lt > 1.4 ? 'happy' : 'squint', look: [-1, 0], seed: 32, glyph: false }) }
      L(x, 540, 600, lt > 1.4 ? 'PEACE TREATY ✓' : 'NEGOTIATING…', pop01(t, P.t0 + 0.5, 0.3, 2.2), lt > 1.4 ? MINT : BONE, -0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Ran a mystery bake table. | *No labels.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 650, 'FLAVOUR: GUESS', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, 0.05, 34)
      bubble(x, 790, 1110, "you'll never know", pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Invited the next street. | *And the next.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const n = 12 + Math.floor(clamp((lt - 0.3) / 1.6) * 288)
      L(x, 790, 700, `GUESTS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 44)
      bubble(x, 790, 920, 'the more the merrier!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 790, 1110, 'NEXT TOWN: INVITED', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.05, 28)
    } },
  { sign: 'capricorn', cap: 'Ran the lemonade stand. | *Turned a profit.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    back(x, t, lt, P) { drawBits(x, STAND, STAND_C, 320, 1010, 18 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      chart(x, 320, 700, pop01(t, P.t0 + 0.4, 0.3, 2), lt)
      L(x, 320, 880, 'Q3: STRONG', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.05, 32)
    } },
  { sign: 'aquarius', cap: 'Brought a telescope. | *At noon.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 760, 960, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, SUN, { Y: YEL }, 870, 620, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: t * 0.3 })
      bubble(x, 760, 1150, 'just checking', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at the bouncy castle. | *It was beautiful.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CASTLE, CASTLE_C, 790, 930 + Math.abs(Math.sin(t * 4)) * -14, 22 * k, { sy: 1 + 0.04 * Math.sin(t * 8) })
      L(x, 790, 640, 'SO BOUNCY', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.05, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0496', key: 'C', accent: ACC,
  title: 'The signs | *at a block party.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Same time | *next year?*' },
  last: {
    text: 'Aries went back. | *Found the egg.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      signChar(x, t, 'aries', 540, 1000, 300 * k, { mood: 'sparkle', seed: 5, hops: [t - lt + 1.2] })
      drawBits(x, EGG, { W: CREAM }, 760, 860, 18 * pop01(t, t - lt + 1.0, 0.35, 2.4), { rot: 0.2 })
      L(x, 540, 1300, 'STILL 1ST PLACE', pop01(t, t - lt + 1.6, 0.3, 2.4), GOLD, -0.04, 36)
      sparkles(x, t, 760, 860, t - lt + 1.1, 7, 120, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
