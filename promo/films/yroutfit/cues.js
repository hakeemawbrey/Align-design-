// yroutfit score: funk, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the flower crown blooms · breakdown 6.16: the dog-filter panic · lift 6.71: the switch to NOW · hit 13.38: the last line
//   · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
import { musicFor } from './scenes/yrkit.js'
export default { id: 'yroutfit', duration: DURATION, music: musicFor(TIMES, { key: 'E', seed: 1601 }), cues: CUES }
