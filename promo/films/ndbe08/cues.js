// ndbe08 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.7: the price tag swings · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe08', duration: DURATION, music: dealMusic({ style: 'cinematic', key: 'Cm', seed: 4108, drop: 1.7 }), cues: CUES }
