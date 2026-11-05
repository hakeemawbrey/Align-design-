// kswe15 score: house, C (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end.
//   drop 2.8: the chat · lift 11.0: the meetup · breakdown 13.0: the diner.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe15', duration: DURATION, music: { style: 'house', key: 'C', seed: 1115, sections: { drop: 2.8, lift: [11.0], breakdown: [13.0], outroAt: DURATION - 0.5 } }, cues: CUES }
