// kbne01 score: pop, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.35: the phone · breakdown 2.35: the record-scratch freeze · lift 7.6: Pisces · hit 13.85: the last headline.
//   No end card: the music runs to the hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne01', duration: DURATION, music: { style: 'pop', key: 'E', seed: 5101, sections: { drop: 1.35, breakdown: [2.35], lift: [7.6], outroAt: DURATION - 0.5 }, hits: [13.85] }, cues: CUES }
