// st4ghostdate score — lofi, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the sheet almost comes off · lift 7.38: "Ready when you're ready." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4ghostdate', duration: DURATION, music: { style: 'lofi', key: 'Ab', seed: 239, sections: { drop: 2.82, lift: 7.38, outroAt: DURATION - 4.4 } }, cues: CUES }
