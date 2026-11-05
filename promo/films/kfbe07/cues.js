// kfbe07 score: jazzy, Bb. drop 2.0: after the scratch · breakdown 6.2: "I want the pasta" · lift + hit 7.25: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe07', duration: DURATION, music: bingoMusic({ style: 'jazzy', key: 'Bb', seed: 10701, D: DURATION, drop: 2.0, breakdown: [6.2], lift: [7.25], hits: [7.25] }), cues: CUES }
