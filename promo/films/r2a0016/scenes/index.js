// r2a0016: star_advice, ADVICE SOLO, "Libra, it’s okay | to be a beginner." (topic: Libra, you’re allowed to be a beginner) (~46 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Libra truth + a warm reframe, one gag each.
// Ending: callback (the wobbly bowl from card 1 comes back, full of berries).
//   0.0–3.6    "Libra, it’s okay | *to be a beginner.*"
//   3.6–37.8   first bowl is wobbly (that’s a first try) · can’t pick a hobby (flip a coin) · two left feet (still dancing)
//              · not pretty yet (draft 1) · asked everyone’s opinion (your vote wins) · scared to look silly (beginners club)
//              · first message to a match (“hi!” is plenty) · a “dumb” question (questions welcome) · tiny progress (a sprout)
//  37.8        "Beginner era. | *Beautiful era.*"
//  41.2        CALLBACK: "That wobbly bowl? | *Best berry bowl.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1', CLAY = '#d98a5e', RED = '#e23d4e', GREEN = '#7ee08a'

// ── props
const BOWL = [
  'C...........CC',
  'CC.........CC.',
  '.CDDDDDDDDDDC.',
  '.CCDDDDDDDDCC.',
  '..CCCDDDDCCC..',
  '...CCCCCCCC...',
  '.....CCCC.....',
]
const BOWL_C = { C: CLAY, D: '#b56a42' }
const BERRIES = ['.R.B.R.', 'RBRRBRB', 'BRRBRRB']
function coin(x, cx, cy, k, t, lt) {
  if (k <= 0.01) return
  const fl = lt < 1.2 ? Math.cos(t * 22) : 1, up = lt < 1.2 ? Math.sin(Math.PI * Math.min(1, lt / 1.2)) * 140 : 0
  x.save(); x.translate(cx, cy - up); x.scale(1.5 * k * Math.max(0.08, Math.abs(fl)), 1.5 * k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c99a2e'; x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♎︎', 0, 4)
  x.restore()
}
const SHOE = ['....SSS', '...SSSS', 'SSSSSSS', 'SSSSSSS', 'KKKKKKK']
function sketch(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = BONE; x.fillRect(-140, -120, 280, 240)
  x.strokeStyle = RED; x.lineWidth = 10; x.lineJoin = 'round'
  x.beginPath(); x.moveTo(0, 80); x.lineTo(-90, -10); x.quadraticCurveTo(-80, -80, -20, -50); x.lineTo(0, -30); x.quadraticCurveTo(50, -95, 95, -20); x.lineTo(30, 40); x.closePath(); x.stroke()
  x.restore()
}
const QMARK = ['.QQQQ.', 'QQ..QQ', '....QQ', '...QQ.', '..QQ..', '..QQ..', '......', '..QQ..']
const SPROUT = ['.LL.LL.', 'LLL.LLL', '..LSL..', '...S...', '...S...']
const POT = ['PPPPPPP', '.PPPPP.', '.PPPPP.', '..PPP..']

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'First bowl is wobbly? | *That’s a first try.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.14 * Math.sin(t * 5) })
      label(x, 790, 700, 'BOWL #1 (ish)', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: ROSE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Can’t pick a hobby? | *Flip a coin.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      coin(x, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), t, lt)
      label(x, 790, 1120, lt > 1.3 ? 'POTTERY IT IS' : 'POTTERY? SALSA?', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two left feet? | *Still dancing.*', mood: 'happy', look: [1, 1], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, { S: ROSE, K: INK }, 720, 1020 - Math.abs(Math.sin(t * 6)) * 30, 18 * k, { sx: -1 })
      drawBits(x, SHOE, { S: ROSE, K: INK }, 880, 1020 - Math.abs(Math.cos(t * 6)) * 30, 18 * k, { sx: -1 })
      label(x, 720, 1130, 'L', k, { size: 40, bg: BONE, font: MONO, weight: 700 })
      label(x, 880, 1130, 'L', k, { size: 40, bg: BONE, font: MONO, weight: 700 })
      label(x, 800, 720, 'GROOVE: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not pretty yet? | *Pretty comes later.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sketch(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'DRAFT 1 · LOVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked everyone’s opinion? | *Yours counts most.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'is it ok?? | vote pls', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 900, 'VOTES: 31', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 1060, 'YOUR VOTE: WINS', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 1060, P.t0 + 1.4, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Scared to look silly? | *Everyone starts silly.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) [['aries', 690, 1000], ['taurus', 880, 1000], ['gemini', 785, 800]].forEach(([id, px, py], i) => signChar(x, t, id, px, py, 140 * k, { mood: i === 2 ? 'wink' : 'happy', seed: 30 + i, glyph: false, hops: [P.t0 + 0.6 + i * 0.3] }))
      label(x, 790, 1150, 'BEGINNERS CLUB', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'First message to a match? | *“hi!” is plenty.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 640, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      const n = 1 + Math.min(46, Math.floor(prog(lt, 0.3, 1.3) * 46))
      if (lt < 1.4) label(x, 790, 860, `DRAFT ${n}…`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: BONE, font: MONO, weight: 700 })
      else bubble(x, 790, 860, 'hi!', pop01(t, P.t0 + 1.4, 0.25, 2.6), { size: 72, col: ROSE, tail: 'bl' })
      bubble(x, 790, 1080, 'hi!! :D', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: S, cap: 'A “dumb” question? | *Smart move.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, QMARK, { Q: ROSE }, 790, 820, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 * Math.sin(t * 3) })
      label(x, 790, 1090, 'QUESTIONS: WELCOME', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tiny progress? | *Still progress.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = ease.outBack ? ease.outCubic(prog(lt, 0.5, 1.4)) : prog(lt, 0.5, 1.4)
      drawBits(x, POT, { P: CLAY }, 790, 1040, 26 * k)
      drawBits(x, SPROUT, { L: GREEN, S: '#4fa85a' }, 790, 1040 - 26 * 2 - 60 * g, 20 * k * (0.3 + 0.7 * g))
      label(x, 790, 700, 'GROWING ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 6, 140, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0016', key: 'D', accent: ROSE, solo: 'libra', ending: 'callback',
  title: 'Libra, it’s okay | *to be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Beginner era. | *Beautiful era.*', mood: 'sparkle' },
  last: {
    text: 'That wobbly bowl? | *Best berry bowl.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 380, 1040, 250 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      const b = pop01(t, t - lt + 0.7, 0.35, 2)
      drawBits(x, BERRIES, { R: RED, B: '#6b62e8' }, 720, 985, 26 * b)
      drawBits(x, BOWL, BOWL_C, 720, 1100, 30 * b, { rot: 0.1 * Math.sin(t * 4) })
      sparkles(x, t, 720, 1060, t - lt + 1.2, 7, 160, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
