// ndbe19 score: cinematic, Bbm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.5: "your turn to text first." · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe19', duration: DURATION, music: dealMusic({ style: 'cinematic', key: 'Bbm', seed: 4119, drop: 1.5 }), cues: CUES }
