// r2t0160: star_talk BELIKE, "Zodiacs at 6 a.m. | *be like.*" (topic: trying to wake up early) (~59 s vertical, signs3kit social cut, music: lofi · F).
// Twelve signs in zodiac order, each trying to wake up early in the most extreme way:
//   ♈ up at five, already ran twice · ♉ snoozed nine times · ♊ twelve alarms, twelve songs · ♋ up early, pancakes for
//   the whole house · ♌ sunrise selfie, take forty · ♍ up early to plan tomorrow · ♎ asked the alarm nicely for
//   five more · ♏ up at 4 a.m., nobody knows why · ♐ up early, booked a flight · ♑ never slept, technically early
//   · ♒ alarm at 1:11 for the vibes · ♓ cried at the sunrise
//  49.2   "Rise and | *(eventually)* shine."  group photo
//  52.4   LESSON UNLOCKED: "Your best hour | *is still yours.*"  STATUS: AWAKE-ISH
//  58.3   "Snooze once. | *You earned it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SUNRISE = '#ffb86b', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const ST = { x: -170 }

const ALARM = [
  'BB......BB',
  'B.RRRRRR.B',
  '.RRWWWWRR.',
  'RRWWWKWWRR',
  'RWWWWKWWWR',
  'RWWWWKKWWR',
  'RWWWWWWWWR',
  'RRWWWWWWRR',
  '.RRWWWWRR.',
  '..RRRRRR..',
  '.R......R.',
]
const ALARM_C = { B: GOLD, R: RED, W: BONE, K: INK }
const SUN = [
  '...Y.Y.Y...',
  '....YYY....',
  'Y.YYYYYYY.Y',
  '.YYYYYYYYY.',
  'YYYYYYYYYYY',
  'HHHHHHHHHHH',
]
const PANCAKES = [
  '....YY....',
  '.BBBBBBBB.',
  'BBBBBBBBBB',
  '.bbbbbbbb.',
  'BBBBBBBBBB',
  '.bbbbbbbb.',
  'BBBBBBBBBB',
  'WWWWWWWWWW',
]
const SHOE = ['..RRRR....', '.RRRRRR...', 'RRRRRRRRR.', 'RRRRRRRRRR', 'WWWWWWWWWW']
const PLANE = [
  '....W.....',
  '....WW....',
  'W...WWW...',
  'WWWWWWWWWW',
  'W...WWW...',
  '....WW....',
  '....W.....',
]

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
const shake = (t, on) => on ? Math.sin(t * 50) * 6 : 0

const CAMEOS = [
  { sign: 'aries', cap: 'Up at five. | *Already ran twice.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, { R: RED, W: BONE }, 730, 980 - Math.abs(Math.sin(t * 9)) * 26, 16 * k)
      drawBits(x, SHOE, { R: RED, W: BONE }, 870, 980 - Math.abs(Math.cos(t * 9)) * 26, 16 * k)
      label(x, 800, 720, 'LAP 2 DONE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Snoozed | *nine times.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 8)
      drawBits(x, ALARM, ALARM_C, 800 + shake(t, Math.floor(lt * 3) % 2 === 0), 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1050, `SNOOZE ×${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Twelve alarms. | *Twelve different songs.*', mood: 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, ALARM, ALARM_C, 690 + i * 110 + shake(t + i, true), 800 + (i % 2) * 70, 9 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      notes(x, t, 800, 760, { n: 5, cell: 7, col: GOLD, seed: 3 })
      label(x, 800, 1050, 'ALARM 7 OF 12', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Up early. | *Pancakes for everyone.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, { Y: GOLD, B: '#e3b15a', b: BROWN, W: BONE }, 800, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 640, 'breakfast, loves!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: PINK, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Sunrise selfie. | *Take forty.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, SUN, { Y: SUNRISE, H: '#ff8f6b' }, 820, 1000, 22 * pop01(t, P.t0 + 0.2, 0.4, 1.8)) },
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 39))
      label(x, 800, 720, `TAKE ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      const fl = (lt * 2.5) % 1; if (lt > 0.4 && fl < 0.12) { x.save(); x.globalAlpha = 0.18 * (1 - fl / 0.12); x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() }
    } },
  { sign: 'virgo', cap: 'Woke up early | *to plan tomorrow.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 300, 330, BONE, k, 0.03)) {
        txt(x, 'TOMORROW', 0, -130, 30, INK, MONO, 700)
        const items = ['4:58 stretch', '4:59 hydrate', '5:00 wake up']
        items.forEach((s, i) => { txt(x, s, 0, -60 + i * 64, 30, INK, MONO, 700) })
        x.restore()
      }
      label(x, 800, 1060, 'PLAN: PLANNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asked the alarm | *for five more, nicely.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ALARM, ALARM_C, 820, 900 + shake(t, lt < 1.3), 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'pretty please?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      if (lt > 1.3) label(x, 820, 1080, 'GRANTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Up at 4 a.m. | *Nobody knows why.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 800, 760, '4:00 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: '#2a2350', color: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'don’t ask.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Woke up early. | *Booked a flight.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 1.6)
      drawBits(x, PLANE, { W: BONE }, lerp(680, 900, p), lerp(920, 680, p), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.6 })
      label(x, 800, 1060, 'GATE CLOSES 7 AM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Never went to bed. | *Technically early.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 820, 320, 230, '#2a2350', k, 0.03)) {
        x.fillStyle = '#140c30'; x.fillRect(-145, -100, 290, 200)
        x.fillStyle = MINT; for (let i = 0; i < 4; i++) x.fillRect(-120, -70 + i * 40, 150 + (i * 37) % 90, 14)
        x.restore()
      }
      label(x, 800, 1040, 'DAY 2, HOUR 22', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Alarm set for 1:11. | *For the vibes.*', mood: 'wink', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      label(x, 800, 760, '1:11 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 0.6, 8, 200, 0.3, [SKYB, BONE, LAV])
      bubble(x, 800, 970, 'make a wish', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Woke up early. | *Cried at the sunrise.*', mood: 'heart', tears: 3, look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, SUN, { Y: SUNRISE, H: '#ff8f6b' }, 820, 1000 - clamp(lt / 1.6) * 80, 22 * pop01(t, P.t0 + 0.2, 0.4, 1.8)) },
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'it’s so pretty', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0160', key: 'F', accent: SUNRISE, ending: 'lesson',
  title: 'Zodiacs at 6 a.m. | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Rise and | *(eventually)* shine.' },
  lesson: { text: 'Your best hour | *is still yours.*', chip: 'STATUS: AWAKE-ISH' },
  last: {
    text: 'Snooze once. | *You earned it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, ALARM, ALARM_C, 540, 680, 15 * pop01(t, t0 + 0.6, 0.4, 2))
      label(x, 540, 815, 'SNOOZE ×1', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
