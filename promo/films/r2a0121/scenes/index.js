// r2a0121: ADVICE SOLO, "Virgo, have you | eaten today?" (~47 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Virgo truth + a warm reframe, one gag each.
//   0.0–3.6    "Virgo, have you | *eaten today?*"
//   3.6–37.8   skipped lunch for a typo (lunch first) · your list has a list (cross one off) · reorganized the fridge
//              (now eat from it) · helping everyone (+ you) · even your birth chart says snack break · one thing's crooked
//              (still a good day) · drank water (gold star) · midnight planning (it can wait)
//              · you feed everyone (let someone cook for you: Cancer brings a pie)
//  37.8        GROUP ENDING: "Eat something. | You're *doing great.*"  Virgo, heart-eyed.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ee08a', RED = '#e23d4e', CREAM = '#fff4e2'

// ── props
const SANDWICH = ['...BBBBBBB...', '.BBBBBBBBBBB.', 'GGGGGGGGGGGGG', 'TTTTTTTTTTTTT', 'CCCCCCCCCCCCC', '.BBBBBBBBBBB.']
const SANDWICH_C = { B: '#e8b46a', G: '#5fd068', T: RED, C: '#ffd23a' }
const PLATE = ['..WWWWWWWWWWW..', '.WWWWWWWWWWWWW.', 'WWWWWWWWWWWWWWW', '.WWWWWWWWWWWWW.', '...WWWWWWWWW...']
const PLATE_C = { W: CREAM }
const GLASS = ['S.......S', 'S.......S', 'SWWWWWWWS', 'SWWWWWWWS', 'SWwWWWWWS', 'SWwWWWWWS', 'SWWWWWWWS', 'SWWWWWWWS', '.SSSSSSS.']
const GLASS_C = { S: '#d8e8ff', W: SKYB, w: '#ffffff' }
const STAR5 = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YY...YY.', 'YY.....YY']
const MOON = ['..MMM..', '.MM....', 'MM.....', 'MM.....', 'MM.....', '.MM....', '..MMM..']
const PIE = ['.....s.s.s.....', '..CCCCCCCCCCC..', '.CPCPCPCPCPCPC.', 'CCCCCCCCCCCCCCC', 'CFFFFFFFFFFFFFC', '.CCCCCCCCCCCCC.', '..TTTTTTTTTTT..']
const PIE_C = { C: '#e8b46a', P: '#c4507a', F: '#e86a8a', T: '#b07a3a', s: BONE }
const COOKIE = ['..CCCCC..', '.CCKCCCC.', 'CCCCCCKCC', 'CKCCCCCCC', 'CCCCKCCCC', '.CCCCCKC.', '..CCCCC..']
const COOKIE_C = { C: '#e8b46a', K: '#5b2e1a' }

function strike(x, cx, cy, w, k, col = RED) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = col; x.lineWidth = 10; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx - w / 2, cy + 6); x.lineTo(cx - w / 2 + w * k, cy - 6); x.stroke(); x.restore()
}
// a long paper list whose top item is "make list" and the first box gets ticked
function lists(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const back = (dx, dy) => { x.fillStyle = INK; x.fillRect(dx - 128, dy - 178, 256, 356); x.fillStyle = '#e9ddc7'; x.fillRect(dx - 120, dy - 170, 240, 340) }
  back(36, 30)
  x.fillStyle = INK; x.fillRect(-128, -178, 256, 356); x.fillStyle = CREAM; x.fillRect(-120, -170, 240, 340)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('TO DO:', -96, -136)
  const items = ['make list', 'list the lists', 'sort lists', 'label lists', 'eat?']
  items.forEach((s, i) => {
    const y = -84 + i * 54
    x.fillStyle = '#6b62a8'; x.fillRect(-96, y - 14, 28, 28); x.fillStyle = CREAM; x.fillRect(-92, y - 10, 20, 20)
    x.fillStyle = i === 4 ? RED : INK; x.font = `700 22px ${MONO}`; x.fillText(s, -56, y + 2)
  })
  if (lt > 1.2) { x.fillStyle = GREEN; x.font = `800 40px ${INTER}`; x.fillText('✓', -100, -80) }
  x.restore()
  strike(x, cx + 10, cy - 80, 210, ease.outCubic(prog(lt, 1.2, 1.5)), GREEN)
}
// a fridge, door open, every jar labelled
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -192, 276, 400)
  x.fillStyle = INK; x.fillRect(-140, -204, 280, 408)
  x.fillStyle = '#e3eef7'; x.fillRect(-132, -196, 264, 392)
  x.fillStyle = '#fffbe8'; x.fillRect(-118, -182, 236, 364)
  const COLS = ['#ff9a4a', '#5fd068', '#ffd23a', '#ff8fb1', '#8fe3ff', '#c97bff']
  for (let r = 0; r < 3; r++) {
    x.fillStyle = '#b9c7d6'; x.fillRect(-118, -70 + r * 110, 236, 8)
    for (let c = 0; c < 4; c++) {
      const jx = -96 + c * 56, jy = -110 + r * 110
      x.fillStyle = INK; x.fillRect(jx - 2, jy - 2, 40, 54)
      x.fillStyle = COLS[(r * 4 + c) % 6]; x.fillRect(jx, jy, 36, 50)
      x.fillStyle = CREAM; x.fillRect(jx + 4, jy + 16, 28, 14)
      x.fillStyle = INK; x.fillRect(jx + 8, jy + 21, 20, 3)
    }
  }
  x.restore()
}
// a birth-chart wheel with a cookie at its centre
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[(i + 7) % 12]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.restore()
  drawBits(x, COOKIE, COOKIE_C, 0, 0, 13)
  x.restore()
}
// a picture frame hanging slightly crooked
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy - 120); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-4, -20, 8, 20)
  x.rotate(rot); x.translate(0, 130)
  x.fillStyle = INK; x.fillRect(-130, -110, 260, 220)
  x.fillStyle = GOLD; x.fillRect(-122, -102, 244, 204)
  x.fillStyle = '#8fd8ff'; x.fillRect(-100, -80, 200, 160)
  x.fillStyle = '#5fd068'; x.fillRect(-100, 20, 200, 60)
  x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(50, -30, 22, 0, Math.PI * 2); x.fill()
  x.restore()
}

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'Skipped lunch for a typo? | *Lunch first.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 650, 'TYPO: 1', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      drawBits(x, PLATE, PLATE_C, 790, 960, 16 * k)
      drawBits(x, SANDWICH, SANDWICH_C, 790, 910, 18 * k)
      sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 150, 0.2)
    } },
  { sign: S, cap: 'Your list has a list? | *Cross one off.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) { lists(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'Reorganized the fridge? | Now *eat from it.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      fridge(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'LABELLED: ALL', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'snack time?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Helping everyone today? | *Add you* to the list.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 760, 'TO HELP: EVERYONE', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 900, '+ ME', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 64, bg: GREEN, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 470, 700, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Even your birth chart | says *snack break.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      chart(x, 790, 840, 160, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1080, 'MOON IN COOKIE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One thing’s crooked? | *Still a good day.*', mood: lt => lt > 1.5 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      frame(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 0.12 + Math.sin(t * 2) * 0.01)
      label(x, 790, 1090, 'LEFT IT. GROWTH.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Drank some water? | *Gold star.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 760, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 1.0, 0.3, 2.6)
      drawBits(x, STAR5, { Y: GOLD }, 860, 720, 16 * k, { rot: 0.2 })
      sparkles(x, t, 860, 720, P.t0 + 1.1, 7, 120, 0.3)
    } },
  { sign: S, cap: 'Midnight planning? | *It can wait.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: '#fff1a8' }, 860, 640, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 760, 860, '12:00 AM', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 52, bg: '#2a2350', color: SKYB, rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'goodnight, list', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'You feed everyone. | *Let someone feed you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k <= 0.01) return
      const ex = lerp(980, 800, ease.outCubic(prog(lt, 0.3, 1.0)))
      signChar(x, t, 'cancer', ex, 960, 210 * k, { mood: 'happy', look: [-1, 0], seed: 17, glyph: false })
      drawBits(x, PIE, PIE_C, ex - 40, 830, 14 * k)
      hearts(x, t, 600, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0121', key: 'D', accent: GREEN, solo: 'virgo', ending: 'group',
  title: 'Virgo, have you | *eaten today?*',
  cameos: CAMEOS,
  group: {
    cap: 'Eat something. | You’re *doing great.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
