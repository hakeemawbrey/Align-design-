// kroe07 score: dreamy, Eb (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kroe07', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 3707, sections: { drop: 1.15, breakdown: [T.pen], lift: [T.score2], outroAt: DURATION - 0.5 }, hits: [T.score2] }, cues: CUES }
