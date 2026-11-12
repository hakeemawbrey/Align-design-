// r2a0309: star_advice, ADVICE ROLLCALL, "A small win for | each sign today." (signs3kit social cut, music: lofi · E). Ending: callback (Virgo's dish).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
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
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const ST = { x: -170 }

const ACC = '#ffd36e'
const DISH = ['..WWWWWWWW..', '.WWWWWWWWWW.', 'WWWSSSSSSWWW', 'WWSSSSSSSSWW', 'WWWSSSSSSWWW', '.WWWWWWWWWW.', '..WWWWWWWW..']
const BROC = ['.GG.GG.', 'GGGGGGG', 'GGGGGGG', '.GGGGG.', '...S...', '...S...', '..SSS..']
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
/** a checklist with n rows, `done` of them ticked */
function checklist(x, cx, cy, k, rows, done) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const h = rows.length * 62 + 40
  x.fillStyle = INK; x.fillRect(-160, -h / 2 - 8, 320, h + 16); x.fillStyle = CREAM; x.fillRect(-152, -h / 2, 304, h)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach((r, i) => {
    const y = -h / 2 + 50 + i * 62
    x.fillStyle = INK; x.fillRect(-130, y - 16, 32, 32); x.fillStyle = i < done ? MINT : CREAM; x.fillRect(-126, y - 12, 24, 24)
    x.fillStyle = INK; x.fillText(r, -84, y + 2)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'You waited your turn. | *Growth.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: ST,
    front(x, t, lt, P) {
      L(x, 790, 700, 'QUEUE: 3 OF 3', pop01(t, P.t0 + 0.2, 0.3, 2), '#9aa5c4', 0.04, 34)
      L(x, 790, 880, 'PATIENCE +1', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 40)
      sparkles(x, t, 790, 880, P.t0 + 1.1, 7, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'You tried a new food. | *Proud of you.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM }, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BROC, { G: '#5fd068', S: '#8a4a2e' }, 790, 920, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 700, 'NEW FOOD: TRIED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'You finished *one* thing. | That counts.', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', star: ST,
    front(x, t, lt, P) {
      checklist(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ['book', 'song', 'scarf', 'podcast', 'novel'], lt > 1.0 ? 1 : 0)
      if (lt > 1.0) sparkles(x, t, 680, 720, P.t0 + 1.0, 6, 90, 0.2)
    } },
  { sign: 'cancer', cap: 'You said no | *and stayed kind.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'can you do | one more thing?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: '#9aa5c4', tail: 'br' })
      bubble(x, 760, 940, 'not today ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      L(x, 790, 1110, 'BOUNDARY: SET', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'leo', cap: 'You cheered for a friend. | *Iconic.*', mood: 'sparkle', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 830, 940, 170 * k, { mood: 'heart', look: [-1, 0], seed: 13, glyph: false })
      L(x, 830, 760, 'THEIR BIG DAY', pop01(t, P.t0 + 0.5, 0.3, 2), PINK, 0.04, 30)
      bubble(x, 560, 640, 'GO YOU!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 830, 900, P.t0 + 1.2, 7, 160, 0.5)
    } },
  { sign: 'virgo', cap: 'You left one dish | in the sink. *Brave.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DISH, { W: CREAM, S: '#c9d2e8' }, 790, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 790, 720, 'UNWASHED: 1', pop01(t, P.t0 + 0.6, 0.3, 2), '#9aa5c4', 0.04, 34)
      L(x, 790, 1100, 'VIRGO: STILL OKAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'You picked dinner | *in under an hour.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      const m = Math.round(58 * ease.outCubic(prog(lt, 0.2, 1.1)))
      L(x, 790, 720, `DECIDING… ${m} MIN`, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.04, 32)
      L(x, 790, 900, 'DECIDED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 44)
      if (lt > 1.3) sparkles(x, t, 790, 900, P.t0 + 1.3, 7, 170, 0.4)
    } },
  { sign: 'scorpio', cap: 'You told someone | *how you feel.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TYPING…', headCol: '#c97bff', lines: [
        ['i missed you', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2), true],
        ['me too!!', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
        ['♡', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: 'sagittarius', cap: 'You texted back | *before your next trip.*', mood: 'sparkle', star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM', headCol: GOLD, lines: [
        ['where are you?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['home! for now', '#ff9a4a', pop01(t, P.t0 + 0.9, 0.25, 2.2), true],
        ['a reply!! ♡', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: 'capricorn', cap: 'You took a lunch break. | *A real one.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 700, 'OUT TO LUNCH', pop01(t, P.t0 + 0.2, 0.3, 2), '#2fc79a', 0.04, 38)
      L(x, 790, 860, 'LAPTOP: CLOSED', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, -0.04, 32)
      L(x, 790, 1000, 'SANDWICH: ENJOYED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'You let someone help. | *Teamwork!*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 800, 690, 'pass the spanner?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'br' })
      L(x, 790, 1110, 'TEAM: 2 · SOLO: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'You had a cry. | *Felt lighter after.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      L(x, 790, 720, 'FEELINGS: FELT ✓', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, 0.04, 32)
      L(x, 790, 900, 'HEART: LIGHTER', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
      if (lt > 1.4) hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0309', key: 'E', accent: ACC, ending: 'callback',
  title: 'A small win for | *each sign today.*',
  cameos: CAMEOS,
  group: { cap: 'Small wins. | *Still wins.*' },
  last: {
    text: 'The dish is still there. | *Virgo is fine.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1080, 280 * k, { mood: lt > 1.3 ? 'happy' : 'wide', look: [1, 0], seed: 7, hops: [t0 + 1.4] })
      drawBits(x, DISH, { W: CREAM, S: '#c9d2e8' }, 740, 1120, 20 * pop01(t, t0 + 0.5, 0.4, 2), { rot: 0.1 })
      if (lt > 1.3) L(x, 740, 940, 'DAY 2 · STILL FINE', pop01(t, t0 + 1.3, 0.3, 2.4), MINT, 0.04, 32)
      if (lt > 1.6) sparkles(x, t, 560, 1060, t0 + 1.6, 9, 240, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
