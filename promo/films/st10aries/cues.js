// st10aries score — synthwave, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 12.0: the Academy yard, race 1 · lift 42.0: the last race, Aries waits · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st10aries', duration: DURATION, music: { style: 'synthwave', key: 'Em', seed: 1001, sections: { drop: 12.0, lift: 42.0, outroAt: DURATION - 4.4 } }, cues: CUES }
