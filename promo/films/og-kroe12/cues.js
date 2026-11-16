// og-kroe12 score (was kroe12): dreamy, Db (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-kroe12', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 3712, sections: { drop: 0.45, breakdown: [T.pen], lift: [T.score2], outroAt: DURATION - 0.5 }, hits: [T.score2] }, cues: CUES }
