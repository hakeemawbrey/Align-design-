// r2a0357: star_advice, ADVICE SOLO (gemini), "Doing better than | you think, *Gemini.*" (topic: Gemini, you’re doing better than you think) (signs3kit social cut, music: lofi · F). Ending: group.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a sheet of paper with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
/** a pixel phone with chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 58); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** a polaroid with a sign star inside */
function polaroid(x, t, cx, cy, k, id, { cap = '', rot = 0.06, mood = 'happy', seed = 50, tears = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -142, 256, 304)
  x.fillStyle = INK; x.fillRect(-134, -154, 268, 308); x.fillStyle = CREAM; x.fillRect(-126, -146, 252, 292)
  x.fillStyle = '#2a2350'; x.fillRect(-108, -128, 216, 196)
  signChar(x, t, id, 0, -24, 150, { mood, seed, glyph: false, glow: 0.6, tears })
  if (cap) { x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, 0, 108) }
  x.restore()
}

const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const S = 'gemini'
const CAMEOS = [
  { sign: S, cap: 'Fifty tabs open? | *Curious,* not chaotic.', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(50, Math.floor(clamp((lt - 0.2) / 0.8) * 50))
      if (lt < 1.1) L(x, 790, 800, `TABS OPEN: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 38)
      else swapLabel(x, 790, 800, lt, 1.1, `TABS OPEN: ${n}`, 'CURIOSITY: 50', { size: 38, toBg: ACC })
      sparkles(x, t, 790, 800, P.t0 + 1.6, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Changed your mind again? | That’s *growing.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 760, lt, 0.8, 'PLAN A', 'PLAN F ✓', { size: 44, toBg: MINT })
      L(x, 790, 1000, 'STILL GOING: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Talked for an hour? | They *loved every word.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 950, 190 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 760, 650, '…and ANOTHER thing', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, col: BONE, tail: 'bl' })
      hearts(x, t, 820, 860, P.t0 + 1.1, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Started five new hobbies? | You’re *collecting joy.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['pottery', 'chess', 'juggling', 'opera?'], { head: 'THIS WEEK', headBg: ACC, w: 300, size: 32, rot: 0.04 })
      L(x, 790, 1100, 'JOY: COLLECTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Feel like two people? | *Both are lovable.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k1 = pop01(t, P.t0 + 0.3, 0.35, 2), k2 = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k1 > 0.01) signChar(x, t, 'gemini', 700, 900, 140 * k1, { mood: 'wink', seed: 31, glyph: false, hops: [P.t0 + 1.3] })
      if (k2 > 0.01) signChar(x, t, 'gemini', 880, 900, 140 * k2, { mood: 'sparkle', seed: 32, glyph: false, hops: [P.t0 + 1.5] })
      L(x, 700, 1060, 'LOVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.05, 32)
      L(x, 880, 1060, 'ALSO LOVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.05, 28)
    } },
  { sign: S, cap: 'Forgot to reply? | You *didn’t ruin it.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: PINK, lines: [
        ['SO sorry!!', ACC, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['forgot to', ACC, pop01(t, P.t0 + 0.7, 0.25, 2.2), true],
        ['lol me too', BONE, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
        ['love u', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Bored of routine? | That *spark* is a gift.', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, BULB, { Y: '#ffe76a', W: '#ffffff', G: '#9aa5c4' }, 790, 820, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 820, P.t0 + 0.7, 8, 170, 0.2)
      L(x, 790, 1060, 'IDEAS: ALWAYS ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Did 3 of 40 tasks? | *Three counts.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 780, 800, pop01(t, P.t0 + 0.2, 0.3, 2), ['✓ woke up', '✓ ate lunch', '✓ called mom', '  …37 more'], { head: 'TO-DO', headBg: MINT, w: 320, size: 30, rot: -0.03 })
      L(x, 780, 1090, 'PROUD: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Replaying chats at 2 AM? | *You did fine.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 720, `REPLAY #${1 + Math.floor(clamp(lt / 1.2) * 13)}`, pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.05, 38)
      L(x, 790, 900, 'VERDICT: YOU WERE NICE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 26)
      L(x, 790, 1060, 'GOODNIGHT ☾', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, -0.03, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0357', key: 'F', accent: ACC, solo: 'gemini', ending: 'group',
  title: 'Doing better than | you think, *Gemini.*',
  cameos: CAMEOS,
  group: {
    cap: 'Both of you? | *Doing great.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
