// kfbe08 score: screwed, Fm. drop 1.95: after the scratch · breakdown 6.2: the honest answer · lift + hit 7.65: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe08', duration: DURATION, music: bingoMusic({ style: 'screwed', key: 'Fm', seed: 10801, D: DURATION, drop: 1.95, breakdown: [6.2], lift: [7.65], hits: [7.65] }), cues: CUES }
