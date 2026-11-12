// r2a0019: star_advice, ADVICE SOLO, "Aquarius, you don’t | have to be perfect." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each. Ending: lesson.
//   0.0–3.6    "Aquarius, you don’t | have to be *perfect.*"
//   3.6–37.8   idea not finished (share the draft) · forgot to text back (friends still love you) · world too big today (water one plant)
//              · awkward at the party (weird is welcome) · feelings feel clunky (say them anyway) · the gadget sparked (prototype #2)
//              · your chart isn’t a test (grade: n/a) · need alone time (guilt-free) · room a mess (big minds make piles)
//  37.8        "Imperfect. | *Still brilliant.*"
//  41.0        LESSON UNLOCKED: "Brilliant doesn’t mean | *flawless.*"  PRESSURE: OFF
//  46.9        "Prototype #2? | *Works great.*"  The gadget, beeping happily.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#6fc3ff', GREEN = '#7ee08a', RED = '#e23d4e'

// ── props
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const PLANT = ['.L..L.', 'LLLLLL', '.LLLL.', '..SS..', 'PPPPPP', '.PPPP.', '.PPPP.']
const CAN = ['......SS', '.....S..', 'CCCCSS..', 'CCCCC...', 'CCCC....', 'CCCC....']
const HAT = ['....Y....', '...YPY...', '..YPYPY..', '.YPYPYPY.', 'YPYPYPYPY']
const PHONES = ['..KKKKKKKKK..', '.KK.......KK.', 'KK.........KK', 'K...........K', 'GGG.......GGG', 'GGG.......GGG', 'GGG.......GGG']
function gadget(x, t, cx, cy, k, broken) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -90, 240, 180); x.fillStyle = '#9aa5c4'; x.fillRect(-110, -80, 220, 160)
  x.fillStyle = '#2a2350'; x.fillRect(-90, -60, 110, 70)
  x.fillStyle = broken ? RED : GREEN; x.fillRect(-80, -50, 90, 50)
  ;[[60, -40, GOLD], [60, 0, PINK], [60, 40, AQUA]].forEach(([bx, by, c]) => { x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 18, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(bx, by, 13, 0, Math.PI * 2); x.fill() })
  x.fillStyle = INK; x.fillRect(-6, -150, 12, 60); x.fillStyle = broken ? RED : GREEN; x.beginPath(); x.arc(0, -156, 16, 0, Math.PI * 2); x.fill()
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}
function papers(x, t, cx, cy, k) {
  if (k <= 0.01) return
  for (let i = 0; i < 9; i++) {
    x.save(); x.translate(cx + Math.sin(i * 2.3) * 140, cy + Math.cos(i * 1.7) * 90 + (i % 3) * 30); x.rotate(Math.sin(i * 3.1) * 0.6); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-46, -36, 92, 72); x.fillStyle = i % 3 ? BONE : '#fff1b0'; x.fillRect(-40, -30, 80, 60)
    x.fillStyle = '#9aa5c4'; x.fillRect(-30, -16, 50, 6); x.fillRect(-30, 0, 40, 6)
    x.restore()
  }
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Idea not finished? | *Share the draft.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const on = lt > 1.0
      drawBits(x, BULB, { Y: on ? '#fff1b0' : '#6b62a8', G: '#9aa5c4' }, 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (on) sparkles(x, t, 790, 800, P.t0 + 1.0 * 1.29, 7, 170, 0.2)
      label(x, 790, 1080, 'v0.1 · STILL GENIUS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: AQUA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgot to text back? | *Friends still love you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'sorry!! | 4 days late', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: AQUA, tail: 'bl' })
      bubble(x, 790, 960, 'all good! | missed you', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'World too big today? | *Water one plant.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, { L: GREEN, S: '#4fa85a', P: '#d98a5e' }, 830, 1000, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAN, { C: AQUA, S: '#9aa5c4' }, 700, 800, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: lt > 0.9 ? 0.4 : 0 })
      if (lt > 1.0) { x.fillStyle = SKYB; for (let i = 0; i < 4; i++) { const ph = (t * 2 + i / 4) % 1; x.fillRect(790 + i * 8, 830 + ph * 100, 8, 14) } }
      label(x, 790, 650, 'WORLD: +1 PLANT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Awkward at the party? | *Weird is welcome.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { Y: GOLD, P: PINK }, F.x + 40, F.top - 30, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.35 })
      label(x, 790, 820, 'FUN FACT ABOUT EELS?', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1010, 'tell me more!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'br' })
    } },
  { sign: S, cap: 'Feelings come out clunky? | *Say them anyway.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'I… appreciate | your… existence.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 790, 1000, 'FEELINGS: SENT ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The gadget sparked? | *Prototype #2.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      gadget(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.3)
      if (lt > 0.5 && lt < 1.3) sparkles(x, t, 790, 760, P.t0 + 0.6 * 1.29, 6, 80, 0.5, [GOLD, RED, BONE])
      label(x, 790, 1100, lt < 1.3 ? 'OOPS' : 'NEXT VERSION ✦', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: lt < 1.3 ? RED : MINT, color: INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your chart isn’t a test. | *Nothing to pass.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 840, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1070, 'GRADE: N/A ✦', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Need alone time? | *Take it, guilt-free.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, PHONES, { K: INK, G: AQUA }, F.x, F.top + 40, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const n = Math.round(lerp(20, 100, ease.inOutCubic(prog(lt, 0.4, 2.0))))
      label(x, 790, 860, `RECHARGING ${n}%`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Room a mess? | *Big minds make piles.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      papers(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'FILING SYSTEM: VIBES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: AQUA, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0019', key: 'E', accent: AQUA, solo: 'aquarius', ending: 'lesson',
  title: 'Aquarius, you don’t | have to be *perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Imperfect. | *Still brilliant.*', mood: 'sparkle' },
  lesson: { text: 'Brilliant doesn’t mean | *flawless.*', chip: 'PRESSURE: OFF' },
  last: {
    text: 'Prototype #2? | *Works great.*',
    draw(x, t, lt) {
      gadget(x, t, 540, 1290, pop01(t, t - lt + 0.5, 0.35, 2) * 1.2, false)
      sparkles(x, t, 540, 1240, t - lt + 0.9, 8, 200, 0.2)
      label(x, 800, 1130, 'BEEP!', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.08, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
