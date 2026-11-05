// kbne09 score: pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 2.6 · lift 10.2 · hit 13.6 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne09', duration: DURATION, music: { style: 'pop', key: 'D', seed: 5109, sections: { drop: 1.3, breakdown: [2.6], lift: [10.2], outroAt: DURATION - 0.5 }, hits: [13.6] }, cues: CUES }
