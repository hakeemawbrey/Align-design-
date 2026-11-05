// kfbe16 score: jazzy, Eb. drop 3.0: chapter 1 · breakdowns at the ex question (24) and the goodbye (50) · lift at
//   dessert (38) and the BINGO (59.25).
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe16', duration: DURATION, music: bingoMusic({ style: 'jazzy', key: 'Eb', seed: 11601, D: DURATION, drop: 3.0, breakdown: [24, 50], lift: [38, 59.25], hits: [59.25] }), cues: CUES }
