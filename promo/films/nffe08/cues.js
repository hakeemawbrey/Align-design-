// nffe08 score: pop, D. drop 5.0: the card cut onto the street · lift 9.8: the doorstep · hit 12.35: the door opens · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe08', duration: DURATION, music: { style: 'pop', key: 'D', seed: 3408, sections: { drop: 5.0, lift: [9.8], outroAt: DURATION - 4.4 }, hits: [12.35] }, cues: CUES }
