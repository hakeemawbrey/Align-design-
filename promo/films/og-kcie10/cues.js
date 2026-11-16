// kcie10 score: synthwave, F#m. The beat drops after the record scratch (2.9); a loop: the music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-kcie10', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 2110, sections: { drop: 2.9, breakdown: [6.7], lift: [8.2], outroAt: DURATION - 0.5 } }, cues: CUES }
