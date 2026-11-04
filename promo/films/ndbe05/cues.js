// ndbe05 score: funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.2: the second flash · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe05', duration: DURATION, music: dealMusic({ style: 'funk', key: 'E', seed: 4105, drop: 1.2 }), cues: CUES }
