// kcie09 score: cinematic, Dm. The beat drops after the record scratch (2.05); hard cut: the outro lands under the punchline.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie09', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 2109, sections: { drop: 2.05, breakdown: [7.45], lift: [8.55], outroAt: DURATION - 1.2 } }, cues: CUES }
