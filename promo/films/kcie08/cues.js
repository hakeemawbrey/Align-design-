// kcie08 score: house, C. The beat drops after the record scratch (2.05); a loop: the music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie08', duration: DURATION, music: { style: 'house', key: 'C', seed: 2108, sections: { drop: 2.05, breakdown: [8.05], lift: [9.05], outroAt: DURATION - 0.5 } }, cues: CUES }
