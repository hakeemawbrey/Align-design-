// st11capricorn score — cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.9: liftoff · breakdown 33.0: the bathtub cutaway · lift 43.6: the ring-surf · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st11capricorn', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1110, sections: { drop: 3.9, breakdown: 33.0, lift: 43.6, outroAt: DURATION - 4.4 } }, cues: CUES }
