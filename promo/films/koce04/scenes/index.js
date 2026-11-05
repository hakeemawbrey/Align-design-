// koce04 · ONE CARD, TWO PEOPLE ep 4 · "Who says sorry first?" (18.6 s vertical, star_advice post, pop · D). Hard cut.
//   0.0   frame 0: Libra and Scorpio mid-point at each other, the card spinning, Pisces sobbing. Hook: "Who apologizes
//         first? They *both pointed—*"  Record scratch + freeze at 0.45 ("you're probably wondering…").
//   1.9   the card: "Who's more likely to apologize first?" (real card co2, The Tower, a who card)
//   4.8   both answer · 7.2 the flip: LIBRA "you." SCORPIO "you." · CAUGHT circle: both pointed at each other.
//   9.0   Scorpio: "…okay. honestly? me. i just wait for you to go."  Libra: "same. i say sorry first… in my head."
//   13.9  THE STARS: going first isn't losing. it's choosing the two of you over the score.
//   17.4  last line "First sorry *wins.*" (held ~0.8 s, hard cut).
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, hand, hearts } from '../../koce01/scenes/cardkit.js'
import { caught, caughtCues } from '../../hookkit.js'

const CAUGHT = { at: 7.55, x: 540, y: 700, r: 470, ry: 200, out: [8.9, 9.1], label: null, arrow: null, rec: false }
const POINT = t => (t < 1.9 ? 1 - ease.inCubic(prog(t, 1.6, 1.9)) : 0) + (t > 7.25 && t < 9.2 ? ease.outBack(prog(t, 7.25, 7.5)) * (1 - prog(t, 8.9, 9.2)) : 0)
const F = makeFilm({
  id: 'koce04', dur: 18.6, ending: 'cut', brk: 'scratch', recAt: 0.45, recLen: 1.1, freezeText: 'they *both* pointed.',
  A: 'libra', B: 'scorpio',
  hook: { text: 'Who apologizes first? They *both pointed—*', out: 1.75 },
  cards: [{ q: 'Who’s more likely to *apologize first?*', topic: 'conflict', kind: 'who', at: 1.9, big: 4.5, write: 4.8, reveal: 7.2, done: 13.6, ans: { A: '*you.*', B: '*you.*' } }],
  lines: [
    { t: 9.0, who: 'B', text: '…okay. honestly? *me.* i just wait for you to go.' },
    { t: 11.6, who: 'A', text: 'same. i say sorry first… *in my head.*' },
    { t: 14.0, who: 'S', text: 'going first isn’t losing. it’s choosing *the two of you* over the score.' },
  ],
  boxes: [{ from: 0, to: 3, open: 8.8, close: 17.1 }],
  stickers: [{ at: 7.85, out: 9.1, text: 'BOTH SAID “YOU.”', x: 540, y: 960, rot: -0.05, col: '#ff3b3b', ink: '#1b1236', size: 48 }],
  last: { at: 17.4, text: 'First sorry *wins.*', size: 120, accentSize: 150 },
  mood: {
    A: [[0, 'wide', [1, 0], -0.1], [1.9, 'wide', [0.4, -1]], [4.8, 'squint', [0.4, 1]], [7.2, 'squint', [1, 0]], [9.0, 'wide', [1, 0]], [11.6, 'neutral', [1, 0.5]], [12.8, 'happy', [1, 0]], [14.0, 'happy', [0, -1]], [16.0, 'heart', [1, 0]]],
    B: [[0, 'squint', [-1, 0], -0.1], [1.9, 'wide', [-0.4, -1]], [4.8, 'squint', [-0.4, 1]], [7.2, 'squint', [-1, 0]], [9.0, 'neutral', [-1, 0.5]], [11.6, 'wide', [-1, 0]], [12.8, 'happy', [-1, 0]], [14.0, 'happy', [0, -1]], [16.0, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.9, 'sparkle', [0, -1]], [4.8, 'neutral', [0, 1]], [7.2, 'wide', [0, -1]], [9.0, 'neutral', [1, 0]], [11.6, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.9, 2], [7.4, 9.0, 1], [12.4, 18.6, 3]],
  offset: { A: t => [20 * POINT(t) + 70 * ease.inOutCubic(prog(t, 15.8, 16.3)), 0], B: t => [-20 * POINT(t) - 70 * ease.inOutCubic(prog(t, 15.8, 16.3)), 0] },
  cam: [[0, 1, 540, 960], [8.7, 1, 540, 960], [9.4, 1.1, 540, 985], [15.6, 1.1, 540, 985], [16.2, 1.18, 540, 1080]],
  punch: [{ at: 7.25, dur: 1.2, z: 0.1, x: 540, y: 820 }],
  draw: {
    front(x, t, S) {
      const k = POINT(t); if (k > 0.02) {
        const a = S.r.A, b = S.r.B
        hand(x, a.x + 175, a.y - 10 + Math.sin(t * 14) * 4, 1, 10, '#ffe3c8', { alpha: clamp(k) })
        hand(x, b.x - 175, b.y - 10 + Math.sin(t * 14 + 1) * 4, -1, 10, '#ffd2a8', { alpha: clamp(k) })
      }
      if (t > 16.1) hearts(x, t, 16.15, 540, 1050, { n: 7, spread: 240 })
    },
  },
  extraScenes: [caught(CAUGHT)],
  extraCues: [...caughtCues(CAUGHT), ['whoosh', 15.8, 0.4, 0.04], ['pop', 16.2, 880, 0.05, 0]],
})
export const { DURATION, SCENES, CUES } = F
