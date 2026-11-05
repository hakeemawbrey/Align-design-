// kare09 score: dreamy, Eb. Loops: the music runs to the end. drop 3.0: TAKE 1 · breakdown 7.0: the whisper · lift 13.6: THE STARS · hit 11.1 (MMMMPH).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare09', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 1909, sections: { drop: 3.0, breakdown: [7.0], lift: [13.6], outroAt: DURATION - 0.5 }, hits: [11.1] }, cues: CUES }
