// r2a0750: star_advice, ADVICE SOLO, "How to thank | *a Taurus.*" (~45 s vertical, signs3kit social cut, music: lofi · G).
// One sign the whole way, 9 cards, a relatable Taurus truth + a warm way to say thanks, one visual gag each:
//   skip the speech, bring warm bread · notice the small stuff · a cozy blanket · a handwritten note (kept forever)
//   · their chart says food · help with the heavy thing · a plant that grows · movie night on the couch
//   · say it out loud (watch them blush)
//  37.8  "Simple things. | *Big feelings.*"   41.2  callback: "Thanked them right? | *You get a slice.*" (the bread returns)
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'taurus', ACC = '#e9b24a', ST = { x: -170 }
const BREAD = ['...CCCCCCCC...', '.CCLCCCLCCCLC.', 'CCCCCCCCCCCCCC', 'CLCCCLCCCLCCCC', 'CCCCCCCCCCCCCC', 'DDDDDDDDDDDDDD', '.DDDDDDDDDDDD.']
const BREAD_C = { C: '#d99a52', L: '#f2c27a', D: '#9a5a2a' }
const SLICE = ['.CCCC.', 'CWWWWC', 'CWWWWC', 'CWWWWC', 'CWWWWC', 'CCCCCC']
const SLICE_C = { C: '#d99a52', W: '#fff1d0' }
const POT = ['..LL.LL..', '.LLL.LLL.', '..LLLLL..', '....L....', 'RRRRRRRRR', '.RRRRRRR.', '.RRRRRRR.', '..RRRRR..']
const POT_C = { L: '#4fbf6a', R: '#c86a3a' }

const CAMEOS = [
  { sign: S, cap: 'Skip the speech. | *Bring warm bread.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 920, 18 * pop01(t, P.t0 + 0.3, 0.35, 2))
      steam(x, t, 790, 840, { n: 3, h: 120 })
      L(x, 790, 680, 'THANK YOU, IN CARBS', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Notice the small stuff. | *They did it on purpose.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'QUIET FAVOURS', headBg: ACC, headInk: INK, lines: ['plants: watered', 'fridge: stocked', 'your mug: warm'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 790, 1100, 'SEEN ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 38)
    } },
  { sign: S, cap: 'Cozy gifts | *say it best.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'BLANKET', 370, 1010, 20 * pop01(t, P.t0 + 0.3, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 790, 900, 26 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 690, 'SOFTNESS: MAX', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: S, cap: 'A handwritten note? | *Kept forever.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 250, rot: 0.05, lines: ['thank you', 'for everything ♡'], size: 34, font: "'EB Garamond', Georgia, serif", weight: 500 })
      L(x, 790, 1080, 'FILED: TREASURE BOX', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Their love language? | *Check the chart.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'BIRTH CHART', headBg: '#6b62a8', lines: ['venus: taurus', 'love: dinner', 'also: dessert'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 790, 1100, 'BOOK A TABLE ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Help with | *the heavy thing.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const lift = ease.outCubic(prog(lt, 0.9, 1.4))
      bits(x, 'COUCH', 780, 940 - lift * 50, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'aries', 870, 1090, 150, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 37 })
      L(x, 790, 700, 'LIFT ON THREE', pop01(t, P.t0 + 0.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Give a plant. | *They’ll keep it alive.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = 0.7 + 0.5 * ease.outCubic(prog(lt, 0.4, 1.6))
      drawBits(x, POT, POT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2) * g)
      L(x, 790, 1110, 'YEAR 6. THRIVING.', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
      sparkles(x, t, 790, 860, P.t0 + 1.4, 6, 160, 0.4, [MINT, GOLD, BONE])
    } },
  { sign: S, cap: 'Big plans? | *Couch night is better.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 790, 780, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'COUCH', 790, 990, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1120, 'PERFECT EVENING', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Say it out loud. | *Watch them blush.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bubble(x, 790, 700, 'thank you. | really.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 790, 960, 'stop it ♡', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'br', col: PINK })
      hearts(x, t, F.x, F.cy - 60, P.t0 + 1.3, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0750', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'How to thank | *a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Simple things. | *Big feelings.*', mood: 'heart' },
  last: {
    text: 'Thanked them right? | *You get a slice.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.4, 2)
      if (k <= 0.01) return
      signChar(x, t, 'taurus', 440, 1100, 280 * k, { mood: 'heart', look: [1, 0], seed: 71, hops: [t - lt + 1.2] })
      drawBits(x, BREAD, BREAD_C, 740, 1150, 17 * k)
      const p = ease.inOutCubic(prog(lt, 1.2, 1.8))
      drawBits(x, SLICE, SLICE_C, lerp(740, 610, p), lerp(1150, 1000, p), 16 * pop01(t, t - lt + 1.2, 0.3, 2), { rot: -0.2 * p })
      hearts(x, t, 540, 900, t - lt + 1.6, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
