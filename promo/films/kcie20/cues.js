// kcie20 score: cinematic, Gm. The beat drops after the record scratch (2.05); hard cut at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie20', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 2120, sections: { drop: 2.05, breakdown: [25.6, 49.6], lift: [37.6, 61.0], outroAt: DURATION - 1.2 } }, cues: CUES }
