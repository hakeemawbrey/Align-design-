// ndbe23 score: synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the moss appears · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe23', duration: DURATION, music: dealMusic({ style: 'synthwave', key: 'F#m', seed: 4123, drop: 1.8 }), cues: CUES }
