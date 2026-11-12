// r2t0273: star_talk, ROLLCALL, "The signs | *as desserts.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, each as the most extreme dessert of itself. Ending: callback (Taurus shares… one crumb).
//   ♈ a flaming dessert, still on fire · ♉ triple-layer cake, not sharing · ♊ half vanilla, half something else
//   · ♋ a warm brownie, a hug in a pan · ♌ a macaron tower with gold leaf · ♍ perfect squares, measured twice
//   · ♎ too pretty to eat · ♏ dark chocolate, extremely dark · ♐ a fortune cookie that says "go"
//   · ♑ a cheesecake that took three days · ♒ an ice cream taco · ♓ melting ice cream, crying with it
//   group "Twelve desserts. | *Zero leftovers.*"   callback "Taurus shared? | *One crumb.*" (the cake comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, BM, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ST = { x: -170 }
const CHOC = '#5a3a1e', CREAM = '#fff4e2'
const FLAME = [['...R..R...', '..RYR.RR..', '.RYYRRYR..', '.RYWYYYR..', '..RYYYR...'], { R: RED, Y: ORANGE, W: GOLD }]
const CAKE3 = [['.PPPPPPPPPPP.', 'WWWWWWWWWWWWW', 'CCCCCCCCCCCCC', 'WWWWWWWWWWWWW', 'PPPPPPPPPPPPP', 'WWWWWWWWWWWWW', 'CCCCCCCCCCCCC', 'KKKKKKKKKKKKKKK'.slice(0, 13)], { P: PINK, W: CREAM, C: CHOC, K: '#9aa5c4' }]
const CONE2 = [['..VVVSS..', '.VVVVSSS.', 'VVVVVSSSS', 'VVVVSSSSS', '.VVVSSSS.', '.CCCCCCC.', '..CCCCC..', '..CCCCC..', '...CCC...', '...CCC...', '....C....'], { V: CREAM, S: MINT, C: '#d9a35a' }]
const BROWNIE = [['BBBBBBBBBBBB', 'BbBBBBbBBBbB', 'BBBBbBBBBBBB', 'BBbBBBBBbBBB', 'SSSSSSSSSSSS'], { B: CHOC, b: '#3a2410', S: '#9aa5c4' }]
const MACARON = [['.PPPPP.', 'PPPPPPP', 'WWWWWWW', 'PPPPPPP', '.PPPPP.'], { P: '#ffb3c7', W: CREAM }]
const MACARON2 = [['.MMMMM.', 'MMMMMMM', 'WWWWWWW', 'MMMMMMM', '.MMMMM.'], { M: MINT, W: CREAM }]
const BAR = [['YYYYY', 'YCCCY', 'YCCCY', 'YYYYY'], { Y: '#e8c06a', C: '#c98f2a' }]
const CHOCBAR = [['KKKKKKKK', 'KkKKkKKk', 'KKKKKKKK', 'KkKKkKKk', 'KKKKKKKK', 'KkKKkKKk', 'WWWWWWWW', 'WWWWWWWW'], { K: '#2a160a', k: '#3e2412', W: SKYB }]
const FORTUNE = [['....YYYY....', '..YYYYYYYY..', '.YYYYYYYYYY.', 'YYYYY..YYYYY', 'YYYY....YYYY', '.YY......YY.'], { Y: '#e8b04a' }]
const CHEESE = [['...........Y', '.........YYY', '.......YYYYY', '.....CCCCCCC', '...CCCCCCCCC', '.CCCCCCCCCCC', 'CCCCCCCCCCCC', 'BBBBBBBBBBBB'], { Y: RED, C: CREAM, B: '#d9a35a' }]
const TACO = [['....SSSSSS....', '..SSPPMMVVSS..', '.SSPPPMMMVVVS.', 'SSSSSSSSSSSSSS', 'CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.', '...CCCCCCCC...'], { S: '#ffd6e8', P: PINK, M: MINT, V: CREAM, C: '#d9a35a' }]
const MELT = [['..LLLLL..', '.LLLLLLL.', 'LLLLLLLLL', 'LL.LLL.LL', 'L..CLL..L', '...CCC...', '...CCC...', '....C....'], { L: LAV, C: '#d9a35a' }]

// the triple cake with a "MINE" flag (Taurus's card and the callback)
function cake(x, t, cx, cy, k, cell = 18) {
  if (k <= 0.01) return
  drawBits(x, CAKE3[0], CAKE3[1], cx, cy, cell * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'A flaming dessert. | *Still on fire.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'cake', 790, 920, 20 * k)
      drawBits(x, FLAME[0], FLAME[1], 790, 790 + Math.sin(t * 18) * 4, 22 * k * (1 + 0.08 * Math.sin(t * 13)))
      label(x, 790, 640, 'SERVE HOT. HOTTER.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A triple-layer cake. | *Not sharing.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cake(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'MINE.', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 56, bg: RED, color: BONE, rot: 0.06 })
    } },
  { sign: 'gemini', cap: 'Half vanilla, | *half something else.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CONE2[0], CONE2[1], 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 * Math.sin(t * 3) })
      bubble(x, 800, 1080, 'both. obviously.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: 'cancer', cap: 'A warm brownie. | *A hug in a pan.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BROWNIE[0], BROWNIE[1], 790, 880, 24 * k)
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph) * 0.8; x.fillStyle = BONE; x.fillRect(730 + i * 55 + Math.sin(ph * 8 + i) * 10, 800 - ph * 140, 12, 30); x.restore() }
      label(x, 790, 1060, 'HAVE ANOTHER ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A macaron tower. | *Gold leaf.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); drawBits(x, (i % 2 ? MACARON2 : MACARON)[0], (i % 2 ? MACARON2 : MACARON)[1], 790, 1030 - i * 76, 15 * k) }
      x.save(); x.globalAlpha = pop01(t, P.t0 + 1.1, 0.3, 2); x.fillStyle = GOLD; for (let i = 0; i < 6; i++) x.fillRect(740 + (i * 37) % 110, 700 + (i * 53) % 330, 14, 14); x.restore()
      label(x, 790, 640, 'EDIBLE GOLD', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 200, 0.5)
    } },
  { sign: 'virgo', cap: 'Perfect squares. | *Measured twice.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) drawBits(x, BAR[0], BAR[1], 700 + c * 90, 760 + r * 90, 15 * pop01(t, P.t0 + 0.2 + (r * 3 + c) * 0.06, 0.3, 2))
      label(x, 790, 1060, 'EXACTLY 4 CM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'So pretty | *no one can eat it.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'cake', 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'flower', 790, 700, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 1050, 'PHOTO SHOOT: HR 2', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Dark chocolate. | *Extremely dark.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CHOCBAR[0], CHOCBAR[1], 790, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 790, 1060, 'BITTER ON PURPOSE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A fortune cookie | *that just says “go.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      drawBits(x, FORTUNE[0], FORTUNE[1], 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 940, 'GO.', pop01(t, P.t0 + 0.9, 0.3, 2.6), { size: 64, bg: PAPER, rot: 0.04, font: MONO, weight: 700 })
      bits(x, 'suitcase', 800, 1090, 16 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'A cheesecake. | *Took three days.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHEESE[0], CHEESE[1], 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      note(x, 790, 640, pop01(t, P.t0 + 0.9, 0.3, 2), 'day 3: rest it', { head: 'SCHEDULE', headBg: SKYB, size: 32, w: 300 })
      label(x, 790, 1060, 'WORTH IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ice cream, | but *it’s a taco.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TACO[0], TACO[1], 790, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 800, 1060, 'trust me.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
    } },
  { sign: 'pisces', cap: 'Melting ice cream. | *Crying with it.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MELT[0], MELT[1], 790, 820, 24 * k, { sy: 1 - 0.15 * clamp(lt / 2.4) })
      x.save(); x.globalAlpha = k; x.fillStyle = LAV; x.beginPath(); x.ellipse(790, 1000, 60 + 50 * clamp(lt / 2.4), 14, 0, 0, Math.PI * 2); x.fill(); x.restore()
      bubble(x, 800, 1090, 'it’s leaving me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0273', key: 'G', accent: PINK, ending: 'callback',
  title: 'The signs | *as desserts.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve desserts. | *Zero leftovers.*' },
  last: {
    text: 'Taurus shared? | *One crumb.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      cake(x, t, 470, 1100, k, 26)
      if (k > 0.5) signChar(x, t, 'taurus', 760, 1120, 200, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 77, pop: k, glyph: false })
      const c = pop01(t, t - lt + 1.3, 0.3, 2.4)
      if (c > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(640 - 14, 980 - 14, 28, 28); x.fillStyle = CHOC; x.fillRect(640 - 10, 980 - 10, 20, 20); x.restore() }
      label(x, 600, 860, 'ONE (1) CRUMB', c, { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
