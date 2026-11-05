// kbxe14 score: jazzy, F (style engine in promo/scripts/teaser-sound.mjs). No end card: loops back to frame 0.
//   drop 1.62: the freeze lets go · breakdown 13.2: the RSVP · lift 18.0: the last line · music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbxe14', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 2014, sections: { drop: 1.62, breakdown: [13.2], lift: [18.0], outroAt: DURATION - 0.5 }, hits: [0.35, 14.05, 19.05] }, cues: CUES }
