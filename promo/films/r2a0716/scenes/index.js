// r2a0716: star_advice, ADVICE SOLO (libra), "Libra, peace isn't | keeping quiet." (signs3kit social cut, lofi · D).
// One sign the whole way: nine gentle truths for a Libra who keeps the peace by swallowing their own voice, each with a
// warm reframe and one light gag. Ending: callback (the dinner pick hidden in a box finally comes out).
//   "it's fine" → kinda hurt · dinner pick kept in a box · nodded through a no · the sponge that soaks up everyone's
//   storm · hints vs one honest talk · disagreed with Aries, still friends · boundaries list (naps sacred)
//   · balance includes you · your voice is part of the harmony
//   group "Speak up. | Still lovely."   last "Finally said “thai.” | So did everyone."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, rain, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fd0', S = 'libra', ST = { x: -190 }
const SPONGE = ['YYYYYYYYYY', 'YOYYYOYYOY', 'YYYOYYYYYY', 'YOYYYYOYYY', 'YYYYOYYYOY', 'YYOYYYYYYY', 'GGGGGGGGGG', 'GGGGGGGGGG']
const SPONGE_C = { Y: '#ffe27a', O: '#e8b84a', G: '#5fd068' }

/** the box with a little bubble trying to get out; open = 0…1 lifts the lid */
function pickBox(x, cx, cy, k, open, text, bk) {
  if (k <= 0.01) return
  bits(x, 'BOX', cx, cy, 22 * k)
  x.save(); x.translate(cx - 110 * k, cy - 66 * k - open * 60 * k); x.rotate(-open * 0.5)
  x.fillStyle = INK; x.fillRect(-6, -6, 232 * k, 34 * k); x.fillStyle = '#c98f5a'; x.fillRect(0, 0, 220 * k, 22 * k)
  x.restore()
  if (bk > 0.01) bubble(x, cx + 10, cy - 170 - 30 * bk, text, bk, { size: 46, col: MINT, tail: 'bc' })
}

const CAMEOS = [
  { sign: S, cap: '“It’s fine” | isn’t *a feeling.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'it’s fine :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      swapLabel(x, 800, 900, lt, 1.0, 'FINE', 'KINDA HURT', { size: 38, fromBg: STEEL, toBg: PINK })
      L(x, 800, 1080, 'SAY THAT ONE', pop01(t, P.t0 + 1.9, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Hid your dinner pick? | *Let it out.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shake = lt < 1.3 ? Math.sin(t * 30) * 4 : 0
      pickBox(x, 800 + shake, 980, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outBack(clamp((lt - 1.2) / 0.4)), 'thai?', pop01(t, P.t0 + 1.3, 0.25, 2.2))
      L(x, 800, 1140, 'MY PICK (SECRET)', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 28)
    } },
  { sign: S, cap: 'Nodded through a no? | *Your no is kind too.*', mood: 'happy', star: { x: -190, y: 0 }, squash: lt => lt < 1.6 ? Math.sin(lt * 14) * 0.08 : 0,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.3) * 46)
      L(x, 800, 700, `NODS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 40)
      bubble(x, 800, 900, 'mm-hm…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 800, 1080, 'no, thank you!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Soaking up everyone’s storm? | *You’re not a sponge.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 800, 640, 18 * k)
      if (lt < 1.6) rain(x, t, 800, 690, { w: 200, h: 180, alpha: k })
      const swell = lt < 1.6 ? 1 + clamp(lt / 1.6) * 0.25 : 1.25 - clamp((lt - 1.6) / 0.4) * 0.25
      drawBits(x, SPONGE, SPONGE_C, 800, 950, 22 * k, { sx: swell, sy: swell })
      L(x, 800, 1120, 'WRUNG OUT. RESTING.', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Dropping hints? | One talk is *kinder.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BESTIE', headCol: PINK, size: 26, lines: [['k.', BONE, pop01(t, P.t0 + 0.5, 0.2, 2)], ['sure :)', BONE, pop01(t, P.t0 + 0.8, 0.2, 2)], ['whatever u want', BONE, pop01(t, P.t0 + 1.1, 0.2, 2)], ['can we talk?', MINT, pop01(t, P.t0 + 1.8, 0.25, 2.2)]] })
      hearts(x, t, 800, 700, P.t0 + 2.0, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Disagreed with a friend? | *Still friends.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'aries', 830, 930, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.5 ? 'happy' : 'squint', look: [-1, 0] })
      bubble(x, 760, 620, 'i see it | differently', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 830, 1120, 'FAIR POINT! LUNCH?', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Boundaries aren’t fights. | They’re *directions.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, head: 'MY BOUNDARIES', headBg: ACC, headInk: INK, lines: ['1. ask first', '2. say no', '3. naps are', '   sacred'], size: 32, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
      L(x, 800, 1110, 'NEW + IMPROVED', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Choosing you | isn’t *picking a side.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'SCALE', 800, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.05 })
      bits(x, 'HEARTB', 706, 830, 9 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      bits(x, 'HEARTB', 894, 830, 9 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      L(x, 800, 1090, 'BALANCE INCLUDES YOU', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Your voice is part | of *the harmony.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 6, cell: 9, col: ACC, seed: 3, alpha: clamp(lt / 0.5) })
      L(x, 800, 700, 'NOW FEATURING', pop01(t, P.t0 + 0.3, 0.3, 2), CREAM, -0.04, 32)
      L(x, 800, 1060, 'SOLO: LIBRA', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 44)
      sparkles(x, t, 800, 1060, P.t0 + 1.25, 8, 170, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0716', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Libra, peace isn’t | *keeping quiet.*',
  cameos: CAMEOS,
  group: { cap: 'Speak up. | *Still lovely.*', mood: 'sparkle' },
  last: {
    text: 'Finally said “thai.” | *So did everyone.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.35, 2)
      friend(x, t, 'libra', 360, 1200, 190, k, { mood: lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], seed: 49 })
      pickBox(x, 660, 1180, k, ease.outBack(clamp((lt - 0.9) / 0.4)), 'thai, please!', 1.2 * pop01(t, t - lt + 1.1, 0.25, 2.2))
      for (const [i, id] of ['aries', 'gemini', 'leo'].entries()) friend(x, t, id, 300 + i * 240, 1460, 130, pop01(t, t - lt + 1.5 + i * 0.12, 0.35, 2), { mood: 'heart', seed: 50 + i })
      hearts(x, t, 540, 1420, t - lt + 1.8, { n: 8, life: 1.8, spread: 640, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
