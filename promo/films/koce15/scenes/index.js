// koce15 · ONE CARD, TWO PEOPLE ep 15 · "Never say this in a fight" (19 s vertical, star_advice post, funk · Dm). Loops.
//   0.0   frame 0: Virgo and Gemini both mid-slam of their answers onto the table, the card spinning, Pisces sobbing.
//         Hook: "Both wrote the *SAME thing?!*"  Whip zoom at 0.55.
//   1.1   the card: "What's one thing a partner should never say in an argument?" (real card co4, The Tower)
//   4.5   both answer · 7.1 the flip: both wrote "calm down." · CAUGHT circle + JINX.
//   8.4   Virgo: "jinx. you owe me a snack."
//   10.4  THE STARS: agree on the never-list while you're calm, so it's there when you're not.
//   14.4  the list goes up: OUR NEVER-LIST (1. "calm down" 2. "whatever" 3. "you always…")
//   16.0  last line "Write the rules *before* the fight." → loops back to frame 0.
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, hand, hearts, sparkles } from '../../koce01/scenes/cardkit.js'
import { caught, caughtCues } from '../../hookkit.js'

const CAUGHT = { at: 7.45, x: 540, y: 700, r: 470, ry: 200, out: [8.5, 8.7], label: null, arrow: null, rec: false }
function list(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 760); x.rotate(-0.03); x.scale(k, k)
  R(x, INK, -260, -200, 520, 400); R(x, '#fff7dc', -252, -192, 504, 384); R(x, '#ff7a6a', -20, -216, 40, 40)
  x.font = `800 40px Inter, sans-serif`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('OUR NEVER-LIST', -220, -140)
  const L = ['1. “calm down”', '2. “whatever”', '3. “you always…”']
  x.font = `700 36px 'Space Mono', monospace`
  L.forEach((s, i) => { const kk = prog(t, 14.8 + i * 0.35, 15.0 + i * 0.35); if (kk <= 0) return; x.save(); x.globalAlpha = kk; x.fillStyle = '#7a2a4a'; x.fillText(s, -220, -50 + i * 80); x.restore() })
  const s = prog(t, 15.9, 16.2); if (s > 0) { x.save(); x.globalAlpha = s; x.font = `700 30px 'Space Mono', monospace`; x.fillStyle = '#2fc79a'; x.fillText('✓ signed, both of us', -220, 160); x.restore() }
  x.restore()
}
const SLAM = t => 1 - ease.inOutCubic(prog(t, 0.6, 1.1))
const LIST = 14.4
const F = makeFilm({
  id: 'koce15', dur: 19, ending: 'loop', brk: 'whip',
  A: 'virgo', B: 'gemini',
  hook: { text: 'Both wrote the *SAME thing?!*', out: 1.25, size: 112 },
  cards: [{ q: 'What’s one thing a partner should *never say* in an argument?', topic: 'conflict', kind: 'ask', at: 1.1, big: 4.2, write: 4.5, reveal: 7.1, done: 14.1, ans: { A: '“calm *down.*”', B: '“calm *down.*”' } }],
  lines: [
    { t: 8.4, who: 'A', text: 'jinx. you owe me a *snack.*' },
    { t: 10.3, who: 'S', text: 'agree on the never-list while you’re calm, so it’s there when *you’re not.*' },
  ],
  boxes: [{ from: 0, to: 2, open: 8.2, close: 14.4 }],
  stickers: [{ at: 7.75, out: 8.8, text: 'JINX.', x: 540, y: 960, rot: -0.06, col: '#ff3b3b', size: 64 }],
  last: { at: 16.0, text: 'Write the rules *before* the fight.' },
  mood: {
    A: [[0, 'wide', [1, 1], 0.12], [1.1, 'wide', [0.4, -1]], [4.5, 'squint', [0.4, 1]], [7.1, 'wide', [1, -0.6]], [8.4, 'wink', [1, 0]], [10.3, 'neutral', [0, -1]], [14.4, 'happy', [0, -1]], [16.2, 'heart', [1, 0]]],
    B: [[0, 'wide', [-1, 1], 0.12], [1.1, 'wide', [-0.4, -1]], [4.5, 'squint', [-0.4, 1]], [7.1, 'wide', [-1, -0.6]], [8.4, 'happy', [-1, 0]], [10.3, 'neutral', [0, -1]], [14.4, 'happy', [0, -1]], [16.2, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.5, 'neutral', [0, 1]], [7.1, 'wide', [0, -1]], [8.0, 'sparkle', [0, -1]], [14.4, 'happy', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [7.5, 10.3, 3], [10.3, 14.4, 1], [16.0, 19, 2]],
  offset: { A: t => [30 * SLAM(t), 0], B: t => [-30 * SLAM(t), 0] },
  cam: [[0, 1, 540, 960], [6.9, 1, 540, 960], [7.6, 1.1, 540, 985], [14.0, 1.1, 540, 985], [14.6, 1.04, 540, 980], [18.4, 1.04, 540, 980], [19, 1, 540, 960]],
  punch: [{ at: 7.15, dur: 1.0, z: 0.1, x: 540, y: 820 }],
  draw: {
    cast(x, t, S) {
      const k = SLAM(t); if (k <= 0.01) return
      // two face-down answer cards being slammed down at frame 0
      for (const [w, d] of [['A', 1], ['B', -1]]) { const r = S.r[w]; x.save(); x.globalAlpha = k; R(x, INK, r.x + d * 110 - 70, 1238, 140, 52); R(x, '#2c1a5c', r.x + d * 110 - 64, 1242, 128, 44); R(x, GOLD, r.x + d * 110 - 10, 1254, 20, 20); x.restore(); hand(x, r.x + d * 110, 1210, d, 9, '#ffe3c8', { up: true, rot: Math.PI, alpha: k }) }
    },
    front(x, t) {
      list(x, t, ease.outBack(prog(t, LIST, LIST + 0.4)))
      if (t > 16.2) hearts(x, t, 16.25, 540, 1050, { n: 6, spread: 260 })
    },
  },
  extraScenes: [caught(CAUGHT)],
  extraCues: [['boom', 0.0, 0.3], ...caughtCues(CAUGHT), ['pop', 7.8, 1318.51, 0.05, 0], ['whoosh', LIST, 0.3, 0.04], ...[0, 1, 2].map(i => ['tick', +(14.8 + i * 0.35).toFixed(2), 0.05]), ['bell', 15.95, 1567.98, 0.03, 1.2, 0]],
})
export const { DURATION, SCENES, CUES } = F
