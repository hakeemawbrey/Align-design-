// npce01 score: dreamy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: the note unfolds · breakdown 3.85: the flip · lift 4.5: the doodle, fountains · hit 5.6: the card cut · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npce01', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 4801, sections: { drop: 1.6, breakdown: [3.85], lift: [4.5], outroAt: DURATION - 4.4 }, hits: [5.6] }, cues: CUES }
