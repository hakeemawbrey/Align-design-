// koce01 · ONE CARD, TWO PEOPLE ep 1 · "Space or talk it out?" (22 s vertical, star_advice post, lofi · Em). Hard cut.
//   0.0   frame 0: mid-fight. Aries lunging across the table, Cancer half hidden in a blanket fort, the card spinning in
//         mid-air, Pisces (the dealer) mid-sob. Hook: "One card stopped this *fight.*"  Whip zoom out at 0.35.
//   1.1   the card lands big: "When you're upset, do you need space or to talk it out?" (real card co1, The Tower)
//   4.8   both answer face down · 6.15 3-2-1 · 7.6 the flip: ARIES "talk. right now." CANCER "space. one hour."
//   8.3   Aries: "wait. you leave… to come back?"  Cancer: "i always come back. i just need an hour." (the blanket goes up, then down)
//   13.9  THE STARS: knowing this before a fight means nobody feels left or cornered.
//   17.3  Aries: "okay. an hour, then a walk?" · they shake on it, Pisces sobs.
//   20.8  last line "An hour apart, then *together.*" (held ~1 s, hard cut).
import { makeFilm, R, INK, PINK, GOLD, BONE, prog, ease, lerp, clamp, hearts, bits } from '../../koce01/scenes/cardkit.js'

const BL = '#e86a9a', BL2 = '#ffb0cf', BL3 = '#7a3a9a'
/** Cancer's blanket fort, k = 0 (off) … 1 (fully on) */
function blanket(x, t, r, k) {
  if (k <= 0.01 || !r) return
  const cx = r.x, top = r.y - 200 - (1 - k) * 420
  x.save(); x.globalAlpha *= clamp(k * 2)
  // dome
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, top + 175, 216, 175, 0, Math.PI, 0); x.lineTo(cx + 216, top + 182); x.lineTo(cx - 216, top + 182); x.fill()
  x.fillStyle = BL; x.beginPath(); x.ellipse(cx, top + 175, 206, 165, 0, Math.PI, 0); x.lineTo(cx + 206, top + 175); x.fill()
  // drapes down the sides
  R(x, INK, cx - 222, top + 170, 78, 320); R(x, BL, cx - 214, top + 170, 64, 312)
  R(x, INK, cx + 144, top + 170, 78, 320); R(x, BL, cx + 150, top + 170, 64, 312)
  // the hem across the forehead + patches
  R(x, INK, cx - 222, top + 160, 444, 30); R(x, BL3, cx - 214, top + 164, 428, 20)
  for (let i = 0; i < 5; i++) R(x, i % 2 ? BL2 : '#ffd98a', cx - 150 + i * 62, top + 70 + (i % 2) * 34, 34, 34)
  for (let i = 0; i < 6; i++) R(x, BL2, cx - 208, top + 210 + i * 46, 50, 8), R(x, BL2, cx + 156, top + 210 + i * 46, 50, 8)
  x.restore()
}
const blanketK = t => Math.max(1 - ease.inOutCubic(prog(t, 1.3, 1.9)), ease.outBack(prog(t, 8.0, 8.4)) * (1 - ease.inOutCubic(prog(t, 12.2, 12.8))))
// little anger marks over Aries at frame 0
const VEIN = ['X.X', '.X.', 'X.X']

const F = makeFilm({
  id: 'koce01', dur: 22, ending: 'cut', brk: 'whip',
  A: 'aries', B: 'cancer',
  hook: { text: 'One card stopped this *fight.*', out: 1.25 },
  cards: [{ q: 'When you’re upset, do you need *space* or to *talk it out?*', topic: 'conflict', kind: 'ask', at: 1.1, big: 4.4, write: 4.8, reveal: 7.6, done: 16.9, ans: { A: 'talk. *right now.*', B: 'space. *one hour.*' } }],
  lines: [
    { t: 8.3, who: 'A', text: 'wait. you leave… to *come back?*' },
    { t: 11.0, who: 'B', text: 'i always come back. i just need *an hour.*' },
    { t: 13.9, who: 'S', text: 'know this *before* the fight: nobody feels left, or cornered.' },
    { t: 17.3, who: 'A', text: 'okay. an hour, then a *walk?*' },
  ],
  boxes: [{ from: 0, to: 4, open: 8.1, close: 20.1 }],
  last: { at: 20.8, text: 'An hour apart, then *together.*' },
  mood: {
    A: [[0, 'wide', [1, 0], -0.14], [1.1, 'wide', [0.4, -1]], [4.8, 'squint', [0.4, 1]], [7.6, 'wide', [1, -0.6]], [8.3, 'neutral', [1, 0]], [11.0, 'squint', [1, 0]], [12.4, 'wide', [1, 0]], [13.9, 'happy', [0, -1]], [17.3, 'happy', [1, 0]], [19.0, 'heart', [1, 0]]],
    B: [[0, 'wide', [-1, 0]], [1.1, 'wide', [-0.4, -1]], [4.8, 'squint', [-0.4, 1]], [7.6, 'wide', [-1, -0.6]], [8.3, 'neutral', [-1, 0]], [11.0, 'neutral', [-1, 0]], [12.6, 'happy', [-1, 0]], [13.9, 'happy', [0, -1]], [19.0, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.8, 'neutral', [0, 1]], [7.6, 'wide', [0, -1]], [8.6, 'sparkle', [0, -1]], [13.9, 'happy', [0, -1]], [19.0, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [7.8, 10.6, 3], [10.6, 13.9, 1], [18.9, 22, 3]],
  offset: {
    A: t => [lerp(70, 0, ease.outCubic(prog(t, 0.6, 1.4))) + 95 * ease.inOutCubic(prog(t, 18.6, 19.1)), lerp(-40, 0, ease.outCubic(prog(t, 0.6, 1.4)))],
    B: t => [-95 * ease.inOutCubic(prog(t, 18.6, 19.1)), 0],
  },
  cam: [[0, 1, 540, 960], [7.4, 1, 540, 960], [8.3, 1.1, 540, 985], [16.8, 1.1, 540, 985], [17.6, 1.2, 540, 1090]],
  punch: [{ at: 7.65, dur: 1.2, z: 0.12, x: 540, y: 820 }, { at: 19.05, dur: 1.4, z: 0.1, x: 540, y: 1100 }],
  draw: {
    cast(x, t, S) {
      blanket(x, t, S.r.B, blanketK(t))
      if (t < 1.3) { const k = 1 - prog(t, 1.0, 1.3); x.save(); x.globalAlpha = k; bits(x, VEIN, { X: '#ff4a5a' }, S.r.A.x + 120, S.r.A.top + 40 + Math.sin(t * 30) * 4, 14); x.restore() }
    },
    front(x, t, S) {
      if (t > 19.0) hearts(x, t, 19.05, 540, 1050, { n: 7, spread: 220 })
      // the handshake: two little pixel hands meeting in the middle
      const k = ease.outBack(prog(t, 18.9, 19.2))
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); bits(x, ['XXXX.', 'XXXXX', 'XXXXX', '.XXX.'], { X: '#ffd2a8' }, 520, 1140, 12); bits(x, ['.XXXX', 'XXXXX', 'XXXXX', '.XXX.'], { X: '#ffe3c8' }, 562, 1150, 12); x.restore() }
      void S
    },
  },
  extraCues: [['whoosh', 1.4, 0.3, 0.03], ['whoosh', 8.0, 0.2, 0.04], ['pop', 8.1, 392, 0.04, 0.4], ['whoosh', 12.3, 0.3, 0.03], ['pop', 19.0, 783.99, 0.05, 0], ['glitter', 19.0, 20.2]],
})
export const { DURATION, SCENES, CUES } = F
