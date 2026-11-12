// r2a0258: star_advice, ADVICE SOLO, "Signs a Capricorn | trusts you." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the quiet, very Capricorn ways they show you're in.
//   0.0–3.6    "Signs a Capricorn | *trusts you.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              they gave you the spare key · they took a day off, with you · they told you the five-year plan
//              · you got edit access to their spreadsheet · they laughed at your joke, out loud · they told you they're tired
//              · you're in their calendar, in pen · they saved your birth time · they showed you their silly side
//  37.8        "Slow to trust. | *Loyal for life.*"  Capricorn comes back, big.
//  41.2        callback: "That spare key? | *Got a keychain.*"  The key comes back with a little heart keychain.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#7fd0a0', RED = '#e23d4e', CREAM = '#fff4e2', SLATE = '#a8a0c8'
const S = 'capricorn'

// ── props
const KEY = [
  '.YYYY...........',
  'YY..YY..........',
  'Y....YYYYYYYYYYY',
  'Y....YYYYYYYYYYY',
  'YY..YY.....Y.Y.Y',
  '.YYYY......Y.Y..',
]
const KEY_C = { Y: GOLD }
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPP..', '.PPPPYPP.', '.PYPPPPP.', 'PPPPPPPYP']
const HAT_C = { P: SAGE, Y: GOLD }
const BATT = ['KKKKKKKKKKK.', 'K.........KK', 'KRR.......KK', 'KRR.......KK', 'K.........KK', 'KKKKKKKKKKK.']
const BATT_C = { K: CREAM, R: RED }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// a phone, face up: a header and up to three chips
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a paper page: header + rows (optionally coloured)
function page(x, cx, cy, k, title, rows, { rot = -0.04, w = 300, h = 340, hcol = SAGE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = hcol; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 30)
  rows.forEach(([s, col, font], i) => {
    if (!s) return
    const py = -h / 2 + 96 + i * 54
    if (col) { x.fillStyle = col; x.fillRect(-w / 2 + 16, py - 22, w - 32, 44) }
    x.fillStyle = INK; x.font = font || `700 22px ${MONO}`; x.fillText(s, 0, py + 2)
  })
  x.restore()
}
// a spreadsheet: a grid of grey cells, one cell (yours) lights up
function grid(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -140, 336, 300)
  x.fillStyle = INK; x.fillRect(-172, -152, 344, 304)
  x.fillStyle = CREAM; x.fillRect(-164, -144, 328, 288)
  x.fillStyle = SAGE; x.fillRect(-164, -144, 328, 40)
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
    x.fillStyle = (r + c) % 2 ? '#e6dfd0' : '#d8d0c0'; x.fillRect(-152 + c * 78, -94 + r * 46, 72, 40)
  }
  if (lt > 0.8) {
    const p = clamp((lt - 0.8) * 3)
    x.fillStyle = PINK; x.fillRect(-152 + 78, -94 + 2 * 46, 72, 40)
    x.strokeStyle = RED; x.lineWidth = 4; x.strokeRect(-152 + 78 - 3, -94 + 2 * 46 - 3, 78, 46)
    x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = p; x.fillText('hi ♡', -152 + 78 + 36, -94 + 2 * 46 + 21)
  }
  x.restore()
}
// a long scroll unrolling downwards
function scroll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const L = lerp(60, 380, ease.outCubic(prog(lt, 0.3, 1.5)))
  x.save(); x.translate(cx, cy - 190); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-128, 0, 256, L + 8)
  x.fillStyle = CREAM; x.fillRect(-120, 0, 240, L)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('THE PLAN', 0, 34)
  x.fillStyle = SLATE; for (let i = 0; i < 12; i++) { const py = 70 + i * 26; if (py < L - 14) x.fillRect(-96, py, 150 + (i * 37) % 40, 8) }
  x.fillStyle = '#c9a070'; x.fillRect(-140, -16, 280, 30); x.fillRect(-140, L - 8, 280, 30)
  x.fillStyle = INK; x.fillRect(-140, -16, 280, 4); x.fillRect(-140, L + 18, 280, 4)
  x.restore()
}
// the spare key, with an optional heart keychain
function key(x, t, cx, cy, cell, k, { chain = 0 } = {}) {
  if (k <= 0.01) return
  drawBits(x, KEY, KEY_C, cx, cy, cell * k, { rot: -0.25 + 0.05 * Math.sin(t * 2) })
  if (chain > 0.01) {
    const hx = cx - 7.5 * cell * Math.cos(-0.25), hy = cy - 7.5 * cell * Math.sin(-0.25)
    x.save(); x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(hx, hy); x.lineTo(hx - 10, hy + 60 * chain); x.stroke(); x.restore()
    drawBits(x, HEART, { H: PINK, W: '#fff' }, hx - 10, hy + 60 * chain + 30, cell * 0.9 * chain, { rot: 0.1 * Math.sin(t * 3) })
  }
}

const CAMEOS = [
  { sign: S, cap: 'They gave you | the *spare key.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      key(x, t, 800, 860, 18, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1070, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.1, 7, 190, 0.3)
    } },
  { sign: S, cap: 'They took a day off. | *With you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      page(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'FRIDAY', [
        ['work', SLATE], ['work', SLATE], [lt > 0.9 ? 'OFF ♡ WITH YOU' : 'work', lt > 0.9 ? PINK : SLATE, lt > 0.9 ? `800 28px ${INTER}` : undefined], ['work', SLATE],
      ])
      label(x, 800, 1100, 'HISTORIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They told you | the *five-year plan.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      scroll(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 620, 'PAGE 1 OF 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You got edit access | to *the spreadsheet.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      grid(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1070, 'HIGHEST HONOUR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They laughed at your joke. | *Out loud.*', mood: lt => lt > 0.8 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'HA!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 100, tail: 'bl' })
      label(x, 800, 1020, 'CONFIRMED: FUNNY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 0.9, 7, 170, 0.5)
    } },
  { sign: S, cap: 'They told you | they’re *tired.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BATT, BATT_C, 800, 700, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 900, 'honestly? | so tired', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1100, 'YOU LISTENED ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’re in their calendar. | *In pen.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      page(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'SATURDAY', [
        ['(pencil) gym', null, `400 22px ${MONO}`], ['(pencil) errands', null, `400 22px ${MONO}`], [lt > 0.8 ? 'YOU ♡' : '', PINK, `800 34px ${INTER}`],
      ], { hcol: SKYB, rot: 0.04 })
      label(x, 800, 1100, 'PERMANENT INK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They saved | your *birth time.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ CONTACT', headCol: SAGE, lines: [
        ['bestie ♡', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['sign: ✓', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['born 4:12 AM', GOLD, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
      ] })
      label(x, 800, 1110, 'FOR YOUR CHART', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They showed you | their *silly side.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x + 20, F.top - 60, 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 })
      label(x, 790, 760, 'RARE FOOTAGE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'tell NO one', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0258', key: 'C', accent: SAGE, solo: S, ending: 'callback',
  title: 'Signs a Capricorn | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Slow to trust. | *Loyal for life.*', mood: 'heart' },
  last: {
    text: 'That spare key? | *Got a keychain.*',
    draw(x, t, lt) {
      const t0 = t - lt
      key(x, t, 560, 980, 24, pop01(t, t0 + 0.5, 0.4, 2), { chain: ease.outBack(clamp((lt - 1.1) / 0.5)) })
      label(x, 540, 1300, 'MATCHING ♡', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 960, t0 + 1.5, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
