// kpmae08 score: cinematic, Dm (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.08: Mars lands in the frozen dust · breakdown 13.6: the script card · lift 21.2: the frost melts · loops at 30.5.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae08', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 5808, sections: { drop: 0.08, breakdown: [13.6], lift: [21.2], outroAt: DURATION - 1.2 }, hits: [27.5] }, cues: CUES }
