// r2a0171: star_advice, ADVICE SOLO, "Virgo, you're not | *too much.*" (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine very Virgo habits, each a relatable truth + a warm reframe, one light visual gag each.
// Ending: lesson.
//   0.0–3.6    "Virgo, you're not | *too much.*"
//   3.6–37.8   nine cards: fixed the group plan (care, not control) · noticed the new haircut · lists have lists
//              · re-read the text five times · apologise for asking · cleaned for the guests · remember the details
//              · want it perfect (good enough is okay) · tissues, snacks, a plan for a crying Pisces
//  37.8        "Careful. Kind. | *Exactly enough.*"
//  41.2        LESSON: "Your care isn't too much. | It's *just right.*"  STATUS: ENOUGH
//  47.1        "Now rest. | The list *can wait.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', GREEN = '#2fc79a'

// ── props
function card(x, cx, cy, k, lines, { w = 300, size = 30, rot = 0.04, head = null, headBg = MINT, strike = -1, ticks = 0 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 36 + (head ? 54 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 18
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 28); y0 += 54 }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => {
    const y = y0 + lh * (i + 0.5)
    x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`
    if (ticks) { x.fillStyle = i < ticks ? GREEN : '#b9b0a0'; x.fillRect(-w / 2 + 20, y - 12, 24, 24); x.fillStyle = INK; x.fillText(l, -w / 2 + 56, y) } else x.fillText(l, -w / 2 + 22, y)
    if (i === strike) { x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(-w / 2 + 18, y); x.lineTo(w / 2 - 18, y); x.stroke() }
  })
  x.restore()
}
function magnifier(x, cx, cy, k, rot = -0.5) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 90, 28, 150); x.fillStyle = '#8a5a3a'; x.fillRect(-8, 96, 16, 140)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 104, 0, 7); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 94, 0, 7); x.fill()
  x.fillStyle = 'rgba(190,240,255,0.55)'; x.beginPath(); x.arc(0, 0, 82, 0, 7); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-50, -50, 24, 12)
  x.restore()
}
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -216, 280, 432); x.fillStyle = '#2a2350'; x.fillRect(-130, -206, 260, 412)
  x.fillStyle = '#140c30'; x.fillRect(-116, -180, 232, 360)
  x.fillStyle = MINT; x.fillRect(-104, -40, 208, 80)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('sounds good!', 0, 0)
  if (Math.floor(lt * 2.5) % 2 === 0) { x.fillStyle = BONE; x.fillRect(-2, 50, 5, 40) }
  x.restore()
}
const BROOM = ['....K....', '....K....', '....K....', '....K....', '....K....', '....K....', '...YYY...', '..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', 'Y.Y.Y.Y.Y']
const LUNCH = ['..KKKKKK..', '.K......K.', 'RRRRRRRRRR', 'RrrrrrrrrR', 'RrrrrrrrrR', 'RrrrrrrrrR', 'RRRRRRRRRR']
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = GOLD; x.fillRect(-142, -112, 284, 224)
  x.fillStyle = '#9fd8ee'; x.fillRect(-118, -88, 236, 176)
  x.fillStyle = '#7dc77d'; x.beginPath(); x.moveTo(-118, 88); x.lineTo(-40, -10); x.lineTo(30, 60); x.lineTo(70, 20); x.lineTo(118, 88); x.fill()
  x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(70, -44, 22, 0, 7); x.fill()
  x.restore()
}
function tissues(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -40, 180, 100); x.fillStyle = LAV; x.fillRect(-82, -32, 164, 84)
  x.fillStyle = '#fff'; x.beginPath(); x.moveTo(-30, -32); x.quadraticCurveTo(0, -110, 30, -32); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'virgo', cap: 'You fixed the group plan. | That’s *care,* not control.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ['meet: 7pm', 'meet: 6:45', 'snacks: me', 'ride: me too'], { head: 'GROUP PLAN', strike: lt > 0.8 ? 0 : -1, rot: 0.05 })
      label(x, 790, 1130, 'EDITED WITH LOVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You noticed their new haircut. | *Noticing* is a gift.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 900, 180 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      magnifier(x, 640, 860, pop01(t, P.t0 + 0.5, 0.35, 2), -0.6)
      bubble(x, 800, 640, '…new bangs?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 800, 820, P.t0 + 1.4 * 1.29, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'virgo', cap: 'Your lists have lists. | *That’s how you love.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      card(x, 740, 780, pop01(t, P.t0 + 0.2, 0.3, 2), ['lists', 'more lists'], { head: 'LIST', rot: -0.07, w: 250, ticks: 1 })
      card(x, 800, 900, pop01(t, P.t0 + 0.6, 0.3, 2), ['call mom', 'water plant'], { head: 'LIST 2', headBg: SKYB, rot: 0.03, w: 270, ticks: 2 })
      card(x, 860, 1030, pop01(t, P.t0 + 1.0, 0.3, 2), ['hug friends'], { head: 'LIST 3', headBg: GOLD, rot: 0.08, w: 260, ticks: lt > 1.6 ? 1 : 0 })
    } },
  { sign: 'virgo', cap: 'Re-read your text five times? | It was *already kind.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 4)
      label(x, 800, 620, `DRAFT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1120, 'SEND IT. ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You apologise for asking. | Your questions *are welcome.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'sorry, quick q…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
      label(x, 790, 940, 'ASK AWAY!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 54, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 790, 940, P.t0 + 1.4, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'You cleaned for the guests. | They came *for you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, BROOM, { K: '#8a5a3a', Y: GOLD }, 790 + Math.sin(t * 7) * 20 * (lt < 1.3 ? 1 : 0), 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.25 })
      sparkles(x, t, 790, 1040, P.t0 + 0.5, 8, 200, 0.5, [BONE, '#fff', MINT])
      bubble(x, 780, 620, 'love the place!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1150, 'SPOTLESS: OPTIONAL', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You remember the little details. | People *feel that.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, LUNCH, { K: INK, R: RED, r: '#ff8a8a' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 790, 900, 'NO NUTS ✓', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'you remembered?!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'You want it perfect. | *Good enough* is okay too.', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      frame(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 0.14 * (1 - 0.5 * clamp((lt - 0.8) / 0.6)))
      label(x, 800, 1060, 'A LITTLE CROOKED.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1130, 'STILL LOVELY.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Tissues, snacks and a plan. | *Lucky us.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 810, 860, 220 * k, { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 19, glyph: false, tears: lt > 1.4 ? 2 : 3 })
      tissues(x, 500, 1090, 1.3 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 830, 1110, 'CRISIS: HANDLED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0171', key: 'D', accent: MINT, solo: 'virgo', ending: 'lesson',
  title: 'Virgo, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Careful. Kind. | *Exactly enough.*', mood: 'heart' },
  lesson: { text: 'Your care isn’t too much. | It’s *just right.*', chip: 'STATUS: ENOUGH' },
  last: { text: 'Now rest. | The list *can wait.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
