// v3t098: THE SIGNS AS… v3, SOLO film, "Dating a Pisces | be like." (~55 s vertical, signs3kit social cut, lofi · E)
// One sign the whole way: nine dating moments, each the most extreme (and lovable) Pisces version. Pisces cries in every
// card. Ending: 'lesson'.
//   0.0–3.6    "Dating a Pisces | *be like.*"
//   3.6–37.8   named the restaurant table · remembers your first text word for word · cried at the trailers
//              · a nine-hour playlist · dreamt about you, told you in detail · you got a haircut, happy tears
//              · fed every stray on the walk home · checked your horoscope before theirs · a forty-minute goodbye
//  37.8        "Soft. Dreamy. | *All heart.*"
//  41.0        LESSON: "Love a Pisces gently. | They feel *everything.*"  STATUS: SWOONING
//  46.9        "Bring tissues. | Bring *two.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURP = '#b7a6ff'
const TABLE = [
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
  '.....B.....',
  '.....B.....',
  '....BBB....',
]
const CAT = [
  'K...K.',
  'KK.KK.',
  'KKKKK.',
  'KWKWK.',
  'KKKKK.',
  '.KKKKK',
  '.KKKKK',
  '.K.K.K',
]
const SCISSORS = [
  'S.....S',
  '.S...S.',
  '..S.S..',
  '...S...',
  '..R.R..',
  '.R...R.',
  '.R...R.',
  '..R.R..',
]
const PLAY = (n) => [`♪ song ${n}`]

// a playlist card that keeps scrolling
function playlist(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -190, 320, 380)
  x.fillStyle = '#2a2350'; x.fillRect(-152, -182, 304, 364)
  x.fillStyle = PURP; x.fillRect(-152, -182, 304, 70)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FOR YOU ♡', 0, -148)
  x.save(); x.beginPath(); x.rect(-152, -112, 304, 260); x.clip()
  const off = (lt * 90) % 52
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  for (let i = 0; i < 7; i++) { x.fillStyle = i % 2 ? BONE : '#d8d0ff'; x.fillText(`${i + 1 + Math.floor(lt * 90 / 52)}. a song about u`, -134, -84 + i * 52 - off) }
  x.restore()
  x.fillStyle = GOLD; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText(`${Math.min(9, 1 + Math.floor(lt * 4))}h 02m`, 0, 166)
  x.restore()
}
// a horoscope page with two sign headings, theirs crossed to second place
function horoscope(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -170, 320, 340)
  x.fillStyle = '#fff4e2'; x.fillRect(-152, -162, 304, 324)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY’S STARS', 0, -126)
  x.textAlign = 'left'; x.font = `800 26px ${INTER}`
  x.fillStyle = '#e23d4e'; x.fillText('1. YOURS ♡', -130, -66)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 3; i++) x.fillRect(-130, -36 + i * 22, 250 - i * 40, 10)
  x.fillStyle = INK; x.fillText('2. mine (later)', -130, 70)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 2; i++) x.fillRect(-130, 100 + i * 22, 220 - i * 50, 10)
  x.restore()
}

const S = 'pisces'
const CAMEOS = [
  { sign: S, cap: 'First date. | They *named the table.*', mood: 'heart', tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TABLE, { W: '#fff4e2', B: '#8a4a2e' }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 820, 'THIS IS GERALD', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: PURP, rot: -0.05 })
      bubble(x, 790, 650, 'he’s ours now', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Remembers your first text. | *Word for word.*', mood: 'sparkle', tears: 2, star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, '“hey :)” | 9:14 p.m.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 900, 'ALSO THE WEATHER', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 30, bg: SKYB, rot: 0.05 })
      hearts(x, t, 790, 1040, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Movie night. | Cried *at the trailers.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 780); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#0d0a24'; x.fillRect(-160, -100, 320, 200); x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('COMING SOON', 0, 0); x.restore() }
      label(x, 790, 1000, 'MOVIE: NOT STARTED', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Made you a playlist. | It’s *nine hours long.*', mood: 'heart', tears: 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { playlist(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt) } },
  { sign: S, cap: 'Dreamt about you. | Told you *in detail.*', mood: 'sparkle', tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      const L = ['so we were whales—', 'and you had a hat—', 'part 3 of 12…']
      bubble(x, 780, 680, L[Math.min(2, Math.floor(lt * 1.4))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: PURP, tail: 'bl' })
      label(x, 790, 900, 'BREAKFAST: COLD', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'You got a haircut. | *Happy tears.*', mood: 'heart', tears: 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCISSORS, { S: '#d8dbe8', R: '#ff6b5a' }, 790, 760, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      bubble(x, 790, 980, 'you look | SO different', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 620, 'TRIMMED: 1 CM', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 28, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Fed every stray | on the *walk home.*', mood: 'heart', tears: 2, star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, CAT, { K: ['#2a2350', '#ffb34a', '#efe6d6', '#9aa5c4', '#8a4a2e'][i], W: GOLD }, 660 + (i % 3) * 120, 900 + Math.floor(i / 3) * 140, 12 * pop01(t, P.t0 + 0.3 + i * 0.22, 0.3, 2.2), { outline: BONE })
      label(x, 790, 680, 'HOME BY: MIDNIGHT', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Reads your horoscope | *before theirs.*', mood: 'sparkle', tears: 1, star: { x: -170 },
    front(x, t, lt, P) { horoscope(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt) } },
  { sign: S, cap: 'Said goodbye at the door. | *For forty minutes.*', mood: 'wide', tears: 3, star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'ok bye. | …ok but bye', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 880, `GOODBYE #${1 + Math.floor(lt * 9)}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: PINK, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t098', key: 'E', accent: PURP, solo: S, ending: 'lesson',
  title: 'Dating a Pisces | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Soft. Dreamy. | *All heart.*', mood: 'heart' },
  lesson: { text: 'Love a Pisces gently. | They feel *everything.*', chip: 'STATUS: SWOONING' },
  last: { text: 'Bring tissues. | Bring *two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
