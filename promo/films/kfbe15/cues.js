// kfbe15 score: house, Am. drop 1.3: the call unfreezes · breakdown 6.0: the signal drops · lift + hit 7.65: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe15', duration: DURATION, music: bingoMusic({ style: 'house', key: 'Am', seed: 11501, D: DURATION, drop: 1.3, breakdown: [6.0], lift: [7.65], hits: [7.65] }), cues: CUES }
