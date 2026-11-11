// v3a018: zodiac.advice444, ADVICE SOLO, "Scorpio, your gift | is this." (~51 s vertical, signs3kit social cut, lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the deep, loyal gifts of a Scorpio, one gag each.
//   0.0–3.6    "Scorpio, your gift | *is this.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              secrets go in the vault · loyalty with no expiry date (a carton: BEST BEFORE: NEVER) · notices when
//              someone's off (magnifying glass on a teary Pisces: "you okay?") · goes deep in every chat (diving helmet)
//              · protects their people (velvet rope: VIP: MY FRIENDS) · transforms: the old self left behind, retired
//              · intuition on a new match (crystal ball: "they're kind") · intense, also soft (sunglasses + a teddy)
//              · forgives on their own time (an hourglass: VALID)
//  37.8        "Deep waters. | *Warm heart.*"  Scorpio comes back, big.
//  41.2        CALLBACK ending: "Pisces cried. | Scorpio *stayed.*"  The teary Pisces from the "you okay?" card, Scorpio right beside.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#c46bff', RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ffb34a'
const S = 'scorpio'

// ── props
const GLASSES = ['KKKKK.KKKKK', 'KKKKKKKKKKK', 'KKKKK.KKKKK', '.KKK...KKK.']
const TEDDY = [
  'BB.....BB',
  'BBBBBBBBB',
  '.BBKBKBB.',
  '.BBBpBBB.',
  '..BBBBB..',
  '.BBBBBBB.',
  'BBBbbbBBB',
  'BBBbbbBBB',
  '.BBBBBBB.',
  '.BB...BB.',
]
const TEDDY_C = { B: '#c08a4e', b: '#e7c08a', K: INK, p: PINK }
const GLASS = [
  '..KKKK....',
  '.K....K...',
  'K......K..',
  'K......K..',
  'K......K..',
  '.K....K...',
  '..KKKKKK..',
  '.......KK.',
  '........KK',
  '.........K',
]

// a round vault door, its wheel spinning shut
function vault(x, cx, cy, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340)
  x.fillStyle = '#6b7088'; x.fillRect(-162, -162, 324, 324)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9aa0b8'; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9cde0'; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; x.fillRect(Math.cos(a) * 112 - 8, Math.sin(a) * 112 - 8, 16, 16) }
  x.rotate(spin * Math.PI * 2)
  x.fillStyle = INK; for (let i = 0; i < 3; i++) { x.save(); x.rotate(i * Math.PI / 3); x.fillRect(-84, -9, 168, 18); x.restore() }
  x.fillStyle = GOLD; for (let i = 0; i < 3; i++) { x.save(); x.rotate(i * Math.PI / 3); x.fillRect(-78, -4, 156, 8); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a carton with an expiry stamp
function carton(x, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-104, -120); x.lineTo(0, -196); x.lineTo(104, -120); x.lineTo(104, 180); x.lineTo(-104, 180); x.closePath(); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.moveTo(-96, -116); x.lineTo(0, -186); x.lineTo(96, -116); x.lineTo(96, 172); x.lineTo(-96, 172); x.closePath(); x.fill()
  x.fillStyle = PURPLE; x.fillRect(-96, -60, 192, 110)
  x.fillStyle = '#fff4e2'; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOYALTY', 0, -6)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('BEST BEFORE:', 0, 92)
  if (stamp > 0.01) { x.save(); x.translate(0, 130); x.rotate(-0.12); x.scale(stamp, stamp); x.fillStyle = RED; x.font = `800 40px ${INTER}`; x.fillText('NEVER', 0, 0); x.restore() }
  x.restore()
}
// a brass diving helmet over the star's head
function helmet(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.lineWidth = 64; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 154, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 50; x.strokeStyle = '#d8a24a'; x.beginPath(); x.arc(0, 0, 154, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(143,227,255,0.18)'; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-80, -90, 24, 56)
  x.fillStyle = '#b5802f'; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; x.beginPath(); x.arc(Math.cos(a) * 152, Math.sin(a) * 152, 10, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function bubblesUp(x, t, cx, cy) {
  for (let i = 0; i < 6; i++) {
    const ph = (t * 0.8 + i / 6) % 1
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.strokeStyle = SKYB; x.lineWidth = 4
    x.beginPath(); x.arc(cx + Math.sin(i * 2.1 + t * 3) * 30, cy - ph * 300, 8 + (i % 3) * 5, 0, Math.PI * 2); x.stroke(); x.restore()
  }
}
// brass posts and a velvet rope
function rope(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  for (const px of [560, 980 - 40]) { x.fillStyle = INK; x.fillRect(px - 14, 900, 28, 230); x.fillStyle = GOLD; x.fillRect(px - 8, 906, 16, 218); x.beginPath(); x.arc(px, 900, 22, 0, Math.PI * 2); x.fill() }
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(560, 920); x.quadraticCurveTo(750, 1040, 940, 920); x.stroke()
  x.strokeStyle = RED; x.lineWidth = 14; x.beginPath(); x.moveTo(560, 920); x.quadraticCurveTo(750, 1040, 940, 920); x.stroke()
  x.restore()
}
// a crystal ball on a stand with a little message inside
function crystal(x, t, cx, cy, k, msg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, 110, 180, 60); x.fillStyle = WOOD; x.fillRect(-82, 116, 164, 48)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 142, 0, Math.PI * 2); x.fill()
  const g = x.createRadialGradient(-30, -40, 10, 0, 0, 136); g.addColorStop(0, '#f0dcff'); g.addColorStop(1, '#7a4ac9')
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, 134, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-80, -84, 22, 46)
  if (msg > 0.01) {
    x.globalAlpha = clamp(msg); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('they’re', 0, -18); x.fillText('kind ✦', 0, 22)
  }
  x.restore()
}
// an hourglass, sand draining slowly
function hourglass(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -190, 220, 26); x.fillRect(-110, 164, 220, 26)
  x.fillStyle = WOOD; x.fillRect(-104, -186, 208, 18); x.fillRect(-104, 168, 208, 18)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-92, -164); x.lineTo(92, -164); x.lineTo(14, 0); x.lineTo(92, 164); x.lineTo(-92, 164); x.lineTo(-14, 0); x.closePath(); x.fill()
  x.fillStyle = '#e9f6ff'; x.beginPath(); x.moveTo(-84, -158); x.lineTo(84, -158); x.lineTo(8, 0); x.lineTo(84, 158); x.lineTo(-84, 158); x.lineTo(-8, 0); x.closePath(); x.fill()
  const top = 1 - 0.35 * p, bot = 0.2 + 0.35 * p
  x.fillStyle = GOLD
  x.beginPath(); x.moveTo(-70 * top, -20 - 120 * top); x.lineTo(70 * top, -20 - 120 * top); x.lineTo(6, -6); x.lineTo(-6, -6); x.closePath(); x.fill()
  x.beginPath(); x.moveTo(-80, 158); x.lineTo(80, 158); x.lineTo(0, 158 - 140 * bot); x.closePath(); x.fill()
  x.fillRect(-2, -6, 4, 160)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Your secrets | *are safe with me.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vault(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 1.5)))
      label(x, 790, 1100, 'LOCKED FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your loyalty | *never expires.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      carton(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 1.1, 0.3, 2.6))
      sparkles(x, t, 790, 990, P.t0 + 1.2, 6, 140, 0.4)
    } },
  { sign: S, cap: 'You notice | *when someone’s off.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 820, 990, 180 * k, { mood: lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], seed: 15, glyph: false, tears: lt > 1.6 ? 1 : 2 })
      drawBits(x, GLASS, { K: INK }, 610, 880, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.2 })
      bubble(x, 560, 640, 'hey. | you okay?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'You go deep | *in every chat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: -10, y: 0, s: 230 }, hops: [1.3],
    back(x, t, lt, P) { x.fillStyle = 'rgba(40,90,170,0.25)'; x.fillRect(110, 480, 860, 740) },
    front(x, t, lt, P, F) {
      helmet(x, F.x, F.cy - 10, pop01(t, P.t0 + 0.3, 0.35, 2))
      bubblesUp(x, t, F.x + 60, F.cy - 160)
      label(x, 540, 1130, 'DEPTH: MAXIMUM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You protect | *your people.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 750, 820, 170 * k, { mood: 'heart', seed: 16, glyph: false, hops: [P.t0 + 1.4] })
      rope(x, pop01(t, P.t0 + 0.5, 0.3, 1.6))
      label(x, 750, 610, 'VIP: MY FRIENDS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You transform. | *Every single time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [-1, 0], star: { x: lt => 0 },
    front(x, t, lt, P) {},
  },
  { sign: S, cap: 'Your gut feeling? | *Usually right.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      crystal(x, t, 780, 830, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.8, 1.3))
      label(x, 780, 1100, 'INTUITION: CORRECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 830, P.t0 + 1.1, 7, 190, 0.5)
    } },
  { sign: S, cap: 'Intense? | *Also very soft.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', star: { x: -150 },
    front(x, t, lt, P, F) {
      drawBits(x, GLASSES, { K: INK }, F.x, F.cy - 10, 14 * pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.2 ? 0 : 1))
      drawBits(x, TEDDY, TEDDY_C, F.x + 170, F.cy + 70, 12 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.1 })
      label(x, 760, 640, 'TOUGH. TEDDY. BOTH.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, F.x + 120, F.cy, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'You forgive | *in your own time.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      hourglass(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.3, 2.4))
      label(x, 790, 1110, 'TIMELINE: VALID', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]
// card 6: the old self (a grey, faded outline) stays where it was; the new Scorpio steps out, glowing
CAMEOS[5] = { sign: S, cap: 'You transform. | *Every single time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hideStar: true,
  front(x, t, lt, P) {
    const k = pop01(t, P.t0 + 0.05, 0.45, 1.8), step = ease.inOutCubic(prog(lt, 0.6, 1.3))
    signChar(x, t, S, 370, 880, 300 * k, { mood: 'neutral', alpha: lerp(1, 0.25, step), seed: 3, glyph: false, glow: lerp(1, 0, step) })
    if (step > 0) signChar(x, t, S, lerp(370, 720, step), 880, 300 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 4, hops: [P.t0 + 1.8] })
    label(x, 370, 1140, 'OLD ME: RETIRED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    if (step >= 1) sparkles(x, t, 720, 880, P.t0 + 1.3 * 1.29, 8, 200, 0.4)
  } }

const F = makeFilm({
  id: 'v3a018', key: 'F', accent: PURPLE, solo: S,
  title: 'Scorpio, your gift | *is this.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Deep waters. | *Warm heart.*', mood: 'heart' },
  last: {
    text: 'Pisces cried. | Scorpio *stayed.*',
    draw(x, t, lt) {
      const t0 = t - lt, a = pop01(t, t0 + 0.3, 0.4, 1.8), b = pop01(t, t0 + 0.45, 0.4, 1.8)
      if (b > 0.01) signChar(x, t, 'pisces', 720, 1150, 360 * b, { mood: lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], seed: 84, glyph: false, tears: lt > 1.6 ? 1 : 3 })
      if (a > 0.01) signChar(x, t, S, 360, 1150, 360 * a, { mood: 'heart', look: [1, 0], seed: 85, glyph: false })
      bubble(x, 380, 840, 'not going | anywhere.', pop01(t, t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bc' })
      hearts(x, t, 540, 1100, t0 + 1.4, { n: 6, life: 2.0, spread: 380, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
