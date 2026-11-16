// st4texasdeck score — house, F, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: THE STARS start talking · lift 5.55: the new hand deals in · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4texasdeck', duration: DURATION, music: { style: 'house', key: 'F', seed: 653, sections: { drop: 2.82, lift: 5.55, outroAt: DURATION - 4.4 } }, cues: CUES }
