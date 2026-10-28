// st4tacos score — dreamy, F, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.85: the truck parks and the scale snaps level · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4tacos', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 1919, sections: { drop: 3.85, outroAt: DURATION - 4.4 } }, cues: CUES }
