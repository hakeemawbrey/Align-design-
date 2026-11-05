// kpmae09 score: funk, D (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.13: Mars skids to a stop · breakdown 9.8: the calendar slams down · lift 15.2: "yes! finally." · hit 22.9.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae09', duration: DURATION, music: { style: 'funk', key: 'D', seed: 5909, sections: { drop: 0.13, breakdown: [9.8], lift: [15.2], outroAt: DURATION - 0.6 }, hits: [23.0] }, cues: CUES }
