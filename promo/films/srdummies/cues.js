// srdummies score — funk, B♭ major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.49 on Q1 · breakdown 36.5 (Q6) → lift on Q7 (42.82) · breakdown 46.16 → lift on ★ LESSON UNLOCKED (46.71)
//   · the cap lands 54.75 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srdummies', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 1303, sections: { drop: 4.489, breakdown: [36.5, 46.16], lift: [42.82, 46.71], outroAt: DURATION - 4.4 }, hits: [54.75] }, cues: CUES }
