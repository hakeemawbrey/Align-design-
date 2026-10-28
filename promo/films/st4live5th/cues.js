// st4live5th score — funk, Bbm (B♭ dorian), 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the TV clicks on, "AND SEATTLE PULSES!" · breakdown 6.95: "no winner yet." · lift 11.85: "Anyone's game." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4live5th', duration: DURATION, music: { style: 'funk', key: 'Bbm', seed: 891, sections: { drop: 1.71, breakdown: 6.95, lift: 11.85, outroAt: DURATION - 4.4 } }, cues: CUES }
