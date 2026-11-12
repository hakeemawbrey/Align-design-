// v3a085: zodiac.advice444, ADVICE SOLO, "Taurus, your gift | is this." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the lovely things Tauruses do without noticing, one gag each.
//   0.0–3.6    "Taurus, your gift | *is this.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a jagged stress line goes flat: ROOM: CHILL · a soup pot whose steam curls into a heart · a punch card
//              stamped ten times: SHOWED UP · a gift tag: "exactly what I wanted" · a cassette: BAD DAY MIX
//              · a friendship bracelet, bead by bead: YEAR 12 · a loaf rising in its tin: WORTH THE WAIT
//              · a sign profile where "stubborn" is stickered over with "steady" · a welcome mat appears: HOME
//  37.8        "Steady. Warm. | *A total gift.*"  Taurus comes back.
//  41.0        LESSON UNLOCKED: "Your steady heart | is *the gift.*"  GIFT: RECEIVED
//  46.9        "Came for the soup. | *Stayed forever.*" over the match card: Taurus + Cancer (the soup, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7bd36a', ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'taurus'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── props
const POT = [
  'K..........K',
  'KRRRRRRRRRRK',
  '.RRRRRRRRRR.',
  '.RRWRRRRRRR.',
  '.RRRRRRRRRR.',
  '.RRRRRRRRRR.',
  '..RRRRRRRR..',
]
const GIFT = [
  '...PP.PP...',
  '....PPP....',
  'BBBBBPBBBBB',
  'BBBBBPBBBBB',
  'PPPPPPPPPPP',
  'BBBBBPBBBBB',
  'BBBBBPBBBBB',
  'BBBBBPBBBBB',
  'BBBBBPBBBBB',
]
const TAPE = [
  'KKKKKKKKKKKKKK',
  'KWWWWWWWWWWWWK',
  'KWWWWWWWWWWWWK',
  'KWKKKKKKKKKKWK',
  'KWK.K....K.KWK',
  'KWKKKKKKKKKKWK',
  'KWWWWWWWWWWWWK',
  'KKKKKKKKKKKKKK',
]
const MAT = [
  'MMMMMMMMMMMMMMMM',
  'MmMmMmMmMmMmMmMM',
  'MMMMMMMMMMMMMMMM',
  'MmMmMmMmMmMmMmMM',
  'MMMMMMMMMMMMMMMM',
]

// a jagged stress line that relaxes into a flat calm line
function stressLine(x, t, cx, cy, k, calm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -110, 360, 220); x.fillStyle = '#140c30'; x.fillRect(-172, -102, 344, 204)
  x.strokeStyle = calm > 0.6 ? GREEN : RED; x.lineWidth = 8; x.beginPath()
  for (let i = 0; i <= 30; i++) { const px = -160 + i * (320 / 30), amp = (1 - calm) * 70, py = (i % 2 ? -1 : 1) * amp * (0.5 + 0.5 * Math.sin(i * 1.7 + t * 6)); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  x.restore()
}
// steam puffs that curl into a heart
function steamHeart(x, t, cx, cy, p) {
  if (p <= 0.01) return
  for (let i = 0; i < 5; i++) { const ph = (t * 0.7 + i / 5) % 1; x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * ph) * (1 - p * 0.6); x.fillStyle = '#e6e6f2'; x.fillRect(cx + Math.sin(i * 2 + ph * 6) * 30 - 10, cy - ph * 140, 20, 20); x.restore() }
  drawBits(x, HEART, { H: '#e6e6f2' }, cx, cy - 170, 12 * p, { outline: null, alpha: 0.9 })
}
// a punch card with holes punched one by one
function punchCard(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -104, 356, 230)
  x.fillStyle = INK; x.fillRect(-182, -116, 364, 232); x.fillStyle = '#fff4e2'; x.fillRect(-174, -108, 348, 216)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SHOWED UP', 0, -70)
  for (let i = 0; i < 10; i++) { const c = i % 5, r = Math.floor(i / 5), px = -128 + c * 64, py = -6 + r * 64; x.fillStyle = INK; x.beginPath(); x.arc(px, py, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = i < n ? GREEN : '#fff4e2'; x.beginPath(); x.arc(px, py, 16, 0, Math.PI * 2); x.fill() }
  x.restore()
}
// a friendship bracelet, beads appearing one at a time
function bracelet(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  const COLS = [PINK, GOLD, SKYB, GREEN, LAV, ORANGE]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.ellipse(0, 0, 150, 110, 0, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { if (i >= n) break; const a = i / 12 * Math.PI * 2 - Math.PI / 2; x.fillStyle = INK; x.fillRect(Math.cos(a) * 150 - 22, Math.sin(a) * 110 - 22, 44, 44); x.fillStyle = COLS[i % 6]; x.fillRect(Math.cos(a) * 150 - 16, Math.sin(a) * 110 - 16, 32, 32) }
  x.restore()
}
// a loaf tin with bread rising out of it
function loaf(x, cx, cy, k, rise) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = lerp(20, 130, rise)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -60, 150, h + 6, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#d9a35a'; x.beginPath(); x.ellipse(0, -60, 142, h, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#f2c98a'; x.fillRect(-60, -60 - h * 0.6, 120, 10)
  x.fillStyle = INK; x.fillRect(-160, -66, 320, 140); x.fillStyle = '#9a9ab0'; x.fillRect(-152, -58, 304, 124)
  x.restore()
}
// a sign profile card: trait stickered over
function profile(x, t, cx, cy, k, fix) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -190, 300, 400)
  x.fillStyle = INK; x.fillRect(-156, -204, 312, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-148, -196, 296, 392)
  x.fillStyle = GREEN; x.fillRect(-148, -196, 296, 52)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♉︎ TAURUS', 0, -170)
  x.fillStyle = '#140c30'; x.fillRect(-130, -130, 260, 160)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText('known for:', 0, 72)
  x.font = `800 40px ${INTER}`; x.fillText('stubborn', 0, 124)
  if (fix > 0.01) { x.save(); x.translate(0, 124); x.rotate(-0.08); x.scale(fix, fix); x.fillStyle = INK; x.fillRect(-120, -36, 240, 72); x.fillStyle = GOLD; x.fillRect(-114, -30, 228, 60); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.fillText('steady', 0, 2); x.restore() }
  x.restore()
  signChar(x, t, S, cx, cy - 50 * k, 140 * k, { mood: fix > 0.5 ? 'sparkle' : 'neutral', seed: 51, glyph: false, glow: 0.6 })
}

const CAMEOS = [
  { sign: S, cap: 'Your calm | *calms the whole room.*', mood: 'happy', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      stressLine(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 1.5)))
      label(x, 790, 1040, lt > 1.5 ? 'ROOM: CHILL' : 'ROOM: CHAOS', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt > 1.5 ? GREEN : RED, color: lt > 1.5 ? INK : '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your soup | *tastes like a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, R: RED, W: '#ff8a8a' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      steamHeart(x, t, 790, 860, ease.outCubic(prog(lt, 0.7, 1.4)))
      label(x, 790, 1120, 'SECONDS? YES.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'You show up. | *Every single time.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.7],
    front(x, t, lt, P) {
      punchCard(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.4) / 1.2) * 10))
      label(x, 790, 1050, '10 / 10', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 40, bg: GREEN, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You pick | *the perfect gift.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, GIFT, { P: PINK, B: LAV }, 790, 870, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 620, 'how did you | KNOW?!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 8, 200, 0.3)
    } },
  { sign: S, cap: 'Your playlist | *fixes bad days.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: { x: -190 }, hops: [1.2, 1.7],
    front(x, t, lt, P) {
      drawBits(x, TAPE, { K: INK, W: '#fff4e2' }, 790, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      label(x, 790, 790, 'BAD DAY MIX', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'okay, better', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Slow to trust. | *Loyal for life.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.7],
    front(x, t, lt, P) {
      bracelet(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.3) / 1.3) * 12))
      label(x, 790, 1060, 'FRIENDS: YEAR 12', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You never rush | *a good thing.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', star: { x: -200 },
    front(x, t, lt, P) {
      loaf(x, 790, 940, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.3, 1.7)))
      label(x, 790, 620, 'WORTH THE WAIT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04 })
    } },
  { sign: S, cap: 'They say stubborn. | *We say steady.*', mood: lt => lt > 1.4 ? 'sparkle' : 'eyeroll', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 1.3, 0.3, 2.6))
    } },
  { sign: S, cap: 'Anywhere you are | *feels like home.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -120 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      drawBits(x, MAT, { M: '#c96a1a', m: '#a8521a' }, F.x, 1100, 22 * k)
      if (k > 0.5) { x.save(); x.globalAlpha = clamp((k - 0.5) * 2); x.fillStyle = '#fff4e2'; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOME', F.x, 1102); x.restore() }
      label(x, 820, 640, 'WIPE YOUR FEET ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GREEN, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a085', key: 'C', accent: GREEN, solo: S, ending: 'card',
  title: 'Taurus, your gift | *is this.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Steady. Warm. | *A total gift.*', mood: 'heart' },
  lesson: { text: 'Your steady heart | is *the gift.*', chip: 'GIFT: RECEIVED' },
  last: {
    text: 'Came for the soup. | *Stayed forever.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
