// sxfieldair score — synthwave, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.16: the guide's first line · breakdown 15.66: STOP 3, small talk (the groove thins, a tumbleweed) · lift 18.72:
//   SKIP IT, the weird question · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxfieldair', duration: DURATION, music: { style: 'synthwave', key: 'G', seed: 233, sections: { drop: 1.156, breakdown: [15.66], lift: [18.72], outroAt: DURATION - 4.4 }, hits: [18.72] }, cues: CUES }
