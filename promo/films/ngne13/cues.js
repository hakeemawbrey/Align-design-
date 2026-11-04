// ngne13 score: funk, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.4: round 1 · breakdown 17.6: round 3 (the card cut) · lift 24.7: the scoreboard · hit 25.9: the winner
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ngne13', duration: DURATION, music: { style: 'funk', key: 'E', seed: 1301, sections: { drop: 3.4, breakdown: [17.6], lift: [24.7], outroAt: DURATION - 4.4 }, hits: [25.9] }, cues: CUES }
