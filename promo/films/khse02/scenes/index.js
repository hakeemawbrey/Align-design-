// khse02: ZODIAC HOT SEAT, "Taurus made the hot seat cozy" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Taurus mid-sink into the hot seat, now draped in a knitted blanket, slippers on the floor, a mug
//         steaming on the arm; the hook "Hot seat? Taurus made it *cozy.*" landed. 0.2 whip zoom.
//   Q1 "Ever change your order?" → "no."  Q2 "Their hoodie: kept or returned?" → "kept. it's soft."
//   the last question (silence): "Hardest thing to let go of?" → "…a routine. even one that isn't working."
//   THE STARS: "Comfy isn't always *happy.*"  Hard cut.
import { makeHotSeat, R, box, INK, BONE, GOLD, lerp, ease, prog } from '../../khse01/scenes/hotkit.js'

function blanket(x, t, sink) {
  const y = 1128 + 14 * sink
  // a chunky knitted blanket over the lap, two-tone stripes
  x.save(); x.translate(540, y)
  R(x, INK, -206, -8, 412, 104)
  for (let i = 0; i < 8; i++) R(x, i % 2 ? '#7fae6a' : '#c9dfa8', -200 + i * 50, -2, 50, 92)
  for (let i = 0; i < 9; i++) R(x, 'rgba(27,18,54,0.18)', -200 + i * 50 - 2, -2, 4, 92)
  for (let i = 0; i < 12; i++) R(x, INK, -196 + i * 34, 90, 10, 14 + (i % 2) * 6)        // tassels
  x.restore()
}
function slippers(x) { for (const d of [-1, 1]) { box(x, 540 + d * 70 - 36, 1262, 72, 26, '#e8b4c8', { b: 5, hi: '#f6d6e2' }) } }
function mug(x, t) {
  box(x, 760, 1018, 46, 52, BONE, { b: 5 }); R(x, INK, 806, 1030, 14, 26); R(x, BONE, 810, 1034, 6, 18)
  for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - ph); R(x, '#ffffff', 772 + 10 * Math.sin(ph * 6 + i), 1000 - ph * 70, 8, 14); x.restore() }
}

const EP = makeHotSeat({
  id: 'khse02', sign: 'taurus', name: 'Taurus', accent: '#9ccf6a',
  hook: 'Hot seat? | Taurus made it *cozy.*',
  breakFx: 'whip', breakAt: 0.2,
  hero0: { x: 540, y: 1075, s: 300, mood: 'sleepy' },
  props(x, t, S, P) { slippers(x); mug(x, t); blanket(x, t, 1 - P.k) },
  qs: [
    { q: 'Ever change your *order?*', a: 'no.', mood: 'neutral', size: 60 },
    { q: 'Their hoodie: *kept or returned?*', a: 'kept. it’s soft.', mood: 'happy' },
  ],
  final: { q: 'Hardest thing to *let go of?*', a: '…a routine. even one that isn’t working.', mood: 'squint', endMood: 'happy', size: 44 },
  last: 'Comfy isn’t always *happy.*',
  ending: 'cut',
  music: { style: 'lofi', key: 'F', seed: 3502 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void [GOLD, lerp, ease, prog]
