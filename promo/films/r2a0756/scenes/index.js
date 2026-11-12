// r2a0756: star_advice, ADVICE SOLO (cancer), "How to thank | *a Cancer.*" (signs3kit social cut, lofi · D).
// One sign the whole way: nine kind ways to thank the friend who looks after everyone, each with one light gag.
// Ending: callback (the tupperware from card 1 comes back, full of cookies).
//   return the tupperware, full · remember one thing back · say it out loud (they'll replay it) · write it down
//   (they'll laminate it) · ask about their day, then listen · hug them first · cook for them, even badly
//   · use the gift they gave you, visibly · tell them they feel like home
//   group "Big heart. | *Say it back.*"   last "Tupperware returned: | *full of cookies.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, B, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }
const BURNT = { B: '#3a2a20', P: BONE }
const PANCAKE = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..PPPPPPPP..']

const CAMEOS = [
  { sign: S, cap: 'They fed you all week? | Return the *tupperware.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'TUPPER', 800, 1040 - i * 84, 14 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2))
      L(x, 800, 660, 'BORROWED: 4', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 800, 1140, 'RETURNED: ALL 4', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'They remember everything. | *Remember one thing back.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 280, head: 'NOTE TO SELF', headBg: GOLD, headInk: INK, lines: ['their tea:', 'lemon, two', 'sugars ♥'], size: 32, progress: prog(lt, 0.4, 1.2) })
      L(x, 800, 1110, 'CANCER: STUNNED', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Say “thank you” out loud. | They’ll *replay it.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'thank you, | truly.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const n = Math.floor(clamp((lt - 0.9) / 1.3) * 312)
      L(x, 800, 920, `REPLAYS: ${n}`, pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 38)
      L(x, 800, 1060, 'TONIGHT: 313', pop01(t, P.t0 + 1.8, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Write it on paper. | They’ll *laminate it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lam = lt > 1.2
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 290, h: 300, rot: 0.04, lines: ['thanks for', 'always being', 'there. x'], size: 32, progress: prog(lt, 0.3, 1.0) })
      if (lam) { x.save(); x.globalAlpha = 0.35 * pop01(t, P.t0 + 1.2, 0.3, 2); x.fillStyle = '#e8fbff'; x.translate(800, 850); x.rotate(0.04); x.fillRect(-172, -182, 344, 364); x.fillStyle = '#ffffff'; x.fillRect(-150, -160, 60, 200); x.restore() }
      L(x, 800, 1100, 'LAMINATED. TWICE.', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 30)
      sparkles(x, t, 800, 850, P.t0 + 1.25, 7, 190, 0.2)
    } },
  { sign: S, cap: 'Ask about their day. | Then *really listen.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 820, 960, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 820, 700, 'how was | YOUR day?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 600, 1120, 'SOMEONE ASKED?!', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Hug them first. | *For once.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -120 }, hops: [1.0],
    front(x, t, lt, P) {
      const d = ease.outCubic(clamp((lt - 0.3) / 0.6))
      friend(x, t, 'gemini', lerp(900, 630, d), 900, 230, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      hearts(x, t, 540, 760, P.t0 + 1.0, { n: 7, life: 1.8, spread: 220, cell: 8, seed: 2 })
      L(x, 540, 1130, 'HUG: RECEIVED (FINALLY)', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.03, 28)
    } },
  { sign: S, cap: 'Cook them dinner. | *Even badly.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PANCAKE, BURNT, 800, 980 - i * 40, 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      steam(x, t, 800, 880, { n: 3, alpha: 0.5, h: 130 })
      L(x, 800, 680, 'CHEF: TRIED', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 800, 1110, 'TASTES LIKE LOVE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Use the gift they gave you. | *Visibly.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const Fr = friend(x, t, 'leo', 820, 930, 230, k, { mood: 'sparkle', look: [-1, 0] })
      if (Fr) bits(x, 'SCARF', 830, Fr.cy + 82, 12 * k)
      L(x, 820, 680, 'HANDKNIT BY CANCER', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 28)
      L(x, 820, 1130, 'WORN IN JULY', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Tell them they feel | like *home.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 860, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 800, 720, P.t0 + 1.0, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 4 })
      L(x, 800, 1110, 'CRAB: MELTED', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ff8a6a', -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0756', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'How to thank | *a Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Say it back.*', mood: 'heart' },
  last: {
    text: 'Tupperware returned: | *full of cookies.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'TUPPER', 540, 1080, 30 * pop01(t, t0 + 0.5, 0.4, 2))
      for (let i = 0; i < 4; i++) bits(x, 'COOKIE', 400 + i * 92, 1010 - (i % 2) * 20, 10 * pop01(t, t0 + 1.0 + i * 0.15, 0.3, 2.4))
      hearts(x, t, 540, 900, t0 + 1.5, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
