// st8confessional score — pop, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: the booths · breakdown 15.5: the final booth · lift 20.6: back to the grid · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8confessional', duration: DURATION, music: { style: 'pop', key: 'Bb', seed: 820, sections: { drop: 2.6, breakdown: 15.5, lift: 20.6, outroAt: DURATION - 4.4 } }, cues: CUES }
