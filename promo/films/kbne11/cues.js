// kbne11 score: funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 2.5 · lift 10.2 · hit 13.6 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne11', duration: DURATION, music: { style: 'funk', key: 'E', seed: 5111, sections: { drop: 1.3, breakdown: [2.5], lift: [10.2], outroAt: DURATION - 0.5 }, hits: [13.6] }, cues: CUES }
