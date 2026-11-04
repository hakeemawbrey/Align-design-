// ndbe21 score: pop, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.8: the big laugh · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe21', duration: DURATION, music: dealMusic({ style: 'pop', key: 'F', seed: 4121, drop: 0.8 }), cues: CUES }
