// khse20: ZODIAC HOT SEAT, missing your ex round: Scorpio (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Scorpio mid-snatch of its phone away from its own thumb, the contact on screen saved as "DON'T";
//         the hook "Contact name: *“DON'T.”*" landed. 0.3 record scratch.
//   Q1 "Miss them?" → "no."  Q2 "Be honest." → "…a little."
//   the last question (silence): "What do you actually miss?" → "…being known."
//   THE STARS: "Miss the feeling. *Find it again.*"  Hard cut.
import { makeHotSeat, phone, R, prog, ease, lerp, BONE, RED, MINT } from '../../khse01/scenes/hotkit.js'

function dontPhone(x, t, cx, cy, rot, s) {
  phone(x, cx, cy, rot, X => {
    X.fillStyle = '#5a4a9a'; X.beginPath(); X.arc(0, -50, 26, 0, Math.PI * 2); X.fill()
    X.textAlign = 'center'; X.font = "800 26px Inter, sans-serif"; X.fillStyle = BONE; X.fillText('DON’T', 0, 6)
    R(X, MINT, -44, 40, 36, 36); R(X, RED, 8, 40, 36, 36)
  }, { s, glow: 0.8 })
}

const EP = makeHotSeat({
  id: 'khse20', sign: 'scorpio', name: 'Scorpio', accent: '#ff5c7a',
  hook: 'Contact name: | *“DON’T.”*',
  breakFx: 'scratch', breakAt: 0.3, scratch: 'past me *saw this coming.*',
  hero0: { x: 500, y: 1036, s: 290, mood: 'wide', rot: -0.1, look: [1, -0.2] },
  props(x, t, S) {
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    const yank = ease.outBack ? 0 : 0
    dontPhone(x, t, lerp(760, 770, k) + yank + 14 * k * Math.sin(t * 30), lerp(1130, 860, k), lerp(0.6, -0.25, k), lerp(0.45, 1.15, k))
  },
  qs: [
    { q: 'Miss *them?*', a: 'no.', mood: 'neutral', size: 62 },
    { q: 'Be *honest.*', a: '…a little.', mood: 'squint' },
  ],
  final: { q: 'What do you *actually* miss?', a: '…being known.', mood: 'neutral', endMood: 'happy' },
  last: 'Miss the feeling. *Find it again.*',
  ending: 'cut',
  music: { style: 'cinematic', key: 'Dm', seed: 3520 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
