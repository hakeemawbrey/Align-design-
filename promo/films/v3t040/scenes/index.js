// v3t040: THE SIGNS AS… v3, "When you’re late, | zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   you're late, one sign per card, each pushed to the extreme:
//              ♈ one minute late? left · ♉ saving your seat since 2 p.m. · ♊ made three new friends while waiting
//              · ♋ called you, then called your mom · ♌ you're late? Leo's later · ♍ sent a calendar invite for being on time
//              · ♎ waited so long, did a photoshoot · ♏ already knew you'd be late · ♐ forgot the plans, went skydiving
//              · ♑ billed you for their time · ♒ didn't notice, thinking about space · ♓ their match is late, Pisces sobbing
//  49.2        group: "Sorry, | *traffic.*"
//  52.6        callback: "Taurus is still | *saving your seat.*" (the chair from Taurus' card)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const CHAIR = [
  'BBBBBBBB..',
  'BbbbbbbB..',
  'BbbbbbbB..',
  'BbbbbbbB..',
  'BBBBBBBB..',
  'BSSSSSSSSB',
  'BBBBBBBBBB',
  'B........B',
  'B........B',
  'B........B',
]
const CHAIR_C = { B: BROWN, b: '#c47a4a', S: '#e27a96' }
const PHONE = [
  'KKKKKKK',
  'KSSSSSK',
  'KSGGGSK',
  'KSSSSSK',
  'KSGGSSK',
  'KSSSSSK',
  'KSSSSSK',
  'KKKKKKK',
]
const CAMERA = [
  '..KKK.......',
  'KKKKKKKKKKKK',
  'KSSSSKKKSSSK',
  'KSSSKWWKSSSK',
  'KSSSKWWKSSSK',
  'KSSSSKKKSSSK',
  'KKKKKKKKKKKK',
]
const CHUTE = [
  '..RRWWRRWW..',
  '.RRWWRRWWRR.',
  'RRWWRRWWRRWW',
  'K..........K',
  '.K........K.',
  '..K......K..',
  '...K....K...',
  '....K..K....',
]
const PLANET = [
  '....PPPP....',
  '..PPPPPPPP..',
  'RRRRRRRRRRRR',
  '.PPPPPPPPPP.',
  '..PPPPPPPP..',
  '....PPPP....',
]

// a sheet of paper with a heading and two lines of text
function sheet(x, cx, cy, k, head, l1, l2, { col = INK, rot = 0.04, w = 300, h = 300 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.25, k * 1.25)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 50)
  x.fillStyle = col; x.font = `700 34px ${MONO}`; x.fillText(l1, 0, 10); x.fillText(l2, 0, 70)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'One minute late? | *Gone.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', star: { x: -170 }, hops: [1.2, 1.4, 1.6],
    front(x, t, lt, P) {
      label(x, 800, 700, 'WAITED: 0:60', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 940, 'BYE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 60, bg: RED, color: CREAM, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Saving your seat. | *Since 2 p.m.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 770, 860, 'TAKEN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 640, 'NOW: 6:40', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Made three new friends | *while waiting.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const ids = ['libra', 'sagittarius', 'aquarius']
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.35, 2); if (k > 0.01) signChar(x, t, ids[i], 640 + i * 125, 970 - (i % 2) * 50, 150 * k, { mood: 'happy', seed: 40 + i, glyph: false, hops: [P.t0 + 1.6 + i * 0.1] }) }
      bubble(x, 760, 700, 'besties now', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Called you. | Then *called your mom.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', tears: lt => lt > 1.5 ? 1 : 0, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: INK, S: '#2a2350', G: MINT }, 790 + Math.sin(t * 40) * (lt > 0.4 ? 4 : 0), 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'CALL #' + Math.min(9, 1 + Math.floor(lt * 4)), pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 42, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      if (lt > 1.2) bubble(x, 790, 1120, 'hi, it’s me again', pop01(t, P.t0 + 1.2 * 1.29, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'You’re late? | *Leo’s later.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      label(x, 790, 700, 'GRAND ENTRANCE', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 390, 880, P.t0 + 0.7, 8, 200, 0.1)
      label(x, 790, 960, '+45 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 48, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sent a calendar invite: | *“Be on time.”*', mood: lt => lt > 1.4 ? 'neutral' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) { sheet(x, 755, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'INVITE', 'BE ON TIME', '6:00 SHARP', { col: '#2fc79a' }) } },
  { sign: 'libra', cap: 'Waited so long, | *did a photoshoot.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: INK, S: '#9aa5c4', W: SKYB }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = (t * 2.5) % 1; if (lt > 0.5 && f < 0.12) { x.save(); x.globalAlpha = 0.5 * (1 - f / 0.12); x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() }
      label(x, 790, 1100, 'PHOTOS: ' + (Math.floor(lt * 30)), pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Already knew | *you’d be late.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'PREDICTED: 6:14', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'ARRIVED: 6:14', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Forgot the plans. | *Went skydiving.*', mood: 'sparkle', star: { x: 150, y: 20 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CHUTE, { R: '#9b5cff', W: CREAM, K: INK }, 330, 820 + Math.sin(t * 2) * 12, 26 * k)
      label(x, 330, 1050, 'PLANS?? OH.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Billed you | *for their time.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) { sheet(x, 755, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'INVOICE', '14 MIN', 'DUE: NOW', { col: RED }) } },
  { sign: 'aquarius', cap: 'Didn’t notice. | *Thinking about space.*', mood: 'sleepy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PLANET, { P: '#c9a6ff', R: GOLD }, 790, 780, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 790, 1020, 'oh, you’re here?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Their match is late. | *Pisces is sobbing.*', mood: lt => lt < 0.6 ? 'happy' : 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'they forgot | me!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 800, 980, 'LATE: 2 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t040', key: 'G', accent: '#ffb34a', ending: 'callback',
  title: 'When you’re late, | *zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Sorry, | *traffic.*' },
  last: {
    text: 'Taurus is still | *saving your seat.*',
    draw(x, t, lt) {
      drawBits(x, CHAIR, CHAIR_C, 680, 1200, 34 * pop01(t, t - lt + 0.4, 0.4, 2))
      signChar(x, t, 'taurus', 380, 1260, 220, { mood: 'sleepy', pop: pop01(t, t - lt + 0.8, 0.4, 1.8), seed: 12 })
      label(x, 680, 980, 'STILL TAKEN', pop01(t, t - lt + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
