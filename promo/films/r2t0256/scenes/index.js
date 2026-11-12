// r2t0256: star_talk, SOLO, "Leos on a trip | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): Leo on holiday, every moment pushed to the most extreme.
//   0.0–3.6    "Leos on a trip | *be like.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              two-night trip, three suitcases · walked the airport like a runway · sunglasses on the plane, at night
//              · tour guide paused, Leo took questions · cloudy beach day, Leo was the sun · one photo of the view, take 47
//              · luggage lost, still served looks · souvenir: a statue of themself · back home, planning the sequel
//  37.8        "Not a trip. | A *world tour.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Travel with a Leo. | Every day *shines.*"  TRIP: LEGENDARY
//  46.9        "Next stop? | *Center stage.*"  The three suitcases come back, sparkling.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2'
const S = 'leo'

// ── props
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'CCCCCCCCCC',
  'CcCCCCCCcC',
  'CcCCCCCCcC',
  'CcCCCCCCcC',
  'CcCCCCCCcC',
  'CcCCCCCCcC',
  'CCCCCCCCCC',
  '.K......K.',
]
const CAMERA = [
  '..KKK.......',
  'BBBBBBBBBBBB',
  'BBBBGGGGBBBB',
  'BBBGWWGGGBBB',
  'BBBGWGGGGBRB',
  'BBBGGGGGGBBB',
  'BBBBGGGGBBBB',
  'BBBBBBBBBBBB',
]
const CAMERA_C = { K: '#4a4270', B: '#2a2350', G: '#6b62a8', W: '#ffffff', R: RED }
const FLAG = [
  'PFFFFFF',
  'PFFFFFF',
  'PFFFFF.',
  'PFFFF..',
  'P......',
  'P......',
  'P......',
  'P......',
  'P......',
  'P......',
]
const CLOUD = ['...WWW.....', '..WWWWW.WW.', '.WWWWWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.']
const CLOUD_C = { W: '#9a98b8' }
const PEDESTAL = ['GGGGGGGGGGGG', '.gggggggggg.', '.gggggggggg.', '.gggggggggg.', 'GGGGGGGGGGGG']
const MOON = ['..MMM.', '.MM...', 'MM....', 'MM....', 'MM....', '.MM...', '..MMM.']

// sunglasses on the star's face (sprite cells: eyes at (13.4, 19.2) and (22.6, 19.2))
function shades(x, F, k) {
  if (k <= 0.01) return
  inSprite(x, F, () => {
    x.save(); x.translate(18, 19 - (1 - k) * 12); x.globalAlpha = clamp(k * 1.5)
    x.fillStyle = INK; x.fillRect(-10.5, -3.6, 21, 1.4)
    x.fillRect(-9.6, -3.2, 8.4, 6.6); x.fillRect(1.2, -3.2, 8.4, 6.6)
    x.fillStyle = '#ffffff'; x.fillRect(-8.4, -2.2, 1.6, 1.2); x.fillRect(2.4, -2.2, 1.6, 1.2)
    x.restore()
  })
}
// a phone, face up: a header and up to three chips
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a red carpet running back into the panel
function carpet(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(470, 640); x.lineTo(610, 640); x.lineTo(800, 1180); x.lineTo(280, 1180); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(480, 650); x.lineTo(600, 650); x.lineTo(784, 1172); x.lineTo(296, 1172); x.closePath(); x.fill()
  x.fillStyle = '#ff6f7e'; x.fillRect(536, 660, 8, 500)
  x.restore()
}
// camera flashes popping round the panel edges
function flashes(x, t, t0, pts) {
  pts.forEach(([px, py], i) => {
    const ph = ((t - t0) * 2.2 + i * 0.37) % 1
    if (t < t0 + i * 0.12 || ph > 0.35) return
    const a = 1 - ph / 0.35
    x.save(); x.globalAlpha = a; x.fillStyle = '#fffbe8'
    x.beginPath(); x.arc(px, py, 26 + 30 * ph, 0, Math.PI * 2); x.fill()
    x.fillRect(px - 60 * a, py - 3, 120 * a, 6); x.fillRect(px - 3, py - 60 * a, 6, 120 * a)
    x.restore()
  })
}
// sun rays fanning out behind the star
function rays(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.4); x.globalAlpha = 0.85 * clamp(k)
  for (let i = 0; i < 12; i++) {
    x.rotate(Math.PI / 6)
    x.fillStyle = i % 2 ? GOLD : ORANGE
    x.fillRect(150 * k, -12, 90 * k, 24)
  }
  x.restore()
}
// an airport luggage belt, going round with nothing on it
function belt(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-210, -40, 420, 80)
  x.fillStyle = '#4a4270'; x.fillRect(-202, -32, 404, 64)
  x.fillStyle = '#6b62a8'
  for (let i = 0; i < 8; i++) { const px = -202 + ((i * 56 + t * 90) % 404); x.fillRect(px, -32, 10, 64) }
  x.restore()
}

const SUIT_COLS = [{ C: ORANGE, c: '#c97a2a', K: INK }, { C: GOLD, c: '#c98f2a', K: INK }, { C: PINK, c: '#c95f86', K: INK }]
function suitcases(x, t, cx, cy, t0, cell = 15) {
  ;[[0, 0], [-1, 1], [1, 1]].reverse().forEach(([dx, row], j) => {
    const i = 2 - j
    const k = pop01(t, t0 + i * 0.25, 0.3, 2.2)
    drawBits(x, SUITCASE, SUIT_COLS[i], cx + dx * cell * 6.2, cy - (1 - row) * cell * 10.6, cell * k, { rot: dx * 0.06 })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Two-night trip. | Packed *three suitcases.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      suitcases(x, t, 790, 930, P.t0 + 0.25)
      label(x, 790, 620, '2 NIGHTS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 410, 640, 'the essentials', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Walked the airport | like a *runway.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: 0, y: 30, s: 280 }, hops: [0.7, 1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { carpet(x, pop01(t, P.t0 + 0.05, 0.35, 1.6)) },
    front(x, t, lt, P) {
      label(x, 540, 600, 'GATE 12', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      if (lt > 0.8) flashes(x, t, P.t0 + 1.0, [[260, 760], [820, 720], [250, 1040], [830, 1010]])
      label(x, 540, 1140, 'DELAYED: ON PURPOSE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sunglasses on the plane. | At *night.*', mood: 'happy', star: { x: -150 }, hops: [1.3],
    front(x, t, lt, P, F) {
      shades(x, F, ease.outCubic(prog(lt, 0.5, 0.9)))
      drawBits(x, MOON, { M: CREAM }, 810, 700, 18 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 800, 880, '11:48 PM', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'the glare, | darling', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Tour guide paused. | Leo *took questions.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, FLAG, { P: BONE, F: ORANGE }, F.x + 150, F.cy - 120, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.08 * Math.sin(t * 3) })
      ;['taurus', 'pisces', 'gemini'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.6 + i * 0.15, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 640 + i * 110, 1060 - (i % 2) * 30, 120 * k, { mood: id === 'pisces' ? 'wide' : 'happy', look: [-1, -1], seed: 40 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 })
      })
      bubble(x, 790, 640, 'any questions?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Cloudy beach day. | Leo *was the sun.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [0, -1], star: { x: 0, y: 20, s: 280 },
    back(x, t, lt, P, F) { rays(x, t, F.x, F.cy, ease.outBack(prog(lt, 0.9, 1.4))) },
    front(x, t, lt, P) {
      const part = ease.inOutCubic(prog(lt, 0.8, 1.6))
      drawBits(x, CLOUD, CLOUD_C, lerp(420, 230, part), 650, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CLOUD, CLOUD_C, lerp(680, 860, part), 700, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: -1 })
      label(x, 540, 1150, 'FORECAST: LEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One photo of the view. | *Take 47.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 46)
      label(x, 800, 650, `TAKE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 0.5) flashes(x, t, P.t0 + 0.5, [[800, 880]])
      bubble(x, 800, 1110, 'one more angle', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Luggage lost. | *Still served looks.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      belt(x, t, 770, 1010, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 860, 'BAG: ???', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'I am | the outfit', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.3, 8, 190, 0.4)
    } },
  { sign: S, cap: 'The souvenir? | A statue *of themself.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, PEDESTAL, { G: GOLD, g: '#c98f2a' }, 800, 1060, 18 * k)
      if (k > 0.01) {
        x.save(); x.filter = 'sepia(1) saturate(3) hue-rotate(-12deg) brightness(1.05)'
        signChar(x, t, S, 800, 900, 210 * k, { mood: 'sparkle', seed: 91, glyph: false, glow: 0.6, bob: 0, look: [0, 0] })
        x.restore()
      }
      label(x, 800, 650, 'GIFT SHOP', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 880, P.t0 + 1.4, 7, 170, 0.6)
    } },
  { sign: S, cap: 'Back home. | Planning *the sequel.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW TRIP', headCol: GOLD, lines: [
        ['TRIP 2:', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['THE RETURN', ORANGE, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['bags: 4', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
      hearts(x, t, 540, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0256', key: 'C', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'Leos on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Not a trip. | A *world tour.*', mood: 'sparkle' },
  lesson: { text: 'Travel with a Leo. | Every day *shines.*', chip: 'TRIP: LEGENDARY' },
  last: {
    text: 'Next stop? | *Center stage.*',
    draw(x, t, lt) {
      suitcases(x, t, 540, 1420, t - lt + 0.5, 16)
      sparkles(x, t, 540, 1300, t - lt + 1.3, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
