// og-khse11: OG social cut of khse11. Static HOOK (box) "Aquarius went quiet. | *For a month.*" from frame 0 instead of
//   the slam title; no ZODIAC HOT SEAT bug, no pattern break, no flash, ends on THE STARS' last line (hard cut);
//   crazier answers. Kit: ./hotkit.js (social copy of ../../khse01/scenes/hotkit.js). Original notes:
// "Aquarius is above the hot seat" (trial reel, loops). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Aquarius floating upside down high above an empty chair, the spotlight mid-search; the hook
//         "Aquarius is *above* the hot seat." landed. 0.3 glitch. 1.05–1.5 it flips and drops into the seat.
//   Q1 "Feelings, out of 10?" → "can I answer in theory?"  Q2 "Say 'I miss you' out loud?" → "…I'll type it."
//   the last question (silence): "What do you need from people?" → "…to stay when I go quiet."
//   THE STARS: "Quiet isn't gone. *Tell them that.*"  Loops back to the upside-down float.
import { makeHotSeat, prog, ease, lerp } from './hotkit.js'

const EP = makeHotSeat({
  id: 'khse11', sign: 'aquarius', name: 'Aquarius', accent: '#7fd0ff',
  hook: 'Aquarius is *above* | the hot seat.',
  breakFx: 'glitch', breakAt: 0.3,
  hero0: { x: 600, y: 770, s: 270, mood: 'happy', rot: Math.PI, look: [0, 1] },
  spot: t => { const k = ease.inOutCubic(prog(t, 2.1, 2.6)); return { x: lerp(540 + 260 * Math.sin(t * 2.5), 540, k), tx: lerp(120, 0, k), w: 600 } },
  qs: [
    { q: 'Feelings, *out of 10?*', a: 'I’d need a peer-reviewed scale.', mood: 'squint' },
    { q: 'Say “I miss you” *out loud?*', a: '…I’ll beam it from orbit.', mood: 'neutral' },
  ],
  final: { q: 'What do you need *from people?*', a: '…to stay when I go quiet.', mood: 'neutral', endMood: 'happy' },
  last: 'Quiet isn’t gone. *Tell them that.*',
  ending: 'loop',
  music: { style: 'synthwave', key: 'Ebm', seed: 3511 },
})
export const { DURATION, SCENES, CUES, T, META } = EP

export const HOOK = 'Aquarius went quiet. | *For a month.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
