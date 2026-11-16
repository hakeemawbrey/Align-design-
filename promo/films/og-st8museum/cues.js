// st8museum score — jazzy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.2: STOP 02, the hoodie · lift 20.8: the gift shop · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8museum', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 807, sections: { drop: 3.2, lift: 20.8, outroAt: DURATION - 4.4 } }, cues: CUES }
