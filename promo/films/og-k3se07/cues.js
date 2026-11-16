// og-k3se07 score (times follow the kit's T; hard cut, no loop): chiptune, G (style engine). scratch 0.5 · drop 2.45: the advice · loops back into frame 0 at the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-k3se07', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 2807, sections: { drop: T.fix, outroAt: DURATION - 1.2 } }, cues: CUES }
