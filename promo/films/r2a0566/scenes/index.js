// r2a0566: star_advice, ADVICE SOLO (aries), "Aries, it's okay | *to miss them.*" (signs3kit social cut, music: lofi · D).
// Ending: callback (the card-1 stopwatch comes back with no limit on it).
//   over it in an hour? take a week · ran ten miles, feelings jog too · thumb on send? breathe first
//   · fought a pillow, the pillow forgives you · nobody's keeping score · crying isn't losing, it's a reset
//   · checked their horoscope, soft heart allowed · midnight haircut, bold and still okay · missing them means you
//   loved bravely.   group "Fast at everything. | *Except healing.*"   last "Over it? | *Take all the time.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aries', ACC = '#ff6b5a', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// a round stopwatch with a big readout
function stopwatch(x, t, cx, cy, k, text, spin = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-24, -196, 48, 40); x.fillStyle = '#c9c9d8'; x.fillRect(-18, -190, 36, 30)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 168, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 156, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 136, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 114 - 4, Math.sin(a) * 114 - 4, 8, 8) }
  x.save(); x.rotate(t * 5 * spin); x.fillStyle = RED; x.fillRect(-3, -110, 6, 110); x.restore()
  x.fillStyle = INK; x.fillRect(-90, 26, 180, 56); x.fillStyle = '#7dffb0'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 56)
  x.restore()
}
const SHOE = [
  '......RRRR....',
  '.....RRWRR....',
  '....RRRRRR....',
  '...RRWRRRRR...',
  'RRRRRRRRRRRRR.',
  'RRRRRRRRRRRRRR',
  'WWWWWWWWWWWWWW',
]
const SHOE_C = { R: '#ff6b5a', W: CREAM }
const PILLOW = [
  'P..........P',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  '.PPPPdPPPPP.',
  '.PPPddPPPPP.',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  'P..........P',
]
const PILLOW_C = { P: LAV, d: '#8f78c8' }
const HEARTF = [
  '....F.....F....',
  '...FYF...FYF...',
  '..FRRRR.RRRRF..',
  '.RRRRRRRRRRRRR.',
  'RRWRRRRRRRRRRRR',
  'RRWRRRRRRRRRRRR',
  'RRRRRRRRRRRRRRR',
  '.RRRRRRRRRRRRR.',
  '..RRRRRRRRRRR..',
  '...RRRRRRRRR...',
  '....RRRRRRR....',
  '.....RRRRR.....',
  '......RRR......',
  '.......R.......',
]
const HEARTF_C = { R: '#ff4f6a', W: '#ffd0d8', F: ORANGE, Y: GOLD }
// a phone with one draft and a giant SEND button
function phone(x, cx, cy, k, glow) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-140, -230, 280, 460, 34); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.roundRect(-128, -218, 256, 436, 26); x.fill()
  x.fillStyle = '#140c30'; x.fillRect(-112, -190, 224, 380)
  x.fillStyle = '#ffb3a8'; x.beginPath(); x.roundRect(-96, -150, 190, 60, 16); x.fill()
  x.fillStyle = INK; x.font = `700 28px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('hey. u up?', -82, -118)
  x.fillStyle = INK; x.fillRect(-84, 60, 168, 84); x.fillStyle = `rgb(${226 + 29 * glow},${61 + 40 * glow},${78})`; x.fillRect(-78, 66, 156, 72)
  x.fillStyle = CREAM; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.fillText('SEND', 0, 104)
  x.restore()
}
// a scoreboard
function board(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -120, 400, 240); x.fillStyle = '#1d3a2a'; x.fillRect(-188, -108, 376, 216)
  x.fillStyle = GOLD; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('YOU', -95, -60); x.fillText('THEM', 95, -60)
  x.font = `700 92px ${MONO}`; x.fillStyle = '#7dffb0'; x.fillText('0', -95, 30); x.fillText('0', 95, 30)
  x.fillStyle = GOLD; x.fillRect(-6, -40, 12, 120)
  x.restore()
}
// a big round button
function bigButton(x, cx, cy, k, press, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 30, 300, 80); x.fillStyle = '#6b62a8'; x.fillRect(-142, 38, 284, 64)
  const d = press * 20
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 30 + d / 2, 120, 50, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b02a3a'; x.fillRect(-112, -30 + d, 224, 60 - d)
  x.fillStyle = RED; x.beginPath(); x.ellipse(0, -30 + d, 112, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -30 + d)
  x.restore()
}
// a horoscope card for their sign
function horoscope(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -176, 320, 370)
  x.fillStyle = INK; x.fillRect(-166, -190, 332, 380); x.fillStyle = '#2a2350'; x.fillRect(-158, -182, 316, 364)
  x.fillStyle = LAV; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THEIR DAY', 0, -146)
  x.fillStyle = PINK; x.font = `700 130px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.fillText('♎︎', 0, -30)
  for (let i = 0; i < 5; i++) drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '.Y.Y.'], { Y: i < 4 ? GOLD : '#4a4170' }, -96 + i * 48, 92, 7)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText('“a good day”', 0, 148)
  x.restore()
}
// a hand mirror with a tiny Aries wearing brand-new bangs
function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-22, 120, 44, 170); x.fillStyle = GOLD; x.fillRect(-14, 126, 28, 158)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -10, 150, 176, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, -10, 138, 164, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe9ff'; x.beginPath(); x.ellipse(0, -10, 118, 144, 0, 0, Math.PI * 2); x.fill()
  const F = signChar(x, t, 'aries', 0, 10, 170, { mood: 'wide', seed: 51, glyph: false, glow: 0.3 })
  x.fillStyle = '#7a3a1a'; for (let i = 0; i < 7; i++) x.fillRect(-56 + i * 16, F.top + 10, 12, 30 + (i % 2) * 10)
  x.restore()
}

const ST = { x: -180 }
const CAMEOS = [
  // 1 · over it in an hour
  { sign: S, cap: 'Over it in an hour? | *Take a week.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      stopwatch(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 'OVER IT?')
      L(x, 790, 1110, 'TIMER: OPTIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  // 2 · ran ten miles
  { sign: S, cap: 'Ran ten miles? | *Feelings jog too.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SHOE, SHOE_C, 760 + Math.sin(t * 9) * 10, 900, 20 * k, { rot: -0.1 })
      const hk = pop01(t, P.t0 + 1.0, 0.3, 2.2)
      drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 880 + Math.sin(t * 9 + 1) * 8, 790 - Math.abs(Math.sin(t * 9)) * 30, 12 * hk)
      L(x, 680, 630, 'MILE 10', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 36)
      bubble(x, 860, 690, 'wait up!', hk, { size: 28, tail: 'bc' })
      L(x, 790, 1110, 'STILL HERE. CUTE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  // 3 · thumb on send
  { sign: S, cap: 'Thumb on send? | *Breathe first.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, 1.05 * pop01(t, P.t0 + 0.2, 0.35, 2), 0.5 + 0.5 * Math.sin(t * 8))
      L(x, 790, 1120, 'INHALE. EXHALE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  // 4 · fought a pillow
  { sign: S, cap: 'Fought a pillow? | *It forgives you.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      const hit = lt < 1.2 ? Math.abs(Math.sin(lt * 9)) : 0
      drawBits(x, PILLOW, PILLOW_C, 790, 870, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: 1 + 0.1 * hit, sy: 1 - 0.12 * hit })
      if (lt > 1.3) hearts(x, t, 790, 780, P.t0 + 1.3 * 1.29, { n: 4, life: 1.4, spread: 180, cell: 7, seed: 3 })
      bubble(x, 800, 650, 'all good, pal', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bc', col: LAV })
      L(x, 790, 1100, 'PILLOW: FINE', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 32)
    } },
  // 5 · nobody's keeping score
  { sign: S, cap: 'Want to “win” the breakup? | *No one’s keeping score.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1060, 'GAME: CANCELLED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  // 6 · crying isn't losing
  { sign: S, cap: 'Crying isn’t losing. | *It’s a reset.*', mood: lt => lt > 1.6 ? 'happy' : 'sleepy', tears: lt => lt < 1.6 ? 2 : 0, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bigButton(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.2 && lt < 1.5 ? 1 : 0, 'RESET')
      L(x, 790, 1100, 'SYSTEM: RESTARTING', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 30)
      sparkles(x, t, 790, 850, P.t0 + 1.6, 7, 170, 0.3)
    } },
  // 7 · Align nod: their horoscope
  { sign: S, cap: 'Checked their horoscope? | *Soft heart. Allowed.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      horoscope(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1110, 'STILL ROOTING FOR THEM', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 26)
    } },
  // 8 · midnight haircut
  { sign: S, cap: 'Midnight haircut? | *Bold. Still okay.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      mirror(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 640, '11:58 PM', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.05, 32)
      L(x, 790, 1130, 'BANGS: NEW. YOU: SAME.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.03, 26)
    } },
  // 9 · loved bravely
  { sign: S, cap: 'Missing them means | *you loved bravely.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, HEARTF, HEARTF_C, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: 1 + 0.04 * Math.sin(t * 6), sy: 1 + 0.04 * Math.sin(t * 6) })
      hearts(x, t, 790, 720, P.t0 + 1.0, { n: 6, life: 1.8, spread: 240, cell: 7, seed: 6 })
      L(x, 790, 1110, 'BRAVE HEART', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0566', key: 'D', accent: ACC, solo: S,
  title: 'Aries, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Fast at everything. | *Except healing.*', mood: 'heart' },
  last: {
    text: 'Over it? | *Take all the time.*',
    draw(x, t, lt) {
      stopwatch(x, t, 540, 1070, pop01(t, t - lt + 0.3, 0.35, 2), 'NO LIMIT', 0.15)
      L(x, 540, 1320, 'HEALING: YOUR PACE', pop01(t, t - lt + 1.4, 0.3, 2.4), MINT, -0.03, 32)
      hearts(x, t, 540, 900, t - lt + 1.5, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
