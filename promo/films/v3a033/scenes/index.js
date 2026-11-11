// v3a033: star_advice, ADVICE SOLO, "How to love | a Taurus." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love a Taurus, warm and food-forward.
//   0.0–3.6    "How to love | *a Taurus.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              feed them (a big bowl of pasta: STEP 2: FEED AGAIN) · never rush their dessert (cake slice: SLOW. ON PURPOSE.)
//              · same spot every date (RESERVED: US) · a soft sweater says I love you · grow something together (a tomato plant)
//              · don't touch their mug (MINE) · flowers, just because · your charts match? Taurus already knew
//              · loyal forever, earn it slowly (a heart padlock: LOCKED IN)
//  37.8        "Steady love. | *Snacks included.*"  Taurus comes back, big.
//  41.2        callback: "Taurus shared | *one bite.*" (the cake slice from card two, one forkful offered)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2'
const S = 'taurus'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function bowl(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -30, 170, 60, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f5c35a'; x.beginPath(); x.ellipse(0, -36, 156, 54, 0, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#d99a2b'; x.lineWidth = 6
  for (let i = 0; i < 7; i++) { x.beginPath(); x.arc(-90 + i * 30, -40 + (i % 2) * 10, 26, 0.2, 2.6); x.stroke() }
  x.fillStyle = RED; for (const [px, py] of [[-50, -50], [30, -30], [80, -56]]) { x.beginPath(); x.arc(px, py, 16, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-180, -30); x.lineTo(180, -30); x.lineTo(130, 90); x.lineTo(-130, 90); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-170, -24); x.lineTo(170, -24); x.lineTo(124, 82); x.lineTo(-124, 82); x.closePath(); x.fill()
  x.fillStyle = SKYB; x.fillRect(-150, 0, 300, 12)
  x.restore()
  for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.7; x.fillStyle = '#fff'; x.fillRect(cx + (-60 + i * 60) * k + 10 * Math.sin(ph * 8), cy - (110 + ph * 150) * k, 10 * k, 30 * k); x.restore() }
}
const SLICE = [
  '.......WW',
  '.....WWCC',
  '...WWCCCC',
  '.WWCCCCCC',
  'WWWWWWWWW',
  'CCCCCCCCC',
  'PPPPPPPPP',
  'CCCCCCCCC',
]
const SLICE_C = { W: CREAM, C: '#8a4a2e', P: PINK }
function fork(x, cx, cy, k, rot = 0.6) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -20, 20, 170); x.fillRect(-30, -90, 60, 80)
  x.fillStyle = '#dfe7f2'; x.fillRect(-5, -14, 10, 158); x.fillRect(-24, -40, 48, 26)
  for (let i = 0; i < 4; i++) x.fillRect(-24 + i * 14, -84, 6, 46)
  x.restore()
}
function cake(x, cx, cy, k) { drawBits(x, SLICE, SLICE_C, cx, cy, 26 * k); if (k > 0.01) { x.fillStyle = INK; x.fillRect(cx - 150 * k, cy + 110 * k, 300 * k, 18 * k); x.fillStyle = CREAM; x.fillRect(cx - 144 * k, cy + 113 * k, 288 * k, 10 * k) } }
// a cafe table with a tent card
function cafeTable(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 200, 50, 0, 0, Math.PI * 2); x.fill(); x.fillRect(-14, 0, 28, 190); x.fillRect(-80, 180, 160, 22)
  x.fillStyle = WOOD; x.beginPath(); x.ellipse(0, -4, 190, 42, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -20); x.lineTo(-70, -150); x.lineTo(70, -150); x.lineTo(110, -20); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-100, -26); x.lineTo(-64, -142); x.lineTo(64, -142); x.lineTo(100, -26); x.closePath(); x.fill()
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RESERVED', 0, -104); x.font = `800 34px ${INTER}`; x.fillText('US', 0, -60)
  x.restore()
}
const SWEATER = [
  '..SSS..SSS..',
  '.SSSSttSSSS.',
  'SSSSSSSSSSSS',
  'SSS.SSSS.SSS',
  'SS..SpSS..SS',
  'SS..SSSS..SS',
  'SS..SSpS..SS',
  'tt..SSSS..tt',
  '....tttt....',
]
function plant(x, t, cx, cy, k, g) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const H = lerp(20, 240, g)
  x.fillStyle = INK; x.fillRect(-10, -H - 10, 20, H + 10); x.fillStyle = GREEN; x.fillRect(-5, -H - 6, 10, H + 6)
  const leaves = Math.floor(g * 4)
  for (let i = 0; i < leaves; i++) { const ly = -40 - i * 52, d = i % 2 ? 1 : -1; x.fillStyle = INK; x.beginPath(); x.ellipse(d * 40, ly, 44, 20, d * 0.4, 0, Math.PI * 2); x.fill(); x.fillStyle = GREEN; x.beginPath(); x.ellipse(d * 40, ly, 38, 15, d * 0.4, 0, Math.PI * 2); x.fill() }
  if (g > 0.85) for (const [px, py] of [[52, -120], [-46, -180]]) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(px, py, 25, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.fillRect(px - 12, py - 14, 8, 8) }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-100, -10); x.lineTo(100, -10); x.lineTo(76, 120); x.lineTo(-76, 120); x.closePath(); x.fill()
  x.fillStyle = '#c96a3a'; x.beginPath(); x.moveTo(-92, -4); x.lineTo(92, -4); x.lineTo(70, 112); x.lineTo(-70, 112); x.closePath(); x.fill()
  x.fillStyle = '#b05a2e'; x.fillRect(-96, -4, 192, 26)
  x.restore()
}
function mug(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -120, 220, 250); x.fillRect(100, -70, 80, 140)
  x.fillStyle = '#140c30'; x.fillRect(110, -50, 50, 100)
  x.fillStyle = '#7dd87d'; x.fillRect(-100, -110, 200, 230)
  x.fillStyle = '#5ab85a'; x.fillRect(-100, -110, 200, 30)
  x.fillStyle = INK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MINE', 0, 20)
  x.restore()
  for (let i = 0; i < 2; i++) { const ph = (t * 0.6 + i / 2) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.6; x.fillStyle = '#fff'; x.fillRect(cx + (-30 + i * 50) * k + 8 * Math.sin(ph * 8), cy - (150 + ph * 120) * k, 10 * k, 30 * k); x.restore() }
}
const BOUQUET = [
  '.R.Y.P.',
  'RRRYPPP',
  '.R.Y.P.',
  'Y.P.R.Y',
  'YYPPRRR',
  '.G.G.G.',
  '..GGG..',
  '..WWW..',
  '..WWW..',
  '...W...',
]
function lock(x, t, cx, cy, k, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const up = lerp(-60, 0, shut)
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(-70, -20 + up); x.lineTo(-70, -100 + up); x.arc(0, -100 + up, 70, Math.PI, 0); x.lineTo(70, -20 + (shut > 0.9 ? 0 : up)); x.stroke()
  x.strokeStyle = '#dfe7f2'; x.lineWidth = 20; x.beginPath(); x.moveTo(-70, -20 + up); x.lineTo(-70, -100 + up); x.arc(0, -100 + up, 70, Math.PI, 0); x.lineTo(70, -20 + (shut > 0.9 ? 0 : up)); x.stroke()
  x.restore()
  drawBits(x, HEART, { H: GOLD, W: '#fff' }, cx, cy + 60 * k, 30 * k)
  drawBits(x, ['.K.', 'KKK', '.K.', '.K.'], { K: INK }, cx, cy + 50 * k, 12 * k, { outline: null })
}

const CAMEOS = [
  { sign: S, cap: 'Feed them. | *That’s step one.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 1], star: { x: -210 }, hops: [1.1],
    front(x, t, lt, P) {
      bowl(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'STEP 2: FEED AGAIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Never rush | *their dessert.*', mood: lt => lt > 1.0 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cake(x, 780, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      fork(x, 900, 840, pop01(t, P.t0 + 0.5, 0.3, 2), 0.5 + 0.05 * Math.sin(t * 2))
      label(x, 780, 660, 'SLOW. ON PURPOSE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Same spot. | *Every date.*', mood: 'heart', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      cafeTable(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'VISIT #73. PERFECT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A soft sweater | *says “I love you.”*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SWEATER, { S: '#ffb3c8', t: '#e88aa5', p: CREAM }, 770, 900, 25 * k, { rot: 0.04 * Math.sin(t * 2) })
      label(x, 790, 1140, 'SOFTNESS: ILLEGAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Grow something | *together.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -210 }, hops: [1.6],
    front(x, t, lt, P) {
      plant(x, t, 790, 1010, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.4, 1.6)))
      label(x, 790, 620, 'OUR TOMATO', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Don’t touch | *their mug.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mug(x, t, 780, 930, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1140, 'FOR 11 YEARS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Flowers. | *Just because.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BOUQUET, { R: RED, Y: GOLD, P: PINK, G: GREEN, W: '#d9a066' }, 790, 890, 30 * k, { rot: 0.08 })
      if (lt > 1.0) sparkles(x, t, 790, 800, P.t0 + 1.0, 7, 180, 0.4)
      label(x, 790, 1150, 'IT’S A TUESDAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your charts match? | *Taurus knew.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.translate(790, 870); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
      x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.stroke()
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 90, Math.sin(a) * 90); x.lineTo(Math.cos(a) * 150, Math.sin(a) * 150); x.stroke() }
      x.restore()
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 870, 14 * k * (1 + 0.1 * Math.sin(t * 8)))
      label(x, 790, 1110, 'KNEW ON DATE ONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Loyal forever. | *Earn it slowly.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      lock(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 1.2)))
      label(x, 790, 1150, 'LOCKED IN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a033', key: 'F', accent: '#7dd87d', solo: S, ending: 'callback',
  title: 'How to love | *a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Steady love. | *Snacks included.*', mood: 'heart' },
  last: {
    text: 'Taurus shared | *one bite.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, S, 400, 900, 240, { mood: lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], pop: pop01(t, t0 + 0.2, 0.45, 1.8), seed: 9, hops: [t0 + 1.5] })
      cake(x, 700, 1000, pop01(t, t0 + 0.4, 0.35, 2) * 0.8)
      const off = ease.inOutCubic(prog(lt, 0.9, 1.5))
      fork(x, lerp(780, 560, off), lerp(920, 820, off), pop01(t, t0 + 0.6, 0.3, 2), lerp(0.5, -0.9, off))
      if (lt > 1.5) label(x, 540, 1220, 'HISTORIC.', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
