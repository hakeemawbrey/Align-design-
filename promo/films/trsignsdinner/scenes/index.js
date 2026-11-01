// trsignsdinner: THE SIGNS AS… ordering at a dinner date. (45 s vertical, Star Talk Trends §13.4, music: pop · F)
// Story 0–40.6, then the shared end card. The format look lives in ./signs.js (identical in all five trsigns films).
//   0.0–2.8    "The signs ordering | on a *dinner date.*"  The twelve line up for roll call, then dive into the pip row.
//   2.8–31.7   the roll call, one stage card per sign:
//              ♈ ordered before sitting down · ♉ ordered dessert first · ♊ three appetizers "to try a bite" · ♋ let
//              you order first · ♌ ordered the dish that arrives on fire · ♍ asked about every ingredient
//              · ♎ can't decide, the waiter waits · ♏ ordered the mystery special · ♐ ordered something they can't
//              pronounce · ♑ checked the prices, got the fancy water · ♒ ordered off-menu, it worked
//              · ♓ cried at the free bread
//  17.3        card cut (cameo 6 → 7).
//  31.7        "Table for *twelve.*"  The group photo behind one long table with a bread basket. FLASH.
//  33.4        LESSON UNLOCKED: "Order anything. | *Share the bread.*"  +1 BREAD BASKET
//  37.95       "*Split* the fries."  A cone of fries splits in two; hearts.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, inSprite, starFrame, pop01, outK,
  GOLD, BONE, PINK, INK, SKYB, INTER,
} from './signs.js'

const at = (t0, d) => +(t0 + d).toFixed(3)
const MENU = ['RRRRRRRR', 'RWWWWWWR', 'RWKKKKWR', 'RWWWWWWR', 'RWKKKWWR', 'RWWWWWWR', 'RWKKKKWR', 'RWWWWWWR', 'RRRRRRRR']
const MENU_C = { R: '#8e2a3a', W: '#f4e8cc', K: '#8a7a6a' }
const CAKE = ['......PP', '....PPWW', '..PPWWWW', 'PPWWWWWW', 'CCCCCCCC', 'WWWWWWWW', 'CCCCCCCC']
const CAKE_C = { P: '#ff9fc0', W: '#fff4e2', C: '#7a4a2a' }
const PLATE = ['.WWWWWW.', 'WWFFFFWW', 'WFFFFFFW', '.WWWWWW.']
const FLAME = ['..Y..Y.', '.YOY.YO', 'YOROYOR', 'ORRROR.', '.ORRRO.']
const FLAME_C = { Y: '#ffe27a', O: '#ff9a3a', R: '#ff4f3a' }
const DISH = ['.WWWWWWWWW.', 'WWBBBBBBBWW', '.WWWWWWWWW.']
const CLOCHE = ['....KK....', '..SSSSSS..', '.SSWSSSSS.', 'SSWSSSSSSS', 'SSSSSSSSSS', 'BBBBBBBBBB']
const CLOCHE_C = { K: '#8a94a8', S: '#c9c4d8', W: '#ffffff', B: '#8a94a8' }
const BOTTLE = ['.KK.', '.GG.', '.GG.', 'GGGG', 'GLLG', 'GLLG', 'GGGG', 'GGGG']
const BOTTLE_C = { K: '#2fc79a', G: '#bfe6ff', L: '#ffffff' }
const CHEF = ['.WWWWW.', 'WWWWWWW', 'WWWWWWW', '.WWWWW.', '.WWWWW.']
const BASKET = ['..BBBBBB..', '.BTTBBTTB.', 'BTTTTTTTTB', 'KKKKKKKKKK', '.KkKkKkKK.', '..KKKKKK..']
const BASKET_C = { B: '#e9b24a', T: '#f7d08a', K: '#a0784a', k: '#7a5a3a' }
const FRIES = ['Y.Y.Y.Y', 'YYY.YYY', 'YYYYYYY', 'RRRRRRR', 'RWRRRWR', '.RRRRR.', '.RRRRR.']
const FRIES_C = { Y: '#ffd23a', R: '#ff4f5e', W: '#ffffff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered before | *sitting down.*', mood: 'sparkle', hops: [0.15, 0.45], star: { x: 120, y: -40 },
    back(x, t, lt, P) {
      x.fillStyle = '#5a3a2a'; x.fillRect(260, 1080, 560, 24)
      drawBits(x, ['BBBB', 'B...', 'BBBB', 'B..B'], { B: '#6b62a8' }, 860, 1060, 18)
      const ph = prog(lt, 0.2, 0.9)
      drawBits(x, MENU, MENU_C, lerp(560, 280, ph), lerp(900, 660, ph) - Math.sin(Math.PI * ph) * 120, 14, { rot: ph * 7 })
      bubble(x, 330, 840, 'the spicy one!', pop01(t, P.t0 + 0.4, 0.22, 2.2), { size: 34, tail: 'br' })
      label(x, 860, 940, 'chair: empty', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 22, bg: BONE, rot: 0.06 })
    },
    cues: t0 => [['whoosh', at(t0, 0.2), 0.3, 0.03], ['pop', at(t0, 0.4), 987.77, 0.04, -0.3]] },
  { sign: 'taurus', cap: 'Ordered dessert | *first.*', mood: 'heart', look: [1, 0], star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.'], { W: '#ffffff' }, 770, 1080, 18 * k)
      drawBits(x, CAKE, CAKE_C, 770, 1010, 20 * k)
      sparkles(x, t, 770, 980, P.t0 + 0.5, 8, 130, 1, [PINK, BONE, GOLD])
      label(x, 770, 840, 'COURSE 1', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 26, bg: '#e9b24a', rot: 0.05 })
    } },
  { sign: 'gemini', beats: 5, cap: 'Three appetizers | *“to try a bite.”*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', star: { y: -100, s: 270 }, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P) {
      const F = ['#ff9a3a', '#5fd38a', '#ffd23a']
      for (let i = 0; i < 3; i++) drawBits(x, PLATE, { W: '#ffffff', F: F[i] }, 300 + i * 240, 1080 - (i % 2) * 30, 22 * pop01(t, P.t0 + 0.4 + i * 0.4, 0.25, 2.2))
      label(x, 790, 620, 'just bites!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 26, bg: '#f2cf4a', rot: 0.06 })
    },
    cues: t0 => [0, 1, 2].map(i => ['pop', at(t0, 0.4 + i * 0.4), [783.99, 880, 1046.5][i], 0.04, (i - 1) * 0.4]) },
  { sign: 'cancer', cap: 'Let *you* order | first.', mood: 'sparkle', look: [1, 0], star: { x: -150 },
    back(x, t, lt, P) {
      // the date (an off-card star whose menu peeks in from the right)
      drawStarChar(x, 860, 960, 200, t, { color: '#c9a6ff', mood: lt > 1.0 ? 'heart' : 'neutral', look: [-1, 0], pop: pop01(t, P.t0 + 0.15, 0.3, 2), seed: 51, glow: 0.6 })
      bubble(x, 420, 640, 'you pick first!', pop01(t, P.t0 + 0.35, 0.22, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 860, 830, P.t0 + 1.0, { n: 4, life: 1.0, spread: 120, cell: 6, seed: 3 })
    },
    cues: t0 => [['pop', at(t0, 0.35), 880, 0.04, -0.2], ['pluck', at(t0, 1.0), 1318.51, 0.035, 0.5, 0.3]] },
  { sign: 'leo', cap: 'Ordered the dish | *that arrives on fire.*', mood: 'sparkle', squash: lt => 0.04 * Math.sin(lt * 6), star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DISH, { W: '#ffffff', B: '#a0583a' }, 770, 1080, 20 * k)
      const f = pop01(t, P.t0 + 0.6, 0.25, 2.4)
      drawBits(x, FLAME, FLAME_C, 770 + 4 * Math.sin(t * 30), 1000 - 6 * Math.abs(Math.sin(t * 17)), 22 * f, { sy: 1 + 0.12 * Math.sin(t * 23) })
      label(x, 760, 820, 'ooooh', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 28, bg: '#f39a3a', rot: 0.05 })
    },
    cues: t0 => [['whoosh', at(t0, 0.6), 0.4, 0.04], ['glitter', at(t0, 0.6), at(t0, 1.0)]] },
  { sign: 'virgo', beats: 5, cap: 'Asked about | *every* ingredient.', mood: 'squint', look: [-1, 0], star: { x: 170 },
    back(x, t, lt, P) {
      const Q = ['the oil?', 'the salt?', 'the garnish?', 'the herb?', 'the plate?', 'the vibe?']
      Q.forEach((q, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.2, 2.2)
        if (k <= 0.01) return
        label(x, 330 + (i % 2) * 40, 620 + i * 88, q, k, { size: 30, bg: i === 5 ? '#ef5c94' : BONE, color: i === 5 ? BONE : INK, rot: (i % 2 ? 0.04 : -0.04) })
      })
    },
    cues: t0 => Array.from({ length: 6 }, (_, i) => ['pop', at(t0, 0.3 + i * 0.25), 659.25 + i * 80, 0.03, -0.3]) },
  { sign: 'libra', cap: 'Can’t decide. | *The waiter waits.*', mood: lt => ['neutral', 'squint', 'wide'][Math.floor(lt / 0.7) % 3], look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const wo = { color: '#9a94b0', mood: lt > 1.3 ? 'sleepy' : 'neutral', look: [-1, 0], pop: k, seed: 61, glow: 0.4 }
      drawStarChar(x, 800, 960, 220, t, wo)
      const F = starFrame(800, 960, 220, t, wo)
      inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(15, 27, 2.5, 3); x.fillRect(18.5, 27, 2.5, 3); x.fillRect(17.2, 27.8, 1.6, 1.4) })
      drawBits(x, ['WWWW', 'WKKW', 'WWWW', 'WKKW', 'WWWW'], { W: '#f4e8cc', K: '#8a7a6a' }, 920, 1010, 9 * k)
      label(x, 800, 720, 'take your time', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 24, bg: BONE, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Ordered | *the mystery special.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 1], star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), lift = ease.outBack(prog(lt, 1.0, 1.3))
      drawBits(x, DISH, { W: '#ffffff', B: '#ff9a3a' }, 770, 1090, 20 * k)
      if (lt > 1.05) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 770, 1040, 16)
      drawBits(x, CLOCHE, CLOCHE_C, 770, 1010 - lift * 200, 22 * k, { rot: -lift * 0.3 })
      sparkles(x, t, 770, 1030, P.t0 + 1.05, 10, 140, 1, [PINK, GOLD, BONE])
    },
    cues: t0 => [['tick', at(t0, 1.0), 0.05], ['pop', at(t0, 1.05), 1174.66, 0.05, 0.3], ['glitter', at(t0, 1.05), at(t0, 1.4)]] },
  { sign: 'sagittarius', beats: 5, cap: 'Ordered something | *they can’t pronounce.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', star: { x: -120 }, hops: [0.5, 1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MENU, MENU_C, 790, 960, 22 * k, { rot: 0.08 })
    },
    front(x, t, lt, P, F) {
      bubble(x, 520, 620, 'the… um… the croq—', pop01(t, P.t0 + 0.4, 0.22, 2.2) * outK(t, [P.t0 + 1.25, P.t0 + 1.35]), { size: 34, tail: 'bl' })
      bubble(x, 520, 620, 'THAT one!', pop01(t, P.t0 + 1.35, 0.22, 2.2), { size: 40, tail: 'bl', col: '#c99aff' })
      if (lt > 1.35) drawBits(x, ['.X..', 'XXXX', '.X..'], { X: GOLD }, 700, 960, 14)
    },
    cues: t0 => [['pop', at(t0, 0.4), 783.99, 0.035, 0], ['pop', at(t0, 1.35), 1174.66, 0.05, 0]] },
  { sign: 'capricorn', cap: 'Checked the prices. | *Got the fancy water.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: lt => lt > 1.1 ? undefined : [-1, 1], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      drawBits(x, MENU, MENU_C, 320, 950, 22 * k)
      const b = pop01(t, P.t0 + 1.1, 0.3, 2.4)
      drawBits(x, BOTTLE, BOTTLE_C, 470, 1060, 16 * b)
      sparkles(x, t, 470, 1020, P.t0 + 1.15, 8, 110, 2, [SKYB, BONE, GOLD])
      label(x, 470, 1170, 'treat yourself', b, { size: 22, bg: '#2fc79a', rot: -0.04 })
    },
    cues: t0 => [['bell', at(t0, 1.1), 1760, 0.03, 0.8, -0.3], ['glitter', at(t0, 1.15), at(t0, 1.4)]] },
  { sign: 'aquarius', cap: 'Ordered off-menu. | *It worked.*', mood: 'sparkle', star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const co = { color: '#f4e8cc', mood: lt > 1.0 ? 'happy' : 'wide', look: [-1, 0], pop: k, seed: 71, glow: 0.5 }
      drawStarChar(x, 800, 980, 210, t, co)
      const F = starFrame(800, 980, 210, t, co)
      drawBits(x, CHEF, { W: '#ffffff' }, F.x, F.top - 10, 14 * k)
      bubble(x, 380, 650, 'can I get… a waffle taco?', pop01(t, P.t0 + 0.35, 0.22, 2.2), { size: 30, tail: 'bl' })
      bubble(x, 800, 760, 'say less.', pop01(t, P.t0 + 1.05, 0.22, 2.2), { size: 34, tail: 'bc', col: '#9fe6b0' })
    },
    cues: t0 => [['pop', at(t0, 0.35), 880, 0.035, -0.3], ['pop', at(t0, 1.05), 1318.51, 0.045, 0.3]] },
  { sign: 'pisces', beats: 5, cap: 'Cried at | *the free bread.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', tears: lt => lt > 0.9 ? 3 : 1, star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2.2)
      drawBits(x, BASKET, BASKET_C, 770, 1040, 22 * k)
      label(x, 770, 900, 'FREE?!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 30, bg: '#7c74f0', color: BONE, rot: 0.06 })
      sparkles(x, t, 770, 1020, P.t0 + 0.55, 10, 150, 1, [GOLD, BONE, '#f7d08a'])
    },
    cues: t0 => [['pop', at(t0, 0.4), 783.99, 0.04, 0.3], ['pluck', at(t0, 0.8), 1318.51, 0.04, 0.6, 0.3]] },
]

const F = makeFilm({
  id: 'trsignsdinner', key: 'F', accent: '#ffb88a',
  title: 'The signs ordering | on a *dinner date.*',
  cameos: CAMEOS,
  group: {
    cap: 'Table for *twelve.*',
    draw(x, t, lt) {
      const k = pop01(t, 31.711 + 0.3, 0.35, 2)
      // the long table in front of the bottom row, a bread basket in the middle
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(40, 1352, 1000, 46); x.fillStyle = '#f4e8cc'; x.fillRect(46, 1358, 988, 34)
      x.fillStyle = '#e8d9b8'; for (let i = 0; i < 12; i++) x.fillRect(60 + i * 82, 1358, 40, 34)
      x.restore()
      drawBits(x, BASKET, BASKET_C, 540, 1330, 14 * k)
    },
  },
  lesson: { text: 'Order anything. | *Share the bread.*', chip: '+1 BREAD BASKET' },
  last: {
    text: '*Split* the fries.',
    draw(x, t, lt) {
      const k = pop01(t, 37.95 + 0.3, 0.3, 2.2), s = ease.inOutCubic(prog(lt, 0.8, 1.2))
      for (const d of [-1, 1]) drawBits(x, FRIES, FRIES_C, 540 + d * s * 80, 1560, 20 * k, { rot: d * s * 0.15 })
      hearts(x, t, 540, 1470, 37.95 + 1.2, { n: 6, life: 1.4, spread: 300, cell: 7, seed: 6 })
    },
    cues: t0 => [['pop', at(t0, 0.3), 987.77, 0.04, 0], ['whoosh', at(t0, 0.8), 0.3, 0.03], ['pluck', at(t0, 1.2), 1318.51, 0.04, 0.5, 0]],
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
