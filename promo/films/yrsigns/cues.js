// yrsigns score: funk, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the first finger-gun ask · breakdown 6.16: "knew it." to a plant · lift 6.71: the switch to NOW · hit 13.38: the last line
//   · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
import { musicFor } from './scenes/yrkit.js'
export default { id: 'yrsigns', duration: DURATION, music: musicFor(TIMES, { key: 'F', seed: 1702 }), cues: CUES }
