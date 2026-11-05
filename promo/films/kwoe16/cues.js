// kwoe16 score: house, C. drop 1.0: the first spotlight · breakdown at panel 3 · lift + hit on "Comment your number." · hit on the freeze.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kwoe16', duration: DURATION, music: { style: 'house', key: 'C', seed: 2716, sections: { drop: 1.0, breakdown: [T.turns[2][0]], lift: [T.E], outroAt: DURATION - 0.6 }, hits: [0.45, T.E] }, cues: CUES }
