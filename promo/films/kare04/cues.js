// kare04 score: funk, E. Loops: the music runs to the end. drop 3.0: the back-and-forth · breakdown 9.0: the flicker · lift 12.8: THE STARS.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare04', duration: DURATION, music: { style: 'funk', key: 'E', seed: 1904, sections: { drop: 3.0, breakdown: [9.0], lift: [12.8], outroAt: DURATION - 0.5 }, hits: [10.6] }, cues: CUES }
