// r2t0362: star_talk, SOLO, "Pisces running late | be like." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards), ending: lesson. Pisces cries in every card.
//   0.0–3.6    "Pisces running late | *be like.*"
//   3.6–37.8   alarm went off, cried about it · tried on outfit eleven, had feelings · stopped to pet every dog
//              · the bus left, Pisces waved goodbye · texted "almost there" from bed · daydreamed past their stop
//              · got lost, made a new friend · checked the horoscope: Mercury did it · finally arrived with apology cookies
//  37.8        "Late. | But *worth the wait.*"
//  41.0        LESSON UNLOCKED: "They stop | *for everyone.*"  HEART: ON TIME
//  46.9        "Still crying | about *the bus.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const SEA = '#7dd3e8', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const TEARS = 2

const CLOCK = [
  'B.........B',
  'BB.KKKKK.BB',
  '.BKWWWWWKB.',
  '.KWWWKWWWK.',
  'KWWWWKWWWWK',
  'KWWWWKKKWWK',
  'KWWWWWWWWWK',
  '.KWWWWWWWK.',
  '..KWWWWWK..',
  '...KKKKK...',
  '..K.....K..',
]
const CLOCK_C = { B: GOLD, K: INK, W: BONE }
const DOG = [
  'BB......BB..',
  'BBB....BBB..',
  '.BTTTTTTB...',
  '.TTKTTKTT...',
  '.TTTTTTTT...',
  '..TTNNTT....',
  '..TTTTTTTTTT',
  '..TTTTTTTTTT',
  '..TTTTTTTTTT',
  '..TT.TT.TT.T',
]
const DOG_C = { B: '#8a4a2e', T: '#e0a96d', K: INK, N: '#3a2418' }
const BUS = [
  '.YYYYYYYYYYYYYYYY.',
  'YYYYYYYYYYYYYYYYYY',
  'YWWWYWWWYWWWYWWWYY',
  'YWWWYWWWYWWWYWWWYY',
  'YYYYYYYYYYYYYYYYYY',
  'YYYYYYYYYYYYYYYYRY',
  'YYYYYYYYYYYYYYYYYY',
  '..KKK.......KKK...',
  '..KKK.......KKK...',
]
const BUS_C = { Y: '#ffd23a', W: SKYB, R: RED, K: '#3a3260' }
const BED = [
  'WW................',
  'WW.PPPP...........',
  'WWPPPPPPBBBBBBBBBB',
  'WWBBBBBBBBBBBBBBBB',
  'WWBBBBBBBBBBBBBBBB',
  'WWWWWWWWWWWWWWWWWW',
  'WW..............WW',
]
const BED_C = { W: '#8a4a2e', P: BONE, B: '#8fa8ff' }
const COOKIE = [
  '..CCCCC..',
  '.CCKCCCC.',
  'CCCCCCKCC',
  'CKCCCCCCC',
  'CCCCKCCCC',
  'CCCCCCCKC',
  '.CCKCCCC.',
  '..CCCCC..',
]
const COOKIE_C = { C: '#e0a96d', K: '#5a3220' }

const S = 'pisces'
const ST = { x: -170 }
const T2 = { tears: TEARS }
const CAMEOS = [
  { sign: S, cap: 'Alarm went off. | *Cried about it.*', mood: lt => lt > 0.9 ? 'wide' : 'sleepy', look: [1, 0], star: ST, tears: lt => lt > 0.9 ? 3 : 1,
    front(x, t, lt, P) {
      const ring = lt < 1.2 ? Math.sin(t * 70) * 0.08 : 0
      drawBits(x, CLOCK, CLOCK_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: ring })
      label(x, 790, 1120, 'SNOOZE #6', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Outfit number eleven. | *Had feelings.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST, ...T2,
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(lt * 5))
      label(x, 790, 650, `OUTFIT ${n} OF ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: LAV, rot: 0.04, ...M })
      bubble(x, 790, 900, 'this one | is too | emotional', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
    } },
  { sign: S, cap: 'Stopped to pet | *every single dog.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', look: [1, 0], star: ST, ...T2,
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(lt * 3))
      drawBits(x, DOG, DOG_C, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 6) * 0.03 })
      label(x, 790, 1130, `DOGS PET: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: MINT, rot: -0.04, ...M })
      hearts(x, t, 790, 820, P.t0 + 0.6, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'The bus left. | Pisces *waved goodbye.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 0.7, 2.2))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      drawBits(x, BUS, BUS_C, 790 + go * 420, 960, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      x.restore()
      bubble(x, 760, 660, 'bye bus. | i loved you.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Texted “almost there.” | *From bed.*', mood: lt => lt > 1.2 ? 'wink' : 'sleepy', look: [1, 0], star: ST, tears: 1,
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 1020, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'almost there!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, col: MINT, tail: 'br' })
      label(x, 790, 860, 'LOCATION: BLANKET', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05, ...M })
    } },
  { sign: S, cap: 'Daydreamed past | *their own stop.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [0, -1], star: ST, ...T2,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'what if | fish had | birthdays', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1060, 'YOUR STOP: 3 AGO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: RED, color: BONE, rot: -0.05, ...M })
    } },
  { sign: S, cap: 'Got lost. | Made *a new friend.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, ...T2,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'are you | lost too?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: BONE, tail: 'br' })
      bubble(x, 800, 920, 'besties.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 64, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 1060, P.t0 + 1.3, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Checked their horoscope. | *Mercury did it.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST, ...T2,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'not my fault. | it’s in | my chart.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1040, 'MERCURY: BLAMED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, ...M })
    } },
  { sign: S, cap: 'Finally arrived. | With *apology cookies.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, ...T2,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, COOKIE, COOKIE_C, 690 + i * 100, 920 - (i === 1 ? 50 : 0), 16 * pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2))
      label(x, 790, 1100, 'SORRY ♥ (40 MIN)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.05, ...M })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 6, 170, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0362', key: 'E', accent: SEA, solo: 'pisces', ending: 'lesson',
  title: 'Pisces running late | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late. | But *worth the wait.*', mood: 'heart' },
  lesson: { text: 'They stop | *for everyone.*', chip: 'HEART: ON TIME' },
  last: {
    text: 'Still crying | about *the bus.*',
    draw(x, t, lt) {
      const go = ease.inCubic(prog(lt, 0.6, 3.4))
      drawBits(x, BUS, BUS_C, 540 + go * 700, 1330, 14 * pop01(t, t - lt + 0.4, 0.35, 2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
