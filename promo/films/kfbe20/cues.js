// kfbe20 score: dreamy, F. drop 4.0: chapter 1 after the rewind · breakdowns at the cold (32) and the bench's quiet
//   (54.6) · lifts at the doorstep (60) and the BLACKOUT (74.25).
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe20', duration: DURATION, music: bingoMusic({ style: 'dreamy', key: 'F', seed: 12001, D: DURATION, drop: 4.0, breakdown: [32, 54.6], lift: [60, 74.25], hits: [74.25] }), cues: CUES }
