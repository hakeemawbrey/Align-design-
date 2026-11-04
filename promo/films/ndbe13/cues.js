// ndbe13 score: funk, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.3: DATE 2 · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe13', duration: DURATION, music: dealMusic({ style: 'funk', key: 'G', seed: 4113, drop: 1.3 }), cues: CUES }
