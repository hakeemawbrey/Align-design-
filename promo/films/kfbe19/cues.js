// kfbe19 score: funk, G. drop 3.0: SHOES · breakdowns at SNACKS (40) and the slip (74) · lifts at the tiebreak (60) and
//   the DOUBLE BINGO (79.25).
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe19', duration: DURATION, music: bingoMusic({ style: 'funk', key: 'G', seed: 11901, D: DURATION, drop: 3.0, breakdown: [40, 74], lift: [60, 79.25], hits: [79.25] }), cues: CUES }
