// nole08 score: synthwave, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4: FINE?? · lift at the cut into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole08', duration: DURATION, music: { style: 'synthwave', key: 'Cm', seed: 4208, sections: { drop: 1.4, lift: [CUT], outroAt: DURATION - 2.4 }, hits: [CUT] }, cues: CUES }
