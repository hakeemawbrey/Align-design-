// ksge21 score: funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs). 
//   drop 0.62: the premise lands · breakdown 3.65: the record-scratch freeze (sudden quiet) · lift 6.05: the green flag.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksge21', duration: DURATION, music: { style: 'funk', key: 'E', seed: 3221, sections: { drop: 0.62, breakdown: [3.65], lift: [6.05], outroAt: DURATION - 0.5 }, hits: [6.05] }, cues: CUES }
