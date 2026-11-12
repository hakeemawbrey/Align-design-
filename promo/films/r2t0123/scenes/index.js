// r2t0123: THE SIGNS AS… v3, SOLO film, "Being an Aquarius | be like." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine Aquarius truths, each pushed to the most extreme (and lovable) version.
//   0.0–3.6    "Being an Aquarius | *be like.*"
//   3.6–37.8   disagrees with everyone, including themself · forty hobbies, finished none · loves humanity, avoids people
//              · replies in 3–5 business days · dresses like it's the year 3000 · learned your sign, wrote a whole theory
//              · invented a gadget nobody asked for · feelings? filed for later · hates trends, starts one by accident
//  37.8        "Weird on purpose. | *Iconic by accident.*"
//  41.2        CALLBACK: "The gadget? | *It toasts.*"  The useless gadget is back, popping toast.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#5fd0c8', RED = '#e23d4e', CREAM = '#fff4e2', BLUE = '#6fc3ff'

// ── props
const VISOR = ['..SSSSSSSSSSSSSSSS..', '.SBBBBBBBBBBBBBBBBS.', 'SBBWBBBBBBBBBBBBBBBS', '.SBBBBBBBBBBBBBBBBS.', '..SSSSSSSSSSSSSSSS..']
const VISOR_C = { S: '#d8dbe8', B: '#7dffb0', W: '#ffffff' }
const TOAST = ['.CCCCCCC.', 'CCBBBBBCC', 'CBBBBBBBC', 'CBBBBBBBC', 'CBBBBBBBC', 'CCCCCCCCC']
const TOAST_C = { C: '#b07a3a', B: '#f2c27a' }
const GUITAR = ['.......HH', '......HH.', '.....N...', '....N....', '.BBN.....', 'BBBBB....', 'BBOBB....', 'BBBBB....', '.BBB.....']
const GUITAR_C = { H: INK, N: '#8a4a2e', B: '#ff9a4a', O: INK }
const YARN = ['..PPPP..', '.PpPPpP.', 'PPPpPPPP', 'PpPPPpPP', 'PPPpPPpP', '.PPPPpP.', '..PPPP..']
const YARN_C = { P: PINK, p: '#ff4f86' }
const BRUSH = ['....YY', '...YY.', '..WW..', '.WW...', 'WW....', 'W.....']
const BRUSH_C = { Y: GOLD, W: '#8a4a2e' }
const PLANT = ['.G.G.', 'GGGGG', '.GGG.', '..G..', 'PPPPP', '.PPP.']
const PLANT_C = { G: '#5fd068', P: '#c96a3a' }

// the gadget: a box with an antenna, two dials and a blinking light (and, later, a toast slot)
function gadget(x, t, cx, cy, k, { toast = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(Math.sin(t * 9) * 0.02)
  if (toast > 0) drawBits(x, TOAST, TOAST_C, 40, -110 - 120 * toast, 14)
  x.fillStyle = INK; x.fillRect(-116, -230, 12, 140); x.fillStyle = Math.floor(t * 4) % 2 ? RED : GOLD; x.fillRect(-126, -250, 32, 32)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 210)
  x.fillStyle = '#9aa5c4'; x.fillRect(-142, -102, 284, 194)
  x.fillStyle = INK; x.fillRect(-90, -106, 180, 16)
  for (const [dx, c] of [[-70, TEAL], [10, PINK]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, -10, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(dx, -10, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.save(); x.translate(dx, -10); x.rotate(t * (dx > 0 ? 3 : -2)); x.fillRect(-3, -24, 6, 24); x.restore() }
  x.fillStyle = INK; x.fillRect(70, -50, 50, 80); x.fillStyle = '#7dffb0'; x.fillRect(76, -44, 38, 68)
  x.fillStyle = INK; for (let i = 0; i < 5; i++) x.fillRect(-120 + i * 52, 60, 30, 14)
  x.restore()
}
// a chalkboard: "♈ + ♒ = ?!" with arrows
function chalkboard(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 300)
  x.fillStyle = '#8a4a2e'; x.fillRect(-182, -142, 364, 284)
  x.fillStyle = '#1f3a32'; x.fillRect(-166, -126, 332, 252)
  x.fillStyle = '#e8f0e8'; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♌︎ + ♒︎', 0, -66)
  x.font = `700 26px ${MONO}`
  const lines = ['= fire × air', '= ??? ', '→ see p.47']
  lines.forEach((s, i) => { if (lt > 0.6 + i * 0.4) x.fillText(s, 0, 0 + i * 40) })
  x.strokeStyle = '#e8f0e8'; x.lineWidth = 4; x.beginPath(); x.arc(110, -66, 40, 0, Math.PI * 2 * clamp((lt - 1.6) * 2)); x.stroke()
  x.restore()
}
// a filing cabinet with one drawer labelled FEELINGS
function cabinet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#9aa5c4'; x.fillRect(-122, -192, 244, 384)
  const open = ease.outCubic(prog(lt, 0.8, 1.2)) * 40
  for (let i = 0; i < 3; i++) {
    const y = -180 + i * 124, o = i === 1 ? open : 0
    x.fillStyle = INK; x.fillRect(-110 + o * 0.3, y - 4 + 0, 220, 116)
    x.fillStyle = '#c4cde0'; x.fillRect(-104 + o * 0.3, y + 2, 208, 104)
    x.fillStyle = CREAM; x.fillRect(-60, y + 22, 120, 34)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(['TAXES', 'FEELINGS', 'IDEAS'][i], 0, y + 40)
    x.fillRect(-26, y + 70, 52, 12)
  }
  x.restore()
}
function arrowUp(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK
  x.beginPath(); x.moveTo(0, -70); x.lineTo(56, 0); x.lineTo(22, 0); x.lineTo(22, 70); x.lineTo(-22, 70); x.lineTo(-22, 0); x.lineTo(-56, 0); x.fill()
  x.fillStyle = '#7dffb0'; x.beginPath(); x.moveTo(0, -58); x.lineTo(44, -6); x.lineTo(14, -6); x.lineTo(14, 62); x.lineTo(-14, 62); x.lineTo(-14, -6); x.lineTo(-44, -6); x.fill()
  x.restore()
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Disagrees with everyone. | *Including themself.*', mood: lt => Math.floor(lt * 2) % 2 ? 'eyeroll' : 'wink', look: lt => [Math.floor(lt * 2) % 2 ? -1 : 1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'actually…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 790, 860, 'no, actually…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl', col: '#bff0ff' })
      label(x, 790, 1040, 'DEBATE: SELF', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty hobbies. | *Finished none.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = i => pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2)
      drawBits(x, GUITAR, GUITAR_C, 720, 820, 18 * k(0), { rot: -0.2 })
      drawBits(x, YARN, YARN_C, 880, 900, 14 * k(1))
      drawBits(x, BRUSH, BRUSH_C, 860, 720, 14 * k(2))
      drawBits(x, PLANT, PLANT_C, 720, 1010, 14 * k(3))
      label(x, 800, 1110, 'HOBBY #41: LOADING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Loves humanity. | *Avoids people.*', mood: lt => lt > 1.2 ? 'neutral' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I love | people!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl', col: '#ffd6e4' })
      label(x, 790, 960, 'DO NOT DISTURB', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Replies in | *3–5 business days.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'hey!! (mon)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl', col: '#bff0ff' })
      const d = ['TUE', 'WED', 'THU', 'FRI'][Math.min(3, Math.floor(clamp((lt - 0.5) / 1.4) * 4))]
      label(x, 790, 860, `WAITING… ${d}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1040, 'lol', pop01(t, P.t0 + 2.4, 0.25, 2.2), { size: 44, tail: 'br' })
    } },
  { sign: S, cap: 'Dresses like it’s | *the year 3000.*', mood: 'sparkle', star: { x: -150 }, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, VISOR, VISOR_C, F.x, F.cy - 6, 10 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 700, 'FROM THE FUTURE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: '#7dffb0', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.6, 7, 180, 0.2, ['#7dffb0', BONE, SKYB])
    } },
  { sign: S, cap: 'Learned your sign. | Wrote *a whole theory.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { chalkboard(x, t, 760, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'Invented a gadget | *nobody asked for.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      gadget(x, t, 790, 920, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'DOES: UNCLEAR', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feelings? | *Filed for later.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      cabinet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 620, 'OPEN: NEVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hates trends. | Starts one *by accident.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      arrowUp(x, 790, 900, 1.6 * pop01(t, P.t0 + 0.5, 0.35, 2))
      label(x, 790, 680, 'NOW TRENDING ✦', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: '#7dffb0', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 640, 'oh no.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0123', key: 'G', accent: TEAL, solo: 'aquarius', ending: 'callback',
  title: 'Being an Aquarius | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird on purpose. | *Iconic by accident.*', mood: 'sparkle' },
  last: {
    text: 'The gadget? | *It toasts.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 320, 1120, 300 * k, { mood: lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.6] })
      gadget(x, t, 730, 1200, 1.15 * pop01(t, t - lt + 0.6, 0.4, 2), { toast: ease.outBack(prog(lt, 1.4, 1.8)) })
      sparkles(x, t, 730, 900, t - lt + 1.5, 7, 170, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
