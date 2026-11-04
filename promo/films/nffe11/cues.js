// nffe11 score: chiptune, A. drop 5.0: the hard cut into THE STARS · lift 9.8: the voice note · hit 11.0: the hearts · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe11', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 3411, sections: { drop: 5.0, lift: [9.8], outroAt: DURATION - 2.4 }, hits: [11.0] }, cues: CUES }
