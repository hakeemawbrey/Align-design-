// st4austin score — synthwave, Am, 128 bpm feel (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the headphones come off · lift 10.52: the spotlight · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4austin', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 4343, sections: { drop: 2.82, lift: 10.52, outroAt: DURATION - 4.4 } }, cues: CUES }
