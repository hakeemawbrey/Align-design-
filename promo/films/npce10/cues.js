// npce10 score: house, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.75: totally! rest up · breakdown 2.75: relief tears · lift 4.2: fountains · hit 5.6: the card cut · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npce10', duration: DURATION, music: { style: 'house', key: 'G', seed: 4810, sections: { drop: 1.75, breakdown: [2.75], lift: [4.2], outroAt: DURATION - 4.4 }, hits: [5.6] }, cues: CUES }
