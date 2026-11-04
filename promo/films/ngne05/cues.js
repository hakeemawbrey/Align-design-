// ngne05 score: chiptune, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: round 1 · breakdown 17.8: round 3 · lift 25.2: the finale · hit 25.2 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ngne05', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 705, sections: { drop: 3.0, breakdown: [17.8], lift: [25.2], outroAt: DURATION - 4.4 }, hits: [25.2] }, cues: CUES }
