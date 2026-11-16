// kfbe03 score: pop, G. drop 0.3: the whip · breakdown 2.3: the loading bar · lift + hit 6.25: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../og-kfbe01/scenes/bingokit.js'
export default { id: 'og-kfbe03', duration: DURATION, music: bingoMusic({ style: 'pop', key: 'G', seed: 10301, D: DURATION, drop: 0.3, breakdown: [3.1], lift: [7.05], hits: [7.05] }), cues: CUES }
