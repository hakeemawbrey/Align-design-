// kpmee11 score: chiptune, F#m (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the seam.
//   drop 2.6: the octopus fact · breakdown 7.0: "facts are safe" · lift 11.5: the real reply.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee11', duration: DURATION, music: { style: 'chiptune', key: 'F#m', seed: 3111, sections: { drop: 2.6, breakdown: [7.0], lift: [11.5], outroAt: DURATION - 0.5 }, hits: [21.5] }, cues: CUES }
