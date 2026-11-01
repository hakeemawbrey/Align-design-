// trfingerromantic score: house, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the sticker slaps on · breakdown 15.6: "…love at first sight." · hit 16.16: all five fingers slam down
//   · lift 18.38: THE STARS + the talk card · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trfingerromantic', duration: DURATION, music: { style: 'house', key: 'A', seed: 802, sections: { drop: 2.82, breakdown: [15.6], lift: [18.38], outroAt: DURATION - 4.4 }, hits: [16.16] }, cues: CUES }
