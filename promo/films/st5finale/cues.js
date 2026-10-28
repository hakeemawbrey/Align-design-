// st5finale score — dreamy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.2: Leo asks again · lift 10.3: "yes. slowly." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st5finale', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 1010, sections: { drop: 3.2, lift: 10.3, outroAt: DURATION - 4.4 } }, cues: CUES }
