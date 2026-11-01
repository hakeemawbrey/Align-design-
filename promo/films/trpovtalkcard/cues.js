// trpovtalkcard score: synthwave, C#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.2: into the card's eyes · breakdown 7.9: the drumroll · lift 9.4: the answer · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trpovtalkcard', duration: DURATION, music: { style: 'synthwave', key: 'C#m', seed: 9505, sections: { drop: 2.2, breakdown: [7.9], lift: [9.4], outroAt: DURATION - 4.4 } }, cues: CUES }
