// v3t076: THE SIGNS AS… v3, SOLO film, "Sagittarians in love | be like." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine love moments, each the most extreme (and lovable) Sagittarius version.
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Sagittarians in love | *be like.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards: said "I love you" mid-skydive · second date, leaving in five minutes · met your parents, too
//              honest · commitment = passport holders for two · fell for your dog first · match distance: the whole planet
//              · dinner date in three countries · lost your gift, got you a llama · anniversary? forgot, booked a trip
//  37.8        "Wild heart. | *All yours.*"  The big Sagittarius comes back.
//  41.2        "The llama | *is family now.*"  (the llama comes back, next to Sag)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = '#ff9a4a', RED = '#e23d4e'

// ── props
const CHUTE = [
  '...RRRWWWRRR...',
  '.RRRRWWWWWRRRR.',
  'RRRRWWWWWWWRRRR',
  'R.R..W...W..R.R',
  '.R...W...W...R.',
  '..R...W.W...R..',
  '...R..W.W..R...',
  '....R..W..R....',
]
const CHUTE_C = { R: RED, W: '#fff4e2' }
const CASE = [
  '....KKKK....',
  '....K..K....',
  'OOOOOOOOOOOO',
  'OYOOOOOOOOYO',
  'OOOOOOOOOOOO',
  'OOOOOOOOOOOO',
  'OYOOOOOOOOYO',
  'OOOOOOOOOOOO',
  '.K........K.',
]
const CASE_C = { K: '#2a2350', O: SG, Y: GOLD }
const PASS = [
  'BBBBBBB',
  'BBBYBBB',
  'BBYYYBB',
  'BBBYBBB',
  'BBBBBBB',
  'BYYYYYB',
  'BBBBBBB',
]
const DOG = [
  'BB.......',
  'BBB......',
  'BWWW.....',
  'WKWWW....',
  'WWWWWWWWW',
  '.WWWWWWWW',
  '.WWWWWWWW',
  '.W.W..W.W',
  '.W.W..W.W',
]
const DOG_C = { B: '#8a5a3a', W: '#e8c49a', K: INK }
const LLAMA = [
  '.EE......',
  '.WWW.....',
  'KWWW.....',
  '.WWW.....',
  '.WWW.....',
  '.WWWWWWW.',
  '.WWWWWWWW',
  '.WWRRWWWW',
  '.WWWWWWW.',
  '.W.W.W.W.',
  '.W.W.W.W.',
]
const LLAMA_C = { E: '#e8dcc4', W: '#fff4e2', K: INK, R: PINK }
const SKEWER = ['..R..', '..O..', '..G..', '..R..', '..O..', '..K..', '..K..', '..K..']
const SKEWER_C = { R: RED, O: SG, G: '#5fd068', K: '#8a5a3a' }

function globe(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3d8be0'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
  x.fillStyle = '#5fd068'; const o = (t * 40) % (r * 4)
  for (const [a, b, w, h] of [[-0.6, -0.4, 0.7, 0.5], [0.4, 0.1, 0.6, 0.7], [-0.3, 0.5, 0.5, 0.3], [1.3, -0.5, 0.6, 0.4]]) for (const s of [0, -r * 4]) x.fillRect(a * r + o + s - r, b * r, w * r, h * r)
  x.restore()
  // the match radius ring
  x.strokeStyle = PINK; x.lineWidth = 8; x.setLineDash([16, 12]); x.beginPath(); x.arc(0, 0, r + 30, 0, Math.PI * 2); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'sagittarius', cap: 'Said “I love you” | *mid-skydive.*', mood: 'sparkle', star: { x: -180, y: -40 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) { drawBits(x, CHUTE, CHUTE_C, F.x, F.top - 110, 20 * pop01(t, P.t0 + 0.3, 0.35, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'I LOVE YOOOU!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 980, 'ALTITUDE: 3,000 m', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Second date? | *Leaving in five minutes.*', mood: lt => lt > 1 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      bubble(x, 790, 650, 'grab a jacket!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1090, 'WHERE? SURPRISE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'Met your parents. | *Way too honest.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'nice to meet you! | your kid snores.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 920, 'DINNER: SILENT', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 34, bg: LAV, rot: 0.05 })
      label(x, 790, 1080, 'DAD: LAUGHING', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'Big commitment: | *matching passports.*', mood: 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, PASS, { B: '#3a4ea8', Y: GOLD }, 730, 870, 22 * k, { rot: -0.1 })
      drawBits(x, PASS, { B: '#a83a6a', Y: GOLD }, 860, 880, 22 * k, { rot: 0.1 })
      label(x, 790, 1080, 'US: RENEWED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'sagittarius', cap: 'Fell in love. | With *your dog first.*', mood: 'heart', look: [1, 0], star: { x: -180 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 800, 920, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { sx: -1 })
      bubble(x, 790, 660, 'who’s a good boy!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1110, 'YOU: ALSO GREAT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Match distance? | *The whole planet.*', mood: 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ MATCH SETTINGS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      globe(x, t, 790, 860, 120, pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 790, 1090, 'DISTANCE: ANY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Dinner date? | *Three countries.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, SKEWER, SKEWER_C, 690 + i * 100, 870, 24 * pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2), { rot: (i - 1) * 0.15 })
      const C = ['COURSE 1: HERE', 'COURSE 2: THERE', 'DESSERT: ELSEWHERE']
      label(x, 790, 1080, C[Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))], pop01(t, P.t0 + 0.4, 0.3, 2), { size: 28, bg: SG, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 660, 'next flight!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Lost your gift. | Got you *a llama.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LLAMA, LLAMA_C, 800, 880, 24 * pop01(t, P.t0 + 0.8, 0.35, 2), { sx: -1 })
      bubble(x, 790, 640, 'small change | of plans', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1110, 'HIS NAME: KEVIN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Forgot the anniversary. | *Booked a trip.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 680, 'ANNIVERSARY: TODAY?!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: RED, color: '#fff4e2', rot: -0.05 })
      label(x, 790, 900, '✈ 2 TICKETS · 6 A.M.', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 190, 0.4)
    } },
]

const F = makeFilm({
  id: 'v3t076', key: 'C', accent: SG, solo: 'sagittarius', ending: 'callback',
  title: 'Sagittarians in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Wild heart. | *All yours.*', mood: 'sparkle' },
  last: {
    text: 'The llama | *is family now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 400, 1100, 280 * k, { mood: 'heart', seed: 5, hops: [t - lt + 1.3] })
      drawBits(x, LLAMA, LLAMA_C, 700, 1090, 24 * pop01(t, t - lt + 0.9, 0.35, 2), { sx: -1 })
      hearts(x, t, 550, 950, t - lt + 1.4, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
