// k3se10 score: cinematic, Dm (style engine). whip 0.5 · drop 2.45: the advice · loops back into frame 0 at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'k3se10', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 2810, sections: { drop: 2.45, outroAt: DURATION - 1.2 } }, cues: CUES }
