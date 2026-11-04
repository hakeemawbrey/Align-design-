// nffe21 score: lofi, Dm. drop 7.0: the hard cut into THE STARS · lift 13.6: the quiet hour · hit 15.85: the last piece · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe21', duration: DURATION, music: { style: 'lofi', key: 'Dm', seed: 3421, sections: { drop: 7.0, lift: [13.6], outroAt: DURATION - 2.4 }, hits: [15.85] }, cues: CUES }
