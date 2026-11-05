// kfbe02 score: lofi, F. drop 0.55: the 10/10 paddle · breakdown 5.0: eyeing the fries · lift + hit 9.15: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe02', duration: DURATION, music: bingoMusic({ style: 'lofi', key: 'F', seed: 10201, D: DURATION, drop: 0.55, breakdown: [5.0], lift: [9.15], hits: [9.15] }), cues: CUES }
