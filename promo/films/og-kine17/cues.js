// kine17 score: synthwave, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: chapter 1 (the spiral) · breakdown 17.0: chapter 2 · lift 30.0: chapter 3 (what helps) · lift 53.0: the reply
//   · hits 25.8: FEELING ≠ FACT, 57.15: NORMAL · no end card: the film loops back into frame 0 at 68.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine17', duration: DURATION, music: { style: 'synthwave', key: 'Em', seed: 1317, sections: { drop: 2.6, breakdown: [17.0], lift: [30.0, 53.0], outroAt: DURATION - 1.4 }, hits: [25.8, 57.15] }, cues: CUES }
