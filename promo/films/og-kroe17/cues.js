// og-kroe17 score (was kroe17): house, D (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-kroe17', duration: DURATION, music: { style: 'house', key: 'D', seed: 3717, sections: { drop: 1.15, breakdown: [T.pen], lift: [T.score2], outroAt: DURATION - 0.5 }, hits: [T.score2] }, cues: CUES }
