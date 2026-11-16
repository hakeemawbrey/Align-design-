// st4finale score — cinematic, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the stars start talking · lift 12.2: the camera pulls up into the sky · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4finale', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 1000, sections: { drop: 2.82, lift: 12.2, outroAt: DURATION - 4.4 } }, cues: CUES }
