// v3t053: THE SIGNS AS… v3, "The signs | doing laundry." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs | doing *laundry.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   laundry day per sign (3.8 s each), each pushed to the extreme:
//              ♈ hottest wash, the sweater is doll-size · ♉ didn't fold it, napped on the pile · ♊ started a load, remembered Friday
//              · ♋ washed your hoodie, kept it · ♌ ironed a shirt of their own face · ♍ folded the towels into swans
//              · ♎ thanked the washing machine · ♏ separated the darks: it's all darks · ♐ out of clean clothes, booked a trip
//              · ♑ runs laundry like a business · ♒ mismatched socks on purpose · ♓ the dryer played its little tune, Pisces cried
//  49.2        "Clean clothes. | *Chaos* anyway."
//  52.6        callback: "Your hoodie? | Cancer *still has it.*"  The hoodie comes back, Cancer snug inside it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BLUE = '#6fa8ff', GREEN = '#5fd068'

const SWEATER = [
  'RR.....RR',
  'RRRR.RRRR',
  'RRRRRRRRR',
  '.RRwRwRR.',
  '.RRRRRRR.',
  '.RRwRwRR.',
  '.RRRRRRR.',
]
const WASHER = [
  'WWWWWWWWWWWW',
  'WkWkWWWWWggW',
  'WWWWWWWWWWWW',
  'WWWWGGGGWWWW',
  'WWWGBBBBGWWW',
  'WWGBBbBBBGWW',
  'WWGBbBBBBGWW',
  'WWGBBBBbBGWW',
  'WWWGBBBBGWWW',
  'WWWWGGGGWWWW',
  'WWWWWWWWWWWW',
]
const WASHER_C = { W: '#e8eaf6', k: INK, g: MINT, G: '#9aa5c4', B: SKYB, b: '#ffffff' }
const HOODIE = [
  '....HHHH....',
  '...HHhhHH...',
  '..HHh..hHH..',
  'HHHHhhhhHHHH',
  'HHHHHHHHHHHH',
  'HH.HHHHHH.HH',
  'HH.HHppHH.HH',
  'HH.HHHHHH.HH',
  '...HHHHHH...',
]
const HOODIE_C = { H: '#7a8cff', h: '#5060c8', p: '#5060c8' }
const SHIRT = [
  'WW......WW',
  'WWWW..WWWW',
  'WWWWWWWWWW',
  '.WWWWWWWW.',
  '.WWWWWWWW.',
  '.WWWWWWWW.',
  '.WWWWWWWW.',
  '.WWWWWWWW.',
]
const SWAN = [
  '.WW.......',
  'WWOW......',
  '.WW.......',
  '.WW.......',
  '..WW..WWW.',
  '..WWWWWWWW',
  '..WWWWWWW.',
  '...WWWWW..',
]
const SWAN_C = { W: '#fff4e2', O: ORANGE }
const PILE = [
  '....BBRR....',
  '..GGBBRRYY..',
  '.GGPPBBYYRR.',
  'BBPPGGYYRRBB',
  'BBPPGGLLRRBB',
]
const PILE_C = { B: BLUE, R: RED, G: GREEN, Y: GOLD, P: PINK, L: LAV }
const DARKS = [
  '....KKkk....',
  '..kkKKkkKK..',
  '.KKkkKKkkKK.',
  'kkKKkkKKkkKK',
  'KKkkKKkkKKkk',
]
const DARKS_C = { K: '#2a2350', k: '#3d3566' }
const SOCK = [
  '.SS.',
  '.SS.',
  '.SS.',
  '.SS.',
  'SSS.',
  'SSSS',
]
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'SSSSSSSSSS',
  'SsSSSSSSsS',
  'SSSSSSSSSS',
  'SsSSSSSSsS',
  'SSSSSSSSSS',
  '.K......K.',
]

// a little bar-chart board: "Q3 TOWELS"
function bizBoard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300)
  x.fillStyle = '#fff4e2'; x.fillRect(-162, -142, 324, 284)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Q3: TOWELS', 0, -110)
  const H = [60, 90, 120, 180]
  H.forEach((h, i) => { const g = clamp((lt - 0.4 - i * 0.2) / 0.4); x.fillStyle = INK; x.fillRect(-120 + i * 64 - 3, 110 - h * g - 3, 46, h * g + 3); x.fillStyle = i === 3 ? MINT : '#6b62a8'; x.fillRect(-120 + i * 64, 110 - h * g, 40, h * g) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Hottest wash. | Sweater is now *doll-size.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shrink = lerp(1, 0.32, ease.inOutCubic(prog(lt, 0.7, 1.4)))
      drawBits(x, SWEATER, { R: RED, w: '#fff4e2' }, 790, 880, 34 * shrink * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'HEAT: MAX', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'SIZE: DOLL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t fold it. | *Napped on the pile.*', mood: 'sleepy', star: { x: 0, y: -30, s: 270 },
    back(x, t, lt, P) { drawBits(x, PILE, PILE_C, 540, 1060, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 780, 600, 'FOLDING: LATER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Started a load. | *Remembered Friday.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, WASHER, WASHER_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const D = ['MON', 'TUE', 'WED', 'THU', 'FRI']
      label(x, 790, 1130, D[Math.min(4, Math.floor(lt * 2.4))], pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 590, 'oh no.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Washed your hoodie. | *Kept it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 860, 24 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: lt > 1.2 ? 0.1 : 0 })
      label(x, 790, 1100, 'MINE NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.05 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 1 })
    } },
  { sign: 'leo', cap: 'Ironed their shirt. | It’s *their face.*', mood: 'sparkle', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHIRT, { W: '#fff4e2' }, 790, 860, 32 * k)
      if (k > 0.8) signChar(x, t, 'leo', 790, 900, 160, { mood: 'wink', seed: 51, glyph: false, glow: 0.3 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 180, 0.4)
      label(x, 790, 1150, 'LIMITED EDITION', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Folded the towels. | Into *swans.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, SWAN, SWAN_C, 690 + i * 110, 780 + (i % 2) * 170, 15 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2))
      label(x, 790, 1120, 'TOWELS: ART', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Washer finished. | Libra *thanked it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, WASHER, WASHER_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 620, 'you did | amazing.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 840, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Separated the darks. | *It’s all darks.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, DARKS, DARKS_C, 780, 990, 36 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 820, 'DARKS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: '#9aa5c4', rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 660, 'LIGHTS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Out of clean clothes. | *Booked a flight.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { S: ORANGE, s: '#c97a2a', K: INK }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'GATE 12 →', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'buy socks there', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Runs laundry | like *a business.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      bizBoard(x, 770, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 770, 1110, 'TOWELS: UP', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Odd socks. | *On purpose.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SOCK, { S: MINT }, 700, 870, 36 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      drawBits(x, SOCK, { S: ORANGE }, 880, 890, 36 * pop01(t, P.t0 + 0.45, 0.3, 2), { rot: 0.15, sx: -1 })
      label(x, 790, 640, 'IT’S A STATEMENT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'The dryer played its tune. | Pisces *cried.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, WASHER, { ...WASHER_C, B: LAV }, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.4) notes(x, t, 790, 760, { n: 4, cell: 7, col: LAV, seed: 3 })
      label(x, 790, 650, 'DING-DING ♪', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t053', key: 'E', accent: SKYB, ending: 'callback',
  title: 'The signs | doing *laundry.*',
  cameos: CAMEOS,
  group: { cap: 'Clean clothes. | *Chaos* anyway.' },
  last: {
    text: 'Your hoodie? | Cancer *still has it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      drawBits(x, HOODIE, HOODIE_C, 540, 1150, 48 * k)
      if (k > 0.6) signChar(x, t, 'cancer', 540, 1030, 200, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 9, glyph: false, hops: [t - lt + 1.4] })
      hearts(x, t, 540, 900, t - lt + 1.4, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
