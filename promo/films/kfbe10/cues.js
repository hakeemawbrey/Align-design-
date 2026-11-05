// kfbe10 score: chiptune, G. drop 1.95: after the scratch · breakdown 6.2: "what do you do for fun?" · lift + hit 7.65: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe10', duration: DURATION, music: bingoMusic({ style: 'chiptune', key: 'G', seed: 11001, D: DURATION, drop: 1.95, breakdown: [6.2], lift: [7.65], hits: [7.65] }), cues: CUES }
