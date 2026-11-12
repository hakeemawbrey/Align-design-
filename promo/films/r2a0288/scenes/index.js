// r2a0288: star_advice, ADVICE SOLO, "How to encourage | *a Capricorn.*" (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine kind ways to encourage the Capricorn in your life, each a relatable truth + a warm reframe.
// Ending: callback.
//   0.0–3.6    "How to encourage | *a Capricorn.*"
//   3.6–37.8   nine cards: notice the climb, not just the summit · working late? snacks, not lectures · laugh at the dry joke
//              · finished a spreadsheet? that's a cupcake · put their day off IN the calendar (they'll go) · ask about the
//              five-year plan (there are slides) · "proud of you" text, screenshotted · more than their output
//              · climb with them, not ahead
//  37.8        "Hard worker. | *Soft heart.*"
//  41.2        callback: "Five-year plan, | *slide one: you.*" — card 6's slides come back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SLATE = '#8fb8d8', RED = '#e23d4e', BROWN = '#c98f5a', TEAL = '#5ad1c8'

// ── props
/** a ladder of steps with a little flag at the top; steps light up as they're "seen" */
function ladder(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const n = 6, lit = Math.floor(clamp((lt - 0.3) / 1.2) * n)
  for (let i = 0; i < n; i++) {
    const y = 160 - i * 60, w = 70 + i * 0
    x.fillStyle = INK; x.fillRect(-170 + i * 50 - 4, y - 4, w + 8, 34)
    x.fillStyle = i < lit ? GOLD : '#4a3a6a'; x.fillRect(-170 + i * 50, y, w, 26)
  }
  x.fillStyle = INK; x.fillRect(132, -230, 8, 110); x.fillStyle = MINT; x.fillRect(140, -230, 60, 36)
  x.restore()
}
const LAMP = ['....KKKKKK..', '...KYYYYYYK.', '..KYYYYYYYYK', '..KKKKKKKKKK', '......KK....', '.....KK.....', '....KK......', '...KK.......', '..KKKKKK....']
const BOWL = ['.YWYYWYWYYWY.', 'YYYYYYYYYYYYY', 'RRRRRRRRRRRRR', '.RRRRRRRRRRR.', '..RRRRRRRRR..', '....KKKKK....']
const CUPCAKE = ['.....F.....', '.....C.....', '...PPPPP...', '..PPWPPPP..', '.PPPPPPWPP.', '.KKKKKKKKK.', '..KBKBKBK..', '..KBKBKBK..', '...KKKKK...']
function page(x, cx, cy, k, head, body, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -142, 300, 300)
  x.fillStyle = INK; x.fillRect(-154, -154, 308, 308); x.fillStyle = '#fff8ea'; x.fillRect(-146, -146, 292, 292)
  x.fillStyle = col; x.fillRect(-146, -146, 292, 64)
  x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -114)
  x.font = `800 44px ${INTER}`; body.forEach((l, i) => x.fillText(l, 0, -10 + i * 56))
  x.restore()
}
/** a presentation screen on a tripod, showing a slide */
function screen(x, cx, cy, k, title, body, { col = SLATE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, 120, 12, 120); x.fillRect(-60, 232, 120, 10)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 280); x.fillStyle = '#fff8ea'; x.fillRect(-180, -140, 360, 260)
  x.fillStyle = col; x.fillRect(-180, -140, 360, 62)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -108)
  x.font = `800 40px ${INTER}`; body.forEach((l, i) => x.fillText(l, 0, -20 + i * 54))
  x.restore()
}
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
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { label(x, cx, cy, from, 1, { size, bg: fromBg, rot: -0.04, font: MONO, weight: 700 }); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    label(x, cx, cy, from, 1, { size, bg: fromBg, rot: -0.04, font: MONO, weight: 700 })
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 170, cy + 10); x.lineTo(cx - 170 + 340 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  label(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), { size, bg: toBg, rot: 0.04, font: MONO, weight: 700 })
}
const MOUNTAIN = ['.......S.......', '......SSS......', '.....SRRRS.....', '....RRRRRRR....', '...RRRRRRRRR...', '..RRRRRRRRRRR..', '.RRRRRRRRRRRRR.', 'RRRRRRRRRRRRRRR']

const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'Notice the climb. | *Not just the top.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ladder(x, 740, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 740, 1130, 'EVERY STEP: SEEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Working late again? | Bring *snacks,* not lectures.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 790, 650, 'OFFICE · 11:48 PM', k, { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, BOWL, { Y: '#ffe7a8', W: '#fff4e2', R: RED, K: '#8a4a2e' }, 790, 900, 22 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      hearts(x, t, 790, 840, P.t0 + 1.2, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 3 })
      label(x, 790, 1110, 'SNACK DELIVERY ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laugh at their dry jokes. | *Every single one.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'statistically, | i’m hilarious.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: SLATE, tail: 'bl' })
      label(x, 800, 900, 'HA HA HA', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.1, 6, 180, 0.3)
    } },
  { sign: S, cap: 'Finished a spreadsheet? | That’s *a cupcake.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CUPCAKE, { F: '#ffb34a', C: BONE, P: PINK, W: '#fff4e2', K: INK, B: BROWN }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'SMALL WIN: CELEBRATED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Put their day off | *in the calendar.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      page(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'FRIDAY', ['DAY OFF', '(booked)'], SLATE)
      bubble(x, 560, 620, 'it’s scheduled? | then i’ll go.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Ask about the five-year plan. | *There are slides.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P) {
      const n = 1 + Math.min(4, Math.floor(Math.max(0, lt - 0.5) / 0.35))
      screen(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, `SLIDE ${n} / 40`, n < 3 ? ['YEAR ONE:', 'FOUNDATIONS'] : ['YEAR TWO:', 'MORE OF IT'])
      label(x, 790, 1140, 'Q&A AFTER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Text them “proud of you.” | They’ll *screenshot it.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOUR MATCH', headCol: PINK, lines: [
        ['proud of you', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['today. ♡', PINK, pop01(t, P.t0 + 0.7, 0.25, 2.2)],
        ['…thank you.', BONE, pop01(t, P.t0 + 1.2, 0.25, 2.2), true],
      ] })
      if (lt > 1.6 && lt < 1.8) { x.save(); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(660, 660, 260, 400); x.restore() }
      label(x, 790, 1120, 'SAVED ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remind them they’re more | than *their output.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 860, lt, 0.9, 'OUTPUT: 92%', 'LOVED: 100%', { size: 44, toBg: PINK })
      if (lt > 1.3) hearts(x, t, 790, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Climb with them. | *Not ahead.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, { S: '#fff8ea', R: '#6b62a8' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) {
        signChar(x, t, 'taurus', 740, 870, 120 * k, { mood: 'happy', look: [1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.4] })
        signChar(x, t, 'capricorn', 840, 870, 120 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 1.4] })
      }
      label(x, 790, 1160, 'SAME PACE ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0288', key: 'C', accent: SLATE, solo: 'capricorn', ending: 'callback',
  title: 'How to encourage | *a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Hard worker. | *Soft heart.*', mood: 'heart' },
  last: {
    text: 'Five-year plan, | *slide one: you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      screen(x, 540, 1050, 1.3 * pop01(t, t0 + 0.6, 0.4, 2), 'SLIDE 1 / 40', ['YEAR ONE:', 'YOU ♥'], { col: PINK })
      hearts(x, t, 540, 820, t0 + 1.2, { n: 6, life: 1.8, spread: 520, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
