// kxgne03 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.0: the name cards · breakdown 70: lightning round · lift 90: the final · hit 110: the result · outro on the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxgne03', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 3903, sections: { drop: 6.0, breakdown: [70], lift: [90, 110], outroAt: DURATION - 1.6 }, hits: [110] }, cues: CUES }
