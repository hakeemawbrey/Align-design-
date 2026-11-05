// koce08 score — chiptune, A. drop 1.1: the card lands · lift 6.4: the answers flip · runs to the loop.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'koce08', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 2208, sections: { drop: 1.1, lift: 6.4, outroAt: DURATION - 0.5 } }, cues: CUES }
