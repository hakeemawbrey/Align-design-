// kcfe02 score: chiptune, E (style engine in promo/scripts/teaser-sound.mjs). Loops: the music runs to the end.
//   drop 0.45: Aries slams into the chair · breakdown 7.7: the notification · lift 8.2: serene.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcfe02', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 902, sections: { drop: 0.45, breakdown: [7.7], lift: [8.2], outroAt: DURATION - 0.5 } }, cues: CUES }
