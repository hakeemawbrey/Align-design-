// srcityneworleans score — cinematic, Cm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands as "your cards." pops over Scorpio's table (1.71); it thins to a breakdown for the WHO? card and THE STARS'
// "cards never say who" (7.82); it lifts as the "?" bursts into the zodiac wheel (10.75); hits on the WHO? flip, the mystery
// card landing and the star heart. The tonic lands under the end card (25.6).
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcityneworleans', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 2614, sections: { drop: T.h0Late, breakdown: 7.822, lift: T.burst, outroAt: DURATION - 4.4 }, hits: [+(T.s1Late + 0.34).toFixed(3), T.myst[1], T.heart] }, cues: CUES }
