// v3t110: THE SIGNS AS… v3, "Zodiacs meet a dog | be like." (topic: when they see a dog) (~59 s vertical, signs3kit, lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself on meeting a dog. Ending: card.
//   aries abandoned the date · taurus shared a snack, only with the dog · gemini narrated the dog's thoughts
//   · cancer asked if the dog had eaten · leo got upstaged and barked · virgo brushed it strand by strand · libra told
//   it it has great style · scorpio: the dog trusts no one except scorpio · sagittarius played fetch six hours
//   · capricorn hired it as head of security · aquarius asked it about the universe · pisces: dog fell asleep on them
//  49.2 "Everyone *stopped.* | For the dog." · LESSON "Love like a dog: | *all in.*" · last "Best first date? | *Walking a dog.*" over Aries + Sagittarius
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', ORANGE = '#ffb34a'

const PUP = [
  'EE.......',
  'EBBB.....',
  '.BWB.....',
  '.BBBK....',
  '..BBBBBBT',
  '..BBBBBB.',
  '..BB..BB.',
]
// a bigger pup facing right: E ear, B body, W eye, K nose, T tail
const DOG = [
  '........EE...',
  '.......EBBB..',
  'T......BBWBB.',
  '.T.....BBBBBK',
  '..BBBBBBBBB..',
  '..BBBBBBBB...',
  '..BBBBBBBB...',
  '..B.B...B.B..',
  '..B.B...B.B..',
]
const dogC = (b = '#c98f6a', e = BROWN) => ({ E: e, B: b, W: INK, K: INK, T: b })
function dog(x, t, cx, cy, cell, { col, ear, flip = false, wag = true, rot = 0 } = {}) {
  drawBits(x, DOG, dogC(col, ear), cx, cy + (wag ? Math.abs(Math.sin(t * 6)) * -4 : 0), cell, { sx: flip ? -1 : 1, rot })
}
const BONE_BM = ['WW....WW', 'WWWWWWWW', 'WW....WW']
const BALL = ['.YY.', 'YYYY', 'YYYY', '.YY.']
const BRUSH = ['KKKKKKKK', 'KKKKKKKK', 'WWWWWWWW', 'W.W.W.W.', 'BB......', 'BB......']
const BOW = ['P..P', 'PPPP', 'P..P']
const PLANET = ['..LLLL..', '.LLLLLL.', 'RRRRRRRR', '.LLLLLL.', '..LLLL..']

const CAMEOS = [
  { sign: 'aries', cap: 'Saw a dog. | *Abandoned the date.*', mood: 'wide', star: { x: -200 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      dog(x, t, 840, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true })
      label(x, 790, 650, 'DOG SPOTTED', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: RED, color: '#fff4e2', rot: -0.05 })
      for (let i = 0; i < 4; i++) { x.save(); x.globalAlpha = 0.5 * clamp(lt - 0.5); x.fillStyle = BONE; x.fillRect(200 - i * 10, 840 + i * 30, 90 - i * 15, 8); x.restore() }
    } },
  { sign: 'taurus', cap: 'Shared their snack. | *With the dog only.*', mood: 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      dog(x, t, 820, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true })
      const slide = ease.outCubic(prog(lt, 0.8, 1.3))
      if (lt > 0.7) drawBits(x, ['.CCC.', 'CCCCC', '.CCC.'], { C: '#f0c27a' }, lerp(500, 740, slide), 900, 14)
      bubble(x, 800, 650, 'you? no. | the dog? yes.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Narrated the dog’s | *inner thoughts.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      dog(x, t, 820, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#e9e0d0', ear: '#8a8aa0' })
      const L = ['“I am a | good boy.”', '“is that | a sandwich?”', '“I love | everyone.”']
      bubble(x, 800, 690, L[Math.min(2, Math.floor(lt / 0.8))], pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, col: '#fff1b0', tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Asked the dog | if it’s *eaten today.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      dog(x, t, 820, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#3a2a20', ear: '#1b1236' })
      bubble(x, 790, 660, 'have you eaten? | are you warm?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 30, col: SKYB, tail: 'bl' })
      drawBits(x, BONE_BM, { W: '#fff4e2' }, 620, 1110, 12 * pop01(t, P.t0 + 1.4, 0.3, 2))
      hearts(x, t, 820, 900, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Dog got more attention? | Leo *barked.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      dog(x, t, 820, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#ffd76a', ear: ORANGE })
      hearts(x, t, 820, 900, P.t0 + 0.4, { n: 6, life: 1.4, spread: 160, cell: 6, seed: 2 })
      if (lt > 1.2) bubble(x, 400, 640, 'WOOF.', pop01(t, P.t0 + 1.2 * 1.29, 0.25, 2.4), { size: 52, col: ORANGE, tail: 'bc' })
      label(x, 800, 660, 'FANS: 47', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Brushed the dog. | *Strand by strand.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      dog(x, t, 820, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#fff4e2', ear: '#c9c9d8', wag: false })
      drawBits(x, BRUSH, { K: RED, W: '#fff4e2', B: BROWN }, 800 + Math.sin(t * 8) * 60, 860, 9 * pop01(t, P.t0 + 0.4, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.4) / 1.6) * 4211)
      label(x, 800, 660, `STRAND ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Told the dog | it has *great style.*', mood: 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      dog(x, t, 820, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#ffc2d4', ear: '#c94a8a' })
      drawBits(x, BOW, { P: '#ff4fa0' }, 760, 900, 10 * pop01(t, P.t0 + 0.9, 0.3, 2))
      bubble(x, 800, 660, 'that collar? | iconic.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 820, 940, P.t0 + 1.2, 6, 130, 0.5)
    } },
  { sign: 'scorpio', cap: 'The dog trusts *no one.* | Except Scorpio.', mood: lt => lt > 1.3 ? 'wink' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      const come = ease.outCubic(prog(lt, 0.9, 1.5))
      dog(x, t, lerp(860, 720, come), 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#2a2350', ear: '#140c30', wag: lt > 1.2 })
      label(x, 800, 660, 'STRANGERS: ✗', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 790, 'SCORPIO: ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#c94a8a', color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Played fetch. | For *six hours.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      dog(x, t, 820, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true })
      const ph = (lt * 0.9) % 1
      drawBits(x, BALL, { Y: '#d8f04a' }, lerp(420, 900, ph), 820 - Math.sin(Math.PI * ph) * 220, 12)
      const h = Math.min(6, 1 + Math.floor(lt / 0.4))
      label(x, 800, 650, `HOUR ${h}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Hired the dog. | *Head of security.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      dog(x, t, 820, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#8a6a4a', ear: '#3a2a20' })
      label(x, 790, 900, 'SECURITY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 26, bg: INK, color: GOLD, rot: 0, font: MONO, weight: 700 })
      label(x, 800, 660, 'CONTRACT: SIGNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Asked the dog | about *the universe.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      dog(x, t, 820, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { flip: true, col: '#b0a090' })
      drawBits(x, PLANET, { L: SKYB, R: LAV }, 800, 660, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.2 })
      bubble(x, 850, 830, 'woof.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 450, 1130, 'MIND: BLOWN', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Dog fell asleep on them. | *Never moving.*', mood: 'heart', tears: lt => lt > 1.0 ? 2 : 1, star: { x: -40, y: -40, s: 300 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      dog(x, t, 560, 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { wag: false, col: '#e9e0d0', ear: '#8a8aa0' })
      label(x, 800, 640, 'ZZZ · DAY 2', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t110', key: 'G', accent: ORANGE, ending: 'card',
  title: 'Zodiacs meet a dog | *be like.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'sagittarius', chip: 'ALIGNED' },
  group: {
    cap: 'Everyone *stopped.* | For the dog.',
    draw(x, t, lt) { if (lt > 0.6 && lt < 3.2) dog(x, t, 540, 760, 12, {}) },
  },
  lesson: { text: 'Love like a dog: | *all in.*', chip: 'TAIL: WAGGING' },
  last: { text: 'Best first date? | *Walking a dog.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
