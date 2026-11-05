// kfbe14 score: pop, F. drop 0.5: the shake · breakdown 5.3: the blank name · lift + hit 7.45: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe14', duration: DURATION, music: bingoMusic({ style: 'pop', key: 'F', seed: 11401, D: DURATION, drop: 0.5, breakdown: [5.3], lift: [7.45], hits: [7.45] }), cues: CUES }
