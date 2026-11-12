// r2t0350: THE SIGNS AS… v3, SOLO (aries), "Aries as your boss | *be like.*" (signs3kit social cut, music: lofi · F).
// Ending: group ("Loud. Fast. | *Best boss ever.*").
//   nine cards: the 9 a.m. meeting already ended · deadline Friday means today · all-caps praise · team building is a
//   race, Aries won · your idea launched by lunch · literally ran for coffee · annual review in thirty seconds · asked your
//   sign, hired on the spot · the printer jammed, Aries challenged it
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#ff7a59', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 34, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..']
const CUP = ['.WWWWWW.', 'KKKKKKKK', '.BBBBBB.', '.BBBBBB.', '.BWWWWB.', '.BBBBBB.', '..BBBB..']
const PRINTER = ['..WWWWWW..', '..WKKKKW..', 'GGGGGGGGGG', 'GGGGGGGRGG', 'GGGGGGGGGG', 'GKKKKKKKKG', 'GGGGGGGGGG']
/** a wall clock */
function clock(x, cx, cy, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineCap = 'round'
  const ah = (h % 12 + m / 60) / 12 * Math.PI * 2 - Math.PI / 2, am = m / 60 * Math.PI * 2 - Math.PI / 2
  x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ah) * 55, Math.sin(ah) * 55); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(am) * 85, Math.sin(am) * 85); x.stroke()
  x.restore()
}
/** a paper card with lines of text */
function paper(x, cx, cy, k, lines, { rot = 0.04, w = 320, size = 32, title = null } = {}) {
  if (k <= 0.01) return
  const h = 70 + lines.length * size * 1.4 + (title ? 50 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  let y = -h / 2 + 50
  if (title) { x.font = `700 24px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText(title, 0, y); y += 50; x.fillStyle = INK }
  x.font = `800 ${size}px ${INTER}`
  lines.forEach((l, i) => x.fillText(l, 0, y + i * size * 1.4))
  x.restore()
}
const ST = { x: -180 }

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Meeting starts at 9. | *Aries already ended it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      clock(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 8, 57 + Math.min(2, Math.floor(lt)))
      L(x, 800, 1060, 'MEETING: OVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.05, 40, BONE)
      bubble(x, 400, 620, 'great chat!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Deadline: Friday. | *Aries means today.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const today = lt > 1.0
      paper(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), [today ? 'TODAY' : 'FRIDAY'], { title: 'DEADLINE', size: 52 })
      if (today) sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 170, 0.3, [ACC, BONE, GOLD])
      L(x, 800, 1090, 'IT’S MONDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Praise comes | *in all caps.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'GREAT JOB!!!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 54, col: GOLD, tail: 'bl' })
      bubble(x, 800, 960, 'SO PROUD!!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 44, tail: 'bl' })
      L(x, 800, 1120, 'RE: YOUR STAPLER', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 28)
    } },
  { sign: S, cap: 'Team building? | *A race. Aries won.*', mood: 'sparkle', star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: INK }, 800, 880, 22 * pop01(t, P.t0 + 1.0, 0.35, 2))
      sparkles(x, t, 800, 860, P.t0 + 1.1, 8, 190, 0.2)
      L(x, 800, 680, 'TEAM: STRETCHING', pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, 0.04, 32)
      L(x, 800, 1100, '1ST PLACE (OF 1)', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, -0.04, 32)
    } },
  { sign: S, cap: 'You pitched an idea. | *Live by lunch.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'what if we…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: STEEL, tail: 'br' })
      L(x, 800, 900, 'LAUNCHED ✓', pop01(t, P.t0 + 1.0, 0.3, 2.6), MINT, 0.05, 52)
      L(x, 800, 1060, '11:42 AM', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, -0.04, 34)
      sparkles(x, t, 800, 900, P.t0 + 1.05, 9, 220, 0.4, [MINT, GOLD, BONE])
    } },
  { sign: S, cap: 'Coffee run? | *Aries literally ran.*', mood: 'sparkle', star: { x: -180 }, hops: [0.2, 0.4, 0.6, 0.8, 1.0],
    back(x, t, lt, P, F) {
      if (lt < 0.3) return
      x.save(); x.fillStyle = 'rgba(239,230,214,0.55)'
      for (let i = 0; i < 4; i++) x.fillRect(F.x - 200 - i * 20, F.cy - 80 + i * 50, 110 - i * 16, 12)
      x.restore()
    },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, CUP, { W: BONE, K: INK, B: '#c98a5a' }, 690 + i * 80, 940 - (i % 2) * 30, 11 * pop01(t, P.t0 + 0.5 + i * 0.15, 0.3, 2))
      L(x, 800, 700, 'BACK IN 40 SECONDS', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Annual review? | *Thirty seconds. Glowing.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 800, 860, pop01(t, P.t0 + 0.3, 0.3, 2), ['YOU’RE GREAT.', 'KEEP GOING.', 'BYE!'], { title: 'REVIEW', size: 36 })
      L(x, 800, 1110, 'TIME: 0:30', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, -0.04, 36)
    } },
  { sign: S, cap: 'Asked your sign. | *Hired on the spot.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'what’s your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 860, 'leo?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: '#ffb34a', tail: 'br' })
      L(x, 800, 1050, 'HIRED!', pop01(t, P.t0 + 1.0, 0.3, 2.6), MINT, 0.05, 60)
      hearts(x, t, 370, 760, P.t0 + 1.1, { n: 5, life: 1.5, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Printer jammed? | *Aries challenged it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const shake = lt > 0.6 && lt < 1.3 ? Math.sin(t * 40) * 8 : 0
      drawBits(x, PRINTER, { W: BONE, K: INK, G: STEEL, R: lt > 1.3 ? MINT : RED }, 800 + shake, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'ROUND 1', pop01(t, P.t0 + 0.5, 0.3, 2.4), GOLD, -0.05, 44)
      L(x, 800, 1130, 'PRINTER: TAMED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0350', key: 'F', accent: ACC, solo: 'aries', ending: 'group',
  title: 'Aries as your boss | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud. Fast. | *Best boss ever.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
