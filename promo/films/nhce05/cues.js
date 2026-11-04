// nhce05 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: the hot take's jump cut · breakdown 5.3: the cold take (icy jump cut) · lift 8.2: the warm take · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhce05', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 4405, sections: { drop: 2.4, breakdown: [5.3], lift: [8.2], outroAt: DURATION - 2.4 }, hits: [8.2] }, cues: CUES }
