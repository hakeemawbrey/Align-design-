// kfbe05 score: funk, A. drop 0.5: the gold flash · breakdown 6.4: Leo freezes · lift + hit 7.25: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe05', duration: DURATION, music: bingoMusic({ style: 'funk', key: 'A', seed: 10501, D: DURATION, drop: 0.5, breakdown: [6.4], lift: [7.25], hits: [7.25, 9.95] }), cues: CUES }
