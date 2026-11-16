// st4scorpio score — funk, Ebm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: THE STARS start talking over the case file · breakdown 7.4: the corkboard flips to Scorpio's blank card ·
//   outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4scorpio', duration: DURATION, music: { style: 'funk', key: 'Ebm', seed: 1313, sections: { drop: 2.82, breakdown: 7.4, outroAt: DURATION - 4.4 } }, cues: CUES }
