// kroe06 score: cinematic, Gm (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kroe06', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 3706, sections: { drop: 0.45, breakdown: [T.pen], lift: [T.score2], outroAt: DURATION - 0.5 }, hits: [T.score2] }, cues: CUES }
