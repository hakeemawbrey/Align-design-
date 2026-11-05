// kroe16 score: screwed, Cm (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kroe16', duration: DURATION, music: { style: 'screwed', key: 'Cm', seed: 3716, sections: { drop: 0.45, breakdown: [T.pen], lift: [T.score2], outroAt: DURATION - 0.5 }, hits: [T.score2] }, cues: CUES }
