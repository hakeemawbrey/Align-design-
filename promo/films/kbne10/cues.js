// kbne10 score: chiptune, C (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 3.6 · lift 7.6 · hit 10.2 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne10', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 5110, sections: { drop: 1.3, breakdown: [3.6], lift: [7.6], outroAt: DURATION - 0.5 }, hits: [10.2] }, cues: CUES }
