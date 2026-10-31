// st13finale score — cinematic, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.5: the first teacher steps up · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st13finale', duration: DURATION, music: { style: 'cinematic', key: 'C', seed: 1340, sections: { drop: 7.5, outroAt: DURATION - 4.4 } }, cues: CUES }
