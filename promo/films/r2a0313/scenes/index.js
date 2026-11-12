// r2a0313: star_advice, ADVICE SOLO, "Signs a Scorpio | misses you." (~55 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine quiet, loyal ways a Scorpio shows it, each with a warm read and one light gag. Ending: card.
//   0.0–3.6    "Signs a Scorpio | *misses you.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              kept your movie ticket · asks about your mom's knee, by name · plays your song, "random"
//              · "whatever" means "come back" · the duck joke from months ago · unbothered, keeps your mug clean
//              · rereads your old note · saved you the last bite (Cancer gets it) · their favourite hoodie, do not return
//  37.8        "Quiet heart. | *Loud loyalty.*"  Scorpio comes back, big.
//  41.0        LESSON UNLOCKED: "Scorpios say it | *in actions.*"  STATUS: MISSED
//  46.9        "Miss them back. | *Out loud.*" over the match card: Scorpio + Cancer (the last bite, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CRIM = '#ff5a7a', PAPER = '#fff4e2', RED = '#e23d4e'

// ── props
const TICKET = [
  'TTTTTTTTTTTTTT',
  'TWWWWWWWWWW.WT',
  'T.WWWWWWWWW..T',
  'TWWWWWWWWWW.WT',
  'T.WWWWWWWWW..T',
  'TWWWWWWWWWW.WT',
  'TTTTTTTTTTTTTT',
]
const TICKET_C = { T: GOLD, W: '#ffe7a8' }
const DUCK = [
  '...YYY.....',
  '..YYKYY....',
  '..YYYYYOO..',
  '...YYY.....',
  '.YYYYYYYY..',
  'YYYYYYYYYYY',
  'YYYYYYYYYY.',
  '.YYYYYYYY..',
]
const DUCK_C = { Y: '#ffd23a', K: INK, O: '#ff9a4a' }
const MUG = [
  '.WWWWWWW...',
  'WRRRRRRRW..',
  'WRRRRRRRWWW',
  'WRRHRHRRW.W',
  'WRRHHHRRW.W',
  'WRRRHRRRWWW',
  'WRRRRRRRW..',
  '.WWWWWWW...',
]
const MUG_C = { W: PAPER, R: '#6fc3ff', H: '#ffffff' }
const NOTE = [
  'YYYYYYYYYY',
  'YYYYYYYYYY',
  'YKKKKKKKYY',
  'YYYYYYYYYY',
  'YKKKKKYYYY',
  'YYYYYYYYYY',
  'YYYYHHYHHY',
  'YYYYHHHHHY',
  'YYYYYHHHYY',
  'YYYYYYHYYY',
]
const NOTE_C = { Y: '#ffe36b', K: '#8a7a40', H: '#ff4f86' }
const PLATE = [
  '..WWWWWWWWW..',
  '.WWWWWWWWWWW.',
  'WWWWWWCWWWWWW',
  '.WWWWWWWWWWW.',
  '..WWWWWWWWW..',
]
const PLATE_C = { W: PAPER, C: '#c98f5a' }
const HOODIE = [
  '...HHHHHHH...',
  '..HHH...HHH..',
  '.HHHH...HHHH.',
  'HHHHHHHHHHHHH',
  'HHHHHWHWHHHHH',
  'HHHHHWHWHHHHH',
  'HH.HHHHHHH.HH',
  'HH.HHHHHHH.HH',
  'HH.HKKKKKH.HH',
  'HH.HKKKKKH.HH',
  '...HHHHHHH...',
]
const HOODIE_C = { H: '#8f7ad6', W: '#ffffff', K: '#6b58b8' }

const CAMEOS = [
  { sign: 'scorpio', cap: 'Still has your movie ticket. | *That’s devotion.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TICKET, TICKET_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 790, 900, 'ADMIT 2', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: GOLD, rot: -0.08, font: MONO, weight: 700 })
      label(x, 790, 690, 'KEPT: SAFE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: CRIM, color: '#fff4e2', rot: 0.04 })
      hearts(x, t, 790, 850, P.t0 + 1.5, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'Asks about your mom. | *By name.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how’s Margie’s | knee doing?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 920, 'REMEMBERS:', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1020, 'EVERYTHING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Plays your song. | Calls it *“random.”*', mood: lt => lt > 1.3 ? 'wink' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 9, col: CRIM, seed: 3, alpha: pop01(t, P.t0 + 0.2, 0.3, 2) })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 40)
      label(x, 790, 690, `PLAY #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it just came on', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Says “whatever.” | Means *“come back.”*', mood: 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'whatever.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, col: LAV, tail: 'bl' })
      label(x, 790, 900, 'TRANSLATION:', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'I MISS YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 46, bg: CRIM, color: '#fff4e2', rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Brings up an inside joke | *from months ago.*', mood: lt => lt > 1.3 ? 'happy' : 'wink', look: [1, 0], star: { x: -170 }, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      bubble(x, 790, 690, '…the duck thing.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      drawBits(x, DUCK, DUCK_C, 790, 960, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.4), { rot: 0.05 * Math.sin(t * 6) })
      label(x, 790, 1130, 'STILL FUNNY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Acts unbothered. | Keeps *your mug* clean.', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'YOUR MUG', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 940, P.t0 + 1.1, 7, 150, 0.4)
      label(x, 790, 1140, 'NOBODY ELSE USES IT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Rereads your old note. | *Smiles a little.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, NOTE, NOTE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1110, 'READ: 200 TIMES', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: CRIM, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Saved you | *the last bite.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 960, 200 * k, { mood: lt > 1.5 ? 'heart' : 'wide', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.6] })
      drawBits(x, PLATE, PLATE_C, 620, 1110, 21 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 600, 640, 'RESERVED: YOU', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 830, 740, 'for ME?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Gives you their | *favorite hoodie.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 690, 'THE GOOD ONE', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 32, bg: LAV, rot: -0.04 })
      label(x, 790, 1150, 'DO NOT RETURN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: CRIM, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0313', key: 'C', accent: CRIM, solo: 'scorpio', ending: 'card',
  title: 'Signs a Scorpio | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'cancer', chip: 'STILL A MATCH' },
  group: { cap: 'Quiet heart. | *Loud loyalty.*', mood: 'heart' },
  lesson: { text: 'Scorpios say it | *in actions.*', chip: 'STATUS: MISSED' },
  last: { text: 'Miss them back. | *Out loud.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
