// r2t0196: star_talk, SOLO, "Leos shopping | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (solo mode, 9 cards): Leo goes shopping, every trip pushed to the most extreme Leo version.
//   0.0–3.6    "Leos shopping | *be like.*"
//   3.6–37.8   nine cards: fitting room limit 6, Leo brought 40 · went in for socks, left with a cape · the sale rack?
//              doesn't know her · aisle seven is a runway · one compliment, every colour · asked your opinion, already paid
//              · shoes approved by their birth chart · the receipt is floor length · got you a gift: it's their face
//  37.8        "Retail therapy? | *Retail royalty.*"
//  41.2        CALLBACK: "Two days later: | *still printing.*"  the floor-length receipt is back, still coming.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', S = 'leo'

// ── props
const JACKET = [
  '..JJ..JJ..',
  '.JJJJJJJJ.',
  'JJJJWWJJJJ',
  'JJ.JWWJ.JJ',
  'JJ.JJJJ.JJ',
  'JJ.JJJJ.JJ',
  '...JJJJ...',
  '...JJJJ...',
]
const SHOE = [
  '......GG..',
  '.....GGGG.',
  'GGGGGGGGGG',
  'GGGGGGGGGG',
  'KKKKKKKKKK',
]
const SHIRT = [
  'TTT....TTT',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
  '.TTTTTTTT.',
  '..TTTTTT..',
  '..TTTTTT..',
  '..TTTTTT..',
  '..TTTTTT..',
]
function box(x, cx, cy, w, h, k, fillC, { rot = 0 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
// a fitting-room curtain with an item counter
function fittingRoom(x, t, cx, cy, k, lt) {
  if (!box(x, cx, cy, 300, 400, k, '#2a2350')) return
  for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#b8243a' : RED; x.fillRect(-150 + i * 50, -170, 50, 370 + Math.sin(t * 3 + i) * 6) }
  x.fillStyle = GOLD; x.fillRect(-160, -200, 320, 20)
  x.restore()
}
// a long paper receipt hanging from y0, len px long
function receipt(x, cx, y0, len, { w = 150, scroll = 0 } = {}) {
  x.save()
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, y0 - 6, w + 12, len + 12)
  x.fillStyle = '#fbf7ee'; x.fillRect(cx - w / 2, y0, w, len)
  x.beginPath(); x.rect(cx - w / 2, y0, w, len); x.clip()
  x.fillStyle = '#b9b0a0'
  for (let y = y0 + 20 - (scroll % 34); y < y0 + len; y += 34) { x.fillRect(cx - w / 2 + 16, y, w * 0.45, 8); x.fillRect(cx + w / 2 - 46, y, 30, 8) }
  x.restore()
  // torn zigzag bottom
  x.fillStyle = '#fbf7ee'
  for (let i = 0; i < w / 15; i++) { x.beginPath(); x.moveTo(cx - w / 2 + i * 15, y0 + len); x.lineTo(cx - w / 2 + i * 15 + 7.5, y0 + len + 10); x.lineTo(cx - w / 2 + i * 15 + 15, y0 + len); x.fill() }
}
// a little birth-chart wheel
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 126, 0, 7); x.fill()
  x.fillStyle = '#fbf7ee'; x.beginPath(); x.arc(0, 0, 118, 0, 7); x.fill()
  x.strokeStyle = '#6b62a8'; x.lineWidth = 3
  x.beginPath(); x.arc(0, 0, 84, 0, 7); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.2; x.beginPath(); x.moveTo(Math.cos(a) * 84, Math.sin(a) * 84); x.lineTo(Math.cos(a) * 118, Math.sin(a) * 118); x.stroke() }
  x.strokeStyle = ORANGE; x.lineWidth = 4
  x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(10, -64); x.closePath(); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Fitting room limit: 6. | Leo brought *forty.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      fittingRoom(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const n = Math.max(1, Math.round(lerp(1, 40, clamp((lt - 0.4) / 1.4))))
      label(x, 790, 640, `ITEMS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'LIMIT: 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Went in for socks. | Left with *a cape.*', mood: 'sparkle', star: { x: -150 }, hops: [1.2],
    back(x, t, lt, P, F) {
      const k = clamp((lt - 0.7) / 0.5)
      if (k <= 0.01) return
      const w = Math.sin(t * 4) * 18
      x.save(); x.globalAlpha = k
      const pts = [[F.x - 70, F.cy - 70], [F.x + 70, F.cy - 70], [F.x + 190 + w, F.cy + 220], [F.x - 190 + w * 0.6, F.cy + 220]]
      x.fillStyle = INK; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a + Math.sign(a - F.x) * 8, b + 8) : x.moveTo(a - 8, b - 8)); x.closePath(); x.fill()
      x.fillStyle = RED; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath(); x.fill()
      x.fillStyle = GOLD; x.fillRect(F.x - 70, F.cy - 78, 140, 14)
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 800, 700, 'SOCKS BOUGHT: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 880, P.t0 + 1.2, 7, 220, 0.5)
    } },
  { sign: S, cap: 'The sale rack? | Leo *doesn’t know her.*', mood: lt => lt > 1.0 ? 'eyeroll' : 'neutral', look: [-1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 12); x.fillRect(-150, -150, 12, 330); x.fillRect(138, -150, 12, 330)
        for (let i = 0; i < 5; i++) drawBits(x, JACKET, { J: ['#8a8aa0', '#9aa5c4', '#a8742a', '#6b62a8', '#7d8a7a'][i], W: '#d8dbe8' }, -112 + i * 56, -50, 10, { rot: 0.05 * Math.sin(i) })
        x.restore()
      }
      label(x, 790, 690, 'SALE', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 52, bg: RED, color: '#fff4e2', rot: -0.06 })
      bubble(x, 380, 620, 'who?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Aisle seven is | a *runway* now.', mood: 'sparkle', look: [1, 0], star: { x: -150 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P, F) {
      const k = clamp((lt - 0.2) / 0.4)
      x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(F.x - 40, 470); x.lineTo(F.x + 40, 470); x.lineTo(F.x + 210, 1180); x.lineTo(F.x - 210, 1180); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 720, 'NOW WALKING:', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 800, 'LEO', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 60, bg: ORANGE, rot: 0.03 })
      for (let i = 0; i < 3; i++) sparkles(x, t, 700 + i * 90, 1000 - (i % 2) * 90, P.t0 + 1.0 + i * 0.35, 6, 70, i)
      bubble(x, 800, 1070, 'aisle 7: cereal', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'One compliment. | Bought *every colour.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 780, 620, 'cute jacket!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      const cols = [ORANGE, PINK, MINT, SKYB, LAV, GOLD]
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.8 + i * 0.12, 0.3, 2.2); if (k > 0.01) drawBits(x, JACKET, { J: cols[i], W: '#fff4e2' }, 680 + (i % 3) * 110, 840 + Math.floor(i / 3) * 140, 10 * k, { rot: (i % 2 ? 0.08 : -0.08) }) }
      label(x, 790, 1130, 'ALL SIX, PLEASE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked your opinion. | *Already paid.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'thoughts?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(800, 900); x.rotate(0.06); x.scale(k, k); receipt(x, 0, -140, 280, { w: 190 }); x.restore() }
      label(x, 800, 1080, 'PAID ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Shoes approved by | *their birth chart.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      chart(x, t, 790, 770, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, SHOE, { G: GOLD, K: INK }, 790, 1000, 20 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 790, 1120, 'SHOES: VERY LEO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The receipt? | *Floor length.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 1], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const len = lerp(40, 720, ease.outCubic(clamp((lt - 0.3) / 1.6)))
      if (lt > 0.25) {
        x.fillStyle = INK; x.fillRect(690, 500, 220, 70); x.fillStyle = '#9aa5c4'; x.fillRect(698, 508, 204, 54)
        receipt(x, 800, 570, Math.min(len, 630), { w: 150, scroll: lt * 80 })
      }
      label(x, 600, 1120, 'STILL PRINTING', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got you a gift. | It’s *their face.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        drawBits(x, SHIRT, { T: '#fff4e2' }, 790, 880, 32 * k)
        signChar(x, t, 'leo', 790, 900, 150 * k, { mood: 'wink', seed: 71, glyph: false, glow: 0.3, bob: 0 })
      }
      label(x, 790, 640, 'FOR YOU!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: PINK, rot: 0.05 })
      label(x, 790, 1130, 'SIZE: LEO', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0196', key: 'C', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Leos shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Retail therapy? | *Retail royalty.*', mood: 'sparkle' },
  last: {
    text: 'Two days later: | *still printing.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = clamp((lt - 0.3) / 0.4)
      if (k > 0.01) {
        x.save(); x.globalAlpha = k
        x.fillStyle = INK; x.fillRect(390, 640, 300, 80); x.fillStyle = '#9aa5c4'; x.fillRect(398, 648, 284, 64)
        receipt(x, 540, 720, lerp(200, 900, ease.outCubic(clamp((lt - 0.3) / 3))), { w: 200, scroll: lt * 120 })
        x.restore()
      }
      const s = pop01(t, t0 + 0.9, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'leo', 780, 1380, 230 * s, { mood: lt > 2 ? 'wink' : 'sparkle', look: [-1, -1], seed: 44, hops: [t0 + 1.8] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
