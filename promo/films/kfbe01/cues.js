// kfbe01 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.15: the thaw after the record scratch · breakdown 9.6: the big breath · lift + hit 7.65: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from './scenes/bingokit.js'
export default { id: 'kfbe01', duration: DURATION, music: bingoMusic({ style: 'chiptune', key: 'E', seed: 10101, D: DURATION, drop: 1.15, breakdown: [9.6], lift: [7.65], hits: [7.65] }), cues: CUES }
