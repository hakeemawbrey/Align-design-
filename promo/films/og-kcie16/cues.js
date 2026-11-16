// kcie16 score: chiptune, G. The beat drops after the record scratch (2.9); breakdowns under the catches; hard cut at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-kcie16', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 2116, sections: { drop: 2.9, breakdown: [26.35, 49.35], lift: [37.85, 60.35], outroAt: DURATION - 1.2 } }, cues: CUES }
