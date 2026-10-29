// st9cancer3am score — dreamy, F#m, soft (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.8: the Moon starts its phases · lift 19.6: care, then sleep · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9cancer3am', duration: DURATION, music: { style: 'dreamy', key: 'F#m', seed: 920, sections: { drop: 5.8, lift: 19.6, outroAt: DURATION - 4.4 } }, cues: CUES }
