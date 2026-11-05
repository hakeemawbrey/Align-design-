// ksre06 score: chiptune, B. drop 1.0: the drafts begin · breakdown 6.0: "just send it" · lift 9.6: the reply · hit 10.3: SEND gold. Loops.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre06', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 3106, sections: { drop: 1.0, breakdown: [6.0], lift: [9.6], outroAt: DURATION - 0.5 }, hits: [10.3] }, cues: CUES }
