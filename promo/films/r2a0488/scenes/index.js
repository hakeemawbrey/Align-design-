// r2a0488: star_advice, ADVICE SOLO (pisces), topic "Pisces, you're allowed | to be a beginner." → hook "Pisces, you can | *be a beginner.*" (signs3kit social cut,
// music: lofi · C). Ending: group (the group beat is the ending). Pisces cries in every card.
//   first painting is a blob (still yours) · cried at the first lesson (brave) · burnt the pancakes (breakfast still
//   happened) · the guitar honks like a goose (keep going) · fell off the board (that's how it starts) · still learning
//   your chart (everyone is) · asked a "silly" question (it wasn't) · danced off-beat (the joy was on time) · day one
//   again (day ones count).   group "Every expert | started wobbly."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces', ACC = '#6fc3ff', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// an easel canvas with a wobbly blob
function easel(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#8a5a2e'; x.fillRect(-110, 100, 16, 150); x.fillRect(94, 100, 16, 150); x.fillRect(-8, 100, 16, 130)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 260); x.fillStyle = CREAM; x.fillRect(-142, -142, 284, 244)
  if (p > 0.01) {
    x.save(); x.beginPath(); x.rect(-142, -142, 284, 244); x.clip(); x.globalAlpha = clamp(p * 2)
    x.fillStyle = PINK; x.beginPath(); for (let i = 0; i <= 16; i++) { const a = i / 16 * Math.PI * 2, r = 70 + 22 * Math.sin(a * 3 + 1) * p; i ? x.lineTo(Math.cos(a) * r - 20, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r - 20, Math.sin(a) * r) } x.fill()
    x.fillStyle = MINT; x.fillRect(40, -100, 60, 60); x.fillStyle = GOLD; x.fillRect(60, 40, 50, 30)
    x.restore()
  }
  x.restore()
}
const PAN = [
  '.KKKKKKK.......',
  'KBBBBBBBK......',
  'KBBBBBBBKSSSSSS',
  'KKKKKKKKK......',
]
const GUITAR = [
  '..........HH',
  '.........HH.',
  '........NN..',
  '.......NN...',
  '..WWW.NN....',
  '.WWWWWW.....',
  'WWWKKWWW....',
  'WWWKKWWW....',
  '.WWWWWW.....',
  '..WWWW......',
]
const GUITAR_C = { H: INK, N: '#8a5a2e', W: '#e0a56a', K: INK }
const BOARD = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', '.KK......KK.']
const BOARD_C = { P: PINK, K: INK }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.font = `800 70px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.rotate(-t * 0.25); x.fillText('?', 0, 4)
  x.restore()
}
// a tear-off calendar page
function calendar(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -150, 280, 300); x.fillStyle = CREAM; x.fillRect(-132, -142, 264, 284)
  x.fillStyle = RED; x.fillRect(-132, -142, 264, 70)
  x.fillStyle = CREAM; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY', 0, -106)
  x.fillStyle = INK; x.font = `800 72px ${INTER}`; x.fillText(text, 0, 30)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  // 1 · the blobby painting
  { sign: S, cap: 'First painting’s a blob? | *Still yours.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 1.2 ? 2 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      easel(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.4, 1.2))
      L(x, 790, 640, 'MASTERPIECE (DRAFT)', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  // 2 · cried at lesson one
  { sign: S, cap: 'Cried at lesson one? | *Brave, actually.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: lt => lt > 1.2 ? 1 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, 'LESSON 1', pop01(t, P.t0 + 0.2, 0.3, 2.4), SKYB, -0.04, 46)
      L(x, 790, 960, 'SHOWED UP: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 34)
    } },
  // 3 · burnt pancakes
  { sign: S, cap: 'Burnt the pancakes? | *Breakfast still happened.*', mood: lt => lt > 1.1 ? 'happy' : 'wide', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const burnt = lt > 0.8
      drawBits(x, PAN, { K: INK, B: burnt ? '#2a2350' : '#e8b07a', S: SLATE }, 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (burnt) { x.save(); x.globalAlpha = 0.5; x.fillStyle = SLATE; for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4) % 1; x.fillRect(740 + i * 30 + Math.sin(ph * 6) * 10, 870 - ph * 200, 18, 18) } x.restore() }
      L(x, 790, 1110, 'CRISPY STYLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  // 4 · the goose guitar
  { sign: S, cap: 'Guitar sounds like a goose? | *Keep going.*', mood: 'squint', tears: 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GUITAR, GUITAR_C, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      bubble(x, 760, 650, 'HONK', pop01(t, P.t0 + 0.8, 0.22, 2.4), { size: 64, col: GOLD, tail: 'bl' })
      L(x, 800, 1150, 'PRACTICE: DAY 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
    } },
  // 5 · fell off the board
  { sign: S, cap: 'Fell off the board? | *That’s how it starts.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: 2, look: [1, 0], star: { x: -170, y: 40 },
    front(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 0.3, 0.9))
      drawBits(x, BOARD, BOARD_C, lerp(500, 800, r), 1110, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: r * 0.2 })
      L(x, 790, 700, 'FALLS: 1 (OF MANY)', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 30)
    } },
  // 6 · Align: still learning the chart
  { sign: S, cap: 'Still learning your chart? | *Everyone is.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1060, 'HOUSES: WHAT?', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  // 7 · a silly question
  { sign: S, cap: 'Asked a “silly” question? | *It wasn’t silly.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'wait, how do | you do that?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 790, 980, 'GREAT QUESTION', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.04, 36)
    } },
  // 8 · danced off-beat
  { sign: S, cap: 'Danced off-beat? | *The joy was on time.*', mood: 'sparkle', tears: 1, look: [1, 0], star: ST, hops: [0.5, 1.1, 1.5],
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 10, col: GOLD, alpha: clamp(lt * 2) })
      L(x, 790, 680, 'RHYTHM: MY OWN', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, -0.04, 34)
    } },
  // 9 · day one again
  { sign: S, cap: 'Day one again? | *Day ones count.*', mood: 'heart', tears: 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'DAY 1')
      sparkles(x, t, 790, 850, P.t0 + 1.2, 8, 200, 0.4)
      hearts(x, t, 400, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0488', key: 'C', accent: ACC, solo: S,
  title: 'Pisces, you can | *be a beginner.*',
  cameos: CAMEOS,
  ending: 'group',
  group: { cap: 'Every expert | *started wobbly.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
