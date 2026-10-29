// st9geminicrew score — pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: pinball mode · lift 8.6: the kitchen, the real party · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9geminicrew', duration: DURATION, music: { style: 'pop', key: 'D', seed: 914, sections: { drop: 3.0, lift: 8.6, outroAt: DURATION - 4.4 } }, cues: CUES }
