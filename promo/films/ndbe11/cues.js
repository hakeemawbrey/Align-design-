// ndbe11 score: screwed, Ebm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4: "who's THAT?" · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe11', duration: DURATION, music: dealMusic({ style: 'screwed', key: 'Ebm', seed: 4111, drop: 1.4 }), cues: CUES }
