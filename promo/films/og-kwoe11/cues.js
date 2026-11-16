// og-kwoe11 score (from kwoe11): cinematic, Gm. drop on the first spotlight · breakdown at panel 3 · hit on Pisces #5.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-kwoe11', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 2711, sections: { drop: T.turns[0][0], breakdown: [T.turns[2][0]], outroAt: DURATION - 0.6 }, hits: [T.turns[0][0], T.E] }, cues: CUES }
