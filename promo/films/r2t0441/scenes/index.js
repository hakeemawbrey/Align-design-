// r2t0441: star_talk, ROLLCALL, "The signs as | *pizza toppings.*" (~59 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs, each the most extreme topping of itself. Ending: lesson (lesson beat + last line).
//   0.0–3.6    hook
//   3.6–49.2   ♈ jalapeños before you asked · ♉ cheese, then more cheese · ♊ half-and-half, both halves keep swapping
//              · ♋ the crust: holds everyone together · ♌ gold leaf on every slice · ♍ pepperoni, perfectly spaced (ruler)
//              · ♎ couldn't pick, ordered one per sign · ♏ looks mild, secretly a ghost pepper · ♐ pineapple, started a debate
//              · ♑ plain cheese with a five-year plan · ♒ gummy bears, called it innovation · ♓ the last slice, left alone, sobbing
//  49.2        "One pie. | *Twelve opinions.*"
//  52.4        LESSON: "Every slice is different. | That’s the *good part.*"  PIZZA: SHARED
//  58.3        "Pisces got | the *last slice.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff8ea', CRUST = '#e0a050', SAUCE = '#d9472f', CHEESE = '#ffd86b', ORANGE = '#ff9a4a'
const PEP = '#b8323a'

/** a whole round pizza; tops(x) draws toppings in pizza-local coordinates (radius r) */
function pizza(x, cx, cy, r, k, { rot = 0, tops, half } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.ellipse(8, 14, r + 10, r + 10, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = CRUST; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = SAUCE; x.beginPath(); x.arc(0, 0, r * 0.86, 0, Math.PI * 2); x.fill()
  if (half) {
    x.fillStyle = half[0]; x.beginPath(); x.arc(0, 0, r * 0.8, Math.PI / 2, Math.PI * 1.5); x.closePath(); x.fill()
    x.fillStyle = half[1]; x.beginPath(); x.arc(0, 0, r * 0.8, -Math.PI / 2, Math.PI / 2); x.closePath(); x.fill()
  } else { x.fillStyle = CHEESE; x.beginPath(); x.arc(0, 0, r * 0.8, 0, Math.PI * 2); x.fill() }
  if (tops) tops(x)
  x.restore()
}
const pep = (x, px, py, s = 22) => { x.fillStyle = INK; x.beginPath(); x.arc(px, py, s + 3, 0, Math.PI * 2); x.fill(); x.fillStyle = PEP; x.beginPath(); x.arc(px, py, s, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e0606a'; x.fillRect(px - s * 0.4, py - s * 0.4, s * 0.35, s * 0.35) }
const SLICE = [
  'CCCCCCCCCCCCC',
  'CCCCCCCCCCCCC',
  '.YYYYYYYYYYY.',
  '.YYPPYYYYYYY.',
  '..YPPYYYPPY..',
  '..YYYYYYPPY..',
  '...YYYYYYY...',
  '...YYPPYYY...',
  '....YPPYY....',
  '....YYYYY....',
  '.....YYY.....',
  '.....YYY.....',
  '......Y......',
]
const SLICE_C = { C: CRUST, Y: CHEESE, P: PEP }
const GOLD_SLICE_C = { C: '#e0b040', Y: GOLD, P: '#fff1a8' }
const JALA = ['....G..', '...GG..', '.LLLL..', 'LLLLLL.', 'LLWLLLL', '.LLLLLL', '..LLLLL', '...LLL.', '....L..']
const JALA_C = { G: '#2f7a3a', L: '#5fd068', W: '#c9ffb0' }
const GHOST = ['....G...', '...GG...', '..RRRR..', '.RRRRRR.', 'RRWRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..', '...RR...']
const GHOST_C = { G: '#2f7a3a', R: '#ff5a3a', W: '#ffd0b0' }
const PINE = ['..G.G.G..', '...GGG...', '..GGGGG..', '.YYYYYYY.', 'YOYYOYYOY', 'YYOYYOYYY', 'YOYYOYYOY', 'YYOYYOYYY', '.YYYYYYY.', '..YYYYY..']
const PINE_C = { G: '#5fd068', Y: '#ffd23a', O: '#c98f2a' }
const BEAR = ['.B...B.', 'BBBBBBB', 'BWBBBWB', 'BBBBBBB', '.BBBBB.', 'BBBBBBB', 'BBBBBBB', '.B...B.']
const BOX = ['KKKKKKKKKKKKKK', 'KWWWWWWWWWWWWK', 'KWWWRRRRRRWWWK', 'KWWWWWWWWWWWWK', 'KKKKKKKKKKKKKK']
const BOX_C = { K: '#8a4a2e', W: '#f3d79a', R: RED }
const SIGNCOL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']

const CAMEOS = [
  { sign: 'aries', cap: 'Extra jalapeños. | *Before you asked.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.3) / 0.12))
      pizza(x, 790, 900, 170, k, { tops(x) { for (let i = 0; i < n; i++) { const a = i * 2.4, r = 30 + (i % 3) * 40; drawBits(x, JALA, JALA_C, Math.cos(a) * r, Math.sin(a) * r, 7, { rot: a }) } } })
      label(x, 790, 660, 'SPICE: YES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Extra cheese. | Then *more cheese.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const layers = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 7)
      pizza(x, 790, 1000, 150, k, { tops(x) { for (let i = 0; i < layers; i++) { const w = 130 - i * 9, y = -10 - i * 30; x.fillStyle = INK; x.beginPath(); x.ellipse(0, y, w + 6, 30, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 2 ? CHEESE : '#ffe89a'; x.beginPath(); x.ellipse(0, y, w, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff1b0'; x.fillRect(-w * 0.5, y - 12, w * 0.4, 6) } } })
      label(x, 790, 640, `CHEESE ×${layers}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Half-and-half. | *Both halves* changed.', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const flip = Math.floor(Math.max(0, lt - 0.5) * 2.5)
      const C = [[CHEESE, '#5fd068'], ['#ff9a4a', CHEESE], ['#c97bff', '#8fe3ff'], ['#5fd068', '#ff8fb1']]
      pizza(x, 790, 900, 170, pop01(t, P.t0 + 0.15, 0.3, 2), { half: C[flip % 4], tops(x) { x.fillStyle = INK; x.fillRect(-4, -140, 8, 280) } })
      label(x, 790, 660, `ORDER #${flip + 1}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'The crust. | *Holds everyone together.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      pizza(x, 790, 900, 170, k, { tops(x) { [[-60, -50], [50, -60], [0, 20], [-50, 80], [60, 70]].forEach(([a, b], i) => pep(x, a, b, 24)) } })
      bubble(x, 790, 640, 'I got you all.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Gold leaf. | On *every slice.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = lt > 0.9
      drawBits(x, SLICE, g ? GOLD_SLICE_C : SLICE_C, 790, 880, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.08 })
      sparkles(x, t, 790, 860, P.t0 + 0.95, 8, 200, 0.4)
      label(x, 790, 1150, 'GARNISH: ME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Pepperoni. | *Spaced to the millimetre.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.3) / 0.11))
      pizza(x, 790, 880, 170, k, { tops(x) { for (let i = 0; i < n; i++) pep(x, -80 + (i % 3) * 80, -80 + Math.floor(i / 3) * 80, 22) } })
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(612, 1080, 356, 44); x.fillStyle = '#ffe7a8'; x.fillRect(616, 1084, 348, 36); x.fillStyle = INK; for (let i = 0; i <= 16; i++) x.fillRect(624 + i * 21, 1084, 3, i % 4 ? 12 : 22) }
      label(x, 790, 650, 'GAP: 4.0 CM ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick. | Ordered *one per sign.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(Math.max(0, lt - 0.2) / 0.1))
      for (let i = 0; i < n; i++) { drawBits(x, BOX, { ...BOX_C, R: SIGNCOL[i] }, 800 + (i % 2 ? 8 : -8), 1170 - i * 40, 16) }
      label(x, 620, 600, '12 PIZZAS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Looks mild. | *Secretly ghost pepper.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GHOST, GHOST_C, 790, 900, 22 * k, { rot: 0.2 })
      label(x, 790, 660, lt < 1.1 ? 'MILD :)' : 'HEAT: CLASSIFIED', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt < 1.1 ? MINT : RED, color: lt < 1.1 ? INK : CREAM, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.1) { for (let i = 0; i < 4; i++) { const ph = (t * 1.2 + i / 4) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = '#ff9a4a'; x.fillRect(760 + i * 20 + Math.sin(ph * 9) * 8, 760 - ph * 120, 10, 26); x.restore() } }
    } },
  { sign: 'sagittarius', cap: 'Pineapple. | Started a *whole debate.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      drawBits(x, PINE, PINE_C, 790, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.08 })
      bubble(x, 700, 640, 'YES!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      bubble(x, 880, 700, 'NEVER.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: PINK, tail: 'br' })
      bubble(x, 800, 1130, 'one bite?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Plain cheese. | Has a *five-year plan.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      pizza(x, 660, 1080, 100, pop01(t, P.t0 + 0.15, 0.3, 2))
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 760); x.rotate(0.04); x.scale(k * 1.15, k * 1.15)
        x.fillStyle = INK; x.fillRect(-136, -146, 272, 292); x.fillStyle = CREAM; x.fillRect(-130, -140, 260, 280)
        x.fillStyle = '#9aa5c4'; x.fillRect(-120, -140, 240, 54); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE PLAN', 0, -112)
        x.textAlign = 'left'; x.font = `700 30px ${MONO}`
        ;['Y1: melt', 'Y2: melt+', 'Y3: expand', 'Y5: franchise'].forEach((s, i) => { if (lt > 0.6 + i * 0.3) x.fillText(s, -116, -50 + i * 54) })
        x.restore()
      }
    } },
  { sign: 'aquarius', cap: 'Gummy bears. | Called it *innovation.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.3) / 0.14))
      pizza(x, 790, 900, 170, pop01(t, P.t0 + 0.15, 0.3, 2), { tops(x) { for (let i = 0; i < n; i++) { const a = i * 0.9 + 0.3, r = 40 + (i % 2) * 50; drawBits(x, BEAR, { B: ['#ff5a7a', '#5fd068', '#ffd23a', '#8fe3ff', '#c97bff'][i % 5], W: INK }, Math.cos(a) * r, Math.sin(a) * r, 8, { rot: a }) } } })
      label(x, 790, 660, 'PATENT PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The last slice. | Left alone. *Sobbing.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 960); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -18, 340, 120); x.fillStyle = '#f3d79a'; x.fillRect(-164, -12, 328, 108)
        x.restore()
        drawBits(x, SLICE, SLICE_C, 790, 940, 12 * k, { rot: -0.3 })
      }
      bubble(x, 790, 700, 'nobody | wants me', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0441', key: 'C', accent: ORANGE, ending: 'lesson',
  title: 'The signs as | *pizza toppings.*',
  cameos: CAMEOS,
  group: { cap: 'One pie. | *Twelve opinions.*' },
  lesson: { text: 'Every slice is different. | That’s the *good part.*', chip: 'PIZZA: SHARED' },
  last: { text: 'Pisces got | the *last slice.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
