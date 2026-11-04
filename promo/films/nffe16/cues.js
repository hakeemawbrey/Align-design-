// nffe16 score: cinematic, Em. drop 7.0: the hard cut into THE STARS · lift 13.6: the door left open · hit 16.6: "fine changed." · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe16', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 3416, sections: { drop: 7.0, lift: [13.6], outroAt: DURATION - 2.4 }, hits: [16.6] }, cues: CUES }
