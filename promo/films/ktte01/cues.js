// ktte01 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the first slam (0.12) · lift on the twist's pick · the landing under the last line, hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ktte01', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 2901, sections: { drop: 0.12, lift: [6.2], outroAt: DURATION - 1.6 }, hits: [6.2] }, cues: CUES }
