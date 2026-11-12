// r2a0483: star_advice, ADVICE SOLO, "What Cancers need | from a friend." (~51 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole way: nine small things a Cancer needs from a friend, each a relatable truth with
// a warm reframe and one light gag. Ending: lesson.
//   0.0–3.6    "What Cancers need | *from a friend.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a text back, even "same" · remember their dog's birthday · come over, no reason · let them feed you
//              · laugh at the old story again · a check-in after the hard day · hug them first for once · notice
//              the haircut · say "I'm glad you're here"
//  37.8        "Small things. | *Huge to a Cancer.*"  Cancer comes back, big.
//  41.0        LESSON UNLOCKED: "Care for the carer. | They’ll *never forget it.*"  FRIEND: FOREVER
//  46.9        "They’ll remember | *your dog’s birthday too.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', SILVER = '#cfe3ff'
const S = 'cancer'

const DOG = [
  '....H.......',
  '...HHH......',
  '..HHPHH.....',
  '.BB...BB....',
  'BBBBBBBB....',
  'BWKBBWKB....',
  'BBBBBBBBBBB.',
  '.BBNNBBBBBBB',
  '..BBBBBBBBB.',
  '..BB.BB.BB..',
]
const DOG_C = { H: GOLD, P: PINK, B: '#d8a060', W: PAPER, K: INK, N: '#2a1a12' }
const DISH = [
  '..W..W..W..',
  'RRRRRRRRRRR',
  'YYYYYYYYYYY',
  'RRRRRRRRRRR',
  'YYYYYYYYYYY',
  'BBBBBBBBBBB',
  '.BBBBBBBBB.',
]
const DISH_C = { W: '#d8dbe8', R: '#e8604a', Y: '#ffd27a', B: '#5fb8d0' }
const DOOR = [
  'KKKKKKKKKK',
  'KWWWWWWWWK',
  'KWOOOOOOWK',
  'KWOOOOOOWK',
  'KWOOOOOOWK',
  'KWOOOOOGWK',
  'KWOOOOOOWK',
  'KWOOOOOOWK',
  'KWOOOOOOWK',
  'KWWWWWWWWK',
]
const DOOR_C = { K: INK, W: PAPER, O: '#ff9a7a', G: GOLD }
const ALBUM = [
  'PPPPPPPPPPPP',
  'PWWWWPPWWWWP',
  'PWSSWPPWHHWP',
  'PWSSWPPWHHWP',
  'PWWWWPPWWWWP',
  'PPPPPPPPPPPP',
]
const ALBUM_C = { P: '#8a4a2e', W: PAPER, S: SKYB, H: PINK }
const SCISSORS = ['W....W', '.W..W.', '..WW..', '..WW..', '.R..R.', 'R....R', '.R..R.']

// a phone with a short thread
function phone(x, cx, cy, k, rows, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -156, 216, 312)
  x.font = `800 30px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  rows.forEach((m, i) => {
    if (lt < m.at) return
    const w = x.measureText(m.text).width + 30, by = -126 + i * 80
    const bx = m.me ? 96 - w : -96
    x.fillStyle = m.me ? '#5b8cff' : BONE; x.fillRect(bx, by, w, 56)
    x.fillStyle = m.me ? '#fff' : INK; x.fillText(m.text, bx + 15, by + 29)
  })
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'A text back. | *Even just “same.”*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), [{ at: 0.3, text: 'long day…', me: true }, { at: 0.5, text: 'so tired', me: true }, { at: 1.0, text: 'same.', me: false }], lt)
      label(x, 790, 700, 'FEELING: SEEN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remember the small dates. | *Like the dog’s birthday.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 800, 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, 'BISCUIT TURNS 3', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 960, P.t0 + 1.1, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Come over. | *No reason needed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 940, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1150, 'WELCOME · ALWAYS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
      bubble(x, 800, 700, 'kettle’s on!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Let them feed you. | *It’s how they hug.*', mood: 'heart', look: [1, 0], star: STAR,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DISH, DISH_C, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1150, 'SECONDS: ALREADY SERVED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 920, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Hear the old story. | *Again. Gladly.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, ALBUM, ALBUM_C, 790, 970, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = Math.min(41, 30 + Math.floor(lt * 6))
      label(x, 790, 760, `TOLD: ${n} TIMES`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1140, 'still funny!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'A check-in | *after the hard day.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'hey. you | okay?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, tail: 'bl' })
      bubble(x, 790, 980, 'i’m here.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      hearts(x, t, 470, 820, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Hug them first. | *For once.*', mood: 'heart', look: [1, 0], star: { x: -120 }, hops: [1.0],
    front(x, t, lt, P) {
      const slide = ease.outCubic(prog(lt, 0.3, 0.9))
      signChar(x, t, 'aries', lerp(900, 660, slide), 900, 230, { mood: lt > 0.9 ? 'heart' : 'sparkle', look: [-1, 0], seed: 21, glyph: false, pop: pop01(t, P.t0 + 0.2, 0.3, 2) })
      label(x, 760, 1130, 'HUGGED: FIRST', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.0, { n: 6, life: 1.6, spread: 260, cell: 8, seed: 7 })
    } },
  { sign: S, cap: 'Notice the new haircut. | *They’ll glow all week.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SCISSORS, { W: '#cfe3ff', R: RED }, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 * Math.sin(t * 6) })
      bubble(x, 800, 730, 'love the hair!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1140, 'GLOW: 7 DAYS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 420, 860, P.t0 + 1.3, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Say it out loud: | *“Glad you’re here.”*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 800, 'glad you’re | here.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 1060, 'HAPPY TEARS: YES', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    }, tears: lt => lt > 1.2 ? 1 : 0 },
]

const F = makeFilm({
  id: 'r2a0483', key: 'C', accent: SILVER, solo: S, ending: 'lesson',
  title: 'What Cancers need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Small things. | *Huge to a Cancer.*', mood: 'heart' },
  lesson: { text: 'Care for the carer. | They’ll *never forget it.*', chip: 'FRIEND: FOREVER' },
  last: { text: 'They’ll remember | *your dog’s birthday too.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
