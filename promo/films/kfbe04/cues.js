// kfbe04 score: dreamy, Ab. drop 2.2: after the freeze · breakdown 8.2: "sorry, I get excited" · lift + hit 6.25: BINGO.
import { DURATION, CUES } from './scenes/index.js'
import { bingoMusic } from '../kfbe01/scenes/bingokit.js'
export default { id: 'kfbe04', duration: DURATION, music: bingoMusic({ style: 'dreamy', key: 'Ab', seed: 10401, D: DURATION, drop: 2.2, breakdown: [8.2], lift: [6.25], hits: [6.25] }), cues: CUES }
