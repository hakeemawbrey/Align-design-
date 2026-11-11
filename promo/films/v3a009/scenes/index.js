// v3a009: zodiac.advice444, ADVICE SOLO, "Taurus, you're | allowed to rest." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to rest, for the Taurus who never stops working.
// Ending: callback (a last line that pays off the couch match).
//   0.0–3.6    "Taurus, you’re | *allowed to rest.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a half-built brick wall: TOMORROW IS FINE · a tight spring lets go: TENSION: RELEASED
//              · a bubble bath with a duck: PLANS: BUBBLES · toast takes its time: BREAKFAST: SLOW
//              · Taurus holds the umbrella for everyone, then Cancer holds it for Taurus · the big hoodie is the outfit
//              · a compatibility check: Taurus + the couch, IT'S A MATCH · a long stretch: POP. CRACK. AHH.
//              · a little snack plate: SNACK: DESERVED
//  37.8        "Strong all week. | *Soft all weekend.*"  Taurus comes back, sleepy.
//  41.2        CALLBACK: "The couch | *matched back.*"  Taurus, finally on the couch, IT'S A MATCH.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', MOSS = '#8fd36b', BRICK = '#c4553a'
const S = 'taurus'

// ── props
const DUCK = ['..YY..', '.YYKY.', '.YYYYO', 'YYYYY.', 'YYYYYY', '.YYYY.']
const DUCK_C = { Y: GOLD, K: INK, O: '#ff9a3c' }
const TOAST = ['.TTTTTT.', 'TTLLLLTT', 'TLLLLLLT', 'TLLLLLLT', 'TLLLLLLT', 'TTTTTTTT']
const TOAST_C = { T: '#b8743a', L: '#f0c27a' }
const HOODIE = ['...HHHH...', '..HHKKHH..', '.HHHHHHHH.', 'HHHHHHHHHH', 'HH.HHHH.HH', 'HH.HPPH.HH', 'HH.HPPH.HH', 'HH.HHHH.HH', '...HHHH...']
const HOODIE_C = { H: LAV, K: '#8a6fc4', P: '#a58fd6' }
const PLATE = ['..CC.GG..', '.CCCGGGR.', 'WWWWWWWWW', '.WWWWWWW.']
const PLATE_C = { C: '#ffd45c', G: '#5fd068', R: RED, W: '#fff4e2' }
function wall(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const rows = 6, built = Math.min(rows, 2 + Math.floor(Math.max(0, lt) * 2.5))
  for (let r = 0; r < built; r++) for (let c = 0; c < 4; c++) {
    if (r === built - 1 && c >= 2) continue
    const bx = -180 + c * 90 + (r % 2) * 45, by = 140 - r * 46
    x.fillStyle = INK; x.fillRect(bx - 2, by - 2, 88, 44); x.fillStyle = BRICK; x.fillRect(bx + 2, by + 2, 80, 36)
  }
  x.restore()
}
function spring(x, t, cx, cy, k, rel) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = lerp(80, 260, rel), n = 9
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath()
  for (let i = 0; i <= n * 8; i++) { const u = i / (n * 8); const px = Math.sin(u * n * Math.PI * 2) * 70, py = 140 - u * h; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  x.strokeStyle = '#9aa0b4'; x.lineWidth = 10; x.beginPath()
  for (let i = 0; i <= n * 8; i++) { const u = i / (n * 8); const px = Math.sin(u * n * Math.PI * 2) * 70, py = 140 - u * h; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  x.restore()
}
function bath(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -40, 400, 160); x.fillStyle = '#f4f4ff'; x.fillRect(-192, -32, 384, 144)
  x.fillStyle = INK; x.fillRect(-170, 110, 30, 40); x.fillRect(140, 110, 30, 40)
  for (let i = 0; i < 9; i++) { const bx = -170 + i * 42, by = -50 - Math.abs(Math.sin(t * 2 + i)) * 20; x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8f6ff'; x.beginPath(); x.arc(bx, by, 25, 0, Math.PI * 2); x.fill() }
  x.restore()
  drawBits(x, DUCK, DUCK_C, cx + 90, cy - 110 + Math.sin(t * 3) * 6, 12 * k)
}
function toaster(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const up = ease.outCubic(prog(lt, 0.9, 2.2))
  drawBits(x, TOAST, TOAST_C, cx - 30, cy - 70 - up * 120, 14 * k)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -90, 300, 190); x.fillStyle = '#c8d2ee'; x.fillRect(-142, -82, 284, 174)
  x.fillStyle = INK; x.fillRect(-110, -96, 160, 22); x.fillRect(150, -20, 30, 50); x.fillStyle = '#9aa0b4'; x.fillRect(-90, -40, 180, 10)
  x.restore()
}
function umbrella(x, cx, cy, s, col) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 166, Math.PI, 0); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 156, Math.PI, 0); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.25)'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 156, Math.PI * 1.3, Math.PI * 1.55); x.fill()
  x.fillStyle = INK; x.fillRect(-6, 0, 12, 170)
  x.restore()
}
function couch(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-230, -110, 460, 220)
  x.fillStyle = '#a24a6a'; x.fillRect(-222, -102, 444, 100)
  x.fillStyle = '#c45d85'; x.fillRect(-222, -2, 444, 70); x.fillRect(-230, -60, 50, 130); x.fillRect(180, -60, 50, 130)
  x.fillStyle = INK; x.fillRect(-200, 104, 24, 30); x.fillRect(176, 104, 24, 30)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You don’t have to | *finish it today.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      wall(x, 740, 940, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 700, 'TOMORROW IS FINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Unclench your jaw. | *Seriously.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      spring(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack ? ease.outBack(prog(lt, 0.9, 1.3)) : prog(lt, 0.9, 1.3))
      label(x, 790, 650, 'TENSION: RELEASED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A bubble bath | *counts as a plan.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      bath(x, t, 770, 1010, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'PLANS: BUBBLES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow mornings | *still count.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      toaster(x, t, 790, 1020, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 680, 'BREAKFAST: SLOW', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let someone else | *hold the umbrella.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -160, y: 30, s: 240 },
    front(x, t, lt, P, F) {
      const swap = ease.inOutCubic(prog(lt, 1.0, 1.4))
      const ids = [['aries', 560], ['gemini', 700]]
      ids.forEach(([id, px], i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.35, 2); if (k > 0.01) signChar(x, t, id, px, 1060, 120 * k, { mood: 'happy', seed: 30 + i, glyph: false }) })
      const c = pop01(t, P.t0 + 1.1 * 1.29, 0.35, 2)
      if (c > 0.01) signChar(x, t, 'cancer', 850, 1000, 170 * c, { mood: 'happy', look: [-1, 0], seed: 33, glyph: false, hops: [P.t0 + 2.2] })
      umbrella(x, lerp(560, 410, swap), lerp(870, 690, swap), 1, lerp(0, 1, swap) > 0.5 ? SKYB : MOSS)
      label(x, 780, 640, 'YOUR TURN UNDER IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 0.3 && lt < 1.1) { x.fillStyle = 'rgba(143,227,255,0.7)'; for (let i = 0; i < 10; i++) { const ph = (t * 1.2 + i * 0.31) % 1; x.fillRect(150 + i * 80, 500 + ph * 300, 4, 20) } }
    } },
  { sign: S, cap: 'The big hoodie | *is the outfit.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 880, 34 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 790, 1150, 'SIZE: MAXIMUM COZY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your best match? | *The couch, honestly.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -240 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      couch(x, 790, 1020, 0.7 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'A long stretch | *is self-care.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', star: { x: -200 }, squash: lt => -0.2 * Math.sin(Math.PI * clamp((lt - 0.3) / 1.4)),
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'POP. CRACK. | AHHH.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 340, 800, P.t0 + 1.3, 7, 170, 0.4)
      label(x, 790, 1060, 'BACK: GRATEFUL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Snack break? | *Always valid.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 990, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'SNACK: DESERVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MOSS, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a009', key: 'G', accent: MOSS, solo: S, ending: 'callback',
  title: 'Taurus, you’re | *allowed to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Strong all week. | *Soft all weekend.*', mood: 'sleepy' },
  last: {
    text: 'The couch | *matched back.*',
    draw(x, t, lt) {
      couch(x, 540, 1100, pop01(t, t - lt + 0.3, 0.4, 2))
      const k = pop01(t, t - lt + 0.7, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 540, 980, 240 * k, { mood: lt > 1.5 ? 'sleepy' : 'heart', seed: 40, hops: [t - lt + 1.0] })
      label(x, 540, 790, '✦ IT’S A MATCH', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 1040, t - lt + 1.5, { n: 6, life: 1.6, spread: 420, cell: 6, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
