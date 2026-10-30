// srhtxtaste score — screwed, C minor, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Houston chopped-and-screwed under the food critic: the half-time drop lands with the first taco (1.16); it breaks down
// for the swipe feed (4.49) and the tape-stop eye-roll; it lifts as the plate whirls into the charts (8.7); a hit on the
// lock (10.6); outro under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxtaste', duration: DURATION, music: { style: 'screwed', key: 'Cm', seed: 19101, sections: { drop: 1.156, breakdown: 4.489, lift: 8.712, outroAt: DURATION - 4.4 }, hits: [10.6] }, cues: CUES }
