// naske30 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: the first answer · breakdown 8.8: beat 3 · lift 12.6: the last line · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'naske30', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 2630, sections: { drop: 3.0, breakdown: [8.8], lift: [12.6], outroAt: DURATION - 4.4 }, hits: [12.62] }, cues: CUES }
