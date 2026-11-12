// r2a0351: star_advice, ADVICE SOLO, "Aquarius, here's your | *Sunday reset.*" (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine gentle Sunday-reset ideas for an Aquarius, each a relatable truth + a warm reframe and one
// light visual gag. Ending: callback.
//   0.0–3.6    "Aquarius, here's your | *Sunday reset.*"
//   3.6–37.8   nine cards: mute the group chats · the big ideas go in a jar till Monday · close the twelve tabs
//              · text one friend, just one · weird hobby hour is valid (a tiny telescope) · tidy one corner, not the world
//              · saving humanity? drink water first · read your chart, feel understood · early night, the future can wait
//  37.8        "Big brain. | *Rested brain.*"
//  41.2        CALLBACK: "Monday morning: | *the jar's full.*"  the idea jar comes back, full of lightbulbs.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#6fc3ff', PAPER = '#fff4e2'

// ── props
const BULB = [
  '..YYYY..',
  '.YYWYYY.',
  'YYWYYYYY',
  'YYYYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..YYYY..',
  '..GGGG..',
  '..gggg..',
  '..GGGG..',
]
const BULB_C = { Y: '#ffe36a', W: '#ffffff', G: '#9aa5c4', g: '#6b62a8' }
// a glass jar with n little bulbs inside
function jar(x, t, cx, cy, n, k, { lid = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 200, h = 250
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = 'rgba(143,227,255,0.28)'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, 14, h - 40)
  for (let i = 0; i < n; i++) {
    const col = i % 4, row = Math.floor(i / 4)
    drawBits(x, BULB, BULB_C, -66 + col * 44 + (row % 2 ? 18 : 0), h / 2 - 40 - row * 48, 4.4, { rot: Math.sin(i * 1.7 + t * 2) * 0.2 })
  }
  if (lid) { x.fillStyle = INK; x.fillRect(-w / 2 - 14, -h / 2 - 36, w + 28, 40); x.fillStyle = '#c98a4e'; x.fillRect(-w / 2 - 8, -h / 2 - 30, w + 16, 28) }
  x.restore()
}
const TAB_C = ['#ff6b5a', '#ffd23a', '#7dffb0', '#8fe3ff', '#c97bff', '#ff8fb1']
function tabs(x, cx, cy, n, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -130, 392, 260)
  x.fillStyle = '#d8dbe8'; x.fillRect(-190, -124, 380, 248)
  const tw = Math.min(90, 372 / Math.max(1, n))
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-186 + i * tw, -120, tw - 2, 34); x.fillStyle = TAB_C[i % 6]; x.fillRect(-184 + i * tw, -118, tw - 6, 30) }
  x.fillStyle = PAPER; x.fillRect(-180, -78, 360, 192)
  x.fillStyle = '#9aa5c4'; for (let j = 0; j < 5; j++) x.fillRect(-160, -56 + j * 34, j % 2 ? 220 : 300, 12)
  x.restore()
}
const PHONE = [
  'KKKKKKKKK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSHSHSSK',
  'KSSHHHSSK',
  'KSSSHSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KKKKWKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', H: '#ff4f86', W: '#9aa5c4' }
const SCOPE = [
  '..........KK',
  '........KKBK',
  '......KKBBK.',
  '....KKBBBK..',
  '..KKBBBBK...',
  '.KBBBBBK....',
  'KBBBBBK.....',
  '.KKKKK......',
  '....L.L.....',
  '...L...L....',
  '..L.....L...',
  '.L.......L..',
]
const SCOPE_C = { K: INK, B: '#6fc3ff', L: '#c98a4e' }
const BROOM = [
  '.....H',
  '....H.',
  '...H..',
  '..H...',
  '.H....',
  'SSS...',
  'SSSS..',
  'SSSS..',
]
const BROOM_C = { H: '#c98a4e', S: '#ffd23a' }
const GLASS = [
  'K......K',
  'KWWWWWWK',
  'KBBBBBBK',
  'KBWBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  '.KKKKKK.',
]
const GLASS_C = { K: '#d8dbe8', W: '#ffffff', B: '#8fe3ff' }
const GLOBE = [
  '..BBBB..',
  '.BGGBBB.',
  'BGGGBBBB',
  'BBGBBGGB',
  'BBBBGGGB',
  'BGBBBGBB',
  '.BGBBBB.',
  '..BBBB..',
]
const GLOBE_C = { B: '#6fc3ff', G: '#5fd068' }
const MOON = ['..YYYY.', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYYY.']
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWLWWWWLWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: '#e8e2ff', L: LAV }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.5, 2.4, 4.4]) x.fillRect(Math.cos(a) * r * 0.4 - 7, Math.sin(a) * r * 0.4 - 7, 14, 14)
  x.restore()
}

const CAMEOS = [
  // 1 · the group chats
  { sign: 'aquarius', cap: 'Mute the group chats. | They’ll *survive.*', mood: lt => lt < 1.2 ? 'squint' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const muted = lt > 1.2
      bubble(x, 790, 700, muted ? 'MUTED ✓' : '214 UNREAD', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: muted ? MINT : '#ffb3a8', tail: 'bl', font: MONO, weight: 700 })
      bubble(x, 800, 900, 'did u see | the thing??', pop01(t, P.t0 + 0.45, 0.25, 2.2) * (muted ? 0.0 : 1), { size: 34, tail: 'br' })
      if (muted) label(x, 800, 920, 'PEACE: RESTORED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 2 · the idea jar (the callback)
  { sign: 'aquarius', cap: 'Big ideas can wait | *till Monday.*', mood: lt => lt < 1.3 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.7, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.25))
      jar(x, t, 790, 930, n, pop01(t, P.t0 + 0.2, 0.3, 2), { lid: lt > 1.7 })
      label(x, 790, 650, 'IDEAS: SAVED FOR LATER', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 3 · the tabs
  { sign: 'aquarius', cap: 'Close the twelve tabs. | *Rest your brain.*', mood: lt => lt < 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = lt < 0.9 ? 12 : Math.max(1, 12 - Math.floor((lt - 0.9) / 0.08))
      tabs(x, 790, 900, n, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, n > 1 ? `TABS: ${n}` : 'TABS: 1 (COZY)', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  // 4 · one friend
  { sign: 'aquarius', cap: 'Text one friend. | Just *one.*', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      bubble(x, 790, 660, 'thinking of u', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  // 5 · weird hobby hour
  { sign: 'aquarius', cap: 'Weird hobby hour? | *Totally valid.*', mood: lt => lt < 1.1 ? 'squint' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 800, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'COUNTING CLOUDS: 31', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 900, 790, P.t0 + 1.0, 6, 110, 0.3)
    } },
  // 6 · one corner
  { sign: 'aquarius', cap: 'Tidy one corner. | *Not the whole world.*', mood: lt => lt < 1.3 ? 'happy' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GLOBE, GLOBE_C, 860, 700, 16 * k, { rot: t * 0.4 })
      label(x, 860, 830, 'NEXT WEEK', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      x.save(); x.globalAlpha = k; x.fillStyle = 'rgba(125,255,176,0.25)'; x.fillRect(640, 1040, 240, 120); x.restore()
      drawBits(x, BROOM, BROOM_C, 720 + 40 * Math.sin(t * 5), 1010, 18 * k)
      sparkles(x, t, 760, 1100, P.t0 + 1.6, 6, 120, 0.2)
    } },
  // 7 · water first
  { sign: 'aquarius', cap: 'Saving humanity? | *Drink water first.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'okay, okay', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1150, 'HUMAN: HYDRATED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  // 8 · Align: your chart
  { sign: 'aquarius', cap: 'Read your chart. | Feel *understood.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 860, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 1110, 'oh. that’s me.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  // 9 · early night
  { sign: 'aquarius', cap: 'Early night. | *The future can wait.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MOON, { Y: GOLD }, 830, 650, 16 * k)
      drawBits(x, PILLOW, PILLOW_C, 790, 1000, 20 * k)
      label(x, 790, 850, 'GOODNIGHT, UNIVERSE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0351', key: 'D', accent: ACC, solo: 'aquarius', ending: 'callback',
  title: 'Aquarius, here’s | your *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Big brain. | *Rested brain.*', mood: 'sleepy' },
  last: {
    text: 'Monday morning: | *the jar’s full.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'aquarius', 370, 1130, 300 * k, { mood: 'sparkle', look: [1, 0], seed: 33, hops: [t0 + 1.4] })
      const n = Math.min(14, 5 + Math.floor(Math.max(0, lt - 0.6) / 0.12))
      jar(x, t, 750, 1150, n, k, { lid: false })
      for (let i = 0; i < 3; i++) drawBits(x, BULB, BULB_C, 700 + i * 50, 950 - 40 * Math.sin(Math.PI * clamp((lt - 1.2 - i * 0.2) / 1.2)), 6 * pop01(t, t0 + 1.2 + i * 0.2, 0.3, 2))
      label(x, 750, 1340, 'READY, WORLD', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
