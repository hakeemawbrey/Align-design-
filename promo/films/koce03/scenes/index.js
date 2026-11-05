// koce03 · ONE CARD, TWO PEOPLE ep 3 · "The small thing" (21 s vertical, star_advice post, dreamy · F). Hard cut.
//   0.0   frame 0: Leo mid-hair-flip (a fresh quiff), Virgo mid-squint through a giant magnifier at the spinning card,
//         Pisces sobbing. Hook: "The tiniest answer. The *biggest gasp.*"  Whip zoom at 0.55.
//   1.1   the card (rare): "What small, everyday thing makes you feel cared for?" (real card ro6, The Lovers)
//   5.0   both answer · 7.8 the flip: LEO "when you notice my new haircut." VIRGO "when you put the cup back."
//   8.3   Leo: "…the cup? like, back in the cupboard?"  Virgo: "yes. it feels like being heard."
//   13.2  NEXT MORNING: Virgo: "nice haircut."  Leo puts the cup back in the cupboard. Both melt, Pisces bawls.
//   16.2  THE STARS: "tiny habits say: i listened."  19.6 last line "Small things are the *big* things."
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sticker, sparkles } from '../../koce01/scenes/cardkit.js'

const QUIFF = ['..XXX..', '.XXXXX.', 'XXX.XXX', 'XX...XX']
function cup(x, X, Y, rot = 0) { x.save(); x.translate(X, Y); x.rotate(rot); R(x, INK, -34, -46, 68, 70); R(x, '#fbf3e2', -28, -40, 56, 58); R(x, '#7fd8b0', -28, -24, 56, 12); R(x, INK, 30, -30, 24, 34); R(x, '#fbf3e2', 34, -24, 12, 22); x.restore() }
function cupboard(x) {
  R(x, INK, 846, 760, 208, 176); R(x, '#8a5a3a', 852, 766, 196, 164); R(x, '#a87048', 852, 766, 196, 14)
  R(x, INK, 852, 846, 196, 8); R(x, '#5a3a22', 862, 790, 176, 52); R(x, '#5a3a22', 862, 860, 176, 60)
  cup(x, 905, 842); cup(x, 990, 842)
}
const CUP_PATH = [14.3, 15.1]
const F = makeFilm({
  id: 'koce03', dur: 21, ending: 'cut', brk: 'whip',
  A: 'leo', B: 'virgo',
  hook: { text: 'The tiniest answer. The *biggest gasp.*', out: 1.25 },
  cards: [{ q: 'What *small, everyday* thing makes you feel *cared for?*', topic: 'romance', kind: 'ask', rare: 'rare', at: 1.1, big: 4.6, write: 5.0, reveal: 7.8, done: 12.9, ans: { A: 'when you notice my *new haircut.*', B: 'when you put *the cup back.*' } }],
  lines: [
    { t: 8.3, who: 'A', text: '…the cup? like, back in the *cupboard?*' },
    { t: 10.8, who: 'B', text: 'yes. it feels like *being heard.*' },
    { t: 13.6, who: 'B', text: 'nice *haircut.*' },
    { t: 16.1, who: 'S', text: 'tiny habits say one big thing: *i listened.*' },
  ],
  boxes: [{ from: 0, to: 4, open: 8.1, close: 19.3 }],
  stickers: [{ at: 13.0, out: 15.6, text: 'NEXT MORNING ☼', x: 540, y: 300, rot: -0.05, col: GOLD, size: 40 }],
  last: { at: 19.6, text: 'Small things are the *big* things.' },
  mood: {
    A: [[0, 'wink', [-1, -1], -0.08], [1.1, 'wide', [0.4, -1]], [5.0, 'squint', [0.4, 1]], [7.8, 'wide', [1, -0.6]], [8.3, 'squint', [1, 0]], [10.8, 'neutral', [1, 0]], [12.4, 'happy', [1, 0]], [13.6, 'sparkle', [1, 0]], [14.3, 'happy', [1, -0.5]], [15.2, 'heart', [1, 0]]],
    B: [[0, 'squint', [-1, -1]], [1.1, 'wide', [-0.4, -1]], [5.0, 'squint', [-0.4, 1]], [7.8, 'neutral', [-1, -0.6]], [8.3, 'neutral', [-1, 0]], [10.8, 'happy', [-1, 0]], [13.6, 'happy', [-1, 0]], [14.5, 'wide', [1, -1]], [15.2, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [5.0, 'neutral', [0, 1]], [7.8, 'wide', [0, -1]], [10.8, 'sparkle', [0, -1]], [15.2, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [8.0, 10.8, 1], [10.8, 13.0, 2], [15.2, 21, 3]],
  offset: { A: t => [0, -20 * Math.sin(Math.PI * prog(t, 0, 0.7))], B: t => [-20 * (1 - prog(t, 0.6, 1.2)), 0] },
  cam: [[0, 1, 540, 960], [7.6, 1, 540, 960], [8.3, 1.1, 540, 985], [12.6, 1.1, 540, 985], [13.2, 1.15, 600, 1000], [18.8, 1.15, 600, 1000], [19.6, 1.08, 540, 1040]],
  punch: [{ at: 7.85, dur: 1.1, z: 0.1, x: 540, y: 820 }, { at: 15.2, dur: 1.4, z: 0.12, x: 560, y: 1060 }],
  draw: {
    back(x) { cupboard(x) },
    cast(x, t, S) {
      const r = S.r.A, cell = r.size / 36
      // the new quiff, flipping at frame 0
      bits(x, QUIFF, { X: '#c8601a' }, r.x - cell * 2, r.top - cell * 1.5, cell * 1.6, { rot: -0.3 + 0.3 * ease.outBack(prog(t, 0, 0.6)) + (t > 13.6 && t < 14.2 ? 0.15 * Math.sin((t - 13.6) * 20) : 0) })
      if (t > 13.6 && t < 14.4) sparkles(x, t, r.x, r.top, 13.7, { n: 8, Rr: 110 })
    },
    mid(x, t) {
      const p = ease.inOutCubic(prog(t, ...CUP_PATH))
      if (p >= 1) return
      cup(x, lerp(420, 950, p), lerp(1262, 842, p) - Math.sin(Math.PI * p) * 220, p * 6.28)
    },
    front(x, t, S) {
      if (t < 1.4) { // Virgo's magnifier, aimed at the spinning card
        const k = 1 - ease.inCubic(prog(t, 1.0, 1.4)), r = S.r.B
        x.save(); x.globalAlpha = k; x.translate(lerp(r.x - 130, r.x - 60, 1 - k), r.y - 230); x.rotate(-0.5)
        R(x, INK, -12, 60, 24, 140); R(x, '#a87048', -7, 64, 14, 132)
        x.lineWidth = 20; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.stroke(); x.lineWidth = 10; x.strokeStyle = '#d6dbe8'; x.stroke()
        x.fillStyle = 'rgba(190,230,255,0.25)'; x.fill(); R(x, '#ffffff', -46, -40, 18, 18); x.restore()
      }
      if (t > 15.2) hearts(x, t, 15.25, 540, 1050, { n: 7, spread: 300 })
      if (t > CUP_PATH[1] && t < CUP_PATH[1] + 0.8) sparkles(x, t, 950, 842, CUP_PATH[1], { n: 8, Rr: 90 })
    },
  },
  extraCues: [['whoosh', 0.05, 0.3, 0.03], ['whoosh', CUP_PATH[0], 0.6, 0.04], ['pop', CUP_PATH[1], 783.99, 0.05, 0.4], ['bell', CUP_PATH[1] + 0.05, 2093, 0.03, 1, 0.4], ['glitter', 13.7, 14.3]],
})
export const { DURATION, SCENES, CUES } = F
