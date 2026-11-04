// npce07 score: cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4: last dec. · breakdown 2.9: the friends pop in · lift 4.4: fountains · hit 5.6: the flash cut · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npce07', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 4807, sections: { drop: 1.4, breakdown: [2.9], lift: [4.4], outroAt: DURATION - 2.4 }, hits: [5.6] }, cues: CUES }
