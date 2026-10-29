// st8karaoke score — pop, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.6: the second lyric line · lift 18.2: the big healthy chorus · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8karaoke', duration: DURATION, music: { style: 'pop', key: 'A', seed: 809, sections: { drop: 3.6, lift: 18.2, outroAt: DURATION - 4.4 } }, cues: CUES }
