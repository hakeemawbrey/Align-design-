// khse21: ZODIAC HOT SEAT, flaky friend round: Sagittarius (trial reel, loops). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Sag mid-send of a "can't make it!!" text that flies across the stage, three friend stars drooping
//         at the edge; the hook "Sag cancelled. *Third time.*" landed. 0.3 a notification drops: "Leo: *again?*"
//   Q1 "Why'd you cancel?" → "something came up!"  Q2 "What came up?" → "…the couch."
//   the last question (silence): "What would you tell them?" → "…I miss you. sorry. Thursday?"
//   THE STARS: "Show up *small.* It still counts."  Loops back to the flying text.
import { makeHotSeat, HK, drawStarChar, signStar, bubbleK, prog, ease, lerp } from '../../khse01/scenes/hotkit.js'

const NOTE = { at: 0.3, out: [1.25, 1.45], title: 'messages', body: 'Leo: *again?*', glyph: '♌︎', time: 'now', y: 1330 }
const FRIENDS = ['leo', 'aries', 'libra']

const EP = makeHotSeat({
  id: 'khse21', sign: 'sagittarius', name: 'Sagittarius', accent: '#c98bff',
  hook: 'Sag cancelled. | *Third time.*',
  breakFx: 'none', fx: [[HK.notification, HK.notificationCues, NOTE]],
  hero0: { x: 480, y: 1036, s: 290, mood: 'squint', rot: -0.05, look: [1, -0.3] },
  frame0(x, t, S) {
    const p = (t + 0.4) / 1.6
    bubbleK(x, lerp(520, 900, Math.min(1, p)), lerp(820, 700, Math.min(1, p)), S.k, 'can’t make it!!', { size: 40, col: '#c9f2d4', tail: -0.6 })
    FRIENDS.forEach((s, i) => { const C = signStar(s); x.save(); x.globalAlpha = S.k; drawStarChar(x, 820 + (i - 1) * 80, 1160 + (i % 2) * 20, 110, t, { color: C.color, mood: 'neutral', look: [-1, 1], seed: i + 4, glow: 0.5, squash: 0.08 }); x.restore() })
  },
  qs: [
    { q: 'Why’d you *cancel?*', a: 'something came up!', mood: 'happy' },
    { q: 'What *came up?*', a: '…the couch.', mood: 'squint' },
  ],
  final: { q: 'What would you *tell them?*', a: '…I miss you. sorry. Thursday?', mood: 'neutral', endMood: 'happy' },
  last: 'Show up *small.* It still counts.',
  ending: 'loop',
  music: { style: 'chiptune', key: 'A', seed: 3521 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void ease; void prog
