// st4retro4 score — screwed, Bbm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.93: everyone screams at "VOTE FOR YOUR EX" · breakdown 8.4: Retro turns around · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4retro4', duration: DURATION, music: { style: 'screwed', key: 'Bbm', seed: 880, sections: { drop: 3.93, breakdown: 8.4, outroAt: DURATION - 4.4 } }, cues: CUES }
