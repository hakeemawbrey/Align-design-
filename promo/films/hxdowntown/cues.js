// hxdowntown score — synthwave, E minor (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// A driving arp under the tunnel sprint; the drop lands on the first weekday zip (5.45); a breakdown on "Up the stairs"
// (16.3); the lift lands on "Come up for air" (22.15); a hit when the camera reaches the street (19.0).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxdowntown', duration: DURATION, music: { style: 'synthwave', key: 'E', seed: 70921, sections: { drop: 5.45, breakdown: 16.3, lift: 22.15, outroAt: DURATION - 4.4 }, hits: [19.0] }, cues: CUES }
