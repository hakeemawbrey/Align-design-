// kare18 score: house, Bb minor. Loops: the music runs to the end. drop 6.0: THEIR SIDE · breakdown 34.0: BOTH REHEARSE · lift 50.0: THE SAME NIGHT, 60.0: THE MIDDLE.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare18', duration: DURATION, music: { style: 'house', key: 'Bbm', seed: 1918, sections: { drop: 6.0, breakdown: [34.0], lift: [50.0, 60.0], outroAt: DURATION - 0.5 }, hits: [27.0, 63.4] }, cues: CUES }
