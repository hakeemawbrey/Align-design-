// nhve15 score: chiptune, C · drop 6.71: the card cut into 2026 · lift 12.78: the payoff · hit 13.93: "*In* the picture now." lands.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhve15', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 1815, sections: { drop: 6.71, lift: [12.78], outroAt: DURATION - 2.4 }, hits: [13.93] }, cues: CUES }
