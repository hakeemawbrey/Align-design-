// r2a0197: star_advice, ADVICE SOLO, "What Aries need | on a bad day." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (solo mode, 9 cards): what actually helps an Aries on a bad day, warm and a little funny.
//   0.0–3.6    "What Aries need | *on a bad day.*"
//   3.6–37.8   nine cards: a long run, then a long nap · space to vent, loudly (LISTENING ✓) · any win, even MADE THE BED
//              · no "calm down", just snacks · someone saying "you were right" · something to fix: hand them the toolbox
//              · a match texting "want backup?" · tomorrow is a fresh start line · a hug, a fast one (HUG: 0.5 SEC)
//  37.8        "All fire. | *Soft landing.*"
//  41.0        LESSON UNLOCKED: "Bad days don’t dim you. | You’ll *burn bright* again."  FIRE: RECHARGING
//  46.9        "Tomorrow, Aries | *goes first again.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const EMBER = '#ff6b4a', RED = '#e23d4e', S = 'aries'

const SHOE = ['......RR..', '.....RRRR.', 'RRRRRRRRRR', 'RWRWRRRRRR', 'KKKKKKKKKK']
const TROPHY = ['YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '...YY...', '...YY...', '.YYYYYY.']
const BAG = ['..KKKK..', 'BBBBBBBB', 'BbbbbbbB', 'BbYYYYbB', 'BbYYYYbB', 'BbbbbbbB', 'BBBBBBBB']
const TOOLBOX = ['..KKKKKK..', '..K....K..', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRYYRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR']
const FLAG = ['KWBWBWB', 'KBWBWBW', 'KWBWBWB', 'KBWBWBW', 'K......', 'K......', 'K......', 'K......', 'K......']
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}

const CAMEOS = [
  { sign: S, cap: 'A long run. | *Then a long nap.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (lt < 1.3) {
        const k = pop01(t, P.t0 + 0.2, 0.3, 2)
        drawBits(x, SHOE, { R: EMBER, W: '#fff', K: INK }, 800, 900, 22 * k)
        x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(610 - ((t * 400 + i * 60) % 120), 870 + i * 26, 70, 8)
        label(x, 800, 700, 'LAP 9', k, { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      } else {
        const k = pop01(t, P.t0 + 1.3 * 1.29, 0.35, 2)
        if (box(x, 800, 920, 280, 140, k, BONE, -0.04)) { x.fillStyle = LAV; x.fillRect(-130, -60, 260, 30); x.restore() }
        label(x, 800, 700, 'NAP: EARNED', k, { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      }
    } },
  { sign: S, cap: 'Space to vent. | *Loudly.* To you.', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 }, squash: lt => 0.03 * Math.sin(lt * 20),
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'AND ANOTHER THING', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: '#ffd0c4', tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 960, 190 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.6] })
      label(x, 800, 1120, 'LISTENING ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Any win at all. | *Even a tiny one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD }, 800, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1090, 'MADE THE BED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.3, 8, 170, 0.2)
    } },
  { sign: S, cap: 'Not “calm down.” | *Just snacks.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.25, 2.2)
      bubble(x, 790, 660, 'calm down', k, { size: 38, col: '#d8dbe8', tail: 'bl' })
      if (lt > 0.7) { const p = clamp((lt - 0.7) / 0.3); x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(680, 640); x.lineTo(680 + 220 * p, 680); x.stroke() }
      drawBits(x, BAG, { K: '#8a5a3a', B: '#ffb34a', b: '#ffd08a', Y: RED }, 800, 940, 24 * pop01(t, P.t0 + 1.0, 0.35, 2), { rot: 0.06 })
    } },
  { sign: S, cap: 'Someone saying | *“you were right.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 960, 190 * k, { mood: 'happy', look: [-1, 0], seed: 23, glyph: false })
      bubble(x, 800, 690, 'you were right.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 420, 650, 'HEALED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.06 })
    } },
  { sign: S, cap: 'Something to fix. | Hand them *the toolbox.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, { K: INK, R: RED, Y: GOLD }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1090, 'WOBBLY SHELF: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A match who texts | *“want backup?”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (box(x, 800, 870, 330, 240, pop01(t, P.t0 + 0.2, 0.35, 2), '#2a2350', 0.04)) {
        x.fillStyle = PINK; x.fillRect(-165, -120, 330, 50)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEW MESSAGE: MATCH', 0, -94)
        x.restore()
      }
      bubble(x, 800, 900, 'want backup?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 800, 1060, P.t0 + 1.6, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Tomorrow? | *A fresh start line.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.5],
    back(x, t, lt, P) {
      const k = clamp((lt - 0.2) / 0.4)
      x.save(); x.globalAlpha = k
      for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? INK : BONE; x.fillRect(130 + i * 51, 1110, 51, 26); x.fillStyle = i % 2 ? BONE : INK; x.fillRect(130 + i * 51, 1136, 51, 26) }
      x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: BONE, B: INK }, 800, 840, 22 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: 0.08 * Math.sin(t * 4) })
      label(x, 800, 620, 'READY, SET…', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'A hug. | *A fast one.*', mood: 'heart', look: [1, 0], star: { x: -110 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const close = lt > 0.8 && lt < 1.2 ? 60 : 0
      if (k > 0.01) signChar(x, t, 'cancer', 720 - close, 900, 220 * k, { mood: 'heart', look: [-1, 0], seed: 25, glyph: false })
      if (lt > 0.8 && lt < 1.4) hearts(x, t, 560, 760, P.t0 + 0.8 * 1.29, { n: 5, life: 1.0, spread: 120, cell: 7, seed: 8 })
      label(x, 760, 650, 'HUG: 0.5 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0197', key: 'F', accent: EMBER, solo: S, ending: 'lesson',
  title: 'What Aries need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'All fire. | *Soft landing.*', mood: 'happy' },
  lesson: { text: 'Bad days don’t dim you. | You’ll *burn bright* again.', chip: 'FIRE: RECHARGING' },
  last: { text: 'Tomorrow, Aries | *goes first again.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
