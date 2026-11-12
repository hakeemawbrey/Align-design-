// r2a0770: star_advice, ADVICE SOLO (pisces), "Pisces, it's okay | *to miss them.*" (signs3kit social cut, lofi · G).
// One sign the whole way: nine gentle truths about missing someone, each with a warm reframe and one light gag.
// Pisces cries in every card (it's Pisces). Ending: card (lesson + last line over the match card: Pisces + Cancer, the
// friend who helped carry the feelings).
//   saved voice notes, played forty times · cried at a song in the shop (aisle 7: emotional) · made too much pasta,
//   share it · missing them on a Tuesday · bought their snack out of habit · missing them means it mattered
//   · three boxes of tissues, also water · a friend holds some of it · sad and grateful, both true
//   lesson "Missing someone means | *you loved well.*"   last "Your match? | *Cries with you.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -180 }
const BIGHEART = ['.HH...HH.', 'HHHH.HHHH', 'HWHHHHHHH', 'HHHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
const GLASS = ['W......W', 'W......W', 'WBBBBBBW', 'WBBBBBBW', 'WBBBBBBW', 'WBBBBBBW', '.WBBBBW.', '.WWWWWW.']
const SNACK = ['.KKKKKKKK.', 'KRRRRRRRRK', 'KRRYYYYRRK', 'KRYYRRYYRK', 'KRRYYYYRRK', 'KRRRRRRRRK', '.KKKKKKKK.']

const CAMEOS = [
  { sign: S, cap: 'Replaying their voice notes? | *That’s love.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, tears: 2,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 39)
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'VOICE NOTES', headCol: ACC, lines: [['▶ 0:43', LAV, 1], ['▶ 0:12', LAV, 1], ['▶ 1:07', LAV, 1], ['▶ 0:31', MINT, 1]], size: 26 })
      L(x, 800, 1100, `PLAYED: ${n} TIMES`, pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Cried at a song in a shop? | *Totally normal.*', mood: 'wide', star: ST, tears: 3,
    front(x, t, lt, P, F) {
      notes(x, t, 760, 880, { n: 5, cell: 9, col: ACC, alpha: clamp((lt - 0.2) * 2) })
      bits(x, 'CART', 780, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 780, 660, 'AISLE 7: EMOTIONAL', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 30)
      L(x, 770, 1110, 'CASHIER: ALSO CRYING', pop01(t, P.t0 + 1.7, 0.3, 2.2), SKYB, 0.04, 26)
    } },
  { sign: S, cap: 'Made way too much pasta? | *Share it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, tears: 1,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 720, 1000, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 720, 950, { n: 3, alpha: 0.7, h: 110 })
      friend(x, t, 'taurus', 880, 960, 170, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.5] })
      bubble(x, 810, 720, 'i’ll be | right over', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: S, cap: 'Missing them on a Tuesday? | *Feelings skip calendars.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, tears: 2,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'THIS WEEK', headBg: ACC, headInk: INK, lines: ['mon: miss them', 'tue: miss them', 'wed: ok actually', 'thu: miss them'], size: 28, progress: clamp((lt - 0.3) / 1.3) })
      L(x, 800, 1100, 'ALL VALID', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Bought their snack again? | *Enjoy it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, tears: 1,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNACK, { K: INK, R: '#ff6b8a', Y: GOLD }, 800, 870, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      L(x, 800, 660, 'THEIR FAVOURITE', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1090, 'NOW YOURS TOO', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'It hurts because | *it mattered.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST, tears: 2,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), b = 1 + 0.06 * Math.sin(t * 6)
      drawBits(x, BIGHEART, { H: PINK, W: '#fff' }, 800, 860, 24 * k * b)
      L(x, 800, 1090, 'MATTERED: A LOT', pop01(t, P.t0 + 1.2, 0.3, 2.2), ACC, 0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Need a big cry? | *Then drink some water.*', mood: 'wide', star: ST, tears: 3, hops: [1.5],
    front(x, t, lt, P) {
      const w = lt > 1.2
      bits(x, 'TISSUE', 730, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (w) drawBits(x, GLASS, { W: BONE, B: SKYB }, 880, 900, 16 * pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.4))
      L(x, 790, 680, 'TISSUES: 3 BOXES', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 790, 1100, 'HYDRATED. PROUD.', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Feeling it all at once? | *Let a friend help.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, tears: 2,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 790, 960, 220, pop01(t, P.t0 + 0.35, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.2], tears: 1 })
      L(x, 790, 1120, 'FEELINGS: SHARED', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Missing them, still smiling? | *Both can be true.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, tears: 1,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      swapLabel(x, 770, 800, lt, 1.0, 'SAD', 'SAD + GRATEFUL', { size: 36, fromBg: SKYB, toBg: GOLD })
      L(x, 790, 1040, 'THAT’S ALLOWED', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
      sparkles(x, t, 790, 800, P.t0 + 1.5, 7, 170, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0770', key: 'G', accent: ACC, solo: S, ending: 'card',
  title: 'Pisces, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Soft heart. | *Strong heart.*', mood: 'heart' },
  lesson: { text: 'Missing someone means | *you loved well.*', chip: 'HEART: STILL OPEN' },
  last: {
    text: 'Your match? | *Cries with you.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
