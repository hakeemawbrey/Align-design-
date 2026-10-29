// st9librawork score — dreamy, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop as the summit opens · lift when the scale levels · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9librawork', duration: DURATION, music: { style: 'dreamy', key: 'D', seed: 932, sections: { drop: T.summit, lift: T.level, outroAt: DURATION - 4.4 } }, cues: CUES }
