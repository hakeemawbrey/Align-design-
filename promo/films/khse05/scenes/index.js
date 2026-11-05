// khse05: ZODIAC HOT SEAT, "Leo took the microphone" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Leo mid-grab of the host's microphone, a second spotlight swung fully onto itself, sparkles
//         mid-burst; the hook "Leo *took* the microphone." landed. 0.3 screen shake.
//   Q1 "Best angle?" → "all of them."  Q2 "Hype your friends?" → "LOUDLY."
//   the last question (silence): "Last time you needed reassurance?" → "…today. I just ask loudly."
//   THE STARS: "Loud on the outside. *Soft is allowed.*"  Hard cut.
import { makeHotSeat, R, box, sparkles, spotlight, lerp, prog, ease, INK, GOLD, BONE, PINK } from '../../khse01/scenes/hotkit.js'

function mic(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -12, 0, 24, 120, '#2b2140', { b: 6 })
  x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b9b4d4'; x.beginPath(); x.arc(0, -20, 33, 0, Math.PI * 2); x.fill()
  for (let i = -2; i <= 2; i++) R(x, '#8c86a8', -26, -20 + i * 10, 52, 3)
  R(x, GOLD, -14, 2, 28, 10)
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse05', sign: 'leo', name: 'Leo', accent: '#f39a3a',
  hook: 'Leo *took* | the microphone.',
  breakFx: 'shake', breakAt: 0.3,
  hero0: { x: 600, y: 990, s: 310, mood: 'sparkle', rot: 0.12, look: [1, -0.4] },
  backdrop(x, t, S) {
    // the extra spotlight Leo yanked onto itself (gone once the show starts)
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    if (k > 0) spotlight(x, 940, 600, 1290, 520, k, 0.6)
  },
  frame0(x, t, S) { sparkles(x, t + 0.4, 600, 900, 0, 12, 230, 1, [GOLD, BONE, PINK]) },
  props(x, t, S, P) {
    // the mic: mid-grab at frame 0, then held for the whole show
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    mic(x, lerp(760, 720, 1 - k) + 20 * k * Math.sin(t * 20), lerp(940, 1000, 1 - k), lerp(0.6, 0.35, 1 - k))
  },
  qs: [
    { q: 'Best *angle?*', a: 'all of them.', mood: 'sparkle' },
    { q: 'Hype your *friends?*', a: 'LOUDLY.', mood: 'happy', size: 64 },
  ],
  final: { q: 'Last time you needed *reassurance?*', a: '…today. I just ask loudly.', mood: 'neutral', endMood: 'happy' },
  last: 'Loud on the outside. *Soft is allowed.*',
  ending: 'cut',
  music: { style: 'funk', key: 'A', seed: 3505 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
