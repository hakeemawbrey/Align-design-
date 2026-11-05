// kfbe06 score: house, C. drop 0.6: the whip into the clipboard · breakdown 9.0: the clipboard drops · lift + hit 6.85: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe06', duration: DURATION, music: bingoMusic({ style: 'house', key: 'C', seed: 10601, D: DURATION, drop: 0.6, breakdown: [9.0], lift: [6.85], hits: [6.85] }), cues: CUES }
