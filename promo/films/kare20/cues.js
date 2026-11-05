// kare20 score: dreamy, Ab. Loops: the music runs to the end. drop 6.0: THE ALMOST · breakdown 42.0: THE PEP TALK · lift 56.0: THE ASK, 68.0: THE ANSWER · hits 32.6, 70.2.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare20', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 1920, sections: { drop: 6.0, breakdown: [42.0], lift: [56.0, 68.0], outroAt: DURATION - 0.5 }, hits: [32.6, 70.2] }, cues: CUES }
