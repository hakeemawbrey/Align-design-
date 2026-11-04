// nffe18 score: chiptune, E. drop 5.0: the hard cut into THE STARS · lift 9.8: Capricorn's turn · hit 10.8: the replies · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe18', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 3418, sections: { drop: 5.0, lift: [9.8], outroAt: DURATION - 2.4 }, hits: [10.8] }, cues: CUES }
