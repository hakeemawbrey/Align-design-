// r2a0156: star_advice ADVICE SOLO (aries), "Aries, your courage | *inspires people.*" (~45 s vertical, signs3kit
// social cut, music: lofi · D). Nine warm truths about Aries, each with one visual gag:
//   goes first, others follow · said the scary thing, it helped · tried the weird snack · falls fast, gets up faster
//   · stands up for friends (umbrella over a crying Pisces) · rest is refuelling · messaged the match first
//   · patience is brave too (the kettle) · your spark lights others up
//  37.8   "Brave. Loud. | *Kind.*"  Aries comes back, big.
//  41.2   callback: "The weird snack? | *Everyone’s favourite now.*"  the snack returns with hearts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', ORANGE = '#ffb34a', TEAL = '#8fe3d0'
const ST = { x: -170 }

const SNACK = [
  '....GG....',
  '...GPPG...',
  '..GPPPPG..',
  '.GPPYPPPG.',
  '.GPPPPYPG.',
  'GPYPPPPPPG',
  'GPPPPYPPPG',
  '.GPPPPPPG.',
  '..GGGGGG..',
]
const SNACK_C = { G: '#5fd17a', P: '#c86bff', Y: GOLD }
const UMBRELLA = [
  '.....RRRR.....',
  '...RRRRRRRR...',
  '..RRRRRRRRRR..',
  '.RRRRRRRRRRRR.',
  'RRRRRRRRRRRRRR',
  'R..R..KK..R..R',
  '......KK......',
  '......KK......',
  '......KK......',
  '......KK......',
  '...KK.KK......',
  '....KKK.......',
]
const KETTLE = [
  '....KK.....',
  '..WWWWWW...',
  '.WWWWWWWW.W',
  'WWWWWWWWWWW',
  'WWWWWWWWWW.',
  'WWWWWWWWW..',
  'WWWWWWWWW..',
  '.WWWWWWW...',
]
const BATTERY = (n) => {
  const rows = ['KKKKKKKKKKKK.', 'K..........KK', 'K..........KK', 'K..........KK', 'KKKKKKKKKKKK.']
  return rows.map((r, j) => j === 0 || j === 4 ? r : r.split('').map((c, i) => (i >= 1 && i <= 10 && i <= n) ? 'G' : c).join(''))
}
const RAIN = ['B', 'B', 'B']

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

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'You go first. | *Others follow.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 800, 620, 'I’ll go!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      const ids = ['virgo', 'cancer', 'libra']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 1.0 + i * 0.25, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 700 + i * 110, 1000, 130 * k, { mood: 'happy', look: [-1, 0], seed: 30 + i, glyph: false, hops: [P.t0 + 1.4 + i * 0.25] })
      })
      label(x, 810, 1150, 'OK, ME TOO', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You said the scary thing. | *It helped.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'can we talk | about it?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 980, 'AIR: CLEARED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 980, P.t0 + 1.8, 7, 180, 0.4)
    } },
  { sign: S, cap: 'You try the weird snack. | *Brave.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SNACK, SNACK_C, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      label(x, 790, 1080, 'ACTUALLY GOOD?!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You fall fast. | You get up *faster.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', squash: lt => lt < 1.0 ? 0.25 : 0, look: [1, 0], star: { x: -170, y: 0 }, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      if (lt < 1.0) label(x, 790, 760, 'OOPS', pop01(t, P.t0 + 0.25, 0.3, 2.2), { size: 56, bg: LAV, rot: -0.08, font: MONO, weight: 700 })
      else label(x, 790, 760, 'BACK UP', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 56, bg: MINT, rot: 0.06, font: MONO, weight: 700 })
      if (lt >= 1.0) sparkles(x, t, 790, 760, P.t0 + 1.0, 7, 170, 0.2)
    } },
  { sign: S, cap: 'You stand up for friends. | *Every time.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 810, 1000, 230 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', tears: lt > 1.3 ? 1 : 3, look: [-1, 0], seed: 21, glyph: false })
      const u = pop01(t, P.t0 + 0.9, 0.35, 2)
      drawBits(x, UMBRELLA, { R: RED, K: '#2a2350' }, 800, 770, 24 * u)
      if (u < 0.5) for (let i = 0; i < 6; i++) { const ph = (t * 1.4 + i / 6) % 1; x.fillStyle = SKYB; x.fillRect(720 + i * 36, 560 + ph * 300, 6, 22) }
      bubble(x, 560, 600, 'I got you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Rest isn’t quitting. | *It’s refuelling.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 10)
      drawBits(x, BATTERY(n), { K: BONE, G: '#5fd17a' }, 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1000, n >= 10 ? 'FULL AGAIN' : 'CHARGING…', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: n >= 10 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You messaged first. | *They smiled.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (sheet(x, 800, 850, 320, 460, '#2a2350', k, 0.04)) {
        x.fillStyle = '#140c30'; x.fillRect(-142, -210, 284, 420)
        txt(x, 'NEW MATCH', 0, -170, 32, GOLD, MONO, 700)
        x.fillStyle = RED; x.fillRect(-10, -100, 140, 70); txt(x, 'hi!!', 60, -65, 40, INK, MONO, 700)
        if (lt > 1.4) { x.fillStyle = BONE; x.fillRect(-130, 0, 170, 70); txt(x, 'hi :)', -45, 35, 40, INK, MONO, 700) }
        x.restore()
      }
      if (lt > 1.4) hearts(x, t, 800, 1060, P.t0 + 1.4, { n: 4, life: 1.3, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Waiting is brave too. | *Breathe.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, KETTLE, { W: '#ff8fb1', K: '#2a2350' }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.7; x.fillStyle = BONE; x.fillRect(900 + Math.sin(ph * 6 + i) * 14, 800 - ph * 160, 18, 18); x.restore() }
      if (lt < 1.6) bubble(x, 800, 650, 'is it ready?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      else label(x, 800, 650, 'TEA TIME', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your spark? | It *lights others up.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ids = ['taurus', 'cancer', 'virgo', 'capricorn']
      ids.forEach((id, i) => {
        const on = lt > 0.6 + i * 0.3
        signChar(x, t, id, 690 + (i % 2) * 190, 740 + Math.floor(i / 2) * 230, 140 * pop01(t, P.t0 + 0.15, 0.3, 2), { mood: on ? 'sparkle' : 'sleepy', zzz: false, alpha: on ? 1 : 0.4, seed: 40 + i, glyph: false, glow: on ? 1.2 : 0.2 })
        if (on) sparkles(x, t, 690 + (i % 2) * 190, 740 + Math.floor(i / 2) * 230, P.t0 + (0.6 + i * 0.3), 5, 90, i)
      })
    } },
]

const F = makeFilm({
  id: 'r2a0156', key: 'D', accent: RED, solo: S, ending: 'callback',
  title: 'Aries, your courage | *inspires people.*',
  cameos: CAMEOS,
  group: { cap: 'Brave. Loud. | *Kind.*', mood: 'sparkle' },
  last: {
    text: 'The weird snack? | *Now a classic.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, SNACK, SNACK_C, 540, 1050, 30 * pop01(t, t0 + 0.5, 0.4, 2), { rot: 0.06 })
      label(x, 540, 1290, 'SOLD OUT', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 1000, t0 + 1.0, { n: 8, life: 2.0, spread: 460, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
