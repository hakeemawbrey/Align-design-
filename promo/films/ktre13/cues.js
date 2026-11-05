// ktre13 score: lofi, G, 108 bpm. drop after the first slash · lift on the first reply · no end card.
import { DURATION, CUES, T } from './scenes/index.js'
const R = T.R[0], L = T.R[T.R.length - 1]
const lift = T.R.map(o => o.rep[0]?.at).filter(Boolean)
export default { id: 'ktre13', duration: DURATION, music: { style: 'lofi', key: 'G', seed: 1213, sections: { drop: (R.drafts[0].slash ?? R.lines[0].t) + 0.3, lift: lift.slice(0, 3), outroAt: DURATION - 1.6 } }, cues: CUES }
