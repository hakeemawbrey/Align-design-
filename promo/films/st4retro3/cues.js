// st4retro3 score — screwed, Ebm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.27: Retro hijacks the GPS · breakdown 9.9: the screen turns green, STRAIGHT AHEAD · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4retro3', duration: DURATION, music: { style: 'screwed', key: 'Ebm', seed: 571, sections: { drop: 2.27, breakdown: 9.9, outroAt: DURATION - 4.4 } }, cues: CUES }
