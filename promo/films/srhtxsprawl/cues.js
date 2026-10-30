// srhtxsprawl score — cinematic, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads and strings while the map tiles in; the drop lands with the big zoom-out (2.82); it thins to a breakdown for the
// magnifier search (5.04); the lift lands as the city lights float up and become stars (11.1); a hit as the gold arc
// lands on ♍ (17.54); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxsprawl', duration: DURATION, music: { style: 'cinematic', key: 'F', seed: 20202, sections: { drop: 2.822, breakdown: 5.044, lift: 11.1, outroAt: DURATION - 4.4 }, hits: [17.546] }, cues: CUES }
