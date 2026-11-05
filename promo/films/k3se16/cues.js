// k3se16 score: dreamy, C (style engine). scratch 0.5 · drop 2.45: the advice · loops back into frame 0 at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'k3se16', duration: DURATION, music: { style: 'dreamy', key: 'C', seed: 2816, sections: { drop: 2.45, outroAt: DURATION - 1.2 } }, cues: CUES }
