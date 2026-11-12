// r2a0748: star_advice, ADVICE SOLO, "Cancer, you can | *ask for help.*" (topic: "Cancer, you're allowed | to ask for help", trimmed to two lines) (~50 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole way, 9 cards, a relatable Cancer truth + a warm reframe, one visual gag each:
//   carrying every bag · cooking for twelve (let them bring dessert) · remembers every birthday · "I'm fine"
//   · holding it all in · asking is a gift · call your person · tired (rest, they've got the dishes)
//   · the compatibility you want: someone who helps back
//  37.8  "You care so much. | *Let them care back.*"   41.2  callback: "One bag each. | *Much better.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, swapLabel, friend, zzz, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'cancer', ACC = '#3fb6f0', ST = { x: -170 }
const TOTE = ['...KKKK...', '..K....K..', '.K......K.', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPGGGGPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP']
const tote = (x, cx, cy, cell, o = {}) => drawBits(x, TOTE, { K: INK, P: o.col || LAV, G: GOLD }, cx, cy, cell, o)

const CAMEOS = [
  { sign: S, cap: 'Carrying every bag? | *Hand one over.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, squash: lt => lt < 1.3 ? 0.06 : 0,
    front(x, t, lt, P, F) {
      const n = lt > 1.3 ? 1 : 5
      for (let i = 0; i < n; i++) tote(x, F.x + 150 + (i % 2 ? 40 : -10) - (n === 1 ? 0 : 0), F.cy + 90 - i * 70, 11 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: (i % 2 ? 0.1 : -0.1), col: [LAV, PINK, MINT, GOLD, SKYB][i] })
      swapLabel(x, 820, 660, lt, 1.2, 'ARMS: FULL', 'ONE BAG ♡', { size: 38, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Cooking for twelve? | *Let them bring dessert.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DISH', 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 860, { n: 3, h: 120 })
      L(x, 790, 660, 'DESSERT: THEIRS ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 32)
      L(x, 790, 1110, 'SERVES: 12', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Remember every birthday? | *Let them remember yours.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'BIRTHDAYS', headBg: ACC, headInk: INK, lines: ['mom ✓', 'bestie ✓', 'neighbour’s cat ✓', ['YOU: ???', RED]], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 790, 1110, 'IT’S YOUR TURN ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: '“I’m fine”? | *You can say more.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], tears: lt => lt > 1.3 ? 0 : 1, star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, lt > 1.2 ? 'actually… | not great' : 'i’m fine!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 960, 'HONEST = BRAVE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Holding it all? | *Let a friend hold some.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const p = ease.inOutCubic(prog(lt, 0.7, 1.2))
      const Fr = friend(x, t, 'taurus', 820, 980, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 21 })
      bits(x, 'BOX', lerp(F.x + 60, 820, p), lerp(F.cy - 60, Fr ? Fr.top - 30 : 900, p) - Math.sin(Math.PI * p) * 80, 14)
      L(x, 800, 650, 'GOT IT ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 36)
    } },
  { sign: S, cap: 'Asking isn’t a burden. | *It’s a gift.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1100, 'THEY WANTED TO ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
      sparkles(x, t, 790, 880, P.t0 + 0.7, 7, 190, 0.2)
    } },
  { sign: S, cap: 'Rough night? | *Call your person.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], tears: lt => lt > 1.2 ? 0 : 2, star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: lt > 1.0 ? 'CONNECTED ♡' : 'CALLING…', headCol: lt > 1.0 ? MINT : ACC, lines: lt > 1.0 ? [['hey, I’m here', PINK, pop01(t, P.t0 + 1.1, 0.25, 2)]] : [] })
      L(x, 790, 1120, 'PICKED UP: 1 RING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Tired? | *They’ve got the dishes.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'BLANKET', 370, 1010, 18 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      zzz(x, t, 520, 760, { size: 44 })
      friend(x, t, 'virgo', 820, 980, 190, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'happy', seed: 23 })
      bits(x, 'PLATE', 820, 1100, 12 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 800, 690, 'DISHES: DONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.05, 34)
    } },
  { sign: S, cap: 'Your best match? | *Someone who helps back.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 290, head: 'COMPATIBILITY', headBg: PINK, headInk: INK, lines: ['cancer + them', 'cares: both ways', 'match: ♡♡♡'], size: 28, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      hearts(x, t, 370, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0748', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Cancer, you can | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'You care so much. | *Let them care back.*', mood: 'heart' },
  last: {
    text: 'One bag each. | *Much better.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.4, 2)
      if (k <= 0.01) return
      const A = signChar(x, t, 'cancer', 340, 1080, 250 * k, { mood: 'heart', look: [1, 0], seed: 61, hops: [t - lt + 1.2] })
      const B = signChar(x, t, 'taurus', 740, 1080, 250 * k, { mood: 'happy', look: [-1, 0], seed: 62, hops: [t - lt + 1.4] })
      tote(x, 340 + 140, 1130, 10 * pop01(t, t - lt + 1.0, 0.3, 2))
      tote(x, 740 + 140, 1130, 10 * pop01(t, t - lt + 1.2, 0.3, 2))
      hearts(x, t, 545, 900, t - lt + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
