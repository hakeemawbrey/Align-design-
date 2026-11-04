// nmue10 score: synthwave, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: the ok. spiral · breakdown 9.6: the cut into the move · lift 17.2: the try · hit 21.0: the heart mends · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nmue10', duration: DURATION, music: { style: 'synthwave', key: 'Cm', seed: 3110, sections: { drop: 3.0, breakdown: [9.6], lift: [17.2], outroAt: DURATION - 2.4 }, hits: [21.0] }, cues: CUES }
