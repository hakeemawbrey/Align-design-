// nt2e100 score: chiptune, F# (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.2: pick 1 · breakdown 8.6: the twisted third pick · lift 11.8: SELECTED! · hit 11.85 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nt2e100', duration: DURATION, music: { style: 'chiptune', key: 'F#', seed: 1800, sections: { drop: 2.2, breakdown: [8.6], lift: [11.8], outroAt: DURATION - 4.4 }, hits: [11.85] }, cues: CUES }
