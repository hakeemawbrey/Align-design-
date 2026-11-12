// r2a0191: star_advice, ADVICE SOLO, "How to apologise | to an Aries." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one gag each.
//   0.0–3.6    "How to apologise | *to an Aries.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              say it fast (stopwatch, they're already over it) · skip the essay ("my bad" to a match)
//              · bring a snack (hunger made it worse) · they forgive fast (the grudge gets thrown away)
//              · say it to their face (direct is loved) · they yelled too? both say sorry
//              · loud temper, louder heart (a puff of fire turns to hearts) · make it a race to the hug
//              · then go do something fun together (a skateboard for two)
//  37.8        GROUP ending: "Say sorry once. | Then *race them.*"  Aries comes back, big.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#f0603a', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const S = 'aries'

// ── props
const SANDWICH = [
  '..TTTTTTTTTT..',
  '.TTTTTTTTTTTT.',
  'GGGGGGGGGGGGGG',
  'RRRRRRRRRRRRRR',
  'YYYYYYYYYYYYYY',
  'TTTTTTTTTTTTTT',
  '.TTTTTTTTTTTT.',
]
const SANDWICH_C = { T: '#e2a45a', G: '#5fd068', R: '#ff6b7a', Y: '#ffd23a' }
const ROCK = ['..GGGG..', '.GGGGGG.', 'GGgGGGGG', 'GGGGGgGG', '.GGGGGG.']
const ROCK_C = { G: '#7a7f99', g: '#5a5f78' }
const FLAME = ['...R...', '..RRR..', '.RROR..', '.ROOOR.', 'RROYORR', 'ROYYYOR', '.ROYOR.']
const FLAME_C = { R: '#ff4f3a', O: ORANGE, Y: '#ffe27a' }
const BOARD = [
  '.WWWWWWWWWWWWWWWWWW.',
  'WWWWWWWWWWWWWWWWWWWW',
  '.KK..............KK.',
  '.KK..............KK.',
]
const BOARD_C = { W: '#ff8fb1', K: INK }

// a stopwatch, its hand sweeping, a readout
function stopwatch(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-24, -186, 48, 34); x.fillStyle = '#c9c9d8'; x.fillRect(-16, -180, 32, 22)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 110 - 4, Math.sin(a) * 110 - 4, 8, 8) }
  const a = -Math.PI / 2 + clamp(lt / 0.9) * 0.5
  x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 100, Math.sin(a) * 100); x.stroke()
  x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('0.4 s', 0, 60)
  x.restore()
}
// a phone, a match chat: a long essay deletes itself down to "my bad.", then a reply
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = RED; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -132)
  const cut = clamp((lt - 0.5) / 0.7)
  if (cut < 1) {
    const n = Math.round(6 * (1 - cut))
    x.fillStyle = LAV; for (let i = 0; i < n; i++) x.fillRect(-90, -80 + i * 30, 180 - (i % 3) * 24, 18)
  } else {
    x.font = `800 30px ${INTER}`
    x.fillStyle = LAV; x.fillRect(-20, -70, 120, 52); x.fillStyle = INK; x.fillText('my bad.', 40, -43)
    if (lt > 1.5) { x.fillStyle = MINT; x.fillRect(-100, 0, 170, 52); x.fillStyle = INK; x.fillText('all good!', -15, 27) }
  }
  x.restore()
}
// a finish-line ribbon across the panel; snaps when Aries runs through
function ribbon(x, t, lt, P) {
  const k = pop01(t, P.t0 + 0.2, 0.3, 2)
  if (k <= 0.01) return
  const snap = lt > 1.3
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(196, 640, 20, 480); x.fillRect(866, 640, 20, 480)
  x.fillStyle = CREAM; x.fillRect(200, 644, 12, 472); x.fillRect(870, 644, 12, 472)
  if (!snap) { for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? RED : CREAM; x.fillRect(212 + i * 41, 860 + Math.sin(t * 4 + i) * 4, 41, 18) } }
  else {
    const f = ease.outCubic(clamp((lt - 1.3) / 0.4))
    for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? RED : CREAM; x.fillRect(212 + i * 41 - f * 20, 860 + i * f * 22, 41, 18) }
    for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? CREAM : RED; x.fillRect(538 + i * 41 + f * 20, 860 + (7 - i) * f * 22, 41, 18) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Say sorry fast. | They’re *already over it.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      stopwatch(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1090, 'GRUDGE: EXPIRED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skip the essay. | *“My bad”* works.', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 750, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      hearts(x, t, 380, 760, P.t0 + 1.7, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Bring a snack. | Hunger *started it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      drawBits(x, SANDWICH, SANDWICH_C, lerp(900, F.x + 230, ease.outCubic(clamp((lt - 0.4) / 0.6))), F.cy + 30, 17 * k)
      bubble(x, 760, 620, 'oh. I was hungry.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'They forgive fast. | *Let them.*', mood: lt => lt > 0.9 ? 'happy' : 'squint', star: { x: -120 }, hops: [0.9],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const f = ease.inQuad(clamp((lt - 0.8) / 0.7))
      const rx = lerp(F.x + 180, 1050, f), ry = lerp(F.cy - 40, 520, f) - Math.sin(Math.PI * f) * 120
      if (f < 1) {
        drawBits(x, ROCK, ROCK_C, rx, ry, 22 * k, { rot: f * 6 })
        label(x, rx, ry + 90, 'GRUDGE', k * (1 - f), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      }
      bubble(x, 780, 1100, 'bye, grudge!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Say it to their face. | They *love direct.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -150, s: 260 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 760, 900, 240 * k, { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 23, glyph: false })
      bubble(x, 760, 640, 'sorry. truly.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 540, 1120, 'RESPECT: EARNED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They yelled too? | *Both* say sorry.', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -190, s: 250 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 780, 920, 250 * k, { mood: lt > 1.4 ? 'happy' : 'eyeroll', look: [-1, 0], seed: 24, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 350, 640, 'sorry!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bc' })
      bubble(x, 780, 640, 'me too!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 540, 1130, 'EVEN', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Loud temper. | *Louder* heart.', mood: lt => lt > 1.1 ? 'heart' : 'squint', star: { x: 0, y: 40 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const fl = pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - ease.inQuad(clamp((lt - 0.9) / 0.3)))
      drawBits(x, FLAME, FLAME_C, F.x, F.top - 70, 16 * fl, { sx: 1 + 0.08 * Math.sin(t * 12) })
      hearts(x, t, F.x, F.top - 20, P.t0 + 1.1, { n: 8, life: 1.8, spread: 360, cell: 9, seed: 5 })
      sparkles(x, t, F.x, F.top - 40, P.t0 + 1.1, 7, 140, 0.3)
    } },
  { sign: S, cap: 'Make it a race. | *First to hug* wins.', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: { x: -290 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) { ribbon(x, t, lt, P) },
    front(x, t, lt, P) {
      label(x, 540, 610, 'HUG RACE', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 760, 1110, '1ST PLACE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 870, P.t0 + 1.3, 8, 200, 0.6)
    } },
  { sign: S, cap: 'Then do something fun. | *Together.*', mood: 'sparkle', star: { x: -130, y: -30, s: 240 }, hops: [1.6],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const dx = Math.sin(t * 1.6) * 30
      if (k > 0.01) signChar(x, t, 'libra', 700 + dx, 850, 220 * k, { mood: 'happy', look: [-1, 0], seed: 25, glyph: false })
      drawBits(x, BOARD, BOARD_C, 540 + dx, 1030, 26 * k)
      bubble(x, 540, 620, 'race you!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0191', key: 'D', accent: RED, solo: S, ending: 'group',
  title: 'How to apologise | *to an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Say sorry once. | Then *race them.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
