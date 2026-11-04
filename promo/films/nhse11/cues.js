// nhse11 score: cinematic, Ebm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.6: the memories · breakdown 13.9: the card cut into THE STARS' tip · lift 21.6: the survival kit · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhse11', duration: DURATION, music: { style: 'cinematic', key: 'Ebm', seed: 2911, sections: { drop: 6.6, breakdown: [13.9], lift: [21.6], outroAt: DURATION - 4.4 }, hits: [22.42] }, cues: CUES }
