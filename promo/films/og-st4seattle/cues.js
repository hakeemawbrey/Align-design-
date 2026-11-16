// st4seattle score — lofi, Db, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the stars start talking · lift 9.1: "hi." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4seattle', duration: DURATION, music: { style: 'lofi', key: 'Db', seed: 82, sections: { drop: 2.82, lift: 9.1, outroAt: DURATION - 4.4 } }, cues: CUES }
