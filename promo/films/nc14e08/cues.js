// nc14e08 score: cinematic, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.4: the clock jumps · breakdown 14.0: TIE. · lift 17.0: the pause · hit 28.8: "yes to movie night." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nc14e08', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 1408, sections: { drop: 3.4, breakdown: [14.0], lift: [17.0], outroAt: DURATION - 2.4 }, hits: [28.8] }, cues: CUES }
