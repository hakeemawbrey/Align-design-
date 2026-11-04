// nole16 score: dreamy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.2: the date bounces in · lift at the cut into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole16', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 4216, sections: { drop: 2.2, lift: [CUT], outroAt: DURATION - 2.4 }, hits: [CUT] }, cues: CUES }
