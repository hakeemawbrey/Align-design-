// kare12 score: chiptune, G. Loops: the music runs to the end. drop 2.6: the clues · breakdown 8.0: QUEST FAILED · lift 10.6: THE STARS.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kare12', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 1912, sections: { drop: 2.6, breakdown: [8.0], lift: [10.6], outroAt: DURATION - 0.5 }, hits: [7.0] }, cues: CUES }
