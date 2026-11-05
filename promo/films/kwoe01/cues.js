// kwoe01 score: pop, D. drop 0.8: the first spotlight · lift at "Comment your number." · hits on the freeze and the slam.
import { DURATION, CUES } from './scenes/index.js'
import { SCENES as _S } from './scenes/index.js'
const E = 1.0 + 4 * 1.6
export default { id: 'kwoe01', duration: DURATION, music: { style: 'pop', key: 'D', seed: 2701, sections: { drop: 1.0, breakdown: [4.0], lift: [E], outroAt: DURATION - 0.6 }, hits: [0.45, E] }, cues: CUES }
void _S
