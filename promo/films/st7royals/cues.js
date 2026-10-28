// st7royals score — cinematic, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.05: the summit opens · lift at the royal-star chart · outro under the end card.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'st7royals', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 706, sections: { drop: 3.05, lift: LIFT, outroAt: DURATION - 4.4 } }, cues: CUES }
