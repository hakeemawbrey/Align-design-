// yrcompat score: funk, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the pencil starts circling · breakdown 6.16: the SOULMATES stamp lands · lift 6.71: the reading together · hit 13.38: the last line
//   · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
import { musicFor } from './scenes/yrkit.js'
export default { id: 'yrcompat', duration: DURATION, music: musicFor(TIMES, { key: 'Bb', seed: 2005 }), cues: CUES }
