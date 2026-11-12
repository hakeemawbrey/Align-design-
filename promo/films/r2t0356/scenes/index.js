// r2t0356: star_talk, SOLO (aquarius), "Your Aquarius boss | *be like.*" (topic: Aquarians as your boss) (signs3kit social cut, music: lofi · C). Ending: lesson.
//   3.6–37.8   nine cards: meetings on the roof · dress code "be weird" · org chart is a circle · asked for a raise, got a
//              manifesto · performance review = your birth chart · hired a robot intern named Kevin · 3 AM "what if…" texts
//              · out of office: inventing · your weird idea got you promoted
//  37.8        "Rules? | *Optional.*"  ·  41.0 LESSON "Weird bosses | build *brave* teams."  ·  46.9 "Next meeting? | *On the moon.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#6fc3ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a sheet of paper with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
/** a pixel phone with chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 58); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
const ROBOT = ['....A....', '....A....', '.KKKKKKK.', '.KGGGGGK.', '.KGCGCGK.', '.KGGGGGK.', '.KGRRRGK.', '.KKKKKKK.', '..KGGGK..', 'KKKGGGKKK', 'K.KGGGK.K', '..KGGGK..', '..K...K..', '..K...K..']
const ROBOT_C = { A: GOLD, K: '#2a2350', G: '#9aa5c4', C: SKYB, R: PINK }
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const BULB_C = { Y: '#ffe76a', W: '#ffffff', G: '#9aa5c4' }
const MOON = ['...WWWW...', '.WWWWWWWW.', 'WWWGWWWWWW', 'WWWWWWGGWW', 'WGWWWWGGWW', 'WWWWWWWWWW', '.WWWGWWWW.', '...WWWW...']
const CHIMNEY = ['RRRR', 'RKRR', 'RRRR', 'RRKR', 'RRRR']

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Team meeting? | Held *on the roof.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: -40 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(150, 1160); x.lineTo(540, 980); x.lineTo(930, 1160); x.closePath(); x.fill()
      x.fillStyle = '#c0504d'; x.beginPath(); x.moveTo(176, 1150); x.lineTo(540, 994); x.lineTo(904, 1150); x.closePath(); x.fill()
      x.restore()
      drawBits(x, CHIMNEY, { R: '#c0504d', K: INK }, 820, 990, 18 * k)
    },
    front(x, t, lt, P) {
      L(x, 760, 640, 'MEETING ROOM: ROOF', pop01(t, P.t0 + 0.4, 0.3, 2), ACC, -0.04, 30)
      bubble(x, 760, 820, 'ideas are | better up here', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'The dress code? | *“Be weird.”*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['1. be weird', '2. weirder', '3. see rule 1'], { head: 'DRESS CODE', headBg: ACC, w: 330, size: 34, rot: 0.04 })
      L(x, 790, 1100, 'TIES: BANNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.05, 34)
    } },
  { sign: S, cap: 'The org chart | is a *circle.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(clamp((lt - 0.3) / 1.0) * 8))
      const R = 140
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 5; x.beginPath(); x.arc(790, 850, R * clamp(n / 2), 0, Math.PI * 2); x.stroke(); x.restore()
      for (let i = 0; i < n; i++) { const a = i / 8 * Math.PI * 2 - Math.PI / 2; signChar(x, t, ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'pisces'][i], 790 + Math.cos(a) * R, 860 + Math.sin(a) * R, 76, { mood: 'happy', seed: 40 + i, glyph: false, glow: 0.6, tears: i === 7 ? 1 : 0 }) }
      L(x, 790, 1090, 'EVERYONE: BOSS', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Asked for a raise. | Got a *manifesto.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pg = 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 211)
      paper(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['THE FUTURE', 'OF MONEY:', 'a vision'], { head: `PAGE ${pg} / 212`, headBg: LAV, w: 340, size: 36, rot: -0.03 })
      L(x, 790, 1090, 'RAISE: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.05, 32)
    } },
  { sign: S, cap: 'Performance review? | Read your *birth chart.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 820, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1060, 'RATING: VERY GEMINI', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Hired a robot intern. | Named it *Kevin.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 860, 20 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.04 * Math.sin(t * 5) })
      bubble(x, 800, 600, 'beep. hello.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 790, 1110, 'KEVIN: EMPLOYEE OF THE MONTH', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.03, 24)
    } },
  { sign: S, cap: 'Texts at 3 AM: | *“what if…”*', mood: 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BOSS · 3:04 AM', headCol: ACC, lines: [
        ['what if…', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['what if…', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['WHAT IF…', GOLD, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['ok see you 9', BONE, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
        ['zzz', LAV, pop01(t, P.t0 + 1.9, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Out of office: | *inventing.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.6],
    front(x, t, lt, P, F) {
      drawBits(x, BULB, BULB_C, F.x + 10, F.top - 80, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      sparkles(x, t, F.x + 10, F.top - 80, P.t0 + 1.2, 6, 90, 0.2)
      L(x, 790, 760, 'AUTO-REPLY:', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.03, 30)
      L(x, 790, 860, 'BACK WHEN IT WORKS', pop01(t, P.t0 + 0.5, 0.3, 2.2), ACC, -0.04, 30)
      L(x, 790, 1060, 'DAYS AWAY: 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: S, cap: 'Your idea was weird. | You got *promoted.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 920, 200 * k, { mood: lt > 1.1 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 800, 660, 'chairs… | on the ceiling?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, col: LAV, tail: 'bc' })
      L(x, 800, 1120, 'PROMOTED: FOR WEIRD', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
      sparkles(x, t, 800, 900, P.t0 + 1.2, 7, 170, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0356', key: 'C', accent: ACC, solo: 'aquarius', ending: 'lesson',
  title: 'Your Aquarius boss | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Rules? | *Optional.*', mood: 'sparkle' },
  lesson: { text: 'Weird bosses | build *brave* teams.', chip: 'TEAM: INSPIRED' },
  last: {
    text: 'Next meeting? | *On the moon.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, MOON, { W: '#efe6d6', G: '#9aa5c4' }, 540, 1250, 26 * pop01(t, t0 + 0.4, 0.45, 1.8), { rot: 0.05 * Math.sin(t * 2) })
      sparkles(x, t, 540, 1250, t0 + 0.7, 8, 200, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
