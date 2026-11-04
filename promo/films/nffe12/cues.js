// nffe12 score: cinematic, Dm. drop 8.6: the hard cut into THE STARS · lift 15.8: the message · hit 17.5: "deal." · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe12', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 3412, sections: { drop: 8.6, lift: [15.8], outroAt: DURATION - 2.4 }, hits: [17.5] }, cues: CUES }
