// khse12: ZODIAC HOT SEAT, "Pisces cried at question one" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
// Pisces is in the chair; Leo runs the buzzer booth for once.
//   0.00  frame 0: Pisces mid-sob in the chair, tear streams arcing onto a soaked question card that drips; the hook
//         "Question one: *“how are you?”*" landed. 0.3 record scratch.
//   Q1 "How are you?" → "*sob*"  Q2 "Is that happy crying?" → "SOME of it."
//   the last question (silence): "Who makes you feel safe?" → "…people who ask. like you."  Pisces fountains.
//   THE STARS: "Big feelings come from *a big heart.*"  Hard cut.
import { makeHotSeat, box, R, label, prog, ease, lerp, INK, BONE, RED, SKYB, INTER } from '../../khse01/scenes/hotkit.js'

function soakedCard(x, t, k) {
  x.save(); x.globalAlpha = k; x.translate(730, 760); x.rotate(0.12 + 0.03 * Math.sin(t * 3))
  box(x, -160, -80, 320, 160, '#d9e8ee', { b: 7 })
  R(x, RED, -140, -60, 60, 60); label(x, 'Q1', -110, -30, { size: 30, col: '#fff', font: INTER, weight: 800 })
  label(x, 'how are you?', 50, -24, { size: 30, col: 'rgba(27,18,54,0.6)', font: INTER, weight: 800 })
  for (let i = 0; i < 5; i++) { R(x, 'rgba(120,180,220,0.45)', -130 + i * 60, 20, 30, 40 + (i % 2) * 20) }
  for (let i = 0; i < 4; i++) { const ph = (t * 1.6 + i / 4) % 1; R(x, INK, -100 + i * 70 - 2, 80 + ph * 160 - 2, 14, 18); R(x, SKYB, -100 + i * 70, 80 + ph * 160, 10, 14) }
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse12', sign: 'pisces', name: 'Pisces', accent: '#a9a0ff', seatPisces: true, booth: { sign: 'leo' },
  hook: 'Question one: | *“how are you?”*',
  breakFx: 'scratch', breakAt: 0.3, scratch: 'that was *the easy one.*',
  hero0: { x: 500, y: 1036, s: 300, mood: 'wide', rot: -0.06 },
  frame0(x, t, S) { soakedCard(x, t, S.k) },
  qs: [
    { q: 'How *are you?*', a: '*sob*', mood: 'wide', size: 62 },
    { q: 'Is that *happy* crying?', a: 'SOME of it.', mood: 'sparkle' },
  ],
  final: { q: 'Who makes you *feel safe?*', a: '…people who ask. like you.', mood: 'sparkle', endMood: 'happy' },
  last: 'Big feelings come from *a big heart.*',
  ending: 'cut',
  music: { style: 'cinematic', key: 'Ebm', seed: 3512 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
