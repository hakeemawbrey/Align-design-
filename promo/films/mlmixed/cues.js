// mlmixed score: synthwave, Am, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.044: Act 1 (after the title card) · breakdown 70.044: THE STARS ADVISE (softer bed) · lift 90.044: Act 3
//   hits 94.1: the HONK · 101.3: "for you" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlmixed', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 51, sections: { drop: 10.044, breakdown: [70.044], lift: [90.044], outroAt: DURATION - 4.4 }, hits: [94.1, 101.3] }, cues: CUES }
