// r2a0707: star_advice, ADVICE SOLO (virgo), "How to surprise | *a Virgo.*" (signs3kit social cut, lofi · F).
// One sign the whole way: nine warm, very Virgo ways to make them feel loved, each a relatable truth + a kind reframe
// with one light gag. Ending: callback (card 1's surprise agenda comes back, checked off).
//   step one: tell them first (agenda attached) · clean the kitchen · remember the tiny detail · their exact snack
//   order · hide the to-do list so they rest · thank them for the little things, specifically · fold the towels their
//   way · arrive five minutes early · "you're enough", no edits needed
//   last "Best surprise? | *The scheduled one.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'virgo', ST = { x: -190 }
const TOWEL = [PINK, MINT, SKYB, LAV, GOLD]
/** a neat stack of folded towels, each landing in turn */
function towels(x, t, cx, cy, lt) {
  const n = Math.min(5, Math.floor(clamp((lt - 0.3) / 1.3) * 6))
  for (let i = 0; i < n; i++) {
    const y = cy - i * 44
    x.fillStyle = INK; x.fillRect(cx - 118, y - 24, 236, 48)
    x.fillStyle = TOWEL[i]; x.fillRect(cx - 112, y - 18, 224, 36)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx - 112, y - 18, 224, 8)
  }
}
const agenda = (x, cx, cy, k, done) => sheet(x, cx, cy, k, { w: 320, h: 340, rot: -0.04, head: 'SURPRISE PARTY', headBg: ACC, headInk: INK, align: 'left', size: 28,
  lines: done ? [['✓ sat, 7:00', '#2f8f57'], ['✓ cake: vanilla', '#2f8f57'], ['✓ guests: 6', '#2f8f57'], ['✓ act surprised', '#2f8f57']] : ['• sat, 7:00', '• cake: vanilla', '• guests: 6', '• act surprised'] })

const CAMEOS = [
  { sign: S, cap: 'Step one? | *Tell them first.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      agenda(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), false)
      L(x, 800, 1110, 'AGENDA ATTACHED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Clean the kitchen. | *Watch them glow.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'SPRAY', 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 + Math.sin(t * 6) * 0.05 })
      sparkles(x, t, 800, 900, P.t0 + 0.9, 8, 200, 0.2)
      L(x, 800, 690, 'SPOTLESS. FOR THEM.', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.05, 30)
    } },
  { sign: S, cap: 'Remember the tiny detail? | *That’s the gift.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'you REMEMBERED?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 800, 920, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Their exact snack order? | *Pure romance.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'NO SUBSTITUTIONS', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, 0.05, 32)
      L(x, 800, 1110, 'NAILED IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Hide the to-do list. | *Let them rest.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const hide = clamp((lt - 0.7) / 0.6)
      sheet(x, lerp(800, 1000, ease.inCubic(hide)), lerp(860, 1000, ease.inCubic(hide)), pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - hide * 0.9), { w: 260, h: 280, head: 'TO DO', headBg: RED, lines: ['everything', 'also this', 'and that'], size: 28 })
      bits(x, 'BLANKET', 640, 1060, 14 * pop01(t, P.t0 + 1.1, 0.3, 2))
      L(x, 800, 680, 'TODAY: NOTHING', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Thank them for the little things. | *Specifically.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, rot: 0.04, head: 'THANK YOU FOR', headBg: PINK, headInk: INK, lines: ['fixing the shelf', 'labelling the jars', 'remembering my mom'], size: 26, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1100, 'NOTED. TREASURED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Fold the towels | *their way.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      towels(x, t, 800, 1060, lt)
      L(x, 800, 700, 'CORNERS: CRISP', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.05, 34)
      sparkles(x, t, 800, 960, P.t0 + 1.7, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Arrive five minutes early. | *Swoon.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, '6:55 FOR 7:00', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 34)
      hearts(x, t, 620, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Tell them “you’re enough.” | *No edits needed.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, rot: -0.03, head: 'YOU', headBg: ACC, headInk: INK, lines: ['as you are:', 'already great'], size: 32 })
      L(x, 800, 1080, 'APPROVED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.08, 44)
      sparkles(x, t, 800, 1080, P.t0 + 1.25, 7, 150, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0707', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'How to surprise | *a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Small care. | *Big love.*', mood: 'heart' },
  last: {
    text: 'Best surprise? | *The scheduled one.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 320, 1180, 300 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.7] })
      agenda(x, 720, 1180, 1.3 * pop01(t, t - lt + 0.7, 0.4, 2), lt > 1.5)
      if (lt > 1.6) hearts(x, t, 320, 1100, t - lt + 1.6, { n: 6, life: 1.6, spread: 200, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
