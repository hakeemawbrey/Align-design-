// htxsprawl score — synthwave, Em, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads + arp while the map tiles in; the groove drops with the big zoom-out (2.82); it thins to a breakdown for the
// magnifier search (5.04); the lift lands as the city lights float up and become stars (11.71); a hit on the gold arc
// landing (17.82); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxsprawl', duration: DURATION, music: { style: 'synthwave', key: 'Em', seed: 9, sections: { drop: 2.82, breakdown: 5.04, lift: 11.71, outroAt: DURATION - 4.4 }, hits: [0.6, 17.82] }, cues: CUES }
