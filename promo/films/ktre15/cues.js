// ktre15 score: funk, E, 108 bpm. drop after the first slash · lift on the first reply · no end card.
import { DURATION, CUES, T } from './scenes/index.js'
const R = T.R[0], L = T.R[T.R.length - 1]
const lift = T.R.map(o => o.rep[0]?.at).filter(Boolean)
export default { id: 'ktre15', duration: DURATION, music: { style: 'funk', key: 'E', seed: 1215, sections: { drop: (R.drafts[0].slash ?? R.lines[0].t) + 0.3, lift: lift.slice(0, 3), outroAt: DURATION - 1.6 } }, cues: CUES }
