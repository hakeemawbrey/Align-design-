// strising score — pop, Ab, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the hood goes on · lift 8.05: the hood comes off and the blind card rises · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'strising', duration: DURATION, music: { style: 'pop', key: 'Ab', seed: 227, sections: { drop: 2.82, lift: 8.05, outroAt: DURATION - 4.4 } }, cues: CUES }
