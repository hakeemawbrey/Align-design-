// v3t124: THE SIGNS AS… v3, SOLO film, "Your Cancer friend | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine situations, each the most extreme (and lovable) Cancer-friend version.
//   0.0–3.6    "Your Cancer friend | *be like.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards: you said "I'm fine", they brought a casserole · remembers your birthday and your dog's
//              · kept every note you ever passed them · group chat quiet for an hour, checks on everyone · game night,
//              four courses · rescued a lonely toy from a claw machine · forgave you, filed it anyway · bad day,
//              back into the shell · you caught a cold, they moved in
//  37.8        "Soft shell. | *Big heart.*"
//  41.2        callback: "The casserole dish? | *Still at your place.*" (the dish comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e', BLUE = '#8fe3ff'

const CASSEROLE = [
  '....KKKKK....',
  '..KKKKKKKKK..',
  'HHWWWWWWWWWHH',
  'H.WOOOOOOOW.H',
  '..WOOOGOOOW..',
  '..WOOOOOOOW..',
  '...WWWWWWW...',
]
const CASS_C = { K: STEEL, H: STEEL, W: '#e8865a', O: '#ffd23a', G: '#5fd068' }
const CAKE = [
  '...F...F...',
  '...C...C...',
  '.PPPPPPPPP.',
  '.PWPWPWPWP.',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'PPPPPPPPPPP',
]
const CAKE_C = { F: GOLD, C: BONE, P: PINK, W: '#fff', B: '#c98a5a' }
const DOG = [
  'BB.....BB',
  'BBBBBBBBB',
  '.BWBBBWB.',
  '.BBBKBBB.',
  '..BBBBB..',
]
const DOG_C = { B: '#c98a5a', W: INK, K: INK }
const BOX = [
  'LLLLLLLLLLLL',
  'BBBBBBBBBBBB',
  'BWBWWBWBWWBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const BOX_C = { L: '#e8865a', B: '#c98a5a', W: BONE }
const NOTE = [
  'WWWWW',
  'WKKKW',
  'WWWWW',
  'WKKWW',
  'WWWWW',
]
const BEAR = [
  'BB...BB',
  'BBBBBBB',
  '.BKBKB.',
  '.BBPBB.',
  '..BBB..',
  '.BBBBB.',
  'BBBBBBB',
  '.BB.BB.',
]
const BEAR_C = { B: '#e8a24a', K: INK, P: PINK }
const CLAW = [
  '...K...',
  '...K...',
  '...K...',
  '.KKKKK.',
  'K.....K',
  'K.....K',
]
const FOLDER = [
  'YYYY.......',
  'YYYYYYYYYYY',
  'YYYYYYYYYYY',
  'YYYYYYYYYYY',
  'YYYYYYYYYYY',
  'YYYYYYYYYYY',
  'YYYYYYYYYYY',
]
const SHELL = [
  '.....SSSSS.....',
  '...SSsSSsSSS...',
  '..SSSSsSSSsSS..',
  '.SsSSSSsSSSSsS.',
  'SSSSsSSSSsSSSSS',
  'SSSSSSSSSSSSSSS',
]
const SHELL_C = { S: '#ffb3a0', s: '#e8865a' }
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'KKKKKKKKKK',
  'KPPPPPPPPK',
  'KPPPGPPPPK',
  'KPPPPPPPPK',
  'KPPPPPPPPK',
  'KKKKKKKKKK',
]
const SUIT_C = { K: INK, P: LAV, G: GOLD }
const BOWL = [
  '.S.S.S.',
  'OOOOOOO',
  'WWWWWWW',
  '.WWWWW.',
  '..WWW..',
]
const BOWL_C = { S: '#e8e1f4', O: '#ffb34a', W: BONE }

const C = 'cancer'
const CAMEOS = [
  { sign: C, cap: 'You said “I’m fine.” | They *brought a casserole.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'i’m fine.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      drawBits(x, CASSEROLE, CASS_C, 790, 920, 22 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      sparkles(x, t, 790, 900, P.t0 + 1.1, 6, 140, 0.3)
    } },
  { sign: C, cap: 'Remembers your birthday. | And *your dog’s.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, DOG, DOG_C, 790, 760, 20 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 640, 'HAPPY 4TH, BISCUIT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.05 })
    } },
  { sign: C, cap: 'Kept every note | you *ever passed them.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.6 + i * 0.18, 0.3, 2)
        drawBits(x, NOTE, { W: [BONE, PINK, SKYB, GOLD, MINT][i], K: STEEL }, 680 + i * 55, 860 - (i % 2) * 40 - k * 20, 14 * k, { rot: (i - 2) * 0.12 })
      }
      label(x, 790, 1130, 'BOX 1 OF 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: C, cap: 'Group chat quiet an hour. | *Checks on everyone.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.32) + 1)
      for (let i = 0; i < n; i++) bubble(x, 760 + (i % 2) * 50, 640 + i * 120, ['u ok??', 'hello??', 'eaten?', 'ALIVE??'][i], 1, { size: 38, tail: i % 2 ? 'br' : 'bl' })
    } },
  { sign: C, cap: 'Hosted game night. | Served *four courses.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOWL, BOWL_C, 680 + (i % 2) * 220, 820 + Math.floor(i / 2) * 170, 15 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2))
      label(x, 790, 650, `COURSE ${Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.3))}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'game? what game?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: C, cap: 'Saw a lonely toy. | *Rescued it.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const lift = ease.inOutCubic(prog(lt, 0.6, 1.3))
      x.fillStyle = INK; x.fillRect(786, 520, 8, lerp(300, 180, lift))
      drawBits(x, CLAW, { K: STEEL }, 790, lerp(840, 720, lift), 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BEAR, BEAR_C, 790, lerp(960, 820, lift), 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'RESCUED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 790, 900, P.t0 + 1.45, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 7 })
    } },
  { sign: C, cap: 'Forgave you. | *Filed it anyway.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, FOLDER, { Y: '#ffd23a' }, 790, 880, 26 * k, { rot: 0.04 })
      if (k > 0.5) { x.save(); x.translate(790, 900); x.rotate(0.04); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MARCH 2019', 0, 0); x.restore() }
      bubble(x, 790, 660, 'all good!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: C, cap: 'Rough day? | *Back in the shell.*', mood: 'sleepy', star: { x: -170, y: 20 },
    front(x, t, lt, P, F) {
      const d = ease.outBack(clamp((lt - 0.4) / 0.4))
      drawBits(x, SHELL, SHELL_C, F.x, F.cy - 10 + (1 - d) * -260, 26 * clamp(d * 2), { alpha: clamp(d * 3) })
      label(x, 790, 760, 'BACK SOON', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: '#ffb3a0', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'snacks | accepted', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: C, cap: 'You caught a cold. | *They moved in.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -170 }, hops: [0.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUIT_C, 760, 960, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, BOWL, BOWL_C, 860, 800, 16 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 640, 'STAYING: TILL BETTER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t124', key: 'F', accent: BLUE, solo: C, ending: 'callback',
  title: 'Your Cancer friend | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Big heart.*', mood: 'heart' },
  last: {
    text: 'The casserole dish? | *Still at your place.*',
    draw(x, t, lt) {
      drawBits(x, CASSEROLE, CASS_C, 540, 1060, 34 * pop01(t, t - lt + 0.5, 0.35, 2))
      label(x, 540, 1260, 'RETURN BY: NEVER', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 1000, t - lt + 1.0, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
