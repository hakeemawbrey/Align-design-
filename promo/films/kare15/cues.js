// kare15 score: cinematic, Bb. Loops: the music runs to the end. drop 2.6: the snow falls again · breakdown 9.2: Pisces · lift 12.0: THE STARS.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare15', duration: DURATION, music: { style: 'cinematic', key: 'Bb', seed: 1915, sections: { drop: 2.6, breakdown: [9.2], lift: [12.0], outroAt: DURATION - 0.5 }, hits: [4.4] }, cues: CUES }
