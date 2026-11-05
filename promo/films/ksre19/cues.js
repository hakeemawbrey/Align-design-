// ksre19 score: cinematic, D. drop 6.0: chapter 1 · breakdown 53.0: the first fight · lift 65.0: the final boss · hit 74.0: K.O.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre19', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 3119, sections: { drop: 6.0, breakdown: [53.0], lift: [65.0], outroAt: DURATION - 0.9 }, hits: [74.0] }, cues: CUES }
