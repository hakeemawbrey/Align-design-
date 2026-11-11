// v3t001: THE SIGNS AS… v3, SOLO film, "Things only | Tauruses get." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Taurus version.
//   0.0–3.6    "Things only | *Tauruses* get."  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards: new menu, still "the usual" · plans cancelled, best day ever · lost the argument, still on the
//              boulder · one candle, cost rent · nine pillows · forty plants, all named · dating profile = nap schedule
//              · you moved their mug, they felt it · best friends since age five, same bench
//  37.8        "Cozy. Stubborn. | *Loyal.*"
//  41.0        LESSON UNLOCKED: "Love a Taurus slowly. | They stay *forever.*"  STATUS: COMFY
//  46.9        "Their perfect match? | The *bench friend.*" over the match card: Taurus + Capricorn (the bench, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', RED = '#e23d4e', BROWN = '#8a4a2e'

const BOULDER = [
  '....GGGGGG....',
  '..GGGGGGGGGG..',
  '.GGgGGGGGGGGG.',
  'GGGGGGGGGgGGGG',
  'GGGGGGGGGGGGGG',
  'GgGGGGGGGGGGGG',
  'GGGGGGGGGGGgGG',
  '.GGGGGGGGGGGG.',
]
const BOULDER_C = { G: '#8a87a8', g: '#6b6890' }
const CANDLE = [
  '....F....',
  '...FYF...',
  '...FYF...',
  '....K....',
  '.PPPPPPP.',
  'PPPPPPPPP',
  'PPWWWWWPP',
  'PPWGGGWPP',
  'PPWWWWWPP',
  'PPPPPPPPP',
  'PPPPPPPPP',
  '.PPPPPPP.',
]
const CANDLE_C = { F: '#ffb34a', Y: '#fff1b0', K: INK, P: LAV, W: '#fff4e2', G: GOLD }
const PILLOW = [
  'W..........W',
  '.WWWWWWWWWW.',
  '.WPPWWWWPPW.',
  '.WWWWWWWWWW.',
  'W..........W',
]
const POT = [
  '.L.L.L.',
  'LLLLLLL',
  '.LLLLL.',
  '...L...',
  'TTTTTTT',
  '.TTTTT.',
  '.TTTTT.',
]
const POT_C = { L: GREEN, T: '#e8865a' }
const MUG = [
  '.WWWWWW...',
  '.WRRRRW...',
  '.WRRRRWWW.',
  '.WRRRRW.W.',
  '.WRRRRWWW.',
  '.WRRRRW...',
  '..WWWW....',
]
const MUG_C = { W: '#fff4e2', R: RED }
const BENCH = [
  'BBBBBBBBBBBBBBBBBB',
  '..................',
  'BBBBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBBBB',
  '.K..............K.',
  '.K..............K.',
  '.K..............K.',
]
const BENCH_C = { B: BROWN, K: '#5a2e1a' }
const BLANKET = [
  '..CCCCCCCCCCCC..',
  '.CCcCCCcCCCcCCC.',
  'CCCCCCCCCCCCCCCC',
  'CcCCCcCCCcCCCcCC',
  'CCCCCCCCCCCCCCCC',
  '.CCcCCCcCCCcCCC.',
]
const BLANKET_C = { C: PINK, c: '#ffd0de' }

// a menu card with a big NEW stamp
function menu(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -162, 256, 340)
  x.fillStyle = INK; x.fillRect(-134, -176, 268, 352)
  x.fillStyle = BONE; x.fillRect(-126, -168, 252, 336)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -128)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-90, -76 + i * 40, 120 + (i % 3) * 20, 14)
  x.restore()
}
// a profile card with a nap timetable
function napProfile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const w = 300, h = 420
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 150)
  signChar(x, t, 'taurus', 0, -h / 2 + 96, 120, { mood: 'sleepy', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = GREEN; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♉︎ TAURUS', 0, -h / 2 + 192)
  const rows = ['NAP · 11 AM', 'NAP · 2 PM', 'NAP · 5 PM', 'BED · 8 PM']
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * rows.length + 0.001)
  x.font = `700 28px ${MONO}`; x.fillStyle = BONE
  for (let i = 0; i < Math.min(n + 1, rows.length); i++) x.fillText(rows[i], 0, -h / 2 + 248 + i * 42)
  x.restore()
}

const CAMEOS = [
  { sign: 'taurus', cap: 'New menu. | Still *“the usual.”*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      menu(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 860, 650, 'NEW!', pop01(t, P.t0 + 0.55, 0.3, 2.2), { size: 44, bg: RED, color: '#fff4e2', rot: 0.12 })
      bubble(x, 380, 600, 'the usual.', pop01(t, P.t0 + 1.35, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Plans got cancelled. | Best *day ever.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P, F) {
      label(x, 790, 700, 'PLANS: CANCELLED', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      const d = ease.outCubic(prog(lt, 1.1, 1.5))
      if (lt > 1.05) drawBits(x, BLANKET, BLANKET_C, F.x, lerp(560, F.cy + 90, d), 18, { rot: 0.03 })
      if (lt > 1.5) hearts(x, t, 790, 980, P.t0 + 1.55, { n: 5, life: 1.6, spread: 160, cell: 8, seed: 2 })
      label(x, 790, 900, 'BLANKET: ON', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Lost the argument. | Still *not budging.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', star: { x: -150, y: -70 },
    back(x, t, lt, P) {
      drawBits(x, BOULDER, BOULDER_C, 390, 1060, 26 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'you win. | move?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 900, 'NOT. BUDGING.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Bought one candle. | It cost *rent.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, CANDLE, CANDLE_C, 790, 860, 24 * k, { rot: 0.04 })
      label(x, 790, 1100, 'PRICE: ONE RENT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'smells | expensive', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bc' })
      sparkles(x, t, 790, 700, P.t0 + 0.6, 6, 120, 0.3)
    } },
  { sign: 'taurus', cap: 'Their bed has | *nine pillows.*', mood: lt => lt > 1.6 ? 'sleepy' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.2) / 0.17) + 1)
      const cols = [BONE, PINK, LAV, SKYB, MINT, GOLD, BONE, PINK, LAV]
      for (let i = 0; i < n; i++) drawBits(x, PILLOW, { W: cols[i], P: INK }, 790 + Math.sin(i * 1.9) * 14, 1120 - i * 56, 19, { rot: Math.sin(i * 2.3) * 0.06 })
      label(x, 790, 560, `PILLOWS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Owns forty plants. | Named *every one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const NAMES = ['GARY', 'SUE', 'MO', 'BEA', 'TED', 'LOU']
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.16, 0.3, 2)
        const px = 650 + (i % 3) * 140, py = 700 + Math.floor(i / 3) * 250
        drawBits(x, POT, POT_C, px, py, 15 * k)
        label(x, px, py + 90, NAMES[i], k * pop01(t, P.t0 + 0.9 + i * 0.12, 0.25, 2), { size: 24, bg: BONE, rot: i % 2 ? 0.06 : -0.06, font: MONO, weight: 700 })
      }
      bubble(x, 380, 600, 'morning, gary', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Their dating profile? | A *nap schedule.*', mood: 'happy', star: { x: -190 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      napProfile(x, t, 790, 850, pop01(t, P.t0 + 0.25, 0.35, 2), lt)
      label(x, 790, 1110, 'NAPPERS ONLY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'You moved their mug. | They *felt it.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const sh = ease.inOutCubic(prog(lt, 0.5, 0.8)) * 60
      x.save(); x.globalAlpha = 0.35 * k; x.strokeStyle = BONE; x.setLineDash([10, 10]); x.lineWidth = 4; x.strokeRect(720, 840, 140, 140); x.restore()
      drawBits(x, MUG, MUG_C, 790 + sh, 910, 18 * k)
      label(x, 790, 720, '2 CM LEFT', pop01(t, P.t0 + 0.95, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'who did this', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Best friends since age five. | *Same bench.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -130, y: 40, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      drawBits(x, BENCH, BENCH_C, 540, 1080, 26 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.35, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 700, 920, 240 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      label(x, 540, 640, 'BENCH BUDDIES · SINCE AGE 5', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 860, P.t0 + 1.4, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t001', key: 'C', accent: GREEN, solo: 'taurus',
  title: 'Things only | *Tauruses* get.',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'capricorn', chip: 'ALIGNED' },
  group: { cap: 'Cozy. Stubborn. | *Loyal.*', mood: 'heart' },
  lesson: { text: 'Love a Taurus slowly. | They stay *forever.*', chip: 'STATUS: COMFY' },
  last: {
    text: 'Their perfect match? | The *bench friend.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
