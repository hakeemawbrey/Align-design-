// og-k3se12 score (times follow the kit's T): dreamy, Eb (style engine). scratch 0.5 · drop 2.45: the advice · loops back into frame 0 at the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-k3se12', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 2812, sections: { drop: T.fix, outroAt: DURATION - 1.2 } }, cues: CUES }
