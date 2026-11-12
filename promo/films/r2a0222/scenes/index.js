// r2a0222: star_advice, ADVICE SOLO, "How to surprise | a Pisces." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (solo mode, 9 cards): small, thoughtful surprises and the very big Pisces reactions.
// Pisces cries in every card (happy tears).
//   0.0–3.6    "How to surprise | *a Pisces.*"
//   3.6–37.8   remember one tiny detail, they melt · a handwritten note, read 40 times · a blanket fort night in · a
//              playlist, every song a sob · a tiny plant, they name it Gerald · say why you love them, out loud · take them
//              to the sea, instant home · know their moon sign · just show up
//  37.8        "Small things. | *Huge feelings.*"   41.2  callback: "Gerald the plant | *is thriving.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'pisces', ST = { x: -190 }, SEA = '#6fc3ff'

const PLANT = ['...G.G...', '..GGGGG..', '.GG.G.GG.', 'GG..G..GG', '....G....', '.TTTTTTT.', '.TTKTKTT.', '.TTTTTTT.', '..TTTTT..']
const PLANT_C = { G: GREEN, T: ORANGE, K: INK }
const FORT = ['.......P.......', '......PPP......', '.....PPWPP.....', '....PPWWWPP....', '...PPWWWWWPP...', '..PPWWWWWWWPP..', '.PPWWWWWWWWWPP.', 'PPWWWWWWWWWWWPP', 'B.............B']
const FORT_C = { P: LAV, W: '#9a7be0', B: BROWN }
const FISH = ['..OO..', 'OOOOO.O', 'OKOOOOO', 'OOOOO.O', '..OO..']

/** the little plant, sized by cell, with an optional name tag */
function gerald(x, t, cx, cy, cell, k, name) {
  drawBits(x, PLANT, PLANT_C, cx, cy + Math.sin(t * 2) * 3, cell * k)
  if (name) label(x, cx, cy + cell * 7.5, name, k, { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
}
/** rolling pixel waves across the lower panel */
function waves(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  for (let r = 0; r < 3; r++) {
    x.fillStyle = [SEA, '#4a9ad8', '#2a6fb0'][r]
    for (let i = 0; i < 22; i++) { const px = 120 + i * 40, py = 1020 + r * 50 + Math.round(Math.sin(i * 0.8 + t * 3 + r) * 10); x.fillRect(px, py, 40, 220 - r * 50) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Remember one tiny detail. | *Watch them melt.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears: 2, star: ST,
    squash: lt => 0.12 * ease.inOutCubic(prog(lt, 1.2, 1.8)),
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 820, 280, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffe066', rot: 0.05 }, () => {
        txt(x, 'you said you', 0, -50, { size: 28, font: MONO, weight: 700 })
        txt(x, 'like moon', 0, 0, { size: 28, font: MONO, weight: 700 })
        txt(x, 'cookies :)', 0, 50, { size: 28, font: MONO, weight: 700 })
      })
      label(x, 790, 1080, 'STATUS: MELTED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A handwritten note? | *Read 40 times.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', tears: lt => lt > 1.2 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => {
        x.strokeStyle = '#6b62a8'; x.lineWidth = 5
        for (let i = 0; i < 5; i++) { x.beginPath(); for (let j = 0; j <= 10; j++) { const px = -100 + j * 18, py = -100 + i * 46 + Math.sin(j * 1.7 + i) * 6; j ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
        drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 70, 120, 6)
      })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 39)
      label(x, 790, 650, `READS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plan a cozy night in. | *Blanket fort wins.*', mood: 'sparkle', tears: 1, star: { x: -200, y: 30 },
    front(x, t, lt, P) {
      drawBits(x, FORT, FORT_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.7) for (let i = 0; i < 8; i++) { const on = Math.sin(t * 4 + i * 1.3) > -0.3; x.fillStyle = on ? ['#ffe066', PINK, MINT][i % 3] : '#4a4466'; x.fillRect(640 + i * 40, 760 + Math.abs(i - 3.5) * 22, 14, 14) }
      label(x, 790, 1120, 'FORT: APPROVED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Make them a playlist. | *Every song, a sob.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 960, { n: 5, cell: 8, col: PINK })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.7) * 11)
      label(x, 790, 700, `SONG ${n} OF 12`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, `TISSUES: ${n}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bring a tiny plant. | *They’ll name it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      gerald(x, t, 790, 860, 22, k, null)
      label(x, 790, 1060, 'HELLO, GERALD', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Say why you love them. | *Out loud.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', tears: lt => lt > 1.1 ? 3 : 1, look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 990, 180 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 800, 720, 'you’re kind | and you’re magic', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'br' })
      label(x, 450, 640, 'HEART: FULL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Take them to the sea. | *Instant home.*', mood: 'sparkle', tears: 2, star: { x: -190, y: -40 }, hops: [0.9],
    back(x, t, lt, P) { waves(x, t, ease.outCubic(prog(lt, 0.1, 0.5))) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const ph = (lt * 0.6 + i * 0.33) % 1; drawBits(x, FISH, { O: [ORANGE, PINK, GOLD][i], K: INK }, 600 + ph * 340, 1100 + i * 40 - Math.sin(Math.PI * ph) * 70, 9, { alpha: clamp(lt * 2) }) }
      label(x, 790, 760, 'LOCATION: HOME', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: SEA, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Know their moon sign. | *Instant tears.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', tears: lt => lt > 1.3 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 800, 1070, 'you KNOW | my moon?!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'The best surprise? | *Just showing up.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: 2, look: [1, 0], star: { x: -170 }, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      const op = ease.inOutCubic(prog(lt, 0.4, 0.9))
      x.save(); x.translate(800, 900)
      x.fillStyle = INK; x.fillRect(-120, -220, 240, 420); x.fillStyle = '#fff1b0'; x.fillRect(-110, -210, 220, 400)
      x.restore()
      if (op > 0.4) signChar(x, t, 'taurus', 800, 960, 180, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false, pop: clamp((op - 0.4) * 2) })
      x.save(); x.translate(800, 900); x.fillStyle = '#5b2e1a'; x.fillRect(-110 + 180 * op, -210, 220 - 200 * op, 400); x.restore()
      bubble(x, 800, 640, 'hi. i’m here.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bc' })
      hearts(x, t, 440, 900, P.t0 + 1.3, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0222', key: 'F', accent: SEA, solo: S, ending: 'callback',
  title: 'How to surprise | *a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Small things. | *Huge feelings.*', mood: 'heart' },
  last: {
    text: 'Gerald the plant | *is thriving.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 2)
      gerald(x, t, 540, 1020, 40, k, null)
      label(x, 540, 1290, 'GERALD (THRIVING)', pop01(t, t - lt + 1.0, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1000, t - lt + 1.1, 8, 260, 0.2, [MINT, GOLD, BONE])
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
