// r2a0365: star_advice, ADVICE ROLL CALL, "Weekend recipes | for each sign." (~56 s vertical, signs3kit social cut, music: lofi · G)
// Batch topic: "What each sign | should cook this weekend." Twelve signs, one warm, specific dish each, with a light visual gag.
// Ending: callback.
//   ♈ a quick stir-fry, done in eight minutes · ♉ slow-cooked anything, worth every hour · ♊ tapas: tiny bites, many choices
//   · ♋ grandma's soup (call her for the recipe) · ♌ homemade pizza shaped like a crown · ♍ meal prep, five perfect boxes
//   · ♎ a pretty brunch, plated twice · ♏ something spicy. very spicy. · ♐ a dish from somewhere you want to visit
//   · ♑ a classic roast, no shortcuts · ♒ invent a recipe, name it after you · ♓ chop the onions, cry guilt-free
//  49.2  "Twelve kitchens. | *One big dinner.*"
//  52.6  callback: "Scorpio made it | *spicier anyway.*" (the chilli comes back, hotter)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ACC = '#ffb36b', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const ST = { x: -170 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const WOK = [
  '.G..R..O..G...',
  'KKKKKKKKKKKKKKKKK',
  '.KSSSSSSSSSSSSK..',
  '..KSSSSSSSSSSK...',
  '...KKKKKKKKKK....',
]
const WOK_C = { K: INK, S: '#6b7591', G: '#5fd068', R: RED, O: '#ffb34a' }
const OVEN = [
  'KKKKKKKKKKKKKK',
  'KGGGGGGGGGGGGK',
  'KGYGYGYGGGGGGK',
  'KKKKKKKKKKKKKK',
  'KGGGGGGGGGGGGK',
  'KGKKKKKKKKKKGK',
  'KGKOOOOOOOOKGK',
  'KGKOOOOOOOOKGK',
  'KGKOOOOOOOOKGK',
  'KGKKKKKKKKKKGK',
  'KGGGGGGGGGGGGK',
  'KKKKKKKKKKKKKK',
]
const OVEN_C = { K: INK, G: '#d9d0c0', Y: GOLD, O: '#ff9a4a' }
const PIZZA = [
  'C...C...C...C',
  'CC.CCC.CCC.CC',
  'CCCCCCCCCCCCC',
  'CYYRYYYYRYYYC',
  'CYYYYGYYYYRYC',
  'CYRYYYYRYYYYC',
  'CYYYYRYYYGYYC',
  'CCCCCCCCCCCCC',
]
const PIZZA_C = { C: '#e0a96d', Y: '#ffd23a', R: RED, G: '#5fd068' }
const PEPPER = [
  '.....GG..',
  '....GG...',
  '..RRRR...',
  '.RRWRRR..',
  'RRRRRRR..',
  'RRRRRR...',
  '.RRRRR...',
  '..RRRR...',
  '...RRR...',
  '....RR...',
  '.....R...',
]
const PEPPER_C = { G: '#5fd068', R: '#e23d4e', W: '#ff9a9a' }
const ONION = [
  '....G....',
  '...GG....',
  '..PPPPP..',
  '.PPLPPPP.',
  'PPLPPLPPP',
  'PPLPPLPPP',
  'PPPLPPLPP',
  '.PPPPPPP.',
  '..PPPPP..',
]
const ONION_C = { G: '#5fd068', P: '#e8c8f0', L: '#c9a0d8' }
const DRUM = [
  '....WW.',
  '...WWW.',
  '..BB...',
  '.BBBB..',
  'BBBBBB.',
  'BBBBBB.',
  'BBBBB..',
  '.BBB...',
]
const DRUM_C = { W: BONE, B: '#c97a3a' }
/** a plate: a white disc with whatever's on it */
function plate(x, cx, cy, r, k, food) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.ellipse(8, 12, r, r * 0.62, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, r + 6, r * 0.62 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 0, r, r * 0.62, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e0d6c4'; x.beginPath(); x.ellipse(0, 0, r * 0.7, r * 0.42, 0, 0, Math.PI * 2); x.fill()
  if (food) food(x)
  x.restore()
}
function box(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-66, -46, 132, 92); x.fillStyle = '#cfefff'; x.fillRect(-60, -40, 120, 80)
  x.fillStyle = '#5fd068'; x.fillRect(-52, -32, 50, 64); x.fillStyle = '#ffd23a'; x.fillRect(4, -32, 48, 30); x.fillStyle = '#c97a3a'; x.fillRect(4, 4, 48, 28)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A quick stir-fry. | *Done in eight minutes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, WOK, WOK_C, 790, 920 + Math.sin(t * 16) * 6, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 8) * 0.05 })
      const s = Math.max(0, 480 - Math.floor(lt * 200))
      label(x, 790, 660, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: RED, color: BONE, rot: -0.04, ...M })
    } },
  { sign: 'taurus', cap: 'Slow-cooked anything. | *Worth every hour.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, OVEN, OVEN_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, `HOUR ${Math.min(6, 1 + Math.floor(lt * 2.5))} OF 6`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'gemini', cap: 'Tapas. | *Tiny bites, many choices.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = [RED, '#5fd068', '#ffd23a', '#c97a3a', PINK, '#ff9a4a']
      cols.forEach((c, i) => plate(x, 700 + (i % 3) * 95, 790 + Math.floor(i / 3) * 140, 50, pop01(t, P.t0 + 0.2 + i * 0.1, 0.25, 2), x => { x.fillStyle = c; x.beginPath(); x.arc(0, -4, 20, 0, Math.PI * 2); x.fill() }))
      label(x, 790, 1110, 'CHOICES: ALL OF THEM', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'cancer', cap: 'Grandma’s soup. | *Call her for the recipe.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'a pinch of | what, grandma?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      bubble(x, 800, 960, '“of love.”', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 60, col: PINK, tail: 'br' })
      hearts(x, t, 560, 1100, P.t0 + 1.2, { n: 4, life: 1.6, spread: 80, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Homemade pizza. | *Shaped like a crown.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2.2)
      drawBits(x, PIZZA, PIZZA_C, 790, 880, 22 * k)
      if (k > 0.9) sparkles(x, t, 790, 880, P.t0 + 0.8, 7, 190, 0.2, [GOLD, BONE, '#ffb34a'])
      label(x, 790, 1110, 'FIT FOR ROYALTY (ME)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'virgo', cap: 'Meal prep. | *Five perfect boxes.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) box(x, 690 + (i % 3) * 110 + (i >= 3 ? 55 : 0), 800 + Math.floor(i / 3) * 120, 0.9 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2))
      label(x, 790, 1100, 'MON–FRI: HANDLED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: 'libra', cap: 'A pretty brunch. | *Plated twice.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const redo = lt > 1.0
      plate(x, 790, 880, 150, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(redo ? 0 : -40, -6, 30, 0, Math.PI * 2); x.fill()
        x.fillStyle = PINK; for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; x.beginPath(); x.arc((redo ? 70 : 20) + Math.cos(a) * 14, -8 + Math.sin(a) * 14, 9, 0, Math.PI * 2); x.fill() }
        x.fillStyle = '#5fd068'; x.fillRect(redo ? -80 : 40, 20, 40, 10)
      })
      label(x, 790, 660, redo ? 'PLATING: ROUND 2' : 'PLATING: ROUND 1', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: PINK, rot: 0.04, ...M })
    } },
  { sign: 'scorpio', cap: 'Something spicy. | *Very spicy.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PEPPER, PEPPER_C, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 790, 1120, `HEAT: ${Math.min(10, 1 + Math.floor(lt * 6))}/10`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: RED, color: BONE, rot: -0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'A dish from somewhere | *you want to visit.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plate(x, 790, 940, 140, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#ffe7a8'; for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse(-50 + i * 20, -6 + (i % 2) * 10, 26, 10, 0.4, 0, Math.PI * 2); x.fill() }
        x.fillStyle = '#5fd068'; x.fillRect(20, -20, 14, 14); x.fillStyle = RED; x.fillRect(-30, 8, 14, 14)
      })
      label(x, 790, 660, 'DINNER: ✈ TRAVEL MODE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, ...M })
    } },
  { sign: 'capricorn', cap: 'A classic roast. | *No shortcuts.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plate(x, 790, 940, 150, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        drawBits(x, DRUM, DRUM_C, -30, -16, 12); drawBits(x, DRUM, DRUM_C, 40, -10, 12, { rot: 0.5 })
        x.fillStyle = '#ff9a4a'; x.fillRect(-90, 20, 30, 14); x.fillStyle = '#5fd068'; x.fillRect(70, 18, 26, 14)
      })
      label(x, 790, 660, 'DINNER: 6:00 SHARP', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: '#7fd1c7', rot: -0.04, ...M })
    } },
  { sign: 'aquarius', cap: 'Invent a recipe. | *Name it after you.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plate(x, 790, 920, 140, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.strokeStyle = '#ffe14a'; x.lineWidth = 8; x.beginPath(); for (let i = 0; i <= 40; i++) { const a = i * 0.6, r = 4 + i * 1.8; i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.6) : x.moveTo(r, 0) } x.stroke()
        x.fillStyle = SKYB; x.beginPath(); x.arc(30, -20, 10, 0, Math.PI * 2); x.fill()
      })
      label(x, 790, 680, 'THE AQUA-NOODLE ™', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, ...M })
    } },
  { sign: 'pisces', cap: 'Chop the onions. | *Cry guilt-free.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ONION, ONION_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'FINALLY, AN EXCUSE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2a0365', key: 'G', accent: ACC, ending: 'callback',
  title: 'Weekend recipes | *for each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve kitchens. | *One big dinner.*' },
  last: {
    text: 'Scorpio made it | *spicier anyway.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2.2)
      drawBits(x, PEPPER, PEPPER_C, 540, 1140, 36 * k, { rot: 0.2 + (lt > 1.2 ? Math.sin(t * 40) * 0.03 : 0) })
      label(x, 540, 1400, 'HEAT: 11/10', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 44, bg: RED, color: BONE, rot: -0.05, ...M })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
