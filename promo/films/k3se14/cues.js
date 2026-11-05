// k3se14 score: lofi, G (style engine). scratch + caught 0.5 · drop 2.45: the advice · loops back into frame 0 at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'k3se14', duration: DURATION, music: { style: 'lofi', key: 'G', seed: 2814, sections: { drop: 2.45, outroAt: DURATION - 1.2 } }, cues: CUES }
