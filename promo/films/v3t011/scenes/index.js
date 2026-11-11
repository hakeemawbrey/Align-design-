// v3t011: THE SIGNS AS… v3, "Zodiacs when hungry | be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "Hungry zodiacs | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one hungry sign per card (3.8 s each), each pushed to the extreme:
//              ♈ too hungry to wait, ate it frozen · ♉ built a fence round the plate · ♊ starving, full, STARVING
//              · ♋ hungry, cooked for twelve · ♌ starving, but the food needs a photoshoot · ♍ read all 31 ingredients
//              · ♎ couldn't pick, ordered everything · ♏ found every secret snack · ♐ tried every food truck
//              · ♑ meal-prepped till 2031 · ♒ invented a cereal-and-pickle sandwich · ♓ the soup was too pretty, cried
//  49.2        "Nobody is *nice* | when hungry."
//  52.6        callback: "Taurus opened | *the gate.*"  (the fence comes back, gate open, hearts)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', CREAM = '#fff4e2'

const PIZZA = [
  'CCCCCCCCCCC',
  '.YYRYYYYRY.',
  '.YYYYRYYYY.',
  '..YRYYYRY..',
  '..YYYYYYY..',
  '...YYRYY...',
  '...YYYYY...',
  '....YRY....',
  '....YYY....',
  '.....Y.....',
]
const PIZZA_C = { C: '#d89a4a', Y: '#ffd98a', R: RED }
const FENCE = [
  'W..W..W..W..W..W..W',
  'WW.WW.WW.WW.WW.WW.W',
  'WWWWWWWWWWWWWWWWWWW',
  'WW.WW.WW.WW.WW.WW.W',
  'WW.WW.WW.WW.WW.WW.W',
  'WWWWWWWWWWWWWWWWWWW',
  'WW.WW.WW.WW.WW.WW.W',
]
const FENCE_C = { W: CREAM }
const GATE_L = ['W..W..W', 'WW.WW.W', 'WWWWWWW', 'WW.WW.W', 'WW.WW.W', 'WWWWWWW', 'WW.WW.W']
const PLATE = [
  '..WWWWWWW..',
  '.WWBBBBBWW.',
  'WWBBBBBBBWW',
  '.WWWWWWWWW.',
]
const PLATE_C = { W: CREAM, B: '#c97a3a' }
const POT = [
  '..S..S..S..',
  '.S..S..S...',
  'KKKKKKKKKKK',
  'KGGGGGGGGGK',
  'KGGGGGGGGGK',
  'KGGGGGGGGGK',
  '.KGGGGGGGK.',
  '..KKKKKKK..',
]
const POT_C = { S: '#ffffff', K: '#6b62a8', G: '#9aa5c4' }
const CAMERA = [
  '...KKK.....',
  'KKKKKKKKKKK',
  'KGGGGGGGGGK',
  'KGGWWWWGGRK',
  'KGWSSSSWGGK',
  'KGWSSSSWGGK',
  'KGGWWWWGGGK',
  'KKKKKKKKKKK',
]
const CAMERA_C = { K: INK, G: '#6b62a8', W: '#ffffff', S: SKYB, R: RED }
const BOX = ['KKKKKKK', 'KGGGGGK', 'KGGGGGK', 'KKKKKKK']
const BOX_C = { K: '#6b62a8', G: '#dfe7ff' }
const SANDWICH = [
  '..BBBBBBB..',
  '.BBBBBBBBB.',
  'YYYYYYYYYYY',
  'GgGgGgGgGgG',
  'YYYYYYYYYYY',
  '.BBBBBBBBB.',
]
const SAND_C = { B: '#e8a24a', Y: '#ffe9a8', G: GREEN, g: '#2a6b3a' }
const BOWL = [
  '.S...S...S.',
  '..S...S...S',
  'WWWWWWWWWWW',
  'WOOOGOOOOOW',
  '.WOOOOGOOW.',
  '..WWWWWWW..',
  '....WWW....',
]
const BOWL_C = { S: '#ffffff', W: CREAM, O: ORANGE, G: GREEN }
const TRUCK = [
  '..PPPPPPPPP....',
  '..PWWWWWWWP....',
  '..PWWWWWWWPPPP.',
  '..PPPPPPPPPPSPP',
  'PPPPPPPPPPPPPPP',
  '..KK.....KK....',
]
const TRUCK_C = { P: PINK, W: CREAM, S: SKYB, K: INK }

/** the fenced-off plate (Taurus's card and the callback); gate 0 = shut · 1 = swung open */
function fenced(x, cx, cy, k, gate = 0) {
  if (k <= 0.01) return
  drawBits(x, PLATE, PLATE_C, cx, cy + 10, 16 * k)
  drawBits(x, FENCE, FENCE_C, cx, cy + 90, 12 * k)
  if (gate < 1) drawBits(x, GATE_L, FENCE_C, cx - 160 * k, cy + 90, 12 * k, { sx: 1 - 0.8 * gate })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Too hungry to wait. | Ate it *frozen.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PIZZA, PIZZA_C, 790, 900, 20 * k, { rot: 0.12 })
      // frost on the slice
      if (k > 0.5) { x.save(); x.globalAlpha = 0.45; x.fillStyle = SKYB; x.fillRect(700, 820, 180, 30); x.fillRect(730, 880, 120, 18); x.restore() }
      label(x, 790, 1110, 'STILL FROZEN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'crunchy!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Built a fence | *round the plate.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fenced(x, 790, 900, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1100, 'NO SHARING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'mine.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Starving. Full. | *STARVING.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wide' : 'sleepy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const W = ['starving', 'full', 'STARVING', 'full?', 'STARVING']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 780, 760, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: n === 2 || n === 4 ? 56 : 46, tail: 'bl' })
      label(x, 790, 960, `MOOD ${n + 1} OF 2`, pop01(t, P.t0 + 0.7, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Felt peckish. | Cooked *for twelve.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'SERVES: 12', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'just a snack!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Starving. But first, | a *photoshoot.*', mood: lt => lt > 0.6 ? 'wink' : 'sparkle', star: { x: -160 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 380, 1110, 14 * pop01(t, P.t0 + 0.1, 0.3, 2))
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, CAMERA, CAMERA_C, 800, 820, 20 * k, { rot: -0.08 })
      const n = Math.floor(Math.max(0, lt - 0.5) * 18)
      label(x, 800, 1020, `SHOT ${Math.min(147, 1 + n * 3)}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      const f = (lt * 3) % 1
      if (lt > 0.5 && f < 0.12) { x.save(); x.globalAlpha = 0.5 * (1 - f / 0.12); x.fillStyle = '#ffffff'; x.fillRect(110, 480, 860, 740); x.restore() }
    } },
  { sign: 'virgo', cap: 'Hungry. Still read | *every ingredient.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = CREAM; x.fillRect(-122, -182, 244, 364)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('INGREDIENTS', 0, -150)
        const rows = Math.floor(clamp((lt - 0.4) / 1.2) * 10)
        for (let i = 0; i < 10; i++) { x.fillStyle = i < rows ? '#2fc79a' : '#cfc6b4'; x.fillRect(-100, -120 + i * 28, 150 + 50 * Math.sin(i * 1.7), 12) }
        x.restore()
      }
      label(x, 790, 1130, 'READ: 31 OF 31', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick. | Ordered *everything.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2)
        drawBits(x, PLATE, PLATE_C, 700 + (i % 2) * 170, 1110 - Math.floor(i / 2) * 110, 13 * k)
      }
    },
    front(x, t, lt, P) {
      label(x, 790, 650, 'ORDER: ALL OF IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Found every | *secret snack.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const spots = [[700, 700], [880, 760], [740, 900], [890, 1010], [720, 1090]]
      spots.forEach(([sx, sy], i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.22, 0.25, 2.2)
        if (k > 0.01) { x.save(); x.translate(sx, sy); x.scale(k, k); x.fillStyle = INK; x.fillRect(-56, -36, 112, 72); x.fillStyle = [GOLD, PINK, MINT, ORANGE, LAV][i]; x.fillRect(-48, -28, 96, 56); x.fillStyle = INK; x.font = `800 24px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SNACK', 0, 2); x.restore() }
      })
      label(x, 800, 600, 'FOUND: 9 STASHES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: '#c97bff', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Went for one snack. | Tried *every food truck.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.2)
      for (let i = 0; i < 3; i++) { const q = p * 1.4 - i * 0.2; if (q > 0 && q < 1) drawBits(x, TRUCK, TRUCK_C, lerp(220, 860, q), 1110 - i * 6, 13, { alpha: Math.sin(Math.PI * q) * 1.5 }) }
    },
    front(x, t, lt, P) {
      const n = Math.min(14, Math.floor(Math.max(0, lt - 0.4) * 9))
      label(x, 320, 760, `TRUCKS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 320, 600, 'one more!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Meal-prepped | *until 2031.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) {
        const k = pop01(t, P.t0 + 0.2 + (r * 3 + c) * 0.06, 0.25, 2)
        drawBits(x, BOX, BOX_C, 210 + c * 100, 1110 - r * 70, 12 * k)
      }
    },
    front(x, t, lt, P) {
      label(x, 320, 640, 'LUNCH BREAK: 4 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a sandwich. | Cereal *and pickles.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, SANDWICH, SAND_C, 790, 900 + 8 * Math.sin(t * 3), 22 * k, { rot: -0.06 })
      label(x, 790, 1080, 'PATENT PENDING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 0.7, 6, 140, 0.3)
      bubble(x, 790, 680, 'genius.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Food finally came. | Cried. *It’s so pretty.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05 })
      hearts(x, t, 800, 900, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t011', key: 'C', accent: ORANGE, ending: 'callback',
  title: 'Hungry zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody is *nice* | when hungry.' },
  last: {
    text: 'Taurus opened | *the gate.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.4, 2)
      fenced(x, 600, 980, k * 1.9, clamp((lt - 1.2) / 0.6))
      if (lt > 0.4) signChar(x, t, 'taurus', 300, 1040, 280 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 9, glyph: false })
      hearts(x, t, 600, 960, t - lt + 1.8, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
