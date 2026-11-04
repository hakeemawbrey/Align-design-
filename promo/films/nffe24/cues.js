// nffe24 score: cinematic, C. drop 8.6: the card cut into THE STARS · lift 15.8: Capricorn stands up · hit 18.3: everyone replies · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe24', duration: DURATION, music: { style: 'cinematic', key: 'C', seed: 3424, sections: { drop: 8.6, lift: [15.8], outroAt: DURATION - 4.4 }, hits: [18.3] }, cues: CUES }
