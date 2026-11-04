// ndbe17 score: house, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.0: the chorus · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe17', duration: DURATION, music: dealMusic({ style: 'house', key: 'A', seed: 4117, drop: 1.0 }), cues: CUES }
