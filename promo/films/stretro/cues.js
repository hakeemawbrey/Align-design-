// stretro score — screwed, Bbm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.93: the alarm (every star pops up around the phone) · breakdown 9.5: the draft deletes itself · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stretro', duration: DURATION, music: { style: 'screwed', key: 'Bbm', seed: 211, sections: { drop: 3.93, breakdown: 9.5, outroAt: DURATION - 4.4 } }, cues: CUES }
