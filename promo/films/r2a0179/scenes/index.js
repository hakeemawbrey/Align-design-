// r2a0179: star_advice, ADVICE ROLL CALL, "Each sign's | perfect breakfast." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: callback.
//   0.0–3.6    "Each sign’s | *perfect breakfast.*"
//   3.6–49.2   ♈ protein, then conquer the day · ♉ pancakes, slowly · ♊ a little of everything · ♋ breakfast in bed,
//              made by someone else · ♌ brunch in the sun · ♍ overnight oats prepped on Sunday · ♎ something pretty to share
//              with a match · ♏ strong coffee, zero small talk · ♐ street food in a new city · ♑ the same breakfast, every
//              day · ♒ dinner, for breakfast · ♓ cereal while watching the rain (happy tears)
//  49.2        "Eat something good. | *You deserve it.*"
//  52.6        CALLBACK: "Thursday: Virgo | *shared the oats.*"  Virgo hands out the jars.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BUTTER = '#ffe27a'

const EGG = ['..WWWW..', '.WWWWWW.', 'WWWYYWWW', 'WWYYYYWW', 'WWWYYWWW', '.WWWWWW.']
const EGG_C = { W: '#fffaf0', Y: '#ffc23a' }
const PANCAKE = ['....BB....', '..SSSSSS..', 'CCCCCCCCCC', 'cccccccccc', 'CCCCCCCCCC', 'cccccccccc', 'CCCCCCCCCC', 'WWWWWWWWWW']
const PANCAKE_C = { B: BUTTER, S: '#a8542a', C: '#e8a24a', c: '#c9822a', W: '#fffaf0' }
const JAR = ['.KKKK.', 'GGGGGG', 'GOOOOG', 'GObOOG', 'GOOObG', 'GOOOOG', 'GGGGGG']
const JAR_C = { K: '#c98f2a', G: '#bfe8ff', O: '#f0e0c0', b: '#6b62a8' }
const MUG = ['WWWWWWWW..', 'WKKKKKKWWW', 'WKKKKKKW.W', 'WKKKKKKW.W', 'WKKKKKKWWW', 'WKKKKKKW..', '.WWWWWW...']
const MUG_C = { W: '#2a2350', K: '#3a2418' }
const TOAST = ['.TTTTTT.', 'TTTTTTTT', 'TbbbbbbT', 'TbbbbbbT', 'TbbbbbbT', 'TTTTTTTT']
const TOAST_C = { T: '#c98f2a', b: '#f0c87a' }
const BOWL = ['.MMMMMMMMMM.', 'MMYMMMYMMYMM', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '..WWWWWWWW..']
const BOWL_C = { M: '#fff4e2', Y: GOLD, W: SKYB }
const TART = ['..RRBBRR..', '.RBRRBRRB.', 'GGGGGGGGGG', '.CCCCCCCC.']
const TART_C = { R: PINK, B: '#6b62a8', G: '#e8a24a', C: '#c98f2a' }
const PASTA = ['..YYYYYY..', '.YYRRYYYY.', 'YYYRRRYYYY', 'WWWWWWWWWW', '.WWWWWWWW.']
const PASTA_C = { Y: '#ffe27a', R: RED, W: '#fffaf0' }

function tray(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -16, 360, 40); x.fillStyle = '#c98f2a'; x.fillRect(-172, -10, 344, 28)
  x.fillStyle = INK; x.fillRect(-150, 24, 20, 60); x.fillRect(130, 24, 20, 60)
  x.restore()
  if (k > 0.5) { drawBits(x, TOAST, TOAST_C, cx - 80, cy - 52, 11); drawBits(x, MUG, { W: '#fff4e2', K: '#8a4a2e' }, cx + 60, cy - 50, 10); drawBits(x, ['.R.', 'RRR', '.G.', '.G.'], { R: PINK, G: '#5fd068' }, cx + 140, cy - 60, 10) }
}
function rain(x, t, alpha = 1) {
  x.save(); x.globalAlpha = 0.55 * alpha; x.fillStyle = SKYB
  for (let i = 0; i < 26; i++) { const px = 120 + (i * 71) % 840, py = 470 + ((t * 420 + i * 97) % 760); x.fillRect(px, py, 4, 26) }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Protein first. | *Then conquer.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, EGG, EGG_C, 720 + i * 80, 880 + (i % 2) * 50, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      label(x, 790, 1110, 'FUEL: LOADED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Pancakes. *Slowly.* | No plans till ten.', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PANCAKE, PANCAKE_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'SYRUP: GENEROUS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A little bit | *of everything.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const items = [[EGG, EGG_C, 14], [TOAST, TOAST_C, 14], [TART, TART_C, 13], [JAR, JAR_C, 13], [PANCAKE, PANCAKE_C, 10], [BOWL, BOWL_C, 11]]
      items.forEach(([bm, c, cell], i) => drawBits(x, bm, c, 680 + (i % 3) * 120, 800 + Math.floor(i / 3) * 150, cell * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2)))
      label(x, 790, 1110, 'SAMPLER PLATTER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#ffd23a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Breakfast in bed, | *made by someone else.*', mood: 'heart', look: [1, 0], star: { x: -170, y: -40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      x.save(); x.translate(740, 1000); x.scale(1.35, 1.35); x.translate(-740, -1000); tray(x, 740, 1000, pop01(t, P.t0 + 0.3, 0.3, 2)); x.restore()
      label(x, 790, 720, 'FOR YOU ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Brunch in the sun. | *Main character lighting.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.4, 1.6)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = ORANGE; x.beginPath(); x.arc(820, 700, 110, 0, 7); x.fill()
      x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(820, 700, 80, 0, 7); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, PANCAKE, PANCAKE_C, 820, 980, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      sparkles(x, t, 820, 700, P.t0 + 1.0, 8, 160, 0.3)
      label(x, 820, 1150, 'GOLDEN HOUR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Overnight oats, | *prepped on Sunday.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const D = ['MON', 'TUE', 'WED', 'THU', 'FRI']
      D.forEach((d, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); drawBits(x, JAR, JAR_C, 630 + i * 82, 890, 15 * k); label(x, 630 + i * 82, 1000, d, k, { size: 26, bg: BONE, rot: 0, font: MONO, weight: 700 }) })
      label(x, 790, 1130, 'WEEK: SORTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Something *pretty,* | shared with a match.', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TART, TART_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'TOO CUTE TO EAT', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Strong coffee. | *Zero small talk.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: '#fff4e2', K: '#3a2418' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; x.fillStyle = `rgba(239,230,214,${(0.6 * (1 - ph)).toFixed(2)})`; x.fillRect(750 + i * 30 + Math.sin(ph * 7) * 10, 780 - ph * 120, 12, 26) }
      label(x, 790, 1100, 'TALK AFTER CUP 2', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Street food | in *a brand-new city.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'what’s that? | I’ll take two!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, ['.CC.', 'CCCC', 'MMMM', 'CCCC', 'MMMM', '.KK.', '.KK.', '.KK.'], { C: '#e8a24a', M: '#8a4a2e', K: '#c98f2a' }, 790, 950, 24 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.2 })
      label(x, 790, 1130, 'NEW CITY, DAY ONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#ff9a4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Same breakfast | *every day.* It works.', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 364)
      label(x, 790, 1100, `DAY ${d}: TOAST`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: '#9aa5c4', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Dinner. | *For breakfast.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, PASTA, PASTA_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'RULES: OPTIONAL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: '#6fc3ff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cereal while | *watching the rain.*', mood: 'heart', tears: 1, look: [1, -1], star: ST,
    back(x, t, lt, P) { rain(x, t, pop01(t, P.t0 + 0.1, 0.4, 1.4)) },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 800, 920, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 1110, 'HAPPY TEARS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0179', key: 'E', accent: BUTTER, ending: 'callback',
  title: 'Each sign’s | *perfect breakfast.*',
  cameos: CAMEOS,
  group: { cap: 'Eat something good. | *You deserve it.*' },
  last: {
    text: 'Thursday: Virgo | *shared the oats.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const s = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'virgo', 540, 1170, 360 * s, { mood: lt > 1.8 ? 'heart' : 'happy', seed: 44, hops: [t0 + 1.8] })
      for (let i = 0; i < 4; i++) { const k = pop01(t, t0 + 0.8 + i * 0.2, 0.3, 2); drawBits(x, JAR, JAR_C, [200, 340, 740, 880][i], 1020 + (i % 2) * 70, 22 * k) }
      hearts(x, t, 540, 960, t0 + 1.8, { n: 6, life: 1.8, spread: 500, cell: 8, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
