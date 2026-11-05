// kfbe17 score: chiptune, C. drop 3.0: hole 1 · breakdowns at the windmill (27) and the hush before the last putt
//   (57.4) · lifts at hole 7 (38) and the BINGO (61.75).
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe17', duration: DURATION, music: bingoMusic({ style: 'chiptune', key: 'C', seed: 11701, D: DURATION, drop: 3.0, breakdown: [27, 57.4], lift: [38, 61.75], hits: [61.75] }), cues: CUES }
