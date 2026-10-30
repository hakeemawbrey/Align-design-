// srcityatlanta score — screwed, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands as "forest." pops and the canopy grows (1.71); it breaks down on "So many trees" (6.6); it lifts as the
// card backs start falling through the canopy (12.0); hit on the mystery-card flip (15.6).
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcityatlanta', duration: DURATION, music: { style: 'screwed', key: 'G', seed: 2503, sections: { drop: T.h0Land, breakdown: T.h1, lift: T.fall[0], outroAt: DURATION - 4.4 }, hits: [T.flip[1]] }, cues: CUES }
