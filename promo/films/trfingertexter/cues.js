// trfingertexter score: house, B, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the sticker slaps on · breakdown 15.6: "…called someone just to talk." · hit 17.27: the finger pops back
//   up (honest) · lift 18.38: "five left? perfect." → the call · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trfingertexter', duration: DURATION, music: { style: 'house', key: 'B', seed: 803, sections: { drop: 2.82, breakdown: [15.6], lift: [18.38], outroAt: DURATION - 4.4 }, hits: [17.27] }, cues: CUES }
