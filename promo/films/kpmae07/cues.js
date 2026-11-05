// kpmae07 score: house, C (style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.1: the party thaws · breakdown 9.8: the record-scratch freeze · lift 17.8: "hi" · hit 23.6. Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae07', duration: DURATION, music: { style: 'house', key: 'C', seed: 5707, sections: { drop: 1.1, breakdown: [9.8], lift: [17.8], outroAt: DURATION - 0.6 }, hits: [23.7] }, cues: CUES }
