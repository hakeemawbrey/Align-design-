// r2a0196: star_advice, ADVICE SOLO, "Signs a Cancer | misses you." (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (solo mode, 9 cards): the soft, funny ways a Cancer misses you, each with a warm reframe.
//   0.0–3.6    "Signs a Cancer | *misses you.*"
//   3.6–37.8   nine cards: cooked your favourite (FOR: YOU) · sent a song, "this is us" · your hoodie is never coming back
//              · every trip: "home safe?" · planned the reunion down to the snacks · paused your show, waiting for you
//              · rechecked your compatibility (CANCER + YOU: ALWAYS) · misses you before you leave · "it's fine": call anyway
//  37.8        "Soft shell. | *Big heart.*"
//  41.0        LESSON UNLOCKED: "Missing you is how | they *say love.*"  MISSED: A LOT
//  46.9        "Call your Cancer. | *First ring.*"  over the match card: Cancer + Pisces (the reunion list, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SILVER = '#cfe0ff', RED = '#e23d4e', S = 'cancer'

const POT = [
  'K........K',
  'KPPPPPPPPK',
  '.PppppppP.',
  '.PPPPPPPP.',
  '.PPPPPPPP.',
  '.PPPPPPPP.',
  '..PPPPPP..',
]
const HOODIE = [
  '...HHHH...',
  '..HH..HH..',
  '.HHHHHHHH.',
  'HHHHHHHHHH',
  'HH.HHHH.HH',
  'HH.HHHH.HH',
  'HH.HppH.HH',
  '...HHHH...',
]
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function lines(x, arr, x0, y0, lh, size, col = INK) {
  x.fillStyle = col; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  arr.forEach((l, i) => x.fillText(l, x0, y0 + i * lh))
}
function phone(x, cx, cy, k, rot = 0.05) {
  if (!box(x, cx, cy, 230, 380, k, '#2a2350', rot)) return false
  x.fillStyle = '#140c30'; x.fillRect(-100, -160, 200, 310)
  return true
}

const CAMEOS = [
  { sign: S, cap: 'Cooked your favourite. | *Just in case.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, POT, { K: INK, P: '#9aa5c4', p: '#ffb34a' }, 790, 940, 26 * k)
      if (k > 0.5) for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(730 + i * 55 + Math.sin(ph * 8 + i) * 10, 820 - ph * 160, 14, 40); x.restore() }
      label(x, 790, 1110, 'FOR: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent you a song: | *“this is us.”*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))) {
        x.fillStyle = LAV; x.fillRect(-70, -120, 140, 140)
        drawBits(x, ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.'], { X: INK }, 0, -50, 14, { outline: null })
        x.fillStyle = BONE; x.fillRect(-80, 50, 160, 10); x.fillStyle = PINK; x.fillRect(-80, 50, 160 * ((lt * 0.3) % 1), 10)
        x.restore()
      }
      notes(x, t, 790, 760, { n: 4, cell: 7, col: PINK, seed: 1 })
      bubble(x, 560, 620, '“this is us”', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Your hoodie? | *Never coming back.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: SKYB, p: '#5aa8d8' }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 790, 1120, 'MINE NOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05 })
    } },
  { sign: S, cap: 'Every single trip: | *“home safe?”*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04)) x.restore()
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 3.99)
      for (let i = 0; i < n; i++) bubble(x, 790, 760 + i * 80, 'home safe?', 1, { size: 26, col: i === n - 1 ? MINT : BONE, tail: 'bl' })
      label(x, 790, 1120, 'SENT: 4 TIMES', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Planned the reunion | *down to the snacks.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (box(x, 790, 870, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), BONE, 0.04)) {
        x.fillStyle = '#8a5a3a'; x.fillRect(-60, -206, 120, 30)
        x.fillStyle = PINK; x.fillRect(-150, -190, 300, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REUNION PLAN', 0, -162)
        const items = ['snacks', 'blankets', 'Pisces', 'hugs']
        const n = Math.floor(clamp((lt - 0.5) / 1.2) * 4.99)
        lines(x, items.map((s, i) => (i < n ? '✓ ' : '◻ ') + s), -120, -90, 62, 34)
        x.restore()
      }
    } },
  { sign: S, cap: 'Paused your show. | *Waiting for you.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -190 }, squash: lt => lt > 1.2 ? 0.05 : 0,
    front(x, t, lt, P) {
      if (box(x, 790, 860, 330, 230, pop01(t, P.t0 + 0.2, 0.35, 2), '#140c30')) {
        x.fillStyle = BONE; x.fillRect(-36, -50, 24, 100); x.fillRect(12, -50, 24, 100)
        x.fillStyle = '#6b62a8'; x.fillRect(-140, 82, 280, 10); x.fillStyle = PINK; x.fillRect(-140, 82, 140, 10)
        x.fillStyle = INK; x.fillRect(-20, 121, 40, 40); x.fillRect(-90, 155, 180, 14)
        x.restore()
      }
      label(x, 790, 1100, 'PAUSED: DAY 3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rechecked your match. | *Still perfect.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (box(x, 790, 860, 330, 260, pop01(t, P.t0 + 0.2, 0.35, 2), BONE, -0.03)) {
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CANCER + YOU', 0, -80)
        x.fillStyle = INK; x.fillRect(-136, -26, 272, 52); x.fillStyle = '#e8dccb'; x.fillRect(-130, -20, 260, 40)
        x.fillStyle = PINK; x.fillRect(-130, -20, 260 * ease.outCubic(clamp((lt - 0.5) / 1.0)), 40)
        if (lt > 1.5) { x.fillStyle = '#ff4f86'; x.font = `800 40px ${INTER}`; x.fillText('ALWAYS', 0, 74) }
        x.restore()
      }
      if (lt > 1.5) hearts(x, t, 790, 690, P.t0 + 1.5 * 1.29, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Misses you | *before you leave.*', mood: 'neutral', tears: 1, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 940, 210 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      bubble(x, 560, 620, 'miss you already', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 800, 1130, 'YOU: STILL HERE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Says “it’s fine.” | *Call them anyway.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const ring = lt > 0.9 ? Math.sin(t * 40) * 0.05 : 0
      if (phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ring)) {
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lt > 0.9 ? 'CALLING…' : '', 0, -100)
        x.fillStyle = MINT; x.beginPath(); x.arc(0, 60, 40, 0, 7); x.fill()
        x.restore()
        if (lt > 0.9) signChar(x, t, 'cancer', 790, 840, 110, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 91, glyph: false, glow: 0.5 })
      }
      bubble(x, 560, 620, 'it’s fine!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0196', key: 'D', accent: SILVER, solo: S, ending: 'card',
  title: 'Signs a Cancer | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'pisces', chip: 'REUNITED' },
  group: { cap: 'Soft shell. | *Big heart.*', mood: 'heart' },
  lesson: { text: 'Missing you is how | they *say love.*', chip: 'MISSED: A LOT' },
  last: { text: 'Call your Cancer. | *First ring.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
