// st8breaking score — cinematic, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: the news sting after the hook · lift 13.6: every phone lights up · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8breaking', duration: DURATION, music: { style: 'cinematic', key: 'Em', seed: 801, sections: { drop: 2.6, lift: 13.6, outroAt: DURATION - 4.4 } }, cues: CUES }
