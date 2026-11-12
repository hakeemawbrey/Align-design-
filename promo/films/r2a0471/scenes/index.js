// r2a0471: star_advice, ADVICE SOLO (virgo), "How to encourage | *a Virgo.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine kind ways to encourage a Virgo, each a relatable truth + a warm reframe with one light gag.
// Ending: callback (draft one comes back, framed on the fridge).
//   redid it four times, draft one was great · praise the effort · one typo, still brilliant · help without fixing (tea)
//   · notice the little things (labels) · rest goes on the list · even the chart says go easy · a mistake, still our
//   favourite · say it plainly: you're doing enough.
//   group "Not perfect. | *Perfectly loved.*"   last "And draft one? | *Framed. On the fridge.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, meter, bits, frame, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const ACC = '#8fe39a', S = 'virgo', ST = { x: -190 }
const JAR = ['.KKKKK.', 'KWWWWWK', '.KKKKK.', 'GGGGGGG', 'GLLLLLG', 'GLLLLLG', 'GGGGGGG', 'GGGGGGG']
const JAR_C = { K: WOOD, W: PAPER, G: '#9fd8ff', L: PAPER }
const SPILL = ['....BBB.....', '..BBBBBBB...', '.BBBBBBBBBB.', 'BBBBBBBBBBBB', '.BBBBBBBBB..', '...BBBBB....']

const CAMEOS = [
  { sign: S, cap: 'Redid it four times? | *Draft one was great.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const d = 1 + Math.min(3, Math.floor(clamp(lt / 1.1) * 3.99))
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), `essay | (better?) | draft ${d}`, { head: `DRAFT ${d}`, headBg: ACC, size: 36, w: 300, rot: 0.04 })
      label(x, 800, 1120, 'DRAFT 1 WAS GREAT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Praise the trying, | *not just the result.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'trophy', 800, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1110, 'BEST EFFORT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.1, 8, 190, 0.3)
    } },
  { sign: S, cap: 'Found one typo? | *Still brilliant.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 800, 860, k, 'the plan | is perfect | in every | wya', { head: 'PAGE 12', headBg: SKYB, size: 34, w: 300, rot: -0.03 })
      const c = ease.outCubic(prog(lt, 0.6, 1.0))
      if (c > 0 && k > 0.5) { x.save(); x.translate(800, 860); x.rotate(-0.03); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(0, 118, 70, 34, 0, 0, Math.PI * 2 * c); x.stroke(); x.restore() }
      bubble(x, 800, 600, 'you’re still | a genius.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Don’t fix it for them. | *Just bring tea.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const m = ease.outCubic(prog(lt, 0.3, 0.9))
      bits(x, 'mug', 900 - m * 120, 940, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph) * clamp(m); x.fillStyle = BONE; x.fillRect(770 + i * 22 + Math.sin(ph * 6 + i) * 8, 860 - ph * 120, 10, 22); x.restore() }
      label(x, 800, 690, 'JUST TEA.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Notice the little things | *they always do.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, JAR, JAR_C, 720, 950, 16 * k); drawBits(x, JAR, JAR_C, 880, 950, 16 * k)
      label(x, 720, 960, 'RICE', k, { size: 24, bg: PAPER, rot: 0, font: MONO, weight: 700 })
      label(x, 880, 960, 'MORE RICE', k, { size: 20, bg: PAPER, rot: 0, font: MONO, weight: 700 })
      bubble(x, 800, 700, 'love the | labels.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 5, life: 1.6, spread: 150, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Rest is productive. | *Put it on the list.*', mood: lt => lt > 1.5 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 800, 880, k, '☑ laundry | ☑ emails | ☑ taxes | ' + (lt > 1.2 ? '☑ NAP' : '☐ nap'), { head: 'TO DO', headBg: ACC, size: 36, w: 300, rot: 0.03 })
      sparkles(x, t, 800, 990, P.t0 + 1.25 * 1.29, 7, 140, 0.5)
    } },
  { sign: S, cap: 'Even their chart says: | *go easy on you.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'focus: high | standards: high | rest: NEEDED', { head: '♍︎ TODAY', headBg: LAV, size: 30, w: 340, rot: -0.04, strike: lt > 1.1 ? [] : [] })
      label(x, 800, 1100, 'GENTLE DAY ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Spilled the tea? | *Still our favourite.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, SPILL, { B: '#c98f5a' }, 800, 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'mug', 900, 980, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 1.4 })
      bubble(x, 800, 720, 'love you | anyway.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 8 })
    } },
  { sign: S, cap: 'Say it out loud: | *you’re doing enough.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3, 1.9],
    front(x, t, lt, P) {
      meter(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 0.25 + 0.75 * ease.inOutCubic(prog(lt, 0.4, 1.3)), { w: 300, col: ACC, title: 'ENOUGH' })
      label(x, 800, 1070, 'ALWAYS WAS.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0471', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'How to encourage | *a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Perfectly loved.*', mood: 'heart' },
  last: {
    text: 'And draft one? | *On the fridge.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 360, 1110, 240 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      const f = pop01(t, t - lt + 0.7, 0.35, 2)
      if (f > 0.01) {
        x.save(); x.translate(730, 1100); x.scale(f, f)
        x.fillStyle = INK; x.fillRect(-150, -240, 300, 480); x.fillStyle = '#dfe8f0'; x.fillRect(-142, -232, 284, 464); x.fillStyle = '#b8c6d4'; x.fillRect(-142, -40, 284, 8); x.fillRect(110, -200, 14, 120)
        x.restore()
        note(x, 730, 980, f, 'essay | (great) | draft 1', { head: 'DRAFT 1', headBg: ACC, size: 30, w: 230, rot: -0.06 })
        drawBits(x, ['RR', 'RR'], { R: RED }, 730, 860, 9 * f)
      }
      label(x, 730, 1270, 'FRAMED ♥︎', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 360, 960, t - lt + 1.6, { n: 5, life: 2.0, spread: 200, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
