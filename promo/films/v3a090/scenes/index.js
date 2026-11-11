// v3a090: star_advice, ADVICE SOLO, "How to love | a Gemini." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love a Gemini, one warm truth + one gag each.
//   0.0–3.6    "How to love | *a Gemini.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the tangents are the point (a wandering dotted route) · the nine-minute voice memo · forty hobbies
//              (pottery, ukulele, French: day 2) · save their random facts ("otters hold hands") · a tiny gift: a leaf
//              · they talk fast when they trust you · let them change their mind (tacos → sushi → tacos)
//              · laugh at the bit, even the fifth time · stay curious: their life story, volume 47
//  37.8        "Curious. | *Never boring.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "Don't slow them down. | *Walk beside them.*"  TWINS: SEEN
//  46.9        "Bring snacks. | It's a *long voice memo.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#f2cf4a', LEAFG = '#5fd068'
const S = 'gemini'

const LEAF = ['....GG', '...GGG', '..GGlG', '.GGlGG', 'GGlGG.', 'GlGG..', 'lGG...', 'l.....']
const LEAF_C = { G: LEAFG, l: '#2f7a3a' }
const BOX = ['..RR.RR..', '...RRR...', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP']
const BOX_C = { P: PINK, R: GOLD }
const BOOK = ['BBBBBBBBBB', 'BWWWWWWWWB', 'BWBBBBBBWB', 'BWWWWWWWWB', 'BWBBBBBWWB', 'BWWWWWWWWB', 'BWBBBBBBWB', 'BWWWWWWWWB', 'BBBBBBBBBB']
const BOOK_C = { B: LAV, W: '#fff4e2' }

// a dotted route that wanders all over before it reaches the dot
function route(x, t, lt, k) {
  if (k <= 0.01) return
  const pts = []
  for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([640 + 280 * u + 70 * Math.sin(u * 14), 620 + 420 * u + 90 * Math.sin(u * 9 + 1)]) }
  const n = Math.floor(clamp(lt / 1.8) * pts.length)
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = GOLD
  for (let i = 0; i < n; i += 2) x.fillRect(pts[i][0] - 6, pts[i][1] - 6, 12, 12)
  x.fillStyle = INK; x.beginPath(); x.arc(640, 620, 18, 0, 7); x.fill(); x.fillStyle = MINT; x.beginPath(); x.arc(640, 620, 12, 0, 7); x.fill()
  const e = pts[pts.length - 1]
  x.fillStyle = INK; x.beginPath(); x.arc(e[0], e[1], 18, 0, 7); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(e[0], e[1], 12, 0, 7); x.fill()
  x.restore()
}
// a voice memo strip: a long waveform and a timer
function memo(x, t, lt, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-220, -70, 440, 140); x.fillStyle = '#2a2350'; x.fillRect(-212, -62, 424, 124)
  x.fillStyle = MINT; x.beginPath(); x.moveTo(-185, -22); x.lineTo(-150, 0); x.lineTo(-185, 22); x.fill()
  for (let i = 0; i < 26; i++) { const h = 10 + 36 * Math.abs(Math.sin(i * 1.7 + t * 6 * (i < lt * 12 ? 1 : 0))); x.fillStyle = i < lt * 11 ? YEL : 'rgba(239,230,214,0.4)'; x.fillRect(-130 + i * 13, -h / 2, 8, h) }
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('9:12', 200, -42)
  x.restore()
}
// a little notebook page with one fact on it
function notebook(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 360)
  x.fillStyle = INK; x.fillRect(-166, -186, 332, 372); x.fillStyle = '#fff4e2'; x.fillRect(-158, -178, 316, 356)
  x.strokeStyle = 'rgba(56,196,236,0.5)'; x.lineWidth = 2; for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(-150, -110 + i * 46); x.lineTo(150, -110 + i * 46); x.stroke() }
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { x.font = i ? `800 34px ${INTER}` : `700 24px ${MONO}`; x.fillText(l, 0, -130 + i * 62) })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'The tangents? | *They are the point.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.8],
    front(x, t, lt, P) {
      route(x, t, lt, pop01(t, P.t0 + 0.15, 0.3, 1.6))
      label(x, 800, 1120, 'SCENIC ROUTE', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hear out | the *nine-minute* memo.', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      memo(x, t, lt, 750, 860, 0.9 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 650, 'okay so | quick story', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 770, 1080, 'WORTH IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Learn about | their *forty hobbies.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const items = [['POTTERY', GOLD, 640, -0.05], ['UKULELE', MINT, 760, 0.04], ['FRENCH: DAY 2', PINK, 880, -0.03], ['JUGGLING?', SKYB, 1000, 0.05]]
      items.forEach(([s, bg, y, r], i) => label(x, 790, y, s, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.4), { size: 34, bg, rot: r, font: MONO, weight: 700 }))
      label(x, 790, 1120, 'YOU: SUPPORTIVE', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.02 })
    } },
  { sign: S, cap: 'Save their | *random facts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      notebook(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2), ['FACT #212', 'otters hold', 'hands when', 'they sleep'])
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Small surprises | *win big.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      const open = lt > 1.0
      if (!open) drawBits(x, BOX, BOX_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, LEAF, LEAF_C, 790, 900 - 20 * Math.sin(t * 3), 22 * pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2), { rot: 0.2 })
      if (open) bubble(x, 760, 650, 'A LEAF?! | I love it', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 1.32, 7, 150, 0.4)
    } },
  { sign: S, cap: 'They talk fast | when they *trust you.*', mood: 'sparkle', look: [1, 0], star: { x: -210 }, hops: [0.5, 1.1, 1.7],
    front(x, t, lt, P) {
      const lines = ['and THEN', 'wait, also', 'okay but', 'one more', 'and THEN']
      lines.forEach((l, i) => { const a = P.t0 + 0.2 + i * 0.4; bubble(x, 780 + (i % 2 ? 40 : -30), 600 + i * 110, l, pop01(t, a, 0.2, 2.2), { size: 30, col: i % 2 ? BONE : '#fff4e2', tail: 'bl' }) })
    } },
  { sign: S, cap: 'Let them change | *their mind.*', mood: lt => lt > 1.8 ? 'happy' : 'squint', look: lt => [1, lt > 1 ? -1 : 0], star: { x: -210 },
    front(x, t, lt, P) {
      const words = ['TACOS', 'SUSHI', 'NOODLES', 'TACOS']
      words.forEach((w, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.5, 0.25, 2.2), crossed = i < 3 && lt > (0.6 + i * 0.4)
        label(x, 790, 640 + i * 120, w, k, { size: 38, bg: i === 3 ? MINT : BONE, rot: i % 2 ? 0.04 : -0.04 })
        if (crossed && k > 0.5) { x.fillStyle = '#e23d4e'; x.fillRect(690, 637 + i * 120, 200, 8) }
      })
      label(x, 790, 1130, 'FINAL ANSWER', pop01(t, P.t0 + 2.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laugh at the bit. | *Fifth time too.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 960, 190 * k, { mood: lt > 1.1 ? 'happy' : 'neutral', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5, P.t0 + 1.9] })
      bubble(x, 560, 620, 'okay but THE DUCK', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 820, 740, 'HA. HA. HA.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stay curious. | *There’s always more.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 800, 690, 'MY LIFE: VOL. 47', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'TO BE CONTINUED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a090', key: 'C', accent: YEL, solo: S, ending: 'lesson',
  title: 'How to love | *a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Curious. | *Never boring.*', mood: 'sparkle' },
  lesson: { text: 'Don’t slow them down. | *Walk beside them.*', chip: 'TWINS: SEEN' },
  last: { text: 'Bring snacks. | It’s a *long story.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
