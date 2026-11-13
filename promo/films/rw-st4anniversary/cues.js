// rw-st4anniversary score: lofi, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.6: the first beat · breakdown at the group beat · outro under the callback.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'rw-st4anniversary', duration: DURATION, music: { style: 'lofi', key: 'E', seed: 4301, lufs: -20, sections: { drop: 3.6, breakdown: [T.group], outroAt: DURATION - 2.4 } }, cues: CUES }
