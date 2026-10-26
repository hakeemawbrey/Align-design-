// torglass score — dreamy, F#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pad + bell arps while the towers rise; the groove blooms as we push into the facade and the windows light (3.38);
// it lifts as the two gold windows join (10.6); it thins for "Come out of your box." (19.88), lifts when the two
// meet on the lakeshore (22.82) and rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'torglass', duration: DURATION, music: { style: 'dreamy', key: 'F#m', seed: 81, sections: { drop: 3.38, breakdown: 19.88, lift: 22.82, outroAt: DURATION - 4.4 } }, cues: CUES }
