// r2a0358: star_advice, ADVICE SOLO (libra), "Signs a Libra | *needs a break.*" (signs3kit social cut, music: lofi · C). Ending: callback (the 2% battery comes back full).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
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

/** a pixel battery with a fill level 0…1 */
function battery(x, cx, cy, k, level, { w = 220, h = 110 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20); x.fillRect(w / 2 + 6, -h / 4, 22, h / 2)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  const col = level < 0.2 ? RED : level < 0.6 ? GOLD : MINT
  x.fillStyle = col; x.fillRect(-w / 2 + 10, -h / 2 + 10, Math.max(8, (w - 20) * level), h - 20)
  x.fillStyle = level >= 0.6 ? INK : BONE; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(level * 100)}%`, 0, 2)
  x.restore()
}
/** balance scales tilted by a (radians) */
function scales(x, cx, cy, k, a) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -120, 28, 250); x.fillRect(-90, 120, 180, 28)
  x.fillStyle = GOLD; x.fillRect(-8, -114, 16, 238); x.fillRect(-84, 124, 168, 18)
  x.save(); x.translate(0, -120); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-180, -10, 360, 20); x.fillStyle = GOLD; x.fillRect(-176, -6, 352, 12)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 170, 0); x.rotate(-a)
    x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-66, 86, 132, 22); x.fillStyle = GOLD; x.fillRect(-62, 90, 124, 14)
    x.restore()
  }
  x.restore(); x.restore()
}
const S = 'libra'
const CAMEOS = [
  { sign: S, cap: '“I don’t mind” times nine? | *You can mind.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.0) * 8)
      bubble(x, 780, 700, 'i don’t mind!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      L(x, 790, 880, `TODAY: ×${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.04, 38)
      L(x, 790, 1060, 'NEW: I’D LIKE TACOS', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Refereeing every argument? | *Take the whistle off.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'aries', 700, 960, 130 * k, { mood: 'wide', look: [1, 0], seed: 21, glyph: false }); signChar(x, t, 'leo', 890, 960, 130 * k, { mood: 'wide', look: [-1, 0], seed: 22, glyph: false }) }
      if (pop01(t, P.t0 + 0.4, 0.3, 2) > 0.5) swapLabel(x, 790, 730, lt, 1.1, 'REFEREE: ON DUTY', 'REFEREE: OFF ✓', { size: 30, toBg: MINT })
      L(x, 790, 1110, 'THEY’LL BE FINE', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: S, cap: 'Rewrote one text 14 times? | It’s *already kind.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 13)
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `DRAFT ${n}`, headCol: PINK, lines: [
        ['hey! no rush', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true],
        ['but also if', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['sent ✓', MINT, pop01(t, P.t0 + 1.8, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Smiling at 2% battery? | *Rest is pretty too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      battery(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 0.02)
      L(x, 790, 1020, 'SMILE: STILL ON', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, -0.04, 32)
      L(x, 790, 1120, 'NAP: APPROVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Said yes to four plans? | *One no is fine.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 780, 810, pop01(t, P.t0 + 0.2, 0.3, 2), ['brunch 11:00', 'picnic 11:30', 'party 12:00', 'gala 12:15'], { head: 'SATURDAY', headBg: PINK, w: 320, size: 30, rot: 0.04 })
      L(x, 790, 1100, 'GALA: CANCELLED ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Scales won’t balance? | *Days don’t either.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      scales(x, 760, 880, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), 0.28 * Math.sin(t * 3) * (1 - clamp((lt - 1.5) / 0.5) * 0.7))
      L(x, 790, 1120, 'WOBBLY IS OK', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Hosting everyone, always? | Let them *bring snacks.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      L(x, 790, 700, 'HOST: YOU (AGAIN)', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 30)
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 930, 170 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false })
      L(x, 800, 1110, 'TAURUS BROUGHT 9 PIES', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: S, cap: 'Rearranged the room again? | *Now sit in it.*', mood: lt => lt > 1.5 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.0) * 6)
      L(x, 790, 760, `LAYOUT #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 40)
      L(x, 790, 960, 'COUCH: FOR SITTING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Forgot what you want? | *Ask yourself first.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, -1], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'what do I want?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 790, 920, 'ANSWER: A NAP.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 38)
      hearts(x, t, 380, 760, P.t0 + 1.4, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0358', key: 'C', accent: ACC, solo: 'libra', ending: 'callback',
  title: 'Signs a Libra | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Balance includes | *you.*', mood: 'heart' },
  last: {
    text: 'Battery? | *Finally full.*',
    draw(x, t, lt) {
      const t0 = t - lt, full = lt > 2.2
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 540, 900, 300 * k, { mood: full ? 'sparkle' : 'sleepy', seed: 7, hops: [t0 + 2.3, t0 + 2.9] })
      x.save(); x.translate(540, 1240); x.scale(1.7, 1.7); x.translate(-540, -1240)
      battery(x, 540, 1240, pop01(t, t0 + 0.4, 0.4, 2), clamp(0.02 + (lt - 0.6) / 1.6))
      x.restore()
      if (full) sparkles(x, t, 540, 1240, t0 + 2.2, 8, 240, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
