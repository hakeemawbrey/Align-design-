// htxloops score — screwed, C♯ minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Slow, heavy, Houston: detuned pad + dark Rhodes over the ring-road map; a tape-stop rides the morph into the
// zodiac wheel and the 808 drops (8.38); it floats on the bell line for “Align reads both charts” (15.04), comes back for
// “Whatever side of the Loop you’re on…” (19.49) and settles under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxloops', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 8, sections: { drop: 8.38, breakdown: 15.04, lift: 19.49, outroAt: 25.6 } }, cues: CUES }
