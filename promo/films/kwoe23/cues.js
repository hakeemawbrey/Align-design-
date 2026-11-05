// kwoe23 score: synthwave, E minor. drop at round 1 · breakdowns at rounds 3 and 5 · lift + hit on the verdict and the Pisces finale.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kwoe23', duration: DURATION, music: { style: 'synthwave', key: 'Em', seed: 2723, sections: { drop: T.RS[0], breakdown: [T.RS[2], T.RS[4]], lift: [T.VS, T.FIN], outroAt: DURATION - 0.6 }, hits: [0.45, T.VS, T.FIN] }, cues: CUES }
