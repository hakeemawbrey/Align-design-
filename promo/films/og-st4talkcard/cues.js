// st4talkcard score — pop, A, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.62: the talk card flips · lift 7.25: the debate starts · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4talkcard', duration: DURATION, music: { style: 'pop', key: 'A', seed: 1616, sections: { drop: 3.62, lift: 7.25, outroAt: DURATION - 4.4 } }, cues: CUES }
