// st4tauscorp score — dreamy, F, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the veil lifts · breakdown 5.75: the seat standoff · lift 7.0: they laugh · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4tauscorp', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 85, sections: { drop: 2.82, breakdown: 5.75, lift: 7.0, outroAt: DURATION - 4.4 } }, cues: CUES }
