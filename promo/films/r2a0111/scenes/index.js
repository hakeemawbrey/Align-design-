// r2a0111: star_advice, ADVICE SOLO, "Taurus, treat | yourself. No guilt." (~46 s vertical, signs3kit social cut, lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   0.0–3.6    "Taurus, treat | yourself. *No guilt.*"
//   3.6–37.8   flowers from yourself count · dessert first is a perfect order · comfy clothes all weekend is self-care
//              · a bath on a Tuesday · the fancy plates (you're the guest) · cancelled plans to nap (rest is a plan)
//              · the good candle, light it today · profile hobby: "snacks" (honest, love it) · a treat needs no reason
//  37.8        GROUP ending: "Soft life? | *You earned it.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, profile, RED, CREAM, ORANGE, SAGE, BROWN, WOOD, PLATE, FLOWER, FLOWER_C, GIFT, GIFT_C, BLANKET, CROWN, CROWN_C } from './props.js'

const GREEN = '#7fd67a'
const CAKE = ['....W....', '...WWW...', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC']
const CAKE_C = { W: CREAM, P: PINK, C: '#f5d7a8' }
const CANDLE = ['...F...', '..FYF..', '..FYF..', '...K...', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC', 'CCCCCCC', 'GGGGGGG']
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLWLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
function bouquet(x, cx, cy, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 5; i++) drawBits(x, FLOWER, { ...FLOWER_C, P: [PINK, GOLD, LAV, PINK, '#ff8f6b'][i] }, cx - 80 + i * 40, cy - 40 - (i % 2) * 40 - (i === 2 ? 30 : 0), 9 * k)
  x.save(); x.translate(cx, cy + 80); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -60); x.lineTo(110, -60); x.lineTo(20, 90); x.lineTo(-20, 90); x.fill()
  x.fillStyle = '#ffd1dc'; x.beginPath(); x.moveTo(-98, -52); x.lineTo(98, -52); x.lineTo(14, 80); x.lineTo(-14, 80); x.fill()
  x.restore()
}
function tub(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 9; i++) { const bx = -150 + i * 38, by = -70 - Math.abs(Math.sin(i * 1.7 + t * 1.5)) * 40; x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(bx, by, 28, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.fillRect(-196, -60, 392, 150); x.fillStyle = BONE; x.fillRect(-188, -52, 376, 134)
  x.fillStyle = INK; x.fillRect(-170, 90, 26, 34); x.fillRect(144, 90, 26, 34)
  x.restore()
}

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'Bought yourself flowers? | *That counts.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bouquet(x, 790, 820, pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 790, 1090, 'FROM: ME ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 780, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Dessert first? | *A perfect order.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 720, 260, 150, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: -0.04 }, x => {
        txt(x, 'MENU', 0, -44, 26, RED, { font: MONO, weight: 700 })
        txt(x, '1. CAKE', 0, 0, 26, INK, { font: MONO, weight: 700 })
        txt(x, '2. ALSO CAKE', 0, 38, 24, INK, { font: MONO, weight: 700 })
      })
      drawBits(x, PLATE, { W: CREAM }, 790, 1030, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      drawBits(x, CAKE, CAKE_C, 790, 975, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
    } },
  { sign: S, cap: 'Comfy clothes all weekend? | *That’s self-care.*', mood: 'sleepy', star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      drawBits(x, BLANKET, { L: '#b7a6ff', W: CREAM }, F.x + 20, F.cy + 175, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.05 })
      label(x, 790, 720, 'DRESS CODE:', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 800, 'COZY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 60, bg: SAGE, rot: -0.04 })
    } },
  { sign: S, cap: 'A long bath | on a *Tuesday?* Yes.', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      tub(x, t, 770, 900, 0.8 * pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 790, 640, 'NO REASON NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The fancy plates? | *You’re the guest.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, PLATE, { W: '#ffffff' }, 790, 960, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      x.fillStyle = GOLD; for (let i = 0; i < 13; i++) x.fillRect(790 - 160 + i * 25, 960 + Math.sin(i / 12 * Math.PI) * 4 - 50, 12, 6)
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 30, 11 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 790, 720, 'GUEST OF HONOUR', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skipped plans to nap? | *Rest is a plan.*', mood: 'sleepy', star: { x: -130, y: 30 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { L: LAV, W: BONE }, 330, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      card(x, 800, 820, 260, 200, CREAM, { k: pop01(t, P.t0 + 0.4, 0.3, 2), rot: 0.04 }, x => {
        txt(x, 'TODAY', 0, -60, 26, RED, { font: MONO, weight: 700 })
        txt(x, '3:00 PARTY', 0, -8, 26, INK, { font: MONO, weight: 700 })
        if (lt > 1.1) { x.fillStyle = RED; x.fillRect(-100, -11, 200, 6) }
        if (lt > 1.3) txt(x, '3:00 NAP ✓', 0, 46, 28, '#2f9a4a', { font: MONO, weight: 700 })
      })
    } },
  { sign: S, cap: 'Saving the good candle? | *Light it today.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const lit = lt > 1.0
      drawBits(x, lit ? CANDLE : CANDLE.map((r, j) => j < 3 ? '.......' : r), { F: ORANGE, Y: GOLD, K: INK, C: '#ffd1dc', G: GOLD }, 790, 890, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1110, lit ? 'SPECIAL DAY: TODAY' : 'FOR SPECIAL DAYS', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 30, bg: lit ? GOLD : BONE, rot: -0.04, font: MONO, weight: 700 })
      if (lit) sparkles(x, t, 790, 760, P.t0 + 1.3, 6, 110, 0.6)
    } },
  { sign: S, cap: 'Profile hobby: “snacks”? | *Honest. Love it.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 830, pop01(t, P.t0 + 0.15, 0.35, 2), { id: 'taurus', name: '♉︎ TAURUS', ink: GREEN })
      label(x, 790, 1060, 'HOBBY: SNACKS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'A treat | doesn’t need *a reason.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 880, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 6) * 0.04 })
      label(x, 790, 1100, 'REASON: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.2, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0111', key: 'D', accent: GREEN, solo: 'taurus', ending: 'group',
  title: 'Taurus, treat | yourself. *No guilt.*',
  cameos: CAMEOS,
  group: { cap: 'Soft life? | *You earned it.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
