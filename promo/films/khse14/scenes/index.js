// khse14: ZODIAC HOT SEAT, left on read round: Taurus (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Taurus mid-stare at a phone held up close: "Read 2:14 PM", a snail mid-crawl across the screen; the
//         hook "Read at 2:14. *It's now 9.*" landed. 0.3 record scratch.
//   Q1 "Checked again?" → "no." (caught in 4K: the phone is up again)  Q2 "Rewrote your text in your head?" → "eleven times."
//   the last question (silence): "What do you tell yourself?" → "…that it's about me."
//   THE STARS: "A slow reply is *just slow.*"  Hard cut.
import { makeHotSeat, HK, phone, R, label, prog, ease, lerp, BONE, INK, MONO } from '../../khse01/scenes/hotkit.js'

function readPhone(x, t, cx, cy, rot, s) {
  phone(x, cx, cy, rot, X => {
    R(X, '#3a6bd8', -40, -70, 90, 34); R(X, BONE, -50, -20, 80, 30)
    X.font = "700 14px 'Space Mono', monospace"; X.textAlign = 'right'; X.fillStyle = 'rgba(239,230,214,0.8)'; X.fillText('Read 2:14 PM', 52, 30)
    // the snail
    const sx = -50 + ((t * 18) % 110)
    X.fillStyle = '#e8b4c8'; X.fillRect(sx, 70, 22, 8); X.fillStyle = '#c98b5a'; X.beginPath(); X.arc(sx + 14, 66, 9, 0, Math.PI * 2); X.fill()
  }, { s, glow: 0.7 })
}
const CAUGHT = { at: 2.25, x: 640, y: 980, r: 160, out: [2.9, 3.0], label: 'CHECKING', arrow: 'tr' }

const EP = makeHotSeat({
  id: 'khse14', sign: 'taurus', name: 'Taurus', accent: '#9ccf6a',
  hook: 'Read at 2:14. | *It’s now 9.*',
  breakFx: 'scratch', breakAt: 0.3, scratch: '*seven hours* of “it’s fine.”',
  fx: [[HK.caught, HK.caughtCues, CAUGHT]],
  hero0: { x: 520, y: 1036, s: 290, mood: 'wide', look: [1, -0.3] },
  props(x, t, S, P) {
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    const peek = ease.inOutCubic(prog(t, S.T.qs[0] + 0.6, S.T.qs[0] + 0.8)) * (1 - ease.inOutCubic(prog(t, S.T.qs[1] - 0.2, S.T.qs[1])))
    const up = Math.max(k, peek)
    readPhone(x, t, lerp(760, 650, up), lerp(1130, 960, up), lerp(0.5, 0.1, up), lerp(0.5, 0.8, up))
  },
  qs: [
    { q: 'Checked *again?*', a: 'no.', mood: 'neutral', size: 62 },
    { q: 'Rewrote your text *in your head?*', a: 'eleven times.', mood: 'squint' },
  ],
  final: { q: 'What do you *tell yourself?*', a: '…that it’s about me.', mood: 'neutral', endMood: 'happy' },
  last: 'A slow reply is *just slow.*',
  ending: 'cut',
  music: { style: 'lofi', key: 'Am', seed: 3514 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void [label, INK, MONO]
