// nffe23 score: synthwave, Am. drop 5.0: the hard cut into THE STARS · lift 9.8: the check-in · hit 10.95: "so glad you asked." · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nffe23', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 3423, sections: { drop: 5.0, lift: [9.8], outroAt: DURATION - 2.4 }, hits: [10.95] }, cues: CUES }
