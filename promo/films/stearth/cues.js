// stearth score — jazzy, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the box opens (Taurus' dinner) · breakdown 10.95: THE STARS · lift 14.85: "Plan less. Feel more." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stearth', duration: DURATION, music: { style: 'jazzy', key: 'D', seed: 237, sections: { drop: 2.82, breakdown: 10.95, lift: 14.85, outroAt: DURATION - 4.4 } }, cues: CUES }
