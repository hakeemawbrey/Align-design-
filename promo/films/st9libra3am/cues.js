// st9libra3am score — dreamy, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop as the calendar overflows · lift when the texts go out · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9libra3am', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 935, sections: { drop: T.desk, lift: T.text, outroAt: DURATION - 4.4 } }, cues: CUES }
