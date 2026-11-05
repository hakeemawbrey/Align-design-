// ksre18 score: chiptune, C. drop 6.0: chapter 1 · breakdown 28.4: closed tonight · lift 62.0: improvise · hit 74.0: PB. Loops.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre18', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 3118, sections: { drop: 6.0, breakdown: [28.4], lift: [62.0], outroAt: DURATION - 0.5 }, hits: [74.0] }, cues: CUES }
