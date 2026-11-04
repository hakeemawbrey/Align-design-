// npce12 score: cinematic, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.0: YOU · breakdown 2.75: yes, you · lift 4.2: fountains · hit 5.6: the flash cut · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npce12', duration: DURATION, music: { style: 'cinematic', key: 'C', seed: 4812, sections: { drop: 1.0, breakdown: [2.75], lift: [4.2], outroAt: DURATION - 2.4 }, hits: [5.6] }, cues: CUES }
