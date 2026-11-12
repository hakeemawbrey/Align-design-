// r2t0260: star_talk, SOLO, "Virgo first dates | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a Virgo on a first date, organised to the extreme.
//   0.0–3.6    "Virgo first dates | *be like.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              arrived early, wiped the table · read the menu the night before · brought a conversation agenda
//              · checked your compatibility, with footnotes · split the bill to the cent · your shirt tag was out, fixed it
//              · rated the date out of ten (minus crumbs) · "home safe" text came with a recap · second date already scheduled
//  37.8        "Romance, | but *organised.*"  Virgo comes back, big.
//  41.2        callback: "Final rating? | *10/10. No notes.*"  The rating card comes back, with hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEAF = '#9be07a', RED = '#e23d4e', CREAM = '#fff4e2', SLATE = '#a8a0c8'
const S = 'virgo'

// ── props
const SPRAY = ['..KKK...', '..KWKKKK', '..KKK...', '...K....', '.BBBBB..', 'BBBBBBB.', 'BBWWWBB.', 'BBWWWBB.', 'BBBBBBB.', 'BBBBBBB.', '.BBBBB..']
const SPRAY_C = { K: INK, W: '#ffffff', B: SKYB }
const TAG = ['WWWWW', 'WKKKW', 'WWWWW', 'WKKWW', 'WWWWW']

// a paper card: header + rows
function card(x, cx, cy, k, title, rows, { rot = -0.04, w = 300, h = 340, hcol = LEAF, size = 22 } = {}) {
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
    x.fillStyle = INK; x.font = font || `700 ${size}px ${MONO}`; x.fillText(s, 0, py + 2)
  })
  x.restore()
}
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
// a long thin receipt with a perfectly even split
function receipt(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-118, -190, 236, 380)
  x.fillStyle = '#ffffff'; x.fillRect(-110, -182, 220, 364)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('* RECEIPT *', 0, -150)
  x.fillStyle = SLATE; for (let i = 0; i < 5; i++) x.fillRect(-90, -110 + i * 30, 120 + (i * 23) % 50, 8)
  x.fillStyle = INK; x.fillRect(-90, 46, 180, 3)
  if (lt > 0.7) { x.font = `700 26px ${MONO}`; x.fillText('YOU  14.37', 0, 86) }
  if (lt > 1.0) { x.fillText('ME   14.37', 0, 126) }
  if (lt > 1.3) { x.fillStyle = LEAF; x.font = `800 22px ${INTER}`; x.fillText('✓ BALANCED', 0, 162) }
  x.restore()
}
// a rating card: big score, optional footnote
function rating(x, cx, cy, k, score, note, { rot = 0.04, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -120, 316, 260)
  x.fillStyle = INK; x.fillRect(-162, -132, 324, 264)
  x.fillStyle = col; x.fillRect(-154, -124, 308, 248)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 24px ${MONO}`; x.fillText('DATE RATING', 0, -88)
  x.font = `800 96px ${INTER}`; x.fillText(score, 0, 6)
  if (note) { x.font = `700 22px ${MONO}`; x.fillText(note, 0, 88) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Arrived early. | *Wiped the table.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P, F) {
      drawBits(x, SPRAY, SPRAY_C, F.x + 170, F.cy - 10, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      x.save(); x.fillStyle = INK; x.fillRect(620, 1030, 340, 22); x.fillStyle = '#e8a86a'; x.fillRect(626, 1034, 328, 14); x.restore()
      sparkles(x, t, 790, 1000, P.t0 + 0.9, 8, 150, 0.2)
      label(x, 790, 660, 'SANITISED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LEAF, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read the menu | *the night before.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 1], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'MENU', [
        ['soup', lt > 0.6 ? '#ffe27a' : null], ['pasta', null], ['salad', lt > 0.9 ? '#ffe27a' : null], ['dessert ✓', lt > 1.2 ? '#ffe27a' : null],
      ], { hcol: GOLD })
      label(x, 800, 1100, 'ORDER: DECIDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Brought a | *conversation agenda.*', mood: 'happy', look: [1, 0], star: { x: -190 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'AGENDA', [
        [lt > 0.5 ? '1. your sign?' : ''], [lt > 0.75 ? '2. pets' : ''], [lt > 1.0 ? '3. 5-yr goals' : ''], [lt > 1.25 ? '4. Q & A' : ''],
      ], { hcol: SKYB, rot: 0.04, size: 24 })
      label(x, 800, 1100, 'TIME: 2 HRS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ran your compatibility. | *With footnotes.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), '♍︎ + YOU', [
        ['chat: great*', MINT], ['vibes: yes**', MINT], ['tidy: TBD***', '#ffe27a'], [lt > 1.0 ? '* see page 4' : '', null, `400 20px ${MONO}`],
      ], { hcol: PINK })
      label(x, 800, 1100, 'VERDICT: CUTE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Split the bill | *to the cent.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 1], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      receipt(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 420, 640, 'fair is fair', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Your shirt tag was out. | *Fixed it instantly.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      const Fd = signChar(x, t, 'pisces', 800, 960, 230 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 29, glyph: false, tears: 1 })
      const tuck = ease.inOutCubic(prog(lt, 0.8, 1.1))
      drawBits(x, TAG, { W: '#ffffff', K: SLATE }, Fd.x + 30, Fd.top + 10 + tuck * 30, 8, { alpha: 1 - tuck })
      label(x, 800, 660, lt > 1.1 ? 'TUCKED ✓' : 'TAG ALERT', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: lt > 1.1 ? LEAF : RED, color: lt > 1.1 ? INK : CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rated the date. | *Minus half for crumbs.*', mood: 'squint', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      rating(x, 800, 860, pop01(t, P.t0 + 0.3, 0.35, 2), lt > 1.0 ? '9.5' : '10', lt > 1.0 ? '(−0.5 crumbs)' : '')
      sparkles(x, t, 800, 860, P.t0 + 1.0, 6, 180, 0.4)
    } },
  { sign: S, cap: '“Home safe” text | *came with a recap.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: LEAF, lines: [
        ['home safe ✓', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['highlights: 3', '#ffe27a', pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['notes: attached', SKYB, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Second date? | *Already scheduled.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'CALENDAR', [
        ['DATE 2 · fri 7:00', PINK], [lt > 0.9 ? 'DATE 3 · tbc' : '', LAV], [lt > 1.3 ? 'backup · sat' : '', SLATE],
      ], { hcol: GOLD, rot: 0.04 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0260', key: 'F', accent: LEAF, solo: S, ending: 'callback',
  title: 'Virgo first dates | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Romance, | but *organised.*', mood: 'heart' },
  last: {
    text: 'Final rating? | *10/10. No notes.*',
    draw(x, t, lt) {
      const t0 = t - lt
      rating(x, 540, 1000, 1.25 * pop01(t, t0 + 0.5, 0.4, 2), '10', lt > 1.2 ? '(crumbs forgiven)' : '', { rot: -0.03, col: PINK })
      signChar(x, t, S, 820, 1250, 190 * pop01(t, t0 + 0.8, 0.35, 2), { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, -1], seed: 37, glyph: false, hops: [t0 + 1.5] })
      hearts(x, t, 540, 920, t0 + 1.3, { n: 8, life: 2.0, spread: 380, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
