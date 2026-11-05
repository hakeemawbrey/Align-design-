// ksre10 score: cinematic, Eb. drop 1.2: the calendar fills · breakdown 4.2: no free slot · lift 7.2: the drag · hit 9.6: saturday ♡.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre10', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 3110, sections: { drop: 1.2, breakdown: [4.2], lift: [7.2], outroAt: DURATION - 0.9 }, hits: [9.6] }, cues: CUES }
