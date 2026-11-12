// r2a0346: star_advice, ADVICE SOLO (capricorn), "Capricorn, you don't owe anyone | *an instant reply.*"
// (shown as "Capricorn, you owe | *no instant reply.*" to fit; signs3kit social cut, music: lofi · D). Ending: group.
//   nine cards: birthday emails vs cake · office hours over at 11 p.m. · "three business days" · everyone's emergency
//   contact · the weekend is off duty · a slow reply to a match · "nap" ticked on the to-do · climbing goals, texts at
//   base camp · reply hours sign
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', STEEL = '#9aa5c4', ACC = '#8fe0b8'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, down = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k * (1 - 2 * down))
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  if (down < 0.5) {
    x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
    if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
    x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach(([txt, col, kk, right], i) => {
      if (kk <= 0.01) return
      x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
      x.save(); x.translate(right ? 100 - w : -100, -60 + i * 64); x.scale(kk, kk)
      x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
      x.restore()
    })
  } else { x.fillStyle = '#3a3166'; x.fillRect(-60, -40, 120, 80) }
  x.restore()
}
/** a paper list with ticks */
function list(x, cx, cy, k, title, rows, { rot = 0.04, w = 320 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const h = 110 + rows.length * 66
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 44)
  x.textAlign = 'left'
  rows.forEach(([txt, done], i) => {
    const y = -h / 2 + 110 + i * 66
    x.fillStyle = INK; x.fillRect(-w / 2 + 24, y - 18, 36, 36); x.fillStyle = BONE; x.fillRect(-w / 2 + 30, y - 12, 24, 24)
    if (done) { x.fillStyle = '#2fa86a'; x.font = `800 40px ${INTER}`; x.fillText('✓', -w / 2 + 26, y) }
    x.fillStyle = INK; x.font = `700 30px ${INTER}`; x.fillText(txt, -w / 2 + 78, y + 2)
  })
  x.restore()
}
/** a hanging sign on a string */
function sign(x, t, cx, cy, k, lines, { bg = GOLD, w = 300 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05 * Math.sin(t * 2.2)); x.scale(k, k)
  const h = 50 + lines.length * 46
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-w / 3, -h / 2); x.lineTo(0, -h / 2 - 70); x.lineTo(w / 3, -h / 2); x.stroke()
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * 46 + 2))
  x.restore()
}
const BELL = ['...YY...', '..YYYY..', '.YYYYYY.', '.YYYYYY.', '.YYYYYY.', 'YYYYYYYY', '...YY...']
const SHADES = ['KKKKK.KKKKK', 'KBBBKKKBBBK', 'KBBBK.KBBBK', '.KKK...KKK.']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const ST = { x: -180 }

const CAKE = ['..Y..Y..Y..', '..R..R..R..', 'PPPPPPPPPPP', 'PWWPWWPWWPP', 'PPPPPPPPPPP', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'CCCCCCCCCCC']
const FLAG = ['KRRRR', 'KRRRR', 'KRR..', 'K....', 'K....', 'K....']
/** a stack of incoming call cards */
function calls(x, t, cx, cy, lt, names) {
  names.forEach(([n, col], i) => {
    const k = clamp((lt - 0.3 - i * 0.22) / 0.2)
    if (k <= 0) return
    const shake = lt < 1.4 ? Math.sin(t * 38 + i) * 4 : 0
    x.save(); x.translate(cx + shake, cy - 150 + i * 92); x.rotate((i % 2 ? 0.04 : -0.04)); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-170, -38, 340, 76); x.fillStyle = col; x.fillRect(-164, -32, 328, 64)
    x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, 0, 2)
    x.restore()
  })
}
const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'Emails on your birthday? | *Cake first.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { Y: '#ffe76a', R: RED, P: PINK, W: BONE, C: '#c98a5a' }, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'INBOX: LATER', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.04, 36)
      if (lt > 1.2) sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 160, 0.3)
      L(x, 800, 1120, 'TODAY: CAKE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Read it at 11 p.m.? | *Office hours are over.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#ffe7a8' }, 800, 700, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 880, '11:04 PM', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, 0.04, 44)
      sign(x, t, 800, 1080, pop01(t, P.t0 + 1.1, 0.35, 2), ['CLOSED'], { bg: RED, w: 240 })
    } },
  { sign: S, cap: 'Reply in three business days? | *Totally fair.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: PINK, lines: [
        ['movie fri?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
      ] })
      const st = pop01(t, P.t0 + 1.0, 0.25, 2.6)
      if (st > 0.01) L(x, 800, 930, 'ETA: 3 BUSINESS DAYS', st, MINT, -0.12, 32)
      bubble(x, 800, 1130, 'take your time!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Everyone’s emergency contact? | *Take a day off.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calls(x, t, 800, 860, lt, [['MOM', BONE], ['BOSS', STEEL], ['BESTIE', PINK], ['LANDLORD', GOLD]])
      L(x, 800, 1140, 'HELPLINE: CLOSED TODAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Your weekend | *isn’t on call.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, SHADES, { K: INK, B: '#3a3166' }, F.x, F.cy - 6, 15 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      sign(x, t, 800, 820, pop01(t, P.t0 + 0.3, 0.35, 2), ['OFF DUTY', 'SAT + SUN'], { bg: GOLD })
      bubble(x, 800, 1080, 'back monday ☺', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Slow reply to a match? | *The right one waits.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '♡ MATCH', headCol: PINK, lines: [
        ['sorry, busy day', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['no rush at all', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['worth the wait', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
      hearts(x, t, 800, 760, P.t0 + 1.5, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Rest feels unproductive? | *Tick it off anyway.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      list(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'TO-DO', [['answer all', false], ['fix everything', false], ['nap', lt > 1.2]])
      if (lt > 1.2) sparkles(x, t, 700, 960, P.t0 + 1.2, 6, 110, 0.3, [MINT, BONE, GOLD])
      L(x, 800, 1140, 'PRODUCTIVE ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Climbing your goals? | *Texts wait at base camp.*', mood: 'sparkle', look: [1, -1], star: { x: -220, y: 60, s: 240 }, hops: [0.6, 1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.4, 1.8)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(330, 1180); x.lineTo(700, 560); x.lineTo(1000, 1180); x.fill()
      x.fillStyle = '#5b4a8a'; x.beginPath(); x.moveTo(350, 1170); x.lineTo(700, 580); x.lineTo(980, 1170); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.moveTo(620, 715); x.lineTo(700, 580); x.lineTo(780, 715); x.lineTo(740, 690); x.lineTo(700, 720); x.lineTo(660, 690); x.fill()
      x.restore()
      drawBits(x, FLAG, { K: INK, R: RED }, 720, 540, 12 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
    },
    front(x, t, lt, P) {
      phone(x, 860, 1110, 0.3 * pop01(t, P.t0 + 0.5, 0.3, 2), { head: 'TEXTS', headCol: MINT, rot: 0 })
      L(x, 860, 1010, 'BASE CAMP', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 28)
      bubble(x, 420, 640, 'see you | at the top', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: '“Tomorrow” isn’t rude. | It’s *kind to you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sign(x, t, 800, 820, pop01(t, P.t0 + 0.3, 0.35, 2), ['REPLY HOURS', '9 AM – 5 PM'], { bg: ACC, w: 340 })
      L(x, 800, 1060, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0346', key: 'D', accent: ACC, solo: 'capricorn', ending: 'group',
  title: 'Capricorn, you owe | *no instant reply.*',
  cameos: CAMEOS,
  group: { cap: 'Reply when ready. | *Worth the wait.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
