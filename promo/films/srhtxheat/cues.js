// srhtxheat score — jazzy, G minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops under the walk to the car (1.156); it thins as the sun sets on the bad date (4.62); it lifts on the
// dealbreakers card (8.42) and rings out under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxheat', duration: DURATION, music: { style: 'jazzy', key: 'Gm', seed: 22101, sections: { drop: 1.156, breakdown: 4.62, lift: 8.42, outroAt: DURATION - 4.4 } }, cues: CUES }
