// r2t0606: star_talk, ROLLCALL, "The signs | *as florists.*" (signs3kit social cut, music: lofi · C). Ending: lesson.
//   ♈ delivered before you ordered · ♉ won't sell the roses · ♊ can't pick one flower, sold you a jungle
//   · ♋ named every plant, can't sell Kevin · ♌ signed every bouquet · ♍ sent back a rose, one petal crooked
//   · ♎ twenty ribbons, still deciding · ♏ read your birth chart, then chose your flower · ♐ out on a delivery, now
//   on a mountain · ♑ came for one tulip, left with a greenhouse · ♒ roses are boring, here's a cactus
//   · ♓ can't cut a stem, it might feel it (tears)
//   group "Twelve florists. | *One wild shop.*"  lesson "Every sign | *blooms differently.*"  IN FULL BLOOM
//   last "Pisces still | *won’t cut.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, bits, swapLabel, chart, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
const LEAF = '#4fbf6a', STEM = '#2f8a48'
const FL = {
  ROSE: ['..RRR....', '.RRWRR...', '.RRRRR...', '..RRR....', '...G..LL.', '...G.LL..', '..LG.....', '.LLG.....', '...G.....', '...G.....'],
  BOUQ: ['.RR.YY.PP.', 'RRRYYYPPPP', '.RRLYYLPP.', '..LLGGLL..', '...WGGW...', '...WWWW...', '....WW....', '....WW....'],
  TULIP: ['.Y.Y.Y.', '.YYYYY.', '.YYYYY.', '..YYY..', '...G...', '.L.G...', '.LLG...', '...G...'],
  CACTUS: ['....GG....', '.G..GG....', '.G..GG..G.', '.GGGGG..G.', '....GGGGG.', '....GG....', '..PPPPPP..', '..PPPPPP..', '...PPPP...'],
  MOUNT: ['.......W.......', '......WWW......', '.....SSSSS.....', '....SSSSSSS....', '...SSSSSSSSS...', '..SSSSSSSSSSS..', '.SSSSSSSSSSSSS.', 'SSSSSSSSSSSSSSS'],
  GREEN: ['.....G.....', '....GSG....', '...GSSSG...', '..GSSSSSG..', '.GSSSSSSSG.', 'GGGGGGGGGGG', 'GSSSGSGSSSG', 'GSLSGSGSLSG', 'GSSSGSGSSSG', 'GGGGGGGGGGG'],
  PLANT: ['..L..L..', '.LLL.LL.', 'LLLLLLL.', '.LLLLLL.', '..LLLL..', '...GG...', '.PPPPPP.', '.PPPPPP.', '..PPPP..'],
  RIBBON: ['RR....RR', 'RRR..RRR', '.RRRRRR.', '..RRRR..', '.RR..RR.', 'RR....RR'],
}
const FC = {
  ROSE: { R: RED, W: '#ff9aa8', G: STEM, L: LEAF }, BOUQ: { R: RED, Y: GOLD, P: PINK, L: LEAF, G: STEM, W: LAV },
  TULIP: { Y: '#ffd23a', G: STEM, L: LEAF }, CACTUS: { G: LEAF, P: '#e0a56a' }, MOUNT: { W: BONE, S: STEEL },
  GREEN: { G: STEEL, S: '#bfe6ff', L: LEAF }, PLANT: { L: LEAF, G: STEM, P: '#e0a56a' },
}
const fl = (x, n, cx, cy, cell, o) => drawBits(x, FL[n], FC[n], cx, cy, cell, o)

const CAMEOS = [
  { sign: 'aries', cap: 'Delivered your bouquet | *before you ordered.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2.2)
      fl(x, 'BOUQ', 800 + (1 - k) * 260, 830, 24 * k, { rot: 0.08 })
      bubble(x, 790, 590, 'for your date!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1090, 'ORDER: NOT PLACED', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Won’t sell the roses. | They’re *mine now.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      fl(x, 'ROSE', 560, 900, 18 * k, { rot: -0.15 }); fl(x, 'ROSE', 610, 910, 18 * k, { rot: 0.1 })
      bubble(x, 800, 700, 'mine.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 56, col: MINT, tail: 'bl' })
      L(x, 800, 1050, 'NOT FOR SALE', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'gemini', cap: 'Couldn’t pick one flower. | Sold you *a jungle.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.2) / 0.18) + 1)
      const kinds = ['ROSE', 'TULIP', 'BOUQ', 'PLANT', 'TULIP', 'ROSE', 'PLANT', 'BOUQ', 'TULIP']
      for (let i = 0; i < n; i++) fl(x, kinds[i], 640 + (i % 3) * 120, 700 + Math.floor(i / 3) * 150, 12 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2), { rot: (i % 2 ? 0.1 : -0.1) })
      L(x, 760, 1140, 'ITEMS: ALL OF THEM', pop01(t, P.t0 + 1.8, 0.3, 2.2), LAV, -0.03, 30)
    } },
  { sign: 'cancer', cap: 'Named every plant. | Can’t *sell Kevin.*', mood: lt => lt > 1.1 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      fl(x, 'PLANT', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'KEVIN', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, 0.06, 40)
      bubble(x, 790, 640, 'he’s family.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Signed every bouquet. | *Like a painting.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      fl(x, 'BOUQ', 800, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 800, 1070, 'A LEO ORIGINAL ✦', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.05, 34)
      sparkles(x, t, 800, 840, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Sent back a rose. | One petal *crooked.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      fl(x, 'ROSE', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 600, 'PETAL 4: OFF', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, 0.04, 32)
      bubble(x, 640, 1080, 'redo.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 48, col: MINT, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Twenty ribbons later. | Still *deciding.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const cols = [RED, PINK, LAV, GOLD, SKYB, MINT]
      const c = cols[Math.floor(Math.max(0, lt - 0.3) / 0.22) % cols.length]
      fl(x, 'BOUQ', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, FL.RIBBON, { R: c }, 800, 960, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 1110, `RIBBON #${Math.min(20, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.11))}`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Read your birth chart. | *Then* chose your flower.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 760, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      fl(x, 'ROSE', 800, 1010, 13 * pop01(t, P.t0 + 1.2, 0.3, 2.2), { rot: 0.1 })
      L(x, 800, 600, 'CHART: APPROVED', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#c97bff', -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Out on one delivery. | Now *on a mountain.*', mood: 'happy', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, FL.MOUNT, FC.MOUNT, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      fl(x, 'BOUQ', 790, 630 + 8 * Math.sin(t * 3), 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1100, 'DELIVERY: DAY 9', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ff9a4a', 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Came for one tulip. | Left with *a greenhouse.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.2) fl(x, 'TULIP', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, FL.GREEN, FC.GREEN, 800, 840, 26 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      swapLabel(x, 800, 1090, lt, 1.2, 'ONE TULIP', 'ONE GREENHOUSE', { size: 32, fromBg: CREAM, toBg: GOLD })
    } },
  { sign: 'aquarius', cap: 'Roses are boring. | Here’s *a cactus.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      fl(x, 'CACTUS', 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, FL.RIBBON, { R: SKYB }, 800, 940, 9 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1090, 'VERY ROMANTIC', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Can’t cut a stem. | It *might feel it.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fl(x, 'ROSE', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 2) })
      bubble(x, 790, 610, 'does it hurt?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, 800, 1090, 'STEMS: UNCUT', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0606', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs | *as florists.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve florists. | *One wild shop.*' },
  lesson: { text: 'Every sign | *blooms differently.*', chip: 'IN FULL BLOOM' },
  last: {
    text: 'Pisces still | *won’t cut.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      for (let i = 0; i < 5; i++) fl(x, i % 2 ? 'TULIP' : 'ROSE', 340 + i * 100, 1560 + (i % 2) * 30, 14 * k, { rot: (i - 2) * 0.08 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
