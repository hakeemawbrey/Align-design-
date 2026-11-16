// st4miami score — house, F#m, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.27: the box opens as the travellers roll past · breakdown 6.55: the luggage tag flips up · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4miami', duration: DURATION, music: { style: 'house', key: 'F#m', seed: 578, sections: { drop: 2.27, breakdown: 6.55, outroAt: DURATION - 4.4 } }, cues: CUES }
