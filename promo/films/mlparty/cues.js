// mlparty score — pop, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: the lane lights up · breakdown 70.0: THE STARS ADVISE (softer bed) · lift 90.0: Act 3 under the middle lamp
//   hits 92.6: "would you—" ×2 · 101.2: the founding card + the lane cheers · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlparty', duration: DURATION, music: { style: 'pop', key: 'A', seed: 1010, sections: { drop: 2.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [92.6, 101.2] }, cues: CUES }
