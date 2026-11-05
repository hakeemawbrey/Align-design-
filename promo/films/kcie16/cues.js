// kcie16 score: chiptune, G. The beat drops after the record scratch (2.05); breakdowns under the catches; hard cut at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcie16', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 2116, sections: { drop: 2.05, breakdown: [25.5, 48.5], lift: [37.0, 59.5], outroAt: DURATION - 1.2 } }, cues: CUES }
