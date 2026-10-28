// st4lonestar score — cinematic, Eb, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.27: the lone star looks around · breakdown 7.7: the road-trip stops light up · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4lonestar', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 601, sections: { drop: 2.27, breakdown: 7.7, outroAt: DURATION - 4.4 } }, cues: CUES }
