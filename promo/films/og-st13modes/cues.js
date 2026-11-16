// st13modes score — pop, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.3: the lesson starts · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st13modes', duration: DURATION, music: { style: 'pop', key: 'A', seed: 1313, sections: { drop: 3.3, outroAt: DURATION - 4.4 } }, cues: CUES }
