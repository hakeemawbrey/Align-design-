// hxasiatown score — lofi, D major (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Dusty keys under the hook and the unrolling list; the beat drops as the dishes land at stop two (5.6); a breakdown when
// THE STARS cut in (16.2); the lift lands on the two-straw boba (22.3); a hit on the poof (18.1).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxasiatown', duration: DURATION, music: { style: 'lofi', key: 'D', seed: 52117, sections: { drop: 5.6, breakdown: 16.2, lift: 22.3, outroAt: DURATION - 4.4 }, hits: [18.1] }, cues: CUES }
