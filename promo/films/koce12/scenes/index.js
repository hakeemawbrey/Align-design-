// koce12 · ONE CARD, TWO PEOPLE ep 12 · "Beach or cabin?" (15 s vertical, star_advice post, house · F). Loops.
//   0.0   frame 0: two daydream bubbles: Libra mid-dive into a beach, Aquarius mid-swing chopping firewood at a cabin;
//         the card spinning, Pisces sobbing. Hook: "Beach or cabin? This could *end things.*"  Whip zoom at 0.55.
//   1.1   the card: "Beach trip or mountain cabin?" (real card fn3, The Fool, a pick card) · 3.7 both answer
//   6.0   the flip: LIBRA "Beach. sun, please." AQUARIUS "Cabin. snow, please."
//   6.6   Pisces: "this could end things."  THE STARS: "it's not about matching. it's planning it together."
//   10.4  the sketch: OUR TRIP v1 — a cabin by a lake, with a little beach.
//   12.2  last line "Different picks. Same *trip.*" → loops back to frame 0.
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, hearts, sparkles } from '../../koce01/scenes/cardkit.js'

const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
function panel(x, X, Y, w, h, k, draw, tail) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(k, k)
  if (tail) for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.beginPath(); x.arc(tail * (30 + i * 26), h / 2 + 24 + i * 34, 16 - i * 4, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(tail * (30 + i * 26), h / 2 + 24 + i * 34, 11 - i * 4, 0, Math.PI * 2); x.fill() }
  rr(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 34); x.fillStyle = INK; x.fill()
  x.save(); rr(x, -w / 2, -h / 2, w, h, 28); x.clip(); draw(x, w, h); x.restore()
  x.restore()
}
function beach(x, w, h, t) {
  R(x, '#8fd8ff', -w / 2, -h / 2, w, h); R(x, '#3a8ac0', -w / 2, 0, w, h / 2); for (let i = 0; i < 5; i++) R(x, '#bfeaff', -w / 2 + ((i * 80 + t * 60) % w), 10 + (i % 2) * 20, 50, 6)
  R(x, '#f2d79a', -w / 2, h * 0.28, w, h); x.fillStyle = '#ffc861'; x.beginPath(); x.arc(w * 0.28, -h * 0.25, 30, 0, Math.PI * 2); x.fill()
  R(x, '#a87048', -w * 0.32, -h * 0.1, 10, h * 0.4); R(x, '#2fc79a', -w * 0.42, -h * 0.18, 90, 16)
}
function cabin(x, w, h, t) {
  R(x, '#2a3a6a', -w / 2, -h / 2, w, h); R(x, '#efe6d6', -w / 2, h * 0.2, w, h)
  for (let i = 0; i < 9; i++) { const p = (t * 0.5 + i / 9) % 1; R(x, '#ffffff', -w / 2 + ((i * 53) % w), -h / 2 + p * h, 6, 6) }
  R(x, INK, -60, -20, 120, 80); R(x, '#8a5a3a', -54, -14, 108, 70); R(x, '#ffd98a', -20, 6, 26, 24)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-76, -16); x.lineTo(0, -80); x.lineTo(76, -16); x.fill(); x.fillStyle = '#e86a5a'; x.beginPath(); x.moveTo(-64, -20); x.lineTo(0, -72); x.lineTo(64, -20); x.fill()
  x.fillStyle = '#2fc79a'; for (const tx of [-w * 0.36, w * 0.34]) { x.beginPath(); x.moveTo(tx - 34, 50); x.lineTo(tx, -50); x.lineTo(tx + 34, 50); x.fill() }
}
function both(x, w, h, t) { // a cabin by a lake with a little beach
  R(x, '#ffb08a', -w / 2, -h / 2, w, h); R(x, '#3a8ac0', -w / 2, h * 0.05, w, h); R(x, '#f2d79a', -w / 2, h * 0.3, w * 0.55, h)
  for (let i = 0; i < 4; i++) R(x, '#bfeaff', -w / 2 + ((i * 110 + t * 50) % w), h * 0.15, 60, 6)
  x.save(); x.translate(w * 0.22, -h * 0.06); cabin2(x); x.restore()
  x.fillStyle = '#2fc79a'; for (const tx of [w * 0.4, -w * 0.05]) { x.beginPath(); x.moveTo(tx - 30, h * 0.06); x.lineTo(tx, -h * 0.28); x.lineTo(tx + 30, h * 0.06); x.fill() }
  x.fillStyle = '#ffc861'; x.beginPath(); x.arc(-w * 0.3, -h * 0.25, 34, 0, Math.PI * 2); x.fill()
  x.font = `700 26px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('OUR TRIP v1 ✓✓', -w / 2 + 24, -h / 2 + 40)
}
function cabin2(x) { R(x, INK, -50, -16, 100, 66); R(x, '#8a5a3a', -44, -10, 88, 56); R(x, '#ffd98a', -14, 6, 22, 20); x.fillStyle = INK; x.beginPath(); x.moveTo(-64, -12); x.lineTo(0, -66); x.lineTo(64, -12); x.fill(); x.fillStyle = '#e86a5a'; x.beginPath(); x.moveTo(-54, -16); x.lineTo(0, -58); x.lineTo(54, -16); x.fill() }
const DAY = t => 1 - ease.inCubic(prog(t, 0.55, 0.9))
const SK = [10.4, 15]
const F = makeFilm({
  id: 'koce12', dur: 15, ending: 'loop', brk: 'whip',
  A: 'libra', B: 'aquarius',
  hook: { text: 'Beach or cabin? This could *end things.*', out: 1.25 },
  cards: [{ q: '*Beach trip* or *mountain cabin?*', topic: 'fun', kind: 'pick', opts: ['Beach', 'Cabin'], at: 1.1, big: 3.4, write: 3.7, reveal: 6.0, done: 10.1, ans: { A: 'Beach. *sun, please.*', B: 'Cabin. *snow, please.*' } }],
  lines: [
    { t: 6.6, who: 'P', text: 'this could *end* things.' },
    { t: 8.3, who: 'S', text: 'it’s not about matching. it’s planning it *together.*' },
  ],
  boxes: [{ from: 0, to: 2, open: 6.4, close: 11.9 }],
  last: { at: 12.2, text: 'Different picks. Same *trip.*' },
  mood: {
    A: [[0, 'sparkle', [-1, -1], -0.12], [1.1, 'wide', [0.4, -1]], [3.7, 'squint', [0.4, 1]], [6.0, 'happy', [1, -0.6]], [6.6, 'wide', [1, 0]], [8.3, 'neutral', [0, -1]], [10.4, 'sparkle', [0.6, -1]], [11.2, 'heart', [1, 0]]],
    B: [[0, 'squint', [1, -1], 0.08], [1.1, 'wide', [-0.4, -1]], [3.7, 'squint', [-0.4, 1]], [6.0, 'happy', [-1, -0.6]], [6.6, 'wide', [-1, 0]], [8.3, 'neutral', [0, -1]], [10.4, 'sparkle', [-0.6, -1]], [11.2, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [3.7, 'neutral', [0, 1]], [6.0, 'wide', [0, -1]], [8.3, 'neutral', [0, -1]], [10.4, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [6.2, 8.3, 3], [10.6, 15, 2]],
  cam: [[0, 1, 540, 960], [5.8, 1, 540, 960], [6.5, 1.1, 540, 985], [10.0, 1.1, 540, 985], [10.5, 1.04, 540, 980], [14.4, 1.04, 540, 980], [15, 1, 540, 960]],
  punch: [{ at: 6.05, dur: 1.0, z: 0.1, x: 540, y: 820 }],
  draw: {
    front(x, t, S) {
      const d = DAY(t)
      panel(x, 250, 730, 380, 300, d, (c, w, h) => beach(c, w, h, t), 1)
      panel(x, 830, 730, 380, 300, d, (c, w, h) => cabin(c, w, h, t), -1)
      const k = ease.outBack(prog(t, SK[0], SK[0] + 0.45))
      panel(x, 540, 760, 760, 420, k, (c, w, h) => both(c, w, h, t), 0)
      if (t > SK[0] + 0.3 && t < SK[0] + 1.1) sparkles(x, t, 540, 760, SK[0] + 0.3, { n: 12, Rr: 320 })
      if (t > 11.2) hearts(x, t, 11.25, 540, 1060, { n: 6, spread: 260 })
    },
  },
  extraCues: [['whoosh', SK[0], 0.4, 0.04], ['pop', SK[0] + 0.2, 1046.5, 0.05, 0], ['glitter', SK[0] + 0.3, SK[0] + 1.1]],
})
export const { DURATION, SCENES, CUES } = F
