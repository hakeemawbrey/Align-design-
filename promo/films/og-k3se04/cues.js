// og-k3se04 score (times follow the kit's T): jazzy, Bb (style engine). scratch 0.5 · drop 2.45: the advice · hit 5.85: "yes" · hard cut.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-k3se04', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 2804, sections: { drop: T.fix, outroAt: DURATION - 0.9 }, hits: [T.fix + 3.4] }, cues: CUES }
