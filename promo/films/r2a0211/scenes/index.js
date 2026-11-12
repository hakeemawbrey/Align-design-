// r2a0211: star_advice, ADVICE SOLO, "Virgo, let someone | else plan it." (~46 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Virgo truth + a warm reframe, one gag each.
//   0.0–3.6    "Virgo, let someone | *else plan it.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a spreadsheet for brunch · a friend picked the place (just show up) · the plan changed (plan B, also fun)
//              · a tower of backup plans shrinks to plan A · the dishwasher loaded "wrong" (still clean)
//              · your match planned the date (surprise accepted) · "nap" on the to-do list (no tick needed)
//              · one sock on the floor (still home) · you help everyone (a friend brings you tea)
//  37.8        "Plans can wait. | *You can rest.*"  Virgo comes back, big.
//  41.2        callback: "Unplanned brunch? | *Best one yet.*"  The brunch spreadsheet returns, stamped.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fe0a8', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a'
const S = 'virgo'

// ── props
const PIN = [
  '..RRRRR..',
  '.RRRRRRR.',
  'RRRWWWRRR',
  'RRRWWWRRR',
  '.RRRRRRR.',
  '..RRRRR..',
  '...RRR...',
  '....R....',
]
const SOCK = [
  '.WWWW....',
  '.SSSS....',
  '.WWWW....',
  '.SSSS....',
  '.WWWW....',
  '.SSSSS...',
  '.WWWWWWW.',
  '.SSSSSSSS',
  '..WWWWWW.',
]
const SOCK_C = { W: CREAM, S: PINK }
const CUP = [
  '..s.s....',
  '.s.s.....',
  'WWWWWWW..',
  'WTTTTTWWW',
  'WTTTTTW.W',
  'WTTTTTWWW',
  'WWWWWWW..',
  '.WWWWW...',
]
const CUP_C = { W: CREAM, T: '#c98f6a', s: 'rgba(239,230,214,0.7)' }

// a clipboard spreadsheet: n rows of little cells fill in; optional stamp across it
function sheet(x, cx, cy, k, { n = 6, head = 'BRUNCH v14', stamp = 0, stampText = 'BEST ONE YET', rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -190, 296, 400)
  x.fillStyle = INK; x.fillRect(-152, -202, 304, 404); x.fillStyle = WOOD; x.fillRect(-146, -196, 292, 392)
  x.fillStyle = CREAM; x.fillRect(-128, -160, 256, 340)
  x.fillStyle = INK; x.fillRect(-50, -214, 100, 34); x.fillStyle = '#8a8aa0'; x.fillRect(-44, -208, 88, 22)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  const COLS = [SAGE, SKYB, GOLD, PINK]
  for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) {
    const px = -112 + c * 58, py = -100 + r * 38
    x.fillStyle = '#d8d0c0'; x.fillRect(px, py, 52, 30)
    if (r < n) { x.fillStyle = COLS[(r + c) % 4]; x.fillRect(px + 3, py + 3, 46, 24) }
  }
  x.restore()
  if (stamp > 0.01) label(x, cx, cy + 20, stampText, stamp, { size: 40, bg: RED, color: CREAM, rot: -0.18, font: MONO, weight: 700 })
}
// a phone with chat lines
function phone(x, cx, cy, k, { head = '✦ YOUR MATCH', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a paper card with lines of text; crossed lines get a red strike
function note(x, cx, cy, k, rows, { rot = -0.04, w = 300 } = {}) {
  if (k <= 0.01) return
  const h = 70 + rows.length * 56
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, strike, col], i) => {
    const y = -h / 2 + 50 + i * 56
    x.fillStyle = col || INK; x.font = `800 30px ${INTER}`; x.fillText(txt, -w / 2 + 26, y)
    if (strike > 0.01) { x.fillStyle = RED; x.fillRect(-w / 2 + 20, y - 3, (x.measureText(txt).width + 12) * strike, 7) }
  })
  x.restore()
}
// a wobbling tower of folders: PLAN A … PLAN F; all but A slide away
function plans(x, t, lt, P) {
  const COLS = [SAGE, SKYB, GOLD, PINK, LAV, ORANGE]
  const away = ease.inOutCubic(prog(lt, 1.3, 1.9))
  for (let i = 5; i >= 0; i--) {
    const k = pop01(t, P.t0 + 0.15 + i * 0.12, 0.25, 2.2) * (i > 0 ? 1 - away : 1)
    if (k <= 0.01) continue
    const px = 790 + Math.sin(t * 3 + i) * 4 * i * (1 - away), py = 1040 - i * 70
    x.save(); x.translate(px, py); x.rotate(Math.sin(i * 1.3) * 0.06); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-124, -34, 248, 68); x.fillStyle = COLS[i]; x.fillRect(-118, -28, 236, 56)
    x.fillRect(-118, -42, 80, 16)
    x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`PLAN ${'ABCDEF'[i]}`, 0, 2)
    x.restore()
  }
}
// a dishwasher rack: plates at every angle
function rack(x, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(790, 900); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -40, 340, 150); x.fillStyle = '#8a8aa0'; x.fillRect(-162, -32, 324, 134)
  x.fillStyle = '#5b5d78'; for (let i = 0; i < 9; i++) x.fillRect(-150 + i * 36, -32, 6, 134)
  const ROT = [0.5, -0.7, 0.2, 1.1, -0.3, 0.8]
  ROT.forEach((r, i) => {
    x.save(); x.translate(-130 + i * 52, -10); x.rotate(r + 0.05 * Math.sin(lt * 5 + i))
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 16, 62, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = [CREAM, SKYB, CREAM, PINK, CREAM, SAGE][i]; x.beginPath(); x.ellipse(0, 0, 11, 56, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'A spreadsheet for brunch? | *Brunch will be fine.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { n: Math.floor(clamp((lt - 0.3) / 1.0) * 7) })
      label(x, 790, 1120, 'IT’S JUST EGGS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A friend picked the place? | *Just show up.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = '#bfe6c4'; x.fillRect(-152, -142, 304, 284)
        x.fillStyle = CREAM; x.fillRect(-152, -20, 304, 30); x.fillRect(-40, -142, 30, 284); x.fillRect(60, -142, 22, 284)
        x.restore()
      }
      const d = ease.outCubic(prog(lt, 0.5, 1.0))
      drawBits(x, PIN, { R: RED, W: CREAM }, 800, lerp(560, 840, d), 16 * k)
      bubble(x, 420, 620, 'where? | when? | why?', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (1 - prog(lt, 1.2, 1.35)), { size: 30, col: LAV, tail: 'bc' })
      label(x, 790, 1110, 'YOU: JUST ARRIVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The plan changed? | *You’ll still have fun.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), [
        ['10:00 museum', clamp((lt - 0.5) / 0.3)], ['12:15 lunch', clamp((lt - 0.7) / 0.3)], ['14:30 walk', clamp((lt - 0.9) / 0.3)], ['??? fun', 0, '#2f9a62'],
      ])
      label(x, 790, 1120, 'PLAN B: ALSO FUN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 700, 960, P.t0 + 1.5, 6, 120, 0.4)
    } },
  { sign: S, cap: 'Not everything needs | *a backup plan.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plans(x, t, lt, P)
      label(x, 790, 640, 'PLAN A IS ENOUGH', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dishwasher loaded “wrong”? | *Still clean.*', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      rack(x, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      bubble(x, 790, 650, 'deep breath…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'STILL CLEAN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 180, 0.6)
    } },
  { sign: S, cap: 'Your match planned the date? | *Let them.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { lines: [
        ['I planned saturday!', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['wait what’s the plan', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['it’s a surprise :)', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
      label(x, 790, 1110, 'SURPRISE: ACCEPTED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.6, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: S, cap: '“Nap” on the to-do list? | *Just take it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', star: { x: -200, y: 30 },
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), [['☐ laundry', 0], ['☐ emails', 0], ['☐ nap', 0, '#6b62a8']], { rot: 0.04, w: 280 })
      label(x, 790, 1080, 'NO TICK NEEDED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One sock on the floor? | *Still home.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: lt => lt < 1.3 ? [1, 1] : [0, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SOCK, SOCK_C, 790, 1020, 16 * k, { rot: 0.3 })
      label(x, 790, 700, 'ALERT: 1 SOCK', pop01(t, P.t0 + 0.5, 0.3, 2.2) * (1 - prog(lt, 1.3, 1.45)), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 700, 'IT CAN STAY', pop01(t, P.t0 + 1.45, 0.3, 2.4), { size: 34, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You help everyone. | *Let them help you.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, y: 20, s: 270 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 900, 280 * k, { mood: 'happy', look: [-1, 0], seed: 45, glyph: false, hops: [P.t0 + 1.1] })
      const d = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, CUP, CUP_C, lerp(700, 530, d), 1000, 13 * k)
      label(x, 790, 1130, 'HELP: ACCEPTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.5, { n: 5, life: 1.5, spread: 180, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0211', key: 'D', accent: SAGE, solo: S, ending: 'callback',
  title: 'Virgo, let someone | *else plan it.*',
  cameos: CAMEOS,
  group: { cap: 'Plans can wait. | *You can rest.*', mood: 'sparkle' },
  last: {
    text: 'Unplanned brunch? | *Best one yet.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sheet(x, 540, 1060, 0.95 * pop01(t, t0 + 0.6, 0.35, 2), { n: 2, head: 'BRUNCH v1', stamp: pop01(t, t0 + 1.3, 0.3, 2.6), rot: -0.03 })
      sparkles(x, t, 540, 1060, t0 + 1.35, 8, 230, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
