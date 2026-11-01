// trtellscorpio score: pop, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.1: tell 1's jump cut · breakdown 7.6: the twisted third tell · lift 11.35: the stamp · hit 11.35 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trtellscorpio', duration: DURATION, music: { style: 'pop', key: 'Eb', seed: 403, sections: { drop: 2.1, breakdown: [7.6], lift: [11.35], outroAt: DURATION - 4.4 }, hits: [11.35] }, cues: CUES }
