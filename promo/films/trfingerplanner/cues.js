// trfingerplanner score: house, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the sticker slaps on · breakdown 15.6: "…the unplanned bit." · hit 17.27: the last five fingers fold
//   softly · lift 18.38: THE STARS · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trfingerplanner', duration: DURATION, music: { style: 'house', key: 'D', seed: 805, sections: { drop: 2.82, breakdown: [15.6], lift: [18.38], outroAt: DURATION - 4.4 }, hits: [17.27] }, cues: CUES }
