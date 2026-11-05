// kroe01 score: pop, D (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end and loops.
//   drop 1.15: the scratch lets go · breakdown 3.1: the red pen · lift 5.3: the new score · hit 5.3.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kroe01', duration: DURATION, music: { style: 'pop', key: 'D', seed: 3701, sections: { drop: 1.15, breakdown: [3.1], lift: [5.3], outroAt: DURATION - 0.5 }, hits: [5.3] }, cues: CUES }
