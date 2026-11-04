// nt2e42 score: cinematic, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.2: the movie begins · breakdown 7.6: the scratch → reality · lift 11.0: the payoff · hit 11.0 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nt2e42', duration: DURATION, music: { style: 'cinematic', key: 'E', seed: 4201, sections: { drop: 2.2, breakdown: [7.6], lift: [11.0], outroAt: DURATION - 2.4 }, hits: [11.0] }, cues: CUES }
