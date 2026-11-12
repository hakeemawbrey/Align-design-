// r2a0692: star_advice, ADVICE SOLO (pisces), "What a Pisces | *won’t say out loud.*" (signs3kit, lofi · F).
// Nine quiet Pisces truths, each with a warm reframe and one light gag. Pisces cries (gently) in every card. Ending: callback.
//   "i'm fine" = check on me · cried at an ad, big heart · needs a recharge after loving everyone · remembers your dreams
//   · wants you to ask twice · said sorry to a chair · sad songs on repeat · read everyone's chart but their own
//   · daydreams in meetings
//   group "Soft heart. | *Strong soul.*"
//   callback "The chair? | *Forgives you.*" (card 6's chair comes back with a heart)
import { makeFilm, sparkles, hearts, bubble, notes, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, zzz, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'pisces', ST = { x: -190 }
const CHAIR = ['WW......', 'WW......', 'WW......', 'WW......', 'WW......', 'WWWWWWWW', 'WWWWWWWW', 'WW....WW', 'WW....WW', 'WW....WW']
const CHAIR_C = { W: '#c98f5a' }
const BATT_LOW = ['KKKKKKKKKKKK.', 'KRRWWWWWWWWKK', 'KRRWWWWWWWWKK', 'KRRWWWWWWWWKK', 'KKKKKKKKKKKK.']

const CAMEOS = [
  { sign: S, cap: '“I’m fine” | means *check on me.*', tears: 2, mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i’m fine!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 800, 900, '(A HUG, PLEASE)', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 32)
      hearts(x, t, 800, 1050, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Cried at an ad? | That’s a *big heart.*', tears: 3, mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 830, 'A DOG GOT HOME', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.03, 24)
      L(x, 800, 1080, 'NOT WEAK. WARM.', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Loved everyone all day? | *Rest is allowed.*', tears: 2, mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BATT_LOW, { K: BONE, R: RED, W: NIGHT }, 800, 760, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BLANKET', 800, 960, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 800, 1100, 'RECHARGING…', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 32)
      if (lt > 1.4) zzz(x, t, 560, 700)
    } },
  { sign: S, cap: 'Remembers your dreams. | *Tell them yours.*', tears: 2, mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'the one with the dolphin?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      bits(x, 'CLOUD', 800, 880, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1080, 'LISTENS. REMEMBERS.', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, 0.04, 28)
    } },
  { sign: S, cap: 'Wants you to ask | *a second time.*', tears: 2, mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 650, 'how are you?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'br' })
      bubble(x, 790, 790, 'good!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      bubble(x, 800, 930, 'no, really?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'br' })
      L(x, 800, 1090, 'ASK AGAIN ✦', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Said sorry to a chair? | *Soft is strong.*', tears: 2, mood: 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 820, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 650, 'oh! sorry!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1100, 'POLITE TO FURNITURE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Sad song on repeat? | Feel it. *Then float.*', tears: 2, mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NOW PLAYING', headCol: ACC, lines: [['song 1', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['song 1 (again)', LAV, pop01(t, P.t0 + 0.8, 0.25, 2)], ['song 1 (again)', LAV, pop01(t, P.t0 + 1.1, 0.25, 2)]] })
      notes(x, t, 560, 680, { n: 3, cell: 6, col: ACC, seed: 1 })
      L(x, 800, 1100, 'NEXT: A HAPPY ONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Read everyone’s chart? | *Read yours, too.*', tears: 2, mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 620, 'FRIENDS: 14 CHARTS', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 28)
      L(x, 800, 1070, 'YOURS: STILL UNREAD', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Daydreaming in meetings? | *Dreamers build things.*', tears: 2, mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [0, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 800, 720, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'HOUSE', 800, 700, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 900, 'AGENDA ITEM 4', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, -0.04, 28)
      L(x, 800, 1070, 'ALSO: A CASTLE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
      sparkles(x, t, 800, 720, P.t0 + 1.3, 6, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0692', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'What a Pisces won’t | *say out loud.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong soul.*', mood: 'heart' },
  last: {
    text: 'The chair? | *Forgives you.*',
    draw(x, t, lt) {
      drawBits(x, CHAIR, CHAIR_C, 540, 1120, 30 * pop01(t, t - lt + 0.5, 0.4, 2))
      bubble(x, 760, 860, 'all good :)', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      hearts(x, t, 420, 1120, t - lt + 1.3, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
