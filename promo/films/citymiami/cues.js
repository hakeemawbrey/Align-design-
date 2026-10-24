// citymiami score — house, Bbm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as "just visiting." lands (1.71); it thins to a breakdown under "Dealbreakers come first." (3.38),
// builds on the riser and lifts with the full band as the mystery card lands on the chart (6.71); end card at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'citymiami', duration: DURATION, music: { style: 'house', key: 'Bbm', seed: 97, sections: { drop: 1.711, breakdown: 3.378, lift: 6.712, outroAt: DURATION - 4.4 } }, cues: CUES }
