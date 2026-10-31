// st13goodbye score — screwed, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.1: the board pops in · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st13goodbye', duration: DURATION, music: { style: 'screwed', key: 'Eb', seed: 1327, sections: { drop: 3.1, outroAt: DURATION - 4.4 } }, cues: CUES }
