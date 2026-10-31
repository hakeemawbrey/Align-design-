// sxhoodmidtown score — house, C major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Filtered pads under the hook; the four-on-the-floor drops as the brunch table starts growing (5.6); a breakdown when
// THE STARS cut in (16.3); the lift lands on the card cut into the last beat (22.04); hits on the phone flip (18.55).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxhoodmidtown', duration: DURATION, music: { style: 'house', key: 'C', seed: 36011, sections: { drop: 5.6, breakdown: 16.156, lift: 22.044, outroAt: DURATION - 4.4 }, hits: [18.55] }, cues: CUES }
