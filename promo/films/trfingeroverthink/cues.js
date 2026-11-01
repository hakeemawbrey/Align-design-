// trfingeroverthink score: house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the sticker slaps on · breakdown 15.6: "…you're overthinking this video." (silence + push-in)
//   · hit 17.27: all five fingers fall · lift 18.38: THE STARS' hug · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trfingeroverthink', duration: DURATION, music: { style: 'house', key: 'G', seed: 801, sections: { drop: 2.82, breakdown: [15.6], lift: [18.38], outroAt: DURATION - 4.4 }, hits: [17.27] }, cues: CUES }
