// st9libraam score — dreamy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the first line · lift when the runway starts · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9libraam', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 931, sections: { drop: T.l1, lift: T.runway, outroAt: DURATION - 4.4 } }, cues: CUES }
