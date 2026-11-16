// st4nashville score — pop, G, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the stars start talking · lift 7.27: the tambourine joins and the notes go up · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4nashville', duration: DURATION, music: { style: 'pop', key: 'G', seed: 81, sections: { drop: 2.82, lift: 7.27, outroAt: DURATION - 4.4 } }, cues: CUES }
