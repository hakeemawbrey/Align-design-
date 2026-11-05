// ksre14 score: chiptune, G. drop 1.2: the rewind · breakdown 5.0: game over again · lift 7.0: the friends drop in · hit 10.2: new save.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre14', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 3114, sections: { drop: 1.2, breakdown: [5.0], lift: [7.0], outroAt: DURATION - 0.9 }, hits: [10.2] }, cues: CUES }
