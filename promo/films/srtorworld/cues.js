// srtorworld score — screwed, Dm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Half-time under the hellos; the groove drops as the skyline springs up across the lake on "somewhere." (2.822); it
// thins to a breakdown as the bubbles float up into stars (7.0); the lift lands with the gold arc linking the two charts
// (8.93); hits as the pair rises into one sky (12.9); the end card takes over at 15.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srtorworld', duration: DURATION, music: { style: 'screwed', key: 'Dm', seed: 130, sections: { drop: 2.822, breakdown: 7.0, lift: 8.933, outroAt: DURATION - 4.4 }, hits: [12.9] }, cues: CUES }
