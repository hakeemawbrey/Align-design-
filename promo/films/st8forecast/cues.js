// st8forecast score — dreamy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.2: Aquarius starts the forecast · lift 13.4: back to the studio, the radar zoom · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8forecast', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 806, sections: { drop: 1.2, lift: 13.4, outroAt: DURATION - 4.4 } }, cues: CUES }
