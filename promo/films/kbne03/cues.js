// kbne03 score: cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card: the score runs to the end.
//   drop 1.3 · breakdown 1.9 · lift 10.4 · hit 12.9 (the last headline).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbne03', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 5103, sections: { drop: 1.3, breakdown: [1.9], lift: [10.4], outroAt: DURATION - 0.5 }, hits: [12.9] }, cues: CUES }
