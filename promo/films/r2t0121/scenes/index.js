// r2t0121: THE SIGNS AS… v3, BELIKE, "Zodiacs when someone hums all day | be like." (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order; someone off-panel has been humming since breakfast. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "An all-day hummer? | Zodiacs *be like.*"
//   3.6–49.2   ♈ hummed back, louder (hum-off, round 7) · ♉ honestly? soothing (asleep) · ♊ hummed a different song at the same time
//              · ♋ humming means sad? brought soup · ♍ it's flat, brought a tuning fork · ♌ updated their profile: "vocalist"
//              · ♎ too polite to say it, day four · ♏ two notes in, knows their rising sign · ♐ moved abroad, still hears it
//              · ♑ sent an invoice for the noise · ♒ released it as an album · ♓ it's so beautiful (sobbing)
//  49.2        "Twelve signs. | *One hum.*"
//  52.4        LESSON UNLOCKED: "Let people hum. | It's *joy* leaking out."  MOOD: HUMMING
//  58.3        "Now *you're* | humming it."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', TEAL = '#5fd0c8'

// ── props
const ZZZ = ['ZZZZ', '..Z.', '.Z..', 'ZZZZ']
const BOWL = [
  '..s..s..s..',
  '...s..s....',
  'WWWWWWWWWWW',
  'OOOOOOOOOOO',
  '.OOOOOOOOO.',
  '..OOOOOOO..',
  '...OOOOO...',
]
const BOWL_C = { W: '#ffe7a8', O: '#ff9a4a', s: '#efe6d6' }
const FORK = [
  'S...S',
  'S...S',
  'S...S',
  'S...S',
  'S...S',
  'S...S',
  'SSSSS',
  '.SSS.',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
  '.SSS.',
]
const FORK_C = { S: '#d8dbe8' }
const SUITCASE = [
  '...HHHH...',
  '...H..H...',
  'BBBBBBBBBB',
  'BYBBBBBBYB',
  'BBBBBBBBBB',
  'BBBBGGBBBB',
  'BBBBBBBBBB',
  'BYBBBBBBYB',
  'BBBBBBBBBB',
  '.K......K.',
]
const SUITCASE_C = { H: '#2a2350', B: '#ff9a4a', Y: GOLD, G: '#5fd068', K: INK }

// the off-panel hummer: a little stream of notes drifting in from the right edge
function hum(x, t, k = 1, cx = 960, cy = 760) { notes(x, t, cx, cy, { n: 3, cell: 6, col: LAV, alpha: 0.85 * k, seed: 5 }) }

/** a little birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[(i + 4) % 12]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.7, 2.1, 3.3, 5.0]) x.fillRect(Math.cos(a) * r * 0.45 - 8, Math.sin(a) * r * 0.45 - 8, 16, 16)
  x.restore()
}
// a profile card with a "vocalist" line under the star
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const w = 280, h = 360
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 190)
  signChar(x, t, 'leo', 0, -h / 2 + 112, 150, { mood: 'sparkle', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = ORANGE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♌︎ LEO', 0, 40)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`
  const word = lt > 1.1 ? 'vocalist ✦' : 'job: ______'
  x.fillText(word, 0, 92)
  x.fillStyle = '#6b62a8'; x.fillRect(-90, 130, 180, 10)
  x.restore()
}
// an invoice slip
function invoice(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -164, 256, 340)
  x.fillStyle = INK; x.fillRect(-136, -178, 272, 352)
  x.fillStyle = '#fff4e2'; x.fillRect(-128, -170, 256, 336)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 34px ${INTER}`; x.fillText('INVOICE', 0, -130)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  const rows = [['humming', '×212'], ['encore', '×9'], ['the high', 'note']]
  rows.forEach(([a, b], i) => { if (lt > 0.5 + i * 0.3) { x.fillStyle = '#6b62a8'; x.fillText(a, -108, -70 + i * 48); x.textAlign = 'right'; x.fillText(b, 108, -70 + i * 48); x.textAlign = 'left' } })
  x.fillStyle = INK; x.fillRect(-108, 74, 216, 4)
  if (lt > 1.4) { x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = RED; x.fillText('DUE: TODAY', 0, 116) }
  x.restore()
}
// a vinyl record in a sleeve
function album(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // record peeking out
  x.save(); x.translate(70, -10); x.rotate(t * 2)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#3a3166'; x.lineWidth = 3; for (const r of [120, 95, 75]) { x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke() }
  x.fillStyle = TEAL; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 8, 0, Math.PI * 2); x.fill()
  x.restore()
  // sleeve
  x.rotate(-0.05)
  x.fillStyle = INK; x.fillRect(-176, -176, 300, 300)
  x.fillStyle = '#6fc3ff'; x.fillRect(-168, -168, 284, 284)
  x.fillStyle = '#140c30'; x.fillRect(-150, -150, 248, 170)
  notes(x, t, -26, -20, { n: 3, cell: 6, col: GOLD, seed: 3 })
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('HUM', -26, 54)
  x.font = `700 22px ${MONO}`; x.fillText('VOL. 1', -26, 92)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Hummed back. | *Louder.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.4, 2.0],
    front(x, t, lt, P, F) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.25, 2.2)
      bubble(x, 760, 700, 'HMMMMMM!!', k * (1 + 0.05 * Math.sin(t * 30)), { size: 52, tail: 'bl', col: '#ffb0a8' })
      notes(x, t, F.x + 60, F.cy - 60, { n: 5, cell: 9, col: RED, alpha: k, seed: 1 })
      label(x, 780, 960, 'HUM-OFF: ROUND 7', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Honestly? | Kind of *soothing.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      const z = pop01(t, P.t0 + 1.3, 0.3, 2)
      for (let i = 0; i < 3; i++) drawBits(x, ZZZ, { Z: SKYB }, F.x + 150 + i * 60, F.cy - 150 - i * 70 + Math.sin(t * 2 + i) * 8, (7 + i * 3) * z)
      label(x, 780, 1080, 'NAP: STARTED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Hummed a different song. | *Same time.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'la la LA', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl', col: '#fff1a8' })
      bubble(x, 760, 1000, 'dum dum DUM', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl', col: '#bff0ff' })
      label(x, 780, 830, 'DUET? NO. DUEL.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Humming means sad? | Brought *soup.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 660, 'you okay??', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl', col: '#d9f4ff' })
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      drawBits(x, BOWL, BOWL_C, 790, 930, 20 * k)
      label(x, 790, 1080, 'EXTRA WARM', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: '#bff0ff', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Joined in. Updated profile: | *vocalist.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, F.x, F.top - 20, { n: 4, cell: 8, col: ORANGE, seed: 4, alpha: pop01(t, P.t0 + 0.4, 0.3, 2) })
      profile(x, t, 790, 840, pop01(t, P.t0 + 0.5, 0.35, 2), lt)
      sparkles(x, t, 790, 920, P.t0 + 1.45, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'It’s *flat.* | Brought a tuning fork.', mood: lt => lt > 0.6 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, FORK, FORK_C, 790, 880, 22 * k, { rot: 0.1 + (lt > 1.3 ? Math.sin(t * 50) * 0.03 : 0) })
      label(x, 790, 640, 'OFF BY A LOT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      if (lt > 1.4) bubble(x, 790, 1110, 'this is a C.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Too polite to say it. | *Day four.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 680, 'love that | for you!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      const d = 1 + Math.floor(clamp((lt - 0.8) / 1.0) * 3)
      label(x, 790, 960, `DAY ${d}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 64, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Two notes in. | Knows their *rising sign.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      chart(x, 790, 840, 150, pop01(t, P.t0 + 0.5, 0.35, 2), t)
      label(x, 790, 1060, 'CANCER RISING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: '#c97bff', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Moved abroad. | *Still hears it.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4],
    front(x, t, lt, P, F) {
      drawBits(x, SUITCASE, SUITCASE_C, F.x + 150, F.cy + 110, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 800, 640, '9,000 KM AWAY', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 1.3, 0.25, 2.2)
      bubble(x, 800, 870, 'hmm hmm hmmm', k, { size: 36, tail: 'br', col: LAV })
      hum(x, t, k, 900, 860)
    } },
  { sign: 'capricorn', cap: 'Sent them | an *invoice.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2), 980, 600)
      invoice(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), lt)
    } },
  { sign: 'aquarius', cap: 'Recorded it. | Dropped *an album.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      album(x, t, 780, 840, pop01(t, P.t0 + 0.5, 0.35, 2))
      label(x, 790, 1090, 'CULT CLASSIC', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: TEAL, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'It’s just *so* | beautiful.', mood: 'wide', look: [1, 0], tears: lt => lt > 0.7 ? 3 : 1, star: { x: -150 },
    front(x, t, lt, P) {
      hum(x, t, pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 780, 900, { n: 5, cell: 9, col: SKYB, seed: 7, alpha: pop01(t, P.t0 + 0.4, 0.3, 2) })
      bubble(x, 780, 650, 'who wrote this', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl', col: '#d9f4ff' })
      label(x, 790, 1080, 'TISSUES: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0121', key: 'C', accent: LAV, ending: 'lesson',
  title: 'An all-day hummer? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One hum.*', moods: ['wide', 'sleepy', 'wink', 'heart', 'sparkle', 'eyeroll', 'happy', 'wink', 'sparkle', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) { notes(x, t, 540, 1050, { n: 6, cell: 8, col: LAV, alpha: clamp(lt * 2), seed: 2 }) } },
  lesson: { text: 'Let people hum. | It’s *joy* leaking out.', chip: 'MOOD: HUMMING' },
  last: {
    text: 'Now *you’re* | humming it.',
    draw(x, t, lt) { notes(x, t, 540, 1150, { n: 7, cell: 9, col: GOLD, alpha: pop01(t, t - lt + 0.6, 0.4, 2), seed: 9 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
