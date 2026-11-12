// r2a0158: star_advice ADVICE SOLO (pisces), "Pisces, protect | *your peace.*" (~45 s vertical, signs3kit social cut,
// music: lofi · C). Nine warm truths about Pisces (who cries in every card, happily or not), one visual gag each:
//   you soak up every mood (wring out the sponge) · you can say no, kindly · phone on silent · not every sad song is
//   yours (skip) · the bath is a whole ceremony (with a duck) · daydreaming is planning · a match that drains you?
//   swim on · tears are allowed, so is laughing · your soft heart, in a bubble
//  37.8   "Soft heart. | *Strong boundaries.*"  Pisces comes back, big.
//  41.2   callback: "Even the duck | *says rest.*"  the bath duck from card 5 returns.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#8fb8ff', RED = '#e23d4e', ORANGE = '#ffb34a'
const ST = { x: -170 }
const S = 'pisces'

const SPONGE = [
  'YYYYYYYYYY',
  'YyYYYyYYYY',
  'YYYYYYYyYY',
  'YYyYYYYYYY',
  'YYYYYyYYyY',
  'GGGGGGGGGG',
  'GGGGGGGGGG',
]
const DUCK = [
  '...YYY....',
  '..YYKYY...',
  '..YYYYYOO.',
  '..YYYY....',
  'Y.YYYYYY..',
  'YYYYYYYYYY',
  'YYYYYYYYYY',
  '.YYYYYYYY.',
]
const DUCK_C = { Y: '#ffd23a', K: INK, O: ORANGE }
const TUB = [
  'W..............W',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  '.WWWWWWWWWWWWWW.',
  '..WWWWWWWWWWWW..',
  '..K..........K..',
]
const CLOUD = [
  '....WWWW......',
  '..WWWWWWWW.WW.',
  '.WWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
]
const CASTLE = [
  'P.P...P.P',
  'PPP...PPP',
  'PPPP.PPPP',
  'PPPPPPPPP',
  'PPPPDPPPP',
  'PPPPDPPPP',
]
const TISSUE = [
  '....WW....',
  '...WWWW...',
  'BBBBWWBBBB',
  'BbBBBBBBbB',
  'BBBBBBBBBB',
  'BbBBBBBBbB',
  'BBBBBBBBBB',
]

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function drip(x, cx, cy, t, n, k) {
  x.fillStyle = SKYB
  for (let i = 0; i < n; i++) { const ph = (t * 1.5 + i / n) % 1; x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph); x.fillRect(cx - 50 + (i * 37) % 100, cy + ph * 140, 10, 16); x.restore() }
}

const CAMEOS = [
  { sign: S, cap: 'You soak up every mood. | *Wring it out.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sq = lt > 1.0 ? ease.inOutCubic(prog(lt, 1.0, 1.4)) : 0
      drawBits(x, SPONGE, { Y: GOLD, y: '#c99a2a', G: '#5fd17a' }, 800, 800, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 - 0.35 * sq, sy: 1 + 0.15 * sq })
      if (sq > 0.3) drip(x, 800, 900, t, 8, 1)
      label(x, 800, 1090, lt > 1.4 ? 'MOODS: RELEASED' : 'ABSORBING…', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: lt > 1.4 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You can say no. | *Kindly.*', mood: 'happy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'not tonight :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: SEA, tail: 'bl' })
      label(x, 800, 930, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 930, P.t0 + 1.4, 6, 160, 0.2)
    } },
  { sign: S, cap: 'Phone on silent. | *The world can wait.*', mood: 'sleepy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 230, 380, '#2a2350', k, 0.05)) {
        x.fillStyle = '#140c30'; x.fillRect(-100, -170, 200, 340)
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, -40, 50, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#140c30'; x.beginPath(); x.arc(22, -58, 44, 0, Math.PI * 2); x.fill()
        txt(x, 'SHH', 0, 80, 40, LAV, MONO, 700)
        x.restore()
      }
    } },
  { sign: S, cap: 'Not every sad song | is *your story.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 4, cell: 8, col: lt > 1.3 ? GOLD : SEA, seed: 2, alpha: pop01(t, P.t0 + 0.2, 0.3, 2) })
      label(x, 800, 1040, lt > 1.3 ? 'NEXT: HAPPY SONG' : 'SAD SONG #9', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: lt > 1.3 ? GOLD : SEA, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 650, 'SKIP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 48, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your bath is a ceremony. | *As it should be.*', mood: 'sparkle', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 8; i++) { const ph = (t * 0.5 + i / 8) % 1; x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph); x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.arc(680 + (i * 41) % 240, 900 - ph * 280, 12 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore() }
      drawBits(x, DUCK, DUCK_C, 850, 870 + Math.sin(t * 2.5) * 6, 13 * pop01(t, P.t0 + 0.7, 0.3, 2))
      drawBits(x, TUB, { W: BONE, K: '#9aa5c4' }, 790, 980, 21 * k)
      label(x, 800, 1130, 'BUBBLES. DUCK.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Daydreaming isn’t lazy. | *It’s planning.*', mood: 'heart', tears: 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CLOUD, { W: BONE }, 790, 850 + Math.sin(t * 1.5) * 8, 24 * k)
      drawBits(x, CASTLE, { P: PINK, D: '#7a3a6a' }, 800, 740 + Math.sin(t * 1.5) * 8, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 1040, 'BLUEPRINTS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A match that drains you? | *Swim on.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), gone = ease.inCubic(prog(lt, 1.3, 1.7))
      x.save(); x.globalAlpha = 1 - 0.65 * gone
      if (sheet(x, 800 + (lt > 1.3 ? gone * 90 : 0), 830, 250, 300, '#2a2350', k, 0.05)) {
        x.fillStyle = '#140c30'; x.fillRect(-110, -130, 220, 180)
        txt(x, '“k.”', 0, -40, 60, BONE, INTER, 800)
        txt(x, 'MATCH', 0, 100, 28, LAV, MONO, 700)
        x.restore()
      }
      x.restore()
      label(x, 800, 1060, 'SWIM ON ~', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tears are allowed. | *So is laughing.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: lt => lt > 1.2 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', B: SEA, b: '#5b8adf' }, 800, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, lt > 1.2 ? 'haha ok I’m fine' : 'sniff…', pop01(t, P.t0 + (lt > 1.2 ? 1.2 : 0.4), 0.25, 2.2), { size: 38, col: lt > 1.2 ? GOLD : LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Your soft heart? | *Worth protecting.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), b = pop01(t, P.t0 + 0.9, 0.4, 1.8)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 800, 840 + Math.sin(t * 2) * 8, 22 * k)
      if (b > 0.01) {
        x.save(); x.globalAlpha = 0.85; x.strokeStyle = SKYB; x.lineWidth = 8; x.beginPath(); x.arc(800, 840, 140 * b, 0, Math.PI * 2); x.stroke()
        x.globalAlpha = 0.15; x.fillStyle = SKYB; x.fill(); x.globalAlpha = 0.8; x.fillStyle = '#fff'; x.fillRect(740, 760, 26, 14); x.restore()
      }
      label(x, 800, 1070, 'PEACE: PROTECTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0158', key: 'C', accent: SEA, solo: S, ending: 'callback',
  title: 'Pisces, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong boundaries.*', mood: 'heart' },
  last: {
    text: 'Even the duck | *says rest.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, DUCK, DUCK_C, 540, 1080 + Math.sin(t * 2.5) * 8, 26 * pop01(t, t0 + 0.5, 0.4, 2))
      bubble(x, 760, 900, 'rest!', pop01(t, t0 + 1.2, 0.25, 2.2), { size: 56, col: BONE, tail: 'bl' })
      hearts(x, t, 540, 1250, t0 + 1.4, { n: 6, life: 1.8, spread: 380, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
