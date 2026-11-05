// kcie12 score: screwed, C#m. The beat drops after the record scratch (2.05); hard cut: the outro lands under the punchline.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie12', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 2112, sections: { drop: 2.05, breakdown: [9.5], lift: [10.9], outroAt: DURATION - 1.2 } }, cues: CUES }
