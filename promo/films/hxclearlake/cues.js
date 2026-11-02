// hxclearlake score — cinematic, G major (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Wide strings under the lecture; the drop lands as Aquarius falls for it (5.6); a breakdown when THE STARS cut in
// (16.3); the lift lands on "Ask back." (22.15); a hit when the diagrams clear (17.0).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxclearlake', duration: DURATION, music: { style: 'cinematic', key: 'G', seed: 83357, sections: { drop: 5.6, breakdown: 16.3, lift: 22.15, outroAt: DURATION - 4.4 }, hits: [17.0] }, cues: CUES }
