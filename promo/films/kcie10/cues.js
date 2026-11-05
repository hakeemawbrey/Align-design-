// kcie10 score: synthwave, F#m. The beat drops after the record scratch (2.05); a loop: the music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie10', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 2110, sections: { drop: 2.05, breakdown: [5.85], lift: [7.35], outroAt: DURATION - 0.5 } }, cues: CUES }
