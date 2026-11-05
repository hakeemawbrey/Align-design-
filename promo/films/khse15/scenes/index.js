// khse15: ZODIAC HOT SEAT, 2 a.m. scroll round: Gemini (trial reel, loops). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Gemini mid-scroll under a blanket in the chair, phone glow on its face, a flip clock mid-flip to
//         2:07; the hook "2 a.m. Gemini, *still scrolling.*" landed. 0.2 whip zoom.
//   Q1 "How many tabs open?" → "all of them."  Q2 "Who are you looking at?" → "…everyone I used to know."
//   the last question (silence): "What are you looking for?" → "…someone else awake."
//   THE STARS: "Phone down. *Call a friend at noon.*"  Loops back to the 2:07 flip.
import { makeHotSeat, phone, box, R, label, prog, ease, lerp, INK, BONE, INTER } from '../../khse01/scenes/hotkit.js'

function flipClock(x, t, cx, cy, k) {
  x.save(); x.globalAlpha = k; x.translate(cx, cy)
  box(x, -130, -60, 260, 120, '#231c3c', { b: 7 })
  R(x, INK, -126, -3, 252, 6)
  const f = prog(t, -0.2, 0.25)
  label(x, f < 1 ? '2:06' : '2:07', 0, 4, { size: 66, col: '#ff7a8a', font: INTER, weight: 800 })
  if (f > 0 && f < 1) { x.save(); x.scale(1, 1 - 2 * f); R(x, '#2e2650', -122, -56, 244, 54); x.restore() }
  x.restore()
}
function blanketLap(x) {
  x.save(); x.translate(540, 1112)
  R(x, INK, -206, -10, 412, 100); R(x, '#4a3b8a', -200, -4, 400, 88)
  for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) R(x, '#f2c75c', -180 + i * 68 + (j % 2) * 30, 10 + j * 26, 6, 6)
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse15', sign: 'gemini', name: 'Gemini', accent: '#ffd85c',
  hook: '2 a.m. Gemini, | *still scrolling.*',
  breakFx: 'whip', breakAt: 0.2,
  hero0: { x: 540, y: 1036, s: 290, mood: 'squint', look: [1, 0.6] },
  frame0(x, t, S) { flipClock(x, t, 300, 780, S.k) },
  props(x, t, S) {
    blanketLap(x)
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    phone(x, lerp(650, 700, 1 - k), lerp(1000, 1080, 1 - k), lerp(-0.2, 0.25, 1 - k), X => { for (let i = 0; i < 6; i++) R(X, i % 2 ? '#3a6bd8' : BONE, -48, -90 + ((i * 36 - t * 160) % 216 + 216) % 216, 96, 26) }, { s: lerp(0.75, 0.55, 1 - k), glow: 1 })
  },
  qs: [
    { q: 'How many *tabs open?*', a: 'all of them.', mood: 'squint' },
    { q: 'Who are you *looking at?*', a: '…everyone I used to know.', mood: 'neutral' },
  ],
  final: { q: 'What are you *looking for?*', a: '…someone else awake.', mood: 'neutral', endMood: 'happy' },
  last: 'Phone down. *Call a friend at noon.*',
  ending: 'loop',
  music: { style: 'synthwave', key: 'Ebm', seed: 3515 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
