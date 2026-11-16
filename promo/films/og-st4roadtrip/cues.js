// st4roadtrip score — house, F, 128 bpm feel (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Sagittarius lands at the wheel (honk) · lift 7.3: the van pulls out · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4roadtrip', duration: DURATION, music: { style: 'house', key: 'F', seed: 4141, sections: { drop: 2.82, lift: 7.3, outroAt: DURATION - 4.4 } }, cues: CUES }
