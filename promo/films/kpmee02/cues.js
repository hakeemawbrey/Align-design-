// kpmee02 score: lofi, F (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the seam.
//   drop 2.6: the spiral shatters · breakdown 11.1: "it has to be perfect" · lift 16.0: the honest reply.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee02', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 3102, sections: { drop: 2.6, breakdown: [11.1], lift: [16.0], outroAt: DURATION - 0.5 }, hits: [23.3] }, cues: CUES }
