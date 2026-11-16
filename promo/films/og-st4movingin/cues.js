// st4movingin score — dreamy, F, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the shell takes the whole shelf · lift 7.35: Cancer makes room · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4movingin', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 9417, sections: { drop: 2.82, lift: 7.35, outroAt: DURATION - 4.4 } }, cues: CUES }
