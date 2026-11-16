// st4exit score — pop, A, (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the stars start talking · lift 6.3: they take the exit · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4exit', duration: DURATION, music: { style: 'pop', key: 'A', seed: 960, sections: { drop: 2.82, lift: 6.3, outroAt: DURATION - 4.4 } }, cues: CUES }
