// kfbe03 score: pop, G. drop 0.3: the whip · breakdown 2.3: the loading bar · lift + hit 6.25: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe03', duration: DURATION, music: bingoMusic({ style: 'pop', key: 'G', seed: 10301, D: DURATION, drop: 0.3, breakdown: [2.3], lift: [6.25], hits: [6.25] }), cues: CUES }
