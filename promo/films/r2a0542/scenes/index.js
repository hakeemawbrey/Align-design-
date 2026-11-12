// r2a0542: star_advice, ADVICE-SOLO (libra), "How to surprise | a Libra." (signs3kit social cut, music: lofi · F).
// Nine cards: a relatable Libra truth + a warm, specific idea, one visual gag each. Ending: callback (the table you booked).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -170 }
const SPK_C = { K: INK, S: LAV, W: BONE }

/** a little bouquet of pixel flowers */
function bouquet(x, cx, cy, k) {
  if (k <= 0.01) return
  const pos = [[-50, -40], [0, -70], [50, -40], [-25, 0], [25, 0]]
  pos.forEach(([dx, dy], i) => bits(x, 'FLOWER', cx + dx * k, cy + dy * k, 14 * k, { rot: (i - 2) * 0.12 }))
  x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 70 * k, cy + 30 * k); x.lineTo(cx + 70 * k, cy + 30 * k); x.lineTo(cx + 18 * k, cy + 150 * k); x.lineTo(cx - 18 * k, cy + 150 * k); x.fill()
  x.fillStyle = LAV; x.beginPath(); x.moveTo(cx - 62 * k, cy + 36 * k); x.lineTo(cx + 62 * k, cy + 36 * k); x.lineTo(cx + 12 * k, cy + 144 * k); x.lineTo(cx - 12 * k, cy + 144 * k); x.fill(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“Anywhere is fine!” | *Just book the table.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'anywhere is | fine! or…?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bits(x, 'TICKET', 790, 900, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 790, 1080, 'TABLE FOR 2: BOOKED', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Pretty things matter. | *Bring flowers.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bouquet(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2))
      hearts(x, t, 790, 760, P.t0 + 1.1, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 2 })
      L(x, 790, 1100, 'NO OCCASION NEEDED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Plan the whole day. | *Watch them glow.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 340, head: 'SATURDAY', headBg: PINK, headInk: INK, lines: ['10: brunch', '1: the gallery', '4: the park', '7: dessert'], size: 28, align: 'left', progress: prog(lt, 0.4, 1.3) })
      L(x, 790, 1110, 'DECISIONS: ZERO', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'A handwritten note | *beats anything.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LETTER', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1060, 'READ IT 40 TIMES', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 30)
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Remember what | *they looked at twice.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 790, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'you remembered?!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      sparkles(x, t, 790, 850, P.t0 + 1.3, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Surprise picnic? | *Matching blanket, please.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'APPLE', 760, 880, 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bits(x, 'COOKIE', 840, 890, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 680, 'AESTHETIC: ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 34)
    } },
  { sign: S, cap: 'Make them a playlist. | *Every song, them.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, ['KKKKKKK', 'KSSSSSK', 'KSKKKSK', 'KSKWKSK', 'KSKKKSK', 'KSSSSSK', 'KSKKKSK', 'KSKWKSK', 'KSKKKSK', 'KKKKKKK'], SPK_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) notes(x, t, 790, 760, { n: 5, cell: 7, col: PINK })
      L(x, 790, 1100, 'TRACK 1: YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Tell them what you love. | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'your laugh.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 790, 860, 'your taste.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      bubble(x, 790, 1040, 'all of it.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Dress up for no reason. | *They notice.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'STAR', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, ['KKKKK.KKKKK', 'KSSSKKKSSSK', 'KSSSK.KSSSK', '.KKK...KKK.'], { K: INK, S: '#6b62a8' }, 790, 800, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 1000, 'OCCASION: TUESDAY', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 30)
      sparkles(x, t, 790, 820, P.t0 + 1.4, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0542', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'How to surprise | *a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'A little effort. | *A lot of glow.*', mood: 'heart' },
  last: {
    text: 'You picked the table. | *They loved it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 400, 1080, 260 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], seed: 9, hops: [t0 + 1.2] })
      bits(x, 'TICKET', 740, 1050, 18 * pop01(t, t0 + 0.6, 0.3, 2))
      L(x, 740, 1220, 'ZERO DECIDING', pop01(t, t0 + 1.1, 0.3, 2.4), MINT, -0.04, 32)
      hearts(x, t, 560, 980, t0 + 1.3, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
