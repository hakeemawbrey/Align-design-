// ktre01 score: pop, D, 108 bpm. drop at the slash (0.6) · lift on the reply · hard cut at 22 s (no end card).
import { DURATION, CUES, T } from './scenes/index.js'
const R = T.R[0]
export default { id: 'ktre01', duration: DURATION, music: { style: 'pop', key: 'D', seed: 1201, sections: { drop: R.slash + 0.3, lift: [R.rep[0].at], outroAt: DURATION - 1.6 } }, cues: CUES }
