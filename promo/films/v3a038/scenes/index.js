// v3a038: star_advice, ADVICE SOLO, "How to love | a Capricorn." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love a Capricorn, warm, steady, a little nerdy.
//   0.0–3.6    "How to love | *a Capricorn.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              respect the calendar (a colour-blocked planner: DATE 7:00 SHARP) · tell them to log off at six (a clock)
//              · celebrate the small wins (a tiny trophy: INBOX ZERO) · find the soft side (a rock cracks open: a heart)
//              · plan the future together (a five-year plan, two lines going up) · admire the spreadsheet (GORGEOUS)
//              · a real vacation (beach umbrella, the laptop in the sand: NO LAPTOP) · their love language is fixing your
//              stuff (a wonky shelf, fixed) · patient love, built to last (a brick heart: LOAD-BEARING)
//  37.8        "Serious heart. | *Soft inside.*"  Capricorn comes back, big.
//  41.0        LESSON UNLOCKED: "Steady | *is romantic.*"  LOVE: SECURED
//  46.9        "They scheduled | *a cuddle.*"  (the planner from card one, with one new block: CUDDLE)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', CREAM = '#fff4e2', SAGE = '#6fd3a8', STONE = '#8f8aa8'
const S = 'capricorn'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function planner(x, cx, cy, k, extra) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -190, 360, 380)
  x.fillStyle = CREAM; x.fillRect(-172, -182, 344, 364)
  x.fillStyle = SAGE; x.fillRect(-172, -182, 344, 54)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -155)
  x.fillStyle = 'rgba(27,18,54,0.25)'; for (let i = 0; i < 5; i++) x.fillRect(-150 + i * 62, -116, 2, 280)
  const blocks = [[0, -100, 70, SKYB], [1, -60, 90, GOLD], [2, -110, 50, LAV], [3, -80, 120, SKYB], [4, -100, 60, GOLD], [0, 0, 60, MINT], [2, -40, 80, MINT], [4, 0, 90, LAV]]
  blocks.forEach(([c, y, h, col]) => { x.fillStyle = col; x.fillRect(-146 + c * 62, y, 56, h); x.fillStyle = INK; x.fillRect(-146 + c * 62, y, 56, 4) })
  if (extra > 0.01) { x.save(); x.translate(-118 + 2 * 62 + 28, 110); x.scale(extra * 1.3, extra * 1.3); x.fillStyle = INK; x.fillRect(-90, -30, 180, 60); x.fillStyle = PINK; x.fillRect(-84, -24, 168, 48); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('CUDDLE', 0, 2); x.restore() }
  x.restore()
}
function clock(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 136, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 112 - 6, Math.sin(a) * 112 - 6, 12, 12) }
  const m = lerp(-0.6, 0, ease.inOutCubic(clamp(lt / 1.2))) * Math.PI * 2
  x.save(); x.rotate(m); x.fillStyle = INK; x.fillRect(-5, -110, 10, 112); x.restore()
  x.save(); x.rotate(Math.PI + m / 12); x.fillStyle = RED; x.fillRect(-7, -76, 14, 78); x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
const TROPHY = [
  'GGGGGGG',
  'G.GGG.G',
  'G.GGG.G',
  '.GGGGG.',
  '..GGG..',
  '...G...',
  '..WWW..',
  '.WWWWW.',
]
function rock(x, t, cx, cy, k, crack) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const half = (side) => {
    x.save(); x.translate(side * 60 * crack, 10 * crack); x.rotate(side * 0.25 * crack)
    x.fillStyle = INK; x.beginPath()
    if (side < 0) { x.moveTo(0, -150); x.lineTo(-120, -110); x.lineTo(-170, 10); x.lineTo(-120, 120); x.lineTo(0, 130); x.lineTo(-20, 60); x.lineTo(10, 0); x.lineTo(-15, -70) }
    else { x.moveTo(0, -150); x.lineTo(120, -100); x.lineTo(170, 20); x.lineTo(110, 120); x.lineTo(0, 130); x.lineTo(-20, 60); x.lineTo(10, 0); x.lineTo(-15, -70) }
    x.closePath(); x.fill(); x.fillStyle = STONE; x.scale(0.92, 0.92); x.fill()
    x.restore()
  }
  half(-1); half(1)
  x.restore()
  if (crack > 0.3) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, cx, cy, 16 * k * clamp((crack - 0.3) / 0.5) * (1 + 0.08 * Math.sin(t * 8)))
}
function chart(x, t, cx, cy, k, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -160, 380, 320)
  x.fillStyle = CREAM; x.fillRect(-182, -152, 364, 304)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('5-YEAR PLAN: US', 0, -124)
  x.fillStyle = INK; x.fillRect(-150, -90, 6, 210); x.fillRect(-150, 114, 310, 6)
  const line = (col, off) => { x.strokeStyle = col; x.lineWidth = 10; x.beginPath(); const N = Math.max(2, Math.floor(draw * 6) + 1); for (let i = 0; i < N; i++) { const px = -140 + i * 56, py = 90 - i * 30 - off - 8 * Math.sin(i * 1.7); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  line(SAGE, 0); line(PINK, 18)
  x.restore()
}
function sheet(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -160, 380, 320)
  x.fillStyle = '#fff'; x.fillRect(-182, -152, 364, 304)
  x.fillStyle = SAGE; x.fillRect(-182, -152, 364, 40)
  for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) { x.fillStyle = (r + c) % 3 === 0 ? 'rgba(111,211,168,0.5)' : r % 2 ? '#f2f2f8' : '#fff'; x.fillRect(-176 + c * 72, -106 + r * 36, 68, 32) }
  x.fillStyle = INK; for (let i = 0; i <= 5; i++) x.fillRect(-180 + i * 72, -112, 2, 260)
  x.restore()
}
function beach(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, -200, 12, 300)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, -170); x.quadraticCurveTo(0, -330, 200, -170); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-188, -176); x.quadraticCurveTo(0, -318, 188, -176); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-60, -190); x.quadraticCurveTo(0, -300, 60, -190); x.closePath(); x.fill()
  x.fillStyle = '#f0dca8'; x.beginPath(); x.ellipse(0, 110, 220, 40, 0, 0, Math.PI * 2); x.fill()
  // laptop half buried
  x.save(); x.translate(110, 90); x.rotate(0.3); x.fillStyle = INK; x.fillRect(-60, -50, 120, 70); x.fillStyle = '#9a9ab0'; x.fillRect(-54, -44, 108, 58); x.restore()
  x.fillStyle = '#f0dca8'; x.fillRect(40, 96, 160, 40)
  x.restore()
}
function shelf(x, t, cx, cy, k, fix) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -30, 20, 120); x.fillRect(150, -30, 20, 120)
  x.save(); x.rotate(lerp(0.22, 0, fix))
  x.fillStyle = INK; x.fillRect(-190, -40, 380, 32); x.fillStyle = WOOD; x.fillRect(-184, -34, 368, 20)
  const books = [[-140, 70, SKYB], [-100, 90, PINK], [-60, 80, GOLD], [-20, 60, MINT]]
  books.forEach(([bx, h, col]) => { x.fillStyle = INK; x.fillRect(bx - 18, -40 - h, 36, h); x.fillStyle = col; x.fillRect(bx - 13, -36 - h, 26, h - 4) })
  x.restore()
  x.restore()
  // the wrench
  if (fix < 0.98) { x.save(); x.translate(cx + 120 * k, cy + 60 * k); x.rotate(-0.8 + Math.sin(t * 14) * 0.3); x.scale(k, k); x.fillStyle = INK; x.fillRect(-12, -10, 24, 140); x.beginPath(); x.arc(0, -20, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9c9d9'; x.fillRect(-6, -4, 12, 128); x.beginPath(); x.arc(0, -20, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.fillRect(-10, -50, 20, 26); x.restore() }
}
function brickHeart(x, t, cx, cy, k, n) {
  const B = ['.BB.BB.', 'BBBBBBB', 'BBBBBBB', 'BBBBBBB', '.BBBBB.', '..BBB..', '...B...']
  const cells = []; B.forEach((r, j) => r.split('').forEach((c, i) => { if (c === 'B') cells.push([i, j]) }))
  cells.sort((a, b) => b[1] - a[1])
  const cell = 40 * k
  cells.forEach(([i, j], q) => {
    if (q >= n) return
    const px = cx + (i - 3) * cell, py = cy + (j - 3) * cell
    x.fillStyle = INK; x.fillRect(px - cell / 2, py - cell / 2, cell, cell)
    x.fillStyle = (i + j) % 2 ? '#d9534f' : '#c0443f'; x.fillRect(px - cell / 2 + 3, py - cell / 2 + 3, cell - 6, cell - 6)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Respect | *the calendar.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      planner(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), 0)
      label(x, 790, 1120, 'DATE: 7:00 SHARP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tell them | *to log off at six.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      clock(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'IT’S SIX. GO HOME.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Celebrate | *the small wins.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { G: GOLD, W: WOOD }, 790, 900, 22 * pop01(t, P.t0 + 0.4, 0.35, 2.2))
      if (lt > 0.6) sparkles(x, t, 790, 880, P.t0 + 0.6, 8, 160, 0.5)
      label(x, 790, 1100, 'WINNER: INBOX ZERO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Find the soft side. | *It’s there.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      rock(x, t, 780, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.72, ease.outBack ? ease.outCubic(prog(lt, 0.9, 1.4)) : 0)
      label(x, 790, 660, 'VERY SOFT. DON’T TELL.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plan the future | *together.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      chart(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.4) / 1.0))
      label(x, 790, 1110, 'ROMANCE, BUT GRAPHED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Admire the spreadsheet. | *Seriously.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      sheet(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 760, 640, 'it’s gorgeous.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      if (lt > 1.2) hearts(x, t, 560, 800, P.t0 + 1.2, { n: 4, life: 1.2, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Take them | *on a real vacation.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      beach(x, t, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85)
      label(x, 790, 1150, 'LAPTOP: BURIED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love language: | *fixing your stuff.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      shelf(x, t, 780, 940, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9, ease.inOutCubic(prog(lt, 0.7, 1.3)))
      label(x, 790, 660, 'SHELF: LEVEL. HEART: FULL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Patient love. | *Built to last.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.7],
    front(x, t, lt, P) {
      brickHeart(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.95, Math.floor(clamp((lt - 0.2) / 1.3) * 39))
      label(x, 790, 1150, 'LOAD-BEARING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a038', key: 'F', accent: SAGE, solo: S, ending: 'lesson',
  title: 'How to love | *a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Serious heart. | *Soft inside.*', mood: 'heart' },
  lesson: { text: 'Steady | *is romantic.*', chip: 'LOVE: SECURED' },
  last: {
    text: 'They scheduled | *a cuddle.*',
    draw(x, t, lt) { planner(x, 540, 1240, pop01(t, t - lt + 0.6, 0.35, 2) * 0.8, pop01(t, t - lt + 1.3, 0.35, 2.4)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
