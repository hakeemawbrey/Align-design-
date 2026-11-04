// ndbe01 score: pop, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.75: Aries snaps the ribbon · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from './scenes/dealkit.js'
export default { id: 'ndbe01', duration: DURATION, music: dealMusic({ style: 'pop', key: 'C', seed: 4101, drop: 1.75 }), cues: CUES }
