// kbne08 score: synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 2.95 · lift 9.6 · hit 11.9 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne08', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 5108, sections: { drop: 1.3, breakdown: [2.95], lift: [9.6], outroAt: DURATION - 0.5 }, hits: [11.9] }, cues: CUES }
