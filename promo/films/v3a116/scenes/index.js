// v3a116: star_advice, ADVICE ROLLCALL, "What each sign | deserves." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, one warm, specific thing each deserves, with one light gag:
//   ♈ someone who can keep up (Sag runs alongside) · ♉ soft blankets and zero surprises · ♊ someone who loves voice
//   note #14 · ♋ someone who remembers your mom’s birthday · ♌ a standing ovation for making toast · ♍ someone who loads the
//   dishwasher correctly · ♎ someone who picks the movie · ♏ loyalty without the test · ♐ someone who already packed
//   · ♑ someone proud before the promotion · ♒ someone who says “I’m in” to the snail hotel · ♓ a love on repeat
//  49.2   "Everyone deserves | *the good stuff.*"  group photo
//  52.6   callback: "Leo made toast again. | *Standing ovation.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', VIOLET = '#b48cff'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
const TOAST = ['.TTTTTT.', 'TBBBBBBT', 'TBBBBBBT', 'TBBBBBBT', 'TBBBBBBT', 'TBBBBBBT', 'TTTTTTTT']
const TOAST_C = { T: '#a8743f', B: '#f3c77a' }
const PASSPORT = ['NNNNNNN', 'NNNNNNN', 'NNGGGNN', 'NGNNNGN', 'NNGGGNN', 'NNNNNNN', 'NNGGGNN', 'NNNNNNN']
const BLANKET = ['PPWPPWPP', 'PWPPWPPW', 'WPPWPPWP', 'PPWPPWPP', 'PWPPWPPW', 'WPPWPPWP']
const PLATE = ['.WWWW.', 'WWwwWW', 'WwWWwW', 'WWwwWW', '.WWWW.']
function confetti(x, t, cx, cy, t0, n = 18, spread = 300) {
  const tt = t - t0; if (tt < 0) return
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n - 0.5) * 2.2, v = 300 + (i * 37) % 200
    const px = cx + Math.cos(a) * v * tt * 0.9 * (spread / 300), py = cy + Math.sin(a) * v * tt + 260 * tt * tt
    x.fillStyle = [GOLD, PINK, MINT, SKYB, LAV][i % 5]; x.fillRect(px, py, 14, 9)
  }
}
function waveform(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 140, k, 0.04, LAV)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -30); x.lineTo(-100, 0); x.lineTo(-140, 30); x.fill()
  for (let i = 0; i < 18; i++) { const h = 10 + 40 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-80 + i * 12, -h / 2, 7, h) }
  x.restore()
}
function quiz(x, cx, cy, k, cross) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 300, 340, k, -0.05, '#fff4e2')
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TRUST TEST', 0, -130)
  x.font = `700 24px ${MONO}`; ['Q1. where were', '    you at 9:14?', 'Q2. explain.', 'Q3. explain', '    again.'].forEach((r, i) => { x.textAlign = 'left'; x.fillText(r, -125, -70 + i * 44) })
  if (cross > 0) { x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(-130, -150); x.lineTo(-130 + 260 * cross, -150 + 300 * cross); x.stroke(); x.beginPath(); x.moveTo(130, -150); x.lineTo(130 - 260 * cross, -150 + 300 * cross); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who can | *keep up.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 960, 210 * k, { mood: 'sparkle', look: [-1, 0], seed: 81, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.5, P.t0 + 2.1] })
      for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(150 + ((t * 300 + i * 90) % 300), 1000 + i * 30, 60, 6) }
      label(x, 790, 660, 'SPEED: MATCHED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Soft blankets. | *Zero surprises.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BLANKET, { P: '#ff9a7a', W: BONE }, 790, 880, 34 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 790, 1110, 'PLANS: CONFIRMED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Someone who loves | *every voice note.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      waveform(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = Math.min(14, 1 + Math.floor(Math.max(0, lt - 0.3) * 9))
      label(x, 790, 900, `VOICE NOTE #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'play it again!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Someone who remembers | *your mom’s birthday.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'sent her | flowers :)', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 920, 'MOM: OBSESSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: PINK, rot: -0.05 })
      if (lt > 1.4) hearts(x, t, 420, 900, P.t0 + 1.4 * (3.1 / 2.4), { n: 5, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'A standing ovation | *for small wins.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'YOU MADE TOAST!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: '#ffb34a', rot: -0.04 })
      confetti(x, t, 790, 760, P.t0 + 1.3)
    } },
  { sign: 'virgo', cap: 'Someone who loads | the dishwasher *right.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, PLATE, { W: BONE, w: SKYB }, 660 + i * 62, 840, 24 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { sx: 0.35 })
      x.fillStyle = INK; x.fillRect(620, 920, 320, 14)
      label(x, 790, 1080, 'CORRECTLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 46, bg: MINT, rot: 0.04 })
      if (lt > 1.4) sparkles(x, t, 400, 860, P.t0 + 1.4 * (3.1 / 2.4), 7, 170, 0.3)
    } },
  { sign: 'libra', cap: 'Someone who | *picks the movie.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'this one. | done.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      label(x, 790, 920, 'DECISION: HANDLED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: '#ff9ccf', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Loyalty | *without the test.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      quiz(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.3)))
      label(x, 790, 1100, 'PASSED. NO QUIZ.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: VIOLET, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Someone who | *already packed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PASSPORT, { N: '#3a4a9a', G: GOLD }, 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      label(x, 790, 1080, 'FLIGHT: TOMORROW', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Someone proud | *before the promotion.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'proud of you. | already.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 920, 'NO KPI NEEDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Someone who loves | *your weirdest idea.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'a hotel | for snails?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      bubble(x, 800, 880, 'I’m in.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 52, col: MINT, tail: 'br' })
      sparkles(x, t, 400, 860, P.t0 + 1.6, 7, 170, 0.3)
    } },
  { sign: 'pisces', cap: 'A love that | *feels like a song.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 12, col: SKYB, seed: 2 })
      label(x, 790, 760, 'ON REPEAT', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 46, bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a116', key: 'D', accent: VIOLET, ending: 'callback',
  title: 'What each sign | *deserves.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone deserves | *the good stuff.*' },
  last: {
    text: 'Leo made toast again. | *Standing ovation.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      drawBits(x, TOAST, TOAST_C, 680, 1100, 20 * k)
      if (k > 0.01) signChar(x, t, 'leo', 400, 1100, 240 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], seed: 85, glyph: false, hops: [t - lt + 1.2] })
      confetti(x, t, 540, 960, t - lt + 1.0, 24, 400)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
