// st4repair score — funk, A, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: THE STARS start talking · lift 8.6: Leo goes first · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4repair', duration: DURATION, music: { style: 'funk', key: 'A', seed: 613, sections: { drop: 2.82, lift: 8.6, outroAt: DURATION - 4.4 } }, cues: CUES }
