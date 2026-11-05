// kaue05 score: funk, A. drop 2.2 (the card) · lift 5.6 (the shoot). Loops at 15 s.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kaue05', duration: DURATION, music: { style: 'funk', key: 'A', seed: 705, sections: { drop: 2.2, lift: 5.6, outroAt: DURATION - 1.0 } }, cues: CUES }
