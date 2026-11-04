// ndbe18 score: lofi, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4: snacks, checked · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe18', duration: DURATION, music: dealMusic({ style: 'lofi', key: 'C', seed: 4118, drop: 1.4 }), cues: CUES }
