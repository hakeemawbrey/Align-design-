// ngwe30 score — screwed, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: the guide's first line · breakdown 11.8: the turn · lift 15.45: the card flip · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ngwe30', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 24030, sections: { drop: 3.0, breakdown: [11.8], lift: [15.45], outroAt: DURATION - 2.4 }, hits: [16.0] }, cues: CUES }
