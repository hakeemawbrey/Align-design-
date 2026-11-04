// nhve20 score: chiptune, D · drop 6.71: the card cut into 2026 · lift 12.78: the payoff · hit 13.93: "Missed midnight. *Worth it*." lands.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhve20', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 1820, sections: { drop: 6.71, lift: [12.78], outroAt: DURATION - 2.4 }, hits: [13.93] }, cues: CUES }
