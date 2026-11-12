// r2a0625: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, you’re | *not too much.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine gentle truths about a "too much" Sagittarius, each with a warm reframe and one light gag.
// Ending: callback (the dog from card 7 comes back: the dogs already miss you).
//   the big laugh · fifty tabs open · the same story twice · befriended the waiter · a list of huge ideas
//   · danced in aisle five · said hi to every dog · asked everyone's sign · planned a road trip, friends said yes
//   group "Big laugh. | *Bigger heart.*"   last "The dogs | *already miss you.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -190 }
const DOG = ['BB.......', 'BBBB.....', 'BKBB.....', 'BBBBBBBB.', '.BBBBBBBB', '.BBBBBBBB', '.B.B..B.B', '.B.B..B.B']
const dog = (x, t, cx, cy, cell, k) => { if (k <= 0.01) return; drawBits(x, DOG, { B: '#c98f5a', K: INK }, cx, cy, cell * k); x.save(); x.fillStyle = '#c98f5a'; x.fillRect(cx + 4 * cell * k + Math.sin(t * 14) * 6, cy - 2 * cell * k, cell * k, cell * 1.6 * k); x.restore() }

const CAMEOS = [
  { sign: S, cap: 'Laughed too loud? | *That laugh is a gift.*', mood: lt => lt > 0.6 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 780, 'HA!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 110, col: GOLD, tail: 'bl' })
      L(x, 800, 1070, 'ROOM: BRIGHTER', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Fifty tabs open? | *A curious mind is fun.*', mood: 'sparkle', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 10)
      for (let i = 0; i < n; i++) { x.fillStyle = [PINK, GOLD, MINT, LAV, SKYB][i % 5]; x.fillRect(672 + i * 25, 800, 20, 16) }
      L(x, 800, 690, `TABS: ${Math.max(1, n * 5)}`, pop01(t, P.t0 + 0.4, 0.3, 2), ACC, 0.05, 40)
    } },
  { sign: S, cap: 'Told the same story twice? | *We still love it.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'so ANYWAY…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 920, 'STORY: AGAIN', pop01(t, P.t0 + 0.9, 0.3, 2.2), BONE, -0.04, 36)
      L(x, 800, 1070, 'STILL GREAT', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.05, 36)
    } },
  { sign: S, cap: 'Befriended the waiter? | *Your warmth is rare.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 820, 960, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0] })
      bits(x, 'PLATE', 820, 800, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 650, 'new best friend', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Too many big ideas? | *Write them all down.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'IDEAS', headBg: ACC, headInk: INK, lines: ['1. learn sailing', '2. open a café', '3. yodel?', '4. all of it'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.4) })
    } },
  { sign: S, cap: 'Danced in the supermarket? | *Keep dancing.*', mood: 'sparkle', look: [1, 0], squash: lt => 0.08 * Math.sin(lt * 10), star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      notes(x, t, 600, 880, { n: 4, cell: 8, col: ACC, seed: 3 })
      bits(x, 'CART', 800, 1010, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'AISLE 5: DANCE FLOOR', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Said hi to every dog? | *They love you back.*', mood: 'heart', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      dog(x, t, 800, 1010, 22, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'hi, friend!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 810, 940, P.t0 + 1.1, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 7 })
    } },
  { sign: S, cap: 'Asked everyone’s sign? | *That’s connection.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 800, 1070, 'wait, a sag too?!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: ACC, tail: 'bl' })
    } },
  { sign: S, cap: 'Planned a road trip? | *Your people said yes.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 770, 660, 'ROAD TRIP: SATURDAY', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 30)
      ;['gemini', 'leo', 'pisces'].forEach((id, i) => friend(x, t, id, 660 + i * 105, 960, 120, pop01(t, P.t0 + 0.6 + i * 0.2, 0.3, 2), { mood: 'happy', look: [-1, 0], tears: id === 'pisces' ? 1 : 0, seed: 60 + i }))
      bubble(x, 800, 1130, 'we’re in!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0625', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Sagittarius, you’re | *not too much.*',
  cameos: CAMEOS,
  group: { cap: 'Big laugh. | *Bigger heart.*', mood: 'heart' },
  last: {
    text: 'The dogs | *already miss you.*',
    draw(x, t, lt) {
      dog(x, t, 540, 1180, 24, pop01(t, t - lt + 0.6, 0.35, 2))
      hearts(x, t, 540, 1080, t - lt + 1.0, { n: 7, life: 2, spread: 300, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
