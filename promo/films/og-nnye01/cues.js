// og-nnye01: social cut of nnye01 (sound: the og kit drops the word-pop bursts and the lid boom).
// nnye01 score: pop, C. drop 2.45: LEAVING · breakdown 6.6: KEEPING · lift 10.85: same heart · hit 9.65: the lid.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-nnye01', duration: DURATION, music: { style: 'pop', key: 'C', seed: 3701, sections: { drop: 2.45, breakdown: [6.6], lift: [10.85], outroAt: DURATION - 2.4 }, hits: [9.65] }, cues: CUES }
