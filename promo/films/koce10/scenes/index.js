// koce10 · ONE CARD, TWO PEOPLE ep 10 · "What are you working toward?" (21.4 s vertical, star_advice post, synthwave · Cm). Hard cut.
//   0.0   frame 0: Capricorn mid-climb on a stack of planners, Aries mid-sprint on the spot, the card spinning, Pisces
//         sobbing. Hook: "Ask them this. Watch them *light up.*"  Record scratch + freeze at 0.45.
//   1.9   the card: "What are you working toward right now?" (real card fu3, The Star) · 4.9 both answer
//   7.5   the flip: CAPRICORN "my own bakery." ARIES "my first marathon." Both light up.
//   8.2   Capricorn: "a marathon? i'll be at mile 20 with a sign."  (the sign: GO ARIES!) Pisces sobs at the sign.
//   10.8  Aries: "and i'll be your first customer."
//   13.4  THE STARS: asking about a goal says: i see where you're going.
//   17.0  OPENING DAY: Aries first in line with a croissant: "one croissant. first customer."
//   20.2  last line "Front row for each *other's* dream." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles, sticker } from '../../koce01/scenes/cardkit.js'

const PL = ['#7a3a9a', '#2fc79a', '#f39a3a', '#5a78b4', '#e8344e']
function planners(x, X, Y, n, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = k; for (let i = 0; i < n; i++) { const w = 190 - (i % 2) * 16; R(x, INK, X - w / 2 - 5, Y - i * 44 - 44, w + 10, 44); R(x, PL[i % 5], X - w / 2, Y - i * 44 - 40, w, 36); R(x, '#fbf3e2', X + w / 2 - 22, Y - i * 44 - 36, 12, 28) } x.restore() }
function sign(x, X, Y, k, t) { if (k <= 0.01) return; x.save(); x.translate(X, Y + Math.sin(t * 8) * 6); x.rotate(-0.08 + Math.sin(t * 4) * 0.05); x.scale(k, k); R(x, INK, -8, 40, 16, 160); R(x, '#a87048', -4, 44, 8, 152); R(x, INK, -150, -70, 300, 120); R(x, '#fff3a8', -144, -64, 288, 108); x.font = `900 46px Inter, sans-serif`; x.fillStyle = '#e8344e'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GO ARIES!', 0, -28); x.font = `700 22px 'Space Mono', monospace`; x.fillStyle = INK; x.fillText('MILE 20 · YOU GOT THIS', 0, 18); x.restore() }
function croissant(x, X, Y, k) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); bits(x, ['..XXXXX..', '.XXYXYXX.', 'XXYXYXYXX', 'XY.....YX'], { X: '#e8a64a', Y: '#b8702a' }, 0, 0, 12); x.restore() }
const SIGN = [8.9, 12.6], OPEN = [16.9, 21.4]
const F = makeFilm({
  id: 'koce10', dur: 21.4, ending: 'cut', brk: 'scratch', recAt: 0.45, recLen: 1.1, freezeText: 'two *goal* people. one table.',
  A: 'capricorn', B: 'aries',
  hook: { text: 'Ask them this. Watch them *light up.*', out: 1.75 },
  cards: [{ q: 'What are you *working toward* right now?', topic: 'future', kind: 'ask', at: 1.9, big: 4.6, write: 4.9, reveal: 7.5, done: 16.6, ans: { A: 'my own *bakery.*', B: 'my first *marathon.*' } }],
  lines: [
    { t: 8.2, who: 'A', text: 'a marathon? i’ll be at mile 20 with a *sign.*' },
    { t: 10.8, who: 'B', text: 'and i’ll be your first *customer.*' },
    { t: 13.4, who: 'S', text: 'asking about a goal says: i see *where you’re going.*' },
    { t: 17.4, who: 'B', text: 'one croissant. *first customer.*' },
  ],
  boxes: [{ from: 0, to: 3, open: 8.0, close: 16.7 }, { from: 3, to: 4, open: 17.2, close: 19.9 }],
  stickers: [{ at: 16.9, out: 20.0, text: '✿ OPENING DAY', x: 540, y: 300, rot: -0.05, col: '#f39a3a', size: 44 }],
  last: { at: 20.2, text: 'Front row for each *other’s* dream.', size: 88 },
  mood: {
    A: [[0, 'wide', [0, -1], -0.1], [1.9, 'wide', [0.4, -1]], [4.9, 'squint', [0.4, 1]], [7.5, 'sparkle', [1, -0.6]], [8.2, 'happy', [1, 0]], [10.8, 'sparkle', [1, 0]], [13.4, 'happy', [0, -1]], [16.9, 'happy', [1, 0]], [18.4, 'heart', [1, 0]]],
    B: [[0, 'squint', [-1, 0], 0.05], [1.9, 'wide', [-0.4, -1]], [4.9, 'squint', [-0.4, 1]], [7.5, 'sparkle', [-1, -0.6]], [8.2, 'wide', [-1, 0]], [9.4, 'heart', [-1, 0]], [10.8, 'happy', [-1, 0]], [13.4, 'happy', [0, -1]], [16.9, 'sparkle', [-1, 0]], [18.4, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.9, 'sparkle', [0, -1]], [4.9, 'neutral', [0, 1]], [7.5, 'sparkle', [0, -1]], [9.0, 'wide', [-1, -1]], [9.6, 'sparkle', [-1, -1]]],
  },
  cry: [[0, 1.9, 2], [9.2, 12.8, 3], [12.8, 16.9, 1], [18.0, 21.4, 2]],
  offset: { A: t => [0, -120 * (1 - ease.inOutCubic(prog(t, 1.6, 2.2)))], B: t => [t < 1.9 ? Math.sin(t * 40) * 10 : 0, t < 1.9 ? -Math.abs(Math.sin(t * 20)) * 30 : 0] },
  cam: [[0, 1, 540, 960], [7.3, 1, 540, 960], [8.0, 1.1, 540, 985], [16.5, 1.1, 540, 985], [17.1, 1.12, 640, 1040]],
  punch: [{ at: 7.55, dur: 1.0, z: 0.1, x: 540, y: 820 }],
  draw: {
    cast(x, t, S) { planners(x, 250, 1300, 5, 1 - ease.inOutCubic(prog(t, 1.6, 2.2))) },
    front(x, t, S) {
      sign(x, 235, 1000, 0.85 * ease.outBack(prog(t, SIGN[0], SIGN[0] + 0.4)) * (1 - ease.inCubic(prog(t, SIGN[1], SIGN[1] + 0.3))), t)
      if (t > SIGN[0] + 0.2 && t < SIGN[0] + 1) sparkles(x, t, 235, 1000, SIGN[0] + 0.2, { n: 10, Rr: 200 })
      croissant(x, S.r.B.x - 140, S.r.B.y + 40, ease.outBack(prog(t, OPEN[0] + 0.3, OPEN[0] + 0.7)))
      if (t > 18.4) hearts(x, t, 18.45, 540, 1050, { n: 6, spread: 260 })
    },
  },
  extraCues: [['pop', SIGN[0], 783.99, 0.05, -0.3], ['glitter', SIGN[0], SIGN[0] + 0.8], ['bell', OPEN[0], 1567.98, 0.04, 1.2, 0], ['pop', OPEN[0] + 0.35, 1046.5, 0.05, 0.3]],
})
export const { DURATION, SCENES, CUES } = F
