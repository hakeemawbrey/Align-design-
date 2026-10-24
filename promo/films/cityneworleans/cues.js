// cityneworleans score — jazzy, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as "your cards." lands (1.71); it thins to a breakdown for "They never say who." (7.82); the band
// lifts as the "?" bursts into the zodiac wheel (10.75); hits on "who.", the mystery card landing and the star heart.
// The tonic lands under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'cityneworleans', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 147, sections: { drop: 1.711, breakdown: 7.822, lift: 10.75, outroAt: DURATION - 4.4 }, hits: [8.722, 19.55, 23.933] }, cues: CUES }
