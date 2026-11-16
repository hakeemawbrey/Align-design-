// og-ksbe08: the social rework of ksbe08 (same room, cast and story). Static HOOK (outline, 0–2.4) instead of the slam title;
//   kit: ./sbkit.js + ./sbshort.js (og social copies: no series bug, calm freeze card, no whip/shake, hard cut, text in the
//   safe zone); crazier Scorpio (shrugged so hard it echoed; buries the joke forever) and Cancer (already wrote a poem about the hurt); Pisces moved up onto the wall by the window (was off the right edge).
// Original notes (ksbe08): "You're overreacting" (♏ Scorpio to ♋ Cancer). screwed · Fm. Hard cut.
//   frame 0: dinner table, Scorpio mid-shrug, "YOU'RE OVERREACTING." slamming, Cancer knocked off the chair.
//   freeze → Cancer: "it *hurt* though." with a HURT meter pinned at max → THE STARS → "That joke landed wrong. Tell me
//   how it *felt*." → Cancer explains → Scorpio: "I'm sorry. that joke's *retired.*"  Pisces sobbing at the next table.
import { makeShort } from './sbshort.js'
import { rect, INK, BONE, RED } from './sbkit.js'
import { prog, ease, clamp } from '../../../src/lib.js'
export const { DURATION, SCENES, CUES } = makeShort({
  room: 'dinner',
  A: { sign: 'scorpio', red: 0.2, mood0: 'eyeroll' }, B: { sign: 'cancer' }, P: { x: 780, y: 600, s: 120, look: [-1, 1] },
  caption: 'Scorpio shrugged so hard it *echoed.*',
  caught: { x: 264, y: 1150, r: 150 },
  bad: { text: 'You’re *overreacting.*' }, react: 'it *hurt.* I wrote a poem about it.',
  stars: ['you don’t have to agree to *understand*.', 'ask how it *felt*.'],
  better: 'That joke landed wrong. Tell me how it *felt*.',
  replies: ['like you were *laughing at me.*', null], r1X: 640,
  talk: [{ who: 'A', kind: 'say', at: 15.9, out: 17.5, text: 'I’m sorry. that joke is *buried.* forever.', cx: 420, cy: 870, maxW: 520 }],
  last: 'Understand first. | *Agree* later, maybe.',
  overlay(x, t, w) {
    // the HURT meter over Cancer
    const k = clamp(prog(w, 2.4, 2.7)) * (1 - clamp(prog(w, 4.4, 4.7)))
    if (k <= 0) return
    const X = 620, Y = 1040, W = 300, fillK = ease.outCubic(prog(w, 2.5, 3.1))
    x.save(); x.globalAlpha = k
    rect(x, X - 8, Y - 8, W + 16, 60, INK); rect(x, X, Y, W, 44, '#3a2a5a'); rect(x, X, Y, W * fillK, 44, RED)
    x.font = "800 30px Inter"; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('HURT', X + 12, Y + 23)
    if (fillK > 0.98 && Math.floor(w * 6) % 2) { x.fillStyle = '#ffffff'; x.fillText('MAX', X + W - 80, Y + 23) }
    x.restore()
  },
  cues: [['riser', 2.5, 3.1, 0.04], ['pop', 3.12, 1567.98, 0.04, 0.3]],
})

// social hook: static caption from frame 0 (the film's own slam title is dropped by the social kit copy)
export const HOOK = 'Your feelings are | not *too much.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
