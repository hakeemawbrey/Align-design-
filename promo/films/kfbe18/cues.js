// kfbe18 score: cinematic, Dm. drop 3.0: room 1 · breakdowns at the portraits (16) and the bench (52) · lifts at the
//   gift shop (36) and the BINGO (62.25).
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe18', duration: DURATION, music: bingoMusic({ style: 'cinematic', key: 'Dm', seed: 11801, D: DURATION, drop: 3.0, breakdown: [16, 52], lift: [36, 62.25], hits: [62.25] }), cues: CUES }
