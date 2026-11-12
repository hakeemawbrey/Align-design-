// r2a0228: ADVICE SOLO, "Taurus, you can | be a beginner." (star_advice, music: lofi · C). Ending: lesson.
// One sign (solo, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   first drawing (it's a cat) · hate looking silly, everyone starts silly · burnt the first loaf, bread forgives
//   · slow progress is progress · day three of the routine · asking for help isn't losing · the plant looks rough,
//   still growing · the comfort zone is cozy, peek out · beginner today, expert someday
//   group "Brand new. | *Doing great.*"  LESSON "Start small. | *Stay curious.*"  NEW SKILL: LOADING
//   last "Loaf number two? | *Delicious.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, meter, frame, calendar, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const S = 'taurus', L = { x: -190 }
const LOAF = c => [['..BBBBBBB..', '.BBbBBBbBB.', 'BBBBBbBBBBB', 'BBBBBBBBBBB', 'BBBBBBBBBBB', '.BBBBBBBBB.'], { B: c, b: c === '#3a2418' ? '#1f130c' : '#f2d29a' }]

const CAMEOS = [
  { sign: S, cap: 'First drawing: a potato? | *It’s a start.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      frame(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 240, 200, x => {
        x.fillStyle = '#c98f5a'; x.beginPath(); x.ellipse(0, 10, 80, 56, 0.2, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.fillRect(-30, -4, 10, 10); x.fillRect(20, -4, 10, 10); x.fillRect(-50, -60, 14, 30); x.fillRect(40, -60, 14, 30)
      }, { col: BONE })
      label(x, 790, 1000, 'IT’S A CAT.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Scared of looking silly? | *Everyone starts silly.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'is this | right??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 940, 'KIND OF! ♡', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Burnt the first loaf? | *Bread forgives.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const [bm, c] = LOAF('#3a2418')
      drawBits(x, bm, c, 790, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 980, 'LOAF #1: CRISPY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow progress | *is still progress.*', mood: 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      meter(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05 + 0.25 * ease.inOutCubic(prog(lt, 0.5, 2.2)), { w: 320, col: MINT, title: 'SKILL' })
      label(x, 790, 1000, '+1% TODAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New routine feels weird? | *Give it time.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 'NEW HABIT', lt > 1.0 ? 'DAY 3' : 'DAY 1')
    } },
  { sign: S, cap: 'Asking for help | *isn’t losing.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'um… how do I…?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      phone(x, 790, 920, 0.9 * pop01(t, P.t0 + 1.0, 0.3, 2), { top: '♉︎', head: 'BESTIE', msg: 'omw! | love this', bg: MINT })
    } },
  { sign: S, cap: 'The plant looks rough. | *It’s still growing.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'plant', 790, 790, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1 ? 0 : -0.2 })
      label(x, 790, 1000, 'NEW LEAF: 1', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.3, 6, 130, 0.3)
    } },
  { sign: S, cap: 'Comfort zone is cozy. | *Peek out anyway.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -190, y: -20 },
    back(x, t, lt, P) { bits(x, 'pillow', 350, 1060, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'just a | little peek.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Beginner today. | *Expert someday.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'trophy', 790, 780, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1000, 'RESERVED: YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0228', key: 'C', accent: GREEN, solo: S, ending: 'lesson',
  title: 'Taurus, you can | *be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Brand new. | *Doing great.*', mood: 'sparkle' },
  lesson: { text: 'Start small. | *Stay curious.*', chip: 'NEW SKILL: LOADING' },
  last: {
    text: 'Loaf number two? | *Delicious.*',
    draw(x, t, lt) { const [bm, c] = LOAF('#e8a24a'); drawBits(x, bm, c, 540, 1270, 30 * pop01(t, t - lt + 0.8, 0.35, 2.2)); sparkles(x, t, 540, 1270, t - lt + 1.0, 8, 200, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
