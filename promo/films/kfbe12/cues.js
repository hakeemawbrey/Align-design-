// kfbe12 score: dreamy, E. drop 2.0: after the scratch · breakdown 6.6: the napkin · lift + hit 7.85: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe12', duration: DURATION, music: bingoMusic({ style: 'dreamy', key: 'E', seed: 11201, D: DURATION, drop: 2.0, breakdown: [6.6], lift: [7.85], hits: [7.85] }), cues: CUES }
