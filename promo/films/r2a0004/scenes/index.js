// r2a0004: star_advice, ADVICE SOLO, "Gemini, quiet is | not boring." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm reframe, one gag each.
//   0.0–3.6    "Gemini, quiet is | *not boring.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a night in still counts as plans (blanket fort) · no reply for an hour, nobody's mad · forty tabs open, close a few
//              · silence on a date can be comfy · one hobby at a time is still you · journal it instead of texting six people
//              · boredom is where ideas start (bulb: loading) · listening is a superpower (a little cape)
//              · your quiet side is still fun (two Geminis, a book and a party hat)
//  37.8        "Loud or quiet. | *Always you.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "Rest your mind. | It’s *still brilliant.*"  BATTERY: FULL
//  46.9        "One quiet night later? | *Forty new ideas.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEMON = '#ffe066', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068'
const S = 'gemini'

// ── props
const YARN = ['..PPPP..', '.PPpPPP.', 'PPPPpPPP', 'PpPPPPpP', 'PPPpPPPP', '.PPPPpP.', '..PPPP.K', '.......K']
const YARN_C = { P: PINK, p: '#ff6fa0', K: '#c9c9d8' }
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..gggg..', '..GGGG..']
const CAPE = ['RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '.RRRRRR.', '..RRRR..', '..RRRR..', '...RR...']
const BOOK = ['RRRRRRRRRR', 'RWWWWWWWWR', 'RWKKKKKKWR', 'RWWWWWWWWR', 'RWKKKKKWWR', 'RRRRRRRRRR']
const BOOK_C = { R: SKYB, W: CREAM, K: '#b9b0a0' }
const PARTY = ['....Y....', '...PPP...', '..PYPPP..', '..PPPYP..', '.PYPPPPP.', '.PPPPPYP.', 'PPYPPPPPP']
const PARTY_C = { P: MINT, Y: GOLD }

// a blanket fort over the star
function fort(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-250, 170); x.lineTo(0, -170); x.lineTo(250, 170); x.closePath(); x.fill()
  x.fillStyle = '#c9a6ff'; x.beginPath(); x.moveTo(-236, 162); x.lineTo(0, -154); x.lineTo(236, 162); x.closePath(); x.fill()
  x.fillStyle = '#b48fe8'; for (let i = -3; i <= 3; i++) x.fillRect(i * 50 - 6, -60 + Math.abs(i) * 30, 12, 180 - Math.abs(i) * 30)
  x.fillStyle = '#140c30'; x.beginPath(); x.moveTo(-110, 162); x.lineTo(0, -10); x.lineTo(110, 162); x.closePath(); x.fill()
  x.fillStyle = GOLD; for (let i = 0; i < 6; i++) { const on = 0.5 + 0.5 * Math.sin(t * 4 + i); x.globalAlpha = on; x.fillRect(-200 + i * 80, -10 - Math.abs(i - 2.5) * 50, 12, 12) }
  x.restore()
}
// a phone: header + lines
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -132) }
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a stack of browser tabs that close one by one
function tabs(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const COLS = [SKYB, PINK, MINT, GOLD, LAV, '#ffb38a', '#ff9ccf', '#7dffb0']
  const open = 8 - Math.min(5, Math.floor(Math.max(0, lt - 0.8) / 0.18))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < open; i++) {
    const px = -150 + (i % 4) * 22, py = -150 + i * 34
    x.fillStyle = INK; x.fillRect(px - 4, py - 4, 248, 128); x.fillStyle = COLS[i]; x.fillRect(px, py, 240, 120)
    x.fillStyle = INK; x.fillRect(px + 210, py + 8, 18, 18)
  }
  x.restore()
}
// a park bench
function bench(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-300, -20, 600, 40); x.fillRect(-280, 20, 20, 90); x.fillRect(260, 20, 20, 90)
  x.fillStyle = WOOD; x.fillRect(-294, -14, 588, 28)
  x.restore()
}
// a journal with doodles
function journal(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = LEMON; x.fillRect(-162, -142, 160, 284); x.fillStyle = CREAM; x.fillRect(2, -142, 160, 284)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-140, -110 + i * 40, 120 * clamp((lt - 0.4 - i * 0.12) * 4), 8)
  x.fillStyle = PINK; const hk = clamp((lt - 1.2) * 3); if (hk > 0) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 82, -40, 14 * hk)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (lt > 1.3) x.fillText('feeling: ok!', 82, 60)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'A night in? | *Still counts as plans.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: 0, y: 70, s: 220 },
    back(x, t, lt, P) { fort(x, t, 540, 940, pop01(t, P.t0 + 0.3, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 620, 'FORT: BUILT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No reply for an hour? | *Nobody’s mad.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'BESTIE', headCol: PINK, lines: [
        ['you there?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['sorry, was napping', LEMON, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['same lol ♡', BONE, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Forty tabs open? | *Close a few.*', mood: lt => lt > 1.6 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tabs(x, 760, 850, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1130, 'BRAIN: QUIETER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quiet on a date? | *Comfy, not awkward.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -140, y: 20, s: 240 },
    back(x, t, lt, P) { bench(x, 540, 1040, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 760, 920, 220 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 540, 640, '…', pop01(t, P.t0 + 0.6, 0.25, 2.2) * (lt < 1.2 ? 1 : 0), { size: 50, tail: 'bc' })
      label(x, 540, 640, '✦ COMFY QUIET', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'One hobby at a time | *is still you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, YARN, YARN_C, 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.05 })
      label(x, 760, 660, 'JUST KNITTING. BLISS.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Journal it | *before you text six people.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      journal(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'TEXTS SENT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: LEMON, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bored? | *That’s where ideas start.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, -1], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = clamp((lt - 0.5) / 1.0)
      x.save(); x.shadowColor = '#fff1b0'; x.shadowBlur = 60 * g
      drawBits(x, BULB, { Y: lerp(0, 1, g) > 0.5 ? '#fff1b0' : '#8a8460', W: '#ffffff', G: '#9aa5c4', g: '#6a7594' }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.restore()
      label(x, 800, 1110, g < 1 ? 'IDEA: LOADING…' : 'IDEA: READY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: LEMON, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.5, 8, 170, 0.3)
    } },
  { sign: S, cap: 'Listening is | *a superpower too.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.1],
    back(x, t, lt, P, F) { drawBits(x, CAPE, { R: RED }, F.x - 10, F.cy + 40, 30 * pop01(t, P.t0 + 0.8, 0.35, 2), { rot: 0.1 * Math.sin(t * 5) }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 180 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 820, 720, 'and THEN…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
      label(x, 540, 1170, 'SUPER LISTENER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your quiet side | *is fun too.*', mood: 'happy', star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P, F) {
      drawBits(x, BOOK, BOOK_C, F.x + 30, F.cy + 150, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) {
        const F2 = signChar(x, t, S, 800, 940, 260 * k, { mood: 'sparkle', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.8] })
        drawBits(x, PARTY, PARTY_C, F2.x, F2.top - 30, 11 * k, { rot: 0.15 })
      }
      label(x, 540, 640, 'BOTH ARE YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: LEMON, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, P.t0 + 1.5, { n: 5, life: 1.5, spread: 200, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0004', key: 'E', accent: LEMON, solo: S, ending: 'lesson',
  title: 'Gemini, quiet is | *not boring.*',
  cameos: CAMEOS,
  group: { cap: 'Loud or quiet. | *Always you.*', mood: 'sparkle' },
  lesson: { text: 'Rest your mind. | It’s *still brilliant.*', chip: 'BATTERY: FULL' },
  last: {
    text: 'One quiet night later? | *Forty new ideas.*',
    draw(x, t, lt) {
      x.save(); x.shadowColor = '#fff1b0'; x.shadowBlur = 50
      drawBits(x, BULB, { Y: '#fff1b0', W: '#ffffff', G: '#9aa5c4', g: '#6a7594' }, 780, 690, 17 * pop01(t, t - lt + 0.6, 0.35, 2))
      x.restore()
      sparkles(x, t, 760, 700, t - lt + 0.9, 7, 120, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
