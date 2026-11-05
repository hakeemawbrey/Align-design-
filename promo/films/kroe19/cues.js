// kroe19 score: chiptune, G (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kroe19', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 3719, sections: { drop: 1.15, breakdown: [T.pen], lift: [T.score2], outroAt: DURATION - 0.5 }, hits: [T.score2] }, cues: CUES }
