// kbxe04 score: chiptune, B (style engine in promo/scripts/teaser-sound.mjs). No end card: loops back to frame 0.
//   drop 1.62: the freeze lets go · breakdown 11.7: dinner · lift 14.0: the last line · music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbxe04', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 2004, sections: { drop: 1.62, breakdown: [11.7], lift: [14.0], outroAt: DURATION - 0.5 }, hits: [0.35, 15.05] }, cues: CUES }
