// st5twins score — pop, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.0: Sag's eyes shatter · lift 9.45: the twin pops up · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st5twins', duration: DURATION, music: { style: 'pop', key: 'G', seed: 544, sections: { drop: 5.0, lift: 9.45, outroAt: DURATION - 4.4 } }, cues: CUES }
