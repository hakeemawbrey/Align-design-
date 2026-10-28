// st4hotcold score — cinematic, Dm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.05: the cold front · lift 11.15: the chip stamps · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4hotcold', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 1717, sections: { drop: 3.05, lift: 11.15, outroAt: DURATION - 4.4 } }, cues: CUES }
