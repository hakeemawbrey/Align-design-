// koce08 · ONE CARD, TWO PEOPLE ep 8 · "Morning person or night owl?" (16 s vertical, star_advice post, chiptune · A). Loops.
//   0.0   frame 0: a split sky, sunrise on Virgo's side (mid-stretch-yawn), moon on Sagittarius's side (mid-yawn),
//         the card spinning, Pisces sobbing. Hook: "Morning person dating a *night owl?*"  Colour flash + shake at 0.5.
//   1.1   the card: "Morning person or night owl?" (real card ev1, The Sun, a pick card) · 3.9 both answer
//   6.4   the flip: VIRGO "Morning. 6 a.m." SAGITTARIUS "Night. 3 a.m."
//   6.9   Pisces: "they'll never see each other."  THE STARS: "find the overlap. then protect it."
//   11.2  the sky goes golden: GOLDEN HOUR · 6:40 PM. Both awake, both happy.
//   13.0  last line "Golden hour is *both* of yours." → loops back to frame 0.
import { makeFilm, R, INK, GOLD, BONE, prog, ease, lerp, clamp, hearts, drawPixelStar, win } from '../../koce01/scenes/cardkit.js'

const SPLIT = t => 1 - ease.inOutCubic(prog(t, 1.0, 1.6))
const GOLDEN = t => ease.inOutCubic(prog(t, 11.0, 11.8))
function sun(x, X, Y, r) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(X, Y, r * 0.3, X, Y, r * 3); g.addColorStop(0, 'rgba(255,200,110,0.7)'); g.addColorStop(1, 'rgba(255,200,110,0)'); x.fillStyle = g; x.fillRect(X - r * 3, Y - r * 3, r * 6, r * 6); x.restore(); x.fillStyle = INK; x.beginPath(); x.arc(X, Y, r + 8, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffc861'; x.beginPath(); x.arc(X, Y, r, 0, Math.PI * 2); x.fill(); R(x, '#fff1c8', X - r * 0.5, Y - r * 0.5, r * 0.35, r * 0.35) }
const F = makeFilm({
  id: 'koce08', dur: 16, ending: 'loop', brk: 'flash', flashes: [0.5], flashCol: '#ffc861',
  A: 'virgo', B: 'sagittarius',
  hook: { text: 'Morning person dating a *night owl?*', out: 1.25 },
  cards: [{ q: '*Morning person* or *night owl?*', topic: 'everyday', kind: 'pick', opts: ['Morning', 'Night'], at: 1.1, big: 3.6, write: 3.9, reveal: 6.4, done: 10.9, ans: { A: 'Morning. *6 a.m.*', B: 'Night. *3 a.m.*' } }],
  lines: [
    { t: 6.9, who: 'P', text: 'they’ll never *see* each other.' },
    { t: 8.9, who: 'S', text: 'find the overlap. then *protect it.*' },
  ],
  boxes: [{ from: 0, to: 2, open: 6.7, close: 11.9 }],
  stickers: [{ at: 11.3, out: 15.3, text: '☼ GOLDEN HOUR · 6:40 PM', x: 540, y: 560, rot: -0.04, col: '#ffc861', size: 38 }],
  last: { at: 13.0, text: 'Golden hour is *both* of yours.' },
  mood: {
    A: [[0, 'sleepy', [0, -1], -0.14], [1.1, 'wide', [0.4, -1]], [3.9, 'squint', [0.4, 1]], [6.4, 'happy', [1, -0.6]], [6.9, 'wide', [1, 0]], [8.9, 'neutral', [0, -1]], [11.2, 'happy', [1, 0]], [12.0, 'heart', [1, 0]]],
    B: [[0, 'sleepy', [0, -1], -0.14], [1.1, 'wide', [-0.4, -1]], [3.9, 'squint', [-0.4, 1]], [6.4, 'wink', [-1, -0.6]], [6.9, 'wide', [-1, 0]], [8.9, 'neutral', [0, -1]], [11.2, 'happy', [-1, 0]], [12.0, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [3.9, 'neutral', [0, 1]], [6.4, 'wide', [0, -1]], [8.9, 'neutral', [0, -1]], [11.2, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [6.6, 8.9, 3], [11.4, 16, 2]],
  cam: [[0, 1, 540, 960], [6.2, 1, 540, 960], [6.9, 1.1, 540, 985], [10.8, 1.1, 540, 985], [11.4, 1.05, 540, 1000], [15.4, 1.05, 540, 1000], [16, 1, 540, 960]],
  punch: [{ at: 6.45, dur: 1.0, z: 0.1, x: 540, y: 820 }],
  draw: {
    back(x, t) {
      const s = SPLIT(t), g = GOLDEN(t)
      if (s > 0.01) { // the split sky: a sunrise on the left half
        x.save(); x.globalAlpha = s; const gr = x.createLinearGradient(0, 300, 0, 1300); gr.addColorStop(0, 'rgba(255,170,120,0.55)'); gr.addColorStop(1, 'rgba(255,120,150,0.1)'); x.fillStyle = gr; x.fillRect(0, 0, 540, 1300); R(x, BONE, 536, 0, 8, 1300); sun(x, 210, 760, 60); x.restore()
        x.save(); x.globalAlpha = s; x.fillStyle = 'rgba(10,8,40,0.45)'; x.fillRect(544, 0, 536, 1300); x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(860, 740, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = '#1a1040'; x.beginPath(); x.arc(884, 724, 50, 0, Math.PI * 2); x.fill(); x.restore()
      }
      if (g > 0.01) {
        x.save(); x.globalAlpha = g; const gr = x.createLinearGradient(0, 200, 0, 1300); gr.addColorStop(0, 'rgba(255,140,120,0.5)'); gr.addColorStop(0.6, 'rgba(255,190,110,0.55)'); gr.addColorStop(1, 'rgba(255,220,140,0.2)'); x.fillStyle = gr; x.fillRect(0, 0, 1080, 1300); sun(x, 540, 860 - 20 * g, 70); x.restore()
      }
    },
    front(x, t) { if (t > 12.0 && t < 15.3) hearts(x, t, 12.05, 540, 1050, { n: 7, spread: 280 }) },
  },
  extraCues: [['bell', 11.1, 1318.51, 0.03, 1.6, 0], ['glitter', 11.1, 12.0]],
})
export const { DURATION, SCENES, CUES } = F
