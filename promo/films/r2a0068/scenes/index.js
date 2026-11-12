// r2a0068: star_advice, ADVICE SOLO, "Aquarius, you're doing | better than you think." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Aquarius, you’re | doing *better.*" (the batch topic, trimmed so it fits two lines)  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the odd one out (that's your magic: ORIGINAL 1 OF 1) · ideas seem weird (weird is early: a wild lightbulb)
//              · need alone time (not cold, recharging) · trying to save the world (one thing counts: a patched globe)
//              · feelings hard to say (typing them counts) · called a robot (robots don't care this much: the antenna
//              heart) · your chart looks chaotic (so do galaxies) · ten projects started (finishing one is plenty)
//              · you care about everyone (include yourself: "+ me" on the sign)
//  37.8        "Better than | *you think.*" (the hook, finished)  Aquarius comes back, big.
//  41.0        LESSON UNLOCKED: "You’re not behind. | You’re *early.*"  PROGRESS: SAVED
//  46.9        "Still weird. | *Still wonderful.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', ELECTRIC = '#7fd8ff', RED = '#e23d4e', S = 'aquarius'

// ── props
const BLOB = ['.GGGG.', 'GGGGGG', 'GKGGKG', 'GGGGGG', 'GGGGGG', '.G..G.']
const BULB = [
  '...YYYY...',
  '..YYWYYY..',
  '.YYWYYYYY.',
  '.YYYYYYYY.',
  '.YYYYYYYY.',
  '..YYYYYY..',
  '...YYYY...',
  '...GGGG...',
  '...GGGG...',
  '....GG....',
]
const BULB_C = { Y: GOLD, W: CREAM, G: '#9aa5c4' }
const GLOBE = [
  '...BBBBBB...',
  '..BGGBBBBB..',
  '.BGGGGBBGGB.',
  'BBGGGBBBGGGB',
  'BBBGBBBBBGGB',
  'BBBBBBGGBBBB',
  'BBBBBGGGGBBB',
  '.BBBBBGGBBB.',
  '..BBBBBBBB..',
  '...BBBBBB...',
]
const GLOBE_C = { B: '#4a8fe0', G: '#5fd068' }
const BANDAID = ['PPPPPPPP', 'PPWPPWPP', 'PPPPPPPP']
const GADGETS = [
  ['GEAR', '#9aa5c4'], ['APP', LAV], ['BAND', PINK], ['BOOK', MINT], ['ROBOT', SKYB], ['GARDEN', '#5fd068'],
]

function battery(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -66, 300, 132); x.fillRect(150, -26, 24, 52)
  x.fillStyle = '#140c30'; x.fillRect(-140, -56, 280, 112)
  x.fillStyle = p < 0.3 ? RED : p < 0.7 ? GOLD : MINT; x.fillRect(-132, -48, 264 * p, 96)
  x.fillStyle = CREAM; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(12 + 88 * p)}%`, 0, 2)
  x.restore()
}
function phone(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, side], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(side * 14, -110 + i * 76); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
function chart(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  const W = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = W[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4
  for (let i = 0; i < 7; i++) { const a = i * 2.3, b = i * 1.7 + 1; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55); x.lineTo(Math.cos(b) * r * 0.55, Math.sin(b) * r * 0.55); x.stroke() }
  x.restore()
}
function galaxy(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-t * 0.8)
  for (let i = 0; i < 46; i++) {
    const arm = i % 2, d = 8 + (i >> 1) * 5, a = d * 0.09 + arm * Math.PI
    x.fillStyle = [LAV, PINK, CREAM, SKYB][i % 4]; x.fillRect(Math.cos(a) * d - 5, Math.sin(a) * d * 0.7 - 5, 10, 10)
  }
  x.fillStyle = CREAM; x.fillRect(-12, -12, 24, 24)
  x.restore()
}
function sign(x, cx, cy, k, plus) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 60, 24, 170); x.fillStyle = '#c98f2a'; x.fillRect(-6, 60, 12, 170)
  x.fillStyle = INK; x.fillRect(-160, -100, 320, 170); x.fillStyle = CREAM; x.fillRect(-152, -92, 304, 154)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 24px ${MONO}`; x.fillText('KINDNESS FOR:', 0, -56)
  x.font = `800 40px ${INTER}`; x.fillText('everyone', 0, -6)
  if (plus > 0.01) { x.save(); x.translate(80, 40); x.rotate(-0.12); x.scale(plus, plus); x.fillStyle = RED; x.font = `800 38px ${INTER}`; x.fillText('+ me', 0, 0); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Feel like the odd one out? | *That’s your magic.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: 0, y: -60, s: 230 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, BLOB, { G: '#7a7f99', K: INK }, 220 + i * 128, 1060, 14 * pop01(t, P.t0 + 0.2 + i * 0.07, 0.25, 2))
      sparkles(x, t, 540, 790, P.t0 + 1.3, 8, 170, 0.2)
      label(x, 540, 1180, 'ORIGINAL: 1 OF 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: ELECTRIC, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your ideas seem weird? | *Weird is early.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.0, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BULB, BULB_C, 790, 860, 22 * k, { rot: 0.05 * Math.sin(t * 4) })
      if (lt > 1.0) { x.save(); x.globalAlpha = 0.25 + 0.15 * Math.sin(t * 8); x.fillStyle = GOLD; x.beginPath(); x.arc(790, 820, 170, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 1130, 'AHEAD OF SCHEDULE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 560, 620, 'what if socks | had GPS?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: S, cap: 'Need alone time? | *Not cold. Recharging.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'SOCIAL BATTERY', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 30, bg: LAV, rot: 0.03, font: MONO, weight: 700 })
      battery(x, 780, 880, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.3))
      label(x, 790, 1080, 'BACK SOON. PROMISE.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Trying to save the world? | *One thing counts.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t) })
      drawBits(x, BANDAID, { P: '#ffc9a8', W: '#e0a56a' }, 820, 840, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.4), { rot: -0.4 })
      label(x, 790, 1120, 'PROGRESS: REAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Feelings hard to say? | *Typing them counts.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), [
        ['i appreciate you', ELECTRIC, pop01(t, P.t0 + 0.6, 0.25, 2.2), 1],
        ['like. a lot.', ELECTRIC, pop01(t, P.t0 + 1.0, 0.25, 2.2), 1],
        ['wait. same!!', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.4), -1],
      ])
      hearts(x, t, 560, 900, P.t0 + 1.5, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Called a robot? | *Robots don’t care this much.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, F.top - 10); x.scale(k, k); x.fillStyle = INK; x.fillRect(-7, -70, 14, 70); x.fillStyle = '#9aa5c4'; x.fillRect(-3, -66, 6, 66); x.restore() }
      drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: lt > 1.2 ? PINK : '#7a7f99' }, F.x, F.top - 100, 9 * k * (lt > 1.2 ? 1 + 0.12 * Math.sin(t * 9) : 1))
      bubble(x, 760, 660, 'beep boop. | i love you.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1060, 'FEELINGS: ONLINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your chart looks chaotic? | *So do galaxies.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.9, 1.3))
      chart(x, t, 790, 860, 130, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - sw))
      galaxy(x, t, 790, 860, 1.3 * pop01(t, P.t0 + 1.1, 0.35, 2))
      label(x, 790, 1120, 'BEAUTIFUL, ACTUALLY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ten projects started? | *Finishing one is plenty.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      GADGETS.forEach(([n, c], i) => {
        const k = pop01(t, P.t0 + 0.15 + i * 0.12, 0.25, 2.2)
        const done = i === 2 && lt > 1.3
        label(x, 680 + (i % 2) * 210, 650 + Math.floor(i / 2) * 150, done ? `${n}: DONE!` : `${n}: 40%`, k * (done ? 1.15 : 1), { size: 26, bg: done ? GOLD : c, rot: (i % 3 - 1) * 0.06, font: MONO, weight: 700 })
      })
      sparkles(x, t, 680, 950, P.t0 + 1.35, 7, 140, 0.4)
      label(x, 790, 1150, 'PROUD OF YOU', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You care about everyone. | *Include yourself.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sign(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.3, 0.3, 2.6))
      hearts(x, t, 860, 820, P.t0 + 1.4, { n: 5, life: 1.5, spread: 160, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0068', key: 'C', accent: ELECTRIC, solo: S, ending: 'lesson',
  title: 'Aquarius, you’re | doing *better.*',
  cameos: CAMEOS,
  group: { cap: 'Better than | *you think.*', mood: 'sparkle' },
  lesson: { text: 'You’re not behind. | You’re *early.*', chip: 'PROGRESS: SAVED' },
  last: { text: 'Still weird. | *Still wonderful.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
