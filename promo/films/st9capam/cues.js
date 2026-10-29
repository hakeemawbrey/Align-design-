// st9capam score — cinematic, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.85: the 5:00 alarm · lift 9.1: Saturn rises in the window · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9capam', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 946, sections: { drop: 2.85, lift: 9.1, outroAt: DURATION - 4.4 } }, cues: CUES }
