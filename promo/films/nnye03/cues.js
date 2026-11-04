// nnye03 score: chiptune, E. drop 2.45: LEAVING · breakdown 6.6: KEEPING · lift 10.85: same heart · hit 9.65: the lid.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nnye03', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 3703, sections: { drop: 2.45, breakdown: [6.6], lift: [10.85], outroAt: DURATION - 2.4 }, hits: [9.65] }, cues: CUES }
