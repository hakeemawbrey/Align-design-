// r2t0156: star_talk ROLLCALL, "The signs | *as houseplants.*" (~59 s vertical, signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each as the most extreme houseplant version of itself:
//   ♈ cactus, already poked someone · ♉ snake plant, refuses to be repotted · ♊ two plants, one pot, both talking
//   · ♋ wilts if you skip goodnight · ♌ sunflower, follows the spotlight · ♍ bonsai, one leaf trimmed for hours
//   · ♎ orchid, only blooms if the pot matches · ♏ flytrap, snaps shut on your secrets · ♐ vine out the window,
//   abroad now · ♑ a growth plan, laminated · ♒ grows upside down on purpose · ♓ waters itself with tears
//  49.2   "One windowsill. | *Twelve moods.*"  group photo
//  52.4   LESSON UNLOCKED: "Everyone grows | at their *own pace.*"  STATUS: THRIVING
//  58.3   "Water your plants. | *Text your friends.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEAF = '#5fd17a', DLEAF = '#2f8a4a', TERRA = '#d9743f', DTERRA = '#9c4a24', RED = '#e23d4e', ORANGE = '#ffb34a'
const ST = { x: -170 }

// a terracotta pot (with the rim), centred on (cx, cy)
const POT = [
  'TTTTTTTTTTTT',
  'TTTTTTTTTTTT',
  '.DDDDDDDDDD.',
  '.TTTTTTTTTT.',
  '.TTTTTTTTTT.',
  '..TTTTTTTT..',
  '..TTTTTTTT..',
  '...TTTTTT...',
]
const POT_C = { T: TERRA, D: DTERRA }
function pot(x, cx, cy, cell, k, opts = {}) { drawBits(x, POT, POT_C, cx, cy, cell * k, opts) }

const CACTUS = [
  '....GG....',
  '...GGGG...',
  'G..GgGG...',
  'GG.GGGG..G',
  'GG.GgGG.GG',
  'GGGGGGG.GG',
  '.GGGgGGGGG',
  '...GGGG...',
  '...GgGG...',
  '...GGGG...',
]
const SNAKE = [
  '.G...G...G.',
  '.G..GG..GG.',
  'GG..Gg..Gg.',
  'Gg.GGg.GGg.',
  'GgGGgG.GgG.',
  'GGGgGGGGgGG',
  'GgGGgGGgGGg',
  'GGgGGgGGgGG',
]
const SPROUT = [
  'GGG...GGG',
  'GgGG.GGgG',
  '.GGGGGGG.',
  '....G....',
  '....G....',
  '....G....',
]
const DROOP = [
  '....G....',
  '...GG....',
  '..GG.....',
  '.GG......',
  'GGG...G..',
  'Gg....GG.',
  '.......GG',
  '.......Gg',
]
const SUNFLOWER = [
  '...Y.Y.Y...',
  '..YYYYYYY..',
  '.YYBBBBBYY.',
  'YYBBbBbBBYY',
  '.YBBBBBBBY.',
  'YYBbBBBbBYY',
  '.YYBBBBBYY.',
  '..YYYYYYY..',
  '...Y.G.Y...',
  '.....G.....',
  '...GGG.....',
  '..GG.G.GG..',
  '.....GGG...',
  '.....G.....',
]
const SUN_C = { Y: GOLD, B: '#8a4a2e', b: '#5b2e1a', G: LEAF }
const BONSAI = [
  '..GGGG..GGG..',
  '.GGgGGG.GGgG.',
  'GGGGgGGGGGGG.',
  '.GGG.BB.GGG..',
  '......B......',
  '.....BB......',
  '....BB.......',
  '.....BB......',
]
const ORCHID = [
  '.PP.....PP.',
  'PpPP...PPpP',
  '.PPw...wPP.',
  '...G...G...',
  '....G.G....',
  '.....G.....',
  '...GGGGG...',
  '..GG...GG..',
]
const TRAP_OPEN = [
  'R.R.R..R.R.R',
  'GRRRG..GRRRG',
  'GRrRG..GRrRG',
  '.GRRG..GRRG.',
  '..GGG..GGG..',
  '....GGGG....',
  '.....GG.....',
  '.....GG.....',
]
const TRAP_SHUT = [
  '....RRRR....',
  '...GRRRRG...',
  '..GGRrrRGG..',
  '..GGRRRRGG..',
  '...GGGGGG...',
  '....GGGG....',
  '.....GG.....',
  '.....GG.....',
]
const GREEN_C = { G: LEAF, g: DLEAF, R: '#ff6f7d', r: '#b8324a', P: PINK, p: '#d65a8a', w: '#fff', B: '#8a4a2e', Y: GOLD }
const WINDOW = [
  'FFFFFFFFFFFF',
  'FSSSSFFSSSSF',
  'FSSSSFFSSSSF',
  'FSSSSFFSSSSF',
  'FFFFFFFFFFFF',
  'FSSSSFFSSSSF',
  'FSSSSFFSSSSF',
  'FSSSSFFSSSSF',
  'FFFFFFFFFFFF',
]
const SCISSORS = [
  'S.....S',
  '.S...S.',
  '..S.S..',
  '...S...',
  '..O.O..',
  '.O...O.',
  '.O...O.',
  '..O.O..',
]
const DROP = ['..B..', '.BBB.', 'BBBBB', 'BBwBB', '.BBB.']

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}

const CAMEOS = [
  { sign: 'aries', cap: 'A cactus. | Already *poked someone.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CACTUS, GREEN_C, 790, 790, 22 * k)
      pot(x, 790, 990, 22, k)
      bubble(x, 800, 600, 'OW!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 52, col: PINK, tail: 'bc' })
      sparkles(x, t, 790, 760, P.t0 + 1.2, 6, 160, 0.3, [RED, BONE, GOLD])
    } },
  { sign: 'taurus', cap: 'Snake plant. | Refuses to *be repotted.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sh = lt > 1.0 && lt < 1.6 ? Math.sin(t * 40) * 6 : 0
      drawBits(x, SNAKE, GREEN_C, 790 + sh, 810, 22 * k)
      pot(x, 790 + sh, 960, 22, k)
      label(x, 790, 1130, 'NOT. MOVING.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two plants, one pot. | *Both talking.*', mood: 'wink', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SPROUT, GREEN_C, 730, 860, 18 * k, { rot: -0.2 })
      drawBits(x, SPROUT, GREEN_C, 850, 860, 18 * k, { rot: 0.2 })
      pot(x, 790, 980, 22, k)
      bubble(x, 680, 660, 'so anyway', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 880, 740, 'ALSO', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Wilts if you | *skip goodnight.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', tears: lt => lt < 1.5 ? 1 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), up = lt > 1.5
      drawBits(x, up ? SPROUT : DROOP, GREEN_C, 790, 860, (up ? 22 : 20) * k)
      pot(x, 790, 990, 22, k)
      if (up) bubble(x, 790, 650, 'night!! <3', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      else bubble(x, 790, 650, 'goodnight…?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      if (up) hearts(x, t, 790, 800, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'A sunflower. | Follows *the spotlight.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.4, 1.6)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.28 * clamp(k)
      x.fillStyle = '#fff1c0'; x.beginPath(); x.moveTo(760, 470); x.lineTo(820, 470); x.lineTo(980, 1100); x.lineTo(600, 1100); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SUNFLOWER, SUN_C, 790, 780, 20 * k, { rot: 0.08 * Math.sin(t * 2) })
      pot(x, 790, 990, 20, k)
      label(x, 790, 1140, 'FACING: CAMERA', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A bonsai. | Trimmed *for hours.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BONSAI, GREEN_C, 790, 850, 20 * k)
      pot(x, 790, 980, 18, k, { sy: 0.7 })
      const sn = Math.sin(t * 14) * 0.12
      drawBits(x, SCISSORS, { S: '#d8dbe8', O: RED }, 900, 740, 10 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.6 + sn })
      label(x, 790, 640, 'HOUR 4', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'An orchid. | Needs *a matching pot.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), matched = lt > 1.4
      drawBits(x, matched ? ORCHID : SPROUT, GREEN_C, 790, 830, 20 * k)
      drawBits(x, POT, matched ? { T: PINK, D: '#d65a8a' } : POT_C, 790, 980, 20 * k)
      label(x, 790, 1140, matched ? 'NOW IT’S CUTE' : 'WRONG BEIGE', pop01(t, P.t0 + (matched ? 1.4 : 0.6), 0.3, 2.4), { size: 34, bg: matched ? PINK : BONE, rot: -0.04, font: MONO, weight: 700 })
      if (matched) sparkles(x, t, 790, 800, P.t0 + 1.4, 7, 170, 0.5)
    } },
  { sign: 'scorpio', cap: 'A flytrap. | Snaps shut *on secrets.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), shut = lt > 1.3
      drawBits(x, shut ? TRAP_SHUT : TRAP_OPEN, GREEN_C, 790, 840, 22 * k)
      pot(x, 790, 1000, 20, k)
      if (!shut) bubble(x, 790, 640, 'psst… don’t tell', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bc' })
      else label(x, 790, 650, 'SNAP. SAVED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Grew out the window. | *Lives abroad now.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, WINDOW, { F: BONE, S: SKYB }, 820, 760, 24 * k)
      pot(x, 720, 1010, 18, k)
      // the vine: a wobbly line from the pot out of the window's edge
      const g = clamp((lt - 0.3) / 1.2)
      if (k > 0.5) {
        x.save(); x.strokeStyle = LEAF; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(720, 970)
        const n = Math.floor(g * 20)
        for (let i = 1; i <= n; i++) { const p = i / 20; x.lineTo(720 + p * 260 + Math.sin(p * 9) * 30, 970 - p * 360) }
        x.stroke(); x.restore()
      }
      label(x, 790, 1130, 'POSTCARD SOON', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Has a growth plan. | *Laminated.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 790, 850, 330, 300, BONE, k, 0.04)) {
        txt(x, 'GROWTH PLAN', 0, -105, 34, INK, MONO, 700)
        x.fillStyle = DLEAF; for (let i = 0; i < 5; i++) x.fillRect(-110 + i * 48, 90 - i * 34, 34, 20 + i * 34)
        x.strokeStyle = 'rgba(143,227,255,0.6)'; x.lineWidth = 6; x.strokeRect(-155, -140, 310, 280)
        x.restore()
      }
      label(x, 790, 1100, 'Q3: ONE NEW LEAF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Grows upside down. | *On purpose.*', mood: 'wink', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(640, 520, 300, 8)
      pot(x, 790, 610, 22, k, { rot: Math.PI })
      drawBits(x, SPROUT, GREEN_C, 790, 770, 22 * k, { rot: Math.PI })
      bubble(x, 790, 1000, 'gravity? | optional.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Doesn’t need watering. | *Cries on itself.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SPROUT, GREEN_C, 820, 880, 22 * k, { sy: 1 + 0.08 * Math.sin(t * 3) })
      pot(x, 820, 1010, 22, k)
      for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; drawBits(x, DROP, { B: SKYB, w: '#fff' }, 760 + i * 60, 640 + ph * 180, 8 * k, { alpha: Math.sin(Math.PI * ph) }) }
      label(x, 820, 1150, 'SELF-WATERING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0156', key: 'C', accent: LEAF, ending: 'lesson',
  title: 'The signs | *as houseplants.*',
  cameos: CAMEOS,
  group: { cap: 'One windowsill. | *Twelve moods.*' },
  lesson: { text: 'Everyone grows | at their *own pace.*', chip: 'STATUS: THRIVING' },
  last: {
    text: 'Water your plants. | *Text your friends.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, SPROUT, GREEN_C, 540, 1020, 26 * pop01(t, t0 + 0.6, 0.4, 2))
      pot(x, 540, 1170, 26, pop01(t, t0 + 0.6, 0.4, 2))
      hearts(x, t, 540, 1000, t0 + 1.0, { n: 7, life: 2.0, spread: 420, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
