// ndbe07 score: jazzy, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.5: the menus multiply · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe07', duration: DURATION, music: dealMusic({ style: 'jazzy', key: 'Bb', seed: 4107, drop: 1.5 }), cues: CUES }
