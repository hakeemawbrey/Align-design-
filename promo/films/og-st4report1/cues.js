// st4report1 score — jazzy, Bb, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the first stamp · lift 15.3: "Show up, Houston." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4report1', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 2020, sections: { drop: 1.8, lift: 15.3, outroAt: DURATION - 4.4 } }, cues: CUES }
