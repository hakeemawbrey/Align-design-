// ksbe06: SAY IT BETTER ep 6, "Why are you like this?" (♍ Virgo to ♓ Pisces, who is already crying). jazzy · Bb. Hard cut.
//   frame 0: the hallway, the keys mid-flight across the frame, Virgo mid-shriek, Pisces in tears.
//   freeze ("not a *useful* question") → Pisces: "*I don't know!*" → THE STARS → "Okay. Let's find them…"
//   → the keys were in the door the whole time → a little hook goes up by the door; Pisces happy-sobs.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { rect, INK, GOLD } from '../../ksbe01/scenes/sbkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'
function keys(x, X, Y, rot) {
  x.save(); x.translate(X, Y); x.rotate(rot)
  x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 6; x.stroke()
  for (const [dx, c] of [[-14, GOLD], [16, '#c9d3dc']]) { rect(x, dx - 8, 22, 16, 64, INK); rect(x, dx - 4, 26, 8, 56, c); rect(x, dx, 60, 14, 8, c); rect(x, dx, 72, 10, 8, c) }
  x.restore()
}
const FOUND = 13.9, HOOK_UP = 15.9
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 6, room: 'hall',
  A: { sign: 'virgo', red: 0.7, x: 260 }, B: { sign: 'pisces', x: 520 }, P: null,
  hook: 'Lost the keys. *Again.*', caption: 'not a *useful* question.',
  bad: { text: 'Why are you *like this?!*', cy: 700 }, react: '*I don’t know!*', reactX: 560, reactY: 860,
  stars: ['that question has no good *answer*.', 'ask a *useful* one.'],
  better: 'Okay. Let’s find them. Want a *hook* by the door?',
  replies: ['…they were in the *door.*', 'a hook. *I love it.*'], r1X: 600, r2X: 560,
  last: 'Find the keys | *together.*',
  keys: { A: [[FOUND, { mood: 'wide', look: [1, 0] }], [FOUND + 0.8, { mood: 'happy' }], [15.9, { x: 300 }]], B: [[15.9, { x: 620 }]] },
  draw(x, w) {
    // the keys: mid-flight at frame 0, they land … in the keyhole (nobody looks there)
    if (w < 0.55) { const p = ease.outCubic(prog(w, -0.45, 0.55)); keys(x, lerp(300, 892, p), lerp(560, 930, p) - Math.sin(Math.PI * p) * 180, p * 9) }
    else if (w < HOOK_UP) keys(x, 892, 930, 0.1 * Math.sin(w * 2))
    // the hook by the door, then the keys on it
    if (w > HOOK_UP) {
      const k = ease.outBack(prog(w, HOOK_UP, HOOK_UP + 0.35))
      rect(x, 520, 800, 70 * k, 22, INK); rect(x, 526, 806, 58 * k, 10, '#a0522d'); rect(x, 548, 820, 12, 26 * k, INK)
      if (w > HOOK_UP + 0.5) keys(x, 554, 870, 0.15 * Math.sin((w - HOOK_UP) * 5) * Math.exp(-(w - HOOK_UP - 0.5) * 2))
      else keys(x, lerp(892, 554, ease.inOutCubic(prog(w, HOOK_UP + 0.1, HOOK_UP + 0.5))), lerp(930, 870, ease.inOutCubic(prog(w, HOOK_UP + 0.1, HOOK_UP + 0.5))), 0)
    }
  },
  cues: [['tick', 0.5, 0.08], ['pluck', 0.52, 1567.98, 0.03, 0.3, 0.4], ['pop', FOUND, 1318.51, 0.04, 0.3], ['tick', HOOK_UP + 0.5, 0.07], ['pluck', HOOK_UP + 0.52, 1567.98, 0.03, 0.3, 0]],
})
