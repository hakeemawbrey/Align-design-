// r2a0453: star_advice, ADVICE SOLO, "Pisces, crying | is allowed." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign (solo, 9 cards; Pisces cries in every one): a relatable Pisces-crying truth + a warm reframe. Ending: callback.
//   cried at an ad (open heart) · happy tears count too · cried at the birthday song (that's love) · a cry on the to-do list
//   · cried in the car (best concert hall) · tears + sunshine = a rainbow · tears watered the flower · after a cry: snacks
//   and a blanket · someone cries with you (Cancer): keep them
//  group "Soft is | *strong.*"   callback "The rainbow? | *Still there.*" (card 6's rainbow comes back over a happy Pisces)
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'pisces', L = { x: -180 }, SEA = '#7fb8ff'
const TV = ['KKKKKKKKKKK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KKKKKKKKKKK', '...K...K...']
const WHEEL = ['...WWWWW...', '.WW.....WW.', 'W.........W', 'W..WWWWW..W', 'WWWW...WWWW', 'W....W....W', '.W...W...W.', '...WWWWW...']

function rainbow(x, cx, cy, k, r = 170) {
  if (k <= 0.01) return
  const C = [RED, ORANGE, GOLD, MINT, SKYB, LAV]
  x.save(); x.translate(cx, cy); x.scale(k, k); x.lineWidth = 20
  x.strokeStyle = INK; x.lineWidth = 6 * 20 + 10; x.beginPath(); x.arc(0, 0, r - 50, Math.PI, 0); x.stroke()
  C.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 20; x.beginPath(); x.arc(0, 0, r - i * 20, Math.PI, 0); x.stroke() })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Cried at an ad? | *Your heart is open.*', mood: 'wide', tears: 3, look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TV, { K: INK, S: '#3a5a9a' }, 800, 880, 24 * k)
      if (k > 0.5) { bits(x, 'heart', 800, 860, 12 * k) }
      label(x, 800, 1090, 'AD: 30 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Happy tears count. | *So do sad ones.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: 2, look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'sun', 720, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'moon', 900, 860, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 810, 1080, 'BOTH VALID', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cried at the birthday song? | *That’s love.*', mood: 'heart', tears: 3, look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'balloon', 760, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bits(x, 'balloon', 880, 830, 18 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.1 })
      notes(x, t, 820, 760, { n: 4, cell: 6, col: PINK, seed: 3, alpha: clamp((lt - 0.4) * 3) })
      label(x, 810, 1110, 'VERSE 1: SOBBING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Need a good cry? | *Pencil it in.*', mood: 'happy', tears: 1, look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'water plants | call mum | big cry ✓', { head: 'TO-DO', headBg: SEA, size: 34, w: 330, rot: 0.04 })
      sparkles(x, t, 800, 960, P.t0 + 1.4, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Cried in the car? | *Best concert hall.*', mood: 'wide', tears: 3, look: [1, -1], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, WHEEL, { W: '#c9c9d8' }, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(lt * 4) })
      notes(x, t, 800, 780, { n: 5, cell: 7, col: GOLD, seed: 1, alpha: clamp((lt - 0.4) * 3) })
      label(x, 800, 1110, 'ENCORE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tears plus sunshine? | *A rainbow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', tears: 2, look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'sun', 870, 720, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      rainbow(x, 780, 1010, 0.8 * pop01(t, P.t0 + 0.8, 0.4, 1.8))
      sparkles(x, t, 800, 880, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Your tears | *watered the flowers.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: 2, look: [1, 0], star: L,
    front(x, t, lt, P) {
      const g = 0.4 + 0.6 * prog(lt, 0.4, 1.4)
      bits(x, 'flower', 800, 1060 - 60 * g, 22 * g * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 690, 'BLOOMING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'After a cry? | *Snacks and a blanket.*', mood: 'sleepy', tears: 1, look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'pillow', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'cookie', 800, 800, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 800, 1120, 'RECOVERY MODE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone cries with you? | *Keep them.*', mood: 'heart', tears: 3, look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 970, 200 * k, { mood: 'heart', look: [-1, 0], seed: 35, glyph: false, tears: 3 })
      hearts(x, t, 680, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 6 })
      label(x, 800, 690, 'CRY BUDDY ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0453', key: 'C', accent: SEA, solo: S, ending: 'callback',
  title: 'Pisces, crying | *is allowed.*',
  cameos: CAMEOS,
  group: { cap: 'Soft is | *strong.*', mood: 'heart' },
  last: {
    text: 'The rainbow? | *Still there.*',
    draw(x, t, lt) {
      const t0 = t - lt
      rainbow(x, 540, 1250, 1.6 * pop01(t, t0 + 0.4, 0.45, 1.8))
      const s = pop01(t, t0 + 0.8, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, S, 540, 1180, 280 * s, { mood: 'sparkle', seed: 44, tears: 2, hops: [t0 + 1.5] })
      sparkles(x, t, 540, 1100, t0 + 1.2, 10, 300, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
