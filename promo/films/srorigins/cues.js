// srorigins score — lofi, F, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs). Story-time lofi:
// the beat drops into Babylon (3.93) with the hit on the "12" stamp (8.38); a breakdown for "Plot twist: Earth wobbles."
// (24.49) and under the LESSON (32.82); the lift back in for the talk card (37.3); outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srorigins', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 61, sections: { drop: T.h1, breakdown: [T.top, T.lesson], lift: [T.badge, T.talk], outroAt: DURATION - 4.4 }, hits: [T.stamp] }, cues: CUES }
