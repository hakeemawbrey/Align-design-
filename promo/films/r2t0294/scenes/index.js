// r2t0294: star_talk, SOLO, "Aquarians shopping | be like." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (solo mode, 9 cards): every shopping trip, pushed to the most Aquarius extreme.
//   0.0–3.6    "Aquarians shopping | *be like.*"
//   3.6–37.8   skipped the mall for a thrift store · bought a lamp shaped like a moth · asked the cashier about aliens
//              · the trend says beige, bought neon green · shopping list: "vibes" · bought a gift for a stranger
//              · socks: mismatched, on purpose · checked the shirt's compatibility · left with nothing but a rock
//  37.8        "Not weird. | *Ahead of the trend.*"   41.2  callback: "Still the best buy? | *The moth lamp.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, GREY, DEEP, GREEN, WOOD, BROWN, SUN, clamp, ease, lerp, prog } from './props.js'

const S = 'aquarius', ST = { x: -180 }, ACC = SKYB
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })
const NEON = '#7dff3a'

const MOTH = ['M.......M', 'MM.....MM', 'MMM.K.MMM', 'MWMMKMMWM', 'MMMMKMMMM', '.MM.K.MM.', '..M.K.M..']
const LAMP_BASE = ['....KK....', '....KK....', '....KK....', '....KK....', '..KKKKKK..', '.KKKKKKKK.']
const UFO = ['....GGG....', '...GWWWG...', '.KKKKKKKKK.', 'KSSSSSSSSSK', '.KYKKYKKYK.', '..KKKKKKK..']
const SOCK = ['KKKK.', 'KAAK.', 'KAAK.', 'KAAK.', 'KAAKK', 'KAAAK', 'KKKKK']
const ROCK = ['..KKKKK...', '.KGGGGGK..', 'KGGgGGGGK.', 'KGGGGGgGGK', 'KGgGGGGGGK', '.KKKKKKKK.']
const COAT = ['..KK..KK..', '.KNNKKNNK.', 'KNNNNNNNNK', 'KNNNKKNNNK', 'KNNNKKNNNK', 'KNNNNNNNNK', 'KNNNKKNNNK', 'KNNNNNNNNK', 'KKKKKKKKKK']

function mothLamp(x, t, cx, cy, cell, k, glow = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.globalAlpha = 0.28 * glow * (0.85 + 0.15 * Math.sin(t * 3)); x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(0, -cell * 3, cell * 9, 0, Math.PI * 2); x.fill(); x.restore()
  drawBits(x, MOTH, { M: '#e8d6a8', W: '#fff7d8', K: BROWN }, 0, -cell * 3 + Math.sin(t * 4) * 2, cell, { sx: 1 + 0.06 * Math.sin(t * 6) })
  drawBits(x, LAMP_BASE, { K: '#6b62a8' }, 0, cell * 3.5, cell)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Skipped the mall. | Went *thrifting.*', mood: 'sparkle', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.06 }, () => {
        txt(x, 'VINTAGE', 0, -50, { size: 32, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, '2.00', 0, 20, { size: 64, font: MONO, weight: 700, color: RED })
      })
      lab(x, 790, 1100, 'FOUND: A TREASURE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'Bought a lamp | shaped like a *moth.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mothLamp(x, t, 790, 900, 22, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.6) * 2))
      lab(x, 790, 650, 'NEEDED: NO. WANTED: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: SUN, rot: 0.04 })
    } },
  { sign: S, cap: 'Asked the cashier | about *aliens.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1010, 170 * k, { mood: lt > 1.2 ? 'wide' : 'neutral', look: [-1, 0], seed: 23, glyph: false })
      bubble(x, 760, 690, 'so… do YOU | believe?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'br' })
      drawBits(x, UFO, { G: '#b6ffd0', W: '#ffffff', K: INK, S: '#9aa5c4', Y: SUN }, 430, 620 + Math.sin(t * 3) * 10, 16 * pop01(t, P.t0 + 1.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.1 })
    } },
  { sign: S, cap: 'Trend says beige. | Bought *neon green.*', mood: 'sparkle', star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      drawBits(x, COAT, { K: INK, N: NEON }, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      lab(x, 790, 640, 'TREND: IGNORED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: GREY, rot: -0.04 })
      sparkles(x, t, 790, 880, P.t0 + 0.8, 7, 200, 0.2, [NEON, BONE, SKYB])
    } },
  { sign: S, cap: 'Shopping list: | *"vibes."*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffe066', rot: -0.05 }, () => {
        txt(x, 'TO BUY:', -100, -120, { size: 28, font: MONO, weight: 700, align: 'left' })
        txt(x, '1. vibes', -100, -50, { size: 32, align: 'left' }); if (lt > 0.8) txt(x, '2. a fern?', -100, 10, { size: 32, align: 'left' }); if (lt > 1.3) txt(x, '3. ???', -100, 70, { size: 32, align: 'left', color: RED })
      })
    } },
  { sign: S, cap: 'Bought a gift | for a *total stranger.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 1000, 170 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 24, glyph: false })
      card(x, 650, 980, 110, 100, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: PINK, rot: 0.1 }, () => { x.fillStyle = GOLD; x.fillRect(-10, -50, 20, 100); x.fillRect(-55, -10, 110, 20) })
      bubble(x, 800, 690, 'for… me?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'br' })
      hearts(x, t, 830, 900, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'New socks. | *Mismatched.* On purpose.', mood: 'wink', star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SOCK, { K: INK, A: PINK }, 720, 880, 26 * k, { rot: -0.1 })
      drawBits(x, SOCK, { K: INK, A: NEON }, 880, 900, 26 * k, { rot: 0.12, sx: -1 })
      lab(x, 800, 1110, 'MATCHING IS A CONSTRUCT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: LAV, rot: -0.03 })
    } },
  { sign: S, cap: 'Checked the shirt’s | *compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 840, 240, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SKYB, rot: 0.04 }, () => {
        txt(x, '♒', 0, -10, { size: 120, color: INK, font: "'Noto Sans Symbols 2', 'Noto Sans Symbols', serif", weight: 400 })
      })
      chart(x, 650, 680, 60, pop01(t, P.t0 + 0.6, 0.35, 2), t)
      lab(x, 790, 1100, lt > 1.4 ? 'SHIRT: ALSO AQUARIUS' : 'CHECKING CHART…', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: lt > 1.4 ? MINT : BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'Left with nothing | but *a rock.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROCK, { K: INK, G: '#9aa5c4', g: '#6b7290' }, 790, 900, 32 * pop01(t, P.t0 + 0.3, 0.35, 2))
      lab(x, 790, 680, 'BEST DAY EVER', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: SUN, rot: 0.04, size: 36 })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 7, 180, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0294', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Aquarians shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Not weird. | *Ahead of the trend.*', mood: 'wink' },
  last: {
    text: 'Still the best buy? | *The moth lamp.*',
    draw(x, t, lt) {
      mothLamp(x, t, 540, 1050, 32, pop01(t, t - lt + 0.4, 0.45, 2), clamp((lt - 0.8) * 2))
      const k = pop01(t, t - lt + 1.0, 0.4, 2)
      if (k > 0.01) signChar(x, t, S, 290, 1150, 210 * k, { mood: 'heart', look: [1, -1], seed: 9 })
      lab(x, 600, 1360, 'GLOWING. THRIVING.', pop01(t, t - lt + 1.5, 0.3, 2.2), { bg: SUN, rot: -0.03, size: 38 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
