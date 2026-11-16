// st4retro1 score — screwed, Bbm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.38: Retro starts talking ("go on…") · breakdown 9.1: the phone goes face down · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4retro1', duration: DURATION, music: { style: 'screwed', key: 'Bbm', seed: 1515, sections: { drop: 3.38, breakdown: 9.1, outroAt: DURATION - 4.4 } }, cues: CUES }
