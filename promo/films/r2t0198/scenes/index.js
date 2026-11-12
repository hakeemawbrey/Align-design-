// r2t0198: star_talk, SOLO, "Sag first dates | be like." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (solo mode, 9 cards): a Sagittarius on a first date, every moment pushed to the extreme.
//   0.0–3.6    "Sag first dates | *be like.*"
//   3.6–37.8   nine cards: showed up with a passport · the reservation became a hike · asked your sign, then the meaning
//              of life · told the waiter their whole life story · honest review: "your laugh is loud" (a Gemini, loving it)
//              · one date, three time zones · already planning date two: abroad · lost track of time, and a shoe
//              · the goodnight moment? a high five
//  37.8        "Zero plan. | *Best date ever.*"
//  41.0        LESSON UNLOCKED: "Love a Sag? | Bring *good shoes.*"  ADVENTURE: BOOKED
//  46.9        "Laughed too loud. | *Got date two.*"  over the match card: Sagittarius + Gemini (the loud laugh, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PLUM = '#c58bff', RED = '#e23d4e', S = 'sagittarius'

const HAND = ['.F.F.F.', '.F.F.F.', 'FF.F.F.', 'FFFFFFF', 'FFFFFFF', '.FFFFF.', '..FFF..']
const SHOE = ['......BB..', '.....BBBB.', 'BBBBBBBBBB', 'BWBWBBBBBB', 'KKKKKKKKKK']
const PLANE = ['....W.....', '....WW....', 'WWWWWWWWWB', '....WW....', '....W.....']
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function clock(x, t, cx, cy, r, hour, col) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, 7); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill()
  x.strokeStyle = INK; x.lineWidth = 6; x.lineCap = 'round'
  const a = hour / 12 * Math.PI * 2 - Math.PI / 2, m = t * 3
  x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5); x.stroke()
  x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(m) * r * 0.8, cy + Math.sin(m) * r * 0.8); x.stroke()
}

const CAMEOS = [
  { sign: S, cap: 'Coffee date. | Brought *a passport.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      if (box(x, 800, 880, 220, 300, pop01(t, P.t0 + 0.3, 0.35, 2), '#3a2a6a', 0.08)) {
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, -30, 50, 0, 7); x.fill(); x.fillStyle = '#3a2a6a'; x.beginPath(); x.arc(0, -30, 36, 0, 7); x.fill()
        x.fillStyle = GOLD; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PASSPORT', 0, 80)
        x.restore()
      }
      label(x, 800, 1100, 'JUST IN CASE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The dinner reservation? | *Now a hike.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    back(x, t, lt, P) {
      const k = clamp((lt - 0.2) / 0.5)
      x.save(); x.globalAlpha = k
      x.fillStyle = INK; x.beginPath(); x.moveTo(560, 1180); x.lineTo(790, 700); x.lineTo(1000, 1180); x.fill()
      x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(580, 1172); x.lineTo(790, 726); x.lineTo(980, 1172); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.moveTo(746, 818); x.lineTo(790, 726); x.lineTo(834, 818); x.fill()
      x.restore()
    },
    front(x, t, lt, P) { label(x, 800, 640, 'DRESS CODE: BOOTS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 }) } },
  { sign: S, cap: 'Asked your sign. | Then *the meaning of life.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what’s your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 790, 900, 'ok but why | are we here?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Told the waiter | *their whole life story.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 980, 190 * k, { mood: lt > 1.3 ? 'sleepy' : 'neutral', look: [-1, 0], seed: 31, glyph: false })
      bubble(x, 760, 680, 'so, in the desert…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 810, 1140, 'CHAPTER 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Honest review: | *“your laugh is loud.”*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 810, 960, 200 * k, { mood: lt > 1.0 ? 'sparkle' : 'happy', look: [-1, 0], seed: 33, glyph: false, hops: [P.t0 + 1.4, P.t0 + 1.8], squash: lt > 1.0 ? 0.04 * Math.sin(t * 30) : 0 })
      if (lt > 1.0) bubble(x, 810, 700, 'HA HA HA', pop01(t, P.t0 + 1.0 * 1.29, 0.25, 2.2), { size: 40, col: '#ffe9a0', tail: 'bc' })
      label(x, 810, 1140, 'LOVES IT', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One date. | *Three time zones.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const cols = [BONE, SKYB, '#ffd9a0']
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2); if (k > 0.01) { x.save(); x.translate(800, 680 + i * 190); x.scale(k, k); clock(x, t + i, 0, 0, 70, [7, 1, 11][i], cols[i]); x.restore() } }
    } },
  { sign: S, cap: 'Already planning | date two: *abroad.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 136, 0, 7); x.fill(); x.fillStyle = '#5aa8d8'; x.beginPath(); x.arc(0, 0, 128, 0, 7); x.fill()
        x.fillStyle = MINT; x.beginPath(); x.ellipse(-40, -30, 60, 40, 0.4, 0, 7); x.fill(); x.beginPath(); x.ellipse(50, 50, 50, 30, -0.3, 0, 7); x.fill()
        x.restore()
        const a = t * 1.6; drawBits(x, PLANE, { W: '#fff', B: RED }, 800 + Math.cos(a) * 180, 880 + Math.sin(a) * 70, 9, { rot: a + Math.PI / 2 })
      }
      label(x, 800, 1110, 'DATE 2: ???', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost track of time. | *And one shoe.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SHOE, { B: PLUM, W: '#fff', K: INK }, 800, 960, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.2 })
      label(x, 800, 720, 'LOST & FOUND', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 420, 640, 'worth it!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'The goodnight moment? | *A high five.*', mood: 'sparkle', look: [1, 0], star: { x: -160 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 940, 200 * k, { mood: lt > 1.1 ? 'wide' : 'heart', look: [-1, 0], seed: 35, glyph: false })
      const hk = pop01(t, P.t0 + 0.9, 0.3, 2.4)
      drawBits(x, HAND, { F: '#ffd9a0' }, 640, 770, 19 * hk, { rot: -0.15 })
      sparkles(x, t, 640, 760, P.t0 + 1.2, 6, 90, 0.5)
      label(x, 640, 620, 'SMACK!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 40, bg: GOLD, rot: 0.08 })
    } },
]

const F = makeFilm({
  id: 'r2t0198', key: 'G', accent: PLUM, solo: S, ending: 'card',
  title: 'Sag first dates | *be like.*',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'gemini', chip: 'IT’S A MATCH' },
  group: { cap: 'Zero plan. | *Best date ever.*', mood: 'sparkle' },
  lesson: { text: 'Love a Sag? | Bring *good shoes.*', chip: 'ADVENTURE: BOOKED' },
  last: { text: 'Laughed too loud. | *Got date two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
