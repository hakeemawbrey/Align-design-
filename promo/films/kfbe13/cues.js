// kfbe13 score: lofi, D. drop 2.0: after the scratch · breakdown 6.3: the goodbye · lift + hit 8.25: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe13', duration: DURATION, music: bingoMusic({ style: 'lofi', key: 'D', seed: 11301, D: DURATION, drop: 2.0, breakdown: [6.3], lift: [8.25], hits: [8.25] }), cues: CUES }
