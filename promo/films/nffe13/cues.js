// nffe13 score: dreamy, Eb. drop 7.0: the card cut into the kitchen · lift 13.6: the envelope arrives · hit 14.0: it opens · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe13', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 3413, sections: { drop: 7.0, lift: [13.6], outroAt: DURATION - 4.4 }, hits: [14.0] }, cues: CUES }
