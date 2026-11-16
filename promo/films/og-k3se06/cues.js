// og-k3se06 score (times follow the kit's T): synthwave, C#m (style engine). whip 0.5 · drop 2.45: the advice · hit 5.25: the reply · hard cut.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-k3se06', duration: DURATION, music: { style: 'synthwave', key: 'C#m', seed: 2806, sections: { drop: T.fix, outroAt: DURATION - 0.9 }, hits: [T.fix + 2.8] }, cues: CUES }
