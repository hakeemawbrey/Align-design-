// kbxe17 score: pop, D (style engine in promo/scripts/teaser-sound.mjs). No end card: loops back to frame 0.
//   drop 1.62: the freeze lets go · breakdowns 17.0 (the dance) and 33.0 (the ride home) · lifts 37.0 (the real test) and
//   56.5 (home) · music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbxe17', duration: DURATION, music: { style: 'pop', key: 'D', seed: 2017, sections: { drop: 1.62, breakdown: [17.0, 33.0], lift: [37.0, 56.5], outroAt: DURATION - 0.5 }, hits: [0.35, 37.0, 63.05] }, cues: CUES }
