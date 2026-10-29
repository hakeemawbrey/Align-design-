// st9libralove score — dreamy, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop back at the table · lift as they laugh · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9libralove', duration: DURATION, music: { style: 'dreamy', key: 'Bb', seed: 933, sections: { drop: T.table, lift: T.laugh, outroAt: DURATION - 4.4 } }, cues: CUES }
