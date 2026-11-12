// r2t0709: star_talk, ROLLCALL, "The signs | *at the shoe store.*" (signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself buying shoes. Ending: callback.
//   ♈ grabbed the first pair, wrong size, ran anyway · ♉ tried on slippers, lives there now · ♊ two different shoes,
//   on purpose · ♋ kept the old pair, too many memories · ♌ gold sneakers, obviously · ♍ inspected every stitch, found
//   one loose · ♎ narrowed it down to thirty pairs · ♏ all black, again · ♐ hiking boots, already gone · ♑ the same
//   pair for the tenth time · ♒ moon boots to the grocery store · ♓ it didn't fit, cried for the shoe
//   group "Twelve signs. | *Zero returns.*"   last "Aries, one week later: | *“They’ll stretch.”*" (card 1's red shoe)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, ease, prog, lerp } from './props.js'

const ST = { x: -200 }
const SHOE = ['.....CC...', '....CCCC..', 'CCCCCCCCC.', 'CCCCCCCCCC', 'WWWWWWWWWW']
const sc = (c, w = BONE) => ({ C: c, W: w })
const shoe = (x, cx, cy, cell, col, o = {}) => drawBits(x, SHOE, sc(col, o.sole), cx, cy, cell, o)
const BOOT = ['CCCC.....', 'CCCC.....', 'CCCC.....', 'CCCCCCC..', 'CCCCCCCCC', 'KKKKKKKKK']
const SLIPPER = ['..FFFFFF..', '.FFFFFFFF.', 'FFFFFFFFFF', 'PPPPPPPPPP']
const MOONB = ['SSSSS....', 'SBSBS....', 'SSSSS....', 'SSSSSSSS.', 'SBSSSSBSS', 'KKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Grabbed the first pair. | *Wrong size. Ran.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      shoe(x, 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), RED, { rot: Math.sin(t * 9) * 0.08 })
      L(x, 800, 690, 'SIZE: WRONG', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, 0.05, 34)
      L(x, 800, 1100, 'SPEED: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Tried on slippers. | *Lives there now.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SLIPPER, { F: '#ffd6e4', P: PINK }, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'CLOSING TIME', pop01(t, P.t0 + 0.9, 0.3, 2.2), CREAM, 0.05, 32)
      bubble(x, 800, 1110, 'not leaving', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Two different shoes. | *On purpose.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      shoe(x, 700, 920, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), MINT, { rot: -0.1 })
      shoe(x, 900, 960, 15 * pop01(t, P.t0 + 0.4, 0.3, 2), PINK, { rot: 0.1, sole: GOLD })
      L(x, 800, 700, 'IT’S A LOOK', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.05, 36)
    } },
  { sign: 'cancer', cap: 'Kept the old pair. | *Too many memories.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      shoe(x, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), '#8a7a6a', { sole: '#b9b0a0' })
      hearts(x, t, 800, 880, P.t0 + 0.8, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 4 })
      L(x, 800, 1100, 'RETIRED, NOT GONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Gold sneakers. | *Obviously.*', mood: 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      shoe(x, 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, { sole: '#fff1b0' })
      sparkles(x, t, 800, 900, P.t0 + 0.6, 8, 200, 0.2)
      L(x, 800, 690, 'MATCHES THE AURA', pop01(t, P.t0 + 1.2, 0.3, 2.2), CREAM, -0.05, 32)
    } },
  { sign: 'virgo', cap: 'Inspected every stitch. | *Found one loose.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      shoe(x, 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), '#ffffff', { sole: STEEL })
      bits(x, 'LENS', lerp(700, 880, (Math.sin(t * 2) + 1) / 2), 860, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 680, 'STITCH #212: LOOSE', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, 0.05, 30)
    } },
  { sign: 'libra', cap: 'Narrowed it down | to *thirty pairs.*', mood: 'neutral', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(lt * 3))
      for (let i = 0; i < n; i++) bits(x, 'BOX', 720 + (i % 2) * 150, 1080 - Math.floor(i / 2) * 90, 12)
      const c = 2 + Math.floor(clamp(lt / 2) * 28)
      L(x, 800, 680, `FINALISTS: ${c}`, pop01(t, P.t0 + 0.3, 0.3, 2), LAV, 0.05, 36)
    } },
  { sign: 'scorpio', cap: 'All black. | *Like the other forty.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) shoe(x, 700 + i * 100, 860 + i * 70, 11 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), '#1b1236', { sole: '#3a2f6b', outline: '#6b62a8' })
      L(x, 800, 690, 'NEW COLOUR? NO.', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Bought hiking boots. | *Already gone.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      const go = clamp((lt - 1.0) / 0.8)
      drawBits(x, BOOT, { C: WOOD, K: INK }, lerp(800, 1000, ease.inCubic(go)), 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - go })
      L(x, 800, 700, 'TRAIL: 400 MILES', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, 0.05, 32)
      if (go > 0.5) bubble(x, 800, 1000, 'BYE!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 56, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'The same pair. | *Tenth time.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      shoe(x, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), '#4a4a6a', { sole: STEEL })
      swapLabel(x, 800, 690, lt, 1.0, 'NEW STYLE?', 'SAME ONE ✓', { size: 38, fromBg: PINK, toBg: MINT })
      L(x, 800, 1100, 'PAIR #10', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Moon boots. | *To the grocery store.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOONB, { S: '#d8dbe8', B: SKYB, K: INK }, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.05 })
      L(x, 800, 690, 'GRAVITY: OPTIONAL', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.05, 30)
    } },
  { sign: 'pisces', cap: 'It didn’t fit. | *Cried for the shoe.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shoe(x, 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), LAV, { sole: PINK })
      bubble(x, 800, 700, 'it was SO cute…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0709', key: 'D', accent: '#ff8a5a', ending: 'callback',
  title: 'The signs | *at the shoe store.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero returns.*' },
  last: {
    text: 'Aries, one week later: | *“They’ll stretch.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 420, 1120, 300 * k, { mood: 'squint', look: [1, 0], seed: 40, hops: [t - lt + 1.0, t - lt + 1.4, t - lt + 1.8, t - lt + 2.2] })
      shoe(x, 720, 1240, 20 * pop01(t, t - lt + 0.8, 0.35, 2), RED, { rot: Math.sin(t * 9) * 0.08 })
      L(x, 720, 1380, 'SIZE: STILL WRONG', pop01(t, t - lt + 1.4, 0.3, 2.2), STEEL, 0.04, 32)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
