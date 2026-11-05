// ksre11 score: synthwave, F#. drop 1.5: the first bonk · breakdown 6.2: the loading bar · lift 9.0: the door · hit 11.5: "I was hoping you'd ask." Loops.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre11', duration: DURATION, music: { style: 'synthwave', key: 'F#', seed: 3111, sections: { drop: 1.5, breakdown: [6.2], lift: [9.0], outroAt: DURATION - 0.5 }, hits: [11.5] }, cues: CUES }
