// kpvee09 score: synthwave, Bm (style engine in promo/scripts/teaser-sound.mjs). Loops (24 s).
//   drop 0.78: Venus lands · breakdown 2.9: the record scratch · lift 15.2: the beanbag · hit 21.0: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee09', duration: DURATION, music: { style: 'synthwave', key: 'Bm', seed: 4109, sections: { drop: 0.78, breakdown: [2.9], lift: [15.2], outroAt: DURATION - 0.3 }, hits: [21.0] }, cues: CUES }
