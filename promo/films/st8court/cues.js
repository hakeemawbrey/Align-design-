// st8court score — cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.6: Venus states her case · lift 20.0: back in court, the defense gets soft · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8court', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 808, sections: { drop: 3.6, lift: 20.0, outroAt: DURATION - 4.4 } }, cues: CUES }
