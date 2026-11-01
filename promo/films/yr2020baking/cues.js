// yr2020baking score: dreamy, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the card cut into NOW (the year flips to 2026) · hit 9.25: the flour POOF · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'yr2020baking', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 2801, sections: { drop: 7.0, outroAt: DURATION - 4.4 }, hits: [9.25] }, cues: CUES }
