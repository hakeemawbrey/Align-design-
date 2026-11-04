// nt2e20 score: chiptune, A. drop 2.0 (evidence 1) · breakdown 11.0 (the turn) · lift 15.2 (SOLULU) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nt2e20', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 1120, sections: { drop: 2.0, breakdown: [11.0], lift: [15.2], outroAt: DURATION - 2.4 }, hits: [15.2] }, cues: CUES }
