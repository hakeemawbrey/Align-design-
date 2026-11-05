// kbxe12 score: chiptune, E (style engine in promo/scripts/teaser-sound.mjs). No end card: loops back to frame 0.
//   drop 1.62: the freeze lets go · breakdown 11.5: the group chat · lift 14.0: the last line · music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbxe12', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 2012, sections: { drop: 1.62, breakdown: [11.5], lift: [14.0], outroAt: DURATION - 0.5 }, hits: [0.35, 15.05] }, cues: CUES }
