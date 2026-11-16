// st8missing score — screwed, Bbm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.6: CH 1 on the corkboard · lift 23.4: CH 4, the note · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8missing', duration: DURATION, music: { style: 'screwed', key: 'Bbm', seed: 810, sections: { drop: 5.6, lift: 23.4, outroAt: DURATION - 4.4 } }, cues: CUES }
