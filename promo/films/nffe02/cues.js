// nffe02 score: chiptune, C. drop 5.2: the card cut into THE STARS · lift 10.0: the calm café · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe02', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 3402, sections: { drop: 5.2, lift: [10.0], outroAt: DURATION - 4.4 } }, cues: CUES }
