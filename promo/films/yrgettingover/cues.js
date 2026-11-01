// yrgettingover score: funk, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the player clicks on · breakdown 6.16: 99+ plays, curtains shut · lift 6.71: morning light · hit 13.38: the last line
//   · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
import { musicFor } from './scenes/yrkit.js'
export default { id: 'yrgettingover', duration: DURATION, music: musicFor(TIMES, { key: 'A', seed: 1904 }), cues: CUES }
