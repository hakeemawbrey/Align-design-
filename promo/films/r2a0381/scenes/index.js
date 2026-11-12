// r2a0381: star_advice, ADVICE SOLO (capricorn), "A Capricorn’s | dream friend." (topic: What Capricorns need from a friend) (signs3kit social cut, music: lofi · D).
// Ending: group. Nine cards, each a relatable Capricorn truth + a warm reframe, one gag each:
//   a friend books the table for once · dinner at the desk at 9:47 · showing up counts as much as fixing · half the boxes each
//   · someone finally laughs at the dry joke · inbox zero gets a party · rest goes in the calendar · 9 p.m. bedtime, respected
//   · you are more than the to-do list.   group "Steady for everyone. | Lean on us too."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const pal = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 13, ...o }) }

const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSWWSWWWSK.', '.KSSSSSSSSK.', '.KSWWWSWWSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG', '.GGGGGGGGGG.']
const LAPTOP_C = { K: '#2a2350', S: SKYB, W: '#ffffff', G: SLATE }
const BOWL = ['..NNNNNNN..', '.NNYNNNYNN.', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..']
const BOWL_C = { N: '#ffd23a', Y: ORANGE, W: CREAM }
const WRENCH = ['.KK...KK.', '.KK...KK.', '.KKKKKKK.', '..KKKKK..', '...KKK...', '...KKK...', '...KKK...', '...KKK...', '...KKK...', '..KKKKK..']
const BOX = ['BBBBBBBB', 'BBBTTBBB', 'BBBTTBBB', 'BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB']
const BOX_C = { B: '#c98f5a', T: CREAM }
const TROPHY = ['YYYYYYYYY', 'YWYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..']
const TROPHY_C = { Y: GOLD, W: '#fff6c2', K: '#6b62a8' }
const CUP = ['..W.W....', '.W.W.....', 'CCCCCCC..', 'CCCCCCCCC', 'CCCCCCC.C', 'CCCCCCCCC', '.CCCCC...']
const CUP_C = { W: '#ffffff', C: '#ff8fb1' }

/** a little wall clock */
function clock(x, cx, cy, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 70 - 4, Math.sin(a) * 70 - 4, 8, 8) }
  x.lineCap = 'round'; x.strokeStyle = INK
  const ha = ((h % 12) + m / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = m / 60 * Math.PI * 2 - Math.PI / 2
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 44, Math.sin(ha) * 44); x.stroke()
  x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 66, Math.sin(ma) * 66); x.stroke()
  x.restore()
}
/** a week planner; one block appears at `at` */
function planner(x, cx, cy, k, lt, at, block) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -170, 336, 356)
  x.fillStyle = INK; x.fillRect(-172, -184, 344, 360)
  x.fillStyle = CREAM; x.fillRect(-164, -176, 328, 344)
  x.fillStyle = SLATE; x.fillRect(-164, -176, 328, 56)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -148)
  const rows = ['MEETING', 'REPORT', 'MEETING', 'REPORT']
  x.font = `700 22px ${MONO}`
  rows.forEach((r, i) => { x.fillStyle = '#d8dbe8'; x.fillRect(-144, -100 + i * 52, 288, 40); x.fillStyle = '#6b62a8'; x.fillText(r, 0, -80 + i * 52) })
  const p = pop01(lt, at, 0.3, 2.4)
  if (p > 0.01) { x.save(); x.translate(0, 120); x.scale(p, p); x.fillStyle = MINT; x.fillRect(-150, -30, 300, 60); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText(block, 0, 2); x.restore() }
  x.restore()
}
/** a to-do list with every line ticked */
function todo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -160, 276, 336)
  x.fillStyle = INK; x.fillRect(-142, -172, 284, 344)
  x.fillStyle = '#ffe76a'; x.fillRect(-134, -164, 268, 328)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('TO-DO', -110, -126)
  for (let i = 0; i < 5; i++) {
    const y = -66 + i * 52
    x.fillStyle = INK; x.fillRect(-110, y - 14, 28, 28); x.fillStyle = '#ffe76a'; x.fillRect(-106, y - 10, 20, 20)
    x.fillStyle = '#c9a84a'; x.fillRect(-66, y - 4, 160, 8)
    if (lt > 0.3 + i * 0.12) { x.fillStyle = '#2fc79a'; x.fillRect(-104, y - 8, 16, 16) }
  }
  x.restore()
}

const S = 'capricorn', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Always the planner? | Let *a friend plan.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pal(x, t, 'gemini', 800, 940, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 0.9] })
      bubble(x, 800, 640, 'I booked | the table!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1150, 'YOU: OFF DUTY', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Working late again? | A friend *brings dinner.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, LAPTOP, LAPTOP_C, 800, 1000, 18 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 620, '9:47 PM', pop01(t, P.t0 + 0.2, 0.3, 2), SLATE, 0.04, 40)
      const d = ease.outCubic(prog(lt, 0.7, 1.2))
      if (lt > 0.7) drawBits(x, BOWL, BOWL_C, lerp(1000, 800, d), 790, 16, { rot: 0.05 })
      bubble(x, 800, 1150, 'eat first.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'Love by fixing things? | Showing up *counts too.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, WRENCH, { K: SLATE }, F.x + 150, F.cy + 20, 12 * pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.1 ? 1 - prog(lt, 1.1, 1.3) : 1), { rot: 0.5 })
      bubble(x, 800, 660, 'no fixing. | just sit with me', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      hearts(x, t, F.x + 40, F.top, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 4 })
      L(x, 790, 1060, 'PRESENCE: ENOUGH', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Hate asking for help? | *Asking is strong.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), split = ease.inOutCubic(prog(lt, 1.0, 1.4))
      for (let i = 0; i < 4; i++) {
        const mine = i < 2, bx = mine ? 720 : lerp(720, 880, split), by = 1110 - (mine ? i : i - 2 * split) * 96
        drawBits(x, BOX, BOX_C, bx, by, 15 * k)
      }
      pal(x, t, 'taurus', 900, 820, 160, pop01(t, P.t0 + 0.8, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 790, 600, 'HALF EACH', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 40)
    } },
  { sign: S, cap: 'Your humour is dry. | The right friend *laughs.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'I’d laugh, but | it’s a weekday.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, tail: 'bl' })
      pal(x, t, 'sagittarius', 820, 940, 180, pop01(t, P.t0 + 0.7, 0.35, 2), { mood: lt > 1.0 ? 'squint' : 'happy', look: [-1, 0], hops: [P.t0 + 1.1, P.t0 + 1.5] })
      L(x, 820, 1150, 'HA! HA! HA!', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.05, 38)
    } },
  { sign: S, cap: 'Inbox at zero? | That *deserves a party.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1060, 'INBOX: 0', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 44)
      sparkles(x, t, 790, 820, P.t0 + 0.9, 8, 200, 0.2)
      bubble(x, 790, 620, 'small wins count!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Rest isn’t slacking. | It’s *part of the plan.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      planner(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 0.9, 'NAP: 2 P.M.')
    } },
  { sign: S, cap: 'Bedtime at 9 p.m.? | A real friend *gets it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      clock(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 9, 0)
      drawBits(x, CUP, CUP_C, F.x + 150, F.cy + 70, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 800, 960, 'night! same time | next week?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'You’re more than | *what you get done.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      todo(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1090, 'YOU > THE LIST', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 36)
      hearts(x, t, F.x + 40, F.top, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0381', key: 'D', accent: MINT, solo: S,
  title: 'A Capricorn’s | *dream friend.*',
  cameos: CAMEOS,
  ending: 'group',
  group: { cap: 'Steady for everyone. | *Lean on us too.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
