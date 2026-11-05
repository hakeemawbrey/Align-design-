// koce14 · ONE CARD, TWO PEOPLE ep 14 · "Big holidays or small?" (17.8 s vertical, star_advice post, chiptune · Bb). Hard cut.
//   0.0   frame 0: snow outside; Leo mid-jazz-hands in a huge party hat, Sagittarius mid-tiptoe away with a tiny candle,
//         the card spinning, Pisces sobbing. Hook: "Holiday plans. One card. *Total chaos.*"  Colour flash + shake at 0.5.
//   1.1   the card: "Big family holidays or small and quiet?" (real card fa4, The Hearth, a pick card) · 4.2 both answer
//   6.8   the flip: LEO "Big. the whole family." SAGITTARIUS "Small. and quiet."
//   7.4   Pisces: "december is ruined."  THE STARS: "talk about it now, not on the doorstep."
//   11.7  THE PLAN: the big party first… then a quiet night, just us.
//   16.6  last line "Talk December *before* December." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sticker } from '../../koce01/scenes/cardkit.js'

function snow(x, t) { for (let i = 0; i < 40; i++) { const p = ((t * 0.12 + i * 0.137) % 1), sx = (i * 97) % 1080 + Math.sin(t * 1.5 + i) * 20, sy = 140 + p * 1100; x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * p); R(x, '#ffffff', sx, sy, 6 + (i % 2) * 3, 6 + (i % 2) * 3); x.restore() } }
function hat(x, r, t, k) { if (k <= 0.01 || !r) return; const c = r.size / 36; x.save(); x.translate(r.x + 2 * c, r.top + 2 * c); x.rotate(0.25 + Math.sin(t * 9) * 0.06 * k); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(-60, 10); x.lineTo(0, -170); x.lineTo(60, 10); x.fill(); x.fillStyle = '#e8344e'; x.beginPath(); x.moveTo(-50, 4); x.lineTo(0, -156); x.lineTo(50, 4); x.fill(); for (let i = 0; i < 3; i++) R(x, GOLD, -36 + i * 14, -20 - i * 46, 72 - i * 28, 12); x.fillStyle = INK; x.beginPath(); x.arc(0, -172, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, -172, 16, 0, Math.PI * 2); x.fill(); x.restore() }
function candle(x, X, Y, t, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = k; R(x, INK, X - 16, Y - 70, 32, 74); R(x, '#fbf3e2', X - 11, Y - 65, 22, 66); R(x, INK, X - 2, Y - 84, 4, 14); const f = 1 + 0.15 * Math.sin(t * 20); x.fillStyle = '#ffc861'; x.beginPath(); x.ellipse(X, Y - 98, 9 * f, 16 * f, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff1c8'; x.beginPath(); x.ellipse(X, Y - 94, 4, 8, 0, 0, Math.PI * 2); x.fill(); x.restore() }
const OPEN = t => 1 - ease.inOutCubic(prog(t, 1.0, 1.6))
const PLAN = 11.7
const F = makeFilm({
  id: 'koce14', dur: 17.8, ending: 'cut', brk: 'flash', flashes: [0.5], flashCol: '#e8344e',
  A: 'leo', B: 'sagittarius',
  hook: { text: 'Holiday plans. One card. *Total chaos.*', out: 1.25 },
  cards: [{ q: '*Big* family holidays or *small and quiet?*', topic: 'family', kind: 'pick', opts: ['Big', 'Small'], at: 1.1, big: 3.9, write: 4.2, reveal: 6.8, done: 11.4, ans: { A: 'Big. *the whole family.*', B: 'Small. *and quiet.*' } }],
  lines: [
    { t: 7.4, who: 'P', text: 'december is *ruined.*' },
    { t: 9.1, who: 'S', text: 'talk about it now, not on the *doorstep.*' },
    { t: 12.0, who: 'A', text: 'big party *first*…' },
    { t: 13.6, who: 'B', text: '…then a quiet night, *just us.*' },
  ],
  boxes: [{ from: 0, to: 4, open: 7.2, close: 16.3 }],
  stickers: [{ at: PLAN, out: 16.3, text: 'THE PLAN: PARTY → QUIET NIGHT', x: 540, y: 300, rot: -0.04, col: '#9fe6b0', size: 34 }],
  last: { at: 16.6, text: 'Talk December *before* December.', size: 90 },
  mood: {
    A: [[0, 'sparkle', [1, -1], -0.12], [1.1, 'wide', [0.4, -1]], [4.2, 'squint', [0.4, 1]], [6.8, 'happy', [1, -0.6]], [7.4, 'wide', [1, 0]], [9.1, 'neutral', [0, -1]], [12.0, 'sparkle', [1, 0]], [14.6, 'heart', [1, 0]]],
    B: [[0, 'squint', [1, 0], 0.06], [1.1, 'wide', [-0.4, -1]], [4.2, 'squint', [-0.4, 1]], [6.8, 'happy', [-1, -0.6]], [7.4, 'wide', [-1, 0]], [9.1, 'neutral', [0, -1]], [12.0, 'happy', [-1, 0]], [14.6, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.2, 'neutral', [0, 1]], [6.8, 'wide', [0, -1]], [9.1, 'neutral', [0, -1]], [12.0, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [7.0, 9.1, 3], [9.1, 12.0, 1], [13.8, 17.8, 3]],
  offset: { A: t => [0, -30 * Math.abs(Math.sin(t * 8)) * OPEN(t)], B: t => [70 * OPEN(t), -10 * OPEN(t)] },
  cam: [[0, 1, 540, 960], [6.6, 1, 540, 960], [7.3, 1.1, 540, 985], [11.2, 1.1, 540, 985], [11.8, 1.12, 540, 1040]],
  punch: [{ at: 6.85, dur: 1.0, z: 0.1, x: 540, y: 820 }],
  draw: {
    back(x, t) { snow(x, t) },
    cast(x, t, S) {
      hat(x, S.r.A, t, Math.max(OPEN(t), ease.outBack(prog(t, 12.0, 12.4))))
      const b = S.r.B; candle(x, b.x + 150, b.y + 20, t, Math.max(OPEN(t), ease.outCubic(prog(t, 13.6, 14.0))))
    },
    front(x, t) { if (t > 14.6) hearts(x, t, 14.65, 540, 1050, { n: 7, spread: 260 }) },
  },
  extraCues: [['pop', 12.05, 1046.5, 0.05, -0.3], ['bell', 13.7, 1318.51, 0.03, 1.4, 0.3], ['glitter', 14.6, 15.4]],
})
export const { DURATION, SCENES, CUES } = F
