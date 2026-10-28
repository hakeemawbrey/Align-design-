// st4ghostfriend score — lofi, Eb, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the ghost speaks · lift 5.25: "stay." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4ghostfriend', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 627, sections: { drop: 2.82, lift: 5.25, outroAt: DURATION - 4.4 } }, cues: CUES }
