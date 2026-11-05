// kbxe06 score: lofi, G (style engine in promo/scripts/teaser-sound.mjs). No end card: loops back to frame 0.
//   drop 1.62: the freeze lets go · breakdown 12.9: the soup · lift 17.0: the last line · music runs to the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbxe06', duration: DURATION, music: { style: 'lofi', key: 'G', seed: 2006, sections: { drop: 1.62, breakdown: [12.9], lift: [17.0], outroAt: DURATION - 0.5 }, hits: [0.35, 18.05] }, cues: CUES }
