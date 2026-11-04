// npce08 score: synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.1: the leaf unrolls · breakdown 2.75: in December · lift 4.3: fountains · hit 5.6: the card cut · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npce08', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 4808, sections: { drop: 1.1, breakdown: [2.75], lift: [4.3], outroAt: DURATION - 4.4 }, hits: [5.6] }, cues: CUES }
