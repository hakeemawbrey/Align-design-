// trfingerfirst score: house, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the sticker slaps on · breakdown 15.6: "…you're nervous right now." · hit 17.27: twelve fingers fall
//   at once (Leo's six and the date's six) · lift 18.38: the table and THE STARS · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trfingerfirst', duration: DURATION, music: { style: 'house', key: 'C', seed: 804, sections: { drop: 2.82, breakdown: [15.6], lift: [18.38], outroAt: DURATION - 4.4 }, hits: [17.27] }, cues: CUES }
