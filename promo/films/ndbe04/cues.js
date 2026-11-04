// ndbe04 score: dreamy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.7: the receipt unrolls · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe04', duration: DURATION, music: dealMusic({ style: 'dreamy', key: 'Eb', seed: 4104, drop: 1.7 }), cues: CUES }
