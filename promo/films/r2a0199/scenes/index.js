// r2a0199: star_advice, ADVICE ROLL CALL, "Each sign's | slow morning." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific slow-morning line each with a light visual gag. Ending: lesson.
//   0.0–3.6    "Each sign’s | *slow morning.*"
//   3.6–49.2   ♈ no race today, shoes stay off · ♉ breakfast in bed, then second breakfast · ♊ reading their horoscope,
//              slowly · ♋ blanket fort, phone on silent · ♌ sun on their face, like a cat · ♍ a to-do list with one item:
//              rest · ♎ a good-morning text from their match · ♏ curtains closed, peace unlocked · ♐ a slow walk to nowhere
//              · ♑ alarm off, guilt off too · ♒ pyjamas till noon, big ideas anyway · ♓ rain on the window, happy tears
//  49.2        "No rush. | *All twelve.*"
//  52.4        LESSON UNLOCKED: "Rest isn’t lazy. | It’s *how you shine.*"  BATTERY: FULL
//  58.3        "Snooze button? | *Pressed with love.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffc59a', RED = '#e23d4e', ORANGE = '#ffb34a'

const SHOE = ['......RR..', '.....RRRR.', 'RRRRRRRRRR', 'RWRWRRRRRR', 'KKKKKKKKKK']
const CROISSANT = ['...CCCC...', '.CCcCCcCC.', 'CCcCCCCcCC', 'CcCCCCCCcC', '.C......C.']
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const CLOCK_BELLS = ['.K....K.', 'KK....KK']
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, X, Y, size, col = INK, font = INTER, weight = 800) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const CAMEOS = [
  { sign: 'aries', cap: 'No race today. | *Shoes stay off.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SHOE, { R: '#ff6b4a', W: '#fff', K: INK }, 740, 1010, 15 * k, { rot: -0.1 })
      drawBits(x, SHOE, { R: '#ff6b4a', W: '#fff', K: INK }, 870, 1030, 15 * k, { rot: 0.15 })
      label(x, 790, 760, 'RACE: CANCELLED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Breakfast in bed. | *Then second breakfast.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (box(x, 790, 960, 320, 60, pop01(t, P.t0 + 0.2, 0.35, 2), '#c98f5a')) x.restore()
      drawBits(x, CROISSANT, { C: ORANGE, c: '#c98f2a' }, 730, 890, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      drawBits(x, CROISSANT, { C: ORANGE, c: '#c98f2a' }, 860, 890, 12 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 790, 720, 'ROUND TWO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Their horoscope, | read *very slowly.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (box(x, 790, 870, 290, 330, pop01(t, P.t0 + 0.2, 0.35, 2), '#fbf7ee', 0.04)) {
        x.fillStyle = '#ffd23a'; x.fillRect(-145, -165, 290, 56); text(x, '♊︎ TODAY', 0, -137, 26, INK, MONO, 700)
        const words = ['take', 'your', 'time.']
        const n = Math.floor(clamp((lt - 0.4) / 1.4) * 3.99)
        words.slice(0, n).forEach((w, i) => text(x, w, 0, -50 + i * 64, 46))
        x.restore()
      }
    } },
  { sign: 'cancer', cap: 'Blanket fort. | *Phone on silent.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = clamp((lt - 0.2) / 0.5)
      x.save(); x.globalAlpha = k
      x.fillStyle = INK; x.beginPath(); x.moveTo(170, 1170); x.lineTo(380, 640); x.lineTo(600, 1170); x.fill()
      x.fillStyle = '#cfe0ff'; x.beginPath(); x.moveTo(186, 1162); x.lineTo(380, 664); x.lineTo(584, 1162); x.fill()
      x.fillStyle = '#9ab8e8'; for (let i = 0; i < 4; i++) x.fillRect(250 + i * 70, 900 + (i % 2) * 60, 30, 30)
      x.restore()
    },
    front(x, t, lt, P) { label(x, 790, 860, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.05, font: MONO, weight: 700 }) } },
  { sign: 'leo', cap: 'Sun on their face. | *Like a cat.*', mood: 'sleepy', look: [0, -1], star: { x: -170 },
    back(x, t, lt, P, F) {
      const k = clamp((lt - 0.1) / 0.5)
      x.save(); x.globalAlpha = 0.4 * k; x.fillStyle = '#fff1a8'
      x.beginPath(); x.moveTo(820, 470); x.lineTo(980, 470); x.lineTo(F.x + 160, 1180); x.lineTo(F.x - 160, 1180); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) { label(x, 800, 1080, 'PURRING (BASICALLY)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) } },
  { sign: 'virgo', cap: 'Today’s to-do list: | *rest.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (box(x, 790, 880, 280, 320, pop01(t, P.t0 + 0.2, 0.35, 2), BONE, 0.04)) {
        x.fillStyle = MINT; x.fillRect(-140, -160, 280, 56); text(x, 'TO DO', 0, -132, 28, INK, MONO, 700)
        text(x, (lt > 1.2 ? '☑' : '☐') + ' rest', 0, 0, 52)
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'A good-morning text | *from their match.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (box(x, 790, 880, 240, 380, pop01(t, P.t0 + 0.2, 0.35, 2), '#2a2350', 0.05)) {
        x.fillStyle = '#140c30'; x.fillRect(-106, -160, 212, 310)
        x.fillStyle = PINK; x.fillRect(-106, -160, 212, 46); text(x, 'YOUR MATCH', 0, -137, 22, INK, MONO, 700)
        x.restore()
      }
      bubble(x, 790, 860, 'morning ☀︎', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.3, { n: 4, life: 1.5, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Curtains closed. | *Peace unlocked.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const c = ease.inOutCubic(clamp((lt - 0.3) / 0.8))
      if (box(x, 790, 860, 300, 340, pop01(t, P.t0 + 0.2, 0.3, 2), '#ffe7a8')) {
        x.fillStyle = '#b8243a'; x.fillRect(-150, -170, 150 * c + 20, 340); x.fillRect(130 - 150 * c, -170, 150 * c + 20, 340)
        x.restore()
      }
      label(x, 790, 1100, 'PEACE: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A slow walk | *to nowhere.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-14, -80, 28, 300); x.fillStyle = '#a8742a'; x.fillRect(-8, -76, 16, 292)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -170); x.lineTo(130, -170); x.lineTo(180, -120); x.lineTo(130, -70); x.lineTo(-150, -70); x.closePath(); x.fill()
        x.fillStyle = BONE; x.beginPath(); x.moveTo(-142, -162); x.lineTo(126, -162); x.lineTo(168, -120); x.lineTo(126, -78); x.lineTo(-142, -78); x.closePath(); x.fill()
        text(x, 'NOWHERE', -6, -118, 40)
        x.restore()
      }
      label(x, 790, 1110, 'NO HURRY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Alarm off. | *Guilt off too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        drawBits(x, CLOCK_BELLS, { K: INK }, 0, -130, 20, { outline: null })
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 126, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 112, 0, 7); x.fill()
        x.strokeStyle = INK; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -70); x.moveTo(0, 0); x.lineTo(50, 20); x.stroke()
        if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 16; const p = clamp((lt - 0.9) / 0.3); x.beginPath(); x.moveTo(-110, -110); x.lineTo(-110 + 220 * p, -110 + 220 * p); x.stroke() }
        x.restore()
      }
      label(x, 790, 1110, 'GUILT: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Pyjamas till noon. | *Big ideas anyway.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: '#ffe36a', W: '#fff', G: '#9aa5c4' }, 790, 840, 26 * pop01(t, P.t0 + 1.0, 0.35, 2.2))
      if (lt > 1.0) sparkles(x, t, 790, 820, P.t0 + 1.0 * 1.29, 8, 170, 0.2)
      label(x, 790, 1110, 'STILL IN PYJAMAS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Rain on the window. | *Happy tears.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (box(x, 790, 860, 300, 360, pop01(t, P.t0 + 0.2, 0.35, 2), '#5a7ab8')) {
        x.fillStyle = INK; x.fillRect(-6, -180, 12, 360); x.fillRect(-150, -6, 300, 12)
        x.fillStyle = '#cfe0ff'; for (let i = 0; i < 14; i++) { const ph = (t * 0.8 + i * 0.37) % 1; x.fillRect(-140 + (i * 47) % 280, -170 + ph * 340, 5, 22) }
        x.restore()
      }
      label(x, 790, 1110, 'COZY: MAX', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0199', key: 'E', accent: PEACH, ending: 'lesson',
  title: 'Each sign’s | *slow morning.*',
  cameos: CAMEOS,
  group: { cap: 'No rush. | *All twelve.*' },
  lesson: { text: 'Rest isn’t lazy. | It’s *how you shine.*', chip: 'BATTERY: FULL' },
  last: { text: 'Snooze button? | *Pressed with love.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
