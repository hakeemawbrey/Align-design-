// ksge15 score: funk, A (arranged by the style engine in promo/scripts/teaser-sound.mjs). 
//   drop 0.62: the premise lands · breakdown 3.65: the record-scratch freeze (sudden quiet) · lift 6.05: the green flag.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksge15', duration: DURATION, music: { style: 'funk', key: 'A', seed: 3215, sections: { drop: 0.62, breakdown: [3.65], lift: [6.05], outroAt: DURATION - 0.5 }, hits: [6.05] }, cues: CUES }
