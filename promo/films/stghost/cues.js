// stghost score — lofi, Bm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the stars start talking · lift 8.3: the sheet comes off · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stghost', duration: DURATION, music: { style: 'lofi', key: 'Bm', seed: 233, sections: { drop: 2.82, lift: 8.3, outroAt: DURATION - 4.4 } }, cues: CUES }
