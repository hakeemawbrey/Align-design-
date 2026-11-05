// kaue16 score: chiptune, D. drop 2.5 (level 1) · breakdown 40 (the side quest) · lift 50 (the boss).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kaue16', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 716, sections: { drop: 2.5, breakdown: [40.0], lift: [50.0], outroAt: DURATION - 1.5 }, hits: [51.6, 62.0] }, cues: CUES }
