// nf16e10 score: pop, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: the pile grows · lift 9.6: ask what they love · hit 17.4: "you remembered!" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nf16e10', duration: DURATION, music: { style: 'pop', key: 'F', seed: 1610, sections: { drop: 3.0, lift: [9.6], outroAt: DURATION - 2.4 }, hits: [17.4] }, cues: CUES }
