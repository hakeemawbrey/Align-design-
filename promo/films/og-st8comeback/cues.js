// st8comeback score — house, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the ex's arrival · lift at the ref's whistle · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
export default { id: 'st8comeback', duration: DURATION, music: { style: 'house', key: 'Gm', seed: 815, sections: { drop: TIMES.arrive, lift: TIMES.whistle, outroAt: DURATION - 4.4 } }, cues: CUES }
