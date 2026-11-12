// r2a0547: star_advice, ADVICE SOLO (pisces), "What Pisces need | *on a bad day.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle things a Pisces needs on a hard day, each a relatable truth + a warm reframe and one
// light gag. Pisces cries in every card (softly, mostly happy tears by the end). Ending: group.
//   cried at an ad, let it out · blanket burrito, no questions · quiet is allowed · a friend who just sits with them
//   · feeling everything is a superpower · tea, soft music, zero plans · the chart says rest · a snack, a big one
//   · tomorrow is new, so are you
//   group "Big feelings. | *Even bigger heart.*"
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, steam, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b7a6ff', S = 'pisces', ST = { x: -190 }
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']

const CAMEOS = [
  { sign: S, cap: 'Cried at an ad? | *Let it out.*', mood: lt => lt < 1.0 ? 'wide' : 'happy', look: [1, 0], tears: lt => lt < 1.3 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 850, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 800, 820, P.t0 + 0.4, { n: 3, life: 1.2, spread: 80, cell: 6, seed: 2 })
      L(x, 800, 1090, 'IT WAS ABOUT A DOG', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, -0.04, 28)
    } },
  { sign: S, cap: 'A blanket burrito. | *No questions asked.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      const w = ease.outCubic(prog(lt, 0.4, 1.0))
      if (w > 0) drawBits(x, ['LLLLLLLLLLLL', 'LPLLPLLPLLPL', 'LLLLLLLLLLLL', 'LLPLLPLLPLLP', 'LLLLLLLLLLLL', 'LPLLPLLPLLPL'], { L: '#ff8fb1', P: '#ffd6e3' }, 350, 960 - (1 - w) * 200, 20, { alpha: w })
      L(x, 800, 860, 'BURRITO MODE: ON', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Need quiet? | *Quiet is allowed.*', mood: 'sleepy', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DO NOT DISTURB', headCol: LAV, lines: [['shh.', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['all good.', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2), true]], size: 26 })
    } },
  { sign: S, cap: 'A friend who just | *sits with them.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 760, 950, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 33 })
      hearts(x, t, 560, 760, P.t0 + 1.2, { n: 5, life: 1.8, spread: 220, cell: 6, seed: 4 })
      L(x, 760, 700, 'SAYS NOTHING. HELPS.', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Feel everything? | *That’s a superpower.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], tears: 2, star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 860, P.t0 + 1.0, 8, 190, 0.3)
      L(x, 800, 1090, 'POWER: EMPATHY', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Warm tea, soft music, | *zero plans.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.4) steam(x, t, 790, 830, { alpha: clamp((lt - 0.4) * 2) })
      if (lt > 0.7) notes(x, t, 640, 760, { n: 3, cell: 6, col: LAV, alpha: clamp((lt - 0.7) * 2), seed: 1 })
      L(x, 800, 1110, 'PLANS: NONE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Their chart says rest. | *Listen to it.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1070, '♓︎ TODAY: REST', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, -0.04, 34)
    } },
  { sign: S, cap: 'A snack. | *A big one.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', look: [1, 0], tears: 2, star: ST, hops: [1.1],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'COOKIE', 800 + (i % 2 ? 26 : -26), 1020 - i * 80, 14 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2))
      L(x, 800, 650, 'COMFORT: SERVED', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Tomorrow is new. | *So are you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], tears: 2, star: ST, hops: [1.3, 1.9],
    front(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 0.3, 1.2))
      x.save(); x.beginPath(); x.rect(600, 500, 400, 520); x.clip()
      drawBits(x, SUN, { Y: GOLD }, 800, lerp(1060, 820, r), 26)
      x.restore()
      x.fillStyle = INK; x.fillRect(600, 1010, 380, 12)
      L(x, 800, 1100, 'NEW DAY', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 36)
      sparkles(x, t, 800, 820, P.t0 + 1.3, 8, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0547', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'What Pisces need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Big feelings. | *Even bigger heart.*', mood: 'happy' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
