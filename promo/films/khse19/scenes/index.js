// khse19: ZODIAC HOT SEAT, breakup round: Libra (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Libra mid-gasp as a big card flips over "WHO ENDED IT?", the chair tipping back; the hook
//         "Libra. *The breakup* questions." landed. 0.3 record scratch.
//   Q1 "Still friends?" → "with everyone. even their mum."  Q2 "Who got the friends?" → "we share them!"
//   the last question (silence): "Were you okay?" → "…no. I didn't want to make it weird."
//   THE STARS: "Your hurt isn't *making it weird.*"  Hard cut.
import { makeHotSeat, box, label, prog, ease, lerp, BONE, RED, INTER } from '../../khse01/scenes/hotkit.js'

function flipCard(x, t, k) {
  const f = prog(t, -0.6, 0.15), sx = Math.abs(Math.cos(Math.PI * f))
  x.save(); x.globalAlpha = k; x.translate(560, 720); x.scale(Math.max(0.04, sx), 1); x.rotate(-0.06)
  if (f < 0.5) { box(x, -220, -100, 440, 200, '#3a2d66', { b: 7 }) }
  else { box(x, -220, -100, 440, 200, BONE, { b: 7 }); label(x, 'WHO', 0, -38, { size: 60, col: RED, font: INTER, weight: 800 }); label(x, 'ENDED IT?', 0, 36, { size: 60, col: RED, font: INTER, weight: 800 }) }
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse19', sign: 'libra', name: 'Libra', accent: '#ff9fc4',
  hook: 'Libra. | *The breakup* questions.',
  breakFx: 'scratch', breakAt: 0.3, scratch: 'it was *mutual.* mostly.',
  chair: { tip: t => -0.16 * (1 - ease.inOutCubic(prog(t, 1.05, 1.5))) },
  hero0: { x: 520, y: 1020, s: 290, mood: 'wide', rot: -0.16, look: [0, -1] },
  frame0(x, t, S) { flipCard(x, t, S.k) },
  qs: [
    { q: 'Still *friends?*', a: 'with everyone. even their mum.', mood: 'happy' },
    { q: 'Who got *the friends?*', a: 'we share them!', mood: 'sparkle' },
  ],
  final: { q: 'Were you *okay?*', a: '…no. I didn’t want to make it weird.', mood: 'neutral', endMood: 'happy', size: 44 },
  last: 'Your hurt isn’t *making it weird.*',
  ending: 'cut',
  music: { style: 'funk', key: 'Bb', seed: 3519 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void lerp
