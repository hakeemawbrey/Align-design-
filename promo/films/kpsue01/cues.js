// kpsue01 score: chiptune, E (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 23.6.
//   drop 0.2: the Sun lands · breakdown 15.8: the record scratch · lift 19.8: the pep talk · outro 21.6: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpsue01', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 5101, sections: { drop: 0.2, breakdown: [15.8], lift: [19.8], outroAt: 21.6 }, hits: [0.2] }, cues: CUES }
