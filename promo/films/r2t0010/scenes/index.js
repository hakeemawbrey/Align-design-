// r2t0010: star_talk BELIKE, "A long line. | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order stuck in a very long line, each the most extreme version of itself:
//   ♈ switched lines nine times · ♉ brought a chair, and lunch · ♊ made three friends and a group chat · ♋ saving a spot
//   for the whole family (+11) · ♌ treated the line like a red carpet · ♍ re-sorted the line by height · ♎ let everyone
//   go first, still there, happy · ♏ silently judged every order · ♐ left to explore, came back with a souvenir · ♑ got
//   there at 5 a.m. · ♒ designed a better line system · ♓ cried when the line moved
//  49.2   "Still waiting. | *Somehow friends.*"  group photo
//  52.6   callback: "Gemini’s line chat: | *still going.*"  Gemini comes back with the phone buzzing.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a'
const CHAIR = [
  'BBBBBBBB..',
  'BRRRRRRB..',
  'BRRRRRRB..',
  'BBBBBBBBBB',
  'BRRRRRRRRB',
  'B.B....B.B',
  'B.B....B.B',
]
const CHAIR_C = { B: '#8a4a2e', R: '#5fd068' }
const SANDWICH = ['..BBBBBB..', '.BBBBBBBB.', 'GGGGGGGGGG', 'RRRRRRRRRR', 'BBBBBBBBBB']
const SANDWICH_C = { B: '#e8a24a', G: '#5fd068', R: '#e23d4e' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWSSK',
  'KSSSSSSK',
  'KSSWWWSK',
  'KSSSSSSK',
  'KSWWSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#fff4e2', G: '#6b62a8' }
const SNOW = [
  '...KKKK...',
  '..KWWWWK..',
  '..KWWWWK..',
  '...KKKK...',
  '..CCCCCC..',
  '.CWWWWWWC.',
  '.CWWSWWWC.',
  '.CWWWWWWC.',
  '..CCCCCC..',
  '....BB....',
]
const SNOW_C = { K: '#9aa5c4', W: '#c4f0ff', C: '#fff4e2', S: '#ff8fb1', B: '#c98f2a' }

/** a little queue of grey "people" shapes */
function queue(x, cx, cy, n, k, { gap = 64, col = '#6b62a8', scaleH = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) {
    const h = scaleH ? scaleH(i) : 120, px = (i - (n - 1) / 2) * gap
    x.fillStyle = INK; x.fillRect(px - 22, -h - 4, 44, h + 8); x.beginPath(); x.arc(px, -h - 24, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.fillRect(px - 18, -h, 36, h); x.beginPath(); x.arc(px, -h - 24, 20, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Switched lines | *nine times.*', mood: lt => lt > 1.6 ? 'squint' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      queue(x, 790, 1080, 4, pop01(t, P.t0 + 0.15, 0.3, 2), { gap: 80 })
      label(x, 790, 700, `LINE #${Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.2))}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 50, bg: '#ff6b5a', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Brought a chair. | *And lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, CHAIR, CHAIR_C, 370, 1020, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 800, 900, 22 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 680, 'SETTLED IN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Made three friends. | *And a group chat.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      queue(x, 790, 1080, 3, pop01(t, P.t0 + 0.15, 0.3, 2), { gap: 90, col: '#ffe36a' })
      bubble(x, 790, 680, 'LINE BESTIES!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: '#ffe36a', tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'cancer', cap: 'Saving a spot | for *the whole family.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'they’re parking!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 920, '+11', pop01(t, P.t0 + 0.9, 0.3, 2.6), { size: 90, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Treated the line | like *a red carpet.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    back(x, t, lt, P) { const k = ease.outCubic(prog(lt, 0.2, 0.7)); x.fillStyle = '#e23d4e'; x.fillRect(120, 1100, 840 * k, 60) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'WAVING TO FANS', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04 })
      bubble(x, 790, 950, 'no photos!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 1.0, 8, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Re-sorted the line | *by height.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const s = ease.inOutCubic(prog(lt, 0.6, 1.5))
      const H0 = [90, 150, 70, 130, 110], H1 = [70, 90, 110, 130, 150]
      queue(x, 790, 1080, 5, pop01(t, P.t0 + 0.15, 0.3, 2), { gap: 64, col: '#7dffb0', scaleH: i => lerp(H0[i], H1[i], s) })
      label(x, 790, 680, 'ORDER: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Let everyone go first. | *Still there.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'no, you go!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      label(x, 790, 920, 'PLACE: LAST', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 42, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, '(VERY HAPPY)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Silently judged | *every order.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ORD = ['decaf?', 'extra ice?', 'just water?']
      bubble(x, 790, 700, ORD[Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 940, 'VERDICT: NOTED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: '#c97bff', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Left to explore. | Came back *with a souvenir.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, SNOW, SNOW_C, 800, 880, 24 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 650, 'BACK! MISS ME?', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: '#c97bff', color: '#fff4e2', rot: 0.04 })
      label(x, 790, 1130, 'LINE: SAME SPOT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Got here | *at 5 a.m.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 720, '5:00 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 900, 'POSITION: 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 42, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'it opens at noon.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Designed a better | *line system.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#2e6fa8'; x.fillRect(-162, -142, 324, 284)
        x.strokeStyle = '#fff4e2'; x.lineWidth = 5; x.setLineDash([10, 8])
        x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(-140, -110); x.lineTo(140, 110); x.stroke(); x.setLineDash([])
        x.fillStyle = '#fff4e2'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('LINE 2.0', 0, -116)
        x.restore()
      }
      label(x, 790, 1110, 'IT’S A CIRCLE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Cried when | *the line moved.*', mood: 'wide', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      queue(x, 720 + 50 * ease.inOutQuad(prog(lt, 0.6, 1.2)), 1080, 4, pop01(t, P.t0 + 0.15, 0.3, 2), { gap: 80, col: '#b7a6ff' })
      label(x, 790, 700, 'IT’S MOVING!!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0010', key: 'F', accent: ACC, ending: 'callback',
  title: 'A long line. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Still waiting. | *Somehow friends.*' },
  last: {
    text: 'Gemini’s line chat: | *still going.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 360, 1100, 320 * k, { mood: Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], seed: 85, glyph: false, hops: [t - lt + 1.2] })
      drawBits(x, PHONE, PHONE_C, 720 + 6 * Math.sin(t * 40) * (lt > 1.0 ? 1 : 0), 1090, 34 * k, { rot: 0.08 })
      label(x, 720, 860, 'NEW MESSAGES', pop01(lt, 1.0, 0.3, 2.4), { size: 46, bg: '#ffe36a', rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
