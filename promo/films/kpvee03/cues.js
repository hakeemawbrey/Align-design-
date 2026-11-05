// kpvee03 score: pop, G (style engine in promo/scripts/teaser-sound.mjs). Loops (20.5 s).
//   drop 0.4: Venus lands · breakdown 8.0: the draft · lift 13.0: SENT · hit 18.4: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee03', duration: DURATION, music: { style: 'pop', key: 'G', seed: 4103, sections: { drop: 0.4, breakdown: [8.0], lift: [13.0], outroAt: DURATION - 0.3 }, hits: [18.4] }, cues: CUES }
