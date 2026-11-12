// r2t0354: star_talk, SOLO, "Pisces when they're | mad *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine "angry" Pisces moments, each the most extreme (and soft) version; Pisces cries in every
// card. Ending: callback.
//   0.0–3.6    "Pisces when they're | mad *be like.*"
//   3.6–37.8   nine cards: wrote a poem about it · slammed the door, apologised to the door · silent treatment, four
//              minutes · the angry playlist is all ballads · yelled into a pillow, softly · furious, still made you soup
//              · blocked you, unblocked to check in · the angry text has three hearts · stormed out, came back for a hug
//  37.8        "Mad? | *Mostly sad.*"
//  41.2        CALLBACK: "The door got | *a thank-you card.*"  the door comes back with a card taped to it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#b7a6ff', PAPER = '#fff4e2'
const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })

// ── props
const SCROLL = [
  'BBBBBBBBBBBB',
  '.PPPPPPPPPP.',
  '.PKKKKKKKPP.',
  '.PPPPPPPPPP.',
  '.PKKKKKKPPP.',
  '.PPPPPPPPPP.',
  '.PKKKKKKKKP.',
  '.PPPPPPPPPP.',
  '.PKKKKKPPPP.',
  '.PPPPPPPPPP.',
  'BBBBBBBBBBBB',
]
const SCROLL_C = { B: '#c98a4e', P: PAPER, K: '#9aa5c4' }
const DOOR = [
  'FFFFFFFFFF',
  'FDDDDDDDDF',
  'FDddddddDF',
  'FDdDDDDdDF',
  'FDdDDDDdDF',
  'FDddddddDF',
  'FDDDDDDYDF',
  'FDddddddDF',
  'FDdDDDDdDF',
  'FDdDDDDdDF',
  'FDddddddDF',
  'FDDDDDDDDF',
]
const DOOR_C = { F: '#6b62a8', D: '#c98a4e', d: '#a86e3a', Y: '#ffd23a' }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWLWWWWLWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: '#e8e2ff', L: LAV }
const SOUP = [
  '..W...W...W..',
  '...W...W...W.',
  '..W...W...W..',
  'OOOOOOOOOOOOO',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
  '..BBBBBBBBB..',
  '....BBBBB....',
]
const SOUP_C = { W: '#d8dbe8', O: '#ffd23a', B: '#ff8fb1' }

const P_ = { sign: 'pisces', star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  // 1 · a poem
  { ...P_, cap: 'Mad. | Wrote *a poem about it.*', mood: lt => lt < 1.0 ? 'squint' : 'wide', tears: 2,
    front(x, t, lt, P) {
      drawBits(x, SCROLL, SCROLL_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      L(x, 790, 640, 'VERSE 14 OF 40', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: LAV })
    } },
  // 2 · the door (the callback)
  { ...P_, cap: 'Slammed the door. | *Apologised to it.*', mood: lt => lt < 0.9 ? 'squint' : 'wide', tears: lt => lt < 0.9 ? 1 : 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shake = lt > 0.5 && lt < 0.8 ? 6 * Math.sin(t * 60) : 0
      drawBits(x, DOOR, DOOR_C, 820 + shake, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5 && lt < 0.9) L(x, 820, 640, 'SLAM', 1, { bg: '#ff6b5a', size: 40 })
      if (lt > 0.9) bubble(x, 760, 640, 'sorry, door.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  // 3 · the silent treatment
  { ...P_, cap: 'Silent treatment: | *four whole minutes.*', mood: lt => lt < 1.6 ? 'squint' : 'wide', tears: lt => lt < 1.6 ? 1 : 3,
    front(x, t, lt, P) {
      const s = Math.min(240, Math.floor(lt * 110))
      L(x, 790, 860, `0${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: BONE, size: 64, rot: 0 })
      if (lt > 1.6) bubble(x, 790, 640, 'okay i miss you', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 4 · the angry playlist
  { ...P_, cap: 'Angry playlist? | *All ballads.*', mood: 'sleepy', tears: 3,
    front(x, t, lt, P) {
      L(x, 790, 1060, 'NOW PLAYING: SAD SONG #9', pop01(t, P.t0 + 0.2, 0.3, 2), { bg: PINK, size: 26 })
      notes(x, t, 790, 900, { n: 5, cell: 10, col: LAV, alpha: pop01(t, P.t0 + 0.3, 0.3, 2), seed: 2 })
    } },
  // 5 · the pillow
  { ...P_, cap: 'Yelled into a pillow. | *Softly.*', mood: lt => lt < 1.0 ? 'squint' : 'sleepy', tears: 2,
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lt > 0.8 && lt < 1.6 ? 0.85 : 1 })
      bubble(x, 800, 690, 'grr.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 790, 1100, 'VOLUME: 2%', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: SKYB })
    } },
  // 6 · still made you soup
  { ...P_, cap: 'Furious at you. | Still *made you soup.*', mood: lt => lt < 1.1 ? 'squint' : 'heart', tears: lt => lt < 1.1 ? 1 : 2,
    front(x, t, lt, P) {
      drawBits(x, SOUP, SOUP_C, 790, 950, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 690, 'eat. (i’m | still mad.)', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 7 · blocked, unblocked
  { ...P_, cap: 'Blocked them. | *Unblocked to check in.*', mood: lt => lt < 1.2 ? 'squint' : 'wide', tears: 2,
    front(x, t, lt, P) {
      const un = lt > 1.2
      L(x, 790, 820, un ? 'UNBLOCKED' : 'BLOCKED', pop01(t, un ? P.t0 + 1.2 : P.t0 + 0.2, 0.3, 2.4), { bg: un ? MINT : '#ff6b5a', size: 48 })
      if (un) bubble(x, 790, 1020, 'u eating ok?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 640, 'BLOCKED FOR: 90 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: BONE, size: 26 })
    } },
  // 8 · the angry text
  { ...P_, cap: 'The angry text | had *three hearts.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', tears: 2,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.25, 2.2)
      bubble(x, 790, 800, 'i am SO mad | at you', k, { size: 42, tail: 'bl' })
      for (let i = 0; i < 3; i++) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 700 + i * 90, 960, 9 * pop01(t, P.t0 + 1.0 + i * 0.25, 0.25, 2.4))
    } },
  // 9 · stormed out
  { ...P_, cap: 'Stormed out. | Came back *for a hug.*', mood: lt => lt < 1.0 ? 'squint' : 'heart', tears: 3, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'forgot | something…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 990, 'IT WAS THE HUG', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: PINK, size: 34 })
      hearts(x, t, 480, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0354', key: 'D', accent: ACC, solo: 'pisces', ending: 'callback',
  title: 'Pisces when they’re | mad *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Mad? | *Mostly sad.*', mood: 'heart' },
  last: {
    text: 'The door got | *a thank-you card.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'pisces', 380, 1130, 300 * k, { mood: 'heart', look: [1, 0], seed: 33, hops: [t0 + 1.4], tears: 2 })
      drawBits(x, DOOR, DOOR_C, 760, 1110, 26 * k)
      label(x, 760, 1070, 'THANK YOU ♥', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.08 })
      hearts(x, t, 760, 960, t0 + 1.3, { n: 6, life: 2.0, spread: 220, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
