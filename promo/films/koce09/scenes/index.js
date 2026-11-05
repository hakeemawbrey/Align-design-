// koce09 · ONE CARD, TWO PEOPLE ep 9 · "A hill you will die on" (17.6 s vertical, star_advice post, pop · E). Hard cut.
//   0.0   frame 0: Gemini mid-stand on the chair, Scorpio mid-glare over steepled hands, the card spinning, Pisces
//         sobbing. Hook: "A hill they'll die on. *GO.*"  Whip zoom at 0.55.
//   1.1   the card: "What's a hill you will die on?" (real card fn1, The Fool) · 4.0 both answer
//   6.6   the flip: GEMINI "cold pizza is breakfast." SCORPIO "you never read the last page first."
//   7.3   Gemini: "i always read the last page first."  Scorpio: "cold pizza i can forgive. that?"
//   10.9  a referee whistle: DEBATE · ROUND 1. Both crack up; Pisces cry-laughs.
//   12.0  THE STARS: silly cards lower the stakes, so the deep ones feel safe.
//   16.3  last line "Silly card first. Then the *real* one." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles } from '../../koce01/scenes/cardkit.js'

function chair(x, X, Y) { R(x, INK, X - 70, Y - 6, 140, 26); R(x, '#a87048', X - 64, Y, 128, 14); R(x, INK, X - 64, Y + 20, 14, 140); R(x, INK, X + 50, Y + 20, 14, 140); }
function whistle(x, X, Y, k) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); x.rotate(-0.3); R(x, INK, -50, -26, 100, 52); R(x, '#c9ced8', -44, -20, 88, 40); R(x, INK, 44, -14, 40, 28); R(x, '#c9ced8', 48, -10, 32, 20); x.fillStyle = INK; x.beginPath(); x.arc(-10, 0, 10, 0, Math.PI * 2); x.fill(); x.restore() }
const UP = t => 1 - ease.inOutCubic(prog(t, 0.9, 1.5))
const F = makeFilm({
  id: 'koce09', dur: 17.6, ending: 'cut', brk: 'whip',
  A: 'gemini', B: 'scorpio',
  hook: { text: 'A hill they’ll die on. *GO.*', out: 1.25, size: 112 },
  cards: [{ q: 'What’s a *hill* you will *die on?*', topic: 'fun', kind: 'ask', at: 1.1, big: 3.7, write: 4.0, reveal: 6.6, done: 11.6, ans: { A: 'cold pizza *is breakfast.*', B: 'you *never* read the last page first.' } }],
  lines: [
    { t: 7.3, who: 'A', text: 'i *always* read the last page first.' },
    { t: 9.3, who: 'B', text: 'cold pizza i can forgive. *that?*' },
    { t: 12.0, who: 'S', text: 'silly cards lower the stakes, so the deep ones feel *safe.*' },
  ],
  boxes: [{ from: 0, to: 3, open: 7.1, close: 16.0 }],
  stickers: [{ at: 10.9, out: 12.6, text: 'DEBATE · ROUND 1', x: 540, y: 980, rot: -0.06, col: '#ff7a6a', size: 46 }],
  last: { at: 16.3, text: 'Silly card first. | Then the *real* one.', size: 92 },
  mood: {
    A: [[0, 'wide', [1, -1], -0.12], [1.1, 'wide', [0.4, -1]], [4.0, 'squint', [0.4, 1]], [6.6, 'happy', [1, -0.6]], [7.3, 'wink', [1, 0]], [9.3, 'wide', [1, 0]], [11.0, 'happy', [1, 0], 0.1], [12.0, 'happy', [0, -1]], [14.4, 'sparkle', [1, 0]]],
    B: [[0, 'squint', [-1, -0.4]], [1.1, 'wide', [-0.4, -1]], [4.0, 'squint', [-0.4, 1]], [6.6, 'squint', [-1, -0.6]], [7.3, 'wide', [-1, 0]], [9.3, 'squint', [-1, 0]], [11.0, 'happy', [-1, 0], 0.1], [12.0, 'happy', [0, -1]], [14.4, 'wink', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.0, 'neutral', [0, 1]], [6.6, 'wide', [0, -1]], [9.3, 'wide', [1, 0]], [11.0, 'happy', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [7.0, 9.3, 1], [11.0, 17.6, 3]],
  hops: { A: [11.05, 11.4, 11.75, 12.1], B: [11.15, 11.5, 11.85] },
  offset: { A: t => [0, -110 * UP(t)] },
  cam: [[0, 1, 540, 960], [6.4, 1, 540, 960], [7.1, 1.1, 540, 985], [15.6, 1.1, 540, 985], [16.2, 1.06, 540, 1020]],
  punch: [{ at: 6.65, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 10.95, dur: 0.9, z: 0.06, x: 540, y: 1000 }],
  draw: {
    cast(x, t, S) { const k = UP(t); if (k > 0.01) { x.save(); x.globalAlpha = k; chair(x, 250, 1200 + 90 * (1 - k)); x.restore() } },
    front(x, t) {
      whistle(x, 860, 900, ease.outBack(prog(t, 10.8, 11.1)) * (1 - prog(t, 12.2, 12.5)))
      if (t > 11.0 && t < 12.5) sparkles(x, t, 540, 1000, 11.0, { n: 10, Rr: 200 })
    },
  },
  extraCues: [['pop', 10.85, 2637, 0.06, 0.3], ['pop', 10.95, 2793.83, 0.05, 0.3], ['pop', 11.05, 2637, 0.05, 0.3], ['glitter', 11.0, 11.8]],
})
export const { DURATION, SCENES, CUES } = F
