// khse06: ZODIAC HOT SEAT, "Virgo fact-checked the host" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Virgo mid-scribble with a red pen on the question card flying in, red marks all over it; the hook
//         "Virgo is *fact-checking* the host." landed. 0.2 whip zoom.
//   Q1 "Read receipts?" → "on. and annotated."  Q2 "Reply time?" → "drafted, edited, scheduled."
//   the last question (silence): "Who checks on *you*?" → "…nobody really asks."
//   THE STARS: "The fixer needs *checking on* too."  Hard cut.
import { makeHotSeat, R, box, label, lerp, prog, ease, INK, RED, BONE, INTER } from '../../khse01/scenes/hotkit.js'

function markedCard(x, t, k) {
  const p = ease.outCubic(prog(t, -0.5, 1.2))
  x.save(); x.globalAlpha = k; x.translate(lerp(820, 700, p), lerp(700, 740, p)); x.rotate(lerp(0.35, 0.12, p))
  box(x, -170, -90, 340, 180, BONE, { b: 7 })
  for (let i = 0; i < 3; i++) R(x, 'rgba(27,18,54,0.55)', -140, -50 + i * 36, 220 - i * 40, 14)
  x.strokeStyle = RED; x.lineWidth = 7; x.lineCap = 'round'
  const n = Math.floor(clampN((t + 0.6) * 6, 0, 5))
  const marks = [[[-150, -42], [80, -60]], [[-150, -6], [40, -14]], [[100, 20], [150, 60]], [[120, -70], [160, -30]], [[-60, 60], [20, 70]]]
  marks.slice(0, n).forEach(([a, b]) => { x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke() })
  label(x, '✓?', 130, 70, { size: 40, col: RED, font: INTER, weight: 800 })
  x.restore()
}
function clampN(v, a, b) { return Math.min(b, Math.max(a, v)) }
function pen(x, t, k) {
  x.save(); x.globalAlpha = k; x.translate(640 + 30 * Math.sin(t * 22), 700 + 16 * Math.cos(t * 17)); x.rotate(0.7)
  box(x, -10, -90, 20, 150, RED, { b: 5 }); R(x, INK, -4, 60, 8, 22); x.restore()
}

const EP = makeHotSeat({
  id: 'khse06', sign: 'virgo', name: 'Virgo', accent: '#b9a6ff',
  hook: 'Virgo is *fact-checking* | the host.',
  breakFx: 'whip', breakAt: 0.2,
  hero0: { x: 470, y: 1010, s: 290, mood: 'squint', rot: -0.1, look: [1, -1] },
  frame0(x, t, S) { markedCard(x, t, S.k); pen(x, t, S.k) },
  qs: [
    { q: 'Read *receipts?*', a: 'on. and annotated.', mood: 'squint' },
    { q: 'Reply *time?*', a: 'drafted, edited, scheduled.', mood: 'happy' },
  ],
  final: { q: 'Who checks on *you?*', a: '…nobody really asks.', mood: 'neutral', endMood: 'happy' },
  last: 'The fixer needs *checking on* too.',
  ending: 'cut',
  music: { style: 'house', key: 'C', seed: 3506 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
