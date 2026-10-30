// srhtxweather score — dreamy, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The band comes in as the sun swings up on "sunny," (0.6); it thins to a breakdown while the dial whirls into "Mixed
// signals?" (4.75), and lifts back in as the dial bursts on "Not here." (5.6); the end card lands at 15.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxweather', duration: DURATION, music: { style: 'dreamy', key: 'D', seed: 20203, sections: { drop: 0.6, breakdown: 4.75, lift: 5.6, outroAt: DURATION - 4.4 }, hits: [5.6, 9.767] }, cues: CUES }
