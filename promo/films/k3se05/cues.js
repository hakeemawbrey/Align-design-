// k3se05 score: funk, E (style engine). scratch 0.5 · drop 2.45: the advice · loops back into frame 0 at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'k3se05', duration: DURATION, music: { style: 'funk', key: 'E', seed: 2805, sections: { drop: 2.45, outroAt: DURATION - 1.2 } }, cues: CUES }
