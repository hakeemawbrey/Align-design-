// kbne05 score: funk, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 3.0 · lift 8.2 · hit 13.6 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne05', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 5105, sections: { drop: 1.3, breakdown: [3.0], lift: [8.2], outroAt: DURATION - 0.5 }, hits: [13.6] }, cues: CUES }
