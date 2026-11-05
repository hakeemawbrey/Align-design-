// koce02 · ONE CARD, TWO PEOPLE ep 2 · "The comfort meal" (20 s vertical, star_advice post, jazzy · Bb). Loops.
//   0.0   frame 0: Taurus mid-gasp clutching a spoon, Gemini mid-shrug, the card spinning, Pisces sobbing. Hook:
//         "Their comfort meal? You'll *never guess.*"  Colour flash + shake at 0.5.
//   1.1   the card: "What's your comfort meal?" (real card fo2, The Empress) · 4.6 both answer · 7.4 the flip:
//         TAURUS "my nan's soup." GEMINI "cereal. at midnight."
//   7.9   Taurus: "cereal?? that's not a meal."  Gemini: "it's a hug in a bowl, okay?"
//   12.6  THE STARS: now you know exactly what to bring on their worst day.
//   15.6  the tag: Gemini brings Taurus soup, Taurus brings Gemini cereal (a MIDNIGHT clock), Pisces sobs into both.
//   16.4  last line "Now you know their *worst-day* order." → loops back to frame 0.
import { makeFilm, R, INK, GOLD, BONE, prog, ease, lerp, clamp, bits, hearts, sticker } from '../../koce01/scenes/cardkit.js'

function spoon(x, X, Y, rot) { x.save(); x.translate(X, Y); x.rotate(rot); R(x, INK, -8, -10, 16, 120); R(x, '#cfd6e6', -4, -6, 8, 112); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -36, 30, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e6ecf6'; x.beginPath(); x.ellipse(0, -36, 22, 32, 0, 0, Math.PI * 2); x.fill(); R(x, '#ffffff', -10, -58, 8, 14); x.restore() }
function bowl(x, t, X, Y, kind, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-92, -40); x.lineTo(92, -40); x.quadraticCurveTo(86, 40, 0, 46); x.quadraticCurveTo(-86, 40, -92, -40); x.fill()
  x.fillStyle = kind === 'soup' ? '#f39a3a' : '#7fc8f0'; x.beginPath(); x.moveTo(-82, -34); x.lineTo(82, -34); x.quadraticCurveTo(76, 32, 0, 38); x.quadraticCurveTo(-76, 32, -82, -34); x.fill()
  R(x, kind === 'soup' ? '#ffd98a' : '#fbf3e2', -80, -44, 160, 12)
  if (kind === 'soup') { for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * p) * 0.7; R(x, BONE, -34 + i * 30 + Math.sin(t * 3 + i) * 6, -70 - p * 70, 8, 20); x.restore() } R(x, '#e86a5a', -30, -48, 16, 8); R(x, '#9fd86a', 12, -48, 18, 8) }
  else { for (let i = 0; i < 7; i++) R(x, i % 2 ? '#f2c75c' : '#ff8fb1', -66 + i * 20, -56 + (i % 3) * 4, 14, 12) }
  x.restore()
}
const TAG = [15.6, 19.5]
const F = makeFilm({
  id: 'koce02', dur: 20, ending: 'loop', brk: 'flash', flashes: [0.5], flashCol: '#f39a3a',
  A: 'taurus', B: 'gemini',
  hook: { text: 'Their comfort meal? You’ll *never guess.*', out: 1.25 },
  cards: [{ q: 'What’s your *comfort meal?*', topic: 'food', kind: 'ask', at: 1.1, big: 4.2, write: 4.6, reveal: 7.4, done: 15.4, ans: { A: 'my nan’s *soup.*', B: 'cereal. *at midnight.*' } }],
  lines: [
    { t: 7.9, who: 'A', text: 'cereal?? that’s not a *meal.*' },
    { t: 10.2, who: 'B', text: 'it’s a *hug* in a bowl, okay?' },
    { t: 12.5, who: 'S', text: 'now you know exactly what to bring on their *worst day.*' },
  ],
  boxes: [{ from: 0, to: 3, open: 7.7, close: 15.5 }],
  last: { at: 16.4, text: 'Now you know their *worst-day* order.' },
  mood: {
    A: [[0, 'wide', [1, -1], -0.1], [1.1, 'wide', [0.4, -1]], [4.6, 'squint', [0.4, 1]], [7.4, 'wide', [1, -0.6]], [10.2, 'squint', [1, 0]], [11.6, 'neutral', [1, 0]], [12.5, 'happy', [0, -1]], [15.6, 'heart', [1, 0]]],
    B: [[0, 'eyeroll', [-1, -1]], [1.1, 'wide', [-0.4, -1]], [4.6, 'squint', [-0.4, 1]], [7.4, 'happy', [-1, -0.6]], [7.9, 'wide', [-1, 0]], [10.2, 'wink', [-1, 0]], [12.5, 'happy', [0, -1]], [15.6, 'sparkle', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.6, 'neutral', [0, 1]], [7.4, 'wide', [0, -1]], [8.2, 'sparkle', [0, -1]], [15.6, 'sparkle', [0, 1]]],
  },
  cry: [[0, 1.2, 2], [7.7, 10.2, 2], [15.8, 20, 3]],
  offset: { A: t => [lerp(40, 0, ease.outCubic(prog(t, 0.7, 1.4))), lerp(-30, 0, ease.outCubic(prog(t, 0.7, 1.4)))], B: t => [Math.sin(t * 5) * 6 * (1 - prog(t, 0, 1.1)), 0] },
  cam: [[0, 1, 540, 960], [7.2, 1, 540, 960], [8.0, 1.1, 540, 985], [15.3, 1.1, 540, 985], [15.9, 1.15, 540, 1080], [19.4, 1.15, 540, 1080], [20, 1, 540, 960]],
  punch: [{ at: 7.45, dur: 1.1, z: 0.12, x: 540, y: 820 }],
  draw: {
    cast(x, t, S) {
      // frame 0: the spoon clutched up by Taurus; it settles onto the table by 1.4
      const k = ease.inOutCubic(prog(t, 0.9, 1.5)), r = S.r.A
      if (k < 1) spoon(x, lerp(r.x + 150, r.x + 160, k), lerp(r.y - 40, TABLEY - 20, k), lerp(-0.5, 1.4, k))
    },
    mid(x, t) {
      const g = ease.outBack(prog(t, TAG[0], TAG[0] + 0.4)) * (1 - ease.inCubic(prog(t, TAG[1], TAG[1] + 0.3)))
      // the swap: Gemini hands Taurus the soup, Taurus hands Gemini the cereal
      bowl(x, t, lerp(830, 330, ease.inOutCubic(prog(t, TAG[0], TAG[0] + 0.7))), 1270, 'soup', g)
      bowl(x, t, lerp(250, 750, ease.inOutCubic(prog(t, TAG[0], TAG[0] + 0.7))), 1270, 'cereal', g)
    },
    front(x, t) {
      if (t > TAG[0] + 0.7 && t < TAG[1]) hearts(x, t, TAG[0] + 0.7, 540, 1060, { n: 6, spread: 260 })
    },
    over(x, t) { sticker(x, t, { at: TAG[0] + 0.3, out: TAG[1], text: '☾ 11:58 PM', x: 860, y: 1250, rot: 0.06, col: '#7fc8f0', size: 34 }) },
  },
  extraCues: [['whoosh', 1.0, 0.2, 0.03], ['tick', 1.45, 0.04], ['whoosh', 15.6, 0.4, 0.04], ['pop', 16.2, 523.25, 0.04, -0.3], ['pop', 16.3, 659.25, 0.04, 0.3]],
})
const TABLEY = 1290
export const { DURATION, SCENES, CUES } = F
