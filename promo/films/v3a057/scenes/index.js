// v3a057: zodiac.advice444, ADVICE SOLO, "Libra, you're | allowed to rest." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to rest, Libra-style, one gag each.
//   0.0–3.6    "Libra, you’re | *allowed to rest.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a badge: PEACEKEEPER, OFF DUTY · a coin flip lands on its edge: IT’S A MAYBE · Aries says "meh.": STILL CUTE
//              · a rack of twelve outfits: OUTFIT: WHATEVER · Sagittarius hosts with a tray: GUEST MODE
//              · the scale tips toward a pillow: TIPPED TOWARD NAPS · a long apology scroll becomes "no.": SHORT VERSION
//              · golden-hour window light: NOTHING. BEAUTIFULLY. · a little plant called MY PEACE, watered
//  37.8        "Grace can | *take a nap.*"  Libra comes back, big.
//  41.2        callback: "The coin? | *Still deciding.*" (the coin from card two, still wobbling on its edge).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ccf', RED = '#e23d4e', WOOD = '#c98f2a', SUN = '#ffcf7a'
const S = 'libra'

// ── props
const PILLOW = ['P..........P', '.PPPPPPPPPP.', '.PWPPPPPPPP.', '.PPPPPPPPPP.', '.PPPPPPPPPP.', 'P..........P']
const PILLOW_C = { P: '#fff4e2', W: '#ffffff' }
const PLANT = [
  '...G..G...',
  '..GGG.GG..',
  '.GGGGGGGG.',
  '..GGGGGG..',
  '....GG....',
  '.TTTTTTTT.',
  '..TTTTTT..',
  '..TTTTTT..',
  '...TTTT...',
]
const PLANT_C = { G: '#5fd068', T: '#c9774a' }
const CAN = ['......S.', '.....S..', 'CCCCCS..', 'CCCCCC..', 'CCCCCC..', 'CCCCCC..']
const CAN_C = { C: SKYB, S: '#c9c9d8' }

function badge(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffe9a8'; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PEACE-', 0, -32); x.fillText('KEEPER', 0, -6)
  x.font = `800 26px ${INTER}`; x.fillStyle = RED; x.fillText('OFF DUTY', 0, 36)
  x.restore()
}
// a coin standing on its edge, wobbling
function coin(x, t, cx, cy, k, edge, flip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const sx = edge ? 0.3 + 0.06 * Math.sin(t * 9) : Math.abs(Math.cos(flip * 14))
  x.rotate(edge ? 0.12 * Math.sin(t * 6) : 0)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 92 * Math.max(0.14, sx), 92, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 82 * Math.max(0.1, sx), 82, 0, 0, Math.PI * 2); x.fill()
  if (sx > 0.5) { x.fillStyle = '#c99a2e'; x.font = `800 70px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, 4) }
  x.restore()
}
function rack(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -200, 380, 16); x.fillRect(-190, -200, 14, 380); x.fillRect(176, -200, 14, 380); x.fillRect(-220, 170, 120, 14); x.fillRect(100, 170, 120, 14)
  const cols = [ROSE, SKYB, MINT, GOLD, LAV, RED, '#ffb38a', '#7a6cd8', PINK, '#5fe0d4', '#fff4e2', '#9fe08a']
  cols.forEach((c, i) => {
    const px = -160 + i * 29
    x.fillStyle = INK; x.fillRect(px - 2, -186, 4, 20)
    x.fillStyle = INK; x.fillRect(px - 15, -168, 30, 150 + (i % 3) * 20)
    x.fillStyle = c; x.fillRect(px - 11, -164, 22, 142 + (i % 3) * 20)
  })
  x.restore()
}
function tray(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 120, 26, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.ellipse(0, -4, 112, 20, 0, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-70 + i * 50, -60, 34, 50); x.fillStyle = [ROSE, MINT, SUN][i]; x.fillRect(-66 + i * 50, -56, 26, 42) }
  x.restore()
}
function scaleTipped(x, cx, cy, k, tip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -100, 28, 260); x.fillRect(-90, 150, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -94, 16, 250); x.fillRect(-84, 154, 168, 16)
  const ang = lerp(0, 0.32, tip)
  const ends = [-170, 170].map(px => [px * Math.cos(ang), -100 + px * Math.sin(ang)])
  x.save(); x.translate(0, -100); x.rotate(ang)
  x.fillStyle = INK; x.fillRect(-184, -12, 368, 24); x.fillStyle = GOLD; x.fillRect(-178, -6, 356, 12)
  x.restore()
  for (const [px, py] of ends) {
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 56, py + 100); x.moveTo(px, py); x.lineTo(px + 56, py + 100); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.ellipse(px, py + 104, 72, 20, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.ellipse(px, py + 102, 66, 15, 0, 0, Math.PI * 2); x.fill()
  }
  // the pillow sits on the right (heavier) pan; a tiny to-do note on the left
  drawBits(x, PILLOW, PILLOW_C, ends[1][0], ends[1][1] + 74, 10)
  x.fillStyle = INK; x.fillRect(ends[0][0] - 26, ends[0][1] + 62, 52, 36); x.fillStyle = '#fff27a'; x.fillRect(ends[0][0] - 22, ends[0][1] + 66, 44, 28)
  x.fillStyle = INK; x.font = `700 14px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TO-DO', ends[0][0], ends[0][1] + 80)
  x.restore()
}
function scroll(x, cx, cy, k, cut) {
  if (k <= 0.01) return
  const h = lerp(460, 90, cut)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -h / 2 - 6, 300, h + 12)
  x.fillStyle = '#fffaf0'; x.fillRect(-142, -h / 2, 284, h)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (cut < 0.5) {
    const lines = ['i’m SO sorry,', 'it’s just that,', 'and normally i', 'would love to,', 'but this week,', 'and also my', 'cousin’s cat…']
    lines.forEach((l, i) => { const y = -h / 2 + 40 + i * 60; if (y < h / 2 - 20) x.fillText(l, 0, y) })
  } else { x.font = `800 56px ${INTER}`; x.fillText('no. :)', 0, 2) }
  x.fillStyle = WOOD; x.fillRect(-160, -h / 2 - 20, 320, 22); x.fillRect(-160, h / 2 - 2, 320, 22)
  x.restore()
}
function sunWindow(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.3 * clamp(k); x.fillStyle = SUN
  x.beginPath(); x.moveTo(cx - 120, cy - 150); x.lineTo(cx + 120, cy - 150); x.lineTo(cx - 140, cy + 380); x.lineTo(cx - 520, cy + 380); x.closePath(); x.fill()
  x.restore()
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -170, 280, 340)
  x.fillStyle = '#ffb38a'; x.fillRect(-128, -158, 256, 316)
  x.fillStyle = SUN; x.beginPath(); x.arc(0, 40, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff8a6a'; x.fillRect(-128, 70, 256, 88)
  x.fillStyle = INK; x.fillRect(-6, -158, 12, 316); x.fillRect(-128, -6, 256, 12)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You don’t have to | *keep the peace today.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) { badge(x, 790, 860, 1.35 * pop01(t, P.t0 + 0.3, 0.35, 2.2), -0.08 + 0.05 * Math.sin(t * 2)); sparkles(x, t, 790, 860, P.t0 + 0.6, 8, 190, 0.2) } },
  { sign: S, cap: '“I don’t know yet” | *is an answer.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, -1], star: { x: -220 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fl = prog(lt, 0.3, 1.1)
      coin(x, t, 790, lerp(1000, 930, fl) - Math.sin(Math.PI * fl) * 240, 1.4 * pop01(t, P.t0 + 0.2, 0.3, 2), fl >= 1, fl)
      label(x, 790, 1130, 'IT’S A MAYBE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not everyone | *has to like you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 810, 990, 190 * k, { mood: 'eyeroll', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 690, 'meh.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bc', col: '#ffb38a' })
      label(x, 420, 640, 'STILL CUTE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.05 })
    } },
  { sign: S, cap: 'Skip the outfit | *crisis tonight.*', mood: 'sleepy', look: [1, 0], star: { x: -230, y: 30 },
    back(x, t, lt, P) { rack(x, 780, 880, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) { label(x, 780, 1110, 'OUTFIT: WHATEVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 }) } },
  { sign: S, cap: 'Let someone else | *host this time.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), walk = ease.inOutCubic(prog(lt, 0.3, 0.9))
      if (k > 0.01) signChar(x, t, 'sagittarius', lerp(940, 790, walk), 1000, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 22, glyph: false })
      tray(x, lerp(940, 760, walk), 860, k)
      label(x, 780, 660, 'GUEST MODE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Your scale can | *tip toward naps.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -240 }, hops: [],
    front(x, t, lt, P) {
      scaleTipped(x, 730, 900, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 0.8, 1.3)))
      label(x, 730, 620, 'TIPPED. ON PURPOSE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say no | *without the speech.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, 0], star: { x: -230 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      scroll(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.2)))
      label(x, 790, 1130, 'SHORT VERSION', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sit in pretty light. | *Do nothing.*', mood: 'sleepy', look: [1, -1], star: { x: -200, y: 40 },
    back(x, t, lt, P) { sunWindow(x, t, 800, 760, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) { label(x, 760, 1110, 'NOTHING. BEAUTIFULLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SUN, rot: -0.03, font: MONO, weight: 700 }) } },
  { sign: S, cap: 'Your peace | *needs watering too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 800, 990, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const c = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, CAN, CAN_C, 640, 800, 24 * c, { rot: lt > 0.9 ? 0.4 : 0 })
      if (lt > 0.9 && lt < 1.9) { x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = (t * 2 + i / 6) % 1; x.fillRect(720 + i * 6, 820 + ph * 90, 8, 16) } }
      label(x, 800, 1140, 'MY PEACE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.6) sparkles(x, t, 800, 900, P.t0 + 1.65, 6, 140, 0.2)
    } },
]

const F = makeFilm({
  id: 'v3a057', key: 'E', accent: ROSE, solo: S, ending: 'callback',
  title: 'Libra, you’re | *allowed to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Grace can | *take a nap.*', mood: 'sleepy' },
  last: {
    text: 'The coin? | *Still deciding.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.4, 0.4, 2)
      coin(x, t, 540, 1060, k * 2.0, true, 1)
      if (lt > 1.2) label(x, 540, 1300, 'NO RUSH', pop01(lt, 1.2, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
