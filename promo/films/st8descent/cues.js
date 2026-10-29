// st8descent score — cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 12.2: the seven gates (split screen) · lift 24.8: the real sky · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8descent', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 811, sections: { drop: 12.2, lift: 24.8, outroAt: DURATION - 4.4 } }, cues: CUES }
