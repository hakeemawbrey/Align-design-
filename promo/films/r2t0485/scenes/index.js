// r2t0485: star_talk, ROLLCALL, "The signs | at the mechanic." (~57 s vertical, signs3kit social cut, music: lofi · F).
// Ending: callback.
//   0.0–3.6    "The signs | *at the mechanic.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one garage moment per sign (3.8 s each):
//              ♈ couldn't wait, pushed the car there · ♉ saw the quote, lay down · ♊ did the noise, seventeen
//              versions · ♋ tucked the car in with a blanket · ♌ asked for gold paint · ♍ a forty-page service log
//              · ♎ can't pick a tyre colour (they're all black) · ♏ quizzed the mechanic · ♐ broke down, called it
//              an adventure · ♑ haggled until the mechanic owed them · ♒ asked if it runs on vibes · ♓ wept with
//              relief, hugged the car
//  49.2        "Twelve cars. | *One very tired mechanic.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "That weird noise? | *It was Gemini.*"  Gemini pops out of the car, still doing the noise.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#ffb34a'

const CAR = [
  '....CCCCCCC.......',
  '...CSSSCSSSC......',
  '..CSSSSCSSSSC.....',
  'CCCCCCCCCCCCCCCCC.',
  'CCCCCCCCCCCCCCCCCY',
  'CCCCCCCCCCCCCCCCCC',
  'CCKKKCCCCCCCKKKCCC',
  '..KWK.......KWK...',
  '..KKK.......KKK...',
]
const car = (x, cx, cy, cell, col = '#5fb8d0', o = {}) => drawBits(x, CAR, { C: col, S: '#cfe3ff', K: INK, W: '#9aa5c4', Y: GOLD }, cx, cy, cell, o)
const TYRE = ['.KKKK.', 'KKKKKK', 'KKGGKK', 'KKGGKK', 'KKKKKK', '.KKKK.']
const BINDER = [
  'BBBBBBBBBB',
  'BWWWWWWWWB',
  'BWKKKKKKWB',
  'BWWWWWWWWB',
  'BWKKKKKWWB',
  'BWWWWWWWWB',
  'BWKKKKKKWB',
  'BWWWWWWWWB',
  'BBBBBBBBBB',
]
const BINDER_C = { B: '#2fc79a', W: PAPER, K: '#9aa5c4' }
const PACK = ['..KKKK..', '.K....K.', 'OOOOOOOO', 'OOWWWWOO', 'OOOOOOOO', 'OOOOOOOO', 'OOOOOOOO']

// a long itemised receipt that unrolls
function quote(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const len = 120 + 300 * ease.outCubic(prog(lt, 0.3, 1.2))
  x.save(); x.translate(cx, cy - 160); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -8, 180, len + 16); x.fillStyle = PAPER; x.fillRect(-82, 0, 164, len)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('QUOTE', 0, 24)
  for (let y = 52; y < len - 20; y += 30) { x.fillStyle = '#9aa5c4'; x.fillRect(-60, y, 80, 8); x.fillRect(36, y, 24, 8) }
  x.restore()
}

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Couldn’t wait for a tow. | *Pushed it there.*', mood: 'sparkle', star: { x: -200 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      car(x, lerp(700, 780, prog(lt, 0.2, 2.4)), 1000, 13 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 760, 'DISTANCE: 6 MILES', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'faster this way', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Saw the quote. | *Lay down.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', star: L, squash: lt => lt > 1.2 ? 0.12 : 0,
    front(x, t, lt, P) {
      quote(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1150, 'TAURUS: HORIZONTAL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Did the noise. | *Seventeen versions.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'wide', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const N = ['vrrr-tk-tk', 'more like… KLONK', 'ok, eeeee-tk?', 'wait. bloop.']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 790, 780, N[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1000, `VERSION ${[1, 6, 11, 17][n]}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Left the car overnight. | *Tucked it in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      car(x, 790, 1000, 13 * k, '#ff9a7a')
      const b = ease.outCubic(prog(lt, 0.6, 1.1))
      if (b > 0) { x.save(); x.globalAlpha = b; x.fillStyle = INK; x.fillRect(672, 948, 236, 70); x.fillStyle = PINK; x.fillRect(678, 954, 224, 58); x.fillStyle = '#ffc4d6'; for (let i = 0; i < 5; i++) x.fillRect(690 + i * 44, 966, 20, 20); x.restore() }
      label(x, 790, 760, 'CAR’S SIGN: CANCER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Asked for | *gold paint.*', mood: 'sparkle', star: L, hops: [1.1],
    front(x, t, lt, P) {
      const g = prog(lt, 0.6, 1.0)
      car(x, 790, 1000, 13 * pop01(t, P.t0 + 0.15, 0.3, 2), g >= 1 ? GOLD : '#9aa5c4')
      sparkles(x, t, 790, 980, P.t0 + 0.6 * 1.29 + 0.1, 8, 180, 0.3)
      label(x, 790, 760, 'FINISH: ROYAL', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'like my aura', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Brought the service log. | *Forty pages.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BINDER, BINDER_C, 790, 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      const p = Math.min(40, 1 + Math.floor(lt * 18))
      label(x, 790, 720, `PAGE ${p} OF 40`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1160, 'MECHANIC: TAKING NOTES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Can’t pick the tyre colour. | *They’re all black.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, TYRE, { K: '#2a2350', G: '#9aa5c4' }, 690 + i * 100, 1000, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      bubble(x, 790, 780, 'this black? | or that black?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1150, 'MATCH: ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Already knew the problem. | *Quizzed the mechanic.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'and what | would YOU say?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 980, 'CORRECT ANSWERS: 1', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'MECHANIC: SWEATING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Broke down? | *Called it an adventure.*', mood: 'sparkle', star: R, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      car(x, 300, 1050, 11 * pop01(t, P.t0 + 0.15, 0.3, 2), '#c97bff')
      x.save(); x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 4; i++) { const ph = (t * 0.7 + i / 4) % 1; x.beginPath(); x.arc(380 + Math.sin(ph * 5) * 12, 1000 - ph * 160, 16 + ph * 16, 0, Math.PI * 2); x.fill() } x.restore()
      drawBits(x, PACK, { K: INK, O: '#ff9a4a', W: PAPER }, 220, 820, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 320, 700, 'NEW PLAN: HIKE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Haggled so hard | *the mechanic owes them.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const steps = ['$900', '$400', '$60', '−$20']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      label(x, 320, 840, `PRICE: ${steps[n]}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 46, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 320, 1060, 'pleasure doing | business.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Asked if it can | *run on vibes.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      car(x, 790, 1010, 13 * pop01(t, P.t0 + 0.15, 0.3, 2), MINT)
      label(x, 790, 760, 'FUEL: VIBES', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.0) for (let i = 0; i < 5; i++) { const ph = (t * 0.8 + i / 5) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = [LAV, MINT, PINK, GOLD, SKYB][i]; x.fillRect(700 + i * 45, 920 - ph * 120, 14, 14); x.restore() }
    } },
  { sign: 'pisces', cap: 'It’s fixed! | Pisces *hugged the car.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -120 },
    front(x, t, lt, P) {
      car(x, 790, 1020, 12 * pop01(t, P.t0 + 0.15, 0.3, 2), '#b7a6ff')
      bubble(x, 790, 760, 'you’re okay!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 420, 780, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0485', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs | *at the mechanic.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve cars. | *One tired mechanic.*' },
  last: {
    text: 'That weird noise? | *It was Gemini.*',
    draw(x, t, lt) {
      car(x, 560, 1200, 22 * pop01(t, t - lt + 0.3, 0.4, 2), '#5fb8d0')
      const k = pop01(t, t - lt + 1.0, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 520, 1010 - 40 * k, 210 * k, { mood: 'wink', seed: 12, hops: [t - lt + 1.4], glyph: false })
      bubble(x, 800, 930, 'vrrr-tk-tk!', pop01(t, t - lt + 1.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
