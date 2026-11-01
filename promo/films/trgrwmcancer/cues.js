// trgrwmcancer score: pop, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: talk card one lands · breakdown 20.25: the phone buzzes · lift 22.2: the reflection turns Pisces
//   · hit 23.05: "Pisces." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trgrwmcancer', duration: DURATION, music: { style: 'pop', key: 'D', seed: 403, sections: { drop: 2.82, breakdown: [20.25], lift: [22.2], outroAt: DURATION - 4.4 }, hits: [23.05] }, cues: CUES }
