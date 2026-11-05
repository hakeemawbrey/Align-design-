// khse09: ZODIAC HOT SEAT, "Sagittarius left mid-question" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Sag mid-sprint off the stage with a backpack, the empty chair still spinning, the spotlight
//         chasing it; the hook "Sag left the hot seat. *Mid-question.*" landed. 0.2 whip zoom (the light catches Sag).
//   1.05–1.5 Sag skids back into the chair.  Q1 "Commitment?" → "to this trip? yes."  Q2 "Five-year plan?" → "airport."
//   the last question (silence): "What scares you about staying?" → "…that they'll get bored of me."
//   THE STARS: "The right one *comes along.*"  Hard cut.
import { makeHotSeat, box, R, prog, ease, lerp, INK } from '../../khse01/scenes/hotkit.js'

function backpack(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -50, -60, 100, 120, '#4f9a6a', { b: 6, hi: '#6fbf8a' }); box(x, -36, 10, 72, 40, '#3f7f56', { b: 4 })
  R(x, INK, -40, -74, 12, 20); R(x, INK, 28, -74, 12, 20)
  x.restore()
}
const settle = t => ease.inOutCubic(prog(t, 1.05, 1.5))

const EP = makeHotSeat({
  id: 'khse09', sign: 'sagittarius', name: 'Sagittarius', accent: '#c98bff',
  hook: 'Sag left the hot seat. | *Mid-question.*',
  breakFx: 'whip', breakAt: 0.2,
  hero0: { x: 880, y: 1000, s: 280, mood: 'happy', rot: 0.25, look: [1, 0] },
  chair: { spin: t => (1 - settle(t)) * ((t * 2.2) % 2 - 1) },
  spot: t => { const k = settle(t); return { x: lerp(860, 540, k), tx: lerp(220, 0, k), w: 600 } },
  behind(x, t, S, P) { backpack(x, P.x - 120, P.y + 10, -0.3) },
  qs: [
    { q: '*Commitment?*', a: 'to this trip? yes.', mood: 'happy' },
    { q: 'Five-year *plan?*', a: 'airport.', mood: 'sparkle', size: 62 },
  ],
  final: { q: 'What scares you about *staying?*', a: '…that they’ll get bored of me.', mood: 'neutral', endMood: 'happy' },
  last: 'The right one *comes along.*',
  ending: 'cut',
  music: { style: 'synthwave', key: 'Bm', seed: 3509 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
