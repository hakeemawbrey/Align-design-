// kcie02 score: pop, F. The beat drops after the record scratch (2.05); a loop: the music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie02', duration: DURATION, music: { style: 'pop', key: 'F', seed: 2102, sections: { drop: 2.05, breakdown: [5.3], lift: [8.1], outroAt: DURATION - 0.5 } }, cues: CUES }
