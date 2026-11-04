// ndbe02 score: cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: the date: "ugh. hurry UP." · breakdown 3.9: the vote · lift + hit 6.1: the stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
import { dealMusic } from '../ndbe01/scenes/dealkit.js'
export default { id: 'ndbe02', duration: DURATION, music: dealMusic({ style: 'cinematic', key: 'Dm', seed: 4102, drop: 1.6 }), cues: CUES }
