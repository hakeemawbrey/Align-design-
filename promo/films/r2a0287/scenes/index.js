// r2a0287: star_advice, ADVICE SOLO, "Virgo, the right | people *will stay.*" (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine moments a Virgo worries they're "too much", each a relatable truth + a warm reframe. Ending: group.
//   0.0–3.6    "Virgo, the right people | *will stay.*"
//   3.6–37.8   nine cards: corrected the typo on their card, they laughed · said sorry three times, nobody's keeping score
//              · packed a first-aid kit, everyone needed a plaster · noticed the haircut nobody else did
//              · love language: tidying, still counts · read your match's whole profile, they noticed
//              · the "technically" joke lands with your people · someone drifted, a seat opened · "too much"? just right
//  37.8        group (the ending): "Stay you. | *They'll stay.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fd8a8', RED = '#e23d4e'

// ── props
/** a folded greeting card with a typo, then a neat red correction */
function greeting(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -182, 320, 380)
  x.fillStyle = INK; x.fillRect(-164, -194, 328, 388); x.fillStyle = PINK; x.fillRect(-156, -186, 312, 372)
  x.fillStyle = '#fff8ea'; x.fillRect(-136, -166, 272, 332)
  x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('HAPY', 0, -60); x.fillText('BIRTHDAY!', 0, 0)
  if (lt > 0.8) {
    const p = clamp((lt - 0.8) / 0.3)
    x.save(); x.globalAlpha = p; x.strokeStyle = RED; x.lineWidth = 6
    x.beginPath(); x.ellipse(0, -60, 90, 36, 0, 0, Math.PI * 2 * p); x.stroke()
    x.fillStyle = RED; x.font = `700 34px ${MONO}`; x.fillText('+P', 104, -104)
    x.restore()
  }
  x.fillStyle = PINK; x.font = `800 44px ${INTER}`; x.fillText('♥', 0, 90)
  x.restore()
}
const KIT = ['.....KKKK.....', '....K....K....', 'KKKKKKKKKKKKKK', 'KRRRRRRRRRRRRK', 'KRRRRRWWRRRRRK', 'KRRRRRWWRRRRRK', 'KRRRWWWWWWRRRK', 'KRRRWWWWWWRRRK', 'KRRRRRWWRRRRRK', 'KRRRRRWWRRRRRK', 'KRRRRRRRRRRRRK', 'KKKKKKKKKKKKKK']
const PLASTER = ['.TTTTTTTTT.', 'TTTWWWWWTTT', 'TTTWWWWWTTT', '.TTTTTTTTT.']
const SPRAY = ['..KKKK....', '..KWWKKKK.', '..KWWK....', '...KK.....', '..KBBK....', '.KBBBBK...', '.KBBBBK...', '.KBWBBK...', '.KBWBBK...', '.KBBBBK...', '.KBBBBK...', '.KKKKKK...']
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
const CHAIR = ['KKKKKK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCKKK', 'KCCCCCCK', 'KKKKKKKK', 'K.K..K.K', 'K.K..K.K', 'K.K..K.K']
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { label(x, cx, cy, from, 1, { size, bg: fromBg, rot: -0.04, font: MONO, weight: 700 }); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    label(x, cx, cy, from, 1, { size, bg: fromBg, rot: -0.04, font: MONO, weight: 700 })
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  label(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), { size, bg: toBg, rot: 0.04, font: MONO, weight: 700 })
}

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'Corrected the typo on their card? | *They laughed.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      greeting(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1120, 'STILL FRIENDS ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said sorry three times? | *Nobody’s keeping score.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 720 + i * 60, 640 + i * 120, 'sorry!', pop01(t, P.t0 + 0.25 + i * 0.3, 0.25, 2.2), { size: 40 - i * 2, col: i === 2 ? LAV : BONE, tail: 'bl' })
      label(x, 800, 1080, 'SCORE: 0 · LOVE: 100', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Packed a first-aid kit? | *Everyone* needed a plaster.', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, KIT, { K: INK, R: RED, W: '#fff8ea' }, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) drawBits(x, PLASTER, { T: '#f2c49a', W: '#fff4e2' }, 650 + i * 140, 660 + (i % 2) * 40, 12 * pop01(t, P.t0 + 0.9 + i * 0.2, 0.3, 2.2), { rot: (i - 1) * 0.3 })
      label(x, 790, 1120, 'PLASTERS USED: 4', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Noticed their new haircut. | *Nobody else did.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 920, 220 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.3] })
      if (lt > 1.2) sparkles(x, t, 800, 840, P.t0 + 1.2, 6, 130, 0.6)
      bubble(x, 720, 630, 'new haircut?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1120, 'SEEN ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tidying is your love language. | *Still counts.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SPRAY, { K: INK, W: BONE, B: SKYB }, 760, 870, 22 * k, { rot: -0.15 + 0.08 * Math.sin(lt * 10) * (lt > 0.6 && lt < 1.4 ? 1 : 0) })
      if (lt > 0.6) sparkles(x, t, 880, 760, P.t0 + 0.6, 6, 110, 0.2)
      if (lt > 1.1) sparkles(x, t, 900, 900, P.t0 + 1.1, 6, 110, 0.9)
      label(x, 790, 1120, 'I ♥ YOU (CLEANED)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read your match’s whole profile? | *They noticed.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOUR MATCH', headCol: PINK, lines: [
        ['you like owls?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['you READ it?', MINT, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['all of it.', BONE, pop01(t, P.t0 + 1.2, 0.25, 2.2), true],
        ['♡♡♡', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 820, P.t0 + 1.6, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Your “technically” joke? | *Your people* love it.', mood: lt => lt > 1.2 ? 'happy' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 560, 620, 'technically…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: SAGE, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'capricorn', 760, 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.1, P.t0 + 1.5] })
        signChar(x, t, 'gemini', 900, 900, 170 * k, { mood: 'happy', look: [-1, 0], seed: 16, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.6] })
      }
      label(x, 830, 700, 'HA HA HA', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone drifted away? | That *made room.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const fade = 1 - clamp((lt - 0.6) / 0.5)
      drawBits(x, CHAIR, { K: INK, C: '#9aa5c4' }, 650, 980, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 0.35 + 0.65 * fade })
      drawBits(x, CHAIR, { K: INK, C: SAGE }, 830, 980, 26 * pop01(t, P.t0 + 1.2, 0.3, 2))
      const k = pop01(t, P.t0 + 1.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 830, 160 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false })
      label(x, 790, 640, 'SEAT SAVED: YOURS', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Think you’re too much? | You’re *just right.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 860, lt, 0.9, 'TOO MUCH', 'JUST RIGHT', { size: 46 })
      if (lt > 1.3) { sparkles(x, t, 790, 860, P.t0 + 1.3, 8, 200, 0.4); hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 }) }
    } },
]

const F = makeFilm({
  id: 'r2a0287', key: 'F', accent: SAGE, solo: 'virgo', ending: 'group',
  title: 'Virgo, the right | people *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Stay you. | *They’ll stay.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
