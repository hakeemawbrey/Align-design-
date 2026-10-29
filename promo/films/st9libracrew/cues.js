// st9libracrew score — dreamy, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop on the first line · lift when Taurus comes back with the tacos · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9libracrew', duration: DURATION, music: { style: 'dreamy', key: 'G', seed: 934, sections: { drop: T.l1, lift: T.back, outroAt: DURATION - 4.4 } }, cues: CUES }
