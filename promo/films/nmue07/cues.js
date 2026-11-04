// nmue07 score: cinematic, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: it's fine (not fine) · breakdown 9.6: the card cut · lift 17.2: the try · hit 21.0: the heart mends · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nmue07', duration: DURATION, music: { style: 'cinematic', key: 'Fm', seed: 3107, sections: { drop: 3.0, breakdown: [9.6], lift: [17.2], outroAt: DURATION - 4.4 }, hits: [21.0] }, cues: CUES }
