// kbxe15 score: house, Bb (style engine in promo/scripts/teaser-sound.mjs). No end card: loops back to frame 0.
//   drop 1.62: the freeze lets go · breakdown 12.4: the short text · lift 16.0: the last line · music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbxe15', duration: DURATION, music: { style: 'house', key: 'Bb', seed: 2015, sections: { drop: 1.62, breakdown: [12.4], lift: [16.0], outroAt: DURATION - 0.5 }, hits: [0.35, 17.05] }, cues: CUES }
