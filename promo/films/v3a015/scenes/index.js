// v3a015: zodiac.advice444, ADVICE SOLO, "Signs you're | a healed Sagittarius." (~51 s vertical, signs3kit social cut, lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): growth, Sagittarius-style, one gag each.
//   0.0–3.6    "Signs you’re a | *healed* Sagittarius."  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              stays for the hard talk (running shoes off) · honesty, gift-wrapped · a key, on purpose
//              · finishes the puzzle: last piece in · adventure in the backyard (tent, binoculars, "a snail!!")
//              · says sorry without a joke: NO PUNCHLINE · a match comes on the adventure (two paths, one X)
//              · small talk is fun now ("the weather's nice" / "tell me MORE") · sits so still a butterfly lands
//  37.8        GROUP ending: "Still wild. | *Now with a key.*"  Sagittarius comes back, big (the spare key, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VIOLET = '#b07dff', RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ffb34a', GRASS = '#5fd068'
const S = 'sagittarius'

// ── props
const SHOE = [
  '......RRRR..',
  '.....RRWRR..',
  '....RRRRRRR.',
  'RRRRRRWRWRRR',
  'RRRRRRRRRRRR',
  'WWWWWWWWWWWW',
]
const SHOE_C = { R: ORANGE, W: '#fff4e2' }
const KEY = [
  '.YYYY..........',
  'YY..YY.........',
  'Y....YYYYYYYYYY',
  'YY..YY....Y.Y.Y',
  '.YYYY.....Y...Y',
]
const BFLY = ['PP.PP', 'PPKPP', '.PKP.', 'PPKPP', 'PP.PP']
const SNAIL = ['..BBB...', '.BbBbB..', '.BBbBB..', 'GGGGGGG.', 'GGGGGGGG']
const SNAIL_C = { B: '#d9774a', b: '#ffb34a', G: '#c9f27a' }

// a gift box whose lid pops to show a little card
function giftBox(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -66, 252, 172)
  x.fillStyle = LAV; x.fillRect(-120, -60, 240, 160)
  x.fillStyle = GOLD; x.fillRect(-16, -60, 32, 160)
  x.save(); x.translate(0, -66 - open * 60); x.rotate(-open * 0.35)
  x.fillStyle = INK; x.fillRect(-140, -36, 280, 42); x.fillStyle = VIOLET; x.fillRect(-134, -30, 268, 30); x.fillStyle = GOLD; x.fillRect(-16, -30, 32, 30)
  x.fillStyle = INK; x.fillRect(-56, -64, 50, 34); x.fillRect(6, -64, 50, 34); x.fillStyle = GOLD; x.fillRect(-50, -58, 40, 24); x.fillRect(12, -58, 40, 24)
  x.restore()
  if (open > 0.3) {
    x.globalAlpha = clamp((open - 0.3) * 2)
    x.fillStyle = INK; x.fillRect(-104, -150, 208, 96); x.fillStyle = '#fff4e2'; x.fillRect(-98, -144, 196, 84)
    x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('an honest', 0, -118); x.fillText('thought ♥︎', 0, -86)
  }
  x.restore()
}
// a jigsaw puzzle on a board, the last piece dropping in
function puzzle(x, cx, cy, k, p) {
  if (k <= 0.01) return
  const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-172, -132, 344, 264)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) {
    const last = i === 3 && j === 1
    let px = -164 + i * 66, py = -124 + j * 62
    if (last) { if (p <= 0) continue; py -= (1 - ease.outBack(clamp(p))) * 220 }
    x.fillStyle = INK; x.fillRect(px, py, 64, 60)
    x.fillStyle = COLS[(i + j * 2) % 6]; x.fillRect(px + 3, py + 3, 58, 54)
    x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(px + 24, py - 4, 14, 10)
  }
  x.restore()
}
// a little tent on backyard grass with a picket fence behind
function backyard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = '#fff4e2'; for (let i = 0; i < 8; i++) { x.fillRect(560 + i * 52, 860, 28, 150); x.beginPath(); x.moveTo(560 + i * 52, 860); x.lineTo(574 + i * 52, 836); x.lineTo(588 + i * 52, 860); x.fill() }
  x.fillRect(560, 900, 400, 14); x.fillRect(560, 960, 400, 14)
  x.fillStyle = GRASS; x.fillRect(120, 1080, 840, 130)
  x.restore()
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, 70); x.lineTo(0, -130); x.lineTo(150, 70); x.closePath(); x.fill()
  x.fillStyle = ORANGE; x.beginPath(); x.moveTo(-138, 64); x.lineTo(0, -116); x.lineTo(138, 64); x.closePath(); x.fill()
  x.fillStyle = '#5b2e1a'; x.beginPath(); x.moveTo(-40, 64); x.lineTo(0, -40); x.lineTo(40, 64); x.closePath(); x.fill()
  x.restore()
}
// a treasure map: two dotted paths that meet at an X
function map(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-190, -150, 392, 312)
  x.fillStyle = INK; x.fillRect(-202, -162, 404, 324)
  x.fillStyle = '#f1dfb0'; x.fillRect(-194, -154, 388, 308)
  x.fillStyle = '#9fd3a0'; x.fillRect(-160, -120, 90, 70); x.fillRect(60, 40, 100, 70)
  x.fillStyle = '#a9d6ff'; x.fillRect(-40, -140, 60, 120)
  const dot = (ax, ay, bx, by, col) => { x.fillStyle = col; for (let i = 0; i <= 12 * clamp(p); i++) { const q = i / 12; x.fillRect(lerp(ax, bx, q) - 5, lerp(ay, by, q) + Math.sin(q * 6) * 18 - 5, 10, 10) } }
  dot(-170, 120, 40, -20, VIOLET); dot(170, -130, 40, -20, PINK)
  if (p > 0.95) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(20, -40); x.lineTo(60, 0); x.moveTo(60, -40); x.lineTo(20, 0); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You stay | *for the hard talk.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 810, 980, 200 * k, { mood: 'neutral', look: [-1, 0], seed: 15, glyph: false })
      bubble(x, 800, 660, 'can we talk?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      const sk = pop01(t, P.t0 + 1.0, 0.3, 2)
      drawBits(x, SHOE, SHOE_C, 320, 1140, 9 * sk); drawBits(x, SHOE, SHOE_C, 430, 1150, 9 * sk, { rot: 0.1 })
      label(x, 380, 620, 'RUNNING SHOES: OFF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your honesty | *comes gift-wrapped* now.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      giftBox(x, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.9, 1.4)))
      sparkles(x, t, 780, 820, P.t0 + 1.4, 7, 170, 0.4)
    } },
  { sign: S, cap: 'A key to their place? | *Kept it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2.2)
      drawBits(x, KEY, { Y: GOLD }, 790, 850, 22 * k, { rot: -0.15 + Math.sin(t * 3) * 0.05 })
      label(x, 790, 700, 'NO PANIC.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05 })
      label(x, 790, 1050, 'SPARE KEY: KEPT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You finish | *what you start.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      puzzle(x, 780, 870, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.8, 1.3))
      label(x, 780, 1110, 'LAST PIECE: IN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 870, P.t0 + 1.4, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Adventure? | *The backyard counts.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 1], star: { x: -220, y: 40, s: 260 }, hops: [1.4],
    back(x, t, lt, P) { backyard(x, 790, 1010, pop01(t, P.t0 + 0.1, 0.35, 1.6)) },
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 600, 1110, 8 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      bubble(x, 420, 620, 'a SNAIL!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
  { sign: S, cap: 'You say sorry | *without a joke.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 980, 200 * k, { mood: lt > 1.5 ? 'heart' : 'neutral', look: [-1, 0], seed: 16, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 520, 630, 'I’m sorry. | I mean it.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 810, 760, 'NO PUNCHLINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match comes | *on the adventure.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      map(x, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.5, 1.5))
      label(x, 780, 1100, '✦ +1 EXPLORER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Small talk | *is fun* now.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 980, 200 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 17, glyph: false })
      bubble(x, 800, 650, 'weather’s nice.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
      bubble(x, 400, 620, 'tell me MORE', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Stillness | *doesn’t scare you.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', star: { x: -10, y: 30, s: 320 },
    front(x, t, lt, P, F) {
      const fly = ease.inOutCubic(prog(lt, 0.4, 1.4))
      const bx = lerp(900, F.x + 10, fly), by = lerp(560, F.top - 22, fly) + Math.sin(t * 6) * 14 * (1 - fly)
      if (lt > 0.35) drawBits(x, BFLY, { P: PINK, K: INK }, bx, by, 10, { sx: 0.6 + 0.4 * Math.abs(Math.sin(t * (fly < 1 ? 14 : 3))) })
      label(x, 540, 1150, 'STILL FOR TEN WHOLE MINUTES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a015', key: 'C', accent: VIOLET, solo: S,
  title: 'Signs you’re a | *healed* Sagittarius.',
  cameos: CAMEOS,
  ending: 'group',
  group: { cap: 'Still wild. | *Now with a key.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
