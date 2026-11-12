// r2t0524: star_talk, BE LIKE roll call, "Signs meeting a cat | *be like.*" (topic: Zodiacs meeting a cat)
// (~57 s vertical, signs3kit social cut, music: lofi · D). Twelve signs in zodiac order, each the most extreme first meeting
// with a cat. Ending: callback.
//   0.0–3.6    "Signs meeting a cat | *be like.*"
//   3.6–49.2   ♈ ran at the cat, the cat ran faster · ♉ the cat sat on them, never moving again · ♊ talked to it in three
//              voices · ♋ knitted it a sweater in five minutes · ♌ the cat ignored them, took it personally · ♍ brushed it,
//              built a second cat · ♎ couldn't pick a name, gave it twelve · ♏ stared it down, the cat blinked first
//              · ♐ took it on a road trip · ♑ gave it a job title · ♒ asked the cat its sign · ♓ it purred, Pisces sobbed
//  49.2        "Twelve signs. | *One cat in charge.*"
//  52.6        CALLBACK: "And Taurus? | *Still under the cat.*"  the cat is back on Taurus, asleep.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const SL = { x: -160 }, SR = { x: 150 }

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
// the cat (sitting, tail up on the right). E = eye, K = pupil, P = nose, W = paws
const CAT = [
  '.O.......O...',
  'OOO.....OOO..',
  'OOOOOOOOOOO..',
  'OOSOOOOOSOO..',
  'OEKOOOOOEKO..',
  'OOOOOPOOOOO..',
  '.OOOOOOOOO...',
  '..OOOOOOO...O',
  '.OOOOOOOOO..O',
  'OOSOOOOOSOO.O',
  'OOOOOOOOOOOOO',
  'OWWOOOOOWWOO.',
]
const CAT_SLEEP = CAT.map((r, j) => j === 4 ? 'OKKOOOOOKKO..' : r)
const CAT_C = { O: ORANGE, S: '#e08a2a', E: '#7dffb0', K: INK, P: PINK, W: CREAM }
const cat = (x, cx, cy, cell, o = {}) => drawBits(x, o.sleep ? CAT_SLEEP : CAT, { ...CAT_C, ...(o.cols || {}) }, cx, cy, cell, o)
const YARN = ['..PPPP..', '.PPWPPP.', 'PPPPWPPP', 'PWPPPPWP', 'PPPWPPPP', '.PPPPWP.', '..PPPP..']
const FUR = ['...OO..O..', '.OOOOOOOO.', 'OOOSOOOOOO', 'OOOOOOSOOO', '.OOOOOOOO.']
const BAG = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.K......K.']

const CAMEOS = [
  { sign: 'aries', cap: 'Ran at the cat. | *The cat ran faster.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: SL, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      const g = ease.inCubic(prog(lt, 0.7, 1.3))
      cat(x, lerp(790, 1100, g), 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - g })
      if (g > 0.2) { x.save(); x.globalAlpha = 0.6 * (1 - prog(lt, 1.6, 2.2)); x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(700, 900 + i * 50, 150, 8); x.restore() }
      bubble(x, 780, 680, 'BEST FRIENDS!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1100, 'CAT: GONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GREY, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'The cat sat on them. | *Never moving again.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -40, y: 60, s: 280 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.2, 0.7))
      cat(x, F.x + 10, lerp(500, F.top - 60, d), 14, { sleep: lt > 1.0, alpha: clamp(lt / 0.2) })
      L(x, 800, 660, 'STUCK: HAPPILY', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#5fd068', 0.04, 32)
      L(x, 300, 1110, 'PLANS: CANCELLED', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Talked to the cat. | *In three voices.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: SL,
    front(x, t, lt, P) {
      cat(x, 820, 1000, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const W = ['who’s a baby?', 'good EVENING, sir.', 'yo, little man.']
      W.forEach((w, i) => bubble(x, 760, 640 + i * 100, w, pop01(t, P.t0 + 0.4 + i * 0.45, 0.25, 2.2), { size: 32, col: [BONE, MINT, PINK][i], tail: 'bl' }))
    } },
  { sign: 'cancer', cap: 'Knitted it a sweater. | *In five minutes.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      const dressed = lt > 1.1
      cat(x, 800, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (dressed) { x.save(); x.fillStyle = INK; x.fillRect(800 - 90, 900 + 4, 180, 92); x.fillStyle = '#6fc3ff'; x.fillRect(800 - 84, 900 + 10, 168, 80); x.fillStyle = CREAM; for (let i = 0; i < 4; i++) x.fillRect(800 - 70 + i * 40, 930, 20, 12); x.restore() }
      if (!dressed) drawBits(x, YARN, { P: '#6fc3ff', W: CREAM }, 640, 1050, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 660, dressed ? 'SWEATER: DONE' : 'KNITTING…', pop01(t, P.t0 + 0.5, 0.3, 2.4), PINK, 0.04, 32)
      if (dressed) hearts(x, t, 800, 820, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'The cat ignored them. | *Leo took it personally.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      cat(x, 820, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 760, 660, 'it’s ME. LEO.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1120, 'CAT: UNIMPRESSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GREY, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Brushed the cat. | *Built a second cat.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      cat(x, 700, 960, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const g = clamp((lt - 0.5) / 1.0)
      if (g > 0.05) drawBits(x, g < 1 ? FUR : CAT, { ...CAT_C, E: CREAM, K: CREAM, P: ORANGE, W: ORANGE }, 880, 960, 13 * (g < 1 ? 0.6 + 0.4 * g : 1))
      L(x, 790, 660, 'FUR: REPURPOSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Couldn’t pick a name. | *Gave it twelve.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      cat(x, 800, 1010, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const N = ['MOCHI', 'SIR PAWS', 'BEAN', 'DUCHESS', 'TOAST']
      N.forEach((n, i) => L(x, 680 + (i % 2) * 220, 620 + i * 62, n, pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2.4), [PINK, GOLD, MINT, LAV, SKYB][i], (i % 2 ? 0.06 : -0.06), 26))
    } },
  { sign: 'scorpio', cap: 'Stared the cat down. | *The cat blinked first.*', mood: 'squint', look: [1, 0], star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cat(x, 820, 930, 17 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1, sleep: lt > 1.2 && lt < 1.45 })
      L(x, 790, 640, 'STARING CONTEST', pop01(t, P.t0 + 0.4, 0.3, 2.4), LAV, -0.04, 32)
      L(x, 790, 1120, 'WINNER: SCORPIO', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, 0.04, 32, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Took the cat | *on a road trip.*', mood: 'sparkle', star: SR, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      cat(x, 330, 780, 12 * k)
      drawBits(x, BAG, { K: INK, B: '#c97bff', Y: GOLD }, 330, 900, 22 * k)
      L(x, 330, 1080, 'MILES: MANY', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 32)
      bubble(x, 330, 620, 'mrrp?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Gave the cat | *a job title.*', mood: 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      cat(x, 330, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(330, 1000); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -40, 300, 92); x.fillStyle = CREAM; x.fillRect(-142, -32, 284, 76); txt(x, 'HEAD OF MICE', 0, -6, 28, INK, 'center', MONO, 700); txt(x, 'senior', 0, 26, 20, '#4a4470', 'center', MONO, 700); x.restore() }
      L(x, 330, 640, 'PROMOTED: DAY 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#2fc79a', -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Asked the cat | *its sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cat(x, 820, 980, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 760, 650, 'what’s your sign?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 750, 800, 'CAT: A LEO. OBVIOUSLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: 'pisces', cap: 'The cat purred. | *Pisces sobbed.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: SL,
    front(x, t, lt, P) {
      cat(x, 820, 980, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { sleep: true })
      txt(x, 'prrr', 840, 820 - 6 * Math.sin(t * 8), 34, LAV, 'center', MONO, 700)
      L(x, 790, 650, 'TOO CUTE. SORRY.', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 30)
      hearts(x, t, 820, 900, P.t0 + 1.2, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0524', key: 'D', accent: ACC, ending: 'callback',
  title: 'Signs meeting a cat | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One cat in charge.*' },
  last: {
    text: 'And Taurus? | *Still under the cat.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      const Fq = signChar(x, t, 'taurus', 540, 1200, 360 * k, { mood: 'sleepy', seed: 33 })
      cat(x, 540, Fq.top - 70, 16 * k, { sleep: true })
      if (lt > 1.2) txt(x, 'z z z', 700, 980 - 10 * Math.sin(t * 2), 40, LAV, 'center', MONO, 700)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
