// ksre08 score: synthwave, C#. drop 1.5: the first penalty · breakdown 6.6: "they're not into me" · lift 9.6: "I like talking to you." · hit 11.2: "me too!!"
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre08', duration: DURATION, music: { style: 'synthwave', key: 'C#', seed: 3108, sections: { drop: 1.5, breakdown: [6.6], lift: [9.6], outroAt: DURATION - 0.9 }, hits: [11.2] }, cues: CUES }
