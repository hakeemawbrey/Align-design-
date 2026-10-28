// st4chicago score — jazzy, Eb, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.27: the box opens on the deadline line · breakdown 6.35: the calendar riffles to July · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4chicago', duration: DURATION, music: { style: 'jazzy', key: 'Eb', seed: 377, sections: { drop: 2.27, breakdown: 6.35, outroAt: DURATION - 4.4 } }, cues: CUES }
