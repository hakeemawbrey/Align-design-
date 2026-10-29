// st8bossfight score — synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.0: the fight · lift 15.3: the combo · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8bossfight', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 819, sections: { drop: 1.0, breakdown: 9.0, lift: 15.3, outroAt: DURATION - 4.4 } }, cues: CUES }
