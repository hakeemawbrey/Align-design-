// ndbe24 score: dreamy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: Aries pulls on the mitten · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe24', duration: DURATION, music: dealMusic({ style: 'dreamy', key: 'F', seed: 4124, drop: 1.8 }), cues: CUES }
