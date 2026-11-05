// ksre20 score: synthwave, B. drop 6.0: chapter 1 · breakdown 53.0: the first fight · lift 65.0: co-op mode · hit 81.0: the bars merge. Loops.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre20', duration: DURATION, music: { style: 'synthwave', key: 'B', seed: 3120, sections: { drop: 6.0, breakdown: [53.0], lift: [65.0], outroAt: DURATION - 0.5 }, hits: [81.0] }, cues: CUES }
