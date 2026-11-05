// kbne02 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 2.6 · lift 10.0 · hit 12.7 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne02', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 5102, sections: { drop: 1.3, breakdown: [2.6], lift: [10.0], outroAt: DURATION - 0.5 }, hits: [12.7] }, cues: CUES }
