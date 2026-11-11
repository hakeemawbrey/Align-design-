// v3t107: THE SIGNS AS… v3, SOLO film, "Your Taurus friend | be like." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine friendship situations, each the most extreme (and lovable) Taurus. Ending: group.
//   helped you move, carried only snacks · joined the group trip by video call · birthday gift: a sourdough starter
//   · remembers your order from 2017 · lent you a hoodie, wants it back today · you're late, they ordered dessert
//   · won't share the massage gun · you were sad, they brought a cheese board · asleep at your party by 8:15
//  37.8 "Slow replies. | *Fast loyalty.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', TAN = '#e9b24a', GREEN = '#5fd068', ORANGE = '#ffb34a'

const BOX = [
  'BBBBBBBBBBBB',
  'BbbbbKKbbbbB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const BOX_C = { B: '#c98f6a', b: '#a8703e', K: '#e8c48a' }
const JAR = [
  '.KKKKKK.',
  '.KKKKKK.',
  'GGGGGGGG',
  'GDDDDDDG',
  'GDWDDWDG',
  'GDDDDDDG',
  'GDDWDDDG',
  'GDDDDDDG',
  'GGGGGGGG',
]
const JAR_C = { K: '#c9c9d8', G: 'rgba(210,230,255,0.9)', D: '#f0e2c0', W: '#fff' }
const HOODIE = [
  '...HHHH...',
  '..HH..HH..',
  '.HHHHHHHH.',
  'HHHHHHHHHH',
  'HH.HHHH.HH',
  'HH.HKKH.HH',
  'HH.HHHH.HH',
  '...HHHH...',
]
const CAKE = ['..R..', '.WWW.', 'PPPPP', 'CCCCC', 'PPPPP']
const CAKE_C = { R: RED, W: '#fff4e2', P: PINK, C: '#8a4a2e' }
const GUN = [
  'RRRRRRRRR...',
  'RRRRRRRRRSSS',
  'RRRRRRRRR...',
  '....KK......',
  '....KK......',
  '....KK......',
]
const GUN_C = { R: '#5a5480', S: '#c9c9d8', K: INK }
const CHEESE = [
  '..YYY......',
  '.YYwYY..GG.',
  'YYYYYY.GGGG',
  'BBBBBBBBBBB',
  'BbBbBbBbBbB',
]
const CHEESE_C = { Y: '#ffd76a', w: '#e8b84a', G: '#a8452e', B: BROWN, b: '#a8603e' }

function card(x, cx, cy, k, title, lines, { rot = 0.04, w = 300, h = 300, bg = '#fff4e2' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 40)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#4a4070'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 100 + i * 42))
  x.restore()
}

const CAMEOS = [
  { sign: 'taurus', cap: 'Helped you move. | Carried *the snacks.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BOX, BOX_C, 760 + (i % 2) * 70, 1060 - i * 130, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 800, 640, 'SNACKS ONLY', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
      bubble(x, 380, 640, 'pacing myself', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Joined the group trip. | *By video call.*', mood: 'sleepy', star: { x: 120, y: 10, s: 220 }, hideStar: true,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(640, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-260, -200, 520, 380); x.fillStyle = '#2a2350'; x.fillRect(-248, -188, 496, 356)
        x.fillStyle = '#8fe3ff'; x.fillRect(-236, -176, 230, 160); x.fillStyle = '#f5d9a0'; x.fillRect(-236, -60, 230, 44)
        x.fillStyle = '#ff8fb1'; x.fillRect(4, -176, 232, 160); x.fillStyle = '#5fd068'; x.fillRect(-236, -4, 230, 160); x.fillStyle = '#c9a6ff'; x.fillRect(4, -4, 232, 160)
        x.restore()
        signChar(x, t, 'taurus', 640 + 120 * k, 860 + 90 * k, 130 * k, { mood: 'sleepy', seed: 9, glyph: false, glow: 0.4 })
      }
      label(x, 640, 620, '● LIVE · BEACH TRIP', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: RED, color: '#fff4e2', rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 420, 1130, 'from bed, thanks', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: 'taurus', cap: 'Your birthday gift? | A *sourdough starter.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const b = 1 + 0.04 * Math.sin(t * 5)
      drawBits(x, JAR, JAR_C, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: b })
      label(x, 800, 640, 'HIS NAME IS GARY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1120, 'FEED DAILY. LOVE HIM.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Remembers your order. | From *2017.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 800, 860, pop01(t, P.t0 + 0.25, 0.35, 2), 'RECEIPT', ['03 · 14 · 2017', 'oat latte', 'extra hot', 'one cookie'], { h: 320, w: 280 })
      label(x, 800, 1110, 'STILL CORRECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Lent you a hoodie. | *Wants it back.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: TAN, K: BROWN }, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 640, 'RETURN BY 5PM', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1120, 'it smells like me', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'You’re ten minutes late. | Dessert’s *gone.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const eaten = Math.floor(clamp((lt - 0.4) / 1.4) * 4)
      for (let i = 0; i < 4; i++) if (i < eaten) { const kk = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2); x.save(); x.globalAlpha = clamp(kk); x.fillStyle = INK; x.beginPath(); x.ellipse(700 + (i % 2) * 180, 820 + Math.floor(i / 2) * 200, 70, 20, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(700 + (i % 2) * 180, 818 + Math.floor(i / 2) * 200, 62, 15, 0, 0, Math.PI * 2); x.fill(); x.restore() } else drawBits(x, CAKE, CAKE_C, 700 + (i % 2) * 180, 780 + Math.floor(i / 2) * 200, 20 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      label(x, 800, 1110, `DESSERTS LEFT: ${4 - eaten}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 640, 'you snooze…', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Bought a massage gun. | *Won’t share.*', mood: 'sleepy', star: { x: -180 },
    front(x, t, lt, P, F) {
      drawBits(x, GUN, GUN_C, F.x + 160 + Math.sin(t * 40) * 3, F.cy - 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      bubble(x, 820, 650, 'can I try?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 800, 1110, 'NO. MINE. ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: TAN, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'You were sad. | They brought *cheese.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CHEESE, CHEESE_C, 800, 960, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 760, 130 * k, { mood: lt > 1.2 ? 'heart' : 'neutral', look: [0, 1], seed: 21, glyph: false, glow: 0.5 })
      label(x, 800, 1120, 'FEELINGS + BRIE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
      hearts(x, t, 800, 700, P.t0 + 1.4, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'taurus', cap: 'Your party? | *Asleep by 8:15.*', mood: 'sleepy', star: { x: -180, y: 30 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      const C = [PINK, GOLD, MINT, SKYB, LAV]
      for (let i = 0; i < 9; i++) { const fx = 160 + i * 90, fy = 520 + 24 * Math.sin(Math.PI * i / 8); x.fillStyle = C[i % 5]; x.beginPath(); x.moveTo(fx - 18, fy); x.lineTo(fx + 18, fy); x.lineTo(fx, fy + 34); x.fill() }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 800, 720, '8:15 PM', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1040, 'best party | ever', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t107', key: 'D', accent: TAN, solo: 'taurus', ending: 'group',
  title: 'Your Taurus friend | *be like.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'libra', chip: 'ALIGNED' },
  group: { cap: 'Slow replies. | *Fast loyalty.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
