// khse13: ZODIAC HOT SEAT, situationship round: Aries (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Aries mid-yank of a card out of the host's deck, "WHAT ARE WE?", the deck mid-scatter; the hook
//         "Aries asked *“what are we?”* first." landed. 0.2 whip zoom.
//   Q1 "How long have you been 'talking'?" → "since spring."  Q2 "Labels?" → "I'd love one."
//   the last question (silence): "Why ask first?" → "…I'd rather know than wonder."
//   THE STARS: "Asking is *brave,* not needy."  Hard cut.
import { makeHotSeat, box, R, label, prog, ease, lerp, INK, BONE, RED, INTER } from '../../khse01/scenes/hotkit.js'

function deck(x, t, k) {
  x.save(); x.globalAlpha = k
  // scattering cards
  for (let i = 0; i < 6; i++) {
    const p = ease.outCubic(prog(t, -0.6, 1.4)), a = -2.4 + i * 0.6
    x.save(); x.translate(300 + Math.cos(a) * 200 * p, 860 + Math.sin(a) * 160 * p); x.rotate(i * 0.7 + p * (i % 2 ? 1 : -1))
    box(x, -50, -70, 100, 140, '#3a2d66', { b: 5 }); R(x, '#5a4a9a', -36, -56, 72, 112); x.restore()
  }
  // the yanked card
  x.save(); x.translate(lerp(380, 770, ease.outCubic(prog(t, -0.3, 0.9))), 740); x.rotate(-0.12)
  box(x, -170, -95, 340, 190, BONE, { b: 7 })
  label(x, 'WHAT', 0, -40, { size: 54, col: RED, font: INTER, weight: 800 }); label(x, 'ARE WE?', 0, 26, { size: 54, col: RED, font: INTER, weight: 800 })
  x.restore()
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse13', sign: 'aries', name: 'Aries', accent: '#ff6a3d',
  hook: 'Aries asked | *“what are we?”* first.',
  breakFx: 'whip', breakAt: 0.2,
  hero0: { x: 520, y: 1000, s: 290, mood: 'squint', rot: 0.14, look: [1, -0.6] },
  frame0(x, t, S) { deck(x, t, S.k) },
  qs: [
    { q: 'How long have you been *“talking”?*', a: 'since spring.', mood: 'neutral' },
    { q: '*Labels?*', a: 'I’d love one.', mood: 'happy' },
  ],
  final: { q: 'Why *ask first?*', a: '…I’d rather know than wonder.', mood: 'neutral', endMood: 'happy' },
  last: 'Asking is *brave,* not needy.',
  ending: 'cut',
  music: { style: 'house', key: 'D', seed: 3513 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
