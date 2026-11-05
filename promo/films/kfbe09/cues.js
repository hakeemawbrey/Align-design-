// kfbe09 score: synthwave, Bm. drop 1.5: Sag back in the chair · breakdown 6.2: "I like it here." · lift + hit 7.65: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe09', duration: DURATION, music: bingoMusic({ style: 'synthwave', key: 'Bm', seed: 10901, D: DURATION, drop: 1.5, breakdown: [6.2], lift: [7.65], hits: [7.65] }), cues: CUES }
