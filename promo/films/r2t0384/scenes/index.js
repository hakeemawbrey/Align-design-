// r2t0384: star_talk, SOLO (capricorn), "Capricorns making | a five-year plan." (signs3kit social cut, music: lofi · D).
// Ending: lesson.
//   five-year plan? it's a fifty-year scroll · already booked the retirement venue · budgeted for fun: twelve dollars
//   · a spreadsheet with tabs for the spreadsheet · a timeline for getting a dog · Plan B through Plan K
//   · new match, sent them the plan · finished year five in year two · birthday wish: quarterly targets
//   group "Born at 40. | Planning for 90."  lesson "Their plans always | have room for you."  last "Spontaneity? | Pencilled in."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = '#7dffb0'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const COIN = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', 'YYYYYY', '.YYYY.']
const DOG = ['K.......K..', 'KK.....KK..', 'BBBBBBBBB..', 'BBWKBBWKB..', 'BBBBBBBBB..', '.BBBNNBBB..', '..BBBBBB...']
const DOG_C = { K: '#8a4a2e', B: '#e8a24a', W: '#ffffff', N: INK }
const FLAG = ['K.RRRR', 'K.RRRR', 'K.RRR.', 'K.....', 'K.....', 'K.....']
const BALLOON = ['..PPPP..', '.PPWPPP.', 'PPWPPPPP', 'PPPPPPPP', 'PPPPPPPP', '.PPPPPP.', '..PPPP..', '...PP...', '....K...', '...K....', '....K...', '...K....']

/** a scroll that unrolls downward */
function scroll(x, cx, cy, lt) {
  const p = ease.outCubic(clamp((lt - 0.2) / 1.4)), h = 80 + 420 * p
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-138, -10, 276, h + 20)
  x.fillStyle = '#f3e3b8'; x.fillRect(-130, 0, 260, h)
  x.fillStyle = '#b89a6a'
  const yrs = ['2026', '2031', '2036', '2041', '2046', '2051', '2056', '2061', '2066', '2071', '2076']
  x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  yrs.forEach((y, i) => { const yy = 28 + i * 42; if (yy < h - 10) { x.fillStyle = '#6b62a8'; x.fillText(y, -112, yy); x.fillStyle = '#c9b48a'; x.fillRect(0, yy - 4, 110, 8) } })
  x.fillStyle = '#8a4a2e'; x.fillRect(-150, -26, 300, 30); x.fillRect(-150, h - 4, 300, 30)
  x.restore()
}
/** a spreadsheet with a row of tabs along the bottom */
function sheet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -150, 356, 320)
  x.fillStyle = INK; x.fillRect(-182, -164, 364, 324)
  x.fillStyle = '#ffffff'; x.fillRect(-174, -156, 348, 260)
  x.fillStyle = '#2fc79a'; x.fillRect(-174, -156, 348, 36)
  x.strokeStyle = '#c9d6e0'; x.lineWidth = 2
  for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(-174, -120 + i * 38); x.lineTo(174, -120 + i * 38); x.stroke() }
  for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(-174 + i * 87, -120); x.lineTo(-174 + i * 87, 104); x.stroke() }
  const tabs = ['PLAN', 'PLAN 2', 'TABS', 'TABS 2']
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * tabs.length + 0.001)
  x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) { x.fillStyle = [MINT, GOLD, PINK, SKYB][i]; x.fillRect(-170 + i * 86, 108, 82, 40); x.fillStyle = INK; x.fillText(tabs[i], -129 + i * 86, 128) }
  x.restore()
}
/** a timeline (gantt bars) */
function gantt(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -130, 360, 260)
  x.fillStyle = CREAM; x.fillRect(-172, -122, 344, 244)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('PROJECT: DOG', -152, -92)
  const rows = [['RESEARCH', 0, 0.5, SKYB], ['INTERVIEWS', 0.3, 0.8, LAV], ['TRIAL WALK', 0.6, 1.0, GOLD]]
  x.font = `700 18px ${MONO}`
  rows.forEach(([n, a, b, c], i) => {
    const y = -36 + i * 56, g = ease.outCubic(prog(lt, 0.4 + i * 0.3, 0.8 + i * 0.3))
    x.fillStyle = '#6b62a8'; x.fillText(n, -152, y)
    x.fillStyle = c; x.fillRect(-10 + a * 160, y - 16, (b - a) * 160 * g, 32)
  })
  x.restore()
}
/** a stack of folders labelled A…K */
function folders(x, cx, cy, lt) {
  const L2 = 'BCDEFGHIJK', n = Math.min(L2.length, Math.floor(Math.max(0, lt - 0.3) / 0.12) + 1)
  const COLS = [SKYB, MINT, GOLD, PINK, LAV, ORANGE]
  for (let i = 0; i < n; i++) {
    const y = cy + 190 - i * 38
    x.save(); x.translate(cx + (i % 2 ? 8 : -8), y); x.rotate((i % 3 - 1) * 0.03)
    x.fillStyle = INK; x.fillRect(-124, -20, 248, 40); x.fillStyle = COLS[i % 6]; x.fillRect(-118, -15, 236, 30)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`PLAN ${L2[i]}`, 0, 1)
    x.restore()
  }
}
/** a pixel phone with chat chips */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 22px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** stairs with a flag at the top */
function stairs(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(-170 + i * 64, 120 - i * 50, 70, 60 + i * 50); x.fillStyle = ['#6b62a8', '#7d74ba', '#8f86cc', '#a198de', '#b3aaf0'][i]; x.fillRect(-166 + i * 64, 124 - i * 50, 62, 52 + i * 50) }
  x.restore()
  drawBits(x, FLAG, { K: INK, R: RED }, cx + 140 * k, cy - 120 * k, 14 * k)
}

const S = 'capricorn', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Five-year plan? | It’s *a fifty-year scroll.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { if (lt > 0.15) scroll(x, 790, 560, lt) } },
  { sign: S, cap: 'Already booked | *the retirement venue.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 700, 'VENUE: BOOKED', pop01(t, P.t0 + 0.2, 0.3, 2), MINT, -0.04, 40)
      L(x, 790, 820, 'DATE: JUNE 2061', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, 0.04, 36)
      bubble(x, 790, 1020, 'deposit paid', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Budgeted for fun. | *Twelve dollars.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, COIN, { Y: GOLD, W: '#fff6c2' }, 730 + i * 70, 960 - i * 10, 16 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2))
      L(x, 790, 720, 'FUN: $12.00', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 44)
      L(x, 790, 1120, 'DON’T GO WILD', pop01(t, P.t0 + 1.5, 0.3, 2.4), SLATE, 0.04, 32)
    } },
  { sign: S, cap: 'A spreadsheet with tabs | *for the spreadsheet.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) { sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: S, cap: 'Wants a dog. | Made *a timeline.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      gantt(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      drawBits(x, DOG, DOG_C, 790, 1060, 14 * pop01(t, P.t0 + 1.6, 0.35, 2.2))
    } },
  { sign: S, cap: 'Plan B? | They’re on *Plan K.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { if (lt > 0.25) folders(x, 790, 820, lt) } },
  { sign: S, cap: 'New match? | Sent them *the plan.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: GOLD, lines: [
        ['hi! :)', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['hello. see attached', MINT, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['PLAN_v14.pdf', SKYB, pop01(t, P.t0 + 1.2, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Finished year five | in *year two.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      stairs(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 640, 'AHEAD OF SCHEDULE', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 930, 760, P.t0 + 1.2, 7, 140, 0.4)
    } },
  { sign: S, cap: 'Birthday wish? | *Quarterly targets.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, BALLOON, { P: PINK, W: '#ffd6e2', K: INK }, F.x + 150, F.top - 10 + 8 * Math.sin(t * 2), 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'make a wish!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 800, 900, 'WISH: HIT Q3', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.04, 36)
      bubble(x, 800, 1080, '…it’s my wish.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0384', key: 'D', accent: ACC, solo: S,
  title: 'Capricorns making | *a five-year plan.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Born at 40. | *Planning for 90.*', mood: 'sparkle' },
  lesson: { text: 'Their plans always | have *room for you.*', chip: 'PLAN: INCLUDES YOU' },
  last: {
    text: 'Spontaneity? | *Pencilled in.*',
    draw(x, t, lt) { L(x, 540, 1180, 'TUES 2:15–2:30', pop01(t, t - lt + 1.0, 0.3, 2.4), GOLD, -0.04, 40) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
