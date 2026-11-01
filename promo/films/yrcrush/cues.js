// yrcrush score: funk, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: slide 1 · breakdown 6.16: the blurry head, Aries snoring · lift 6.71: the switch to brunch · hit 13.38: the last line
//   · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
import { musicFor } from './scenes/yrkit.js'
export default { id: 'yrcrush', duration: DURATION, music: musicFor(TIMES, { key: 'G', seed: 1803 }), cues: CUES }
