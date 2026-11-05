// kroe15 score: funk, Bb (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kroe15', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 3715, sections: { drop: 1.15, breakdown: [T.pen], lift: [T.score2], outroAt: DURATION - 0.5 }, hits: [T.score2] }, cues: CUES }
