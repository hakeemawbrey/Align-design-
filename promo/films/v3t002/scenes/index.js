// v3t002: THE SIGNS AS… v3, SOLO film, "Dating a Virgo | be like." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine dating moments, each pushed to the most extreme (and lovable) Virgo version.
//   0.0–3.6    "Dating a Virgo | *be like.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards: sanitised the menu · one minute late, noted · a compliment with notes · slept over once,
//              deep-cleaned your flat · compatibility report with footnotes · "I'm fine", reorganised the fridge
//              · a spontaneous trip, itinerary attached · you sneezed once, first-aid kit · love language: fixing your shelf
//  37.8        "Picky? | *Devoted.*"
//  41.0        LESSON UNLOCKED: "Let a Virgo help. | That's how they *love.*"  STATUS: SORTED
//  46.9        "Their perfect match? | A *messy one.*" over the match card: Virgo + Sagittarius (the spontaneous trip).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#2fc79a', RED = '#e23d4e', BROWN = '#8a4a2e'

const SPRAY = [
  '.KKKK...',
  '.KKKKKK.',
  '..KK....',
  '.BBBB...',
  'BBBBBB..',
  'BWWWWB..',
  'BWBBWB..',
  'BWWWWB..',
  'BBBBBB..',
  'BBBBBB..',
  'BBBBBB..',
]
const SPRAY_C = { K: '#6b62a8', B: SKYB, W: '#fff4e2' }
const CLOCK = [
  '...WWWW...',
  '.WWWWWWWW.',
  '.WWWKWWWW.',
  'WWWWKWWWWW',
  'WWWWKKKWWW',
  'WWWWWWWWWW',
  '.WWWWWWWW.',
  '.WWWWWWWW.',
  '...WWWW...',
]
const CLOCK_C = { W: '#fff4e2', K: INK }
const KIT = [
  '...KKKK...',
  '...K..K...',
  'WWWWWWWWWW',
  'WWWWRRWWWW',
  'WWWWRRWWWW',
  'WWRRRRRRWW',
  'WWRRRRRRWW',
  'WWWWRRWWWW',
  'WWWWRRWWWW',
  'WWWWWWWWWW',
]
const KIT_C = { K: '#6b62a8', W: '#fff4e2', R: RED }
const LEVEL = [
  'YYYYYYYYYYYYYY',
  'YYYYYGGGGYYYYY',
  'YYYYYGWGGYYYYY',
  'YYYYYYYYYYYYYY',
]
const LEVEL_C = { Y: GOLD, G: MINT, W: '#ffffff' }

// a page with a big asterisked list
function paper(x, cx, cy, k, lt, { title = 'REPORT', lines = 6, rot = 0.05, foot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -160, 256, 340)
  x.fillStyle = INK; x.fillRect(-132, -174, 264, 348)
  x.fillStyle = '#fff4e2'; x.fillRect(-124, -166, 248, 332)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -134)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < lines; i++) x.fillRect(-96, -96 + i * 30, 150 + (i % 3) * 20, 10)
  const n = Math.floor(foot * clamp((lt - 0.6) / 1.2))
  x.fillStyle = RED; x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  for (let i = 0; i < n; i++) { x.fillText('*', 64 + (i % 2) * 14, -96 + i * 30); x.fillRect(-96, 96 + i * 16, 190 - (i % 2) * 40, 6) }
  x.restore()
}
// a fridge, open, with neat labelled jars
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -210, 300, 420)
  x.fillStyle = '#d8dbe8'; x.fillRect(-142, -202, 284, 404)
  x.fillStyle = '#eef6ff'; x.fillRect(-126, -186, 252, 372)
  x.fillStyle = '#9aa5c4'; for (let r = 0; r < 3; r++) x.fillRect(-126, -66 + r * 120, 252, 8)
  const JC = [RED, GOLD, TEAL, LAV, PINK, SKYB]
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 12)
  for (let i = 0; i < n; i++) {
    const c = i % 4, r = Math.floor(i / 4), px = -100 + c * 64, py = -110 + r * 120
    x.fillStyle = INK; x.fillRect(px - 2, py - 2, 44, 48); x.fillStyle = JC[(r * 4 + c) % 6]; x.fillRect(px, py, 40, 44)
    x.fillStyle = '#fff4e2'; x.fillRect(px + 4, py + 16, 32, 14)
  }
  x.restore()
}
// a scroll that keeps unrolling down the panel
function scroll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const len = lerp(60, 520, ease.outCubic(prog(lt, 0.4, 1.8)))
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-114, -24, 228, len + 30)
  x.fillStyle = '#fff4e2'; x.fillRect(-106, -16, 212, len + 14)
  x.fillStyle = '#b9b0a0'; for (let y = 20; y < len - 10; y += 26) x.fillRect(-84, y, 120 + (y % 3) * 14, 8)
  x.fillStyle = BROWN; x.fillRect(-126, -40, 252, 28); x.fillRect(-126, len - 4, 252, 28)
  x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DAY 1 · 6:00 AM', 0, 4)
  x.restore()
}
// a wall shelf that wobbles, then is fixed level
function shelf(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const fixed = lt > 1.1
  const rot = fixed ? 0 : 0.16 + 0.05 * Math.sin(t * 9)
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-154, -14, 308, 28); x.fillStyle = BROWN; x.fillRect(-148, -8, 296, 16)
  const BK = [RED, GOLD, TEAL, LAV, PINK]
  for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(-120 + i * 50 - 2, -92, 40, 86); x.fillStyle = BK[i]; x.fillRect(-120 + i * 50, -90, 36, 82) }
  x.restore()
  if (fixed) drawBits(x, LEVEL, LEVEL_C, cx, cy + 56, 16)
}

const CAMEOS = [
  { sign: 'virgo', cap: 'First date. | Sanitised *the menu.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 820, 870, k, lt, { title: 'MENU', lines: 7, rot: 0.06 })
      drawBits(x, SPRAY, SPRAY_C, 620, 760, 16 * pop01(t, P.t0 + 0.45, 0.3, 2), { rot: -0.2 })
      if (lt > 0.8 && lt < 1.6) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#eef6ff'; for (let i = 0; i < 12; i++) x.fillRect(660 + i * 14 + Math.sin(t * 20 + i) * 6, 730 + Math.sin(i * 1.7) * 30, 8, 8); x.restore() }
      sparkles(x, t, 820, 860, P.t0 + 1.3, 7, 170, 0.2)
      label(x, 820, 1100, 'GERMS: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'One minute late? | *Noted.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CLOCK, CLOCK_C, 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1050, 'LATE: 0:01', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'noted.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Paid you a compliment. | With *notes.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'great hair!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const notes = ['1. fringe: uneven', '2. try a mask', '3. still great!']
      notes.forEach((n, i) => label(x, 790, 820 + i * 100, n, pop01(t, P.t0 + 0.9 + i * 0.35, 0.3, 2.2), { size: 36, bg: i === 2 ? MINT : BONE, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'virgo', cap: 'Slept over once. | Deep-cleaned *your flat.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 700, 'DEEP CLEAN', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: SKYB, rot: -0.05 })
      for (let i = 0; i < 4; i++) sparkles(x, t, 700 + (i % 2) * 180, 860 + Math.floor(i / 2) * 140, P.t0 + 0.6 + i * 0.3, 6, 90, i)
      label(x, 790, 1060, 'STATUS: SPOTLESS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'you’re welcome', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Ran your compatibility. | Added *footnotes.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 620, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      paper(x, 800, 900, pop01(t, P.t0 + 0.4, 0.35, 2), lt, { title: 'YOU + ME', lines: 6, foot: 5, rot: 0.04 })
      label(x, 800, 1130, 'FOOTNOTES: 5', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Said “I’m fine.” | Reorganised *the fridge.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      fridge(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 380, 600, 'i’m fine.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: LAV, tail: 'bc' })
      label(x, 800, 1110, 'LABELLED. ALL OF IT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'A spontaneous trip. | *Itinerary attached.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      scroll(x, 800, 600, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 380, 1090, 'SPONTANEOUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.06 })
    } },
  { sign: 'virgo', cap: 'You sneezed once. | Packed *a first-aid kit.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 800, 620, 'achoo', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      drawBits(x, KIT, KIT_C, 800, 880, 22 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.05 })
      label(x, 800, 1100, 'ALSO: TISSUES ×40', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Love language? | *Fixing* your shelf.', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shelf(x, t, 750, 800, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1060, 'LEVEL. FINALLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.7, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t002', key: 'D', accent: TEAL, solo: 'virgo',
  title: 'Dating a Virgo | *be like.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'sagittarius', chip: 'ALIGNED' },
  group: { cap: 'Picky? | *Devoted.*', mood: 'heart' },
  lesson: { text: 'Let a Virgo help. | That’s how they *love.*', chip: 'STATUS: SORTED' },
  last: {
    text: 'Their perfect match? | A *messy one.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
