// mljealous score: jazzy, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.044: Act 1 (after the title card) · breakdown 70.044: THE STARS ADVISE (softer bed) · lift 90.044: Act 3
//   hits 93.9: the green moon turns gold · 110.6: Scorpio buys a flower · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mljealous', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 61, sections: { drop: 10.044, breakdown: [70.044], lift: [90.044], outroAt: DURATION - 4.4 }, hits: [93.9, 110.6] }, cues: CUES }
