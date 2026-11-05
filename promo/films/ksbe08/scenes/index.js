// ksbe08: SAY IT BETTER ep 8, "You're overreacting" (♏ Scorpio to ♋ Cancer). screwed · Fm. Hard cut.
//   frame 0: dinner table, Scorpio mid-shrug, "YOU'RE OVERREACTING." slamming, Cancer knocked off the chair.
//   freeze → Cancer: "it *hurt* though." with a HURT meter pinned at max → THE STARS → "That joke landed wrong. Tell me
//   how it *felt*." → Cancer explains → Scorpio: "I'm sorry. that joke's *retired.*"  Pisces sobbing at the next table.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { rect, INK, BONE, RED } from '../../ksbe01/scenes/sbkit.js'
import { prog, ease, clamp } from '../../../src/lib.js'
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 8, room: 'dinner',
  A: { sign: 'scorpio', red: 0.2, mood0: 'eyeroll' }, B: { sign: 'cancer' }, P: { x: 945, y: 1150, s: 150, look: [-1, 0] },
  hook: 'Their feelings aren’t *too much.*', caption: 'the *brush-off.*',
  caught: { x: 264, y: 1150, r: 150 },
  bad: { text: 'You’re *overreacting.*' }, react: 'it *hurt* though.',
  stars: ['you don’t have to agree to *understand*.', 'ask how it *felt*.'],
  better: 'That joke landed wrong. Tell me how it *felt*.',
  replies: ['like you were *laughing at me.*', null], r1X: 640,
  talk: [{ who: 'A', kind: 'say', at: 15.9, out: 17.5, text: 'I’m sorry. that joke’s *retired.*', cx: 420, cy: 870, maxW: 520 }],
  last: 'Understand first. | *Agree* later, maybe.',
  overlay(x, t, w) {
    // the HURT meter over Cancer
    const k = clamp(prog(w, 2.4, 2.7)) * (1 - clamp(prog(w, 4.4, 4.7)))
    if (k <= 0) return
    const X = 700, Y = 1040, W = 300, fillK = ease.outCubic(prog(w, 2.5, 3.1))
    x.save(); x.globalAlpha = k
    rect(x, X - 8, Y - 8, W + 16, 60, INK); rect(x, X, Y, W, 44, '#3a2a5a'); rect(x, X, Y, W * fillK, 44, RED)
    x.font = "800 30px Inter"; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('HURT', X + 12, Y + 23)
    if (fillK > 0.98 && Math.floor(w * 6) % 2) { x.fillStyle = '#ffffff'; x.fillText('MAX', X + W - 80, Y + 23) }
    x.restore()
  },
  cues: [['riser', 2.5, 3.1, 0.04], ['pop', 3.12, 1567.98, 0.04, 0.3]],
})
