// hxsugarland score — pop, F major (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Tidy plucks under the colour-blocking; the drop lands as Sagittarius bounces in (5.6); a breakdown when THE STARS cut
// in (16.3); the lift lands on "Plan a little. Leave room." (22.15); a hit on the poof (17.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxsugarland', duration: DURATION, music: { style: 'pop', key: 'F', seed: 94271, sections: { drop: 5.6, breakdown: 16.3, lift: 22.15, outroAt: DURATION - 4.4 }, hits: [17.6] }, cues: CUES }
