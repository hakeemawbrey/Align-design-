// kaue01 score: chiptune, E. drop 2.9 (the first achievement) · lift 9.6 (the whole booth).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kaue01', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 701, sections: { drop: 2.9, lift: 9.6, outroAt: DURATION - 1.2 } }, cues: CUES }
