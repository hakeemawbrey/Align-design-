// og-k3se10 score (times follow the kit's T): cinematic, Dm (style engine). whip 0.5 · drop 2.45: the advice · loops back into frame 0 at the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-k3se10', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 2810, sections: { drop: T.fix, outroAt: DURATION - 1.2 } }, cues: CUES }
