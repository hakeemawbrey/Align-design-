// st4sheetoff score — lofi, F, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the sheet is off, "you're cute!" · lift 7.85: "Nobody hides forever." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4sheetoff', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 881, sections: { drop: 2.82, lift: 7.85, outroAt: DURATION - 4.4 } }, cues: CUES }
