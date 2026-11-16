// kcie05 score: chiptune, E. The beat drops after the record scratch (2.05); hard cut: the outro lands under the punchline.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie05', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 2105, sections: { drop: 2.05, breakdown: [6.7], lift: [8.2], outroAt: DURATION - 1.2 } }, cues: CUES }
