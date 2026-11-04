// nt2e11 score: house, Ab. drop 2.1 (the soft launch) · breakdown 9.1 (the real launch) · lift 10.0 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nt2e11', duration: DURATION, music: { style: 'house', key: 'Ab', seed: 1111, sections: { drop: 2.1, breakdown: [9.1], lift: [10.0], outroAt: DURATION - 4.4 }, hits: [10.0] }, cues: CUES }
