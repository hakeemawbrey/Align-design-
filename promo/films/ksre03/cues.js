// ksre03 score: funk, A. drop 1.9: the ramble resumes after the freeze · breakdown 4.0: the quiet · lift 5.4: the ramble back · hit 9.0: the laugh. Loops.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre03', duration: DURATION, music: { style: 'funk', key: 'A', seed: 3103, sections: { drop: 1.9, breakdown: [4.0], lift: [5.4], outroAt: DURATION - 0.5 }, hits: [9.0] }, cues: CUES }
