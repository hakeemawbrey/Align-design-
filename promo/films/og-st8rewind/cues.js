// st8rewind score — synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.15: the twin's first line · breakdown 14.1: the rerun room · lift 24.42: back in the garage · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8rewind', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 8210, sections: { drop: 3.15, breakdown: 14.1, lift: 24.42, outroAt: DURATION - 4.4 } }, cues: CUES }
