// r2t0001: star_talk, SOLO film, "Being a Taurus | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Taurus version.
//   0.0–3.6    "Being a Taurus | *be like.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              plans at 8, pajamas at 7 · someone took the last fry (noted, forever) · huge menu, orders the usual
//              · asked to scoot over, grew roots · cozy level: eleven blankets · new match, first question: favourite snack?
//              · proven wrong, still right · fancy candle? bought three · same houseplant for eleven years (hi, Gerald)
//  37.8        "Slow. Cozy. | *Unmovable.*"  Taurus comes back, big.
//  41.0        LESSON UNLOCKED: "Feed a Taurus once. | *Loyal forever.*"  STATUS: COZY
//  46.9        "The last fry? | *Still not over it.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', RED = '#e23d4e', WOOD = '#c98f2a', CREAM = '#fff4e2'
const S = 'taurus'

// ── props
const NIGHTCAP = [
  '..........WW',
  '.........WWW',
  '.......BBBW.',
  '.....BBBBB..',
  '...BBBBBBB..',
  '..BBBBBBBBB.',
  '.BBBBBBBBBB.',
  'WWWWWWWWWWWW',
]
const NIGHTCAP_C = { B: LAV, W: CREAM }
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const FRYBOX = [
  'Y.Y.YY.Y',
  'YYYYYYYY',
  'RRRRRRRR',
  'RRWWWWRR',
  'RRWRRWRR',
  '.RRRRRR.',
  '.RRRRRR.',
  '..RRRR..',
]
const FRYBOX_EMPTY = [
  '........',
  '........',
  'RRRRRRRR',
  'RRWWWWRR',
  'RRWRRWRR',
  '.RRRRRR.',
  '.RRRRRR.',
  '..RRRR..',
]
const FRY = ['Y', 'Y', 'Y', 'Y', 'Y', 'Y']
const FRY_C = { Y: '#ffd23a', R: RED, W: CREAM }
const CANDLE = [
  '..F..',
  '.FOF.',
  '.FOF.',
  '..K..',
  'WWWWW',
  'WPPPW',
  'WWWWW',
  'WWWWW',
  'WWWWW',
  'WWWWW',
]
const CANDLE_C = { F: '#ffb34a', O: '#fff1b0', K: INK, W: CREAM, P: '#c9a6ff' }
const PLANT = [
  '...G....G...',
  '..GGG..GGG..',
  '.GGgGG.GgGG.',
  '..GGG.GGG...',
  '...GG.GG..G.',
  '.G..GGG..GG.',
  'GGG..G..GGG.',
  '.GGG.G.GGG..',
  '...GGGGG....',
  '.....G......',
  '..TTTTTTTT..',
  '..TTTTTTTT..',
  '...TTTTTT...',
  '...TTTTTT...',
  '....TTTT....',
]
const PLANT_C = { G: GREEN, g: '#a6f08a', T: '#e07a4a' }
const ARMCHAIR = [
  '.CCCCCCCCCCCCCC.',
  'CCCCCCCCCCCCCCCC',
  'CCCCCCCCCCCCCCCC',
  'CCCCCCCCCCCCCCCC',
  'CCCCCCCCCCCCCCCC',
  'AACCCCCCCCCCCCAA',
  'AAccccccccccccAA',
  'AAccccccccccccAA',
  'AAAAAAAAAAAAAAAA',
  'AAAAAAAAAAAAAAAA',
  '.K............K.',
]
const ARMCHAIR_C = { C: '#c0567a', c: '#e0789a', A: '#9e3c60', K: '#5b2e1a' }

// a menu card with endless lines of dishes
function menu(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -214, 296, 444)
  x.fillStyle = INK; x.fillRect(-152, -226, 304, 452)
  x.fillStyle = CREAM; x.fillRect(-144, -218, 288, 436)
  x.fillStyle = RED; x.fillRect(-144, -218, 288, 56)
  x.fillStyle = CREAM; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -190)
  const scroll = (lt * 60) % 26
  x.save(); x.beginPath(); x.rect(-144, -158, 288, 370); x.clip()
  for (let i = 0; i < 16; i++) {
    const py = -146 + i * 26 - scroll
    x.fillStyle = '#b9b0a0'; x.fillRect(-120, py, 150 + ((i * 37) % 60), 10)
    x.fillStyle = '#d6cdbb'; x.fillRect(80, py, 40, 10)
  }
  x.restore()
  x.restore()
}
// a phone with a new match and the first message
function phone(x, cx, cy, k, sent, reply) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, -132)
  if (sent > 0.01) {
    x.save(); x.translate(14, -40); x.scale(sent, sent)
    x.fillStyle = GREEN; x.fillRect(-92, -46, 184, 92)
    x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('favourite', 0, -16); x.fillText('snack?', 0, 18)
    x.restore()
  }
  if (reply > 0.01) {
    x.save(); x.translate(-24, 86); x.scale(reply, reply)
    x.fillStyle = BONE; x.fillRect(-72, -34, 144, 68)
    x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.fillText('bread', 0, 2)
    x.restore()
  }
  x.restore()
}
// roots growing down from the star into the floor
function roots(x, cx, cy, g) {
  if (g <= 0.01) return
  x.save(); x.strokeStyle = '#8a4a2e'; x.lineWidth = 10; x.lineCap = 'square'
  for (let i = 0; i < 5; i++) {
    const sx = cx + (i - 2) * 34, len = 150 * g * (0.7 + 0.3 * ((i * 7) % 3) / 2)
    x.beginPath(); x.moveTo(sx, cy)
    for (let s = 1; s <= 6; s++) { const p = s / 6; x.lineTo(sx + (i - 2) * 22 * p + Math.sin(p * 6 + i) * 10, cy + len * p) }
    x.stroke()
  }
  x.restore()
}
// a stack of blankets, piling up one at a time
const BLANKET_COLS = ['#ff8fb1', '#8fe3ff', '#ffd23a', '#7dffb0', '#c9a6ff', '#ffb34a', '#ff6b5a', '#6fc3ff', '#b7a6ff', '#5fd068', '#ff9ccf']
function blankets(x, cx, base, n, w) {
  for (let i = 0; i < n; i++) {
    const y = base - (i + 1) * 19, dx = Math.sin(i * 2.3) * 14
    x.fillStyle = INK; x.fillRect(cx - w / 2 + dx - 5, y - 4, w + 10, 25)
    x.fillStyle = BLANKET_COLS[i % BLANKET_COLS.length]; x.fillRect(cx - w / 2 + dx, y, w, 17)
    x.fillStyle = 'rgba(255,255,255,0.35)'; for (let s = 0; s < w; s += 40) x.fillRect(cx - w / 2 + dx + s + 10, y + 6, 14, 5)
  }
}

const CAMEOS = [
  { sign: S, cap: 'Plans at 8. | *Pajamas* at 7.', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const c = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (c > 0.01) drawBits(x, NIGHTCAP, NIGHTCAP_C, F.x + 20, F.top - 6, 13 * c, { rot: 0.15 })
      drawBits(x, MOON, { Y: GOLD }, 830, 620, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 820, 'u still | coming??', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1050, 'CANCELLED. COZY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone took | the *last fry.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, lt > 0.8 ? FRYBOX_EMPTY : FRYBOX, FRY_C, 560, 1080, 17 * k)
      const g = pop01(t, P.t0 + 0.35, 0.35, 2)
      if (g > 0.01) {
        const away = ease.inOutCubic(prog(lt, 0.4, 0.9))
        const F2 = signChar(x, t, 'gemini', 810, 980, 180 * g, { mood: lt > 1.3 ? 'wide' : 'wink', look: [-1, 0], seed: 21, glyph: false })
        drawBits(x, FRY, FRY_C, lerp(600, F2.x - 80, away), lerp(1030, F2.cy + 10, away), 14, { rot: 0.4 })
      }
      label(x, 740, 640, 'NOTED. FOREVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ninety dishes. | Orders *the usual.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      menu(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 420, 620, 'the usual.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 790, 1110, 'ORDER #600', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked to scoot over. | *Grew roots.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', star: { x: -150, y: -20 },
    back(x, t, lt, P) {
      drawBits(x, ARMCHAIR, ARMCHAIR_C, 390, 960, 22 * pop01(t, P.t0 + 0.05, 0.3, 2))
    },
    front(x, t, lt, P, F) {
      roots(x, F.x, F.cy + 120, ease.outCubic(prog(lt, 1.0, 1.8)))
      const a = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (a > 0.01) signChar(x, t, 'aries', 820, 990, 170 * a, { mood: lt > 1.6 ? 'wide' : 'happy', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 0.6] })
      bubble(x, 800, 720, 'scoot over?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 390, 610, 'ROOTED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GREEN, rot: -0.05 })
    } },
  { sign: S, cap: 'Cozy level: | *eleven blankets.*', mood: lt => lt > 1.5 ? 'sleepy' : 'happy', star: { x: -120, y: 10 },
    front(x, t, lt, P, F) {
      const n = Math.min(11, Math.floor(Math.max(0, lt - 0.3) / 0.13))
      blankets(x, F.x, 1100, n, 340)
      label(x, 790, 640, `BLANKET ${Math.max(1, n)}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 860, 'one | more.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'New match. | First question: *snacks.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.6, 0.3, 2.2), pop01(t, P.t0 + 1.3, 0.3, 2.2))
      label(x, 780, 1120, 'SOULMATE.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 760, P.t0 + 1.7, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Proven wrong. | Still *right.*', mood: lt => lt > 1.1 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const v = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (v > 0.01) signChar(x, t, 'virgo', 820, 990, 180 * v, { mood: lt > 1.6 ? 'wide' : 'happy', look: [-1, 0], seed: 23, glyph: false })
      bubble(x, 800, 720, 'but the | facts say—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      bubble(x, 380, 620, 'no.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 54, tail: 'bc' })
      label(x, 600, 1150, 'TAURUS 1 · FACTS 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fancy candle? | Bought *three.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2)
        const fl = 1 + 0.06 * Math.sin(t * 13 + i * 2)
        drawBits(x, CANDLE, CANDLE_C, 650 + i * 130, 960 - (i % 2) * 30, 14 * k, { sy: fl })
      }
      label(x, 790, 650, 'SMELLS LIKE A FOREST', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 900, P.t0 + 1.3, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Same houseplant. | *Eleven years.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.03 * Math.sin(t * 2) })
      bubble(x, 420, 620, 'morning, | Gerald', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 790, 1150, 'GERALD, AGE 11', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0001', key: 'C', accent: GREEN, solo: S, ending: 'lesson',
  title: 'Being a Taurus | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Slow. Cozy. | *Unmovable.*', mood: 'sleepy' },
  lesson: { text: 'Feed a Taurus once. | *Loyal forever.*', chip: 'STATUS: COZY' },
  last: {
    text: 'The last fry? | *Still not over it.*',
    draw(x, t, lt) {
      drawBits(x, FRYBOX_EMPTY, FRY_C, 540, 1190, 22 * pop01(t, t - lt + 0.6, 0.35, 2), { rot: -0.08 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
