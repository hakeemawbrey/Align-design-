// nrke18 score: pop, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the first rank slams in · breakdown 8.5: the drumroll · lift 9.3: #1 · hit 9.3 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nrke18', duration: DURATION, music: { style: 'pop', key: 'G', seed: 4020, sections: { drop: 1.8, breakdown: [8.5], lift: [9.3], outroAt: DURATION - 2.4 }, hits: [9.3] }, cues: CUES }
