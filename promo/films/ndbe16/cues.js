// ndbe16 score: chiptune, B (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.3: the door opens · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe16', duration: DURATION, music: dealMusic({ style: 'chiptune', key: 'B', seed: 4116, drop: 1.3 }), cues: CUES }
