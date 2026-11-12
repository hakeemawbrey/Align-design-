// r2t0540: star_talk, SOLO (cancer), "Cancer’s plans | *be like.*" (topic: Cancers making plans be like; shortened to fit
// one line). signs3kit social cut, music: lofi · F. Ending: lesson.
//   dinner at their place, every time · a 47-message group chat for a picnic · snacks labelled by name
//   · cancelled to stay in, baked a sorry cake · a reunion (we saw each other Tuesday) · a blanket, to the cinema
//   · "home safe??" text six of six · the scrapbook, made before the trip · home four minutes, misses everyone
//   group "Homebody. | *Host of the year.*"   lesson "Their plans are | *love, scheduled.*"   last "The blanket? | *Already in the car.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, calendar, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -180 }
const BLANKET = ['PPWPPWPPWPP', 'PPWPPWPPWPP', 'WWWWWWWWWWW', 'PPWPPWPPWPP', 'PPWPPWPPWPP', 'WWWWWWWWWWW', 'PPWPPWPPWPP', 'PPWPPWPPWPP']
const BLANKET_C = { P: '#ff8fb1', W: PAPER }
const POPCORN = ['.W.W.W.', 'WWWWWWW', 'RWRWRWR', 'RWRWRWR', '.RWRWR.', '.RWRWR.']
const POPCORN_C = { W: '#fff4e2', R: RED }

const CAMEOS = [
  { sign: S, cap: 'Dinner at their place. | *Every single time.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'house', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 650, 'VENUE: MY COUCH', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1090, 'AGAIN ♥︎', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made a group chat. | *For one picnic.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 3 + Math.floor(clamp((lt - 0.2) / 1.8) * 44)
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: 'PICNIC PLANNING', msg: `${n} new | messages`, bg: MINT })
      label(x, 800, 620, 'PICNIC: IN 3 WEEKS', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Packed snacks for everyone. | *Labelled by name.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const names = ['SAM', 'JO', 'ALEX', 'YOU']
      names.forEach((nm, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2); const cx = 720 + (i % 2) * 170, cy = 820 + Math.floor(i / 2) * 210; bits(x, 'cookie', cx, cy, 14 * k); label(x, cx, cy + 80, nm, k, { size: 26, bg: PAPER, rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 }) })
    } },
  { sign: S, cap: 'Cancelled to stay in. | *Baked a sorry cake.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'so sorry, | staying in!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bits(x, 'cake', 800, 920, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 1100, 'APOLOGY: 3 LAYERS', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Planned a reunion. | *We met on Tuesday.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      calendar(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'REUNION', 'THU', { topBg: PINK })
      bubble(x, 800, 1125, 'it’s been | two days!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Brought a blanket. | *To the cinema.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BLANKET, BLANKET_C, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      drawBits(x, POPCORN, POPCORN_C, 800, 760, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 800, 620, 'SEAT 14: COSY', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked you got home. | *Six times.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.3))
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '11:12', head: `TEXT ${n} OF ${n}`, msg: 'home safe??', bg: PINK })
      bubble(x, 800, 1120, 'you left | 4 min ago', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Made the scrapbook. | *Before the trip.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'book', 800, 880, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.05 })
      label(x, 800, 650, 'OUR TRIP: VOL. 1', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'TRIP: NEXT MONTH', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Home after the plans. | *Misses everyone.*', mood: lt => lt > 1.2 ? 'wide' : 'sleepy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'miss you | guys already', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      label(x, 800, 950, 'HOME FOR: 4 MIN', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0540', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Cancer’s plans | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Homebody. | *Host of the year.*', mood: 'heart' },
  lesson: { text: 'Their plans are | *love, scheduled.*', chip: 'INVITE: ACCEPTED' },
  last: {
    text: 'The blanket? | *Already in the car.*',
    draw(x, t, lt) { drawBits(x, BLANKET, BLANKET_C, 820, 1180, 18 * pop01(t, t - lt + 0.7, 0.35, 2), { rot: -0.06 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
