// ndbe03 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: the third bubble lands · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe03', duration: DURATION, music: dealMusic({ style: 'chiptune', key: 'A', seed: 4103, drop: 1.6 }), cues: CUES }
