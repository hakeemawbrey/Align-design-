// kare11 score: synthwave, F# minor. drop 3.5: noon · breakdown 7.4: the nature show · lift 10.0: THE STARS · hit 0 (the buzz). Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare11', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 1911, sections: { drop: 3.5, breakdown: [7.4], lift: [10.0], outroAt: DURATION }, hits: [0.0] }, cues: CUES }
