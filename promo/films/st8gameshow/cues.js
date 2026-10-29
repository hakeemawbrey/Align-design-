// st8gameshow score — funk, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: the question · lift 19.4: final answer? · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8gameshow', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 805, sections: { drop: 2.6, lift: 19.4, outroAt: DURATION - 4.4 } }, cues: CUES }
