// v3t090: THE SIGNS AS… v3, SOLO film, "Things only | Aries get." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Aries version.
//   0.0–3.6    "Things only | *Aries* get."  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards: microwave stopped at 0:03 · raced a stranger to the door · instructions? never
//              · angry for ten seconds, then forgot why · elevator too slow, took twenty floors of stairs
//              · game night, victory lap · compatibility test, skipped to the result · patience? loading, skipped
//              · someone was mean to you, Aries is on the way
//  37.8        "Fast. Loud. | *Ride or die.*"
//  41.2        callback: "And the stranger? | *Wants a rematch.*" with the WINNER ribbon and the door back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#f0603a', CREAM = '#fff4e2', BROWN = '#8a4a2e', GREEN = '#5fd068'

const DOOR = [
  'KKKKKKKK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBYBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
]
const DOOR_C = { K: INK, B: BROWN, Y: GOLD }
const RIBBON = ['.YYYYY.', 'YYYYYYY', 'YYWYYYY', 'YYYYYYY', '.YYYYY.', '.RR.RR.', '.RR.RR.', 'RR...RR']
const RIBBON_C = { Y: GOLD, W: CREAM, R: '#e23d4e' }
const STAIRS = [
  '..........KK',
  '........KKKK',
  '......KKKKKK',
  '....KKKKKKKK',
  '..KKKKKKKKKK',
  'KKKKKKKKKKKK',
]

// a microwave with its timer
function microwave(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 316, 210)
  x.fillStyle = INK; x.fillRect(-162, -110, 324, 220)
  x.fillStyle = '#d8dbe8'; x.fillRect(-154, -102, 308, 204)
  x.fillStyle = '#2a2350'; x.fillRect(-138, -86, 190, 172)
  x.fillStyle = '#ffe7a8'; x.globalAlpha = 0.25; x.fillRect(-130, -78, 174, 156); x.globalAlpha = 1
  x.fillStyle = '#140c30'; x.fillRect(66, -86, 74, 44)
  const sec = lt < 0.5 ? 60 : Math.max(57, 60 - Math.floor((lt - 0.5) * 6))
  x.fillStyle = MINT; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`0:${String(sec).padStart(2, '0')}`.replace('0:60', '1:00'), 103, -63)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(72 + (i % 2) * 36, -26 + Math.floor(i / 2) * 30, 28, 20)
  x.restore()
}
// a crooked shelf with spare screws
function flatpack(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.22)
  x.fillStyle = INK; x.fillRect(-120, -150, 240, 300)
  x.fillStyle = '#e9b26a'; x.fillRect(-112, -142, 224, 284)
  x.fillStyle = INK; for (let i = 0; i < 3; i++) x.fillRect(-112, -60 + i * 80 + (i === 1 ? 20 : 0), 224, 10)
  x.restore()
  const n = Math.floor(clamp((lt - 0.8) / 1.0) * 9)
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(680 + i * 30, 1080 + (i % 2) * 14, 14, 26); x.fillStyle = '#c9c9d8'; x.fillRect(683 + i * 30, 1083 + (i % 2) * 14, 8, 20) }
}
function bar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -40, 340, 80); x.fillStyle = '#2a2350'; x.fillRect(-162, -32, 324, 64)
  const p = lt < 1.2 ? 0.08 * clamp(lt / 1.0) : 1
  x.fillStyle = lt < 1.2 ? SKYB : RED; x.fillRect(-156, -26, 312 * p, 52)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Microwave says 1:00. | *Stopped it at 0:57.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      microwave(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1080, 'PATIENCE: 3 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Raced a stranger | *to the door.*', mood: 'sparkle', star: { x: -190 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 860, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const run = ease.inOutCubic(prog(lt, 0.2, 1.0))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'libra', lerp(560, 700, run), 1000, 150 * k, { mood: lt > 1.0 ? 'wide' : 'happy', look: [1, 0], seed: 23, glyph: false })
      drawBits(x, RIBBON, RIBBON_C, 560, 740, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.4))
      label(x, 790, 640, 'WINNER (UNOFFICIAL)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Read the instructions? | *Never.*', mood: 'sparkle', star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      flatpack(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 640, 'SPARE SCREWS: 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Furious for ten seconds. | Then *forgot why.*', mood: lt => lt < 1.1 ? 'squint' : 'happy', star: { x: -190 }, hops: [0.2, 0.4, 1.3],
    squash: lt => lt < 1.0 ? 0.04 * Math.sin(lt * 40) : 0,
    front(x, t, lt, P) {
      if (lt < 1.1) bubble(x, 790, 760, 'GRRRR', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 56, col: '#ffb3a0', tail: 'bl' })
      else bubble(x, 790, 760, 'wanna get tacos?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      label(x, 790, 1060, 'GRUDGE: 0 SEC', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Elevator too slow. | Took *twenty floors.*', mood: 'sparkle', star: { x: -190, y: 40 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5],
    back(x, t, lt, P) { drawBits(x, STAIRS, { K: '#6b62a8' }, 760, 980, 28 * pop01(t, P.t0 + 0.1, 0.3, 2), { outline: INK }) },
    front(x, t, lt, P) {
      const fl = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 19)
      label(x, 800, 660, `FLOOR ${fl}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1140, 'ELEVATOR: FLOOR 2', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Won one board game. | *Victory lap.*', mood: 'sparkle', star: { x: 0, s: 260 },
    front(x, t, lt, P) {
      const a = lt * 2.4
      label(x, 540, 640, `LAP ${1 + Math.floor(lt / 0.8)}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.4)'; x.lineWidth = 6; x.setLineDash([16, 14]); x.beginPath(); x.ellipse(540, 900, 330, 150, 0, 0, Math.PI * 2); x.stroke(); x.restore()
      label(x, 540 + Math.cos(a) * 330, 900 + Math.sin(a) * 150, 'WOOO', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: 0, font: MONO, weight: 700 })
      label(x, 540, 1140, 'GAME: TIC-TAC-TOE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Compatibility test? | *Skipped to the result.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 640, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 800, 'Q1 OF 40', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 960, 'SKIP ALL ▶▶', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1120, 'RESULT: LET’S GO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Patience? | *Never met her.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.25],
    front(x, t, lt, P) {
      label(x, 800, 720, lt < 1.2 ? 'LOADING…' : 'SKIPPED.', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 40, bg: lt < 1.2 ? BONE : RED, color: lt < 1.2 ? INK : CREAM, rot: -0.04, font: MONO, weight: 700 })
      bar(x, 800, 880, pop01(t, P.t0 + 0.3, 0.3, 2), lt)
      label(x, 800, 1060, 'WAITED: 1.2 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Someone was mean to you? | Aries is *on the way.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.3, 0.5, 0.7, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 830, 980, 200 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 29, glyph: false, tears: lt > 1.2 ? 1 : 2 })
      label(x, 800, 660, 'ETA: 4 SECONDS', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 700, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t090', key: 'G', accent: RED, solo: 'aries', ending: 'callback',
  title: 'Things only | *Aries* get.',
  cameos: CAMEOS,
  group: { cap: 'Fast. Loud. | *Ride or die.*', mood: 'sparkle' },
  last: {
    text: 'And the stranger? | *Wants a rematch.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, DOOR, DOOR_C, 760, 1120, 26 * pop01(t, t0 + 0.3, 0.35, 2))
      drawBits(x, RIBBON, RIBBON_C, 360, 1080, 30 * pop01(t, t0 + 0.6, 0.35, 2.2), { rot: -0.1 })
      label(x, 540, 1440, 'ROUND 2: TOMORROW', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
