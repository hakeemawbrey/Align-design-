// r2a0306: star_advice, ADVICE SOLO (aquarius), "What Aquarians need | from a friend." (signs3kit social cut, music: lofi · D). Ending: callback (Gary the rock).
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

const ACC = '#6fc3ff'
const CHAIR = ['KKKKKK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCKKK', 'KCCCCCCK', 'KKKKKKKK', 'K.K..K.K', 'K.K..K.K', 'K.K..K.K']
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const ROCK = ['...GGGGG....', '.GGGGGGGGG..', 'GGWWGGGWWGG.', 'GGWKGGGWKGGG', 'GGGGGGGGGGGG', 'GGGGGDDGGGGG', '.GGGGGGGGGG.', '..GGGGGGG...']
const ROCK_C = { G: '#9aa5c4', W: '#ffffff', K: INK, D: '#6b62a8' }
const CLOUD = ['...WWWW.....', '.WWWWWWWW...', 'WWWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const UMB = ['....RRRR....', '..RRRRRRRR..', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', '.....K......', '.....K......', '.....K......', '.....K......', '...K.K......', '....K.......']
const BADGE = ['..YYYYY..', '.YYYYYYY.', 'YYYKYKYYY', 'YYYYYYYYY', 'YYKYYYKYY', '.YYKKKYY.', '..YYYYY..', '..R...R..', '.RR...RR.']
/** a little rain under a cloud */
function rain(x, t, cx, cy, w) {
  x.save(); x.fillStyle = SKYB
  for (let i = 0; i < 7; i++) { const ph = ((t * 1.4 + i * 0.37) % 1 + 1) % 1; x.fillRect(cx - w / 2 + (i / 6) * w, cy + ph * 160, 5, 16) }
  x.restore()
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Need some space? | A real friend *waits warmly.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { K: INK, C: ACC }, 640, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CHAIR, { K: INK, C: PINK }, 850, 1000, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 850, 900, 140 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 800, 700, 'take your time', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'br' })
      L(x, 770, 1130, 'SPACE: RESPECTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Wild idea at midnight? | They *want to hear it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, -1], star: ST, hops: [0.4],
    front(x, t, lt, P, F) {
      drawBits(x, BULB, { Y: '#ffe76a', W: '#ffffff', G: '#9aa5c4' }, F.x + 10, F.top - 70, 14 * pop01(t, P.t0 + 0.3, 0.3, 2.2))
      sparkles(x, t, F.x + 10, F.top - 70, P.t0 + 0.5, 6, 90, 0.2)
      phone(x, 800, 860, pop01(t, P.t0 + 0.6, 0.3, 2), { head: '12:04 AM', headCol: ACC, lines: [
        ['ok hear me out', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['go on!!', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
        ['tell me more', MINT, pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Replied three days late? | *Still friends.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: PINK, lines: [
        ['sorry!! 3 days', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['no rush, ever', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Your odd hobby? | They *ask questions.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROCK, ROCK_C, 800, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 820, 'ROCK #48: GARY', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.04, 34)
      bubble(x, 790, 650, 'tell me | about Gary', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'You show love in facts. | *It still lands.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, col: ACC, tail: 'bl' })
      L(x, 790, 900, 'TRANSLATION:', pop01(t, P.t0 + 1.0, 0.3, 2), BONE, 0.03, 30)
      L(x, 790, 990, 'I LOVE YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 40)
    } },
  { sign: S, cap: 'Go quiet on hard days? | *They stay anyway.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOUD, { W: '#9aa5c4' }, 380, 560, 16 * k)
      if (k > 0.9 && lt < 1.2) rain(x, t, 380, 600, 160)
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) {
        drawBits(x, UMB, { R: PINK, K: INK }, 480, 680, 18 * k, { rot: -0.25 })
        signChar(x, t, 'libra', 720, 920, 170 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      }
      L(x, 790, 1130, 'NOT GOING ANYWHERE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Big cause, big heart? | They *march beside you.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P, F) {
      const sign = (cx, cy, k, txt, bg) => {
        if (k <= 0.01) return
        x.save(); x.translate(cx, cy); x.rotate(0.04 * Math.sin(t * 4)); x.scale(k, k)
        x.fillStyle = '#8a4a2e'; x.fillRect(-6, 40, 12, 150)
        x.fillStyle = INK; x.fillRect(-130, -80, 260, 130); x.fillStyle = bg; x.fillRect(-122, -72, 244, 114)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        txt.split('|').forEach((s, i) => x.fillText(s, 0, -36 + i * 40)); x.restore()
      }
      sign(F.x, 560, pop01(t, P.t0 + 0.3, 0.3, 2), 'BE KIND|TO BEES', '#ffe76a')
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 940, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.4, P.t0 + 2.0] })
      sign(800, 700, pop01(t, P.t0 + 1.2, 0.3, 2), 'WHAT SHE|SAID', MINT)
    } },
  { sign: S, cap: 'Hate small talk? | Go *straight to the deep stuff.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 760, lt, 0.8, 'NICE WEATHER, HUH', 'WHAT IS TIME?', { size: 32, toBg: ACC })
      bubble(x, 790, 960, 'ooh. let’s go.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Feel like the odd one out? | You *belong here.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BADGE, { Y: GOLD, K: INK, R: RED }, 800, 840, 18 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: 0.08 })
      sparkles(x, t, 800, 840, P.t0 + 0.6, 8, 160, 0.4)
      L(x, 800, 1060, 'FRIEND CLUB: MEMBER', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 30)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0306', key: 'D', accent: ACC, solo: 'aquarius', ending: 'callback',
  title: 'What Aquarians | need from a *friend.*',
  cameos: CAMEOS,
  group: { cap: 'Weird is welcome. | *Stay you.*', mood: 'heart' },
  last: {
    text: 'Gary the rock | *says hi too.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3, t0 + 2.0] })
      drawBits(x, ROCK, ROCK_C, 740, 1120, 26 * pop01(t, t0 + 0.6, 0.4, 2), { rot: 0.05 * Math.sin(t * 3) })
      if (lt > 1.0) bubble(x, 760, 900, 'hi.', pop01(t, t0 + 1.0, 0.25, 2.4), { size: 48, tail: 'bc' })
      if (lt > 1.6) hearts(x, t, 560, 1000, t0 + 1.6, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
