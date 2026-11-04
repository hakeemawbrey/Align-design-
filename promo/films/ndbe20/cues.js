// ndbe20 score: jazzy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.2: the questions pile up · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe20', duration: DURATION, music: dealMusic({ style: 'jazzy', key: 'Eb', seed: 4120, drop: 1.2 }), cues: CUES }
