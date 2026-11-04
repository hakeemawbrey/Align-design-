// ndbe14 score: cinematic, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.2: the second cut-off · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe14', duration: DURATION, music: dealMusic({ style: 'cinematic', key: 'Em', seed: 4114, drop: 1.2 }), cues: CUES }
