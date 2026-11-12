// r2a0049: THE SIGNS AS… v3, advice roll call, "What each sign | teaches others." (~54 s vertical, signs3kit, lofi · E)
// Twelve signs, zodiac order: one warm, specific thing each sign teaches the rest of us, one light gag each. Ending: group.
//   0.0–3.6    "What each sign | *teaches others.*"
//   3.6–49.2   ♈ just start (DAY 1: TODAY) · ♉ rest counts (nap booked) · ♊ stay curious (?????) · ♋ home is a feeling
//              · ♌ you’re allowed to shine · ♍ small things are love (packed you a snack) · ♎ hear both sides (scales)
//              · ♏ go deep (bubbles) · ♐ say yes to the trip (suitcase) · ♑ slow is still progress (stairs)
//              · ♒ weird is wonderful (antenna) · ♓ feelings are a superpower (crying, glowing heart)
//  49.2        group ending: "Twelve signs. | *Twelve teachers.*" (CLASS DISMISSED over the photo)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#5fd068', WOOD = '#8a4a2e', SLATE = '#9aa5c4'

const PILLOW = [
  '.WWWWWWWWWW.',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const HOUSE = [
  '.....RR.....',
  '....RRRR....',
  '...RRRRRR...',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  'RRRRRRRRRRRR',
  '.WWWWWWWWWW.',
  '.WPPWWWWDDW.',
  '.WPPWWWWDDW.',
  '.WWWWWWWDDW.',
]
const HOUSE_C = { R: RED, W: '#fff4e2', P: PINK, D: WOOD }
const SCALES = [
  '......K......',
  '.....KKK.....',
  'KKKKKKKKKKKKK',
  'K.....K.....K',
  'K.....K.....K',
  'GGG...K...GGG',
  'GGG...K...GGG',
  '......K......',
  '....KKKKK....',
]
const SCALES_C = { K: GOLD, G: '#c98f2a' }
const BUB = ['.WW.', 'W..W', 'W..W', '.WW.']
const CASE = [
  '....KKKK....',
  '....K..K....',
  'KKKKKKKKKKKK',
  'KOOOOOOOOOOK',
  'KOPPOOOOGGOK',
  'KOPPOOOOGGOK',
  'KOOOOSSOOOOK',
  'KOOOOSSOOOOK',
  'KOOOOOOOOOOK',
  'KKKKKKKKKKKK',
]
const CASE_C = { K: INK, O: ORANGE, P: PINK, G: MINT, S: SKYB }
const ANTENNA = [
  'G.....G',
  '.K...K.',
  '..K.K..',
  '...K...',
]
const BIGHEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const CAMEOS = [
  { sign: 'aries', cap: 'How to | *just start.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      label(x, 790, 820, 'DAY 1: TODAY', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1020, 'go go go!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Rest counts | *as progress.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: '#fff4e2' }, 370, 1010, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 820, 'NAP: BOOKED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Stay curious. | *It keeps you young.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const q = '?'.repeat(1 + Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.3)))
      bubble(x, 790, 760, q, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, tail: 'bl' })
      label(x, 790, 980, 'ASK EVERYTHING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Home is | *a feeling.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'You’re allowed | *to shine.*', mood: 'sparkle', star: { x: -170, s: 330 }, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 790, 820, 'GLOW: ON', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 46, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 1.0, 9, 220, 0.2)
      sparkles(x, t, 790, 820, P.t0 + 1.3, 6, 160, 0.5)
    } },
  { sign: 'virgo', cap: 'Small things | *are love.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'packed you | a snack', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 980, '+ A LITTLE NOTE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Hear | *both sides.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const tilt = 0.12 * Math.sin(t * 2.4) * (1 - prog(lt, 1.2, 1.8))
      drawBits(x, SCALES, SCALES_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: tilt })
      label(x, 790, 1080, 'BALANCED', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Go deep. | *It’s worth it.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 7; i++) { const ph = (t * 0.6 + i / 7) % 1; drawBits(x, BUB, { W: SKYB }, 700 + (i % 4) * 60, 1100 - ph * 420, 9, { alpha: Math.sin(Math.PI * ph) }) }
      label(x, 790, 760, 'DEPTH: ∞', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 46, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Say yes | *to the trip.*', mood: 'sparkle', star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 790, 680, 'PACKED IN 4 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Slow progress | *is still progress.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(580 + i * 70 - 4, 1120 - (i + 1) * 60 - 4, 78 * k, (i + 1) * 60 + 4); x.fillStyle = SLATE; x.fillRect(580 + i * 70, 1120 - (i + 1) * 60, 70 * k, (i + 1) * 60) }
      const step = Math.min(4, Math.floor(prog(lt, 0.4, 1.9) * 5))
      if (k > 0.5) signChar(x, t, 'capricorn', 615 + step * 70, 1120 - (step + 1) * 60 - 34, 70, { mood: 'happy', seed: 4, glyph: false, hops: [P.t0 + 0.6 + step * 0.4] })
      label(x, 790, 660, 'STEP BY STEP', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Weird is | *wonderful.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, ANTENNA, { G: MINT, K: BONE }, F.x, F.top - 40, 14 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: 0.1 * Math.sin(t * 4) })
      label(x, 790, 820, 'NORMAL: OPTIONAL', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Feelings are | *a superpower.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pulse = 1 + 0.08 * Math.sin(t * 6)
      drawBits(x, BIGHEART, { H: '#ff4f86', W: '#fff' }, 790, 850, 28 * pulse * pop01(t, P.t0 + 0.4, 0.35, 2))
      sparkles(x, t, 790, 850, P.t0 + 1.0, 8, 190, 0.3, [PINK, BONE, LAV])
      label(x, 790, 1090, 'FULL POWER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0049', key: 'E', accent: MINT, ending: 'group',
  title: 'What each sign | *teaches others.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *Twelve teachers.*',
    draw(x, t, lt) {
      label(x, 540, 780, '✦ CLASS DISMISSED ✦', pop01(t, t - lt + 1.6, 0.35, 2.2), { size: 44, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
