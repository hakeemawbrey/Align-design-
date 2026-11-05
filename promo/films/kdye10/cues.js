// kdye10 score: pop, D (style engine in promo/scripts/teaser-sound.mjs). Loops: the outro rings into the seam.
// drop 3.0: the bus · breakdown 8.4: the mural · lift 13.6: street food · hits 1.3 the stamp, 14.8 first bite.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye10', duration: DURATION, music: { style: 'pop', key: 'D', seed: 1610, sections: { drop: 3.0, breakdown: [8.4], lift: [13.6], outroAt: 19.8 }, hits: [1.3, 14.8] }, cues: CUES }
