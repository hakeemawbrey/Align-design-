// kbhe05 score: funk, G (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end (no end card).
//   drop 1.1: Brain's objection · breakdown 4.5: the refresh loop · lift 7.1: the like · outro 8.9: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbhe05', duration: DURATION, music: { style: 'funk', key: 'G', seed: 4105, sections: { drop: 1.1, breakdown: [4.5], lift: [7.1], outroAt: DURATION - 0.5 }, hits: [3.9, 7.1] }, cues: CUES }
