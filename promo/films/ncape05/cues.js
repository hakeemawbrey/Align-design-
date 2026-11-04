// ncape05 score: chiptune, C. drop 2.3: perfect corners · breakdown 8.1: the letter · lift 11.2: the last line · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ncape05', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 2005, sections: { drop: 2.3, breakdown: [8.1], lift: [11.2], outroAt: DURATION - 4.4 }, hits: [8.9] }, cues: CUES }
