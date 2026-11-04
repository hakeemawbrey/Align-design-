// npve23 score: synthwave, C#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: "midnight somewhere" · lift 6.2: 11:59 (card cut) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npve23', duration: DURATION, music: { style: 'synthwave', key: 'C#m', seed: 4323, sections: { drop: 2.4, lift: 6.2, outroAt: DURATION - 4.4 } }, cues: CUES }
