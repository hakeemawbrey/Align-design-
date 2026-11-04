// nt2e50 score: chiptune, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.1: explanation 1 · breakdown 7.6: the accidentally wise third · lift 11.35: the stamp · hit 11.35 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nt2e50', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 5001, sections: { drop: 2.1, breakdown: [7.6], lift: [11.35], outroAt: DURATION - 4.4 }, hits: [11.35] }, cues: CUES }
