// r2a0377: star_advice ADVICE-SOLO (gemini), "Gemini, you can | *ask for help.*" (~45 s vertical, signs3kit social cut, lofi · F)
// Nine warm truths for the Gemini who carries everything alone, each with one cute visual gag:
//   juggling twelve plans · forty tabs open · fixes everyone's day · say "help" once, watch who shows up
//   · a to-do list down to the floor · talking it out counts · plan A, B, C… changing your mind is allowed
//   · busy isn't the same as okay · you're a great friend, let them be one too
//  37.8   "Curious. Clever. | *Never alone.*"  Gemini comes back, big.
//  41.2   callback: "Gemini asked. | *Everyone came.*"  the "on my way!" bubbles from card four, plus friends.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffe36a'
// juggling balls orbiting above the star
function juggle(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  const C = ['#ff6b5a', GOLD, MINT, SKYB, LAV, PINK]
  for (let i = 0; i < n; i++) {
    const a = t * 3.2 + i / n * Math.PI * 2
    const px = cx + Math.cos(a) * 230 * k, py = cy + Math.sin(a) * 100 * k - 20
    x.fillStyle = INK; x.fillRect(px - 34, py - 34, 68, 68); x.fillStyle = C[i % C.length]; x.fillRect(px - 28, py - 28, 56, 56)
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(px - 20, py - 20, 14, 14)
  }
}
// a stack of browser-ish tabs
function tabs(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = Math.min(10, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.12))
  const C = ['#c9a6ff', '#8fe3ff', '#7dffb0', '#ffe36a', '#ff8fb1']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) {
    const px = -130 + i * 14, py = -150 + i * 30
    x.fillStyle = INK; x.fillRect(px - 4, py - 4, 248, 128)
    x.fillStyle = C[i % 5]; x.fillRect(px, py, 240, 120)
    x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(px + 12, py + 40, 150, 12); x.fillRect(px + 12, py + 64, 110, 12)
  }
  x.restore()
}
const WRENCH = [
  'GG..GG',
  'GG..GG',
  'GGGGGG',
  '.GGGG.',
  '..GG..',
  '..GG..',
  '..GG..',
  '..GG..',
  '..GG..',
  '.GGGG.',
]
const WRENCH_C = { G: '#c9c9d8' }
// a to-do list that unrolls off the bottom of the panel
function todo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const h = lerp(120, 470, ease.outCubic(prog(lt, 0.3, 1.6)))
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-116, -230, 232, h + 8)
  x.fillStyle = '#fff4e2'; x.fillRect(-110, -226, 220, h)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TO DO', 0, -198)
  for (let y = -160; y < -226 + h - 20; y += 34) { x.fillStyle = '#9aa5c4'; x.fillRect(-88, y, 22, 22); x.fillRect(-54, y + 6, 120 + ((y * 13) % 30), 10) }
  x.restore()
}
// a clock with spinning hands
function clock(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 90 - 5, Math.sin(a) * 90 - 5, 10, 10) }
  const sp = lt < 1.5 ? lt * 14 : 1.5 * 14
  x.save(); x.rotate(sp); x.fillStyle = INK; x.fillRect(-5, -84, 10, 90); x.restore()
  x.save(); x.rotate(sp / 12); x.fillStyle = '#e23d4e'; x.fillRect(-7, -56, 14, 62); x.restore()
  x.restore()
}

const ST = { x: -170 }
const ON_MY_WAY = [['on my way!', 790, 640], ['coming!!', 790, 830], ['here. what’s up?', 790, 1020]]
const CAMEOS = [
  { sign: 'gemini', cap: 'Juggling twelve plans? | *Pass one over.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', star: { x: 0, y: 60 },
    front(x, t, lt, P, F) {
      juggle(x, t, 540, 640, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.6 ? 4 : 6)
      if (lt > 1.6) signChar(x, t, 'libra', 860, 1000, 170 * pop01(t, P.t0 + 1.6, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 12, glyph: false })
    } },
  { sign: 'gemini', cap: 'Forty tabs open? | *Close a few.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tabs(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'TABS: 40', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'You fix everyone’s day. | *Let them fix yours.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 840, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      drawBits(x, WRENCH, WRENCH_C, lerp(840, 700, ease.outCubic(prog(lt, 0.8, 1.3))), 780, 14 * k, { rot: -0.5 })
      label(x, 790, 620, 'HELP: INCOMING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Say “help” once. | Watch *who shows up.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ON_MY_WAY.forEach(([s, bx, by], i) => bubble(x, bx, by, s, pop01(t, P.t0 + 0.7 + i * 0.35, 0.25, 2.2), { size: 36, col: [BONE, '#ffe36a', LAV][i], tail: 'bl' }))
    } },
  { sign: 'gemini', cap: 'A to-do list | *to the floor?* Share it.', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      todo(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
    } },
  { sign: 'gemini', cap: 'Talking it out | *counts* as asking.', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 840, 990, 190 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false, tears: 1 })
      bubble(x, 760, 700, 'so basically— | and THEN—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, col: '#ffe36a', tail: 'bl' })
      label(x, 840, 1150, 'LISTENING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed your mind? | *That’s allowed too.*', mood: 'wink', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const P3 = ['PLAN A', 'PLAN B', 'PLAN C', 'PLAN D', 'ALL GOOD']
      label(x, 790, 840, P3[Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))], pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: lt > 1.82 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Busy isn’t | *the same as okay.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, lt > 1.5 ? 'PAUSE. BREATHE.' : 'BUSY BUSY BUSY', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: lt > 1.5 ? LAV : '#ff9a4a', rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'You’re a great friend. | *Let them be one.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 960, 220 * k, { mood: 'sparkle', look: [-1, 0], seed: 16, glyph: false, hops: [P.t0 + 1.3] })
      label(x, 600, 700, 'HIGH FIVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05 })
      hearts(x, t, 600, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0377', key: 'F', accent: ACC, solo: 'gemini', ending: 'callback',
  title: 'Gemini, you can | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Curious. Clever. | *Never alone.*', mood: 'heart' },
  last: {
    text: 'Gemini asked. | *Everyone came.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 540, 1080, 300 * k, { mood: lt > 1.6 ? 'heart' : 'happy', seed: 85, glyph: false, hops: [t - lt + 1.7] })
      const FR = [['cancer', 250, 1180], ['libra', 830, 1180], ['sagittarius', 310, 900], ['pisces', 780, 900]]
      FR.forEach(([id, fx, fy], i) => { const kk = pop01(lt, 0.8 + i * 0.2, 0.35, 2); if (kk > 0.01) signChar(x, t, id, fx, fy, 160 * kk, { mood: 'happy', look: [fx < 540 ? 1 : -1, 0], seed: 30 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 }) })
      ON_MY_WAY.forEach(([s], i) => bubble(x, [300, 790, 540][i], [760, 760, 1400][i], s, pop01(lt, 1.6 + i * 0.25, 0.25, 2.2), { size: 34, col: [BONE, '#ffe36a', LAV][i], tail: 'bc' }))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
