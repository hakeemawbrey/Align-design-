// hxeastend score — funk, A minor (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// A filtered groove under the first mural; the band drops in with "Leo can't read murals" (5.6); a breakdown when THE
// STARS cut in (16.2); the lift lands as both rollers start the last mural (22.3); a hit on the dropped roller (18.45).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxeastend', duration: DURATION, music: { style: 'funk', key: 'A', seed: 61403, sections: { drop: 5.6, breakdown: 16.2, lift: 22.3, outroAt: DURATION - 4.4 }, hits: [18.45] }, cues: CUES }
