// stwontgiveup score — dreamy, E major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: airy pads under the star's rant · drop 3.93: the moon snaps full, the groove floats in · 24.3 record scratch,
//   then real silence (chained tape stops) under the dog and the pats · breakdown from 24.49: the punchline, the deflate,
//   plan B · build → lift 39.49: you look up (crash) · breakdown 43.93: ★ LESSON UNLOCKED (the level-up on top) ·
//   lift 48.38: tonight's deck, the phone rings · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stwontgiveup', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 16, sections: { drop: T.drop, breakdown: [24.489, T.lesson], lift: [T.lookUp, 48.378], outroAt: DURATION - 4.4 }, hits: [T.lookUp] }, cues: CUES }
