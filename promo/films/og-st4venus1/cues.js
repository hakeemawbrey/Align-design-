// st4venus1 score — dreamy, Eb, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Venus starts talking · lift 9.75: the talk card flips · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4venus1', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 233, sections: { drop: 2.82, lift: 9.75, outroAt: DURATION - 4.4 } }, cues: CUES }
