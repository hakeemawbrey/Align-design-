// og-k3se13 score (times follow the kit's T): jazzy, F (style engine). whip 0.5 · drop 2.45: the advice · hit 4.95: the family laughs · hard cut.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-k3se13', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 2813, sections: { drop: T.fix, outroAt: DURATION - 0.9 }, hits: [T.fix + 2.5] }, cues: CUES }
