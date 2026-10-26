// torworld score — pop, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pops under the hellos; the groove drops as the skyline springs up across the lake on "somewhere." (2.82); it thins to a
// breakdown as the bubbles float up into stars under "Your person could be from anywhere." (3.93); the lift lands with
// the gold arc linking the two charts across the crowd (6.71); the end card takes over at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'torworld', duration: DURATION, music: { style: 'pop', key: 'D', seed: 81, sections: { drop: 2.822, breakdown: 3.933, lift: 6.711, outroAt: DURATION - 4.4 } }, cues: CUES }
