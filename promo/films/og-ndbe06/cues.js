// ndbe06 score: screwed, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: the date laughs · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from './scenes/dealkit.js'
export default { id: 'og-ndbe06', duration: DURATION, music: dealMusic({ style: 'screwed', key: 'Fm', seed: 4106, drop: 1.6 }), cues: CUES }
