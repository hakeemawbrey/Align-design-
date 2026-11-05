// kbne16 score: cinematic, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 2.5 · lift 28.0 · hit 74.0 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne16', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 5116, sections: { drop: 1.3, breakdown: [2.5], lift: [28.0], outroAt: DURATION - 0.5 }, hits: [74.0] }, cues: CUES }
