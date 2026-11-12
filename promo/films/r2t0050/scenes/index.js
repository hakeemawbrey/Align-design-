// r2t0050: THE SIGNS AS… v3, "The signs waiting | for a delivery." (~64 s vertical, signs3kit social cut, lofi · F)
// Twelve signs, zodiac order, each the most extreme version of itself waiting on a parcel. Ending: lesson.
//   0.0–3.6    "The signs waiting | for *a delivery.*"
//   3.6–49.2   ♈ chased the van · ♉ it's food, table already set · ♊ forgot what they ordered, thrilled anyway
//              · ♋ waited at the window in a blanket · ♌ dressed up for the courier (outfit 3) · ♍ measured the box,
//              2 mm off · ♎ ordered both colours · ♏ memorised the tracking number · ♐ not home: another country
//              · ♑ kept the box for future boxes · ♒ ordered parts, building a robot · ♓ cried at the bubble wrap
//  49.2        "Ding-dong. | *Everyone ran.*"
//  52.4        LESSON: "Good things | take a *little while.*"  STATUS: DELIVERED
//  58.3        "Sagittarius’ parcel? | *Still travelling.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#c98f5a', WOOD = '#8a4a2e', SLATE = '#9aa5c4'

const BOX = [
  'KKKKKKKKKKKK',
  'KBBBBTTBBBBK',
  'KBBBBTTBBBBK',
  'KKKKKKKKKKKK',
  'KBBBBBBBBBBK',
  'KBBBBBBBBBBK',
  'KBBBBBBBBBBK',
  'KBBBBBBBBBBK',
  'KKKKKKKKKKKK',
]
const BOX_C = { K: WOOD, B: BROWN, T: '#e8c48a' }
const VAN = [
  '.......WWWWWW.',
  'WWWWWWWWSSSWW.',
  'WWWWWWWWSSSWWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '.KK.......KK..',
]
const VAN_C = { W: '#fff4e2', S: SKYB, K: INK }
const WINDOW = [
  'FFFFFFFFFFF',
  'FSSSSFSSSSF',
  'FSSSSFSSSSF',
  'FSSSSFSSSSF',
  'FFFFFFFFFFF',
  'FSSSSFSSSSF',
  'FSSSSFSSSSF',
  'FSSSSFSSSSF',
  'FFFFFFFFFFF',
]
const WINDOW_C = { F: '#fff4e2', S: '#2a4a7a' }
const ROBOT = [
  '....Y....',
  '....K....',
  '.KKKKKKK.',
  '.KSSKSSK.',
  '.KKKKKKK.',
  '.KKRRRKK.',
  'KKKKKKKKK',
  'K.KKKKK.K',
  '..K...K..',
]
const ROBOT_C = { Y: GOLD, K: SLATE, S: SKYB, R: RED }
const WRAP = ['WWWWWWWWWW', 'WOWOWOWOWW', 'WWWWWWWWWW', 'WOWOWOWOWW', 'WWWWWWWWWW', 'WOWOWOWOWW', 'WWWWWWWWWW']
const WRAP_C = { W: '#d8f0ff', O: '#ffffff' }
const GLOBE = [
  '..BBBBB..',
  '.BGGBBBB.',
  'BGGGGBBGB',
  'BBGGBBGGB',
  'BBBBBGGGB',
  'BGBBBBGBB',
  '.BGGBBBB.',
  '..BBBBB..',
]
const GLOBE_C = { B: '#6fc3ff', G: '#5fd068' }

const CAMEOS = [
  { sign: 'aries', cap: 'Tracked it hourly. | *Chased the van.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const p = ease.inQuad(prog(lt, 0.3, 2.3))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      drawBits(x, VAN, VAN_C, lerp(700, 1080, p), 980, 16)
      x.restore()
      label(x, 790, 720, 'OUT FOR DELIVERY', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 600, 600, 'WAIT UP!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'It’s food. | Table *set since noon.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.fillStyle = INK; x.fillRect(620, 1000, 340 * k, 22); x.fillStyle = WOOD; x.fillRect(624, 1004, 332 * k, 14)
      if (k > 0.5) { x.fillStyle = INK; x.beginPath(); x.ellipse(790, 980, 90, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(790, 978, 84, 18, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = SLATE; x.fillRect(670, 940, 8, 50); x.fillRect(904, 940, 8, 50) }
      label(x, 790, 760, 'READY SINCE 12:00', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Forgot what they ordered. | *Thrilled anyway.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 680, 'what IS it?!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1110, 'SURPRISE (FROM ME)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Waited at the window. | *In a blanket.*', mood: lt => lt > 1.5 ? 'sleepy' : 'happy', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, WINDOW, WINDOW_C, 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.95; x.fillStyle = INK; x.fillRect(F.x - 120, F.cy + 50, 240 * k, 90); x.fillStyle = PINK; x.fillRect(F.x - 114, F.cy + 56, 228 * k, 78); x.fillStyle = '#ff4f86'; for (let i = 0; i < 5; i++) x.fillRect(F.x - 110 + i * 46, F.cy + 56, 20 * k, 78); x.restore() }
      label(x, 790, 1110, 'HOUR 6', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Dressed up | *for the courier.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      label(x, 790, 780, `OUTFIT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 46, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1000, 'sign here? | gladly.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Measured the box. | *2 mm off.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 760); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -24, 300, 48); x.fillStyle = GOLD; x.fillRect(-144, -18, 288, 36); x.fillStyle = INK; for (let i = 0; i < 15; i++) x.fillRect(-140 + i * 20, -18, 3, i % 5 ? 12 : 22); x.restore() }
      label(x, 790, 1110, 'COMPLAINT: DRAFTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Ordered both colours. | *Keeping both.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, { ...BOX_C, B: PINK, K: '#b0567a' }, 700, 920, 14 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.06 })
      drawBits(x, BOX, { ...BOX_C, B: LAV, K: '#6b62a8' }, 880, 920, 14 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: 0.06 })
      label(x, 790, 720, 'RETURNS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Tracking number? | *Memorised.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const full = 'ZX-4471-9902'
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * full.length)
      label(x, 790, 820, full.slice(0, Math.max(1, n)), pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1020, 'by heart.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Missed the delivery. | *Other continent.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 300, 760, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.3 })
      label(x, 300, 1000, 'SORRY WE MISSED YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 26, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 320, 1120, 'send it here?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Kept the box. | *For future boxes.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOX, BOX_C, 790, 1080 - i * 90, (22 - i * 4) * pop01(t, P.t0 + 0.2 + i * 0.3, 0.35, 2))
      label(x, 790, 650, 'BOX STORAGE: FULL', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ordered spare parts. | *Built a robot.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 880, 22 * pop01(t, P.t0 + 0.6, 0.35, 2), { rot: 0.05 * Math.sin(t * 5) })
      bubble(x, 790, 640, 'beep. hello.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'It arrived. | Cried at *bubble wrap.*', mood: lt => lt < 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, WRAP, WRAP_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.06 })
      label(x, 790, 1080, 'SO MANY LITTLE POPS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0050', key: 'F', accent: GOLD, ending: 'lesson',
  title: 'The signs waiting | for *a delivery.*',
  cameos: CAMEOS,
  group: { cap: 'Ding-dong. | *Everyone ran.*' },
  lesson: { text: 'Good things | take a *little while.*', chip: 'STATUS: DELIVERED' },
  last: {
    text: 'Sagittarius’ parcel? | *Still travelling.*',
    draw(x, t, lt) {
      const p = ease.inOutQuad(prog(lt, 0.6, 3.6))
      drawBits(x, VAN, VAN_C, lerp(-100, 1180, p), 1580, 18)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
