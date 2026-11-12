// r2t0431: star_talk, ROLL CALL, "The signs | *carpooling.*" (~58 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself in the carpool. Ending: lesson.
//   0.0–3.6    hook · 3.6–49.2 twelve cards (3.8 s each):
//              ♈ honked from their own driveway · ♉ reclined the seat into your lap · ♊ two playlists at once
//              · ♋ packed lunches for the whole car · ♌ shotgun every day, forever · ♍ route plan with footnotes
//              · ♎ still picking music, still parked · ♏ one question, a 45-minute confession · ♐ took a shortcut, new state
//              · ♑ split the gas to the cent · ♒ the car runs on vibes · ♓ song came on, cried the whole way
//  49.2        "Same car. | *Twelve vibes.*"  · 52.4 LESSON: "The best rides come | with *your people.*"  SEATBELTS: ON
//  58.3        "Same time | *tomorrow?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff8ea', SLATE = '#9fb4c8', WOOD = '#c98f5a', SAND = '#f3d79a', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e'
// ── shared props (each film carries its own copy)
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 14, 2)
    x.restore()
  })
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 150, k * r / 150); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18
    const py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel bitmap that pops in at t0 (cell size c) */
const bits = (x, t, bm, cols, cx, cy, c, t0, o = {}) => drawBits(x, bm, cols, cx, cy, c * pop01(t, t0, 0.3, 2), o)
const SEAT = [
  'KKKK..........',
  'KRRK..........',
  'KRRK..........',
  'KRRK..........',
  'KRRK..........',
  'KRRK..........',
  'KRRRKKKKKKKK..',
  'KRRRRRRRRRRRK.',
  'KRRRRRRRRRRRK.',
  '.KKKKKKKKKKKK.',
  '..K.......K...',
]
const SEAT_C = { K: '#2a2350', R: '#c0405a' }
const LUNCH = ['.KKKKKK.', 'KBBBBBBK', 'KBWWWWBK', 'KBBBBBBK', 'KBBBBBBK', 'KKKKKKKK']
const SIGNPOST = [
  'GGGGGGGGGGGGGGGG',
  'GWWWWWWWWWWWWWWG',
  'GWGGGGGGGGGGGGWG',
  'GWGGGGGGGGGGGGWG',
  'GWWWWWWWWWWWWWWG',
  'GGGGGGGGGGGGGGGG',
  '.......PP.......',
  '.......PP.......',
  '.......PP.......',
  '.......PP.......',
  '.......PP.......',
]
const SIGNPOST_C = { G: '#2f8f55', W: CREAM, P: '#a9a9bf' }
const CAR = [
  '....KKKKKKKK......',
  '...KSSSKSSSSK.....',
  '..KSSSSKSSSSSK....',
  'KKBBBBBBBBBBBBKKK.',
  'KBBBBBBBBBBBBBBBBK',
  'KBYBBBBBBBBBBBBBRK',
  'KBBBBBBBBBBBBBBBBK',
  '.KKWWKKKKKKKKWWKK.',
  '...WW........WW...',
]
const CAR_C = { K: INK, S: SKYB, B: '#ff8f6b', Y: GOLD, R: RED, W: '#3a3a52' }
// a fuel gauge whose needle is a heart
function gauge(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.lineTo(150, 30); x.lineTo(-150, 30); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 136, Math.PI, 0); x.lineTo(136, 20); x.lineTo(-136, 20); x.fill()
  const C = [RED, ORANGE, GOLD, MINT]
  for (let i = 0; i < 4; i++) { x.strokeStyle = C[i]; x.lineWidth = 18; x.beginPath(); x.arc(0, 0, 112, Math.PI + i * Math.PI / 4 + 0.04, Math.PI + (i + 1) * Math.PI / 4 - 0.04); x.stroke() }
  const a = Math.PI + lerp(0.2, Math.PI - 0.25, ease.outBack ? ease.outCubic(clamp((lt - 0.4) / 0.8)) : clamp(lt)) + 0.05 * Math.sin(t * 9)
  x.strokeStyle = BONE; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 96, Math.sin(a) * 96); x.stroke()
  x.fillStyle = BONE; x.fillRect(-14, -14, 28, 28)
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('E', -112, 4); x.fillText('F', 112, 4)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Honked from | *their own driveway.*', mood: lt => lt > 0.8 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 770 + (i - 1) * 40, 640 + i * 150, 'HONK!', pop01(t, P.t0 + 0.3 + i * 0.35, 0.22, 2.4), { size: 52 - i * 4, col: i === 1 ? GOLD : BONE, tail: 'bl' })
      label(x, 780, 1110, 'ETA: 0 MIN AGO', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Reclined the seat. | *Into your lap.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -170, y: 20 },
    front(x, t, lt, P) {
      const r = lerp(0, 0.75, ease.inOutCubic(prog(lt, 0.4, 1.3)))
      bits(x, t, SEAT, SEAT_C, 780, 900, 24, P.t0 + 0.15, { rot: r * 0.5 })
      signChar(x, t, 'cancer', 850, 1030, 150 * pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, -1], seed: 11, glyph: false })
      bubble(x, 760, 620, 'zzz… comfy', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Two playlists. | *Both at once.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 780, 660, '♪ PLAYLIST A', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1040, '♪ PLAYLIST B', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      notes(x, t, 790, 900, { n: 6, cell: 8, col: GOLD, seed: 3 })
      bubble(x, 790, 850, 'it’s a mashup!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Packed lunches. | For *the whole car.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, MINT, SKYB, GOLD, LAV]
      for (let i = 0; i < 5; i++) bits(x, t, LUNCH, { K: INK, B: COLS[i], W: CREAM }, 790 + (i % 2 ? 30 : -30), 1080 - i * 95, 15, P.t0 + 0.2 + i * 0.22)
      label(x, 790, 600, 'NAMES ON ALL ♡', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Shotgun every day. | *Forever.*', mood: 'sparkle', star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 400, head: 'SHOTGUN', headCol: ORANGE, rows: [
        ['mon: leo', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['tue: leo', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['wed: leo', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['2031: leo', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
      sparkles(x, t, 780, 860, P.t0 + 1.3, 7, 210, 0.4)
    } },
  { sign: 'virgo', cap: 'Sent a route plan. | *With footnotes.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 330, h: 400, head: 'ROUTE v7', headCol: '#b6e08a', size: 28, rows: [
        ['7:02 leave¹', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['7:04 left²', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['7:09 merge³', INK, pop01(t, P.t0 + 0.8, 0.2, 2)],
        ['¹ not 7:03', '#6b62a8', pop01(t, P.t0 + 1.1, 0.2, 2)], ['² signal early', '#6b62a8', pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Still picking music. | *Still parked.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const st = ['LOFI?', 'JAZZ?', 'POP?', 'LOFI?', 'SILENCE?'][Math.min(4, Math.floor(lt * 2.2))]
      label(x, 790, 760, st, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'MILES DRIVEN: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Asked one question. | You *told them everything.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'so… how’s work?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      signChar(x, t, 'gemini', 820, 950, 170 * pop01(t, P.t0 + 0.6, 0.3, 2), { mood: lt > 1.0 ? 'wide' : 'happy', look: [-1, 0], seed: 14, glyph: false })
      label(x, 800, 1130, '45-MIN CONFESSION', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#b07bff', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Took a shortcut. | Now *in another state.*', mood: 'sparkle', star: { x: -170 }, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      bits(x, t, SIGNPOST, SIGNPOST_C, 780, 860, 22, P.t0 + 0.25)
      if (k > 0.5) { x.save(); x.globalAlpha = clamp((k - 0.5) * 2); x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WELCOME TO…', 780, 803); x.restore() }
      label(x, 790, 1110, 'SHORTCUT: 6 HRS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Split the gas money. | *To the cent.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 380, head: 'INVOICE #12', headCol: SLATE, rows: [
        ['gas  $3.47', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['air  $0.02', INK, pop01(t, P.t0 + 0.7, 0.2, 2)], ['due: friday', RED, pop01(t, P.t0 + 1.0, 0.2, 2)],
      ] })
      label(x, 780, 1110, 'RECEIPT ATTACHED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their car | runs on *vibes.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      gauge(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1040, 'FUEL: VIBES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: '#6fd6ff', rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 180, 0.2)
    } },
  { sign: 'pisces', cap: 'A song came on. | *Cried the whole way.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 780, 900, { n: 5, cell: 8, col: LAV, seed: 5 })
      label(x, 790, 680, '♪ SAD SONG #4', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TISSUES: 0 LEFT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0431', key: 'C', accent: '#ff8f6b', ending: 'lesson',
  title: 'The signs | *carpooling.*',
  cameos: CAMEOS,
  group: { cap: 'Same car. | *Twelve vibes.*' },
  lesson: { text: 'The best rides come | with *your people.*', chip: 'SEATBELTS: ON' },
  last: {
    text: 'Same time | *tomorrow?*',
    draw(x, t, lt) { const k = pop01(t, t - lt + 0.4, 0.4, 2); drawBits(x, CAR, CAR_C, lerp(1300, 540, ease.outCubic(clamp((lt - 0.3) / 0.9))), 1500, 22 * k) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
