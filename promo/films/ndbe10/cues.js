// ndbe10 score: lofi, Ab (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the lamp clicks off · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe10', duration: DURATION, music: dealMusic({ style: 'lofi', key: 'Ab', seed: 4110, drop: 1.8 }), cues: CUES }
