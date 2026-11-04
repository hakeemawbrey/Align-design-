// nffe06 score: synthwave, F#m. drop 8.6: the card cut into THE STARS · lift 16.0: the split again · hit 20.05: the Sunday call · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe06', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 3406, sections: { drop: 8.6, lift: [16.0], outroAt: DURATION - 4.4 }, hits: [20.05] }, cues: CUES }
