// kbne12 score: cinematic, Ab (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 3.5 · lift 9.3 · hit 14.6 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne12', duration: DURATION, music: { style: 'cinematic', key: 'Ab', seed: 5112, sections: { drop: 1.3, breakdown: [3.5], lift: [9.3], outroAt: DURATION - 0.5 }, hits: [14.6] }, cues: CUES }
