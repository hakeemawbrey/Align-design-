// r2t0676: THE SIGNS AS… v3 SOLO, "Your Aquarius roommate | be like." (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (solo, 9 cards). Ending: callback.
//   called a house meeting, brought a manifesto · the living room is a lab now · upgraded the doorbell, it asks your
//   sign · adopted every pigeon on the street · midnight snack, midnight philosophy · the chore chart is a birth chart
//   · moved the couch to the ceiling · "a few friends" = forty strangers · bad day? they named a star after you
//   group "Weird roommate. | *Best roommate.*"   last "Rent is split | *fifteen ways.*" (the pigeons, paid off)
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'aquarius', L = { x: -170 }, AQUA = '#6fc3ff'

const PIGEON = [
  '....GGG....',
  '...GGGKG...',
  '...GGGGGOO.',
  '....PPG....',
  '..GGGGGGG..',
  '.GGGGGGGGG.',
  'GGLLLLGGGG.',
  '.GGGGGGGG..',
  '...O..O....',
]
const PIGEON_C = { G: '#9aa5c4', K: INK, O: ORANGE, P: '#7dffb0', L: '#c8d0e6' }
const BEAKER = [
  '..WWWWW..',
  '...WGW...',
  '...WGW...',
  '..WGGGW..',
  '.WGGGGGW.',
  'WGGGGGGGW',
  'WGGGGGGGW',
  '.WWWWWWW.',
]
const BEAKER_C = { W: BONE, G: MINT }
const BELL = [
  'KKKKKKK',
  'KSSSSSK',
  'KSRRRSK',
  'KSRRRSK',
  'KSSSSSK',
  'KSGGGSK',
  'KSSSSSK',
  'KKKKKKK',
]
const BELL_C = { K: SLATE, S: '#9aa5c4', R: GOLD, G: MINT }
const SOFA = [
  'RR..........RR',
  'RRDDDDDDDDDDRR',
  'RRDDDDDDDDDDRR',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
  '.W..........W.',
  '.W..........W.',
]
const PERSON = ['.HHH.', 'HFFFH', '.FFF.', '..F..', 'BBBBB', 'BBBBB', '.B.B.']

// a chore wheel that is secretly a birth chart
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function choreChart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('CHORES', 0, -14); x.fillText('CHART', 0, 18)
  x.restore()
}
function telescope(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 18; x.lineCap = 'square'
  for (const d of [-70, 0, 70]) { x.beginPath(); x.moveTo(0, 0); x.lineTo(d, 170); x.stroke() }
  x.strokeStyle = BONE; x.lineWidth = 8
  for (const d of [-70, 0, 70]) { x.beginPath(); x.moveTo(0, 0); x.lineTo(d, 166); x.stroke() }
  x.rotate(-0.6)
  x.fillStyle = INK; x.fillRect(-130, -42, 280, 84); x.fillRect(146, -54, 46, 108)
  x.fillStyle = AQUA; x.fillRect(-122, -34, 264, 68); x.fillStyle = GOLD; x.fillRect(-20, -34, 26, 68)
  x.fillStyle = BONE; x.fillRect(152, -46, 34, 92); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-122, -34, 264, 14)
  x.restore()
}
function pigeons(x, t, cx, cy, n, t0, { cell = 9, cols = 4, dx = 120, dy = 105 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = pop01(t, t0 + i * 0.07, 0.25, 2.2)
    const r = Math.floor(i / cols), c = i % cols
    const px = cx + (c - (cols - 1) / 2) * dx + (r % 2 ? dx / 2 : 0), py = cy + r * dy - Math.abs(Math.sin(t * 6 + i)) * 8
    drawBits(x, PIGEON, PIGEON_C, px, py, cell * k, { sx: i % 2 ? -1 : 1 })
  }
}

const CAMEOS = [
  { sign: S, cap: 'Called a house meeting. | Brought *a manifesto.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 780, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'Art. 1: freedom | Art. 2: freedom | Art. 3: see Art. 1', { head: 'HOUSE MANIFESTO', headBg: AQUA, size: 32, w: 390 })
      label(x, 790, 1080, 'PAGE 1 OF 40', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The living room? | *It’s a lab now.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BEAKER, BEAKER_C, 790, 860, 30 * k)
      if (k > 0.9) for (let i = 0; i < 6; i++) { const ph = (lt * 0.9 + i / 6) % 1; x.save(); x.globalAlpha = 1 - ph; x.fillStyle = MINT; x.fillRect(780 + Math.sin(i * 2 + lt * 3) * 50 - 9, 700 - ph * 180, 18, 18); x.restore() }
      label(x, 790, 1100, 'DO NOT TOUCH: SCIENCE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Upgraded the doorbell. | Now it *asks your sign.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BELL, BELL_C, 820, 960, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 680, 'state your | sign.', pop01(t, P.t0 + 0.8, 0.25, 2.3), { size: 56, tail: 'br', col: LAV })
      label(x, 790, 1150, 'GEMINI? …COME IN.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Adopted every pigeon | *on the street.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      pigeons(x, t, 770, 700, 9, P.t0 + 0.3, { cell: 10, cols: 3, dx: 120, dy: 120 })
      label(x, 790, 1120, 'ROOMMATES: 14', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: AQUA, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Midnight snack. | *Midnight philosophy.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, -1], star: L,
    front(x, t, lt, P) {
      bits(x, 'moon', 900, 600, 14 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bits(x, 'bowl', 790, 1080, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 760, 820, 'do fish know | they’re wet?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: S, cap: 'The chore chart? | *A birth chart.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      choreChart(x, 790, 760, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 780, 1060, 'dishes aren’t | in my chart.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Moved the couch. | *To the ceiling.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: L,
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(560, 568, 400, 8)
      drawBits(x, SOFA, { R: PINK, D: '#d96a92', W: WOOD }, 770, 580 + 8 * 26 * a / 2 + 6, 26 * a, { sy: -1 })
      label(x, 790, 1060, 'GRAVITY: OPTIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“A few friends.” | *Forty strangers.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const C = [['#ff6b5a', '#ffd6b0'], ['#5fd068', '#c98f5a'], [PINK, '#ffd6b0'], [GOLD, '#8a5a3a'], [LAV, '#e0a77a'], [MINT, '#ffd6b0'], [ORANGE, '#c98f5a'], [SKYB, '#8a5a3a']]
      C.forEach(([b, f], i) => drawBits(x, PERSON, { H: INK, F: f, B: b }, 660 + (i % 4) * 90, 840 + Math.floor(i / 4) * 140 - Math.abs(Math.sin(t * 5 + i)) * 10, 13 * pop01(t, P.t0 + 0.4 + i * 0.08, 0.25, 2)))
      bubble(x, 780, 640, 'who are | you guys?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1150, 'GUESTS: 40', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bad day? They | *named a star for you.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, -1], star: L,
    front(x, t, lt, P) {
      telescope(x, 720, 960, pop01(t, P.t0 + 0.2, 0.3, 2))
      const s = pop01(t, P.t0 + 0.9, 0.35, 2.4)
      bits(x, 'star', 860, 650, 16 * s)
      sparkles(x, t, 860, 650, P.t0 + 1.0, 7, 120, 0.4)
      label(x, 860, 780, 'STAR: YOU ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 600, 1080, P.t0 + 1.6, { n: 4, life: 1.6, spread: 90, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0676', key: 'C', accent: AQUA, solo: S, ending: 'callback',
  title: 'Your Aquarius | roommate *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird roommate. | *Best roommate.*', mood: 'sparkle' },
  last: {
    text: 'Rent is split | *fifteen ways.*',
    draw(x, t, lt) {
      pigeons(x, t, 540, 900, 14, t - lt + 0.6, { cell: 11, cols: 5, dx: 165, dy: 140 })
      label(x, 540, 1380, 'RENT ÷ 15', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
