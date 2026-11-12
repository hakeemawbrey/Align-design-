// r2t0076: star_talk SOLO, "Sagittarius moms | be like." (~48 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): the most extreme, most lovable Sagittarius mom.
//   0.0–3.6    "Sagittarius moms | *be like.*"
//   3.6–37.8   weekend trip, back in a month · school trip: she came along · "is this ugly?" "yes, babe." · grounded you,
//              forgot by lunch · dinner plans? booked a flight · bedtime story: her own, chapter 47 · signed the family
//              up for a marathon · laughs so loud the neighbours join in · read your birth chart: "pack a bag"
//  37.8        "Wild heart. | *Biggest hugs.*"
//  41.0        LESSON UNLOCKED: "She showed you the world. | *Then let you go.*"  STATUS: FREE SPIRIT
//  46.9        "Call her. | She’s *off again.*"  (a postcard lands)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURP = '#b48cff', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const S = 'sagittarius'

// ── small prop helpers
function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true                       // caller draws inside, then x.restore()
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
const SUITCASE = [
  '....KKKKK....',
  '....K...K....',
  'OOOOOOOOOOOOO',
  'OoOOOOOOOOOoO',
  'OOOOOOOOOOOOO',
  'OoOOOOOOOOOoO',
  'OOOOOOOOOOOOO',
  'OoOOOOOOOOOoO',
  'OOOOOOOOOOOOO',
  '.K.........K.',
]
const SUIT_C = { K: '#2a2350', O: ORANGE, o: '#c98f2a' }
const PLANE = [
  '......WW......',
  '......WW......',
  '.....WWWW.....',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
  '......WW......',
  '.....WWWW.....',
]
const SHOE = ['..PPPP....', '.PPPPPP...', 'PPPPPPPPP.', 'PPPPPPPPPP', 'WWWWWWWWWW']
const BOOK = [
  'RRRRRRRRRRRR',
  'RWWWWWRWWWWR',
  'RWkkkWRWkkWR',
  'RWWWWWRWWWWR',
  'RWkkWWRWkkkR',
  'RWWWWWRWWWWR',
  'RRRRRRRRRRRR',
]
const BOOK_C = { R: RED, W: BONE, k: '#9aa5c4' }

// a birth-chart wheel (twelve slices) with an arrow pointing off the edge
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 136, 0, Math.PI * 2); x.fill()
  const cols = [PURP, BONE, LAV, '#2a2350']
  for (let i = 0; i < 12; i++) { x.fillStyle = cols[i % 4]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 126, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 36, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a postcard (for the last line)
function postcard(x, cx, cy, k, rot) {
  if (!card(x, cx, cy, 330, 210, BONE, k, rot)) return
  x.fillStyle = SKYB; x.fillRect(-150, -90, 150, 180)
  x.fillStyle = ORANGE; x.beginPath(); x.arc(-75, -20, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = MINT; x.fillRect(-150, 40, 150, 50)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 4; i++) x.fillRect(20, -60 + i * 34, 120 - (i % 2) * 30, 8)
  text(x, 'xo mom', 80, 74, 26, RED)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Weekend trip. | Back in *a month.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUIT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      const d = 2 + Math.floor(clamp((lt - 0.5) / 1.4) * 29)
      label(x, 790, 650, `DAY ${d}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your school trip? | She *came along.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 790, 960, 200 * k, { mood: 'wide', look: [-1, 0], seed: 13, glyph: false, tears: 1 })
      label(x, 790, 700, 'CHAPERONE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: PURP, rot: -0.05 })
      bubble(x, 380, 600, 'ROAD TRIP!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: '“Is this ugly?” | “*Yes,* babe.”', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 980, 210 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      // a loud, very patterned sweater on the kid
      if (k > 0.5) { x.save(); x.globalAlpha = clamp((k - 0.5) * 2); for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#7dffb0' : '#ff4f86'; x.fillRect(730 + i * 28, 1040, 28, 28) } x.restore() }
      bubble(x, 800, 650, 'is it ugly?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      label(x, 390, 640, 'YES.', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 64, bg: GOLD, rot: -0.08 })
    } },
  { sign: S, cap: 'Grounded you. | *Forgot by lunch.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 790, 760, 'GROUNDED', k, { size: 52, bg: RED, color: BONE, rot: 0.04 })
      const cross = ease.outCubic(prog(lt, 0.9, 1.2))
      if (cross > 0) { x.save(); x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(640, 760); x.lineTo(lerp(640, 940, cross), 760); x.stroke(); x.restore() }
      bubble(x, 790, 990, 'ice cream?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Dinner plans? | She *booked a flight.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.6, 2.2))
      drawBits(x, PLANE, { W: BONE }, lerp(660, 900, fly), lerp(980, 640, fly), 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.5 })
      label(x, 790, 1100, 'BOARDING: NOW', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bedtime story? | *Her* adventures.', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      const ch = 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 46)
      label(x, 790, 1080, `CHAPTER ${ch}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'zzz', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Family walk? | It’s *a marathon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, { P: PURP, W: BONE }, 730, 1060 - Math.abs(Math.sin(t * 8)) * 20, 16 * k)
      drawBits(x, SHOE, { P: PURP, W: BONE }, 870, 1060 - Math.abs(Math.cos(t * 8)) * 20, 16 * k)
      label(x, 800, 730, 'MILE 26', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 52, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laughs so loud | the *neighbours* join in.', mood: 'happy', look: [0, 0], star: { x: -60, y: 20 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2.2)
      label(x, 560, 590, 'HA HA HA HA', k, { size: 56, bg: GOLD, rot: -0.04 + 0.02 * Math.sin(t * 20) })
      bubble(x, 240, 1050, 'haha', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'br' })
      bubble(x, 850, 1060, 'HAHA', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 850, 820, 'lol', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Read your birth chart. | Said, “*Pack a bag.*”', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, SUITCASE, SUIT_C, 790, 1070, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.2), { rot: -0.08 })
      sparkles(x, t, 790, 800, P.t0 + 1.2, 7, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0076', key: 'C', accent: PURP, solo: S, ending: 'lesson',
  title: 'Sagittarius moms | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Wild heart. | *Biggest hugs.*', mood: 'sparkle' },
  lesson: { text: 'She showed you the world. | Then *let you fly.*', chip: 'STATUS: FREE SPIRIT' },
  last: {
    text: 'Call her. | She’s *off again.*',
    draw(x, t, lt) {
      postcard(x, 540, 1200, pop01(t, t - lt + 0.7, 0.4, 2), -0.06 + 0.02 * Math.sin(t * 2))
      hearts(x, t, 540, 1110, t - lt + 1.3, { n: 6, life: 1.6, spread: 300, cell: 6, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
