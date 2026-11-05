// kbne20 score: cinematic, C (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 38.0 · lift 70.6 · hit 73.5 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne20', duration: DURATION, music: { style: 'cinematic', key: 'C', seed: 5120, sections: { drop: 1.3, breakdown: [38.0], lift: [70.6], outroAt: DURATION - 0.5 }, hits: [73.5] }, cues: CUES }
