// kmte11 score: chiptune, Eb. drop 2.8: brain loading · breakdown 6.3: the menu · lift 8.8: "nervous" · hit 12.6: the reply. Loops.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kmte11', duration: DURATION, music: { style: 'chiptune', key: 'Eb', seed: 2111, sections: { drop: 2.8, breakdown: [6.3], lift: [8.8], outroAt: DURATION - 0.5 }, hits: [8.8, 12.6] }, cues: CUES }
