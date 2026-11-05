// kfbe11 score: synthwave, Ebm. drop 2.3: after the scratch · breakdown 5.8: the answer · lift + hit 7.05: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe11', duration: DURATION, music: bingoMusic({ style: 'synthwave', key: 'Ebm', seed: 11101, D: DURATION, drop: 2.3, breakdown: [5.8], lift: [7.05], hits: [7.05] }), cues: CUES }
