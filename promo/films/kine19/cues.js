// kine19 score: dreamy, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: chapter 1 (the drift) · breakdown 16.5: chapter 2 · lift 30.0: the check-in · lift 46.5: the verdict
//   · hits 48.75: NORMAL, 53.6: the re-knotted bracelets · no end card: the film loops back into frame 0 at 60.4.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine19', duration: DURATION, music: { style: 'dreamy', key: 'A', seed: 1319, sections: { drop: 2.6, breakdown: [16.5], lift: [30.0, 46.5], outroAt: DURATION - 1.4 }, hits: [48.75, 53.6] }, cues: CUES }
