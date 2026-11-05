// kare19 score: cinematic, D minor. drop 6.0: THE ALMOST · breakdown 36.0: THE NO · lift 60.0: Sunday, 66.0: THE GOOD ENDING · hits 0.5, 79.0. Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare19', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 1919, sections: { drop: 6.0, breakdown: [36.0], lift: [60.0, 66.0], outroAt: DURATION }, hits: [0.5, 79.0] }, cues: CUES }
