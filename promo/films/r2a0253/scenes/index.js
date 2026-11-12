// r2a0253: star_advice, ADVICE SOLO, "Aquarius, your idea | deserves a voice." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a true thing about Aquarius + a warm reframe, one gag each.
//   0.0–3.6    "Aquarius, your idea | *deserves a voice.*"
//   3.6–37.8   nine cards (3.8 s each):
//              idea in the shower, write it on the mirror · odd idea, every great one was (flying toast) · quiet in the
//              meeting, everyone leaned in · ahead of your time, time will catch up · notebooks full of plans, start with one
//              page · heard "that won't work", show them gently · feel like an alien, your people exist · sharing feels scary,
//              start with one friend · the world needs your strange little spark
//  37.8        "Odd ideas. | *Brilliant you.*"  Aquarius comes back, big.
//  41.2        callback: "And the flying toast? | *Big hit.*"  the toaster flies back over a cheering crowd.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQU = '#38c4ec', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'aquarius'

function slab(x, cx, cy, w, h, k, { rot = 0.04, bg = BONE, edge = INK } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(x)
  x.restore()
}
const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

const BULB = [
  '..YYYYY..',
  '.YYYYYYY.',
  'YYYWYYYYY',
  'YYWYYYYYY',
  'YYYYYYYYY',
  '.YYYYYYY.',
  '..YYYYY..',
  '...GGG...',
  '...ggg...',
  '...GGG...',
]
const BULB_C = { Y: '#ffe27a', W: '#fff', G: '#a9a9bd', g: '#6b6b80' }
// a fogged mirror with a doodled light bulb being wiped in
function mirror(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 300, 400, k, { rot: 0.02, bg: '#b9e8f5' }, x => {
    x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(-150, -200, 300, 400)
    const p = clamp((lt - 0.4) / 1.0)
    x.strokeStyle = '#4a8aa0'; x.lineWidth = 12; x.lineCap = 'round'
    x.beginPath(); x.arc(0, -40, 80, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * Math.min(1, p * 1.4)); x.stroke()
    if (p > 0.7) { x.beginPath(); x.moveTo(-40, 50); x.lineTo(40, 50); x.moveTo(-30, 80); x.lineTo(30, 80); x.stroke() }
    if (p > 0.9) txt(x, 'IDEA!', 0, 150, 40, '#2a6a80')
    // drips
    x.fillStyle = 'rgba(255,255,255,0.8)'; for (let i = 0; i < 5; i++) x.fillRect(-120 + i * 58, -190 + ((t * 30 + i * 47) % 80), 6, 22)
  })
}
// a toaster with little wings (and toast peeking out)
function toaster(x, t, cx, cy, k, { flap = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 120, -40); x.rotate(d * (-0.4 - 0.4 * Math.sin(flap)))
    x.fillStyle = INK; x.beginPath(); x.ellipse(d * 60, -20, 74, 34, d * -0.4, 0, 7); x.fill()
    x.fillStyle = '#fff'; x.beginPath(); x.ellipse(d * 60, -20, 66, 26, d * -0.4, 0, 7); x.fill()
    x.fillStyle = '#d8e8ff'; x.fillRect(d * 30 - 4, -26, d * 60, 6)
    x.restore()
  }
  x.fillStyle = '#c98f2a'; x.fillRect(-70, -140, 50, 60); x.fillRect(10, -150, 50, 70)
  x.fillStyle = INK; x.fillRect(-74, -144, 58, 6); x.fillRect(6, -154, 58, 6)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-130, -100, 260, 180, 40); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.roundRect(-120, -90, 240, 160, 34); x.fill()
  x.fillStyle = '#e8e8f2'; x.fillRect(-100, -70, 200, 14)
  x.fillStyle = INK; x.fillRect(-80, -94, 60, 10); x.fillRect(10, -94, 60, 10)
  x.fillStyle = RED; x.fillRect(90, -10, 30, 22)
  x.restore()
}
// a clock with little legs running to catch up
function runningClock(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const run = Math.sin(t * 14)
  x.fillStyle = INK
  x.save(); x.translate(-30, 100); x.rotate(run * 0.5); x.fillRect(-8, 0, 16, 80); x.fillRect(-8, 72, 40, 16); x.restore()
  x.save(); x.translate(30, 100); x.rotate(-run * 0.5); x.fillRect(-8, 0, 16, 80); x.fillRect(-8, 72, 40, 16); x.restore()
  x.beginPath(); x.arc(0, 0, 122, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 92 - 4, Math.sin(a) * 92 - 4, 8, 8) }
  x.save(); x.rotate(t * 3); x.fillRect(-4, -80, 8, 80); x.restore()
  x.save(); x.rotate(t * 0.4); x.fillRect(-6, -55, 12, 55); x.restore()
  // sweat drop
  x.fillStyle = SKYB; x.beginPath(); x.ellipse(120, -90, 12, 18, 0, 0, 7); x.fill()
  x.restore()
}
// a tall wobbly stack of notebooks; one open page glows
function notebooks(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const cols = [PINK, MINT, GOLD, LAV, SKYB, '#ffb34a', PINK, MINT]
  for (let i = 0; i < 8; i++) {
    const y = 140 - i * 44, sx = Math.sin(i * 1.7) * 18 + Math.sin(t * 2 + i) * 2
    x.fillStyle = INK; x.fillRect(sx - 130, y - 20, 260, 44); x.fillStyle = cols[i]; x.fillRect(sx - 124, y - 14, 248, 32); x.fillStyle = CREAM; x.fillRect(sx + 90, y - 14, 34, 32)
  }
  x.restore()
  const p = ease.outBack(prog(lt, 0.9, 1.25))
  if (p > 0.01) slab(x, cx - 10, cy + 260 - 300, 220, 150, p, { rot: -0.06, bg: CREAM }, x => {
    txt(x, 'PAGE 1', 0, -40, 30, INK, MONO, 700)
    x.fillStyle = '#9a92b8'; for (let i = 0; i < 3; i++) x.fillRect(-80, 0 + i * 24, 160 - i * 30, 8)
  })
}
// a blueprint with a big check stamp
function blueprint(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 320, 260, k, { rot: 0.04, bg: '#2a5a9a' }, x => {
    x.strokeStyle = 'rgba(200,230,255,0.4)'; x.lineWidth = 2
    for (let i = -140; i <= 140; i += 28) { x.beginPath(); x.moveTo(i, -120); x.lineTo(i, 120); x.stroke(); x.beginPath(); x.moveTo(-150, i * 0.8); x.lineTo(150, i * 0.8); x.stroke() }
    x.strokeStyle = '#dff2ff'; x.lineWidth = 6; x.strokeRect(-90, -50, 120, 80); x.beginPath(); x.arc(70, 0, 40, 0, 7); x.stroke(); x.beginPath(); x.moveTo(30, -10); x.lineTo(30, 10); x.stroke()
    const s = ease.outBack(prog(lt, 1.1, 1.4))
    if (s > 0.01) { x.save(); x.rotate(-0.2); x.scale(1 + 0.5 * (1 - s), 1 + 0.5 * (1 - s)); x.globalAlpha = s; x.strokeStyle = MINT; x.lineWidth = 9; x.strokeRect(-130, -36, 260, 72); txt(x, 'IT WORKS', 0, 2, 46, MINT, MONO, 700); x.restore() }
  })
}
// a tiny saucer beaming down a friend
function ufo(x, t, cx, cy, k, beam) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + Math.sin(t * 3) * 8); x.scale(k, k)
  if (beam > 0) { x.fillStyle = `rgba(160,255,200,${0.3 * beam})`; x.beginPath(); x.moveTo(-50, 20); x.lineTo(50, 20); x.lineTo(110, 320); x.lineTo(-110, 320); x.closePath(); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 44, 0, 0, 7); x.fill()
  x.fillStyle = '#a9a9bd'; x.beginPath(); x.ellipse(0, 0, 140, 34, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -20, 70, 50, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#b9e8f5'; x.beginPath(); x.ellipse(0, -20, 60, 42, 0, Math.PI, 0); x.fill()
  for (let i = 0; i < 5; i++) { x.fillStyle = (Math.floor(t * 4) + i) % 2 ? GOLD : PINK; x.fillRect(-100 + i * 50 - 8, 4, 16, 12) }
  x.restore()
}
// two tin cans on a string
function tinPhone(x, t, k, ax, ay, bx, by) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo((ax + bx) / 2, Math.max(ay, by) + 60, bx, by); x.stroke()
  const can = (cx, cy, d) => { x.save(); x.translate(cx, cy); x.rotate(d * 0.3); x.fillStyle = INK; x.fillRect(-34, -44, 68, 88); x.fillStyle = '#c9c9d8'; x.fillRect(-28, -38, 56, 76); x.fillStyle = AQU; x.fillRect(-28, -10, 56, 20); x.restore() }
  can(ax, ay, -1); can(bx, by, 1)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Idea in the shower? | *Write it on the mirror.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { mirror(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'Too odd, you think? | *Every great idea was.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      toaster(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { flap: lt > 0.9 ? t * 14 : 0 })
      label(x, 790, 1130, 'FLYING TOAST v1', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: AQU, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quiet in the meeting? | *They’d love to hear it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      bubble(x, 420, 620, 'um… what if…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bc' })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      const lean = ease.outBack(prog(lt, 1.0, 1.3)) * -0.25
      if (k > 0.01) for (const [i, id] of ['taurus', 'leo', 'libra'].entries()) {
        x.save(); x.translate(680 + i * 120, 1000); x.rotate(lean); x.translate(-(680 + i * 120), -1000)
        signChar(x, t, id, 680 + i * 120, 990, 130 * k, { mood: lt > 1.0 ? 'wide' : 'neutral', look: [-1, 0], seed: 30 + i, glyph: false })
        x.restore()
      }
      label(x, 800, 760, 'EVERYONE LEANED IN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ahead of your time? | *Time will catch up.*', mood: lt => lt > 1.2 ? 'happy' : 'wink', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const run = ease.outCubic(prog(lt, 0.3, 1.6))
      runningClock(x, t, lerp(1000, 760, run), 860, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 760, 620, 'wait up!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Notebooks full of plans? | *Start with one page.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      notebooks(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      sparkles(x, t, 780, 920, P.t0 + 1.3, 7, 150, 0.3)
    } },
  { sign: S, cap: 'Heard “that won’t work”? | *Show them, gently.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 610, 'that won’t work', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      blueprint(x, t, 790, 900, pop01(t, P.t0 + 0.5, 0.35, 2), lt)
    } },
  { sign: S, cap: 'Feel like an alien? | *Your people exist.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const beam = clamp((lt - 0.6) * 2)
      ufo(x, t, 790, 620, pop01(t, P.t0 + 0.2, 0.35, 2), beam)
      const d = ease.outCubic(prog(lt, 0.7, 1.3))
      if (d > 0.01) signChar(x, t, 'gemini', 790, lerp(720, 1000, d), 150, { mood: 'happy', look: [-1, 0], seed: 41, glyph: false, alpha: clamp(d * 2) })
      bubble(x, 790, 1150, 'same!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Sharing feels scary? | *Start with one friend.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 850, 980, 170 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 44, glyph: false })
      tinPhone(x, t, k, F.x + 110, F.cy + 10, 760, 960)
      bubble(x, 600, 640, 'okay so I had an idea…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 30, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 850, 860, P.t0 + 1.4 * 1.29, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'The world needs | *your strange little spark.*', mood: 'sparkle', star: { x: 0, y: 30, s: 300 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.4 * k; x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(540, 620, 90 + 8 * Math.sin(t * 5), 0, 7); x.fill(); x.restore() }
      drawBits(x, BULB, BULB_C, 540, 620, 14 * k)
      sparkles(x, t, 540, 620, P.t0 + 1.0, 8, 150, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0253', key: 'C', accent: AQU, solo: S, ending: 'callback',
  title: 'Aquarius, your idea | *deserves a voice.*',
  cameos: CAMEOS,
  group: { cap: 'Odd ideas. | *Brilliant you.*', mood: 'sparkle' },
  last: {
    text: 'And the flying toast? | *Big hit.*',
    draw(x, t, lt) {
      const fly = ease.inOutCubic(prog(lt, 0.2, 1.4))
      toaster(x, t, lerp(1250, 620, fly), 900 + Math.sin(t * 3) * 20, 1.05, { flap: t * 14 })
      const k = pop01(t, t - lt + 0.8, 0.45, 1.8)
      if (k > 0.01) for (const [i, id] of ['aquarius', 'aries', 'virgo', 'sagittarius'].entries()) signChar(x, t, id, 270 + i * 180, 1260, (i === 0 ? 220 : 160) * k, { mood: i === 0 ? 'sparkle' : 'wide', look: [0, -1], seed: 50 + i, glyph: i === 0, hops: [t - lt + 1.4 + i * 0.15] })
      label(x, 540, 1440, 'BRAVO!', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 46, bg: AQU, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
