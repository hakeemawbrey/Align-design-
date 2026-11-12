// r2a0192: star_advice, ADVICE SOLO, "Cancer, celebrate | the small wins." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Cancer moment + a warm "that counts", one gag each.
//   0.0–3.6    "Cancer, celebrate | *the small wins.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              got out of bed (a tiny trophy) · drank some water (gold star sticker) · said no to a favour (boundary set)
//              · texted back today (sent!) · cooked for one: the good plate · folded laundry (one sock gets a medal)
//              · cried, then felt better (a rainbow) · asked for a hug · rested without guilt (nap champion)
//  37.8        "Small wins. | *Still* wins."  Cancer comes back, big.
//  41.2        CALLBACK: "The trophy shelf? | *Getting full.*"  The tiny trophies come back, a whole shelf of them.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#3fb6f0', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', WOOD = '#c98f2a'
const S = 'cancer'

// ── props
const TROPHY = [
  'YYYYYYYYY',
  'YYwYYYYYY',
  '.YwYYYYY.',
  '..YYYYY..',
  '...YYY...',
  '....Y....',
  '...YYY...',
  '..KKKKK..',
]
const TROPHY_C = { Y: GOLD, w: '#fff1b0', K: '#5b3a1a' }
const GLASS = ['W......W', 'W......W', 'WBBBBBBW', 'WBbBBBBW', 'WBBBBBBW', 'WBBBBBBW', '.WWWWWW.']
const GLASS_C = { W: '#d8e8ff', B: SKYB, b: '#ffffff' }
const STAR = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y']
const SOCK = ['.PPP..', '.PPP..', '.PPP..', '.PPP..', '.PPPPP', 'PPPPPP', 'PPPPP.']
const SOCK_C = { P: PINK }
const MEDAL = ['R...R', '.R.R.', '..R..', '.YYY.', 'YYYYY', 'YYYYY', '.YYY.']
const MEDAL_C = { R: BLUE, Y: GOLD }
const BLANKET = [
  'BBBBBBBBBBBBBBBBBB',
  'BbBBbBBbBBbBBbBBbB',
  'BBBBBBBBBBBBBBBBBB',
  'BBbBBbBBbBBbBBbBBB',
  'BBBBBBBBBBBBBBBBBB',
]
const BLANKET_C = { B: LAV, b: '#a98ae0' }

// a rainbow arc (bands of colour)
function rainbow(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const COLS = [RED, ORANGE, GOLD, MINT, SKYB, LAV]
  COLS.forEach((c, i) => { x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 170 - i * 18, Math.PI, 0); x.stroke() })
  COLS.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 15; x.beginPath(); x.arc(0, 0, 170 - i * 18, Math.PI, 0); x.stroke() })
  x.restore()
}
// the good plate: a gold-rimmed plate with soup and a little sprig
function plate(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 176, 86, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 168, 80, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 0, 150, 68, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = ORANGE; x.beginPath(); x.ellipse(0, 0, 100, 42, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5fd068'; x.fillRect(-14, -14, 16, 10); x.fillRect(2, -6, 14, 10)
  x.restore()
}
// a phone showing "sent ✓"
function sentPhone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = LAV; x.fillRect(-100, -140, 150, 52); x.fillStyle = INK; x.fillText('you ok?', -25, -113)
  if (lt > 0.7) { x.fillStyle = BLUE; x.fillRect(-40, -60, 140, 52); x.fillStyle = INK; x.fillText('yes :)', 30, -33) }
  if (lt > 1.1) { x.fillStyle = MINT; x.font = `700 24px ${MONO}`; x.fillText('SENT ✓', 30, 14) }
  x.restore()
}
// a shelf of tiny trophies, filling up
function shelf(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-330, 60, 660, 34); x.fillStyle = WOOD; x.fillRect(-324, 64, 648, 24)
  const n = Math.min(6, Math.floor(clamp((lt - 0.3) / 1.4) * 6) + 1)
  for (let i = 0; i < n; i++) drawBits(x, TROPHY, TROPHY_C, -275 + i * 110, 8 + Math.sin(t * 3 + i) * 2, 11)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Got out of bed? | That *counts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', star: { x: -180, y: 20 }, hops: [1.2],
    back(x, t, lt, P, F) { drawBits(x, BLANKET, BLANKET_C, F.x, F.cy + 130 + 40 * ease.inQuad(clamp((lt - 0.9) / 0.4)), 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 860, 22 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      label(x, 790, 1080, 'WIN #1: UP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 150, 0.2)
    } },
  { sign: S, cap: 'Drank some water. | *Gold star.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, STAR, { Y: GOLD }, 870, 760, 18 * pop01(t, P.t0 + 1.3, 0.3, 2.6), { rot: 0.2 })
      sparkles(x, t, 870, 760, P.t0 + 1.35, 6, 110, 0.4)
    } },
  { sign: S, cap: 'Said no to a favour. | *Proud of you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'can you also…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      bubble(x, 680, 880, 'not today :)', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 780, 1090, 'BOUNDARY: SET', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted back today. | *Huge.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sentPhone(x, 780, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sparkles(x, t, 780, 800, P.t0 + 1.45, 7, 180, 0.5)
    } },
  { sign: S, cap: 'Cooked for just you? | Use *the good plate.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      plate(x, 780, 950, pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 780, 700, 'TABLE FOR: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Folded one sock. | *Still counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      const m = ease.outCubic(clamp((lt - 0.9) / 0.4))
      if (lt > 0.9) drawBits(x, MEDAL, MEDAL_C, 790, lerp(560, 760, m), 13)
      label(x, 790, 1110, 'LAUNDRY: BEGUN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Had a cry. | Felt *lighter.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', tears: lt => lt > 1.3 ? 0 : 2, star: { x: -150, y: 40 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { rainbow(x, 620, 820, pop01(t, P.t0 + 1.3, 0.4, 2)) },
    front(x, t, lt, P) { sparkles(x, t, 620, 700, P.t0 + 1.4, 7, 200, 0.6) } },
  { sign: S, cap: 'Asked for a hug. | *Brave.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -150, s: 260 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const close = ease.inOutCubic(clamp((lt - 0.9) / 0.5))
      if (k > 0.01) signChar(x, t, 'taurus', lerp(800, 690, close), 920, 250 * k, { mood: close > 0.5 ? 'heart' : 'happy', look: [-1, 0], seed: 41, glyph: false })
      bubble(x, 540, 630, 'hug?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 6, life: 1.6, spread: 220, cell: 8, seed: 7 })
    } },
  { sign: S, cap: 'Rested. No guilt. | *Best win yet.*', mood: 'sleepy', star: { x: -150, y: 40 }, hops: [],
    back(x, t, lt, P, F) { drawBits(x, BLANKET, BLANKET_C, F.x + 20, F.cy + 120, 24 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 760, 700, 'NAP CHAMPION', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, TROPHY, TROPHY_C, 790, 930, 16 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
    } },
]

const F = makeFilm({
  id: 'r2a0192', key: 'F', accent: BLUE, solo: S, ending: 'callback',
  title: 'Cancer, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Small wins. | *Still* wins.', mood: 'sparkle' },
  last: {
    text: 'The trophy shelf? | *Getting full.*',
    draw(x, t, lt) {
      shelf(x, t, 540, 980, 1.35 * pop01(t, t - lt + 0.4, 0.35, 2), lt)
      signChar(x, t, S, 540, 1270, 260, { mood: 'sparkle', pop: pop01(t, t - lt + 0.6, 0.4, 2), seed: 44, glyph: false, hops: [t - lt + 1.9] })
      sparkles(x, t, 540, 980, t - lt + 1.9, 8, 260, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
