// kwoe13 score: dreamy, D. drop 1.0: the first spotlight · breakdown at panel 3 · lift + hit on "Comment your number." · hit on the freeze.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kwoe13', duration: DURATION, music: { style: 'dreamy', key: 'D', seed: 2713, sections: { drop: 1.0, breakdown: [T.turns[2][0]], lift: [T.E], outroAt: DURATION - 0.6 }, hits: [0.45, T.E] }, cues: CUES }
