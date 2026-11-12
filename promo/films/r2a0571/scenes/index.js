// r2a0571: star_advice, ADVICE SOLO, "Gemini, you're not | *too much.*" (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine relatable Gemini truths, each with a warm reframe and one light visual gag. Ending: callback.
//   0.0–3.6    "Gemini, you're not | *too much.*"
//   3.6–37.8   nine cards: you talk fast, your mind is faster · twelve tabs open, that's curiosity · you change your mind,
//              that's growing · two moods by lunch, both welcome · hobby number nine, collect them all · so many questions,
//              keep asking · your texts come in fives, they light us up · your friends love the chaos · the right people
//              keep up
//  37.8        "Not too much. | *Just enough.*"
//  41.2        CALLBACK: "Keep talking. | *We're listening.*"  card one's speech bubble comes back, two friends lean in.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'gemini'

function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
function sheet(x, cx, cy, w, h, k, rot, fn, bg = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(); x.restore()
}
const QM = ['.QQQ.', 'Q...Q', '...Q.', '..Q..', '..Q..', '.....', '..Q..']
const BRUSH = ['......PP', '.....PPP', '....PPP.', '...KK...', '..KK....', '.BB.....', 'BB......', 'B.......']
const GUITAR = ['.....KK', '....KK.', '...KK..', '..KK...', 'OOO....', 'OKOO...', 'OOOO...', '.OO....']
const BALL = ['.YYYY.', 'YYKYYY', 'YKYYKY', 'YYKKYY', '.YYYY.']

// a browser window whose tab strip keeps filling up
function browser(x, cx, cy, k, lt) {
  sheet(x, cx, cy, 330, 250, k, 0.04, () => {
    x.fillStyle = '#2a2350'; x.fillRect(-165, -125, 330, 46)
    const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 11), w = Math.max(18, 300 / n)
    for (let i = 0; i < n; i++) { x.fillStyle = i === n - 1 ? PAPER : ['#ffd23a', '#8fe3ff', '#ff8fb1', '#7dffb0'][i % 4]; x.fillRect(-156 + i * w, -116, w - 4, 34) }
    x.fillStyle = GREY; for (let i = 0; i < 4; i++) x.fillRect(-130, -50 + i * 38, i % 2 ? 180 : 250, 14)
  })
}
// a phone with a stack of five text bubbles
function phone(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -200, 256, 412)
  x.fillStyle = INK; x.fillRect(-132, -212, 264, 424)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -204, 248, 408)
  x.fillStyle = '#140c30'; x.fillRect(-110, -176, 220, 352)
  const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.28) + 1)
  const W = ['hiii', 'ok wait', 'also!!', 'one more', 'love u']
  for (let i = 0; i < n; i++) {
    x.fillStyle = ACC; x.fillRect(-96, -156 + i * 66, 180, 50)
    txt(x, W[i], -6, -130 + i * 66, 26, INK, INTER, 800)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You talk fast. | *Your mind is faster.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const W = ['so then—', 'and ALSO—', 'wait, wait—', 'ok so—']
      bubble(x, 790, 760, W[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.35))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1040, 'IDEAS PER SECOND: 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 28)
    } },
  { sign: S, cap: 'Twelve tabs open? | *That’s curiosity.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      browser(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 650, 'TABS: ALL OF THEM', pop01(t, P.t0 + 0.9, 0.3, 2.4), SKYB, -0.04, 30)
      L(x, 790, 1080, 'BRAIN: THRIVING', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'You changed your mind? | *That’s growing.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: lt => [lt > 1.0 ? 1 : -1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), flip = lt > 1.0
      sheet(x, 790, 920, 22, 200, k, 0, null, BROWN)
      sheet(x, 790, 820, 300, 96, k, flip ? 0.06 : -0.06, () => txt(x, flip ? 'PLAN B →' : '← PLAN A', 0, 2, 44, INK, MONO, 700), flip ? MINT : ORANGE)
      L(x, 790, 1090, 'UPDATED, NOT LOST', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Two moods by lunch. | *Both are welcome.*', mood: lt => Math.floor(lt * 1.8) % 2 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 710, 860, 150, 150, k, -0.08, () => signChar(x, t, S, 0, 4, 120, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.4 }), '#ffe7a8')
      sheet(x, 880, 860, 150, 150, pop01(t, P.t0 + 0.45, 0.3, 2), 0.08, () => signChar(x, t, S, 0, 4, 120, { mood: 'sleepy', seed: 62, glyph: false, glow: 0.4 }), '#c9d8ff')
      L(x, 790, 660, 'MOOD 1 + MOOD 2', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, -0.04, 30)
      L(x, 790, 1060, 'TABLE FOR BOTH', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Hobby number nine? | *Collect them all.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { O: ORANGE, K: BROWN }, 690, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BRUSH, { P: PINK, K: GREY, B: BROWN }, 890, 860, 22 * pop01(t, P.t0 + 0.45, 0.3, 2))
      drawBits(x, BALL, { Y: ACC, K: INK }, 800, 1020, 20 * pop01(t, P.t0 + 0.7, 0.3, 2))
      const n = 7 + Math.min(2, Math.floor(Math.max(0, lt - 0.5) / 0.5))
      L(x, 790, 660, `HOBBY #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.4), ACC, -0.04, 40)
      L(x, 790, 1120, 'ALL OF THEM COUNT', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'So many questions. | *Keep asking.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.25 + i * 0.22, 0.3, 2.2)
        drawBits(x, QM, { Q: [ACC, SKYB, PINK, MINT, LAV][i] }, 680 + (i % 3) * 110 + (i > 2 ? 55 : 0), 760 + (i > 2 ? 170 : 0) + Math.sin(t * 3 + i) * 8, 13 * k, { rot: (i % 2 ? 0.15 : -0.12) })
      }
      L(x, 790, 1110, 'WHY? HOW? AND THEN?', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Your texts come in fives. | *They light us up.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1120, 'FROM: YOUR MATCH', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, 0.04, 28)
      if (lt > 1.6) hearts(x, t, 800, 720, P.t0 + 1.8, { n: 4, life: 1.3, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Your friends love | *the chaos.* Truly.', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', look: [1, 0], star: ST, hops: [0.9, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 960, 220 * k, { mood: lt > 0.9 ? 'heart' : 'happy', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.9] })
      bubble(x, 820, 690, 'never change!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: PINK, tail: 'bc' })
      L(x, 820, 1150, 'FUN LEVEL: MAX', pop01(t, P.t0 + 1.7, 0.3, 2.4), ACC, -0.04, 30)
    } },
  { sign: S, cap: 'The right people | *keep up.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const f = ease.outCubic(prog(lt, 0.2, 1.0))
      signChar(x, t, 'aquarius', lerp(1100, 700, f), 1000, 170, { mood: 'sparkle', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.8] })
      signChar(x, t, 'sagittarius', lerp(1250, 880, f), 1000, 170, { mood: 'happy', look: [-1, 0], seed: 24, glyph: false, hops: [P.t0 + 1.2, P.t0 + 2.0] })
      L(x, 790, 700, 'PACE: MATCHED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0571', key: 'D', accent: ACC, solo: 'gemini', ending: 'callback',
  title: 'Gemini, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Not too much. | *Just enough.*', mood: 'heart' },
  last: {
    text: 'Keep talking. | *We’re listening.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'gemini', 540, 1120, 330 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', seed: 33, hops: [t0 + 1.4] })
      signChar(x, t, 'libra', 260, 1250, 170 * pop01(t, t0 + 0.7, 0.4, 2), { mood: 'heart', look: [1, 0], seed: 34, glyph: false })
      signChar(x, t, 'aquarius', 820, 1250, 170 * pop01(t, t0 + 0.85, 0.4, 2), { mood: 'sparkle', look: [-1, 0], seed: 35, glyph: false })
      bubble(x, 640, 820, 'ok so—', pop01(t, t0 + 1.1, 0.25, 2.2), { size: 64, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 540, 1450, t0 + 1.4, { n: 6, life: 1.8, spread: 700, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
