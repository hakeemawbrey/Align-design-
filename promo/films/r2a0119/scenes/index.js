// r2a0119: ADVICE ROLLCALL, "How to cook | for each sign." (~63 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm, specific line each with a light visual gag.
//   0.0–3.6    "How to cook | *for each sign.*"
//   3.6–49.2   ♈ fast and spicy, feed them first · ♉ butter, more butter, then dessert · ♊ tiny plates, lots of choices
//              · ♋ grandma's recipe, extra love · ♌ plate it pretty, say "wow" · ♍ clean as you go, they notice
//              · ♎ candles on, make it lovely · ♏ dark chocolate, ask no questions · ♐ cook something new, they'll try it
//              · ♑ a classic, served on time · ♒ pancakes for dinner, they're in · ♓ comfort food, tissues on the side
//  49.2        "Twelve plates. | *One table.*"
//  52.4        LESSON: "Food tastes better | when it’s *made for you.*"  SERVED: WITH LOVE
//  58.3        "Dinner’s ready. | *Pull up a chair.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', GREEN = '#5fd068', CHOC = '#5b2e1a'

const CHILI = ['.....G', '....GG', '...RR.', '..RRR.', '.RRRR.', 'RRRR..', 'RRR...', 'RR....']
const BUTTER = ['..YYYYYYYY', '.YYYYYYYYY', 'YYYYYYYYYY', 'YWYYYYYYYY', 'YYYYYYYYY.', 'YYYYYYYY..']
const TAPAS = ['WWWWW', 'WCCCW', 'WWWWW']
const POT = ['...S.S.S...', '....S.S....', 'KKKKKKKKKKK', 'KRRRRRRRRRK', 'KRRRRRRRRRK', 'KRRRRRRRRRK', '.KRRRRRRRK.', '..KKKKKKK..']
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const GARNISH = ['..G.G..', '.GRGRG.', 'RRRRRRR', '.OOOOO.']
const CANDLE = ['...F...', '..FYF..', '...Y...', '..WWW..', '..WWW..', '..WWW..', '..WWW..', '..WWW..', '.KKKKK.']
const BAR = ['KKKKKKKKK', 'KCCKCCKCK', 'KCCKCCKCK', 'KKKKKKKKK', 'KCCKCCKCK', 'KCCKCCKCK', 'KKKKKKKKK']
const BOWL = ['.Y.Y..Y.Y.', 'YYYYYYYYYY', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..']
const ROAST = ['....WW....', '..BBBBBB..', '.BBbBBbBB.', 'BBBBBBBBBB', 'BBbBBBBbBB', 'WWWWWWWWWW']
const STACK = ['...S....', '..SSY...', 'PPPPPPPP', 'pppppppp', 'PPPPPPPP', 'pppppppp', 'PPPPPPPP']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BLLLLLLB', 'BLBBBBLB', 'BLLLLLLB', 'BBBBBBBB']
const SOUP = ['..S..S..', '...S..S.', 'KKKKKKKK', 'KOOOOOOK', '.KOOOOK.', '..KKKK..']

function sparkle(x, t, cx, cy, n = 3) {
  for (let i = 0; i < n; i++) {
    const ph = (t * 1.2 + i / n) % 1
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = '#ffffff'
    const px = cx + Math.sin(i * 2.4) * 110, py = cy + Math.cos(i * 1.7) * 60
    x.fillRect(px - 3, py - 14, 6, 28); x.fillRect(px - 14, py - 3, 28, 6); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fast and spicy. | *Feed them first.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, CHILI, { R: RED, G: GREEN }, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 + 0.05 * Math.sin(t * 20) })
      label(x, 790, 700, 'HEAT: YES', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Butter. More butter. | *Then dessert.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 2.99)
      for (let i = 0; i < n; i++) drawBits(x, BUTTER, { Y: '#ffe08a', W: '#fff' }, 790 + (i % 2) * 20, 1040 - i * 120, 20)
      label(x, 790, 650, 'BUTTER ×3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Tiny plates. | *Lots of choices.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, GOLD, MINT, SKYB, ORANGE, LAV]
      for (let i = 0; i < 6; i++) drawBits(x, TAPAS, { W: '#fff4e2', C: COLS[i] }, 700 + (i % 3) * 100, 860 + Math.floor(i / 3) * 110, 18 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      label(x, 800, 690, 'PICK ANY!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Grandma’s recipe. | *Extra love.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, R: PINK, S: BONE }, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 880, P.t0 + 0.7, { n: 6, life: 2.0, spread: 120, cell: 7, seed: 2 })
      label(x, 790, 680, 'SECRET: LOVE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Plate it pretty. | Say *"wow."*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: '#fff4e2' }, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GARNISH, { G: GREEN, R: RED, O: ORANGE }, 790, 950, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 790, 740, 'WOW.', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 60, tail: 'bl' })
      sparkles(x, t, 790, 950, P.t0 + 1.3, 7, 160, 0.3)
    } },
  { sign: 'virgo', cap: 'Clean as you go. | *They notice.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(620, 990, 340, 40); x.fillStyle = '#d8dbe8'; x.fillRect(628, 996, 324, 28); x.restore() }
      if (lt > 0.8) sparkle(x, t, 790, 940, 4)
      label(x, 790, 760, 'SPOTLESS ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 42, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Candles on. | *Make it lovely.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const fl = Math.floor(t * 8) % 2
      ;[720, 860].forEach((cx, i) => drawBits(x, CANDLE, { F: fl ? ORANGE : GOLD, Y: GOLD, W: '#fff4e2', K: BROWN }, cx, 960, 20 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2)))
      const g = pop01(t, P.t0 + 0.9, 0.5, 1.2)
      if (g > 0.01) { x.save(); x.globalAlpha = 0.18 * g; x.fillStyle = '#ffd98a'; x.beginPath(); x.arc(790, 900, 180, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 690, 'AMBIENCE: 10/10', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Dark chocolate. | *Ask no questions.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BAR, { K: CHOC, C: '#8a4a2e' }, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bubble(x, 790, 700, 'mine.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 48, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Cook something new. | *They’ll try it.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, BOWL, { Y: '#ffe08a', B: SKYB }, 790, 980, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 790, 'MYSTERY DISH', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'seconds!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'A classic, done well. | *Served on time.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ROAST, { W: '#fff4e2', B: '#b5652e', b: '#8a4a2e' }, 790, 990, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, '7:00 PM SHARP', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Pancakes for dinner? | *They’re in.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, STACK, { S: '#fff4e2', Y: GOLD, P: '#e8a24a', p: '#c98f5a' }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'RULES: OPTIONAL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Comfort food. | *Tissues on the side.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SOUP, { K: INK, O: ORANGE, S: BONE }, 720, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, TISSUE, { W: '#ffffff', B: LAV, L: '#b7a6ff' }, 880, 990, 18 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      label(x, 800, 760, 'SO GOOD (CRYING)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0119', key: 'E', accent: ORANGE, ending: 'lesson',
  title: 'How to cook | *for each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve plates. | *One table.*' },
  lesson: { text: 'Food tastes better | when it’s *made for you.*', chip: 'SERVED: WITH LOVE' },
  last: { text: 'Dinner’s ready. | *Pull up a chair.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
